'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Download, Plus, X, RefreshCcw, Square, ChevronDown, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToolLabels } from '@/components/i18n/LocaleProvider';
import { trackEvent } from '@/lib/analytics';

interface Scene {
  narration: string;
  imagePrompt: string;
  imageUrl?: string;
  audioUrl?: string;
}

interface Script {
  title: string;
  scenes: Scene[];
}

type Phase = 'script' | 'prepare' | 'record' | 'done';

interface ScenePlan {
  image?: HTMLImageElement;
  duration: number;
  zoomIn: boolean;
  panX: number;
  panY: number;
}

const MOODS = ['story', 'educational', 'inspirational', 'adventure'] as const;

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
];

const ASPECTS = ['16:9', '1:1', '9:16'] as const;
const QUALITIES = ['480', '720', '1080'] as const;
const DURATION_MODES = ['auto', '3', '4', '5'] as const;

const IMAGE_MODELS = [
  { id: '@cf/bytedance/stable-diffusion-xl-lightning', label: 'SDXL Lightning (fast)' },
  { id: '@cf/stabilityai/stable-diffusion-xl-base-1.0', label: 'SDXL Base 1.0' },
  { id: '@cf/blackforestlabs/ux-1-schnell', label: 'Flux 1 Schnell' },
];

function canvasDims(aspect: string, quality: string): [number, number] {
  const long = quality === '1080' ? 1080 : quality === '720' ? 720 : 480;
  if (aspect === '9:16') return [Math.round((long * 9) / 16), long];
  if (aspect === '1:1') return [long, long];
  return [long, Math.round((long * 9) / 16)];
}

function imageDims(aspect: string): [number, number] {
  if (aspect === '9:16') return [432, 768];
  if (aspect === '1:1') return [768, 768];
  return [768, 432];
}

function pickMimeType(): string {
  const candidates = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4'];
  for (const c of candidates) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(c)) return c;
  }
  return '';
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function createAmbientBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const frames = Math.max(1, Math.ceil(sr * seconds));
  const buf = ctx.createBuffer(2, frames, sr);
  const chords: number[][] = [
    [220.0, 261.63, 329.63, 440.0],
    [174.61, 220.0, 261.63, 349.23],
    [196.0, 246.94, 293.66, 392.0],
    [130.81, 196.0, 261.63, 329.63],
  ];
  const attack = sr * 1.2;
  const release = sr * 1.6;
  const bar = sr * 5;
  const totalBars = Math.max(1, Math.ceil(frames / bar));
  for (let c = 0; c < totalBars; c++) {
    const freqs = chords[c % chords.length];
    const barStart = c * bar;
    for (let k = 0; k < freqs.length; k++) {
      const f = freqs[k];
      const strength = 0.14 - k * 0.013;
      for (let ch = 0; ch < 2; ch++) {
        const data = buf.getChannelData(ch);
        for (let s = 0; s < bar; s++) {
          const idx = barStart + s;
          if (idx >= frames) break;
          const t = s / sr;
          const env = Math.min(1, s / attack) * Math.min(1, Math.max(0, (bar - s) / release));
          const v =
            Math.sin(2 * Math.PI * f * t) * 0.75 +
            Math.sin(2 * Math.PI * f * 2.01 * t) * 0.16 +
            Math.sin(2 * Math.PI * f * 0.5 * t) * 0.3;
          data[idx] += v * env * strength;
        }
      }
    }
  }
  let peak = 0.0001;
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < frames; i++) peak = Math.max(peak, Math.abs(data[i]));
  }
  const norm = peak > 0.0001 ? 0.5 / peak : 1;
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < frames; i++) data[i] *= norm;
  }
  return buf;
}

export function StoryVideoGenerator() {
  const L = useToolLabels('story-video-generator');

  const [topic, setTopic] = useState('');
  const [mood, setMood] = useState<(typeof MOODS)[number]>('story');
  const [lang, setLang] = useState('en');
  const [sceneCount, setSceneCount] = useState(5);

  const [script, setScript] = useState<Script | null>(null);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  const [phase, setPhase] = useState<Phase>('script');
  const [progressMsg, setProgressMsg] = useState('');
  const [recordScene, setRecordScene] = useState(0);
  const [recordTotal, setRecordTotal] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [aspect, setAspect] = useState('16:9');
  const [quality, setQuality] = useState('720');
  const [durationMode, setDurationMode] = useState<(typeof DURATION_MODES)[number]>('auto');
  const [captions, setCaptions] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const [musicVolume, setMusicVolume] = useState(0.16);
  const [narrationOn, setNarrationOn] = useState(true);
  const [narrationRate, setNarrationRate] = useState(1);
  const [imageModel, setImageModel] = useState(IMAGE_MODELS[0].id);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cancelRef = useRef(false);
  const recordSceneRef = useRef(0);
  const scriptRef = useRef<Script | null>(null);
  useEffect(() => {
    scriptRef.current = script;
  }, [script]);

  const F = {
    topic,
    mood,
    lang,
    sceneCount,
    aspect,
    captions,
    animate,
    musicOn,
    musicVolume,
    narrationOn,
    narrationRate,
    durationMode,
    quality,
    imageModel,
  };

  const replaceToken = (tpl: string, cur: number, total: number) =>
    tpl.replace(/\{cur\}/g, String(cur)).replace(/\{total\}/g, String(total));

  const generateScript = async () => {
    if (!topic.trim() || scriptLoading) return;
    setScriptLoading(true);
    setScriptError(null);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
    try {
      const res = await fetch('/api/story-generator/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), mood, lang, sceneCount }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || L.scriptError);
      if (typeof data?.scenes !== 'undefined') setScript(data);
      else throw new Error(L.scriptError);
    } catch (e) {
      setScriptError(e instanceof Error ? e.message : L.scriptError);
    } finally {
      setScriptLoading(false);
    }
  };

  const updateScene = (i: number, patch: Partial<Scene>) => {
    setScript((s) => {
      if (!s) return s;
      const scenes = s.scenes.map((sc, idx) => (idx === i ? { ...sc, ...patch } : sc));
      return { ...s, scenes };
    });
  };

  const removeScene = (i: number) => {
    setScript((s) => (s ? { ...s, scenes: s.scenes.filter((_, idx) => idx !== i) } : s));
  };

  const addScene = () => {
    setScript((s) =>
      s
        ? { ...s, scenes: [...s.scenes, { narration: '', imagePrompt: '' }] }
        : s
    );
  };

  const generateImages = async (scriptsForUse: Script) => {
    const [iw, ih] = imageDims(F.aspect);
    const results: (string | undefined)[] = new Array(scriptsForUse.scenes.length).fill(undefined);
    let done = 0;
    const queue = scriptsForUse.scenes.map((_, i) => i);
    const worker = async () => {
      while (queue.length && !cancelRef.current) {
        const i = queue.shift() as number;
        const scene = scriptsForUse.scenes[i];
        setProgressMsg(replaceToken(L.generatingScene, done + 1, scriptsForUse.scenes.length));
        try {
          const res = await fetch('/api/image-generator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: scene.imagePrompt.trim(),
              width: iw,
              height: ih,
              model: F.imageModel,
            }),
          });
          if (!res.ok) continue;
          const blob = await res.blob();
          results[i] = URL.createObjectURL(blob);
        } catch {
          /* keep scene without image */
        }
        done++;
      }
    };
    await Promise.all([worker(), worker()]);
    return results;
  };

  const loadNarration = async (scriptsForUse: Script) => {
    for (let i = 0; i < scriptsForUse.scenes.length; i++) {
      if (cancelRef.current) return;
      const scene = scriptsForUse.scenes[i];
      if (!scene.narration.trim()) continue;
      setProgressMsg(replaceToken(L.loadingNarration, i + 1, scriptsForUse.scenes.length));
      try {
        const res = await fetch(
          `/api/story-generator/narration?text=${encodeURIComponent(scene.narration)}&lang=${F.lang}`
        );
        if (!res.ok) continue;
        const blob = await res.blob();
        scene.audioUrl = URL.createObjectURL(blob);
      } catch {
        /* scene simply plays without narration */
      }
    }
  };

  const createVideo = async () => {
    if (!script || script.scenes.length === 0) return;
    cancelRef.current = false;
    setPhase('prepare');
    setProgressMsg('');

    const imagesUrl = await generateImages(script);
    if (cancelRef.current) {
      setPhase('script');
      return;
    }
    script.scenes.forEach((scene, i) => {
      const url = imagesUrl[i];
      if (url) scene.imageUrl = url;
    });

    if (F.narrationOn) await loadNarration(script);

    if (cancelRef.current) {
      setPhase('script');
      return;
    }
    startRecording();
    trackEvent('tool_used', { tool: 'story-video-generator', aspect: F.aspect, lang: F.lang });
  };

  const drawScene = (
    ctx: CanvasRenderingContext2D,
    W: number,
    H: number,
    plans: ScenePlan[],
    elapsedMs: number
  ) => {
    ctx.fillStyle = '#0b0f1a';
    ctx.fillRect(0, 0, W, H);

    let acc = 0;
    let idx = 0;
    let local = elapsedMs;
    for (let i = 0; i < plans.length; i++) {
      const end = acc + plans[i].duration * 1000;
      if (elapsedMs < end || i === plans.length - 1) {
        idx = i;
        local = clamp(elapsedMs - acc, 0, plans[i].duration * 1000);
        break;
      }
      acc = end;
    }

    const plan = plans[idx];
    const progress = clamp(local / (plan.duration * 1000), 0, 1);
    const fadeOutStart = (plan.duration - 0.45) * 1000;
    const alpha = local > fadeOutStart ? clamp(1 - (local - fadeOutStart) / 450, 0, 1) : 1;
    ctx.globalAlpha = alpha;
    if (recordSceneRef.current !== idx + 1) {
  recordSceneRef.current = idx + 1;
  setRecordScene(idx + 1);
}

    if (plan.image) {
      const scale = F.animate
        ? plan.zoomIn
          ? 1.05 + 0.14 * progress
          : 1.2 - 0.14 * progress
        : 1.15;
      const px = plan.panX * 0.03;
      const py = plan.panY * 0.03;
      const ir = plan.image.naturalWidth / Math.max(1, plan.image.naturalHeight);
      const cr = W / H;
      let dw: number, dh: number;
      if (ir > cr) {
        dh = H / scale;
        dw = dh * ir;
      } else {
        dw = W / scale;
        dh = dw / ir;
      }
      const dx = (W - dw) / 2 + px * (dw - W) * (progress * 2 - 1);
      const dy = (H - dh) / 2 + py * (dh - H) * (progress * 2 - 1);
      ctx.drawImage(plan.image, dx, dy, dw, dh);
    } else {
      const grad = ctx.createLinearGradient(0, 0, W * 0.3, H);
      grad.addColorStop(0, '#1e2a4a');
      grad.addColorStop(1, '#0b0f1a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      const center = progress * 1.4;
      ctx.beginPath();
      ctx.arc(W * center, H * 0.42, Math.min(W, H) * 0.12, 0, Math.PI * 2);
      ctx.fill();
    }

    if (F.captions && plan.image) {
      const scene = { narration: scriptRef.current?.scenes[idx]?.narration ?? '' };
      if (scene.narration.trim()) {
        const words = scene.narration.split(/\s+/).filter(Boolean);
        const revealCount = Math.max(1, Math.min(words.length, Math.ceil(words.length * clamp(progress * 1.25, 0, 1))));
        const visible = words.slice(0, revealCount).join(' ');
        const fontSize = Math.round(H * 0.045);
        const font = `600 ${fontSize}px 'Inter', system-ui, -apple-system, sans-serif`;
        ctx.font = font;
        const maxW = W * 0.84;
        const lines = wrapText(ctx, visible, maxW);
        const lineHeight = fontSize * 1.3;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const padX = fontSize * 0.9;
        const padY = fontSize * 0.4;
        const barW = Math.min(W * 0.92, maxW + padX * 2);
        const barH = lines.length * lineHeight + padY * 2;
        const barX = (W - barW) / 2;
        const barY = H * 0.78 - barH / 2;
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.beginPath();
        const r = fontSize * 0.5;
        ctx.roundRect(barX, barY, barW, barH, r);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shadowBlur = 6;
        lines.forEach((line, j) => {
          ctx.fillText(line, W / 2, barY + padY + lineHeight * (j + 0.5));
        });
        ctx.shadowBlur = 0;
      }
    }
    ctx.globalAlpha = 1;
  };

  const startRecording = async () => {
    if (!script || script.scenes.length === 0) return;
    setPhase('record');
    setProgressMsg(L.recording);
    const canvas = canvasRef.current;
    if (!canvas) {
      setPhase('script');
      return;
    }

    const [W, H] = canvasDims(F.aspect, F.quality);
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#0b0f1a';
    ctx.fillRect(0, 0, W, H);

    recordSceneRef.current = 0;
    setRecordScene(1);
    setRecordTotal(script.scenes.length);

    const imgElements: (HTMLImageElement | undefined)[] = script.scenes.map((scene) => {
      if (!scene.imageUrl) return undefined;
      const img = new Image();
      img.src = scene.imageUrl;
      return img;
    });
    await Promise.all(
      imgElements
        .filter((x): x is HTMLImageElement => !!x)
        .map((img) => new Promise<void>((resolve) => { img.onload = () => resolve(); img.onerror = () => resolve(); }))
    );

    const minDur = F.durationMode === 'auto' ? 4.5 : Number(F.durationMode);
    const plans: ScenePlan[] = [];
    let totalMs = 0;

    for (let i = 0; i < script.scenes.length; i++) {
      const scene = script.scenes[i];
      let dur = minDur;

      if (F.narrationOn && scene.audioUrl) {
        try {
          const actx = new AudioContext();
          const abRes = await fetch(scene.audioUrl);
          const abArr = await abRes.arrayBuffer();
          const ab = await actx.decodeAudioData(abArr);
          dur = Math.max(minDur, ab.duration + 0.55);
          await actx.close();
        } catch {
          /* use default minDur */
        }
      }
      plans.push({
        image: imgElements[i],
        duration: dur,
        zoomIn: Math.random() > 0.5,
        panX: (Math.random() - 0.5) * 2,
        panY: (Math.random() - 0.5) * 2,
      });
      totalMs += dur * 1000;
    }

    let actx: AudioContext | null = null;
    let audioDest: MediaStreamAudioDestinationNode | null = null;
    const narrationSources: AudioBufferSourceNode[] = [];

    actx = new AudioContext();
    if (actx.state === 'suspended') await actx.resume();
    audioDest = actx.createMediaStreamDestination();
    const masterGain = actx.createGain();
    masterGain.gain.value = 0.92;
    masterGain.connect(actx.destination);
    masterGain.connect(audioDest);

    const offsetMs = 400;
    const offsetSec = offsetMs / 1000;
    const baseTime = actx.currentTime + offsetSec;

    if (F.narrationOn) {
      let timeCursor = 0;
      for (let i = 0; i < script.scenes.length; i++) {
        const scene = script.scenes[i];
        if (!scene.audioUrl) { timeCursor += plans[i].duration * 1000; continue; }
        try {
          const abRes = await fetch(scene.audioUrl);
          const abArr = await abRes.arrayBuffer();
          const ab = await actx.decodeAudioData(abArr);
          const src = actx.createBufferSource();
          src.buffer = ab;
          src.playbackRate.value = F.narrationRate;
          const gainNode = actx.createGain();
          gainNode.gain.value = 0.88;
          src.connect(gainNode);
          gainNode.connect(masterGain);
          src.start(baseTime + timeCursor / 1000);
          narrationSources.push(src);
        } catch {
          /* skip */
        }
        timeCursor += plans[i].duration * 1000;
      }
    }

    let musicSource: AudioBufferSourceNode | null = null;
    let musicGainNode: GainNode | null = null;
    if (F.musicOn && actx) {
      const ambBuf = createAmbientBuffer(actx, totalMs / 1000 + 1);
      musicSource = actx.createBufferSource();
      musicSource.buffer = ambBuf;
      musicSource.loop = true;
      musicGainNode = actx.createGain();
      musicGainNode.gain.value = F.musicVolume;
      musicSource.connect(musicGainNode);
      musicGainNode.connect(masterGain);
      musicSource.start(baseTime);
    }

    const stream = new MediaStream();
    const canvasStream = canvas.captureStream(30);
    stream.addTrack(canvasStream.getVideoTracks()[0]);
    if (audioDest) stream.addTrack(audioDest.stream.getAudioTracks()[0]);

    const mimeType = pickMimeType();
    const recorder = new MediaRecorder(stream, {
      mimeType: mimeType || undefined,
      videoBitsPerSecond: 5_500_000,
    });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: recorder.mimeType || 'video/webm' });
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      setVideoUrl(URL.createObjectURL(blob));
      setPhase('done');
      actx?.close();
      trackEvent('tool_used', { tool: 'story-video-generator', scenes: script.scenes.length });
    };

    recorder.start(250);

    const t0 = performance.now() + offsetMs;

    const loop = (now: number) => {
      if (cancelRef.current) { try { recorder.stop(); } catch {} return; }
      const elapsed = now - t0;
      drawScene(ctx, W, H, plans, elapsed);
      if (elapsed >= totalMs + 600) {
        try { recorder.stop(); } catch {}
        return;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };

  const stopRecording = () => {
    cancelRef.current = true;
  };

  const resetAll = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
    setScript(null);
    setPhase('script');
    setProgressMsg('');
    setRecordScene(0);
    setRecordTotal(0);
    scriptRef.current = null;
    cancelRef.current = false;
  };

  const moodLabel = (m: string) => {
    const map: Record<string, string> = { story: L.moodStory, educational: L.moodEducational, inspirational: L.moodInspirational, adventure: L.moodAdventure };
    return map[m] || m;
  };

  const isRecording = phase === 'record';
  const isPrepare = phase === 'prepare';
  const isDone = phase === 'done';
  const isScript = phase === 'script';
  const fieldInput =
    'w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary';

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        {isScript && (
          <>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.topic}</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={L.topicPlaceholder}
                rows={3}
                maxLength={800}
                className={`${fieldInput} resize-y`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.mood}</label>
                <select value={mood} onChange={(e) => setMood(e.target.value as typeof mood)} className={fieldInput}>
                  {MOODS.map((m) => <option key={m} value={m}>{moodLabel(m)}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.language}</label>
                <select value={lang} onChange={(e) => setLang(e.target.value)} className={fieldInput}>
                  {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.sceneCount}</label>
                <select value={sceneCount} onChange={(e) => setSceneCount(Number(e.target.value))} className={fieldInput}>
                  {[3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </>
        )}

        {isScript && !showAdvanced && (
          <button
            type="button"
            onClick={() => setShowAdvanced(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
            {L.advanced}
          </button>
        )}

        {showAdvanced && isScript && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/60">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.aspectRatio}</label>
              <select value={aspect} onChange={(e) => setAspect(e.target.value)} className={fieldInput}>
                {ASPECTS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.quality}</label>
              <select value={quality} onChange={(e) => setQuality(e.target.value)} className={fieldInput}>
                {QUALITIES.map((q) => <option key={q} value={q}>{q}p</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.sceneDuration}</label>
              <select value={durationMode} onChange={(e) => setDurationMode(e.target.value as typeof durationMode)} className={fieldInput}>
                {DURATION_MODES.map((d) => <option key={d} value={d}>{d === 'auto' ? L.durationAuto : d}</option>)}
              </select>
            </div>
            <div className="space-y-1.5 sm:col-span-3">
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">{L.model}</label>
              <select value={imageModel} onChange={(e) => setImageModel(e.target.value)} className={fieldInput}>
                {IMAGE_MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </div>
            <div className="sm:col-span-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground pt-1">
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={captions} onChange={(e) => setCaptions(e.target.checked)} className="rounded" />
                {L.captions}
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={animate} onChange={(e) => setAnimate(e.target.checked)} className="rounded" />
                {L.animation}
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={narrationOn} onChange={(e) => setNarrationOn(e.target.checked)} className="rounded" />
                {L.narrate}
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input type="checkbox" checked={musicOn} onChange={(e) => setMusicOn(e.target.checked)} className="rounded" />
                {L.music}
              </label>
              {narrationOn && (
                <label className="inline-flex items-center gap-1.5">
                  {L.speed}:
                  <input
                    type="number"
                    min={0.7}
                    max={1.3}
                    step={0.05}
                    value={narrationRate}
                    onChange={(e) => setNarrationRate(Number(e.target.value))}
                    className="w-16 px-2 py-0.5 rounded border border-border bg-background text-foreground"
                  />
                </label>
              )}
              {musicOn && (
                <label className="inline-flex items-center gap-1.5">
                  {L.volume}:
                  <input
                    type="range"
                    min={0}
                    max={0.5}
                    step={0.02}
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(Number(e.target.value))}
                    className="w-24"
                  />
                </label>
              )}
            </div>
          </div>
        )}

        {isScript && scriptError && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-xs text-destructive">{scriptError}</div>
        )}

        {isScript && (
          <div className="flex flex-wrap gap-2 pt-1">
            <Button onClick={generateScript} disabled={!topic.trim()} loading={scriptLoading} icon={<Sparkles className="w-4 h-4" />}>
              {scriptLoading ? L.generatingScript : L.generateScript}
            </Button>
          </div>
        )}
      </div>

      {script && (isScript || isPrepare || isRecording) && (
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <input
            type="text"
            value={script.title}
            onChange={(e) => setScript((s) => (s ? { ...s, title: e.target.value } : s))}
            className="w-full px-0 py-1 text-lg font-bold bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
            placeholder={L.title}
          />
          {script.scenes.map((scene, i) => (
            <div key={i} className="rounded-xl border border-border/70 p-3 bg-background/60 space-y-2">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{L.scene} {i + 1}</span>
                {isScript && script.scenes.length > 2 && (
                  <button onClick={() => removeScene(i)} className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer" title={L.removeScene}>
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {isScript && (
                <>
                  <textarea
                    value={scene.narration}
                    onChange={(e) => updateScene(i, { narration: e.target.value })}
                    placeholder={L.narrationPlaceholder}
                    rows={2}
                    className={`${fieldInput} resize-none text-xs`}
                  />
                  <textarea
                    value={scene.imagePrompt}
                    onChange={(e) => updateScene(i, { imagePrompt: e.target.value })}
                    placeholder={L.imagePromptPlaceholder}
                    rows={2}
                    className={`${fieldInput} resize-none text-xs`}
                  />
                </>
              )}
              {isScript && !scene.narration.trim() && (
                <p className="text-[10px] text-muted-foreground italic">Add a narration to let the AI narrate this scene.</p>
              )}
            </div>
          ))}
          {isScript && (
            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="secondary" onClick={addScene} icon={<Plus className="w-4 h-4" />}>{L.addScene}</Button>
              <Button variant="ghost" onClick={generateScript} icon={<RefreshCcw className="w-4 h-4" />}>{L.regenerate}</Button>
              <Button onClick={createVideo} icon={<Clapperboard className="w-4 h-4" />}>{L.createVideo}</Button>
            </div>
          )}
          {(isPrepare || isRecording) && (
            <div className="space-y-3 pt-1">
              <p className="text-sm text-muted-foreground font-medium">{isPrepare ? L.preparing : L.recording}</p>
              {isRecording && (
                <p className="text-xs text-muted-foreground">{L.sceneOf.replace('{cur}', String(recordScene)).replace('{total}', String(recordTotal))}</p>
              )}
              <p className="text-xs text-muted-foreground italic">{progressMsg}</p>
              <canvas ref={canvasRef} className="w-full rounded-xl border border-border max-h-[480px] object-contain bg-black" />
              {isRecording && (
                <div className="flex gap-2 pt-1">
                  <Button variant="danger" onClick={stopRecording} icon={<Square className="w-4 h-4" />}>{L.stop}</Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {isDone && videoUrl && (
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-foreground">{script?.title || L.preview}</h3>
          <video src={videoUrl} controls className="w-full max-h-[600px] rounded-xl border border-border bg-black" />
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={videoUrl}
              download={`${(script?.title || 'story-video').replace(/\s+/g, '-').toLowerCase()}.webm`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:opacity-90"
            >
              <Download className="w-4 h-4" />
              {L.download}
            </a>
            <Button variant="secondary" onClick={resetAll} icon={<RefreshCcw className="w-4 h-4" />}>{L.startOver}</Button>
          </div>
        </div>
      )}
    </div>
  );
}