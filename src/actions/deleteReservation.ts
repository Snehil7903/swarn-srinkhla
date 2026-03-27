"use server"; // Move this to line 1

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteReservation(formData: FormData) {
  const id = formData.get("id") as string;
  
  if (!id) return;

  try {
    await prisma.reservation.delete({
      where: { id },
    });
    
    revalidatePath("/admin");
  } catch (error) {
    console.error("Delete failed:", error);
  }
}