import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../lib/i18n'
import { lockScroll, scrollToId, scrollToTop } from '../lib/scroll'
import { CloseIcon, MenuIcon } from './Icons'

const SECTION_IDS = content.nav.items.map((i) => i.id)

export default function Nav() {
  const { lang, setLang, t } = useLang()
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (window.scrollY < window.innerHeight * 0.4) setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
      menuBtnRef.current?.focus()
    }
  }, [open])

  const navigate = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <header className="fixed left-1/2 top-4 z-[80] w-[min(94vw,1100px)] -translate-x-1/2">
        <nav
          aria-label="Navigation"
          className={`glass flex items-center justify-between rounded-full px-4 py-2.5 transition-[box-shadow,border-color] duration-300 md:px-6 ${
            scrolled ? 'border-accent/15 shadow-[0_12px_40px_rgba(0,0,0,0.45)]' : ''
          }`}
        >
          <button
            onClick={() => { setOpen(false); scrollToTop() }}
            aria-label={`${content.profile.name} — ${t(content.footer.backToTop)}`}
            className="group flex shrink-0 items-center gap-2.5 rounded-full"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-accent/40 bg-accent/10 font-display text-[0.72rem] font-bold tracking-tight text-accent transition-all duration-300 group-hover:border-accent/80 group-hover:bg-accent/20 group-hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]">
              {content.profile.initials}
            </span>
            <span className="hidden font-display text-sm font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:inline">
              {content.profile.name}
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {content.nav.items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest transition-colors duration-300 ${
                    active === item.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {t(item.label)}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded-full border border-line font-mono text-[0.65rem]">
              {(['fr', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-2.5 py-1 uppercase transition-colors duration-300 ${
                    lang === l ? 'bg-accent/15 text-accent' : 'text-faint hover:text-ink'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              ref={menuBtnRef}
              className="rounded-full p-2 text-ink transition-colors hover:text-accent lg:hidden"
              onClick={() => setOpen(true)}
              aria-label={t(content.nav.menu)}
              aria-expanded={open}
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(content.nav.menu)}
            className="fixed inset-0 z-[99] flex flex-col bg-base/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-accent/40 bg-accent/10 font-display text-[0.72rem] font-bold text-accent">
                {content.profile.initials}
              </span>
              <button
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                aria-label={t(content.nav.close)}
                className="rounded-full p-2 text-ink transition-colors hover:text-accent"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
              {content.nav.items.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => navigate(item.id)}
                    className="t-h2 block py-2 text-left text-ink transition-colors hover:text-accent"
                  >
                    <span className="mr-3 font-mono text-xs text-faint">0{i + 1}</span>
                    {t(item.label)}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}