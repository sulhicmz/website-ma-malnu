// src/components/seo/NewsArticleJSONLD.tsx
import React from 'react'

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
    "keywords": "pendidikan, sekolah, madrasah, berita, MA Malnu Kananga"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}