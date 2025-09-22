// src/app/prestasi/page.tsx
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components/Breadcrumb'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Prestasi - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Prestasi yang telah diraih oleh siswa MA Malnu Kananga',
  }
}

export default async function PrestasiPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Prestasi', href: '/prestasi' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <h1 className="text-3xl font-bold mb-8 text-center">Prestasi Sekolah</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Prestasi Terbaru</h2>
            <p className="mb-6">Tim debat MA Malnu Kananga berhasil meraih juara 1 dalam kompetisi debat tingkat provinsi</p>
            <span className="inline-block bg-white text-orange-600 font-bold py-2 px-4 rounded">
              April 2024
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Prestasi Akademik</h2>
              <p className="text-gray-700 mb-4">
                Prestasi dalam bidang akademik seperti olimpiade, lomba matematika, dan lainnya.
              </p>
              <a 
                href="/prestasi/akademik" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Lihat Prestasi →
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Prestasi Non-Akademik</h2>
              <p className="text-gray-700 mb-4">
                Prestasi dalam bidang non-akademik seperti olahraga, seni, dan kepramukaan.
              </p>
              <a 
                href="/prestasi/non-akademik" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Lihat Prestasi →
              </a>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Galeri Prestasi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Foto {item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}