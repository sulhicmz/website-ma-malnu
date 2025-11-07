// src/app/pengumuman/[slug]/page.tsx
import Link from 'next/link'
import { getPengumuman, getAllPengumumanSlugs, getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const pengumuman = await getPengumuman(params.slug)
  const siteSettings = await getSiteSettings()
  
  if (!pengumuman) {
    return {
      title: 'Pengumuman Tidak Ditemukan',
    }
  }
  
  return {
    title: `${pengumuman.title} - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: pengumuman.excerpt,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPengumumanSlugs()
  return slugs.map((slug: string) => ({
    slug,
  }))
}

export default async function PengumumanDetailPage({ params }: { params: { slug: string } }) {
  const pengumuman = await getPengumuman(params.slug)
  
  if (!pengumuman) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Pengumuman Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">
              Maaf, pengumuman yang Anda cari tidak dapat ditemukan.
            </p>
            <Link 
              href="/pengumuman" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Kembali ke Pengumuman
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Pengumuman', href: '/pengumuman' },
    { name: pengumuman.title, href: `/pengumuman/${params.slug}` },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbs} />
        
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{pengumuman.title}</h1>
            
            <div className="flex flex-wrap items-center text-gray-600 text-sm mb-6">
              <time dateTime={pengumuman.date}>
                {new Date(pengumuman.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
              {pengumuman.deadline && (
                <>
                  <span className="mx-2">•</span>
                  <span>
                    Batas: {new Date(pengumuman.deadline).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </>
              )}
              {pengumuman.category && (
                <>
                  <span className="mx-2">•</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {pengumuman.category}
                  </span>
                </>
              )}
            </div>
            
            {pengumuman.excerpt && (
              <p className="text-xl text-gray-700 italic mb-6">
                {pengumuman.excerpt}
              </p>
            )}
          </header>
          
          <div className="prose max-w-none mb-8">
            {/* In a real implementation, you would render the body content properly */}
            <p>Konten pengumuman akan ditampilkan di sini.</p>
          </div>
          
          {pengumuman.document && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link 
                href={pengumuman.document} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Unduh Dokumen
              </Link>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}