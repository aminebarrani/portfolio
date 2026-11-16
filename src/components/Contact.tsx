import { useState } from 'react'
import { content } from '../data/content'
import { useLang } from '../lib/i18n'
import { Magnetic, Reveal, Section, SectionHeading, Toast } from './ui'
import { CopyIcon, PinIcon, socialIcon } from './Icons'

const EMAIL = 'amine.barrani@esprit.tn'

export default function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      // clipboard API can be blocked; fall back to a hidden textarea
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2600)
  }

  return (
    <Section id="contact">
      <SectionHeading number="06" label={content.contact.sectionLabel} />
      <div className="flex flex-col items-center pb-8 text-center">
        <Reveal>
          <h2 className="t-h2 mx-auto max-w-2xl">{t(content.contact.title)}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">{t(content.contact.intro)}</p>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 w-full">
          <Magnetic strength={0.12}>
            <a
              href={`mailto:${EMAIL}`}
              className="link-underline inline-block font-display text-[clamp(1.4rem,5.2vw,3.4rem)] font-bold tracking-tight text-ink transition-colors duration-300 hover:text-accent"
            >
              {EMAIL}
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={copyEmail}
              className="hairline flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-widest text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              <CopyIcon className="h-3.5 w-3.5" />
              {t(content.contact.copy)}
            </button>
            <span className="flex items-center gap-1.5 font-mono text-[0.7rem] text-faint">
              <PinIcon className="h-3.5 w-3.5" />
              {t(content.profile.location)} · {t(content.profile.availability)}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-2">
            {content.profile.socials.map((s) => (
              <a
                key={s.kind}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="hairline flex items-center gap-2.5 rounded-full px-4 py-2.5 font-mono text-[0.68rem] text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                {socialIcon(s.kind, 'h-4 w-4')}
                <span className="hidden sm:inline">{s.label}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
      <Toast message={t(content.contact.copied)} visible={copied} />
    </Section>
  )
}
