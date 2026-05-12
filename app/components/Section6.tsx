'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TrendingUp, Users, Award, LayoutDashboard, ArrowRight, Store } from "lucide-react";

export default function Section6() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const yBg = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const rotateOrb = useTransform(smoothProgress, [0, 1], [0, 90]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen py-24 lg:py-32 bg-[#F4F3EE] overflow-hidden font-[family:var(--font-jakarta)]"
    >
      <div 
        className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <motion.div 
        style={{ rotate: rotateOrb }}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full z-0 pointer-events-none blur-[120px] opacity-20 bg-gradient-to-br from-[#F28F3B] to-[#FF6B35]" 
      />

      <motion.div 
        style={{ y: yBg }}
        className="absolute top-[20%] left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.03] z-0"
      >
        <h2 className="text-[18vw] font-black uppercase leading-none whitespace-nowrap -ml-20 tracking-tighter">
          FOR BUSINESS • B2B
        </h2>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/50 rounded-full shadow-sm mb-6"
            >
              <Store size={14} className="text-[#F28F3B]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2A26]/60">Partner Program</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[40px] sm:text-[60px] md:text-[80px] font-black uppercase tracking-tighter text-[#2D2A26] leading-[0.9] mb-6"
            >
              Turn Waste Into <br />
              <span className="text-[#F28F3B]">Opportunity.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#2D2A26]/60 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-lg"
            >
              Join thousands of bakeries, cafes, and supermarkets converting daily surplus food into extra revenue, while attracting conscious customers to your store.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
          >
            <button className="bg-[#2D2A26] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#F28F3B] hover:shadow-[0_10px_30px_rgba(242,143,59,0.3)] transition-all duration-300 group">
              Become a Partner <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/60 backdrop-blur-md border border-white text-[#2D2A26] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors text-center shadow-sm">
              See Pricing
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
            className="md:col-span-12 lg:col-span-8 relative rounded-[40px] md:rounded-[48px] overflow-hidden shadow-2xl group h-[400px] md:h-[500px] border border-white/20"
          >
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200" 
              alt="Bakery Partner" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            <div className="absolute top-6 md:top-8 right-6 md:right-8 bg-[#F28F3B] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <TrendingUp size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">+24% Revenue</span>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4 leading-tight">
                Extra Revenue <br/><span className="text-[#F28F3B]">Every Day</span>
              </h3>
              <p className="text-white/80 font-medium text-sm md:text-base leading-relaxed max-w-md">
                Recover sunk costs by selling daily surplus at a discount. Turn what would be waste into pure profit before closing time.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
            className="md:col-span-6 lg:col-span-4 relative rounded-[40px] md:rounded-[48px] overflow-hidden shadow-2xl group h-[400px] md:h-[500px] border border-white/20 bg-[#F28F3B]"
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" 
              alt="New Customers" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-700 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/90 to-transparent" />
            
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
                <Users size={24} />
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-3 leading-tight">
                  New Foot <br/>Traffic
                </h3>
                <p className="text-white/80 font-medium text-sm leading-relaxed">
                  Attract a new demographic. 70% of app users return to buy full-price items from your menu.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
            className="md:col-span-6 lg:col-span-4 relative rounded-[40px] md:rounded-[48px] overflow-hidden shadow-2xl group h-[400px] md:h-[500px] border border-white/10 bg-[#2D2A26]"
          >
            <img 
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800" 
              alt="Eco Badge" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2D2A26]" />
            
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
              <div className="self-end w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-inner">
                <Award size={24} />
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-3 leading-tight">
                  Eco-Certified <br/>Badge
                </h3>
                <p className="text-white/60 font-medium text-sm leading-relaxed">
                  Elevate your CSR profile. Show the local community that your business cares about building a zero-waste city.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
            className="md:col-span-12 lg:col-span-8 relative rounded-[40px] md:rounded-[48px] overflow-hidden shadow-xl group h-[400px] md:h-[500px] border border-white/60 bg-white"
          >
            <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1466692476877-3dccd1c01e69?q=80&w=800" 
                alt="Dashboard Background" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
            </div>

            <div className="absolute right-[-5%] top-[10%] w-[300px] h-[350px] bg-white/80 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] p-6 rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500 hidden lg:flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black text-[#2D2A26]/40 uppercase tracking-widest">Impact</span>
                <LayoutDashboard size={16} className="text-[#F28F3B]" />
              </div>
              <div className="w-full h-16 bg-[#2D2A26]/5 rounded-2xl mb-4 border border-[#2D2A26]/10 flex flex-col justify-center px-4">
                <span className="text-[10px] font-bold text-[#2D2A26]/60 uppercase tracking-wider mb-1">CO2 Saved</span>
                <span className="text-xl font-black text-[#2D2A26]">1,250 kg</span>
              </div>
              <div className="w-full h-16 bg-[#F28F3B]/10 rounded-2xl border border-[#F28F3B]/20 flex flex-col justify-center px-4">
                <span className="text-[10px] font-bold text-[#F28F3B] uppercase tracking-wider mb-1">Items Rescued</span>
                <span className="text-xl font-black text-[#2D2A26]">428</span>
              </div>
              <div className="mt-auto w-full h-2 bg-[#2D2A26]/5 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-[#2D2A26]" />
              </div>
            </div>

            <div className="relative z-10 p-8 md:p-12 w-full md:w-3/5 h-full flex flex-col justify-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F28F3B]/10 flex items-center justify-center text-[#F28F3B] mb-8">
                <LayoutDashboard size={24} />
              </div>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#2D2A26] mb-4 leading-tight">
                Real-Time <br/><span className="text-[#F28F3B]">Analytics</span>
              </h3>
              <p className="text-[#2D2A26]/60 font-medium text-sm md:text-base leading-relaxed max-w-sm mb-8">
                Track your sales, CO2 saved, and customer growth in real-time. Our smart dashboard gives you actionable insights to optimize your surplus inventory.
              </p>
              <button className="flex items-center gap-2 text-[#2D2A26] font-bold text-xs uppercase tracking-wider hover:text-[#F28F3B] transition-colors w-fit">
                Explore Features <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-24 p-6 md:p-10 bg-white/60 backdrop-blur-xl border border-white/80 rounded-[40px] shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#F28F3B]/10 to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-md">
                  <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="Partner" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-[#2D2A26]">Join 10,000+ Partners</p>
              <p className="text-xs text-[#2D2A26]/50">Start selling in under 24 hours.</p>
            </div>
          </div>

          <div className="w-full md:w-auto relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F28F3B] mb-2 text-center md:text-right">Average Partner ROI</p>
            <p className="text-4xl md:text-5xl font-black text-[#2D2A26] tracking-tighter text-center md:text-right">
              +15% <span className="text-lg text-[#2D2A26]/40 uppercase tracking-wide">Profit</span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}