import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const quickLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil Sekolah', href: '/profil' },
    { name: 'Akademik', href: '/akademik' },
    { name: 'Berita', href: '/berita' },
    { name: 'PPDB', href: '/ppdb' },
    { name: 'Kontak', href: '/kontak' },
  ]

  const academicLinks = [
    { name: 'Kurikulum', href: '/akademik/kurikulum' },
    { name: 'Ekstrakurikuler', href: '/akademik/ekstrakurikuler' },
    { name: 'Jadwal Pelajaran', href: '/akademik/jadwal' },
    { name: 'Kalender Akademik', href: '/akademik/kalender' },
  ]

  const informationLinks = [
    { name: 'Prestasi', href: '/prestasi' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Guru & Staf', href: '/guru-staf' },
    { name: 'Fasilitas', href: '/profil/fasilitas' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <div className="bg-primary-700 text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded">
                MA
              </div>
              <span className="ml-3 text-xl font-bold">MA Malnu Kananga</span>
            </div>
            <p className="mt-4 text-base text-gray-300">
              Membentuk generasi unggul yang beriman dan bertaqwa kepada Allah SWT, 
              berakhlak mulia, dan berwawasan kebangsaan.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Tautan Cepat
            </h3>
            <ul className="mt-4 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base text-gray-300 hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Academic */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Akademik
            </h3>
            <ul className="mt-4 space-y-4">
              {academicLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base text-gray-300 hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Informasi
            </h3>
            <ul className="mt-4 space-y-4">
              {informationLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base text-gray-300 hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} MA Malnu Kananga. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}