"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";

export type LightboxPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function PhotoLightbox({
  photos,
  title,
  selectedIndex,
  onIndexChange,
  onClose,
  returnFocusRef,
  showCounter = false,
}: {
  photos: readonly LightboxPhoto[];
  title: string;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  showCounter?: boolean;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const selectedPhoto = photos[selectedIndex];

  useEffect(() => {
    const returnFocusElement = returnFocusRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocusElement?.focus();
    };
  }, [returnFocusRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        onIndexChange(
          (selectedIndex + direction + photos.length) % photos.length,
        );
      } else if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusableElements = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => element.getClientRects().length > 0);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (!firstElement || !lastElement) {
          event.preventDefault();
          dialog.focus();
        } else if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        } else if (!dialog.contains(document.activeElement)) {
          event.preventDefault();
          (event.shiftKey ? lastElement : firstElement).focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onIndexChange, photos.length, selectedIndex]);

  if (!selectedPhoto) return null;

  const movePhoto = (direction: -1 | 1) => {
    onIndexChange(
      (selectedIndex + direction + photos.length) % photos.length,
    );
  };

  return (
    <div className="production-lightbox-overlay" onClick={onClose}>
      <div
        className="production-lightbox"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const touchStartX = touchStartXRef.current;
          const touchEndX = event.changedTouches[0]?.clientX;
          if (touchStartX === null || touchEndX === undefined) return;

          const distance = touchStartX - touchEndX;
          if (Math.abs(distance) > 40) {
            movePhoto(distance > 0 ? 1 : -1);
          }
          touchStartXRef.current = null;
        }}
      >
        <button
          className="production-lightbox-close"
          ref={closeButtonRef}
          type="button"
          aria-label="Close photo"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        <button
          className="production-lightbox-arrow production-lightbox-arrow-left"
          type="button"
          aria-label="Previous photo"
          onClick={() => movePhoto(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="production-lightbox-image-wrap">
          <Image
            className="production-lightbox-image"
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            fill
            sizes="(max-width: 82rem) 100vw, 80rem"
            priority
          />
        </div>
        {showCounter && (
          <p className="production-lightbox-counter" aria-label="Photo number">
            {selectedIndex + 1} / {photos.length}
          </p>
        )}
        <button
          className="production-lightbox-arrow production-lightbox-arrow-right"
          type="button"
          aria-label="Next photo"
          onClick={() => movePhoto(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
