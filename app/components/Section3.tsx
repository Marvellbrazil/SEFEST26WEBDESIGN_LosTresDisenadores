'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useMotionValue, useTransform, animate, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Trash2, Flame, CloudRain, DollarSign, Play, X } from 'lucide-react';

const iconMap = {
  trash2: <Trash2 size={24} />,
  flame: <Flame size={24} />,
  cloudRain: <CloudRain size={24} />,
  dollarSign: <DollarSign size={24} />,
};

const problemCardData = [
  {
    id: 1,
    title: "Food Waste Volume",
    value: 1300,
    unit: "Million Tons",
    description: "Global food waste produced annually, contributing significantly to landfill overflow.",
    color: "#F28F3B",
    icon: "trash2",
    leftOffset: "-600px",
    top: "5%",
    rotation: -6,
    parallaxSpeed: -100,
  },
  {
    id: 2,
    title: "Carbon Footprint",
    value: 3.3,
    unit: "Billion Tons",
    description: "CO2 equivalent greenhouse gases released from rotting food waste in landfills.",
    color: "#10B981",
    icon: "cloudRain",
    leftOffset: "220px",
    top: "8%",
    rotation: 4,
    parallaxSpeed: -150,
  },
  {
    id: 3,
    title: "Economic Loss",
    value: 940,
    unit: "Billion USD",
    description: "Total economic value lost globally due to food being discarded unnecessarily.",
    color: "#FBBF24",
    icon: "dollarSign",
    leftOffset: "-550px",
    top: "22%", 
    rotation: 2,
    parallaxSpeed: -50,
  },
  {
    id: 4,
    title: "Methane Impact",
    value: 25,
    unit: "Times Potency",
    description: "Methane is far more potent than CO2 at trapping heat in the atmosphere.",
    color: "#EF4444",
    icon: "flame",
    leftOffset: "150px",
    top: "20%",
    rotation: -3,
    parallaxSpeed: -80,
  }
];

const AnimatedNumber = ({ value, unit }: { value: number; unit: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    value % 1 === 0 ? Math.floor(latest).toLocaleString() : latest.toFixed(1)
  );

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [count, value]);

  return (
    <div className="flex items-baseline gap-2">
      <motion.span className="text-4xl md:text-6xl font-black text-[#2D2A26] leading-none tracking-tighter">
        {rounded}
      </motion.span>
      <span className="text-[10px] md:text-xs font-bold text-[#2D2A26]/40 uppercase tracking-widest">{unit}</span>
    </div>
  );
};

export default function Section3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSpringX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sec1Scale = useTransform(scrollYProgress, [0.4, 1], [1, 0.7]);
  const sec1Rotate = useTransform(scrollYProgress, [0.4, 1], [0, -7]);
  const sec1Y = useTransform(scrollYProgress, [0.4, 1], ["0%", "70%"]);

  const sec2Scale = useTransform(scrollYProgress, [0.4, 1], [0.7, 1]);
  const sec2Rotate = useTransform(scrollYProgress, [0.4, 1], [8.5, 0]);

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const titleY = useTransform(springScroll, [0, 1], [0, -100]);
  const smileyY = useTransform(springScroll, [0, 1], [0, -150]);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (isMobile) return;
      
      const eyes = [leftEyeRef.current, rightEyeRef.current];
      eyes.forEach((eye) => {
        if (!eye) return;
        const rect = eye.getBoundingClientRect();
        const angle = Math.atan2(e.clientY - (rect.top + rect.height/2), e.clientX - (rect.left + rect.width/2));
        const dist = Math.min(6, Math.hypot(e.clientX - (rect.left + rect.width/2), e.clientY - (rect.top + rect.height/2)) / 15);
        gsap.to(eye, { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, duration: 0.3 });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="relative w-full font-[family:var(--font-jakarta)] bg-[#F4F3EE] h-[300vh]">
      
      {!isMobile && (
        <motion.div
          style={{
            left: cursorSpringX,
            top: cursorSpringY,
            x: "-50%",
            y: "-50%",
            pointerEvents: "none",
          }}
          animate={{
            scale: isHoveringVideo && !showModal ? 1 : 0,
            opacity: isHoveringVideo && !showModal ? 1 : 0,
          }}
          className="fixed z-[100] w-24 h-24 bg-gradient-to-br from-[#F28F3B] to-[#FF6B35] rounded-full flex flex-col items-center justify-center text-white shadow-[0_10px_30px_rgba(242,143,59,0.4)] border border-white/40 backdrop-blur-md"
        >
          <Play fill="white" size={24} className="ml-1" />
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Play</span>
        </motion.div>
      )}

      <section className="sticky top-0 w-full h-screen overflow-hidden z-0 bg-[#F4F3EE]">
        <div 
          className="absolute inset-0 z-0 opacity-[0.25]"
          style={{
            backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F3EE] via-transparent to-transparent z-[1]" />
        
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#EF4444] rounded-full blur-[150px] z-0 pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#F28F3B] rounded-full blur-[150px] z-0 pointer-events-none" 
        />

        <motion.div 
          style={!isMobile ? { 
            scale: sec1Scale, 
            rotate: sec1Rotate, 
            y: sec1Y,
            transformOrigin: 'center center'
          } : {}}
          className="relative w-full h-full flex flex-col justify-center py-20 lg:py-0 will-change-transform z-10"
        >
          <motion.div style={{ y: titleY }} className="relative z-30 text-center mb-16 px-4 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/50 rounded-full mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2A26]/60">Global Crisis</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[50px] sm:text-[70px] md:text-[100px] lg:text-[130px] font-black uppercase tracking-tighter leading-[0.85] flex flex-col items-center"
            >
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #2D2A26' }}>
                The Problem
              </span>
              <span className="text-[#F28F3B] mt-2">
                We Face.
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-8 text-sm md:text-lg text-[#2D2A26]/60 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Our current "take-make-waste" model is pushing the planet to its limits. This isn't just an environmental issue, it's a global emergency.
            </motion.p>
          </motion.div>

          <div className={`relative w-full max-w-7xl mx-auto ${isMobile ? 'flex flex-col gap-6 px-6' : 'h-[400px]'}`}>
            {!isMobile && (
              <motion.div 
                style={{ y: smileyY }}
                className="absolute left-1/2 top-0 -translate-x-1/2 z-[25]"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.5 }}
                  className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-[#F28F3B] to-[#FF6B35] shadow-[0_20px_50px_rgba(242,143,59,0.3)] flex flex-col items-center justify-center border-[8px] border-white"
                >
                  <div className="flex gap-8 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                      <div ref={leftEyeRef} className="w-5 h-5 bg-[#2D2A26] rounded-full" />
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                      <div ref={rightEyeRef} className="w-5 h-5 bg-[#2D2A26] rounded-full" />
                    </div>
                  </div>
                  <div className="w-20 h-5 bg-[#2D2A26] rounded-full mt-2 opacity-80" />
                </motion.div>
              </motion.div>
            )}

            {problemCardData.map((card, idx) => {
              const cardY = useTransform(springScroll, [0, 1], [0, card.parallaxSpeed]);
              return (
                <motion.div 
                  key={card.id}
                  style={!isMobile ? {
                    position: 'absolute',
                    left: `calc(50% + ${card.leftOffset})`,
                    top: card.top,
                    y: cardY,
                    zIndex: card.id > 2 ? 10 : 20,
                    width: '380px'
                  } : {}}
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 60, rotate: 0 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0, rotate: card.rotation }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: 0.4 + idx * 0.1, type: "spring", bounce: 0.4 }}
                    whileHover={!isMobile ? { scale: 1.05, rotate: 0, zIndex: 50 } : {}}
                    className="group bg-white/80 backdrop-blur-2xl rounded-[32px] border border-white/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] p-7 cursor-pointer hover:bg-white transition-colors duration-300 w-full h-full"
                  >
                    <div className="p-3 w-fit rounded-2xl mb-6 shadow-inner" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                      {iconMap[card.icon as keyof typeof iconMap]}
                    </div>
                    <h3 className="text-[10px] font-black text-[#2D2A26]/40 uppercase mb-2 tracking-widest">{card.title}</h3>
                    <AnimatedNumber value={card.value} unit={card.unit} />
                    <p className="mt-5 text-[#2D2A26]/60 text-sm font-medium leading-relaxed">{card.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <div className="h-[100vh] w-full pointer-events-none" />

      <motion.section 
        style={!isMobile ? { 
          scale: sec2Scale, 
          rotate: sec2Rotate,
          transformOrigin: "bottom center"
        } : {}}
        className="relative z-10 w-full h-screen bg-[#F4F3EE] flex items-center justify-center px-4 md:px-6 overflow-hidden will-change-transform shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
      >
        <div
          onMouseEnter={() => setIsHoveringVideo(true)}
          onMouseLeave={() => setIsHoveringVideo(false)}
          onClick={() => setShowModal(true)}
          className="relative w-full max-w-6xl mx-auto aspect-video rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] bg-white border border-white/50 cursor-none transition-transform hover:scale-[1.01] duration-500"
        >
          <div className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500">
            <iframe
              className="w-full h-full pointer-events-none scale-105"
              src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1&mute=1&loop=1&playlist=ishA6kry8nc&controls=0&modestbranding=1&rel=0"
              allow="autoplay; encrypted-media"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/90 via-[#2D2A26]/20 to-transparent z-10 pointer-events-none" />
          
          <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16 z-20 text-white pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-1.5 w-10 md:w-14 bg-[#F28F3B] rounded-full" />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/80">Click to Play with Sound</span>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]"
            >
              Saving Food,<br />
              <span className="text-[#F28F3B]">Empowering Locals.</span>
            </motion.h3>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#F4F3EE]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-[#2D2A26] hover:text-[#F28F3B] transition-colors z-[210] bg-white p-3 rounded-full shadow-lg hover:shadow-xl"
            >
              <X size={24} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/50"
            >
              <iframe
                className="w-full h-full bg-[#2D2A26]"
                src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1&mute=0&controls=1&rel=0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}