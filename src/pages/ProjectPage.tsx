import type { ReactNode } from 'react'
import { content } from '../data/content'
import { useLang } from '../lib/i18n'
import { Chip, Magnetic, Reveal } from '../components/ui'
import { ArrowUpIcon, ExternalIcon } from '../components/Icons'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import DemoShowcase from '../components/DemoShowcase'

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-line pt-6">
      <p className="t-label mb-3">{label}</p>
      {children}
    </div>
  )
}

export default function ProjectPage({
  id,
  onBack,
  onNavigate,
}: {
  id: string
  onBack: () => void
  onNavigate: (id: string) => void
}) {
  const { t } = useLang()
  const project = content.projects.find((p) => p.id === id)
  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
        <p className="font-mono text-sm text-muted">404 — projet introuvable / project not found</p>
        <button onClick={onBack} className="hairline rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ink">
          {t(content.projectsSection.back)}
        </button>
      </div>
    )
  }

  const projectIndex = content.projects.findIndex((p) => p.id === id)
  const prev = content.projects[(projectIndex - 1 + content.projects.length) % content.projects.length]
  const next = content.projects[(projectIndex + 1) % content.projects.length]

  return (
    <div className="min-h-screen">
      <header className="fixed left-1/2 top-4 z-[80] w-[min(94vw,1100px)] -translate-x-1/2">
        <div className="glass flex items-center justify-between rounded-full px-4 py-2.5 md:px-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            <ArrowUpIcon className="h-4 w-4 -rotate-90 transition-transform duration-300 group-hover:-translate-x-1" />
            {t(content.projectsSection.back)}
          </button>
          <span className="font-mono text-[0.7rem] text-faint">
            {project.index} / {String(content.projects.length).padStart(2, '0')}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-36 md:px-8">
        <Reveal>
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-accent">{project.period}</p>
          <h1 className="t-h2 mt-4 text-[clamp(2.2rem,6vw,4rem)]">{project.title}</h1>
          <p className="mt-5 max-w-2xl font-display text-lg leading-snug tracking-tight text-ink/85 md:text-xl">
            {t(project.tagline)}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-1.5">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          {project.repoUrl && (
            <div className="mt-8">
              <Magnetic strength={0.2}>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-[#07080d]"
                >
                  GitHub <ExternalIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
            </div>
          )}
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <Reveal>
            <Block label={t({ fr: 'Le problème', en: 'The problem' })}>
              <p className="text-sm leading-relaxed text-muted">{t(project.problem)}</p>
            </Block>
          </Reveal>
          <Reveal delay={0.08}>
            <Block label={t({ fr: 'Mon rôle', en: 'My role' })}>
              <p className="text-sm leading-relaxed text-muted">{t(project.role)}</p>
            </Block>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 border-t border-line pt-6">
            <p className="t-label mb-6">{t({ fr: 'Décisions clés', en: 'Key decisions' })}</p>
            <ol className="space-y-5">
              {project.decisions.map((d, i) => (
                <li key={i} className="flex gap-5">
                  <span className="font-mono text-xs text-accent/70">{String(i + 1).padStart(2, '0')}</span>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted">{t(d)}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {project.diagram && (
          <Reveal delay={0.1}>
            <div className="mt-14">
              <p className="t-label mb-4">{t({ fr: 'Architecture — survolez un service', en: 'Architecture — hover a service' })}</p>
              <ArchitectureDiagram nodes={project.diagram.nodes} edges={project.diagram.edges} />
            </div>
          </Reveal>
        )}

        {project.demo && (
          <Reveal delay={0.1}>
            <DemoShowcase demo={project.demo} />
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <div className="mt-14 border-t border-line pt-6">
            <p className="t-label mb-4">{t({ fr: 'Résultats', en: 'Outcomes' })}</p>
            <ul className="space-y-3">
              {project.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-[0.55rem] h-1 w-4 shrink-0 bg-accent/40" aria-hidden="true" />
                  {t(o)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <nav className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2" aria-label={t({ fr: 'Navigation projets', en: 'Project navigation' })}>
          <button onClick={() => onNavigate(prev.id)} className="group hairline rounded-2xl p-5 text-left transition-colors duration-300 hover:border-accent/40">
            <span className="font-mono text-[0.62rem] uppercase tracking-widest text-faint">← {t({ fr: 'Précédent', en: 'Previous' })}</span>
            <p className="mt-2 font-display font-semibold tracking-tight text-ink group-hover:text-accent">{prev.title}</p>
          </button>
          <button onClick={() => onNavigate(next.id)} className="group hairline rounded-2xl p-5 text-right transition-colors duration-300 hover:border-accent/40">
            <span className="font-mono text-[0.62rem] uppercase tracking-widest text-faint">{t({ fr: 'Suivant', en: 'Next' })} →</span>
            <p className="mt-2 font-display font-semibold tracking-tight text-ink group-hover:text-accent">{next.title}</p>
          </button>
        </nav>
      </main>
    </div>
  )
}
