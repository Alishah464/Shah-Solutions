import type { Page } from '@playwright/test'

/**
 * Playwright's `reducedMotion: 'reduce'` context option does not reliably
 * propagate to `window.matchMedia` in every Chromium/OS combination (verified
 * empirically — `matchMedia('(prefers-reduced-motion)').matches` stayed
 * `false` even with the context option set). Stubbing `matchMedia` directly
 * tests the app's actual reduced-motion code path instead of depending on
 * that emulation layer.
 */
export async function stubReducedMotion(page: Page) {
  await page.addInitScript(() => {
    const native = window.matchMedia.bind(window)
    window.matchMedia = (query: string) => {
      if (query.includes('prefers-reduced-motion')) {
        return {
          matches: true,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        } as unknown as MediaQueryList
      }
      return native(query)
    }
  })
}

/**
 * The homepage shows a full-screen splash overlay for ~800ms on first visit
 * per session (components/SplashIntro.tsx) — intentional for real users, but
 * it can block/delay Playwright's actionability checks on anything else it
 * covers, making unrelated tests racy depending on exactly when they try to
 * interact. Pre-seed the sessionStorage flag it checks so it never mounts,
 * for tests that aren't specifically about the splash itself.
 */
export async function bypassSplashIntro(page: Page) {
  await page.addInitScript(() => {
    sessionStorage.setItem('aiventra-intro-seen', '1')
  })
}
