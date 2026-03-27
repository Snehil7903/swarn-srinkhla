import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding database with Swarn Srinkhla Suites...");

  await prisma.suite.createMany({
    data: [
      {
        name: "The Royal Pavilion",
        description: "Panoramic views of the valley, featuring a private plunge pool.",
        pricePerNight: 120000, 
        maxOccupancy: 2,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop",
      },
      {
        name: "Heritage Suite",
        description: "Antique furnishings paired with uncompromising modern comfort.",
        pricePerNight: 85000, 
        maxOccupancy: 2,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop",
      },
      {
        name: "The Horizon Villa",
        description: "Secluded glass walls blur the line between nature and interior.",
        pricePerNight: 200000, 
        maxOccupancy: 4,
        image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2670&auto=format&fit=crop",
      },
      {
        name: "Presidential Retreat",
        description: "Unmatched grandeur designed for the ultimate quiet luxury.",
        pricePerNight: 350000, 
        maxOccupancy: 6,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop",
      }
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });