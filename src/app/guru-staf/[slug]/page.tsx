// src/app/guru-staf/[slug]/page.tsx
import { getGuru, getAllGuruSlugs, getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const guru = await getGuru(params.slug)
  const siteSettings = await getSiteSettings()
  
  if (!guru) {
    return {
      title: 'Guru Tidak Ditemukan',
    }
  }
  
  return {
    title: `${guru.name} - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: `Profil ${guru.name} di MA Malnu Kananga`,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllGuruSlugs()
  return slugs.map((slug: string) => ({
    slug,
  }))
}

export default async function GuruDetailPage({ params }: { params: { slug: string } }) {
  const guru = await getGuru(params.slug)
  
  if (!guru) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Guru Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">
              Maaf, data guru yang Anda cari tidak dapat ditemukan.
            </p>
            <a 
              href="/guru-staf" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Kembali ke Daftar Guru
            </a>
          </div>
        </div>
      </div>
    )
  }
  
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Guru & Staf', href: '/guru-staf' },
    { name: guru.name, href: `/guru-staf/${params.slug}` },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <article className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {guru.photo && (
              <img 
                src={guru.photo} 
                alt={guru.name} 
                className="w-full h-64 object-cover"
              />
            )}
            
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">{guru.name}</h1>
              
              {guru.position && (
                <p className="text-xl text-blue-600 mb-4">{guru.position}</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {guru.subject && (
                  <div>
                    <h2 className="font-bold text-gray-700 mb-1">Mata Pelajaran</h2>
                    <p>{guru.subject}</p>
                  </div>
                )}
                
                {guru.education && (
                  <div>
                    <h2 className="font-bold text-gray-700 mb-1">Pendidikan</h2>
                    <p>{guru.education}</p>
                  </div>
                )}
                
                {guru.experience && (
                  <div>
                    <h2 className="font-bold text-gray-700 mb-1">Pengalaman Mengajar</h2>
                    <p>{guru.experience}</p>
                  </div>
                )}
                
                {guru.email && (
                  <div>
                    <h2 className="font-bold text-gray-700 mb-1">Email</h2>
                    <p>{guru.email}</p>
                  </div>
                )}
                
                {guru.phone && (
                  <div>
                    <h2 className="font-bold text-gray-700 mb-1">Telepon</h2>
                    <p>{guru.phone}</p>
                  </div>
                )}
              </div>
              
              {guru.bio && (
                <div className="mt-6">
                  <h2 className="font-bold text-gray-700 mb-2">Biografi</h2>
                  <p className="text-gray-700 whitespace-pre-line">{guru.bio}</p>
                </div>
              )}
              
              {guru.socialMedia && guru.socialMedia.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-bold text-gray-700 mb-2">Media Sosial</h2>
                  <div className="flex space-x-4">
                    {guru.socialMedia.map((social: any, index: number) => (
                      <a 
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}