'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from '../../src/hooks/useLenis';

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useLenis();

  return (
    <div ref={scrollRef} id="scroll-container" className="relative">
      {children}
    </div>
  );
};

export default SmoothScroll;