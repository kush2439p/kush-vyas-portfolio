"use client";

import { useEffect, useRef } from "react";

export function CursorAura() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!cursor.current || !enabled || reduced) return;

    let frame = 0;
    let x = -100;
    let y = -100;
    const update = () => {
      frame = 0;
      const target = document.elementFromPoint(x, y);
      cursor.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
      cursor.current?.toggleAttribute("data-text", Boolean(target?.closest(".magnetic-text, a, button")));
    };
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-aura" ref={cursor} aria-hidden="true" />;
}
