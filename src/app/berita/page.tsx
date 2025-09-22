// src/app/berita/page.tsx
import { getBeritaList, getSiteSettings } from '@/lib/fetchData'
import { CardBerita } from '@/components/CardBerita'
import { Pagination } from '@/components/Pagination'
import { Breadcrumb } from '@/components/Breadcrumb'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Berita - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Berita terbaru seputar kegiatan sekolah',
  }
}

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const beritaPerPage = 6
  const beritaList = await getBeritaList()
  
  // Calculate pagination
  const totalPages = Math.ceil(beritaList.length / beritaPerPage)
  const start = (page - 1) * beritaPerPage
  const end = start + beritaPerPage
  const paginatedBerita = beritaList.slice(start, end)
  
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Berita', href: '/berita' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <h1 className="text-3xl font-bold mb-8 text-center">Berita Sekolah</h1>
        
        {paginatedBerita.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedBerita.map((berita: any) => (
                <CardBerita key={berita.slug.current} berita={berita} />
              ))}
            </div>
            
            <Pagination 
              currentPage={page} 
              totalPages={totalPages} 
              baseUrl="/berita" 
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada berita tersedia saat ini.</p>
          </div>
        )}
      </div>
    </div>
  )
}