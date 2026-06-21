import { useState, useRef, useEffect, useMemo } from "react";
import { Shuffle } from "lucide-react";
import type { GalleryContentItem } from "@/lib/cms-content";

type GalleryItem = GalleryContentItem & {
  tall?: boolean;
};
const INITIAL_VISIBLE_COUNT = 6;
const EMPTY_ITEMS: GalleryItem[] = [];
const EMPTY_CATEGORIES: string[] = [];

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
  const sourceItems = items ?? EMPTY_ITEMS;
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
      <div className="mb-12">
        <p className="section-title-pill mb-3 text-muted-foreground">Selected Work</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">The Gallery</h2>
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
              <div
                key={item.src}
                className="break-inside-avoid cursor-pointer group min-w-[44px] min-h-[44px] tile-enter"
                style={{ animationDelay: `${Math.min(index * 55, 440)}ms` }}
                onClick={() => setLightbox(item.src)}
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
                      className={`w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                        loadedImages[item.src] ? "opacity-100 blur-0" : "opacity-0 blur-sm"
                      }`}
                      loading={index < INITIAL_VISIBLE_COUNT ? "eager" : "lazy"}
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
              </div>
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

      {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 cursor-pointer"
            onClick={() => setLightbox(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" />
            <img
              src={lightbox}
              alt="Expanded view"
              className="relative max-w-full max-h-[90vh] object-contain rounded-3xl"
            />
          </div>
        )}
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
