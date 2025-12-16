import React, { useState } from "react";
import { getYouTubeThumbnail, YOUTUBE_THUMBNAIL_PLACEHOLDER_SVG } from "@/lib/youtube";

type Quality = "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault";

interface VideoThumbnailProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  videoUrl?: string;
  quality?: Quality;
}

/**
 * Reusable video thumbnail image for YouTube videos.
 * Computes the thumbnail from a video URL and provides a safe onError fallback.
 */
export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  videoUrl,
  alt = "video thumbnail",
  quality = "hqdefault",
  className,
  ...rest
}) => {
  const [src, setSrc] = useState(() => getYouTubeThumbnail(videoUrl, quality));

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={rest.loading ?? "lazy"}
      decoding={rest.decoding ?? "async"}
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        if (target.src !== YOUTUBE_THUMBNAIL_PLACEHOLDER_SVG) {
          // Use inline SVG data-uri placeholder to avoid broken image icons
          setSrc(YOUTUBE_THUMBNAIL_PLACEHOLDER_SVG);
        }
        // Call user-provided onError as well if present
        if (typeof rest.onError === "function") {
          const handler = rest.onError as React.ReactEventHandler<HTMLImageElement>;
          handler?.(e as unknown as React.SyntheticEvent<HTMLImageElement>);
        }
      }}
      {...rest}
    />
  );
};

export default VideoThumbnail;
