import { QueryClient } from '@tanstack/react-query'

export const queryClientTest = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },

  logger: {
    // eslint-disable-next-line no-console,
    log: console.log,
    // eslint-disable-next-line no-console,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    // eslint-disable-next-line no-console, @typescript-eslint/no-empty-function
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
})
