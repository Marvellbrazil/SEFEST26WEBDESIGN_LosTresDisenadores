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
      const timer = setTimeout(() => setIndex((prev) => prev + 1), 1000);
      return () => clearTimeout(timer);
    }
    if (index === words.length && !showLogo) {
      setShowLogo(true);
    }
  }, [index, showLogo]);

  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => setIsExiting(true), 2400);
      return () => clearTimeout(timer);
    }
  }, [showLogo]);

  const currentWordLetters = words[index] ? words[index].split('') : [];

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
              <motion.div 
                key={`word-track-${index}`}
                className="flex items-center justify-center gap-[0.01em]"
              >
                {currentWordLetters.map((char, charIdx) => (
                  <div key={`${index}-${charIdx}`} className="overflow-hidden inline-block py-2">
                    <motion.span
                      initial={{ y: "105%", rotate: 8 }}
                      animate={{ y: 0, rotate: 0 }}
                      exit={{ y: "-105%", rotate: -8 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 16,
                        delay: charIdx * 0.03
                      }}
                      className="inline-block text-[#F4F3EE] text-[15vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none"
                      style={{ 
                        WebkitTextStroke: index % 2 === 0 ? '0px transparent' : '3px #F4F3EE', 
                        color: index % 2 === 0 ? '#F4F3EE' : 'transparent' 
                      }}
                    >
                      {char}
                    </motion.span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="logo-container"
            initial={{ opacity: 0, scaleY: 0.3, scaleX: 1.4, y: 150 }}
            animate={{ opacity: 1, scaleY: 1, scaleX: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 240, 
              damping: 12,
              mass: 0.6,
              delay: 0.05
            }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ 
                scale: [1, 1.1, 1], 
                opacity: [0.2, 0.35, 0.2] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] bg-[#F4F3EE] rounded-full blur-[90px] z-0 pointer-events-none"
            />
            
            <motion.div 
              animate={{ 
                rotate: [0, -6, 6, -4, 4, 0, 0, 0],
                y: [0, 0, 0, 0, 0, 0, -10, 0]
              }}
              transition={{ 
                rotate: { duration: 0.8, ease: "easeOut", delay: 0.4 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 } 
              }}
              className="relative z-10 w-[55%] max-w-[320px] md:max-w-[450px] p-2"
            >
              <Image 
                src="/HD.png" 
                alt="Logo" 
                width={500} 
                height={500} 
                priority={true} 
                className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.18)]" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}