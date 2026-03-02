"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import BackgroundParticles from "./BackgroundParticles";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.context ensures smooth cleanup in React 19 Strict Mode
    let ctx = gsap.context(() => {
      // 1. Slow zoom on the background image
      gsap.from(".hero-bg", {
        scale: 1.15,
        duration: 2.5,
        ease: "power2.out",
      });

      // 2. Staggered reveal for the text elements
      gsap.from(".reveal-item", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container} 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* 1. Background Image with Dark & Golden Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2525&auto=format&fit=crop" 
          alt="Swarn Srinkhla Resort" 
          className="hero-bg w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian border-b border-gold/10"></div>
      </div>

      {/* 2. The 3D Golden Particle Field Layered on Top of the Image */}
      <BackgroundParticles />

      {/* 3. Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 mt-16 md:mt-0">
        <div className="overflow-hidden mb-4">
          <span className="reveal-item block text-gold tracking-[0.3em] uppercase text-xs md:text-sm font-sans">
            Welcome to Elegance
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-serif text-silver flex flex-col md:flex-row gap-4">
          <div className="overflow-hidden">
            <span className="reveal-item block">Swarn</span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-item block text-gold italic">Srinkhla</span>
          </div>
        </h1>
        
        <div className="overflow-hidden mt-6">
          <p className="reveal-item block text-silver/80 max-w-lg font-sans text-lg">
            A sanctuary of heritage and modern luxury.
          </p>
        </div>
      </div>
    </section>
  );
}