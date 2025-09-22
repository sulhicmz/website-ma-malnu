# Pengembangan Frontend (Komponen) - MA Malnu Kananga

## Komponen React + Tailwind untuk Website MA Malnu Kananga

### 1. Navbar Responsif

```tsx
// components/layout/Navbar.tsx
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Akademik', href: '/akademik' },
    { name: 'Berita', href: '/berita' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'PPDB', href: '/ppdb' },
    { name: 'Kontak', href: '/kontak' },
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="bg-green-700 text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded">
                MA
              </div>
              <span className="ml-3 text-xl font-bold text-green-800 hidden sm:block">MA Malnu Kananga</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium hover:text-green-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link 
              href="/ppdb/daftar"
              className="ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 transition-colors"
            >
              Daftar Sekarang
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/ppdb/daftar"
              className="block w-full mt-4 mx-3 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
```

### Props dan Stories untuk Navbar
```tsx
// stories/Navbar.stories.tsx
import React from 'react'
import Navbar from '../components/layout/Navbar'

export default {
  title: 'Components/Layout/Navbar',
  component: Navbar,
}

export const Default = () => <Navbar />

export const Scrolled = () => {
  return (
    <div className="h-screen">
      <div style={{ height: '200vh' }}>
        <Navbar />
        <p>Scroll down to see navbar effect</p>
      </div>
    </div>
  )
}
```

### 2. Footer

```tsx
// components/layout/Footer.tsx
import Link from 'next/link'
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'

export default function Footer() {
  const profilLinks = [
    { name: 'Sejarah', href: '/profil/sejarah' },
    { name: 'Visi Misi', href: '/profil/visi-misi' },
    { name: 'Fasilitas', href: '/profil/fasilitas' },
    { name: 'Struktur Organisasi', href: '/profil/struktur' },
  ]

  const akademikLinks = [
    { name: 'Kurikulum', href: '/akademik/kurikulum' },
    { name: 'Ekstrakurikuler', href: '/akademik/ekstrakurikuler' },
    { name: 'Jadwal Pelajaran', href: '/akademik/jadwal' },
    { name: 'Kalender Akademik', href: '/akademik/kalender' },
  ]

  const informasiLinks = [
    { name: 'Berita', href: '/berita' },
    { name: 'Pengumuman', href: '/pengumuman' },
    { name: 'Prestasi', href: '/prestasi' },
    { name: 'Galeri', href: '/galeri' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo dan Deskripsi */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <div className="bg-green-700 text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded">
                MA
              </div>
              <span className="ml-3 text-xl font-bold text-white">MA Malnu Kananga</span>
            </div>
            <p className="mt-4 text-base text-gray-300">
              Membentuk generasi unggul yang beriman dan bertaqwa kepada Allah SWT, berakhlak mulia, dan berwawasan kebangsaan.
            </p>
            <div className="flex space-x-6 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <FiFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <FiInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <FiTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Menu Profil */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Profil</h3>
            <ul className="mt-4 space-y-4">
              {profilLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Menu Akademik */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Akademik</h3>
            <ul className="mt-4 space-y-4">
              {akademikLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Menu Informasi */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Informasi</h3>
            <ul className="mt-4 space-y-4">
              {informasiLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; 2024 MA Malnu Kananga. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

### Props dan Stories untuk Footer
```tsx
// stories/Footer.stories.tsx
import React from 'react'
import Footer from '../components/layout/Footer'

export default {
  title: 'Components/Layout/Footer',
  component: Footer,
}

export const Default = () => <Footer />
```

### 3. Breadcrumb

```tsx
// components/layout/Breadcrumb.tsx
import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-gray-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <FiChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="text-green-700 hover:text-green-900 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-500">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
```

### Props dan Stories untuk Breadcrumb
```tsx
// stories/Breadcrumb.stories.tsx
import React from 'react'
import Breadcrumb from '../components/layout/Breadcrumb'

export default {
  title: 'Components/Layout/Breadcrumb',
  component: Breadcrumb,
}

export const Default = () => (
  <Breadcrumb 
    items={[
      { name: 'Beranda', href: '/' },
      { name: 'Berita', href: '/berita' },
      { name: 'Meningkatkan Mutu Pendidikan di MA Malnu Kananga' }
    ]} 
  />
)

export const TwoLevels = () => (
  <Breadcrumb 
    items={[
      { name: 'Beranda', href: '/' },
      { name: 'Profil Sekolah' }
    ]} 
  />
)
```

### 4. Card Berita

```tsx
// components/ui/CardBerita.tsx
import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface CardBeritaProps {
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  slug: string
  imageUrl?: string
}

export default function CardBerita({
  title,
  excerpt,
  date,
  author,
  category,
  slug,
  imageUrl
}: CardBeritaProps) {
  const formattedDate = format(new Date(date), 'dd MMMM yyyy', { locale: id })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {imageUrl && (
        <div className="relative">
          <img 
            className="w-full h-48 object-cover" 
            src={imageUrl} 
            alt={title} 
          />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {category}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6 flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{author}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-grow">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <Link 
          href={`/berita/${slug}`} 
          className="inline-flex items-center text-green-700 font-medium hover:text-green-900 mt-auto"
        >
          Baca Selengkapnya
          <FiChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
```

### Props dan Stories untuk Card Berita
```tsx
// stories/CardBerita.stories.tsx
import React from 'react'
import CardBerita from '../components/ui/CardBerita'

export default {
  title: 'Components/UI/CardBerita',
  component: CardBerita,
  argTypes: {
    title: { control: 'text' },
    excerpt: { control: 'text' },
    date: { control: 'date' },
    author: { control: 'text' },
    category: { control: 'text' },
    slug: { control: 'text' },
    imageUrl: { control: 'text' }
  }
}

const Template = (args) => <CardBerita {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Meningkatkan Mutu Pendidikan di MA Malnu Kananga Melalui Program Inovasi Pembelajaran',
  excerpt: 'MA Malnu Kananga terus berkomitmen untuk meningkatkan kualitas pendidikan melalui berbagai program inovasi pembelajaran yang dirancang untuk memenuhi kebutuhan siswa di era digital.',
  date: new Date().toISOString(),
  author: 'Admin Sekolah',
  category: 'Kegiatan Sekolah',
  slug: 'meningkatkan-mutu-pendidikan',
  imageUrl: 'https://placehold.co/600x400/0A704D/FFFFFF?text=Berita'
}

export const WithoutImage = Template.bind({})
WithoutImage.args = {
  ...Default.args,
  imageUrl: undefined
}
```

### 5. Card Guru

```tsx
// components/ui/CardGuru.tsx
import Link from 'next/link'
import { FiStar } from 'react-icons/fi'

interface CardGuruProps {
  name: string
  position: string
  subject: string
  rating: number
  reviewCount: number
  bio: string
  imageUrl?: string
  slug: string
}

export default function CardGuru({
  name,
  position,
  subject,
  rating,
  reviewCount,
  bio,
  imageUrl,
  slug
}: CardGuruProps) {
  // Render stars based on rating
  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar 
          key={i} 
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
        />
      )
    }
    return stars
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center">
          {imageUrl ? (
            <img 
              className="h-16 w-16 rounded-full object-cover" 
              src={imageUrl} 
              alt={name} 
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-800 font-bold text-xl">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <p className="text-green-700">{subject}</p>
            <div className="flex items-center mt-1">
              <div className="flex">
                {renderStars()}
              </div>
              <span className="ml-1 text-sm text-gray-600">
                {rating.toFixed(1)} ({reviewCount} ulasan)
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-600 text-sm line-clamp-3">
            {bio}
          </p>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Link 
            href={`/guru-staf/${slug}`} 
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-green-700 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 transition-colors"
          >
            Lihat Profil
          </Link>
          <a 
            href={`https://wa.me/6281234567890?text=Assalamu'alaikum,%20saya%20ingin%20bertanya%20tentang%20mata%20pelajaran%20${subject}`} 
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 transition-colors"
          >
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.64.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.88-9.884 2.64 0 5.122 1.03 6.98 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.35.157 11.892c0 2.096.547 4.142 1.58 5.945L.057 24l6.305-1.654a11.882 11.82 0 005.683 1.448h.005c6.554 0 11.89-5.35 1.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
```

### Props dan Stories untuk Card Guru
```tsx
// stories/CardGuru.stories.tsx
import React from 'react'
import CardGuru from '../components/ui/CardGuru'

export default {
  title: 'Components/UI/CardGuru',
  component: CardGuru,
  argTypes: {
    name: { control: 'text' },
    position: { control: 'text' },
    subject: { control: 'text' },
    rating: { control: { type: 'number', min: 0, max: 5, step: 0.1 } },
    reviewCount: { control: 'number' },
    bio: { control: 'text' },
    imageUrl: { control: 'text' },
    slug: { control: 'text' }
  }
}

const Template = (args) => <CardGuru {...args} />

export const Default = Template.bind({})
Default.args = {
 name: 'Dra. Hj. Siti Aminah, M.Pd.',
  position: 'Guru Senior',
  subject: 'Biologi',
  rating: 4.9,
  reviewCount: 127,
  bio: 'Guru berpengalaman dengan lebih dari 15 tahun mengajar di bidang biologi. Aktif dalam berbagai kegiatan pengembangan kurikulum dan penelitian pendidikan.',
  imageUrl: 'https://placehold.co/100x100/0A704D/FFFFFF?text=SA',
  slug: 'siti-aminah'
}

export const WithoutImage = Template.bind({})
WithoutImage.args = {
  ...Default.args,
  imageUrl: undefined
}
```

### 6. Gallery Grid

```tsx
// components/ui/GalleryGrid.tsx
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

interface GalleryItem {
  id: string
  title: string
  imageUrl: string
  date: string
  tags?: string[]
}

interface GalleryGridProps {
  items: GalleryItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item)
  }

  const closeLightbox = () => {
    setSelectedItem(null)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          onClick={() => openLightbox(item)}
        >
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="text-white p-3 rounded-full bg-green-700 hover:bg-green-800 transition-colors">
              <FiSearch className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-bold">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.date}</p>
          </div>
        </div>
      ))}
      
      {/* Lightbox */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedItem.imageUrl} 
              alt={selectedItem.title} 
              className="max-w-full max-h-full object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-white font-bold text-xl">{selectedItem.title}</h3>
              <p className="text-gray-300">{selectedItem.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

### Props dan Stories untuk Gallery Grid
```tsx
// stories/GalleryGrid.stories.tsx
import React from 'react'
import GalleryGrid from '../components/ui/GalleryGrid'

export default {
  title: 'Components/UI/GalleryGrid',
 component: GalleryGrid,
}

const sampleItems = [
  {
    id: '1',
    title: 'Upacara Bendera Rutin',
    imageUrl: 'https://placehold.co/600x400/0A704D/FFFFFF?text=Upacara',
    date: '12 September 2024'
  },
  {
    id: '2',
    title: 'Juara Olimpiade Matematika',
    imageUrl: 'https://placehold.co/600x400/D4AF37/00000?text=Olimpiade',
    date: '10 September 2024'
  },
  {
    id: '3',
    title: 'Latihan Paduan Suara',
    imageUrl: 'https://placehold.co/600x400/1E3A8A/FFFFFF?text=Paduan+Suara',
    date: '8 September 2024'
  }
]

export const Default = () => <GalleryGrid items={sampleItems} />
```

### 7. Pagination

```tsx
// components/ui/Pagination.tsx
import Link from 'next/link'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Menampilkan <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> sampai{' '}
          <span className="font-medium">{Math.min(currentPage * 10, totalPages * 10)}</span> dari{' '}
          <span className="font-medium">{totalPages * 10}</span> hasil
        </p>
      </div>
      
      <div className="flex flex-1 justify-between sm:justify-end">
        {currentPage > 1 && (
          <Link
            href={`${basePath}/page/${currentPage - 1}`}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FiChevronLeft className="mr-2 h-4 w-4" />
            Sebelumnya
          </Link>
        )}
        
        {currentPage < totalPages && (
          <Link
            href={`${basePath}/page/${currentPage + 1}`}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Selanjutnya
            <FiChevronRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>
      
      <div className="flex sm:hidden">
        {currentPage > 1 && (
          <Link
            href={`${basePath}/page/${currentPage - 1}`}
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <FiChevronLeft className="h-5 w-5" />
          </Link>
        )}
        
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>
            ) : (
              <Link
                href={`${basePath}/page/${page}`}
                className={`relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium ${
                  page === currentPage
                    ? 'bg-green-700 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {page}
              </Link>
            )}
          </React.Fragment>
        ))}
        
        {currentPage < totalPages && (
          <Link
            href={`${basePath}/page/${currentPage + 1}`}
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <FiChevronRight className="h-5 w-5" />
          </Link>
        )}
      </div>
    </nav>
  )
}
```

### Props dan Stories untuk Pagination
```tsx
// stories/Pagination.stories.tsx
import React from 'react'
import Pagination from '../components/ui/Pagination'

export default {
  title: 'Components/UI/Pagination',
  component: Pagination,
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    basePath: { control: 'text' }
  }
}

const Template = (args) => <Pagination {...args} />

export const FirstPage = Template.bind({})
FirstPage.args = {
  currentPage: 1,
  totalPages: 5,
  basePath: '/berita'
}

export const MiddlePage = Template.bind({})
MiddlePage.args = {
  currentPage: 3,
  totalPages: 5,
  basePath: '/berita'
}

export const LastPage = Template.bind({})
LastPage.args = {
  currentPage: 5,
  totalPages: 5,
  basePath: '/berita'
}
```

## State & Data Fetch untuk Komponen

### Fetching Data dengan SWR
```tsx
// lib/hooks/usePosts.ts
import useSWR from 'swr'
import { client } from '../sanity'

const fetcher = (query: string) => client.fetch(query)

export function usePosts(page = 1, limit = 10) {
  const query = `*[_type == "post"] | order(date desc) {
    _id,
    title,
    slug,
    excerpt,
    date,
    coverImage,
    author->{
      name,
      image
    },
    category->{
      title,
      color
    }
  }[${(page - 1) * limit}...${page * limit}]`
  
  const { data, error, isLoading } = useSWR(query, fetcher)
  
  return {
    posts: data || [],
    isLoading,
    isError: error
  }
}
```

### Fetching Data dengan React Query
```tsx
// lib/hooks/useTeachers.ts
import { useQuery } from '@tanstack/react-query'
import { client } from '../sanity'

export function useTeachers() {
  const fetchTeachers = async () => {
    const query = `*[_type == "teacher"] | order(name asc) {
      _id,
      name,
      slug,
      position,
      subject,
      photo,
      bio
    }`
    
    return await client.fetch(query)
  }
  
  return useQuery({
    queryKey: ['teachers'],
    queryFn: fetchTeachers
  })
}
```

## Error Handling dan Loading States

### Komponen Loading Skeleton
```tsx
// components/ui/LoadingSkeleton.tsx
export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-200 h-48 w-full" />
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Komponen Error Display
```tsx
// components/ui/ErrorDisplay.tsx
import { FiAlertTriangle } from 'react-icons/fi'

interface ErrorDisplayProps {
  message: string
  onRetry?: () => void
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <FiAlertTriangle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Terjadi kesalahan</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none"
              >
                Coba lagi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

## ISR (Incremental Static Regeneration) Implementation

### Contoh Penggunaan ISR di Halaman
```tsx
// app/berita/page.tsx
import CardBerita from '@/components/ui/CardBerita'
import Pagination from '@/components/ui/Pagination'
import { client } from '@/lib/sanity'

export const revalidate = 3600 // Revalidate every hour

async function getPosts(page = 1) {
  const query = `*[_type == "post"] | order(date desc) {
    _id,
    title,
    slug,
    excerpt,
    date,
    coverImage,
    author->{
      name
    },
    category->{
      title
    }
  }[${(page - 1) * 10}...${page * 10}]`
  
  const posts = await client.fetch(query)
  return posts
}

async function getTotalPosts() {
  const query = 'count(*[_type == "post"])'
  const total = await client.fetch(query)
  return total
}

export default async function BeritaPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1
  const [posts, total] = await Promise.all([
    getPosts(page),
    getTotalPosts()
  ])
  
  const totalPages = Math.ceil(total / 10)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Berita & Pengumuman</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <CardBerita
            key={post._id}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            author={post.author?.name || 'Admin'}
            category={post.category?.title || 'Umum'}
            slug={post.slug.current}
            imageUrl={post.coverImage?.asset?.url}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            basePath="/berita" 
          />
        </div>
      )}
    </div>
  )
}
```

---
*Dokumen ini berisi implementasi komponen React dengan Tailwind CSS untuk website MA Malnu Kananga. Komponen-komponen ini dirancang untuk memberikan pengalaman pengguna yang responsif, aksesibel, dan sesuai dengan brand identity sekolah. Setiap komponen dilengkapi dengan props yang jelas dan contoh penggunaan.*