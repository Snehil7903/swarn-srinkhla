import { prisma } from "@/lib/prisma";
import { updateReservationStatus } from "@/actions/updateStatus";
import Link from "next/link";

// Force Next.js to dynamically render this page so it always shows fresh data
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // 1. Fetch all reservations, including the linked Guest and Suite data
  const reservations = await prisma.reservation.findMany({
    include: {
      guest: true,
      suite: true,
    },
    orderBy: {
      createdAt: "desc", // Show newest reservations first
    },
  });

  return (
    <main className="min-h-screen bg-obsidian text-silver py-24 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b border-gold/20 pb-6">
          <div>
            <span className="text-gold tracking-[0.3em] uppercase text-xs mb-2 block">
              Internal Portal
            </span>
            <h1 className="text-4xl font-serif text-silver">
              Concierge <span className="text-gold italic">Dashboard</span>
            </h1>
          </div>
          <Link href="/" className="text-xs tracking-widest uppercase hover:text-gold transition-colors border border-silver/20 px-4 py-2 hover:border-gold">
            Back to Site
          </Link>
        </div>

        {/* Data Table */}
        <div className="bg-charcoal/40 border border-gold/10 backdrop-blur-md overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gold/20 text-xs tracking-widest uppercase text-silver/50 bg-obsidian/50">
                <th className="p-6 font-normal">Guest</th>
                <th className="p-6 font-normal">Suite</th>
                <th className="p-6 font-normal">Dates</th>
                <th className="p-6 font-normal">Total</th>
                <th className="p-6 font-normal">Status</th>
                <th className="p-6 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-silver/50 text-sm">
                    No reservations found.
                  </td>
                </tr>
              ) : (
                reservations.map((res) => (
                  <tr key={res.id} className="border-b border-silver/5 hover:bg-silver/5 transition-colors">
                    
                    <td className="p-6">
                      <p className="font-medium text-silver">{res.guest.name}</p>
                      <p className="text-xs text-silver/50 mt-1">{res.guest.email}</p>
                    </td>
                    
                    <td className="p-6 text-sm">{res.suite.name}</td>
                    
                    <td className="p-6 text-sm">
                      <p>{res.checkIn.toLocaleDateString()}</p>
                      <p className="text-xs text-silver/50 mt-1">to {res.checkOut.toLocaleDateString()}</p>
                    </td>
                    
                    {/* Format the cents back into standard currency format */}
                    <td className="p-6 text-sm tracking-wider">
                      ₹{(res.totalPrice / 100).toLocaleString()}
                    </td>
                    
                    <td className="p-6">
                      <span className={`text-xs tracking-widest uppercase px-3 py-1 rounded-full border ${
                        res.status === "CONFIRMED" 
                          ? "border-green-500/30 text-green-400 bg-green-500/10" 
                          : "border-gold/30 text-gold bg-gold/10"
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    
                    <td className="p-6 text-right">
                      {res.status === "PENDING" ? (
                        <form action={updateReservationStatus}>
                          <input type="hidden" name="id" value={res.id} />
                          <button 
                            type="submit" 
                            className="text-xs tracking-widest uppercase border border-gold text-gold px-4 py-2 hover:bg-gold hover:text-obsidian transition-colors"
                          >
                            Confirm
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-silver/30 uppercase tracking-widest">Locked</span>
                      )}
                    </td>
                    
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}