"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { MagneticText } from "@/components/magnetic-text";

export function HeroMotion() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-word]",
        { yPercent: 112, rotate: 1.5, opacity: 0 },
        { yPercent: 0, rotate: 0, opacity: 1, duration: 1.05, stagger: 0.12, ease: "power4.out", delay: 0.15 },
      );
      gsap.fromTo("[data-hero-pixel]", { opacity: 0, scale: 0.25 }, { opacity: 1, scale: 1, duration: 0.52, stagger: { each: 0.045, from: "random" }, ease: "power2.out", delay: 0.04 });
      gsap.fromTo("[data-hero-detail]", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.68 });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <p className="hero-kicker" data-hero-detail><MagneticText text="Java backend developer. Product-minded builder." /></p>
      <div className="hero-constellation" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-pixels" aria-hidden="true">{Array.from({ length: 20 }, (_, index) => <span data-hero-pixel key={index} />)}</div>
      <h1 id="hero-title" className="hero-title">
        <span className="hero-mask"><span data-hero-word><MagneticText text="Kush" /></span></span>
        <span className="hero-mask"><span className="hero-accent-word" data-hero-word><MagneticText text="Vyas" /></span></span>
      </h1>
      <div className="hero-detail" data-hero-detail>
        <p><MagneticText text="Full-stack Java developer focused on secure backend systems and clear product interfaces." /></p>
        <div className="hero-actions">
          <a href="#work" className="button-link"><MagneticText text="See work" /></a>
          <a href="/assets/documents/Kush-Vyas-Resume.pdf" className="quiet-link" download><MagneticText text="Resume" /></a>
        </div>
      </div>
      <p className="hero-coordinate" data-hero-detail><MagneticText text="Java. Spring Boot. Product engineering." /></p>
    </section>
  );
}
