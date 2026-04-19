import { defineConfig, devices } from '@playwright/test'

const port = 3001

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['html'], ['list']] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run test:e2e:server',
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
})
