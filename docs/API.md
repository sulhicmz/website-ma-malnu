# 📊 API Documentation

This documentation covers all API endpoints, data structures, and integration patterns for the MA Malnu Kananga website.

## 🏗️ Architecture Overview

### **Data Flow**
```
Sanity CMS → Next.js API Routes → Frontend Components
     ↓              ↓                    ↓
  Content      Server-side          Client-side
  Management   Data Fetching        Rendering
```

### **Technology Stack**
- **CMS**: Sanity.io (headless CMS)
- **API**: Next.js App Router (Server Components)
- **Client**: React with TypeScript
- **Caching**: Next.js ISR (Incremental Static Regeneration)

## 🔌 Sanity CMS API

### **Configuration**

```typescript
// src/lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-10-15',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: any) => builder.image(source)
```

### **Environment Variables**

```env
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Optional
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-15
```

## 📝 GROQ Queries

### **Core Queries**

```typescript
// src/lib/queries.ts

// Site Settings
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0]{
    title,
    description,
    logo,
    favicon,
    socialLinks,
    contactInfo,
    seo
  }
`

// News Articles
export const NEWS_QUERY = `
  *[_type == "news" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author->{name, slug},
    category->{title, slug},
    mainImage,
    seo
  }
`

// Single News Article
export const NEWS_SLUG_QUERY = `
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author->{name, slug, bio, image},
    category->{title, slug},
    mainImage,
    content,
    seo,
    "related": *[_type == "news" && category._ref == ^.category._ref && _id != ^._id] | order(publishedAt desc)[0...3]
  }
`

// Staff/Guru
export const STAFF_QUERY = `
  *[_type == "staff"] | order(order asc) {
    _id,
    name,
    slug,
    position,
    bio,
    image,
    subjects,
    socialLinks,
    order
  }
`

// Single Staff
export const STAFF_SLUG_QUERY = `
  *[_type == "staff" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    position,
    bio,
    image,
    subjects,
    socialLinks,
    education,
    experience,
    achievements
  }
`

// Gallery
export const GALLERY_QUERY = `
  *[_type == "gallery"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    images,
    publishedAt,
    category
  }
`

// Announcements
export const ANNOUNCEMENTS_QUERY = `
  *[_type == "announcement" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    content,
    publishedAt,
    urgency,
    isActive
  }
`

// PPDB Settings
export const PPDB_SETTINGS_QUERY = `
  *[_type == "ppdbSettings"][0] {
    isOpen,
    academicYear,
    requirements,
    timeline,
    contactInfo,
    formData
  }
`
```

## 🔄 Data Fetching Functions

### **Core Fetch Functions**

```typescript
// src/lib/fetchData.ts
import { sanityClient } from './sanity'
import {
  SITE_SETTINGS_QUERY,
  NEWS_QUERY,
  NEWS_SLUG_QUERY,
  STAFF_QUERY,
  STAFF_SLUG_QUERY,
  GALLERY_QUERY,
  ANNOUNCEMENTS_QUERY,
  PPDB_SETTINGS_QUERY,
} from './queries'

// Revalidation time (5 minutes)
export const REVALIDATION_TIME = 300

// Site Settings
export async function getSiteSettings() {
  return await sanityClient.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: REVALIDATION_TIME } })
}

// News Articles
export async function getNewsArticles() {
  return await sanityClient.fetch(NEWS_QUERY, {}, { next: { revalidate: REVALIDATION_TIME } })
}

export async function getNewsArticle(slug: string) {
  return await sanityClient.fetch(NEWS_SLUG_QUERY, { slug }, { next: { revalidate: REVALIDATION_TIME } })
}

// Staff
export async function getStaff() {
  return await sanityClient.fetch(STAFF_QUERY, {}, { next: { revalidate: REVALIDATION_TIME } })
}

export async function getStaffMember(slug: string) {
  return await sanityClient.fetch(STAFF_SLUG_QUERY, { slug }, { next: { revalidate: REVALIDATION_TIME } })
}

// Gallery
export async function getGallery() {
  return await sanityClient.fetch(GALLERY_QUERY, {}, { next: { revalidate: REVALIDATION_TIME } })
}

// Announcements
export async function getAnnouncements() {
  return await sanityClient.fetch(ANNOUNCEMENTS_QUERY, {}, { next: { revalidate: REVALIDATION_TIME } })
}

// PPDB Settings
export async function getPPDBSettings() {
  return await sanityClient.fetch(PPDB_SETTINGS_QUERY, {}, { next: { revalidate: REVALIDATION_TIME } })
}
```

## 📄 Data Schemas

### **News Article Schema**

```typescript
interface NewsArticle {
  _id: string
  _type: 'news'
  title: string
  slug: { current: string }
  excerpt: string
  content: any // Portable Text
  publishedAt: string
  author: {
    name: string
    slug: { current: string }
  }
  category: {
    title: string
    slug: { current: string }
  }
  mainImage: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
  }
  seo: {
    title?: string
    description?: string
    image?: any
  }
}
```

### **Staff Schema**

```typescript
interface Staff {
  _id: string
  _type: 'staff'
  name: string
  slug: { current: string }
  position: string
  bio: string
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
  }
  subjects: string[]
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  education?: string[]
  experience?: string[]
  achievements?: string[]
  order: number
}
```

### **Gallery Schema**

```typescript
interface Gallery {
  _id: string
  _type: 'gallery'
  title: string
  slug: { current: string }
  images: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
    caption?: string
  }[]
  publishedAt: string
  category?: string
}
```

### **Announcement Schema**

```typescript
interface Announcement {
  _id: string
  _type: 'announcement'
  title: string
  content: any // Portable Text
  publishedAt: string
  urgency: 'low' | 'medium' | 'high'
  isActive: boolean
}
```

## 🎯 Usage Examples

### **In Server Components**

```typescript
// src/app/page.tsx
import { getNewsArticles, getAnnouncements, getSiteSettings } from '@/lib/fetchData'

export default async function HomePage() {
  const [news, announcements, settings] = await Promise.all([
    getNewsArticles(),
    getAnnouncements(),
    getSiteSettings(),
  ])

  return (
    <main>
      <h1>{settings.title}</h1>
      {/* Render components with data */}
    </main>
  )
}
```

### **In Client Components**

```typescript
// src/components/NewsCard.tsx
'use client'

import { useEffect, useState } from 'react'
import { getNewsArticles } from '@/lib/fetchData'

export default function NewsCard() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const articles = await getNewsArticles()
        setNews(articles)
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {news.map((article) => (
        <div key={article._id}>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
        </div>
      ))}
    </div>
  )
}
```

## 🔄 API Routes

### **Custom API Endpoints**

```typescript
// src/app/api/news/route.ts
import { getNewsArticles } from '@/lib/fetchData'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const news = await getNewsArticles()
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

// src/app/api/news/[slug]/route.ts
import { getNewsArticle } from '@/lib/fetchData'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await getNewsArticle(params.slug)
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}
```

### **PPDB Form Submission**

```typescript
// src/app/api/ppdb/submit/route.ts
import { NextResponse } from 'next/server'
import { getPPDBSettings } from '@/lib/fetchData'

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    
    // Validate PPDB is open
    const settings = await getPPDBSettings()
    if (!settings.isOpen) {
      return NextResponse.json(
        { error: 'PPDB registration is currently closed' },
        { status: 400 }
      )
    }

    // Validate form data
    const requiredFields = ['name', 'email', 'phone', 'address']
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Process submission (send to Sanity, email, etc.)
    // Implementation depends on your requirements

    return NextResponse.json(
      { message: 'Application submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
```

## 🔍 Error Handling

### **Error Types**

```typescript
// src/lib/errors.ts
export class SanityError extends Error {
  constructor(message: string, public query?: string) {
    super(message)
    this.name = 'SanityError'
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`)
    this.name = 'NotFoundError'
  }
}
```

### **Error Handling Middleware**

```typescript
// src/lib/errorHandler.ts
import { NextResponse } from 'next/server'
import { SanityError, ValidationError, NotFoundError } from './errors'

export function handleApiError(error: unknown) {
  console.error('API Error:', error)

  if (error instanceof ValidationError) {
    return NextResponse.json(
      { error: error.message, field: error.field },
      { status: 400 }
    )
  }

  if (error instanceof NotFoundError) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    )
  }

  if (error instanceof SanityError) {
    return NextResponse.json(
      { error: 'Data fetch failed' },
      { status: 502 }
    )
  }

  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}
```

## 🚀 Performance Optimization

### **Caching Strategy**

```typescript
// src/lib/cache.ts
import { unstable_cache } from 'next/cache'

// Cache expensive queries
export const getCachedNewsArticles = unstable_cache(
  async () => {
    return await getNewsArticles()
  },
  ['news-articles'],
  {
    revalidate: 300, // 5 minutes
    tags: ['news'],
  }
)

// Cache with tags for invalidation
export const getCachedSiteSettings = unstable_cache(
  async () => {
    return await getSiteSettings()
  },
  ['site-settings'],
  {
    revalidate: 3600, // 1 hour
    tags: ['settings'],
  }
)
```

### **Image Optimization**

```typescript
// src/components/OptimizedImage.tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface OptimizedImageProps {
  image: any
  alt: string
  width?: number
  height?: number
  priority?: boolean
}

export default function OptimizedImage({
  image,
  alt,
  width = 800,
  height = 600,
  priority = false,
}: OptimizedImageProps) {
  const imageUrl = urlFor(image)
    .width(width)
    .height(height)
    .format('webp')
    .url()

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
  )
}
```

## 🧪 Testing API

### **Unit Tests**

```typescript
// src/lib/__tests__/fetchData.test.ts
import { describe, it, expect, vi } from 'vitest'
import { getNewsArticles } from '../fetchData'

// Mock Sanity client
vi.mock('../sanity', () => ({
  sanityClient: {
    fetch: vi.fn(),
  },
}))

describe('getNewsArticles', () => {
  it('should fetch news articles successfully', async () => {
    const mockNews = [
      { _id: '1', title: 'Test News', slug: { current: 'test-news' } },
    ]
    
    const { sanityClient } = await import('../sanity')
    vi.mocked(sanityClient.fetch).mockResolvedValue(mockNews)

    const result = await getNewsArticles()
    
    expect(result).toEqual(mockNews)
    expect(sanityClient.fetch).toHaveBeenCalledWith(
      expect.any(String),
      {},
      { next: { revalidate: 300 } }
    )
  })

  it('should handle fetch errors', async () => {
    const { sanityClient } = await import('../sanity')
    vi.mocked(sanityClient.fetch).mockRejectedValue(new Error('Fetch failed'))

    await expect(getNewsArticles()).rejects.toThrow('Fetch failed')
  })
})
```

### **Integration Tests**

```typescript
// src/app/api/news/__tests__/route.test.ts
import { describe, it, expect, vi } from 'vitest'
import { GET } from '../route'

vi.mock('@/lib/fetchData', () => ({
  getNewsArticles: vi.fn(),
}))

describe('/api/news', () => {
  it('should return news articles', async () => {
    const mockNews = [
      { _id: '1', title: 'Test News' },
    ]
    
    const { getNewsArticles } = await import('@/lib/fetchData')
    vi.mocked(getNewsArticles).mockResolvedValue(mockNews)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual(mockNews)
  })

  it('should handle errors', async () => {
    const { getNewsArticles } = await import('@/lib/fetchData')
    vi.mocked(getNewsArticles).mockRejectedValue(new Error('Fetch failed'))

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to fetch news')
  })
})
```

---

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [React Query for Client-side Fetching](https://tanstack.com/query/latest)

---

**For API support, please create an issue in the repository or start a discussion.**