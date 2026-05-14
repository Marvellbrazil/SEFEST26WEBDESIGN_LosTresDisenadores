"use client";

import { useState } from "react";
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
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)" }}
    className="bg-white p-6 rounded-[2.5rem] border border-[#2D2A26]/5 flex flex-col gap-4 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
      <Icon size={80} />
    </div>
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
      style={{ backgroundColor: `${color}15`, color: color }}
    >
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[#2D2A26]/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-black text-[#2D2A26] tracking-tighter">
          {value}
        </h3>
        <span className="text-[10px] font-bold text-[#2D2A26]/40 uppercase">
          {unit}
        </span>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-2 text-[9px] font-black uppercase text-green-600">
          <ArrowUpRight size={12} /> {trend} this week
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
      color: "#52B788",
    },
    { 
      name: "Sushi Hub", 
      dist: "0.8 km", 
      price: "$7.00", 
      stock: 2, 
      icon: FishSimple,
      color: "#E07A5F",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F3EE] font-[family:var(--font-jakarta)] text-[#2D2A26] selection:bg-[#F28F3B] selection:text-white">
      <main className="max-w-7xl mx-auto p-6 md:p-10 lg:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="space-y-1">
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
              Welcome back, <span className="text-[#F28F3B]">Rescuer</span>
            </h2>
            <p className="text-[#2D2A26]/40 text-xs font-bold uppercase tracking-widest">
              You saved <span className="text-[#2D2A26]">1.2kg</span> of food
              today. Keep it up!
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-[2rem] shadow-sm border border-[#2D2A26]/5">
            <div className="relative group hidden sm:block text-none shrink-0">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D2A26]/30 group-focus-within:text-[#F28F3B] transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search surplus..."
                className="bg-transparent py-3 pl-11 pr-6 outline-none w-48 text-[10px] font-black uppercase tracking-widest"
              />
            </div>
            <button className="p-3 bg-[#F4F3EE] rounded-2xl text-[#2D2A26]/60 hover:text-[#F28F3B] transition-colors relative flex-none">
              <Bell size={18} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-[#F28F3B] rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-px bg-[#2D2A26]/5 mx-2 flex-none" />
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
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#2D2A26]/5 p-2 z-50 overflow-hidden"
                    >
                      <Link
                          href="/"
                          title="Back"
                          aria-label="Back"
                          className="group flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-red-50 text-[#2D2A26]/40 hover:text-red-500 transition-all duration-300 shadow-sm hover:shadow-md ml-0 shrink-0"
                        >
                          <LogOut 
                            size={20} 
                            strokeWidth={2.5} 
                            className="group-hover:-translate-x-0.5 transition-transform" 
                          />
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
          <StatCard icon={Leaf} label="CO2 Offset" value="34.8" unit="Kilograms" trend="+5.4kg" color="#2D2A26" />
          <StatCard icon={Wallet} label="Money Saved" value="285" unit="USD" trend="+$42" color="#F28F3B" />
          <StatCard icon={Zap} label="Eco-Points" value="1,240" unit="PTS" color="#2D2A26" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[3rem] border border-[#2D2A26]/5 shadow-sm relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                <div>
                  <h3 className="font-black uppercase tracking-widest text-xs mb-1">
                    Impact Analytics
                  </h3>
                  <p className="text-[10px] text-[#2D2A26]/40 font-bold uppercase tracking-widest">
                    Sustainability Performance Index
                  </p>
                </div>
                <div className="flex bg-[#F4F3EE] p-1 rounded-xl">
                  {["Day", "Week", "Month"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                        activeTab === t 
                        ? "bg-white shadow-sm text-[#F28F3B]" 
                        : "text-[#2D2A26]/30 hover:text-[#2D2A26]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-80 w-full flex items-end justify-between gap-2 px-2 pb-2 bg-gradient-to-t from-[#F28F3B]/5 to-transparent rounded-[2rem]">
                <AnimatePresence mode="popLayout">
                  {impactDataSets[activeTab].map((item, i) => (
                    <motion.div 
                      key={`${activeTab}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-end h-full gap-4 w-full group mt-4"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${item.val}%` }}
                        transition={{ delay: i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-[50px] bg-[#F28F3B] rounded-t-2xl opacity-80 group-hover:opacity-100 group-hover:scale-x-105 transition-all relative"
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2D2A26] text-white text-[8px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-xl">
                          {item.val}%
                        </div>
                      </motion.div>
                      <span className="text-[9px] font-black text-[#2D2A26]/20 uppercase tracking-widest whitespace-nowrap">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nearbyDeals.map((deal, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-[#2D2A26]/5 shadow-sm flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: `${deal.color}15`, color: deal.color }}
                    >
                      <deal.icon size={26} weight="duotone" />
                    </div>
                    <span className="bg-[#F28F3B]/10 text-[#F28F3B] text-[8px] font-black px-2 py-1 rounded-full uppercase">
                      {deal.stock} left
                    </span>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-black text-sm">{deal.name}</h4>
                    <div className="flex items-center gap-1 text-[#2D2A26]/40 text-[9px] font-bold uppercase tracking-widest mt-1">
                      <MapPin size={10} /> {deal.dist} away
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-4 border-t border-[#2D2A26]/5">
                    <span className="font-black text-[#F28F3B]">
                      {deal.price}
                    </span>
                    <button className="bg-[#2D2A26] text-white p-2 rounded-xl hover:bg-[#F28F3B] transition-colors">
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-[#2D2A26] p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 bg-[#F28F3B] w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <h3 className="font-black uppercase tracking-[0.2em] text-[10px] mb-6 text-[#F28F3B]">
                Monthly Goal
              </h3>
              <div className="flex justify-between items-end mb-4">
                <span className="text-4xl font-black tracking-tighter">
                  75%
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                  15/20 Rescues
                </span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-[#F28F3B]"
                />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 leading-relaxed">
                You are 5 rescues away from unlocking the{" "}
                <span className="text-white font-black">Earth Guardian</span>{" "}
                badge!
              </p>
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-[#2D2A26]/5 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black uppercase tracking-widest text-[10px]">
                  Recent Activity
                </h3>
                <History size={16} className="text-[#2D2A26]/20" />
              </div>
              <div className="space-y-6">
                {[1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-11 h-11 bg-[#F4F3EE] rounded-2xl flex items-center justify-center text-[#F28F3B] group-hover:bg-[#F28F3B] group-hover:text-white transition-all shadow-sm">
                      <ShoppingBag size={18} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-black text-xs group-hover:text-[#F28F3B] transition-colors tracking-tight">
                        Surplus Box #{4021 + i}
                      </h4>
                      <p className="text-[9px] text-[#2D2A26]/30 font-black uppercase mt-0.5 tracking-tighter">
                        Completed • {i === 0 ? "2h ago" : `${i + 1}h ago`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-[10px] text-green-600">
                        +120 XP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 bg-[#F4F3EE] rounded-[1.5rem] text-[#2D2A26]/60 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#2D2A26] hover:text-white transition-all flex items-center justify-center gap-2 group">
                Full History{" "}
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}