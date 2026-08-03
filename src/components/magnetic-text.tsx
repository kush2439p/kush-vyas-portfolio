"use client";

import { useLayoutEffect, useRef } from "react";

type Repeller = { root: HTMLElement; letters: HTMLElement[]; mode: "lift" | "scatter" };

const repellers = new Set<Repeller>();
let frame = 0;
let pointerX = -1000;
let pointerY = -1000;
let attached = false;

function updateRepellers() {
  frame = 0;
  repellers.forEach(({ root, letters, mode }) => {
    const rootRect = root.getBoundingClientRect();
    const nearGroup = pointerX > rootRect.left - 120 && pointerX < rootRect.right + 120 && pointerY > rootRect.top - 120 && pointerY < rootRect.bottom + 120;
    root.dataset.repelActive = nearGroup ? "true" : "false";

    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const deltaX = rect.left + rect.width / 2 - pointerX;
      const deltaY = rect.top + rect.height / 2 - pointerY;
      const distance = Math.hypot(deltaX, deltaY);
      const radius = 92;
      const strength = Math.max(0, 1 - distance / radius);
      if (mode === "scatter") {
        const scale = distance ? (strength * 11) / distance : 0;
        letter.style.transform = strength ? `translate3d(${deltaX * scale}px, ${deltaY * scale}px, 0)` : "translate3d(0, 0, 0)";
      } else {
        const lift = Math.pow(strength, 1.7) * 11;
        letter.style.transform = strength ? `translate3d(0, ${-lift}px, 0)` : "translate3d(0, 0, 0)";
      }
    });
  });
}

function scheduleUpdate() {
  if (!frame) frame = window.requestAnimationFrame(updateRepellers);
}

function handlePointerMove(event: PointerEvent) {
  pointerX = event.clientX;
  pointerY = event.clientY;
  scheduleUpdate();
}

function handlePointerLeave() {
  pointerX = -1000;
  pointerY = -1000;
  scheduleUpdate();
}

export function MagneticText({ text, className = "", mode = "lift" }: { text: string; className?: string; mode?: "lift" | "scatter" }) {
  const root = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const supportsRepel = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root.current || !supportsRepel || reduced) return;

    const entry = { root: root.current, letters: Array.from(root.current.querySelectorAll<HTMLElement>("[data-repel-letter]")), mode };
    repellers.add(entry);

    if (!attached) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("blur", handlePointerLeave);
      attached = true;
    }

    return () => {
      repellers.delete(entry);
      if (!repellers.size && attached) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("blur", handlePointerLeave);
        attached = false;
      }
      if (!repellers.size && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };
  }, [mode]);

  return (
    <span ref={root} className={`magnetic-text ${className}`} aria-label={text}>
      {text.split(/(\s+)/).map((part, groupIndex) => {
        if (/^\s+$/.test(part)) return part;
        return <span className="magnetic-word" aria-hidden="true" key={`${part}-${groupIndex}`}>{Array.from(part).map((letter, letterIndex) => <span data-repel-letter key={`${letter}-${letterIndex}`}>{letter}</span>)}</span>;
      })}
    </span>
  );
}
