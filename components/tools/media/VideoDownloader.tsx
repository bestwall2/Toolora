'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Download, Loader2, Link2, RefreshCw, AlertTriangle, Search } from 'lucide-react';
import { useToolLabels } from '@/components/i18n/LocaleProvider';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import {
  AUDIO_QUALITY_PRESETS,
  AUDIO_FORMAT_PRESETS,
  DOWNLOADER_PLATFORMS,
  VIDEO_QUALITY_PRESETS,
  VIDEO_FORMAT_PRESETS,
  createDownload,
  fetchJobStatus,
  fetchMediaInfo,
  formatDuration,
  formatViews,
} from '@/lib/downloader/client';
import type { DownloadJob, DownloaderMediaInfo, DownloaderPlatform } from '@/lib/downloader/types';

type Phase = 'idle' | 'loading' | 'ready' | 'busy' | 'done';

interface VideoDownloaderProps {
  platform: DownloaderPlatform;
}

function VideoDownloader({ platform }: VideoDownloaderProps) {
  const slug = `${platform}-video-downloader`;
  const S = useToolLabels(slug);
  const platformName = DOWNLOADER_PLATFORMS[platform] || platform;

  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [info, setInfo] = useState<DownloaderMediaInfo | null>(null);
  const [kind, setKind] = useState<'video' | 'audio'>('video');
  const [quality, setQuality] = useState('');
  const [format, setFormat] = useState('');
  const [job, setJob] = useState<DownloadJob | null>(null);
  const [error, setError] = useState('');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    trackEvent('tool_opened', { tool: slug });
  }, [slug]);

  useEffect(
    () => () => {
      if (pollRef.current) clearInterval(pollRef.current);
    },
    []
  );

  const qualities = (kind === 'video'
    ? info?.qualities?.video?.length
      ? info.qualities.video
      : VIDEO_QUALITY_PRESETS
    : info?.qualities?.audio?.length
      ? info.qualities.audio
      : AUDIO_QUALITY_PRESETS) as string[];

  const formats = (kind === 'video'
    ? info?.formats?.video?.length
      ? info.formats.video
      : VIDEO_FORMAT_PRESETS
    : info?.formats?.audio?.length
      ? info.formats.audio
      : AUDIO_FORMAT_PRESETS) as string[];

  const effectiveQuality = quality && qualities.includes(quality) ? quality : qualities[0];
  const effectiveFormat = format && formats.includes(format) ? format : formats[0];

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => stopPolling, [stopPolling]);

  const handleGetInfo = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    setPhase('loading');
    setError('');
    setInfo(null);
    setJob(null);
    stopPolling();
    try {
      const res = await fetchMediaInfo(trimmed);
      if (res.platform !== platform) {
        setError(S.unsupported ? S.unsupported.replace('{platform}', platformName) : 'unsupported');
        setPhase('idle');
        return;
      }
      setInfo(res);
      setPhase('ready');
      trackEvent('tool_used', { tool: slug });
    } catch {
      setError(S.fetchFailed || 'fetch_failed');
      setPhase('idle');
    }
  }, [url, platform, platformName, S, stopPolling, slug]);

  const startPolling = useCallback(
    (id: string) => {
      stopPolling();
      pollRef.current = setInterval(async () => {
        try {
          const j = await fetchJobStatus(id);
          setJob(j);
          if (j.status === 'COMPLETED') {
            stopPolling();
            setPhase('done');
            trackEvent('download_clicked', { tool: slug, platform });
          } else if (j.status === 'FAILED' || j.status === 'CANCELLED' || j.status === 'EXPIRED') {
            stopPolling();
            setError(j.error || S.downloadFailed || 'download_failed');
            setPhase('ready');
          }
        } catch {
          // Transient network error — keep polling.
        }
      }, 2000);
    },
    [S, platform, slug, stopPolling]
  );

  const handleDownload = useCallback(async () => {
    if (!info) return;
    setPhase('busy');
    setError('');
    setJob(null);
    try {
      const j = await createDownload({ url: info.url, kind, quality: effectiveQuality, format: effectiveFormat });
      setJob(j);
      startPolling(j.id);
    } catch {
      setError(S.downloadFailed || 'download_failed');
      setPhase('ready');
    }
  }, [info, kind, effectiveQuality, effectiveFormat, S, startPolling]);

  const reset = useCallback(() => {
    stopPolling();
    setPhase('idle');
    setError('');
    setInfo(null);
    setJob(null);
    setUrl('');
  }, [stopPolling]);

  const busy = phase === 'busy' || phase === 'loading';
  const fileHref = job?.fileUrl && job.fileUrl.includes('/v2/files/')
    ? `/api/downloader/file?file=${encodeURIComponent(job.fileUrl.split('/v2/files/')[1])}`
    : '#';

  const statusLabel =
    job?.status === 'QUEUED'
      ? S.queued || 'queued'
      : job?.status === 'DOWNLOADING'
        ? S.downloading || 'downloading'
        : job?.status === 'FETCHING_INFO'
          ? S.gettingInfo || 'getting_info'
          : job?.status === 'CONVERTING'
            ? S.converting || 'converting'
            : S.finalizing || 'finalizing';

  const inputStyles =
    'w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 rtl:text-right';
  const selectStyles =
    'w-full px-3 py-2 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50';

  return (
    <div className="space-y-5">
      {/* URL input */}
      <div className="space-y-2">
        <label htmlFor={`${slug}-url`} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {S.urlLabel || 'Video URL'}
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
            <input
              id={`${slug}-url`}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={busy}
              placeholder={S.urlPlaceholder || 'Paste the video URL here…'}
              className={`${inputStyles} pl-10 rtl:pl-3 rtl:pr-10`}
            />
          </div>
          <Button onClick={handleGetInfo} disabled={busy || !url.trim()} loading={phase === 'loading'} icon={<Search className="w-4 h-4" />}>
            {S.getInfo || 'Get Video Info'}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {S.example} <span dir="ltr" className="inline-block">{exampleUrl(platform)}</span>
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 flex gap-2.5 text-xs text-red-700 dark:text-red-400">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {phase === 'ready' && info && (
        <>
          {/* Media preview */}
          <div className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-border bg-card p-4">
            {info.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={info.thumbnail}
                alt={info.title}
                className="w-full sm:w-48 aspect-video object-cover rounded-xl bg-muted flex-shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full sm:w-48 aspect-video rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <Loader2 className="w-6 h-6 text-muted-foreground/50" />
              </div>
            )}
            <div className="min-w-0 space-y-1.5">
              <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{info.title}</p>
              {info.uploader && <p className="text-xs text-muted-foreground">{S.by || 'by'} {info.uploader}</p>}
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {formatDuration(info.durationSeconds) && (
                  <span className="px-2 py-0.5 rounded-md bg-muted">{formatDuration(info.durationSeconds)}</span>
                )}
                {formatViews(info.viewCount) && (
                  <span>{formatViews(info.viewCount)} {S.views || 'views'}</span>
                )}
                <span className="px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400">
                  {S.detected || 'Detected:'} {DOWNLOADER_PLATFORMS[info.platform] || info.platform}
                </span>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label htmlFor={`${slug}-kind`} className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {S.kind || 'Type'}
              </label>
              <div className="grid grid-cols-2 rounded-xl border border-border bg-card p-1">
                {(['video', 'audio'] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKind(k)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      kind === k ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {k === 'video' ? S.video || 'Video' : S.audio || 'Audio'}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor={`${slug}-quality`} className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {S.quality || 'Quality'}
              </label>
              <select id={`${slug}-quality`} value={effectiveQuality} onChange={(e) => setQuality(e.target.value)} className={selectStyles}>
                {qualities.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor={`${slug}-format`} className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {S.format || 'Format'}
              </label>
              <select id={`${slug}-format`} value={effectiveFormat} onChange={(e) => setFormat(e.target.value)} className={selectStyles}>
                {formats.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Download button */}
          <Button size="lg" className="w-full" onClick={handleDownload} disabled={busy} loading={busy} icon={<Download className="w-4 h-4" />}>
            {job ? statusLabel : S.download || 'Download'}
          </Button>
        </>
      )}

      {/* Progress */}
      {phase === 'busy' && job && (
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, job.progress || 0))}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {statusLabel} {Math.min(100, Math.max(0, job.progress || 0))}%
          </p>
        </div>
      )}

      {/* Done */}
      {phase === 'done' && job?.fileUrl && (
        <div className="space-y-4 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20 p-5 text-center">
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto" />
          <p className="text-sm font-semibold text-green-800 dark:text-green-300">{S.ready || 'Your download is ready!'}</p>
          {job.fileSizeBytes ? (
            <p className="text-xs text-green-700/80 dark:text-green-400/80">
              {formatBytes(job.fileSizeBytes)}
            </p>
          ) : null}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={fileHref} download className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              {S.saveFile || 'Save File'}
            </a>
            <Button variant="secondary" onClick={reset} icon={<RefreshCw className="w-4 h-4" />}>
              {S.another || 'Download another video'}
            </Button>
          </div>
        </div>
      )}

      {/* Legal note */}
      {S.note && (
        <p className="text-xs text-muted-foreground leading-relaxed text-center pt-2">{S.note}</p>
      )}
    </div>
  );
}

function exampleUrl(platform: DownloaderPlatform): string {
  switch (platform) {
    case 'youtube':
      return 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    case 'instagram':
      return 'https://www.instagram.com/reel/CxYzAbC/';
    case 'tiktok':
      return 'https://www.tiktok.com/@user/video/1234567890';
    case 'twitter':
      return 'https://x.com/user/status/1234567890';
    case 'facebook':
      return 'https://www.facebook.com/watch?v=1234567890';
  }
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log2(bytes) / 10));
  return `${(bytes / 2 ** (10 * i)).toFixed(1)} ${units[i]}`;
}

export function YoutubeVideoDownloader() {
  return <VideoDownloader platform="youtube" />;
}

export function InstagramVideoDownloader() {
  return <VideoDownloader platform="instagram" />;
}

export function TiktokVideoDownloader() {
  return <VideoDownloader platform="tiktok" />;
}

export function TwitterVideoDownloader() {
  return <VideoDownloader platform="twitter" />;
}

export function FacebookVideoDownloader() {
  return <VideoDownloader platform="facebook" />;
}