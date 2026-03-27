import { prisma } from "@/lib/prisma";
import { updateReservationStatus } from "@/actions/updateStatus";
import Link from "next/link";
import type { Reservation, Guest, Suite } from "@prisma/client";
import LogoutButton from "@/components/LogoutButton";
import DeleteButton from "@/components/DeleteButton"; // Import the new button

type ReservationWithDetails = Reservation & {
  guest: Guest;
  suite: Suite;
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
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
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#c5a358]/20 pb-8 gap-6">
          <div>
            <span className="text-[#c5a358] tracking-[0.4em] uppercase text-[10px] mb-3 block font-medium">
              Internal Concierge Portal
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#ffffff] leading-tight">
              Booking <span className="text-[#c5a358] italic font-light">Management</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <LogoutButton />
            <Link 
              href="/" 
              className="text-[10px] tracking-[0.2em] uppercase hover:bg-[#c5a358] hover:text-black transition-all duration-500 border border-[#c5a358]/40 px-6 py-3"
            >
              Return to Site
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#141414] border border-[#c5a358]/10 shadow-2xl overflow-hidden rounded-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#c5a358]/20 text-[10px] tracking-[0.25em] uppercase text-[#c5a358]/60 bg-[#0f0f0f]">
                  <th className="p-8 font-semibold">Guest Details</th>
                  <th className="p-8 font-semibold">Suite</th>
                  <th className="p-8 font-semibold">Stay Period</th>
                  <th className="p-8 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ffffff]/5">
                {reservations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-20 text-center text-[#ffffff]/30 text-sm italic tracking-widest">
                      No active reservations found.
                    </td>
                  </tr>
                ) : (
                  reservations.map((res: ReservationWithDetails) => (
                    <tr key={res.id} className="group hover:bg-[#ffffff]/[0.02] transition-all duration-300">
                      <td className="p-8">
                        <p className="font-serif text-lg text-[#ffffff] group-hover:text-[#c5a358] transition-colors">{res.guest.name}</p>
                        <p className="text-[11px] text-[#ffffff]/40 mt-1 uppercase tracking-tighter">{res.guest.email}</p>
                      </td>
                      <td className="p-8 text-sm font-light tracking-wide text-[#ffffff]/80 uppercase">{res.suite.name}</td>
                      <td className="p-8 text-[12px]">
                        <p className="text-[#ffffff]/90 tracking-widest uppercase">
                          {new Date(res.checkIn).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-[#ffffff]/30 mt-1 uppercase text-[10px]">
                          to {new Date(res.checkOut).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </td>
                      <td className="p-8 text-right">
                        <div className="flex items-center justify-end gap-6">
                          {res.status === "PENDING" ? (
                            <form action={updateReservationStatus}>
                              <input type="hidden" name="id" value={res.id} />
                              <button type="submit" className="text-[10px] tracking-[0.2em] uppercase border border-[#c5a358] text-[#c5a358] px-5 py-2 hover:bg-[#c5a358] hover:text-black transition-all duration-300 active:scale-95">
                                Confirm
                              </button>
                            </form>
                          ) : (
                            <div className="flex items-center justify-end gap-2 text-[#ffffff]/20">
                              <span className="text-[9px] uppercase tracking-widest">Locked</span>
                            </div>
                          )}

                          {/* Modular Delete Button Integration */}
                          <DeleteButton id={res.id} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}