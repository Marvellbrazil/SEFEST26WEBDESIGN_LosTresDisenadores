'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Smartphone, ShoppingBag, Clock, BarChart3, 
  Package, Bell, TrendingUp, ChevronRight, Building2,
  Users, MapPin, Leaf, Zap, Store, Award, Heart
} from 'lucide-react';
import { consumerSteps, businessSteps, type StepIcon } from './data/howItWorks';

const stepIconMap: Record<StepIcon, React.ReactNode> = {
  smartphone: <Smartphone size={24} />,
  shoppingBag: <ShoppingBag size={24} />,
  clock: <Clock size={24} />,
  barChart3: <BarChart3 size={24} />,
  package: <Package size={24} />,
  bell: <Bell size={24} />,
  trendingUp: <TrendingUp size={24} />,
  building2: <Building2 size={24} />,
};

const Section6 = () => {
  const { scrollYProgress } = useScroll();
  const xBg = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section className="relative w-full bg-[#F4F3EE] font-[family:var(--font-jakarta)]">
      
      <motion.div 
        style={{ x: xBg }}
        className="absolute top-0 left-0 whitespace-nowrap pointer-events-none opacity-[0.02] select-none z-0"
      >
        <h2 className="text-[200px] md:text-[300px] text-[#2D2A26]">
          HOW IT WORKS • SAVE FOOD • 
        </h2>
      </motion.div>

      <div className="relative border-b border-black/5">
        <div className="max-w-350 mx-auto flex flex-col md:flex-row px-6 md:px-16">
          
          <div className="md:w-1/2 md:h-screen md:sticky md:top-0 flex flex-col justify-center py-20 z-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F28F3B]/10 rounded-full mb-6">
                <Users size={14} className="text-[#F28F3B]" />
                <span className="text-[#F28F3B] font-black text-[9px] uppercase tracking-[0.2em]">For Consumers</span>
              </div>

              <h2 className="text-[#2D2A26] font-black text-[40px] md:text-[70px] leading-[0.9] uppercase tracking-tighter mb-6">
                Rescue Food <br /> 
                <span className="text-[#F28F3B]">as a Consumer.</span>
              </h2>
              
              <p className="text-[#2D2A26]/60 text-lg max-w-95 leading-relaxed">
                Save up to 70% on delicious meals while helping reduce food waste. Every purchase makes a difference.
              </p>
              
              <div className="mt-8 flex flex-col gap-3">
                {[
                  { text: "Save 50-70% on meals", icon: <Zap size={14} /> },
                  { text: "Discover local restaurants", icon: <MapPin size={14} /> },
                  { text: "Track your eco-impact", icon: <Leaf size={14} /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="text-[#F28F3B]">{item.icon}</div>
                    <span className="text-xs text-[#2D2A26]/60">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 hidden md:flex flex-col gap-3">
                {consumerSteps.map((step) => (
                  <div key={step.id} className="flex items-center gap-4 group">
                    <span className="text-xs text-[#2D2A26]/20 group-hover:text-[#F28F3B] transition-colors">{step.id}</span>
                    <div className="h-[1px] w-6 bg-[#2D2A26]/10" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#2D2A26]/40">{step.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2 flex flex-col gap-32 md:gap-64 py-20 md:py-40">
            {consumerSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] mb-8 shadow-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={step.img} 
                    className="w-full h-full object-cover transition-all duration-700"
                    alt={step.title}
                  />
                  <div className="absolute top-6 left-6 bg-white p-3 rounded-xl shadow-lg text-[#F28F3B]">
                    {stepIconMap[step.icon as StepIcon]}
                  </div>
                  <div className="absolute bottom-6 right-6 bg-[#F28F3B] text-white px-4 py-2 rounded-full">
                    <div className="text-lg">{step.stat}</div>
                    <div className="text-[8px] uppercase tracking-wider opacity-80">{step.statLabel}</div>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-5xl text-[#F28F3B] opacity-30 leading-none">
                    {step.id}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl text-[#2D2A26] uppercase mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[#2D2A26]/50 text-base md:text-lg leading-relaxed max-w-[450px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="h-10" />
          </div>
        </div>
      </div>

      <div className="relative bg-[#F4F3EE]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row px-6 md:px-16">
          
          <div className="md:w-1/2 md:h-screen md:sticky md:top-0 flex flex-col justify-center py-20 z-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F28F3B]/10 rounded-full mb-6">
                <Store size={14} className="text-[#F28F3B]" />
                <span className="text-[#F28F3B] font-black text-[9px] uppercase tracking-[0.2em]">For Business</span>
              </div>

              <h2 className="text-[#2D2A26] font-black text-[40px] md:text-[70px] leading-[0.9] uppercase tracking-tighter mb-6">
                Partner <br /> 
                <span className="text-[#F28F3B]">Your Business.</span>
              </h2>
              
              <p className="text-[#2D2A26]/60 text-lg max-w-[380px] leading-relaxed">
                Reduce waste, attract eco-conscious customers, and turn surplus into revenue.
              </p>
              
              <div className="mt-8 flex flex-col gap-3">
                {[
                  { text: "Reduce food waste costs", icon: <Zap size={14} /> },
                  { text: "Attract new customers", icon: <Users size={14} /> },
                  { text: "Get sustainability certified", icon: <Award size={14} /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="text-[#F28F3B]">{item.icon}</div>
                    <span className="text-xs text-[#2D2A26]/60">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 hidden md:flex flex-col gap-3">
                {businessSteps.map((step) => (
                  <div key={step.id} className="flex items-center gap-4 group">
                    <span className="text-xs text-[#2D2A26]/20 group-hover:text-[#F28F3B] transition-colors">{step.id}</span>
                    <div className="h-[1px] w-6 bg-[#2D2A26]/10" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#2D2A26]/40">{step.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2 flex flex-col gap-32 md:gap-64 py-20 md:py-40">
            {businessSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] mb-8 shadow-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={step.img} 
                    className="w-full h-full object-cover transition-all duration-700"
                    alt={step.title}
                  />
                  <div className="absolute top-6 left-6 bg-white p-3 rounded-xl shadow-lg text-[#F28F3B]">
                    {stepIconMap[step.icon as StepIcon]}
                  </div>
                  <div className="absolute bottom-6 right-6 bg-[#F28F3B] text-white px-4 py-2 rounded-full">
                    <div className="text-lg">{step.stat}</div>
                    <div className="text-[8px] uppercase tracking-wider opacity-80">{step.statLabel}</div>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-5xl text-[#F28F3B] opacity-30 leading-none">
                    {step.id}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl text-[#2D2A26] uppercase mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[#2D2A26]/50 text-base md:text-lg leading-relaxed max-w-[450px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="h-10" />
          </div>
        </div>
      </div>

      <div className="relative py-20 md:py-32 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Heart size={16} className="text-[#F28F3B]" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#2D2A26]/50">Ready to Make a Difference?</span>
            </div>

            <h2 className="text-[#2D2A26] text-[35px] md:text-[60px] font-black leading-[1.1] uppercase mb-6">
              Start Your <span className="text-[#F28F3B]">Journey</span> Today
            </h2>

            <p className="text-[#2D2A26]/50 text-base md:text-lg max-w-2xl mx-auto mb-10">
              Whether you want to rescue delicious food or partner your business, we're here to help you make a positive impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#F28F3B] text-white px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest shadow-xl flex items-center gap-2"
              >
                I Want to Rescue Food
                <ChevronRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#2D2A26] text-white px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-[#F28F3B] transition-colors"
              >
                I Want to Partner My Business
                <ChevronRight size={16} />
              </motion.button>
            </div>

            <p className="text-[9px] text-[#2D2A26]/30 mt-8 uppercase tracking-wider">
              Join 5,000+ Food Rescuers & 200+ Business Partners • Every Meal Saved Makes a Difference
            </p>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Section6;