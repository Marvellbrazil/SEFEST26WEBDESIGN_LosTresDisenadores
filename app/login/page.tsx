"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Transition, Variants } from "framer-motion";
import {
  RiMailLine,
  RiLockLine,
  RiUserLine,
  RiArrowLeftLine,
  RiShoppingBag3Line,
  RiStore2Line,
  RiPhoneLine,
  RiMapPinLine,
  RiIdCardLine,
} from "react-icons/ri";
import Link from "next/link";
import ForgotPasswordModal from "./components/ForgotPasswordModal";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  const springTransition: Transition = {
    type: "spring",
    stiffness: 45,
    damping: 12,
    mass: 1,
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: custom * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const stickerSpringTransition = {
    type: "spring" as const,
    stiffness: 150,
    damping: 12,
    mass: 0.8,
  };

  return (
    <main className="h-screen w-full bg-[#F4F3EE] overflow-hidden font-[family:var(--font-jakarta)] relative select-none">
      <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      <Link
        href="/"
        className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2D2A26] hover:text-[#F28F3B] transition-colors group bg-white/80 backdrop-blur-md px-5 py-3 rounded-full shadow-md border border-white"
      >
        <RiArrowLeftLine className="transition-transform group-hover:-translate-x-1" size={16} />
        Back to Home
      </Link>

      <div className="relative w-full h-full flex">
        
        <div className={`w-full lg:w-[50vw] h-full flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-32 transition-all duration-700 bg-transparent relative z-10 ${!isLogin ? "opacity-0 pointer-events-none delay-0" : "opacity-100 delay-300"}`}>
          <div className="mb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.4, rotate: -15, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2, y: 0 }}
              viewport={{ once: true }}
              transition={stickerSpringTransition}
              className="bg-[#2D2A26] text-white text-[9px] sm:text-xs font-black uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-lg shadow-lg mb-3 w-max"
            >
              Portal Gate
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#2D2A26] leading-[0.85]">
              Welcome <br /> 
              <span className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white px-4 py-0.5 rounded-[12px] shadow-[0_12px_24px_rgba(242,143,59,0.25)] border-2 border-white transform rotate-1 inline-block mt-2">
                Back
              </span>
            </h2>
            <p className="text-[10px] sm:text-xs font-black text-gray-400 mt-4 tracking-[0.3em] uppercase">
              {role === "buyer" ? "Rescue more food today" : "Manage your surplus items"}
            </p>
          </div>

          <div className="flex gap-2 p-1 bg-[#2D2A26]/5 backdrop-blur-sm rounded-2xl max-w-md mb-6 border border-black/5">
            <button type="button" onClick={() => setRole("buyer")} className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${role === "buyer" ? "bg-[#2D2A26] text-white shadow-md" : "text-[#2D2A26]/60 hover:text-[#2D2A26]"}`}>
              <RiShoppingBag3Line size={14} /> Buyer
            </button>
            <button type="button" onClick={() => setRole("seller")} className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${role === "seller" ? "bg-[#F28F3B] text-white shadow-md" : "text-[#2D2A26]/60 hover:text-[#2D2A26]"}`}>
              <RiStore2Line size={14} /> Seller
            </button>
          </div>

          <form className="space-y-4 max-w-md">
            <AnimatePresence mode="wait">
              {role === "buyer" && (
                <motion.div key="buyer-signin" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-3">
                  <div className="relative">
                    <RiMailLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
                  </div>
                  <div className="relative">
                    <RiLockLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <input type="password" placeholder="PASSWORD" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {role === "seller" && (
                <motion.div key="seller-signin" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-3">
                  <div className="relative">
                    <RiMailLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <input type="email" placeholder="BUSINESS EMAIL ADDRESS" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
                  </div>
                  <div className="relative">
                    <RiLockLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <input type="password" placeholder="PASSWORD" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
                  </div>
                  <div className="relative">
                    <RiStore2Line className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <input type="text" placeholder="STORE / BUSINESS NAME" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
                  </div>
                  <div className="relative">
                    <RiIdCardLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <input type="text" placeholder="STORE ID" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end">
              <button type="button" onClick={() => setIsForgotOpen(true)} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#F28F3B] transition-colors">
                Forgot Password?
              </button>
            </div>
            <button className={`w-full text-white rounded-2xl py-4.5 text-[11px] font-black uppercase tracking-[0.25em] transition-all shadow-xl shadow-black/5 hover:-translate-y-0.5 duration-300 ${role === "buyer" ? "bg-[#2D2A26] hover:bg-[#F28F3B]" : "bg-[#F28F3B] hover:bg-[#2D2A26]"}`}>
              Sign In
            </button>
            <p className="lg:hidden text-center text-[10px] font-black uppercase tracking-widest text-gray-400 mt-6">
              Don't have an account? <button type="button" onClick={() => setIsLogin(false)} className="text-[#F28F3B] hover:text-[#2D2A26] transition-colors">Sign Up</button>
            </p>
          </form>
        </div>

        <div className={`absolute top-0 right-0 w-full lg:w-[50vw] h-full flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-32 transition-all duration-700 bg-transparent z-10 ${isLogin ? "opacity-0 pointer-events-none delay-0" : "opacity-100 delay-300"}`}>
          <div className="mb-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.4, rotate: -15, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 2, y: 0 }}
              viewport={{ once: true }}
              transition={stickerSpringTransition}
              className="bg-[#2D2A26] text-white text-[9px] sm:text-xs font-black uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-lg shadow-lg mb-3 w-max"
            >
              Join Us
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#2D2A26] leading-[0.85]">
              Join <br /> 
              <span className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white px-4 py-0.5 rounded-[12px] shadow-[0_12px_24px_rgba(242,143,59,0.25)] border-2 border-white transform -rotate-1 inline-block mt-2">
                Saverish
              </span>
            </h2>
            <p className="text-[10px] sm:text-xs font-black text-gray-400 mt-3 tracking-[0.3em] uppercase">
              {role === "buyer" ? "Start your zero-waste journey" : "Grow your business sustainably"}
            </p>
          </div>

          <div className="flex gap-2 p-1 bg-[#2D2A26]/5 backdrop-blur-sm rounded-2xl max-w-md mb-5 border border-black/5">
            <button type="button" onClick={() => setRole("buyer")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${role === "buyer" ? "bg-[#2D2A26] text-white shadow-md" : "text-[#2D2A26]/60 hover:text-[#2D2A26]"}`}>
              <RiShoppingBag3Line size={14} /> As Buyer
            </button>
            <button type="button" onClick={() => setRole("seller")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${role === "seller" ? "bg-[#F28F3B] text-white shadow-md" : "text-[#2D2A26]/60 hover:text-[#2D2A26]"}`}>
              <RiStore2Line size={14} /> As Seller
            </button>
          </div>

          <form className="space-y-3 max-w-md max-h-[55vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden">
            <div className={role === "buyer" ? "space-y-3" : "hidden"}>
              <div className="relative">
                <RiUserLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input type="text" placeholder="FULL NAME" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
              </div>
              <div className="relative">
                <RiMailLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
              </div>
            </div>

            <div className={role === "seller" ? "space-y-3" : "hidden"}>
              <div className="relative">
                <RiStore2Line className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input type="text" placeholder="STORE / BUSINESS NAME" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
              </div>
              <div className="relative">
                <RiMailLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input type="email" placeholder="BUSINESS EMAIL ADDRESS" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
              </div>
              <div className="relative">
                <RiPhoneLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input type="tel" placeholder="PHONE NUMBER" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
              </div>
              <div className="relative">
                <RiMapPinLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input type="text" placeholder="STORE ADDRESS" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
              </div>
            </div>
            
            <div className="relative">
              <RiLockLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <input type="password" placeholder="PASSWORD" className="w-full bg-white/70 backdrop-blur-md border border-white focus:border-[#F28F3B] rounded-2xl py-4.5 pl-14 pr-6 text-[11px] font-black tracking-widest text-[#2D2A26] outline-none transition-all shadow-sm focus:ring-0" />
            </div>

            <button className={`w-full text-white rounded-2xl py-4.5 mt-2 text-[11px] font-black uppercase tracking-[0.25em] transition-all shadow-xl shadow-black/5 hover:-translate-y-0.5 duration-300 ${role === "buyer" ? "bg-[#2D2A26] hover:bg-[#F28F3B]" : "bg-[#F28F3B] hover:bg-[#2D2A26]"}`}>
              {role === "buyer" ? "Create Buyer Account" : "Register Business"}
            </button>
            <p className="lg:hidden text-center text-[10px] font-black uppercase tracking-widest text-gray-400 mt-6">
              Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="text-[#F28F3B] hover:text-[#2D2A26] transition-colors">Sign In</button>
            </p>
          </form>
        </div>

        <motion.div
          animate={{ clipPath: isLogin ? "inset(0% 0% 0% 50%)" : "inset(0% 50% 0% 0%)" }}
          transition={springTransition}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none hidden lg:block bg-[#2D2A26]"
        >
          <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2000&auto=format&fit=crop" alt="Saverish Fresh Food" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2D2A26]/50 via-[#2D2A26]/70 to-[#2D2A26]/95" />
        </motion.div>

        <motion.div
          animate={{ x: isLogin ? "100%" : "0%" }}
          transition={springTransition}
          className="absolute top-0 left-0 w-[50vw] h-full z-30 hidden lg:flex flex-col items-center justify-center text-center px-16 text-white pointer-events-none"
        >
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#F28F3B] rounded-full blur-[150px] opacity-20 z-0" />
          <div className="absolute bottom-[-20%] left-[-20%] w-[400px] h-[400px] bg-[#F28F3B] rounded-full blur-[120px] opacity-10 z-0" />

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div key="toSignup" className="relative z-30 flex flex-col items-center pointer-events-auto">
                <motion.div custom={1} variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="w-24 h-24 rounded-full overflow-hidden shadow-xl mx-auto flex items-center justify-center text-white mb-8 border-2 border-white/20 transform rotate-3">
                  <img src="https://images.unsplash.com/vector-1778639108685-395007c80714?w=600&auto=format&fit=crop&q=60" alt="Saverish Logo" className="w-full h-full object-cover object-center" />
                </motion.div>
                <motion.h3 custom={2} variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="text-4xl xl:text-5xl font-black uppercase tracking-tighter mb-4 leading-tight drop-shadow-xl text-white">
                  New Around <span className="text-[#F28F3B]">Here?</span>
                </motion.h3>
                <motion.p custom={3} variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="text-[10px] font-bold text-white/70 mb-8 leading-relaxed uppercase tracking-[0.4em] max-w-sm drop-shadow-md">
                  Join our movement to end food waste <br /> and start saving the planet one meal at a time.
                </motion.p>
                <motion.button custom={4} variants={contentVariants} initial="hidden" animate="visible" exit="exit" onClick={() => setIsLogin(false)} className="group relative overflow-hidden border-2 border-white/20 hover:border-[#F28F3B] px-12 py-4.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300">
                  <span className="relative z-10 transition-colors group-hover:text-white">Create Account</span>
                  <div className="absolute inset-0 bg-[#F28F3B] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="toLogin" className="relative z-30 flex flex-col items-center pointer-events-auto">
                <motion.div custom={1} variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="w-24 h-24 rounded-full overflow-hidden shadow-xl mx-auto flex items-center justify-center text-white mb-8 border-2 border-white/20 transform -rotate-3">
                  <img src="https://images.unsplash.com/vector-1778639108685-395007c80714?w=600&auto=format&fit=crop&q=60" alt="Saverish Logo" className="w-full h-full object-cover object-center" />
                </motion.div>
                <motion.h3 custom={2} variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="text-4xl xl:text-5xl font-black uppercase tracking-tighter mb-4 leading-tight drop-shadow-xl text-white">
                  Already a <span className="text-[#F28F3B]">Rescuer?</span>
                </motion.h3>
                <motion.p custom={3} variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="text-[10px] font-bold text-white/70 mb-8 leading-relaxed uppercase tracking-[0.4em] max-w-sm drop-shadow-md">
                  Sign in to continue your journey <br /> and check out today's flash sales nearby.
                </motion.p>
                <motion.button custom={4} variants={contentVariants} initial="hidden" animate="visible" exit="exit" onClick={() => setIsLogin(true)} className="group relative overflow-hidden border-2 border-white/20 hover:border-[#F28F3B] px-12 py-4.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300">
                  <span className="relative z-10 transition-colors group-hover:text-white">Sign In Now</span>
                  <div className="absolute inset-0 bg-[#F28F3B] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
      <ForgotPasswordModal isOpen={isForgotOpen} onClose={() => setIsForgotOpen(false)} />
    </main>
  );
}