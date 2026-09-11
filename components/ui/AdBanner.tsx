'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://bogavoidmemorize.com/04a4788f4f077c94cf91249fb0f3a1f3/invoke.js';
    script.async = true;

    (script as any).dataCfasync = 'false';

    containerRef.current.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="container-04a4788f4f077c94cf91249fb0f3a1f3"
    />
  );
}
