export type DownloaderPlatform = 'youtube' | 'instagram' | 'tiktok' | 'twitter' | 'facebook';

export type DownloaderKind = 'video' | 'audio';

export interface DownloaderMediaInfo {
  id: string;
  platform: DownloaderPlatform;
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
  durationSeconds: number | null;
  uploader: string | null;
  uploaderUrl: string | null;
  viewCount: number | null;
  likeCount: number | null;
  commentCount: number | null;
  uploadedAt: string | null;
  isLive: boolean;
  formats: { video: string[]; audio: string[] };
  qualities: { video: string[]; audio: string[] };
}

export type DownloadJobStatus =
  | 'QUEUED'
  | 'FETCHING_INFO'
  | 'DOWNLOADING'
  | 'CONVERTING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED'
  | 'EXPIRED';

export interface DownloadJob {
  id: string;
  platform: DownloaderPlatform;
  url: string;
  kind: DownloaderKind;
  status: DownloadJobStatus;
  title: string | null;
  thumbnail: string | null;
  quality: string | null;
  format: string | null;
  filename: string | null;
  fileUrl: string | null;
  fileSizeBytes: number | null;
  error: string | null;
  progress: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  expiresAt: string | null;
}