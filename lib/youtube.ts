export type GalleryItem = {
  type: "image" | "youtube";
  src: string;
  thumbnail: string;
  alt?: string;
};

const YOUTUBE_ID = /^[a-zA-Z0-9_-]{11}$/;

export function parseYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id && YOUTUBE_ID.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      const watch = parsed.searchParams.get("v");
      if (watch && YOUTUBE_ID.test(watch)) return watch;

      const parts = parsed.pathname.split("/").filter(Boolean);
      const fromPath = parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live" ? parts[1] : null;
      return fromPath && YOUTUBE_ID.test(fromPath) ? fromPath : null;
    }
  } catch {
    return null;
  }

  return null;
}

export function youtubeThumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

export function youtubeFallbackThumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeEmbedSrc(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white`;
}

export function toGalleryItem(input: { url?: string | null; type?: string | null; alt?: string | null }): GalleryItem | null {
  if (!input.url) return null;

  const youtubeId = parseYouTubeId(input.url);
  if (input.type === "youtubeVideo" || youtubeId) {
    if (!youtubeId) return null;
    return {
      type: "youtube",
      src: input.url,
      thumbnail: youtubeThumbnail(youtubeId),
      alt: input.alt || "YouTube video",
    };
  }

  return {
    type: "image",
    src: input.url,
    thumbnail: input.url,
    alt: input.alt || "Gallery image",
  };
}

export const NPL_PLACEHOLDER_YOUTUBE = "https://www.youtube.com/watch?v=M7lc1UVf-VE";
