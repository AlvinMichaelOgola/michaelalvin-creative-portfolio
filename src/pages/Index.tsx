import { lazy, Suspense, useState, useEffect } from "react";
import Hero from "@/components/Hero";
import ThemeToggle from "@/components/ThemeToggle";
import type { HeroContent, PortfolioContent } from "@/lib/cms-content";
import heroPortrait from "@/assets/hero-portrait.jpg";

const HERO_CACHE_KEY = "portfolio.hero.content.v1";
const PORTFOLIO_CACHE_KEY = "portfolio.cms.content.v1";
const HARDCODED_HERO_CONTENT: HeroContent = {
  title: "Michael Alvin",
  subtitle: "COMMERCIAL • PORTRAIT • ADVENTURE • FILM",
  description: "Visual stories crafted with intention, precision, and style.",
  ctaText: "Let’s Work Together",
  portraitUrl: heroPortrait,
};
const Gallery = lazy(() => import("@/components/Gallery"));
const VideoTheater = lazy(() => import("@/components/VideoTheater"));
const GearVault = lazy(() => import("@/components/GearVault"));
const Footer = lazy(() => import("@/components/Footer"));
const ContactModal = lazy(() => import("@/components/ContactModal"));

function readCachedHeroContent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(HERO_CACHE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as HeroContent | null;
  } catch {
    return null;
  }
}

function writeCachedHeroContent(hero: HeroContent | null) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(HERO_CACHE_KEY, JSON.stringify(hero));
  } catch {
    // Ignore storage write failures to keep runtime resilient.
  }
}

function readCachedPortfolioContent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(PORTFOLIO_CACHE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as PortfolioContent | null;
  } catch {
    return null;
  }
}

function writeCachedPortfolioContent(content: PortfolioContent | null) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PORTFOLIO_CACHE_KEY, JSON.stringify(content));
  } catch {
    // Ignore storage write failures to keep runtime resilient.
  }
}

function getInitialHeroContent() {
  return readCachedHeroContent() ?? readCachedPortfolioContent()?.hero ?? HARDCODED_HERO_CONTENT;
}

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [cmsContent, setCmsContent] = useState<PortfolioContent | null>(readCachedPortfolioContent);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(getInitialHeroContent);

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

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const { fetchPortfolioContent } = await import("@/lib/cms-content");
        const content = await fetchPortfolioContent();
        if (!mounted) {
          return;
        }
        setCmsContent(content);
        setHeroContent(content.hero ?? HARDCODED_HERO_CONTENT);
        writeCachedPortfolioContent(content);
        writeCachedHeroContent(content.hero);
      } catch (error) {
        console.error(error);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const title =
      cmsContent?.siteSettings.seo.defaultTitle ||
      cmsContent?.siteSettings.brand.siteName;
    if (!title) {
      return;
    }
    document.title = title;
  }, [cmsContent]);

  useEffect(() => {
    const description =
      cmsContent?.siteSettings.seo.defaultDescription ||
      cmsContent?.siteSettings.brand.tagline;
    if (!description) {
      return;
    }

    let meta = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [cmsContent]);

  useEffect(() => {
    const siteName = cmsContent?.siteSettings.brand.siteName;
    if (!siteName) {
      return;
    }

    let meta = document.querySelector(
      'meta[name="application-name"]',
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "application-name";
      document.head.appendChild(meta);
    }
    meta.content = siteName;
  }, [cmsContent]);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden relative">
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-foreground/10 blur-3xl" />
        <div className="absolute top-[35%] -left-24 h-64 w-64 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-foreground/10 blur-3xl" />
      </div>
      <ThemeToggle />
      <Hero
        onContactClick={() => setContactOpen(true)}
        content={heroContent ?? cmsContent?.hero}
      />
      <Suspense fallback={null}>
        <Gallery
          items={cmsContent?.gallery}
          categories={cmsContent?.galleryCategories}
        />
        <VideoTheater videos={cmsContent?.videos} />
        <GearVault gear={cmsContent?.gear} />
        <Footer
          onContactClick={() => setContactOpen(true)}
          content={cmsContent?.footer}
        />
      </Suspense>
      {contactOpen ? (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={contactOpen}
            onClose={() => setContactOpen(false)}
            contact={cmsContent?.siteSettings.contact}
            social={cmsContent?.siteSettings.social}
          />
        </Suspense>
      ) : null}
    </div>
  );
};

export default Index;
