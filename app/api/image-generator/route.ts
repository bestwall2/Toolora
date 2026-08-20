import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://imgaigenerator.sujjdkjsnjqnjzz.workers.dev/';
const TOKEN = process.env.IMAGE_GEN_TOKEN ?? 'XP';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.prompt !== 'string' || !body.prompt.trim()) {
    return NextResponse.json({ error: 'A prompt is required.' }, { status: 400 });
  }

  const payload: Record<string, string> = { prompt: body.prompt.trim() };

  try {
    const upstream = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN ?? ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(120_000),
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '');
      return NextResponse.json(
        { error: `The image service replied with HTTP ${upstream.status}.`, detail: text.slice(0, 500) },
        { status: 502 }
      );
    }

    const contentType = upstream.headers.get('content-type') ?? 'application/octet-stream';
    const buffer = Buffer.from(await upstream.arrayBuffer());
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
        'X-Image-Length': String(buffer.length),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed.' },
      { status: 500 }
    );
  }
}