"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define our links once so they are identical in both menus
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Suites", href: "#suites" },
    { name: "Dining", href: "#dining" },
    { name: "Gallery", href: "#gallery" },
  ];

  useEffect(() => {
    // Handle the scroll state for the frosted glass effect on the top nav
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock the background from scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* --- MAIN NAVIGATION BAR --- */}
      <nav
        className={`fixed top-0 left-0 w-full z-60 px-6 md:px-12 flex items-center justify-between transition-[background-color,padding,border-color] duration-500 ease-in-out ${
          isScrolled 
            ? "bg-obsidian/90 backdrop-blur-md py-4 border-b border-gold/10" 
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        {/* Brand Monogram */}
        <div className="text-gold font-serif text-2xl tracking-widest uppercase cursor-pointer">
          SS.
        </div>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-10 text-xs tracking-[0.2em] uppercase font-sans text-silver">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-gold transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-6">
          <button className="hidden md:block border border-gold text-gold px-6 py-2 text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-obsidian transition-all duration-300">
            Reserve
          </button>
          
          {/* Mobile Hamburger / Close Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-silver hover:text-gold transition-colors duration-300 focus:outline-none"
          >
            {isMenuOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* --- TRANSPARENT MOBILE SIDEBAR --- */}
      <div 
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-500 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dark blurred backdrop (Clicking this also closes the menu) */}
        <div 
          className="absolute inset-0 bg-obsidian/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* The sliding transparent sidebar panel */}
        <div 
          className={`relative w-[80%] max-w-sm h-full bg-obsidian/60 backdrop-blur-xl border-l border-gold/20 pt-32 px-8 flex flex-col gap-8 transition-transform duration-500 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <span className="text-gold font-sans uppercase tracking-[0.3em] text-xs block mb-2">
            Menu
          </span>
          
          {/* Map through the exact same links as the desktop nav */}
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)} // Close menu when clicked
              className="text-4xl font-serif text-silver hover:text-gold transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          
          {/* Mobile Reserve Link */}
          <a 
            href="#reserve"
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl font-serif text-gold hover:text-silver transition-colors duration-300 mt-4"
          >
            Reserve
          </a>
          
          <div className="w-full h-px bg-gold/20 my-4"></div>
          
          <div className="flex flex-col gap-2">
            <span className="text-gold font-sans uppercase tracking-[0.3em] text-xs block mb-2">
              Contact
            </span>
            <a href="mailto:concierge@swarnsrinkhla.com" className="text-silver/70 font-sans text-sm hover:text-gold transition-colors">
              concierge@swarnsrinkhla.com
            </a>
            <a href="tel:+18005550199" className="text-silver/70 font-sans text-sm hover:text-gold transition-colors mt-2">
              +1 (800) 555-0199
            </a>
          </div>
        </div>
      </div>
    </>
  );
}