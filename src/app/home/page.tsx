import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { VisitSection } from "@/components/VisitSection";
import { ChatWidget } from "@/components/ChatWidget";
import { TrackerSection } from "@/components/TrackerSection";
import { TablesSection } from "@/components/TablesSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrackerSection />
      <MenuSection />
      <TablesSection />
      <VisitSection />
      <ChatWidget />
      <footer className="bg-coffee-brown text-cream py-12 px-6 text-center font-mono border-t-8 border-mustard-yellow">
        <p>&copy; 1978 Retro Cafe. Brewing memories daily.</p>
        <p className="mt-2 text-xs opacity-50 uppercase tracking-[0.2em]">Crafted with love and caffeine</p>
      </footer>
    </main>
  );
}
