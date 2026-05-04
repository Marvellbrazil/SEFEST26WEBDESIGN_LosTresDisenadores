'use client';

import { motion } from 'framer-motion';
import { RiArrowRightUpLine, RiLeafLine, RiUserSmileLine, RiHeartLine, RiStarSFill, RiStarSLine } from 'react-icons/ri';
import { Trash2, Users } from 'lucide-react';
import { AnimationConfig, createSpring, createEase } from './utils/animation';

interface TrustBadge {
  icon: typeof RiUserSmileLine;
  text: string;
}

interface StatCard {
  icon?: typeof Trash2;
  label: string;
  value: string;
  sub: string;
  rotation: string;
  color: string;
}

const trustBadges: TrustBadge[] = [
  { icon: RiUserSmileLine, text: '5,000+ Happy Rescuers' },
  { icon: RiHeartLine, text: '200+ Partner Stores' },
  { icon: RiStarSFill, text: '4.9 Rating' },
];

const statCards: StatCard[] = [
  { icon: Trash2, label: 'Food Waste Saved', value: '50,000+', sub: 'Meals rescued from landfill', rotation: '3deg', color: '#F28F3B' },
  { label: 'CO₂ emissions prevented', value: '125,000kg', sub: 'CO₂ emissions prevented', rotation: '-3deg', color: '#F28F3B' },
  { icon: Users, label: 'Active Community', value: '5,000+', sub: 'Food rescuers & 200+ partners', rotation: '0deg', color: '#F28F3B' },
];

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[650px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px] overflow-hidden bg-[#1a1a1a]">
      <div className="hero-bg animate-slow-zoom">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col justify-between py-8 sm:py-10 md:py-12">
        <div className="flex-1" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={createEase({ duration: AnimationConfig.duration.fast })}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full mb-4"
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <RiLeafLine className="text-[#F28F3B] size-3 sm:size-4" />
              </motion.div>
              <span className="text-white/80 text-[8px] sm:text-[9px] md:text-[10px] font-[family:var(--font-jakarta)] font-black uppercase tracking-[0.15em]">
                Zero Waste Initiative
              </span>
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={createEase({ duration: AnimationConfig.duration.slow })}
              className="font-[family:var(--font-jakarta)] text-white text-[38px] xs:text-[44px] sm:text-[55px] md:text-[80px] lg:text-[100px] leading-[1.1] sm:leading-[1.05] md:leading-[0.95] font-bold tracking-tighter"
            >
              Rescue Delicious <br className="hidden xs:block" /> Food. <br /> Save Our Planet.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={createEase({ duration: AnimationConfig.duration.default })}
              className="text-white/60 font-[family:var(--font-jakarta)] text-sm sm:text-base md:text-lg lg:text-xl max-w-xl leading-relaxed mt-4 sm:mt-6 md:mt-8 mb-6 sm:mb-8 md:mb-10"
            >
              Turning daily surplus into sustainable value. Join the movement to end food waste while enjoying your favorite treats at flash-sale prices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={createEase({ duration: AnimationConfig.duration.slow })}
              className="flex flex-wrap gap-3 sm:gap-4 md:gap-5"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#F28F3B] text-white px-5 sm:px-7 md:px-9 py-2.5 sm:py-3.5 md:py-4 rounded-xl font-[family:var(--font-jakarta)] font-black text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-[#F28F3B]/20"
              >
                <span>Start Saving Now</span>
                <RiArrowRightUpLine size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-5 sm:px-7 md:px-9 py-2.5 sm:py-3.5 md:py-4 rounded-xl font-[family:var(--font-jakarta)] font-black text-sm sm:text-base"
              >
                See The Impact
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden sm:flex flex-wrap items-center gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10 pt-4 border-t border-white/10"
            >
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <badge.icon className="text-[#F28F3B] size-4" />
                  <span className="text-white/40 font-[family:var(--font-jakarta)] text-xs font-bold">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-4 relative">
            {statCards.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotate: i === 0 ? 5 : i === 1 ? -5 : 0 }}
                animate={{ opacity: 1, y: 0, rotate: stat.rotation }}
                transition={{ delay: 0.6 + i * 0.2, ...createSpring() }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                className={`${i === 2 ? 'bg-[#F28F3B]/10 backdrop-blur-xl border border-[#F28F3B]/20' : i === 1 ? 'bg-white/5 backdrop-blur-xl border border-white/5' : 'bg-white/10 backdrop-blur-xl border border-white/10'} p-5 rounded-2xl w-64 ${i === 0 ? 'self-end' : i === 1 ? 'self-start' : 'self-end'} shadow-xl`}
              >
                {stat.icon && (
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${i === 2 ? 'bg-[#F28F3B]/20 text-[#F28F3B]' : 'bg-[#F28F3B]/20 text-[#F28F3B]'}`}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <stat.icon size={18} />
                    </motion.div>
                    <span className="text-white/50 text-[9px] font-[family:var(--font-jakarta)] font-black uppercase tracking-wider">{stat.label}</span>
                  </div>
                )}
                <motion.h4
                  className={`text-2xl font-[family:var(--font-jakarta)] font-black ${i === 1 ? 'text-[#F28F3B]' : 'text-white'}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  {stat.value}
                </motion.h4>
                <p className="text-white/30 text-[10px] mt-1 font-[family:var(--font-jakarta)]">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center justify-between w-full mt-4 sm:mt-6 md:mt-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-black bg-gray-500 overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/40 text-[7px] sm:text-[8px] md:text-[9px] font-[family:var(--font-jakarta)] font-black uppercase tracking-wider"
            >
              <span className="text-white">10k+</span> Rescuers
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <motion.div
              className="relative w-5 h-8 rounded-full border border-white/30 flex justify-center"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="absolute w-1 h-1 bg-white/50 rounded-full top-1.5"
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.span
              className="text-white/40 text-[6px] sm:text-[7px] font-[family:var(--font-jakarta)] font-black uppercase tracking-wider"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              SCROLL
            </motion.span>
          </motion.div>

          <div className="w-[60px] sm:w-[70px]" />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-tl from-[#F28F3B]/10 to-transparent rounded-tl-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#F28F3B]/5 to-transparent rounded-br-full pointer-events-none" />
    </section>
  );
}