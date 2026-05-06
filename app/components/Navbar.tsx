'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import { 
  RiSearchLine, 
  RiCloseLine, 
  RiMapPinLine, 
  RiArrowDownSLine, 
  RiMenuLine,
  RiShoppingBag3Line,
  RiUser3Line,
  RiHeartLine,
  RiLeafLine,
  RiArrowRightLine
} from 'react-icons/ri';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
  icon: string;
  desc: string;
}

interface NavLink {
  label: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
}

interface Location {
  name: string;
  code: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/', hasDropdown: false },
  { 
    label: 'Explore', 
    href: '/explore',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Browse Bags', href: '/browse', icon: '🛍️', desc: 'Find surplus food near you' },
      { label: 'Categories', href: '/categories', icon: '🍕', desc: 'Browse by food type' },
      { label: 'Top Rated', href: '/top-rated', icon: '⭐', desc: 'Best reviewed stores' },
      { label: 'New Arrivals', href: '/new', icon: '🆕', desc: 'Recently added stores' },
    ]
  },
  { label: 'Impact', href: '/impact', hasDropdown: false },
  { label: 'Partnership', href: '/partnership', hasDropdown: false },
  { label: 'About', href: '/about', hasDropdown: false },
];

const locations: Location[] = [
  { name: 'Surabaya', code: 'SBY' },
  { name: 'Jakarta', code: 'JKT' },
  { name: 'Bandung', code: 'BDG' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 50));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F28F3B] via-[#FF6B35] to-[#F28F3B] origin-left z-[200]"
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled 
            ? "bg-white/70 backdrop-blur-xl border-b border-black/5 py-2" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Saverish Home">
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.05 }}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white transition-all duration-500 bg-[#F28F3B] shadow-lg shadow-[#F28F3B]/20`}
                >
                  <RiLeafLine className="size-6" />
                </motion.div>
                <span className={`text-2xl font-black tracking-tight transition-colors duration-500 ${
                  isScrolled ? 'text-slate-900' : 'text-white'
                }`}>
                  Saverish<span className="text-[#F28F3B]">.</span>
                </span>
              </Link>
              
              <div className="hidden lg:flex items-center gap-2">
                {navLinks.map((link) => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.hasDropdown && handleDropdownEnter(link.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link 
                      href={link.href} 
                      className={`relative flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                        isScrolled 
                          ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" 
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown size={14} className={`transition-transform duration-300 ${
                          activeDropdown === link.label ? 'rotate-180' : ''
                        }`} />
                      )}
                    </Link>

                    <AnimatePresence>
                      {link.hasDropdown && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          className="absolute top-full left-0 mt-3 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-black/5 overflow-hidden p-2.5"
                        >
                          <div className="grid grid-cols-1 gap-1">
                            {link.dropdownItems?.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F28F3B]/5 transition-all group"
                              >
                                <span className="text-2xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:bg-white transition-colors">{item.icon}</span>
                                <div className="flex-1">
                                  <p className="text-sm font-black text-slate-800 group-hover:text-[#F28F3B] transition-colors">
                                    {item.label}
                                  </p>
                                  <p className="text-[11px] font-medium text-slate-400 leading-tight">{item.desc}</p>
                                </div>
                                <RiArrowRightLine className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#F28F3B]" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center bg-black/5 hover:bg-black/10 transition-colors rounded-2xl px-3 py-1.5 cursor-pointer group relative">
                <RiMapPinLine className={`size-4 text-[#F28F3B]`} />
                <span className={`text-xs font-black ml-2 ${isScrolled ? 'text-slate-700' : 'text-white'}`}>
                  {selectedLocation.name}
                </span>
                <div className="absolute top-full right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-black/5 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[140px] z-[110]">
                  {locations.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => setSelectedLocation(loc)}
                      className={`w-full text-left px-4 py-2 text-[13px] font-bold hover:bg-[#F28F3B]/10 transition-colors ${
                        selectedLocation.code === loc.code ? 'text-[#F28F3B]' : 'text-slate-600'
                      }`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search food (Cmd+K)"
                  className={`p-2.5 rounded-xl transition-all ${
                    isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <RiSearchLine size={20} />
                </button>

                <button aria-label="View Wishlist" className={`hidden sm:flex p-2.5 rounded-xl transition-all ${
                  isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}>
                  <RiHeartLine size={20} />
                </button>

                <button aria-label="Shopping Cart" className={`relative p-2.5 rounded-xl transition-all ${
                  isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}>
                  <RiShoppingBag3Line size={20} />
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#F28F3B] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white/10">3</span>
                </button>
              </div>

              <button className={`hidden sm:flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs font-black transition-all ${
                isScrolled 
                  ? "bg-[#F28F3B] text-white hover:shadow-lg hover:shadow-[#F28F3B]/30" 
                  : "bg-[#F28F3B] backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-slate-900"
              }`}>
                <RiUser3Line size={16} />
                <span>SIGN IN</span>
              </button>

              <button
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open Menu"
                className={`lg:hidden p-2.5 rounded-xl transition-all ${
                  isScrolled ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'
                }`}
              >
                <RiMenuLine size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-black/5 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 bg-slate-50 rounded-2xl px-5 py-4 border border-black/5 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F28F3B] transition-all">
                  <RiSearchLine className="text-[#F28F3B] size-6 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stores or food type..."
                    className="flex-1 text-lg font-bold text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                  />
                  <div className="flex gap-1 items-center bg-slate-200 px-2 py-1 rounded-lg">
                    <span className="text-[10px] font-black text-slate-500">ESC</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Popular Searches</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Bakery', 'Vegan', 'Pizza', 'Surplus Bags', 'Near Me'].map(tag => (
                      <button key={tag} className="px-4 py-2 bg-slate-100 hover:bg-[#F28F3B] hover:text-white rounded-xl text-xs font-bold text-slate-600 transition-all">{tag}</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[250] lg:hidden">
            <motion.div onClick={() => setIsMobileOpen(false)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-lg" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#F28F3B] rounded-2xl flex items-center justify-center text-white"><RiLeafLine size={20} /></div>
                  <span className="text-xl font-black text-slate-900">Saverish.</span>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-xl bg-slate-100"><RiCloseLine size={24} /></button>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center justify-between p-4 rounded-2xl text-lg font-black ${link.label === 'Home' ? 'bg-[#F28F3B] text-white' : 'text-slate-800 hover:bg-slate-50'}`}
                    >
                      {link.label}
                      <RiArrowRightLine size={20} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <div className="flex flex-col gap-3">
                  <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-100 font-black text-slate-800"><RiHeartLine /> Wishlist</button>
                  <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#F28F3B] text-white font-black shadow-lg shadow-[#F28F3B]/30"><RiUser3Line /> Sign In</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}