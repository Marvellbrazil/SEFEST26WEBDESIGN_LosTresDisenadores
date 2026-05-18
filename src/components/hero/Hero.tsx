'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import {
  RiLeafLine,
  RiStore2Line,
  RiMapPinLine,
  RiSearchLine,
  RiPieChart2Line,
  RiLineChartLine,
  RiArrowRightUpLine,
  RiCheckDoubleLine
} from 'react-icons/ri';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { AnimatedCounter } from './AnimatedCounter';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(InertiaPlugin);
}

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
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
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
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
  style
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const isInView = useInView(wrapperRef, { margin: "0px" });
  
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
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
    const hasResizeObserver = typeof ResizeObserver !== 'undefined';
    if (hasResizeObserver) {
      const ro = new ResizeObserver(buildGrid);
      if (wrapperRef.current) ro.observe(wrapperRef.current);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', buildGrid);
    return () => window.removeEventListener('resize', buildGrid);
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
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

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
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
    <div className={`p-4 flex items-center justify-center h-full w-full relative ${className}`} style={style}>
      <div ref={wrapperRef} className="w-full h-full relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>
    </div>
  );
};


const floatingCards = [
  {
    id: 'card-1',
    position: 'top-[15%] left-[5%] xl:left-[10%]',
    parallaxFactor: 25,
    delay: 0,
    content: (
      <div className="w-56 bg-white/95 backdrop-blur-xl border border-white rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] p-4">
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
    position: 'top-[12%] right-[5%] xl:right-[10%]',
    parallaxFactor: -20,
    delay: 0.2,
    content: (
      <div className="w-52 bg-white/95 backdrop-blur-xl border border-white rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] p-4">
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
    position: 'bottom-[25%] left-[4%] xl:left-[8%]',
    parallaxFactor: 15,
    delay: 0.4,
    content: (
      <div className="w-60 bg-white/95 backdrop-blur-xl border border-white rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] p-4">
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
    position: 'bottom-[22%] right-[4%] xl:right-[8%]',
    parallaxFactor: -25,
    delay: 0.6,
    content: (
      <div className="w-56 bg-white/95 backdrop-blur-xl border border-white rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] p-4">
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

const floatingAppIcons = [
  { icon: RiStore2Line, pos: 'bottom-[12%] left-[30%]', delay: 0 },
  { icon: RiLeafLine, pos: 'bottom-[8%] left-[45%]', delay: 0.2 },
  { icon: RiCheckDoubleLine, pos: 'bottom-[10%] right-[40%]', delay: 0.4 },
  { icon: RiMapPinLine, pos: 'bottom-[15%] right-[25%]', delay: 0.6 },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const springConfig = { stiffness: 40, damping: 20, mass: 1 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#F4F3EE] pt-28 pb-16 lg:py-0 font-[family:var(--font-jakarta)]"
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
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F3EE]/40 via-transparent to-[#F4F3EE]" />

      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F28F3B] rounded-full blur-[140px] z-0 pointer-events-none" 
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

        {floatingAppIcons.map((item, i) => {
          const px = useTransform(mouseXSpring, [-500, 500], [10, -10]);
          const py = useTransform(mouseYSpring, [-500, 500], [10, -10]);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + item.delay, type: 'spring' }}
              style={isMounted ? { x: px, y: py } : {}}
              className={`absolute ${item.pos} pointer-events-none`}
            >
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
                className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-black/5 text-[#2D2A26]"
              >
                <item.icon size={22} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-30 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center mt-[-4vh]">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
          className="w-16 h-16 bg-white rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center mb-10 border border-[#2D2A26]/5 relative z-40"
        >
          <RiLeafLine className="text-[#2D2A26] w-8 h-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[#2D2A26] text-[44px] sm:text-[64px] md:text-[80px] leading-[1.05] font-black tracking-tight"
        >
          Rescue Delicious Food<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28F3B] to-[#FF6B35]">
            Save Our Planet
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#2D2A26]/60 text-sm sm:text-base md:text-lg max-w-2xl mt-6 mb-8 font-medium leading-relaxed"
        >
          A circular economy platform that connects conscious consumers with local eateries to save perfectly good food at flash-sale prices. 10x Impact. Automated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4 mb-10 bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-sm"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                <Image 
                  src={`https://i.pravatar.cc/100?img=${i + 15}`} 
                  alt="user" 
                  width={32} 
                  height={32} 
                  className="w-full h-full object-cover" 
                  unoptimized
                />
              </div>
            ))}
          </div>
          <span className="text-[#2D2A26]/80 text-[11px] font-bold">12,000+ trusted users</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex flex-col items-center gap-3 relative z-50"
        >
          <div className="flex items-center w-[500px] max-w-[280px] sm:max-w-[300px] bg-white rounded-full p-1 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-[#2D2A26]/5 focus-within:ring-4 focus-within:ring-[#F28F3B]/20 transition-all">
            <div className="flex-1 flex items-center gap-1.5 pl-3">
              <RiMapPinLine className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F28F3B] shrink-0" />
              <input
                type="text"
                placeholder="City or zip code..."
                className="w-full text-xs sm:text-sm text-[#2D2A26] placeholder-[#2D2A26]/40 outline-none bg-transparent font-semibold py-1.5"
              />
            </div>
            <button className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white font-bold px-4 py-2 rounded-full transition-all hover:shadow-[0_10px_25px_-5px_rgba(242,143,59,0.4)] flex items-center justify-center gap-1.5 text-xs whitespace-nowrap shrink-0">
              <RiSearchLine className="w-3.5 h-3.5" />
              <span className="hidden sm:inline-block">Search</span>
            </button>
          </div>
          <p className="text-[9px] sm:text-[10px] text-[#2D2A26]/40 font-bold tracking-wide">
            No credit card required. Cancel anytime.
          </p>
        </motion.div>

      </div>
      
      <div className="hidden w-full overflow-x-auto pb-8 pt-12 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden flex gap-4 mt-4 relative z-40">
        {floatingCards.map((card) => (
          <div key={card.id} className="shrink-0 snap-center w-64">
             {card.content}
          </div>
        ))}
      </div>
    </section>
  );
}