"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  ...Array.from(
    { length: 16 },
    (_, index) => `/slides/photo_${index + 1}_2026-10-01_17-57-27.jpg`,
  ),
  "/slides/photo_2026-10-01_17-40-34.jpg",
];

export default function PhotoSlideshow() {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentPhoto((current) => (current + 1) % photos.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="photo-frame" aria-label="Wedding photo slideshow">
      {photos.map((photo, index) => (
        <Image
          key={photo}
          className={`slide-image${index === currentPhoto ? " is-active" : ""}`}
          src={photo}
          alt={index === currentPhoto ? `Wedding event photo ${index + 1} of ${photos.length}` : ""}
          aria-hidden={index !== currentPhoto}
          fill
          sizes="(max-width: 700px) 250px, 295px"
          priority={index === 0}
          loading={index === 0 ? undefined : "eager"}
        />
      ))}

    </div>
  );
}
