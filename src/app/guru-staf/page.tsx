// src/app/guru-staf/page.tsx
import { getGuruList, getSiteSettings } from '@/lib/fetchData'
import { CardGuru } from '@/components'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Guru & Staf - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Daftar guru dan staf pengajar di MA Malnu Kananga',
  }
}

export default async function GuruStafPage() {
  const guruList = await getGuruList()
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Guru & Staf', href: '/guru-staf' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbs} />
        
        <h1 className="text-3xl font-bold mb-8 text-center">Guru & Staf Pengajar</h1>
        
        {guruList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guruList.map((guru: any) => (
              <CardGuru key={guru.slug.current} guru={guru} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada data guru dan staf tersedia.</p>
          </div>
        )}
      </div>
    </div>
  )
}