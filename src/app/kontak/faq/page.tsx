// src/app/kontak/faq/page.tsx
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `FAQ - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Pertanyaan yang sering diajukan di MA Malnu Kananga',
  }
}

export default async function FAQPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Kontak', href: '/kontak' },
    { name: 'FAQ', href: '/kontak/faq' },
  ]

  // Mock FAQ data
  const faqs = [
    {
      question: "Bagaimana cara mendaftar di MA Malnu Kananga?",
      answer: "Pendaftaran dapat dilakukan secara online melalui website kami di bagian PPDB atau datang langsung ke sekolah."
    },
    {
      question: "Apa saja persyaratan pendaftaran?",
      answer: "Persyaratan pendaftaran meliputi fotokopi ijazah, nilai rapor, akte kelahiran, kartu keluarga, dan pas foto."
    },
    {
      question: "Kapan batas akhir pendaftaran?",
      answer: "Batas akhir pendaftaran ditetapkan setiap tahun sesuai dengan kalender pendidikan. Silakan cek halaman PPDB untuk informasi lebih lanjut."
    },
    {
      question: "Berapa biaya pendidikan di MA Malnu Kananga?",
      answer: "Biaya pendidikan di MA Malnu Kananga terjangkau dan sesuai dengan ketentuan yang ditetapkan oleh Kementerian Agama."
    },
    {
      question: "Apakah sekolah menyediakan fasilitas asrama?",
      answer: "Saat ini MA Malnu Kananga belum menyediakan fasilitas asrama, namun kami memiliki rekomendasi tempat tinggal bagi siswa dari luar daerah."
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600">Pertanyaan yang sering diajukan</p>
          </header>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h2 className="text-lg font-bold mb-2">{faq.question}</h2>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-700 mb-4">
                Tidak menemukan jawaban yang Anda cari?
              </p>
              <a 
                href="/kontak" 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Hubungi Kami
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}