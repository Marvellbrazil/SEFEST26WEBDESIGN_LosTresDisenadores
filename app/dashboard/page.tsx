"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Leaf,
  Wallet,
  History,
  Bell,
  Search,
  ChevronRight,
  LogOut,
  User,
  Settings,
  MapPin,
  Star,
  Zap,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import { Bread, BowlFood, FishSimple } from "@phosphor-icons/react";
import Link from "next/link";

const StatCard = ({ icon: Icon, label, value, unit, trend, color }: any) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 25px 40px -15px rgba(0,0,0,0.05)" }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="bg-white/70 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white flex flex-col gap-4 relative overflow-hidden group shadow-[0_15px_30px_rgba(0,0,0,0.02)]"
  >
    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[#2D2A26] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
      <Icon size={80} />
    </div>
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner border border-white/20"
      style={{ backgroundColor: `${color}15`, color: color }}
    >
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <div className="relative z-10">
      <p className="text-[#2D2A26]/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-1.5">
        <h3 className="text-3xl font-black text-[#2D2A26] tracking-tighter">
          {value}
        </h3>
        <span className="text-[9px] font-bold text-[#2D2A26]/40 uppercase">
          {unit}
        </span>
      </div>
      {trend && (
        <div className="flex items-center gap-0.5 mt-2 text-[9px] font-black uppercase text-emerald-600">
          <ArrowUpRight size={12} strokeWidth={2.5} /> {trend} this week
        </div>
      )}
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Week");

  const impactDataSets: Record<string, { label: string; val: number }[]> = {
    Day: [
      { label: "8 AM", val: 20 },
      { label: "10 AM", val: 45 },
      { label: "12 PM", val: 80 },
      { label: "2 PM", val: 50 },
      { label: "4 PM", val: 95 },
      { label: "6 PM", val: 65 },
      { label: "8 PM", val: 35 },
    ],
    Week: [
      { label: "Mon", val: 40 },
      { label: "Tue", val: 70 },
      { label: "Wed", val: 45 },
      { label: "Thu", val: 95 },
      { label: "Fri", val: 65 },
      { label: "Sat", val: 80 },
      { label: "Sun", val: 55 },
    ],
    Month: [
      { label: "Week 1", val: 60 },
      { label: "Week 2", val: 85 },
      { label: "Week 3", val: 40 },
      { label: "Week 4", val: 90 },
    ],
  };

  const nearbyDeals = [
    {
      name: "Green Bakery",
      dist: "0.4 km",
      price: "$3.50",
      stock: 3,
      icon: Bread,
      color: "#F28F3B",
    },
    {
      name: "Urban Fresh",
      dist: "1.2 km",
      price: "$5.20",
      stock: 5,
      icon: BowlFood,
      color: "#10B981",
    },
    { 
      name: "Sushi Hub", 
      dist: "0.8 km", 
      price: "$7.00", 
      stock: 2, 
      icon: FishSimple,
      color: "#FF6B35",
    },
  ];

  const stickerSpringTransition = {
    type: "spring" as const,
    stiffness: 150,
    damping: 12,
    mass: 0.8
  };

  return (
    <div className="min-h-screen bg-[#F4F3EE] font-[family:var(--font-jakarta)] text-[#2D2A26] selection:bg-[#F28F3B] selection:text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F28F3B]/5 blur-[120px] pointer-events-none z-0" />

      <main className="max-w-7xl mx-auto p-6 md:p-10 lg:p-12 relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 border-b border-[#2D2A26]/5 pb-8">
          <div className="flex flex-col items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.4, rotate: -15, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2, y: 0 }}
              viewport={{ once: true }}
              transition={stickerSpringTransition}
              className="bg-[#2D2A26] text-white text-[9px] sm:text-xs font-black uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-lg shadow-lg mb-3"
            >
              Control Center
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.85]">
              Welcome back, <br />
              <span className="bg-gradient-to-r from-[#F28F3B] to-[#FF6B35] text-white px-4 py-0.5 rounded-[12px] shadow-[0_12px_24px_rgba(242,143,59,0.25)] border-2 border-white transform rotate-1 inline-block mt-2">
                Rescuer
              </span>
            </h2>
            <p className="text-[#2D2A26]/50 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-4">
              You saved <span className="text-[#2D2A26] font-black">1.2kg</span> of food today. Keep it up!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-xl p-2 rounded-[2rem] shadow-sm border border-white/60 w-full sm:w-auto">
            <div className="relative group hidden sm:block text-none shrink-0">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D2A26]/30 group-focus-within:text-[#F28F3B] transition-colors"
                size={14}
              />
              <input
                type="text"
                placeholder="Search surplus..."
                className="bg-transparent py-3 pl-10 pr-4 outline-none w-44 text-[10px] font-black uppercase tracking-widest text-[#2D2A26] placeholder-[#2D2A26]/30"
              />
            </div>
            <button className="p-3 bg-[#F4F3EE] rounded-2xl text-[#2D2A26]/60 hover:text-[#F28F3B] transition-colors relative flex-none outline-none border border-black/5">
              <Bell size={16} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-[#F28F3B] rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-[#2D2A26]/10 mx-1 flex-none" />
            
            <div className="relative flex-none">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`relative z-50 w-12 h-12 rounded-2xl bg-[#F4F3EE] flex items-center justify-center overflow-hidden border-2 transition-all duration-300 shadow-sm outline-none shrink-0 ${
                  isProfileOpen ? "border-[#F28F3B] ring-4 ring-[#F28F3B]/10 scale-95" : "border-transparent hover:border-[#F28F3B]/30"
                }`}
              >
                <img
                  src="https://api.dicebear.com/9.x/adventurer/svg?seed=Kimberly"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] border border-[#2D2A26]/5 p-2 z-50 overflow-hidden flex flex-col gap-1"
                    >
                      <div className="px-4 py-3 border-b border-[#2D2A26]/5 mb-1">
                        <p className="text-xs font-black text-[#2D2A26] truncate uppercase tracking-tight">Kimberly Rescuer</p>
                        <p className="text-[9px] font-bold text-[#2D2A26]/40 truncate mt-0.5">ID: #RESC-9901</p>
                      </div>
                      <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider text-[#2D2A26]/70 hover:text-[#2D2A26] hover:bg-[#F4F3EE] transition-all text-left">
                        <User size={14} /> My Profile
                      </button>
                      <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider text-[#2D2A26]/70 hover:text-[#2D2A26] hover:bg-[#F4F3EE] transition-all text-left">
                        <Settings size={14} /> Settings
                      </button>
                      <div className="h-px bg-[#2D2A26]/5 my-1" />
                      <Link
                        href="/"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider text-rose-500 hover:bg-rose-50 transition-all text-left"
                      >
                        <LogOut size={14} strokeWidth={2.5} /> Sign Out
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={Utensils} label="Total Rescues" value="42" unit="Meals" trend="+12%" color="#F28F3B" />
          <StatCard icon={Leaf} label="CO2 Offset" value="34.8" unit="Kilograms" trend="+5.4kg" color="#10B981" />
          <StatCard icon={Wallet} label="Money Saved" value="285" unit="USD" trend="+$42" color="#F28F3B" />
          <StatCard icon={Zap} label="Eco-Points" value="1,240" unit="PTS" color="#2D2A26" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] border border-white shadow-[0_15px_30px_rgba(0,0,0,0.02)] relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                  <h3 className="font-black uppercase tracking-widest text-xs mb-0.5 text-[#2D2A26]">
                    Impact Analytics
                  </h3>
                  <p className="text-[9px] text-[#2D2A26]/40 font-bold uppercase tracking-widest">
                    Sustainability Performance Index
                  </p>
                </div>
                <div className="flex bg-[#2D2A26]/5 p-1 rounded-xl border border-black/5">
                  {["Day", "Week", "Month"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                        activeTab === t 
                          ? "bg-[#2D2A26] shadow-sm text-white" 
                          : "text-[#2D2A26]/40 hover:text-[#2D2A26]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-80 w-full flex items-end justify-between gap-2 px-2 sm:px-4 pb-2 bg-gradient-to-t from-[#F28F3B]/5 to-transparent rounded-[2rem] border border-[#2D2A26]/5">
                <AnimatePresence mode="popLayout">
                  {impactDataSets[activeTab].map((item, i) => (
                    <motion.div 
                      key={`${activeTab}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center justify-end h-full gap-3 w-full group relative"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${item.val}%` }}
                        transition={{ delay: i * 0.04, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-[44px] bg-[#F28F3B] rounded-t-xl opacity-85 group-hover:opacity-100 group-hover:scale-x-105 transition-all relative shadow-sm"
                        style={{ background: item.val > 75 ? "linear-gradient(180deg, #FF6B35 0%, #F28F3B 100%)" : "#F28F3B" }}
                      >
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#2D2A26] text-white text-[8px] font-black px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap border border-white/10">
                          {item.val}%
                        </div>
                      </motion.div>
                      <span className="text-[8px] sm:text-[9px] font-black text-[#2D2A26]/30 uppercase tracking-wider whitespace-nowrap scale-90 sm:scale-100">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {nearbyDeals.map((deal, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.05)" }}
                  className="bg-white/70 backdrop-blur-xl p-5 sm:p-6 rounded-[2.5rem] border border-white shadow-[0_15px_30px_rgba(0,0,0,0.02)] flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-white/40"
                      style={{ backgroundColor: `${deal.color}15`, color: deal.color }}
                    >
                      <deal.icon size={24} weight="duotone" />
                    </div>
                    <span className="bg-[#F28F3B]/10 text-[#F28F3B] text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-inner">
                      {deal.stock} left
                    </span>
                  </div>
                  <div className="mt-1">
                    <h4 className="font-black text-sm text-[#2D2A26] tracking-tight uppercase truncate">{deal.name}</h4>
                    <div className="flex items-center gap-1 text-[#2D2A26]/40 text-[9px] font-bold uppercase tracking-widest mt-1">
                      <MapPin size={10} strokeWidth={2.5} /> {deal.dist} away
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-4 border-t border-[#2D2A26]/5">
                    <span className="font-black text-lg text-[#F28F3B] tracking-tighter">
                      {deal.price}
                    </span>
                    <button className="bg-[#2D2A26] text-white p-2.5 rounded-xl hover:bg-[#F28F3B] transition-colors duration-300 shadow-sm outline-none">
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#2D2A26] p-6 sm:p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border border-[#2D2A26]">
              <div className="absolute -right-8 -bottom-8 bg-[#F28F3B] w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <h3 className="font-black uppercase tracking-[0.2em] text-[9px] mb-4 text-[#F28F3B]">
                Monthly Goal
              </h3>
              <div className="flex justify-between items-end mb-3">
                <span className="text-4xl font-black tracking-tighter leading-none">
                  75%
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-50 bg-white/10 px-2 py-0.5 rounded-md">
                  15/20 Rescues
                </span>
              </div>
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden mb-5 border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-[#F28F3B] to-[#FF6B35]"
                />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 leading-relaxed">
                You are 5 rescues away from unlocking the{" "}
                <span className="text-white font-black underline decoration-[#F28F3B] decoration-2">Earth Guardian</span> badge!
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] border border-white shadow-[0_15px_30px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black uppercase tracking-widest text-[10px] text-[#2D2A26]">
                  Recent Activity
                </h3>
                <History size={14} className="text-[#2D2A26]/30" />
              </div>
              <div className="space-y-5">
                {[1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-[#F4F3EE] border border-black/5 rounded-2xl flex items-center justify-center text-[#F28F3B] group-hover:bg-[#F28F3B] group-hover:text-white group-hover:border-[#F28F3B] transition-all duration-300 shadow-sm shrink-0">
                      <ShoppingBag size={16} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-black text-xs group-hover:text-[#F28F3B] transition-colors tracking-tight uppercase truncate">
                        Surplus Box #{4021 + i}
                      </h4>
                      <p className="text-[9px] text-[#2D2A26]/30 font-black uppercase mt-0.5 tracking-wider">
                        Completed • {i === 0 ? "2h ago" : `${i + 1}h ago`}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-500/10">
                        +120 XP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 py-3.5 bg-[#2D2A26]/5 hover:bg-[#2D2A26] border border-black/5 text-[#2D2A26]/60 hover:text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] transition-all duration-300 flex items-center justify-center gap-1.5 group outline-none">
                Full History
                <ChevronRight
                  size={12}
                  strokeWidth={2.5}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}