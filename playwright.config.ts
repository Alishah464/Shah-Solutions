import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  globalSetup: './tests/global-setup.ts',
  fullyParallel: true,
  // `next dev` (webpack) is a single, fairly slow dev server — running many
  // workers against it concurrently causes real request-queueing delays
  // that show up as test flakiness unrelated to the app itself.
  //
  // Testing against the real static export (`out/`) was tried instead, but
  // Next.js 16's export format puts a route's HTML at `path.html` *next to*
  // a same-named `path/` directory holding only RSC payload files — generic
  // static servers (tried: `serve`) don't know to prefer the `.html` file
  // over treating `path/` as the target directory, so nearly every clean
  // URL 404s. That's a static-server-vs-export-format mismatch, not
  // something worth solving here; dev mode is the pragmatic, correct-enough
  // choice for interaction testing.
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: 45_000,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
