'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, CreditCard, ShoppingBag, Leaf, ArrowRight, Clock, ShieldCheck, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const cardsData = [
  {
    id: 1,
    title1: "Browse",
    title2: "Surplus",
    info: "Step 01 • Find Local Deals",
    description: "Explore our interactive map or list to find bakeries, cafes, and restaurants near you offering perfectly good surplus food at 50-70% off.",
    linkText: "Find Food Near Me",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    icon: <Search size={24} />,
    accentColor: "#F28F3B",
    stats: "Real-time Map",
    statIcon: <Search size={16} />
  },
  {
    id: 2,
    title1: "Reserve",
    title2: "Your Bag",
    info: "Step 02 • Secure Checkout",
    description: "Found something delicious? Reserve your Surprise Bag or specific items instantly through our platform. Secure your meal before it sells out.",
    linkText: "Payment Options", 
    href: "/payment",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800",
    icon: <CreditCard size={24} />,
    accentColor: "#2D2A26",
    stats: "100% Secure",
    statIcon: <ShieldCheck size={16} />
  },
  {
    id: 3,
    title1: "Pick Up",
    title2: "In-Store",
    info: "Step 03 • Collect & Connect",
    description: "Head to the store during the specified pickup window. Simply show your digital receipt to the staff, grab your rescued food, and say hi to local business owners.",
    linkText: "Pickup Guide", 
    href: "/pickup-guide",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800",
    icon: <ShoppingBag size={24} />,
    accentColor: "#F28F3B",
    stats: "Quick & Easy",
    statIcon: <Clock size={16} />
  },
  {
    id: 4,
    title1: "Enjoy",
    title2: "& Impact",
    info: "Step 04 • See The Difference",
    description: "Enjoy your delicious rescued meal. Check your dashboard to see exactly how much CO2, water, and money you've saved by making a sustainable choice.",
    linkText: "View Dashboard",
    href: "/dashboard",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800",
    icon: <Leaf size={24} />,
    accentColor: "#2D2A26",
    stats: "Track Impact",
    statIcon: <BarChart3 size={16} />
  }
];

const StackCard = ({ card, index, progress, totalCards, isMobile }: any) => {
  const targetScale = 1 - (totalCards - index) * 0.04;
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);

  const stickyTop = isMobile 
    ? `calc(10vh + ${index * 20}px)` 
    : `calc(12vh + ${index * 32}px)`;

  return (
    <div 
      className="sticky w-full flex items-center justify-center pt-8"
      style={{ top: stickyTop }}
    >
      <motion.div 
        style={{ scale, transformOrigin: "top center" }}
        className="w-full max-w-5xl h-auto md:h-[65vh] min-h-[500px] bg-white/90 backdrop-blur-3xl rounded-[32px] md:rounded-[48px] border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] flex flex-col md:flex-row overflow-hidden relative group transition-colors duration-500 hover:border-white"
      >
        <div className="w-full md:w-1/2 h-[260px] sm:h-[300px] md:h-full relative overflow-hidden p-3 md:p-4">
          <div className="w-full h-full rounded-[24px] md:rounded-[36px] overflow-hidden relative">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={card.image}
              alt={card.title1}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#2D2A26]/80 via-[#2D2A26]/10 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 flex items-center justify-between">
              <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-2xl shadow-lg">
                <p className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold opacity-80 mb-0.5">Action</p>
                <div className="flex items-center gap-2">
                  {card.statIcon}
                  <span className="text-xs md:text-sm font-black">{card.stats}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full p-6 sm:p-8 md:p-12 flex flex-col justify-between relative bg-gradient-to-br from-white/40 to-transparent">
          
          <div className="absolute top-6 right-8 pointer-events-none select-none">
            <span className="text-[70px] md:text-[120px] font-black leading-none text-[#2D2A26] opacity-[0.04]">
              0{index + 1}
            </span>
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center mt-2 md:mt-0">
            <div className="hidden md:flex w-12 h-12 md:w-14 md:h-14 rounded-2xl mb-6 md:mb-8 items-center justify-center text-white shadow-lg" style={{ backgroundColor: card.accentColor }}>
              {card.icon}
            </div>
            
            <p className="text-[9px] md:text-xs font-black uppercase tracking-[0.2em] mb-2 md:mb-4" style={{ color: card.accentColor }}>
              {card.info}
            </p>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#2D2A26] uppercase tracking-tighter leading-[0.95] mb-4 md:mb-6">
              {card.title1}<br />
              <span style={{ color: card.accentColor }}>{card.title2}</span>
            </h3>
            
            <p className="text-[#2D2A26]/60 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-sm">
              {card.description}
            </p>
          </div>

          <div className="mt-8 md:mt-10 relative z-10 flex flex-col sm:flex-row gap-5 md:gap-6 border-t border-[#2D2A26]/10 pt-6 md:pt-8">
            <Link 
              href={card.href || "#"} 
              className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group/btn text-white w-full sm:w-auto"
              style={{ backgroundColor: card.accentColor }}
            >
              {card.linkText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Section4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="guide" ref={containerRef} className="relative w-full bg-[#F4F3EE] font-[family:var(--font-jakarta)] pb-[20vh] pt-[10vh]">

      <div 
        className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4F3EE]/40 to-[#F4F3EE] pointer-events-none z-[1]" />

      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#F28F3B] rounded-full blur-[120px] md:blur-[160px] z-0 pointer-events-none" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center mb-[8vh] md:mb-[10vh]"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/50 rounded-full shadow-sm mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F28F3B] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2A26]/60">Step by Step Guide</span>
          </div>
          <h2 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[110px] font-black uppercase tracking-tighter text-[#2D2A26] leading-[0.9] md:leading-[0.85] text-center">
            How It <span className="text-[#F28F3B]">Works</span>
          </h2>
        </motion.div>

        <div className="relative w-full h-[350vh] md:h-[400vh]">
          {cardsData.map((card, index) => (
            <StackCard 
              key={card.id} 
              card={card} 
              index={index} 
              progress={smoothProgress} 
              totalCards={cardsData.length} 
              isMobile={isMobile}
            />
          ))}
        </div>

      </div>
    </section>
  );
}