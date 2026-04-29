"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface CarouselImage {
  src: string;
  alt: string;
}

const VIDEO_EXTENSIONS = [".mov", ".mp4", ".webm", ".ogg"];

function isVideo(src: string) {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext));
}

function MediaItem({
  src,
  alt,
  fill,
  sizes,
  priority,
  className,
  controls,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  controls?: boolean;
}) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        controls={controls}
        playsInline
        preload="metadata"
        className={className}
        style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : undefined}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

export default function ImageCarousel({
  images,
}: {
  images: CarouselImage[];
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const currentIsVideo = isVideo(images[current]?.src ?? "");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  if (images.length === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main slide with gradient frame */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/40 via-violet-500/20 to-emerald-500/30 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

          <div
            className={`relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-950 to-black aspect-video ${
              currentIsVideo ? "" : "cursor-zoom-in"
            }`}
            onClick={() => !currentIsVideo && setLightboxOpen(true)}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 260, damping: 30 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                }}
                className="absolute inset-0"
              >
                <MediaItem
                  src={images[current].src}
                  alt={images[current].alt}
                  fill
                  className={currentIsVideo ? "object-contain" : "object-contain"}
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority={current === 0}
                  controls={currentIsVideo}
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay on hover for caption readability (images only) */}
            {!currentIsVideo && (
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            {/* Caption on hover (images only) */}
            {!currentIsVideo && (
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <p className="text-sm text-white font-medium drop-shadow-lg">
                  {images[current].alt}
                </p>
              </div>
            )}

            {/* Expand icon indicator (images only) */}
            {!currentIsVideo && (
              <div className="absolute top-3 left-3 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </div>
            )}

            {/* Counter */}
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium text-white border border-white/10">
              {current + 1} <span className="text-zinc-500">/ {images.length}</span>
            </div>
          </div>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Previous"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Next"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => goTo(i)}
                className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === current
                    ? "border-blue-500 opacity-100 scale-100"
                    : "border-white/5 opacity-50 hover:opacity-80 hover:border-white/20 hover:scale-105"
                }`}
              >
                {isVideo(img.src) ? (
                  <>
                    <video
                      src={img.src}
                      preload="metadata"
                      muted
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                )}
                {i === current && (
                  <div className="absolute inset-0 ring-2 ring-blue-400/60 ring-inset rounded-md" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Caption below (always visible) */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-400 flex-1">{images[current].alt}</p>
          <span className="text-xs text-zinc-600 shrink-0 font-mono">
            {current + 1}/{images.length}
          </span>
        </div>

        {/* Dots indicator */}
        {images.length > 1 && images.length <= 20 && (
          <div className="flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-blue-500"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox (images only — videos use inline controls) */}
      <AnimatePresence>
        {lightboxOpen && !currentIsVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
              aria-label="Close lightbox"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white">
              {current + 1} <span className="text-zinc-500">/ {images.length}</span>
            </div>

            {/* Main image */}
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[current].src}
                alt={images[current].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Lightbox nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
                  aria-label="Previous"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
                  aria-label="Next"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-2xl text-center px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-sm text-white">{images[current].alt}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
