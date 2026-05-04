'use client';

import type { Transition, Easing } from 'framer-motion';

export const AnimationConfig = {
  spring: {
    default: { type: 'spring' as const, stiffness: 100 },
    gentle: { type: 'spring' as const, stiffness: 300, damping: 20 },
    bouncy: { type: 'spring' as const, stiffness: 200, damping: 15 },
    stiff: { type: 'spring' as const, stiffness: 200, damping: 15 },
  },
  ease: {
    smooth: [0.34, 1.56, 0.64, 1] as Easing,
    default: [0.33, 1, 0.68, 1] as Easing,
    gentle: [0.76, 0, 0.24, 1] as Easing,
    standard: [0.4, 0, 0.2, 1] as Easing,
  },
  duration: {
    fast: 0.3,
    default: 0.5,
    slow: 0.8,
  },
};

export interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface EaseConfig {
  duration?: number;
  ease?: Easing;
}

export const createSpring = (config?: SpringConfig): Transition => ({
  ...AnimationConfig.spring.default,
  ...config,
});

export const createEase = (config?: EaseConfig): Transition => ({
  duration: config?.duration ?? AnimationConfig.duration.default,
  ease: config?.ease ?? AnimationConfig.ease.default,
});