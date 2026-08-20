import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://imgaigenerator.sujjdkjsnjqnzjj.workers.dev/';
const TOKEN = process.env.IMAGE_GEN_TOKEN ?? 'XP';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.prompt !== 'string' || !body.prompt.trim()) {
    return NextResponse.json({ error: 'A prompt is required.' }, { status: 400 });
  }

  const payload: Record<string, unknown> = { prompt: body.prompt.trim() };
  if (typeof body.negative_prompt === 'string' && body.negative_prompt.trim()) {
    payload.negative_prompt = body.negative_prompt.trim();
  }
  const width = Number(body.width);
  const height = Number(body.height);
  if (Number.isFinite(width) && width > 0) payload.width = width;
  if (Number.isFinite(height) && height > 0) payload.height = height;
  const seed = Number(body.seed);
  if (body.seed !== undefined && body.seed !== '' && body.seed !== '-1' && Number.isFinite(seed)) {
    payload.seed = seed;
  }

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
      let message = `The image service replied with HTTP ${upstream.status}.`;
      try {
        const data = JSON.parse(text);
        if (data?.error) message = data.error;
        if (data?.details) message = `${message} ${data.details}`;
      } catch {
        if (text) message = `${message} ${text.slice(0, 300)}`;
      }
      return NextResponse.json({ error: message }, { status: 502 });
    }

    const contentType = upstream.headers.get('content-type') ?? '';
    if (!contentType.startsWith('image/')) {
      const text = await upstream.text().catch(() => '');
      return NextResponse.json(
        {
          error: 'The image service returned an invalid response. Please try again in a moment.',
          detail: text.slice(0, 500),
        },
        { status: 502 }
      );
    }

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