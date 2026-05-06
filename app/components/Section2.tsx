'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  const words = [
    { letter: "E", color: "#2D2A26" }, { letter: "v", color: "#2D2A26" }, { letter: "e", color: "#2D2A26" }, { letter: "r", color: "#2D2A26" }, { letter: "y", color: "#2D2A26" },
    { letter: " ", color: "#2D2A26" },
    { letter: "m", color: "#2D2A26" }, { letter: "e", color: "#2D2A26" }, { letter: "a", color: "#2D2A26" }, { letter: "l", color: "#2D2A26" },
    { letter: " ", color: "#2D2A26" },
    { letter: "r", color: "#2D2A26" }, { letter: "e", color: "#2D2A26" }, { letter: "s", color: "#2D2A26" }, { letter: "c", color: "#2D2A26" }, { letter: "u", color: "#2D2A26" }, { letter: "e", color: "#2D2A26" }, { letter: "d", color: "#2D2A26" },
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

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#F4F3EE] overflow-hidden"
    >
      <div className="relative w-full h-screen overflow-hidden">
        <div 
          ref={textRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap flex items-center"
          style={{ paddingLeft: '0', paddingRight: '50vw' }}
        >
          <div className="absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2">
            <svg 
              ref={arrowRef}
              xmlns="http://www.w3.org/2000/svg" 
              className="w-20 sm:w-28 md:w-32 lg:w-[200px]"
              viewBox="0 0 386 127" 
              fill="none"
            >
              <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="#F28F3B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="#F28F3B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-[#2D2A26] text-[32px] sm:text-[60px] md:text-[80px] lg:text-[120px] font-black uppercase tracking-tighter font-[family:var(--font-inter)] leading-none">
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
          className="absolute left-1/2 top-[70%] -translate-x-1/2 text-center z-20 w-full px-6"
        >
          <p className="text-[#2D2A26]/60 text-xs sm:text-sm md:text-base lg:text-xl font-[family:var(--font-jakarta)] font-medium max-w-[280px] sm:max-w-md md:max-w-2xl leading-relaxed mx-auto">
            Every rescued meal creates a ripple effect of positive environmental change. 
            Join us in making <span className="text-[#F28F3B] font-bold">sustainable choices</span> that benefit both you and the planet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Section2;