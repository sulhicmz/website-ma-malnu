/**
 * PWA Configuration and Service Worker
 * Progressive Web App features for better user experience
 */

export interface PWAConfig {
  name: string
  shortName: string
  description: string
  themeColor: string
  backgroundColor: string
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'
  orientation: 'portrait' | 'landscape' | 'any'
  startUrl: string
  scope: string
  icons: PWAIcon[]
  shortcuts?: PWAShortcut[]
  categories?: string[]
  screenshots?: PWAScreenshot[]
}

export interface PWAIcon {
  src: string
  sizes: string
  type: string
  purpose?: 'any' | 'maskable' | 'monochrome'
}

export interface PWAShortcut {
  name: string
  shortName: string
  description: string
  url: string
  icons: PWAIcon[]
}

export interface PWAScreenshot {
  src: string
  sizes: string
  type: string
  form_factor?: 'narrow' | 'wide'
  label?: string
}

// PWA Configuration
export const pwaConfig: PWAConfig = {
  name: 'MA Malnu Kananga',
  shortName: 'MA Malnu',
  description: 'Website resmi MA Malnu Kananga - Informasi pendidikan dan pendaftaran online',
  themeColor: '#1e40af',
  backgroundColor: '#ffffff',
  display: 'standalone',
  orientation: 'portrait',
  startUrl: '/',
  scope: '/',
  icons: [
    {
      src: '/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png'
    },
    {
      src: '/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png'
    },
    {
      src: '/icons/icon-128x128.png',
      sizes: '128x128',
      type: 'image/png'
    },
    {
      src: '/icons/icon-144x144.png',
      sizes: '144x144',
      type: 'image/png'
    },
    {
      src: '/icons/icon-152x152.png',
      sizes: '152x152',
      type: 'image/png'
    },
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png'
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable'
    }
  ],
  shortcuts: [
    {
      name: 'Pendaftaran PPDB',
      shortName: 'PPDB',
      description: 'Daftar sebagai siswa baru',
      url: '/ppdb',
      icons: [
        {
          src: '/icons/ppdb-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        }
      ]
    },
    {
      name: 'Berita Terbaru',
      shortName: 'Berita',
      description: 'Lihat berita terkini',
      url: '/berita',
      icons: [
        {
          src: '/icons/news-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        }
      ]
    },
    {
      name: 'Kontak Kami',
      shortName: 'Kontak',
      description: 'Hubungi kami',
      url: '/kontak',
      icons: [
        {
          src: '/icons/contact-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        }
      ]
    }
  ],
  categories: ['education', 'school', 'information'],
  screenshots: [
    {
      src: '/screenshots/desktop-1.png',
      sizes: '1280x720',
      type: 'image/png',
      form_factor: 'wide',
      label: 'Homepage desktop view'
    },
    {
      src: '/screenshots/mobile-1.png',
      sizes: '375x667',
      type: 'image/png',
      form_factor: 'narrow',
      label: 'Homepage mobile view'
    }
  ]
}

// Service Worker with advanced caching strategies
const CACHE_NAME = 'ma-malnu-v1'
const STATIC_CACHE_NAME = 'ma-malnu-static-v1'
const DYNAMIC_CACHE_NAME = 'ma-malnu-dynamic-v1'
const IMAGE_CACHE_NAME = 'ma-malnu-images-v1'

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first for static assets
  static: {
    strategy: 'cacheFirst',
    cacheName: STATIC_CACHE_NAME,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 100
  },
  // Network first for API calls
  api: {
    strategy: 'networkFirst',
    cacheName: DYNAMIC_CACHE_NAME,
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 50
  },
  // Cache first with network fallback for images
  images: {
    strategy: 'cacheFirst',
    cacheName: IMAGE_CACHE_NAME,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxEntries: 200
  },
  // Network first for pages
  pages: {
    strategy: 'networkFirst',
    cacheName: DYNAMIC_CACHE_NAME,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxEntries: 30
  }
}

// Files to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/_next/static/css/',
  '/_next/static/chunks/',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.ico'
]

// Service Worker Event Listeners
self.addEventListener('install', (event: ExtendableEvent) => {
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

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== IMAGE_CACHE_NAME) {
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

self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip external requests (except for specific APIs)
  if (url.origin !== location.origin && !url.pathname.includes('/api/')) {
    return
  }
  
  // Determine cache strategy based on request type
  let strategy = CACHE_STRATEGIES.pages
  
  if (url.pathname.includes('/api/')) {
    strategy = CACHE_STRATEGIES.api
  } else if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)) {
    strategy = CACHE_STRATEGIES.images
  } else if (url.pathname.includes('/_next/static/')) {
    strategy = CACHE_STRATEGIES.static
  }
  
  event.respondWith(handleRequest(request, strategy))
})

// Handle requests with appropriate strategy
async function handleRequest(request: Request, strategy: any): Promise<Response> {
  const cache = await caches.open(strategy.cacheName)
  
  switch (strategy.strategy) {
    case 'cacheFirst':
      return cacheFirst(request, cache, strategy)
    case 'networkFirst':
      return networkFirst(request, cache, strategy)
    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request, cache, strategy)
    default:
      return networkFirst(request, cache, strategy)
  }
}

// Cache First Strategy
async function cacheFirst(request: Request, cache: Cache, strategy: any): Promise<Response> {
  const cachedResponse = await cache.match(request)
  
  if (cachedResponse) {
    // Check if cache is still valid
    const dateHeader = cachedResponse.headers.get('date')
    if (dateHeader) {
      const cacheTime = new Date(dateHeader).getTime()
      const now = Date.now()
      
      if (now - cacheTime < strategy.maxAge) {
        return cachedResponse
      }
    }
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone()
      await cache.put(request, responseToCache)
      await cleanCache(cache, strategy.maxEntries)
    }
    
    return networkResponse
  } catch (error) {
    console.warn('Cache First: Network failed, returning cached response:', error)
    return cachedResponse || getOfflineResponse(request)
  }
}

// Network First Strategy
async function networkFirst(request: Request, cache: Cache, strategy: any): Promise<Response> {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone()
      await cache.put(request, responseToCache)
      await cleanCache(cache, strategy.maxEntries)
    }
    
    return networkResponse
  } catch (error) {
    console.warn('Network First: Network failed, trying cache:', error)
    
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    return getOfflineResponse(request)
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request: Request, cache: Cache, strategy: any): Promise<Response> {
  const cachedResponse = await cache.match(request)
  
  // Always try to update cache in background
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
        cleanCache(cache, strategy.maxEntries)
      }
      return networkResponse
    })
    .catch((error) => {
      console.warn('Stale While Revalidate: Network update failed:', error)
    })
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse
  }
  
  // Otherwise wait for network
  return fetchPromise
}

// Clean cache to maintain max entries
async function cleanCache(cache: Cache, maxEntries: number): Promise<void> {
  const keys = await cache.keys()
  
  if (keys.length > maxEntries) {
    const keysToDelete = keys.slice(0, keys.length - maxEntries)
    await Promise.all(keysToDelete.map(key => cache.delete(key)))
  }
}

// Get offline response
function getOfflineResponse(request: Request): Response {
  const url = new URL(request.url)
  
  // Return offline page for navigation requests
  if (request.mode === 'navigate') {
    return caches.match('/offline').then(response => {
      return response || new Response('Offline - Please check your connection', {
        status: 503,
        statusText: 'Service Unavailable'
      })
    })
  }
  
  // Return placeholder for images
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
    return new Response('Offline Image', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
  
  // Return error for other requests
  return new Response('Offline - No cached version available', {
    status: 503,
    statusText: 'Service Unavailable'
  })
}

// Background Sync for offline actions
self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync(): Promise<void> {
  // Handle offline form submissions, analytics, etc.
  console.log('Service Worker: Background sync triggered')
  
  try {
    // Get pending actions from IndexedDB
    const pendingActions = await getPendingActions()
    
    // Process each action
    for (const action of pendingActions) {
      try {
        await fetch(action.url, {
          method: action.method,
          headers: action.headers,
          body: action.body
        })
        
        // Remove processed action
        await removePendingAction(action.id)
      } catch (error) {
        console.warn('Background sync action failed:', error)
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Push Notifications
self.addEventListener('push', (event: PushEvent) => {
  if (!event.data) {
    return
  }
  
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('MA Malnu Kananga', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// IndexedDB helpers for offline storage
async function getPendingActions(): Promise<any[]> {
  // Implementation would use IndexedDB to store pending actions
  return []
}

async function removePendingAction(id: string): Promise<void> {
  // Implementation would remove action from IndexedDB
}

// PWA Installation Detection
export const detectPWAInstall = (): boolean => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  )
}

// PWA Install Prompt
export const setupInstallPrompt = (): BeforeInstallPromptEvent | null => {
  let deferredPrompt: BeforeInstallPromptEvent | null = null
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e as BeforeInstallPromptEvent
  })
  
  return deferredPrompt
}

// Show install prompt
export const showInstallPrompt = async (deferredPrompt: BeforeInstallPromptEvent): Promise<boolean> => {
  deferredPrompt.prompt()
  
  const { outcome } = await deferredPrompt.userChoice
  
  if (outcome === 'accepted') {
    console.log('PWA installation accepted')
  } else {
    console.log('PWA installation dismissed')
  }
  
  deferredPrompt = null
  return outcome === 'accepted'
}

// Check if PWA is installed
export const isPWAInstalled = (): boolean => {
  return detectPWAInstall()
}

// Generate manifest.json
export const generateManifest = (): PWAConfig => {
  return pwaConfig
}