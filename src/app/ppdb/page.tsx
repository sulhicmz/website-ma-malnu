// src/app/ppdb/page.tsx
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components/Breadcrumb'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `PPDB - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Penerimaan Peserta Didik Baru di MA Malnu Kananga',
  }
}

export default async function PPDBPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'PPDB', href: '/ppdb' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <h1 className="text-3xl font-bold mb-8 text-center">Penerimaan Peserta Didik Baru</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Pendaftaran Sedang Dibuka!</h2>
            <p className="mb-6">Segera daftarkan putra/putri Anda di MA Malnu Kananga</p>
            <a 
              href="/ppdb/daftar" 
              className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Daftar Sekarang
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Info PPDB</h2>
              <p className="text-gray-700 mb-4">
                Informasi lengkap mengenai tahapan dan persyaratan pendaftaran peserta didik baru.
              </p>
              <a 
                href="/ppdb/info" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Selengkapnya →
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Syarat & Ketentuan</h2>
              <p className="text-gray-700 mb-4">
                Persyaratan wajib yang harus dipenuhi oleh calon peserta didik baru.
              </p>
              <a 
                href="/ppdb/syarat" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Selengkapnya →
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Biaya & Pembayaran</h2>
              <p className="text-gray-700 mb-4">
                Rincian biaya pendaftaran dan tata cara pembayaran yang perlu diketahui.
              </p>
              <a 
                href="/ppdb/biaya" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Selengkapnya →
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Jadwal PPDB</h2>
              <p className="text-gray-700 mb-4">
                Jadwal kegiatan penerimaan peserta didik baru tahun ajaran 2024/2025.
              </p>
              <a 
                href="/ppdb/jadwal" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Selengkapnya →
              </a>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Hasil Seleksi</h2>
            <p className="text-gray-700 mb-4">
              Pengumuman hasil seleksi penerimaan peserta didik baru.
            </p>
            <a 
              href="/ppdb/hasil" 
              className="inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
              Lihat Hasil Seleksi →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}