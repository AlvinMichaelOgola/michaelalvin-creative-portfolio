import { useState, useEffect, useCallback, useRef } from "react";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import VideoTheater from "@/components/VideoTheater";
import GearVault from "@/components/GearVault";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, hsla(181, 21%, 46%, 0.15), transparent 70%)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

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
      <div
        ref={spotlightRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />
      <div className="relative z-10">
        <Hero onContactClick={() => setContactOpen(true)} />
        <Gallery />
        <VideoTheater />
        <GearVault />
        <Footer onContactClick={() => setContactOpen(true)} />
      </div>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Index;
