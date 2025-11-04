interface OrganizationData {
  name: string
  description: string
  url: string
  logo?: string
  contactPoint?: {
    telephone: string
    contactType: string
  }
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
}

interface ArticleData {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: string
  publisher: string
}

export function OrganizationStructuredData({ name, description, url, logo, contactPoint, address }: OrganizationData) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name,
    description,
    url,
    logo,
    contactPoint,
    address,
    sameAs: [
      // Social media URLs
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function ArticleStructuredData({ headline, description, image, datePublished, dateModified, author, publisher }: ArticleData) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description,
    image: [image],
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: author
    },
    publisher: {
      "@type": "Organization",
      name: publisher
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": typeof window !== 'undefined' ? window.location.href : ''
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData({ name, description, url }: { name: string; description: string; url: string }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function BreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}