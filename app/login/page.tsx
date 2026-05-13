"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Transition, Variants } from "framer-motion";
import {
  RiLeafLine,
  RiMailLine,
  RiLockLine,
  RiUserLine,
  RiArrowLeftLine,
} from "react-icons/ri";
import Link from "next/link";
import ForgotPasswordModal from "./components/ForgotPasswordModal";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

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

  return (
    <main className="h-screen w-full bg-white overflow-hidden font-[family:var(--font-jakarta)] relative">
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2D2A26] hover:text-[#F28F3B] transition-colors group bg-white/80 backdrop-blur-md px-5 py-3 rounded-full shadow-sm border border-black/5"
      >
        <RiArrowLeftLine
          className="transition-transform group-hover:-translate-x-1"
          size={16}
        />
        Back to Home
      </Link>

      <div className="relative w-full h-full flex">
        <div
          className={`w-full lg:w-[50vw] h-full flex flex-col justify-center px-8 sm:px-12 md:px-24 lg:px-32 transition-all duration-700 bg-white relative z-10 ${!isLogin ? "opacity-0 pointer-events-none delay-0" : "opacity-100 delay-300"}`}
        >
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#2D2A26] leading-none">
              Welcome <br /> <span className="text-[#F28F3B]">Back</span>
            </h2>
            <p className="text-xs font-bold text-gray-400 mt-4 tracking-[0.3em] uppercase">
              Rescue more food today
            </p>
          </div>

          <form className="space-y-6 max-w-md">
            <div className="space-y-4">
              <div className="relative">
                <RiMailLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-[#F4F3EE] border-none rounded-2xl py-5 pl-14 pr-6 text-[11px] font-black tracking-widest focus:ring-2 focus:ring-[#F28F3B] outline-none transition-all"
                />
              </div>
              <div className="relative">
                <RiLockLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="w-full bg-[#F4F3EE] border-none rounded-2xl py-5 pl-14 pr-6 text-[11px] font-black tracking-widest focus:ring-2 focus:ring-[#F28F3B] outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsForgotOpen(true)}
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#F28F3B] transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <Link href="/dashboard" className="w-full block">
            <button className="w-full bg-[#2D2A26] text-white rounded-2xl py-5 text-[11px] font-black uppercase tracking-[0.25em] hover:bg-[#F28F3B] transition-all shadow-xl shadow-black/5 hover:shadow-[#F28F3B]/30 hover:-translate-y-1">
              Sign In
            </button>
            </Link>
            <p className="lg:hidden text-center text-[10px] font-black uppercase tracking-widest text-gray-400 mt-8">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false);
                }}
                className="text-[#F28F3B] hover:text-[#2D2A26] transition-colors"
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>

        <div
          className={`absolute top-0 right-0 w-full lg:w-[50vw] h-full flex flex-col justify-center px-8 sm:px-12 md:px-24 lg:px-32 transition-all duration-700 bg-white z-10 ${isLogin ? "opacity-0 pointer-events-none delay-0" : "opacity-100 delay-300"}`}
        >
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#2D2A26] leading-none">
              Join <br /> <span className="text-[#F28F3B]">Saverish</span>
            </h2>
            <p className="text-xs font-bold text-gray-400 mt-4 tracking-[0.3em] uppercase">
              Start your zero-waste journey
            </p>
          </div>

          <form className="space-y-5 max-w-md">
            <div className="space-y-3">
              <div className="relative">
                <RiUserLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="text"
                  placeholder="FULL NAME"
                  className="w-full bg-[#F4F3EE] border-none rounded-2xl py-5 pl-14 pr-6 text-[11px] font-black tracking-widest focus:ring-2 focus:ring-[#F28F3B] outline-none transition-all"
                />
              </div>
              <div className="relative">
                <RiMailLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-[#F4F3EE] border-none rounded-2xl py-5 pl-14 pr-6 text-[11px] font-black tracking-widest focus:ring-2 focus:ring-[#F28F3B] outline-none transition-all"
                />
              </div>
              <div className="relative">
                <RiLockLine className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="w-full bg-[#F4F3EE] border-none rounded-2xl py-5 pl-14 pr-6 text-[11px] font-black tracking-widest focus:ring-2 focus:ring-[#F28F3B] outline-none transition-all"
                />
              </div>
            </div>
            <button className="w-full bg-[#F28F3B] text-white rounded-2xl py-5 text-[11px] font-black uppercase tracking-[0.25em] hover:bg-[#2D2A26] transition-all shadow-xl shadow-[#F28F3B]/20 hover:shadow-black/10 hover:-translate-y-1">
              Create Account
            </button>
            <p className="lg:hidden text-center text-[10px] font-black uppercase tracking-widest text-gray-400 mt-8">
              Already have an account?{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(true);
                }}
                className="text-[#F28F3B] hover:text-[#2D2A26] transition-colors"
              >
                Sign In
              </button>
            </p>
          </form>
        </div>

        <motion.div
          animate={{
            clipPath: isLogin ? "inset(0% 0% 0% 50%)" : "inset(0% 50% 0% 0%)",
          }}
          transition={springTransition}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none hidden lg:block bg-[#2D2A26]"
        >
          <img
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2000&auto=format&fit=crop"
            alt="Saverish Fresh Food"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2D2A26]/40 via-[#2D2A26]/50 to-[#2D2A26]/80" />
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
              <motion.div
                key="toSignup"
                className="relative z-30 flex flex-col items-center pointer-events-auto"
              >
                <motion.div
                  custom={1}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-27 h-27 rounded-full overflow-hidden shadow-xl mx-auto flex items-center justify-center text-white mb-10 rotate-3"
                >
                  <img
                    src="https://images.unsplash.com/vector-1778639108685-395007c80714?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D"
                    alt="Saverish Custom Logo"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
                <motion.h3
                  custom={2}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-5xl font-black uppercase tracking-tighter mb-6 leading-tight drop-shadow-xl text-white"
                >
                  New Around <span className="text-[#F28F3B]">Here?</span>
                </motion.h3>
                <motion.p
                  custom={3}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-[11px] font-bold text-white/70 mb-12 leading-relaxed uppercase tracking-[0.4em] max-w-sm drop-shadow-md"
                >
                  Join our movement to end food waste <br /> and start saving
                  the planet one meal at a time.
                </motion.p>
                <motion.button
                  custom={4}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setIsLogin(false)}
                  className="group relative overflow-hidden border-2 border-white/20 hover:border-[#F28F3B] px-14 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300"
                >
                  <span className="relative z-10 transition-colors group-hover:text-white">
                    Create Account
                  </span>
                  <div className="absolute inset-0 bg-[#F28F3B] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="toLogin"
                className="relative z-30 flex flex-col items-center pointer-events-auto"
              >
                <motion.div
                  custom={1}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-27 h-27 rounded-full overflow-hidden shadow-xl mx-auto flex items-center justify-center text-white mb-10 -rotate-3"
                >
                  <img
                    src="https://images.unsplash.com/vector-1778639108685-395007c80714?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D"
                    alt="Saverish Custom Logo"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
                <motion.h3
                  custom={2}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-5xl font-black uppercase tracking-tighter mb-6 leading-tight drop-shadow-xl text-white"
                >
                  Already a <span className="text-[#F28F3B]">Rescuer?</span>
                </motion.h3>
                <motion.p
                  custom={3}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-[11px] font-bold text-white/70 mb-12 leading-relaxed uppercase tracking-[0.4em] max-w-sm drop-shadow-md"
                >
                  Sign in to continue your journey <br /> and check out today's
                  flash sales nearby.
                </motion.p>
                <motion.button
                  custom={4}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setIsLogin(true)}
                  className="group relative overflow-hidden border-2 border-white/20 hover:border-[#F28F3B] px-14 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300"
                >
                  <span className="relative z-10 transition-colors group-hover:text-white">
                    Sign In Now
                  </span>
                  <div className="absolute inset-0 bg-[#F28F3B] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />
    </main>
  );
}
