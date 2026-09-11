import { NextRequest, NextResponse } from 'next/server';
import { downloaderHeaders, downloaderUrl, isDownloaderConfigured } from '../helpers';

export async function POST(req: NextRequest) {
  if (!isDownloaderConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const url = String(body.url ?? '').trim();

  if (!url || !/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 });
  }

  const payload: Record<string, unknown> = {
    url,
    kind: body.kind === 'audio' ? 'audio' : 'video',
  };
  if (typeof body.quality === 'string' && body.quality) payload.quality = body.quality;
  if (typeof body.format === 'string' && body.format) payload.format = body.format;

  try {
    const res = await fetch(`${downloaderUrl()}/v2/downloads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...downloaderHeaders() },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(60_000),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data ?? { error: 'bad response' }, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'service_unavailable' }, { status: 502 });
  }
}