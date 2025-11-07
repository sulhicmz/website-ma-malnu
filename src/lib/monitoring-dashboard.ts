/**
 * Advanced Monitoring Dashboard System
 * Real-time monitoring with comprehensive metrics and alerting
 */

export interface DashboardMetric {
  id: string
  name: string
  value: number | string
  unit: string
  trend: 'up' | 'down' | 'stable'
  change: number
  threshold: {
    warning: number
    critical: number
  }
  status: 'healthy' | 'warning' | 'critical'
  lastUpdated: Date
}

export interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical'
  services: ServiceHealth[]
  uptime: number
  responseTime: number
  errorRate: number
  throughput: number
  timestamp: Date
}

export interface ServiceHealth {
  name: string
  status: 'healthy' | 'warning' | 'critical' | 'unknown'
  responseTime: number
  errorRate: number
  lastCheck: Date
  uptime: number
  dependencies: string[]
  metrics: Record<string, number>
}

export interface Alert {
  id: string
  type: 'error' | 'warning' | 'info'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  message: string
  source: string
  timestamp: Date
  acknowledged: boolean
  resolved: boolean
  metadata: Record<string, any>
}

export interface PerformanceReport {
  period: {
    start: Date
    end: Date
  }
  metrics: {
    pageViews: number
    uniqueVisitors: number
    bounceRate: number
    avgSessionDuration: number
    conversionRate: number
    topPages: Array<{
      url: string
      views: number
      avgTimeOnPage: number
    }>
    deviceBreakdown: Record<string, number>
    geographicBreakdown: Record<string, number>
  }
  performance: {
    avgLoadTime: number
    coreWebVitals: {
      lcp: number
      fid: number
      cls: number
    }
    errorRate: number
    uptime: number
  }
}

class MonitoringDashboard {
  private metrics: Map<string, DashboardMetric> = new Map()
  private alerts: Alert[] = []
  private systemHealth: SystemHealth | null = null
  private performanceData: any[] = []
  private alertRules: AlertRule[] = []
  private subscribers: Map<string, (data: any) => void> = new Map()
  private isMonitoring: boolean = false

  constructor() {
    this.setupDefaultAlertRules()
    this.startMonitoring()
  }

  // Start monitoring system
  private startMonitoring(): void {
    if (this.isMonitoring) return
    
    this.isMonitoring = true
    console.log('📊 Starting advanced monitoring dashboard...')
    
    // Collect metrics every 30 seconds
    setInterval(() => {
      this.collectMetrics()
    }, 30000)
    
    // Check health every minute
    setInterval(() => {
      this.checkSystemHealth()
    }, 60000)
    
    // Process alerts every 10 seconds
    setInterval(() => {
      this.processAlerts()
    }, 10000)
    
    // Generate reports every hour
    setInterval(() => {
      this.generatePerformanceReport()
    }, 3600000)
  }

  // Collect system metrics
  private async collectMetrics(): Promise<void> {
    const timestamp = new Date()
    
    // Collect performance metrics
    const performanceMetrics = await this.collectPerformanceMetrics()
    
    // Collect business metrics
    const businessMetrics = await this.collectBusinessMetrics()
    
    // Collect infrastructure metrics
    const infrastructureMetrics = await this.collectInfrastructureMetrics()
    
    // Update metrics store
    this.updateMetrics([...performanceMetrics, ...businessMetrics, ...infrastructureMetrics])
    
    // Notify subscribers
    this.notifySubscribers('metrics', {
      timestamp,
      metrics: this.getAllMetrics()
    })
  }

  // Collect performance metrics
  private async collectPerformanceMetrics(): Promise<DashboardMetric[]> {
    const metrics: DashboardMetric[] = []
    
    // Page load time
    const avgLoadTime = await this.getAverageLoadTime()
    metrics.push({
      id: 'page_load_time',
      name: 'Average Page Load Time',
      value: avgLoadTime,
      unit: 'ms',
      trend: this.calculateTrend('page_load_time', avgLoadTime),
      change: this.calculateChange('page_load_time', avgLoadTime),
      threshold: { warning: 3000, critical: 5000 },
      status: this.getStatus(avgLoadTime, { warning: 3000, critical: 5000 }),
      lastUpdated: new Date()
    })
    
    // Core Web Vitals
    const lcp = await this.getLCP()
    metrics.push({
      id: 'lcp',
      name: 'Largest Contentful Paint',
      value: lcp,
      unit: 'ms',
      trend: this.calculateTrend('lcp', lcp),
      change: this.calculateChange('lcp', lcp),
      threshold: { warning: 2500, critical: 4000 },
      status: this.getStatus(lcp, { warning: 2500, critical: 4000 }),
      lastUpdated: new Date()
    })
    
    const fid = await this.getFID()
    metrics.push({
      id: 'fid',
      name: 'First Input Delay',
      value: fid,
      unit: 'ms',
      trend: this.calculateTrend('fid', fid),
      change: this.calculateChange('fid', fid),
      threshold: { warning: 100, critical: 300 },
      status: this.getStatus(fid, { warning: 100, critical: 300 }),
      lastUpdated: new Date()
    })
    
    const cls = await this.getCLS()
    metrics.push({
      id: 'cls',
      name: 'Cumulative Layout Shift',
      value: cls,
      unit: 'score',
      trend: this.calculateTrend('cls', cls),
      change: this.calculateChange('cls', cls),
      threshold: { warning: 0.1, critical: 0.25 },
      status: this.getStatus(cls, { warning: 0.1, critical: 0.25 }),
      lastUpdated: new Date()
    })
    
    // Error rate
    const errorRate = await this.getErrorRate()
    metrics.push({
      id: 'error_rate',
      name: 'Error Rate',
      value: errorRate,
      unit: '%',
      trend: this.calculateTrend('error_rate', errorRate),
      change: this.calculateChange('error_rate', errorRate),
      threshold: { warning: 1, critical: 5 },
      status: this.getStatus(errorRate, { warning: 1, critical: 5 }),
      lastUpdated: new Date()
    })
    
    return metrics
  }

  // Collect business metrics
  private async collectBusinessMetrics(): Promise<DashboardMetric[]> {
    const metrics: DashboardMetric[] = []
    
    // Active users
    const activeUsers = await this.getActiveUsers()
    metrics.push({
      id: 'active_users',
      name: 'Active Users',
      value: activeUsers,
      unit: 'users',
      trend: this.calculateTrend('active_users', activeUsers),
      change: this.calculateChange('active_users', activeUsers),
      threshold: { warning: 10, critical: 5 },
      status: this.getStatus(activeUsers, { warning: 10, critical: 5, reverse: true }),
      lastUpdated: new Date()
    })
    
    // Page views per minute
    const pageViewsPerMinute = await this.getPageViewsPerMinute()
    metrics.push({
      id: 'page_views_per_minute',
      name: 'Page Views per Minute',
      value: pageViewsPerMinute,
      unit: 'views',
      trend: this.calculateTrend('page_views_per_minute', pageViewsPerMinute),
      change: this.calculateChange('page_views_per_minute', pageViewsPerMinute),
      threshold: { warning: 5, critical: 2 },
      status: this.getStatus(pageViewsPerMinute, { warning: 5, critical: 2, reverse: true }),
      lastUpdated: new Date()
    })
    
    // Conversion rate
    const conversionRate = await this.getConversionRate()
    metrics.push({
      id: 'conversion_rate',
      name: 'Conversion Rate',
      value: conversionRate,
      unit: '%',
      trend: this.calculateTrend('conversion_rate', conversionRate),
      change: this.calculateChange('conversion_rate', conversionRate),
      threshold: { warning: 2, critical: 1 },
      status: this.getStatus(conversionRate, { warning: 2, critical: 1, reverse: true }),
      lastUpdated: new Date()
    })
    
    return metrics
  }

  // Collect infrastructure metrics
  private async collectInfrastructureMetrics(): Promise<DashboardMetric[]> {
    const metrics: DashboardMetric[] = []
    
    // CPU usage
    const cpuUsage = await this.getCPUUsage()
    metrics.push({
      id: 'cpu_usage',
      name: 'CPU Usage',
      value: cpuUsage,
      unit: '%',
      trend: this.calculateTrend('cpu_usage', cpuUsage),
      change: this.calculateChange('cpu_usage', cpuUsage),
      threshold: { warning: 70, critical: 90 },
      status: this.getStatus(cpuUsage, { warning: 70, critical: 90 }),
      lastUpdated: new Date()
    })
    
    // Memory usage
    const memoryUsage = await this.getMemoryUsage()
    metrics.push({
      id: 'memory_usage',
      name: 'Memory Usage',
      value: memoryUsage,
      unit: '%',
      trend: this.calculateTrend('memory_usage', memoryUsage),
      change: this.calculateChange('memory_usage', memoryUsage),
      threshold: { warning: 80, critical: 95 },
      status: this.getStatus(memoryUsage, { warning: 80, critical: 95 }),
      lastUpdated: new Date()
    })
    
    // Disk usage
    const diskUsage = await this.getDiskUsage()
    metrics.push({
      id: 'disk_usage',
      name: 'Disk Usage',
      value: diskUsage,
      unit: '%',
      trend: this.calculateTrend('disk_usage', diskUsage),
      change: this.calculateChange('disk_usage', diskUsage),
      threshold: { warning: 80, critical: 95 },
      status: this.getStatus(diskUsage, { warning: 80, critical: 95 }),
      lastUpdated: new Date()
    })
    
    return metrics
  }

  // Check system health
  private async checkSystemHealth(): Promise<void> {
    const services = await this.checkAllServices()
    const overallStatus = this.calculateOverallStatus(services)
    
    this.systemHealth = {
      overall: overallStatus,
      services,
      uptime: await this.getSystemUptime(),
      responseTime: await this.getAverageResponseTime(),
      errorRate: await this.getErrorRate(),
      throughput: await this.getThroughput(),
      timestamp: new Date()
    }
    
    this.notifySubscribers('health', this.systemHealth)
  }

  // Check all services
  private async checkAllServices(): Promise<ServiceHealth[]> {
    const services: ServiceHealth[] = []
    
    // Check web server
    services.push(await this.checkWebService())
    
    // Check database
    services.push(await this.checkDatabaseService())
    
    // Check Sanity CMS
    services.push(await this.checkSanityService())
    
    // Check cache
    services.push(await this.checkCacheService())
    
    // Check external APIs
    services.push(await this.checkExternalAPIService())
    
    return services
  }

  // Process alerts
  private processAlerts(): void {
    for (const rule of this.alertRules) {
      if (this.shouldTriggerAlert(rule)) {
        this.createAlert(rule)
      }
    }
    
    // Clean old alerts
    this.cleanOldAlerts()
    
    this.notifySubscribers('alerts', this.getAlerts())
  }

  // Create alert
  private createAlert(rule: AlertRule): void {
    const alert: Alert = {
      id: this.generateId(),
      type: rule.type,
      severity: rule.severity,
      title: rule.title,
      message: rule.message,
      source: rule.source,
      timestamp: new Date(),
      acknowledged: false,
      resolved: false,
      metadata: rule.metadata
    }
    
    this.alerts.push(alert)
    
    // Send notifications
    this.sendAlertNotification(alert)
  }

  // Generate performance report
  private async generatePerformanceReport(): Promise<void> {
    const report: PerformanceReport = {
      period: {
        start: new Date(Date.now() - 3600000), // Last hour
        end: new Date()
      },
      metrics: {
        pageViews: await this.getTotalPageViews(),
        uniqueVisitors: await this.getUniqueVisitors(),
        bounceRate: await this.getBounceRate(),
        avgSessionDuration: await this.getAvgSessionDuration(),
        conversionRate: await this.getConversionRate(),
        topPages: await this.getTopPages(),
        deviceBreakdown: await this.getDeviceBreakdown(),
        geographicBreakdown: await this.getGeographicBreakdown()
      },
      performance: {
        avgLoadTime: await this.getAverageLoadTime(),
        coreWebVitals: {
          lcp: await this.getLCP(),
          fid: await this.getFID(),
          cls: await this.getCLS()
        },
        errorRate: await this.getErrorRate(),
        uptime: await this.getSystemUptime()
      }
    }
    
    this.performanceData.push(report)
    
    // Keep only last 24 hours of reports
    if (this.performanceData.length > 24) {
      this.performanceData = this.performanceData.slice(-24)
    }
    
    this.notifySubscribers('report', report)
  }

  // Utility methods
  private calculateTrend(metricId: string, currentValue: number): 'up' | 'down' | 'stable' {
    const previousValue = this.getPreviousValue(metricId)
    if (!previousValue) return 'stable'
    
    const change = ((currentValue - previousValue) / previousValue) * 100
    if (Math.abs(change) < 5) return 'stable'
    return change > 0 ? 'up' : 'down'
  }

  private calculateChange(metricId: string, currentValue: number): number {
    const previousValue = this.getPreviousValue(metricId)
    if (!previousValue) return 0
    
    return ((currentValue - previousValue) / previousValue) * 100
  }

  private getStatus(value: number, threshold: { warning: number; critical: number }, reverse: boolean = false): 'healthy' | 'warning' | 'critical' {
    if (reverse) {
      if (value >= threshold.warning) return 'healthy'
      if (value >= threshold.critical) return 'warning'
      return 'critical'
    }
    
    if (value <= threshold.warning) return 'healthy'
    if (value <= threshold.critical) return 'warning'
    return 'critical'
  }

  private calculateOverallStatus(services: ServiceHealth[]): 'healthy' | 'warning' | 'critical' {
    const criticalCount = services.filter(s => s.status === 'critical').length
    const warningCount = services.filter(s => s.status === 'warning').length
    
    if (criticalCount > 0) return 'critical'
    if (warningCount > 0) return 'warning'
    return 'healthy'
  }

  private shouldTriggerAlert(rule: AlertRule): boolean {
    const metric = this.metrics.get(rule.metricId)
    if (!metric) return false
    
    switch (rule.condition) {
      case 'greater_than':
        return metric.value as number > rule.threshold
      case 'less_than':
        return metric.value as number < rule.threshold
      case 'equals':
        return metric.value === rule.threshold
      default:
        return false
    }
  }

  private sendAlertNotification(alert: Alert): void {
    // Send to various notification channels
    console.log(`🚨 ALERT: ${alert.title} - ${alert.message}`)
    
    // Send to Slack, email, SMS, etc.
    // Implementation depends on notification preferences
  }

  private cleanOldAlerts(): void {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    this.alerts = this.alerts.filter(alert => alert.timestamp.getTime() > oneWeekAgo)
  }

  private notifySubscribers(type: string, data: any): void {
    for (const [id, callback] of this.subscribers) {
      try {
        callback({ type, data, timestamp: new Date() })
      } catch (error) {
        console.error(`Error notifying subscriber ${id}:`, error)
      }
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Placeholder methods for data collection
  private async getAverageLoadTime(): Promise<number> {
    return 1500 // Implementation would fetch real data
  }

  private async getLCP(): Promise<number> {
    return 2000
  }

  private async getFID(): Promise<number> {
    return 50
  }

  private async getCLS(): Promise<number> {
    return 0.05
  }

  private async getErrorRate(): Promise<number> {
    return 0.5
  }

  private async getActiveUsers(): Promise<number> {
    return 150
  }

  private async getPageViewsPerMinute(): Promise<number> {
    return 25
  }

  private async getConversionRate(): Promise<number> {
    return 3.5
  }

  private async getCPUUsage(): Promise<number> {
    return 45
  }

  private async getMemoryUsage(): Promise<number> {
    return 60
  }

  private async getDiskUsage(): Promise<number> {
    return 70
  }

  private async checkWebService(): Promise<ServiceHealth> {
    return {
      name: 'Web Server',
      status: 'healthy',
      responseTime: 150,
      errorRate: 0.1,
      lastCheck: new Date(),
      uptime: 99.9,
      dependencies: [],
      metrics: {}
    }
  }

  private async checkDatabaseService(): Promise<ServiceHealth> {
    return {
      name: 'Database',
      status: 'healthy',
      responseTime: 25,
      errorRate: 0,
      lastCheck: new Date(),
      uptime: 99.95,
      dependencies: [],
      metrics: {}
    }
  }

  private async checkSanityService(): Promise<ServiceHealth> {
    return {
      name: 'Sanity CMS',
      status: 'healthy',
      responseTime: 200,
      errorRate: 0.2,
      lastCheck: new Date(),
      uptime: 99.8,
      dependencies: [],
      metrics: {}
    }
  }

  private async checkCacheService(): Promise<ServiceHealth> {
    return {
      name: 'Cache',
      status: 'healthy',
      responseTime: 5,
      errorRate: 0,
      lastCheck: new Date(),
      uptime: 99.9,
      dependencies: [],
      metrics: {}
    }
  }

  private async checkExternalAPIService(): Promise<ServiceHealth> {
    return {
      name: 'External APIs',
      status: 'warning',
      responseTime: 500,
      errorRate: 2,
      lastCheck: new Date(),
      uptime: 98.5,
      dependencies: [],
      metrics: {}
    }
  }

  private async getSystemUptime(): Promise<number> {
    return 99.9
  }

  private async getAverageResponseTime(): Promise<number> {
    return 180
  }

  private async getThroughput(): Promise<number> {
    return 1000
  }

  private async getTotalPageViews(): Promise<number> {
    return 50000
  }

  private async getUniqueVisitors(): Promise<number> {
    return 10000
  }

  private async getBounceRate(): Promise<number> {
    return 35
  }

  private async getAvgSessionDuration(): Promise<number> {
    return 180 // seconds
  }

  private async getTopPages(): Promise<any[]> {
    return []
  }

  private async getDeviceBreakdown(): Promise<Record<string, number>> {
    return { desktop: 60, mobile: 35, tablet: 5 }
  }

  private async getGeographicBreakdown(): Promise<Record<string, number>> {
    return { ID: 80, US: 5, SG: 3, MY: 2, Other: 10 }
  }

  private getPreviousValue(metricId: string): number | null {
    // Implementation would fetch previous value from storage
    return null
  }

  private updateMetrics(metrics: DashboardMetric[]): void {
    metrics.forEach(metric => {
      this.metrics.set(metric.id, metric)
    })
  }

  // Public API methods
  public getAllMetrics(): DashboardMetric[] {
    return Array.from(this.metrics.values())
  }

  public getSystemHealth(): SystemHealth | null {
    return this.systemHealth
  }

  public getAlerts(): Alert[] {
    return this.alerts.filter(alert => !alert.resolved)
  }

  public getPerformanceReports(): PerformanceReport[] {
    return this.performanceData
  }

  public acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId)
    if (alert) {
      alert.acknowledged = true
    }
  }

  public resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId)
    if (alert) {
      alert.resolved = true
    }
  }

  public subscribe(id: string, callback: (data: any) => void): void {
    this.subscribers.set(id, callback)
  }

  public unsubscribe(id: string): void {
    this.subscribers.delete(id)
  }

  private setupDefaultAlertRules(): void {
    this.alertRules = [
      {
        id: 'high_error_rate',
        metricId: 'error_rate',
        condition: 'greater_than',
        threshold: 5,
        type: 'error',
        severity: 'critical',
        title: 'High Error Rate',
        message: 'Error rate has exceeded 5%',
        source: 'system',
        metadata: {}
      },
      {
        id: 'slow_page_load',
        metricId: 'page_load_time',
        condition: 'greater_than',
        threshold: 5000,
        type: 'warning',
        severity: 'high',
        title: 'Slow Page Load',
        message: 'Average page load time has exceeded 5 seconds',
        source: 'performance',
        metadata: {}
      },
      {
        id: 'low_active_users',
        metricId: 'active_users',
        condition: 'less_than',
        threshold: 10,
        type: 'warning',
        severity: 'medium',
        title: 'Low Active Users',
        message: 'Active users count has dropped below 10',
        source: 'business',
        metadata: {}
      }
    ]
  }
}

// Alert rule interface
interface AlertRule {
  id: string
  metricId: string
  condition: 'greater_than' | 'less_than' | 'equals'
  threshold: number
  type: 'error' | 'warning' | 'info'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  message: string
  source: string
  metadata: Record<string, any>
}

// Global monitoring dashboard instance
let monitoringDashboard: MonitoringDashboard | null = null

export const getMonitoringDashboard = (): MonitoringDashboard => {
  if (!monitoringDashboard) {
    monitoringDashboard = new MonitoringDashboard()
  }
  return monitoringDashboard
}

// API route handlers
export async function metricsHandler(): Promise<Response> {
  const dashboard = getMonitoringDashboard()
  const metrics = dashboard.getAllMetrics()
  
  return Response.json(metrics)
}

export async function healthHandler(): Promise<Response> {
  const dashboard = getMonitoringDashboard()
  const health = dashboard.getSystemHealth()
  
  return Response.json(health)
}

export async function alertsHandler(): Promise<Response> {
  const dashboard = getMonitoringDashboard()
  const alerts = dashboard.getAlerts()
  
  return Response.json(alerts)
}

export async function reportsHandler(): Promise<Response> {
  const dashboard = getMonitoringDashboard()
  const reports = dashboard.getPerformanceReports()
  
  return Response.json(reports)
}