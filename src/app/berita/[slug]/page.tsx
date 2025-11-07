// src/app/berita/[slug]/page.tsx
import Link from 'next/link'
import { getBerita, getAllBeritaSlugs, getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const berita = await getBerita(params.slug)
  const siteSettings = await getSiteSettings()
  
  if (!berita) {
    return {
      title: 'Berita Tidak Ditemukan',
    }
  }
  
  return {
    title: `${berita.title} - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: berita.excerpt,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllBeritaSlugs()
  return slugs.map((slug: string) => ({
    slug,
  }))
}

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const berita = await getBerita(params.slug)
  
  if (!berita) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Berita Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">
              Maaf, berita yang Anda cari tidak dapat ditemukan.
            </p>
            <Link 
              href="/berita" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Kembali ke Berita
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Berita', href: '/berita' },
    { name: berita.title, href: `/berita/${params.slug}` },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbs} />
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{berita.title}</h1>
            
            <div className="flex items-center text-gray-600 text-sm mb-6">
              <span>
                {berita.author?.name && `Oleh ${berita.author.name}`}
              </span>
              <span className="mx-2">•</span>
              <time dateTime={berita.date}>
                {new Date(berita.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
              {berita.category && (
                <>
                  <span className="mx-2">•</span>
                  <span>{berita.category.title}</span>
                </>
              )}
            </div>
            
            {berita.coverImage && (
              <img 
                src={berita.coverImage} 
                alt={berita.title} 
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
              />
            )}
            
            {berita.excerpt && (
              <p className="text-xl text-gray-700 italic mb-6">
                {berita.excerpt}
              </p>
            )}
          </header>
          
          <div className="prose max-w-none">
            {/* In a real implementation, you would render the body content properly */}
            <p>{berita.body ? 'Konten berita akan ditampilkan di sini.' : 'Konten berita belum tersedia.'}</p>
          </div>
          
          {berita.tags && berita.tags.length > 0 && (
            <footer className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {berita.tags.map((tag: string, index: number) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </article>
      </div>
    </div>
  )
}