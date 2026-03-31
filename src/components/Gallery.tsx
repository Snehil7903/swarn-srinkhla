"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop", alt: "Architecture" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop", alt: "Luxury Pool" },
  { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop", alt: "Interior Details" },
  { src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2670&auto=format&fit=crop", alt: "Dining Setup" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop", alt: "Spa Experience" },
  { src: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=2000&auto=format&fit=crop", alt: "Lounge Area" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. REVEAL ANIMATION (Scale and Fade)
      gsap.from(".gallery-item", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // 2. PARALLAX EFFECT (Image moves slower than scroll)
      gsap.utils.toArray(".parallax-img").forEach((img: any) => {
        gsap.to(img, {
          yPercent: 15, // Moves the image down slightly as you scroll
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3. MAGNETIC HOVER LOGIC
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate center of image
    const x = (clientX - left - width / 2) * 0.15; // Intensity of 15%
    const y = (clientY - top - height / 2) * 0.15;

    gsap.to(currentTarget.querySelector(".parallax-img"), {
      x: x,
      y: y,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector(".parallax-img"), {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)" // Sophisticated "snap back" effect
    });
  };

  return (
    <section ref={sectionRef} id="gallery" className="relative bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-[#c5a358]/10 overflow-hidden">
      
      <div className="flex flex-col items-center text-center mb-20">
        <span className="text-[#c5a358] tracking-[0.4em] uppercase text-[10px] block mb-4 font-medium">
          Curated Perspective
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-[#ffffff] leading-tight">
          Visual <span className="text-[#c5a358] italic font-light">Symphony</span>
        </h2>
        <div className="w-12 h-px bg-[#c5a358]/40 mt-8"></div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 w-full max-w-7xl mx-auto">
        {galleryImages.map((image, index) => (
          <div 
            key={index} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="gallery-item relative group overflow-hidden break-inside-avoid cursor-none border border-[#c5a358]/5"
          >
            {/* The Image Wrapper (Creates the "window" for parallax) */}
            <div className="relative h-full w-full overflow-hidden scale-110"> 
              <img 
                src={image.src} 
                alt={image.alt} 
                className="parallax-img w-full h-auto object-cover transition-filter duration-700 grayscale-[40%] group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
            
            {/* Elegant Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col justify-end p-8">
              <span className="text-[#c5a358] text-[9px] uppercase tracking-[0.4em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                Resort Archive
              </span>
              <h3 className="text-white font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                {image.alt}
              </h3>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#c5a358]/0 group-hover:border-[#c5a358]/40 transition-all duration-700"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#c5a358]/0 group-hover:border-[#c5a358]/40 transition-all duration-700"></div>
          </div>
        ))}
      </div>

    </section>
  );
}