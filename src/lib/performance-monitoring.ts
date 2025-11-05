/**
 * Performance Monitoring Configuration
 * Web Vitals tracking and performance budgets
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

// Performance thresholds based on Google Core Web Vitals
export const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
}

// Performance budgets
export const PERFORMANCE_BUDGETS = {
  // Bundle size budgets (in KB)
  bundleSize: {
    total: 500,
    vendor: 300,
    common: 100,
    initial: 250
  },
  
  // Resource count budgets
  resourceCount: {
    total: 50,
    scripts: 10,
    stylesheets: 5,
    images: 20,
    fonts: 5
  },
  
  // Loading time budgets (in ms)
  loadTime: {
    firstContentfulPaint: 1800,
    largestContentfulPaint: 2500,
    firstInputDelay: 100,
    cumulativeLayoutShift: 0.1
  }
}

// Performance metrics storage
interface PerformanceMetrics {
  timestamp: number
  url: string
  userAgent: string
  connection: string
  metrics: {
    LCP?: number
    FID?: number
    CLS?: number
    FCP?: number
    TTFB?: number
  }
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = []
  private observers: PerformanceObserver[] = []

  constructor() {
    this.initWebVitals()
    this.initResourceTiming()
    this.initNavigationTiming()
  }

  // Initialize Web Vitals monitoring
  private initWebVitals() {
    const handleMetric = (metric: any) => {
      this.recordMetric(metric.name, metric.value)
      
      // Check against thresholds
      const threshold = PERFORMANCE_THRESHOLDS[metric.name as keyof typeof PERFORMANCE_THRESHOLDS]
      if (threshold) {
        this.evaluatePerformance(metric.name, metric.value, threshold)
      }
      
      // Send to analytics
      this.sendToAnalytics(metric)
    }

    getCLS(handleMetric)
    getFID(handleMetric)
    getFCP(handleMetric)
    getLCP(handleMetric)
    getTTFB(handleMetric)
  }

  // Initialize Resource Timing monitoring
  private initResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource') {
            this.trackResourceTiming(entry as PerformanceResourceTiming)
          }
        })
      })
      
      observer.observe({ entryTypes: ['resource'] })
      this.observers.push(observer)
    }
  }

  // Initialize Navigation Timing monitoring
  private initNavigationTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.trackNavigationTiming(entry as PerformanceNavigationTiming)
          }
        })
      })
      
      observer.observe({ entryTypes: ['navigation'] })
      this.observers.push(observer)
    }
  }

  // Record metric
  private recordMetric(name: string, value: number) {
    const existingMetric = this.metrics.find(m => 
      m.url === window.location.href && 
      Math.abs(m.timestamp - Date.now()) < 5000
    )

    if (existingMetric) {
      existingMetric.metrics[name as keyof typeof existingMetric.metrics] = value
    } else {
      this.metrics.push({
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        connection: this.getConnectionType(),
        metrics: { [name]: value }
      })
    }
  }

  // Evaluate performance against thresholds
  private evaluatePerformance(metricName: string, value: number, threshold: any) {
    let rating: 'good' | 'needs-improvement' | 'poor'
    
    if (value <= threshold.good) {
      rating = 'good'
    } else if (value <= threshold.needsImprovement) {
      rating = 'needs-improvement'
    } else {
      rating = 'poor'
    }

    if (rating !== 'good') {
      this.reportPerformanceIssue(metricName, value, rating)
    }
  }

  // Track resource timing
  private trackResourceTiming(entry: PerformanceResourceTiming) {
    const resource = {
      name: entry.name,
      type: this.getResourceType(entry.name),
      duration: entry.duration,
      size: entry.transferSize || 0,
      cached: entry.transferSize === 0 && entry.decodedBodySize > 0
    }

    // Check budget compliance
    this.checkResourceBudget(resource)
  }

  // Track navigation timing
  private trackNavigationTiming(entry: PerformanceNavigationTiming) {
    const navigation = {
      domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      loadComplete: entry.loadEventEnd - entry.loadEventStart,
      firstPaint: this.getFirstPaint(),
      firstContentfulPaint: this.getFirstContentfulPaint()
    }

    this.recordNavigationMetrics(navigation)
  }

  // Get connection type
  private getConnectionType(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    return connection ? connection.effectiveType || 'unknown' : 'unknown'
  }

  // Get resource type
  private getResourceType(url: string): string {
    if (url.match(/\.(js)$/)) return 'script'
    if (url.match(/\.(css)$/)) return 'stylesheet'
    if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) return 'image'
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return 'font'
    return 'other'
  }

  // Get First Paint
  private getFirstPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint')
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')
    return firstPaint ? firstPaint.startTime : null
  }

  // Get First Contentful Paint
  private getFirstContentfulPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint')
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
    return fcp ? fcp.startTime : null
  }

  // Check resource budget compliance
  private checkResourceBudget(resource: any) {
    const budget = PERFORMANCE_BUDGETS.resourceCount[resource.type]
    if (budget) {
      const currentCount = this.metrics[m.metrics.length - 1]?.resourceCounts?.[resource.type] || 0
      if (currentCount > budget) {
        this.reportBudgetViolation(resource.type, currentCount, budget)
      }
    }
  }

  // Report performance issue
  private reportPerformanceIssue(metric: string, value: number, rating: string) {
    console.warn(`Performance issue detected: ${metric} = ${value} (${rating})`)
    
    // Send to monitoring service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_issue', {
        metric_name: metric,
        metric_value: value,
        rating: rating
      })
    }
  }

  // Report budget violation
  private reportBudgetViolation(resourceType: string, current: number, budget: number) {
    console.warn(`Budget violation: ${resourceType} count = ${current} (budget = ${budget})`)
  }

  // Send metrics to analytics
  private sendToAnalytics(metric: any) {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_action: metric.name,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true
      })
    }

    // Send to custom analytics endpoint
    this.sendToCustomAnalytics(metric)
  }

  // Send to custom analytics
  private sendToCustomAnalytics(metric: any) {
    // Implementation depends on your analytics backend
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      })
    }).catch(() => {
      // Silently fail to avoid affecting user experience
    })
  }

  // Record navigation metrics
  private recordNavigationMetrics(navigation: any) {
    // Store navigation metrics for analysis
    console.log('Navigation metrics:', navigation)
  }

  // Get performance summary
  public getPerformanceSummary(): PerformanceMetrics[] {
    return this.metrics
  }

  // Clear metrics
  public clearMetrics(): void {
    this.metrics = []
  }

  // Disconnect observers
  public disconnect(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Initialize performance monitor
let performanceMonitor: PerformanceMonitor | null = null

export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && !performanceMonitor) {
    performanceMonitor = new PerformanceMonitor()
  }
}

export const getPerformanceMonitor = () => performanceMonitor

// Performance budget checker
export const checkPerformanceBudgets = () => {
  if (typeof window === 'undefined') return

  // Check bundle size
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  const bundleSize = resources
    .filter(r => r.name.includes('.js') || r.name.includes('.css'))
    .reduce((total, r) => total + (r.transferSize || 0), 0)

  if (bundleSize > PERFORMANCE_BUDGETS.bundleSize.total * 1024) {
    console.warn(`Bundle size budget exceeded: ${Math.round(bundleSize / 1024)}KB`)
  }

  // Check resource count
  const scriptCount = resources.filter(r => r.name.includes('.js')).length
  const styleCount = resources.filter(r => r.name.includes('.css')).length
  const imageCount = resources.filter(r => r.name.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)).length

  if (scriptCount > PERFORMANCE_BUDGETS.resourceCount.scripts) {
    console.warn(`Script count budget exceeded: ${scriptCount}`)
  }
  if (styleCount > PERFORMANCE_BUDGETS.resourceCount.stylesheets) {
    console.warn(`Stylesheet count budget exceeded: ${styleCount}`)
  }
  if (imageCount > PERFORMANCE_BUDGETS.resourceCount.images) {
    console.warn(`Image count budget exceeded: ${imageCount}`)
  }
}