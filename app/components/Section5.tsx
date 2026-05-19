'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, animate } from 'framer-motion';
import { Cloud, Droplets, Map, Car, Bath, Leaf } from 'lucide-react';

const IMPACT_FACTORS = {
  co2: 2.5,
  water: 840,
  land: 1.5,
  carKm: 10,
  showers: 15,
};

const AnimatedCounter = ({ value, isDecimal = false, className = "" }: { value: number, isDecimal?: boolean, className?: string }) => {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) => 
    isDecimal ? latest.toFixed(1) : Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, motionValue]);

  return <motion.span className={className}>{display}</motion.span>;
};

export default function Section5() {
  const [meals, setMeals] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const springMeals = useSpring(meals, { stiffness: 120, damping: 20 });
  
  useEffect(() => {
    springMeals.set(meals);
  }, [meals, springMeals]);

  const fillWidth = useTransform(springMeals, [1, 500], ["0%", "100%"]);
  const glowX = useTransform(springMeals, [1, 500], ["-20vw", "80vw"]);
  
  const moodColor = useTransform(
    springMeals, 
    [1, 250, 500], 
    ["#EF4444", "#F28F3B", "#10B981"]
  );

  const cardBg = useTransform(
    springMeals,
    [1, 250, 500],
    ["rgba(239, 68, 68, 0.08)", "rgba(255, 255, 255, 0.8)", "rgba(16, 185, 129, 0.08)"]
  );

  const cardBorder = useTransform(
    springMeals,
    [1, 250, 500],
    ["rgba(239, 68, 68, 0.3)", "rgba(255, 255, 255, 0.6)", "rgba(16, 185, 129, 0.3)"]
  );

  const mouthPath = useTransform(
    springMeals,
    [1, 250, 500],
    [
      "M 15 32 Q 25 20 35 32", 
      "M 15 30 Q 25 30 35 30", 
      "M 15 25 Q 25 40 35 25"  
    ]
  );

  const eyeHeight = useTransform(springMeals, [1, 250, 500], [2, 6, 8]);
  const eyeY = useTransform(springMeals, [1, 250, 500], [4, 0, -2]);
  
  const cheekOpacity = useTransform(springMeals, [1, 300, 500], [0, 0, 0.6]);
  const sweatOpacity = useTransform(springMeals, [1, 150, 500], [1, 0, 0]);

  const impact = {
    co2: meals * IMPACT_FACTORS.co2,
    water: meals * IMPACT_FACTORS.water,
    land: meals * IMPACT_FACTORS.land,
    carKm: meals * IMPACT_FACTORS.carKm,
    showers: meals * IMPACT_FACTORS.showers,
  };

  return (
    <section id="metrics"
      ref={containerRef}
      className="relative w-full min-h-[120vh] py-24 flex flex-col items-center justify-center bg-[#F4F3EE] overflow-hidden font-[family:var(--font-jakarta)]"
    >
      <div 
        className="absolute inset-0 z-0 opacity-[0.2]"
        style={{
          backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <motion.div 
        style={{ x: glowX, backgroundColor: moodColor }}
        className="absolute top-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full blur-[160px] opacity-20 z-0 pointer-events-none" 
      />

      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.03] z-0">
        <h2 className="text-[15vw] font-black uppercase leading-none whitespace-nowrap -ml-20 tracking-tighter">
          CALCULATE IMPACT • CALCULATE IMPACT
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/50 rounded-full shadow-sm mb-6">
            <Leaf size={14} className="text-[#F28F3B]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2A26]/60">Real-Time Metrics</span>
          </div>
          <h2 className="text-[50px] sm:text-[70px] md:text-[90px] font-black uppercase tracking-tighter text-[#2D2A26] leading-[0.85]">
            See The <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #2D2A26' }}>Difference.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col"
          >
            <div className="bg-[#2D2A26] rounded-[48px] rounded-tr-[120px] rounded-bl-[80px] p-8 md:p-12 shadow-2xl flex-1 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
              <Cloud className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/10">
                  <Cloud size={28} />
                </div>
                <h3 className="text-white/50 text-xs font-black uppercase tracking-[0.2em] mb-4">CO₂ Prevented</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <AnimatedCounter value={impact.co2} isDecimal={true} className="text-6xl sm:text-7xl xl:text-8xl font-black text-white tracking-tighter leading-none" />
                  <span className="text-xl font-bold text-white/40">KG</span>
                </div>
              </div>

              <div className="relative z-10 mt-16 bg-white/5 border border-white/10 rounded-3xl rounded-br-[60px] p-6 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-3">
                  <motion.div 
                    style={{ backgroundColor: moodColor }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  >
                    <Car size={18} />
                  </motion.div>
                  <p className="text-white/80 text-sm font-bold leading-tight">
                    Like not driving<br />your car for
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <AnimatedCounter value={impact.carKm} className="text-3xl font-black text-white tracking-tighter" />
                  <motion.span style={{ color: moodColor }} className="text-sm font-bold uppercase tracking-wider">Kilometers</motion.span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8">
            
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ backgroundColor: cardBg, borderColor: cardBorder }}
              className="backdrop-blur-xl rounded-[48px] rounded-tl-[100px] rounded-br-[100px] p-8 md:p-12 shadow-xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16 md:mb-24">
                <div>
                  <h3 className="text-[28px] md:text-[40px] font-black text-[#2D2A26] uppercase tracking-tighter leading-none mb-2">
                    Drag to <br/>
                    <motion.span style={{ color: moodColor }}>Rescue Meals</motion.span>
                  </h3>
                  <p className="text-[#2D2A26]/40 text-sm font-bold">
                    Adjust the slider to see how your actions scale.
                  </p>
                </div>
                
                <motion.div 
                  className="w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-lg border border-black/5"
                  style={{ color: moodColor }}
                >
                  <svg width="60" height="60" viewBox="0 0 50 50">
                    <motion.rect x="12" style={{ y: eyeY, height: eyeHeight }} y="16" width="6" rx="3" fill="currentColor" />
                    <motion.rect x="32" style={{ y: eyeY, height: eyeHeight }} y="16" width="6" rx="3" fill="currentColor" />
                    
                    <motion.circle cx="8" cy="24" r="4" fill="#10B981" style={{ opacity: cheekOpacity }} />
                    <motion.circle cx="42" cy="24" r="4" fill="#10B981" style={{ opacity: cheekOpacity }} />
                    
                    <motion.path d="M 40 8 Q 40 14 36 14 Q 32 14 32 8 Q 36 2 40 8" fill="#EF4444" style={{ opacity: sweatOpacity }} />
                    <motion.path d="M 10 10 Q 10 15 7 15 Q 4 15 4 10 Q 7 6 10 10" fill="#EF4444" style={{ opacity: sweatOpacity }} />
                    
                    <motion.path d={mouthPath} stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  </svg>
                </motion.div>
              </div>

              <div className="relative w-full h-4 bg-[#2D2A26]/5 rounded-full mb-8">
                <motion.div 
                  className="absolute top-0 left-0 h-full rounded-full" 
                  style={{ width: fillWidth, backgroundColor: moodColor }} 
                />
                
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20"
                  style={{ 
                    left: fillWidth,
                    x: "-50%" 
                  }}
                >
                  <div className="absolute bottom-full mb-6 flex flex-col items-center">
                    <AnimatedCounter value={meals} className="text-6xl md:text-[40px] font-black text-[#2D2A26] tracking-tighter leading-none" />
                    <motion.span style={{ color: moodColor }} className="text-[10px] md:text-xs font-black uppercase tracking-widest mt-1">Meals</motion.span>
                  </div>
                  
                  <motion.div 
                    className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-xl border-4" 
                    style={{ borderColor: moodColor }}
                  />
                </motion.div>

                <input
                  type="range"
                  min="1"
                  max="500"
                  value={meals}
                  onChange={(e) => setMeals(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                />
              </div>

              <div className="flex justify-between px-2">
                {[1, 100, 200, 300, 400, 500].map((step) => (
                  <span key={step} className="text-[10px] font-bold text-[#2D2A26]/30">{step}</span>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 h-full">
              
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#F28F3B] rounded-[40px] rounded-tr-[80px] rounded-bl-[20px] p-8 shadow-xl relative overflow-hidden group flex flex-col justify-between hover:-translate-y-2 transition-all duration-500"
              >
                <Droplets className="absolute -top-6 -right-6 w-40 h-40 text-white/10 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                <div className="relative z-10 mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl rounded-tr-[24px] rounded-bl-[8px] flex items-center justify-center text-white mb-6 border border-white/20">
                    <Droplets size={24} />
                  </div>
                  <h3 className="text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-2">Water Saved</h3>
                  <div className="flex items-baseline gap-2">
                    <AnimatedCounter value={impact.water} className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none" />
                    <span className="text-sm font-bold text-white/60">L</span>
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-3 bg-white/10 rounded-2xl rounded-br-[32px] p-4 border border-white/10 backdrop-blur-sm">
                  <Bath size={16} className="text-white/80" />
                  <p className="text-xs font-bold text-white/80 leading-tight">
                    Equal to <span className="text-white text-base mx-1"><AnimatedCounter value={impact.showers} /></span> showers
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-[40px] rounded-tl-[80px] rounded-br-[20px] p-8 shadow-xl border border-black/5 relative overflow-hidden group flex flex-col justify-between hover:-translate-y-2 transition-all duration-500"
              >
                <Map className="absolute -top-6 -right-6 w-40 h-40 text-[#2D2A26]/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                <div className="relative z-10 mb-8">
                  <div className="w-12 h-12 bg-[#F28F3B]/10 rounded-2xl rounded-tl-[24px] rounded-br-[8px] flex items-center justify-center text-[#F28F3B] mb-6">
                    <Map size={24} />
                  </div>
                  <h3 className="text-[#2D2A26]/40 text-xs font-black uppercase tracking-[0.2em] mb-2">Land Preserved</h3>
                  <div className="flex items-baseline gap-2">
                    <AnimatedCounter value={impact.land} isDecimal={true} className="text-5xl lg:text-6xl font-black text-[#2D2A26] tracking-tighter leading-none" />
                    <span className="text-sm font-bold text-[#2D2A26]/40">m²</span>
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-3 bg-[#2D2A26]/5 rounded-2xl rounded-bl-[32px] p-4 border border-[#2D2A26]/5">
                  <Leaf size={16} className="text-[#F28F3B]" />
                  <p className="text-[#2D2A26]/60 text-xs font-bold leading-tight">
                    Safeguards natural habitats
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}