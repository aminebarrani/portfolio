import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { content } from '../data/content'
import type { Project } from '../data/types'
import { useLang } from '../lib/i18n'
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs'
import { Chip, Reveal, SpotlightCard } from './ui'
import { ArrowIcon, ExternalIcon } from './Icons'

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (id: string) => void
}) {
  const { t } = useLang()
  return (
    <SpotlightCard
      className={`flex w-[85vw] shrink-0 flex-col justify-between rounded-2xl p-7 sm:w-[420px] md:h-[480px] md:w-[450px] ${
        project.isMain ? '!border-accent/30' : ''
      }`}
    >
      <div>
        <div className="mb-5 flex items-start justify-between">
          <span className="t-number !text-4xl">{project.index}</span>
          {project.isMain && (
            <span className="rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-secondary">
              {t({ fr: 'Architecture interactive', en: 'Interactive architecture' })}
            </span>
          )}
        </div>
        <h3 className="t-h3 text-xl text-ink">{project.title}</h3>
        <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-widest text-accent">
          {project.period}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{t(project.tagline)}</p>
      </div>

      <div>
        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
          {project.stack.length > 6 && <Chip>+{project.stack.length - 6}</Chip>}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => onOpen(project.id)}
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:text-accent"
          >
            {t(content.projectsSection.viewCase)}
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub — ${project.title}`}
              className="rounded-full p-2 text-faint transition-colors hover:text-accent"
            >
              <ExternalIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}

export default function Projects({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const { t } = useLang()
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // signature pinned horizontal scroll (desktop, motion allowed)
  useEffect(() => {
    if (reduced) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return
      const distance = () => track.scrollWidth - window.innerWidth + 64
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })
    return () => mm.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden md:h-screen">
      <div className="mx-auto w-full max-w-6xl px-5 pt-24 md:px-8 md:pt-0 md:h-full md:flex md:flex-col md:justify-center">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-5 md:mb-12">
            <span className="t-number">02</span>
            <span className="t-label">{t(content.projectsSection.sectionLabel)}</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <h2 className="t-h2 max-w-md">{t(content.projectsSection.title)}</h2>
            <p className="max-w-sm font-mono text-xs leading-relaxed text-faint">
              {t(content.projectsSection.intro)}
            </p>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="flex flex-col gap-6 pb-24 md:flex-row md:items-center md:gap-7 md:pb-0"
        >
          {content.projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
          ))}
          <div className="hidden w-2 shrink-0 md:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
