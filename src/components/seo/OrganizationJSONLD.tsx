// src/components/seo/OrganizationJSONLD.tsx
import React from 'react'

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
      "addressRegion": "Luwu Utara",
      "postalCode": "91995",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-481-XXXXXXX",
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
      "@type": "Organization",
      "name": "Kementerian Agama Republik Indonesia"
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