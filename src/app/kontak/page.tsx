// src/app/kontak/page.tsx
import { getSiteSettings } from '@/lib/fetchData'
import { Breadcrumb } from '@/components/Breadcrumb'
import WhatsAppButton from '@/components/WhatsAppButton'
import GoogleMapEmbed from '@/components/GoogleMapEmbed'

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: `Kontak - ${siteSettings?.title || 'MA Malnu Kananga'}`,
    description: 'Informasi kontak Madrasah Aliyah Malnu Kananga',
  }
}

export default async function KontakPage() {
  const breadcrumbs = [
    { name: 'Beranda', href: '/' },
    { name: 'Kontak', href: '/kontak' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        
        <h1 className="text-3xl font-bold mb-8 text-center">Kontak Kami</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Alamat</h3>
                    <p className="text-gray-600 mt-1">
                      Jl. Raya Kananga No. 123<br />
                      Kananga, Kec. Kananga<br />
                      Kab. Kananga 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Telepon</h3>
                    <p className="text-gray-600 mt-1">(021) 12345678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-gray-600 mt-1">info@malnukananga.sch.id</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Jam Operasional</h3>
                    <p className="text-gray-600 mt-1">
                      Senin - Jumat: 07:00 - 16:00<br />
                      Sabtu: 08:00 - 12:00
                    </p>
                  </div>
                </div>
                
                {/* WhatsApp Button */}
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-3">Hubungi Kami via WhatsApp</h3>
                  <WhatsAppButton 
                    phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_GENERAL || "6281234567890"}
                    message="Halo, saya ingin bertanya tentang informasi sekolah di MA Malnu Kananga."
                    buttonText="Chat via WhatsApp"
                    context="contact_page"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Lokasi Sekolah</h2>
              <GoogleMapEmbed 
                address="Jl. Raya Kananga No. 123, Kananga, Kec. Kananga, Kab. Kananga 12345"
                title="Lokasi MA Malnu Kananga"
                height="300px"
              />
              <a 
                href="/kontak/lokasi" 
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Lihat detail lokasi →
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">FAQ</h2>
              <p className="text-gray-700 mb-4">
                Pertanyaan yang sering diajukan oleh orang tua siswa dan calon siswa.
              </p>
              <a 
                href="/kontak/faq" 
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Lihat FAQ →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}