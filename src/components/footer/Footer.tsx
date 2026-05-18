'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { 
  RiArrowRightUpLine, 
  RiMailLine, 
  RiMapPinLine, 
  RiPhoneLine,
  RiLeafLine,
  RiArrowUpLine,
  RiHeartFill
} from 'react-icons/ri';
import { useFooter } from '../../hooks/useFooter';
import { footerLinks, socials } from '../../constants/footer';

export default function Footer() {
  const { footerRef, isVisible, email, setEmail, isSubscribed, handleSubscribe, scrollToTop } = useFooter();
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMegaHovered, setIsMegaHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const footerY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]),
    { stiffness: 80, damping: 22 }
  );

  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(100);
  
  const smoothOptions = { stiffness: 40, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, smoothOptions);
  const smoothY = useSpring(mouseY, smoothOptions);
  
  const maskRadius = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isMegaHovered) {
      maskRadius.set(250); 
    } else {
      maskRadius.set(0);
    }
  }, [isMegaHovered, maskRadius]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 200;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <footer 
      ref={footerRef} 
      className="relative w-full bg-[#1a1a1a] overflow-hidden flex flex-col justify-between z-0"
      style={{ boxShadow: "inset 0 20px 40px rgba(0,0,0,0.5)" }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#F28F3B]/5 rounded-full blur-[150px] translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#F28F3B]/3 rounded-full blur-[120px] -translate-x-1/2" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <motion.div 
        style={{ y: footerY }}
        className="relative z-10 w-full pt-16 sm:pt-20 md:pt-24 flex flex-col h-full bg-[#1a1a1a]"
      >
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#F28F3B]/40 to-transparent absolute top-0 w-full"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 mb-12 sm:mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sm:col-span-2 lg:col-span-4"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  className="w-12 h-12 bg-[#F28F3B] rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(242,143,59,0.2)]"
                >
                  <RiLeafLine className="text-white size-6" />
                </motion.div>
                <h3 className="text-3xl font-black text-white tracking-tight">
                  Saverish<span className="text-[#F28F3B]">.</span>
                </h3>
              </div>
              
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                Driving the transition towards a circular food economy. 
                Every rescued meal counts towards a sustainable future.
              </p>

              <form onSubmit={handleSubscribe} className="relative max-w-sm group">
                <div className="flex items-center gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-[#F28F3B]/50 focus-within:bg-white/[0.05] transition-all duration-300 backdrop-blur-md">
                  <RiMailLine className="text-white/30 size-5 ml-3 shrink-0 group-focus-within:text-[#F28F3B] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Join our newsletter"
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none py-2.5"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-[#F28F3B] to-[#FF6B35] text-white p-3 rounded-xl shadow-lg transition-colors shrink-0"
                  >
                    <RiArrowRightUpLine size={20} />
                  </motion.button>
                </div>
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-6 left-0 text-[#F28F3B] text-xs font-bold"
                  >
                    ✓ Subscribed successfully!
                  </motion.p>
                )}
              </form>
            </motion.div>

            {Object.entries(footerLinks).map(([category, links], catIdx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + catIdx * 0.1 }}
                className="sm:col-span-1 lg:col-span-2"
              >
                <h4 className="text-[11px] font-black text-[#F28F3B] uppercase tracking-[0.2em] mb-6">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/40 text-sm hover:text-white transition-colors duration-300 relative group inline-block font-medium"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#F28F3B] group-hover:w-full transition-all duration-300 ease-out" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 pb-4">
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#F28F3B] hover:text-white hover:border-[#F28F3B] transition-all duration-300 shadow-sm"
                  title={social.label}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a href="mailto:hello@saverish.com" className="flex items-center gap-2 text-white/40 hover:text-[#F28F3B] transition-colors text-xs sm:text-sm font-medium">
                <RiMailLine size={16} />
                <span>hello@saverish.com</span>
              </a>
              <span className="text-white/10 hidden sm:block">|</span>
              <span className="flex items-center gap-2 text-white/40 text-xs sm:text-sm font-medium">
                <RiMapPinLine size={16} />
                <span>Surabaya, Indonesia</span>
              </span>
              <span className="text-white/10 hidden sm:block">|</span>
              <span className="flex items-center gap-2 text-white/40 text-xs sm:text-sm font-medium">
                <RiPhoneLine size={16} />
                <span>+62 812 3289 1775</span>
              </span>
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Kembali ke atas"
              className="hidden md:flex w-12 h-12 rounded-full bg-[#F28F3B]/10 border border-[#F28F3B]/20 items-center justify-center text-[#F28F3B] hover:bg-[#F28F3B] hover:text-white transition-all duration-300 shadow-lg"
            >
              <RiArrowUpLine size={20} /> 
            </motion.button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden mt-auto flex flex-col items-center justify-end select-none">
          <div className="w-full max-w-7xl mx-auto px-4 flex justify-center items-center translate-y-[8%]">
            <svg 
              ref={svgRef}
              viewBox="0 0 1000 200" 
              className="w-full h-auto cursor-crosshair"
              onMouseEnter={() => setIsMegaHovered(true)}
              onMouseLeave={() => setIsMegaHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <defs>
                <radialGradient id="spotlight-grad">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>

                <mask id="spotlight-mask">
                  <rect width="100%" height="100%" fill="black" />
                  <motion.circle 
                    cx={smoothX} 
                    cy={smoothY} 
                    r={maskRadius} 
                    fill="url(#spotlight-grad)" 
                  />
                </mask>
              </defs>
              
              <text 
                x="50%" 
                y="75%" 
                textAnchor="middle" 
                className="text-[170px] font-black uppercase tracking-tighter fill-none stroke-white/10 stroke-[2px]"
              >
                SAVERISH
              </text>
              
              <text 
                x="50%" 
                y="75%" 
                textAnchor="middle" 
                className="text-[170px] font-black uppercase tracking-tighter fill-[#F28F3B]"
                mask="url(#spotlight-mask)"
              >
                SAVERISH
              </text>
            </svg>
          </div>
        </div>

        <div className="w-full bg-[#111111]/90 backdrop-blur-md border-t border-white/5 py-4 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs text-white/30 font-medium">
            <span>© 2026 Saverish. All rights reserved.</span>
            <div className="flex items-center gap-1.5">
              <span>Made with</span>
              <RiHeartFill className="text-[#F28F3B] size-3 animate-pulse" />
              <span>for a greener planet</span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}