"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Store,
  MessageCircle,
  Smartphone,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function PickupGuidePage() {
  const router = useRouter();
  const [isCollected, setIsCollected] = useState(false);

  const steps = [
    {
      id: 1,
      icon: <Store size={22} strokeWidth={2.5} />,
      title: "Head to the Cashier",
      desc: "Arrive at the store and go straight to the main counter.",
      color: "text-[#F28F3B]",
      bgColor: "bg-[#F28F3B]/10",
      borderColor: "border-[#F28F3B]/30",
    },
    {
      id: 2,
      icon: <MessageCircle size={22} strokeWidth={2.5} />,
      title: "Mention Saverish",
      desc: 'Say to the staff: "Hi, I\'m here to pick up a Saverish Surprise Bag!"',
      color: "text-[#2D2A26]",
      bgColor: "bg-[#2D2A26]/10",
      borderColor: "border-[#2D2A26]/20",
    },
    {
      id: 3,
      icon: <Smartphone size={22} strokeWidth={2.5} />,
      title: "Show Your Screen",
      desc: "Display this app screen so they can verify your Order ID.",
      color: "text-[#10B981]",
      bgColor: "bg-[#10B981]/10",
      borderColor: "border-[#10B981]/30",
    },
  ];

  const stickerSpringTransition = {
    type: "spring" as const,
    stiffness: 150,
    damping: 12,
    mass: 0.8
  };

  return (
    <main className="min-h-screen bg-[#F4F3EE] relative overflow-hidden pt-28 pb-20 px-6 font-[family:var(--font-jakarta)] text-[#2D2A26] select-none">
      <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F28F3B]/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#10B981]/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col h-full">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-8 px-4 py-2 bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-full text-[10px] font-black text-gray-400 hover:text-[#F28F3B] transition-all duration-300 w-fit group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          BACK TO ORDER
        </button>

        <div className="text-center mb-12 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.4, rotate: -15, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2, y: 0 }}
            viewport={{ once: true }}
            transition={stickerSpringTransition}
            className="bg-[#2D2A26] text-white text-[9px] sm:text-xs font-black uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-lg shadow-lg mb-3"
          >
            Live Steps
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
            Pickup <br />
            <span className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white px-4 py-0.5 rounded-[12px] shadow-[0_12px_24px_rgba(242,143,59,0.25)] border-2 border-white transform rotate-1 inline-block mt-2">
              Guide
            </span>
          </h1>

          <div className="flex flex-wrap justify-center gap-2.5 mt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl text-[#10B981] text-[10px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md">
              <Clock size={12} strokeWidth={2.5} /> Today, 19:00 - 20:00
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/70 border border-white shadow-sm rounded-xl text-[#2D2A26]/60 text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
              <MapPin size={12} strokeWidth={2.5} /> Saverish Bakery
            </div>
          </div>
        </div>

        <div className="relative mb-12 px-2">
          <div className="absolute left-[31px] md:left-[39px] top-8 bottom-8 w-1 bg-[#2D2A26]/5 rounded-full" />

          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute left-[31px] md:left-[39px] top-8 w-1 bg-gradient-to-b from-[#F28F3B] via-[#2D2A26] to-[#10B981] rounded-full origin-top"
          />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 md:gap-8 relative z-10 items-start group"
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-[20px] md:rounded-[24px] bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.04)] border-2 ${step.borderColor} flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105`}
                >
                  <div
                    className={`w-11 h-11 md:w-14 md:h-14 rounded-xl ${step.bgColor} flex items-center justify-center ${step.color}`}
                  >
                    {step.icon}
                  </div>
                </div>

                <div className="flex-1 bg-white/50 backdrop-blur-xl border border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.02)] rounded-[24px] md:rounded-[32px] p-5 md:p-6 transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] group-hover:-translate-y-0.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 block">
                    Step 0{step.id}
                  </span>
                  <h3 className="text-base md:text-lg font-black text-[#2D2A26] mb-1 uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#2D2A26]/60 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-auto pt-4"
        >
          <button
            onClick={() => setIsCollected(!isCollected)}
            className={`w-full py-5 rounded-[20px] md:rounded-[28px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 transition-all duration-500 border-2 shadow-lg ${
              isCollected
                ? "bg-[#10B981]/10 border-[#10B981] text-[#10B981] shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
                : "bg-[#2D2A26] border-[#2D2A26] text-white hover:bg-[#F28F3B] hover:border-[#F28F3B] shadow-[0_12px_34px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_34px_rgba(242,143,59,0.25)]"
            }`}
          >
            {isCollected ? (
              <>
                <CheckCircle size={18} className="animate-bounce" strokeWidth={2.5} />
                Meal Collected Successfully!
              </>
            ) : (
              "Tap to Mark as Collected"
            )}
          </button>
        </motion.div>
      </div>
    </main>
  );
}