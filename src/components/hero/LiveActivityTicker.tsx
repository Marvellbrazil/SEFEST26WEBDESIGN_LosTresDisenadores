'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { liveActivities } from '../../constants/hero';

export const LiveActivityTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % liveActivities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-20 left-4 right-4 sm:left-auto sm:right-8 md:right-16 z-30 pointer-events-none flex justify-center sm:justify-end">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xl flex items-center gap-2 max-w-full"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <p className="text-white/90 text-[10px] sm:text-xs font-[family:var(--font-jakarta)] truncate">
            {liveActivities[currentIndex]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
