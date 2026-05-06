'use client';

import { motion } from 'framer-motion';
import { Shield, TrendingUp, Globe, Clock, Users, Leaf } from 'lucide-react';

const WhySaverish = () => {
  const uniquePoints = [
    {
      icon: <Shield size={24} />,
      title: "Blockchain Verified",
      description: "Every rescued meal is recorded on blockchain for complete transparency. No greenwashing, just real impact.",
      color: "#F28F3B"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Real-time Analytics",
      description: "Live dashboard showing exactly how much CO₂, water, and land you've helped preserve.",
      color: "#2D2A26"
    },
    {
      icon: <Globe size={24} />,
      title: "Zero Middleman",
      description: "100% of surplus value goes directly to rescuing food. No hidden fees, no commissions.",
      color: "#F28F3B"
    },
    {
      icon: <Clock size={24} />,
      title: "Instant Matching",
      description: "AI-powered matching between surplus food and nearby rescuers in real-time.",
      color: "#2D2A26"
    },
    {
      icon: <Users size={24} />,
      title: "Community Driven",
      description: "Join 5,000+ active rescuers and 200+ business partners in the circular economy movement.",
      color: "#F28F3B"
    },
    {
      icon: <Leaf size={24} />,
      title: "SDG 12 Certified",
      description: "Officially aligned with UN Sustainable Development Goal 12.3 and 12.5 targets.",
      color: "#2D2A26"
    }
  ];

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#F28F3B]/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F28F3B]/10 rounded-full mb-4">
            <span className="text-[#F28F3B] font-[family:var(--font-jakarta)] font-black text-[8px] sm:text-[9px] uppercase tracking-[0.2em]">Why Choose Us</span>
          </div>
          
          <h2 className="text-[#2D2A26] font-[family:var(--font-jakarta)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[1.1] font-black">
            What Makes <span className="text-[#F28F3B]">Saverish</span>
            <br className="hidden sm:block" />
            Different?
          </h2>
          
          <p className="text-[#2D2A26]/60 font-[family:var(--font-jakarta)] text-sm sm:text-base max-w-2xl mx-auto mt-4 sm:mt-6">
            We're not just another food waste app. Here's what sets us apart from the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {uniquePoints.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#F4F3EE] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${point.color}15`, color: point.color }}
              >
                {point.icon}
              </div>
              
              <h3 className="font-[family:var(--font-jakarta)] text-lg sm:text-xl md:text-2xl text-[#2D2A26] uppercase mb-2 sm:mb-3 font-extrabold">
                {point.title}
              </h3>
              
              <p className="text-[#2D2A26]/60 font-[family:var(--font-jakarta)] text-sm leading-relaxed">
                {point.description}
              </p>
              
              <div className="mt-4 sm:mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#F28F3B] to-transparent" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 md:mt-20 p-4 sm:p-6 bg-[#F28F3B]/5 rounded-2xl sm:rounded-3xl border border-[#F28F3B]/10 text-center"
        >
          <p className="text-[#2D2A26]/70 font-[family:var(--font-jakarta)] text-sm sm:text-base">
            ⚡ Unlike other platforms, Saverish doesn't take commission from rescued meals. 
            <span className="font-extrabold text-[#F28F3B]"> 100% goes to reducing food waste.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default WhySaverish;