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

  return (
    <main className="min-h-screen bg-[#faf9f4] relative overflow-hidden pt-32 pb-20 px-4 md:px-8 font-[family:var(--font-jakarta)] text-[#2D2A26]">
      
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#F28F3B]/10 blur-[120px] pointer-events-none" />

    <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
            <button 
              onClick={() => router.back()} 
              className="flex items-center gap-2 mb-4 text-xs font-black text-gray-400 hover:text-[#F28F3B] transition-colors group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              BACK TO EXPLORE
            </button>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              Checkout <span className="text-[#F28F3B]">Details</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/60 border border-black/5 rounded-2xl shadow-sm">
            <ShieldCheck className="text-[#00a572]" size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Secure 256-bit SSL Connection</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#2D2A26] text-white flex items-center justify-center text-sm font-bold">1</div>
                <h2 className="text-lg font-black uppercase tracking-wider">Select Payment Method</h2>
              </div>
              <PaymentMethods selected={selectedMethod} onSelect={setSelectedMethod} />
            </section>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#F28F3B] text-white flex items-center justify-center text-sm font-bold">2</div>
                <h2 className="text-lg font-black uppercase tracking-wider">Order Summary</h2>
              </div>
              <OrderSummary selectedMethod={selectedMethod} />
            </section>
          </motion.div>
        </div>
      </div>
    </main>
  );
}