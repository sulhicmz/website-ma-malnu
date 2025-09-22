// src/app/layout.tsx
import React from 'react'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import GoogleTagManager from '@/components/GoogleTagManager'

export const metadata = {
  title: 'MA Malnu Kananga',
  description: 'Website resmi Madrasah Aliyah Malnu Kananga',
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
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}