// src/app/search/page.tsx
import Link from 'next/link'
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Pencarian - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Cari informasi di website MA Malnu Kananga',
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = searchParams.q ? String(searchParams.q) : ''
  
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Pencarian', href: '/search' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Hasil Pencarian</h1>
          
          <div className="mb-8">
            <form className="flex">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Cari berita, pengumuman, dll..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg transition duration-300"
              >
                Cari
              </button>
            </form>
          </div>
          
          {query ? (
            <div>
              <p className="text-gray-600 mb-6">
                Menampilkan hasil untuk: <span className="font-bold">&quot;{query}&quot;</span>
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-2">
                    <Link href="/berita/judul-berita" className="text-blue-600 hover:text-blue-800">
                      Judul Berita yang Relevan dengan Pencarian
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    12 April 2024 • Berita
                  </p>
                  <p className="text-gray-700">
                    Ringkasan berita yang relevan dengan kata kunci pencarian Anda...
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-2">
                    <Link href="/pengumuman/judul-pengumuman" className="text-blue-600 hover:text-blue-800">
                      Judul Pengumuman yang Relevan dengan Pencarian
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    10 April 2024 • Pengumuman
                  </p>
                  <p className="text-gray-700">
                    Ringkasan pengumuman yang relevan dengan kata kunci pencarian Anda...
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Masukkan kata kunci di atas untuk memulai pencarian
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}