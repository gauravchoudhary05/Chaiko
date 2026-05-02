"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";

const FRAME_COUNT = 240;

// ── TypeScript Interface added to fix the 'JarSequenceProps' error ──
interface JarSequenceProps {
  children?: ReactNode;
}

function getFrameUrl(index: number): string {
  // index is 1-based (1 → 240)
  const padded = String(index).padStart(6, "0");
  // 🚨 CRITICAL: Using the safe folder name without spaces
  return `/hero-sequence/Coffee_jar_to_202603271959_${padded}_result.webp`;
}

/**
 * Draws an image onto the canvas, now zoomed in to fit the desktop!
 */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  if (!imgW || !imgH) return;

  // 1. Calculate the base scale to fill the screen
  const baseScale = Math.max(canvasW / imgW, canvasH / imgH);

  // 👇 THE FIX: Change this to 1.0 for a perfect edge-to-edge fit! 👇
  const zoomFactor = 1.0;

  const scale = baseScale * zoomFactor;

  const drawW = imgW * scale;
  const drawH = imgH * scale;

  // 3. Keep the jar perfectly centered
  const offsetX = (canvasW - drawW) / 2;
  const offsetY = (canvasH - drawH) / 2;

  // 🚨 Critical drawing lines
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

export default function JarSequence({ children }: JarSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // ── Resize the canvas to match the viewport (DPR-aware) ──
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  // ── Draw a specific frame index ──
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];

    // Safety check: Make sure canvas exists and image is fully downloaded
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // Reset transform before drawing so cover math uses CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawCover(ctx, img, window.innerWidth, window.innerHeight);
  }, []);

  // ── Preload all images ──
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let firstLoaded = false;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      // Draw the first frame the millisecond it's ready so the screen isn't blank
      if (i === 1) {
        img.onload = () => {
          if (!firstLoaded) {
            firstLoaded = true;
            resizeCanvas();
            drawFrame(0);
          }
        };
      }

      // Error tracking to catch bad file names
      img.onerror = () => {
        console.error(`🚨 Failed to load frame ${i} at path: ${img.src}`);
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, [resizeCanvas, drawFrame]);

  // ── Scroll + Resize listeners ──
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // Calculate how far we can physically scroll within this container
      const scrollableHeight = container.scrollHeight - window.innerHeight;

      // Calculate how far the top of the container has scrolled past the viewport top
      const scrolled = -rect.top;

      // Clamp the fraction between 0 and 1
      const fraction = Math.min(Math.max(scrolled / scrollableHeight, 0), 1);

      // Map the 0-1 fraction to our 240 frames
      const frameIndex = Math.min(
        Math.floor(fraction * FRAME_COUNT),
        FRAME_COUNT - 1
      );

      // Only redraw if the frame actually changed to save CPU cycles
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    const handleResize = () => {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial sizing trigger
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [resizeCanvas, drawFrame]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-transparent">
      {/* Sticky viewport — canvas + overlaid children */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Added opacity-50 for the Ghost Test! */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          style={{ zIndex: 0 }}
        />

        {/* Children (Hero text, buttons, etc.) rendered safely on top */}
        <div className="relative z-10 h-full w-full">{children}</div>

      </div>
    </div>
  );
}