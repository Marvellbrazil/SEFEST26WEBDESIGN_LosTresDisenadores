import React from 'react';
import { CreditCard, Wallet, QrCode, Landmark } from 'lucide-react';

export function PaymentMethods({ selected, onSelect }: any) {
  const methods = [
    { id: 'credit_card', name: 'Card', icon: <CreditCard size={20} /> },
    { id: 'qris', name: 'QRIS', icon: <QrCode size={20} /> },
    { id: 'gopay', name: 'GoPay', icon: <Wallet size={20} /> },
    { id: 'va', name: 'Transfer', icon: <Landmark size={20} /> },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-sm rounded-[32px] p-6 md:p-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
              selected === m.id 
                ? 'border-[#F28F3B] bg-[#F28F3B]/5 text-[#F28F3B] shadow-inner' 
                : 'border-black/5 bg-white/40 hover:border-black/10'
            }`}
          >
            {m.icon}
            <span className="text-[10px] font-black uppercase tracking-widest">{m.name}</span>
          </button>
        ))}
      </div>

      {selected === 'credit_card' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="bg-[#2D2A26]/5 rounded-3xl p-6 border border-black/5">
            <div className="mb-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Cardholder Name</label>
              <input type="text" placeholder="SARAH CHEN" className="w-full bg-transparent border-b-2 border-black/10 py-2 font-bold focus:border-[#F28F3B] outline-none transition-colors uppercase" />
            </div>
            <div className="mb-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Card Number</label>
              <input type="text" placeholder="**** **** **** 4242" className="w-full bg-transparent border-b-2 border-black/10 py-2 font-bold focus:border-[#F28F3B] outline-none transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Expiry Date</label>
                <input type="text" placeholder="MM/YY" className="w-full bg-transparent border-b-2 border-black/10 py-2 font-bold focus:border-[#F28F3B] outline-none transition-colors" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">CVC</label>
                <input type="password" placeholder="***" className="w-full bg-transparent border-b-2 border-black/10 py-2 font-bold focus:border-[#F28F3B] outline-none transition-colors" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selected !== 'credit_card' && (
        <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-black/5 rounded-3xl bg-white/30 text-gray-400">
           <QrCode size={40} className="mb-4 opacity-20" />
           <p className="text-xs font-bold uppercase tracking-widest">A QR Code will be generated</p>
        </div>
      )}
    </div>
  );
}