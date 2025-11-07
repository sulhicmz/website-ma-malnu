// src/app/ppdb/syarat/page.tsx
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Syarat & Ketentuan - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Syarat dan ketentuan pendaftaran peserta didik baru di MA Malnu Kananga',
  }
}

export default async function PPDBSyaratPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'PPDB', href: '/ppdb' },
    { name: 'Syarat & Ketentuan', href: '/ppdb/syarat' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Syarat & Ketentuan PPDB</h1>
            <p className="text-gray-600">Tahun Ajaran 2024/2025</p>
          </header>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Persyaratan Umum</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Warga Negara Indonesia (WNI)</li>
              <li>Beragama Islam</li>
              <li>Berusia maksimal 21 tahun pada tanggal 1 Juli 2024</li>
              <li>Sehat jasmani dan rohani</li>
              <li>Berkelakuan baik dan tidak pernah terlibat tindak pidana</li>
              <li>Memiliki NISN (Nomor Induk Siswa Nasional)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Dokumen yang Diperlukan</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Fotokopi Kartu Keluarga (KK) 2 lembar</li>
              <li>Fotokopi Akta Kelahiran 2 lembar</li>
              <li>Fotokopi KTP Orang Tua/Wali 2 lembar</li>
              <li>Fotokopi Ijazah/SKL SMP/MTs 2 lembar</li>
              <li>Fotokopi Nilai Rapor semester 1-5 (dilegalisir) 2 lembar</li>
              <li>Pas foto berwarna ukuran 3x4 (4 lembar) dan 2x3 (2 lembar)</li>
              <li>Surat keterangan domisili (bagi yang bukan warga setempat)</li>
              <li>Surat keterangan tidak mampu dari kelurahan (bagi yang berkebutuhan khusus)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Ketentuan Tambahan</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Siswa wajib mengikuti tes seleksi yang ditetapkan sekolah</li>
              <li>Orang tua/wali wajib menghadiri kegiatan orientasi bagi calon siswa baru</li>
              <li>Biaya pendaftaran sebesar Rp 150.000,- (dibayar saat pendaftaran)</li>
              <li>Biaya daftar ulang sebesar Rp 2.500.000,- (dibayar saat dinyatakan diterima)</li>
              <li>Seluruh dokumen harus diserahkan dalam bentuk fisik saat daftar ulang</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-800">Catatan Penting</h2>
            <ul className="list-disc pl-5 space-y-2 text-blue-700">
              <li>Semua dokumen harus dilegalisir oleh pihak yang berwenang</li>
              <li>Dokumen yang tidak lengkap akan menyebabkan pendaftaran ditolak</li>
              <li>Keputusan panitia PPDB bersifat final dan tidak dapat diganggu gugat</li>
              <li>Jadwal dan ketentuan dapat berubah sewaktu-waktu, mohon pantau website ini</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  )
}