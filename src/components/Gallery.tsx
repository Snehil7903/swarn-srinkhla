"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Curated Unsplash placeholders with varying heights to create the masonry effect
// Updated Curated Unsplash links with working, high-end luxury photos
const galleryImages = [
  // 1. Architecture: A stunning, warm-lit luxury resort exterior
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop", alt: "Architecture" },
  
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop", alt: "Luxury Pool" },
  { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop", alt: "Interior Details" },
  
  // 2. Dining Setup: An elegant, moody fine-dining table setting with golden ambient light
  { src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2670&auto=format&fit=crop", alt: "Dining Setup" },
  
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop", alt: "Spa Experience" },
  { src: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=2000&auto=format&fit=crop", alt: "Lounge Area" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Stagger the images sliding up and fading in as the section enters the viewport
      gsap.from(".gallery-item", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", 
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative bg-obsidian py-32 px-6 md:px-12 lg:px-24 border-t border-gold/5">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <span className="text-gold tracking-[0.3em] uppercase text-xs md:text-sm block font-sans mb-4">
          The Experience
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-silver">
          Visual <span className="text-gold italic">Symphony</span>
        </h2>
        <div className="w-16 h-px bg-gold/50 mt-8"></div>
      </div>

      {/* Masonry Grid */}
      {/* columns-1 for mobile, columns-2 for tablet, columns-3 for desktop 
        gap-6 controls the space between columns
        space-y-6 controls the space between items stacked in a column
      */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 w-full max-w-7xl mx-auto">
        {galleryImages.map((image, index) => (
          <div 
            key={index} 
            // break-inside-avoid prevents an image from being split across columns
            className="gallery-item relative group overflow-hidden break-inside-avoid cursor-pointer"
          >
            {/* The Image */}
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/20 transition-colors duration-500 ease-out z-10 flex items-center justify-center">
              <span className="text-silver font-sans tracking-[0.2em] uppercase text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                {image.alt}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}