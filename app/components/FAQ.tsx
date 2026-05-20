'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';

const faqs = [
  { question: "Is the food safe to eat?", answer: "Yes! All partner stores and restaurants are vetted and certified. Surplus food listed on Saverish is always within its safe consumption period. We follow strict food safety guidelines to ensure every rescued meal is fresh and delicious." },
  { question: "How does Saverish make money?", answer: "We believe in transparency. Saverish takes zero commission from rescued meals. Instead, we generate revenue through premium features for businesses (analytics dashboard, sustainability reporting) and corporate partnerships." },
  { question: "Can I partner my restaurant or cafe?", answer: "Absolutely! We welcome restaurants, cafes, bakeries, and grocery stores to join our mission. Sign up is free, and you'll get access to our real-time waste tracking dashboard. Contact our partnership team to get started." },
  { question: "What happens to food that isn't rescued?", answer: "We work with local food banks and composting facilities to ensure zero food goes to landfill. If surplus isn't claimed by pickup time, we redirect it to community fridges or composting partners." },
  { question: "How do I track my environmental impact?", answer: "Every time you rescue a meal, your personal impact dashboard updates automatically. You can see exactly how much CO₂, water, and land you've saved. Share your impact on social media and inspire others!" },
  { question: "Is Saverish available in my city?", answer: "We're currently operating in Surabaya, Jakarta, and Bandung. We're expanding rapidly! Follow our Instagram @saverish.id for updates on new city launches." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const stickerSpringTransition = {
    type: "spring" as const,
    stiffness: 150,
    damping: 12,
    mass: 0.8
  };

  return (
    <section id="faq-section" className="relative w-full min-h-screen py-24 lg:py-32 bg-[#F4F3EE] overflow-hidden font-[family:var(--font-jakarta)] select-none">
      
      <div 
        className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#F28F3B] blur-[150px] z-0 pointer-events-none" 
      />

      <div className="absolute top-0 right-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.03] z-0">
        <h2 className="text-[25vw] font-black uppercase leading-none text-right -mr-20 tracking-tighter">
          FAQ • FAQ
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <div className="lg:col-span-5">
            <div className="sticky top-24 lg:top-32">
              
              <div className="lg:hidden w-full flex flex-col items-start mb-10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.4, rotate: -15, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={stickerSpringTransition}
                  className="bg-[#2D2A26] text-white text-[9px] min-[400px]:text-[10px] font-black uppercase tracking-[0.3em] px-3.5 py-1.5 rounded-md shadow-md mb-3 w-max"
                >
                  Support Center
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.7, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...stickerSpringTransition, delay: 0.1 }}
                  className="relative font-black uppercase tracking-tighter leading-[0.85] text-[#2D2A26] text-[36px] min-[400px]:text-[44px]"
                >
                  GOT <br />
                  <span className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white px-4 py-0.5 rounded-[12px] shadow-[0_15px_30px_rgba(242,143,59,0.25)] border-2 border-white transform rotate-1.5 inline-block text-[26px] min-[400px]:text-[32px] mt-2">
                    QUESTIONS?
                  </span>
                </motion.h2>
              </div>

              <div className="hidden lg:flex flex-col items-start mb-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.4, rotate: -12, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={stickerSpringTransition}
                  className="bg-[#2D2A26] text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-md shadow-md mb-4 w-max"
                >
                  Support Center
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.8, y: 50, rotate: 5 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...stickerSpringTransition, delay: 0.15 }}
                  className="relative font-black uppercase tracking-tighter leading-[0.8] flex flex-col items-start text-[#2D2A26] text-[72px] xl:text-[80px]"
                >
                  <span>GOT</span>
                  <span className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white px-5 py-0.5 rounded-[18px] shadow-[0_15px_30px_rgba(242,143,59,0.25)] border-4 border-white transform rotate-1.5 inline-block text-[50px] xl:text-[60px] mt-2">
                    QUESTIONS?
                  </span>
                </motion.h2>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#2D2A26]/60 text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-8 max-w-md"
              >
                Everything you need to know about our mission to end food waste and how you can be a part of the change.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
                className="p-6 sm:p-8 bg-[#2D2A26] rounded-[24px] sm:rounded-[32px] text-white shadow-2xl relative overflow-hidden group border border-white/10"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F28F3B]/20 rounded-bl-full blur-2xl pointer-events-none" />
                <MessageCircle className="mb-4 sm:mb-6 text-[#F28F3B]" size={32} />
                <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-2">Still confused?</h4>
                <p className="text-white/60 text-xs sm:text-sm mb-6 font-medium">Our team is ready to help you with anything you need.</p>
                <button className="flex items-center gap-2 text-[#F28F3B] font-black text-[10px] sm:text-xs uppercase tracking-widest hover:text-white transition-colors group/btn">
                  Contact Support <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08, type: "spring", bounce: 0.2 }}
                className="group"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full flex items-center justify-between p-5 sm:p-6 md:p-8 rounded-[24px] sm:rounded-[32px] text-left transition-all duration-500 border ${
                    openIndex === index 
                    ? "bg-white shadow-xl border-white" 
                    : "bg-white/40 backdrop-blur-md border-white/50 hover:bg-white/60"
                  }`}
                >
                  <span className={`font-black text-sm sm:text-base md:text-xl uppercase tracking-tighter transition-colors duration-500 max-w-[85%] ${
                    openIndex === index ? "text-[#F28F3B]" : "text-[#2D2A26]"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
                    openIndex === index ? "bg-[#F28F3B] text-white rotate-180 shadow-md" : "bg-[#2D2A26]/5 text-[#2D2A26]"
                  }`}>
                    <ChevronDown size={18} className="sm:w-5 sm:h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
                        <div className="w-full h-px bg-[#2D2A26]/5 mb-5 sm:mb-6" />
                        <p className="text-[#2D2A26]/70 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}