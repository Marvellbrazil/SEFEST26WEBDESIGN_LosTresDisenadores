'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface IntroProps {
  setFinished: (v: boolean) => void;
}

const words = ['SAVE', 'RESCUE', 'ENJOY'];

export default function Intro({ setFinished }: IntroProps) {
  const [index, setIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (index < words.length) {
      const timer = setTimeout(() => setIndex((prev) => prev + 1), 600);
      return () => clearTimeout(timer);
    }
    if (index === words.length && !showLogo) {
      setShowLogo(true);
    }
  }, [index, showLogo]);

  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => setIsExiting(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [showLogo]);

  return (
    <motion.div
      initial={{ y: 0, borderBottomLeftRadius: '0vw', borderBottomRightRadius: '0vw' }}
      animate={
        isExiting 
          ? { y: '-100vh', borderBottomLeftRadius: '50vw', borderBottomRightRadius: '50vw' } 
          : { y: 0, borderBottomLeftRadius: '0vw', borderBottomRightRadius: '0vw' }
      }
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => isExiting && setFinished(false)}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F28F3B] overflow-hidden font-[family:var(--font-jakarta)]"
    >
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {!showLogo ? (
          <motion.div 
            key="words-container"
            className="relative z-10 flex items-center justify-center overflow-hidden h-32 md:h-48 perspective-[1000px]"
          >
            <AnimatePresence mode="popLayout">
              <motion.h1
                key={`word-${index}`}
                initial={{ opacity: 0, y: 80, rotateX: -60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, y: -80, rotateX: 60, scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#F4F3EE] text-[15vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none"
                style={{ WebkitTextStroke: index % 2 === 0 ? '0px transparent' : '3px #F4F3EE', color: index % 2 === 0 ? '#F4F3EE' : 'transparent' }}
              >
                {words[index]}
              </motion.h1>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="logo-container"
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)', y: 40 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.25 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#F4F3EE] rounded-full blur-[100px] z-0"
            />
            
            <div className="relative z-10 w-[55%] max-w-[320px] md:max-w-[450px]">
              <Image 
                src="/HD.png" 
                alt="Logo" 
                width={500} 
                height={500} 
                priority={true} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}