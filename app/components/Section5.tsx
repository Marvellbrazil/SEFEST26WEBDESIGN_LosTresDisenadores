'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Leaf, Droplets, Trees, BarChart3, TrendingUp, Award, Zap, Shield } from 'lucide-react';
import { sdgData, funFactsData, IMPACT_FACTORS, type FunFactIcon } from './data/impactData';

const funFactIconMap: Record<FunFactIcon, React.ReactNode> = {
  leaf: <Leaf size={14} />,
  droplets: <Droplets size={14} />,
  trees: <Trees size={14} />,
};

const Section4 = () => {
  const [meals, setMeals] = useState(25);
  
  const springMeals = useSpring(meals, { stiffness: 100, damping: 20 });
  const displayMeals = useTransform(springMeals, (latest) => Math.round(latest));

  useEffect(() => {
    springMeals.set(meals);
  }, [meals, springMeals]);

  const calculateImpact = () => {
    const co2Num = meals * IMPACT_FACTORS.co2;
    const waterNum = meals * IMPACT_FACTORS.water;
    const landNum = meals * IMPACT_FACTORS.land;
    return {
      co2: co2Num.toFixed(1),
      water: waterNum.toLocaleString(),
      land: landNum.toFixed(1),
      co2Num,
      waterNum,
      landNum,
      trees: Math.round(meals * IMPACT_FACTORS.trees),
      showers: Math.round(meals * IMPACT_FACTORS.showers),
      carKm: Math.round(meals * IMPACT_FACTORS.carKm),
      lightbulbs: Math.round(meals * IMPACT_FACTORS.lightbulbs),
      mealsEquivalent: meals
    };
  };

  const impact = calculateImpact();

  const impactCards = [
    {
      label: "CO₂ Emissions Saved",
      value: impact.co2,
      unit: "KG",
      description: "Greenhouse gas prevented from entering atmosphere",
      compare: `Same as driving ${impact.carKm} km by car`,
      icon: <Leaf size={24} />,
      color: "bg-[#F28F3B]",
      textColor: "text-white",
      detail: "Food waste in landfills produces methane, a greenhouse gas 25x more potent than CO₂"
    },
    {
      label: "Fresh Water Preserved",
      value: impact.water,
      unit: "Liters",
      description: "Water saved from food production",
      compare: `Equivalent to ${impact.showers} standard showers`,
      icon: <Droplets size={24} />,
      color: "bg-white",
      textColor: "text-[#2D2A26]",
      detail: "It takes 840 liters of water to produce 1 meal that ends up wasted"
    },
    {
      label: "Land Preserved",
      value: impact.land,
      unit: "m²",
      description: "Agricultural land saved from waste",
      compare: `About ${Math.round(Number(impact.land) * 0.25)} parking spots worth of land`,
      icon: <Trees size={24} />,
      color: "bg-[#2D2A26]",
      textColor: "text-white",
      detail: "28% of global agricultural land is used to produce food that is never eaten"
    }
  ];

  const sdgProgress = sdgData;

  const funFacts = funFactsData;

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden font-jakarta bg-[#F4F3EE]">
      
      {/* --- DECORATIVE BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-125 h-125 bg-[#F28F3B] rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.06, 0.02] 
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-[#2D2A26] rounded-full blur-[100px]"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[new Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#F28F3B]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-6 md:px-10 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="lg:col-span-5 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-black/5 shadow-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F28F3B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F28F3B]"></span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2D2A26]/50">SDG 12.6 • Impact Transparency</span>
              </div>

              {/* Title */}
              <h2 className="text-[#2D2A26] font-boldstrom text-[45px] md:text-[80px] leading-[0.85] uppercase tracking-tighter mb-6">
                Small Acts, <br />
                <span className="text-[#F28F3B] relative inline-block">
                  Huge Impact.
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#F28F3B]/30"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </h2>

              {/* Description */}
              <p className="text-[#2D2A26]/60 text-base md:text-lg leading-relaxed mb-8">
                Every rescued meal creates a ripple effect of positive environmental change. 
                See your real-time impact below — data-driven transparency for a sustainable future.
              </p>

              {/* Fun Facts Row */}
              <div className="flex flex-wrap gap-3 mb-8">
                {funFacts.map((fact, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 rounded-full text-[9px] font-bold text-[#2D2A26]/60"
                  >
                    {funFactIconMap[fact.icon as FunFactIcon]}
                    <span>{fact.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 bg-[#2D2A26] text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl transition-all hover:bg-[#F28F3B]"
              >
                Start Rescuing Food
                <motion.span 
                  className="group-hover:translate-x-2 transition-transform"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>

              {/* SDG Progress */}
              <div className="mt-10 pt-6 border-t border-black/10">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={16} className="text-[#F28F3B]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#2D2A26]/40">SDG 12 Progress Towards 2030</span>
                </div>
                <div className="space-y-3">
                  {sdgProgress.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-bold text-[#2D2A26]/60">Target {item.target}: {item.name}</span>
                        <span className="text-[#F28F3B] font-bold">{item.current}% / {item.target}%</span>
                      </div>
                      <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(item.current / item.target) * 100}%` }}
                          transition={{ duration: 1, delay: idx * 0.2 }}
                          className="h-full bg-[#F28F3B] rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[8px] text-[#2D2A26]/30 mt-3 uppercase tracking-wider">
                  Source: UN Sustainable Development Goals Report 2024
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: INTERACTIVE CALCULATOR */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main Calculator Card */}
              <div className="bg-white/40 backdrop-blur-xl rounded-[48px] p-6 md:p-10 border border-white/50 shadow-2xl relative overflow-hidden">
                
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#F28F3B]/10 to-transparent rounded-full blur-3xl" />
                
                {/* Slider Section */}
                <div className="relative mb-10">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h4 className="font-boldstrom text-xs text-[#2D2A26]/40 uppercase tracking-widest mb-1">
                        YOUR CONTRIBUTION
                      </h4>
                      <p className="text-[#2D2A26]/70 text-sm">Adjust the slider to see your impact</p>
                    </div>
                    <div className="text-right">
                      <motion.div 
                        className="text-5xl md:text-7xl font-boldstrom text-[#F28F3B] leading-none"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 0.3 }}
                      >
                        {meals}
                      </motion.div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/40">Meals Rescued</span>
                    </div>
                  </div>
                  
                  <div className="relative py-4">
                    <input
                      type="range" 
                      min="1" 
                      max="100" 
                      value={meals} 
                      onChange={(e) => setMeals(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#EBE9E0] rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #F28F3B 0%, #F28F3B ${meals}%, #EBE9E0 ${meals}%, #EBE9E0 100%)`
                      }}
                    />
                    {/* Tick marks */}
                    <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-2">
                      {[0, 25, 50, 75, 100].map((tick) => (
                        <div key={tick} className="relative">
                          <div className="w-0.5 h-2 bg-[#2D2A26]/20" />
                          <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[8px] text-[#2D2A26]/30">{tick}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8 text-[9px] font-bold text-[#2D2A26]/40 uppercase tracking-[0.2em]">
                    <span>🌱 Beginner Rescuer</span>
                    <span>⭐ Impact Champion</span>
                    <span>🏆 Zero Waste Hero</span>
                  </div>
                </div>

                {/* Impact Cards Grid - 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {impactCards.map((data, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        whileHover={{ y: -5 }}
                        className={`${data.color} ${data.textColor} p-5 rounded-2xl shadow-lg border border-black/5 relative overflow-hidden group cursor-pointer`}
                      >
                        {/* Icon */}
                        <div className={`mb-3 ${data.textColor === 'text-white' ? 'text-white/80' : 'text-[#F28F3B]'}`}>
                          {data.icon}
                        </div>
                        
                        {/* Value */}
                        <div className="mb-1">
                          <motion.h5 
                            key={data.value}
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                            className="text-2xl md:text-3xl font-boldstrom leading-none"
                          >
                            {data.value}
                          </motion.h5>
                          <span className="text-[9px] font-bold opacity-60">{data.unit}</span>
                        </div>
                        
                        {/* Label */}
                        <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-2">
                          {data.label}
                        </p>
                        
                        {/* Comparison */}
                        <p className="text-[8px] leading-relaxed opacity-50">
                          {data.compare}
                        </p>

                        {/* Hover Detail */}
                        <motion.div 
                          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 rounded-2xl"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-white text-[9px] text-center leading-relaxed">
                            {data.detail}
                          </p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Total Impact Summary */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 p-4 bg-[#2D2A26]/5 rounded-2xl border border-black/5"
                >
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#F28F3B]/20 flex items-center justify-center">
                        <Award size={16} className="text-[#F28F3B]" />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-wider text-[#2D2A26]/40">Your Total Impact</p>
                        <p className="text-xs font-bold text-[#2D2A26]">
                          {impact.trees} trees worth of CO₂ • {impact.water}L water • {impact.land}m² land
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[#2D2A26]/40">↓ Keep rescuing to increase impact</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Background Floating Text */}
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: [0, -100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-10 left-0 font-boldstrom text-[12vw] opacity-[0.015] text-[#2D2A26] whitespace-nowrap pointer-events-none select-none"
      >
        EVERY MEAL RESCUED • EVERY DROP SAVED • EVERY BREATH CLEANER •
      </motion.div>
    </section>
  );
};

export default Section4;