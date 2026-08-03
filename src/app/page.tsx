import { ArrowUpRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { CursorAura } from "@/components/cursor-aura";
import { ExperienceManifesto } from "@/components/experience-manifesto";
import { HeroMotion } from "@/components/hero-motion";
import { Loader } from "@/components/loader";
import { MagneticText } from "@/components/magnetic-text";
import { ProjectShowcase } from "@/components/project-showcase";
import { Reveal } from "@/components/reveal";
import { openSource, profile } from "@/data/portfolio";

export default function Home() {
  return (
    <main>
      <CursorAura />
      <Loader />
      <Header />
      <HeroMotion />

      <ProjectShowcase />

      <section className="open-source-section" aria-labelledby="open-source-title">
        <Reveal className="open-source-title">
          <p><MagneticText text="Open source" /></p>
          <h2 id="open-source-title"><strong><MagneticText text="13" /></strong> <MagneticText text="authored pull requests." /></h2>
          <a className="inline-link" href={profile.github} target="_blank" rel="noreferrer"><MagneticText text="GitHub profile" /> <ArrowUpRight aria-hidden="true" /></a>
        </Reveal>
        <div className="open-source-list">
          {openSource.map((contribution) => (
            <Reveal key={contribution.name}>
              <a href={contribution.href} target="_blank" rel="noreferrer">
                <span><MagneticText text={contribution.name} /></span>
                <span><MagneticText text={contribution.reference} /></span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <ExperienceManifesto />

      <footer className="site-footer" id="contact">
        <Reveal>
          <p><MagneticText text="Let's build something useful." /></p>
          <h2><a href={`mailto:${profile.email}`}><MagneticText text={profile.email} /></a></h2>
        </Reveal>
        <div className="footer-bottom">
          <p><MagneticText text={profile.location} /><br /><MagneticText text={profile.phone} /></p>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer"><GithubLogo aria-hidden="true" /> <MagneticText text="GitHub" /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedinLogo aria-hidden="true" /> <MagneticText text="LinkedIn" /></a>
          </div>
          <p><MagneticText text={`Copyright ${new Date().getFullYear()} Kush Vyas`} /></p>
        </div>
      </footer>
    </main>
  );
}
