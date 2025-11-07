// src/app/profil/page.tsx
import Link from 'next/link'
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Profil Sekolah - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Profil lengkap Madrasah Aliyah Malnu Kananga',
  }
}

export default async function ProfilPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <h1 className="text-3xl font-bold mb-8 text-center">Profil Sekolah</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Sejarah</h2>
            <p className="text-gray-700">
              MA Malnu Kananga didirikan pada tahun 1980 dengan tujuan memberikan 
              pendidikan berkualitas berbasis nilai-nilai agama.
            </p>
            <Link 
              href="/profil/sejarah" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Selengkapnya →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Visi & Misi</h2>
            <p className="text-gray-700">
              Menjadi lembaga pendidikan unggulan yang menghasilkan generasi berakhlak 
              mulia dan berprestasi.
            </p>
            <Link 
              href="/profil/visi-misi" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Selengkapnya →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Fasilitas</h2>
            <p className="text-gray-700">
              Fasilitas pembelajaran yang lengkap dan nyaman untuk mendukung proses 
              belajar mengajar yang optimal.
            </p>
            <Link 
              href="/profil/fasilitas" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Selengkapnya →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Struktur Organisasi</h2>
            <p className="text-gray-700">
              Struktur organisasi yang jelas dan efektif untuk memastikan tata kelola 
              sekolah yang baik.
            </p>
            <Link 
              href="/profil/struktur" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Selengkapnya →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}