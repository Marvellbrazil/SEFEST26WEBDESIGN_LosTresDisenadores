'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useMotionValue, useTransform, animate, useScroll, useSpring, AnimatePresence, useMotionTemplate } from 'framer-motion';
import { Trash2, Flame, CloudRain, DollarSign, Play, X } from 'lucide-react';
import { RiLeafLine } from 'react-icons/ri';

const MiniBarChart = () => (
  <div className="flex items-end gap-1.5 sm:gap-2 h-10 mt-4">
    {[40, 70, 50, 90, 60].map((height, i) => (
      <motion.div 
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${height}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
        className="w-3 sm:w-4 bg-[#F28F3B] rounded-t-sm"
      />
    ))}
  </div>
);

const MiniRingChart = () => (
  <div className="relative w-10 h-10 sm:w-12 sm:h-12 mt-2">
    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
      <path className="text-[#2D2A26]/10" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      <motion.path 
        initial={{ strokeDasharray: "0, 100" }}
        whileInView={{ strokeDasharray: "75, 100" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="text-[#2D2A26]" strokeWidth="4" strokeDasharray="75, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
      />
    </svg>
  </div>
);

const MiniTrendLine = () => (
  <div className="w-20 h-8 sm:w-24 sm:h-10 mt-4 relative">
    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        d="M0,40 Q20,30 40,35 T80,15 T100,0"
        fill="none"
        stroke="#2D2A26"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <motion.circle 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2 }}
        cx="100" cy="0" r="4" fill="#F28F3B" 
      />
    </svg>
  </div>
);

const MiniGaugeChart = () => (
  <div className="relative w-14 h-7 sm:w-16 sm:h-8 mt-4 overflow-visible">
    <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F28F3B" strokeOpacity="0.2" strokeWidth="8" strokeLinecap="round" />
      <motion.path 
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 0.85 }} 
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F28F3B" strokeWidth="8" strokeLinecap="round" 
      />
      <motion.line 
        initial={{ rotate: -90, transformOrigin: "50px 50px" }}
        whileInView={{ rotate: 60, transformOrigin: "50px 50px" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5, type: "spring", bounce: 0.4 }}
        x1="50" y1="50" x2="20" y2="20" stroke="#2D2A26" strokeWidth="3" strokeLinecap="round" 
      />
      <circle cx="50" cy="50" r="6" fill="#2D2A26" />
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
    color: "#F28F3B",
    icon: <Trash2 size={24} />,
    pos: { left: "6%", top: "25%" }, 
    rotation: -4,
    floatDelay: 0,
    Visual: MiniBarChart
  },
  {
    id: 2,
    title: "Carbon Footprint",
    value: 3.3,
    unit: "Billion Tons",
    description: "CO2 equivalent gases released.",
    color: "#2D2A26",
    icon: <CloudRain size={24} />,
    pos: { right: "6%", top: "20%" }, 
    rotation: 5,
    floatDelay: 0.5,
    Visual: MiniRingChart
  },
  {
    id: 3,
    title: "Economic Loss",
    value: 940,
    unit: "Billion USD",
    description: "Value lost due to discarded food.",
    color: "#2D2A26",
    icon: <DollarSign size={24} />,
    pos: { left: "10%", bottom: "16%" }, 
    rotation: 3,
    floatDelay: 1,
    Visual: MiniTrendLine
  },
  {
    id: 4,
    title: "Methane Impact",
    value: 25,
    unit: "Times Potency",
    description: "Methane traps heat far faster.",
    color: "#F28F3B",
    icon: <Flame size={24} />,
    pos: { right: "10%", bottom: "14%" },
    rotation: -5,
    floatDelay: 1.5,
    Visual: MiniGaugeChart 
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
      className={`relative rounded-[24px] sm:rounded-[32px] overflow-hidden group ${className}`}
    >
      <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/40 to-transparent w-[300%] h-[300%] -rotate-45 -translate-x-[60%] pointer-events-none mix-blend-overlay" />
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
        const distance = Math.sqrt(distX ** 2 + distY ** 2);

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
    <div id="problem" ref={containerRef} className="relative w-full font-[family:var(--font-jakarta)] bg-[#F4F3EE] lg:h-[250vh]">
      
      {isDesktop && (
        <motion.div
          style={{ x: cursorSpringX, y: cursorSpringY, translateX: "-50%", translateY: "-50%" }}
          animate={{
            scale: isHoveringVideo && !showModal ? 1 : 0,
            opacity: isHoveringVideo && !showModal ? 1 : 0,
          }}
          className="fixed top-0 left-0 z-[150] w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#F28F3B] to-[#FF6B35] rounded-full flex flex-col items-center justify-center text-white shadow-[0_10px_30px_rgba(242,143,59,0.5)] pointer-events-none"
        >
          <Play fill="white" size={32} className="ml-1" />
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Play</span>
        </motion.div>
      )}

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex flex-col justify-center gap-10 opacity-15 grayscale">
        <motion.div style={{ x: reel1X }} className="flex gap-6 w-max -rotate-6 transform-gpu">
          {repeatedReel1.map((src, idx) => (
            <div key={`reel1-${idx}`} className="w-[300px] md:w-[400px] h-[200px] md:h-[250px] rounded-3xl overflow-hidden shrink-0 shadow-sm border border-black/5">
              <img src={src} alt="Background Reel" className="w-full h-full object-cover" />
            </div>
          ))}
        </motion.div>
        <motion.div style={{ x: reel2X }} className="flex gap-6 w-max -rotate-3 transform-gpu">
          {repeatedReel1.map((src, idx) => (
            <div key={`reel2-${idx}`} className="w-[300px] md:w-[400px] h-[200px] md:h-[250px] rounded-3xl overflow-hidden shrink-0 shadow-sm border border-black/5">
              <img src={src} alt="Background Reel" className="w-full h-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[5%] right-[5%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-[#F28F3B] rounded-full blur-[100px] lg:blur-[150px] z-0 pointer-events-none opacity-20" />
      <motion.div animate={{ x: [0, -100, 0], y: [0, 50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] left-[5%] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[#2D2A26] rounded-full blur-[100px] lg:blur-[150px] z-0 pointer-events-none opacity-10" />

      <motion.div animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="hidden lg:block absolute top-[30%] left-[25%] text-[#F28F3B]/10 z-0 pointer-events-none">
        <RiLeafLine size={80} />
      </motion.div>

      <section className="lg:sticky lg:top-0 w-full min-h-screen z-10 flex flex-col pt-24 lg:pt-0 overflow-hidden px-4 lg:px-0">
        
        <div className="relative lg:absolute lg:top-12 xl:top-16 w-full text-center z-30 mb-8 lg:mb-0">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-sm border border-white/40 rounded-full mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F28F3B] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2D2A26]/50">The Global Crisis</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl md:text-[80px] font-black uppercase tracking-tighter leading-none text-[#2D2A26] drop-shadow-sm">
            The Problem <br className="lg:hidden" /><span className="text-[#F28F3B]">We Face.</span>
          </motion.h2>
        </div>

        <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:block h-auto lg:h-[800px] items-center justify-center pb-20 lg:pb-0 z-20">
          
          <motion.div 
            ref={smileyContainerRef}
            style={isDesktop ? { x: smoothMagnetX, y: smoothMagnetY } : {}}
            className="relative lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 flex items-center justify-center mb-10 lg:mb-0 mt-8 lg:mt-0"
          >
            {isDesktop && (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[350px] h-[350px] pointer-events-none opacity-20"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full fill-[#2D2A26]">
                  <path id="textPath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" />
                  <text className="text-[14px] font-black uppercase tracking-[0.2em]">
                    <textPath href="#textPath" startOffset="0%">
                      SAVE FOOD • PROTECT PLANET • REDUCE WASTE • 
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            )}

            <div className="relative w-40 h-40 sm:w-48 sm:h-48 xl:w-60 xl:h-60 rounded-full bg-gradient-to-br from-[#F28F3B] to-[#FF6B35] shadow-[0_30px_60px_rgba(242,143,59,0.3)] flex flex-col items-center justify-center border-[4px] sm:border-[6px] border-white backdrop-blur-md cursor-none z-10">
              <div className="flex gap-5 sm:gap-6 xl:gap-8 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-black/5">
                  <div ref={leftEyeRef} className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 bg-[#2D2A26] rounded-full" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-black/5">
                  <div ref={rightEyeRef} className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 bg-[#2D2A26] rounded-full" />
                </div>
              </div>
              <div className="w-12 sm:w-16 xl:w-20 h-3 sm:h-4 xl:h-5 bg-[#2D2A26] rounded-full mt-2 opacity-80" />
            </div>
          </motion.div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:block relative z-30 px-4 lg:px-0 h-full">
            {problemCardData.map((card, idx) => (
              <motion.div 
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={isDesktop ? { position: 'absolute', ...card.pos, zIndex: 30, width: '100%', maxWidth: '340px', perspective: '1000px' } : {}}
                className="w-full relative lg:absolute"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0, rotate: isDesktop ? card.rotation : 0 }} 
                  viewport={{ once: true, margin: "-5%" }} 
                  transition={{ duration: 0.6, delay: isDesktop ? 0.2 + idx * 0.1 : 0 }}
                >
                  <motion.div
                    animate={isDesktop ? { y: [0, -15, 0] } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.floatDelay }}
                  >
                    <TiltCard 
                      isDesktop={isDesktop}
                      className={`
                        bg-white/80 backdrop-blur-3xl border-2 p-5 sm:p-6 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.05)]
                        ${hoveredCard === card.id ? 'border-[#F28F3B]/80 bg-white shadow-[0_20px_60px_rgba(242,143,59,0.25)] scale-[1.02]' : 'border-white/80 hover:border-white'}
                      `}
                    >
                      <div style={{ transform: isDesktop ? "translateZ(40px)" : "none" }} className="flex flex-col h-full">
                        
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-2.5 sm:p-3 rounded-2xl shadow-inner transition-colors duration-300 ${hoveredCard === card.id ? 'bg-[#F28F3B]/10' : 'bg-[#F4F3EE]'}`} style={{ color: card.color }}>
                            {card.icon}
                          </div>
                          <div className="h-10 sm:h-12 flex items-center">
                            <card.Visual />
                          </div>
                        </div>

                        <div className="mt-1">
                          <h3 className="text-[10px] sm:text-[11px] font-black text-[#2D2A26]/50 uppercase tracking-[0.15em] mb-1">{card.title}</h3>
                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-3xl sm:text-4xl font-black text-[#2D2A26] tracking-tighter leading-none drop-shadow-sm">
                              <AnimatedNumber value={card.value} />
                            </span>
                          </div>
                          <p className="text-[9px] sm:text-[10px] font-bold text-[#F28F3B] uppercase tracking-wider mb-2">{card.unit}</p>
                          <div className="w-full h-px bg-gradient-to-r from-[#2D2A26]/10 to-transparent mb-2" />
                          <p className="text-[#2D2A26]/60 text-xs sm:text-sm font-medium leading-relaxed">{card.description}</p>
                        </div>

                      </div>
                    </TiltCard>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <div className="hidden lg:block h-[50vh] w-full pointer-events-none" />

      <motion.section 
        style={isDesktop ? { scale: sec2Scale, rotate: sec2Rotate, transformOrigin: "bottom center" } : {}}
        className="relative z-10 w-full min-h-[70vh] lg:h-screen bg-[#F4F3EE] flex items-center justify-center px-4 md:px-6 py-10 lg:py-0 overflow-hidden lg:shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
      >
        <div
          onMouseEnter={() => setIsHoveringVideo(true)}
          onMouseLeave={() => setIsHoveringVideo(false)}
          onClick={() => setShowModal(true)}
          className="relative w-full max-w-6xl mx-auto aspect-[4/3] sm:aspect-video rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] bg-white border border-white/50 lg:cursor-none transition-transform hover:scale-[1.01] duration-500 group"
        >
          <div className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500">
            <iframe className="w-full h-full pointer-events-none scale-105" src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1&mute=1&loop=1&playlist=ishA6kry8nc&controls=0&modestbranding=1&rel=0" allow="autoplay; encrypted-media" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/90 via-[#2D2A26]/20 to-transparent z-10 pointer-events-none" />
          
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
        </div>
      </motion.section>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#F4F3EE]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
            <button onClick={() => setShowModal(false)} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-[#2D2A26] hover:text-[#F28F3B] transition-colors z-[210] bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl"><X size={20} className="sm:w-6 sm:h-6" /></button>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-6xl aspect-video rounded-[16px] sm:rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/50">
              <iframe className="w-full h-full bg-[#2D2A26]" src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1&mute=0&controls=1&rel=0" allow="autoplay; encrypted-media" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}