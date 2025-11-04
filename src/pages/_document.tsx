import { Html, Head, Main, NextScript } from 'next/document'
import { getCriticalCSS, createCSSPreload, createCSSNoscript } from '@/lib/criticalCSS'

export default function Document() {
  const criticalCSS = getCriticalCSS()
  
  return (
    <Html lang="id">
      <Head>
        {/* Inline critical CSS */}
        <style 
          data-emotion="critical" 
          dangerouslySetInnerHTML={{ __html: criticalCSS }} 
        />
        
        {/* Preload non-critical CSS */}
        {createCSSPreload('/_next/static/css/app/layout.css')}
        
        {/* Noscript fallback */}
        {createCSSNoscript('/_next/static/css/app/layout.css')}
        
        {/* DNS prefetch and preconnect */}
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Font preloading */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          as="style" 
          onLoad="this.onload=null;this.rel='stylesheet'" 
        />
        <noscript>
          <link 
            rel="stylesheet" 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          />
        </noscript>
        
        {/* Viewport and theme */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        
        {/* PWA meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MA Malnu" />
        <meta name="application-name" content="MA Malnu" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </Head>
      <body>
        {/* Skip navigation for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}