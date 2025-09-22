// src/app/layout-with-seo.tsx
import React from 'react'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import GoogleTagManager from '@/components/GoogleTagManager'
import MetaTags from '@/components/seo/MetaTags'
import OrganizationJSONLD from '@/components/seo/OrganizationJSONLD'
import { defaultSEO } from '@/lib/seo'

// This is an example of how to enhance your existing layout with SEO components
export const metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
}

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
        <OrganizationJSONLD />
        <GoogleTagManager />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}