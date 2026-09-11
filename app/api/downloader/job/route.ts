import { NextRequest, NextResponse } from 'next/server';
import { downloaderHeaders, downloaderUrl, isDownloaderConfigured } from '../helpers';

export async function GET(req: NextRequest) {
  if (!isDownloaderConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'missing id' }, { status: 400 });
  }

  try {
    const res = await fetch(`${downloaderUrl()}/v2/downloads/${encodeURIComponent(id)}`, {
      headers: downloaderHeaders(),
      signal: AbortSignal.timeout(30_000),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data ?? { error: 'bad response' }, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'service_unavailable' }, { status: 502 });
  }
}