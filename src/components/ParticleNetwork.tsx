import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  violet: boolean
}

const LINK_DIST = 150
const CURSOR_DIST = 200

/** Microservices-style network graph that reacts to the cursor. */
export default function ParticleNetwork({ fixed = false, subtle = false }: { fixed?: boolean; subtle?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let frame = 0
    let running = true
    let inView = true
    const mouse = { x: -9999, y: -9999 }
    const A = subtle ? 0.55 : 1

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(24, Math.min(80, Math.floor((width * height) / (subtle ? 30000 : 18000))))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        violet: Math.random() < 0.12,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.16 * A * (1 - dist / LINK_DIST)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const mdx = a.x - mouse.x
        const mdy = a.y - mouse.y
        const mdist = Math.hypot(mdx, mdy)
        if (mdist < CURSOR_DIST) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.35 * A * (1 - mdist / CURSOR_DIST)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
        ctx.fillStyle = a.violet
          ? `rgba(139, 92, 246, ${0.7 * A})`
          : mdist < CURSOR_DIST
            ? `rgba(103, 232, 249, ${0.95 * A})`
            : `rgba(34, 211, 238, ${0.45 * A})`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      for (const n of nodes) {
        // gentle attraction toward the cursor keeps the graph "alive" around it
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const dist = Math.hypot(dx, dy)
        if (dist < CURSOR_DIST && dist > 1) {
          n.vx += (dx / dist) * 0.012
          n.vy += (dy / dist) * 0.012
        }
        n.vx *= 0.995
        n.vy *= 0.995
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }
      draw()
    }

    const loop = () => {
      if (running && inView && !document.hidden) {
        step()
        frame = requestAnimationFrame(loop)
      }
    }

    const start = () => {
      if (reduced) {
        build()
        draw()
        return
      }
      build()
      running = true
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(loop)
    }

    const onResize = () => start()
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      if (reduced) draw()
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onWindowOut = (e: MouseEvent) => {
      if (!e.relatedTarget) onLeave()
    }
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(frame)
      } else if (!reduced) {
        start()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView && !reduced && !document.hidden) {
          running = true
          cancelAnimationFrame(frame)
          frame = requestAnimationFrame(loop)
        }
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onWindowOut)
    canvas.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      running = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onWindowOut)
      canvas.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, subtle])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={
        fixed
          ? 'pointer-events-none fixed inset-0 z-0 h-full w-full'
          : 'absolute inset-0 h-full w-full'
      }
      style={
        fixed
          ? undefined
          : { maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)' }
      }
    />
  )
}
