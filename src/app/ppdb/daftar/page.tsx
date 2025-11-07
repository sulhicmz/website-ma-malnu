// src/app/ppdb/daftar/page.tsx
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Formulir Pendaftaran - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Formulir pendaftaran peserta didik baru di MA Malnu Kananga',
  }
}

export default async function PPDBDaftarPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'PPDB', href: '/ppdb' },
    { name: 'Formulir Pendaftaran', href: '/ppdb/daftar' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbs} />
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-8 mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Formulir Pendaftaran PPDB</h1>
            <p className="mb-6">Tahun Ajaran 2024/2025</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Data Calon Siswa</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nama-lengkap" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      id="nama-lengkap"
                      name="nama-lengkap"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="nisn" className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
                    <input
                      type="text"
                      id="nisn"
                      name="nisn"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tempat-lahir" className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                    <input
                      type="text"
                      id="tempat-lahir"
                      name="tempat-lahir"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tanggal-lahir" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                    <input
                      type="date"
                      id="tanggal-lahir"
                      name="tanggal-lahir"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="jenis-kelamin" className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                    <select
                      id="jenis-kelamin"
                      name="jenis-kelamin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="laki-laki">Laki-laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="agama" className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
                    <select
                      id="agama"
                      name="agama"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Pilih Agama</option>
                      <option value="islam">Islam</option>
                      <option value="kristen-protestan">Kristen Protestan</option>
                      <option value="kristen-katolik">Kristen Katolik</option>
                      <option value="hindu">Hindu</option>
                      <option value="budha">Budha</option>
                      <option value="khonghucu">Khonghucu</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Data Orang Tua</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nama-ayah" className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
                    <input
                      type="text"
                      id="nama-ayah"
                      name="nama-ayah"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="nama-ibu" className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
                    <input
                      type="text"
                      id="nama-ibu"
                      name="nama-ibu"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pekerjaan-ayah" className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Ayah</label>
                    <input
                      type="text"
                      id="pekerjaan-ayah"
                      name="pekerjaan-ayah"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pekerjaan-ibu" className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Ibu</label>
                    <input
                      type="text"
                      id="pekerjaan-ibu"
                      name="pekerjaan-ibu"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Data Kontak</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                    <textarea
                      id="alamat"
                      name="alamat"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <label htmlFor="telepon" className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                      <input
                        type="tel"
                        id="telepon"
                        name="telepon"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
                >
                  Daftar Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}