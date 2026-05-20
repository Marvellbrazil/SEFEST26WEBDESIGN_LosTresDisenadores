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
    <section id="partner" className="relative w-full min-h-screen bg-[#F4F3EE] font-[family:var(--font-jakarta)] py-16 sm:py-20 lg:py-32 flex flex-col justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12 flex flex-col">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-16 gap-6 lg:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden w-full flex flex-col items-start z-20"
          >
            <div className="bg-[#2D2A26] text-white text-[9px] min-[400px]:text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-lg shadow-lg mb-4 w-max">
              Partner Program
            </div>
            <h2 className="relative font-black uppercase tracking-tighter leading-[0.85] text-[#2D2A26] text-[34px] min-[400px]:text-[42px] sm:text-[56px]">
              SMART FOR <br />
              <span className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white px-3 min-[400px]:px-4 py-0.5 min-[400px]:py-1 rounded-[10px] min-[400px]:rounded-[14px] shadow-[0_15px_30px_rgba(242,143,59,0.3)] border-2 border-[#F4F3EE] transform rotate-2 inline-block text-[26px] min-[400px]:text-[32px] sm:text-[44px] mt-2">
                BUSINESS
              </span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="hidden lg:flex flex-col items-start relative z-20"
          >
            <div className="bg-[#2D2A26] text-white text-xs font-black uppercase tracking-[0.3em] px-5 py-2 rounded-lg shadow-xl mb-5 w-max">
              Partner Program
            </div>
            <h2 className="relative font-black uppercase tracking-tighter leading-[0.8] flex flex-col items-start text-[#2D2A26] text-[76px] xl:text-[90px]">
              <span>SMART FOR</span>
              <span className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white px-6 py-1 rounded-[20px] shadow-[0_20px_40px_rgba(242,143,59,0.3)] border-4 border-[#F4F3EE] transform rotate-2 inline-block text-[54px] xl:text-[68px] mt-3">
                BUSINESS
              </span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="lg:text-right flex flex-col lg:items-end mt-2 lg:mt-0"
          >
            <p className="text-[#2D2A26]/75 text-xs min-[400px]:text-sm sm:text-base md:text-lg font-medium max-w-md mb-5 lg:mb-6 leading-relaxed">
              Join thousands of local businesses turning daily food surplus into pure profit, foot traffic, and environmental impact.
            </p>
            <Link href="/join" className="group inline-flex items-center gap-2 font-black text-[10px] min-[400px]:text-xs uppercase tracking-widest text-[#2D2A26] hover:text-[#F28F3B] transition-colors w-max">
              Become a Partner 
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </Link>
          </motion.div>
        </div>

        <div className="w-full h-[70vh] sm:h-[60vh] lg:h-[650px] flex flex-col lg:flex-row gap-3 lg:gap-6">
          {b2bFeatures.map((item, index) => {
            const isActive = activeIdx === index;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                animate={{ 
                  flex: isActive ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 4 : 3) : 1 
                }}
                transition={{ 
                  opacity: { duration: 0.6, delay: index * 0.15 },
                  y: { duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: index * 0.15 },
                  layout: { duration: 0.7, ease: [0.32, 0.72, 0, 1] } 
                }}
                onMouseEnter={() => setActiveIdx(index)}
                onClick={() => setActiveIdx(index)}
                className={`relative rounded-[24px] lg:rounded-[40px] overflow-hidden cursor-pointer group flex-shrink-0 ${!isActive && 'hover:shadow-2xl'}`}
              >
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center origin-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                  animate={{ 
                    scale: isActive ? 1 : 1.15,
                    filter: isActive ? 'grayscale(0%)' : 'grayscale(60%)' 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />

                <div className="absolute inset-0 bg-black/20 transition-opacity duration-500" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                  animate={{ opacity: isActive ? 0.9 : 0.6 }}
                />

                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="absolute inset-0 p-5 min-[400px]:p-6 lg:p-10 flex flex-col justify-end"
                    >
                      <div className="w-full max-w-[500px]">
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                          className="w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center text-white mb-4 lg:mb-6 shadow-xl"
                          style={{ backgroundColor: item.color }}
                        >
                          <div className="scale-75 lg:scale-100">{item.icon}</div>
                        </motion.div>
                        
                        <motion.h3 
                          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                          className="text-white text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-3 lg:mb-4"
                        >
                          {item.title}
                        </motion.h3>
                        
                        <motion.p 
                          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                          className="text-white/80 text-xs lg:text-base font-medium leading-relaxed mb-16 lg:mb-8 max-w-md hidden sm:block"
                        >
                          {item.description}
                        </motion.p>
                      </div>

                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }}
                        className="absolute bottom-5 right-5 lg:bottom-10 lg:right-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl lg:rounded-2xl p-3 lg:p-5 flex flex-col items-end"
                      >
                        <span className="text-2xl min-[400px]:text-3xl lg:text-5xl font-black text-white leading-none tracking-tighter mb-1" style={{ color: item.color }}>
                          {item.metric}
                        </span>
                        <span className="text-[9px] lg:text-xs font-bold uppercase tracking-widest text-white/70">
                          {item.metricLabel}
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {!isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 p-5 min-[400px]:p-6 flex flex-col lg:items-center justify-end lg:justify-end lg:pb-8"
                    >
                      <div className="hidden lg:flex flex-col items-center justify-end h-full">
                        <p className="text-white font-black text-2xl uppercase tracking-widest whitespace-nowrap -rotate-180" style={{ writingMode: 'vertical-rl' }}>
                          {item.subtitle}
                        </p>
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white mt-8 group-hover:bg-white group-hover:text-black transition-colors">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>

                      <div className="lg:hidden flex items-center justify-between w-full">
                        <p className="text-white font-black text-lg min-[400px]:text-xl uppercase tracking-tight">
                          {item.subtitle}
                        </p>
                        <div className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                          <ArrowUpRight size={16} />
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