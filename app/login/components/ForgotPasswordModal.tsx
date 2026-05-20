"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMailLine, RiCloseLine, RiKey2Line } from "react-icons/ri";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <motion.div
            key="forgot-password-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2D2A26]/60 backdrop-blur-xl pointer-events-auto"
          />

          <motion.div
            key="forgot-password-content"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative z-[10000] w-[29%] max-w-md bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden p-10 md:p-14 font-[family:var(--font-jakarta)] pointer-events-auto"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F28F3B]/10 rounded-full blur-[80px] pointer-events-none" />

            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-[#F4F3EE] text-[#2D2A26]/30 hover:text-[#2D2A26] transition-all"
            >
              <RiCloseLine size={24} />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#F28F3B] rounded-2xl flex items-center justify-center text-white mb-10 -rotate-6 shadow-lg shadow-[#F28F3B]/40">
                <RiKey2Line size={28} />
              </div>

              <h2 className="text-[14px] font-black text-[#2D2A26] uppercase tracking-[0.5em] mb-4 leading-tight">
                Forgot <br /> <span className="text-[#F28F3B]">Password?</span>
              </h2>
              
              <p className="text-[10px] font-bold text-[#2D2A26]/40 uppercase tracking-[0.2em] mb-12 max-w-[220px] leading-relaxed">
                Enter your email to receive a password reset link.
              </p>

              <div className="w-full space-y-6">
                <div className="relative group">
                  <RiMailLine className="absolute left-6 top-1/2 -translate-y-1/2 text-[#2D2A26]/20 group-focus-within:text-[#F28F3B] transition-colors" size={18} />
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full bg-[#F4F3EE]/50 border-2 border-transparent focus:border-[#F28F3B]/20 rounded-full py-5 pl-14 pr-8 text-[10px] font-black tracking-[0.3em] outline-none transition-all placeholder-[#2D2A26]/20 uppercase"
                  />
                </div>

                <button className="w-full bg-[#2D2A26] text-white rounded-full py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#F28F3B] transition-all shadow-xl shadow-black/10 hover:shadow-[#F28F3B]/30">
                  Send Reset Link
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}