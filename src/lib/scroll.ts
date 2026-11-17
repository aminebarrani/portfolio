import type Lenis from 'lenis'

// The Lenis instance is created once in App and exposed here so any
// component (nav, footer, hero CTAs) can trigger smooth scrolls.
let lenisInstance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.start()
    lenisInstance.scrollTo(el)
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.start()
    lenisInstance.scrollTo(0)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function lockScroll(lock: boolean) {
  if (lenisInstance) {
    if (lock) lenisInstance.stop()
    else lenisInstance.start()
  }
  document.body.style.overflow = lock ? 'hidden' : ''
}
