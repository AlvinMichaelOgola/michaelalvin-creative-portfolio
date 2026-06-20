import { useIsMobile } from "../hooks/use-mobile";
import { ArrowRight } from "lucide-react";
import type { HeroContent } from "@/lib/cms-content";

const MARQUEE_TEXT = "COMMERCIAL • PORTRAIT • ADVENTURE • FILM • ";

function buildSrcSet(
  variants: HeroContent["portraitImage"] extends { variants: infer V } ? V : never,
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

const Hero = ({
  onContactClick,
  content,
}: {
  onContactClick: () => void;
  content?: HeroContent | null;
}) => {
  const isMobile = useIsMobile();

  if (!content) {
    return (
      <section
        id="hero"
        className="h-[60svh] min-h-[28rem] md:h-[70svh] section-padding flex items-center justify-center"
      >
        <p className="text-muted-foreground text-sm md:text-base">
          No published hero content yet.
        </p>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="min-h-[100svh] md:min-h-screen h-auto section-padding flex items-center justify-center relative overflow-hidden pt-4 pb-16 md:pt-6 md:pb-16"
    >
      {isMobile && (
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "60%",
            background:
              "radial-gradient(ellipse at center, hsla(168, 40%, 40%, 0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      )}

      <div className="w-full max-w-3xl mx-auto relative z-20 flex flex-col items-center text-center glass-panel px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] break-words">
          <span className="text-foreground whitespace-normal">{content.title}</span>
        </h1>

        {content.portraitUrl ? (
          <div className="mt-4 md:mt-6 w-full max-w-[min(68vw,16rem)] md:max-w-[16rem] lg:max-w-[18rem]">
            <div className="relative rounded-3xl overflow-hidden transition-shadow duration-500 glass-frame shadow-[0_15px_30px_-10px_rgba(0,0,0,0.4)]">
              <picture>
                {content.portraitImage ? (
                  <>
                    {buildSrcSet(content.portraitImage.variants, "webp") ? (
                      <source
                        type="image/webp"
                        srcSet={buildSrcSet(content.portraitImage.variants, "webp")}
                        sizes={content.portraitImage.sizes}
                      />
                    ) : null}
                  </>
                ) : null}
                <img
                  src={content.portraitImage?.src || content.portraitUrl}
                  alt={content.title}
                  className="block w-full h-auto"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  sizes={content.portraitImage?.sizes}
                />
              </picture>
              {isMobile && (
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              )}
            </div>
          </div>
        ) : null}

        {content.subtitle ? (
          <p className="mt-4 md:mt-5 text-[11px] md:text-sm uppercase tracking-[0.3em] font-medium text-accent-teal">
            {content.subtitle}
          </p>
        ) : null}

        {content.description ? (
          <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
            {content.description}
          </p>
        ) : null}

        {content.ctaText ? (
          <div className="mb-2 md:mb-3">
            <button
              onClick={onContactClick}
              className="hero-cta-contrast group mt-5 md:mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "hsl(142, 71%, 45%)" }}
              />
              {content.ctaText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        ) : null}
      </div>

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
