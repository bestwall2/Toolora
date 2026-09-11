const API_URL = process.env.DOWNLOADER_API_URL?.trim().replace(/\/+$/, '') || '';
const FRONTEND_SECRET = process.env.DOWNLOADER_FRONTEND_SECRET || '';
const API_KEY = process.env.DOWNLOADER_API_KEY || '';

export function isDownloaderConfigured(): boolean {
  return API_URL.length > 0;
}

export function downloaderUrl(): string {
  return API_URL;
}

export function downloaderHeaders(extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = { ...extra };
  if (FRONTEND_SECRET) headers['X-Frontend-Key'] = FRONTEND_SECRET;
  if (API_KEY) headers['X-API-Key'] = API_KEY;
  return headers;
}