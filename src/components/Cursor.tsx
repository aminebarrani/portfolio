import { useEffect, useRef, useState } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMotionPrefs'

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"]'

export default function Cursor() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  const enabled = fine && !reduced

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('custom-cursor')
    const style = document.createElement('style')
    style.textContent = 'html.custom-cursor, html.custom-cursor * { cursor: none !important; }'
    document.head.appendChild(style)
    return () => {
      root.classList.remove('custom-cursor')
      style.remove()
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let frame = 0
    let visible = false

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      setHovering(Boolean((e.target as Element).closest?.(HOVER_SELECTOR)))
    }
    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-accent/60 opacity-0 transition-[width,height,background-color,border-color] duration-300 ease-out-expo"
        style={{
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
          backgroundColor: hovering ? 'rgba(34,211,238,0.08)' : 'transparent',
        }}
      />
    </div>
  )
}
