"use client";

import CollectionPhotoCard from "@/components/CollectionPhotoCard";
import type { siteContent } from "@/content/site";

type FootwearPhotos = typeof siteContent.collection.footwearPhotos;

export default function FootwearCollectionCard({
  photos,
}: {
  photos: FootwearPhotos;
}) {
  return (
    <CollectionPhotoCard
      photos={photos}
      title="Footwear"
      index="01"
      preloadCover
    />
  );
}
