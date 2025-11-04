const CACHE_NAME = 'ma-malnu-v1'
const STATIC_CACHE_NAME = 'ma-malnu-static-v1'
const DYNAMIC_CACHE_NAME = 'ma-malnu-dynamic-v1'

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/_next/static/css/',
  '/_next/static/chunks/',
  '/images/logo.png',
  '/favicon.ico',
]

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/berita',
  '/api/guru',
  '/api/galeri',
  '/api/pengumuman',
  '/api/prestasi',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Static assets cached')
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip external requests (except for specific CDN domains)
  if (!url.origin.includes(self.location.origin) && 
      !url.hostname.includes('cdn.sanity.io') &&
      !url.hostname.includes('googleapis.com') &&
      !url.hostname.includes('gstatic.com')) {
    return
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          // For API endpoints, try to update cache in background
          if (API_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint))) {
            fetchAndCache(request)
          }
          return cachedResponse
        }

        // For static assets, cache and serve
        if (isStaticAsset(request.url)) {
          return fetchAndCache(request)
        }

        // For API endpoints, try network first, then cache
        if (API_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint))) {
          return fetch(request)
            .then((response) => {
              // Cache successful responses
              if (response.ok) {
                const responseClone = response.clone()
                caches.open(DYNAMIC_CACHE_NAME)
                  .then((cache) => {
                    cache.put(request, responseClone)
                  })
              }
              return response
            })
            .catch(() => {
              // If network fails, try cache
              return caches.match(request)
            })
        }

        // For pages, try network first, then cache
        if (request.headers.get('accept').includes('text/html')) {
          return fetch(request)
            .then((response) => {
              // Cache successful page responses
              if (response.ok) {
                const responseClone = response.clone()
                caches.open(DYNAMIC_CACHE_NAME)
                  .then((cache) => {
                    cache.put(request, responseClone)
                  })
              }
              return response
            })
            .catch(() => {
              // If network fails, return cached page or offline page
              return caches.match(request) || caches.match('/')
            })
        }

        // Default: fetch from network
        return fetch(request)
      })
  )
})

// Helper function to fetch and cache
function fetchAndCache(request) {
  return fetch(request)
    .then((response) => {
      // Check if we received a valid response
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response
      }

      // Clone the response since it can only be consumed once
      const responseToCache = response.clone()

      caches.open(DYNAMIC_CACHE_NAME)
        .then((cache) => {
          cache.put(request, responseToCache)
        })

      return response
    })
    .catch(() => {
      // If fetch fails, try to serve from cache
      return caches.match(request)
    })
}

// Helper function to check if request is for static asset
function isStaticAsset(url) {
  return url.includes('/_next/static/') ||
         url.includes('/images/') ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('.png') ||
         url.includes('.jpg') ||
         url.includes('.jpeg') ||
         url.includes('.svg') ||
         url.includes('.ico') ||
         url.includes('.woff') ||
         url.includes('.woff2')
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered')
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {
  // Handle any queued offline actions
  return self.registration.showNotification('MA Malnu', {
    body: 'Your data has been synced!',
    icon: '/images/logo.png',
  })
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update from MA Malnu',
    icon: '/images/logo.png',
    badge: '/images/badge.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/xmark.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('MA Malnu', options)
  )
}

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click received')

  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Cache cleanup on storage quota exceeded
self.addEventListener('quotaexceeded', (event) => {
  console.log('Service Worker: Storage quota exceeded')
  
  event.waitUntil(
    caches.open(DYNAMIC_CACHE_NAME)
      .then((cache) => {
        // Get all cache entries
        return cache.keys()
          .then((keys) => {
            // Delete oldest entries until we have enough space
            return Promise.all(
              keys.slice(0, Math.floor(keys.length / 2)).map(key => cache.delete(key))
            )
          })
      })
  )
})