'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  { name: "Sarah Chen", role: "Regular Customer", location: "Surabaya", image: "https://i.pravatar.cc/150?img=1", text: "I've saved over Rp 500,000 on amazing meals from my favorite cafes! The app is super easy to use and I love knowing I'm helping reduce food waste.", rating: 5, type: "consumer" },
  { name: "Budi Santoso", role: "Owner, Kopi Kita", location: "Surabaya", image: "https://i.pravatar.cc/150?img=3", text: "Partnering with Saverish has reduced our daily food waste by 60%. We've attracted new customers who care about sustainability.", rating: 5, type: "business" },
  { name: "Jessica Wijaya", role: "Regular Customer", location: "Jakarta", image: "https://i.pravatar.cc/150?img=5", text: "The impact tracker is my favorite feature! Seeing how much CO₂ I've saved just by buying surplus food is incredibly satisfying.", rating: 5, type: "consumer" },
  { name: "Michael Tan", role: "Operations Manager, Bakery Bliss", location: "Bandung", image: "https://i.pravatar.cc/150?img=8", text: "We've recovered over 2,000 meals that would have gone to landfill. The team at Saverish is incredibly supportive.", rating: 4, type: "business" }
];

const stats = [
  { value: "4.9", label: "Average Rating" },
  { value: "500+", label: "Verified Reviews" },
  { value: "98%", label: "Would Recommend" },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative w-full bg-[#F4F3EE] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <Quote className="absolute top-10 left-10 w-32 h-32 text-[#2D2A26]" />
        <Quote className="absolute bottom-10 right-10 w-40 h-40 text-[#2D2A26] transform rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F28F3B]/10 rounded-full mb-4">
            <span className="text-[#F28F3B] font-black text-[8px] sm:text-[9px] uppercase tracking-[0.2em]">Testimonials</span>
          </div>
          
          <h2 className="text-[#2D2A26] text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[1.1] font-black">
            What Our<span className="text-[#F28F3B]"> Community</span> Says
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 sm:p-8 md:p-10">
                <Quote className="text-[#F28F3B]/20 w-10 h-10 sm:w-12 sm:h-12 mb-4" />
                
                <p className="text-[#2D2A26]/80 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className="flex items-center gap-1 mb-4 sm:mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < testimonials[currentIndex].rating ? "text-[#F28F3B] fill-[#F28F3B]" : "text-gray-300"} />
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="text-base sm:text-lg text-[#2D2A26] font-extrabold">{testimonials[currentIndex].name}</h4>
                    <p className="text-[#2D2A26]/50 text-xs sm:text-sm">{testimonials[currentIndex].role} • {testimonials[currentIndex].location}</p>
                    <div className="inline-block mt-1 px-2 py-0.5 bg-[#F28F3B]/10 rounded-full text-[#F28F3B] text-[8px] sm:text-[9px] font-black uppercase tracking-wider">
                      {testimonials[currentIndex].type === 'consumer' ? 'Food Rescuer' : 'Business Partner'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 md:-translate-x-6 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#2D2A26] hover:bg-[#F28F3B] hover:text-white transition-all duration-300 z-10">
            <ChevronLeft size={18} />
          </button>
          
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 md:translate-x-6 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#2D2A26] hover:bg-[#F28F3B] hover:text-white transition-all duration-300 z-10">
            <ChevronRight size={18} />
          </button>

          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-6 h-2 bg-[#F28F3B]' : 'w-2 h-2 bg-[#2D2A26]/20 hover:bg-[#2D2A26]/40'}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16 mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-black/5"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl sm:text-3xl text-[#F28F3B] font-black">{stat.value}</div>
              {idx === 0 && (
                <div className="flex justify-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} className="text-[#F28F3B] fill-[#F28F3B]" />)}
                </div>
              )}
              <p className="text-[#2D2A26]/50 text-[10px] sm:text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}