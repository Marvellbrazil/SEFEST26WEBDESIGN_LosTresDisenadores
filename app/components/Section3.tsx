'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useTransform, animate, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Trash2, Flame, CloudRain, DollarSign, Info, Play, X } from 'lucide-react';

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
    rotation: "-6deg",
    parallaxSpeed: -100,
    detail: "Equivalent to 1/3 of all food produced for human consumption."
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
    rotation: "4deg",
    parallaxSpeed: -150,
    detail: "If food waste were a country, it would be the 3rd largest emitter."
  },
  {
    id: 3,
    title: "Economic Loss",
    value: 940,
    unit: "Billion USD",
    description: "Total economic value lost globally due to food being discarded unnecessarily.",
    color: "#F28F3B",
    icon: "dollarSign",
    leftOffset: "-550px",
    top: "22%", 
    rotation: "2deg",
    parallaxSpeed: -50,
    detail: "This loss impacts farmers, businesses, and households alike."
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
    rotation: "-3deg",
    parallaxSpeed: -80,
    detail: "Food waste produces massive amounts of methane in anaerobic conditions."
  }
];

gsap.registerPlugin(ScrollTrigger);

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
    <div className="flex items-baseline gap-1.5">
      <motion.span className="text-3xl md:text-5xl font-black text-gray-900 leading-none tracking-tighter">
        {rounded}
      </motion.span>
      <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase">{unit}</span>
    </div>
  );
};

const Section3 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
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
    target: sectionRef,
    offset: ["start end", "end start"]
  });

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

      if (videoCardRef.current) {
        const rect = videoCardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(videoCardRef.current, {
          rotateY: x * 10,
          rotateX: -y * 10,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FAF9F6] py-20 lg:pt-40 lg:pb-80 overflow-hidden font-[family:var(--font-jakarta)]">
      
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
            scale: isHoveringVideo ? 1 : 0,
            opacity: isHoveringVideo ? 1 : 0,
          }}
          className="fixed z-[100] w-24 h-24 bg-[#F28F3B] rounded-full flex flex-col items-center justify-center text-white shadow-2xl"
        >
          <Play fill="white" size={24} className="ml-1" />
          <span className="text-[10px] font-black uppercase tracking-tighter mt-1">Play</span>
        </motion.div>
      )}

      <motion.div style={{ y: titleY }} className="relative z-30 text-center mb-16 px-4">
        <h2 className="text-[#1A1A1A] text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight uppercase">
          The Problem <span className="text-[#F28F3B]">We Face</span>
        </h2>
        <p className="mt-6 text-sm md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Our current "take-make-waste" model is pushing the planet to its limits.
        </p>
      </motion.div>

      <div className={`relative w-full max-w-7xl mx-auto ${isMobile ? 'flex flex-col gap-6 px-6' : 'h-[400px]'}`}>
        {!isMobile && (
          <motion.div 
            style={{ y: smileyY }}
            className="absolute left-1/2 top-0 -translate-x-1/2 w-64 h-64 rounded-full bg-[#F28F3B] border-[10px] border-white shadow-2xl flex items-center justify-center z-[25]"
          >
            <div className="absolute top-[35%] left-[25%] w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <div ref={leftEyeRef} className="w-4 h-4 bg-black rounded-full" />
            </div>
            <div className="absolute top-[35%] right-[25%] w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <div ref={rightEyeRef} className="w-4 h-4 bg-black rounded-full" />
            </div>
            <div className="absolute bottom-[20%] w-24 h-5 bg-black/10 rounded-full" />
          </motion.div>
        )}

        {problemCardData.map((card) => {
          const cardY = useTransform(springScroll, [0, 1], [0, card.parallaxSpeed]);
          return (
            <motion.div 
              key={card.id}
              style={!isMobile ? {
                position: 'absolute',
                left: `calc(50% + ${card.leftOffset})`,
                top: card.top,
                rotate: card.rotation,
                y: cardY,
                zIndex: card.id > 2 ? 10 : 20,
                width: '380px'
              } : {}}
              whileHover={!isMobile ? { zIndex: 50, scale: 1.05, rotate: 0 } : {}}
              className="group bg-white rounded-[32px] border border-gray-100 shadow-xl p-7 cursor-pointer"
            >
              <div className="p-3 w-fit rounded-2xl mb-6" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                {iconMap[card.icon as keyof typeof iconMap]}
              </div>
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">{card.title}</h3>
              <AnimatedNumber value={card.value} unit={card.unit} />
              <p className="mt-5 text-gray-500 text-sm font-medium">{card.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="relative mt-40 perspective-[1500px] z-40 px-6">
        <motion.div
          ref={videoCardRef}
          onMouseEnter={() => setIsHoveringVideo(true)}
          onMouseLeave={() => setIsHoveringVideo(false)}
          onClick={() => setShowModal(true)}
          initial={{ rotateX: 15, scale: 0.8, opacity: 0 }}
          whileInView={{ rotateX: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative w-full max-w-5xl mx-auto aspect-video rounded-[30px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] bg-black border-[10px] border-white cursor-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            style={{ y: useTransform(springScroll, [0.5, 1], [0, 100]), scale: 1.2 }}
            className="absolute inset-0 w-full h-full"
          >
            <iframe
              className="w-full h-full pointer-events-none"
              src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1&mute=1&loop=1&playlist=ishA6kry8nc&controls=0&modestbranding=1&rel=0"
              allow="autoplay; encrypted-media"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          
          <div className="absolute bottom-10 left-10 z-20 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-[#F28F3B] rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Click to Play with Sound</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Saving Food,<br />Empowering Locals.
            </h3>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white hover:text-[#F28F3B] transition-colors z-[210]"
            >
              <X size={40} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1&mute=0&controls=1&rel=0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Section3;