import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ffffff]/80 py-32 px-6 md:px-12 lg:px-24 font-sans selection:bg-[#c5a358] selection:text-black">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 border-b border-[#c5a358]/20 pb-12 text-center md:text-left">
          <span className="text-[#c5a358] tracking-[0.4em] uppercase text-[10px] mb-4 block font-medium">
            Service Framework
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#ffffff] leading-tight mb-4">
            Terms of <span className="text-[#c5a358] italic font-light">Service</span>
          </h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#ffffff]/40">
            Effective Date: April 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-16 text-sm leading-relaxed tracking-wide">
          
          <section>
            <h2 className="text-[#c5a358] uppercase tracking-[0.3em] text-xs mb-6 font-semibold border-l-2 border-[#c5a358] pl-4">
              01. The Agreement
            </h2>
            <p>
              By accessing the Swarn Srinkhla digital portal and securing a reservation, you enter into a formal agreement with our establishment. These terms govern your use of our platform and the standard of conduct expected within our sanctuary.
            </p>
          </section>

          <section>
            <h2 className="text-[#c5a358] uppercase tracking-[0.3em] text-xs mb-6 font-semibold border-l-2 border-[#c5a358] pl-4">
              02. Reservation & Confirmation
            </h2>
            <p className="mb-4">
              All digital bookings made through this platform are considered <strong>Requests for Reservation</strong> until formally confirmed by our concierge team.
            </p>
            <ul className="list-none space-y-4 text-[#ffffff]/60 italic">
              <li>• We reserve the right to decline any booking request due to availability or maintenance schedules.</li>
              <li>• Guests must provide valid contact information to receive their confirmation and check-in instructions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#c5a358] uppercase tracking-[0.3em] text-xs mb-6 font-semibold border-l-2 border-[#c5a358] pl-4">
              03. Cancellation & No-Show
            </h2>
            <p>
              Luxury requires preparation. Cancellations made within 48 hours of the scheduled arrival may be subject to a sanctuary preparation fee. Specific suite-level cancellation policies will be outlined in your final confirmation dossier.
            </p>
          </section>

          <section>
            <h2 className="text-[#c5a358] uppercase tracking-[0.3em] text-xs mb-6 font-semibold border-l-2 border-[#c5a358] pl-4">
              04. Conduct & Experience
            </h2>
            <p>
              Swarn Srinkhla is a space of tranquility. We expect all guests to respect the privacy and peace of fellow residents. Any conduct that disrupts the "Symphony of Gold" may result in the termination of stay without a refund.
            </p>
          </section>

          <section>
            <h2 className="text-[#c5a358] uppercase tracking-[0.3em] text-xs mb-6 font-semibold border-l-2 border-[#c5a358] pl-4">
              05. Liability
            </h2>
            <p>
              While we utilize modern security (Prisma 7 & Auth.js) to protect your digital data, we are not liable for external disruptions beyond our digital concierge's control. Physical liability during your stay is governed by the laws of Jharkhand, India.
            </p>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="mt-24 pt-12 border-t border-[#c5a358]/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-[#c5a358] hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/privacy" className="text-[10px] tracking-[0.3em] uppercase text-[#c5a358]/60 hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
          <p className="text-[9px] text-[#ffffff]/20 uppercase tracking-[0.3em]">
            © 2026 Swarn Srinkhla • Ranchi, India
          </p>
        </div>

      </div>
    </main>
  );
}