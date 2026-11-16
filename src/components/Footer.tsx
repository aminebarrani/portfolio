import { content } from '../data/content'
import { useLang } from '../lib/i18n'
import { scrollToTop } from '../lib/scroll'
import { ArrowUpIcon, socialIcon } from './Icons'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-sm font-bold">
            <span className="text-accent">{content.profile.initials}</span> — {content.profile.name}
          </p>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-faint">
            {t(content.footer.builtWith)}
          </p>
          <p className="mt-2 text-xs text-faint">
            © {new Date().getFullYear()} {content.profile.name}. {t(content.footer.rights)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {content.profile.socials.map((s) =>
              s.kind === 'phone' ? null : (
                <a
                  key={s.kind}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="rounded-full p-2.5 text-faint transition-colors duration-300 hover:text-accent"
                >
                  {socialIcon(s.kind)}
                </a>
              ),
            )}
          </div>
          <button
            onClick={scrollToTop}
            className="hairline flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
          >
            <ArrowUpIcon className="h-3.5 w-3.5" />
            {t(content.footer.backToTop)}
          </button>
        </div>
      </div>
    </footer>
  )
}
