'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    (window as any).atOptions = {
      key: '001398ff75ab9efe1088d31633156f04',
      format: 'iframe',
      height: 60,
      width: 468,
      params: {},
    };

    const script = document.createElement('script');
    script.src = 'https://bogavoidmemorize.com/001398ff75ab9efe1088d31633156f04/invoke.js';
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-card/95 backdrop-blur border-t border-border py-2"
      id="container-001398ff75ab9efe1088d31633156f04"
    />
  );
}