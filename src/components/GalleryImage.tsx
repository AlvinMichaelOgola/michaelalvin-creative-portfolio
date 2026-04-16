import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// imageMap must be imported from Gallery.tsx, so we use require here for dynamic import
// We'll use a workaround: pass imageMap as a prop from Gallery

const GalleryImage = ({ item, isMobile, onClick, imageMap }: any) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    if (imageMap && imageMap[item.src]) {
      imageMap[item.src]().then((mod: any) => {
        if (mounted) setSrc(mod.default);
      });
    }
    return () => { mounted = false; };
  }, [item.src, imageMap]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: isMobile ? 0.14 : 0.1, ease: 'easeInOut' }}
      className="break-inside-avoid cursor-pointer group min-w-[44px] min-h-[44px]"
      onClick={() => onClick(src)}
    >
      <div className="rounded-3xl overflow-hidden relative">
        {src && (
          <img
            src={src}
            alt={item.alt}
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
            fetchPriority={isMobile ? undefined : "high"}
          />
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-xs uppercase tracking-widest text-foreground/80 font-medium">
            {item.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryImage;
