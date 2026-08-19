import { CircleDollarSign, UserX, WifiOff, CircleOff } from 'lucide-react';

interface TrustSignalsProps {
  labels: {
    free: string;
    noSignup: string;
    offline: string;
    adFree: string;
  };
}

export function TrustSignals({ labels }: TrustSignalsProps) {
  const items = [
    { icon: CircleDollarSign, label: labels.free },
    { icon: UserX, label: labels.noSignup },
    { icon: WifiOff, label: labels.offline },
    { icon: CircleOff, label: labels.adFree },
  ];

  return (
    <ul className="mt-5 flex flex-wrap items-center gap-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li
            key={item.label}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground"
          >
            <Icon className="w-3.5 h-3.5 text-green-600 dark:text-green-400" aria-hidden="true" />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}