import { motion } from "framer-motion";

const videos = [
  { id: "dQw4w9WgXcQ", title: "Commercial Reel 2024" },
  { id: "LXb3EKWsInQ", title: "Behind the Scenes" },
  { id: "jNQXAC9IVRw", title: "Adventure Series" },
];

const VideoTheater = () => {
  return (
    <section className="py-32 overflow-hidden" id="video">
      <div className="section-padding mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Motion</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Video Theater</h2>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-6 pl-6 md:pl-12 lg:pl-20 pr-6 overflow-x-auto pb-6 scrollbar-hide">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[50vw]"
            initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-3xl overflow-hidden surface-card">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
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
