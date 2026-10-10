import { useState } from "react";
import type { VideoContentItem } from "@/lib/cms-content";

function getYouTubePosterUrl(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

const VideoTheater = ({ videos }: { videos?: VideoContentItem[] }) => {
  const sourceVideos = videos ?? [];
  const [loadedVideos, setLoadedVideos] = useState<Record<string, boolean>>({});

  return (
    <section className="py-8 md:py-24 overflow-hidden" id="video">
      <div className="section-padding mb-12">
        <div>
          <p className="section-title-pill mb-3 text-muted-foreground">Motion</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Video Theater</h2>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-4 md:gap-6 pl-4 md:pl-12 lg:pl-20 pr-4 md:pr-6 overflow-x-auto pb-6 scrollbar-hide">
        {sourceVideos.length === 0 ? (
          <p className="text-muted-foreground text-sm md:text-base">
            No published videos yet.
          </p>
        ) : (
          sourceVideos.map((video) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[88vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw]"
            >
              <div className="rounded-3xl overflow-hidden glass-panel">
                <div className="aspect-video">
                  {loadedVideos[video.id] ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setLoadedVideos((current) => ({ ...current, [video.id]: true }));
                      }}
                      className="relative h-full w-full min-h-[44px] min-w-[44px] overflow-hidden text-left"
                      aria-label={`Play ${video.title}`}
                    >
                      <img
                        src={getYouTubePosterUrl(video.youtubeId)}
                        alt={`Video preview for ${video.title}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute inset-0 bg-background/20" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="rounded-full bg-background/85 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground">
                          Play
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground tracking-wide">{video.title}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default VideoTheater;
