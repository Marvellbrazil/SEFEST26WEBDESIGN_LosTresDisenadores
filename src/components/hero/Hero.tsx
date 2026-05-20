/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useTransform, useSpring, useInView, useMotionValue, Variants } from 'framer-motion';
import {
  RiLeafLine,
  RiMapPinLine,
  RiSearchLine,
  RiPieChart2Line,
  RiLineChartLine,
  RiArrowRightUpLine
} from 'react-icons/ri';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { AnimatedCounter } from './AnimatedCounter';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(InertiaPlugin);
}

const throttle = <T extends Event>(func: (this: Window, event: T) => void, limit: number) => {
  let lastCall = 0;
  return function (this: Window, event: T) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.call(this, event);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
  triggerShockwaveRef?: React.MutableRefObject<((cx: number, cy: number) => void) | null>;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: Number.parseInt(m[1], 16),
    g: Number.parseInt(m[2], 16),
    b: Number.parseInt(m[3], 16)
  };
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style,
  triggerShockwaveRef
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const isInView = useInView(wrapperRef, { margin: "0px" });
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: 0, y: 0, vx: 0, vy: 0, speed: 0, lastTime: 0, lastX: 0, lastY: 0
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  const triggerShockwave = useCallback((cx: number, cy: number) => {
    for (const dot of dotsRef.current) {
      const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
      if (dist < shockRadius && !dot._inertiaApplied) {
        dot._inertiaApplied = true;
        gsap.killTweensOf(dot);
        const falloff = Math.max(0, 1 - dist / shockRadius);
        const pushX = (dot.cx - cx) * (shockStrength * 2.5) * falloff;
        const pushY = (dot.cy - cy) * (shockStrength * 2.5) * falloff;
        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance: resistance * 0.5 },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0, yOffset: 0, duration: returnDuration * 1.2, ease: 'elastic.out(1, 0.5)'
            });
            dot._inertiaApplied = false;
          }
        });
      }
    }
  }, [shockRadius, shockStrength, resistance, returnDuration]);

  useEffect(() => {
    if (triggerShockwaveRef) {
      triggerShockwaveRef.current = triggerShockwave;
    }
  }, [triggerShockwave, triggerShockwaveRef]);

  useEffect(() => {
    if (!circlePath || !isInView) return;
    let rafId: number;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath, isInView]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window && wrapperRef.current) {
      ro = new ResizeObserver(buildGrid);
      ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale; vy *= scale; speed = maxSpeed;
      }
      pr.lastTime = now; pr.lastX = e.clientX; pr.lastY = e.clientY;
      pr.vx = vx; pr.vy = vy; pr.speed = speed;

      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0, yOffset: 0, duration: returnDuration, ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    return () => window.removeEventListener('mousemove', throttledMove);
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, triggerShockwave]);

  return (
    <div className={`p-4 flex items-center justify-center h-full w-full relative ${className}`} style={style}>
      <div ref={wrapperRef} className="w-full h-full relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>
    </div>
  );
};

const marqueeTexts = [
  "RESCUE SURPLUS FOOD",
  "10X ENVIRONMENTAL IMPACT",
  "ZERO WASTE MOVEMENT",
  "FLASH SALE EVERYDAY",
  "SAVE OUR PLANET",
  "SUPPORT LOCAL BUSINESS",
  "RESCUE SURPLUS FOOD",
  "10X ENVIRONMENTAL IMPACT",
  "ZERO WASTE MOVEMENT",
  "FLASH SALE EVERYDAY",
  "SAVE OUR PLANET",
  "SUPPORT LOCAL BUSINESS"
];

const floatingCards = [
  {
    id: 'card-1',
    position: 'top-[15%] left-[10%] xl:left-[8%]',
    parallaxFactor: 25,
    delay: 0,
    content: (
      <div className="w-56 bg-white/95 backdrop-blur-xl border border-white rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] p-4 cursor-none">
        <div className="flex items-center gap-3 mb-3 border-b border-[#2D2A26]/5 pb-3">
          <div className="w-8 h-8 rounded-xl bg-[#F28F3B]/10 flex items-center justify-center text-[#F28F3B]">
            <RiLeafLine size={16} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-[#2D2A26]/50">Meals Rescued</p>
            <p className="text-[10px] font-bold text-[#2D2A26]/40">Last 30 Days</p>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-black text-[#2D2A26] tracking-tighter">
            <AnimatedCounter to={50000} />
          </span>
          <span className="text-sm font-black text-[#2D2A26] mb-1">+</span>
        </div>
      </div>
    ),
  },
  {
    id: 'card-2',
    position: 'top-[16%] right-[5%] xl:right-[10%]',
    parallaxFactor: -20,
    delay: 0.2,
    content: (
      <div className="w-52 bg-white/95 backdrop-blur-xl border border-white rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] p-4 cursor-none">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black uppercase tracking-wider text-[#2D2A26]/50">CO₂ Prevented</p>
          <RiPieChart2Line className="text-[#F28F3B]" size={16} />
        </div>
        <div className="flex items-end gap-1 mb-2">
          <span className="text-3xl font-black text-[#2D2A26] tracking-tighter">
            <AnimatedCounter to={1250} />
          </span>
          <span className="text-sm font-black text-[#2D2A26] mb-1">kg</span>
        </div>
        <div className="w-full h-1.5 bg-[#F4F3EE] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: '75%' }} 
            transition={{ duration: 1.5, delay: 1 }}
            className="h-full bg-[#F28F3B] rounded-full" 
          />
        </div>
      </div>
    ),
  },
  {
    id: 'card-3',
    position: 'bottom-[35%] left-[4%] xl:left-[8%]',
    parallaxFactor: 15,
    delay: 0.4,
    content: (
      <div className="w-60 bg-white/95 backdrop-blur-xl border border-white rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] p-4 cursor-none">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-wider text-[#2D2A26]/50">Live Schedule</span>
        </div>
        <div className="space-y-2">
          {[
            { time: '18:00', label: 'Bakery Surplus', status: 'Ready' },
            { time: '20:30', label: 'Sushi Boxes', status: 'Soon' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-[#F4F3EE]/50 p-2 rounded-xl border border-[#2D2A26]/5">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-[#2D2A26]/40">{item.time}</span>
                <span className="text-[11px] font-black text-[#2D2A26]">{item.label}</span>
              </div>
              <span className={`text-[9px] font-bold px-2 py-1 rounded-md ${item.status === 'Ready' ? 'bg-[#F28F3B]/10 text-[#F28F3B]' : 'bg-[#2D2A26]/5 text-[#2D2A26]/40'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'card-4',
    position: 'bottom-[32%] right-[4%] xl:right-[8%]',
    parallaxFactor: -25,
    delay: 0.6,
    content: (
      <div className="w-56 bg-white/95 backdrop-blur-xl border border-white rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] p-4 cursor-none">
        <div className="flex items-center justify-between mb-4 border-b border-[#2D2A26]/5 pb-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-[#2D2A26]/50">Partner Revenue</p>
          <RiLineChartLine className="text-[#F28F3B]" size={16} />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-end gap-1">
              <span className="text-xl font-black text-[#2D2A26] tracking-tighter">Rp</span>
              <span className="text-3xl font-black text-[#2D2A26] tracking-tighter">
                <AnimatedCounter to={150} />
              </span>
              <span className="text-sm font-black text-[#2D2A26] mb-1">M+</span>
            </div>
            <p className="text-[10px] font-bold text-[#2D2A26]/40 mt-1">Extra income generated</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F28F3B]/10 flex items-center justify-center text-[#F28F3B]">
            <RiArrowRightUpLine size={20} />
          </div>
        </div>
      </div>
    ),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 }
  }
};

const stickerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -15, y: 30 },
  show: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 150, damping: 12, mass: 0.8 }
  }
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchFieldRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const triggerShockwaveRef = useRef<((cx: number, cy: number) => void) | null>(null);
  
  const [isMounted, setIsMounted] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const searchMagnetX = useMotionValue(0);
  const searchMagnetY = useMotionValue(0);
  const mouseMagnetX = useMotionValue(0);
  const mouseMagnetY = useMotionValue(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left - rect.width / 2;
    const currentY = e.clientY - rect.top - rect.height / 2;
    
    mouseX.set(currentX);
    mouseY.set(currentY);

    if (searchFieldRef.current) {
      const sRect = searchFieldRef.current.getBoundingClientRect();
      const sCenterX = sRect.left + sRect.width / 2;
      const sCenterY = sRect.top + sRect.height / 2;
      const distX = e.clientX - sCenterX;
      const distY = e.clientY - sCenterY;
      const distance = Math.hypot(distX, distY);

      if (distance < 160) {
        searchMagnetX.set(distX * 0.35);
        searchMagnetY.set(distY * 0.35);
      } else {
        searchMagnetX.set(0);
        searchMagnetY.set(0);
      }
    }

    if (scrollIndicatorRef.current) {
      const indRect = scrollIndicatorRef.current.getBoundingClientRect();
      const indCenterX = indRect.left + indRect.width / 2;
      const indCenterY = indRect.top + indRect.height / 2;
      const indDist = Math.hypot(e.clientX - indCenterX, e.clientY - indCenterY);

      if (indDist < 120) {
        mouseMagnetX.set((e.clientX - indCenterX) * 0.4);
        mouseMagnetY.set((e.clientY - indCenterY) * 0.4);
      } else {
        mouseMagnetX.set(0);
        mouseMagnetY.set(0);
      }
    }
  };

  const handleInputInteraction = () => {
    if (searchFieldRef.current && triggerShockwaveRef.current) {
      const sRect = searchFieldRef.current.getBoundingClientRect();
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const cRect = canvas.getBoundingClientRect();
        const localX = (sRect.left + sRect.width / 2) - cRect.left;
        const localY = (sRect.top + sRect.height / 2) - cRect.top;
        triggerShockwaveRef.current(localX, localY);
      }
    }
  };

  const springConfig = { stiffness: 40, damping: 20, mass: 1 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const searchSpringX = useSpring(searchMagnetX, { stiffness: 120, damping: 14, mass: 0.6 });
  const searchSpringY = useSpring(searchMagnetY, { stiffness: 120, damping: 14, mass: 0.6 });

  const mouseSpringX = useSpring(mouseMagnetX, { stiffness: 100, damping: 12 });
  const mouseSpringY = useSpring(mouseMagnetY, { stiffness: 100, damping: 12 });

  return (
    <section id="hero"
      ref={containerRef}
      className="relative w-full min-h-svh flex flex-col items-center justify-between overflow-hidden bg-[#F4F3EE] pt-24 font-(--font-jakarta) select-none cursor-none"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0">
        <DotGrid 
          baseColor="#C2C1BC" 
          activeColor="#F28F3B" 
          dotSize={2} 
          gap={32} 
          proximity={150}
          speedTrigger={50}
          triggerShockwaveRef={triggerShockwaveRef}
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-[#F4F3EE]/40 via-transparent to-[#F4F3EE] pointer-events-none" />

      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#F28F3B] rounded-full blur-[140px] z-0 pointer-events-none" 
      />

      <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
        {floatingCards.map((card) => {
          const px = useTransform(mouseXSpring, [-500, 500], [card.parallaxFactor, -card.parallaxFactor]);
          const py = useTransform(mouseYSpring, [-500, 500], [card.parallaxFactor, -card.parallaxFactor]);

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + card.delay, type: 'spring', bounce: 0.4 }}
              style={isMounted ? { x: px, y: py } : {}}
              className={`absolute ${card.position} pointer-events-auto cursor-default hover:z-50`}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
              >
                {card.content}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-30 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center mt-4 flex-1 justify-center"
      >
        <motion.div
          variants={stickerVariants}
          className="bg-[#2D2A26] text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-md shadow-md mb-8 w-max relative z-40"
        >
          Eco Platform
        </motion.div>

        <motion.h1
          variants={itemFadeUpVariants}
          className="text-[#2D2A26] text-[40px] sm:text-[52px] md:text-[64px] xl:text-[72px] leading-[0.9] font-black uppercase tracking-tighter flex flex-col items-center"
        >
          <span>Rescue Delicious Food</span>
          <span className="highlight">
            Save Our Planet
          </span>
        </motion.h1>

        <motion.p
          variants={itemFadeUpVariants}
          className="text-[#2D2A26]/75 text-xs min-[400px]:text-sm sm:text-base md:text-lg max-w-2xl mt-8 mb-8 font-medium leading-relaxed"
        >
          A circular economy platform that connects conscious consumers with local eateries to save perfectly good food at flash-sale prices. 10x Impact. Automated.
        </motion.p>

        <motion.div
          variants={itemFadeUpVariants}
          className="flex items-center gap-4 mb-10 bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-sm"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                <Image 
                  src={`https://i.pravatar.cc/100?img=${i + 15}`} 
                  alt="user" width={32} height={32} className="w-full h-full object-cover" unoptimized
                />
              </div>
            ))}
          </div>
          <span className="text-[#2D2A26]/80 text-[11px] font-bold">12,000+ trusted users</span>
        </motion.div>

        <motion.div
          variants={itemFadeUpVariants}
          style={{ x: searchSpringX, y: searchSpringY }}
          className="w-full flex flex-col items-center gap-3 relative z-50 mb-10"
        >
          <div 
            ref={searchFieldRef}
            className="flex items-center w-125 max-w-70 sm:max-w-90 bg-white rounded-full p-1 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-[#2D2A26]/5 focus-within:ring-4 focus-within:ring-[#F28F3B]/20 transition-all duration-300"
          >
            <div className="flex-1 flex items-center gap-1.5 pl-3">
              <RiMapPinLine className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F28F3B] shrink-0" />
              <input
                type="text"
                onChange={handleInputInteraction}
                placeholder="City or zip code..."
                className="w-full text-xs sm:text-sm text-[#2D2A26] placeholder-[#2D2A26]/40 outline-none bg-transparent font-semibold py-1.5"
              />
            </div>
            <button 
              onClick={handleInputInteraction}
              className="bg-linear-to-r from-[#F28F3B] to-[#FF6B35] text-white font-bold px-4 py-2 rounded-full transition-all hover:shadow-[0_10px_25px_-5px_rgba(242,143,59,0.4)] flex items-center justify-center gap-1.5 text-xs whitespace-nowrap shrink-0 group"
            >
              <RiSearchLine className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline-block">Search</span>
            </button>
          </div>
          <p className="text-[9px] sm:text-[10px] text-[#2D2A26]/40 font-bold tracking-wide">
            No credit card required. Cancel anytime.
          </p>
        </motion.div>

      </motion.div>

      <div className="w-full bg-[#2D2A26] py-3 sm:py-2 overflow-hidden border-t border-b border-white/5 relative z-40 block shadow-[0_-15px_40px_rgba(0,0,0,0.05)] whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 55, ease: "linear", repeat: Infinity }}
          className="flex w-max shrink-0 max-w-none"
        >
          {[0, 1].map((blockIdx) => (
            <div key={`block-${blockIdx}`} className="flex shrink-0 items-center max-w-none">
              {[0, 1].map((setIdx) => (
                <React.Fragment key={`set-${blockIdx}-${setIdx}`}>
                  {marqueeTexts.map((text, idx) => (
                    <div key={`item-${blockIdx}-${setIdx}-${idx}`} className="flex items-center gap-10 sm:gap-16 px-5 sm:px-8 shrink-0 group max-w-none">
                      <span className="text-white/90 text-sm sm:text-base font-black tracking-[0.25em] uppercase transition-colors group-hover:text-[#F28F3B] whitespace-nowrap max-w-none">
                        {text}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-white/10 shrink-0 group-hover:bg-[#F28F3B]/50 transition-colors duration-300" />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  ); 
}