import { cn } from '@/lib/utils';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueLabel?: string;
}

export function Slider({ label, valueLabel, className, ...props }: SliderProps) {
  return (
    <div className="space-y-1.5">
      {(label || valueLabel) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {valueLabel && <span className="font-medium text-foreground">{valueLabel}</span>}
        </div>
      )}
      <input
        type="range"
        aria-label={label}
        className={cn(
          'w-full h-1.5 rounded-full appearance-none cursor-pointer',
          'bg-muted [&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
          '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary',
          '[&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110',
          className
        )}
        {...props}
      />
    </div>
  );
}
