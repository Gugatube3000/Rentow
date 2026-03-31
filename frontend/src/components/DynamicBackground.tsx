'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 80;
const FRAME_INTERVAL = 80; // ~12.5 fps for smooth animation

/**
 * Animated background that cycles through the 80 dynamic background frames.
 * Uses preloaded <img> elements with crossfade for smooth transitions.
 */
export default function DynamicBackground() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, '0');
      img.src = `/bg/Generate_dynamic_smooth_video_delpmaspu__${padded}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 10) {
          // Start showing once first 10 frames loaded
          setLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Animation loop
  useEffect(() => {
    if (!loaded) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES);
    }, FRAME_INTERVAL);

    return () => clearInterval(interval);
  }, [loaded]);

  if (!loaded) return null;

  const padded = String(currentFrame).padStart(3, '0');
  const src = `/bg/Generate_dynamic_smooth_video_delpmaspu__${padded}.jpg`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Animated frame */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.35,
        }}
      />

      {/* Dark overlay for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10, 14, 26, 0.7) 0%, rgba(10, 14, 26, 0.85) 50%, rgba(10, 14, 26, 0.95) 100%)',
        }}
      />
    </div>
  );
}
