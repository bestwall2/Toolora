import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-muted text-muted-foreground': variant === 'default',
          'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400': variant === 'success',
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400': variant === 'warning',
          'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400': variant === 'danger',
          'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400': variant === 'info',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
