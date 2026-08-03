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
        gsap.set(panels, { autoAlpha: 0 });
        gsap.set(panels[0], { autoAlpha: 1 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=360%", pin: ".project-showcase-sticky", scrub: 1.2, anticipatePin: 1 } });
        panels.forEach((panel, index) => {
          if (index === 0) return;
          const previous = panels[index - 1];
          timeline.to(previous, { autoAlpha: 0, scale: 0.98, y: index % 2 ? -24 : 24, duration: 0.48, ease: "power2.inOut" }, `+=${index === 1 ? 0.58 : 0.4}`).fromTo(panel, { autoAlpha: 0, scale: 1.02, y: index % 2 ? 24 : -24 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.58, ease: "power3.out" }, ">");
        });
      });
      media.add("(max-width: 767px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]");
        gsap.set(panels, { autoAlpha: 0, y: 42 });
        panels.forEach((panel) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top 88%",
            once: true,
            onEnter: () => gsap.to(panel, { autoAlpha: 1, y: 0, duration: 1.05, ease: "power3.out", overwrite: true }),
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
        <div className="project-showcase-heading"><p><MagneticText text="Selected work" /></p><h2 id="work-title"><MagneticText text="Projects I have worked on." /></h2></div>
        <div className="project-panels">
          {projects.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <article className={`project-panel ${reversed ? "project-panel-even" : "project-panel-odd"}`} data-project-panel key={project.slug}>
                <div className="project-overview">
                  <p className="project-index"><MagneticText text={`0${index + 1}`} /></p>
                  <h3><KineticTitle text={project.title} /></h3>
                </div>
                <div className="project-scene">
                  <p><MagneticText text={project.showcaseDescription} /></p>
                  <ul>{project.technologies.map((technology) => <li key={technology}><MagneticText text={technology} /></li>)}</ul>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer"><MagneticText text="Repository" /> <ArrowUpRight aria-hidden="true" /></a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
