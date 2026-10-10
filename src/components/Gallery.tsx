import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Shuffle } from "lucide-react";
import type { GalleryContentItem } from "@/lib/cms-content";
import type { ResponsiveImage } from "@/lib/responsive-image";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

import automotive_str1 from "@/assets/Automotive/strath_carshow/DSC_7676 (1).webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_str2 from "@/assets/Automotive/strath_carshow/DSC_7717.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_str3 from "@/assets/Automotive/strath_carshow/DSC_7720.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_str4 from "@/assets/Automotive/strath_carshow/DSC_7731.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_str5 from "@/assets/Automotive/strath_carshow/DSC_7752.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import automotive_str6 from "@/assets/Automotive/strath_carshow/DSC_7778.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure1 from "@/assets/Adventure_photos/A7309381.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure2 from "@/assets/Adventure_photos/A7309388.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure3 from "@/assets/Adventure_photos/A7309402.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure4 from "@/assets/Adventure_photos/A7309437.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure5 from "@/assets/Adventure_photos/A7309466.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import adventure6 from "@/assets/Adventure_photos/A7309543.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import asalka1 from "@/assets/Product_photos/Asalka 1.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import asalka2 from "@/assets/Product_photos/Asalka 2.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import asalka3 from "@/assets/Product_photos/Asalka 3.jpg?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import ocean1 from "@/assets/Nature/Ocean/DSC_7865.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import ocean2 from "@/assets/Nature/Ocean/DSC_7869.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import ocean3 from "@/assets/Nature/Ocean/DSC_7871.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import ocean4 from "@/assets/Nature/Ocean/DSC_7884.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portraitAustin1 from "@/assets/portraits/austin/DSC_8383.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portraitAustin2 from "@/assets/portraits/austin/DSC_8385 (1).webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portraitAustin3 from "@/assets/portraits/austin/DSC_8392.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portraitAustin4 from "@/assets/portraits/austin/DSC_8394.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portraitNiisha1 from "@/assets/portraits/hafsah and niisha/niisha_pr1.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portraitNiisha2 from "@/assets/portraits/hafsah and niisha/niisha_pr2.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portraitHafsah1 from "@/assets/portraits/hafsah and niisha/hafsah_ptr1.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import portraitHafsah2 from "@/assets/portraits/hafsah and niisha/hafsah_pr2.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creativeHafsah1 from "@/assets/creative/hafsah/hafsah1.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creativeHafsah2 from "@/assets/creative/hafsah/hafsah2.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creativeHafsah3 from "@/assets/creative/hafsah/hafsah5.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creativeGlovis2 from "@/assets/creative/glovis/DSC_6896.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creativeGlovis3 from "@/assets/creative/glovis/DSC_6899.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creativeGlovis4 from "@/assets/creative/glovis/DSC_6901 (1).webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import creativeGlovis5 from "@/assets/creative/glovis/DSC_6908.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment1 from "@/assets/Assignments/dandora/DSC_8129.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment5 from "@/assets/Assignments/dandora/DSC_8178.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment6 from "@/assets/Assignments/dandora/DSC_8188.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment7 from "@/assets/Assignments/dandora/DSC_8200.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";
import assignment8 from "@/assets/Assignments/dandora/DSC_8214.webp?w=320;640;960;1600&format=webp&quality=80&as=metadata";

type GalleryItem = GalleryContentItem & {
  tall?: boolean;
  width?: number;
  height?: number;
};
const INITIAL_VISIBLE_COUNT = 6;
const EMPTY_CATEGORIES: string[] = [];
const galleryImageSizes =
  "(min-width: 1024px) calc((100vw - 240px) / 5), (min-width: 768px) calc((100vw - 116px) / 2), calc((100vw - 44px) / 2)";

type LocalPhoto = {
  images: ResponsiveImage[];
  alt: string;
  category: string;
  order: number;
  tall?: boolean;
};

const localPhotos: LocalPhoto[] = [
  { images: ocean1, alt: "The Ocean, a boat and water", category: "Ocean", order: 1, tall: true },
  { images: ocean2, alt: "Close up of wave ripples", category: "Ocean", order: 2 },
  { images: ocean3, alt: "The Ocean, cinematic view", category: "Ocean", order: 3 },
  { images: ocean4, alt: "The Ocean, sunset view", category: "Ocean", order: 4 },
  { images: asalka1, alt: "Asalka product shot", category: "Product", order: 1, tall: true },
  { images: asalka2, alt: "Asalka product shot", category: "Product", order: 2, tall: true },
  { images: asalka3, alt: "Asalka product shot", category: "Product", order: 3 },
  { images: automotive_str1, alt: "Luxury sports car at dusk", category: "Automotive", order: 1 },
  { images: automotive_str2, alt: "Vintage chrome detail", category: "Automotive", order: 2, tall: true },
  { images: automotive_str3, alt: "Classic car front view", category: "Automotive", order: 3 },
  { images: automotive_str4, alt: "Car interior detail", category: "Automotive", order: 4 },
  { images: automotive_str5, alt: "Car engine close-up", category: "Automotive", order: 5 },
  { images: automotive_str6, alt: "Car at night", category: "Automotive", order: 6, tall: true },
  { images: adventure1, alt: "Mountain cliff silhouette", category: "Adventure", order: 1 },
  { images: adventure2, alt: "Hills", category: "Adventure", order: 2 },
  { images: adventure3, alt: "Plant close up", category: "Adventure", order: 3 },
  { images: adventure4, alt: "Girl walking in trail", category: "Adventure", order: 4 },
  { images: adventure5, alt: "Lone tree", category: "Adventure", order: 5, tall: true },
  { images: adventure6, alt: "House on Hill", category: "Adventure", order: 6 },
  { images: creativeHafsah1, alt: "Creative Hafsah shot", category: "Creative", order: 1, tall: true },
  { images: creativeHafsah2, alt: "Creative Hafsah shot", category: "Creative", order: 2, tall: true },
  { images: creativeHafsah3, alt: "Creative Hafsah shot", category: "Creative", order: 3, tall: true },
  { images: creativeGlovis4, alt: "Creative shot", category: "Creative", order: 4 },
  { images: creativeGlovis5, alt: "Creative shot", category: "Creative", order: 5 },
  { images: portraitAustin2, alt: "Elder portrait close-up", category: "Portraits", order: 1, tall: true },
  { images: portraitNiisha2, alt: "Niisha portrait", category: "Portraits", order: 2 },
  { images: portraitNiisha1, alt: "Niisha portrait", category: "Portraits", order: 3 },
  { images: portraitHafsah1, alt: "Hafsah portrait", category: "Portraits", order: 4 },
  { images: portraitHafsah2, alt: "Hafsah portrait", category: "Portraits", order: 5 },
  { images: portraitAustin3, alt: "Classic portrait", category: "Portraits", order: 6 },
  { images: portraitAustin4, alt: "Modern portrait", category: "Portraits", order: 7, tall: true },
  { images: creativeGlovis2, alt: "Creative shot", category: "Portraits", order: 8 },
  { images: creativeGlovis3, alt: "Creative shot", category: "Portraits", order: 9 },
  { images: portraitAustin1, alt: "Window-lit portrait", category: "Portraits", order: 10 },
  { images: assignment1, alt: "Dandora assignment", category: "Assignments", order: 2 },
  { images: assignment5, alt: "Dandora assignment", category: "Assignments", order: 5 },
  { images: assignment6, alt: "Dandora assignment", category: "Assignments", order: 6 },
  { images: assignment7, alt: "Dandora assignment", category: "Assignments", order: 7 },
  { images: assignment8, alt: "Dandora assignment", category: "Assignments", order: 8 },
];

const localGalleryItems: GalleryItem[] = localPhotos.map((photo) => ({
  src: photo.images[0].src,
  alt: photo.alt,
  category: photo.category,
  order: photo.order,
  tall: photo.tall,
  width: photo.images[0].width,
  height: photo.images[0].height,
  image: {
    src: photo.images[1]?.src ?? photo.images[0].src,
    sizes: galleryImageSizes,
    variants: photo.images.map((image) => ({
      format: "webp",
      width: image.width,
      url: image.src,
    })),
  },
}));

function buildSrcSet(
  variants: NonNullable<GalleryItem["image"]>["variants"] | undefined,
  format: "webp",
) {
  const items = (variants ?? [])
    .filter((variant) => variant.format === format)
    .sort((a, b) => a.width - b.width);
  if (items.length === 0) {
    return undefined;
  }
  return items.map((variant) => `${variant.url} ${variant.width}w`).join(", ");
}

const Gallery = ({
  items,
  categories: cmsCategories,
}: {
  items?: GalleryItem[];
  categories?: string[];
}) => {
  const sourceItems = items ?? localGalleryItems;
  const sourceCategories = cmsCategories ?? EMPTY_CATEGORIES;
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          [...sourceCategories, ...sourceItems.map((item) => item.category)]
            .map((category) => category.trim())
            .filter((category) => category.length > 0),
        ),
      ),
    ],
    [sourceItems, sourceCategories],
  );

  const [active, setActive] = useState("All");
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState(false);
  const lightboxTrigger = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (active === "All") {
      return;
    }

    if (!categories.includes(active)) {
      setActive("All");
    }
  }, [active, categories]);

  const handleCategoryChange = (cat: string) => {
    setActive(cat);
  };

  const orderedAll = useMemo(
    () => sourceItems.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [sourceItems],
  );

  const shuffledAll = useMemo(
    () => shuffleArrayWithSeed(orderedAll, shuffleSeed),
    [orderedAll, shuffleSeed],
  );

  const filtered =
    active === "All"
      ? shuffleEnabled
        ? shuffledAll
        : orderedAll
      : sourceItems
          .filter((item) => item.category === active)
          .slice()
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const lightboxItem = lightbox
    ? filtered.find((item) => item.src === lightbox) ?? null
    : null;
  const lightboxIndex = lightboxItem ? filtered.indexOf(lightboxItem) : -1;
  const navigateLightbox = (direction: -1 | 1) => {
    const next = filtered[lightboxIndex + direction];
    if (next) {
      setLightbox(next.src);
    }
  };
  const displayedItems = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE_COUNT);
  const remainingItems = filtered.slice(INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    setShowAll(false);
  }, [active, shuffleEnabled, shuffleSeed, items, cmsCategories]);

  useEffect(() => {
    if (remainingItems.length === 0) {
      return;
    }
    const timer = window.setTimeout(() => {
      for (const item of remainingItems) {
        const src = item.image?.src || item.src;
        if (!src || loadedImages[src]) {
          continue;
        }
        const preload = new Image();
        preload.decoding = "async";
        (preload as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low";
        preload.src = src;
      }
    }, 250);
    return () => {
      window.clearTimeout(timer);
    };
  }, [remainingItems, loadedImages]);

  const filterRef = useRef<HTMLDivElement>(null);
  const [hideFilter, setHideFilter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const filter = filterRef.current;
      const videoSection = document.getElementById("video");
      if (filter && videoSection) {
        const filterBottom = filter.getBoundingClientRect().bottom;
        const videoTop = videoSection.getBoundingClientRect().top;
        setHideFilter(videoTop <= filterBottom + 24);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="section-padding py-20 md:py-24" id="gallery">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-title-pill mb-3 text-muted-foreground">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">The Gallery</h2>
        </div>
        <a
          href="https://drive.google.com/drive/folders/1_DrgOZJlG54BuNWxwHscLLF0lDNON1su?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-button inline-flex min-h-11 items-center justify-center gap-2 self-start sm:self-auto"
        >
          Download Wallpapers
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>

      <div
        ref={filterRef}
        className={`flex flex-col gap-0 mb-12 z-30 glass-panel sticky top-2 py-3 px-3 transition-opacity duration-300 ${hideFilter ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 min-w-[44px] min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                active === cat
                  ? "bg-foreground text-background shadow-md"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
              style={{ touchAction: "manipulation" }}
              tabIndex={0}
              aria-pressed={active === cat}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => {
              if (active !== "All") {
                setActive("All");
              }
              if (shuffleEnabled) {
                setShuffleSeed((value) => value + 1);
              } else {
                setShuffleEnabled(true);
              }
            }}
            className={`inline-flex w-full sm:w-auto sm:ml-auto items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              shuffleEnabled
                ? "bg-foreground text-background shadow-[0_16px_32px_-18px_rgba(0,0,0,0.7)]"
                : "glass-panel text-foreground hover:scale-[1.02]"
            }`}
            style={{ touchAction: "manipulation" }}
            aria-pressed={shuffleEnabled}
            aria-label={shuffleEnabled ? "Reshuffle gallery" : "Enable shuffled gallery order"}
            title={shuffleEnabled ? "Reshuffle" : "Shuffle gallery"}
          >
            <Shuffle className="h-4 w-4" />
            {shuffleEnabled ? "Reshuffle" : "Shuffle"}
          </button>
          {shuffleEnabled ? (
            <button
              onClick={() => setShuffleEnabled(false)}
              className="glass rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{ touchAction: "manipulation" }}
              aria-label="Return to curated gallery order"
            >
              Curated
            </button>
          ) : null}
        </div>
      </div>

      <div className="columns-2 lg:columns-4 gap-5 space-y-5 min-h-[120px]">
        {filtered.length === 0 ? (
          <div className="w-full text-center py-12 text-base lg:text-lg text-muted-foreground">
            No published gallery items yet.
          </div>
        ) : (
          displayedItems.map((item, index) => (
              <button
                type="button"
                key={item.src}
                className="break-inside-avoid cursor-pointer group min-w-[44px] min-h-[44px] tile-enter"
                style={{ animationDelay: `${Math.min(index * 55, 440)}ms` }}
                aria-label={`View ${item.alt}`}
                onClick={(event) => {
                  lightboxTrigger.current = event.currentTarget;
                  setLightbox(item.src);
                }}
              >
                <div className="rounded-3xl overflow-hidden relative glass-frame">
                  <div
                    className={`absolute inset-0 bg-muted/60 animate-pulse transition-opacity duration-500 ${
                      loadedImages[item.src] ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <picture>
                    {item.image ? (
                      <>
                        {buildSrcSet(item.image.variants, "webp") ? (
                          <source
                            type="image/webp"
                            srcSet={buildSrcSet(item.image.variants, "webp")}
                            sizes={item.image.sizes}
                          />
                        ) : null}
                      </>
                    ) : null}
                    <img
                      src={item.image?.src || item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      srcSet={buildSrcSet(item.image?.variants, "webp")}
                      className={`w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                        loadedImages[item.src] ? "opacity-100 blur-0" : "opacity-0 blur-sm"
                      }`}
                      loading="lazy"
                      decoding="async"
                      fetchPriority={index < INITIAL_VISIBLE_COUNT ? "high" : "low"}
                      sizes={item.image?.sizes ?? "(min-width: 1024px) 20vw, 50vw"}
                      onLoad={() =>
                        setLoadedImages((previous) => ({ ...previous, [item.src]: true }))
                      }
                    />
                  </picture>
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs uppercase tracking-widest text-foreground/80 font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
              </button>
            ))
        )}
      </div>
      {filtered.length > INITIAL_VISIBLE_COUNT ? (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll((previous) => !previous)}
            className="hero-cta-contrast"
          >
            {showAll ? "Show less" : `Show more (${filtered.length - INITIAL_VISIBLE_COUNT})`}
          </button>
        </div>
      ) : null}

      <Dialog open={lightboxItem !== null} onOpenChange={(open) => { if (!open) setLightbox(null); }}>
        {lightboxItem ? (
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
            <DialogTitle className="sr-only">{lightboxItem.alt}</DialogTitle>
            <DialogDescription className="sr-only">
              {lightboxItem.category} photograph. Swipe left or right, or use the navigation buttons or arrow keys to browse.
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
                src={lightboxItem.image?.src || lightboxItem.src}
                srcSet={buildSrcSet(lightboxItem.image?.variants, "webp")}
                sizes={lightboxItem.image?.sizes}
                width={lightboxItem.width}
                height={lightboxItem.height}
                alt={lightboxItem.alt}
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
                {lightboxItem.category} · {lightboxIndex + 1} / {filtered.length}
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
        ) : null}
      </Dialog>
    </section>
  );
};

export default Gallery;

function shuffleArrayWithSeed(array: GalleryItem[], seed: number) {
  const arr = array.slice();
  let value = (seed || 1) >>> 0;
  const random = () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
