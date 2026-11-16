import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { content } from '../data/content'
import { useLang } from '../lib/i18n'
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs'
import { scrollToId } from '../lib/scroll'
import { Magnetic } from './ui'
import { socialIcon, ArrowIcon, PinIcon } from './Icons'
import ParticleNetwork from './ParticleNetwork'

const EASE = [0.16, 1, 0.3, 1] as const

function CyclingRoles() {
  const { lang, t } = useLang()
  const [index, setIndex] = useState(0)
  const roles = content.profile.roles

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800)
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <span className="relative inline-flex h-7 items-center overflow-hidden align-bottom md:h-9">
      <motion.span
        key={`${lang}-${index}`}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        exit={{ y: '-110%' }}
        transition={{ duration: 0.55, ease: EASE }}
        className="font-mono text-sm text-accent md:text-base"
      >
        {t(roles[index])}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const { t } = useLang()
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const bgWordRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const name = `${content.profile.firstName} ${content.profile.lastName}`

  // parallax background word (GSAP + ScrollTrigger)
  useEffect(() => {
    if (reduced || !bgWordRef.current || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.to(bgWordRef.current, {
        yPercent: -60,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <ParticleNetwork />
      <div
        ref={bgWordRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[22vw] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(42,51,80,0.35)]"
      >
        FULL-STACK × AI
      </div>

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-36 md:px-8"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className="glass flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[0.7rem] tracking-wide text-ink">
            <span className="availability-dot h-2 w-2 rounded-full bg-accent" />
            {t(content.profile.availability)}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[0.7rem] text-faint">
            <PinIcon className="h-3.5 w-3.5" />
            {t(content.profile.location)}
          </span>
        </motion.div>

        <h1 className="t-hero" aria-label={name}>
          <span aria-hidden="true" className="block">
            {name.split(' ').map((word, wi) => (
              <span key={wi} className="mr-[0.22em] inline-block whitespace-nowrap">
                {word.split('').map((char, ci) => (
                  <span key={ci} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={reduced ? false : { y: '115%' }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.25 + (wi * word.length + ci) * 0.028,
                        ease: EASE,
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-6 flex min-h-9 items-center gap-3"
        >
          <span className="h-px w-10 bg-accent/60" />
          <CyclingRoles />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
          className="mt-8 max-w-xl font-display text-xl leading-snug tracking-tight text-ink/90 md:text-2xl"
        >
          {t(content.profile.headline)}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.25}>
            <button
              onClick={() => scrollToId('projects')}
              className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#07080d] transition-colors duration-300 hover:bg-ink"
            >
              {t(content.projectsSection.title)}
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="mailto:amine.barrani@esprit.tn"
              className="hairline rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              {t(content.contact.cta)}
            </a>
          </Magnetic>
          <div className="flex items-center gap-1">
            {content.profile.socials.map((s) =>
              s.kind === 'phone' ? null : (
                <a
                  key={s.kind}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="rounded-full p-3 text-muted transition-colors duration-300 hover:text-accent"
                >
                  {socialIcon(s.kind, 'h-5 w-5')}
                </a>
              ),
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-faint">scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-8 w-px bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  )
}
