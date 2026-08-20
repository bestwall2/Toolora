import puppeteer, { Browser, Page } from 'puppeteer-core';
import fs from 'fs';
import os from 'os';
import path from 'path';

// Server-side proxy for Perchance's AI text-to-image generator JSON API.
//
// The generator page accepts URL parameters (prompt, negative, resolution,
// seed) plus `api=1` and a `key`. When a headless browser loads that URL the
// generator runs the job and publishes the result JSON to a public file at
// https://editable.uploads.dev/file/{generatorId}/{key}, which we poll until it
// appears, then download the generated image from `imageUrl`.
//
// The page is behind Cloudflare, so a real Chrome session with a persistent
// profile is used; the clearance cookie from the profile is sent automatically.
//
// Reference page: https://8a3a4dfaf29b4be8eead43dd8c912667.perchance.org/3y4owlpd4l

const GENERATOR_URL =
  'https://8a3a4dfaf29b4be8eead43dd8c912667.perchance.org/3y4owlpd4l';
const RESULT_BASE_URL = 'https://editable.uploads.dev/file/3y4owlpd4l';
const DEFAULT_RESOLUTION = '512x512';

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
].filter((c): c is string => Boolean(c));

// Kept outside the Next.js project root so Turbopack never scans the Chrome
// profile directory (its locked LevelDB files would break builds while the
// browser is running).
const PROFILE_DIR = path.join(os.homedir(), '.perchance-profile');

export interface GenerateImageParams {
  prompt: string;
  negativePrompt?: string;
  seed?: number;
  resolution?: string;
}

export interface GenerateImageResult {
  dataUrl: string;
  mimeType: string;
}

interface JobResult {
  success?: boolean;
  prompt?: string;
  seed?: number;
  resolution?: string;
  imageUrl?: string;
  resultUrl?: string;
  generatedAt?: string;
  error?: string;
}

let browserPromise: Promise<Browser> | null = null;

function findChrome(): string {
  const found = CHROME_CANDIDATES.find((c) => fs.existsSync(c));
  if (!found) {
    throw new Error(
      'No Chrome/Edge executable found. Set CHROME_PATH to your browser path.'
    );
  }
  return found;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = puppeteer
      .launch({
        executablePath: findChrome(),
        // Headless by default. Set PERCHANCE_HEADLESS=0 to open a visible
        // Chrome window (e.g. to solve a one-time Cloudflare challenge).
        headless: process.env.PERCHANCE_HEADLESS === '0' ? false : true,
        userDataDir: PROFILE_DIR,
        args: [
          '--no-sandbox',
          '--disable-blink-features=AutomationControlled',
          '--window-size=1280,900',
          '--lang=en-US',
        ],
        defaultViewport: null,
      })
      .catch((err) => {
        browserPromise = null;
        throw err;
      });
  }
  return browserPromise;
}

export async function closeSession(): Promise<void> {
  if (!browserPromise) return;
  const browser = await browserPromise.catch(() => null);
  browserPromise = null;
  if (browser) await browser.close().catch(() => {});
}

function makeJobKey(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 20; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

async function pollResult(key: string, timeoutMs: number): Promise<JobResult> {
  const url = `${RESULT_BASE_URL}/${key}`;
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        return (await res.json()) as JobResult;
      }
    } catch {
      // not ready yet, keep polling
    }
    await wait(4000);
  }
  throw new Error('Timed out waiting for the generated image.');
}

async function detectBlocked(page: Page): Promise<string | null> {
  const title = await page.title().catch(() => '');
  if (
    title.toLowerCase().includes('just a moment') ||
    title.toLowerCase().includes('un instant') ||
    title.toLowerCase().includes('verify you are human') ||
    title.toLowerCase().includes('attention required')
  ) {
    return 'Blocked by Cloudflare. Automated access to the generator is currently unavailable.';
  }
  const hasChallenge = await page
    .evaluate(() => document.querySelector('iframe[src*="challenges.cloudflare.com"]') !== null)
    .catch(() => false);
  if (hasChallenge) {
    return 'Blocked by Cloudflare. If a Chrome window opened, solve the "Verify you are human" challenge once so the session is saved, then retry.';
  }
  return null;
}

export async function generateImage(
  params: GenerateImageParams
): Promise<GenerateImageResult> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36'
  );
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  const url = new URL(GENERATOR_URL);
  url.searchParams.set('api', '1');
  url.searchParams.set('prompt', params.prompt);
  url.searchParams.set('resolution', params.resolution || DEFAULT_RESOLUTION);
  url.searchParams.set(
    'seed',
    typeof params.seed === 'number' ? String(params.seed) : '-1'
  );
  if (params.negativePrompt) {
    url.searchParams.set('negative', params.negativePrompt);
  }
  const key = makeJobKey();
  url.searchParams.set('key', key);

  try {
    await page.goto(url.toString(), {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    });

    // Cloudflare may show a transient "Just a moment" interstitial that
    // auto-solves itself within a few seconds. Give it up to 60s to pass
    // before concluding the session is blocked.
    const challengeDeadline = Date.now() + 60000;
    let blocked = await detectBlocked(page);
    while (blocked && Date.now() < challengeDeadline) {
      await wait(3000);
      blocked = await detectBlocked(page);
    }
    if (blocked) throw new Error(blocked);

    const job = await pollResult(key, 180000);

    if (!job || job.success !== true || !job.imageUrl) {
      throw new Error(job?.error || 'Image generation failed.');
    }

    const imgRes = await fetch(job.imageUrl, { cache: 'no-store' });
    if (!imgRes.ok) {
      throw new Error('Could not download the generated image.');
    }
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const mimeType = imgRes.headers.get('content-type') || 'image/jpeg';
    return {
      dataUrl: `data:${mimeType};base64,${buffer.toString('base64')}`,
      mimeType,
    };
  } finally {
    await page.close().catch(() => {});
  }
}