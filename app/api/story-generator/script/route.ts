import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-3.6-flash';
const API_KEY = process.env.GEMINI_API_KEY;

const MOODS: Record<string, string> = {
  story: 'an engaging short story',
  educational: 'a clear, factual educational narration',
  inspirational: 'an uplifting, motivational narration',
  adventure: 'an exciting adventure narration',
};

function clean(text: string): string {
  return text.replace(/```json/gi, '').replace(/```/g, '').replace(/^[^{]*/, '').replace(/[^}]*$/, '');
}

function parseJsonRobust(raw: string): Record<string, unknown> {
  const cleaned = clean(raw.trim());
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end <= start) throw new Error('The AI returned an unreadable script. Please try again.');
  const body = cleaned.slice(start, end + 1);

  const attempt = (candidate: string): Record<string, unknown> | null => {
    try {
      const parsed = JSON.parse(candidate) as Record<string, unknown>;
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  };

  const complete = attempt(body);
  if (complete) return complete;

  // The output may have been truncated mid-JSON. Walk back over each
  // closed object and try re-closing the structure with extra brackets.
  let idx = body.lastIndexOf('}');
  let guard = 0;
  while (idx > 0 && guard < 40) {
    const prefix = body.slice(0, idx + 1);
    const closers = ['}', ']}', ']}]', ']}]}', ']}]}]'];
    for (const closer of closers) {
      const fixed = attempt(prefix + closer);
      if (fixed) return fixed;
    }
    idx = body.lastIndexOf('}', idx - 1);
    guard++;
  }

  const trimmed = attempt(body.replace(/,\s*$/, ''));
  if (trimmed) return trimmed;

  throw new Error('The AI returned an unreadable script. Please try again.');
}

function parseScript(raw: string): { title: string; scenes: { narration: string; imagePrompt: string }[] } {
  const data = parseJsonRobust(raw);
  const rawScenes = Array.isArray(data.scenes) ? data.scenes : [];
  const scenes = rawScenes
    .slice(0, 6)
    .map((s: unknown) => {
      if (!s || typeof s !== 'object') return null;
      const scene = s as Record<string, unknown>;
      const narration = typeof scene.narration === 'string' ? scene.narration.trim() : '';
      const imagePrompt = typeof scene.imagePrompt === 'string' ? scene.imagePrompt.trim() : '';
      if (!narration || !imagePrompt) return null;

      return { narration: narration.slice(0, 400), imagePrompt: imagePrompt.slice(0, 400) };
    })
    .filter((s): s is { narration: string; imagePrompt: string } => s !== null);

  if (scenes.length === 0) {
    throw new Error('The AI did not produce any scenes. Please try again.');
  }

  return { title: typeof data.title === 'string' ? data.title.trim().slice(0, 120) : 'My Story Video', scenes };
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const topic = typeof body?.topic === 'string' ? body.topic.trim() : '';
  if (!topic) {
    return NextResponse.json({ error: 'A topic is required.' }, { status: 400 });
  }

  const sceneCount = Math.min(6, Math.max(3, Math.round(Number(body.sceneCount)) || 5));
  const lang = typeof body.lang === 'string' && /^[a-z]{2}/i.test(body.lang) ? body.lang.slice(0, 2) : 'en';
  const mood = typeof body.mood === 'string' ? body.mood : 'story';
  const moodLine = MOODS[mood] ?? MOODS.story;

  const prompt = `You are a video scriptwriter for a short AI video made of still images with narration.

The user gives you a topic and a mood. Produce a plan for a video with exactly ${sceneCount} scenes.

Return ONLY valid JSON with this exact shape (no markdown, no comments, no trailing commas, no text before or after the JSON object):
{
  "title": "Short video title",
  "scenes": [
    {
      "narration": "Narration sentence for scene 1",
      "imagePrompt": "Image prompt for scene 1"
    }
  ]
}

Rules:
- Topic: "${topic}"
- Mood: ${moodLine}
- The video must have exactly ${sceneCount} scenes.
- Each "narration" must be 1 to 2 sentences spoken by a narrator, written in the language code "${lang}". Keep it between 10 and 35 words.
- Each "imagePrompt" must be in English (even when narration is not), 15 to 40 words, vivid and cinematic: describe subject, composition, lighting, style and mood. No on-image text, no watermarks, no words burned into the picture.
- The scenes must flow as one coherent story that fits the mood.
- The whole video should last about 20 to 40 seconds.`;

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'The AI service is not configured yet (missing GEMINI_API_KEY). Please set it in the environment.' },
      { status: 500 }
    );
  }

  try {
    const generationConfig = {
      temperature: 0.9,
      maxOutputTokens: 4096,
      responseMimeType: 'application/json',
    };

    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });

    let upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: AbortSignal.timeout(55_000),
      }
    );

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '');
      let message = `The AI service replied with HTTP ${upstream.status}.`;
      try {
        const data = JSON.parse(text);
        if (data?.error?.message) message = data.error.message;
      } catch {
        if (text) message = `${message} ${text.slice(0, 300)}`;
      }
      return NextResponse.json({ error: message }, { status: 502 });
    }

    let data = await upstream.json();

    // If the response was cut off (max tokens), retry once with a larger budget.
    if (data?.candidates?.[0]?.finishReason === 'MAX_TOKENS') {
      const retryConfig = { ...generationConfig, maxOutputTokens: 8192 };
      upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: retryConfig }),
          signal: AbortSignal.timeout(55_000),
        }
      );
      if (upstream.ok) data = await upstream.json();
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'The AI returned an empty script. Please try again.' }, { status: 502 });
    }

    const script = parseScript(text);
    return NextResponse.json(script);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Script generation failed.';
    console.error('story-generator script error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}