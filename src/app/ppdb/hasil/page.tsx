// src/app/ppdb/hasil/page.tsx
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components/Breadcrumb'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Hasil Seleksi - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Hasil seleksi penerimaan peserta didik baru di MA Malnu Kananga',
  }
}

export default async function PPDBHasilPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'PPDB', href: '/ppdb' },
    { name: 'Hasil Seleksi', href: '/ppdb/hasil' },
  ]

  // Mock data for demonstration
  const hasilSeleksi = [
    { no: 1, nama: 'Ahmad Rifai', nisn: '1234567890', status: 'Diterima' },
    { no: 2, nama: 'Budi Santoso', nisn: '1234567891', status: 'Diterima' },
    { no: 3, nama: 'Citra Dewi', nisn: '1234567892', status: 'Cadangan' },
    { no: 4, nama: 'Dedi Prasetyo', nisn: '1234567893', status: 'Diterima' },
    { no: 5, nama: 'Eka Putri', nisn: '1234567894', status: 'Tidak Diterima' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg p-8 mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Hasil Seleksi PPDB</h1>
            <p className="mb-6">Tahun Ajaran 2024/2025</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Pengumuman</h2>
              <p className="text-gray-700">
                Berikut adalah hasil seleksi penerimaan peserta didik baru di MA Malnu Kananga. 
                Bagi peserta yang dinyatakan <span className="font-bold text-green-600">Diterima</span>, 
                harap segera melakukan daftar ulang sesuai jadwal yang telah ditentukan.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NISN</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hasilSeleksi.map((peserta) => (
                    <tr key={peserta.no}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{peserta.no}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{peserta.nama}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{peserta.nisn}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          peserta.status === 'Diterima' 
                            ? 'bg-green-100 text-green-800' 
                            : peserta.status === 'Cadangan' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {peserta.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">Keterangan:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><span className="font-medium text-green-600">Diterima</span>: Peserta diterima sebagai siswa baru</li>
                <li><span className="font-medium text-yellow-600">Cadangan</span>: Peserta masuk dalam daftar cadangan</li>
                <li><span className="font-medium text-red-600">Tidak Diterima</span>: Peserta belum dapat diterima</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}