// src/app/galeri/page.tsx
import Link from 'next/link'
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'
import { GalleryGrid } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Galeri - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Dokumentasi kegiatan sekolah di MA Malnu Kananga',
  }
}

export default async function GaleriPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Galeri', href: '/galeri' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <h1 className="text-3xl font-bold mb-8 text-center">Galeri Kegiatan</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Foto Kegiatan</h2>
            <GalleryGrid />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Video Dokumentasi</h2>
              <p className="text-gray-700 mb-4">
                Kumpulan video dokumentasi kegiatan sekolah sepanjang tahun.
              </p>
              <Link 
                href="/galeri/video" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Lihat Video →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Galeri Khusus</h2>
              <p className="text-gray-700 mb-4">
                Album khusus untuk kegiatan-kegiatan tertentu seperti perayaan hari besar.
              </p>
              <Link 
                href="/galeri/khusus" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Lihat Album →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}