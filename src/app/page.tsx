import Hero from "@/components/Hero";
import About from "@/components/About";
import Suites from "@/components/Suites";
import Dining from "@/components/Dining";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Reserve from "@/components/Reserve";

export default function Home() {
  return (
    <main className="bg-obsidian min-h-screen">
      <Hero />
      <About />
      <Suites />
      <Dining />  
      <Gallery />
      <Reserve/>
      <Contact />
      <Footer />
    </main>
  );
}