// src/app/akademik/page.tsx
import Link from 'next/link'
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Akademik - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Informasi akademik Madrasah Aliyah Malnu Kananga',
  }
}

export default async function AkademikPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Akademik', href: '/akademik' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbs} />
        
        <h1 className="text-3xl font-bold mb-8 text-center">Akademik</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Kurikulum</h2>
            <p className="text-gray-700">
              Kurikulum pendidikan yang diterapkan di MA Malnu Kananga mengacu pada standar 
              nasional yang telah ditetapkan oleh Kementerian Agama.
            </p>
            <Link 
              href="/akademik/kurikulum" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Selengkapnya →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Ekstrakurikuler</h2>
            <p className="text-gray-700">
              Program ekstrakurikuler yang beragam untuk mengembangkan bakat dan minat siswa 
              di bidang non-akademik.
            </p>
            <Link 
              href="/akademik/ekstrakurikuler" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Selengkapnya →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Jadwal Pelajaran</h2>
            <p className="text-gray-700">
              Jadwal pelajaran yang terstruktur untuk memastikan proses pembelajaran berjalan 
              dengan efektif dan efisien.
            </p>
            <Link 
              href="/akademik/jadwal" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Selengkapnya →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Kalender Akademik</h2>
            <p className="text-gray-700">
              Kalender akademik tahunan yang mencakup semua kegiatan penting selama tahun ajaran.
            </p>
            <Link 
              href="/akademik/kalender" 
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