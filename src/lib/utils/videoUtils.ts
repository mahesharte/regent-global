/**
 * Utility functions for video handling
 */

export type VideoProvider = "youtube" | "vimeo" | "unknown";

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=ID
 * - https://youtu.be/ID
 * - https://www.youtube.com/embed/ID
 * - With query parameters and timestamps
 */
export const getYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    /youtu\.be\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

/**
 * Extracts Vimeo video ID from Vimeo URLs
 * Supports:
 * - https://vimeo.com/ID
 * - https://player.vimeo.com/video/ID
 */
export const getVimeoId = (url: string): string | null => {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

/**
 * Detects the video provider from a URL
 */
export const detectVideoProvider = (url: string): VideoProvider => {
  if (getYouTubeId(url)) return "youtube";
  if (getVimeoId(url)) return "vimeo";
  return "unknown";
};

/**
 * Gets the YouTube thumbnail URL for a given video ID
 * Falls back from maxresdefault -> sddefault -> hqdefault
 */
export const getYouTubeThumbnailUrl = (
  videoId: string,
  quality: "maxres" | "sd" | "hq" = "hq",
): string => {
  const qualityMap = {
    maxres: "maxresdefault.jpg",
    sd: "sddefault.jpg",
    hq: "hqdefault.jpg",
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
};

/**
 * Gets the best available YouTube thumbnail for a video ID
 * Tries to use provided quality first, has implicit fallback chain in UI
 */
export const getYouTubeFallbackThumbnail = (videoId: string): string => {
  // Return the high-quality default; browsers will show generic YouTube icon if unavailable
  return getYouTubeThumbnailUrl(videoId, "hq");
};
