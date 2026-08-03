"use client";

import { useRef, useState } from "react";
import { MagneticText } from "@/components/magnetic-text";

const variations = ["kinetic-title-a", "kinetic-title-b", "kinetic-title-c", "kinetic-title-d"];

export function KineticTitle({ text, className = "" }: { text: string; className?: string }) {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [variation, setVariation] = useState(variations[0]);

  function start() {
    const supported = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supported || reduced) return;
    if (timer.current) return;
    timer.current = setInterval(() => {
      setVariation(variations[Math.floor(Math.random() * variations.length)]);
    }, 1280);
  }

  function stop() {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setVariation(variations[0]);
  }

  return <span className={`kinetic-title ${variation} ${className}`} onPointerEnter={start} onPointerLeave={stop}><MagneticText text={text} /></span>;
}
