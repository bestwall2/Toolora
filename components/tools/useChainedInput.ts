'use client';

import { useEffect, useRef } from 'react';
import { consumeChainHandoff } from '@/lib/toolchain/chain-store';
import type { ChainType } from '@/data/tools';

/**
 * Consumes a pending file handoff for the given tool on mount and feeds it to
 * the provided handler (e.g. the tool's existing dropzone/file handler).
 */
export function useChainedInput(
  slug: string,
  acceptType: ChainType,
  onHandoff: (handoff: { blob: Blob; fileName: string; mime: string }) => void
) {
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
    consumeChainHandoff(slug).then((handoff) => {
      if (handoff && handoff.mime.startsWith(acceptType)) {
        onHandoff(handoff);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}