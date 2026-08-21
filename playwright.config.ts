import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  globalSetup: './tests/global-setup.ts',
  fullyParallel: true,
  // `next dev` (webpack) is a single, fairly slow dev server — running many
  // workers against it concurrently causes real request-queueing delays
  // that show up as test flakiness unrelated to the app itself.
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
    timeout: 60_000,
  },
})
