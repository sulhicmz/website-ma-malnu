// src/app/profil/[slug]/page.tsx
import { getPage, getAllPageSlugs, getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

// Filter slugs to only include profil related pages
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs
    .filter((slug: string) => slug.startsWith('profil/'))
    .map((slug: string) => ({
      slug: slug.replace('profil/', ''),
    }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const fullSlug = `profil/${params.slug}`
  const page = await getPage(fullSlug)
  const siteSettings = await getSiteSettings()
  
  if (!page) {
    return {
      title: 'Halaman Profil Tidak Ditemukan',
    }
  }
  
  return {
    title: `${page.title} - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: page.metaDescription,
  }
}

export default async function ProfilPage({ params }: { params: { slug: string } }) {
  const fullSlug = `profil/${params.slug}`
  const page = await getPage(fullSlug)
  
  if (!page) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Halaman Profil Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">
              Maaf, halaman profil yang Anda cari tidak dapat ditemukan.
            </p>
            <a 
              href="/profil" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Kembali ke Profil
            </a>
          </div>
        </div>
      </div>
    )
  }
  
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: page.title, href: `/profil/${params.slug}` },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{page.title}</h1>
            
            {page.publishedAt && (
              <p className="text-gray-600">
                Diperbarui pada {' '}
                <time dateTime={page.publishedAt}>
                  {new Date(page.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </p>
            )}
            
            {page.heroImage && (
              <img 
                src={page.heroImage} 
                alt={page.title} 
                className="w-full h-64 md:h-96 object-cover rounded-lg my-8"
              />
            )}
          </header>
          
          <div className="prose max-w-none">
            {/* In a real implementation, you would render the body content properly */}
            <p>{page.body ? 'Konten halaman profil akan ditampilkan di sini.' : 'Konten halaman profil belum tersedia.'}</p>
          </div>
        </article>
      </div>
    </div>
  )
}