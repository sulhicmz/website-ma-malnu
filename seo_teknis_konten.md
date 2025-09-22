# SEO Teknis & Konten - MA Malnu Kananga

## Daftar Meta Default dan Per Halaman

### 1. Meta Default untuk Seluruh Website

```typescript
// lib/seo.ts
export const defaultSEO = {
  title: 'MA Malnu Kananga - Membentuk Generasi Unggul yang Beriman dan Bertaqwa',
  description: 'Madrasah Aliyah Negeri Malnu Kananga menyelenggarakan pendidikan berkualitas yang mengintegrasikan nilai-nilai keislaman dengan kurikulum nasional.',
  keywords: 'MA Malnu Kananga, Madrasah Aliyah, Pendidikan Islam, PPDB, Sekolah Islam, Kananga',
 author: 'MA Malnu Kananga',
  themeColor: '#0A704D',
  language: 'id-ID',
  locale: 'id_ID',
  siteName: 'MA Malnu Kananga',
  type: 'website',
  image: '/images/og-image.jpg',
  imageAlt: 'Logo MA Malnu Kananga',
}

export const socialSEO = {
  twitter: {
    site: '@MALnuKananga',
    creator: '@MALnuKananga',
    cardType: 'summary_large_image',
  },
  facebook: {
    appId: 'XXXXXXXXXXXXXXX',
  },
}
```

### 2. Meta Per Halaman

#### Halaman Beranda

```typescript
// app/page.tsx
import { defaultSEO } from '@/lib/seo'

export async function generateMetadata() {
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]{
    title,
    description,
    keywords
  }`)
  
  return {
    title: siteSettings.title || defaultSEO.title,
    description: siteSettings.description || defaultSEO.description,
    keywords: siteSettings.keywords || defaultSEO.keywords,
    openGraph: {
      title: siteSettings.title || defaultSEO.title,
      description: siteSettings.description || defaultSEO.description,
      url: 'https://www.malnukananga.sch.id',
      siteName: siteSettings.title || defaultSEO.siteName,
      locale: defaultSEO.locale,
      type: defaultSEO.type,
      images: [
        {
          url: '/images/og-home.jpg',
          width: 1200,
          height: 630,
          alt: 'MA Malnu Kananga - Beranda',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteSettings.title || defaultSEO.title,
      description: siteSettings.description || defaultSEO.description,
      images: ['/images/og-home.jpg'],
      creator: socialSEO.twitter.creator,
    },
 }
}
```

#### Halaman Profil

```typescript
// app/profil/page.tsx
export async function generateMetadata() {
  const page = await client.fetch(`*[_type == "page" && slug.current == "profil"][0]{
    title,
    metaDescription
  }`)
  
  return {
    title: `${page?.title || 'Profil Sekolah'} - MA Malnu Kananga`,
    description: page?.metaDescription || 'Informasi lengkap tentang MA Malnu Kananga, sejarah, visi misi, dan fasilitas sekolah.',
    openGraph: {
      title: `${page?.title || 'Profil Sekolah'} - MA Malnu Kananga`,
      description: page?.metaDescription || 'Informasi lengkap tentang MA Malnu Kananga, sejarah, visi misi, dan fasilitas sekolah.',
      url: 'https://www.malnukananga.sch.id/profil',
      siteName: defaultSEO.siteName,
      locale: defaultSEO.locale,
      type: 'website',
      images: [
        {
          url: '/images/og-profile.jpg',
          width: 1200,
          height: 630,
          alt: 'Profil MA Malnu Kananga',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page?.title || 'Profil Sekolah'} - MA Malnu Kananga`,
      description: page?.metaDescription || 'Informasi lengkap tentang MA Malnu Kananga, sejarah, visi misi, dan fasilitas sekolah.',
      images: ['/images/og-profile.jpg'],
      creator: socialSEO.twitter.creator,
    },
  }
}
```

#### Halaman Berita

```typescript
// app/berita/page.tsx
export async function generateMetadata() {
  return {
    title: 'Berita & Pengumuman - MA Malnu Kananga',
    description: 'Berita terkini dan pengumuman penting dari MA Malnu Kananga. Ikuti informasi kegiatan sekolah, prestasi siswa, dan program unggulan.',
    openGraph: {
      title: 'Berita & Pengumuman - MA Malnu Kananga',
      description: 'Berita terkini dan pengumuman penting dari MA Malnu Kananga. Ikuti informasi kegiatan sekolah, prestasi siswa, dan program unggulan.',
      url: 'https://www.malnukananga.sch.id/berita',
      siteName: defaultSEO.siteName,
      locale: defaultSEO.locale,
      type: 'website',
      images: [
        {
          url: '/images/og-news.jpg',
          width: 1200,
          height: 630,
          alt: 'Berita MA Malnu Kananga',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Berita & Pengumuman - MA Malnu Kananga',
      description: 'Berita terkini dan pengumuman penting dari MA Malnu Kananga. Ikuti informasi kegiatan sekolah, prestasi siswa, dan program unggulan.',
      images: ['/images/og-news.jpg'],
      creator: socialSEO.twitter.creator,
    },
  }
}
```

#### Halaman Detail Berita

```typescript
// app/berita/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt,
    coverImage
  }`, { slug: params.slug })
  
  if (!post) {
    return {
      title: 'Berita Tidak Ditemukan - MA Malnu Kananga',
      description: 'Halaman berita yang Anda cari tidak ditemukan.',
    }
  }
  
  const imageUrl = post.coverImage?.asset ? urlForImage(post.coverImage).url() : '/images/og-news.jpg'
  
 return {
    title: `${post.title} - MA Malnu Kananga`,
    description: post.excerpt || 'Baca berita terkini dari MA Malnu Kananga.',
    openGraph: {
      title: `${post.title} - MA Malnu Kananga`,
      description: post.excerpt || 'Baca berita terkini dari MA Malnu Kananga.',
      url: `https://www.malnukananga.sch.id/berita/${params.slug}`,
      siteName: defaultSEO.siteName,
      locale: defaultSEO.locale,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 120,
          height: 630,
          alt: post.title,
        },
      ],
      article: {
        publishedTime: post.date,
        modifiedTime: post.date,
        section: 'Berita',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - MA Malnu Kananga`,
      description: post.excerpt || 'Baca berita terkini dari MA Malnu Kananga.',
      images: [imageUrl],
      creator: socialSEO.twitter.creator,
    },
  }
}
```

#### Halaman PPDB

```typescript
// app/ppdb/page.tsx
export async function generateMetadata() {
  return {
    title: 'PPDB MA Malnu Kananga - Penerimaan Peserta Didik Baru',
    description: 'Informasi lengkap tentang Penerimaan Peserta Didik Baru (PPDB) MA Malnu Kananga. Syarat pendaftaran, jadwal, biaya, dan alur pendaftaran.',
    openGraph: {
      title: 'PPDB MA Malnu Kananga - Penerimaan Peserta Didik Baru',
      description: 'Informasi lengkap tentang Penerimaan Peserta Didik Baru (PPDB) MA Malnu Kananga. Syarat pendaftaran, jadwal, biaya, dan alur pendaftaran.',
      url: 'https://www.malnukananga.sch.id/ppdb',
      siteName: defaultSEO.siteName,
      locale: defaultSEO.locale,
      type: 'website',
      images: [
        {
          url: '/images/og-ppdb.jpg',
          width: 120,
          height: 630,
          alt: 'PPDB MA Malnu Kananga',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'PPDB MA Malnu Kananga - Penerimaan Peserta Didik Baru',
      description: 'Informasi lengkap tentang Penerimaan Peserta Didik Baru (PPDB) MA Malnu Kananga. Syarat pendaftaran, jadwal, biaya, dan alur pendaftaran.',
      images: ['/images/og-ppdb.jpg'],
      creator: socialSEO.twitter.creator,
    },
  }
}
```

### 3. File robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.malnukananga.sch.id/sitemap.xml

# RSS Feed
Sitemap: https://www.malnukananga.sch.id/api/rss

# Host
Host: https://www.malnukananga.sch.id

# Crawl-delay
Crawl-delay: 10

# Directories
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/

# File extensions
Disallow: /*.pdf$
Disallow: /*.doc$
Disallow: /*.docx$
Disallow: /*.xls$
Disallow: /*.xlsx$

# Specific files
Disallow: /private/
Disallow: /tmp/
Disallow: /backup/

# Parameters
Disallow: /*?*
Allow: /*?$

# Google AdsBot
User-agent: AdsBot-Google
Allow: /

# Googlebot-Image
User-agent: Googlebot-Image
Allow: /

# Bingbot
User-agent: bingbot
Crawl-delay: 10

# Yandex
User-agent: Yandex
Crawl-delay: 10

# Social media crawlers
User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /
```

### 4. File sitemap.xml untuk Next.js

```typescript
// app/sitemap.ts
import { client } from '@/lib/sanity'

export default async function sitemap() {
  const siteUrl = 'https://www.malnukananga.sch.id'
  
  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/profil`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/profil/sejarah`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/profil/visi-misi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/profil/fasilitas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/akademik`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/akademik/kurikulum`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/akademik/ekstrakurikuler`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/pengumuman`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/prestasi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/galeri`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guru-staf`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/ppdb`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ppdb/syarat`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ppdb/biaya`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ppdb/jadwal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ppdb/daftar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/kontak/lokasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/kontak/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
  
  // Dynamic pages - Berita
  const posts = await client.fetch(`*[_type == "post"] | order(date desc){
    slug,
    date
  }`)
  
  const newsPages = posts.map((post) => ({
    url: `${siteUrl}/berita/${post.slug.current}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))
  
  // Dynamic pages - Guru & Staf
  const teachers = await client.fetch(`*[_type == "teacher"]{
    slug
  }`)
  
  const teacherPages = teachers.map((teacher) => ({
    url: `${siteUrl}/guru-staf/${teacher.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))
  
  // Dynamic pages - Galeri
  const galleries = await client.fetch(`*[_type == "gallery"]{
    slug
  }`)
  
  const galleryPages = galleries.map((gallery) => ({
    url: `${siteUrl}/galeri/${gallery.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))
  
  // Dynamic pages - Prestasi
  const achievements = await client.fetch(`*[_type == "achievement"]{
    slug
  }`)
  
  const achievementPages = achievements.map((achievement) => ({
    url: `${siteUrl}/prestasi/${achievement.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))
  
  return [
    ...staticPages,
    ...newsPages,
    ...teacherPages,
    ...galleryPages,
    ...achievementPages,
  ]
}
```

### 5. JSON-LD untuk Organization/School

```tsx
// components/seo/OrganizationJSONLD.tsx
export default function OrganizationJSONLD() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "MA Malnu Kananga",
    "alternateName": "Madrasah Aliyah Negeri Malnu Kananga",
    "url": "https://www.malnukananga.sch.id",
    "logo": "https://www.malnukananga.sch.id/images/logo.png",
    "description": "Madrasah Aliyah Negeri Malnu Kananga menyelenggarakan pendidikan berkualitas yang mengintegrasikan nilai-nilai keislaman dengan kurikulum nasional.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Pendidikan No. 123",
      "addressLocality": "Kananga",
      "addressRegion": "XXXXX",
      "postalCode": "XXXXX",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-XXXX-XXXXXX",
      "contactType": "customer service",
      "email": "info@malnukananga.sch.id",
      "availableLanguage": "id"
    },
    "sameAs": [
      "https://www.facebook.com/MALnuKananga",
      "https://www.instagram.com/malnukananga",
      "https://twitter.com/MALnuKananga"
    ],
    "foundingDate": "1980",
    "founder": {
      "@type": "Person",
      "name": "Pemerintah Republik Indonesia"
    },
    "numberOfStudents": 800,
    "educationalSector": "Secondary School",
    "offers": {
      "@type": "Offer",
      "category": "Education",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "0",
        "priceCurrency": "IDR"
      }
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

### 6. JSON-LD untuk NewsArticle

```tsx
// components/seo/NewsArticleJSONLD.tsx
interface NewsArticleJSONLDProps {
  title: string
  description: string
  datePublished: string
  dateModified: string
  authorName: string
 image: string
 slug: string
}

export default function NewsArticleJSONLD({
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  image,
  slug
}: NewsArticleJSONLDProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "description": description,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "MA Malnu Kananga",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.malnukananga.sch.id/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.malnukananga.sch.id/berita/${slug}`
    },
    "image": {
      "@type": "ImageObject",
      "url": image,
      "width": 1200,
      "height": 630
    },
    "articleSection": "Berita Sekolah",
    "keywords": "pendidikan, sekolah, madrasah, berita"
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

### 7. JSON-LD untuk BreadcrumbList

```tsx
// components/seo/BreadcrumbJSONLD.tsx
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJSONLDProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbJSONLD({ items }: BreadcrumbJSONLDProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

### 8. Penggunaan JSON-LD di Halaman

#### Halaman Beranda dengan Organization JSON-LD

```tsx
// app/page.tsx
import OrganizationJSONLD from '@/components/seo/OrganizationJSONLD'

export default function HomePage() {
  return (
    <>
      <OrganizationJSONLD />
      {/* Konten halaman beranda */}
    </>
  )
}
```

#### Halaman Detail Berita dengan NewsArticle dan Breadcrumb JSON-LD

```tsx
// app/berita/[slug]/page.tsx
import NewsArticleJSONLD from '@/components/seo/NewsArticleJSONLD'
import BreadcrumbJSONLD from '@/components/seo/BreadcrumbJSONLD'
import { urlForImage } from '@/lib/image'

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
  
  const imageUrl = post.coverImage?.asset ? urlForImage(post.coverImage).url() : '/images/og-news.jpg'
  
  const breadcrumbItems = [
    { name: 'Beranda', url: 'https://www.malnukananga.sch.id' },
    { name: 'Berita', url: 'https://www.malnukananga.sch.id/berita' },
    { name: post.title, url: `https://www.malnukananga.sch.id/berita/${params.slug}` }
  ]
  
  return (
    <>
      <NewsArticleJSONLD
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        dateModified={post.date}
        authorName={post.author?.name || 'Admin MA Malnu Kananga'}
        image={imageUrl}
        slug={params.slug}
      />
      
      <BreadcrumbJSONLD items={breadcrumbItems} />
      
      <article>
        {/* Konten artikel */}
      </article>
    </>
  )
}
```

### 9. Konfigurasi Meta Tags Tambahan

```tsx
// components/seo/MetaTags.tsx
import Head from 'next/head'

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  author?: string
  image?: string
  url?: string
  type?: string
}

export default function MetaTags({
  title,
  description,
  keywords,
  author,
  image,
  url,
  type = 'website'
}: MetaTagsProps) {
  const siteTitle = title || 'MA Malnu Kananga'
  const siteDescription = description || 'Madrasah Aliyah Negeri Malnu Kananga'
  const siteImage = image || '/images/og-image.jpg'
  const siteUrl = url || 'https://www.malnukananga.sch.id'
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords || 'MA Malnu Kananga, Madrasah Aliyah, Pendidikan Islam'} />
      <meta name="author" content={author || 'MA Malnu Kananga'} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Indonesian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="generator" content="Next.js" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:site_name" content="MA Malnu Kananga" />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={siteImage} />
      <meta name="twitter:site" content="@MALnuKananga" />
      <meta name="twitter:creator" content="@MALnuKananga" />
      
      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0A704D" />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Canonical */}
      <link rel="canonical" href={siteUrl} />
    </Head>
  )
}
```

### 10. Penggunaan Meta Tags di Halaman

```tsx
// app/layout.tsx
import MetaTags from '@/components/seo/MetaTags'
import { defaultSEO } from '@/lib/seo'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <MetaTags
          title={defaultSEO.title}
          description={defaultSEO.description}
          keywords={defaultSEO.keywords}
          author={defaultSEO.author}
          image={defaultSEO.image}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

### 11. Konfigurasi Environment Variables untuk SEO

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.malnukananga.sch.id
NEXT_PUBLIC_FACEBOOK_APP_ID=XXXXXXXXXXXXXXX
NEXT_PUBLIC_TWITTER_HANDLE=@MALnuKananga
```

### 12. Pengujian SEO

#### Checklist Pengujian SEO

1. **Meta Tags**
   - [ ] Title tag unik per halaman
   - [ ] Description tag informatif
   - [ ] Keyword relevan
   - [ ] Author tag terisi

2. **Open Graph**
   - [ ] OG:title sesuai konten
   - [ ] OG:description informatif
   - [ ] OG:image berkualitas tinggi
   - [ ] OG:url kanonis

3. **Twitter Cards**
   - [ ] Twitter:card summary_large_image
   - [ ] Twitter:title sesuai
   - [ ] Twitter:description informatif
   - [ ] Twitter:image berkualitas

4. **Structured Data**
   - [ ] Organization JSON-LD valid
   - [ ] NewsArticle JSON-LD valid
   - [ ] Breadcrumb JSON-LD valid
   - [ ] Tidak ada error di Rich Results Test

5. **Sitemap**
   - [ ] Semua halaman penting terdaftar
   - [ ] lastModified date akurat
   - [ ] Priority sesuai tingkat pentingnya
   - [ ] Change frequency sesuai update konten

6. **robots.txt**
   - [ ] Semua halaman publik diizinkan
   - [ ] Halaman admin diblokir
   - [ ] File sensitif diblokir
   - [ ] Sitemap terdaftar

7. **Performance**
   - [ ] Kecepatan loading < 3 detik
   - [ ] Core Web Vitals memenuhi standar
   - [ ] Mobile-friendly
   - [ ] Tidak ada broken links

8. **Accessibility**
   - [ ] Semantic HTML
   - [ ] Alt text untuk gambar
   - [ ] Heading structure logis
   - [ ] Kontras warna memadai

---
*Dokumen ini berisi konfigurasi SEO teknis dan konten untuk website MA Malnu Kananga, mencakup meta tags default dan per halaman, konfigurasi robots.txt dan sitemap.xml, serta implementasi structured data JSON-LD untuk Organization, NewsArticle, dan BreadcrumbList. Dokumentasi ini dirancang untuk memastikan website memiliki optimasi SEO yang komprehensif dan memenuhi standar terkini.*