'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Zap, BarChart3, Recycle, ArrowRight, CheckCircle, TrendingUp, Award } from 'lucide-react';
import { useIsMobile } from '../../src/utils/device';

const cardsData = [
  {
    id: 1,
    title1: "Flash Sale",
    title2: "Surplus",
    info: "SDG 12.3 • Reduce Food Waste",
    description: "Restaurants and cafes can list their surplus food at 50-70% discount before closing time. Customers get great deals, businesses reduce waste, and the planet wins.",
    linkText: "Explore Flash Sale",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800",
    icon: <Zap size={28} />,
    bgColor: "#1a1a1a",
    textColor: "#FFFFFF",
    accentColor: "#F28F3B",
    stats: "50-70% OFF",
    impact: "Up to 40% waste reduction",
    statIcon: <Zap size={16} />
  },
  {
    id: 2,
    title1: "Impact",
    title2: "Transparency",
    info: "SDG 12.6 • Sustainable Practices",
    description: "Every rescued meal is converted into measurable impact data: CO₂ emissions avoided, water conserved, and land preserved. Transparent reporting for conscious consumers.",
    linkText: "View Impact Data",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800",
    icon: <BarChart3 size={28} />,
    bgColor: "#FFFFFF",
    textColor: "#1a1a1a",
    accentColor: "#F28F3B",
    stats: "Real-time Data",
    impact: "Live carbon & water tracking",
    statIcon: <TrendingUp size={16} />
  },
  {
    id: 3,
    title1: "Circular",
    title2: "Economy",
    info: "SDG 12.5 • Waste Reduction",
    description: "We transform potential landfill waste into economic value. Creating win-win solutions for businesses, consumers, and the environment through resource optimization.",
    linkText: "Learn Circularity",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800",
    icon: <Recycle size={28} />,
    bgColor: "#F28F3B",
    textColor: "#1a1a1a",
    accentColor: "#FFFFFF",
    stats: "Zero Waste",
    impact: "Circular ecosystem model",
    statIcon: <Award size={16} />
  }
];

export default function Section4() {
  const headerRef = useRef(null);
  const mainContainer = useRef(null);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"]
  });

  const smoothHeaderScroll = useSpring(headerScroll, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const headerX = useTransform(smoothHeaderScroll, [0, 1], ["30%", "0%"]);
  const headerOpacity = useTransform(smoothHeaderScroll, [0, 3, 1], [1, 0.6, 0]);

  return (
    <section ref={mainContainer} className="relative w-full bg-[#F4F3EE]">
      <div
        ref={headerRef}
        className="relative w-full overflow-hidden"
        style={{ height: isMobile ? '20vh' : '30vh' }}
      >
        <motion.div
          style={{ x: isMobile ? 0 : headerX, opacity: isMobile ? 1 : headerOpacity }}
          className="absolute inset-0 flex items-center"
        >
          <div className="flex items-center gap-4 md:gap-8 whitespace-nowrap px-4 md:px-8 py-8">
            <h1 className="text-[#2D2A26] text-[36px] sm:text-[50px] md:text-[80px] lg:text-[100px] font-black uppercase tracking-tighter leading-none">
              Our<span className="text-[#F28F3B]"> Solutions</span>
            </h1>
            <p className="text-[#2D2A26]/60 text-sm md:text-lg font-medium hidden sm:block">
              Three innovative approaches <span className='block'>To tackle food waste</span>
            </p>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F28F3B]/30 to-transparent" />
      </div>

      <div className="relative px-4 sm:px-6 md:px-10 lg:px-16 -mt-4">
        {isMobile ? (
          <div className="flex flex-col gap-6 py-8">
            {cardsData.map((card, i) => (
              <div
                key={card.id}
                className="relative w-full rounded-[24px] shadow-xl overflow-hidden"
                style={{ backgroundColor: card.bgColor }}
              >
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={card.image}
                    alt="background"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: card.bgColor,
                      opacity: card.bgColor === "#FFFFFF" ? 0.75 : 0.88
                    }}
                  />
                </div>

                <div className="relative w-full p-6 sm:p-8 flex flex-col gap-5 z-10 min-h-[400px]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm" style={{ color: card.accentColor }}>
                      {card.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: card.textColor, opacity: 0.8 }}>
                      {card.info}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-[40px] sm:text-[50px] font-black leading-[0.85] tracking-tight" style={{ color: card.textColor }}>
                      {card.title1}
                    </h2>
                    <h2 className="text-[40px] sm:text-[50px] font-black leading-[0.85] tracking-tight mt-1" style={{ color: card.accentColor }}>
                      {card.title2}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit backdrop-blur-sm" style={{ backgroundColor: `${card.accentColor}25`, border: `1px solid ${card.accentColor}40` }}>
                    {card.statIcon}
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: card.accentColor }}>
                      {card.stats}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed max-w-md" style={{ color: card.textColor, opacity: 0.85 }}>
                    {card.description}
                  </p>

                  <div className="flex-1" />

                  <div className="p-3.5 rounded-xl backdrop-blur-sm" style={{ backgroundColor: `${card.accentColor}15`, border: `1px solid ${card.accentColor}25` }}>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} style={{ color: card.accentColor }} />
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: card.textColor }}>
                        {card.impact}
                      </span>
                    </div>
                  </div>

                  <button
                    className="group flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-lg w-fit active:scale-95"
                    style={{
                      backgroundColor: card.accentColor,
                      color: card.bgColor === "#FFFFFF" ? "#1a1a1a" : "#FFFFFF",
                    }}
                  >
                    {card.linkText}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#F28F3B] to-transparent opacity-50" />

                <div className="absolute top-6 right-6 z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: card.textColor, opacity: 0.25 }}>
                    {String(i + 1).padStart(2, '0')}/{String(cardsData.length).padStart(2, '0')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          cardsData.map((card, i) => (
            <SingleCard key={card.id} card={card} index={i} totalCards={cardsData.length} />
          ))
        )}
      </div>

      <div className={isMobile ? 'h-[5vh]' : 'h-[10vh]'} />
    </section>
  );
}

function SingleCard({ card, index, totalCards }: { card: typeof cardsData[0], index: number, totalCards: number }) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const contentOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 1]);

  const topOffset = `calc(-5vh + ${index * 50}px)`;

  return (
    <div
      ref={container}
      className="h-auto flex items-center justify-center w-full sticky top-40"
    >
      <motion.div
        className="relative w-full max-w-full h-[700px] rounded-[30px] shadow-2xl flex flex-col md:flex-row overflow-hidden transform origin-top"
        style={{
          '--card-color': card.accentColor,
          '--card-bg': card.bgColor,
          '--card-text': card.textColor,
          backgroundColor: card.bgColor,
          top: topOffset,
          scale: 1,
        } as React.CSSProperties}
      >
        <div className="absolute inset-0 w-full h-full">
          <img
            src={card.image}
            alt="background"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: card.bgColor,
              opacity: card.bgColor === "#FFFFFF" ? 0.7 : 0.85
            }}
          />
        </div>

        <div className="relative w-full md:w-1/2 h-full p-8 md:p-12 flex flex-col justify-between z-10">
          <motion.div
            className="flex flex-col gap-5"
            style={{ opacity: contentOpacity }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl backdrop-blur-sm" style={{ backgroundColor: `${card.accentColor}20` }}>
                {card.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: card.textColor, opacity: 0.8 }}>
                {card.info}
              </span>
            </div>

            <div>
              <h2 className="text-section-md leading-tightest tracking-tight" style={{ color: card.textColor }}>
                {card.title1}
              </h2>
              <h2 className="text-section-md leading-tightest tracking-tight mt-2" style={{ color: card.accentColor }}>
                {card.title2}
              </h2>
            </div>

            <div className="card-badge card-accent backdrop-blur-sm">
              {card.statIcon}
              <span className="card-label" style={{ color: card.accentColor }}>
                {card.stats}
              </span>
            </div>

            <p className="text-base max-w-md leading-normal-sm" style={{ color: card.textColor, opacity: 0.85 }}>
              {card.description}
            </p>
          </motion.div>

          <motion.div
            className="mt-3 p-3 rounded-card-sm card-content-bg backdrop-blur-sm"
            style={{ opacity: contentOpacity }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={16} style={{ color: card.accentColor }} />
              <span className="card-label" style={{ color: card.textColor }}>
                {card.impact}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="w-fit mt-3"
            style={{ opacity: contentOpacity }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-lg"
              style={{
                backgroundColor: card.accentColor,
                color: card.bgColor === "#FFFFFF" ? "#1a1a1a" : "#FFFFFF",
                boxShadow: `0 10px 25px -5px ${card.accentColor}40`
              }}
            >
              {card.linkText}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>

        <div className="relative w-full md:w-1/2 h-full flex items-end justify-end p-6 z-10">
          <div className="flex flex-col items-end gap-3">
            <div className="w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center" style={{ backgroundColor: `${card.accentColor}25` }}>
              {card.icon}
            </div>
            <div className="text-right">
              <p className="text-label-xs uppercase tracking-wider font-bold" style={{ color: card.textColor, opacity: 0.3 }}>
                {String(index + 1).padStart(2, '0')}/{String(totalCards).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#F28F3B] to-transparent opacity-50" />
      </motion.div>
    </div>
  );
}