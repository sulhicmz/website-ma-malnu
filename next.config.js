/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'date-fns', 'framer-motion'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Compression & performance
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
// Enhanced security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "font-src 'self' https://fonts.gstatic.com;",
              "img-src 'self' data: https://cdn.sanity.io https://www.googletagmanager.com;",
              "connect-src 'self' https://api.sanity.io https://www.googletagmanager.com;",
              "frame-src 'self' https://www.googletagmanager.com;",
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
              "frame-ancestors 'none';",
              "upgrade-insecure-requests;"
            ].join(' ')
          }
        ],
      },
      // Specific headers for API routes
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          }
        ],
      }
    ]
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
// Enhanced webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // Optimize chunks for production
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: -15,
            chunks: 'all',
            enforce: true,
          },
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: 'ui',
            priority: 0,
            chunks: 'all',
          },
          lib: {
            test: /[\\/]lib[\\/]/,
            name: 'lib',
            priority: 0,
            chunks: 'all',
          },
        },
      }
    }
    
    // Add aliases for cleaner imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@app': path.resolve(__dirname, 'src/app'),
    }
    
    // Optimize for production
    if (!dev && !isServer) {
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
    }
    
    return config
  },
}

module.exports = nextConfig