import { lazy, Suspense, useState, useEffect } from "react";
import Hero from "@/components/Hero";
import ThemeToggle from "@/components/ThemeToggle";
import type {
  FooterContent,
  GearContentItem,
  HeroContent,
  VideoContentItem,
} from "@/lib/cms-content";
import heroPortrait from "@/assets/hero-portrait.jpg";

const HARDCODED_HERO_CONTENT: HeroContent = {
  title: "Michael Alvin",
  subtitle: "COMMERCIAL • PORTRAIT • ADVENTURE • FILM",
  description: "Visual stories crafted with intention, precision, and style.",
  ctaText: "Let’s Work Together",
  portraitUrl: heroPortrait,
};
const LOCAL_VIDEOS: VideoContentItem[] = [
  { id: "orpul-film", youtubeId: "-NVZB0Aay0Y", title: "This Is Orpul: More Than a Gathering" },
];
const LOCAL_GEAR: GearContentItem[] = [
  { title: "Sony a7iii", subtitle: "85mm f/1.8, 50mm F1.8 and 24-70mm F2.8", desc: "Primary body for portraits, video & commercial work", order: 1 },
  { title: "Nikon D5300", subtitle: "18-55mm & 35mm", desc: "Backup & street photography", order: 2 },
  { title: "Continuous Lighting", subtitle: "Aputure 300d II", desc: "Studio & video lighting kit", order: 3 },
  { title: "iPhone 14", subtitle: "Versatile and handy on the go", desc: "Run-and-gun & behind the scenes", order: 4 },
  { title: "Nikon Z6III", subtitle: "Commercial Grade Video Production", desc: "Primary High Value Video Production Body", order: 5 },
  { title: "Adobe Lightroom", subtitle: "Photo Editing Software", desc: "Essential for post-production and color grading", order: 6 },
  { title: "Davinci Resolve", subtitle: "Video Editing Software", desc: "Professional video editing and color grading", order: 7 },
];
const LOCAL_FOOTER: FooterContent = {
  heading: "Let's Create Together",
  ctaText: "Let's Work Together",
  copyright: "© 2026 Michael Alvin. All rights reserved.",
};
const Gallery = lazy(() => import("@/components/Gallery"));
const VideoTheater = lazy(() => import("@/components/VideoTheater"));
const GearVault = lazy(() => import("@/components/GearVault"));
const Footer = lazy(() => import("@/components/Footer"));
const ContactModal = lazy(() => import("@/components/ContactModal"));

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
      <div className="boot-section boot-section--hero">
        <Hero
          onContactClick={() => setContactOpen(true)}
          content={HARDCODED_HERO_CONTENT}
        />
      </div>
      <Suspense fallback={null}>
        <div className="boot-section boot-section--gallery">
          <Gallery />
        </div>
        <div className="boot-section boot-section--video">
          <VideoTheater videos={LOCAL_VIDEOS} />
        </div>
        <div className="boot-section boot-section--gear">
          <GearVault gear={LOCAL_GEAR} />
        </div>
        <div className="boot-section boot-section--footer">
          <Footer
            onContactClick={() => setContactOpen(true)}
            content={LOCAL_FOOTER}
          />
        </div>
      </Suspense>
      {contactOpen ? (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={contactOpen}
            onClose={() => setContactOpen(false)}
            contact={{ email: "", phone: "+254 797 347 822" }}
            social={{ instagram: "", x: "", behance: "" }}
          />
        </Suspense>
      ) : null}
    </div>
  );
};

export default Index;
