'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { RiArrowRightUpLine, RiMailLine } from 'react-icons/ri';

const footerLinks = {
  Platform: ['Impact', 'Rescue Hub', 'Business'],
  Legal: ['Privacy', 'Terms'],
};

const socials = [FaInstagram, FaTwitter, FaLinkedinIn];

export default function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => { if (footerRef.current) observer.unobserve(footerRef.current); };
  }, []);

  const { scrollYProgress } = useScroll();
  const opacityText = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 0.05, 0.02]);
  const footerY = useSpring(useTransform(scrollYProgress, [0.7, 0.85, 1], ["100%", "0%", "0%"]), { stiffness: 100, damping: 25 });
  const footerOpacity = useSpring(useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 0, 1]), { stiffness: 100, damping: 25 });

  return (
    <footer ref={footerRef} className="relative w-full bg-[#2D2A26] mt-12 sm:mt-16 md:mt-20">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h2 style={{ opacity: opacityText }} className="text-[15vw] sm:text-[12vw] text-white/[0.03] whitespace-nowrap leading-none uppercase">
          SAVERISH
        </motion.h2>
      </div>

      <motion.div style={{ y: footerY, opacity: footerOpacity }} className="relative z-10 w-full">
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F28F3B] to-transparent"
        />

        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 text-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sm:col-span-2 lg:col-span-5"
              >
                <motion.h3 className="font-black text-3xl sm:text-4xl md:text-5xl text-[#F28F3B] mb-4 sm:mb-6 tracking-tighter">
                  SAVERISH.
                </motion.h3>
                <motion.p className="text-white/50 text-sm sm:text-base max-w-sm mb-6 sm:mb-8 leading-relaxed">
                  Driving the transition towards a circular food economy. Every rescue counts.
                </motion.p>
                <motion.div className="relative max-w-xs sm:max-w-sm">
                  <input 
                    type="text" 
                    placeholder="Join our movement" 
                    className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 text-sm outline-none focus:border-[#F28F3B] transition-colors text-white placeholder:text-white/30"
                  />
                  <motion.button whileHover={{ x: 3 }} className="absolute right-0 bottom-2 sm:bottom-3 text-[#F28F3B]">
                    <RiArrowRightUpLine size={20} />
                  </motion.button>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="sm:col-span-2 lg:col-span-4 grid grid-cols-2 gap-6 sm:gap-8"
              >
                {Object.entries(footerLinks).map(([title, links]) => (
                  <div key={title} className="flex flex-col gap-3 sm:gap-4">
                    <span className="text-[8px] sm:text-[9px] text-[#F28F3B] uppercase font-bold tracking-wider">{title}</span>
                    {links.map(link => (
                      <motion.a key={link} href="#" className="text-white/40 text-xs sm:text-sm hover:text-white transition-colors">
                        {link}
                      </motion.a>
                    ))}
                  </div>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="sm:col-span-2 lg:col-span-3 flex flex-col items-start lg:items-end gap-6 sm:gap-8"
              >
                <motion.div className="lg:text-right">
                  <span className="text-[8px] sm:text-[9px] text-[#F28F3B] uppercase tracking-wider font-bold block mb-3 sm:mb-4">Inquiries</span>
                  <motion.a href="mailto:hello@saverish.com" className="text-sm sm:text-base lg:text-xl font-light hover:opacity-50 transition-opacity flex items-center gap-2 lg:justify-end">
                    <RiMailLine className="text-[#F28F3B] size-4 sm:size-5" /> hello@saverish.com
                  </motion.a>
                </motion.div>
                
                <motion.div className="flex gap-3 sm:gap-4">
                  {socials.map((Icon, i) => (
                    <motion.a key={i} href="#" whileHover={{ y: -3, scale: 1.05 }} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#F28F3B] hover:text-black hover:border-[#F28F3B] transition-all duration-500">
                      <Icon size={14} />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 opacity-50 text-[7px] sm:text-[8px] tracking-[0.1em]"
            >
              <span>© 2026 SAVERISH</span>
              <span>All rights reserved</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}