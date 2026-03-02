"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Dining() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. The True Parallax Background Effect
      // We move the image slightly downwards on the Y-axis as the user scrolls past
      gsap.to(imageRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Start when the top of the section hits the bottom of the screen
          end: "bottom top",   // End when the bottom of the section leaves the top of the screen
          scrub: true,         // Tie directly to the scrollbar
        },
      });

      // 2. The Frosted Glass Card Reveal
      gsap.from(textCardRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textCardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // We use justify-end on desktop to push the text card to the right side of the screen
    <section 
      ref={sectionRef} 
      id="dining" 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center md:justify-end md:pr-24 lg:pr-32 border-t border-gold/10"
    >
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-obsidian">
        <img
          ref={imageRef}
          // A gorgeous, moody fine-dining restaurant image
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2670&auto=format&fit=crop"
          alt="Fine Dining at Swarn Srinkhla"
          // We make the image 125% taller than the screen and pull it up so it has room to move during the parallax scroll
          className="w-full h-[125%] object-cover opacity-60 absolute -top-[15%]"
        />
        {/* Subtle gradient overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 to-obsidian/80"></div>
      </div>

      {/* Floating Content Card */}
      <div 
        ref={textCardRef} 
        className="relative z-10 bg-obsidian/70 backdrop-blur-xl border border-gold/20 p-10 md:p-16 max-w-lg w-[90%] md:w-auto text-center md:text-left shadow-2xl"
      >
        <span className="text-gold tracking-[0.3em] uppercase text-xs block font-sans mb-6">
          Culinary Excellence
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-silver mb-8 leading-tight">
          The <span className="text-gold italic">Aura</span> Room
        </h2>
        <p className="text-silver/80 font-sans text-base leading-relaxed mb-10">
          A gastronomic journey rooted in royal heritage. Savor modern interpretations of ancient regional recipes, crafted with locally sourced, organic ingredients, all while overlooking the starlit valley.
        </p>
        
        <button className="group relative inline-flex items-center gap-4 text-silver hover:text-gold transition-colors duration-300 w-fit mx-auto md:mx-0">
          <span className="font-sans uppercase tracking-widest text-xs">Explore the Menu</span>
          <div className="w-16 h-px bg-silver group-hover:bg-gold transition-colors duration-300"></div>
        </button>
      </div>

    </section>
  );
}