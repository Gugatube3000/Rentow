'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent, useSpring } from 'framer-motion';

const TOTAL_FRAMES = 80;

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // Track scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'], 
  });

  // Apply a spring physics layer to the scroll progress for buttery smooth inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // Preload all frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const paddedIndex = String(i).padStart(3, '0');
        const img = new Image();
        img.src = `/scroll-anim/ezgif-frame-${paddedIndex}.jpg`;
        
        img.onload = () => {
          loadedCount++;
          // When first image loads, size the canvas to match its native aspect ratio
          if (loadedCount === 1 && canvasRef.current) {
            canvasRef.current.width = img.width || 1280;
            canvasRef.current.height = img.height || 720;
            const ctx = canvasRef.current.getContext('2d');
            ctx?.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        };
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Update canvas dynamically as the user scrolls, using the smoothed spring progress
  useMotionValueEvent(smoothProgress, "change", (latest: number) => {
    if (images.length < 10 || !canvasRef.current) return;
    
    let frameIndex = Math.floor(latest * TOTAL_FRAMES);
    
    if (frameIndex < 0) frameIndex = 0;
    if (frameIndex > TOTAL_FRAMES - 1) frameIndex = TOTAL_FRAMES - 1;

    const ctx = canvasRef.current.getContext('2d');
    const imgToDraw = images[frameIndex];
    if (ctx && imgToDraw && imgToDraw.complete) {
       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
       ctx.drawImage(imgToDraw, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  });

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        position: 'relative',
        borderRadius: 'var(--radius-md)', 
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.2)', // skeleton dark loading bg
      }}
    >
        <canvas 
          ref={canvasRef} 
          style={{ 
            width: '100%', 
            height: 'auto', 
            display: 'block',
            // Scale up and offset to crop out the Veo logo on the bottom right
            transform: 'scale(1.15) translate(-2%, 4%)',
            // Blend mode and reduced opacity for a high-end glowing HUD effect
            opacity: 0.75,
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Subtle glass reflection overlay to make it feel embedded in the UI */}
        <div style={{
           position: 'absolute',
           inset: 0,
           background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 40%)',
           pointerEvents: 'none',
           boxShadow: 'inset 0 0 20px rgba(0, 212, 255, 0.05)',
        }} />
    </div>
  );
}
