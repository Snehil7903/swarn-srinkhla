"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // GSAP quickTo creates a highly performant, reusable animation function
    // We set the duration to 0.15s to give it a slight, smooth "lag" behind the mouse
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      // Subtract 8px to perfectly center the 16px (w-4 h-4) dot on the actual mouse pointer
      xTo(e.clientX - 8);
      yTo(e.clientY - 8);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // The !! operator forces whatever comes back (even an HTML element) into a strict true/false boolean
      const isClickable = !!(
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      );

      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out ${
        isHovering 
          ? "scale-[3.5] bg-gold/20 border border-gold backdrop-blur-sm" 
          : "scale-100 bg-gold"
      }`}
    ></div>
  );
}