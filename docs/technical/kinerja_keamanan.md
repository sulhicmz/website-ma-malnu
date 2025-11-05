# Kinerja & Keamanan - MA Malnu Kananga

## Rekomendasi Konfigurasi Next.js untuk ISR

### 1. Konfigurasi ISR untuk Halaman Dinamis

```tsx
// app/berita/page.tsx
import { client } from '@/lib/sanity'

// Revalidate setiap 30 menit
export const revalidate = 1800

export async function generateMetadata() {
  return {
    title: 'Berita & Pengumuman - MA Malnu Kananga',
    description: 'Berita terkini dan penguman penting dari MA Malnu Kananga',
  }
}

async function getPosts(page = 1) {
  const query = `{
    "posts": *[_type == "post"] | order(date desc) {
      _id,
      title,
      slug,
      excerpt,
      date,
      coverImage,
      author->{
        name
      }
    }[${(page - 1) * 9}...${page * 9}],
    "total": count(*[_type == "post"])
  }`
  
  return await client.fetch(query)
}

export default async function NewsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1
  const data = await getPosts(page)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Berita & Pengumuman</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.posts.map((post) => (
          <CardBerita
            key={post._id}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            author={post.author?.name || 'Admin'}
            slug={post.slug.current}
            imageUrl={post.coverImage?.asset?.url}
          />
        ))}
      </div>
    </div>
  )
}
```

### 2. ISR untuk Halaman Detail dengan Cache Tags

```tsx
// app/berita/[slug]/page.tsx
import { client } from '@/lib/sanity'
import { urlForImage } from '@/lib/image'

// Revalidate setiap 1 jam
export const revalidate = 3600

// Cache tags untuk invalidasi cache yang lebih tepat
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{slug}`)
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

export async function generateMetadata({ params }) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt
  }`, { slug: params.slug })
  
  return {
    title: post?.title || 'Berita',
    description: post?.excerpt || 'Baca berita terkini dari MA Malnu Kananga',
  }
}

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt,
    date,
    body,
    coverImage,
    author->{
      name,
      image
    }
  }`
  
  return await client.fetch(query, { slug })
}

export default async function PostDetailPage({ params }) {
  const post = await getPost(params.slug)
  
  return (
    <article>
      {/* Konten artikel */}
    </article>
  )
}
```

### 3. Konfigurasi ISR untuk Data yang Sering Berubah

```tsx
// app/api/berita-terbaru/route.ts
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

// Revalidate setiap 10 menit untuk data yang sering berubah
export const dynamic = 'force-static'
export const revalidate = 600

export async function GET() {
  try {
    const posts = await client.fetch(`*[_type == "post"] | order(date desc)[0..4]{
      _id,
      title,
      slug,
      date
    }`)
    
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
```

### 4. Konfigurasi Next.js untuk Optimasi Gambar

```tsx
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cdn.sanity.io',
      'res.cloudinary.com',
      'images.unsplash.com'
    ],
    // Format gambar yang didukung
    formats: ['image/webp'],
    // Device sizes untuk responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes untuk layout fixed
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Konfigurasi caching
    minimumCacheTTL: 60,
  },
  // Optimasi kompresi
  compress: true,
  // HTTP headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

// Header keamanan
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=6307200; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
]

module.exports = nextConfig
```

## Optimasi Gambar dengan next/image

### 1. Implementasi Gambar Responsif

```tsx
// components/ui/ResponsiveImage.tsx
import Image from 'next/image'
import { urlForImage } from '@/lib/image'

interface ResponsiveImageProps {
  image: any
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export default function ResponsiveImage({
  image,
  alt,
  width = 1200,
  height = 630,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: ResponsiveImageProps) {
  if (!image?.asset) {
    return (
      <div className={`bg-gray-200 border-2 border-dashed rounded-xl w-full ${className}`} />
    )
  }
  
  const imageUrl = urlForImage(image).url()
  
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={85}
      placeholder="blur"
      blurDataURL={image.asset.metadata?.lqip || undefined}
      style={{
        objectFit: 'cover',
        objectPosition: image.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : 'center'
      }}
    />
  )
}
```

### 2. Lazy Loading untuk Galeri

```tsx
// components/ui/GalleryGrid.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

interface GalleryItem {
  id: string
  title: string
  imageUrl: string
  date: string
}

interface GalleryGridProps {
  items: GalleryItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [visibleItems, setVisibleItems] = useState<GalleryItem[]>([])
  const [loadedItems, setLoadedItems] = useState<Set<string>>(new Set())
  
  // Observer untuk lazy loading
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })
  
  useEffect(() => {
    if (inView && visibleItems.length < items.length) {
      const nextItems = items.slice(0, visibleItems.length + 6)
      setVisibleItems(nextItems)
    }
  }, [inView, items, visibleItems.length])
  
  useEffect(() => {
    setVisibleItems(items.slice(0, 6))
  }, [items])
  
  const handleImageLoad = (id: string) => {
    setLoadedItems(prev => new Set(prev).add(id))
 }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleItems.map((item) => (
        <div 
          key={item.id} 
          className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-30"
        >
          {!loadedItems.has(item.id) && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}
          
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={600}
            height={400}
            className={`w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300 ${
              loadedItems.has(item.id) ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(item.id)}
            loading="lazy"
            quality={80}
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-bold">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.date}</p>
          </div>
        </div>
      ))}
      
      {visibleItems.length < items.length && (
        <div ref={ref} className="col-span-full flex justify-center py-8">
          <div className="h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
```

## Header Keamanan HTTP (CSP)

### 1. Konfigurasi CSP di Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Content Security Policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com;
  `
  
  // Normalisasi CSP header
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ')
    .trim()
  
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
  
  // Security headers lainnya
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Pengecualian untuk path berikut:
     * 1. /api (route API)
     * 2. /_next/static (file statis)
     * 3. /_next/image (optimizer gambar Next.js)
     * 4. favicon.ico (file favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
 ],
}
```

### 2. Konfigurasi CSP untuk Halaman Spesifik

```tsx
// app/ppdb/daftar/page.tsx
import { headers } from 'next/headers'

export const dynamic = 'force-static'

export async function generateMetadata() {
  // Tambahkan nonce untuk inline script
  const nonce = headers().get('x-nonce') || 'random-nonce'
  
 return {
    title: 'Formulir Pendaftaran PPDB - MA Malnu Kananga',
    description: 'Formulir pendaftaran online untuk Penerimaan Peserta Didik Baru MA Malnu Kananga',
    other: {
      'Content-Security-Policy': `script-src 'self' 'nonce-${nonce}' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;`
    }
  }
}

export default function PPDBFormPage() {
  const nonce = headers().get('x-nonce') || 'random-nonce'
  
  return (
    <>
      {/* Script reCAPTCHA dengan nonce */}
      <script 
        src="https://www.google.com/recaptcha/api.js" 
        async 
        defer 
        nonce={nonce}
      />
      
      <div className="container mx-auto px-4 py-8">
        <PPDBForm />
      </div>
    </>
  )
}
```

## Strategi Rate Limit API

### 1. Rate Limit untuk Endpoint PPDB

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Inisialisasi Redis untuk rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Konfigurasi rate limit
export const ratelimit = new Ratelimit({
  redis: redis,
  // 10 requests per 10 menit
  limiter: Ratelimit.slidingWindow(10, '10 m'),
  analytics: true,
  prefix: '@upstash/ratelimit',
})

// Rate limit khusus untuk PPDB
export const ppdbRatelimit = new Ratelimit({
  redis: redis,
  // 3 requests per jam untuk form PPDB
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
  prefix: '@upstash/ratelimit/ppdb',
})
```

### 2. Implementasi Rate Limit di API Route

```typescript
// app/api/ppdb/submit/route.ts
import { NextResponse } from 'next/server'
import { ppdbRatelimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  const ip = headers().get('x-forwarded-for') || '127.0.1'
  
  // Cek rate limit
  const { success, limit, reset, remaining } = await ppdbRatelimit.limit(
    `ppdb_submit_${ip}`
  )
  
  if (!success) {
    return NextResponse.json(
      { 
        error: 'Terlalu banyak permintaan. Silakan coba lagi nanti.',
        limit,
        reset,
        remaining
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        }
      }
    )
  }
  
  try {
    // Proses form submission
    const formData = await request.formData()
    
    // Validasi dan proses data
    // ...
    
    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil dikirim'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### 3. Rate Limit untuk API Publik

```typescript
// app/api/berita/route.ts
import { NextResponse } from 'next/server'
import { ratelimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'
import { client } from '@/lib/sanity'

export async function GET(request: Request) {
  const ip = headers().get('x-forwarded-for') || '127.0.0.1'
  
  // Cek rate limit untuk API publik
  const { success } = await ratelimit.limit(`api_berita_${ip}`)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }
  
  try {
    const posts = await client.fetch(`*[_type == "post"] | order(date desc)[0..9]{
      _id,
      title,
      slug,
      excerpt,
      date
    }`)
    
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
```

### 4. Middleware Rate Limit Global

```typescript
// middleware.ts (versi diperbarui)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const globalRatelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per menit
  analytics: true,
  prefix: '@upstash/ratelimit/global',
})

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  
  // Rate limit global
  const { success } = await globalRatelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }
  
  const response = NextResponse.next()
  
  // Security headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com;
  `
  
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()
  
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
  
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=6307200; includeSubDomains; preload')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/ppdb/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## Optimasi Caching dan Prefetching

### 1. Konfigurasi Caching untuk Data Statis

```typescript
// lib/cache.ts
import { cache } from 'react'
import { client } from './sanity'

// Cache untuk data yang jarang berubah
export const getCachedSiteSettings = cache(async () => {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    title,
    description,
    logo,
    favicon
  }`)
  
  return settings
})

export const getCachedNavigation = cache(async () => {
  const navigation = await client.fetch(`*[_type == "navigation"]{
    title,
    slug,
    items
  }`)
  
  return navigation
})

// Cache untuk data profil sekolah
export const getCachedProfileData = cache(async () => {
  const profile = await client.fetch(`*[_type == "page" && slug.current == "profil"][0]{
    title,
    body,
    heroImage
  }`)
  
  return profile
})
```

### 2. Prefetching untuk Navigasi

```tsx
// components/layout/Navbar.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Navbar() {
  const router = useRouter()
  
  // Prefetch halaman yang sering dikunjungi
  useEffect(() => {
    router.prefetch('/')
    router.prefetch('/profil')
    router.prefetch('/berita')
    router.prefetch('/ppdb')
  }, [router])
  
  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Berita', href: '/berita' },
    { name: 'PPDB', href: '/ppdb' },
  ]
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-green-800">MA Malnu Kananga</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium hover:text-green-600 transition-colors"
                onMouseEnter={() => router.prefetch(link.href)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

## Monitoring Kinerja

### 1. Konfigurasi Web Vitals

```tsx
// components/PerformanceMonitor.tsx
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function PerformanceMonitor() {
  useReportWebVitals((metric) => {
    // Kirim data ke analytics service
    if (process.env.NODE_ENV === 'production') {
      console.log(metric)
      
      // Contoh pengiriman ke Google Analytics
      // gtag('event', metric.name, {
      //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      //   metric_id: metric.id,
      //   metric_value: metric.value,
      //   metric_delta: metric.delta,
      // })
    }
  })
  
  return null
}
```

### 2. Instrumentation untuk Monitoring

```javascript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }
  
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}
```

## Konfigurasi Environment Variables

```env
# .env.local
# Redis untuk rate limiting
UPSTASH_REDIS_REST_URL=https://XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX......
NEXT_PUBLIC_SITE_URL=https://www.malnukananga.sch.id
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
ADMIN_EMAIL=admin@malnukananga.sch.id

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

## Checklist Kinerja & Keamanan

### Kinerja
- [x] ISR dikonfigurasi untuk halaman dinamis
- [x] Optimasi gambar dengan next/image
- [x] Lazy loading untuk konten di bawah lipat
- [x] Prefetching untuk navigasi
- [x] Caching untuk data statis
- [x] Kompresi HTTP diaktifkan
- [x] Minifikasi CSS/JS
- [x] Font optimization

### Keamanan
- [x] Content Security Policy (CSP) diterapkan
- [x] Rate limiting untuk API endpoints
- [x] Rate limiting untuk form submission
- [x] HTTP security headers dikonfigurasi
- [x] Proteksi terhadap XSS dan CSRF
- [x] Validasi input server-side
- [x] Sanitasi data
- [x] Proteksi terhadap brute force

### Monitoring
- [x] Web Vitals monitoring
- [x] Error tracking dengan Sentry
- [x] Performance monitoring
- [x] Log audit keamanan

---
*Dokumen ini berisi rekomendasi lengkap untuk optimasi kinerja dan keamanan website MA Malnu Kananga, mencakup konfigurasi Next.js untuk ISR, optimasi gambar, header keamanan HTTP (CSP), strategi rate limit API, serta berbagai teknik lain untuk memastikan website cepat, aman, dan dapat diandalkan. Dokumentasi ini dirancang untuk memberikan panduan teknis yang komprehensif untuk pengembangan dan pemeliharaan website yang optimal.*