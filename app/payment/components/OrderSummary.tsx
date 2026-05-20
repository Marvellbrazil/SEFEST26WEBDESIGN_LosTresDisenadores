import React from 'react';
import { ShoppingBag, Leaf, ArrowRight, Ticket } from 'lucide-react';

export function OrderSummary({ selectedMethod }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-2xl border border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.03)] rounded-[32px] p-6 md:p-8 flex flex-col gap-8">
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F28F3B]/10 flex items-center justify-center shrink-0">
            <ShoppingBag className="text-[#F28F3B]" size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black uppercase">Artisan Surplus Sack</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Saverish Bakery • 1 Bag</p>
          </div>
          <span className="font-bold text-sm">$4.20</span>
        </div>
      </div>

      <div className="relative group">
        <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F28F3B] transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="PROMO CODE" 
          className="w-full pl-12 pr-4 py-4 bg-[#2D2A26]/5 border border-transparent focus:border-[#F28F3B]/30 rounded-2xl text-[10px] font-black tracking-[0.2em] outline-none transition-all"
        />
      </div>

      <div className="space-y-3 pt-4 border-t border-black/5">
        <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          <span>Subtotal</span>
          <span className="text-[#2D2A26]">$11.00</span>
        </div>
        <div className="flex justify-between items-center text-[11px] font-bold text-[#00a572] uppercase tracking-widest">
          <span className="flex items-center gap-2"><Leaf size={14} /> Eco Savings</span>
          <span>-$15.00</span>
        </div>
        <div className="flex justify-between pt-4">
          <span className="text-xs font-black uppercase tracking-widest">Total Payment</span>
          <span className="text-3xl font-black text-[#F28F3B] tracking-tighter">$11.00</span>
        </div>
      </div>

      <button className="w-full py-5 rounded-2xl bg-[#F28F3B] text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#2D2A26] transition-all duration-500 group shadow-lg shadow-[#F28F3B]/20 hover:shadow-[#2D2A26]/20">
        Confirm & Pay Now
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}