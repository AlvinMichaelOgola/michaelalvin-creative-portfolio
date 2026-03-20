import { motion } from "framer-motion";
import heroPortrait from "@/assets/hero-portrait.jpg";

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <section className="min-h-screen section-padding flex items-center py-24">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Portrait */}
          <motion.div
            className="lg:col-span-5 order-1"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <img
                src={heroPortrait}
                alt="Alvin Michael — visual storyteller based in Nairobi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7 order-2 flex flex-col justify-center">
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] text-foreground"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Alvin
              <br />
              Michael.
            </motion.h1>

            <motion.p
              className="mt-6 text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground font-medium"
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Visual Storyteller.
            </motion.p>

            <motion.p
              className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Crafting narrative-driven imagery across commercial, portrait, and
              adventure photography. Based in Nairobi, working worldwide — every
              frame tells the story you didn't know you needed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={onContactClick}
                className="pill-button mt-10 inline-flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Contact Me
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
