import { content } from '../data/content'
import { useLang } from '../lib/i18n'
import { Reveal, Section, SectionHeading } from './ui'

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-accent" aria-hidden="true">
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="m8.5 14 -1.5 7 5-2.5L17 21l-1.5-7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="m9.5 9 1.8 1.8L15 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Certifications() {
  const { t } = useLang()
  return (
    <Section id="certifications">
      <SectionHeading number="05" label={content.certifications.sectionLabel} />
      <Reveal>
        <h2 className="t-h2 mb-12 max-w-md">{t(content.certifications.title)}</h2>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {content.certifications.items.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 0.08}>
            <div className="spotlight glass group h-full rounded-2xl p-6 transition-colors duration-500 hover:!border-accent/40">
              <BadgeIcon />
              <h3 className="mt-4 font-display text-base font-semibold leading-snug tracking-tight text-ink">
                {cert.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{cert.issuer}</p>
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                {t(cert.date)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
