import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from './mocks/server'

// Setup MSW (Mock Service Worker)
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  })
})

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

// Close server after all tests
afterAll(() => {
  server.close()
})

// Mock Next.js router
vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: vi.fn(),
      pop: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
    }
  },
}))

// Mock Next.js image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

// Mock Sanity client
vi.mock('@/lib/sanity', () => ({
  sanityClient: {
    fetch: vi.fn(),
    config: vi.fn(),
  },
  imageUrlBuilder: vi.fn(() => ({
    url: vi.fn(() => 'https://example.com/image.jpg'),
    width: vi.fn(),
    height: vi.fn(),
    format: vi.fn(),
    quality: vi.fn(),
  })),
}))

// Mock environment variables
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project'
process.env.NEXT_PUBLIC_SANITY_DATASET = 'test-dataset'
process.env.NODE_ENV = 'test'