# SEO Implementation for MA Malnu Kananga

This document explains the SEO technical implementation for the MA Malnu Kananga website.

## Files Structure

```
src/
├── lib/
│   └── seo.ts                 # SEO configuration and defaults
├── components/
│   └── seo/
│       ├── OrganizationJSONLD.tsx    # Schema.org Organization markup
│       ├── NewsArticleJSONLD.tsx    # Schema.org NewsArticle markup
│       ├── BreadcrumbJSONLD.tsx     # Schema.org Breadcrumb markup
│       └── MetaTags.tsx             # Meta tags component
├── app/
│   ├── sitemap.ts              # Dynamic sitemap generator
│   ├── page-seo-example.tsx    # Example homepage with SEO
│   └── berita/
│       └── page-seo-example.tsx # Example news article with SEO
public/
├── robots.txt                  # Robots.txt file
└── sitemap.xml                 # Static sitemap fallback
```

## Implementation Details

### 1. Default SEO Configuration

The `src/lib/seo.ts` file contains:
- Default SEO metadata for the entire site
- Page-specific SEO configurations
- Social media SEO settings

### 2. Structured Data (JSON-LD)

Three JSON-LD components are implemented:
- **OrganizationJSONLD**: For the main website entity
- **NewsArticleJSONLD**: For news articles/blog posts
- **BreadcrumbJSONLD**: For breadcrumb navigation

### 3. Meta Tags

The `MetaTags` component handles all essential meta tags:
- Standard meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- Mobile and favicon tags

### 4. Sitemap

Two sitemap implementations:
- Dynamic `src/app/sitemap.ts` for Next.js App Router
- Static `public/sitemap.xml` as fallback

### 5. Robots.txt

Comprehensive robots.txt with:
- Crawler directives
- Sitemap references
- Crawl delay settings
- Specific disallow rules

## Usage Examples

### Homepage Implementation

```tsx
import OrganizationJSONLD from '@/components/seo/OrganizationJSONLD'
import MetaTags from '@/components/seo/MetaTags'
import { pageSEO } from '@/lib/seo'

export default function HomePage() {
  const seoData = pageSEO.home
  
  return (
    <>
      <MetaTags 
        title={seoData.title}
        description={seoData.description}
        image={seoData.image}
      />
      <OrganizationJSONLD />
      
      {/* Your page content */}
    </>
  )
}
```

### News Article Implementation

```tsx
import NewsArticleJSONLD from '@/components/seo/NewsArticleJSONLD'
import BreadcrumbJSONLD from '@/components/seo/BreadcrumbJSONLD'

export default function NewsArticle({ post }) {
  return (
    <>
      <NewsArticleJSONLD
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        dateModified={post.date}
        authorName={post.author.name}
        image={post.imageUrl}
        slug={post.slug}
      />
      
      <BreadcrumbJSONLD items={breadcrumbItems} />
      
      {/* Your article content */}
    </>
  )
}
```

## Testing

Use these tools to validate the SEO implementation:
1. Google Rich Results Test for JSON-LD
2. Google Search Console for crawl errors
3. Screaming Frog for technical SEO
4. PageSpeed Insights for performance