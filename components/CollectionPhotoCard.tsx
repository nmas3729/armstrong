"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import PhotoLightbox, {
  type LightboxPhoto,
} from "@/components/PhotoLightbox";

export default function CollectionPhotoCard({
  photos,
  title,
  index,
  preloadCover,
}: {
  photos: readonly LightboxPhoto[];
  title: string;
  index: string;
  preloadCover: boolean;
}) {
  const [coverIndex, setCoverIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () =>
      setIsDocumentVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (
      isHovered ||
      isFocused ||
      lightboxIndex !== null ||
      !isDocumentVisible ||
      prefersReducedMotion ||
      photos.length < 2
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setCoverIndex((currentIndex) => (currentIndex + 1) % photos.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [
    isDocumentVisible,
    isFocused,
    isHovered,
    lightboxIndex,
    photos.length,
    prefersReducedMotion,
  ]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <article className="category-card">
      <button
        className="collection-card-button"
        ref={buttonRef}
        type="button"
        aria-label={`Open ${title.toLowerCase()} photos`}
        onClick={() => {
          returnFocusRef.current = buttonRef.current;
          setLightboxIndex(coverIndex);
        }}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span className="category-image-wrap collection-image-wrap">
          <span className="collection-image-stack">
            {photos.map((photo, photoIndex) => (
              <Image
                key={photo.src}
                className={`category-image collection-cover-image${photoIndex === coverIndex ? " collection-cover-image-active" : ""}`}
                src={photo.src}
                alt={photoIndex === coverIndex ? photo.alt : ""}
                aria-hidden={photoIndex !== coverIndex}
                fill
                sizes="(max-width: 700px) 92vw, (max-width: 1050px) 45vw, 30vw"
                {...(photoIndex === 0 && preloadCover
                  ? { preload: true }
                  : { loading: "lazy" as const })}
              />
            ))}
          </span>
          <span className="category-index" aria-hidden="true">
            {index}
          </span>
          <span className="collection-card-meta" aria-hidden="true">
            <span className="collection-card-hint">
              View all {photos.length}{" "}
              {photos.length === 1 ? "photo" : "photos"}
            </span>
            <span className="collection-card-counter">
              {coverIndex + 1} / {photos.length}
            </span>
          </span>
        </span>
        <span className="category-title">{title}</span>
      </button>
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          title={`${title} photos`}
          selectedIndex={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={closeLightbox}
          returnFocusRef={returnFocusRef}
          showCounter
        />
      )}
    </article>
  );
}
