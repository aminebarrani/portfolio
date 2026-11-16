import { content } from '../data/content'
import { useLang } from '../lib/i18n'
import { Reveal, Section, SectionHeading } from './ui'
import { ExternalIcon } from './Icons'

export default function Experience() {
  const { t } = useLang()
  return (
    <Section id="experience">
      <SectionHeading number="03" label={content.experience.sectionLabel} />
      <Reveal>
        <h2 className="t-h2 mb-14 max-w-md">{t(content.experience.title)}</h2>
      </Reveal>

      <div className="relative">
        <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[calc(9rem+7px)]" aria-hidden="true" />
        <div className="space-y-14">
          {content.experience.entries.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 0.08}>
              <article className="relative pl-10 md:pl-[11rem]">
                <span
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border border-accent/60 bg-base md:left-[9rem]"
                  aria-hidden="true"
                >
                  <span className="absolute inset-[3px] rounded-full bg-accent/70" />
                </span>
                <p className="absolute left-0 top-1 hidden font-mono text-[0.68rem] uppercase tracking-widest text-accent md:block md:w-[7.5rem]">
                  {entry.period}
                </p>
                <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-widest text-accent md:hidden">
                  {entry.period}
                </p>
                <h3 className="t-h3 text-lg">{t(entry.role)}</h3>
                <p className="mt-1 text-sm text-muted">
                  {entry.company} · {t(entry.location)}
                  {entry.repoUrl && (
                    <a
                      href={entry.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-3 inline-flex items-center gap-1 font-mono text-xs text-faint transition-colors hover:text-accent"
                    >
                      <ExternalIcon className="h-3 w-3" /> repo
                    </a>
                  )}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {entry.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.55rem] h-1 w-4 shrink-0 bg-accent/40" aria-hidden="true" />
                      {t(b)}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {entry.stack.map((s) => (
                    <span key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.62rem] text-faint">
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
