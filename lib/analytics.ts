declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Fires a GA4 event if gtag has loaded — no-ops otherwise (SSR, ad
 * blockers, GTM not yet ready). Keep params to interaction context only,
 * never personal data (names, emails, message contents). */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
