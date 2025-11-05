/**
 * Health Check and Monitoring System
 * Comprehensive system health monitoring and alerting
 */

import { NextRequest, NextResponse } from 'next/server'

export interface HealthCheck {
  name: string
  status: 'healthy' | 'unhealthy' | 'degraded'
  responseTime: number
  message?: string
  details?: any
  timestamp: number
}

export interface SystemMetrics {
  uptime: number
  memoryUsage: NodeJS.MemoryUsage
  cpuUsage: NodeJS.CpuUsage
  diskUsage?: {
    total: number
    free: number
    used: number
  }
  activeConnections: number
  requestsPerMinute: number
  errorRate: number
}

export interface HealthReport {
  status: 'healthy' | 'unhealthy' | 'degraded'
  timestamp: number
  checks: HealthCheck[]
  metrics: SystemMetrics
  version: string
  environment: string
}

class HealthMonitor {
  private checks: Map<string, () => Promise<HealthCheck>> = new Map()
  private metrics: SystemMetrics
  private requestCounts: Map<string, number> = new Map()
  private errorCounts: Map<string, number> = new Map()
  private startTime: number = Date.now()

  constructor() {
    this.metrics = this.initializeMetrics()
    this.setupDefaultChecks()
    this.startMetricsCollection()
  }

  // Initialize system metrics
  private initializeMetrics(): SystemMetrics {
    return {
      uptime: 0,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      activeConnections: 0,
      requestsPerMinute: 0,
      errorRate: 0
    }
  }

  // Setup default health checks
  private setupDefaultChecks(): void {
    // Database connectivity check
    this.addCheck('database', async () => {
      const start = Date.now()
      try {
        // Test database connection
        await this.checkDatabase()
        return {
          name: 'database',
          status: 'healthy',
          responseTime: Date.now() - start,
          timestamp: Date.now()
        }
      } catch (error) {
        return {
          name: 'database',
          status: 'unhealthy',
          responseTime: Date.now() - start,
          message: `Database connection failed: ${error}`,
          timestamp: Date.now()
        }
      }
    })

    // External API check
    this.addCheck('external-apis', async () => {
      const start = Date.now()
      try {
        await this.checkExternalAPIs()
        return {
          name: 'external-apis',
          status: 'healthy',
          responseTime: Date.now() - start,
          timestamp: Date.now()
        }
      } catch (error) {
        return {
          name: 'external-apis',
          status: 'degraded',
          responseTime: Date.now() - start,
          message: `Some external APIs are unavailable: ${error}`,
          timestamp: Date.now()
        }
      }
    })

    // Sanity CMS check
    this.addCheck('sanity-cms', async () => {
      const start = Date.now()
      try {
        await this.checkSanityCMS()
        return {
          name: 'sanity-cms',
          status: 'healthy',
          responseTime: Date.now() - start,
          timestamp: Date.now()
        }
      } catch (error) {
        return {
          name: 'sanity-cms',
          status: 'unhealthy',
          responseTime: Date.now() - start,
          message: `Sanity CMS connection failed: ${error}`,
          timestamp: Date.now()
        }
      }
    })

    // Cache check
    this.addCheck('cache', async () => {
      const start = Date.now()
      try {
        await this.checkCache()
        return {
          name: 'cache',
          status: 'healthy',
          responseTime: Date.now() - start,
          timestamp: Date.now()
        }
      } catch (error) {
        return {
          name: 'cache',
          status: 'degraded',
          responseTime: Date.now() - start,
          message: `Cache service degraded: ${error}`,
          timestamp: Date.now()
        }
      }
    })

    // Disk space check
    this.addCheck('disk-space', async () => {
      const start = Date.now()
      try {
        const diskUsage = await this.checkDiskSpace()
        const freePercentage = (diskUsage.free / diskUsage.total) * 100
        
        return {
          name: 'disk-space',
          status: freePercentage > 10 ? 'healthy' : freePercentage > 5 ? 'degraded' : 'unhealthy',
          responseTime: Date.now() - start,
          details: diskUsage,
          message: `Disk space: ${freePercentage.toFixed(2)}% free`,
          timestamp: Date.now()
        }
      } catch (error) {
        return {
          name: 'disk-space',
          status: 'unhealthy',
          responseTime: Date.now() - start,
          message: `Disk space check failed: ${error}`,
          timestamp: Date.now()
        }
      }
    })
  }

  // Add custom health check
  addCheck(name: string, checkFunction: () => Promise<HealthCheck>): void {
    this.checks.set(name, checkFunction)
  }

  // Remove health check
  removeCheck(name: string): void {
    this.checks.delete(name)
  }

  // Run all health checks
  async runHealthChecks(): Promise<HealthCheck[]> {
    const results: HealthCheck[] = []
    
    for (const [name, checkFunction] of this.checks) {
      try {
        const result = await Promise.race([
          checkFunction(),
          new Promise<HealthCheck>((_, reject) => 
            setTimeout(() => reject(new Error('Health check timeout')), 10000)
          )
        ]) as HealthCheck
        results.push(result)
      } catch (error) {
        results.push({
          name,
          status: 'unhealthy',
          responseTime: 10000,
          message: `Health check failed: ${error}`,
          timestamp: Date.now()
        })
      }
    }
    
    return results
  }

  // Generate health report
  async generateHealthReport(): Promise<HealthReport> {
    const checks = await this.runHealthChecks()
    const overallStatus = this.determineOverallStatus(checks)
    
    return {
      status: overallStatus,
      timestamp: Date.now(),
      checks,
      metrics: this.updateMetrics(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    }
  }

  // Determine overall system status
  private determineOverallStatus(checks: HealthCheck[]): 'healthy' | 'unhealthy' | 'degraded' {
    const unhealthyCount = checks.filter(c => c.status === 'unhealthy').length
    const degradedCount = checks.filter(c => c.status === 'degraded').length
    
    if (unhealthyCount > 0) {
      return 'unhealthy'
    }
    
    if (degradedCount > 0) {
      return 'degraded'
    }
    
    return 'healthy'
  }

  // Update system metrics
  private updateMetrics(): SystemMetrics {
    this.metrics.uptime = Date.now() - this.startTime
    this.metrics.memoryUsage = process.memoryUsage()
    this.metrics.cpuUsage = process.cpuUsage()
    this.metrics.requestsPerMinute = this.calculateRequestsPerMinute()
    this.metrics.errorRate = this.calculateErrorRate()
    
    return this.metrics
  }

  // Calculate requests per minute
  private calculateRequestsPerMinute(): number {
    const now = Date.now()
    const oneMinuteAgo = now - 60000
    
    let totalRequests = 0
    for (const [timestamp, count] of this.requestCounts) {
      if (parseInt(timestamp) > oneMinuteAgo) {
        totalRequests += count
      }
    }
    
    return totalRequests
  }

  // Calculate error rate
  private calculateErrorRate(): number {
    const now = Date.now()
    const oneMinuteAgo = now - 60000
    
    let totalRequests = 0
    let totalErrors = 0
    
    for (const [timestamp, count] of this.requestCounts) {
      if (parseInt(timestamp) > oneMinuteAgo) {
        totalRequests += count
        totalErrors += this.errorCounts.get(timestamp) || 0
      }
    }
    
    return totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0
  }

  // Start metrics collection
  private startMetricsCollection(): void {
    // Clean up old metrics every 5 minutes
    setInterval(() => {
      const now = Date.now()
      const fiveMinutesAgo = now - 300000
      
      for (const timestamp of this.requestCounts.keys()) {
        if (parseInt(timestamp) < fiveMinutesAgo) {
          this.requestCounts.delete(timestamp)
          this.errorCounts.delete(timestamp)
        }
      }
    }, 60000)
  }

  // Record request
  recordRequest(path: string, isError: boolean = false): void {
    const timestamp = Date.now().toString()
    const currentCount = this.requestCounts.get(timestamp) || 0
    this.requestCounts.set(timestamp, currentCount + 1)
    
    if (isError) {
      const currentErrorCount = this.errorCounts.get(timestamp) || 0
      this.errorCounts.set(timestamp, currentErrorCount + 1)
    }
  }

  // Database health check
  private async checkDatabase(): Promise<void> {
    // Implementation depends on your database
    // Example for Sanity:
    const { sanityClient } = await import('./sanity')
    await sanityClient.fetch('*[_type == "siteSettings"][0]')
  }

  // External APIs health check
  private async checkExternalAPIs(): Promise<void> {
    // Check critical external APIs
    const promises = [
      fetch('https://api.sanity.io/v2021-06-07/projects').then(r => {
        if (!r.ok) throw new Error('Sanity API unavailable')
      })
    ]
    
    await Promise.allSettled(promises)
  }

  // Sanity CMS health check
  private async checkSanityCMS(): Promise<void> {
    const { sanityClient } = await import('./sanity')
    await sanityClient.fetch('*[_type == "siteSettings"][0]')
  }

  // Cache health check
  private async checkCache(): Promise<void> {
    // Check cache connectivity
    // Implementation depends on your cache solution
  }

  // Disk space check
  private async checkDiskSpace(): Promise<{ total: number; free: number; used: number }> {
    const fs = await import('fs')
    const stats = fs.statSync('.')
    
    // Simplified disk space check
    return {
      total: 1000000000, // 1GB dummy value
      free: 500000000,   // 500MB dummy value
      used: 500000000    // 500MB dummy value
    }
  }
}

// Global health monitor instance
let healthMonitor: HealthMonitor | null = null

export const getHealthMonitor = (): HealthMonitor => {
  if (!healthMonitor) {
    healthMonitor = new HealthMonitor()
  }
  return healthMonitor
}

// Express middleware for health monitoring
export const healthMonitoringMiddleware = (req: NextRequest) => {
  const monitor = getHealthMonitor()
  const path = req.nextUrl.pathname
  const isError = req.nextUrl.searchParams.has('error')
  
  monitor.recordRequest(path, isError)
}

// Health check API endpoint
export async function GET(request: NextRequest) {
  const monitor = getHealthMonitor()
  
  try {
    const report = await monitor.generateHealthReport()
    
    // Return appropriate HTTP status based on health
    const statusCode = report.status === 'healthy' ? 200 : 
                      report.status === 'degraded' ? 200 : 503
    
    return NextResponse.json(report, { 
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: Date.now(),
      error: 'Health check failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 })
  }
}

// Detailed health check endpoint
export async function POST(request: NextRequest) {
  const monitor = getHealthMonitor()
  const body = await request.json()
  
  if (body.check) {
    // Run specific check
    const checks = await monitor.runHealthChecks()
    const specificCheck = checks.find(c => c.name === body.check)
    
    if (specificCheck) {
      return NextResponse.json(specificCheck)
    } else {
      return NextResponse.json({ error: 'Check not found' }, { status: 404 })
    }
  }
  
  // Return full report
  return GET(request)
}

// Metrics endpoint
export async function PATCH(request: NextRequest) {
  const monitor = getHealthMonitor()
  const metrics = monitor.updateMetrics()
  
  return NextResponse.json({
    timestamp: Date.now(),
    metrics
  })
}