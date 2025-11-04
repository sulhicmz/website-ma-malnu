import { NextResponse } from 'next/server'

// Critical CSS for above-the-fold content
const CRITICAL_CSS = `
/* Critical CSS for MA Malnu Website */
/* Reset and base styles */
*{box-sizing:border-box;margin:0;padding:0}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#1f2937;background-color:#ffffff}

/* Typography */
h1,h2,h3,h4,h5,h6{font-weight:600;line-height:1.25;margin-bottom:0.5rem}h1{font-size:2.25rem}h2{font-size:1.875rem}h3{font-size:1.5rem}p{margin-bottom:1rem}

/* Layout */
.container{width:100%;max-width:1200px;margin:0 auto;padding:0 1rem}.flex{display:flex}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}

/* Navigation */
.navbar{position:sticky;top:0;z-index:50;background-color:#ffffff;border-bottom:1px solid #e5e7eb;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1)}.navbar-container{display:flex;align-items:center;justify-content:space-between;padding:1rem}.logo{font-size:1.5rem;font-weight:700;color:#1e40af;text-decoration:none}.nav-menu{display:flex;list-style:none;gap:2rem}.nav-link{color:#4b5563;text-decoration:none;font-weight:500;transition:color 0.2s}.nav-link:hover{color:#1e40af}.mobile-menu-button{display:none;background:none;border:none;padding:0.5rem;cursor:pointer}

/* Hero Section */
.hero{background:linear-gradient(135deg,#1e40af 0%,#3b82f6 100%);color:white;padding:4rem 0;text-align:center}.hero-title{font-size:3rem;font-weight:700;margin-bottom:1rem}.hero-subtitle{font-size:1.25rem;margin-bottom:2rem;opacity:0.9}.btn{display:inline-block;padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:500;text-decoration:none;transition:all 0.2s;cursor:pointer;border:none}.btn-primary{background-color:#ffffff;color:#1e40af}.btn-primary:hover{background-color:#f3f4f6;transform:translateY(-1px)}.btn-secondary{background-color:transparent;color:white;border:2px solid white}.btn-secondary:hover{background-color:white;color:#1e40af}

/* Loading States */
.skeleton{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:loading 1.5s infinite}@keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}.skeleton-text{height:1rem;margin-bottom:0.5rem;border-radius:0.25rem}.skeleton-title{height:2rem;width:60%;margin-bottom:1rem;border-radius:0.25rem}.skeleton-card{height:200px;border-radius:0.5rem}

/* Responsive */
@media (max-width:768px){.mobile-menu-button{display:block}.nav-menu{display:none;position:absolute;top:100%;left:0;right:0;background-color:white;border-bottom:1px solid #e5e7eb;flex-direction:column;padding:1rem}.nav-menu.active{display:flex}.hero-title{font-size:2rem}.hero-subtitle{font-size:1rem}.hero{padding:2rem 0}}@media (max-width:640px){.container{padding:0 0.5rem}.hero-title{font-size:1.75rem}.btn{padding:0.5rem 1rem;font-size:0.875rem}}

/* Accessibility */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.focus\\:not-sr-only:focus{position:static;width:auto;height:auto;padding:initial;margin:initial;overflow:visible;clip:auto;white-space:normal}
`

// Function to extract critical CSS from a CSS string
export function extractCriticalCSS(css: string, selectors: string[]): string {
  const lines = css.split('\n')
  const criticalLines: string[] = []
  let inCriticalRule = false
  let braceCount = 0

  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // Check if line contains any of our critical selectors
    const hasCriticalSelector = selectors.some(selector => 
      trimmedLine.includes(selector) || 
      trimmedLine.startsWith(selector) ||
      trimmedLine.includes(`.${selector}`) ||
      trimmedLine.includes(`#${selector}`)
    )

    if (hasCriticalSelector || inCriticalRule) {
      criticalLines.push(line)
      
      // Track braces to know when we're inside a rule
      const openBraces = (trimmedLine.match(/{/g) || []).length
      const closeBraces = (trimmedLine.match(/}/g) || []).length
      braceCount += openBraces - closeBraces
      
      inCriticalRule = braceCount > 0
    }
  }

  return criticalLines.join('\n')
}

// Function to inline critical CSS in HTML
export function inlineCriticalCSS(html: string, criticalCSS: string): string {
  const styleTag = `<style data-emotion="critical">${criticalCSS}</style>`
  
  // Insert after opening head tag
  return html.replace('<head>', `<head>${styleTag}`)
}

// Function to create preload link for non-critical CSS
export function createCSSPreload(href: string): string {
  return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">`
}

// Function to create noscript fallback for CSS
export function createCSSNoscript(href: string): string {
  return `<noscript><link rel="stylesheet" href="${href}"></noscript>`
}

// Critical selectors for above-the-fold content
const CRITICAL_SELECTORS = [
  'html',
  'body',
  '.container',
  '.navbar',
  '.hero',
  '.btn',
  '.skeleton',
  '.sr-only',
  '.focus\\:not-sr-only',
  'h1', 'h2', 'h3',
  'p',
  'a',
  '.flex',
  '.items-center',
  '.justify-center',
  '.logo',
  '.nav-menu',
  '.nav-link',
  '.hero-title',
  '.hero-subtitle',
  '.btn-primary',
  '.btn-secondary',
  '.mobile-menu-button'
]

// Get critical CSS for production
export function getCriticalCSS(): string {
  return CRITICAL_CSS
}

// Middleware to inject critical CSS
export function withCriticalCSS(Component: React.ComponentType<any>) {
  return function WithCriticalCSS(props: any) {
    if (typeof window !== 'undefined') {
      return <Component {...props} />
    }

    // Server-side: critical CSS will be handled by Next.js
    return <Component {...props} />
  }
}

// Next.js middleware for critical CSS injection
export async function middleware(request: Request) {
  const response = NextResponse.next()
  
  // Add critical CSS to HTML responses
  if (request.headers.get('accept')?.includes('text/html')) {
    // This would be handled by custom server or build-time optimization
    // For now, we'll use the getCriticalCSS function in our pages
  }
  
  return response
}