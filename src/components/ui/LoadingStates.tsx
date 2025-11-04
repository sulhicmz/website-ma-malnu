import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`} 
         role="status" 
         aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingCardProps {
  type?: 'berita' | 'guru' | 'gallery'
}

export function LoadingCard({ type = 'berita' }: LoadingCardProps) {
  if (type === 'berita') {
    return (
      <div className="max-w-sm rounded-lg shadow-md overflow-hidden bg-white animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-6">
          <div className="flex items-center mb-3">
            <div className="h-4 bg-gray-200 rounded-full w-20"></div>
            <div className="h-3 bg-gray-200 rounded ml-3 w-16"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (type === 'guru') {
    return (
      <div className="max-w-xs rounded-lg shadow-md overflow-hidden bg-white animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-5 text-center">
          <div className="h-6 bg-gray-200 rounded mb-1 mx-auto w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-3 mx-auto w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg shadow-md animate-pulse">
      <div className="h-48 bg-gray-200"></div>
    </div>
  )
}

interface LoadingPageProps {
  message?: string
}

export function LoadingPage({ message = 'Memuat konten...' }: LoadingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-6">
              Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}