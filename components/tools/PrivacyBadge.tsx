import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface PrivacyBadgeProps {
  text: string;
  proofHref: string;
  proofLabel: string;
}

export function PrivacyBadge({ text, proofHref, proofLabel }: PrivacyBadgeProps) {
  return (
    <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-green-200 dark:border-green-900 bg-green-50/70 dark:bg-green-950/20 px-4 py-3">
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" aria-hidden="true" />
        <p className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-300">{text}</p>
      </div>
      <Link
        href={proofHref}
        className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 dark:text-green-400 hover:underline whitespace-nowrap shrink-0"
      >
        {proofLabel}
        <ArrowRight className="w-3 h-3 rtl:rotate-180" aria-hidden="true" />
      </Link>
    </div>
  );
}