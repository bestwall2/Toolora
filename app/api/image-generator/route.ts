import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/server/perchance';

export const runtime = 'nodejs';
export const maxDuration = 180;

const MAX_PROMPT_LENGTH = 4000;
const MAX_RESOLUTIONS = ['512x512', '512x768', '768x512', '768x768'];

export async function POST(request: NextRequest) {
  let body: {
    prompt?: string;
    negativePrompt?: string;
    seed?: number;
    resolution?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const prompt = (body.prompt ?? '').trim();
  if (!prompt) {
    return NextResponse.json(
      { error: 'A prompt is required.' },
      { status: 400 }
    );
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json(
      { error: `Prompt too long (max ${MAX_PROMPT_LENGTH} characters).` },
      { status: 400 }
    );
  }

  const negativePrompt = (body.negativePrompt ?? '').trim();
  const resolution = body.resolution && MAX_RESOLUTIONS.includes(body.resolution)
    ? body.resolution
    : '512x512';
  const seed =
    typeof body.seed === 'number' && Number.isInteger(body.seed) && body.seed >= 0
      ? body.seed
      : undefined;

  try {
    const result = await generateImage({
      prompt,
      negativePrompt: negativePrompt || undefined,
      seed,
      resolution,
    });
    return NextResponse.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Image generation failed.';
    console.error('[image-generator]', message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}