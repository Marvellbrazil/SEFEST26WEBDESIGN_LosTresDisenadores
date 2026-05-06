"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const img = (id: string, w = 600, h = 500) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const consumerSteps = [
  {
    num: "01",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    color: "bg-[#F28F3B]",
    title: "Browse & Discover",
    body: "Open the app and explore Surprise Bags from bakeries, restaurants, cafés, and grocery stores near you.",
    imgId: "photo-1512621776951-a57141f2eefd",
  },
  {
    num: "02",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    color: "bg-[#F28F3B]",
    title: "Reserve Your Bag",
    body: "Found something you love? Reserve and pay directly in the app. Each bag is packed with daily surplus food.",
    imgId: "photo-1607082348824-0a96f2a4b9da",
  },
  {
    num: "03",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    color: "bg-[#F28F3B]",
    title: "Pick Up & Enjoy",
    body: "Head over during the pickup window, show your receipt, and grab your delicious surprise bag.",
    imgId: "photo-1504674900247-0877df9cc836",
  },
];

const perks = [
  {
    title: "Extra Revenue Stream",
    body: "Turn surplus food into profit easily.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7",
  },
  {
    title: "New Customers",
    body: "Grow your loyal fanbase from FoodSaver.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857",
  },
  {
    title: "Sustainability Badge",
    body: "Show customers you care about the planet.",
    icon: "M3.055 11H5a2 2 0 012 2v1",
  },
  {
    title: "Real-Time Dashboard",
    body: "Track your impact and revenue in one place.",
    icon: "M9 19v-6a2 2 0 00-2-2",
  },
];

function StepItem({ step, idx }: { step: any; idx: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  const yText = useTransform(smoothProgress, [0, 1], [40, -40]);
  const yImage = useTransform(smoothProgress, [0, 1], [-20, 20]);

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-10 lg:gap-16 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      <motion.div style={{ y: yText }} className="flex-1 space-y-5">
        <div className="flex items-center gap-4">
          <div
            className={`${step.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#F28F3B]/20`}
          >
            {step.icon}
          </div>
          <span className="text-5xl font-black text-[#2D2A26]/5 select-none tracking-tighter">
            {step.num}
          </span>
        </div>
        <h3 className="text-3xl font-bold text-[#2D2A26]">{step.title}</h3>
        <p className="text-base text-[#2D2A26]/60 leading-relaxed max-w-sm">
          {step.body}
        </p>
      </motion.div>

      <motion.div style={{ y: yImage }} className="flex-1 w-full">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/5">
          <img
            src={img(step.imgId, 500, 380)}
            alt={step.title}
            className="w-full object-cover h-64 sm:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  const xBg = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div
      ref={mainRef}
      className="bg-[#FAF9F6] font-[family:var(--font-jakarta)] overflow-hidden"
    >
      <section className="relative py-24 border-b border-black/5">
        <motion.div
          style={{ x: xBg }}
          className="absolute top-10 left-0 whitespace-nowrap opacity-[0.02] select-none text-[150px] font-black text-[#2D2A26]"
        >
          SAVE FOOD • RESCUE MEALS •
        </motion.div>

        <div className="mx-auto max-w-5xl px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F28F3B] bg-[#F28F3B]/10 px-3 py-1 rounded-full">
              How It Works
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-[#2D2A26] tracking-tight">
              Fighting food waste
              <span className="text-[#F28F3B]"> has never been easier</span>
            </h2>
          </div>

          <div className="space-y-32">
            {consumerSteps.map((step, idx) => (
              <StepItem key={step.num} step={step} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-[2rem] overflow-hidden shadow-2xl"
              >
                <img
                  src={img("photo-1556909114-f6e7ad7d3136", 600, 500)}
                  alt="Business Partner"
                  className="w-full object-cover h-[450px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>

              <div className="absolute -bottom-4 -right-4 bg-[#FAF9F6] p-5 rounded-2xl shadow-xl border border-black/5 max-w-[200px]">
                <p className="text-[10px] font-bold text-[#F28F3B] uppercase tracking-wider mb-1">
                  Partner Insight
                </p>
                <p className="text-xs text-[#2D2A26]/80 font-medium italic">
                  "Rescued 4,000+ bags this year!"
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F28F3B]">
                  For Business
                </span>
                <h2 className="text-4xl font-bold text-[#2D2A26] mt-4 tracking-tight">
                  Turn waste into{" "}
                  <span className="text-[#F28F3B]">opportunity</span>
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {perks.map((p) => (
                  <div key={p.title} className="space-y-2">
                    <div className="w-8 h-8 bg-[#F28F3B]/10 rounded-lg flex items-center justify-center text-[#F28F3B]">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path d={p.icon} />
                      </svg>
                    </div>
                    <h4 className="font-bold text-[#2D2A26] text-sm">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#2D2A26]/50 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <button className="bg-[#F28F3B] text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg shadow-[#F28F3B]/20 hover:scale-105 transition-transform">
                  Start Free
                </button>
                <button className="border border-[#2D2A26]/10 text-[#2D2A26] font-bold px-6 py-3 rounded-full text-sm hover:bg-black/5 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
