// src/app/layout.tsx
import React, { useEffect } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import GoogleTagManager from '@/components/GoogleTagManager'
import { ErrorBoundary } from '@/components/ui/LoadingStates'
import { register } from '@/lib/serviceWorker'
import PerformanceMonitor from '@/components/PerformanceMonitor'

// Optimized font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Critical untuk performa
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
})

export const metadata = {
  title: 'MA Malnu Kananga',
  description: 'Website resmi Madrasah Aliyah Malnu Kananga',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Register service worker only in production
    if (process.env.NODE_ENV === 'production') {
      register()
    }
  }, [])

  return (
    <html lang="id" className={inter.variable}>
<head>
        <GoogleTagManager />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MA Malnu" />
        <meta name="application-name" content="MA Malnu" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* DNS prefetch untuk external resources */}
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {/* Skip navigation link untuk accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
<ErrorBoundary>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <PerformanceMonitor />
        </ErrorBoundary>
      </body>
    </html>
  )
}