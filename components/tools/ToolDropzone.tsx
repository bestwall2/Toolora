'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File } from 'lucide-react';
import { cn, formatBytes } from '@/lib/utils';
import { useLocaleContext } from '@/components/i18n/LocaleProvider';

interface DropzoneFile {
  file: File;
  id: string;
}

interface ToolDropzoneProps {
  onFiles: (files: File[]) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  maxSize?: number;
  label?: string;
  sublabel?: string;
  files?: DropzoneFile[];
  onRemove?: (id: string) => void;
  className?: string;
}

export function ToolDropzone({
  onFiles,
  accept,
  multiple = false,
  maxSize = 50 * 1024 * 1024, // 50 MB
  label,
  sublabel,
  files = [],
  onRemove,
  className,
}: ToolDropzoneProps) {
  const { t } = useLocaleContext();
  const common = t.toolUi.common;

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length > 0) onFiles(accepted);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize,
  });

  return (
    <div className={cn('space-y-3', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200',
          isDragActive
            ? 'border-primary bg-primary/5 scale-[1.01]'
            : 'border-border hover:border-primary/50 hover:bg-muted/50 bg-muted/20'
        )}
      >
        <input {...getInputProps()} aria-label={label || common.upload} />

        <div className="flex flex-col items-center gap-3">
          <div
            className={cn(
              'w-14 h-14 rounded-2xl flex items-center justify-center transition-colors',
              isDragActive ? 'bg-primary/15' : 'bg-muted'
            )}
          >
            <Upload
              className={cn('w-6 h-6 transition-colors', isDragActive ? 'text-primary' : 'text-muted-foreground')}
            />
          </div>

          <div>
            <p className="font-medium text-foreground text-sm">
              {isDragActive ? common.dropHere : label || common.dropHere}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {sublabel || `${common.orClickToBrowse} · ${common.maxSize} ${formatBytes(maxSize)}`}
            </p>
          </div>
        </div>
      </div>

      {/* File rejection errors */}
      {fileRejections.length > 0 && (
        <div className="text-xs text-red-600 dark:text-red-400 px-1">
          {fileRejections[0].errors[0].code === 'file-too-large'
            ? `${common.fileTooLarge} ${common.maxSize} ${formatBytes(maxSize)}.`
            : common.invalidFile}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted/50 border border-border"
            >
              <File className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{f.file.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(f.file.size)}</p>
              </div>
              {onRemove && (
                <button
                  onClick={() => onRemove(f.id)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label={common.removeFile}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}