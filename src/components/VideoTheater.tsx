import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const videos = [
  { id: "-NVZB0Aay0Y", title: "This Is Orpul: More Than a Gathering" },
];

const VideoTheater = () => {
  const [playing, setPlaying] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  return (
    <section className="py-8 md:py-24 overflow-hidden" id="video">
      <div className="section-padding mb-12">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Motion</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Video Theater</h2>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-6 pl-4 md:pl-12 lg:pl-20 pr-4 overflow-x-auto pb-6">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            className="flex-shrink-0 w-[calc(100vw-2rem)] md:w-[60vw] lg:w-[50vw]"
            initial={reducedMotion ? false : { opacity: 0, x: isMobile ? 0 : 40, filter: isMobile ? "none" : "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-3xl overflow-hidden surface-card">
              <div className="aspect-video">
                {playing === video.id ? <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                /> : (
                  <button
                    type="button"
                    onClick={() => setPlaying(video.id)}
                    aria-label={`Play ${video.title}`}
                    className="relative block w-full h-full group focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-[-4px]"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                      alt=""
                      width={480}
                      height={360}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/70 text-white group-hover:bg-black/90">
                        <Play size={24} aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground tracking-wide">{video.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VideoTheater;
