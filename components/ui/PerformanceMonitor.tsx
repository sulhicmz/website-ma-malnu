'use client'

import { useState, useEffect } from 'react'

interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void
}

export default function PerformanceMonitor({ onMetricsUpdate }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (process.env.NODE_ENV !== 'development' && !isVisible) return

    const updateMetrics = {
      pageLoadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      firstInputDelay: 0
    }

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming
            updateMetrics.pageLoadTime = navEntry.loadEventEnd - navEntry.loadEventStart
            break
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              updateMetrics.firstContentfulPaint = entry.startTime
            }
            break
          case 'largest-contentful-paint':
            updateMetrics.largestContentfulPaint = entry.startTime
            break
          case 'layout-shift':
            const layoutShiftEntry = entry as any
            if (!layoutShiftEntry.hadRecentInput) {
              updateMetrics.cumulativeLayoutShift += layoutShiftEntry.value
            }
            break
          case 'first-input':
            const firstInputEntry = entry as any
            updateMetrics.firstInputDelay = firstInputEntry.processingStart - firstInputEntry.startTime
            break
        }
      })
      
      setMetrics(prev => ({ ...prev, ...updateMetrics }))
      onMetricsUpdate?.({ ...metrics, ...updateMetrics })
    })

    try {
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] })
    } catch (error) {
      console.warn('Performance monitoring not fully supported:', error)
    }

    return () => observer.disconnect()
  }, [isVisible, onMetricsUpdate])

  const getPerformanceGrade = (metric: keyof PerformanceMetrics, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds = {
      pageLoadTime: { good: 2000, needsImprovement: 3000 },
      firstContentfulPaint: { good: 1800, needsImprovement: 3000 },
      largestContentfulPaint: { good: 2500, needsImprovement: 4000 },
      cumulativeLayoutShift: { good: 0.1, needsImprovement: 0.25 },
      firstInputDelay: { good: 100, needsImprovement: 300 }
    }
    
    const threshold = thresholds[metric]
    if (value <= threshold.good) return 'good'
    if (value <= threshold.needsImprovement) return 'needs-improvement'
    return 'poor'
  }

  const getGradeColor = (grade: 'good' | 'needs-improvement' | 'poor') => {
    switch (grade) {
      case 'good': return 'text-green-600 bg-green-100'
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-100'
      case 'poor': return 'text-red-600 bg-red-100'
    }
  }

  const formatValue = (metric: keyof PerformanceMetrics, value: number): string => {
    switch (metric) {
      case 'cumulativeLayoutShift':
        return value.toFixed(3)
      case 'pageLoadTime':
      case 'firstContentfulPaint':
      case 'largestContentfulPaint':
      case 'firstInputDelay':
        return `${Math.round(value)}ms`
      default:
        return value.toString()
    }
  }

  // Toggle visibility with Ctrl+Shift+P
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900">Performance Metrics</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close performance monitor"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-2">
        {Object.entries(metrics).map(([key, value]) => {
          const grade = getPerformanceGrade(key as keyof PerformanceMetrics, value)
          const colorClass = getGradeColor(grade)
          
          return (
            <div key={key} className="flex items-center justify-between">
              <span className="text-xs text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-medium px-2 py-1 rounded ${colorClass}`}>
                  {formatValue(key as keyof PerformanceMetrics, value)}
                </span>
                <span className={`text-xs w-2 h-2 rounded-full ${
                  grade === 'good' ? 'bg-green-500' :
                  grade === 'needs-improvement' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></span>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Press Ctrl+Shift+P to toggle
        </p>
      </div>
    </div>
  )
}

// Hook for using performance metrics in components
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0
  })

  return { metrics, setMetrics }
}