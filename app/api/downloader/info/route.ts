import { NextRequest, NextResponse } from 'next/server';
import { downloaderHeaders, downloaderUrl, isDownloaderConfigured } from '../helpers';

export async function GET(req: NextRequest) {
  if (!isDownloaderConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'missing url' }, { status: 400 });
  }

  if (!/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 });
  }

  try {
    const res = await fetch(`${downloaderUrl()}/v2/media/info?url=${encodeURIComponent(url)}`, {
      headers: downloaderHeaders(),
      signal: AbortSignal.timeout(60_000),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data ?? { error: 'bad response' }, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'service_unavailable' }, { status: 502 });
  }
}