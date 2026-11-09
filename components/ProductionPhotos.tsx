"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/content/site";

type PhotoGroups = typeof siteContent.production.photoGroups;
type PhotoSelection = {
  groupIndex: number;
  photoIndex: number;
};

export default function ProductionPhotos({
  groups,
}: {
  groups: PhotoGroups;
}) {
  const [selection, setSelection] = useState<PhotoSelection | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const isOpen = selection !== null;
  const selectedPhoto =
    selection === null
      ? null
      : groups[selection.groupIndex].photos[selection.photoIndex];
  const selectedGroup =
    selection === null ? null : groups[selection.groupIndex];

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelection(null);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setSelection((currentSelection) => {
          if (currentSelection === null) return currentSelection;

          const photoCount =
            groups[currentSelection.groupIndex].photos.length;
          return {
            groupIndex: currentSelection.groupIndex,
            photoIndex:
              (currentSelection.photoIndex + direction + photoCount) %
              photoCount,
          };
        });
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
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [groups, isOpen]);

  const movePhoto = (direction: -1 | 1) => {
    setSelection((currentSelection) => {
      if (currentSelection === null) return currentSelection;

      const photoCount = groups[currentSelection.groupIndex].photos.length;
      return {
        groupIndex: currentSelection.groupIndex,
        photoIndex:
          (currentSelection.photoIndex + direction + photoCount) % photoCount,
      };
    });
  };

  return (
    <>
      <div className="production-photo-groups">
        {groups.map((group, groupIndex) => (
          <section
            className="production-photo-group"
            key={group.title}
            aria-labelledby={`production-photo-group-${groupIndex}`}
          >
            <h3
              className="production-photo-group-title"
              id={`production-photo-group-${groupIndex}`}
            >
              {group.title}
            </h3>
            <div className="production-photo-grid">
              {group.photos.map((photo, photoIndex) => (
                <button
                  className="production-photo-tile"
                  key={photo.src}
                  type="button"
                  onClick={(event) => {
                    returnFocusRef.current = event.currentTarget;
                    setSelection({ groupIndex, photoIndex });
                  }}
                >
                  <Image
                    className="production-photo-image"
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 700px) 44vw, (max-width: 1100px) 29vw, 22vw"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {selectedPhoto && selectedGroup && (
        <div
          className="production-lightbox-overlay"
          onClick={() => setSelection(null)}
        >
          <div
            className="production-lightbox"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={selectedGroup.title}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStartXRef.current =
                event.changedTouches[0]?.clientX ?? null;
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
              onClick={() => setSelection(null)}
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
                sizes="100vw"
                priority
              />
            </div>
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
      )}
    </>
  );
}
