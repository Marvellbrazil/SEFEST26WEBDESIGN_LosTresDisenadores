'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { AnimationConfig, createSpring, createEase } from './utils/animation';

interface IntroProps {
  setFinished: (v: boolean) => void;
}

const words = ['SAVE', 'RESCUE', 'ENJOY'];

const wordVariants: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.8 },
};

const logoVariants: Variants = {
  initial: { opacity: 0, scale: 0.5, rotate: -180 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: AnimationConfig.duration.slow, ease: AnimationConfig.ease.smooth, type: 'spring', stiffness: 200, damping: 15 },
  },
};

export default function Intro({ setFinished }: IntroProps) {
  const [index, setIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (index < words.length) {
      const timer = setTimeout(() => setIndex((prev) => prev + 1), 800);
      return () => clearTimeout(timer);
    }
    if (index === words.length && !showLogo) {
      setShowLogo(true);
    }
  }, [index, showLogo]);

  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => setIsExiting(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [showLogo]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={isExiting ? { y: '-100%' } : { y: 0 }}
      transition={createEase({ duration: AnimationConfig.duration.slow })}
      onAnimationComplete={() => isExiting && setFinished(false)}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#F28F3B] to-[#e07a2e] overflow-hidden"
    >
      <AnimatePresence>
        {!showLogo ? (
          <div className="relative z-10 text-center">
            <motion.h1
              key={`word-${index}`}
              variants={wordVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={createSpring({ stiffness: 300 })}
              className="text-white font-[family:var(--font-inter)] text-[12vw] font-black md:text-[8vw] uppercase tracking-tighter"
            >
              {words[index]}
            </motion.h1>
          </div>
        ) : (
          <motion.div
            key="logo-img"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="relative z-10 w-[40%] max-w-[250px] md:max-w-[300px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1.2 }}
              transition={{ duration: AnimationConfig.duration.slow, delay: 0.3 }}
              className="absolute inset-0 bg-white rounded-full blur-3xl -z-10"
            />
            <img src="/HD.png" alt="Logo" className="w-full h-auto object-contain relative z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}