'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, Transition, MotionValue } from 'framer-motion';
import { Cloud, Droplets, Map } from 'lucide-react';
import { IconType } from 'react-icons';

const IMPACT_FACTORS = {
  co2: 2.5,
  water: 840,
  land: 1.5,
};

const RunningAvatar = ({ progress, isReversing }: { progress: MotionValue<number>, isReversing: boolean }) => {
  const xPos = useTransform(progress, [0, 1], ["0%", "100%"]);
  const runCycle = 0.5;
  
  const bounce: Transition = { 
    duration: runCycle / 2, 
    repeat: Infinity, 
    ease: "easeInOut" 
  };
  
  const swing: Transition = { 
    duration: runCycle, 
    repeat: Infinity, 
    ease: "easeInOut" 
  };

  return (
    <motion.div
      style={{ left: xPos, x: "-50%" }}
      className="absolute bottom-0.5 lg:bottom-0.75 z-30 pointer-events-none flex flex-col items-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ 
          opacity: isReversing ? 1 : 0, 
          scale: isReversing ? 1 : 0.8, 
          y: isReversing ? 0 : 10 
        }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-21.25 bg-[#2D2A26] text-white text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-2xl whitespace-nowrap shadow-xl border border-white/10 z-40"
      >
        <span>Ohh wait!</span>
        <div className="w-2 h-2 bg-[#2D2A26] rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
      </motion.div>

      <div style={{ transform: isReversing ? "scaleX(-1)" : "scaleX(1)", transition: "transform 0.3s ease" }}>
        <motion.svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-[100px] lg:h-[100px]">
          <motion.ellipse cx="50" cy="92" rx="20" ry="4" fill="black"
            animate={{ rx: [20, 26, 20], opacity: [0.15, 0.05, 0.15] }}
            transition={bounce}
          />
          <motion.g animate={{ y: [0, -8, 0] }} transition={bounce}>
            <motion.rect x="36" y="42" width="12" height="24" rx="6" fill="#E5E7EB"
              style={{ transformOrigin: "42px 48px" }}
              animate={{ rotate: [-50, 50, -50] }}
              transition={swing}
            />
            <motion.rect x="38" y="60" width="14" height="26" rx="7" fill="#E5E7EB"
              style={{ transformOrigin: "45px 67px" }}
              animate={{ rotate: [45, -45, 45] }}
              transition={swing}
            />
            <rect x="22" y="38" width="22" height="30" rx="10" fill="#F28F3B" />
            <rect x="22" y="46" width="22" height="4" fill="#FFFFFF" opacity="0.3" />
            <rect x="34" y="24" width="36" height="46" rx="18" fill="#FFFFFF" />
            <path d="M 34 42 L 34 42 Q 34 24 52 24 Q 70 24 70 42 Z" fill="#F28F3B" />
            <rect x="60" y="32" width="18" height="6" rx="3" fill="#F28F3B" />
            <rect x="54" y="40" width="18" height="10" rx="5" fill="#2D2A26" />
            <path d="M 58 56 Q 63 60 68 56" stroke="#2D2A26" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <motion.rect x="52" y="60" width="14" height="26" rx="7" fill="#FFFFFF"
              style={{ transformOrigin: "59px 67px" }}
              animate={{ rotate: [-45, 45, -45] }}
              transition={swing}
            />
            <motion.rect x="54" y="42" width="12" height="24" rx="6" fill="#FFFFFF"
              style={{ transformOrigin: "60px 48px" }}
              animate={{ rotate: [50, -50, 50] }}
              transition={swing}
            />
          </motion.g>
        </motion.svg>
      </div>
    </motion.div>
  );
};

const MetricBox = ({ title, value, unit, icon: Icon, imageSrc, iconColor, position, style }: { title: string; value: MotionValue<string>; unit: string; icon: IconType; imageSrc: string; iconColor: string; position: React.CSSProperties; style: object }) => {
  return (
    <motion.div 
      style={{ ...position, ...style, x: "-50%" }}
      className="absolute flex flex-col p-3 lg:p-4 bg-white/80 backdrop-blur-xl rounded-[20px] lg:rounded-4xl shadow-2xl w-27.5 sm:w-45 lg:w-65 z-20 border border-white overflow-hidden"
    >
      <div className="hidden min-[400px]:block w-full h-16 sm:h-20 lg:h-32 mb-2 lg:mb-4 rounded-xl lg:rounded-2xl overflow-hidden relative bg-gray-100">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 lg:top-3 lg:right-3 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm" style={{ color: iconColor }}>
          <Icon className="w-3 h-3 lg:w-4 lg:h-4" strokeWidth={2.5} />
        </div>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-[#2D2A26]/50 mb-0.5 lg:mb-1">{title}</span>
        <div className="flex flex-col lg:flex-row items-center lg:items-baseline gap-0.5 lg:gap-2">
          <motion.span className="text-xl sm:text-2xl lg:text-4xl font-black tracking-tighter text-[#2D2A26]">{value}</motion.span>
          <span className="text-[8px] lg:text-xs font-bold text-[#2D2A26]/40 uppercase">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function Section5() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReversing, setIsReversing] = useState(false);
  const [isHoveredMeals, setIsHoveredMeals] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious();
    if (current < previous! && current > 0.05 && current < 0.95) {
      setIsReversing(true);
    } else {
      setIsReversing(false);
    }
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 35, damping: 18, mass: 1 });
  
  const dynamicBgColor = useTransform(scrollYProgress, [0, 0.85, 1], ["#FDB0B0", "#CDF5DF", "#BCF2D5"]);
  
  const dynamicEyeColor = useTransform(scrollYProgress, [0, 0.85, 1], ["#EF4444", "#22C55E", "#10B981"]);

  const meals = useTransform(smoothProgress, [0, 1], [1, 500]);
  const displayMeals = useTransform(meals, (latest) => Math.round(latest));

  const co2 = useTransform(smoothProgress, [0, 1], [1 * IMPACT_FACTORS.co2, 500 * IMPACT_FACTORS.co2]);
  const water = useTransform(smoothProgress, [0, 1], [1 * IMPACT_FACTORS.water, 500 * IMPACT_FACTORS.water]);
  const land = useTransform(smoothProgress, [0, 1], [1 * IMPACT_FACTORS.land, 500 * IMPACT_FACTORS.land]);
  
  const displayCo2 = useTransform(co2, (v) => v.toFixed(1));
  const displayWater = useTransform(water, (v) => Math.round(v).toLocaleString());
  const displayLand = useTransform(land, (v) => v.toFixed(1));

  const dynamicMouthPath = useTransform(
    smoothProgress, 
    [0, 0.5, 1], 
    ["M 6 20 Q 16 8 26 20", "M 6 16 Q 16 16 26 16", "M 6 12 Q 16 26 26 12"]
  );

  const stat1Opacity = useTransform(smoothProgress, [0.1, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const stat1Y = useTransform(smoothProgress, [0.1, 0.2, 0.3, 0.35], [20, 0, 0, -20]);

  const stat2Opacity = useTransform(smoothProgress, [0.4, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const stat2Y = useTransform(smoothProgress, [0.4, 0.5, 0.6, 0.65], [20, 0, 0, -20]);

  const stat3Opacity = useTransform(smoothProgress, [0.7, 0.8, 0.9, 0.95], [0, 1, 1, 0]);
  const stat3Y = useTransform(smoothProgress, [0.7, 0.8, 0.9, 0.95], [20, 0, 0, -20]);

  const co2Opacity = useTransform(smoothProgress, [0, 0.1, 0.25], [0, 0, 1]);
  const co2Y = useTransform(smoothProgress, [0, 0.1, 0.25], [40, 20, 0]); 
  const co2Scale = useTransform(smoothProgress, [0.1, 0.25, 0.35], [0.8, 1.1, 1]);

  const waterOpacity = useTransform(smoothProgress, [0, 0.35, 0.5], [0, 0, 1]);
  const waterY = useTransform(smoothProgress, [0, 0.35, 0.5], [40, 20, 0]); 
  const waterScale = useTransform(smoothProgress, [0.35, 0.5, 0.6], [0.8, 1.1, 1]);

  const landOpacity = useTransform(smoothProgress, [0, 0.65, 0.8], [0, 0, 1]);
  const landY = useTransform(smoothProgress, [0, 0.65, 0.8], [40, 20, 0]); 
  const landScale = useTransform(smoothProgress, [0.65, 0.8, 0.9], [0.8, 1.1, 1]);

  const stickerSpringTransition = {
    type: "spring" as const,
    stiffness: 150,
    damping: 12,
    mass: 0.8
  };

  return (
    <div ref={containerRef} className="relative h-[500vh] font-(--font-jakarta)">
      
      <motion.section 
        style={{ backgroundColor: dynamicBgColor }}
        className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden transition-colors"
      >
        
        <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        <div className="lg:hidden absolute top-28 left-6 z-20 flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.4, rotate: -15, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            viewport={{ once: true }}
            transition={stickerSpringTransition}
            className="bg-[#2D2A26] text-white text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-lg shadow-lg mb-2 w-max"
          >
            Scroll To See
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...stickerSpringTransition, delay: 0.1 }}
            className="relative font-black uppercase tracking-tighter leading-[0.85] text-[#2D2A26] text-[32px] min-[400px]:text-[38px]"
          >
            YOUR <br />
            <span className="highlight text-[26px] min-[400px]:text-[30px] mt-1.5">
              IMPACT
            </span>
          </motion.h2>
        </div>

        <div className="hidden lg:flex flex-col items-start absolute top-32 left-12 z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.4, rotate: -12, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            viewport={{ once: true }}
            transition={stickerSpringTransition}
            className="bg-[#2D2A26] text-white text-[11px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-lg shadow-xl mb-3 w-max"
          >
            Scroll To See
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8, y: 50, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ ...stickerSpringTransition, delay: 0.15 }}
            className="relative font-black uppercase tracking-tighter leading-[0.8] flex flex-col items-start text-[#2D2A26] text-[62px] xl:text-[72px]"
          >
            <span>YOUR</span>
            <span className="highlight text-[44px] xl:text-[54px] mt-2">
              IMPACT
            </span>
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 30, rotate: 8 }}
          whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ ...stickerSpringTransition, delay: 0.25 }}
          onMouseEnter={() => setIsHoveredMeals(true)}
          onMouseLeave={() => setIsHoveredMeals(false)}
          className="absolute top-28 right-4 lg:top-32 lg:right-12 z-30 bg-white/80 backdrop-blur-xl rounded-[20px] lg:rounded-4xl p-2 pr-3 lg:p-4 lg:pr-8 shadow-xl flex items-center gap-2 lg:gap-5 border border-white"
        >
          <motion.div 
            style={{ backgroundColor: dynamicEyeColor }}
            className="relative w-11 h-11 lg:w-16 lg:h-16 rounded-full shadow-lg flex flex-col items-center justify-center border-2 border-white backdrop-blur-md overflow-hidden transition-colors duration-500"
          >
            <div className="flex gap-1.5 lg:gap-2 mb-0 mt-2 lg:mt-3">
              <div className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                <motion.div 
                  animate={{ scale: isHoveredMeals ? 2.2 : 1 }} 
                  transition={{ duration: 0.3, type: "spring" }} 
                  className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-[#2D2A26] rounded-full" 
                />
              </div>
              <div className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                <motion.div 
                  animate={{ scale: isHoveredMeals ? 2.2 : 1 }} 
                  transition={{ duration: 0.3, type: "spring" }} 
                  className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-[#2D2A26] rounded-full" 
                />
              </div>
            </div>
            
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-6 h-6 lg:w-8 lg:h-8 overflow-visible mt-0.5 lg:mt-1">
              <motion.path 
                d={dynamicMouthPath} 
                stroke="#2D2A26" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                fill="none" 
              />
            </svg>
          </motion.div>

          <div className="flex flex-col">
            <span className="text-[8px] lg:text-[11px] font-black uppercase tracking-[0.2em] text-[#F28F3B] mb-0.5">Total Rescued</span>
            <div className="flex items-baseline gap-1 lg:gap-1.5">
              <motion.span className="text-2xl lg:text-5xl font-black tracking-tighter text-[#2D2A26]">
                {displayMeals}
              </motion.span>
              <span className="text-[9px] lg:text-sm font-bold uppercase text-[#2D2A26]/40">Meals</span>
            </div>
          </div>
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-25 lg:-translate-y-30 w-full max-w-[90%] lg:max-w-3xl px-4 lg:px-8 z-10 text-center pointer-events-none h-24">
          <motion.div style={{ opacity: stat1Opacity, y: stat1Y }} className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[#2D2A26]/80 text-base sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
              This impact is equivalent to planting <br/>
              <span className="font-black text-[#F28F3B]">50 mature trees</span><br/>
              and letting them grow for 10 years.
            </p>
          </motion.div>
          <motion.div style={{ opacity: stat2Opacity, y: stat2Y }} className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[#2D2A26]/80 text-base sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
              The water saved is enough to completely fill <br/>
              <span className="font-black text-[#F28F3B]">1 Olympic swimming pool!</span>
            </p>
          </motion.div>
          <motion.div style={{ opacity: stat3Opacity, y: stat3Y }} className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[#2D2A26]/80 text-base sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
              The preserved land equals the area of <br/>
              <span className="font-black text-[#F28F3B]">2 international football fields.</span>
            </p>
          </motion.div>
        </div>

        <div className="relative w-[95%] lg:w-[98%] ml-auto h-1 lg:h-1.5 bg-[#2D2A26]/10 z-10 rounded-l-full mt-[10vh] lg:mt-[15vh]">
          
          <div className="absolute top-1/2 left-[15%] w-3 h-3 lg:w-4 lg:h-4 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#2D2A26]/20" />
          <div className="absolute top-1/2 left-[50%] w-3 h-3 lg:w-4 lg:h-4 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#2D2A26]/20" />
          <div className="absolute top-1/2 left-[85%] w-3 h-3 lg:w-4 lg:h-4 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#2D2A26]/20" />

          <motion.div 
            style={{ scaleX: smoothProgress, originX: 0 }}
            className="absolute inset-0 bg-linear-to-r from-[#F28F3B] to-[#FF6B35] rounded-l-full shadow-[0_0_20px_rgba(242,143,59,0.5)]"
          />
          
          <RunningAvatar progress={smoothProgress} isReversing={isReversing} />

          <MetricBox 
            title="CO2 Prevented"
            value={displayCo2}
            unit="KG"
            icon={Cloud}
            iconColor="#10B981"
            imageSrc="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80"
            position={{ left: "15%", top: "calc(50% + 20px)" }} 
            style={{ 
              opacity: co2Opacity, y: co2Y, scale: co2Scale, 
              transformOrigin: "top center"
            }}
          />

          <MetricBox 
            title="Water Saved"
            value={displayWater}
            unit="Liters"
            icon={Droplets}
            iconColor="#3B82F6"
            imageSrc="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&w=400&q=80"
            position={{ left: "50%", top: "calc(50% + 20px)" }} 
            style={{ 
              opacity: waterOpacity, y: waterY, scale: waterScale, 
              transformOrigin: "top center"
            }}
          />

          <MetricBox 
            title="Land Preserved"
            value={displayLand}
            unit="m²"
            icon={Map}
            iconColor="#F59E0B"
            imageSrc="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80"
            position={{ left: "85%", top: "calc(50% + 20px)" }} 
            style={{ 
              opacity: landOpacity, y: landY, scale: landScale, 
              transformOrigin: "top center"
            }}
          />
        </div>
      </motion.section>
    </div>
  );
}