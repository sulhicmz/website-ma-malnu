// src/app/page.tsx
import { getHomePageData } from '@/lib/fetchData'
import dynamic from 'next/dynamic'
import { OrganizationStructuredData, WebsiteStructuredData } from '@/components/seo/StructuredData'
import { reportWebVitals, usePerformanceMonitoring } from '@/lib/webVitals'
import { useEffect } from 'react'

// Dynamic imports untuk komponen berat
const CardBerita = dynamic(() => import('@/components/CardBerita'), {
  loading: () => <CardBeritaSkeleton />,
  ssr: true
})

const CardGuru = dynamic(() => import('@/components/CardGuru'), {
  loading: () => <CardGuruSkeleton />,
  ssr: true
})

const GalleryGrid = dynamic(() => import('@/components/GalleryGrid'), {
  loading: () => <GallerySkeleton />,
  ssr: false // Gallery tidak perlu SSR untuk performa lebih baik
})

// Skeleton components
function CardBeritaSkeleton() {
  return (
    <div className="max-w-sm rounded-lg shadow-md overflow-hidden bg-white animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="h-4 bg-gray-200 rounded-full w-20"></div>
          <div className="h-3 bg-gray-200 rounded ml-3 w-16"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  )
}

function CardGuruSkeleton() {
  return (
    <div className="max-w-xs rounded-lg shadow-md overflow-hidden bg-white animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-5 text-center">
        <div className="h-6 bg-gray-200 rounded mb-1 mx-auto w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 mx-auto w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </div>
    </div>
  )
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg shadow-md animate-pulse">
          <div className="h-48 bg-gray-200"></div>
        </div>
      ))}
    </div>
  )
}

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const { siteSettings } = await getHomePageData()
  
  return {
    title: siteSettings?.title || 'MA Malnu Kananga',
    description: siteSettings?.description || 'Website resmi Madrasah Aliyah Malnu Kananga',
    keywords: siteSettings?.keywords || [],
  }
}

export default async function HomePage() {
  const { siteSettings, beritaList, pengumumanList } = await getHomePageData()
  
  return (
    <HomePageContent 
      siteSettings={siteSettings}
      beritaList={beritaList}
      pengumumanList={pengumumanList}
    />
  )
}

function HomePageContent({ siteSettings, beritaList, pengumumanList }: any) {
  useEffect(() => {
    // Initialize Web Vitals monitoring
    reportWebVitals()
    
    // Initialize performance monitoring
    usePerformanceMonitoring()
  }, [])

  return (
  
  // Get latest 3 berita for homepage
  const latestBerita = beritaList.slice(0, 3)
  
  // Get latest 3 pengumuman for homepage
  const latestPengumuman = pengumumanList.slice(0, 3)
  
  return (
    <>
      {/* Structured Data */}
      <OrganizationStructuredData
        name={siteSettings?.title || 'MA Malnu Kananga'}
        description={siteSettings?.description || 'Madrasah Aliyah unggulan dengan kurikulum terkini dan fasilitas modern'}
        url="https://ma-malnu-kananga.sch.id"
        logo="/logo.png"
        contactPoint={{
          telephone: "+62-xxx-xxxx-xxxx",
          contactType: "admissions"
        }}
        address={{
          streetAddress: "Jl. Pendidikan No. 123",
          addressLocality: "Kananga",
          addressRegion: "Jawa Barat",
          postalCode: "46196",
          addressCountry: "ID"
        }}
      />
      
      <WebsiteStructuredData
        name={siteSettings?.title || 'MA Malnu Kananga'}
        description={siteSettings?.description || 'Madrasah Aliyah unggulan dengan kurikulum terkini dan fasilitas modern'}
        url="https://ma-malnu-kananga.sch.id"
      />
      
      <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Selamat Datang di MA Malnu Kananga
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Madrasah Aliyah unggulan dengan kurikulum terkini dan fasilitas modern
          </p>
          <nav aria-label="Primary navigation" className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/ppdb" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            >
              Daftar Sekarang
            </a>
            <a 
              href="/profil" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-bold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            >
              Kenali Kami
            </a>
          </nav>
        </div>
      </header>

{/* Berita Terbaru */}
      <section className="py-16 bg-gray-50" aria-labelledby="berita-heading">
        <div className="container mx-auto px-4">
          <h2 id="berita-heading" className="text-3xl font-bold text-center mb-12">Berita Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBerita.map((berita: any) => (
              <CardBerita 
                key={berita.slug.current} 
                category={berita.category}
                date={new Date(berita.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
                title={berita.title}
                excerpt={berita.excerpt}
                imageUrl={berita.mainImage?.asset?.url || '/placeholder-image.jpg'}
                imageAlt={berita.mainImage?.alt || berita.title}
                slug={berita.slug.current}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <a 
              href="/berita" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Lihat semua berita terbaru"
            >
              Lihat Semua Berita
            </a>
          </div>
        </div>
      </section>

{/* Pengumuman */}
      <section className="py-16" aria-labelledby="pengumuman-heading">
        <div className="container mx-auto px-4">
          <h2 id="pengumuman-heading" className="text-3xl font-bold text-center mb-12">Pengumuman</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            {latestPengumuman.length > 0 ? (
              <ul className="space-y-4" role="list">
                {latestPengumuman.map((pengumuman: any) => (
                  <li key={pengumuman.slug.current} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <article>
                      <h3>
                        <a 
                          href={`/pengumuman/${pengumuman.slug.current}`} 
                          className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                        >
                          {pengumuman.title}
                        </a>
                      </h3>
                      <time dateTime={pengumuman.date} className="text-gray-600 text-sm mt-1 block">
                        {new Date(pengumuman.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </time>
                      <p className="text-gray-700 mt-2">{pengumuman.excerpt}</p>
                    </article>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Tidak ada pengumuman saat ini.</p>
            )}
            <div className="text-center mt-8">
              <a 
                href="/pengumuman" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="Lihat semua pengumuman"
              >
                Lihat semua pengumuman →
              </a>
            </div>
          </div>
        </div>
      </section>

{/* Galeri */}
      <section className="py-16 bg-gray-50" aria-labelledby="galeri-heading">
        <div className="container mx-auto px-4">
          <h2 id="galeri-heading" className="text-3xl font-bold text-center mb-12">Galeri Kegiatan</h2>
          <GalleryGrid 
            images={[
              { src: '/placeholder-gallery-1.jpg', alt: 'Kegiatan pembelajaran di kelas', caption: 'Pembelajaran interaktif' },
              { src: '/placeholder-gallery-2.jpg', alt: 'Kegiatan ekstrakurikuler', caption: 'Ekstrakurikuler pramuka' },
              { src: '/placeholder-gallery-3.jpg', alt: 'Perpustakaan sekolah', caption: 'Fasilitas perpustakaan' },
              { src: '/placeholder-gallery-4.jpg', alt: 'Laboratorium komputer', caption: 'Lab komputer modern' },
              { src: '/placeholder-gallery-5.jpg', alt: 'Lapangan olahraga', caption: 'Fasilitas olahraga' },
              { src: '/placeholder-gallery-6.jpg', alt: 'Kegiatan seni budaya', caption: 'Pentas seni tahunan' }
            ]}
            columns={3}
          />
          <div className="text-center mt-10">
            <a 
              href="/galeri" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Lihat galeri kegiatan lengkap"
            >
              Lihat Galeri Lengkap
            </a>
          </div>
        </div>
</section>
    </div>
    </>
  )
}