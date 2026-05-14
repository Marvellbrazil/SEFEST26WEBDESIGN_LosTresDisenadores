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
      initial={{ y: 0 }}
      animate={isExiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => isExiting && setFinished(false)}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F28F3B] overflow-hidden font-[family:var(--font-jakarta)]"
    >
      <AnimatePresence mode="wait">
        {!showLogo ? (
          <motion.div 
            key="words-container"
            className="relative z-10 flex items-center justify-center overflow-hidden h-32 md:h-48"
          >
            <AnimatePresence mode="popLayout">
              <motion.h1
                key={`word-${index}`}
                initial={{ opacity: 0, y: 100, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -100, rotateX: 45 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#F4F3EE] text-[15vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none"
                style={{ WebkitTextStroke: index % 2 === 0 ? '0px transparent' : '2px #F4F3EE', color: index % 2 === 0 ? '#F4F3EE' : 'transparent' }}
              >
                {words[index]}
              </motion.h1>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="logo-container"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-[#F4F3EE] rounded-full blur-[100px] opacity-20 z-0"
            />
            
            <div className="relative z-10 w-[40%] max-w-[250px] md:max-w-[300px]">
              <Image 
                src="/HD.png" 
                alt="Logo" 
                width={300} 
                height={300} 
                priority={true} 
                className="w-full h-auto object-contain drop-shadow-2xl" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}