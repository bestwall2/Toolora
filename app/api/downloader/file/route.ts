import { NextRequest, NextResponse } from 'next/server';
import { downloaderHeaders, downloaderUrl, isDownloaderConfigured } from '../helpers';

export async function GET(req: NextRequest) {
  if (!isDownloaderConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const file = req.nextUrl.searchParams.get('file');
  if (!file) {
    return NextResponse.json({ error: 'missing file' }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${downloaderUrl()}/v2/files/${encodeURIComponent(file)}`, {
      headers: downloaderHeaders(),
      signal: AbortSignal.timeout(120_000),
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: 'file_not_found' }, { status: upstream.status });
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/octet-stream',
        'Content-Disposition': upstream.headers.get('content-disposition') || `attachment; filename="${file}"`,
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'service_unavailable' }, { status: 502 });
  }
}