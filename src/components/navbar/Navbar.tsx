"use client";

import { motion, AnimatePresence, useSpring, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import {
  RiSearchLine,
  RiCloseLine,
  RiMapPinLine,
  RiMenuLine,
  RiShoppingBag3Line,
  RiLeafLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { useNavbar } from "../../hooks/useNavbar";
import Link from "next/link";
import Image from "next/image";
import { CiLogin } from "react-icons/ci";

const localNavLinks = [
  { label: "Home", href: "#hero" },
  { label: "Problem", href: "#problem" },
  { label: "Guide", href: "#guide" },
  { label: "Business", href: "#partner" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "FAQ", href: "#faq-section" },
];

export default function Navbar() {
  const {
    isScrolled,
    isMobileOpen,
    setIsMobileOpen,
    isSearchOpen,
    setIsSearchOpen,
    // activeDropdown,
    // handleDropdownEnter,
    // handleDropdownLeave,
    selectedLocation,
    setSelectedLocation,
    searchQuery,
    setSearchQuery,
    searchInputRef,
  } = useNavbar();

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let rafId: number;

    const check = () => {
      let bestId = "";
      let bestDist = Infinity;
      const navHeight = 80;

      for (const link of localNavLinks) {
        const id = link.href.replace("#", "");
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom > navHeight && rect.top < window.innerHeight) {
          const dist = Math.abs(rect.top - navHeight);
          if (dist < bestDist) {
            bestDist = dist;
            bestId = id;
          }
        }
      }

      if (bestId) setActiveSection(bestId);
      rafId = requestAnimationFrame(check);
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(`#${targetId}`);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#F28F3B] origin-left z-300"
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-1/2 -translate-x-1/2 w-full z-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center ${
          isScrolled
            ? "top-4 max-w-6xl px-4"
            : "top-0 max-w-full px-6 md:px-10 py-6 md:py-8"
        }`}
      >
        <div
          className={`w-full grid grid-cols-2 xl:grid-cols-3 items-center transition-all duration-700 ${
            isScrolled
              ? "bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-full px-6 py-3"
              : "bg-white/40 backdrop-blur-md border-b border-[#2D2A26]/5 px-4 py-3 rounded-[24px] md:rounded-none md:bg-transparent md:backdrop-blur-none md:border-none"
          }`}
        >
          <div className="flex justify-start">
            <a
              href="#hero"
              onClick={(e) => handleScrollTo(e, "#hero")}
              className="flex items-center gap-3 group shrink-0"
            >
              <motion.div
                whileHover={{ rotate: -10, scale: 1.05 }}
                className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center font-black text-white bg-[#F28F3B] shadow-lg shadow-[#F28F3B]/30 shrink-0"
              >
                <Image
                  src="https://images.unsplash.com/vector-1778639108685-395007c80714?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D"
                  alt="Saverish Custom Logo"
                  fill
                  sizes="(max-width: 768px) 40px, 48px"
                  priority={true}
                  className="object-cover object-center"
                />
              </motion.div>
              <span className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#2D2A26]">
                Saverish<span className="text-[#F28F3B]">.</span>
              </span>
            </a>
          </div>

          <div className="hidden xl:flex justify-center">
            <div className="flex items-center gap-1">
              {localNavLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`relative overflow-hidden flex items-center gap-1 px-4 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-[#2D2A26]/70 hover:text-[#2D2A26] hover:bg-[#2D2A26]/5"
                    }`}
                  >
                    <motion.div
                      className="absolute inset-0 highlight rotate-4"
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className={`relative z-10 ${
                      isActive ? "rotate-4" : ""
                    }`}>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-3 rounded-full text-[#2D2A26] hover:bg-[#2D2A26]/5 transition-all"
              >
                <RiSearchLine size={20} />
              </button>

              <button className="relative p-3 rounded-full text-[#2D2A26] hover:bg-[#2D2A26]/5 transition-all">
                <RiShoppingBag3Line size={20} />
                <span className="absolute top-1 right-1 w-5 h-5 bg-[#F28F3B] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
                  3
                </span>
              </button>
            </div>

            <Link href="/login">
              <button className="hidden md:flex items-center gap-2 px-3 py-3.5 rounded-full text-[10px] uppercase tracking-widest font-black transition-all bg-[#2D2A26] text-white hover:bg-[#F28F3B] hover:shadow-[0_10px_20px_rgba(242,143,59,0.3)] shadow-xl shadow-black/5">
                <CiLogin size={16} />
                <span className={isScrolled ? "hidden" : ""}>Sign In</span>
              </button>
            </Link>

            <button
              onClick={() => setIsMobileOpen(true)}
              className="xl:hidden p-3 rounded-full text-[#2D2A26] bg-[#2D2A26]/5"
            >
              <RiMenuLine size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col justify-center items-center px-4 bg-[#F4F3EE]/95 backdrop-blur-2xl"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-4 bg-white rounded-full text-[#2D2A26] hover:text-[#F28F3B] transition-colors shadow-lg border border-white/50"
            >
              <RiCloseLine size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="w-full max-w-5xl"
            >
              <div className="flex items-center gap-6 border-b-4 border-[#2D2A26] pb-8">
                <RiSearchLine className="text-[#F28F3B] size-10 md:size-16 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH FOR MEALS..."
                  className="flex-1 text-4xl md:text-7xl lg:text-[100px] font-black text-[#2D2A26] placeholder-[#2D2A26]/20 uppercase tracking-tighter outline-none bg-transparent w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] xl:hidden bg-[#F4F3EE]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#2D2A26_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.1]" />
            <div className="relative z-10 h-full flex flex-col p-6">
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#F28F3B] rounded-2xl flex items-center justify-center text-white">
                    <RiLeafLine size={24} />
                  </div>
                  <span className="text-2xl font-black uppercase tracking-tighter text-[#2D2A26]">
                    Saverish.
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-4 rounded-full bg-white text-[#2D2A26] shadow-lg"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-6">
                {localNavLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`text-[40px] font-black uppercase tracking-tighter transition-colors flex items-center justify-between group ${
                        activeSection === link.href.replace("#", "")
                          ? "text-[#F28F3B]"
                          : "text-[#2D2A26] hover:text-[#F28F3B]"
                      }`}
                    >
                      {link.label}
                      <RiArrowRightLine className="text-[#F28F3B]" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}