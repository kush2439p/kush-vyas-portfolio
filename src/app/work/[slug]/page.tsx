import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { MagneticText } from "@/components/magnetic-text";
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
        <Link className="back-link" href="/#work"><ArrowLeft aria-hidden="true" /> <MagneticText text="Back to work" /></Link>
        <header>
          <p className="case-meta"><MagneticText text={`Project. ${project.year}`} /></p>
          <h1><MagneticText text={project.title} /></h1>
          <p><MagneticText text={project.summary} /></p>
        </header>
        <div className="case-image"><Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width: 900px) 92vw, 82vw" /></div>
        <div className="case-content">
          <div><p className="micro-title"><MagneticText text="Overview" /></p><p><MagneticText text={project.description} /></p></div>
          <div><p className="micro-title"><MagneticText text="Engineering focus" /></p><p><MagneticText text={project.focus} /></p></div>
          <div><p className="micro-title"><MagneticText text="Technology" /></p><ul>{project.technologies.map((item) => <li key={item}><MagneticText text={item} /></li>)}</ul></div>
        </div>
        <div className="case-notes"><p className="micro-title"><MagneticText text="System notes" /></p><ul>{project.systemNotes.map((note) => <li key={note}><MagneticText text={note} /></li>)}</ul></div>
        <div className="case-links"><a href={project.githubUrl} target="_blank" rel="noreferrer"><GithubLogo aria-hidden="true" /> <MagneticText text="View repository" /> <ArrowUpRight aria-hidden="true" /></a><Link href="/#contact"><MagneticText text="Start a conversation" /> <ArrowUpRight aria-hidden="true" /></Link></div>
      </article>
    </main>
  );
}
