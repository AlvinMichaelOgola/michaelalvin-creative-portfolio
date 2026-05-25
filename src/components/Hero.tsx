import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { ArrowRight } from "lucide-react";

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
  return (
    <section
      id="hero"
      className="h-[100svh] min-h-[100svh] md:h-screen section-padding flex items-center justify-center relative overflow-hidden pt-4 pb-16 md:pt-6 md:pb-16"
    >
      {/* Teal radial glow behind content (mobile only) */}
      {isMobile && (
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

      <div className="w-full max-w-3xl mx-auto relative z-20 flex max-h-full flex-col items-center overflow-hidden text-center glass-panel px-5 py-6 md:px-8 md:py-8">
        {/* Name */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9]"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-foreground whitespace-nowrap">Michael Alvin.</span>
        </motion.h1>

        {/* Portrait — 3D tilt */}
        <motion.div
          ref={imgRef}
          className="mt-4 md:mt-6 w-full max-w-[min(68vw,16rem)] md:max-w-[16rem] lg:max-w-[18rem]"
          style={{ perspective: 800 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="relative rounded-3xl overflow-hidden transition-shadow duration-500 glass-frame"
            style={{
              rotateX,
              rotateY,
              boxShadow: isHovering
                ? "0 30px 60px -15px rgba(0,0,0,0.6)"
                : "0 15px 30px -10px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src={heroPortrait}
              alt="Alvin Michael — visual storyteller based in Nairobi"
              className="block w-full h-auto"
            />
            {isMobile && (
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            )}
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-4 md:mt-5 text-[11px] md:text-sm uppercase tracking-[0.3em] font-medium text-accent-teal"
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Visual Storyteller.
        </motion.p>

        {/* Body */}
        <motion.p
          className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md"
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Crafting narrative-driven imagery across commercial, portrait, and
          adventure photography. Based in Nairobi, working worldwide — every
          frame tells the story you didn't know you needed.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={onContactClick}
            className="hero-cta-contrast group mt-5 md:mt-6 inline-flex items-center gap-2"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "hsl(142, 71%, 45%)" }}
            />
            Contact Me
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* Scrolling marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden py-3">
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
