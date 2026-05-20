'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaymentMethods } from './components/PaymentMethods';
import { OrderSummary } from './components/OrderSummary';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>('credit_card');
  const router = useRouter();

  const stickerSpringTransition = {
    type: "spring" as const,
    stiffness: 150,
    damping: 12,
    mass: 0.8
  };

  return (
    <main className="min-h-screen bg-[#F4F3EE] relative overflow-hidden pt-28 pb-20 px-4 md:px-8 font-[family:var(--font-jakarta)] text-[#2D2A26] select-none">
      
      <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F28F3B]/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#2D2A26]/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-[#2D2A26]/5 pb-6">
          <div className="flex flex-col items-start">
            <button 
              onClick={() => router.back()} 
              className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#F28F3B] transition-colors group bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-sm"
            >
              <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
              BACK TO EXPLORE
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.4, rotate: -15, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2, y: 0 }}
              viewport={{ once: true }}
              transition={stickerSpringTransition}
              className="bg-[#2D2A26] text-white text-[9px] sm:text-xs font-black uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-lg shadow-lg mb-3"
            >
              Secure Checkout
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85]">
              Checkout <br />
              <span className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white px-4 py-0.5 rounded-[12px] shadow-[0_12px_24px_rgba(242,143,59,0.25)] border-2 border-white transform rotate-1 inline-block mt-2">
                Details
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 bg-white/70 backdrop-blur-xl border border-white rounded-2xl shadow-sm md:mb-1 w-max">
            <ShieldCheck className="text-[#10B981]" size={18} strokeWidth={2.5} />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#2D2A26]/60">Secure 256-bit SSL Connection</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <section className="bg-white/50 backdrop-blur-xl border border-white/80 p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-[#2D2A26] text-white flex items-center justify-center text-xs font-black shadow-md shadow-black/10">1</div>
                <h2 className="text-base font-black uppercase tracking-wider text-[#2D2A26]">Select Payment Method</h2>
              </div>
              <PaymentMethods selected={selectedMethod} onSelect={setSelectedMethod} />
            </section>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <section className="bg-white/50 backdrop-blur-xl border border-white/80 p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-[#F28F3B] text-white flex items-center justify-center text-xs font-black shadow-md shadow-[#F28F3B]/20">2</div>
                <h2 className="text-base font-black uppercase tracking-wider text-[#2D2A26]">Order Summary</h2>
              </div>
              <OrderSummary selectedMethod={selectedMethod} />
            </section>
          </motion.div>

        </div>
      </div>
    </main>
  );
}