import { useEffect } from 'react'
import type { RefObject } from 'react'
import { usePrefersReducedMotion, useFinePointer } from './useMotionPrefs'

/** Pulls the element toward the cursor while it hovers (magnetic effect). */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  strength = 0.3,
) {
  const reduced = usePrefersReducedMotion()
  const fine = useFinePointer()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !fine) return

    let frame = 0
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      el.style.transform = 'translate(0, 0)'
      setTimeout(() => (el.style.transition = ''), 500)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [ref, strength, reduced, fine])
}
