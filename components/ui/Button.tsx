'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          // Primary
          'bg-primary text-white shadow-sm hover:opacity-90 active:scale-[0.98]':
            variant === 'primary',
          // Secondary
          'bg-secondary text-foreground border border-border hover:bg-muted active:scale-[0.98]':
            variant === 'secondary',
          // Ghost
          'text-muted-foreground hover:text-foreground hover:bg-muted active:scale-[0.98]':
            variant === 'ghost',
          // Danger
          'bg-destructive text-white hover:opacity-90 active:scale-[0.98]':
            variant === 'danger',
          // Sizes
          'text-xs px-3 py-1.5': size === 'sm',
          'text-sm px-4 py-2': size === 'md',
          'text-base px-6 py-2.5': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}
