import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useState, useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import heroPortrait from "@/assets/hero-portrait.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import { ArrowRight } from "lucide-react";
import { imageSrcSet } from "@/lib/responsive-image";

const MARQUEE_TEXT = "COMMERCIAL • PORTRAIT • ADVENTURE • FILM • ";

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isHovering, setIsHovering] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  return (
    <section id="hero" className="md:min-h-screen section-padding flex items-center justify-center pt-24 pb-16 md:py-24 relative overflow-hidden">
      {/* Teal radial glow behind content (mobile only) */}
      {isMobile && !reducedMotion && (
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "60%",
            background: "radial-gradient(ellipse at center, hsla(168, 40%, 40%, 0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      )}

      <div className="w-full max-w-3xl mx-auto relative z-20 flex flex-col items-center text-center">
        <nav aria-label="Section navigation" className="mb-8 flex items-center justify-center text-sm text-muted-foreground">
          <a href="#gallery" className="inline-flex min-h-11 items-center rounded-full px-3 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
            Work
          </a>
          <span aria-hidden="true">·</span>
          <a href="#video" className="inline-flex min-h-11 items-center rounded-full px-3 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
            Film
          </a>
          <span aria-hidden="true">·</span>
          <button type="button" onClick={onContactClick} className="inline-flex min-h-11 items-center rounded-full px-3 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
            Contact
          </button>
        </nav>
        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[0.9]"
          initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 20, filter: isMobile ? "none" : "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-foreground">Michael</span>
          <br />
          <span className="outline-text">Alvin.</span>
        </motion.h1>

        {/* Portrait — 3D tilt */}
        <motion.div
          ref={imgRef}
          className="mt-6 md:mt-10 w-full max-w-[15rem] md:max-w-md"
          style={{ perspective: 800 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
          initial={reducedMotion ? false : { opacity: 0, scale: isMobile ? 1 : 0.95, filter: isMobile ? "none" : "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="relative aspect-[3/4] rounded-3xl overflow-hidden transition-shadow duration-500"
            style={{
              rotateX: isMobile || reducedMotion ? 0 : rotateX,
              rotateY: isMobile || reducedMotion ? 0 : rotateY,
              boxShadow: isHovering
                ? "0 30px 60px -15px rgba(0,0,0,0.6)"
                : "0 15px 30px -10px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src={heroPortrait[1].src}
              srcSet={imageSrcSet(heroPortrait)}
              sizes="(min-width: 768px) 448px, 240px"
              width={heroPortrait[0].width}
              height={heroPortrait[0].height}
              fetchPriority="high"
              alt="Alvin Michael — visual storyteller based in Nairobi"
              className="w-full h-full object-cover"
            />
            {isMobile && (
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            )}
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-sm md:text-base uppercase tracking-[0.3em] font-medium text-accent-teal"
          initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 16, filter: isMobile ? "none" : "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Visual Storyteller.
        </motion.p>

        {/* Body */}
        <motion.p
          className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
          initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 16, filter: isMobile ? "none" : "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Crafting narrative-driven imagery across commercial, portrait, and
          adventure photography. Based in Nairobi, working worldwide — every
          frame tells the story you didn't know you needed.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={onContactClick}
            className="hero-cta-contrast group min-h-11 inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "hsl(142, 71%, 45%)" }}
            />
            Contact Me
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <a
            href="#gallery"
            className="hero-cta min-h-11 inline-flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            View My Work
          </a>
        </motion.div>
      </div>

      {/* Scrolling marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden py-4">
        <div className="hero-marquee whitespace-nowrap text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-foreground/10">
          <span className="inline-block hero-marquee-track">
            {MARQUEE_TEXT.repeat(12)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
