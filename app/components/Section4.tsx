'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, MotionValue } from 'framer-motion';
import { Search, CreditCard, ShoppingBag, Leaf, ArrowRight, Clock, ShieldCheck, BarChart3 } from 'lucide-react';
import Link from 'next/link';

interface CardData {
  id: number;
  title1: string;
  title2: string;
  description: string;
  linkText: string;
  href?: string;
  image: string;
  icon: React.ReactNode;
  accentColor: string;
  stats: string;
  statIcon: React.ReactNode;
}

interface ComponentProps {
  card: CardData;
  index: number;
  progress: MotionValue<number>;
}

const cardsData: CardData[] = [
  {
    id: 1,
    title1: "Browse",
    title2: "Surplus",
    description: "Explore our interactive map or list to find bakeries, cafes, and restaurants near you offering perfectly good surplus food at 50-70% off.",
    linkText: "Find Food Near Me",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    icon: <Search size={28} />,
    accentColor: "#F28F3B",
    stats: "Real-time Map",
    statIcon: <Search size={16} />
  },
  {
    id: 2,
    title1: "Reserve",
    title2: "Your Bag",
    description: "Found something delicious? Reserve your Surprise Bag or specific items instantly through our platform. Secure your meal before it sells out.",
    linkText: "Payment Options", 
    href: "/payment",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800",
    icon: <CreditCard size={28} />,
    accentColor: "#2D2A26",
    stats: "100% Secure",
    statIcon: <ShieldCheck size={16} />
  },
  {
    id: 3,
    title1: "Pick Up",
    title2: "In-Store",
    description: "Head to the store during the specified pickup window. Simply show your digital receipt to the staff, grab your rescued food, and say hi to local business owners.",
    linkText: "Pickup Guide", 
    href: "/pickup-guide",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800",
    icon: <ShoppingBag size={28} />,
    accentColor: "#F28F3B",
    stats: "Quick & Easy",
    statIcon: <Clock size={16} />
  },
  {
    id: 4,
    title1: "Enjoy",
    title2: "The Impact",
    description: "Enjoy your delicious rescued meal. Check your dashboard to see exactly how much CO2, water, and money you've saved by making a sustainable choice.",
    linkText: "View Dashboard",
    href: "/dashboard",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800",
    icon: <Leaf size={28} />,
    accentColor: "#2D2A26",
    stats: "Track Impact",
    statIcon: <BarChart3 size={16} />
  }
];

const SmoothImageCard = ({ card, index, progress }: ComponentProps) => {
  const continuousIndex = useTransform(progress, [0, 1], [0, cardsData.length - 1]);
  const d = useTransform(continuousIndex, (v: number) => index - v);

  const y = useTransform(d, [-3, -2, -1, 0, 1, 2, 3], [-600, -400, -200, 0, 200, 400, 600]);
  const x = useTransform(d, [-1, 0, 1], [30, -30, 30]);
  const rotate = useTransform(d, [-1, 0, 1], [-4, 0, 4]);
  const scale = useTransform(d, [-1, 0, 1], [0.85, 1.05, 0.85]);
  const zIndex = useTransform(d, (v) => Math.round(100 - Math.abs(v) * 10));

  const grayscaleAmount = useTransform(d, [-1, 0, 1], [100, 0, 100]);
  const imageFilter = useMotionTemplate`grayscale(${grayscaleAmount}%)`;

  const overlayOpacity = useTransform(d, [-1, 0, 1], [0.2, 0, 0.2]);

  const shadowOpacity = useTransform(d, [-1, 0, 1], [0.05, 0.3, 0.05]);
  const boxShadow = useMotionTemplate`0 30px 60px -15px rgba(0,0,0,${shadowOpacity})`;

  return (
    <motion.div
      // PERBAIKAN HP FILL: Mengganti h-[220px] statis menjadi aspect-[4/3] atau h-full terkalibrasi penuh agar gambar memenuhi seluruh card tanpa terpotong di HP
      className="absolute right-4 lg:right-16 w-[90%] max-w-[280px] lg:max-w-[440px] aspect-[4/3] lg:h-[450px] lg:aspect-auto rounded-[24px] lg:rounded-[32px] overflow-hidden border-[1px] border-white/20 bg-[#2D2A26] will-change-transform top-[calc(50%-105px)] lg:top-[calc(50%-225px)]"
      style={{
        y, x, rotate, scale, zIndex, boxShadow,
        transformOrigin: "center right",
      }}
    >
      <motion.img 
        src={card.image} 
        className="w-full h-full object-cover" 
        alt={card.title1} 
        style={{ filter: imageFilter }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      
      <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 flex items-center gap-2">
        <div style={{ color: card.accentColor === "#2D2A26" ? "#FFFFFF" : card.accentColor }}>{card.statIcon}</div>
        <span className="text-white font-bold text-xs lg:text-sm tracking-wide">{card.stats}</span>
      </div>
    </motion.div>
  );
};

const SmoothTextContent = ({ card, index, progress }: ComponentProps) => {
  const continuousIndex = useTransform(progress, [0, 1], [0, cardsData.length - 1]);
  const d = useTransform(continuousIndex, (v: number) => index - v);

  const opacity = useTransform(d, [-0.6, 0, 0.6], [0, 1, 0]);
  const y = useTransform(d, [-1, 0, 1], [-80, 0, 80]);
  const pointerEvents = useTransform(d, (v) => Math.abs(v) < 0.3 ? "auto" : "none");

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-start w-full h-full"
      style={{ opacity, y, pointerEvents }}
    >
      <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden z-0">
        <span 
          className="text-[140px] sm:text-[180px] md:text-[250px] font-black leading-none text-transparent"
          style={{ WebkitTextStroke: '3px rgba(45,42,38,0.05)' }}
        >
          0{index + 1}
        </span>
      </div>

      <div className="relative z-10 w-full lg:pl-6">
        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#2D2A26] uppercase tracking-tighter leading-[0.85] mb-5">
          {card.title1}<br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${card.accentColor}, ${card.accentColor}90)` }}>
            {card.title2}
          </span>
        </h3>
        
        <p className="text-[#2D2A26]/75 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-md mb-8">
          {card.description}
        </p>

        <Link 
          href={card.href || "#"} 
          className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-[11px] sm:text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 group/btn text-white w-max shadow-xl"
          style={{ 
            background: `linear-gradient(to right, ${card.accentColor}, ${card.accentColor}ee)`,
            boxShadow: `0 10px 30px ${card.accentColor}40`
          }}
        >
          {card.linkText}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1.5" />
        </Link>
      </div>
    </motion.div>
  );
};

export default function Section4() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 1,
    restDelta: 0.001
  });

  return (
    <section id="guide" ref={containerRef} className="relative w-full h-[400vh] bg-[#F4F3EE] font-(--font-jakarta) select-none">
      <div className="fixed inset-0 z-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none max-w-full">
        <motion.div animate={{ x: [0, -50, 0], y: [0, 100, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[5%] w-75 lg:w-125 h-[300px] lg:h-[500px] bg-[#F28F3B] rounded-full blur-[140px] opacity-20" />
        <motion.div animate={{ x: [0, 80, 0], y: [0, -80, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] right-[5%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-[#2D2A26] rounded-full blur-[140px] opacity-10" />
      </div>

      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row max-w-350 mx-auto px-6 md:px-10 z-10 pt-[10vh] pb-[5vh]">
        
        <div className="lg:hidden w-full flex flex-col items-center text-center mb-6 shrink-0 z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.4, rotate: -20, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.8 }}
            className="bg-[#2D2A26] text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-md shadow-lg mb-2 w-max"
          >
            Step By Step Guide
          </motion.div>
          <h2 className="relative font-black uppercase tracking-tighter leading-[0.85] text-[#2D2A26] text-[40px] sm:text-[50px] flex flex-col items-center gap-y-1">
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            >
              HOW IT
            </motion.span>
            <motion.span 
              initial={{ scale: 0.4, opacity: 0, rotate: 15, y: 20 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 1.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 150, damping: 12 }}
              className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white px-4 py-1 rounded-[12px] shadow-[0_15px_30px_rgba(242,143,59,0.25)] border-2 border-white inline-block text-[28px] sm:text-[36px]"
            >
              WORKS
            </motion.span>
          </h2>
        </div>

        <div 
          className="w-full lg:w-1/2 h-[35vh] lg:h-full flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-black/5"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="relative w-full h-0 flex justify-end">
            {cardsData.map((card, index) => (
              <SmoothImageCard key={card.id} card={card} index={index} progress={smoothProgress} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[45vh] lg:h-full flex flex-col justify-center lg:pl-16 relative">
          
          {/* DESKTOP HEADER */}
          <div className="hidden lg:flex flex-col items-start mb-6 relative z-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.4, rotate: -20, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.8 }}
              className="bg-[#2D2A26] text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-md shadow-lg mb-3 w-max"
            >
              Step By Step Guide
            </motion.div>
            <h2 className="relative font-black uppercase tracking-tighter leading-none flex flex-row items-center gap-x-4 text-[#2D2A26] text-[52px] xl:text-[64px]">
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              >
                HOW IT
              </motion.span>
              <motion.span 
                initial={{ scale: 0.4, opacity: 0, rotate: 15, y: 30 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 1.5, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 150, damping: 12 }}
                className="highlight text-[36px] xl:text-[44px]"
              >
                WORKS
              </motion.span>
            </h2>
          </div>
          
          <div className="relative w-full h-[320px] lg:h-[400px]">
            {cardsData.map((card, index) => (
              <SmoothTextContent key={card.id} card={card} index={index} progress={smoothProgress} />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}