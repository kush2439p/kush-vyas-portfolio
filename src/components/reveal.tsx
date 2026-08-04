"use client";

import { type ElementType, type ReactNode, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = { children: ReactNode; className?: string; stagger?: number; distance?: number; start?: string; as?: ElementType };

export function Reveal({ children, className = "", stagger = 0.09, distance = 28, start, as: Component = "div" }: RevealProps) {
  const element = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!element.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const root = element.current;
      if (!root) return;
      const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-item]"));
      const items = targets.length ? targets : [root];
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const targetStart = start ?? (mobile ? "top 90%" : "top 84%");
      const targetDistance = mobile ? Math.min(distance, 20) : distance;
      const rect = root.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top < window.innerHeight * 0.12) {
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.set(items, { autoAlpha: 0, y: targetDistance });
      gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.72, stagger, ease: "power3.out", clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: root, start: targetStart, once: true } });
    }, element);
    return () => context.revert();
  }, [distance, stagger, start]);

  return <Component ref={element} className={className}>{children}</Component>;
}
