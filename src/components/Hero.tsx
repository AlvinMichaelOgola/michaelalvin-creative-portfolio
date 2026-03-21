import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
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

  return (
    <section id="hero" className="min-h-screen section-padding flex items-center justify-center py-24 relative overflow-hidden">
      {/* Teal radial glow behind content */}
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

      <div className="w-full max-w-3xl mx-auto relative z-20 flex flex-col items-center text-center">
        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[0.9]"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-foreground">Alvin</span>
          <br />
          <span className="hero-outline-text">Michael.</span>
        </motion.h1>

        {/* Portrait — 3D tilt */}
        <motion.div
          ref={imgRef}
          className="mt-10 w-full max-w-md"
          style={{ perspective: 800 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="relative aspect-[3/4] rounded-3xl overflow-hidden transition-shadow duration-500"
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
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-sm md:text-base uppercase tracking-[0.3em] font-medium text-accent-teal"
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Visual Storyteller.
        </motion.p>

        {/* Body */}
        <motion.p
          className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
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
            className="hero-cta-contrast group mt-8 inline-flex items-center gap-2"
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
