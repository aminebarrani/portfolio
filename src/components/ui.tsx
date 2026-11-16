import { useEffect, useRef, useState } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import type { L } from '../data/types'
import { useLang } from '../lib/i18n'
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs'
import { useMagnetic } from '../hooks/useMagnetic'

const EASE = [0.16, 1, 0.3, 1] as const

/** Fade + rise on first view. Falls back to static when reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Wraps a link/button and pulls it toward the cursor. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useMagnetic(ref, strength)
  return (
    <span ref={ref} className={`inline-block will-change-transform ${className ?? ''}`}>
      {children}
    </span>
  )
}

/** Card with a cursor-following radial spotlight. */
export function SpotlightCard({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  return (
    <div className={`spotlight glass rounded-2xl ${className}`} onMouseMove={onMove} onClick={onClick}>
      {children}
    </div>
  )
}

/** Animated number that counts up on first view. */
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduced])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-[0.68rem] tracking-wide transition-colors duration-300 ${
        accent
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-line bg-surface text-muted hover:border-accent/30 hover:text-ink'
      }`}
    >
      {children}
    </span>
  )
}

export function SectionHeading({ number, label }: { number: string; label: L }) {
  const { t } = useLang()
  const reduced = usePrefersReducedMotion()
  return (
    <div className="mb-10 flex items-baseline gap-5 md:mb-14">
      {!reduced ? (
        <motion.span
          className="t-number"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {number}
        </motion.span>
      ) : (
        <span className="t-number">{number}</span>
      )}
      <span className="t-label">{t(label)}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32 ${className}`}>
      {children}
    </section>
  )
}

/** Bottom toast, used by the contact copy-to-clipboard. */
export function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed bottom-8 left-1/2 z-[95] -translate-x-1/2"
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{ pointerEvents: 'none' }}
    >
      <div className="glass flex items-center gap-2 rounded-full px-5 py-3 font-mono text-xs text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {message}
      </div>
    </motion.div>
  )
}
