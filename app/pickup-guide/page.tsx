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
      icon: <Store size={24} />,
      title: "Head to the Cashier",
      desc: "Arrive at the store and go straight to the main counter.",
      color: "text-[#F28F3B]",
      bgColor: "bg-[#F28F3B]/10",
      borderColor: "border-[#F28F3B]/30",
    },
    {
      id: 2,
      icon: <MessageCircle size={24} />,
      title: "Mention Saverish",
      desc: 'Say to the staff: "Hi, I\'m here to pick up a Saverish Surprise Bag!"',
      color: "text-[#2D2A26]",
      bgColor: "bg-[#2D2A26]/10",
      borderColor: "border-[#2D2A26]/20",
    },
    {
      id: 3,
      icon: <Smartphone size={24} />,
      title: "Show Your Screen",
      desc: "Display this app screen so they can verify your Order ID.",
      color: "text-[#00a572]",
      bgColor: "bg-[#00a572]/10",
      borderColor: "border-[#00a572]/30",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf9f4] relative overflow-hidden pt-32 pb-20 px-6 font-[family:var(--font-jakarta)] text-[#2D2A26]">
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#F28F3B]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00a572]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col h-full">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-8 px-5 py-2.5 bg-white/60 backdrop-blur-md border border-white/60 shadow-sm rounded-full text-xs font-black text-gray-500 hover:text-[#F28F3B] transition-all duration-300 w-fit group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          BACK TO ORDER
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Pickup <span className="text-[#F28F3B]">Guide</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00a572]/10 border border-[#00a572]/20 rounded-full text-[#00a572] text-xs font-bold uppercase tracking-wider">
              <Clock size={14} /> Today, 19:00 - 20:00
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 border border-black/5 shadow-sm rounded-full text-gray-500 text-xs font-bold uppercase tracking-wider">
              <MapPin size={14} /> Saverish Bakery
            </div>
          </div>
        </motion.div>

        <div className="relative mb-16 px-2">
          <div className="absolute left-[31px] md:left-[39px] top-8 bottom-8 w-1 bg-black/5 rounded-full" />

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            className="absolute left-[31px] md:left-[39px] top-8 w-1 bg-gradient-to-b from-[#F28F3B] via-[#2D2A26] to-[#00a572] rounded-full origin-top"
          />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.3 }}
                className="flex gap-6 md:gap-8 relative z-10 items-start group"
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-4 ${step.borderColor} flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110`}
                >
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${step.bgColor} flex items-center justify-center ${step.color}`}
                  >
                    {step.icon}
                  </div>
                </div>

                <div className="flex-1 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.03)] rounded-[32px] p-6 md:p-8 transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group-hover:-translate-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">
                    Step 0{step.id}
                  </span>
                  <h3 className="text-lg md:text-xl font-black text-[#2D2A26] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-auto"
        >
          <button
            onClick={() => setIsCollected(!isCollected)}
            className={`w-full py-6 rounded-[32px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-500 border-2 ${
              isCollected
                ? "bg-[#00a572]/10 border-[#00a572] text-[#00a572] shadow-[0_0_30px_rgba(0,165,114,0.2)]"
                : "bg-[#F28F3B] border-[#F28F3B] text-white hover:bg-[#e07b29] hover:border-[#e07b29] shadow-[0_15px_30px_rgba(242,143,59,0.3)]"
            }`}
          >
            {isCollected ? (
              <>
                <CheckCircle size={22} className="animate-bounce" />
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
