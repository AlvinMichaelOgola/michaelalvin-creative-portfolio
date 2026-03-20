import { useState } from "react";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import VideoTheater from "@/components/VideoTheater";
import GearVault from "@/components/GearVault";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
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
