/**
 * Sentry Server Configuration
 * Server-side error tracking for Next.js API routes
 */

import * as Sentry from '@sentry/nextjs'

export const initServerSentry = () => {
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
      
      // Server-side integrations
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app: null })
      ],
      
      // Server-specific configuration
      beforeSend(event, hint) {
        // Filter out certain server errors
        if (event.exception) {
          const error = hint.originalException as Error
          
          // Ignore timeout errors
          if (error.message?.includes('timeout')) {
            return null
          }
          
          // Ignore rate limiting errors
          if (error.message?.includes('rate limit')) {
            return null
          }
        }
        
        return event
      },
      
      // Add server context
      initialScope: {
        tags: {
          component: 'server',
          runtime: 'node'
        }
      }
    })
  }
}

// API route error wrapper
export const withErrorTracking = (handler: Function) => {
  return async (req: any, res: any) => {
    try {
      return await handler(req, res)
    } catch (error) {
      // Log to Sentry
      Sentry.captureException(error)
      
      // Log additional context
      Sentry.setContext('api_request', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body
      })
      
      // Return error response
      return res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      })
    }
  }
}

// Database error tracking
export const trackDatabaseError = (error: Error, query: string, params?: any[]) => {
  Sentry.withScope((scope) => {
    scope.setTag('database_error', true)
    scope.setContext('database_query', {
      query: query.substring(0, 200), // Limit query length
      params_count: params?.length || 0,
      error_type: error.constructor.name
    })
    Sentry.captureException(error)
  })
}

// External API error tracking
export const trackExternalAPIError = (error: Error, api: string, endpoint: string) => {
  Sentry.withScope((scope) => {
    scope.setTag('external_api_error', true)
    scope.setContext('external_api', {
      api,
      endpoint,
      error_type: error.constructor.name,
      status_code: (error as any).status
    })
    Sentry.captureException(error)
  })
}