'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  FaInstagram, 
  FaTwitter, 
  FaLinkedinIn, 
  FaTiktok,
  FaYoutube 
} from 'react-icons/fa';
import { 
  RiArrowRightUpLine, 
  RiMailLine, 
  RiMapPinLine, 
  RiPhoneLine,
  RiLeafLine,
  RiArrowUpLine,
  RiHeartFill
} from 'react-icons/ri';

const footerLinks = {
  Platform: [
    { label: 'Browse Bags', href: '#' },
    { label: 'How It Works', href: '#' },
    { label: 'Impact Tracker', href: '#' },
    { label: 'Download App', href: '#' },
    { label: 'Gift Cards', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Mission', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Report Issue', href: '#' },
    { label: 'Partner Support', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Data Rights', href: '#' },
  ],
};

const socials = [
  { icon: FaInstagram, label: 'Instagram', href: '#' },
  { icon: FaTwitter, label: 'Twitter', href: '#' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
  { icon: FaTiktok, label: 'TikTok', href: '#' },
  { icon: FaYoutube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => { if (footerRef.current) observer.unobserve(footerRef.current); };
  }, []);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const footerY = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], ["5%", "0%", "0%"]),
    { stiffness: 100, damping: 25 }
  );
  
  const footerOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]),
    { stiffness: 100, damping: 25 }
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef} 
      className="relative w-full bg-[#1a1a1a] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#F28F3B]/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#F28F3B]/3 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#F28F3B]/2 rounded-full blur-[100px] -translate-x-1/2" />
      </div>

      <motion.div 
        style={{ y: footerY, opacity: footerOpacity }}
        className="relative z-10"
      >
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#F28F3B]/40 to-transparent"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 mb-16 sm:mb-20">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sm:col-span-2 lg:col-span-4"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  className="w-10 h-10 bg-[#F28F3B] rounded-xl flex items-center justify-center"
                >
                  <RiLeafLine className="text-white size-5" />
                </motion.div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Saverish<span className="text-[#F28F3B]">.</span>
                </h3>
              </div>
              
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
                Driving the transition towards a circular food economy. 
                Every rescued meal counts towards a sustainable future.
              </p>

              <form onSubmit={handleSubscribe} className="relative max-w-sm">
                <div className="flex items-center gap-2 p-1.5 bg-white/[0.05] border border-white/[0.08] rounded-2xl focus-within:border-[#F28F3B]/50 transition-all">
                  <RiMailLine className="text-white/30 size-5 ml-3 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Join our newsletter"
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none py-2"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#F28F3B] text-white p-2.5 rounded-xl hover:bg-[#e07a2e] transition-colors shrink-0"
                  >
                    <RiArrowRightUpLine size={18} />
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
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + catIdx * 0.1 }}
                className="sm:col-span-1 lg:col-span-2"
              >
                <h4 className="text-[10px] font-black text-[#F28F3B] uppercase tracking-[0.2em] mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/35 text-sm hover:text-white transition-colors duration-200 relative group inline-block"
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#F28F3B] group-hover:w-full transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.06] mb-16 sm:mb-20">
            
            <div className="flex items-center gap-2">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:bg-[#F28F3B] hover:text-white hover:border-[#F28F3B] transition-all duration-300"
                  title={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a href="mailto:hello@saverish.com" className="flex items-center gap-1.5 text-white/30 hover:text-[#F28F3B] transition-colors text-xs sm:text-sm">
                <RiMailLine size={14} />
                <span>hello@saverish.com</span>
              </a>
              <span className="text-white/10 hidden sm:block">|</span>
              <span className="flex items-center gap-1.5 text-white/30 text-xs sm:text-sm">
                <RiMapPinLine size={14} />
                <span>Surabaya, Indonesia</span>
              </span>
              <span className="text-white/10 hidden sm:block">|</span>
              <span className="flex items-center gap-1.5 text-white/30 text-xs sm:text-sm">
                <RiPhoneLine size={14} />
                <span>+62 812 3289 1775</span>
              </span>
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-[#F28F3B]/10 border border-[#F28F3B]/20 flex items-center justify-center text-[#F28F3B] hover:bg-[#F28F3B] hover:text-white transition-all duration-300"
            >
              <RiArrowUpLine size={18} /> 
            </motion.button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs text-white/15">
            <span>© 2026 Saverish. All rights reserved.</span>
            <div className="flex items-center gap-1.5">
              <span>Made with</span>
              <RiHeartFill className="text-[#F28F3B] size-3" />
              <span>for a greener planet</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#F28F3B]/5 to-transparent rounded-tr-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#F28F3B]/3 to-transparent rounded-tl-full pointer-events-none" />
    </footer>
  );
}