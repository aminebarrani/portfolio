import { useState } from 'react'
import { content } from '../data/content'
import { useLang } from '../lib/i18n'
import { Counter, Reveal, Section, SectionHeading, SpotlightCard } from './ui'

const PHOTO_SRC = `${import.meta.env.BASE_URL}photo.jpg`

function PhotoSlot() {
  const { t } = useLang()
  const [missing, setMissing] = useState(true)
  return (
    <div className="spotlight glass relative aspect-[4/5] overflow-hidden rounded-2xl">
      {!missing ? (
        <img
          src={PHOTO_SRC}
          alt={t(content.about.photoAlt)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-line/80 rounded-2xl">
          <span className="t-number !text-6xl">{content.profile.initials}</span>
          <p className="px-6 text-center font-mono text-[0.65rem] leading-relaxed text-faint">
            /public/photo.jpg — portrait 4:5
          </p>
        </div>
      )}
      {/* probe: show the real photo automatically once /public/photo.jpg exists */}
      <img src={PHOTO_SRC} alt="" aria-hidden="true" className="hidden" onError={() => setMissing(true)} onLoad={() => setMissing(false)} />
    </div>
  )
}

export default function About() {
  const { t } = useLang()
  const edu = content.education

  return (
    <Section id="about">
      <SectionHeading number="01" label={content.about.sectionLabel} />
      <div className="grid gap-12 md:grid-cols-5 md:gap-10">
        <div className="md:col-span-3">
          <Reveal>
            <h2 className="t-h2 mb-8 max-w-lg">{t(content.about.title)}</h2>
          </Reveal>
          <div className="space-y-5">
            {content.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="max-w-xl leading-relaxed text-muted">{t(p)}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {content.about.stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.06} className="bg-base">
                <div className="p-5">
                  <p className="font-display text-3xl font-bold tracking-tight text-accent md:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix ?? ''} />
                  </p>
                  <p className="mt-1.5 font-mono text-[0.65rem] uppercase leading-relaxed tracking-wider text-faint">
                    {t(stat.label)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="space-y-6 md:col-span-2">
          <Reveal delay={0.15}>
            <PhotoSlot />
          </Reveal>
          <Reveal delay={0.25}>
            <SpotlightCard className="rounded-2xl p-6">
              <p className="t-label mb-3">{t(edu.sectionLabel)}</p>
              <p className="font-display text-2xl font-bold tracking-tight">{edu.school}</p>
              <p className="mt-1 text-sm text-ink/80">{t(edu.degree)}</p>
              <p className="mt-0.5 font-mono text-xs text-accent">{edu.period}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(edu.detail)}</p>
              <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-faint">{t(edu.modules)}</p>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
