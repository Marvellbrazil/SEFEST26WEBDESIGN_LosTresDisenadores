'use client';
import React from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { 
  RiArrowRightUpLine, 
  RiLeafLine, 
  RiStore2Line,
  RiMapPinLine,
  RiSearchLine,
  RiArrowLeftSLine,
  RiArrowRightSLine
} from 'react-icons/ri';
import { AnimationConfig, createSpring, createEase } from '../../utils/animation';
import { trustBadges, statCards } from '../../constants/hero';
import { AnimatedCounter } from './AnimatedCounter';
import { LiveActivityTicker } from './LiveActivityTicker';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const tiltX = useTransform(mouseY, [-500, 500], [10, -10]);
  const tiltY = useTransform(mouseX, [-500, 500], [-10, 10]);
  
  const springX = useSpring(tiltX, { stiffness: 150, damping: 30 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 30 });

  const { scrollY } = useScroll();
  
  const yBg = useTransform(scrollY, [0, 1000], [0, 250]);
  
  const yText = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);
  
  const yCards = useTransform(scrollY, [0, 1000], [0, -180]);

  return (
    <section 
      className="relative w-full h-screen min-h-[750px] sm:min-h-[800px] md:min-h-[850px] lg:min-h-[950px] overflow-hidden bg-[#1a1a1a]"
      onMouseMove={handleMouseMove}
      style={{ perspective: 1200 }}
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: yBg }}>
        <div className="absolute inset-0 hero-bg animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
      </motion.div>

      <LiveActivityTicker />

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col justify-between py-8 sm:py-10 md:py-12 pointer-events-none">
        <div className="flex-1" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center pointer-events-auto">
          
          <motion.div 
            style={{ y: yText, opacity: opacityText }}
            className="lg:col-span-7 xl:col-span-8 flex flex-col items-start w-full"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={createEase({ duration: AnimationConfig.duration.fast })}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#F28F3B]/30 px-3 py-1.5 rounded-full mb-4 mt-8 sm:mt-0 shadow-[0_0_15px_rgba(242,143,59,0.2)]"
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <RiLeafLine className="text-[#F28F3B] size-3 sm:size-4" />
              </motion.div>
              <span className="text-white/90 text-[8px] sm:text-[9px] md:text-[10px] font-[family:var(--font-jakarta)] font-black uppercase tracking-[0.15em]">
                SDG 12: Responsible Consumption
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={createEase({ duration: AnimationConfig.duration.slow })}
              className="font-[family:var(--font-jakarta)] text-white text-[38px] xs:text-[44px] sm:text-[55px] md:text-[80px] lg:text-[100px] leading-[1.1] sm:leading-[1.05] md:leading-[0.95] font-bold tracking-tighter"
            >
              Rescue Delicious <br className="hidden xs:block" /> Food. <br /> Empower Local.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={createEase({ duration: AnimationConfig.duration.default })}
              className="text-white/60 font-[family:var(--font-jakarta)] text-xs sm:text-sm md:text-lg lg:text-xl max-w-xl leading-relaxed mt-4 sm:mt-6 md:mt-8 mb-6 sm:mb-8"
            >
              Turning daily surplus into sustainable value. Join the movement to end food waste, save the planet, and boost local economy at flash-sale prices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...createEase({ duration: AnimationConfig.duration.slow }), delay: 0.2 }}
              className="w-full max-w-xl mb-6 sm:mb-8"
            >
              <form 
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-row items-center w-full bg-white rounded-full p-1 sm:p-1.5 shadow-xl focus-within:ring-2 focus-within:ring-[#F28F3B] transition-shadow"
              >
                <div className="flex-1 flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4">
                  <RiMapPinLine className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Enter city or zip code..."
                    className="w-full text-xs sm:text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent font-[family:var(--font-jakarta)] py-1 sm:py-2"
                    aria-label="Search location for surplus food"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Search"
                  className="bg-[#F28F3B] hover:bg-[#E07A2B] text-white font-black px-4 py-2.5 sm:px-7 sm:py-3 rounded-full transition-all duration-300 shadow-md shadow-[#F28F3B]/30 hover:scale-105 whitespace-nowrap font-[family:var(--font-jakarta)] flex items-center justify-center gap-1.5 sm:gap-2 shrink-0"
                >
                  <RiSearchLine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm hidden xs:block">Find Food</span>
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...createEase({ duration: AnimationConfig.duration.slow }), delay: 0.3 }}
              className="flex flex-wrap gap-3 sm:gap-4 md:gap-5"
            >
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
                aria-label="Browse all rescued food offers"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 sm:px-7 sm:py-3 rounded-xl font-[family:var(--font-jakarta)] font-bold text-xs sm:text-sm md:text-base flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28F3B]"
              >
                <span>Browse Offers</span>
                <RiArrowRightUpLine size={16} aria-hidden="true" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
                aria-label="Become a Partner as Business"
                className="bg-transparent border border-white/10 text-white/70 hover:text-white px-4 py-2 sm:px-7 sm:py-3 rounded-xl font-[family:var(--font-jakarta)] font-bold text-xs sm:text-sm md:text-base flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F28F3B] transition-colors"
              >
                <RiStore2Line size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>Become a Partner</span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="hidden sm:flex flex-wrap items-center gap-4 md:gap-6 mt-8 sm:mt-10 pt-4 border-t border-white/10"
            >
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <badge.icon className="text-[#F28F3B] size-4" aria-hidden="true" />
                  <span className="text-white/40 font-[family:var(--font-jakarta)] text-xs font-bold">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ y: yCards }}
            className="relative lg:col-span-5 xl:col-span-4 w-full mt-4 lg:mt-0 flex flex-col pointer-events-auto"
          >
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex lg:hidden items-center justify-center gap-2 mb-3 w-full opacity-60"
            >
              <motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                <RiArrowLeftSLine className="text-white/70" size={14} />
              </motion.div>
              <span className="text-[8px] text-white/70 font-[family:var(--font-jakarta)] uppercase tracking-[0.2em] font-bold">
                Swipe
              </span>
              <motion.div animate={{ x: [3, -3, 3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                <RiArrowRightSLine className="text-white/70" size={14} />
              </motion.div>
            </motion.div>

            <motion.div 
              style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
              className="flex lg:flex-col gap-3 sm:gap-4 relative w-full overflow-x-auto pb-12 lg:pb-0 pt-2 lg:pt-4 px-1 lg:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            >
              <div className="shrink-0 w-2 lg:hidden"></div>
              
              {statCards.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, rotate: i === 0 ? 5 : i === 1 ? -5 : 0 }}
                  animate={{ opacity: 1, y: 0, rotate: stat.rotation }}
                  transition={{ delay: 0.6 + i * 0.2, ...createSpring() }}
                  whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                  style={{ transform: `translateZ(${i === 1 ? 50 : 20}px)` }}
                  className={`shrink-0 snap-center min-w-[220px] sm:min-w-[260px] ${i === 2 ? 'bg-[#F28F3B]/10 backdrop-blur-xl border border-[#F28F3B]/30' : i === 1 ? 'bg-white/5 backdrop-blur-xl border border-white/10' : 'bg-white/10 backdrop-blur-xl border border-white/10'} p-3.5 sm:p-5 rounded-2xl w-56 sm:w-64 ${i === 0 ? 'lg:self-end' : i === 1 ? 'lg:self-start' : 'lg:self-end'} shadow-2xl group transition-all duration-300 cursor-default`}
                >
                  {stat.icon && (
                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <motion.div
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center ${i === 2 ? 'bg-[#F28F3B]/20 text-[#F28F3B]' : 'bg-white/10 text-white'} group-hover:bg-[#F28F3B] group-hover:text-white transition-colors duration-300`}
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <stat.icon size={14} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
                      </motion.div>
                      <span className="text-white/50 text-[8px] sm:text-[9px] font-[family:var(--font-jakarta)] font-black uppercase tracking-wider">{stat.label}</span>
                    </div>
                  )}
                  <h4 className={`text-lg sm:text-2xl font-[family:var(--font-jakarta)] font-black ${i === 1 ? 'text-[#10B981]' : 'text-white'}`}>
                    <AnimatedCounter to={stat.numericValue} suffix={stat.suffix} />
                  </h4>
                  <p className="text-white/40 text-[9px] sm:text-[10px] mt-1 font-[family:var(--font-jakarta)]">{stat.sub}</p>
                </motion.div>
              ))}
              
              <div className="shrink-0 w-4 lg:hidden"></div>
            </motion.div>
          </motion.div>
        </div>

        <div className="flex-1 pointer-events-none" />

        <div className="flex items-center justify-between w-full mt-2 sm:mt-6 md:mt-8 pointer-events-none">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-black bg-gray-500 overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt={`Community member ${i}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/40 text-[6px] sm:text-[8px] md:text-[9px] font-[family:var(--font-jakarta)] font-black uppercase tracking-wider"
            >
              <span className="text-white">10k+</span> Community
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <motion.div
              className="relative w-4 h-6 sm:w-5 sm:h-8 rounded-full border border-white/30 flex justify-center"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="absolute w-1 h-1 bg-white/50 rounded-full top-1 sm:top-1.5"
                animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.span
              className="text-white/40 text-[5px] sm:text-[7px] font-[family:var(--font-jakarta)] font-black uppercase tracking-wider hidden sm:block"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              SCROLL
            </motion.span>
          </motion.div>

          <div className="w-[40px] sm:w-[70px]" />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-tl from-[#F28F3B]/10 to-transparent rounded-tl-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#F28F3B]/5 to-transparent rounded-br-full pointer-events-none" />
    </section>
  );
}
