"use client";

import { useRef, useState } from "react";
import { sendEmail } from "@/actions/sendEmail";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setStatus("loading");
    
    // Call our Server Action
    const result = await sendEmail(formData);

    if (result?.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      formRef.current?.reset(); // Clear the form
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 bg-obsidian border-t border-gold/10 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
        
        {/* Left Side: Text */}
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-gold tracking-[0.3em] uppercase text-xs font-sans mb-4">
            Concierge Services
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-silver mb-6">
            At Your <span className="text-gold italic">Service</span>
          </h2>
          <p className="text-silver/70 font-sans text-base leading-relaxed">
            Whether you wish to arrange a private airport transfer, curate a bespoke dining experience, or inquire about our signature suites, our concierge desk is available to assist you.
          </p>
        </div>

        {/* Right Side: The Form */}
        <div className="flex-1 bg-charcoal/50 p-8 border border-gold/20 backdrop-blur-sm">
          <form ref={formRef} action={handleSubmit} className="flex flex-col gap-6">
            
            <div>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required
                className="w-full bg-transparent border-b border-silver/20 px-0 py-3 text-silver placeholder:text-silver/40 focus:outline-none focus:border-gold transition-colors font-sans text-sm rounded-none"
              />
            </div>

            <div>
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                required
                className="w-full bg-transparent border-b border-silver/20 px-0 py-3 text-silver placeholder:text-silver/40 focus:outline-none focus:border-gold transition-colors font-sans text-sm rounded-none"
              />
            </div>

            <div>
              <textarea 
                name="message" 
                placeholder="How may we assist you?" 
                rows={4}
                required
                className="w-full bg-transparent border-b border-silver/20 px-0 py-3 text-silver placeholder:text-silver/40 focus:outline-none focus:border-gold transition-colors font-sans text-sm resize-none rounded-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="mt-4 border border-gold text-gold px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-obsidian transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Request"}
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <p className="text-green-400 font-sans text-xs tracking-wider uppercase text-center mt-2">
                Your message has been received.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 font-sans text-xs tracking-wider uppercase text-center mt-2">
                {errorMessage}
              </p>
            )}
            
          </form>
        </div>

      </div>
    </section>
  );
}