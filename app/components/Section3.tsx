'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trash2, Flame, CloudRain, TreePine, DollarSign } from 'lucide-react';
import { problemCardData, type IconName } from './data/problemCards';

const iconMap: Record<IconName, React.ReactNode> = {
  trash2: <Trash2 size={28} />,
  flame: <Flame size={28} />,
  cloudRain: <CloudRain size={28} />,
  treePine: <TreePine size={28} />,
  dollarSign: <DollarSign size={28} />,
};

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const smileyRef = useRef<HTMLDivElement>(null);
  const trackerAreaRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLImageElement>(null);
  const rightEyeRef = useRef<HTMLImageElement>(null);
  const mouthRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const problemCards = problemCardData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: 0.5,
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.to('.title-underline-path', {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 60%",
            scrub: 0.5,
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(smileyRef.current,
        { scale: 0.8, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 40%",
            scrub: 0.5,
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const isLeft = problemCards[index].leftOffset.includes('-') && problemCards[index].leftOffset !== '-150px';
        const isRight = !isLeft && problemCards[index].leftOffset !== '-150px';
        
        let fromX = 0;
        if (!isMobile) {
          if (isLeft) fromX = -100;
          if (isRight) fromX = 100;
        }
        
        gsap.fromTo(card,
          { x: fromX, opacity: 0, rotation: parseFloat(problemCards[index].rotation) * 2 },
          {
            x: 0,
            opacity: 1,
            rotation: parseFloat(problemCards[index].rotation),
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(0.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
              end: "top 30%",
              scrub: 0.5,
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [problemCards, isMobile]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      const data = problemCards[i];
      if (!card) return;
      
      gsap.to(card, {
        y: `+=${data.floatOffset}`,
        duration: 2.5 + (i * 0.2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });
  }, [problemCards]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([leftEyeRef.current, rightEyeRef.current],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "top 45%",
            scrub: 0.5,
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(mouthRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.7,
          ease: "back.out(0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "top 45%",
            scrub: 0.5,
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    
    if (!leftEye || !rightEye) return;
    
    gsap.to([leftEye, rightEye], {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });
    
    return () => {
      gsap.killTweensOf([leftEye, rightEye]);
    };
  }, []);

  useEffect(() => {
    const mouth = mouthRef.current;
    if (!mouth) return;
    
    gsap.to(mouth, {
      height: "55px",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    
    return () => {
      gsap.killTweensOf(mouth);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!smileyRef.current || !trackerAreaRef.current || isMobile) return;
    
    const rect = trackerAreaRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    const moveX = x * 20;
    const moveY = y * 20;
    
    gsap.to(smileyRef.current, {
      x: moveX,
      y: moveY,
      duration: 0.4,
      ease: "power2.out"
    });
    
    if (leftEyeRef.current && rightEyeRef.current && mouthRef.current) {
      gsap.to([leftEyeRef.current, rightEyeRef.current, mouthRef.current], {
        x: moveX * 0.3,
        y: moveY * 0.3,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to([smileyRef.current, leftEyeRef.current, rightEyeRef.current, mouthRef.current], {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)"
    });
  };

  const getCardPosition = (card: typeof problemCards[0]) => {
    if (isMobile) {
      return {
        left: '50%',
        top: `${150 + (card.id - 1) * 100}px`,
        transform: `translateX(-50%) rotate(0deg)`,
      };
    }
    return {
      left: `calc(50% + ${card.leftOffset})`,
      top: `calc(50% - 185px + ${card.top})`,
      transform: `rotate(${card.rotation})`,
    };
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#F4F3EE] py-24 md:py-32 overflow-visible"
    >
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-0 pt-8 md:pt-1">
        <div className="text-center px-4">
          <h2 
            ref={titleRef}
            className="text-[#2D2A26] text-[35px] md:text-[70px] font-black leading-[1.1] font-[family:var(--font-jakarta)]"
          >
            The Problem <span className="italic text-[#F28F3B]">We Face:</span>
          </h2>
          
          <svg 
            className="title-underline-svg w-[180px] md:w-[280px] mx-auto mt-4" 
            viewBox="0 0 280 17" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              className="title-underline-path"
              d="M2 12.1515C93.0771 5.7187 184.529 2.30552 276 1.93652" 
              stroke="#F28F3B" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeDasharray="300"
              strokeDashoffset="300"
            />
            <path 
              className="title-underline-path"
              d="M52.2672 15.9461C111.19 12.8158 170.266 11.3583 229.33 11.5735" 
              stroke="#F28F3B" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
          </svg>
          
          <div className="text-center mt-2">
            <p 
              ref={subtitleRef}
              className="mt-6 text-[#0F1A20]/60 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 font-[family:var(--font-jakarta)]"
            >
              Every year, millions of tons of food end up in landfills while people go hungry.
              <br />
              These are the <span className="font-bold text-[#F28F3B]">staggering facts</span> we cannot ignore.
            </p>
          </div>  
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#F28F3B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#2D2A26]/5 rounded-full blur-3xl" />
      </div>

      {/* watchout guys ini problem kalau positionnya fixed */}
      <div 
        ref={trackerAreaRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`absolute z-20 ${isMobile ? 'hidden' : ''}`}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(600px, 85vw)',
          height: 'min(600px, 85vw)',
          borderRadius: '50%',
          pointerEvents: 'auto',
          cursor: 'none',
          backgroundColor: 'transparent',
        }}
      />

      <div className="relative z-10 max-w-400 mx-auto px-6 md:px-16 overflow-visible">
        
        <div className="flex items-center justify-center w-full" style={{ minHeight: '500px' }}>
          <div 
            ref={smileyRef}
            className="relative z-10"
            style={{
              width: 'min(300px, 55vw)',
              height: 'min(300px, 55vw)',
              borderRadius: '100%',
              backgroundImage: `url('/assets/Img-3.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#F28F3B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 0 30px rgba(0,0,0,0.2)',
            }}
          >
            <div 
              ref={leftEyeRef}
              style={{
                position: 'absolute',
                top: '30%',
                left: '20%',
                width: 'min(3vw, 40px)',
                height: 'auto',
                pointerEvents: 'none',
                minWidth: '25px',
                maxWidth: '50px'
              }}
            >
              <img 
                src="/assets/Img-1.svg" 
                alt="left eye" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            
            <div 
              ref={rightEyeRef}
              style={{
                position: 'absolute',
                top: '30%',
                right: '20%',
                width: 'min(3vw, 40px)',
                height: 'auto',
                pointerEvents: 'none',
                minWidth: '25px',
                maxWidth: '50px'
              }}
            >
              <img 
                src="/assets/Img-1.svg" 
                alt="right eye" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            
            <div 
              ref={mouthRef}
              style={{
                position: 'absolute',
                bottom: '25%',
                width: 'min(60px, 12vw)',
                height: 'min(35px, 7vw)',
                borderRadius: '35px',
                backgroundColor: 'black',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>
      </div>

      <div className="cards-wrapper absolute inset-0 w-full h-full overflow-visible" style={{ zIndex: 20 }}>
        {problemCards.map((card, index) => {
          const position = getCardPosition(card);
          
          return (
            <div 
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="card absolute rounded-2xl p-5 md:p-6 shadow-xl cursor-pointer group"
              style={{ 
                backgroundColor: card.bgColor,
                width: 'clamp(260px, 80vw, 300px)',
                left: position.left,
                top: position.top,
                transform: position.transform,
                zIndex: 100 + index,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="card-icon p-2 rounded-xl transition-all duration-300" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                  {iconMap[card.icon as IconName]}
                </div>
                <span className="card-title text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 font-[family:var(--font-jakarta)]" style={{ color: card.color }}>
                  {card.title}
                </span>
              </div>
              <div className="card-value text-2xl md:text-4xl mb-1 transition-all duration-300 font-[family:var(--font-jakarta)]" style={{ color: card.textColor }}>
                {card.value}
              </div>
              <div className="text-[8px] md:text-[10px] uppercase tracking-wider mb-3 transition-all duration-300 font-[family:var(--font-jakarta)]" style={{ color: card.textColor }}>
                {card.unit}
              </div>
              <p className="text-[11px] md:text-sm leading-relaxed transition-all duration-300 group-hover:opacity-100 font-[family:var(--font-jakarta)]" style={{ color: card.textColor }}>
                {card.description}
              </p>
              
              <div className="card-underline absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#F28F3B] transition-all duration-500" />
            </div>
          );
        })}
      </div>

      <div className="h-80 md:h-96" />
    </section>
  );
};

export default Section3;