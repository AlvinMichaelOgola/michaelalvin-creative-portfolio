import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import VideoTheater from "@/components/VideoTheater";
import GearVault from "@/components/GearVault";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (contactOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [contactOpen]);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden relative">
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-foreground/10 blur-3xl" />
        <div className="absolute top-[35%] -left-24 h-64 w-64 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-foreground/10 blur-3xl" />
      </div>
      <ThemeToggle />
      <Hero onContactClick={() => setContactOpen(true)} />
      <Gallery />
      <VideoTheater />
      <GearVault />
      <Footer onContactClick={() => setContactOpen(true)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Index;
