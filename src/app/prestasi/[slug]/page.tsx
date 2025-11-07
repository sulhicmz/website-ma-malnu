// src/app/prestasi/[slug]/page.tsx
import Link from 'next/link'
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const siteSettings = await getSiteSettings()
  
  // Convert kebab-case to title case
  const prestasiName = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  return {
    title: `${prestasiName} - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: `Detail prestasi ${prestasiName} di MA Malnu Kananga`,
  }
}

export default async function PrestasiDetailPage({ params }: { params: { slug: string } }) {
  // Convert kebab-case to title case
  const prestasiName = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Prestasi', href: '/prestasi' },
    { name: prestasiName, href: `/prestasi/${params.slug}` },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{prestasiName}</h1>
            
            <div className="flex items-center text-gray-600 text-sm mb-6">
              <span>
                12 April 2024
              </span>
              <span className="mx-2">•</span>
              <span>Lomba Debat Tingkat Provinsi</span>
            </div>
            
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-6">
              <span className="text-gray-500">Foto prestasi</span>
            </div>
            
            <p className="text-xl text-gray-700 italic">
              Tim debat MA Malnu Kananga berhasil meraih juara 1 dalam kompetisi debat tingkat provinsi
            </p>
          </header>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Detail Prestasi</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-700 mb-1">Nama Lomba</h3>
                <p>Lomba Debat Tingkat Provinsi</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700 mb-1">Tanggal Pelaksanaan</h3>
                <p>10-12 April 2024</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700 mb-1">Tingkat</h3>
                <p>Provinsi</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700 mb-1">Peringkat</h3>
                <p>Juara 1</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-700 mb-2">Peserta</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ahmad Rifai (Ketua Tim)</li>
                <li>Budi Santoso (Anggota Tim)</li>
                <li>Citra Dewi (Anggota Tim)</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Deskripsi</h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                Tim debat MA Malnu Kananga berhasil meraih juara 1 dalam kompetisi debat tingkat provinsi 
                yang diadakan pada tanggal 10-12 April 2024. Kompetisi ini diikuti oleh 25 tim dari berbagai 
                sekolah se-provinsi.
              </p>
              
              <p>
                Dengan membawa tema &quot;Pendidikan Karakter di Era Digital&quot;, tim kami berhasil meyakinkan dewan 
                juri dengan argumen yang kuat dan presentasi yang memukau. Prestasi ini merupakan bukti dari 
                dedikasi dan kerja keras para siswa serta bimbingan dari para pelatih.
              </p>
              
              <p>
                Kami mengucapkan terima kasih kepada semua pihak yang telah mendukung tim kami dalam 
                perjalanan panjang menuju prestasi ini. Semoga prestasi ini dapat memotivasi siswa-siswi 
                kami untuk terus berkarya dan berprestasi di berbagai bidang.
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Link 
              href="/prestasi" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Prestasi
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}