'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { RiSearchLine } from 'react-icons/ri';

const navLinks = ['Home', 'Explore', 'Impact', 'Partnership', 'About'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? "bg-white/40 backdrop-blur-xl border-b border-white/20 py-3 shadow-sm" 
          : "bg-black/10 backdrop-blur-md border-b border-white/5 py-5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <div className={`text-2xl font-[family:var(--font-inter)] font-black tracking-tighter leading-none cursor-pointer transition-colors duration-500 ${
            isScrolled ? "text-[#F28F3B]" : "text-white"
          }`}>
            Saverish
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <a 
                key={item} 
                href="#" 
                className={`text-[13px] font-[family:var(--font-jakarta)] font-bold tracking-wide transition-all duration-500 ${
                  isScrolled 
                    ? "text-black/60 hover:text-black" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center relative group">
            <div className={`flex items-center border-b transition-all duration-500 w-[180px] py-1 ${
              isScrolled 
                ? "border-black/10 text-black/80" 
                : "border-white/20 text-white/80"
            } group-hover:border-[#F28F3B]`}>
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent text-[13px] outline-none w-full placeholder:text-inherit placeholder:opacity-40 font-[family:var(--font-jakarta)] font-light"
              />
              <RiSearchLine className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <button className={`px-7 py-2 rounded-lg text-[13px] font-[family:var(--font-jakarta)] font-medium transition-all duration-300 ${
            isScrolled 
              ? "bg-[#F28F3B] text-white hover:bg-black shadow-lg shadow-[#F28F3B]/20" 
              : "bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white hover:text-black"
          }`}>
            Login
          </button>
        </div>
      </div>
    </motion.nav>
  );
}