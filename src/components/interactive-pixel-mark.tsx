"use client";

import { useEffect, useRef } from "react";
import { subscribePointer, type PointerFrame } from "@/lib/pointer-runtime";

type PixelState = { targetX: number; targetY: number; targetRotation: number; x: number; y: number; rotation: number };
const totalPixels = 20;

export function InteractivePixelMark() {
  const root = useRef<HTMLDivElement>(null);
  const anchors = useRef<(HTMLSpanElement | null)[]>([]);
  const tiles = useRef<(HTMLSpanElement | null)[]>([]);
  const centers = useRef<{ x: number; y: number }[]>([]);
  const states = useRef<PixelState[]>(Array.from({ length: totalPixels }, () => ({ targetX: 0, targetY: 0, targetRotation: 0, x: 0, y: 0, rotation: 0 })));

  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !root.current) return;
    const measure = () => { centers.current = anchors.current.map((anchor) => { const rect = anchor?.getBoundingClientRect(); return rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : { x: -1000, y: -1000 }; }); };
    measure(); const observer = new ResizeObserver(measure); observer.observe(root.current); window.addEventListener("resize", measure, { passive: true });
    const setTargets = (frame: PointerFrame) => states.current.forEach((state, index) => { const center = centers.current[index]; const dx = center.x - frame.x; const dy = center.y - frame.y; const distance = frame.active ? Math.hypot(dx, dy) : Number.POSITIVE_INFINITY; const strength = Math.max(0, 1 - distance / 90); const scale = distance && Number.isFinite(distance) ? (strength * 10) / distance : 0; state.targetX = dx * scale; state.targetY = dy * scale; state.targetRotation = strength * (dx > 0 ? 5 : -5); });
    const render = () => states.current.forEach((state, index) => { state.x += (state.targetX - state.x) * 0.16; state.y += (state.targetY - state.y) * 0.16; state.rotation += (state.targetRotation - state.rotation) * 0.16; const tile = tiles.current[index]; if (tile) tile.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.rotation}deg)`; });
    const unsubscribe = subscribePointer({ onPointer: setTargets, onFrame: render });
    return () => { unsubscribe(); observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  return <div className="hero-pixels" ref={root} aria-hidden="true" data-hero-pixel-mark>{Array.from({ length: totalPixels }, (_, index) => <span className="hero-pixel-anchor" key={index} ref={(node) => { anchors.current[index] = node; }}><span className="hero-pixel-tile" data-hero-pixel ref={(node) => { tiles.current[index] = node; }} /></span>)}</div>;
}
