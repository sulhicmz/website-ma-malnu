/**
 * Sentry Configuration
 * Error tracking and performance monitoring
 */

import * as Sentry from '@sentry/nextjs'
import { CaptureConsole } from '@sentry/integrations'

// Sentry DSN should be in environment variables
const SENTRY_DSN = process.env.SENTRY_DSN
const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN
const NODE_ENV = process.env.NODE_ENV

// Initialize Sentry for client-side
export const initSentry = () => {
  if (NODE_ENV === 'production' && SENTRY_DSN) {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: NODE_ENV,
      tracesSampleRate: NODE_ENV === 'production' ? 0.1 : 1.0,
      
      // Performance monitoring
      integrations: [
        new CaptureConsole({
          levels: ['error']
        }),
        new Sentry.BrowserTracing({
          // Custom tracing configuration
          tracingOrigins: [
            'localhost',
            'https://ma-malnu-kananga.vercel.app',
            'https://your-domain.com'
          ]
        })
      ],
      
      // Error filtering
      beforeSend(event, hint) {
        // Filter out certain errors
        if (event.exception) {
          const error = hint.originalException as Error
          
          // Ignore network errors that are not critical
          if (error.message?.includes('Network request failed')) {
            return null
          }
          
          // Ignore Chrome extension errors
          if (error.message?.includes('Non-Error promise rejection')) {
            return null
          }
        }
        
        return event
      },
      
      // Release tracking
      release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      
      // User context
      initialScope: {
        tags: {
          component: 'frontend',
          framework: 'nextjs'
        }
      },
      
      // Custom tags and context
      beforeSendTransaction(event) {
        // Filter out certain transactions
        if (event.transaction?.includes('/api/health')) {
          return null
        }
        return event
      }
    })
  }
}

// Custom error reporting functions
export const reportError = (error: Error, context?: Record<string, any>) => {
  if (NODE_ENV === 'production' && SENTRY_DSN) {
    Sentry.withScope((scope) => {
      if (context) {
        Object.keys(context).forEach(key => {
          scope.setContext(key, context[key])
        })
      }
      scope.setTag('custom_error', true)
      Sentry.captureException(error)
    })
  } else {
    console.error('Error reported:', error, context)
  }
}

export const reportMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  if (NODE_ENV === 'production' && SENTRY_DSN) {
    Sentry.captureMessage(message, level)
  } else {
    console.log(`[${level.toUpperCase()}] ${message}`)
  }
}

export const setUserContext = (user: { id: string; email?: string; name?: string }) => {
  if (NODE_ENV === 'production' && SENTRY_DSN) {
    Sentry.setUser(user)
  }
}

export const clearUserContext = () => {
  if (NODE_ENV === 'production' && SENTRY_DSN) {
    Sentry.setUser(null)
  }
}

export const addBreadcrumb = (breadcrumb: Sentry.Breadcrumb) => {
  if (NODE_ENV === 'production' && SENTRY_DSN) {
    Sentry.addBreadcrumb(breadcrumb)
  }
}

// Performance monitoring
export const startTransaction = (name: string, op: string = 'navigation') => {
  if (NODE_ENV === 'production' && SENTRY_DSN) {
    return Sentry.startTransaction({
      name,
      op
    })
  }
  return null
}

export const setTag = (key: string, value: string) => {
  if (NODE_ENV === 'production' && SENTRY_DSN) {
    Sentry.setTag(key, value)
  }
}

export const setContext = (key: string, context: Record<string, any>) => {
  if (NODE_ENV === 'production' && SENTRY_DSN) {
    Sentry.setContext(key, context)
  }
}