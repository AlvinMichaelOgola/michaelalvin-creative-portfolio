# Welcome to your Lovable project

TODO: Document your project here

## Mobile image loading

Gallery and hero images are processed by `vite-imagetools` during development
and builds. Their imports generate 320, 640, 960, and 1600 pixel-wide WebP
variants at quality 80, capped at the original image width without upscaling.
The browser selects a variant using `srcset` and `sizes`;
image dimensions reserve space before loading. Original source files are preserved.

When adding gallery photos, use the same image query as existing imports:
`?w=320;640;960;1600&format=webp&quality=80&as=metadata`.
Keep `galleryImageSizes` in sync with gallery padding, gaps, and column counts.
The lightbox uses these variants too, up to 1600 pixels wide.

Gallery ordering is shuffled once per page mount. Mobile category filters scroll
horizontally, and the lightbox supports keyboard focus, Escape, and scroll locking.
Swipe horizontally across the lightbox image, use Left/Right arrow keys, or select
the previous/next buttons to browse the active category in gallery order. The
counter shows the current position; navigation stops at the first and last photos.
Vertical gestures and pinch zoom are not used for photo navigation.
The contact sheet scrolls within the available viewport. YouTube players load only
after selecting Play; their preview thumbnails are loaded lazily.

Run `npm run build` to generate production assets and `npm test` for component tests.

The hero includes a compact Work / Film / Contact navigation row. Work and
View My Work link to the gallery, Film links to the video section, and Contact
opens the contact sheet. Section scrolling respects reduced-motion preferences.
