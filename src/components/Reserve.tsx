"use client";

import { useState, useRef } from "react";
import { bookSuite } from "@/actions/bookSuite";

export default function Reserve() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setStatus("loading");
    const result = await bookSuite(formData);

    if (result?.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      formRef.current?.reset();
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section id="reserve" className="py-32 bg-obsidian border-t border-gold/10 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-gold tracking-[0.3em] uppercase text-xs font-sans mb-4 block">
          Secure Your Stay
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-silver">
          Make a <span className="text-gold italic">Reservation</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto bg-charcoal/30 p-8 md:p-12 border border-gold/20 backdrop-blur-md shadow-2xl">
        <form ref={formRef} action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <input type="text" name="name" placeholder="Full Name" required className="bg-transparent border-b border-silver/20 px-0 py-3 text-silver focus:outline-none focus:border-gold transition-colors font-sans text-sm" />
          <input type="email" name="email" placeholder="Email Address" required className="bg-transparent border-b border-silver/20 px-0 py-3 text-silver focus:outline-none focus:border-gold transition-colors font-sans text-sm" />
          
          <div className="flex flex-col gap-2">
            <label className="text-silver/50 text-xs tracking-widest uppercase font-sans">Check-in</label>
            <input type="date" name="checkIn" required className="bg-transparent border-b border-silver/20 px-0 py-2 text-silver focus:outline-none focus:border-gold transition-colors font-sans text-sm [color-scheme:dark]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-silver/50 text-xs tracking-widest uppercase font-sans">Check-out</label>
            <input type="date" name="checkOut" required className="bg-transparent border-b border-silver/20 px-0 py-2 text-silver focus:outline-none focus:border-gold transition-colors font-sans text-sm [color-scheme:dark]" />
          </div>

          <div className="md:col-span-2">
            <select name="suite" required className="w-full bg-transparent border-b border-silver/20 px-0 py-4 text-silver focus:outline-none focus:border-gold transition-colors font-sans text-sm appearance-none cursor-pointer">
              <option value="" className="bg-charcoal text-silver">Select a Signature Suite</option>
              <option value="The Royal Pavilion" className="bg-charcoal text-silver">The Royal Pavilion</option>
              <option value="Heritage Suite" className="bg-charcoal text-silver">Heritage Suite</option>
              <option value="The Horizon Villa" className="bg-charcoal text-silver">The Horizon Villa</option>
              <option value="Presidential Retreat" className="bg-charcoal text-silver">Presidential Retreat</option>
            </select>
          </div>

          <div className="md:col-span-2 mt-4 flex flex-col items-center">
            <button type="submit" disabled={status === "loading"} className="border border-gold text-gold px-12 py-4 text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-obsidian transition-all duration-300 disabled:opacity-50">
              {status === "loading" ? "Processing..." : "Confirm Reservation"}
            </button>

            {status === "success" && (
              <p className="text-green-400 font-sans text-xs tracking-wider uppercase mt-6 text-center">
                Reservation Request Submitted. <br/> Our concierge will contact you shortly to confirm details.
              </p>
            )}
            {status === "error" && <p className="text-red-400 font-sans text-xs tracking-wider uppercase mt-6">{errorMessage}</p>}
          </div>

        </form>
      </div>
    </section>
  );
}