/**
 * Build an image URL. Uses Lorem Picsum for reliable, always-working placeholder images.
 * In production this would point to a CDN or image service.
 */
export function getImageUrl(
  src: string,
  width: number = 800,
  height?: number
): string {
  if (src.startsWith("http")) {
    return src;
  }
  const h = height || Math.round(width * 0.75);
  return `https://picsum.photos/seed/${src}/${width}/${h}`;
}

/**
 * Generate a placeholder image URL for a given size.
 */
export function getPlaceholderImage(
  width: number = 800,
  height: number = 600
): string {
  return `https://images.unsplash.com/photo-1624538000860-24716b9050f2?w=${width}&h=${height}&fit=crop&auto=format`;
}

/**
 * Get the appropriate image for a product card aspect ratio.
 */
export function getAspectRatioClass(
  aspectRatio?: "1/1" | "4/5" | "3/4" | "16/9"
): string {
  switch (aspectRatio) {
    case "1/1":
      return "aspect-square";
    case "4/5":
      return "aspect-[4/5]";
    case "3/4":
      return "aspect-[3/4]";
    case "16/9":
      return "aspect-video";
    default:
      return "aspect-[4/5]";
  }
}
