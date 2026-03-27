"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// We explicitly tell TypeScript this function returns nothing (Promise<void>)
export async function updateReservationStatus(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  
  if (!id) {
    console.error("Reservation ID missing");
    return;
  }

  try {
    await prisma.reservation.update({
      where: { id },
      data: { status: "CONFIRMED" },
    });

    // This refreshes the /admin page automatically, so we don't need to return anything else
    revalidatePath("/admin"); 
  } catch (error) {
    console.error("Failed to update reservation:", error);
  }
}