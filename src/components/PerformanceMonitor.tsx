'use client'

import React, { useState, useEffect } from 'react'
import { getWebVitalsScores, calculatePerformanceScore, getPerformanceRecommendations } from '@/lib/webVitals'

interface PerformanceMetrics {
  CLS: { value: number; rating: string }
  FID: { value: number; rating: string }
  FCP: { value: number; rating: string }
  LCP: { value: number; rating: string }
  TTFB: { value: number; rating: string }
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [score, setScore] = useState<number>(0)
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    const loadMetrics = async () => {
      try {
        const vitals = await getWebVitalsScores()
        if (vitals) {
          setMetrics(vitals)
          setScore(calculatePerformanceScore(vitals))
          setRecommendations(getPerformanceRecommendations(vitals))
        }
      } catch (error) {
        console.error('Failed to load performance metrics:', error)
      }
    }

    // Load metrics after page load
    if (document.readyState === 'complete') {
      loadMetrics()
    } else {
      window.addEventListener('load', loadMetrics)
      return () => window.removeEventListener('load', loadMetrics)
    }
  }, [])

  // Don't render in production
  if (process.env.NODE_ENV === 'production') return null

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600'
      case 'needs-improvement': return 'text-yellow-600'
      case 'poor': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatMetricValue = (name: string, value: number) => {
    switch (name) {
      case 'CLS': return value.toFixed(3)
      case 'FID':
      case 'FCP':
      case 'LCP':
      case 'TTFB':
        return `${Math.round(value)}ms`
      default: return value.toString()
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Toggle performance monitor"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        {score > 0 && (
          <span className={`absolute -top-2 -right-2 text-xs font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
        )}
      </button>

      {/* Performance Dashboard */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-50 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Performance Monitor</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Close performance monitor"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {score > 0 && (
              <div className="mt-2">
                <div className="text-3xl font-bold">{score}</div>
                <div className="text-sm opacity-90">Overall Performance Score</div>
              </div>
            )}
          </div>

          {/* Metrics */}
          {metrics && (
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Core Web Vitals</h4>
                <div className="space-y-3">
                  {Object.entries(metrics).map(([name, metric]) => (
                    <div key={name} className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{name}</div>
                        <div className="text-xs text-gray-500">
                          {name === 'CLS' && 'Cumulative Layout Shift'}
                          {name === 'FID' && 'First Input Delay'}
                          {name === 'FCP' && 'First Contentful Paint'}
                          {name === 'LCP' && 'Largest Contentful Paint'}
                          {name === 'TTFB' && 'Time to First Byte'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${getRatingColor(metric.rating)}`}>
                          {formatMetricValue(name, metric.value)}
                        </div>
                        <div className={`text-xs ${getRatingColor(metric.rating)}`}>
                          {metric.rating.replace('-', ' ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <svg className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Refresh Button */}
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Refresh Metrics
              </button>
            </div>
          )}

          {/* Loading State */}
          {!metrics && (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Loading performance metrics...</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}