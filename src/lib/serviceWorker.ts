export function register() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `/sw.js`

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('Service Worker registered: ', registration)

          // Check for updates periodically
          setInterval(() => {
            registration.update()
          }, 60 * 60 * 1000) // Check every hour

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update notification
                  if (window.confirm('New content is available. Would you like to refresh?')) {
                    window.location.reload()
                  }
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error('Service Worker registration failed: ', error)
        })
    })
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
      })
      .catch((error) => {
        console.error(error.message)
      })
  }
}

// Check if service worker is supported
export function isServiceWorkerSupported() {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator
}

// Get current service worker version
export async function getServiceWorkerVersion() {
  if (!isServiceWorkerSupported()) return null

  try {
    const registration = await navigator.serviceWorker.getRegistration()
    return registration?.active?.state || null
  } catch (error) {
    console.error('Error getting service worker version:', error)
    return null
  }
}

// Trigger background sync
export async function triggerBackgroundSync() {
  if (!isServiceWorkerSupported()) return false

  try {
    const registration = await navigator.serviceWorker.ready
    if ('sync' in registration) {
      await registration.sync.register('background-sync')
      return true
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
  return false
}

// Request notification permission
export async function requestNotificationPermission() {
  if (!isServiceWorkerSupported()) return false

  try {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  } catch (error) {
    console.error('Notification permission failed:', error)
    return false
  }
}

// Subscribe to push notifications
export async function subscribeToPushNotifications() {
  if (!isServiceWorkerSupported()) return null

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    })
    return subscription
  } catch (error) {
    console.error('Push subscription failed:', error)
    return null
  }
}