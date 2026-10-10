export interface ResponsiveImage {
  src: string;
  width: number;
  height: number;
}

export const galleryImageSizes =
  "(min-width: 1024px) calc((100vw - 240px) / 5), (min-width: 768px) calc((100vw - 116px) / 2), calc((100vw - 44px) / 2)";

export function imageSrcSet(images: ResponsiveImage[]) {
  return images.map((image) => `${image.src} ${image.width}w`).join(", ");
}
