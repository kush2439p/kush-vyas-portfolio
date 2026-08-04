import { ArrowUpRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { ExperienceManifesto } from "@/components/experience-manifesto";
import { HeroMotion } from "@/components/hero-motion";
import { MagneticText } from "@/components/magnetic-text";
import { ProjectShowcase } from "@/components/project-showcase";
import { Reveal } from "@/components/reveal";
import { openSource, profile } from "@/data/portfolio";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroMotion />

      <ProjectShowcase />

      <section className="open-source-section" aria-labelledby="open-source-title">
        <Reveal className="open-source-title">
          <p data-reveal-item><MagneticText text="Open source" /></p>
          <h2 id="open-source-title" data-reveal-item><strong><MagneticText text="13" /></strong> <MagneticText text="authored pull requests." /></h2>
          <a className="inline-link" data-reveal-item href={profile.github} target="_blank" rel="noreferrer"><MagneticText text="GitHub profile" /> <ArrowUpRight aria-hidden="true" /></a>
        </Reveal>
        <Reveal className="open-source-list" stagger={0.08}>
          {openSource.map((contribution) => (
              <a data-reveal-item href={contribution.href} key={contribution.name} target="_blank" rel="noreferrer">
                <span><MagneticText text={contribution.name} /></span>
                <span><MagneticText text={contribution.reference} /></span>
                <ArrowUpRight aria-hidden="true" />
              </a>
          ))}
        </Reveal>
      </section>

      <ExperienceManifesto />

      <footer className="site-footer" id="contact">
        <Reveal>
          <p data-reveal-item><MagneticText text="Let's build something useful." /></p>
          <h2 data-reveal-item><a href={`mailto:${profile.email}`}><MagneticText text={profile.email} /></a></h2>
        </Reveal>
        <Reveal className="footer-bottom">
          <p data-reveal-item><MagneticText text={profile.location} /><br /><MagneticText text={profile.phone} /></p>
          <div data-reveal-item>
            <a href={profile.github} target="_blank" rel="noreferrer"><GithubLogo aria-hidden="true" /> <MagneticText text="GitHub" /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedinLogo aria-hidden="true" /> <MagneticText text="LinkedIn" /></a>
          </div>
          <p data-reveal-item><MagneticText text={`Copyright ${new Date().getFullYear()} Kush Vyas`} /></p>
        </Reveal>
      </footer>
    </main>
  );
}
