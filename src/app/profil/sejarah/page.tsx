// src/app/profil/sejarah/page.tsx
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components/Breadcrumb'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Sejarah - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Sejarah berdirinya Madrasah Aliyah Malnu Kananga',
  }
}

export default async function SejarahPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Sejarah', href: '/profil/sejarah' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sejarah MA Malnu Kananga</h1>
          </header>
          
          <div className="prose max-w-none bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">
              Madrasah Aliyah Malnu Kananga didirikan pada tahun 1980 dengan tujuan memberikan 
              pendidikan berkualitas berbasis nilai-nilai agama Islam. Berawal dari sebuah lembaga 
              pendidikan sederhana, MA Malnu Kananga telah berkembang menjadi salah satu madrasah 
              unggulan di wilayahnya.
            </p>
            
            <p className="mb-4">
              Sejak awal berdirinya, sekolah ini berkomitmen untuk mencetak generasi yang tidak 
              hanya unggul dalam akademik tetapi juga memiliki akhlak mulia dan kepedulian sosial 
              yang tinggi. Kurikulum yang dikembangkan selalu mengedepankan integrasi antara ilmu 
              pengetahuan umum dan nilai-nilai keislaman.
            </p>
            
            <p className="mb-4">
              Dengan dukungan pemerintah daerah dan komunitas sekitar, MA Malnu Kananga terus 
              melakukan peningkatan kualitas pendidikan melalui penambahan fasilitas, peningkatan 
              kompetensi guru, dan pengembangan kurikulum yang relevan dengan perkembangan zaman.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Perkembangan</h2>
            
            <p className="mb-4">
              Dalam perjalanannya, MA Malnu Kananga telah melahirkan banyak alumni yang berhasil 
              di berbagai bidang, baik dalam dunia pendidikan, pemerintahan, dunia usaha, maupun 
              dunia kepesantrenan. Keberhasilan ini menjadi bukti bahwa pendekatan pendidikan 
              yang holistik dan berbasis nilai telah memberikan hasil yang positif.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Visi Masa Depan</h2>
            
            <p>
              Ke depan, MA Malnu Kananga berkomitmen untuk terus menjadi lembaga pendidikan unggulan 
              yang menghasilkan generasi berakhlak mulia, berprestasi, dan siap menghadapi tantangan 
              global dengan tetap mempertahankan nilai-nilai luhur keislaman.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}