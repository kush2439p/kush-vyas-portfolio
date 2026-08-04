"use client";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KineticTitle } from "@/components/kinetic-title";
import { MagneticText } from "@/components/magnetic-text";
import { projects } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function ProjectShowcase() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]");
        const heading = root.current?.querySelector<HTMLElement>("[data-project-heading]");
        const revealTargets = (panel: HTMLElement) => panel.querySelectorAll<HTMLElement>("[data-project-reveal]");
        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(panels.flatMap((panel) => Array.from(revealTargets(panel))), { autoAlpha: 0, y: 18 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=360%", pin: ".project-showcase-sticky", scrub: 1.2, anticipatePin: 1 } });
        if (heading) timeline.fromTo(heading, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.34, ease: "power3.out" });
        timeline.set(panels[0], { autoAlpha: 1 }).to(revealTargets(panels[0]), { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.06, ease: "power3.out" }).to({}, { duration: 0.45 });
        panels.forEach((panel, index) => {
          if (index === 0) return;
          const previous = panels[index - 1];
          timeline.to(previous, { autoAlpha: 0, scale: 0.98, y: index % 2 ? -24 : 24, duration: 0.38, ease: "power2.inOut" }).fromTo(panel, { autoAlpha: 0, scale: 1.02, y: index % 2 ? 24 : -24 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.48, ease: "power3.out" }, ">").to(revealTargets(panel), { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.06, ease: "power3.out" }, "<0.08").to({}, { duration: 0.45 });
        });
      });
      media.add("(max-width: 767px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]");
        const heading = root.current?.querySelector<HTMLElement>("[data-project-heading]");
        if (heading) gsap.fromTo(heading, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.64, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 88%", once: true } });
        panels.forEach((panel) => {
          const targets = panel.querySelectorAll<HTMLElement>("[data-project-reveal]");
          gsap.set(targets, { autoAlpha: 0, y: 24 });
          ScrollTrigger.create({
            trigger: panel,
            start: "top 88%",
            once: true,
            onEnter: () => gsap.to(targets, { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.09, ease: "power3.out", overwrite: true, clearProps: "transform,opacity,visibility" }),
          });
        });
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section className="project-showcase" id="work" ref={root} aria-labelledby="work-title">
      <div className="project-showcase-sticky">
        <div className="project-showcase-heading" data-project-heading><p><MagneticText text="Selected work" /></p><h2 id="work-title"><MagneticText text="Projects I have worked on." /></h2></div>
        <div className="project-panels">
          {projects.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <article className={`project-panel ${reversed ? "project-panel-even" : "project-panel-odd"}`} data-project-panel key={project.slug}>
                <div className="project-overview">
                  <p className="project-index" data-project-reveal><MagneticText text={`0${index + 1}`} /></p>
                  <h3 data-project-reveal><KineticTitle text={project.title} /></h3>
                </div>
                <div className="project-scene">
                  <p data-project-reveal><MagneticText text={project.showcaseDescription} /></p>
                  <ul data-project-reveal>{project.technologies.map((technology) => <li key={technology}><MagneticText text={technology} /></li>)}</ul>
                  <a data-project-reveal href={project.githubUrl} target="_blank" rel="noreferrer"><MagneticText text="Repository" /> <ArrowUpRight aria-hidden="true" /></a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
