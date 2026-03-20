import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import commercial1 from "@/assets/gallery-commercial-1.jpg";
import commercial2 from "@/assets/gallery-commercial-2.jpg";
import portrait1 from "@/assets/gallery-portrait-1.jpg";
import portrait2 from "@/assets/gallery-portrait-2.jpg";
import automotive1 from "@/assets/gallery-automotive-1.jpg";
import automotive2 from "@/assets/gallery-automotive-2.jpg";
import adventure1 from "@/assets/gallery-adventure-1.jpg";
import creative1 from "@/assets/gallery-creative-1.jpg";

type Category = "All" | "Commercial" | "Portrait" | "Automotive" | "Adventure" | "Creative";

interface GalleryItem {
  src: string;
  alt: string;
  category: Exclude<Category, "All">;
  tall?: boolean;
}

const items: GalleryItem[] = [
  { src: commercial1, alt: "Commercial editorial fashion", category: "Commercial", tall: true },
  { src: portrait1, alt: "Window-lit portrait", category: "Portrait" },
  { src: automotive1, alt: "Luxury sports car at dusk", category: "Automotive" },
  { src: adventure1, alt: "Mountain cliff silhouette", category: "Adventure" },
  { src: creative1, alt: "Double exposure cityscape", category: "Creative", tall: true },
  { src: portrait2, alt: "Elder portrait close-up", category: "Portrait", tall: true },
  { src: commercial2, alt: "Luxury watch product shot", category: "Commercial" },
  { src: automotive2, alt: "Vintage chrome detail", category: "Automotive", tall: true },
];

const categories: Category[] = ["All", "Commercial", "Portrait", "Automotive", "Adventure", "Creative"];

const Gallery = () => {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section className="section-padding py-32" id="gallery">
      {/* Section Title */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Selected Work</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">The Gallery</h2>
      </motion.div>

      {/* Filter Pills */}
      <motion.div
        className="flex flex-wrap gap-2 mb-12"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              active === cat
                ? "bg-foreground text-background"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.src}
              layout
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setLightbox(item.src)}
            >
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-xs uppercase tracking-widest text-foreground/80 font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" />
            <motion.img
              src={lightbox}
              alt="Expanded view"
              className="relative max-w-full max-h-[90vh] object-contain rounded-3xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
