import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { MagneticText } from "@/components/magnetic-text";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/portfolio";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  return project ? { title: `${project.title} | Kush Vyas`, description: project.summary } : {};
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return (
    <main>
      <Header />
      <article className="case-study">
        <Reveal><Link className="back-link" data-reveal-item href="/#work"><ArrowLeft aria-hidden="true" /> <MagneticText text="Back to work" /></Link></Reveal>
        <Reveal as="header">
          <p className="case-meta" data-reveal-item><MagneticText text={`Project. ${project.year}`} /></p>
          <h1 data-reveal-item><MagneticText text={project.title} /></h1>
          <p data-reveal-item><MagneticText text={project.summary} /></p>
        </Reveal>
        <Reveal className="case-image-reveal"><div className="case-image" data-reveal-item><Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width: 900px) 92vw, 82vw" /></div></Reveal>
        <Reveal className="case-content">
          <div data-reveal-item><p className="micro-title"><MagneticText text="Overview" /></p><p><MagneticText text={project.description} /></p></div>
          <div data-reveal-item><p className="micro-title"><MagneticText text="Engineering focus" /></p><p><MagneticText text={project.focus} /></p></div>
          <div data-reveal-item><p className="micro-title"><MagneticText text="Technology" /></p><ul>{project.technologies.map((item) => <li key={item}><MagneticText text={item} /></li>)}</ul></div>
        </Reveal>
        <Reveal className="case-notes"><p className="micro-title" data-reveal-item><MagneticText text="System notes" /></p><ul data-reveal-item>{project.systemNotes.map((note) => <li key={note}><MagneticText text={note} /></li>)}</ul></Reveal>
        <Reveal className="case-links"><a data-reveal-item href={project.githubUrl} target="_blank" rel="noreferrer"><GithubLogo aria-hidden="true" /> <MagneticText text="View repository" /> <ArrowUpRight aria-hidden="true" /></a><Link data-reveal-item href="/#contact"><MagneticText text="Start a conversation" /> <ArrowUpRight aria-hidden="true" /></Link></Reveal>
      </article>
    </main>
  );
}
