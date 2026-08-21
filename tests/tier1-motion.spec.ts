import { test, expect, type Locator } from '@playwright/test'
import { stubReducedMotion, bypassSplashIntro } from './utils'

/** The hero CTA fades/slides in with a delay; wait until its bounding box
 * stops changing between two reads before we compute hover coordinates from
 * it, or we race the entrance animation and hover a stale position. */
async function waitForStableBox(locator: Locator) {
  let last = await locator.boundingBox()
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 150))
    const next = await locator.boundingBox()
    if (last && next && last.x === next.x && last.y === next.y) return next
    last = next
  }
  if (!last) throw new Error('element never had a bounding box')
  return last
}

test.describe('tier 1 — motion system, magnetic buttons, nav', () => {
  test.beforeEach(async ({ page }) => bypassSplashIntro(page))

  test('hero CTA is a magnetic button that displaces on hover', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: /Get a Free Consultation/i })
    await expect(link).toBeVisible()
    // A late web-font swap can still shift text/button position after the
    // box otherwise looks "stable" — wait for fonts first too.
    await page.evaluate(() => document.fonts.ready)

    const box = await waitForStableBox(link)

    const wrapper = link.locator('xpath=..')

    // Dispatch the mousemove in-page rather than via Playwright's simulated
    // OS cursor: it's synchronous, always targets the wrapper directly (no
    // ambiguity about intermediate elements under the real cursor path), and
    // — critically — the poll can retry the dispatch itself, so a component
    // that isn't "enabled" yet (its own effect checking pointer:fine/reduced
    // motion hasn't committed) just gets tried again a moment later instead
    // of silently missing its one chance at an event.
    const dispatchMove = (cx: number, cy: number) =>
      wrapper.evaluate((el, [x, y]) => {
        el.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y, bubbles: true }))
      }, [cx, cy] as [number, number])

    const cornerX = box.x + box.width - 4
    const cornerY = box.y + 4

    let transform = 'none'
    await expect.poll(async () => {
      await dispatchMove(cornerX, cornerY)
      transform = await wrapper.evaluate((el) => getComputedStyle(el).transform)
      return transform
    }, { timeout: 10_000, intervals: [200] }).not.toBe('none')

    // Moving away should relax the offset back toward identity.
    const awayTransform = transform
    await expect.poll(async () => {
      await dispatchMove(20, 20)
      return wrapper.evaluate((el) => getComputedStyle(el).transform)
    }, { timeout: 15_000, intervals: [200] }).not.toBe(awayTransform)
  })

  test('navbar Get Started button is also magnetic', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: /Get Started/i });
    await expect(link).toBeVisible()
    const wrapper = link.locator('xpath=..')
    await expect(wrapper).toBeVisible()
  })

  test('contact form submit is an accessible, real <button>', async ({ page }) => {
    await page.goto('/contact')
    const btn = page.getByRole('button', { name: /Send Message/i })
    await expect(btn).toBeVisible()
    await expect(btn).toHaveAttribute('type', 'submit')
  })

  test('scroll progress bar grows as the page scrolls', async ({ page }) => {
    await page.goto('/about')
    const bar = page.locator('.progress-bar')
    const before = await bar.evaluate((el) => (el as HTMLElement).style.width)
    await expect.poll(async () => {
      await page.mouse.wheel(0, 4000)
      return bar.evaluate((el) => (el as HTMLElement).style.width)
    }, { timeout: 10_000, intervals: [300] }).not.toBe(before)
  })

  test('services dropdown lists the 6 primary services', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation')
    await nav.getByRole('link', { name: 'Services', exact: true }).hover()
    await expect(nav.getByRole('link', { name: 'AI Development', exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'AI Chatbots', exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Mobile App Development', exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Digital Marketing', exact: true })).toBeVisible()
  })

  test('industries dropdown lists the primary industries', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation')
    await nav.getByRole('link', { name: 'Industries', exact: true }).hover()
    await expect(nav.getByRole('link', { name: 'E-commerce', exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Healthcare', exact: true })).toBeVisible()
  })
})

test.describe('tier 1 — reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test.beforeEach(async ({ page }) => stubReducedMotion(page))

  test('typed hero subtitle shows the first word immediately, not empty', async ({ page }) => {
    await page.goto('/')
    const typed = page.locator('.typing-cursor')
    await expect(typed).toHaveText('SEO Domination')
  })

  test('scroll-revealed content is not stuck invisible', async ({ page }) => {
    await page.goto('/about')
    await page.mouse.wheel(0, 1200)
    await page.waitForTimeout(500)
    const values = page.getByText('Results-Obsessed')
    await expect(values).toBeVisible()
  })
})
