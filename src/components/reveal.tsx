"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!element.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        element.current,
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: element.current, start: "top 84%", once: true } },
      );
    }, element);
    return () => context.revert();
  }, []);

  return <div ref={element} className={className}>{children}</div>;
}
