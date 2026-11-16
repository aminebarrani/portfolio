import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider } from './lib/i18n'
import { setLenis } from './lib/scroll'
import { usePrefersReducedMotion } from './hooks/useMotionPrefs'
import Cursor from './components/Cursor'
import BootLoader from './components/BootLoader'
import ParticleNetwork from './components/ParticleNetwork'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'

gsap.registerPlugin(ScrollTrigger)

export type View = { name: 'home' } | { name: 'project'; id: string }

function Shell() {
  const reduced = usePrefersReducedMotion()
  const [booted, setBooted] = useState(false)
  const [view, setView] = useState<View>({ name: 'home' })
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 })
    lenisRef.current = lenis
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  const openProject = (id: string) => {
    setView({ name: 'project', id })
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }

  const goHome = () => {
    setView({ name: 'home' })
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }

  return (
    <div className="grain relative min-h-screen bg-base text-ink">
      <ParticleNetwork fixed subtle />
      <Cursor />
      <AnimatePresence mode="wait">
        {!booted && <BootLoader key="loader" onDone={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <AnimatePresence mode="wait">
          {view.name === 'home' ? (
            <motion.main
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <Home onOpenProject={openProject} />
            </motion.main>
          ) : (
            <motion.div
              key={`project-${view.id}`}
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.6 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <ProjectPage id={view.id} onBack={goHome} onNavigate={openProject} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  )
}
