// src/components/seo/MetaTags.tsx
import React from 'react'

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
  const siteTitle = title || 'MA Malnu Kananga - Membentuk Generasi Unggul yang Beriman dan Bertaqwa'
  const siteDescription = description || 'Madrasah Aliyah Negeri Malnu Kananga menyelenggarakan pendidikan berkualitas yang mengintegrasikan nilai-nilai keislaman dengan kurikulum nasional.'
  const siteImage = image || '/images/og-image.jpg'
  const siteUrl = url || 'https://www.malnukananga.sch.id'
  
  return (
    <>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords || 'MA Malnu Kananga, Madrasah Aliyah, Pendidikan Islam, PPDB, Sekolah Islam, Kananga'} />
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
    </>
  )
}