import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

import automotive_str1 from "@/assets/Automotive/strath_carshow/DSC_7676 (1).webp";
import automotive_str2 from "@/assets/Automotive/strath_carshow/DSC_7717.webp";
import automotive_str3 from "@/assets/Automotive/strath_carshow/DSC_7720.webp";
import automotive_str4 from "@/assets/Automotive/strath_carshow/DSC_7731.webp";
import automotive_str5 from "@/assets/Automotive/strath_carshow/DSC_7752.webp";
import automotive_str6 from "@/assets/Automotive/strath_carshow/DSC_7778.webp";

import automotive_green1 from "@/assets/Automotive/green_vw/WhatsApp Image 2026-03-20 at 18.15.59 (1).webp";
import automotive_green2 from "@/assets/Automotive/green_vw/WhatsApp Image 2026-03-20 at 18.15.59 (2).webp";
import automotive_green3 from "@/assets/Automotive/green_vw/WhatsApp Image 2026-03-20 at 18.15.59 (3).webp";
import automotive_green4 from "@/assets/Automotive/green_vw/WhatsApp Image 2026-03-20 at 18.15.59.webp";

import adventure1 from "@/assets/Adventure_photos/A7309381.jpg";
import adventure2 from "@/assets/Adventure_photos/A7309388.jpg";
import adventure3 from "@/assets/Adventure_photos/A7309402.jpg";
import adventure4 from "@/assets/Adventure_photos/A7309437.jpg";
import adventure5 from "@/assets/Adventure_photos/A7309466.jpg";
import adventure6 from "@/assets/Adventure_photos/A7309543.jpg";

import creative1 from "@/assets/gallery-creative-1.jpg";

import Asalka1 from "@/assets/Product_photos/Asalka 1.jpg";
import Asalka2 from "@/assets/Product_photos/Asalka 2.jpg";
import Asalka3 from "@/assets/Product_photos/Asalka 3.jpg";

import ocean_sk1 from "@/assets/Nature/Ocean/DSC_7865.webp";
import ocean_sk2 from "@/assets/Nature/Ocean/DSC_7869.webp";
import ocean_sk3 from "@/assets/Nature/Ocean/DSC_7871.webp";
import ocean_sk4 from "@/assets/Nature/Ocean/DSC_7884.webp";

import portrait_aus1 from "@/assets/portraits/austin/DSC_8383.webp";
import portrait_aus2 from "@/assets/portraits/austin/DSC_8385 (1).webp";
import portrait_aus3 from "@/assets/portraits/austin/DSC_8392.webp";
import portrait_aus4 from "@/assets/portraits/austin/DSC_8394.webp";

import portrait_niisha_pr1 from "@/assets/portraits/hafsah and niisha/niisha_pr1.webp";
import portrait_niisha_pr2 from "@/assets/portraits/hafsah and niisha/niisha_pr2.webp";
import portrait_hafsah_pr1 from "@/assets/portraits/hafsah and niisha/hafsah_ptr1.webp";
import portrait_hafsah_pr2 from "@/assets/portraits/hafsah and niisha/hafsah_pr2.webp";

import creative_hf1 from "@/assets/creative/hafsah/hafsah1.webp";
import creative_hf2 from "@/assets/creative/hafsah/hafsah2.webp";
import creative_hf3 from "@/assets/creative/hafsah/hafsah5.webp";

import creative_gl1 from "@/assets/creative/glovis/DSC_6894.webp";
import creative_gl2 from "@/assets/creative/glovis/DSC_6896.webp";
import creative_gl3 from "@/assets/creative/glovis/DSC_6899.webp";
import creative_gl4 from "@/assets/creative/glovis/DSC_6901 (1).webp";
import creative_gl5 from "@/assets/creative/glovis/DSC_6908.webp";

import assignment_dn_1 from "@/assets/Assignments/dandora/DSC_8129.webp";
import assignment_dn_2 from "@/assets/Assignments/dandora/DSC_8131.webp";
import assignment_dn_3 from "@/assets/Assignments/dandora/DSC_8136.webp";
import assignment_dn_4 from "@/assets/Assignments/dandora/DSC_8174.webp";
import assignment_dn_5 from "@/assets/Assignments/dandora/DSC_8178.webp";
import assignment_dn_6 from "@/assets/Assignments/dandora/DSC_8188.webp";
import assignment_dn_7 from "@/assets/Assignments/dandora/DSC_8200.webp";
import assignment_dn_8 from "@/assets/Assignments/dandora/DSC_8214.webp";






type Category = "All" | "Ocean" | "Portraits" | "Automotive" | "Adventure" | "Creative" | "Product" | "A Mood" | "Assignments" | "Clients";

type ClientName = "All Clients" | "Pure Pantry" | "CargoConnect" | "Client X";

const clientNames: ClientName[] = ["All Clients", "Pure Pantry", "CargoConnect", "Client X"];

interface GalleryItem {
  src: string;
  alt: string;
  category: Exclude<Category, "All" | "Clients">;
  client?: ClientName;
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

  { src: Asalka1, alt: "Asalka product shot", category: "Product", client: "Pure Pantry", tall: true, order: 1 },
  { src: Asalka2, alt: "Asalka product shot", category: "Product", client: "Pure Pantry", tall: true, order: 2 },
  { src: Asalka3, alt: "Asalka product shot", category: "Product", client: "Pure Pantry", order: 3 },

  { src: automotive_str1, alt: "Luxury sports car at dusk", category: "Automotive", order: 1 },
  { src: automotive_str2, alt: "Vintage chrome detail", category: "Automotive", tall: true, order: 2 },
  { src: automotive_str3, alt: "Classic car front view", category: "Automotive", order: 3 },
  { src: automotive_str4, alt: "Car interior detail", category: "Automotive", order: 4 },
  { src: automotive_str5, alt: "Car engine close-up", category: "Automotive", order: 5 },
  { src: automotive_str6, alt: "Car at night", category: "Automotive", tall: true, order: 6 },
  { src: automotive_green1, alt: "Green VW side", category: "Automotive", client: "CargoConnect", tall: true, order: 7 },
  { src: automotive_green4, alt: "Green VW front", category: "Automotive", client: "CargoConnect", tall: true, order: 8 },

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
  { src: assignment_dn_2, alt: "Dandora assignment", category: "Assignments", client: "Client X", order: 1 }, 
  { src: assignment_dn_3, alt: "Dandora assignment", category: "Assignments", client: "Client X", order: 4 },
  { src: assignment_dn_4, alt: "Dandora assignment", category: "Assignments", client: "Client X", order: 3 },
  { src: assignment_dn_5, alt: "Dandora assignment", category: "Assignments", order: 5 },
  { src: assignment_dn_6, alt: "Dandora assignment", category: "Assignments", order: 6 },
  { src: assignment_dn_7, alt: "Dandora assignment", category: "Assignments", order: 7 },
  { src: assignment_dn_8, alt: "Dandora assignment", category: "Assignments", order: 8 },
];

const categories: Category[] = ["All", "Clients", "Assignments", "Creative", "Portraits", "Automotive", "Ocean", "Product", "Adventure", "A Mood"];

const Gallery = () => {
  const isMobile = useIsMobile();
  const [active, setActive] = useState<Category>("All");
  const [activeClient, setActiveClient] = useState<ClientName>("All Clients");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const handleCategoryChange = (cat: Category) => {
    setActive(cat);
    if (cat !== "Clients") setActiveClient("All Clients");
  };

  let filtered: GalleryItem[];
  if (active === "All") {
    filtered = shuffleArray(items);
  } else if (active === "Clients") {
    const clientItems = items.filter((i) => i.client);
    filtered = activeClient === "All Clients"
      ? clientItems.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : clientItems.filter((i) => i.client === activeClient).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } else {
    filtered = items.filter((i) => i.category === active).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  // Fisher-Yates shuffle
  function shuffleArray(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Sticky logic
  const filterRef = useRef<HTMLDivElement>(null);
  const [hideFilter, setHideFilter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const filter = filterRef.current;
      const videoSection = document.getElementById('video');
      if (filter && videoSection) {
        const filterBottom = filter.getBoundingClientRect().bottom;
        const videoTop = videoSection.getBoundingClientRect().top;
        setHideFilter(videoTop <= filterBottom + 24); // 24px buffer
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section-padding py-20 md:py-24" id="gallery">
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
        ref={filterRef}
        className={`flex flex-col gap-0 mb-12 z-30 bg-background/80 backdrop-blur sticky top-0 py-3 transition-opacity duration-300 ${hideFilter ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 min-w-[44px] min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
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

        {/* Secondary Client Sub-Filter */}
        <AnimatePresence>
          {active === "Clients" && (
            <motion.div
              className="flex flex-wrap gap-2 pt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              {clientNames.map((client) => (
                <button
                  key={client}
                  onClick={() => setActiveClient(client)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 min-w-[40px] min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    activeClient === client
                      ? "bg-foreground text-background shadow-sm"
                      : "backdrop-blur-[20px] bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ touchAction: 'manipulation' }}
                  tabIndex={0}
                  aria-pressed={activeClient === client}
                >
                  {client}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Masonry Grid */}
      <div className="columns-2 lg:columns-5 gap-5 space-y-5 min-h-[120px]">
        {filtered.length === 0 ? (
          <div className="w-full text-center py-12 text-base lg:text-lg text-muted-foreground animate-pulse whitespace-nowrap">
            I promise Alvin is working really hard to put something here
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isMobile ? 0.14 : 0.1, ease: 'easeInOut' }}
                className="break-inside-avoid cursor-pointer group min-w-[44px] min-h-[44px]"
                onClick={() => setLightbox(item.src)}
              >
                <div className="rounded-3xl overflow-hidden relative">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    fetchPriority={isMobile ? undefined : "high"}
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
        )}
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
