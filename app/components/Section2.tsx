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

      const isMobile = window.innerWidth < 768;
      const letters = container.querySelectorAll('.letter');
      const arrowPaths = arrowRef.current ? arrowRef.current.querySelectorAll('path') : [];

      if (!isMobile) {
        const pinnedDistance = 3500;
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
            yPercent: (Math.random() - 0.5) * 500,
            rotation: (Math.random() - 0.5) * 90,
            ease: "elastic.out(1.5, 0.4)",
            scrollTrigger: {
              trigger: letter,
              containerAnimation: scrollTween,
              start: 'left 95%',
              end: 'left 45%',
              scrub: 0.6
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
      } else {
        if (bottomCard) {
          gsap.fromTo(bottomCard,
            { scale: 0.9, opacity: 0, y: 40 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: bottomCard,
                start: "top 90%",
                end: "top 75%",
                scrub: true
              }
            }
          );
        }

        letters.forEach((letter: Element, idx: number) => {
          gsap.fromTo(letter,
            { y: 60, opacity: 0, scale: 0.5, rotate: (Math.random() - 0.5) * 30 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              ease: "elastic.out(1.5, 0.5)",
              scrollTrigger: {
                trigger: letter,
                start: "top 95%",
                end: "top 80%",
                scrub: 0.5
              }
            }
          );
        });

        if (arrowRef.current) {
          gsap.fromTo(arrowRef.current,
            { scale: 0.5, opacity: 0, rotate: -20 },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: arrowRef.current,
                start: "top 85%",
                end: "top 70%",
                scrub: true
              }
            }
          );
        }
      }

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
      className="relative w-full h-auto min-h-screen md:h-screen bg-[#F4F3EE] overflow-hidden font-[family:var(--font-jakarta)] select-none py-24 md:py-0"
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-[#F28F3B] rounded-full blur-[120px] sm:blur-[160px] opacity-15 z-0 pointer-events-none" />

      <div className="relative w-full h-full md:h-screen flex flex-col justify-between items-center z-10 px-4">

        <div className="w-full flex-1 flex flex-col justify-center items-center py-12 md:py-0 relative">
          
          <div className="w-full max-w-4xl flex justify-center mb-6 md:mb-0 md:absolute md:-top-24 md:left-1/2 md:-translate-x-1/2 drop-shadow-[0_15px_30px_rgba(242,143,59,0.25)] z-20">
            <svg 
              ref={arrowRef}
              xmlns="http://www.w3.org/2000/svg" 
              className="w-16 sm:w-24 md:w-32 lg:w-[200px]"
              viewBox="0 0 386 127" 
              fill="none"
            >
              <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="#F28F3B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="#F28F3B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          
          <div 
            ref={textRef}
            className="w-full md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2 whitespace-normal md:whitespace-nowrap flex items-center justify-center md:justify-start"
            style={{ paddingLeft: '0', paddingRight: typeof window !== 'undefined' && window.innerWidth >= 768 ? '50vw' : '0' }}
          >
            <h2 className="text-[34px] sm:text-[64px] md:text-[100px] lg:text-[150px] font-black uppercase tracking-tighter leading-[0.95] md:leading-none flex flex-wrap md:flex-nowrap items-center justify-center text-center md:text-left gap-y-1">
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

        </div>

        <div 
          ref={bottomTextRef}
          className="w-full px-4 mb-4 md:mb-0 md:absolute md:left-1/2 md:bottom-[12%] md:-translate-x-1/2 text-center z-20"
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