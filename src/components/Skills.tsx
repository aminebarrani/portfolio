import { useState } from 'react'
import { content } from '../data/content'
import { useLang } from '../lib/i18n'
import { Reveal, Section, SectionHeading, SpotlightCard } from './ui'

export default function Skills() {
  const { t } = useLang()
  const [hovered, setHovered] = useState<string | null>(null)
  const skills = content.skills

  return (
    <Section id="skills">
      <SectionHeading number="04" label={skills.sectionLabel} />
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <h2 className="t-h2 max-w-md">{t(skills.title)}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xs font-mono text-xs leading-relaxed text-faint">{t(skills.intro)}</p>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {skills.groups.map((group, i) => {
          const dim = hovered !== null && hovered !== group.id
          return (
            <Reveal key={group.id} delay={i * 0.06} className={group.id === 'ai' ? 'md:col-span-2' : ''}>
              <div
                onMouseEnter={() => setHovered(group.id)}
                onMouseLeave={() => setHovered(null)}
                className={`spotlight glass h-full rounded-2xl p-6 transition-all duration-500 ${
                  hovered === group.id ? '!border-accent/40' : ''
                } ${dim ? 'opacity-45' : 'opacity-100'}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ink">
                    {t(group.title)}
                  </h3>
                  <span className="font-mono text-[0.6rem] text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => {
                    const label = typeof item === 'string' ? item : t(item)
                    return (
                      <span
                        key={label}
                        data-cursor="hover"
                        className={`rounded-full border px-3 py-1 font-mono text-[0.68rem] transition-colors duration-300 ${
                          group.id === 'ai'
                            ? 'border-secondary/30 bg-secondary/5 text-secondary hover:!border-secondary/70 hover:bg-secondary/15'
                            : 'border-line bg-surface text-muted hover:!border-accent/50 hover:text-accent'
                        }`}
                      >
                        {label}
                      </span>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          )
        })}

        <Reveal delay={0.3}>
          <SpotlightCard className="h-full rounded-2xl p-6">
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-ink">
              {t(skills.softSkillsTitle)}
            </h3>
            <ul className="space-y-3">
              {skills.softSkills.map((s) => (
                <li key={s.title.fr} className="text-xs leading-relaxed">
                  <span className="font-semibold text-accent">{t(s.title)}</span>
                  <span className="text-faint"> — {t(s.detail)}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.36} className="md:col-span-2">
          <SpotlightCard className="h-full rounded-2xl p-6">
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-ink">
              {t(skills.spokenLanguages)}
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {skills.languages.map((l) => (
                <div key={l.name.fr} className="hairline rounded-xl bg-surface/60 p-4">
                  <p className="font-display text-lg font-semibold tracking-tight">{t(l.name)}</p>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                    {t(l.level)}
                  </p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  )
}
