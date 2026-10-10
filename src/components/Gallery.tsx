import { useState, useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { galleryImageSizes, imageSrcSet, type ResponsiveImage } from "@/lib/responsive-image";

import automotive_str1 from "@/assets/Automotive/strath_carshow/DSC_7676 (1).webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_str2 from "@/assets/Automotive/strath_carshow/DSC_7717.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_str3 from "@/assets/Automotive/strath_carshow/DSC_7720.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_str4 from "@/assets/Automotive/strath_carshow/DSC_7731.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_str5 from "@/assets/Automotive/strath_carshow/DSC_7752.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_str6 from "@/assets/Automotive/strath_carshow/DSC_7778.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";

import automotive_green1 from "@/assets/Automotive/green_vw/WhatsApp Image 2026-03-20 at 18.15.59 (1).webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_green2 from "@/assets/Automotive/green_vw/WhatsApp Image 2026-03-20 at 18.15.59 (2).webp";
import automotive_green3 from "@/assets/Automotive/green_vw/WhatsApp Image 2026-03-20 at 18.15.59 (3).webp";
import automotive_green4 from "@/assets/Automotive/green_vw/WhatsApp Image 2026-03-20 at 18.15.59.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";

import adventure1 from "@/assets/Adventure_photos/A7309381.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure2 from "@/assets/Adventure_photos/A7309388.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure3 from "@/assets/Adventure_photos/A7309402.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure4 from "@/assets/Adventure_photos/A7309437.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure5 from "@/assets/Adventure_photos/A7309466.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure6 from "@/assets/Adventure_photos/A7309543.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";

import creative1 from "@/assets/gallery-creative-1.jpg";

import Asalka1 from "@/assets/Product_photos/Asalka 1.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import Asalka2 from "@/assets/Product_photos/Asalka 2.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import Asalka3 from "@/assets/Product_photos/Asalka 3.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";

import ocean_sk1 from "@/assets/Nature/Ocean/DSC_7865.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import ocean_sk2 from "@/assets/Nature/Ocean/DSC_7869.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import ocean_sk3 from "@/assets/Nature/Ocean/DSC_7871.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import ocean_sk4 from "@/assets/Nature/Ocean/DSC_7884.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";

import portrait_aus1 from "@/assets/portraits/austin/DSC_8383.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portrait_aus2 from "@/assets/portraits/austin/DSC_8385 (1).webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portrait_aus3 from "@/assets/portraits/austin/DSC_8392.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portrait_aus4 from "@/assets/portraits/austin/DSC_8394.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";

import portrait_niisha_pr1 from "@/assets/portraits/hafsah and niisha/niisha_pr1.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portrait_niisha_pr2 from "@/assets/portraits/hafsah and niisha/niisha_pr2.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portrait_hafsah_pr1 from "@/assets/portraits/hafsah and niisha/hafsah_ptr1.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portrait_hafsah_pr2 from "@/assets/portraits/hafsah and niisha/hafsah_pr2.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";

import creative_hf1 from "@/assets/creative/hafsah/hafsah1.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creative_hf2 from "@/assets/creative/hafsah/hafsah2.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creative_hf3 from "@/assets/creative/hafsah/hafsah5.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";

import creative_gl1 from "@/assets/creative/glovis/DSC_6894.webp";
import creative_gl2 from "@/assets/creative/glovis/DSC_6896.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creative_gl3 from "@/assets/creative/glovis/DSC_6899.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creative_gl4 from "@/assets/creative/glovis/DSC_6901 (1).webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creative_gl5 from "@/assets/creative/glovis/DSC_6908.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";

import assignment_dn_1 from "@/assets/Assignments/dandora/DSC_8129.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment_dn_2 from "@/assets/Assignments/dandora/DSC_8131.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment_dn_3 from "@/assets/Assignments/dandora/DSC_8136.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment_dn_4 from "@/assets/Assignments/dandora/DSC_8174.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment_dn_5 from "@/assets/Assignments/dandora/DSC_8178.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment_dn_6 from "@/assets/Assignments/dandora/DSC_8188.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment_dn_7 from "@/assets/Assignments/dandora/DSC_8200.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment_dn_8 from "@/assets/Assignments/dandora/DSC_8214.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";






type Category = "All" | "Ocean" | "Portraits" | "Automotive" | "Adventure" | "Creative" | "Product" | "Assignments";

interface GalleryItem {
  src: ResponsiveImage[];
  alt: string;
  category: Exclude<Category, "All">;
  order?: number;
  tall?: boolean;
  width?: boolean;
}

const items: GalleryItem[] = [
  // Ocean
  { src: ocean_sk1, alt: "The Ocean, a boat and water", category: "Ocean", tall: true, order: 1 },
  { src: ocean_sk2, alt: "Close up of wave ripples", category: "Ocean", order: 2 },
  { src: ocean_sk3, alt: "The Ocean, cinematic view", category: "Ocean", order: 3 },
  { src: ocean_sk4, alt: "The Ocean, sunset view", category: "Ocean", order: 4 },

  { src: Asalka1, alt: "Asalka product shot", category: "Product", tall: true, order: 1 },
  { src: Asalka2, alt: "Asalka product shot", category: "Product", tall: true, order: 2 },
  { src: Asalka3, alt: "Asalka product shot", category: "Product", order: 3 },

  { src: automotive_str1, alt: "Luxury sports car at dusk", category: "Automotive", order: 1 },
  { src: automotive_str2, alt: "Vintage chrome detail", category: "Automotive", tall: true, order: 2 },
  { src: automotive_str3, alt: "Classic car front view", category: "Automotive", order: 3 },
  { src: automotive_str4, alt: "Car interior detail", category: "Automotive", order: 4 },
  { src: automotive_str5, alt: "Car engine close-up", category: "Automotive", order: 5 },
  { src: automotive_str6, alt: "Car at night", category: "Automotive", tall: true, order: 6 },
  // { src: automotive_green1, alt: "Green VW side", category: "Automotive", tall: true, order: 7 },
  // { src: automotive_green4, alt: "Green VW front", category: "Automotive", tall: true, order: 8 },

  // Adventure
  { src: adventure1, alt: "Mountain cliff silhouette", category: "Adventure", order: 1 },
  { src: adventure2, alt: "Hills", category: "Adventure", order: 2 },
  { src: adventure3, alt: "Plant close up", category: "Adventure", order: 3 },
  { src: adventure4, alt: "Girl walking in trail", category: "Adventure", order: 4 },
  { src: adventure5, alt: "Lone tree", category: "Adventure", tall: true, order: 5 },
  { src: adventure6, alt: "House on Hill", category: "Adventure", order: 6 },

  // Product (non-client items remain)

  // Creative
  { src: creative_hf1, alt: "Creative Hafsah shot", category: "Creative", tall: true, order: 1 },
  { src: creative_hf2, alt: "Creative Hafsah shot", category: "Creative", tall: true, order: 2 },
  { src: creative_hf3, alt: "Creative Hafsah shot", category: "Creative", tall: true, order: 3 },
  { src: creative_gl4, alt: "Creative shot", category: "Creative", order: 4 },
  { src: creative_gl5, alt: "Creative shot", category: "Creative", order: 5 },

  // Portraits
  { src: portrait_aus2, alt: "Elder portrait close-up", category: "Portraits", tall: true, order: 1 },
  { src: portrait_niisha_pr2, alt: "Niisha portrait", category: "Portraits", order: 2 },
  { src: portrait_niisha_pr1, alt: "Niisha portrait", category: "Portraits", order: 3 },
  { src: portrait_hafsah_pr1, alt: "Hafsah portrait", category: "Portraits", order: 4 },
  { src: portrait_hafsah_pr2, alt: "Hafsah portrait", category: "Portraits", order: 5 },
  { src: portrait_aus3, alt: "Classic portrait", category: "Portraits", order: 6 },
  { src: portrait_aus4, alt: "Modern portrait", category: "Portraits", tall: true, order: 7 },
  { src: creative_gl2, alt: "Creative shot", category: "Portraits", order: 8 },
  { src: creative_gl3, alt: "Creative shot", category: "Portraits", order: 9 },
  { src: portrait_aus1, alt: "Window-lit portrait", category: "Portraits", order: 10 },

  // Assignments
  { src: assignment_dn_1, alt: "Dandora assignment", category: "Assignments", order: 2 },
  // { src: assignment_dn_2, alt: "Dandora assignment", category: "Assignments", order: 1 },
  // { src: assignment_dn_3, alt: "Dandora assignment", category: "Assignments", order: 4 },
  // { src: assignment_dn_4, alt: "Dandora assignment", category: "Assignments", order: 3 },
  { src: assignment_dn_5, alt: "Dandora assignment", category: "Assignments", order: 5 },
  { src: assignment_dn_6, alt: "Dandora assignment", category: "Assignments", order: 6 },
  { src: assignment_dn_7, alt: "Dandora assignment", category: "Assignments", order: 7 },
  { src: assignment_dn_8, alt: "Dandora assignment", category: "Assignments", order: 8 },
];

const categories: Category[] = ["All", "Assignments", "Creative", "Portraits", "Automotive", "Ocean", "Product", "Adventure"];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Gallery = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [shuffledItems] = useState(() => shuffleArray(items));
  const lightboxTrigger = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleCategoryChange = (cat: Category) => {
    setActive(cat);
  };

  let filtered: GalleryItem[];
  if (active === "All") {
    filtered = shuffledItems;
  } else {
    filtered = items.filter((i) => i.category === active).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  const lightboxIndex = lightbox ? filtered.indexOf(lightbox) : -1;
  const navigateLightbox = (direction: -1 | 1) => {
    setLightbox((current) => {
      if (!current) return current;
      const nextIndex = filtered.indexOf(current) + direction;
      return nextIndex >= 0 && nextIndex < filtered.length ? filtered[nextIndex] : current;
    });
  };

  return (
    <section className="section-padding py-20 md:py-24" id="gallery">
      {/* Section Title */}
      <motion.div
        className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">The Gallery</h2>
        </div>
        <a
          href="https://drive.google.com/drive/folders/1_DrgOZJlG54BuNWxwHscLLF0lDNON1su?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-button inline-flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          Download Wallpapers
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </motion.div>

      {/* Filter Pills */}
      <motion.div
        className="mb-6 md:mb-12 z-30 bg-background/95 md:bg-background/80 md:backdrop-blur sticky top-0 py-3"
        initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible" role="group" aria-label="Filter photos by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`shrink-0 whitespace-nowrap px-4 md:px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-colors duration-300 min-w-[44px] min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                active === cat
                  ? "bg-foreground text-background shadow-md"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
              style={{ touchAction: 'manipulation' }}
              tabIndex={0}
              aria-pressed={active === cat}
            >
              {cat}
            </button>
          ))}
        </div>

      </motion.div>

      {/* Masonry Grid */}
      {filtered.length === 0 ? (
          <div className="w-full text-center py-12 text-base lg:text-lg text-muted-foreground" role="status">
            I promise Alvin is working really hard to put something here
          </div>
        ) : (
          <div className="columns-2 lg:columns-5 gap-3 md:gap-5 min-h-[120px]">
            {filtered.map((item) => (
              <motion.button
                key={item.src[0].src}
                type="button"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.14, ease: "easeInOut" }}
                className="block w-full mb-3 md:mb-5 break-inside-avoid cursor-pointer group min-w-[44px] min-h-[44px] text-left rounded-xl md:rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                aria-label={`View ${item.alt}`}
                onClick={(event) => {
                  lightboxTrigger.current = event.currentTarget;
                  setLightbox(item);
                }}
              >
                <div className="rounded-xl md:rounded-3xl overflow-hidden relative">
                  <img
                    src={item.src[1].src}
                    srcSet={imageSrcSet(item.src)}
                    sizes={galleryImageSizes}
                    width={item.src[0].width}
                    height={item.src[0].height}
                    alt={item.alt}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                    <span className="rounded-full bg-black/60 px-2 py-1 text-[10px] md:text-xs uppercase tracking-widest text-white font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

      {/* Lightbox */}
      <Dialog open={lightbox !== null} onOpenChange={(open) => { if (!open) setLightbox(null); }}>
        {lightbox && (
          <DialogContent
            className="w-[calc(100%-2rem)] max-w-5xl max-h-[90dvh] rounded-2xl border-0 p-4 pt-16"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                navigateLightbox(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              lightboxTrigger.current?.focus();
            }}
          >
            <DialogTitle className="sr-only">{lightbox.alt}</DialogTitle>
            <DialogDescription className="sr-only">
              {lightbox.category} photograph. Swipe left or right, or use the navigation buttons or arrow keys to browse.
            </DialogDescription>
            <div
              className="min-h-0"
              style={{ touchAction: "pan-y pinch-zoom" }}
              onTouchStart={(event) => {
                touchStart.current = event.touches.length === 1
                  ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
                  : null;
              }}
              onTouchMove={(event) => {
                if (event.touches.length !== 1) touchStart.current = null;
              }}
              onTouchCancel={() => { touchStart.current = null; }}
              onTouchEnd={(event) => {
                const start = touchStart.current;
                touchStart.current = null;
                if (!start || event.touches.length > 0 || event.changedTouches.length !== 1) return;
                const dx = event.changedTouches[0].clientX - start.x;
                const dy = event.changedTouches[0].clientY - start.y;
                if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                  navigateLightbox(dx < 0 ? 1 : -1);
                }
              }}
            >
              <img
              src={lightbox.src[lightbox.src.length - 1].src}
              srcSet={imageSrcSet(lightbox.src)}
              sizes="(min-width: 1024px) 1024px, calc(100vw - 64px)"
              width={lightbox.src[0].width}
              height={lightbox.src[0].height}
              alt={lightbox.alt}
              className="w-full max-h-[calc(90dvh-9rem)] object-contain rounded-xl"
              draggable={false}
            />
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="Previous photo"
                disabled={lightboxIndex <= 0}
                onClick={() => navigateLightbox(-1)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <p className="text-center text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
                {lightbox.category} · {lightboxIndex + 1} / {filtered.length}
              </p>
              <button
                type="button"
                aria-label="Next photo"
                disabled={lightboxIndex >= filtered.length - 1}
                onClick={() => navigateLightbox(1)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default Gallery;
