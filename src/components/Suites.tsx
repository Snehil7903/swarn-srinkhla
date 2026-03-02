"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const suitesData = [
  {
    title: "The Royal Pavilion",
    description: "Panoramic views of the valley, featuring a private plunge pool and gold-leaf accents.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "Heritage Suite",
    description: "Step back in time. Antique furnishings paired with uncompromising modern comfort.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop",
  },
  {
    title: "The Horizon Villa",
    description: "Our most secluded offering. Glass walls blur the line between the lush exterior and elegant interior.",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "Presidential Retreat",
    description: "Unmatched grandeur. Expansive living spaces designed for the ultimate quiet luxury experience.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop",
  }
];

export default function Suites() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      // Calculate how far to move the container to the left
      // We want to move it by its total width minus the viewport width
      const getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

      const tween = gsap.to(scrollContainer, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // The scroll distance equals the width of the sliding content
        pin: true,
        animation: tween,
        scrub: 1, // Smooth scrubbing tied to the scrollbar
        invalidateOnRefresh: true, // Recalculate on window resize
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Changed to 'flex-col' without 'justify-center' so items stack naturally from the top
    <section ref={sectionRef} id="suites" className="relative h-screen bg-obsidian overflow-hidden flex flex-col">
      
      {/* Section Header - Removed absolute positioning, added shrink-0 so it keeps its height */}
      <div className="w-full pt-28 md:pt-32 px-6 md:px-12 lg:px-24 shrink-0 z-10">
        <span className="text-gold tracking-[0.3em] uppercase text-xs md:text-sm block font-sans mb-4">
          Accommodations
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-silver">
          Our Signature <span className="text-gold italic">Suites</span>
        </h2>
      </div>

      {/* Horizontally Scrolling Wrapper - 'flex-1' makes it fill the remaining height below the header */}
      <div className="flex-1 flex items-center w-full">
        <div 
          ref={scrollContainerRef} 
          className="flex gap-8 md:gap-16 px-6 md:px-12 lg:px-24 w-max"
        >
          {suitesData.map((suite, index) => (
            <div 
              key={index} 
              className="group relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[50vh] md:h-[60vh] flex-shrink-0 overflow-hidden cursor-pointer"
            >
              {/* Image with subtle zoom on hover */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={suite.image} 
                  alt={suite.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
              </div>

              {/* Suite Details */}
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <div className="w-12 h-px bg-gold mb-6 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100"></div>
                <h3 className="text-3xl md:text-4xl font-serif text-silver mb-4 group-hover:text-gold transition-colors duration-500">
                  {suite.title}
                </h3>
                <p className="text-silver/80 font-sans text-sm md:text-base max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                  {suite.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}