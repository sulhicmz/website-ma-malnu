// src/app/pengumuman/page.tsx
import { getPengumumanList, getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'
import { Pagination } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Pengumuman - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Pengumuman terbaru dari MA Malnu Kananga',
  }
}

export default async function PengumumanPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const pengumumanPerPage = 10
  const pengumumanList = await getPengumumanList()
  
  // Calculate pagination
  const totalPages = Math.ceil(pengumumanList.length / pengumumanPerPage)
  const start = (page - 1) * pengumumanPerPage
  const end = start + pengumumanPerPage
  const paginatedPengumuman = pengumumanList.slice(start, end)
  
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Pengumuman', href: '/pengumuman' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbs} />
        
        <h1 className="text-3xl font-bold mb-8 text-center">Pengumuman Sekolah</h1>
        
        {paginatedPengumuman.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
              <ul className="space-y-6">
                {paginatedPengumuman.map((pengumuman: any) => (
                  <li key={pengumuman.slug.current} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <a 
                      href={`/pengumuman/${pengumuman.slug.current}`} 
                      className="text-blue-600 hover:text-blue-800 font-medium text-xl"
                    >
                      {pengumuman.title}
                    </a>
                    <div className="flex flex-wrap items-center text-gray-600 text-sm mt-2 mb-3">
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
                          <span>Batas: {new Date(pengumuman.deadline).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}</span>
                        </>
                      )}
                      {pengumuman.category && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{pengumuman.category}</span>
                        </>
                      )}
                    </div>
                    <p className="text-gray-700">{pengumuman.excerpt}</p>
                    {pengumuman.document && (
                      <a 
                        href={pengumuman.document} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800"
                      >
                        Unduh dokumen →
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <Pagination 
              currentPage={page} 
              totalPages={totalPages} 
              baseUrl="/pengumuman" 
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada pengumuman tersedia saat ini.</p>
          </div>
        )}
      </div>
    </div>
  )
}