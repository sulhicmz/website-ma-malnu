# Integrasi & Otomasi - MA Malnu Kananga

## Snippet dan Konfigurasi Integrasi

### 1. Tombol WhatsApp dengan Template Pesan Berparameter

#### Implementasi Tombol WhatsApp

```tsx
// components/WhatsAppButton.tsx
import { FiPhone } from 'react-icons/fi'

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
 buttonText?: string
  className?: string
}

export default function WhatsAppButton({
  phoneNumber,
  message = '',
  buttonText = 'Hubungi Kami via WhatsApp',
  className = ''
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 ${className}`}
    >
      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.83-.78-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.98 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.35.157 11.892c0 2.096.547 4.142 1.58 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.48h.005c6.554 0 11.89-5.35 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {buttonText}
    </a>
  )
}
```

#### Penggunaan Tombol WhatsApp dengan Template Pesan

```tsx
// app/contact/page.tsx
import WhatsAppButton from '@/components/WhatsAppButton'

export default function ContactPage() {
  // Template pesan untuk kontak umum
  const generalMessage = `Assalamu'alaikum Wr. Wb.
  
Saya ingin bertanya tentang MA Malnu Kananga.

Nama: [Nama Anda]
Pertanyaan: [Pertanyaan Anda]

Terima kasih.`

  // Template pesan untuk PPDB
  const ppdbMessage = `Assalamu'alaikum Wr. Wb.
  
Saya ingin bertanya tentang Penerimaan Peserta Didik Baru (PPDB) MA Malnu Kananga.

Nama: [Nama Anda]
No. Telepon: [Nomor Telepon]
Pertanyaan: [Pertanyaan Anda]

Terima kasih.`

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Hubungi Kami</h1>
          <p className="mt-4 text-xl text-gray-600">
            Kami siap membantu Anda dengan segala pertanyaan
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kontak Umum */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Kontak Umum</h2>
            <p className="text-gray-600 mb-6">
              Untuk pertanyaan umum tentang sekolah, fasilitas, atau informasi lainnya.
            </p>
            <WhatsAppButton 
              phoneNumber="6281234567890"
              message={generalMessage}
              buttonText="Chat via WhatsApp"
            />
          </div>
          
          {/* PPDB */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">PPDB</h2>
            <p className="text-gray-60 mb-6">
              Untuk pertanyaan khusus tentang Penerimaan Peserta Didik Baru.
            </p>
            <WhatsAppButton 
              phoneNumber="6281234567891"
              message={ppdbMessage}
              buttonText="Chat PPDB via WhatsApp"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### Konfigurasi Nomor WhatsApp di Environment Variables

```env
# .env.local
NEXT_PUBLIC_WHATSAPP_GENERAL=6281234567890
NEXT_PUBLIC_WHATSAPP_PPDB=6281234567891
NEXT_PUBLIC_WHATSAPP_ADMIN=6281234567892
```

### 2. Embed Google Maps

#### Implementasi Peta Sekolah

```tsx
// components/SchoolMap.tsx
interface SchoolMapProps {
  location: {
    lat: number
    lng: number
  }
  width?: string
  height?: string
  zoom?: number
}

export default function SchoolMap({
  location,
  width = "100%",
  height = "400px",
  zoom = 15
}: SchoolMapProps) {
  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${location.lat},${location.lng}&zoom=${zoom}&maptype=satellite`
  
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <iframe
        width={width}
        height={height}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
        className="border-0"
        title="Lokasi MA Malnu Kananga"
      ></iframe>
      
      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-md shadow-md">
        <p className="text-sm font-medium text-gray-900">MA Malnu Kananga</p>
        <p className="text-xs text-gray-600">Kananga, Kabupaten XXXXX</p>
      </div>
    </div>
  )
}
```

#### Penggunaan Peta di Halaman Kontak

```tsx
// app/contact/page.tsx (lanjutan)
import SchoolMap from '@/components/SchoolMap'

export default function ContactPage() {
  const schoolLocation = {
    lat: -2.5489, // Koordinat latitude sekolah
    lng: 118.0149 // Koordinat longitude sekolah
  }
  
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Konten sebelumnya */}
        
        {/* Lokasi Sekolah */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Lokasi Kami</h2>
            <p className="mt-2 text-gray-600">
              Temukan MA Malnu Kananga di peta
            </p>
          </div>
          
          <SchoolMap 
            location={schoolLocation}
            height="500px"
            zoom={16}
          />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Alamat</h3>
              <p className="mt-2 text-gray-600">
                Jl. Pendidikan No. 123<br />
                Kananga, Kabupaten XXXXX<br />
                Provinsi XXXXX
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Petunjuk Arah</h3>
              <p className="mt-2 text-gray-600">
                Dari pusat kota, ikuti Jl. Raya Utama ke arah timur sejauh 5 km.
                Sekolah berada di sebelah kanan setelah pom bensin.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900">Fasilitas Parkir</h3>
              <p className="mt-2 text-gray-600">
                Tersedia area parkir yang luas untuk kendaraan roda dua dan roda empat.
                Parkir gratis untuk pengunjung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### Konfigurasi API Key Google Maps

```env
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 3. Google Analytics 4 via Google Tag Manager

#### Konfigurasi GTM di App Router

```tsx
// app/layout.tsx
import GoogleTagManager from '@/components/GoogleTagManager'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <GoogleTagManager />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

#### Komponen Google Tag Manager

```tsx
// components/GoogleTagManager.tsx
'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function GoogleTagManager() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Trigger pageview event for GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          url: pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''),
          path: pathname,
        },
      })
    }
  }, [pathname, searchParams])
  
  if (process.env.NODE_ENV !== 'production') {
    return null
  }
  
  return (
    <>
      <Script
        id="gtm-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `,
        }}
      />
      
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
```

#### Konfigurasi Event Tracking

```tsx
// lib/gtm.ts
declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    })
  }
}

// Contoh penggunaan event tracking
export const trackPPDBFormSubmit = (jurusan: string) => {
  trackEvent('ppdb_form_submit', {
    jurusan_pilihan: jurusan,
    timestamp: new Date().toISOString(),
  })
}

export const trackWhatsAppClick = (context: string) => {
  trackEvent('whatsapp_click', {
    context: context,
    timestamp: new Date().toISOString(),
  })
}
```

#### Penggunaan Event Tracking di Komponen

```tsx
// components/WhatsAppButton.tsx (versi diperbarui)
'use client'

import { FiPhone } from 'react-icons/fi'
import { trackEvent } from '@/lib/gtm'

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  buttonText?: string
  context?: string // Untuk tracking konteks klik
  className?: string
}

export default function WhatsAppButton({
  phoneNumber,
  message = '',
  buttonText = 'Hubungi Kami via WhatsApp',
  context = 'general',
  className = ''
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`
  
  const handleClick = () => {
    // Track event sebelum membuka WhatsApp
    trackEvent('whatsapp_click', {
      context: context,
      phone_number: phoneNumber,
      timestamp: new Date().toISOString(),
    })
  }
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 ${className}`}
    >
      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.98 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.35.157 11.892c0 2.096.547 4.142 1.58 5.945L.057 24l6.305-1.654a11.882 11.882 005.683 1.448h.005c6.554 0 11.89-5.35 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {buttonText}
    </a>
  )
}
```

#### Konfigurasi Environment Variables untuk GTM

```env
# .env.local
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### 4. RSS Feed untuk Berita & Pengumuman

#### Konfigurasi API Route untuk RSS Feed

```typescript
// app/api/rss/route.ts
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    // Fetch latest posts from Sanity
    const posts = await client.fetch(`*[_type == "post"] | order(date desc)[0..20]{
      _id,
      title,
      slug,
      excerpt,
      date,
      body,
      author->{
        name
      }
    }`)
    
    // Generate RSS XML
    const rss = generateRSS(posts)
    
    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('RSS feed generation error:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}

function generateRSS(posts: any[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.malnukananga.sch.id'
  const lastBuildDate = new Date().toUTCString()
  
  const items = posts.map(post => {
    const postUrl = `${siteUrl}/berita/${post.slug.current}`
    const pubDate = new Date(post.date).toUTCString()
    
    // Convert first paragraph of body to description
    let description = post.excerpt || ''
    if (!description && post.body && post.body.length > 0) {
      const firstBlock = post.body[0]
      if (firstBlock._type === 'block' && firstBlock.children) {
        description = firstBlock.children.map((child: any) => child.text).join('')
      }
    }
    
    return `
    <item>
      <title><![CDATA[${escapeXml(post.title)}]]></title>
      <description><![CDATA[${escapeXml(description)}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${escapeXml(post.author?.name || 'Admin MA Malnu Kananga')}]]></author>
    </item>`
  }).join('')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MA Malnu Kananga - Berita & Pengumuman</title>
    <description>Berita dan pengumuman terkini dari MA Malnu Kananga</description>
    <link>${siteUrl}</link>
    <language>id-ID</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`
}

function escapeXml(unsafe: string) {
  if (!unsafe) return ''
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '<'
      case '>': return '>'
      case '&': return '&'
      case '\'': return '''
      case '"': return '"'
      default: return c
    }
  })
}
```

#### Konfigurasi Sitemap untuk RSS Feed

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.malnukananga.sch.id/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>https://www.malnukananga.sch.id/berita</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.malnukananga.sch.id/pengumuman</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Tambahkan URL lainnya sesuai kebutuhan -->
</urlset>
```

#### Konfigurasi robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://www.malnukananga.sch.id/sitemap.xml

# RSS Feed
Allow: /api/rss
```

#### Penambahan Link RSS di Header

```tsx
// app/layout.tsx (versi diperbarui)
import GoogleTagManager from '@/components/GoogleTagManager'

export const metadata = {
  title: 'MA Malnu Kananga',
  description: 'Membentuk Generasi Unggul yang Beriman dan Bertaqwa',
  openGraph: {
    title: 'MA Malnu Kananga',
    description: 'Membentuk Generasi Unggul yang Beriman dan Bertaqwa',
    url: 'https://www.malnukananga.sch.id',
    siteName: 'MA Malnu Kananga',
    locale: 'id_ID',
    type: 'website',
  },
  alternates: {
    types: {
      'application/rss+xml': '/api/rss',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <GoogleTagManager />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed MA Malnu Kananga" href="/api/rss" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

### 5. Integrasi Lainnya

#### Form Submission Tracking

```tsx
// components/forms/ContactForm.tsx (versi diperbarui)
'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/gtm'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Track form submission
      trackEvent('contact_form_submit', {
        timestamp: new Date().toISOString(),
      })
      
      // Submit form logic
      const formData = new FormData(e.target as HTMLFormElement)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        // Track successful submission
        trackEvent('contact_form_success', {
          timestamp: new Date().toISOString(),
        })
        
        alert('Pesan berhasil dikirim!')
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      // Track failed submission
      trackEvent('contact_form_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      })
      
      alert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </div>
    </form>
  )
}
```

#### Social Media Sharing

```tsx
// components/SocialShare.tsx
'use client'

import { FiShare2, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi'
import { trackEvent } from '@/lib/gtm'

interface SocialShareProps {
  url: string
  title: string
 description?: string
}

export default function SocialShare({ url, title, description = '' }: SocialShareProps) {
  const shareUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(title)
  const shareDescription = encodeURIComponent(description)
  
  const shareToFacebook = () => {
    trackEvent('social_share', {
      platform: 'facebook',
      url: url,
      timestamp: new Date().toISOString(),
    })
    
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      '_blank',
      'width=600,height=400'
    )
  }
  
  const shareToTwitter = () => {
    trackEvent('social_share', {
      platform: 'twitter',
      url: url,
      timestamp: new Date().toISOString(),
    })
    
    window.open(
      `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
      '_blank',
      'width=600,height=400'
    )
  }
  
  const shareToLinkedIn = () => {
    trackEvent('social_share', {
      platform: 'linkedin',
      url: url,
      timestamp: new Date().toISOString(),
    })
    
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      '_blank',
      'width=600,height=400'
    )
  }
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Bagikan:</span>
      <button
        onClick={shareToFacebook}
        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
        aria-label="Bagikan ke Facebook"
      >
        <FiFacebook className="h-5 w-5" />
      </button>
      <button
        onClick={shareToTwitter}
        className="p-2 text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded-full"
        aria-label="Bagikan ke Twitter"
      >
        <FiTwitter className="h-5 w-5" />
      </button>
      <button
        onClick={shareToLinkedIn}
        className="p-2 text-gray-500 hover:text-blue-700 hover:bg-gray-100 rounded-full"
        aria-label="Bagikan ke LinkedIn"
      >
        <FiLinkedin className="h-5 w-5" />
      </button>
    </div>
  )
}
```

#### Penggunaan Social Share di Halaman Berita

```tsx
// app/berita/[slug]/page.tsx (versi diperbarui)
import SocialShare from '@/components/SocialShare'

export default async function PostDetailPage({ params }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Berita tidak ditemukan</h1>
          <p className="mt-2 text-gray-600">Maaf, berita yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    )
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.malnukananga.sch.id'
  const postUrl = `${siteUrl}/berita/${params.slug}`
  
  return (
    <div className="min-h-screen">
      {/* Breadcrumb dan header */}
      
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header artikel */}
          
          {/* Konten artikel */}
          <div className="prose prose-lg max-w-none">
            {/* Isi artikel */}
          </div>
          
          {/* Social Share */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <SocialShare 
              url={postUrl}
              title={post.title}
              description={post.excerpt}
            />
          </div>
        </div>
      </article>
    </div>
  )
}
```

### 6. Konfigurasi Environment Variables

```env
# .env.local
# WhatsApp
NEXT_PUBLIC_WHATSAPP_GENERAL=6281234567890
NEXT_PUBLIC_WHATSAPP_PPDB=6281234567891
NEXT_PUBLIC_WHATSAPP_ADMIN=6281234567892

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.malnukananga.sch.id

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
```

---
*Dokumen ini berisi konfigurasi dan implementasi untuk berbagai integrasi dan otomasi di website MA Malnu Kananga, termasuk tombol WhatsApp dengan template pesan berparameter, embed Google Maps, Google Analytics 4 via Google Tag Manager, RSS feed untuk berita dan pengumuman, serta berbagai integrasi lainnya. Integrasi-integrasi ini dirancang untuk meningkatkan pengalaman pengguna dan memberikan wawasan analitik yang berguna untuk pengembangan website.*