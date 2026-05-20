/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/purity */
'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useMotionValue, useTransform, animate, useScroll, useSpring, AnimatePresence, useMotionTemplate } from 'framer-motion';
import { Trash2, Flame, CloudRain, DollarSign, Play, X, ArrowUpRight } from 'lucide-react';
import { RiLeafLine } from 'react-icons/ri';
import Image from 'next/image';

interface ChartProps {
  isHovered: boolean;
  color: string;
}

const MiniBarChart = ({ isHovered, color }: ChartProps) => (
  <div className="flex items-end gap-1.5 sm:gap-2 h-10 mt-4">
    {[40, 70, 50, 90, 60].map((height, i) => (
      <motion.div 
        key={i}
        initial={{ height: 0 }}
        animate={{ 
          height: isHovered ? [`${height}%`, `${Math.random() * 50 + 50}%`, `${height}%`] : `${height}%`,
          backgroundColor: isHovered ? '#FFFFFF' : color 
        }}
        transition={{ 
          duration: isHovered ? 0.3 : 1, 
          delay: isHovered ? i * 0.05 : 0.5 + (i * 0.1),
          repeat: isHovered ? Infinity : 0,
          ease: isHovered ? "circInOut" : "easeOut"
        }}
        className="w-3 sm:w-4 rounded-t-sm"
      />
    ))}
  </div>
);

const MiniRingChart = ({ isHovered, color }: ChartProps) => (
  <motion.div 
    animate={{ rotate: isHovered ? 360 : 0 }}
    transition={{ duration: isHovered ? 1.5 : 1, repeat: isHovered ? Infinity : 0, ease: "linear" }}
    className="relative w-10 h-10 sm:w-12 sm:h-12 mt-2"
  >
    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
      <path className="text-white/20" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      <motion.path 
        animate={{ 
          strokeDasharray: isHovered ? ["10, 100", "90, 100", "10, 100"] : "75, 100",
          color: isHovered ? '#FFFFFF' : color
        }}
        transition={{ duration: isHovered ? 1 : 1.5, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
        className="text-[#2D2A26]" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
      />
    </svg>
  </motion.div>
);

const MiniTrendLine = ({ isHovered }: ChartProps) => (
  <div className="w-20 h-8 sm:w-24 sm:h-10 mt-4 relative">
    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
      <motion.path
        animate={{ 
          pathLength: isHovered ? [0.2, 1, 0.2] : 1,
          stroke: isHovered ? '#FFFFFF' : '#2D2A26'
        }}
        transition={{ duration: isHovered ? 0.8 : 1.5, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
        d="M0,40 Q20,30 40,35 T80,15 T100,0"
        fill="none" strokeWidth="3" strokeLinecap="round"
      />
      <motion.circle 
        animate={{ 
          scale: isHovered ? [1, 1.5, 1] : 1,
          fill: isHovered ? '#FFFFFF' : '#F28F3B'
        }}
        transition={{ duration: isHovered ? 0.4 : 2, repeat: isHovered ? Infinity : 0 }}
        cx="100" cy="0" r="4" 
      />
    </svg>
  </div>
);

const MiniGaugeChart = ({ isHovered, color }: ChartProps) => (
  <div className="relative w-14 h-7 sm:w-16 sm:h-8 mt-4 overflow-visible">
    <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isHovered ? "rgba(255,255,255,0.3)" : "rgba(242,143,59,0.2)"} strokeWidth="8" strokeLinecap="round" />
      <motion.path 
        animate={{ 
          stroke: isHovered ? '#FFFFFF' : '#F28F3B', 
          pathLength: isHovered ? [0.4, 0.9, 0.4] : 0.85 
        }}
        transition={{ duration: isHovered ? 0.5 : 1.5, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
        d="M 10 50 A 40 40 0 0 1 90 50" fill="none" strokeWidth="8" strokeLinecap="round" 
      />
      <motion.line 
        animate={{ 
          rotate: isHovered ? [20, 100, 20] : 60,
          stroke: isHovered ? '#FFFFFF' : '#2D2A26'
        }}
        transition={{ duration: isHovered ? 0.3 : 1.5, repeat: isHovered ? Infinity : 0, type: isHovered ? "tween" : "spring", bounce: 0.4 }}
        style={{ transformOrigin: "50px 50px" }}
        x1="50" y1="50" x2="20" y2="20" strokeWidth="3" strokeLinecap="round" 
      />
      <motion.circle 
        cx="50" cy="50" r="6" 
        animate={{ fill: isHovered ? '#FFFFFF' : '#2D2A26' }} 
      />
    </svg>
  </div>
);

const problemCardData = [
  {
    id: 1,
    title: "Food Waste",
    value: 1300,
    unit: "Million Tons",
    description: "Global waste produced annually.",
    fullExplanation: "Sepertiga makanan global terbuang sia-sia karena logistik buruk dan standar retail berlebih. Ini memicu krisis pangan serius di tengah populasi kelaparan.",
    bgImage: "https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=600",
    color: "#F28F3B",
    icon: <Trash2 size={24} />,
    pos: { left: "4%", top: "10%" }, 
    rotation: -4,
    floatDelay: 0,
    Visual: MiniBarChart,
    cablePath: "M 250 280 C 400 280, 500 400, 600 400",
    nodeX: 250, nodeY: 280
  },
  {
    id: 2,
    title: "Carbon Footprint",
    value: 3.3,
    unit: "Billion Tons",
    description: "CO2 equivalent gases released.",
    fullExplanation: "Proses pertanian intensif, pembukaan lahan hutan, dan rantai distribusi global yang panjang menghasilkan miliaran ton emisi gas rumah kaca berbahaya ke atmosfer.",
    bgImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600",
    color: "#2D2A26",
    icon: <CloudRain size={24} />,
    pos: { right: "4%", top: "10%" }, 
    rotation: 5,
    floatDelay: 0.5,
    Visual: MiniRingChart,
    cablePath: "M 950 260 C 800 260, 700 400, 600 400",
    nodeX: 950, nodeY: 260
  },
  {
    id: 3,
    title: "Economic Loss",
    value: 940,
    unit: "Billion USD",
    description: "Value lost due to discarded food.",
    fullExplanation: "Pembuangan makanan memicu kerugian finansial global raksasa, menguapkan nilai investasi air bersih, tenaga kerja, dan subsidi energi secara cuma-cuma.",
    bgImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600",
    color: "#2D2A26",
    icon: <DollarSign size={24} />,
    pos: { left: "6%", bottom: "16%" }, 
    rotation: 3,
    floatDelay: 1,
    Visual: MiniTrendLine,
    cablePath: "M 250 680 C 400 680, 500 400, 600 400",
    nodeX: 250, nodeY: 680
  },
  {
    id: 4,
    title: "Methane Impact",
    value: 25,
    unit: "Times Potency",
    description: "Methane traps heat far faster.",
    fullExplanation: "Tumpukan sampah makanan organik di TPA membusuk tanpa oksigen, menghasilkan gas metana dengan daya rusak atmosfer 25 kali lipat lebih agresif dari CO2.",
    bgImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=600",
    color: "#F28F3B",
    icon: <Flame size={24} />,
    pos: { right: "5%", bottom: "18%" },
    rotation: -5,
    floatDelay: 1.5,
    Visual: MiniGaugeChart,
    cablePath: "M 950 660 C 800 660, 700 400, 600 400",
    nodeX: 950, nodeY: 660
  }
];

const reelImages1 = [
  "https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=800",
  "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=800",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
];
const repeatedReel1 = [...reelImages1, ...reelImages1, ...reelImages1, ...reelImages1];

const AnimatedNumber = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    value % 1 === 0 ? Math.floor(latest).toLocaleString() : latest.toFixed(1)
  );

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
};

const TiltCard = ({ children, className, isDesktop }: { children: React.ReactNode; className?: string; isDesktop: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isDesktop ? ["12deg", "-12deg"] : ["0deg", "0deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isDesktop ? ["-12deg", "12deg"] : ["0deg", "0deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.9) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isDesktop) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative overflow-hidden group ${className}`}
    >
      <div className="absolute -inset-full bg-linear-to-tr from-transparent via-white/40 to-transparent w-[300%] h-[300%] -rotate-45 translate-x-[-60%] pointer-events-none mix-blend-overlay" />
      {isDesktop && (
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none opacity-60 mix-blend-overlay transition-opacity duration-300"
          style={{ background: glareBackground }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default function Section3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const smileyContainerRef = useRef<HTMLDivElement>(null);
  
  const [isDesktop, setIsDesktop] = useState(true);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const smoothMagnetX = useSpring(magnetX, { stiffness: 100, damping: 15, mass: 0.5 });
  const smoothMagnetY = useSpring(magnetY, { stiffness: 100, damping: 15, mass: 0.5 });

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSpringX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 300, damping: 25 });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const reel1X = useTransform(springScroll, [0, 1], ["0%", "-40%"]);
  const reel2X = useTransform(springScroll, [0, 1], ["-40%", "0%"]);

  const sec2Scale = useTransform(scrollYProgress, [0.4, 1], [0.7, 1]);
  const sec2Rotate = useTransform(scrollYProgress, [0.4, 1], [8.5, 0]);

  useEffect(() => {
    const checkDevice = () => setIsDesktop(window.innerWidth >= 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (smileyContainerRef.current) {
        const { left, top, width, height } = smileyContainerRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.hypot(distX, distY);

        if (distance < 300) { 
          magnetX.set(distX * 0.4); 
          magnetY.set(distY * 0.4);
        } else {
          magnetX.set(0); 
          magnetY.set(0);
        }

        const eyes = [leftEyeRef.current, rightEyeRef.current];
        eyes.forEach((eye) => {
          if (!eye) return;
          const rect = eye.getBoundingClientRect();
          const angle = Math.atan2(e.clientY - (rect.top + rect.height/2), e.clientX - (rect.left + rect.width/2));
          const eyeDist = Math.min(8, distance / 10);
          gsap.to(eye, { x: Math.cos(angle) * eyeDist, y: Math.sin(angle) * eyeDist, duration: 0.3, ease: "power2.out" });
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDesktop, magnetX, magnetY, cursorX, cursorY]);

  return (
    <div id="problem" ref={containerRef} className="relative w-full max-w-full overflow-x-hidden font-(--font-jakarta) bg-[#F4F3EE] lg:h-[220vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      <style jsx global>{`
        #problem *::-webkit-scrollbar {
          display: none !important;
        }
        #problem * {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
      
      {isDesktop && (
        <motion.div
          style={{ x: cursorSpringX, y: cursorSpringY, translateX: "-50%", translateY: "-50%" }}
          animate={{
            scale: isHoveringVideo && !showModal ? 1 : 0,
            opacity: isHoveringVideo && !showModal ? 1 : 0,
          }}
          className="fixed top-0 left-0 z-150 w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-br from-[#F28F3B] to-[#FF6B35] rounded-full flex flex-col items-center justify-center text-white shadow-[0_10px_30px_rgba(242,143,59,0.5)] pointer-events-none"
        >
          <Play fill="white" size={32} className="ml-1" />
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Play</span>
        </motion.div>
      )}

      <section className="relative lg:sticky lg:top-0 w-full max-w-full overflow-hidden min-h-screen z-20 flex flex-col pt-12 lg:pt-8 px-4 lg:px-0 pb-10">
        
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex flex-col justify-center gap-10"
          >
            <motion.div style={{ x: reel1X }} className="flex gap-6 w-max max-w-none -rotate-6 transform-gpu">
              {repeatedReel1.map((src, idx) => (
                <div key={`reel1-${idx}`} className="w-75 md:w-100 h-50 md:h-62.5 rounded-3xl overflow-hidden shrink-0 shadow-sm border border-black/5 max-w-none">
                  <img src={src} alt="Background Reel" className="w-full h-full object-cover max-w-none" />
                </div>
              ))}
            </motion.div>
            <motion.div style={{ x: reel2X }} className="flex gap-6 w-max max-w-none -rotate-3 transform-gpu">
              {repeatedReel1.map((src, idx) => (
                <div key={`reel2-${idx}`} className="w-75 md:w-100 h-50 md:h-62.5 rounded-3xl overflow-hidden shrink-0 shadow-sm border border-black/5 max-w-none">
                  <img src={src} alt="Background Reel" className="w-full h-full object-cover max-w-none" />
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 bg-[#F4F3EE]/85 z-0" />
          <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[5%] right-[5%] w-75 lg:w-150 h-75 lg:h-150 bg-[#F28F3B] rounded-full blur-[100px] lg:blur-[150px] opacity-20" />
          <motion.div animate={{ x: [0, -100, 0], y: [0, 50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] left-[5%] w-75 lg:w-125 h-75 lg:h-125 bg-[#2D2A26] rounded-full blur-[100px] lg:blur-[150px] opacity-10" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="hidden lg:block absolute top-[30%] left-[25%] text-[#F28F3B]/10 z-0 pointer-events-none"
          >
            <motion.div animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <RiLeafLine size={80} />
            </motion.div>
          </motion.div>
        </div>

        <div className="relative lg:absolute lg:top-0 w-full flex flex-col items-center justify-center text-center z-30 pt-16 lg:pt-24 mb-0 select-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.4, rotate: -20, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.8 }}
            className="bg-[#2D2A26] text-white text-[9px] sm:text-xs font-black uppercase tracking-[0.3em] px-3 py-1 rounded-md shadow-md mb-2"
          >
            The Critical Chaos
          </motion.div>
          
          <h2 className="relative font-black uppercase tracking-tighter leading-[0.8] flex flex-col items-center">
            <motion.span 
              initial={{ y: 80, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="text-[38px] sm:text-[60px] md:text-[75px] lg:text-[85px] text-[#2D2A26] block tracking-tight"
            >
              THE PROBLEM
            </motion.span>
            
            <motion.span 
              initial={{ scale: 0.4, opacity: 0, rotate: 15, y: 30 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -1.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 150, damping: 12 }}
              className="highlight text-[20px] sm:text-[32px] md:text-[40px] lg:text-[44px] mt-2"
            >
              WE FACE
            </motion.span>
          </h2>
        </div>

        <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:block h-auto lg:h-180 justify-center z-20 pt-20 lg:pt-36 overflow-hidden">
          
          {isDesktop && (
            <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
              <defs>
                {problemCardData.map((card) => (
                  <linearGradient key={`grad-${card.id}`} id={`cableGrad-${card.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F28F3B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor={card.color} stopOpacity="1" />
                  </linearGradient>
                ))}
              </defs>
              
              {problemCardData.map((card) => {
                const isHovered = hoveredCard === card.id;
                return (
                  <motion.g 
                    key={`cable-group-${card.id}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: card.floatDelay }}
                  >
                    <path d={card.cablePath} fill="none" stroke="#2D2A26" strokeWidth="2" strokeOpacity="0.1" />
                    <motion.path 
                      d={card.cablePath} 
                      fill="none" 
                      stroke={`url(#cableGrad-${card.id})`}
                      strokeWidth={isHovered ? "4" : "0"}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isHovered ? 1 : 0, strokeDasharray: isHovered ? "10, 5" : "0" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="drop-shadow-[0_0_8px_rgba(242,143,59,0.5)]"
                    />
                    {isHovered && (
                      <motion.path 
                        d={card.cablePath} 
                        fill="none" 
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeDasharray="15, 150"
                        animate={{ strokeDashoffset: [-165, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    <circle cx={card.nodeX} cy={card.nodeY} r="8" fill="#2D2A26" fillOpacity="0.1" />
                    <motion.circle 
                      cx={card.nodeX} cy={card.nodeY} r="4" 
                      fill={isHovered ? card.color : "#2D2A26"} 
                      animate={{ scale: isHovered ? [1, 1.5, 1] : 1, opacity: isHovered ? 1 : 0.3 }}
                      transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                    />
                  </motion.g>
                );
              })}
            </svg>
          )}

          <motion.div 
            ref={smileyContainerRef}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.3 }}
            style={isDesktop ? { x: smoothMagnetX, y: smoothMagnetY } : {}}
            className="relative lg:absolute lg:left-1/2 lg:top-[50%] lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 flex items-center justify-center mb-16 sm:mb-20 lg:mb-0 mt-8 sm:mt-12 lg:mt-0"
          >
            {isDesktop && (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute w-70 h-70 pointer-events-none opacity-20">
                <svg viewBox="0 0 200 200" className="w-full h-full fill-[#2D2A26]">
                  <path id="textPath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" />
                  <text className="text-[14px] font-black uppercase tracking-[0.2em]">
                    <textPath href="#textPath" startOffset="0%">SAVE FOOD • PROTECT PLANET • REDUCE WASTE • </textPath>
                  </text>
                </svg>
              </motion.div>
            )}

            <div className="relative w-36 h-36 sm:w-44 sm:h-44 xl:w-48 xl:h-48 rounded-full bg-linear-to-br from-[#F28F3B] to-[#FF6B35] shadow-[0_25px_50px_rgba(242,143,59,0.3)] flex flex-col items-center justify-center border-4 sm:border-[5px] border-white backdrop-blur-md cursor-none z-20 transition-transform duration-300">
              <div className="flex gap-4 sm:gap-5 xl:gap-6 mb-2 sm:mb-3">
                <div className="w-7 h-7 sm:w-9 sm:h-9 xl:w-10 xl:h-10 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-black/5">
                  <div ref={leftEyeRef} className="flex items-center justify-center w-full h-full">
                    <motion.div animate={{ scale: hoveredCard ? 2.5 : 1 }} transition={{ duration: 0.3, type: "spring", bounce: 0.5 }} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 xl:w-4 bg-[#2D2A26] rounded-full" />
                  </div>
                </div>
                <div className="w-7 h-7 sm:w-9 sm:h-9 xl:w-10 xl:h-10 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-black/5">
                  <div ref={rightEyeRef} className="flex items-center justify-center w-full h-full">
                    <motion.div animate={{ scale: hoveredCard ? 2.5 : 1 }} transition={{ duration: 0.3, type: "spring", bounce: 0.5 }} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 xl:w-4 bg-[#2D2A26] rounded-full" />
                  </div>
                </div>
              </div>
              <motion.div 
                animate={{ width: hoveredCard ? "1.25rem" : "2.5rem", height: hoveredCard ? "1.75rem" : "0.65rem", borderRadius: hoveredCard ? "50%" : "9999px" }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.5 }}
                className="mt-1.5 opacity-80 xl:h-3.5 sm:h-3 bg-[#2D2A26]" 
              />
            </div>
          </motion.div>

          <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:block relative z-30 px-4 sm:px-6 lg:px-0 h-full pb-4 overflow-hidden">
            {problemCardData.map((card, idx) => {
              const isHovered = hoveredCard === card.id;

              return (
                <motion.div 
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={isDesktop ? { position: 'absolute', ...card.pos, zIndex: isHovered ? 40 : 30, width: '100%', maxWidth: '300px', perspective: '1000px' } : {}}
                  className="w-full relative lg:absolute"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 40, scale: 0.9 }} 
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotate: isDesktop ? card.rotation : 0 }} 
                    viewport={{ once: true, margin: "-5%" }} 
                    transition={{ duration: 0.8, delay: isDesktop ? 0.3 + idx * 0.12 : 0.2, type: "spring", bounce: 0.4 }}
                  >
                    <motion.div
                      animate={isDesktop ? { y: [0, -12, 0] } : {}}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.floatDelay }}
                    >
                      <TiltCard isDesktop={isDesktop} className="w-full rounded-[20px] sm:rounded-[28px]">
                        <motion.div
                          animate={{
                            backgroundColor: isHovered ? card.color : "#FFFFFF",
                            borderColor: isHovered ? card.color : "#E4E4E7",
                            scale: isHovered ? 1.03 : 1,
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="flex flex-col h-full relative border-2 p-4 sm:p-5 rounded-[20px] sm:rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden"
                        >
                          <motion.div 
                            animate={{ color: isHovered ? "#FFFFFF" : "#2D2A26" }}
                            style={{ transform: isDesktop ? "translateZ(40px)" : "none" }} 
                            className="flex flex-col h-full relative z-10"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <motion.div 
                                animate={{ 
                                  backgroundColor: isHovered ? "rgba(255,255,255,0.2)" : "rgba(244,243,238,1)",
                                  color: isHovered ? "#FFFFFF" : card.color,
                                  rotate: isHovered ? [0, -10, 10, -10, 0] : 0
                                }}
                                transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                                className="p-2 sm:p-2.5 rounded-xl shadow-inner"
                              >
                                {card.icon}
                              </motion.div>
                              <div className="h-8 sm:h-10 flex items-center">
                                <card.Visual isHovered={isHovered} color={card.color} />
                              </div>
                            </div>

                            <div className="mt-1 relative">
                              <motion.h3 
                                animate={{ color: isHovered ? "rgba(255,255,255,0.7)" : "rgba(45,42,38,0.5)" }}
                                className="text-[10px] font-black uppercase tracking-[0.15em] mb-0.5"
                              >
                                {card.title}
                              </motion.h3>
                              <div className="flex items-baseline gap-1 mb-0.5">
                                <span className="text-2xl sm:text-3xl font-black tracking-tighter leading-none drop-shadow-sm">
                                  <AnimatedNumber value={card.value} />
                                </span>
                              </div>
                              <motion.p 
                                animate={{ color: isHovered ? "#FFFFFF" : "#F28F3B" }}
                                className="text-[9px] font-bold uppercase tracking-wider mb-1.5"
                              >
                                {card.unit}
                              </motion.p>
                              <motion.div 
                                animate={{ background: isHovered ? "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%)" : "linear-gradient(90deg, rgba(45,42,38,0.1) 0%, transparent 100%)" }}
                                className="w-full h-px mb-1.5" 
                              />
                              <motion.p 
                                animate={{ color: isHovered ? "rgba(255,255,255,0.9)" : "rgba(45,42,38,0.6)" }}
                                className="text-xs font-medium leading-relaxed"
                              >
                                {card.description}
                              </motion.p>

                              <motion.div
                                animate={{ opacity: isHovered ? 0 : 1 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#2D2A26]/5 backdrop-blur-sm flex items-center justify-center text-[#2D2A26]/60 transition-colors group-hover:bg-transparent"
                              >
                                <ArrowUpRight size={16} />
                              </motion.div>

                              <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ 
                                  height: isHovered ? "auto" : 0, 
                                  opacity: isHovered ? 1 : 0,
                                  marginTop: isHovered ? 12 : 0
                                }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden flex flex-col gap-2.5"
                              >
                                <p className="text-[12px] leading-relaxed text-white/90 font-medium bg-black/10 p-2.5 rounded-xl border border-white/10">
                                  {card.fullExplanation}
                                </p>
                                <div className="w-full h-24 rounded-xl overflow-hidden shadow-md relative border border-white/20">
                                  <Image
                                    width={0}
                                    height={0}
                                    src={card.bgImage} 
                                    alt={card.title} 
                                    className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                                </div>
                              </motion.div>

                            </div>
                          </motion.div>
                        </motion.div>
                      </TiltCard>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      <div className="w-full h-[5vh] lg:h-[12vh] pointer-events-none z-10 relative" />

      <motion.section 
        style={isDesktop ? { scale: sec2Scale, rotate: sec2Rotate, transformOrigin: "bottom center" } : {}}
        className="relative z-10 w-full max-w-full overflow-hidden lg:h-[120vh] flex items-center justify-center px-4 md:px-6 pt-16 pb-24 lg:py-0"
      >
        <TiltCard isDesktop={isDesktop} className="w-full max-w-6xl mx-auto aspect-4/3 sm:aspect-video rounded-3xl sm:rounded-4xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] border border-white/50">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            onMouseEnter={() => setIsHoveringVideo(true)}
            onMouseLeave={() => setIsHoveringVideo(false)}
            onClick={() => setShowModal(true)}
            className="w-full h-full lg:cursor-none transition-transform hover:scale-[1.01] duration-500 relative"
          >
            <div className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500">
              <iframe className="w-full h-full pointer-events-none scale-105" src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1&mute=1&loop=1&playlist=ishA6kry8nc&controls=0&modestbranding=1&rel=0" allow="autoplay; encrypted-media" title='Food Saving Education Video' />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-[#2D2A26]/90 via-[#2D2A26]/20 to-transparent z-10 pointer-events-none" />
            
            <div className="absolute bottom-6 md:bottom-24 left-6 md:left-12 right-6 md:right-12 z-20 text-white pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex items-center gap-3 mb-4 md:mb-5"
              >
                <div className="h-1.5 w-10 md:w-14 bg-[#F28F3B] rounded-full" />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/80">Click to Play with Sound</span>
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.9]"
              >
                Saving Food,<br />
                <span className="text-[#F28F3B]">Empowering Locals.</span>
              </motion.h3>
            </div>

            {!isDesktop && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#F28F3B] rounded-full flex items-center justify-center text-white shadow-lg pointer-events-none z-20">
                <Play fill="white" size={24} className="ml-1" />
              </div>
            )}
          </motion.div>
        </TiltCard>
      </motion.section>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-200 bg-[#F4F3EE]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
            <button onClick={() => setShowModal(false)} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-[#2D2A26] hover:text-[#F28F3B] transition-colors z-210 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl"><X size={20} className="sm:w-6 sm:h-6"/></button>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-6xl aspect-video rounded-2xl sm:rounded-4xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/50">
              <iframe className="w-full h-full bg-[#2D2A26]" src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1&mute=0&controls=1&rel=0" allow="autoplay; encrypted-media" allowFullScreen title='Food Saving Education Video' />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}