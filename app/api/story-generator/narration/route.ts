import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_LANGS = new Set(['en', 'ar', 'fr', 'es', 'de', 'pt', 'hi', 'ja', 'zh', 'it', 'ru']);

export function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get('text') ?? '';
  const lang = (request.nextUrl.searchParams.get('lang') ?? 'en').toLowerCase().slice(0, 2);
  const trimmed = text.trim();

  if (!trimmed) {
    return NextResponse.json({ error: 'A text parameter is required.' }, { status: 400 });
  }
  if (trimmed.length > 500) {
    return NextResponse.json({ error: 'Text is too long (max 500 characters).' }, { status: 400 });
  }
  if (!ALLOWED_LANGS.has(lang)) {
    return NextResponse.json({ error: `Unsupported language "${lang}".` }, { status: 400 });
  }

  const url =
    `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(trimmed)}` +
    `&tl=${lang}&total=1&idx=0&textlen=${trimmed.length}`;

  return fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Referer: 'https://translate.google.com/',
      Accept: 'audio/webm,audio/mpeg,audio/*;q=0.9',
    },
    signal: AbortSignal.timeout(15_000),
  })
    .then(async (upstream) => {
      if (!upstream.ok) {
        const detail = (await upstream.text().catch(() => ''))?.slice(0, 300);
        return NextResponse.json(
          { error: `The text-to-speech service replied with HTTP ${upstream.status}.`, detail },
          { status: 502 }
        );
      }
      const contentType = upstream.headers.get('content-type') ?? 'audio/mpeg';
      const buffer = Buffer.from(await upstream.arrayBuffer());
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400',
        },
      });
    })
    .catch(() => NextResponse.json({ error: 'Text-to-speech failed. Please try again.' }, { status: 500 }));
}