'use client';

import type { FC } from "react";
import { useState } from "react";
import { SanityVideo } from "@/sanity/types/documents";
import {
  getYouTubeId,
  getVimeoId,
  getYouTubeFallbackThumbnail,
} from "@/lib/utils/videoUtils";

type VideoRendererProps = {
  video?: SanityVideo | null;
  className?: string;
};

/**
 * PlayButton Icon Component
 */
const PlayButtonIcon: FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

/**
 * YouTubePosterOverlay - Shows poster image with play button until clicked
 */
const YouTubePosterOverlay: FC<{
  videoUrl: string;
  posterUrl?: string;
  caption?: string | null;
  youtubeId: string;
}> = ({ videoUrl, posterUrl, caption, youtubeId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const fallbackThumbnail = getYouTubeFallbackThumbnail(youtubeId);

  if (isPlaying) {
    // Show iframe when playing
    const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    return (
      <figure className="w-full">
        <div className="relative w-full pt-[56.25%]">
          <iframe
            src={embedUrl}
            title={caption || "YouTube video player"}
            className="absolute top-0 left-0 w-full h-full rounded"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>
        {caption && (
          <figcaption className="text-sm text-gray-600 mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // Show poster with play button
  const backgroundImage = posterUrl || fallbackThumbnail;

  return (
    <figure className="w-full">
      <div
        className="relative w-full pt-[56.25%] bg-gray-900 rounded overflow-hidden cursor-pointer group"
        onClick={() => setIsPlaying(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsPlaying(true);
          }
        }}
        aria-label={`Play video: ${caption || "YouTube video"}`}
      >
        {/* Poster image background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 group-hover:bg-white transition-all rounded-full p-4 text-red-600">
            <PlayButtonIcon className="w-8 h-8" />
          </div>
        </div>

        {/* YouTube branding (optional, shows source) */}
        <div className="absolute bottom-2 right-2 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
          YouTube
        </div>
      </div>

      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2">{caption}</figcaption>
      )}
    </figure>
  );
};

/**
 * VimeoPosterOverlay - Shows poster image with play button until clicked
 */
const VimeoPosterOverlay: FC<{
  videoUrl: string;
  posterUrl?: string;
  caption?: string | null;
  vimeoId: string;
}> = ({ videoUrl, posterUrl, caption, vimeoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Vimeo placeholder if no poster
  const backgroundImage =
    posterUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 168'%3E%3Crect fill='%23191919' width='300' height='168'/%3E%3C/svg%3E";

  if (isPlaying) {
    // Show iframe when playing
    const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
    return (
      <figure className="w-full">
        <div className="relative w-full pt-[56.25%]">
          <iframe
            src={embedUrl}
            title={caption || "Vimeo video player"}
            className="absolute top-0 left-0 w-full h-full rounded"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>
        {caption && (
          <figcaption className="text-sm text-gray-600 mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="w-full">
      <div
        className="relative w-full pt-[56.25%] bg-gray-900 rounded overflow-hidden cursor-pointer group"
        onClick={() => setIsPlaying(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsPlaying(true);
          }
        }}
        aria-label={`Play video: ${caption || "Vimeo video"}`}
      >
        {/* Poster image background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 group-hover:bg-white transition-all rounded-full p-4 text-blue-600">
            <PlayButtonIcon className="w-8 h-8" />
          </div>
        </div>

        {/* Vimeo branding */}
        <div className="absolute bottom-2 right-2 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
          Vimeo
        </div>
      </div>

      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2">{caption}</figcaption>
      )}
    </figure>
  );
};

/**
 * VideoRenderer - Handles all video types with poster support
 * - videoFile: HTML5 video with native poster support
 * - videoUrl (YouTube): Interactive poster overlay with click-to-play
 * - videoUrl (Vimeo): Interactive poster overlay with click-to-play
 */
const VideoRenderer: FC<VideoRendererProps> = ({ video, className = "" }) => {
  if (!video) return null;

  const { mediaType, videoFile, videoUrl, posterImage, caption } = video;

  // Handle video file upload
  if (mediaType === "videoFile" && videoFile?.asset) {
    const videoSrc = videoFile.asset.url;
    const posterUrl = posterImage?.asset?.url;

    return (
      <figure className={className}>
        <video
          controls
          preload="metadata"
          playsInline
          poster={posterUrl}
          className="w-full h-auto rounded"
        >
          <source src={videoSrc} type="video/mp4" />
          <p>
            Your browser does not support HTML5 video. Please use a modern
            browser or{" "}
            <a href={videoSrc} download>
              download the video
            </a>
            .
          </p>
        </video>
        {caption && (
          <figcaption className="text-sm text-gray-600 mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // Handle external video URLs (YouTube/Vimeo)
  if (mediaType === "videoUrl" && videoUrl) {
    const youtubeId = getYouTubeId(videoUrl);
    const vimeoId = getVimeoId(videoUrl);

    if (youtubeId) {
      return (
        <div className={className}>
          <YouTubePosterOverlay
            videoUrl={videoUrl}
            posterUrl={posterImage?.asset?.url}
            caption={caption}
            youtubeId={youtubeId}
          />
        </div>
      );
    }

    if (vimeoId) {
      return (
        <div className={className}>
          <VimeoPosterOverlay
            videoUrl={videoUrl}
            posterUrl={posterImage?.asset?.url}
            caption={caption}
            vimeoId={vimeoId}
          />
        </div>
      );
    }

    // Fallback for unrecognized URLs
    return (
      <figure className={className}>
        <div className="bg-gray-200 rounded p-4 text-center">
          <p className="text-gray-600">
            Video unavailable.{" "}
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Open in new window
            </a>
          </p>
        </div>
        {caption && (
          <figcaption className="text-sm text-gray-600 mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
};

export default VideoRenderer;
