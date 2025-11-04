module.exports = {
  ci: {
    collect: {
url: [
        'http://localhost:3000',
        'http://localhost:3000/berita',
        'http://localhost:3000/galeri',
        'http://localhost:3000/ppdb',
        'http://localhost:3000/kontak',
        'http://localhost:3000/profil'
      ],
      startServerCommand: 'npm start',
      startServerReadyPattern: 'ready',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'categories:pwa': 'off',
        // Specific performance metrics
        'metrics:first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'metrics:largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'metrics:cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'metrics:total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}