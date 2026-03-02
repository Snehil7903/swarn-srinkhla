"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin before using it
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. The Image Reveal Mask
      // The mask starts covering the image, and slides up to reveal it
      gsap.fromTo(
        ".about-image-mask",
        { y: "0%" }, 
        {
          y: "-100%",
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%", // Start animation when the top of the section hits 70% of viewport height
            end: "top 20%",
            scrub: 1, // Tying it to the scrollbar for that buttery smooth "scrubbing" feel
          },
        }
      );

      // 2. Subtle Image Parallax & Zoom
      // As the mask slides away, the image slowly scales down
      gsap.fromTo(
        ".about-image",
        { scale: 1.2, y: "5%" },
        {
          scale: 1,
          y: "0%",
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.5,
          },
        }
      );

      // 3. Staggered Text Reveal
      gsap.from(".about-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text-container",
          start: "top 85%",
          // Play the animation when scrolling down, reverse it when scrolling back up
          toggleActions: "play none none reverse", 
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section relative min-h-screen w-full py-32 px-6 md:px-12 lg:px-24 flex items-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full max-w-7xl mx-auto">
        
        {/* Left Column: Image with Mask */}
        <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden">
          {/* The solid dark block that slides away */}
          <div className="about-image-mask absolute inset-0 bg-charcoal z-10 w-full h-full"></div>
          
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2525&auto=format&fit=crop"
            alt="Swarn Srinkhla Architecture"
            className="about-image w-full h-full object-cover"
          />
        </div>

        {/* Right Column: Text Content */}
        <div className="about-text-container flex flex-col justify-center">
          <span className="about-text text-gold tracking-[0.3em] uppercase text-xs md:text-sm mb-6 block font-sans">
            The Legacy
          </span>
          <h2 className="about-text text-4xl md:text-5xl lg:text-6xl font-serif text-silver leading-tight mb-8">
            Where Heritage <br /> Meets Horizon
          </h2>
          <p className="about-text text-silver/70 font-sans text-lg md:text-xl leading-relaxed mb-6">
            Nestled at the intersection of untouched nature and meticulous craftsmanship, Swarn Srinkhla is more than a destination—it is an experience curated for the discerning soul.
          </p>
          <p className="about-text text-silver/70 font-sans text-lg md:text-xl leading-relaxed mb-10">
            Every stone tells a story, and every golden hue reflects our commitment to absolute luxury. Step into a world where time slows down, and elegance surrounds you.
          </p>
          
          {/* Custom Elegant Button */}
          <div className="about-text">
            <button className="group relative inline-flex items-center gap-4 text-silver hover:text-gold transition-colors duration-300">
              <span className="font-sans uppercase tracking-widest text-sm">Discover Our Story</span>
              <div className="w-16 h-px bg-silver group-hover:bg-gold transition-colors duration-300"></div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}