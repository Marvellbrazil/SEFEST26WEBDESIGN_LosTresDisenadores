'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RiLeafLine, RiEarthFill, RiSeedlingLine } from 'react-icons/ri';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Section2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const springConfig = { stiffness: 40, damping: 20, mass: 1 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(mouseXSpring, [-500, 500], [25, -25]);
  const parallaxY = useTransform(mouseYSpring, [-500, 500], [25, -25]);

  const invertedParallaxX = useTransform(parallaxX, (v) => -v);
  const invertedParallaxY = useTransform(parallaxY, (v) => -v);

  const words = [
    { letter: "E", color: "#2D2A26" }, { letter: "v", color: "#2D2A26" }, { letter: "e", color: "#2D2A26" }, { letter: "r", color: "#2D2A26" }, { letter: "y", color: "#2D2A26" },
    { letter: " ", color: "#2D2A26" },
    { letter: "m", color: "#2D2A26" }, { letter: "e", color: "#2D2A26" }, { letter: "a", color: "#2D2A26" }, { letter: "l", color: "#2D2A26" },
    { letter: " ", color: "#2D2A26" },
    { letter: "r", color: "#F28F3B" }, { letter: "e", color: "#F28F3B" }, { letter: "s", color: "#F28F3B" }, { letter: "c", color: "#F28F3B" }, { letter: "u", color: "#F28F3B" }, { letter: "e", color: "#F28F3B" }, { letter: "d", color: "#F28F3B" },
    { letter: " ", color: "#2D2A26" },
    { letter: "m", color: "#2D2A26" }, { letter: "a", color: "#2D2A26" }, { letter: "k", color: "#2D2A26" }, { letter: "e", color: "#2D2A26" }, { letter: "s", color: "#2D2A26" },
    { letter: " ", color: "#2D2A26" },
    { letter: "a", color: "#2D2A26" },
    { letter: " ", color: "#2D2A26" },
    { letter: "d", color: "#2D2A26" }, { letter: "i", color: "#2D2A26" }, { letter: "f", color: "#2D2A26" }, { letter: "f", color: "#2D2A26" }, { letter: "e", color: "#2D2A26" }, { letter: "r", color: "#2D2A26" }, { letter: "e", color: "#2D2A26" }, { letter: "n", color: "#2D2A26" }, { letter: "c", color: "#2D2A26" }, { letter: "e", color: "#2D2A26" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = sectionRef.current;
      const textContainer = textRef.current;
      const bottomCard = bottomTextRef.current;
      if (!container || !textContainer) return;
      
      const letters = container.querySelectorAll('.letter');
      const arrowPaths = arrowRef.current ? arrowRef.current.querySelectorAll('path') : [];

      const pinnedDistance = window.innerWidth < 768 ? 2000 : 3500;

      const scrollTween = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${pinnedDistance}`,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        }
      });

      scrollTween
        .fromTo(textContainer,
          { x: "100vw" },
          { x: "50vw", ease: "none", duration: 1 }
        )
        .to(textContainer,
          { x: () => -(textContainer.scrollWidth - window.innerWidth / 2), ease: "none", duration: 2 }
        );

      if (bottomCard) {
        gsap.fromTo(bottomCard,
          { scale: 0.85, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textContainer,
              containerAnimation: scrollTween,
              start: "left 40%",
              end: "left 10%",
              scrub: 1
            }
          }
        );
      }

      letters.forEach((letter: Element) => {
        gsap.from(letter, {
          yPercent: (Math.random() - 0.5) * 400,
          rotation: (Math.random() - 0.5) * 60,
          ease: "elastic.out(1.2, 0.8)",
          scrollTrigger: {
            trigger: letter,
            containerAnimation: scrollTween,
            start: 'left 95%',
            end: 'left 50%',
            scrub: 0.8
          }
        });
      });

      arrowPaths.forEach((arrowPath: SVGPathElement) => {
        const pathLen = arrowPath.getTotalLength();
        gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
        gsap.to(arrowPath, {
          strokeDashoffset: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: arrowPath,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'left 50%',
            scrub: 0.8
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stickerSpringTransition = {
    type: "spring" as const,
    stiffness: 150,
    damping: 12,
    mass: 0.8
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#F4F3EE] overflow-hidden font-[family:var(--font-jakarta)] select-none"
      onMouseMove={handleMouseMove}
    >
      <div 
        className="absolute inset-0 z-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(#2D2A26 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F3EE]/40 via-transparent to-[#F4F3EE] pointer-events-none z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F28F3B] rounded-full blur-[160px] opacity-15 z-0 pointer-events-none" />

      <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
        <motion.div 
          style={isMounted ? { x: parallaxX, y: parallaxY } : {}}
          className="absolute top-[25%] left-[12%] bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white flex items-center gap-2 shadow-xl shadow-black/[0.02]"
        >
          <RiEarthFill className="text-[#10B981]" size={16} />
          <span className="text-[10px] font-black uppercase tracking-wider text-[#2D2A26]">Save Ecosystem</span>
        </motion.div>

        <motion.div 
          style={isMounted ? { x: invertedParallaxX, y: invertedParallaxY } : {}}
          className="absolute bottom-[35%] right-[10%] bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white flex items-center gap-2 shadow-xl shadow-black/[0.02]"
        >
          <RiSeedlingLine className="text-[#F28F3B]" size={16} />
          <span className="text-[10px] font-black uppercase tracking-wider text-[#2D2A26]">Zero Waste</span>
        </motion.div>
      </div>

      <div className="relative w-full h-screen overflow-hidden z-10">
        
        <div className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 z-30">
          <motion.div 
            initial={{ opacity: 0, scale: 0.4, rotate: -15, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            viewport={{ once: true }}
            transition={stickerSpringTransition}
            className="flex items-center justify-center gap-2 bg-[#2D2A26] text-white px-4 py-2 rounded-md shadow-lg"
          >
            <RiLeafLine className="text-[#F28F3B]" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Global Impact</span>
          </motion.div>
        </div>

        <div 
          ref={textRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap flex items-center"
          style={{ paddingLeft: '0', paddingRight: '50vw' }}
        >
          <div className="absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2 drop-shadow-[0_15px_30px_rgba(242,143,59,0.25)]">
            <svg 
              ref={arrowRef}
              xmlns="http://www.w3.org/2000/svg" 
              className="w-20 sm:w-28 md:w-32 lg:w-[200px]"
              viewBox="0 0 386 127" 
              fill="none"
            >
              <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="#F28F3B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="#F28F3B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          
          <h2 className="text-[44px] sm:text-[76px] md:text-[100px] lg:text-[150px] font-black uppercase tracking-tighter leading-none flex items-center">
            {words.map((item, idx) => (
              <span
                key={idx}
                className="letter inline-block"
                style={{ color: item.color }}
              >
                {item.letter === ' ' ? '\u00A0' : item.letter}
              </span>
            ))}
          </h2>
        </div>

        <div 
          ref={bottomTextRef}
          className="absolute left-1/2 bottom-[10%] sm:bottom-[15%] -translate-x-1/2 text-center z-20 w-full px-4"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white p-5 sm:p-6 md:p-8 rounded-[24px] sm:rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] max-w-[280px] sm:max-w-md md:max-w-2xl mx-auto transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(242,143,59,0.1)]">
            <p className="text-[#2D2A26]/80 text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed">
              Every rescued meal creates a ripple effect of positive environmental change. 
              Join us in making <span className="text-[#F28F3B] font-black uppercase tracking-tight">sustainable choices</span> that benefit both you and the planet.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Section2;