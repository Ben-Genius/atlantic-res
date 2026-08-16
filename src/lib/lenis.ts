import type Lenis from 'lenis'

/**
 * GsapProvider owns the single Lenis instance for the app; this module just
 * hands it to components that need to drive the scroll themselves (carousel
 * arrows, anchor jumps) so their motion uses the same smoothing as the wheel.
 */
let instance: Lenis | null = null

export function setLenis(next: Lenis | null) {
  instance = next
}

export function getLenis() {
  return instance
}

/** Scroll to an absolute Y position through Lenis, falling back to native. */
export function smoothScrollTo(y: number, duration = 1.2) {
  if (instance) {
    instance.scrollTo(y, {
      duration,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    })
    return
  }
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
