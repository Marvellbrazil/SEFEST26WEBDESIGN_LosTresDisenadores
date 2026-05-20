'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, Award, ArrowUpRight } from "lucide-react";
import Link from 'next/link';

const b2bFeatures = [
  {
    id: 1,
    title: "Recover Sunk Costs",
    subtitle: "Extra Revenue",
    description: "Turn your daily surplus into pure profit. Sell food that would otherwise be wasted to a community of eager, conscious buyers.",
    metric: "+24%",
    metricLabel: "Daily Revenue",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
    color: "#F28F3B",
    icon: <TrendingUp size={24} />
  },
  {
    id: 2,
    title: "Attract New Faces",
    subtitle: "Foot Traffic",
    description: "Reach a younger, eco-conscious demographic. 70% of users who discover a store through our app return for full-price purchases.",
    metric: "10k+",
    metricLabel: "Active Rescuers",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
    color: "#4A7c59", 
    id_color: "#4A7c59",
    icon: <Users size={24} />
  },
  {
    id: 3,
    title: "Brand Perception",
    subtitle: "Eco-Certified",
    description: "Get recognized as a sustainability leader. Every meal rescued is a story of environmental impact your customers will love.",
    metric: "Zero",
    metricLabel: "Waste Goal",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1200",
    color: "#2D2A26",
    icon: <Award size={24} />
  }
];

export default function Section6() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="partner" className="relative w-full min-h-screen bg-[#F4F3EE] font-(--font-jakarta) py-12 sm:py-16 lg:py-24 flex flex-col justify-center overflow-hidden select-none">
      
      <div className="absolute inset-0 z-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 w-full max-w-325 mx-auto px-5 md:px-10 lg:px-12 flex flex-col">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 lg:mb-12 gap-4 lg:gap-8">
          
          <div className="lg:hidden w-full flex flex-col items-start z-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.4, rotate: -20, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.8 }}
              className="bg-[#2D2A26] text-white text-[9px] min-[400px]:text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] px-3 py-1 rounded-lg shadow-lg mb-3 w-max"
            >
              Partner Program
            </motion.div>
            <h2 className="relative font-black uppercase tracking-tighter leading-[0.85] text-[#2D2A26] text-[30px] min-[400px]:text-[36px] sm:text-[48px] flex flex-col items-start">
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              >
                SMART FOR
              </motion.span>
              <motion.span 
                initial={{ scale: 0.4, opacity: 0, rotate: 15, y: 20 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 2, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 150, damping: 12 }}
                className="highlight inline-block text-[22px] min-[400px]:text-[28px] sm:text-[38px] mt-1.5"
              >
                BUSINESS
              </motion.span>
            </h2>
          </div>

          <div className="hidden lg:flex flex-col items-start relative z-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.4, rotate: -20, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.8 }}
              className="bg-[#2D2A26] text-white text-[11px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-lg shadow-xl mb-4 w-max"
            >
              Partner Program
            </motion.div>
            <h2 className="relative font-black uppercase tracking-tighter leading-[0.8] flex flex-col items-start text-[#2D2A26] text-[56px] xl:text-[68px]">
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              >
                SMART FOR
              </motion.span>
              <motion.span 
                initial={{ scale: 0.4, opacity: 0, rotate: 15, y: 30 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 2, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 150, damping: 12 }}
                className="highlight text-[42px] xl:text-[52px] mt-3"
              >
                BUSINESS
              </motion.span>
            </h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="lg:text-right flex flex-col lg:items-end mt-1 lg:mt-0"
          >
            <p className="text-[#2D2A26]/75 text-xs min-[400px]:text-sm font-medium max-w-sm mb-4 lg:mb-5 leading-relaxed">
              Join thousands of local businesses turning daily food surplus into pure profit, foot traffic, and environmental impact.
            </p>
            <Link href="/join" className="group inline-flex items-center gap-2 font-black text-[10px] min-[400px]:text-xs uppercase tracking-widest text-[#2D2A26] hover:text-[#F28F3B] transition-colors w-max">
              Become a Partner 
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="w-full h-[65vh] sm:h-[55vh] lg:h-130 flex flex-col lg:flex-row gap-3 lg:gap-5">
          {b2bFeatures.map((item, index) => {
            const isActive = activeIdx === index;
            let activeFlex = 1;

            if (isActive) {
              activeFlex = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3.5 : 3;
            }

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                animate={{ 
                  flex: activeFlex
                }}
                transition={{ 
                  opacity: { duration: 0.6, delay: index * 0.15 },
                  y: { duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: index * 0.15 },
                  layout: { duration: 0.7, ease: [0.32, 0.72, 0, 1] } 
                }}
                onMouseEnter={() => setActiveIdx(index)}
                onClick={() => setActiveIdx(index)}
                className={`relative rounded-[20px] lg:rounded-4xl overflow-hidden cursor-pointer group shrink-0 ${!isActive && 'hover:shadow-xl'}`}
              >
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center origin-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                  animate={{ 
                    scale: isActive ? 1 : 1.12,
                    filter: isActive ? 'grayscale(0%)' : 'grayscale(60%)' 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />

                <div className="absolute inset-0 bg-black/30 transition-opacity duration-500" />
                <motion.div 
                  className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent"
                  animate={{ opacity: isActive ? 0.95 : 0.6 }}
                />

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="absolute inset-0 p-4 min-[400px]:p-5 lg:p-8 flex flex-col justify-end"
                    >
                      <div className="w-full flex flex-col gap-1.5">
                        
                        <div className="flex items-start justify-between gap-4 w-full">
                          <div className="flex flex-col flex-1">
                            <motion.div 
                              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                              className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-white mb-2 shadow-xl shrink-0"
                              style={{ backgroundColor: item.color }}
                            >
                              <div className="scale-75 lg:scale-90">{item.icon}</div>
                            </motion.div>
                            
                            <motion.h3 
                              initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
                              className="text-white text-lg min-[400px]:text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-[0.95] mb-1"
                            >
                              {item.title}
                            </motion.h3>
                          </div>

                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.35 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 lg:p-3.5 flex flex-col items-end shrink-0 text-right mt-1"
                          >
                            <span className="text-lg min-[400px]:text-xl lg:text-3xl font-black leading-none tracking-tighter mb-0.5" style={{ color: item.color }}>
                              {item.metric}
                            </span>
                            <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-white/70 whitespace-nowrap">
                              {item.metricLabel}
                            </span>
                          </motion.div>
                        </div>
                        
                        <motion.p 
                          initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                          className="text-white/80 text-xs lg:text-sm font-medium leading-relaxed max-w-lg pr-2 mt-0.5 sm:block"
                        >
                          {item.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {!isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-4 min-[400px]:p-5 flex flex-col lg:items-center justify-end lg:justify-end lg:pb-6"
                    >
                      <div className="hidden lg:flex flex-col items-center justify-end h-full">
                        <p className="text-white font-black text-xl uppercase tracking-widest whitespace-nowrap -rotate-180" style={{ writingMode: 'vertical-rl' }}>
                          {item.subtitle}
                        </p>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white mt-6 group-hover:bg-white group-hover:text-black transition-colors">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>

                      <div className="lg:hidden flex items-center justify-between w-full">
                        <p className="text-white font-black text-sm min-[400px]:text-base uppercase tracking-tight">
                          {item.subtitle}
                        </p>
                        <div className="w-7 h-7 min-[400px]:w-8 min-[400px]:h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}