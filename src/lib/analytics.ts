/**
 * Advanced Analytics and User Behavior Tracking
 * Comprehensive analytics system for user insights
 */

export interface AnalyticsEvent {
  event: string
  category: string
  action?: string
  label?: string
  value?: number
  userId?: string
  sessionId: string
  timestamp: number
  url: string
  userAgent: string
  referrer?: string
  customProperties?: Record<string, any>
}

export interface PageView {
  url: string
  title: string
  referrer?: string
  sessionId: string
  userId?: string
  timestamp: number
  loadTime?: number
  viewport: {
    width: number
    height: number
  }
  screen: {
    width: number
    height: number
  }
}

export interface UserSession {
  sessionId: string
  userId?: string
  startTime: number
  endTime?: number
  duration?: number
  pageViews: number
  events: number
  bounceRate: number
  exitPage?: string
  entryPage: string
  device: {
    type: 'desktop' | 'mobile' | 'tablet'
    os: string
    browser: string
  }
  location?: {
    country?: string
    city?: string
  }
}

export interface PerformanceMetrics {
  pageLoadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
  timestamp: number
  url: string
}

class AnalyticsTracker {
  private sessionId: string
  private userId?: string
  private events: AnalyticsEvent[] = []
  private pageViews: PageView[] = []
  private sessionStartTime: number
  private lastActivityTime: number
  private isTracking: boolean = false
  private config: AnalyticsConfig

  constructor(config: AnalyticsConfig) {
    this.config = config
    this.sessionId = this.generateSessionId()
    this.sessionStartTime = Date.now()
    this.lastActivityTime = Date.now()
    this.initializeTracking()
  }

  // Initialize tracking
  private initializeTracking(): void {
    if (typeof window === 'undefined') return

    this.isTracking = true
    this.setupPageViewTracking()
    this.setupEventTracking()
    this.setupPerformanceTracking()
    this.setupUserInteractionTracking()
    this.setupSessionTracking()
  }

  // Generate unique session ID
  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  // Setup page view tracking
  private setupPageViewTracking(): void {
    // Track initial page view
    this.trackPageView()

    // Track SPA navigation
    if (this.config.trackSinglePageApplications) {
      this.trackNavigationChanges()
    }
  }

  // Track page view
  trackPageView(url?: string, title?: string): void {
    if (!this.isTracking) return

    const pageView: PageView = {
      url: url || window.location.href,
      title: title || document.title,
      referrer: document.referrer || undefined,
      sessionId: this.sessionId,
      userId: this.userId,
      timestamp: Date.now(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      screen: {
        width: screen.width,
        height: screen.height
      }
    }

    this.pageViews.push(pageView)
    this.sendToAnalytics('pageview', pageView)
  }

  // Track navigation changes for SPAs
  private trackNavigationChanges(): void {
    // Override pushState and replaceState
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = (...args) => {
      originalPushState.apply(history, args)
      this.handleNavigationChange()
    }

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args)
      this.handleNavigationChange()
    }

    // Listen to popstate events
    window.addEventListener('popstate', () => {
      this.handleNavigationChange()
    })
  }

  // Handle navigation change
  private handleNavigationChange(): void {
    setTimeout(() => {
      this.trackPageView()
    }, 0)
  }

  // Setup event tracking
  private setupEventTracking(): void {
    // Track clicks on important elements
    document.addEventListener('click', (event) => {
      this.trackClick(event)
    })

    // Track form submissions
    document.addEventListener('submit', (event) => {
      this.trackFormSubmission(event)
    })

    // Track scroll events
    this.setupScrollTracking()
  }

  // Track click events
  private trackClick(event: MouseEvent): void {
    const target = event.target as HTMLElement
    const trackingData = this.getElementTrackingData(target)

    if (trackingData) {
      this.trackEvent('click', 'interaction', trackingData.action, trackingData.label)
    }
  }

  // Get element tracking data
  private getElementTrackingData(element: HTMLElement): { action: string; label: string } | null {
    // Check for data attributes
    const trackEvent = element.getAttribute('data-track-event')
    const trackAction = element.getAttribute('data-track-action')
    const trackLabel = element.getAttribute('data-track-label')

    if (trackEvent) {
      return {
        action: trackAction || 'click',
        label: trackLabel || element.textContent || ''
      }
    }

    // Check for common interactive elements
    if (element.tagName === 'A' && element.getAttribute('href')) {
      return {
        action: 'link_click',
        label: element.getAttribute('href') || ''
      }
    }

    if (element.tagName === 'BUTTON') {
      return {
        action: 'button_click',
        label: element.textContent || ''
      }
    }

    return null
  }

  // Track form submission
  private trackFormSubmission(event: Event): void {
    const form = event.target as HTMLFormElement
    const formName = form.getAttribute('data-form-name') || form.id || 'unknown_form'
    
    this.trackEvent('form_submit', 'conversion', formName)
  }

  // Setup scroll tracking
  private setupScrollTracking(): void {
    let maxScroll = 0
    let scrollMilestones = [25, 50, 75, 90, 100]
    let reachedMilestones: number[] = []

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage
      }

      // Track scroll milestones
      scrollMilestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !reachedMilestones.includes(milestone)) {
          reachedMilestones.push(milestone)
          this.trackEvent('scroll', 'engagement', `scroll_${milestone}`, milestone)
        }
      })
    }

    window.addEventListener('scroll', this.debounce(handleScroll, 100))
  }

  // Setup performance tracking
  private setupPerformanceTracking(): void {
    if ('PerformanceObserver' in window) {
      this.trackWebVitals()
      this.trackResourceTiming()
    }
  }

  // Track Web Vitals
  private trackWebVitals(): void {
    // Import web-vitals library dynamically
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => this.trackPerformanceMetric('CLS', metric))
      getFID((metric) => this.trackPerformanceMetric('FID', metric))
      getFCP((metric) => this.trackPerformanceMetric('FCP', metric))
      getLCP((metric) => this.trackPerformanceMetric('LCP', metric))
      getTTFB((metric) => this.trackPerformanceMetric('TTFB', metric))
    })
  }

  // Track performance metric
  private trackPerformanceMetric(name: string, metric: any): void {
    const performanceMetric: PerformanceMetrics = {
      [name]: metric.value,
      timestamp: Date.now(),
      url: window.location.href
    } as PerformanceMetrics

    this.sendToAnalytics('performance', performanceMetric)
  }

  // Track resource timing
  private trackResourceTiming(): void {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          this.trackResourceLoad(entry as PerformanceResourceTiming)
        }
      })
    })

    observer.observe({ entryTypes: ['resource'] })
  }

  // Track resource load
  private trackResourceLoad(entry: PerformanceResourceTiming): void {
    const resourceData = {
      name: entry.name,
      type: this.getResourceType(entry.name),
      duration: entry.duration,
      size: entry.transferSize || 0,
      cached: entry.transferSize === 0 && entry.decodedBodySize > 0
    }

    this.sendToAnalytics('resource_load', resourceData)
  }

  // Get resource type
  private getResourceType(url: string): string {
    if (url.match(/\.(js)$/)) return 'script'
    if (url.match(/\.(css)$/)) return 'stylesheet'
    if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) return 'image'
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return 'font'
    return 'other'
  }

  // Setup user interaction tracking
  private setupUserInteractionTracking(): void {
    // Track mouse movements (sampled)
    let mouseTrackingEnabled = false
    let mouseMoveCount = 0

    document.addEventListener('mousemove', () => {
      mouseMoveCount++
      
      if (!mouseTrackingEnabled && mouseMoveCount > 10) {
        mouseTrackingEnabled = true
        this.trackEvent('mouse_movement', 'engagement', 'user_active')
      }
    })

    // Track keyboard interactions
    document.addEventListener('keydown', () => {
      this.trackEvent('keyboard_interaction', 'engagement', 'user_typing')
    })

    // Track touch interactions
    document.addEventListener('touchstart', () => {
      this.trackEvent('touch_interaction', 'engagement', 'user_touch')
    })
  }

  // Setup session tracking
  private setupSessionTracking(): void {
    // Update last activity time
    const updateActivity = () => {
      this.lastActivityTime = Date.now()
    }

    document.addEventListener('click', updateActivity)
    document.addEventListener('scroll', updateActivity)
    document.addEventListener('keydown', updateActivity)

    // Check for session timeout
    setInterval(() => {
      const inactiveTime = Date.now() - this.lastActivityTime
      if (inactiveTime > this.config.sessionTimeout) {
        this.endSession()
        this.startNewSession()
      }
    }, 60000) // Check every minute

    // Track session end
    window.addEventListener('beforeunload', () => {
      this.endSession()
    })
  }

  // Track custom event
  trackEvent(
    event: string,
    category: string,
    action?: string,
    label?: string,
    value?: number,
    customProperties?: Record<string, any>
  ): void {
    if (!this.isTracking) return

    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      label,
      value,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      customProperties
    }

    this.events.push(analyticsEvent)
    this.sendToAnalytics('event', analyticsEvent)
  }

  // Track conversion
  trackConversion(conversionType: string, value?: number, currency?: string): void {
    this.trackEvent('conversion', 'conversion', conversionType, undefined, value, {
      currency
    })
  }

  // Track error
  trackError(error: Error, context?: string): void {
    this.trackEvent('error', 'error', error.name, error.message, undefined, {
      stack: error.stack,
      context
    })
  }

  // Set user ID
  setUserId(userId: string): void {
    this.userId = userId
    this.trackEvent('user_identified', 'user', 'identification', userId)
  }

  // Send data to analytics endpoint
  private async sendToAnalytics(type: string, data: any): Promise<void> {
    if (!this.config.enableTracking) return

    try {
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          data,
          timestamp: Date.now()
        })
      })
    } catch (error) {
      // Silently fail to avoid affecting user experience
      console.warn('Analytics tracking failed:', error)
    }
  }

  // End current session
  private endSession(): void {
    const session: UserSession = {
      sessionId: this.sessionId,
      userId: this.userId,
      startTime: this.sessionStartTime,
      endTime: Date.now(),
      duration: Date.now() - this.sessionStartTime,
      pageViews: this.pageViews.length,
      events: this.events.length,
      bounceRate: this.pageViews.length <= 1 ? 100 : 0,
      entryPage: this.pageViews[0]?.url || '',
      exitPage: this.pageViews[this.pageViews.length - 1]?.url,
      device: this.getDeviceInfo()
    }

    this.sendToAnalytics('session_end', session)
  }

  // Start new session
  private startNewSession(): void {
    this.sessionId = this.generateSessionId()
    this.sessionStartTime = Date.now()
    this.lastActivityTime = Date.now()
    this.pageViews = []
    this.events = []
  }

  // Get device info
  private getDeviceInfo(): UserSession['device'] {
    const userAgent = navigator.userAgent
    
    return {
      type: this.getDeviceType(userAgent),
      os: this.getOperatingSystem(userAgent),
      browser: this.getBrowser(userAgent)
    }
  }

  // Get device type
  private getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet'
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile'
    }
    return 'desktop'
  }

  // Get operating system
  private getOperatingSystem(userAgent: string): string {
    if (/windows/i.test(userAgent)) return 'Windows'
    if (/mac/i.test(userAgent)) return 'macOS'
    if (/linux/i.test(userAgent)) return 'Linux'
    if (/android/i.test(userAgent)) return 'Android'
    if (/ios|iphone|ipad|ipod/i.test(userAgent)) return 'iOS'
    return 'Unknown'
  }

  // Get browser
  private getBrowser(userAgent: string): string {
    if (/chrome/i.test(userAgent)) return 'Chrome'
    if (/firefox/i.test(userAgent)) return 'Firefox'
    if (/safari/i.test(userAgent)) return 'Safari'
    if (/edge/i.test(userAgent)) return 'Edge'
    if (/opera/i.test(userAgent)) return 'Opera'
    return 'Unknown'
  }

  // Debounce function
  private debounce(func: Function, wait: number): Function {
    let timeout: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

  // Get session data
  getSessionData(): {
    sessionId: string
    userId?: string
    duration: number
    pageViews: number
    events: number
  } {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      duration: Date.now() - this.sessionStartTime,
      pageViews: this.pageViews.length,
      events: this.events.length
    }
  }
}

// Analytics configuration
export interface AnalyticsConfig {
  enableTracking: boolean
  trackSinglePageApplications: boolean
  sessionTimeout: number
  apiEndpoint: string
  sampleRate: number
}

// Default configuration
const defaultConfig: AnalyticsConfig = {
  enableTracking: true,
  trackSinglePageApplications: true,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  apiEndpoint: '/api/analytics/events',
  sampleRate: 1.0 // 100% sampling
}

// Global analytics tracker
let analyticsTracker: AnalyticsTracker | null = null

export const initAnalytics = (config: Partial<AnalyticsConfig> = {}): AnalyticsTracker => {
  const finalConfig = { ...defaultConfig, ...config }
  analyticsTracker = new AnalyticsTracker(finalConfig)
  return analyticsTracker
}

export const getAnalyticsTracker = (): AnalyticsTracker | null => {
  return analyticsTracker
}

// Export convenience functions
export const trackEvent = (
  event: string,
  category: string,
  action?: string,
  label?: string,
  value?: number
) => {
  analyticsTracker?.trackEvent(event, category, action, label, value)
}

export const trackPageView = (url?: string, title?: string) => {
  analyticsTracker?.trackPageView(url, title)
}

export const trackConversion = (type: string, value?: number, currency?: string) => {
  analyticsTracker?.trackConversion(type, value, currency)
}

export const setUserId = (userId: string) => {
  analyticsTracker?.setUserId(userId)
}