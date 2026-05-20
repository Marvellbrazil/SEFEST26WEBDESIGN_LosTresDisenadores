'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAP(callback: (context: gsap.Context) => void, deps?: React.DependencyList) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    ctxRef.current = gsap.context(() => {
      callback(ctxRef.current!);
    });

    return () => {
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ?? []);
}

export { gsap, ScrollTrigger };