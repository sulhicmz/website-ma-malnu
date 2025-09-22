// src/app/page.tsx
import { getSiteSettings, getBeritaList, getPengumumanList } from '@/lib/fetchData'
import { CardBerita } from '@/components/CardBerita'
import { CardGuru } from '@/components/CardGuru'
import { GalleryGrid } from '@/components/GalleryGrid'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: siteSettings?.title || 'MA Malnu Kananga',
    description: siteSettings?.description || 'Website resmi Madrasah Aliyah Malnu Kananga',
    keywords: siteSettings?.keywords || [],
  }
}

export default async function HomePage() {
  const siteSettings = await getSiteSettings()
  const beritaList = await getBeritaList()
  const pengumumanList = await getPengumumanList()
  
  // Get latest 3 berita for homepage
  const latestBerita = beritaList.slice(0, 3)
  
  // Get latest 3 pengumuman for homepage
  const latestPengumuman = pengumumanList.slice(0, 3)
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Selamat Datang di MA Malnu Kananga
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Madrasah Aliyah unggulan dengan kurikulum terkini dan fasilitas modern
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/ppdb" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Daftar Sekarang
            </a>
            <a 
              href="/profil" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Kenali Kami
            </a>
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Berita Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBerita.map((berita: any) => (
              <CardBerita key={berita.slug.current} berita={berita} />
            ))}
          </div>
          <div className="text-center mt-10">
            <a 
              href="/berita" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Lihat Semua Berita
            </a>
          </div>
        </div>
      </section>

      {/* Pengumuman */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pengumuman</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            {latestPengumuman.length > 0 ? (
              <ul className="space-y-4">
                {latestPengumuman.map((pengumuman: any) => (
                  <li key={pengumuman.slug.current} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <a 
                      href={`/pengumuman/${pengumuman.slug.current}`} 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {pengumuman.title}
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      {new Date(pengumuman.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-gray-700 mt-2">{pengumuman.excerpt}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Tidak ada pengumuman saat ini.</p>
            )}
            <div className="text-center mt-8">
              <a 
                href="/pengumuman" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Lihat semua pengumuman →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Galeri Kegiatan</h2>
          <GalleryGrid />
          <div className="text-center mt-10">
            <a 
              href="/galeri" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Lihat Galeri Lengkap
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}