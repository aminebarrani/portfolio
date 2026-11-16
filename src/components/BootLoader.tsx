import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../lib/i18n'
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs'

const TOTAL_MS = 2200
const LINE_INTERVAL = 380

export default function BootLoader({ onDone }: { onDone: () => void }) {
  const { t } = useLang()
  const reduced = usePrefersReducedMotion()
  const [visibleLines, setVisibleLines] = useState(reduced ? content.loader.lines.length : 0)
  const [progress, setProgress] = useState(reduced ? 100 : 0)

  useEffect(() => {
    if (reduced) {
      const id = setTimeout(onDone, 300)
      return () => clearTimeout(id)
    }
    const lineTimers = content.loader.lines.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), 200 + i * LINE_INTERVAL),
    )
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / (TOTAL_MS - 300)) * 100)
      setProgress(pct)
      if (pct < 100) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    const doneTimer = setTimeout(onDone, TOTAL_MS)

    const skip = () => onDone()
    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)

    return () => {
      lineTimers.forEach(clearTimeout)
      clearTimeout(doneTimer)
      cancelAnimationFrame(frame)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-base"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-[min(90vw,480px)]">
        <p className="t-label mb-6">{content.profile.initials} — boot sequence</p>
        <div className="space-y-2 font-mono text-sm text-muted">
          {content.loader.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={i === visibleLines - 1 ? 'text-accent' : ''}
            >
              {t(line)}
            </motion.p>
          ))}
        </div>
        <div className="mt-8 h-px w-full bg-line">
          <div
            className="h-px bg-accent transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 font-mono text-xs text-faint">{t(content.loader.skip)}</p>
      </div>
    </motion.div>
  )
}
