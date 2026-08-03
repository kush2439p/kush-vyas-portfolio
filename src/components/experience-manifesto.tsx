"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticText } from "@/components/magnetic-text";
import { capabilities } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const moments = [
  { label: "Experience", title: "Modern Age Coders", detail: "Taught more than 100 students across Python, Java, Scratch, DSA, and OOP. Worked as a hackathon judge and contributed to frontend website work.", word: "teach", meta: "Python, Java, DSA, OOP" },
  { label: "Experience", title: "Infosys Springboard", detail: "Java Backend Developer Intern for a Smart Procurement and Vendor Management System. Built Spring APIs, persistence flows, and security-focused backend features with Java, Spring Boot, Hibernate, and React.", word: "secure", meta: "Java, Spring Boot, Hibernate, React" },
  { label: "Merged contribution", title: "Redis", detail: "Merged PR #15491 removed broken clean rules from Redis's vendored xxhash setup, eliminating noisy missing-test-directory errors during cleanup.", word: "redis", meta: "C, Makefile, build tooling", href: "https://github.com/redis/redis/pull/15491" },
  { label: "Merged contribution", title: "Apache StreamPipes", detail: "Merged PR #4724 implemented consistent keyboard shortcut sequences, navigation, and supporting unit tests across the product.", word: "ship", meta: "TypeScript, keyboard interaction, testing", href: "https://github.com/apache/streampipes/pull/4724" },
];

export function ExperienceManifesto() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-experience-panel]");
        const line = root.current?.querySelector<HTMLElement>("[data-experience-line]");
        if (!line) return;
        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(panels[0], { autoAlpha: 1 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=360%", pin: ".experience-manifesto-sticky", scrub: 1.2, anticipatePin: 1 } });
        timeline.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.72, ease: "power2.inOut" });
        panels.forEach((panel, index) => {
          if (index === 0) return;
          const previous = panels[index - 1];
          timeline.to(previous, { autoAlpha: 0, scale: 0.98, y: -20, duration: 0.48, ease: "power2.inOut" }, `+=${index === 1 ? 0.58 : 0.4}`).fromTo(panel, { autoAlpha: 0, scale: 1.02, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.58, ease: "power3.out" }, ">");
        });
      });
      media.add("(max-width: 767px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-experience-panel]");
        panels.forEach((panel) => {
          gsap.fromTo(panel, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.76, ease: "power3.out", scrollTrigger: { trigger: panel, start: "top 86%", once: true } });
        });
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section className="experience-manifesto" id="experience" ref={root} aria-labelledby="experience-title">
      <div className="experience-manifesto-sticky">
        <div className="experience-manifesto-heading"><p><MagneticText text="Experience and open source" /></p><h2 id="experience-title"><MagneticText text="Where I have worked." /></h2></div>
        <div className="experience-rule" aria-hidden="true"><span data-experience-line /></div>
        <div className="experience-moments">
          {moments.map((moment, index) => (
            <article className="experience-moment" data-experience-panel key={moment.title}>
              <div className="experience-copy"><p><MagneticText text={`0${index + 1}. ${moment.label}`} /></p><h3><MagneticText text={moment.title} /></h3><p><MagneticText text={moment.detail} /></p>{moment.href ? <a href={moment.href} target="_blank" rel="noreferrer"><MagneticText text="View merged pull request" /></a> : null}</div>
              <div className="experience-side"><p className="experience-word"><MagneticText text={moment.word} /></p><p className="experience-meta"><MagneticText text={moment.meta} /></p></div>
            </article>
          ))}
        </div>
      </div>
      <div className="capability-strip">
        <p><MagneticText text="What I use" /></p>
        {capabilities.map(([group, ...skills]) => <article key={group}><h3><MagneticText text={group} /></h3><p><MagneticText text={skills.join(", ")} /></p></article>)}
      </div>
    </section>
  );
}
