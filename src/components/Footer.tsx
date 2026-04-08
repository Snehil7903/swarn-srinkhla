"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered reveal for all elements with the 'footer-reveal' class
      gsap.from(".footer-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%", // Triggers when the top of the footer is 85% down the screen
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Helper to slugify links (e.g., "Fine Dining" -> "/fine-dining")
  const slugify = (text: string) => `/${text.toLowerCase().replace(/\s+/g, "-")}`;

  const navLinks = [
    { name: "The Resort", href: "/#about" },
    { name: "Signature Suites", href: "/#suites" },
    { name: "Fine Dining", href: "/#dining" },
    { name: "Wellness & Spa", href: "/#gallery" }
  ];

  return (
    <footer ref={footerRef} className="relative bg-obsidian pt-32 pb-12 px-6 md:px-12 lg:px-24 border-t border-gold/10 overflow-hidden">

      {/* Top Section: Large CTA */}
      <div className="flex flex-col items-center text-center mb-24">
        <span className="footer-reveal text-gold tracking-[0.3em] uppercase text-xs md:text-sm font-sans mb-6 block">
          Your Escape Awaits
        </span>
        <h2 className="footer-reveal text-5xl md:text-7xl lg:text-8xl font-serif text-silver mb-10">
          Begin Your <span className="text-gold italic">Journey</span>
        </h2>
        <div className="footer-reveal">
          <Link href="/reservations" className="border border-gold text-gold px-10 py-4 text-sm uppercase tracking-[0.2em] hover:bg-gold hover:text-obsidian transition-all duration-500 inline-block">
            Make a Reservation
          </Link>
        </div>
      </div>

      {/* Middle Section: Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-20">

        {/* Brand Column */}
        <div className="lg:col-span-2">
          <div className="footer-reveal text-gold font-serif text-3xl tracking-widest uppercase mb-6">
            Swarn Srinkhla.
          </div>
          <p className="footer-reveal text-silver/70 font-sans text-sm md:text-base max-w-sm leading-relaxed">
            A sanctuary where heritage architecture meets modern, uncompromising luxury. Experience the pinnacle of hospitality.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          <h4 className="footer-reveal text-silver font-sans uppercase tracking-[0.2em] text-xs mb-2">Explore</h4>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="footer-reveal text-silver/70 hover:text-gold transition-colors duration-300 font-sans text-sm w-fit"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="footer-reveal text-silver font-sans uppercase tracking-[0.2em] text-xs mb-2">Contact</h4>
          <p className="footer-reveal text-silver/70 font-sans text-sm">
            123 Heritage Valley Road<br />
            Vananchal Hills, JH 825319
          </p>
          <a href="mailto:concierge@swarnsrinkhla.com" className="footer-reveal text-silver/70 hover:text-gold transition-colors duration-300 font-sans text-sm w-fit mt-2">
            heritage@swarnsrinkhla.com
          </a>
          <a href="tel:+916205711894" className="footer-reveal text-silver/70 hover:text-gold transition-colors duration-300 font-sans text-sm w-fit">
            +91 6205711894
          </a>
          <p className="footer-reveal text-silver/70 font-sans text-sm w-fit mt-2">Owner: Shekhar</p>
        </div>
      </div>

      {/* Bottom Section: Legal & Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-silver/10">
        <p className="footer-reveal text-silver/50 font-sans text-xs mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Swarn Srinkhla Resort. All rights reserved.
        </p>
        <p className="footer-reveal text-silver/50 font-sans text-xs mb-4 md:mb-0">Developed by Snehil Raj</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="footer-reveal text-silver/50 hover:text-gold transition-colors duration-300 font-sans text-xs">
            Privacy Policy
          </Link>
          <Link href="/terms" className="footer-reveal text-silver/50 hover:text-gold transition-colors duration-300 font-sans text-xs">
            Terms of Service
          </Link>
        </div>
      </div>

    </footer>
  );
}