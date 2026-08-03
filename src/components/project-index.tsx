"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { projects } from "@/data/portfolio";

export function ProjectIndex() {
  const [active, setActive] = useState(0);
  const selected = projects[active];

  return (
    <div className="project-index-layout">
      <div className="project-preview" aria-hidden="true">
        {projects.map((project, index) => (
          <Image key={project.slug} src={project.image} alt="" fill sizes="(max-width: 900px) 0px, 42vw" className={index === active ? "is-active" : ""} />
        ))}
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            className={index === active ? "project-row is-active" : "project-row"}
            href={`/work/${project.slug}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <span className="project-number">0{index + 1}</span>
            <span className="project-name">{project.title}</span>
            <span className="project-summary">{project.summary}</span>
            <span className="project-year">{project.year}</span>
            <ArrowUpRight weight="light" aria-hidden="true" />
            <span className="project-mobile-image"><Image src={project.image} alt={project.imageAlt} width={900} height={900} sizes="90vw" /></span>
          </Link>
        ))}
      </div>
      <p className="project-caption"><span>Selected view</span>{selected.title} / {selected.year}</p>
    </div>
  );
}
