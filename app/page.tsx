import Image from "next/image";
import ReviewDiff from "@/components/review-diff";
import ThemeToggle from "@/components/theme-toggle";
import ContactForm from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import {
  certifications,
  experience,
  featuredProject,
  impact,
  nav,
  projects,
  site,
  skills,
  type Project,
} from "@/lib/content";

const wrap = "mx-auto w-full max-w-[72rem] px-5 sm:px-8";

function SectionHeading({ id, children, intro }: { id: string; children: React.ReactNode; intro?: React.ReactNode }) {
  return (
    <header className="mb-10 max-w-[44rem] sm:mb-14">
      <h2 id={`${id}-title`} className="m-0 font-display text-[2.25rem] font-bold leading-[1.05] tracking-[-0.01em] sm:text-[2.75rem]">
        {children}
      </h2>
      {intro ? <p className="mt-4 mb-0 text-lg text-muted">{intro}</p> : null}
    </header>
  );
}

function ProjectLinks({ links }: { links: Project["links"] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noreferrer" className="marked font-medium">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Stack({ items }: { items: string[] }) {
  return <p className="m-0 text-sm text-muted">Built with {items.slice(0, -1).join(", ")} and {items.at(-1)}.</p>;
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/85 backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
          <a href="#top" className="font-display text-lg font-bold tracking-tight">
            {site.name}
          </a>
          <nav aria-label="Sections" className="flex items-center gap-1">
            <ul className="m-0 hidden list-none gap-1 p-0 md:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="rounded-md px-3 py-2 text-[0.95rem] text-muted hover:bg-surface hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" aria-labelledby="hero-title" className={`${wrap} grid grid-cols-1 gap-12 pt-14 pb-20 sm:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-14 lg:pb-28`}>
          <div>
            <h1 id="hero-title" className="m-0 font-display text-[3.5rem] font-bold leading-[0.92] tracking-[-0.02em] sm:text-[5.25rem]">
              Rahul
              <br />
              Tiwari
            </h1>
            <p className="mt-6 mb-0 max-w-[30rem] font-display text-[1.6rem] font-semibold leading-tight sm:text-[1.9rem]">
              AI-native backend engineer, building in Java and Spring Boot.
            </p>
            <p className="mt-5 mb-0 max-w-[34rem] text-muted">
              I&apos;m a Software Engineer at Hexaware on Citi&apos;s branded cards platform, where I
              build card-processing microservices that sustain 1,200 requests per second. I also build
              GenAI tools tested like any other production code. Based in {site.location}.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className="rounded-md bg-ink px-5 py-2.5 font-medium text-paper hover:opacity-90">
                Email me
              </a>
              <a href={site.resume} download className="rounded-md border border-ink/25 px-5 py-2.5 font-medium hover:border-ink">
                Download resume
              </a>
              <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="grid h-11 w-11 place-items-center rounded-md text-muted hover:bg-surface hover:text-ink">
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="grid h-11 w-11 place-items-center rounded-md text-muted hover:bg-surface hover:text-ink">
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <ReviewDiff />
        </section>

        {/* Impact */}
        <section id="impact" aria-labelledby="impact-title" className="border-t border-rule bg-surface py-20 sm:py-28">
          <div className={wrap}>
            <SectionHeading id="impact" intro="Results from production on Citi's branded cards platform, where I've worked since August 2024.">
              What I&apos;ve shipped at Citi
            </SectionHeading>
            <div className="grid gap-14">
              {impact.map((group) => (
                <div key={group.title} className="grid gap-5 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
                  <div>
                    <h3 className="m-0 text-lg font-semibold">{group.title}</h3>
                    <p className="mt-1 mb-0 text-[0.95rem] text-muted">{group.summary}</p>
                  </div>
                  <dl className="m-0 border-t border-ink/80">
                    {group.rows.map((row) => (
                      <div key={row.figure + row.text} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                        <dt className="font-display text-[1.75rem] font-bold leading-none tabular-nums sm:text-[2.25rem]">{row.figure}</dt>
                        <dd className="m-0 max-w-[40rem] self-center">{row.text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" aria-labelledby="projects-title" className="py-20 sm:py-28">
          <div className={wrap}>
            <SectionHeading id="projects" intro="Personal projects, built end to end. The first one is the best place to see how I work with LLMs.">
              Projects
            </SectionHeading>

            <article className="grid gap-8 border-l-4 border-mark pl-6 sm:pl-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
              <div>
                <h3 className="m-0 font-display text-[2rem] font-bold leading-tight">{featuredProject.name}</h3>
                <p className="mt-3 mb-0 text-lg">{featuredProject.summary}</p>
                {featuredProject.status ? <p className="mt-3 mb-0 text-[0.95rem] text-muted">{featuredProject.status}</p> : null}
                <div className="mt-5 grid gap-4">
                  <Stack items={featuredProject.stack} />
                  <ProjectLinks links={featuredProject.links} />
                </div>
              </div>
              <ul className="m-0 grid list-none gap-4 p-0">
                {featuredProject.points.map((p) => (
                  <li key={p} className="border-t border-rule pt-4 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-4">
                    {p}
                  </li>
                ))}
              </ul>
            </article>

            <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-10">
              {projects.map((project) => (
                <article key={project.name} className="flex flex-col">
                  {project.image ? (
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      width={2560}
                      height={1440}
                      className="aspect-video w-full rounded-lg border border-rule object-cover object-top"
                      sizes="(min-width: 768px) 36rem, 100vw"
                    />
                  ) : null}
                  <h3 className="mt-6 mb-0 font-display text-[1.6rem] font-bold">{project.name}</h3>
                  <p className="mt-2 mb-0">{project.summary}</p>
                  <ul className="mt-4 mb-0 grid list-disc gap-2 pl-5 text-[0.95rem] text-muted marker:text-muted">
                    {project.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <div className="mt-5 grid gap-4">
                    <Stack items={project.stack} />
                    <ProjectLinks links={project.links} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" aria-labelledby="experience-title" className="border-t border-rule bg-surface py-20 sm:py-28">
          <div className={wrap}>
            <SectionHeading id="experience">Experience</SectionHeading>
            <ol className="m-0 list-none p-0">
              {experience.map((role) => (
                <li key={role.title + role.period} className="grid gap-2 border-t border-rule py-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
                  <div className="text-[0.95rem] text-muted">
                    <p className="m-0 font-medium text-ink tabular-nums">{role.period}</p>
                    <p className="m-0">{role.place}</p>
                  </div>
                  <div className="max-w-[44rem]">
                    <h3 className="m-0 text-xl font-semibold">{role.title}</h3>
                    <p className="mt-1 mb-0 text-muted">{role.org}</p>
                    {role.points.length ? (
                      <ul className="mt-4 mb-0 grid list-disc gap-2 pl-5 marker:text-muted">
                        {role.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Skills and certifications */}
        <section id="skills" aria-labelledby="skills-title" className="py-20 sm:py-28">
          <div className={`${wrap} grid gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14`}>
            <div>
              <SectionHeading id="skills">Skills</SectionHeading>
              <dl className="m-0 grid gap-6">
                {skills.map((s) => (
                  <div key={s.group} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                    <dt className="font-semibold">{s.group}</dt>
                    <dd className="m-0 text-muted">{s.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="m-0 mb-10 font-display text-[2.25rem] font-bold leading-[1.05] sm:mb-14 sm:text-[2.75rem]">Certifications</h2>
              <ul className="m-0 list-none p-0">
                {certifications.map((c) => (
                  <li key={c.name} className="border-t border-rule py-3.5 first:border-t-ink/80">
                    <p className="m-0 font-medium">{c.name}</p>
                    <p className="m-0 text-sm text-muted">{c.issuer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="border-t border-rule bg-surface py-20 sm:py-28">
          <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-14`}>
            <div>
              <SectionHeading id="contact" intro="Want to talk about backend systems, applied AI or a role on your team? Email is the fastest way to reach me. The form goes to the same inbox.">
                Get in touch
              </SectionHeading>
              <p className="m-0 font-display text-[1.4rem] font-semibold sm:text-[1.75rem]">
                <a href={`mailto:${site.email}`} className="marked break-all">{site.email}</a>
              </p>
              <ul className="mt-6 mb-0 flex list-none gap-5 p-0">
                <li><a href={site.linkedin} target="_blank" rel="noreferrer" className="marked font-medium">LinkedIn</a></li>
                <li><a href={site.github} target="_blank" rel="noreferrer" className="marked font-medium">GitHub</a></li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className={`${wrap} py-10 text-sm text-muted`}>
        <p className="m-0">© {new Date().getFullYear()} {site.name}. Built with Next.js and Tailwind CSS.</p>
      </footer>
    </>
  );
}
