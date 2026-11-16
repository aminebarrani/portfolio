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
    lenisInstance.scrollTo(el, { offset: -80 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
