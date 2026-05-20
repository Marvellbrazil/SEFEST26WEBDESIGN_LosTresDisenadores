'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis(options?: ConstructorParameters<typeof Lenis>[0]) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    lenisRef.current = new Lenis({
      duration: options?.duration ?? 1.4,
      easing: options?.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      ...options,
    });
    (window as any).__lenis = lenisRef.current;

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

export function useSmoothScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenis();

  return { scrollRef, lenisRef };
}