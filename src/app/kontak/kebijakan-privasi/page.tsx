// src/app/kontak/kebijakan-privasi/page.tsx
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Kebijakan Privasi - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Kebijakan privasi website MA Malnu Kananga',
  }
}

export default async function KebijakanPrivasiPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Kontak', href: '/kontak' },
    { name: 'Kebijakan Privasi', href: '/kontak/kebijakan-privasi' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Kebijakan Privasi</h1>
            <p className="text-gray-600">Berlaku sejak 1 Januari 2024</p>
          </header>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="prose max-w-none">
              <h2>1. Pendahuluan</h2>
              <p>
                Kebijakan Privasi ini menjelaskan bagaimana MA Malnu Kananga ("kami", "sekolah") 
                mengumpulkan, menggunakan, membagikan, dan melindungi informasi pribadi Anda 
                saat mengunjungi website kami.
              </p>
              
              <h2>2. Informasi yang Kami Kumpulkan</h2>
              <p>Kami dapat mengumpulkan informasi berikut:</p>
              <ul>
                <li>Informasi yang Anda berikan secara langsung (nama, email, nomor telepon)</li>
                <li>Informasi yang dikumpulkan secara otomatis (alamat IP, jenis browser, waktu kunjungan)</li>
                <li>Informasi dari formulir kontak atau pendaftaran</li>
              </ul>
              
              <h2>3. Cara Kami Menggunakan Informasi</h2>
              <p>Informasi yang kami kumpulkan digunakan untuk:</p>
              <ul>
                <li>Menyediakan dan meningkatkan layanan website</li>
                <li>Menanggapi pertanyaan dan permintaan Anda</li>
                <li>Mengirimkan informasi penting tentang sekolah</li>
                <li>Mematuhi kewajiban hukum</li>
              </ul>
              
              <h2>4. Perlindungan Informasi</h2>
              <p>
                Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi 
                pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.
              </p>
              
              <h2>5. Hak Anda</h2>
              <p>Anda memiliki hak untuk:</p>
              <ul>
                <li>Mengakses informasi pribadi Anda yang kami miliki</li>
                <li>Memperbaiki informasi yang tidak akurat</li>
                <li>Meminta penghapusan informasi pribadi Anda</li>
                <li>Menarik persetujuan yang telah diberikan</li>
              </ul>
              
              <h2>6. Perubahan pada Kebijakan Ini</h2>
              <p>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan 
                akan dipublikasikan di halaman ini dengan tanggal berlaku yang diperbarui.
              </p>
              
              <h2>7. Hubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami 
                melalui informasi kontak yang tersedia di halaman <a href="/kontak" className="text-blue-600 hover:text-blue-800">Kontak</a>.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}