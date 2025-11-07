// src/app/[slug]/page.tsx
import Link from 'next/link'
import { getPage, getAllPageSlugs, getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug)
  const siteSettings = await getSiteSettings()
  
  if (!page) {
    return {
      title: 'Halaman Tidak Ditemukan',
    }
  }
  
  return {
    title: `${page.title} - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: page.metaDescription,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs.map((slug: string) => ({
    slug,
  }))
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug)
  
  if (!page) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Halaman Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">
              Maaf, halaman yang Anda cari tidak dapat ditemukan.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  // Create breadcrumbs based on the slug structure
  const slugParts = params.slug.split('/')
  let breadcrumbs = [{ name: 'Beranda', href: '/' }]
  
  let currentPath = ''
  slugParts.forEach((part, index) => {
    currentPath += `/${part}`
    // Convert kebab-case to title case
    const name = part.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    
    breadcrumbs.push({
      name,
      href: currentPath
    })
  })

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbs} />
        
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
            <p>{page.body ? 'Konten halaman akan ditampilkan di sini.' : 'Konten halaman belum tersedia.'}</p>
          </div>
        </article>
      </div>
    </div>
  )
}