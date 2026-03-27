"use server";

import { prisma } from "@/lib/prisma";

export async function bookSuite(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const checkIn = new Date(formData.get("checkIn") as string);
  const checkOut = new Date(formData.get("checkOut") as string);
  const suiteName = formData.get("suite") as string; // We get the suite name from the dropdown

  if (!name || !email || !checkIn || !checkOut || !suiteName) {
    return { error: "Please complete all fields to secure your reservation." };
  }

  try {
    // 1. Find the exact Suite the user selected
    const suite = await prisma.suite.findFirst({
      where: { name: suiteName }
    });

    if (!suite) {
      return { error: "Selected suite is currently unavailable." };
    }

    // 2. Find or Create the Guest profile
    let guest = await prisma.guest.findUnique({ where: { email } });
    if (!guest) {
      guest = await prisma.guest.create({
        data: { name, email },
      });
    }

    // 3. Calculate total nights and price
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (nights <= 0) {
      return { error: "Check-out date must be after check-in date." };
    }

    const totalPrice = suite.pricePerNight * nights;

    // 4. Create the official Reservation
    const reservation = await prisma.reservation.create({
      data: {
        checkIn,
        checkOut,
        totalPrice,
        guestId: guest.id,
        suiteId: suite.id,
      },
    });

    return { success: true, reservationId: reservation.id };
  } catch (error) {
    console.error("Booking Error:", error);
    return { error: "Our system encountered an error. Please try again." };
  }
}