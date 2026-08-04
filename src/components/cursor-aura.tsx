"use client";

import { useEffect, useRef } from "react";
import { subscribePointer } from "@/lib/pointer-runtime";

export function CursorAura() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!cursor.current || !enabled || reduced) return;

    return subscribePointer({
      onPointer: ({ x, y, active }) => {
        const target = active ? document.elementFromPoint(x, y) : null;
        cursor.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
        cursor.current?.toggleAttribute("data-text", Boolean(target?.closest(".magnetic-text, a, button")));
      },
    });
  }, []);

  return <div className="cursor-aura" ref={cursor} aria-hidden="true" />;
}
