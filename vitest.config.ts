import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '.next/',
        'coverage/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/test/**',
        '**/__tests__/**',
        '**/*.stories.*',
        '**/*.spec.*',
        'src/test/**',
        'scripts/',
        'docs/',
        '.github/',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        // Component-specific thresholds
        'src/components/**/*.{ts,tsx}': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        // Utility functions should have higher coverage
        'src/lib/**/*.{ts,tsx}': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
    },
    // Test matching patterns
    include: [
      'src/**/*.{test,spec}.{js,ts,tsx}',
      'components/**/*.{test,spec}.{js,ts,tsx}',
    ],
    exclude: [
      'node_modules/',
      '.next/',
      'dist/',
      'build/',
      '**/*.stories.*',
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      '@/components': resolve(__dirname, 'components'),
      '@/lib': resolve(__dirname, 'src/lib'),
      '@/app': resolve(__dirname, 'src/app'),
      '@/types': resolve(__dirname, 'types'),
      '@/utils': resolve(__dirname, 'src/lib/utils'),
      '@/hooks': resolve(__dirname, 'src/hooks'),
      '@/config': resolve(__dirname, 'config'),
    },
  },
})