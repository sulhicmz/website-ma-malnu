// src/app/galeri/[slug]/page.tsx
import Link from 'next/link'
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const siteSettings = await getSiteSettings()
  
  // Convert kebab-case to title case
  const albumName = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  return {
    title: `${albumName} - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: `Album foto ${albumName} di MA Malnu Kananga`,
  }
}

export default async function GaleriAlbumPage({ params }: { params: { slug: string } }) {
  // Convert kebab-case to title case
  const albumName = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Galeri', href: '/galeri' },
    { name: albumName, href: `/galeri/${params.slug}` },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <article className="max-w-6xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{albumName}</h1>
            <p className="text-gray-600">Album foto kegiatan sekolah</p>
          </header>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Foto {item}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-between">
            <Link 
              href="/galeri" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Galeri
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}