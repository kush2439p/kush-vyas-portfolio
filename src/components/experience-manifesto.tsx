"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticText } from "@/components/magnetic-text";
import { Reveal } from "@/components/reveal";
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
        const heading = root.current?.querySelector<HTMLElement>("[data-experience-heading]");
        const summary = root.current?.querySelector<HTMLElement>("[data-experience-summary]");
        if (!line) return;
        const revealTargets = (panel: HTMLElement) => panel.querySelectorAll<HTMLElement>("[data-experience-reveal]");
        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(panels.flatMap((panel) => Array.from(revealTargets(panel))), { autoAlpha: 0, y: 18 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=360%", pin: ".experience-manifesto-sticky", scrub: 1.2, anticipatePin: 1 } });
        if (heading || summary) timeline.fromTo([heading, summary].filter(Boolean), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.08, ease: "power3.out" });
        timeline.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.72, ease: "power2.inOut" });
        timeline.set(panels[0], { autoAlpha: 1 }).to(revealTargets(panels[0]), { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.06, ease: "power3.out" }).to({}, { duration: 0.44 });
        panels.forEach((panel, index) => {
          if (index === 0) return;
          const previous = panels[index - 1];
          timeline.to(previous, { autoAlpha: 0, scale: 0.98, y: -20, duration: 0.38, ease: "power2.inOut" }).fromTo(panel, { autoAlpha: 0, scale: 1.02, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.48, ease: "power3.out" }, ">").to(revealTargets(panel), { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.06, ease: "power3.out" }, "<0.08").to({}, { duration: 0.44 });
        });
      });
      media.add("(max-width: 767px)", () => {
        const rail = root.current?.querySelector<HTMLElement>("[data-experience-rail]");
        const panels = gsap.utils.toArray<HTMLElement>("[data-experience-panel]");
        const revealed = new Set<number>();
        let frame = 0;

        if (!rail || panels.length === 0) return;

        const wipes = root.current?.querySelectorAll<HTMLElement>("[data-experience-wipe]") ?? [];
        gsap.set(wipes, { display: "grid" });
        gsap.set(panels.flatMap((panel) => Array.from(panel.querySelectorAll<HTMLElement>("[data-experience-reveal]"))), { autoAlpha: 0, y: 18 });

        const revealPanel = (index: number) => {
          if (revealed.has(index)) return;
          revealed.add(index);
          const panel = panels[index];
          const wipe = panel.querySelector<HTMLElement>("[data-experience-wipe]");
          const tiles = panel.querySelectorAll<HTMLElement>("[data-experience-tile]");
          const targets = panel.querySelectorAll<HTMLElement>("[data-experience-reveal]");

          const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
          timeline.to(panel, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
          if (wipe) timeline.set(wipe, { autoAlpha: 1 });
          timeline.fromTo(tiles, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.58, duration: 0.38, stagger: { each: 0.025, from: "random" }, ease: "power2.out" }, "<");
          if (wipe) timeline.set(wipe, { display: "none" });
          timeline.to(targets, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "<0.1");
        };

        const inspectRail = () => {
          frame = 0;
          const railBox = rail.getBoundingClientRect();
          const center = railBox.left + railBox.width / 2;
          let nearest = 0;
          let distance = Number.POSITIVE_INFINITY;
          panels.forEach((panel, index) => {
            const box = panel.getBoundingClientRect();
            const panelCenter = box.left + box.width / 2;
            const nextDistance = Math.abs(panelCenter - center);
            if (nextDistance < distance) {
              distance = nextDistance;
              nearest = index;
            }
          });
          revealPanel(nearest);
        };

        const onScroll = () => {
          if (!frame) frame = window.requestAnimationFrame(inspectRail);
        };

        inspectRail();
        rail.addEventListener("scroll", onScroll, { passive: true });
        return () => {
          rail.removeEventListener("scroll", onScroll);
          if (frame) window.cancelAnimationFrame(frame);
        };
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section className="experience-manifesto" id="experience" ref={root} aria-labelledby="experience-title">
      <div className="experience-manifesto-sticky">
        <div className="experience-manifesto-heading" data-experience-heading><p><MagneticText text="Experience and open source" /></p><h2 id="experience-title"><MagneticText text="Where I have worked." /></h2><p className="experience-swipe-hint"><MagneticText text="Swipe through" /> <ArrowRight aria-hidden="true" /></p></div>
        <p className="experience-summary" data-experience-summary><MagneticText text="A focused record of teaching, security-minded backend work, and contributions upstream." /></p>
        <div className="experience-rule" aria-hidden="true"><span data-experience-line /></div>
        <div className="experience-moments" data-experience-rail>
          {moments.map((moment, index) => (
            <article className="experience-moment" data-experience-panel key={moment.title}>
              <div className="experience-pixel-wipe" data-experience-wipe aria-hidden="true">{Array.from({ length: 16 }, (_, tile) => <span data-experience-tile key={tile} />)}</div>
              <div className="experience-copy" data-experience-copy><p data-experience-reveal><MagneticText text={`0${index + 1}. ${moment.label}`} /></p><h3 data-experience-reveal><MagneticText text={moment.title} /></h3><p data-experience-reveal><MagneticText text={moment.detail} /></p>{moment.href ? <a data-experience-reveal href={moment.href} target="_blank" rel="noreferrer"><MagneticText text="View merged pull request" /></a> : null}</div>
              <div className="experience-side" data-experience-side><p className="experience-word" data-experience-reveal><MagneticText text={moment.word} /></p><p className="experience-meta" data-experience-reveal><MagneticText text={moment.meta} /></p></div>
            </article>
          ))}
        </div>
      </div>
      <Reveal className="capability-strip">
        <p data-reveal-item><MagneticText text="What I use" /></p>
        {capabilities.map(([group, ...skills]) => <article data-reveal-item key={group}><h3><MagneticText text={group} /></h3><p><MagneticText text={skills.join(", ")} /></p></article>)}
      </Reveal>
    </section>
  );
}
