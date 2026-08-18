'use client';

import { toolComponents } from '@/lib/tools/registry';

export function ToolComponent({ slug }: { slug: string }) {
  const Component = toolComponents[slug];
  if (!Component) return null;
  return <Component />;
}