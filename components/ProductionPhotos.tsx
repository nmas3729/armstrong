"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import PhotoLightbox from "@/components/PhotoLightbox";
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
  const returnFocusRef = useRef<HTMLElement>(null);
  const selectedPhoto =
    selection === null
      ? null
      : groups[selection.groupIndex].photos[selection.photoIndex];
  const selectedGroup =
    selection === null ? null : groups[selection.groupIndex];

  const closeLightbox = useCallback(() => setSelection(null), []);
  const changePhoto = useCallback((photoIndex: number) => {
    setSelection((currentSelection) =>
      currentSelection === null
        ? currentSelection
        : { ...currentSelection, photoIndex },
    );
  }, []);

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

      {selectedPhoto && selectedGroup && selection && (
        <PhotoLightbox
          photos={selectedGroup.photos}
          title={selectedGroup.title}
          selectedIndex={selection.photoIndex}
          onIndexChange={changePhoto}
          onClose={closeLightbox}
          returnFocusRef={returnFocusRef}
        />
      )}
    </>
  );
}
