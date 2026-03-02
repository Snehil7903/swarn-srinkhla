import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor"; // <-- Import the cursor

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Swarn Srinkhla | Luxury Resort",
  description: "Experience modern elegance and heritage luxury.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-obsidian`}>
        <SmoothScroll>
          {/* <Cursor /> <-- Add it here */}
          <Navbar /> 
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}