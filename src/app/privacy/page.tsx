import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ffffff]/80 py-32 px-6 md:px-12 lg:px-24 font-sans selection:bg-[#c5a358] selection:text-black">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 border-b border-[#c5a358]/20 pb-12">
          <span className="text-[#c5a358] tracking-[0.4em] uppercase text-[10px] mb-4 block font-medium">
            Legal Transparency
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#ffffff] leading-tight mb-4">
            Privacy <span className="text-[#c5a358] italic font-light">Policy</span>
          </h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#ffffff]/40">
            Last Updated: April 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 text-sm leading-relaxed tracking-wide">
          
          <section>
            <h2 className="text-[#c5a358] uppercase tracking-[0.2em] text-xs mb-4 font-semibold">
              01. Commitment to Privacy
            </h2>
            <p>
              At Swarn Srinkhla, we treat your personal data with the same level of care we provide during your stay. This policy outlines how we collect, protect, and utilize the information you entrust to us through our digital concierge platform.
            </p>
          </section>

          <section>
            <h2 className="text-[#c5a358] uppercase tracking-[0.2em] text-xs mb-4 font-semibold">
              02. Data Collection
            </h2>
            <p className="mb-4">
              When you reserve a suite, we collect specific identifiers necessary to facilitate your luxury experience:
            </p>
            <ul className="list-none space-y-2 border-l border-[#c5a358]/20 pl-6">
              <li><span className="text-white">Personal Identifiers:</span> Name and email address.</li>
              <li><span className="text-white">Stay Details:</span> Selected suites, check-in/out dates, and reservation status.</li>
              <li><span className="text-white">Technical Data:</span> IP addresses and browser cookies used for secure authentication via Auth.js.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#c5a358] uppercase tracking-[0.2em] text-xs mb-4 font-semibold">
              03. Purpose of Processing
            </h2>
            <p>
              Your data is utilized exclusively to manage your bookings, communicate reservation updates via Resend, and provide secure access to our administrative portals. We do not sell, trade, or lease your personal information to third-party marketing entities.
            </p>
          </section>

          <section>
            <h2 className="text-[#c5a358] uppercase tracking-[0.2em] text-xs mb-4 font-semibold">
              04. Data Security & Storage
            </h2>
            <p>
              Our infrastructure is built on Vercel and Prisma 7, utilizing industry-standard encryption to protect your records. Administrative access is restricted to authorized personnel via secure, encrypted authentication protocols.
            </p>
          </section>

          <section>
            <h2 className="text-[#c5a358] uppercase tracking-[0.2em] text-xs mb-4 font-semibold">
              05. Your Rights
            </h2>
            <p>
              You maintain the right to access, rectify, or request the deletion of your personal data from our archives. For such requests, or to inquire about our data practices, please contact our concierge team.
            </p>
          </section>

        </div>

        {/* Footer Link */}
        <div className="mt-20 pt-12 border-t border-[#c5a358]/10 flex justify-between items-center">
          <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-[#c5a358] hover:text-white transition-colors">
            ← Return to Sanctuary
          </Link>
          <p className="text-[9px] text-[#ffffff]/20 uppercase tracking-[0.2em]">
            © 2026 Swarn Srinkhla Resorts
          </p>
        </div>

      </div>
    </main>
  );
}