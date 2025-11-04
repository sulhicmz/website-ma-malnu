import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

// Web Vitals thresholds
const VITAL_THRESHOLDS = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FID: { good: 100, needsImprovement: 300 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
}

// Get performance rating
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = VITAL_THRESHOLDS[name as keyof typeof VITAL_THRESHOLDS]
  if (!threshold) return 'good'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

// Send vitals to analytics
function sendToAnalytics(metric: any) {
  // Send to Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_map: {
        metric_rating: getRating(metric.name, metric.value),
        metric_value: metric.value,
        metric_id: metric.id,
      },
    })
  }

  // Send to custom analytics endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        rating: getRating(metric.name, metric.value),
        id: metric.id,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
    }).catch((error) => {
      console.warn('Failed to send web vitals:', error)
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: getRating(metric.name, metric.value),
      id: metric.id,
    })
  }
}

// Initialize Web Vitals monitoring
export function reportWebVitals() {
  if (typeof window !== 'undefined') {
    // Cumulative Layout Shift
    getCLS(sendToAnalytics)
    
    // First Input Delay
    getFID(sendToAnalytics)
    
    // First Contentful Paint
    getFCP(sendToAnalytics)
    
    // Largest Contentful Paint
    getLCP(sendToAnalytics)
    
    // Time to First Byte
    getTTFB(sendToAnalytics)
  }
}

// Get current Web Vitals scores
export async function getWebVitalsScores(): Promise<any> {
  if (typeof window === 'undefined') return null

  return new Promise((resolve) => {
    const vitals: any = {}
    
    const checkComplete = () => {
      if (Object.keys(vitals).length === 5) {
        resolve(vitals)
      }
    }

    getCLS((metric) => {
      vitals.CLS = { value: metric.value, rating: getRating('CLS', metric.value) }
      checkComplete()
    })
    
    getFID((metric) => {
      vitals.FID = { value: metric.value, rating: getRating('FID', metric.value) }
      checkComplete()
    })
    
    getFCP((metric) => {
      vitals.FCP = { value: metric.value, rating: getRating('FCP', metric.value) }
      checkComplete()
    })
    
    getLCP((metric) => {
      vitals.LCP = { value: metric.value, rating: getRating('LCP', metric.value) }
      checkComplete()
    })
    
    getTTFB((metric) => {
      vitals.TTFB = { value: metric.value, rating: getRating('TTFB', metric.value) }
      checkComplete()
    })
  })
}

// Calculate overall performance score
export function calculatePerformanceScore(vitals: any): number {
  if (!vitals) return 0

  const scores = Object.values(vitals).map((vital: any) => {
    const { rating } = vital as { rating: string }
    switch (rating) {
      case 'good': return 100
      case 'needs-improvement': return 50
      case 'poor': return 0
      default: return 0
    }
  })

  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
}

// Get performance recommendations
export function getPerformanceRecommendations(vitals: any): string[] {
  if (!vitals) return []

  const recommendations: string[] = []

  Object.entries(vitals).forEach(([name, vital]: [string, any]) => {
    const { rating, value } = vital as { rating: string; value: number }

    switch (name) {
      case 'CLS':
        if (rating !== 'good') {
          recommendations.push('Reduce layout shifts by specifying image dimensions and avoiding inserting content above existing content')
        }
        break
      case 'FID':
        if (rating !== 'good') {
          recommendations.push('Improve interactivity by reducing JavaScript execution time and using code splitting')
        }
        break
      case 'FCP':
        if (rating !== 'good') {
          recommendations.push('Speed up first contentful paint by optimizing server response time and reducing render-blocking resources')
        }
        break
      case 'LCP':
        if (rating !== 'good') {
          recommendations.push('Optimize largest contentful paint by optimizing images, using modern image formats, and preloading important resources')
        }
        break
      case 'TTFB':
        if (rating !== 'good') {
          recommendations.push('Reduce time to first byte by optimizing server performance and using CDN')
        }
        break
    }
  })

  return recommendations
}

// Performance monitoring component
export function usePerformanceMonitoring() {
  if (typeof window !== 'undefined') {
    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
      
      console.log('[Performance] Page Load Metrics:', {
        loadTime: `${loadTime}ms`,
        domContentLoaded: `${domContentLoaded}ms`,
        domInteractive: `${navigation.domInteractive - navigation.fetchStart}ms`,
      })
    })

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn('[Performance] Long task detected:', {
              duration: `${entry.duration}ms`,
              startTime: entry.startTime,
              name: entry.name,
            })
          }
        })
      })
      
      observer.observe({ entryTypes: ['longtask'] })
    }
  }
}