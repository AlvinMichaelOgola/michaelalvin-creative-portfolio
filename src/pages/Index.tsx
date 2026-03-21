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
