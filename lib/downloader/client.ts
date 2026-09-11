import type { DownloadJob, DownloaderKind, DownloaderMediaInfo, DownloaderPlatform } from './types';

export const DOWNLOADER_PLATFORMS: Record<DownloaderPlatform, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  twitter: 'X (Twitter)',
  facebook: 'Facebook',
};

export const VIDEO_QUALITY_PRESETS = ['highest', '1080p', '720p', '480p', '360p'];
export const AUDIO_QUALITY_PRESETS = ['best', 'high', 'medium', 'low'];

export const VIDEO_FORMAT_PRESETS = ['mp4'];
export const AUDIO_FORMAT_PRESETS = ['mp3', 'm4a'];

export async function fetchMediaInfo(url: string): Promise<DownloaderMediaInfo> {
  const res = await fetch(`/api/downloader/info?url=${encodeURIComponent(url)}`, { cache: 'no-store' });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.error || 'fetch_failed');
  return body as DownloaderMediaInfo;
}

export async function createDownload(params: {
  url: string;
  kind: DownloaderKind;
  quality?: string;
  format?: string;
}): Promise<DownloadJob> {
  const res = await fetch('/api/downloader/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.error || 'download_failed');
  return body as DownloadJob;
}

export async function fetchJobStatus(id: string): Promise<DownloadJob> {
  const res = await fetch(`/api/downloader/job?id=${encodeURIComponent(id)}`, { cache: 'no-store' });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.error || 'fetch_failed');
  return body as DownloadJob;
}

export function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || seconds <= 0) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function formatViews(count: number | null | undefined): string {
  if (!count || count <= 0) return '';
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}