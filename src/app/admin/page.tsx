import { prisma } from "@/lib/prisma";
import { updateReservationStatus } from "@/actions/updateStatus";
import Link from "next/link";
import type { Reservation, Guest, Suite } from "../../generated/prisma";

// Define the combined type so TypeScript knows 'res' has .guest and .suite
type ReservationWithDetails = Reservation & {
  guest: Guest;
  suite: Suite;
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch reservations with related data
  const reservations = (await prisma.reservation.findMany({
    include: {
      guest: true,
      suite: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })) as ReservationWithDetails[];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] py-24 px-6 md:px-12 lg:px-24 font-sans selection:bg-[#c5a358] selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#c5a358]/20 pb-8 gap-6">
          <div>
            <span className="text-[#c5a358] tracking-[0.4em] uppercase text-[10px] mb-3 block font-medium">
              Internal Concierge Portal
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#ffffff] leading-tight">
              Booking <span className="text-[#c5a358] italic font-light">Management</span>
            </h1>
          </div>
          <Link 
            href="/" 
            className="text-[10px] tracking-[0.2em] uppercase hover:bg-[#c5a358] hover:text-black transition-all duration-500 border border-[#c5a358]/40 px-6 py-3"
          >
            Return to Site
          </Link>
        </div>

        {/* Dashboard Table Container */}
        <div className="bg-[#141414] border border-[#c5a358]/10 shadow-2xl overflow-hidden rounded-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#c5a358]/20 text-[10px] tracking-[0.25em] uppercase text-[#c5a358]/60 bg-[#0f0f0f]">
                  <th className="p-8 font-semibold">Guest Details</th>
                  <th className="p-8 font-semibold">Suite</th>
                  <th className="p-8 font-semibold">Stay Period</th>
                  <th className="p-8 font-semibold">Amount</th>
                  <th className="p-8 font-semibold">Status</th>
                  <th className="p-8 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ffffff]/5">
                {reservations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-20 text-center text-[#ffffff]/30 text-sm italic tracking-widest">
                      No active reservations found in the archives.
                    </td>
                  </tr>
                ) : (
                  reservations.map((res: ReservationWithDetails) => (
                    <tr key={res.id} className="group hover:bg-[#ffffff]/[0.02] transition-all duration-300">
                      
                      {/* Guest Column */}
                      <td className="p-8">
                        <p className="font-serif text-lg text-[#ffffff] group-hover:text-[#c5a358] transition-colors">
                          {res.guest.name}
                        </p>
                        <p className="text-[11px] text-[#ffffff]/40 mt-1 uppercase tracking-tighter">
                          {res.guest.email}
                        </p>
                      </td>
                      
                      {/* Suite Column */}
                      <td className="p-8 text-sm font-light tracking-wide text-[#ffffff]/80 uppercase">
                        {res.suite.name}
                      </td>
                      
                      {/* Dates Column */}
                      <td className="p-8 text-[12px]">
                        <p className="text-[#ffffff]/90 tracking-widest uppercase">
                          {new Date(res.checkIn).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-[#ffffff]/30 mt-1 uppercase text-[10px]">
                          to {new Date(res.checkOut).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </td>
                      
                      {/* Price Column */}
                      <td className="p-8 text-sm tracking-[0.1em] font-medium">
                        ₹{(res.totalPrice / 100).toLocaleString('en-IN')}
                      </td>
                      
                      {/* Status Column */}
                      <td className="p-8">
                        <span className={`text-[9px] tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border transition-all duration-500 ${
                          res.status === "CONFIRMED" 
                            ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                            : "border-[#c5a358]/40 text-[#c5a358] bg-[#c5a358]/5"
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      
                      {/* Actions Column */}
                      <td className="p-8 text-right">
                        {res.status === "PENDING" ? (
                          <form action={updateReservationStatus}>
                            <input type="hidden" name="id" value={res.id} />
                            <button 
                              type="submit" 
                              className="text-[10px] tracking-[0.2em] uppercase border border-[#c5a358] text-[#c5a358] px-5 py-2 hover:bg-[#c5a358] hover:text-black transition-all duration-300 active:scale-95"
                            >
                              Confirm
                            </button>
                          </form>
                        ) : (
                          <div className="flex items-center justify-end gap-2 text-[#ffffff]/20">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[9px] uppercase tracking-widest">Locked</span>
                          </div>
                        )}
                      </td>
                      
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-[9px] text-[#ffffff]/20 uppercase tracking-[0.4em]">
          Secure Administrative Session • Swarn Srinkhla Resorts
        </p>

      </div>
    </main>
  );
}