"use client";

import { Leaf, type IconWeight } from "@phosphor-icons/react";
import { type CSSProperties, useEffect, useRef } from "react";
import { subscribePointer, type PointerFrame } from "@/lib/pointer-runtime";

type LeafConfig = { id: string; x: number; y: number; mobileX: number; mobileY: number; size: number; rotation: number; phase: number; driftX: number; driftY: number; speed: number; opacity: number };
type LeafState = { x: number; y: number; rotation: number; velocityX: number; velocityY: number; spin: number };

const leaves: LeafConfig[] = [
  { id: "leaf-01", x: 4, y: 8, mobileX: 7, mobileY: 9, size: 18, rotation: -38, phase: 0.3, driftX: 5, driftY: 8, speed: 0.00044, opacity: 0.48 }, { id: "leaf-02", x: 10, y: 24, mobileX: 10, mobileY: 27, size: 13, rotation: 24, phase: 1.1, driftX: 7, driftY: 5, speed: 0.00058, opacity: 0.35 }, { id: "leaf-03", x: 94, y: 11, mobileX: 91, mobileY: 14, size: 20, rotation: 55, phase: 2.2, driftX: 8, driftY: 5, speed: 0.00039, opacity: 0.52 }, { id: "leaf-04", x: 87, y: 30, mobileX: 90, mobileY: 32, size: 14, rotation: -72, phase: 3.2, driftX: 5, driftY: 9, speed: 0.00052, opacity: 0.4 },
  { id: "leaf-05", x: 3, y: 43, mobileX: 8, mobileY: 45, size: 23, rotation: 18, phase: 0.8, driftX: 8, driftY: 10, speed: 0.00034, opacity: 0.43 }, { id: "leaf-06", x: 96, y: 49, mobileX: 92, mobileY: 48, size: 16, rotation: -24, phase: 4.4, driftX: 6, driftY: 7, speed: 0.00046, opacity: 0.36 }, { id: "leaf-07", x: 12, y: 62, mobileX: 11, mobileY: 58, size: 12, rotation: 84, phase: 2.7, driftX: 5, driftY: 5, speed: 0.00061, opacity: 0.32 }, { id: "leaf-08", x: 92, y: 68, mobileX: 89, mobileY: 66, size: 24, rotation: -50, phase: 1.8, driftX: 9, driftY: 7, speed: 0.00037, opacity: 0.5 },
  { id: "leaf-09", x: 5, y: 81, mobileX: 9, mobileY: 76, size: 15, rotation: 33, phase: 4.9, driftX: 5, driftY: 8, speed: 0.00049, opacity: 0.42 }, { id: "leaf-10", x: 95, y: 89, mobileX: 89, mobileY: 84, size: 18, rotation: -12, phase: 3.9, driftX: 8, driftY: 6, speed: 0.00042, opacity: 0.48 }, { id: "leaf-11", x: 20, y: 5, mobileX: 20, mobileY: 18, size: 11, rotation: 62, phase: 5.5, driftX: 4, driftY: 6, speed: 0.00066, opacity: 0.25 }, { id: "leaf-12", x: 79, y: 6, mobileX: 78, mobileY: 23, size: 12, rotation: -68, phase: 0.6, driftX: 6, driftY: 4, speed: 0.00055, opacity: 0.28 },
  { id: "leaf-13", x: 18, y: 35, mobileX: 18, mobileY: 38, size: 10, rotation: 9, phase: 2.9, driftX: 4, driftY: 5, speed: 0.00059, opacity: 0.22 }, { id: "leaf-14", x: 82, y: 42, mobileX: 82, mobileY: 42, size: 13, rotation: 42, phase: 3.6, driftX: 7, driftY: 4, speed: 0.00048, opacity: 0.26 }, { id: "leaf-15", x: 19, y: 73, mobileX: 19, mobileY: 69, size: 14, rotation: -34, phase: 1.5, driftX: 6, driftY: 6, speed: 0.00051, opacity: 0.28 }, { id: "leaf-16", x: 80, y: 78, mobileX: 80, mobileY: 74, size: 10, rotation: 76, phase: 5.1, driftX: 4, driftY: 7, speed: 0.00063, opacity: 0.24 },
  { id: "leaf-17", x: 34, y: 16, mobileX: 28, mobileY: 14, size: 11, rotation: -58, phase: 0.9, driftX: 5, driftY: 5, speed: 0.00054, opacity: 0.18 }, { id: "leaf-18", x: 68, y: 27, mobileX: 71, mobileY: 29, size: 10, rotation: 31, phase: 4.1, driftX: 4, driftY: 6, speed: 0.0006, opacity: 0.2 }, { id: "leaf-19", x: 29, y: 55, mobileX: 22, mobileY: 54, size: 12, rotation: 53, phase: 2.1, driftX: 6, driftY: 4, speed: 0.00047, opacity: 0.2 }, { id: "leaf-20", x: 72, y: 58, mobileX: 76, mobileY: 58, size: 11, rotation: -20, phase: 5.7, driftX: 4, driftY: 7, speed: 0.00057, opacity: 0.19 },
  { id: "leaf-21", x: 36, y: 88, mobileX: 34, mobileY: 90, size: 10, rotation: 47, phase: 3.3, driftX: 4, driftY: 4, speed: 0.00064, opacity: 0.18 }, { id: "leaf-22", x: 64, y: 91, mobileX: 65, mobileY: 88, size: 12, rotation: -45, phase: 1.4, driftX: 6, driftY: 5, speed: 0.0005, opacity: 0.21 },
];

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);

// Copper variants and staggered paths keep the ambience autumnal without
// importing the supplied reference site's visual assets or layout.
const leafTones = ["copper", "ember", "soft", "copper", "ember", "soft"] as const;
const leafWeights: IconWeight[] = ["fill", "duotone", "fill", "regular", "fill", "duotone"];

export function SpringAtmosphere() {
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const states = useRef<LeafState[]>(leaves.map(() => ({ x: 0, y: 0, rotation: 0, velocityX: 0, velocityY: 0, spin: 0 })));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
    const applyImpulse = (frame: PointerFrame) => {
      if (!frame.active) return;
      const mobile = isMobile(); const radius = frame.pointerType === "touch" || mobile ? 74 : 96; const maximum = frame.pointerType === "touch" || mobile ? 30 : 42;
      leaves.forEach((leaf, index) => { const state = states.current[index]; const centerX = ((mobile ? leaf.mobileX : leaf.x) / 100) * window.innerWidth + state.x; const centerY = ((mobile ? leaf.mobileY : leaf.y) / 100) * window.innerHeight + state.y; const dx = centerX - frame.x; const dy = centerY - frame.y; const distance = Math.hypot(dx, dy); if (distance > radius) return; const force = Math.pow(1 - distance / radius, 2); const impulse = clamp(force * maximum * 0.11, 0, 3.2); state.velocityX = clamp(state.velocityX + (dx / Math.max(distance, 1)) * impulse, -3.8, 3.8); state.velocityY = clamp(state.velocityY + (dy / Math.max(distance, 1)) * impulse, -3.8, 3.8); state.spin = clamp(state.spin + ((dx - dy) / Math.max(distance, 1)) * force * 1.6, -2.4, 2.4); });
    };
    const render = (frame: PointerFrame) => { const step = frame.deltaTime / 16.667; leaves.forEach((leaf, index) => { const state = states.current[index]; state.x = clamp(state.x + state.velocityX * step, -54, 54); state.y = clamp(state.y + state.velocityY * step, -54, 54); state.rotation += state.spin * step; state.velocityX *= Math.pow(0.91, step); state.velocityY *= Math.pow(0.91, step); state.spin *= Math.pow(0.9, step); const wave = frame.elapsed * leaf.speed + leaf.phase; const crosswind = Math.sin(wave * 0.41 + leaf.phase) * (leaf.driftX * 0.72); const settling = Math.cos(wave * 0.35 + leaf.phase) * (leaf.driftY * 0.62); const node = nodes.current[index]; if (node) node.style.transform = `translate3d(${state.x + Math.sin(wave) * leaf.driftX + crosswind}px, ${state.y + Math.cos(wave * 0.82) * leaf.driftY + settling}px, 0) rotate(${leaf.rotation + state.rotation + Math.sin(wave * 0.7) * 11}deg)`; }); };
    return subscribePointer({ onPointer: applyImpulse, onFrame: render });
  }, []);

  return <div className="spring-atmosphere" data-spring-atmosphere aria-hidden="true">{leaves.map((leaf, index) => <span className="spring-leaf-anchor" data-spring-leaf data-leaf-index={index} data-leaf-tone={leafTones[index % leafTones.length]} key={leaf.id} style={{ "--leaf-x": `${leaf.x}%`, "--leaf-y": `${leaf.y}%`, "--leaf-mobile-x": `${leaf.mobileX}%`, "--leaf-mobile-y": `${leaf.mobileY}%`, opacity: leaf.opacity } as CSSProperties}><span className="spring-leaf-motion" ref={(node) => { nodes.current[index] = node; }}><Leaf weight={leafWeights[index % leafWeights.length]} size={leaf.size} /></span></span>)}</div>;
}
