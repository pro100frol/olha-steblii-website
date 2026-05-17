"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface PortfolioItem {
  src: string;
  title: string;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const goToPrevious = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
    }
  }, [lightboxIndex, items.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % items.length);
    }
  }, [lightboxIndex, items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, goToPrevious, goToNext]);

  return (
    <>
      {/* True Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden break-inside-avoid mb-6 group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openLightbox(index)}
          >
            <div className="relative">
              <Image
                src={item.src}
                alt={item.title}
                width={600}
                height={800}
                {...(index === 0 ? { priority: true } : {})}
                className={`w-full h-auto object-cover transition-transform duration-700 ${
                  hoveredIndex === index ? "scale-[1.02]" : "scale-100"
                }`}
              />
              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-background/70 transition-opacity duration-500 flex items-end p-8 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.25em] text-foreground">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-muted-foreground hover:text-foreground transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 md:left-8 p-3 text-muted-foreground hover:text-foreground transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[lightboxIndex].src}
              alt={items[lightboxIndex].title}
              width={1200}
              height={1600}
              className="max-h-[85vh] w-auto object-contain"
            />
            <p className="absolute bottom-0 left-0 right-0 text-center py-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {items[lightboxIndex].title}
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 md:right-8 p-3 text-muted-foreground hover:text-foreground transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {lightboxIndex + 1} / {items.length}
          </div>
        </div>
      )}
    </>
  );
}
