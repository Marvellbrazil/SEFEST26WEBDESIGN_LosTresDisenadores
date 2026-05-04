'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  { question: "Is the food safe to eat?", answer: "Yes! All partner stores and restaurants are vetted and certified. Surplus food listed on Saverish is always within its safe consumption period. We follow strict food safety guidelines to ensure every rescued meal is fresh and delicious." },
  { question: "How does Saverish make money?", answer: "We believe in transparency. Saverish takes zero commission from rescued meals. Instead, we generate revenue through premium features for businesses (analytics dashboard, sustainability reporting) and corporate partnerships." },
  { question: "Can I partner my restaurant or cafe?", answer: "Absolutely! We welcome restaurants, cafes, bakeries, and grocery stores to join our mission. Sign up is free, and you'll get access to our real-time waste tracking dashboard. Contact our partnership team to get started." },
  { question: "What happens to food that isn't rescued?", answer: "We work with local food banks and composting facilities to ensure zero food goes to landfill. If surplus isn't claimed by pickup time, we redirect it to community fridges or composting partners." },
  { question: "How do I track my environmental impact?", answer: "Every time you rescue a meal, your personal impact dashboard updates automatically. You can see exactly how much CO₂, water, and land you've saved. Share your impact on social media and inspire others!" },
  { question: "Is Saverish available in my city?", answer: "We're currently operating in Surabaya, Jakarta, and Bandung. We're expanding rapidly! Follow our Instagram @himse.telkomsurabaya for updates on new city launches." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-300 mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F28F3B]/10 rounded-full mb-4">
            <HelpCircle size={12} className="text-[#F28F3B]" />
            <span className="text-[#F28F3B] font-black text-[8px] sm:text-[9px] uppercase tracking-[0.2em]">FAQ</span>
          </div>
          
          <h2 className="text-[#2D2A26] text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[1.1] font-black">
            Frequently Asked<br /><span className="text-[#F28F3B]">Questions</span>
          </h2>
          
          <p className="text-[#2D2A26]/60 text-sm sm:text-base max-w-2xl mx-auto mt-4 sm:mt-6">
            Everything you need to know about rescuing food with Saverish.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="mb-3 sm:mb-4"
            >
              <button onClick={() => toggle(index)} className="w-full flex items-center justify-between p-4 sm:p-5 bg-[#F4F3EE] rounded-xl sm:rounded-2xl text-left transition-all duration-300 hover:bg-[#F28F3B]/10">
                <span className="font-extrabold text-sm sm:text-base md:text-lg text-[#2D2A26] pr-4">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-[#F28F3B]">
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="p-4 sm:p-5 bg-white border border-[#F4F3EE] rounded-xl sm:rounded-2xl mt-1">
                      <p className="text-[#2D2A26]/70 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 sm:mt-12 md:mt-16 p-5 sm:p-6 bg-[#F4F3EE] rounded-2xl sm:rounded-3xl"
        >
          <p className="text-[#2D2A26]/70 text-sm sm:text-base mb-3 sm:mb-4">Still have questions? We&apos;re here to help!</p>
          <button className="bg-[#F28F3B] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-wider hover:bg-[#2D2A26] transition-colors">
            Contact Our Team
          </button>
        </motion.div>
      </div>
    </section>
  );
}