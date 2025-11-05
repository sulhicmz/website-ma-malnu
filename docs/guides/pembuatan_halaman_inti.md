# Pembuatan Halaman Inti - MA Malnu Kananga

## Rute App Router untuk Halaman-halaman Utama dengan Fetching dari Sanity

### 1. Halaman Beranda

```tsx
// app/page.tsx
import HeroSection from '@/components/sections/HeroSection'
import PPDBHighlight from '@/components/sections/PPDBHighlight'
import NewsSection from '@/components/sections/NewsSection'
import FacilitySection from '@/components/sections/FacilitySection'
import TestimonialSection from '@/components/sections/TestimonialSection'
import GallerySection from '@/components/sections/GallerySection'
import CTASection from '@/components/sections/CTASection'
import { client } from '@/lib/sanity'

export const revalidate = 3600 // Revalidate every hour

// Generate metadata for SEO
export async function generateMetadata() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    title,
    description
  }`)
  
  return {
    title: settings.title,
    description: settings.description,
    openGraph: {
      title: settings.title,
      description: settings.description,
      url: 'https://www.malnukananga.sch.id',
      siteName: settings.title,
      locale: 'id_ID',
      type: 'website',
    },
  }
}

// Fetch data for homepage
async function getHomepageData() {
 const query = `{
    "settings": *[_type == "siteSettings"][0]{
      title,
      description
    },
    "hero": *[_type == "page" && slug.current == "beranda"][0]{
      title,
      body,
      heroImage
    },
    "latestNews": *[_type == "post"] | order(date desc)[0..2]{
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
    },
    "facilities": *[_type == "facility"] | order(order asc)[0..5]{
      _id,
      title,
      description,
      icon
    },
    "ppdbSettings": *[_type == "ppdbSettings"][0]{
      academicYear,
      quota,
      isActive
    }
  }`
  
  return await client.fetch(query)
}

export default async function HomePage() {
  const data = await getHomepageData()
  
  if (!data) {
    return <div>Error loading homepage data</div>
  }
  
  const { settings, hero, latestNews, facilities, ppdbSettings } = data
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        title={hero?.title || 'Selamat Datang di MA Malnu Kananga'}
        subtitle={settings?.description || 'Membentuk Generasi Unggul yang Beriman dan Bertaqwa'}
        imageUrl={hero?.heroImage?.asset?.url}
      />
      
      {/* PPDB Highlight */}
      {ppdbSettings?.isActive && (
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PPDBHighlight 
              academicYear={ppdbSettings.academicYear}
              quota={ppdbSettings.quota}
            />
          </div>
        </div>
      )}
      
      {/* Latest News */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsSection 
            title="Berita & Pengumuman Terbaru"
            news={latestNews}
          />
        </div>
      </div>
      
      {/* Facilities */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FacilitySection 
            title="Fasilitas Unggulan Kami"
            facilities={facilities}
          />
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialSection />
        </div>
      </div>
      
      {/* Gallery */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GallerySection />
        </div>
      
      {/* CTA Section */}
      <div className="py-12 bg-gradient-to-r from-green-700 to-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTASection />
        </div>
      </div>
    </div>
  )
}
```

### 2. Halaman Profil

```tsx
// app/profil/page.tsx
import { client } from '@/lib/sanity'
import { urlForImage } from '@/lib/image'
import Image from 'next/image'

export const revalidate = 3600

export async function generateMetadata() {
  const page = await client.fetch(`*[_type == "page" && slug.current == "profil"][0]{
    title,
    metaDescription
  }`)
  
  return {
    title: page?.title || 'Profil Sekolah',
    description: page?.metaDescription || 'Informasi lengkap tentang MA Malnu Kananga',
  }
}

async function getProfileData() {
  const query = `{
    "page": *[_type == "page" && slug.current == "profil"][0]{
      title,
      body,
      heroImage
    },
    "history": *[_type == "page" && slug.current == "sejarah"][0]{
      title,
      body
    },
    "visionMission": *[_type == "page" && slug.current == "visi-misi"][0]{
      title,
      body
    },
    "facilities": *[_type == "facility"] | order(order asc){
      _id,
      title,
      description,
      icon
    }
  }`
  
  return await client.fetch(query)
}

export default async function ProfilePage() {
  const data = await getProfileData()
  
  if (!data) {
    return <div>Error loading profile data</div>
  }
  
  const { page, history, visionMission, facilities } = data
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-900">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              {page?.title || 'Profil Sekolah'}
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-green-100 sm:max-w-3xl">
              Mengenal lebih dekat tentang MA Malnu Kananga
            </p>
          </div>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* History Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{history?.title || 'Sejarah Sekolah'}</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {history?.body && (
                  <div className="prose prose-lg max-w-none">
                    {history.body.map((block, index) => {
                      if (block._type === 'block') {
                        return <p key={index}>{block.children[0].text}</p>
                      }
                      return null
                    })}
                  </div>
                )}
              </div>
              
              <div>
                {page?.heroImage?.asset && (
                  <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={urlForImage(page.heroImage).url()}
                      alt="Sejarah MA Malnu Kananga"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Vision & Mission Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{visionMission?.title || 'Visi & Misi'}</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {visionMission?.body && (
                <div>
                  {visionMission.body.map((block, index) => {
                    if (block._type === 'block') {
                      return <p key={index}>{block.children[0].text}</p>
                    }
                    return null
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* Facilities Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Fasilitas Sekolah</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Fasilitas unggulan yang mendukung proses pembelajaran
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities?.map((facility) => (
                <div key={facility._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    {facility.icon && (
                      <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                        <div className="h-6 w-6 text-green-700" dangerouslySetInnerHTML={{ __html: facility.icon }} />
                      </div>
                    )}
                    <h3 className="ml-4 text-xl font-bold text-gray-900">{facility.title}</h3>
                  </div>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 3. Halaman Akademik

```tsx
// app/akademik/page.tsx
import { client } from '@/lib/sanity'
import Link from 'next/link'

export const revalidate = 3600

export async function generateMetadata() {
  const page = await client.fetch(`*[_type == "page" && slug.current == "akademik"][0]{
    title,
    metaDescription
  }`)
  
  return {
    title: page?.title || 'Akademik',
    description: page?.metaDescription || 'Informasi akademik MA Malnu Kananga',
  }
}

async function getAcademicData() {
  const query = `{
    "page": *[_type == "page" && slug.current == "akademik"][0]{
      title,
      body
    },
    "curriculum": *[_type == "page" && slug.current == "kurikulum"][0]{
      title,
      excerpt
    },
    "extracurriculars": *[_type == "extracurricular"] | order(title asc){
      _id,
      title,
      description,
      icon
    }
  }`
  
  return await client.fetch(query)
}

export default async function AcademicPage() {
  const data = await getAcademicData()
  
  if (!data) {
    return <div>Error loading academic data</div>
  }
  
  const { page, curriculum, extracurriculars } = data
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-900">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              {page?.title || 'Akademik'}
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-green-100 sm:max-w-3xl">
              Program pembelajaran unggulan di MA Malnu Kananga
            </p>
          </div>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Curriculum Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{curriculum?.title || 'Kurikulum'}</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                {curriculum?.excerpt || 'Kurikulum terkini yang menggabungkan nilai keislaman dengan ilmu umum'}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Kurikulum Nasional</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Matematika</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Bahasa Indonesia</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Bahasa Inggris</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>IPA (Fisika, Kimia, Biologi)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Kurikulum Keagamaan</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Al-Qur'an dan Hadis</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Aqidah dan Akhlak</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Fiqih</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Sejarah Kebudayaan Islam</span>
                    </li>
                  </ul>
                </div>
              
              <div className="mt-8 text-center">
                <Link 
                  href="/akademik/kurikulum"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800"
                >
                  Selengkapnya tentang Kurikulum
                  <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Extracurricular Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Ekstrakurikuler</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Program pengembangan diri yang mendukung potensi siswa
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {extracurriculars?.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    {item.icon && (
                      <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                        <div className="h-6 w-6 text-green-700" dangerouslySetInnerHTML={{ __html: item.icon }} />
                      </div>
                    )}
                    <h3 className="ml-4 text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 4. Halaman Berita & Penguman

```tsx
// app/berita/page.tsx
import { client } from '@/lib/sanity'
import CardBerita from '@/components/ui/CardBerita'
import Pagination from '@/components/ui/Pagination'

export const revalidate = 1800 // Revalidate every 30 minutes

export async function generateMetadata() {
  return {
    title: 'Berita & Pengumuman',
    description: 'Berita terkini dan pengumuman penting dari MA Malnu Kananga',
  }
}

async function getPosts(page = 1, category?: string) {
  const query = `{
    "posts": *[_type == "post" ${category ? `&& category->slug.current == "${category}"` : ''}] | order(date desc) {
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
        title,
        slug
      }
    }[${(page - 1) * 9}...${page * 9}],
    "total": count(*[_type == "post" ${category ? `&& category->slug.current == "${category}"` : ''}]),
    "categories": *[_type == "category"] | order(title asc){
      _id,
      title,
      slug
    }
  }`
  
  return await client.fetch(query)
}

export default async function NewsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1
  const category = searchParams.category
  const data = await getPosts(page, category)
  
  if (!data) {
    return <div>Error loading news data</div>
  }
  
  const { posts, total, categories } = data
 const totalPages = Math.ceil(total / 9)
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-900">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Berita & Pengumuman
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-green-100 sm:max-w-3xl">
              Ikuti informasi terkini seputar kegiatan MA Malnu Kananga
            </p>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              {category && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Kategori: {categories.find(cat => cat.slug.current === category)?.title || category}
                  </h2>
                </div>
              )}
              
              {posts.length > 0 ? (
                <>
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
                </>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada berita</h3>
                  <p className="mt-1 text-sm text-gray-500">Belum ada berita untuk kategori ini.</p>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Kategori</h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="/berita" 
                      className={`block px-3 py-2 rounded-md ${!category ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Semua Kategori
                    </a>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat._id}>
                      <a 
                        href={`/berita?category=${cat.slug.current}`} 
                        className={`block px-3 py-2 rounded-md ${category === cat.slug.current ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {cat.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Arsip</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-10">September 2024</a></li>
                  <li><a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Agustus 2024</a></li>
                  <li><a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Juli 2024</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 5. Halaman Detail Berita

```tsx
// app/berita/[slug]/page.tsx
import { client } from '@/lib/sanity'
import { urlForImage } from '@/lib/image'
import Image from 'next/image'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import Breadcrumb from '@/components/layout/Breadcrumb'

export const revalidate = 3600

export async function generateMetadata({ params }) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt
  }`, { slug: params.slug })
  
  return {
    title: post?.title || 'Berita',
    description: post?.excerpt || 'Baca berita terkini dari MA Malnu Kananga',
  }
}

async function getPost(slug: string) {
 const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt,
    date,
    body,
    coverImage,
    author->{
      name,
      image
    },
    category->{
      title,
      slug
    }
  }`
  
  return await client.fetch(query, { slug })
}

export default async function PostDetailPage({ params }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Berita tidak ditemukan</h1>
          <p className="mt-2 text-gray-600">Maaf, berita yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    )
  }
  
  const formattedDate = format(new Date(post.date), 'dd MMMM yyyy', { locale: id })
  
  return (
    <div className="min-h-screen">
      <Breadcrumb 
        items={[
          { name: 'Beranda', href: '/' },
          { name: 'Berita', href: '/berita' },
          { name: post.title }
        ]} 
      />
      
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {post.category?.title || 'Berita'}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center text-gray-500">
              {post.author?.image?.asset && (
                <div className="flex-shrink-0 mr-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={urlForImage(post.author.image).url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{post.author?.name || 'Admin'}</p>
                <div className="flex text-sm">
                  <time dateTime={post.date}>{formattedDate}</time>
                </div>
              </div>
            </div>
          </header>
          
          {post.coverImage?.asset && (
            <div className="mb-8">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={urlForImage(post.coverImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            {post.body && (
              <div>
                {post.body.map((block, index) => {
                  if (block._type === 'block') {
                    return <p key={index}>{block.children[0].text}</p>
                  } else if (block._type === 'image') {
                    return (
                      <div key={index} className="my-8">
                        <div className="relative h-96 rounded-lg overflow-hidden">
                          <Image
                            src={urlForImage(block).url()}
                            alt={block.alt || 'Gambar berita'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
```

### 6. Halaman Galeri

```tsx
// app/galeri/page.tsx
import { client } from '@/lib/sanity'
import GalleryGrid from '@/components/ui/GalleryGrid'

export const revalidate = 3600

export async function generateMetadata() {
  return {
    title: 'Galeri Kegiatan',
    description: 'Dokumentasi kegiatan dan prestasi siswa MA Malnu Kananga',
  }
}

async function getGalleryData() {
  const query = `*[_type == "gallery"] | order(date desc){
    _id,
    title,
    description,
    date,
    coverImage,
    images
  }`
  
  return await client.fetch(query)
}

export default async function GalleryPage() {
  const galleries = await getGalleryData()
  
  if (!galleries) {
    return <div>Error loading gallery data</div>
  }
  
  // Flatten all images from all galleries
  const allImages = galleries.flatMap(gallery => 
    gallery.images?.map(image => ({
      id: `${gallery._id}-${image._key}`,
      title: image.caption || gallery.title,
      imageUrl: image.image?.asset?.url,
      date: new Date(gallery.date).toLocaleDateString('id-ID'),
      galleryTitle: gallery.title
    })) || []
  )
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-900">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Galeri Kegiatan
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-green-100 sm:max-w-3xl">
              Dokumentasi kegiatan dan prestasi siswa MA Malnu Kananga
            </p>
          </div>
        </div>
      
      {/* Gallery Content */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allImages.length > 0 ? (
            <GalleryGrid items={allImages} />
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada galeri</h3>
              <p className="mt-1 text-sm text-gray-500">Belum ada dokumentasi kegiatan yang tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

### 7. Halaman Guru & Staf

```tsx
// app/guru-staf/page.tsx
import { client } from '@/lib/sanity'
import CardGuru from '@/components/ui/CardGuru'

export const revalidate = 3600

export async function generateMetadata() {
  return {
    title: 'Guru & Staf',
    description: 'Kenali tim pendidik dan staf MA Malnu Kananga',
  }
}

async function getTeachers() {
  const query = `*[_type == "teacher"] | order(name asc){
    _id,
    name,
    position,
    subject,
    bio,
    photo,
    slug
  }`
  
  return await client.fetch(query)
}

export default async function TeachersPage() {
  const teachers = await getTeachers()
  
  if (!teachers) {
    return <div>Error loading teachers data</div>
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-900">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Guru & Staf
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-green-100 sm:max-w-3xl">
              Kenali tim pendidik dan staf MA Malnu Kananga
            </p>
          </div>
        </div>
      </div>
      
      {/* Teachers Content */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Tim Pendidik Kami</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Guru dan staf profesional yang berdedikasi tinggi
            </p>
          </div>
          
          {teachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher) => (
                <CardGuru
                  key={teacher._id}
                  name={teacher.name}
                  position={teacher.position}
                  subject={teacher.subject}
                  rating={4.8} // This would come from a separate ratings system
                  reviewCount={Math.floor(Math.random() * 100) + 50} // Simulated review count
                  bio={teacher.bio || 'Guru berpengalaman di MA Malnu Kananga'}
                  imageUrl={teacher.photo?.asset?.url}
                  slug={teacher.slug.current}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 1-4 0 2 2 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada data guru</h3>
              <p className="mt-1 text-sm text-gray-500">Informasi guru belum tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

### 8. Halaman Kontak

```tsx
// app/kontak/page.tsx
import { client } from '@/lib/sanity'
import ContactForm from '@/components/forms/ContactForm'

export const revalidate = 3600

export async function generateMetadata() {
  return {
    title: 'Kontak',
    description: 'Hubungi MA Malnu Kananga untuk informasi lebih lanjut',
  }
}

async function getContactData() {
  const query = `*[_type == "siteSettings"][0]{
    alamat,
    telepon,
    email,
    socialMedia
  }`
  
  return await client.fetch(query)
}

export default async function ContactPage() {
  const contactData = await getContactData()
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-900">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Hubungi Kami
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-green-100 sm:max-w-3xl">
              Kami siap membantu Anda dengan segala pertanyaan
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Content */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-700">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Alamat</h3>
                    <p className="mt-2 text-gray-600">
                      {contactData?.alamat || 'Jl. Pendidikan No. 123, Kananga, Kabupaten XXXXX'}
                    </p>
                  </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-700">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 1.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Telepon</h3>
                    <p className="mt-2 text-gray-600">
                      {contactData?.telepon || '(04XX) XXXXXX'}
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-700">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-2 text-gray-600">
                      {contactData?.email || 'info@malnukananga.sch.id'}
                    </p>
                  </div>
                </div>
                
                {contactData?.socialMedia && contactData.socialMedia.length > 0 && (
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-700">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                        </svg>
                      </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Media Sosial</h3>
                      <div className="mt-2 flex space-x-4">
                        {contactData.socialMedia.map((social, index) => (
                          <a 
                            key={index} 
                            href={social.url} 
                            className="text-gray-400 hover:text-green-600"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {social.platform}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Map Embed */}
              <div className="mt-12">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Lokasi Kami</h3>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
              </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
              <ContactForm />
              
              {/* WhatsApp CTA */}
              <div className="mt-8 bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Hubungi Kami via WhatsApp</h3>
                <p className="text-gray-600 mb-4">Dapatkan respon cepat dari tim kami</p>
                <a 
                  href="https://wa.me/6281234567890" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.98 2.898a9.825 9.825 012.893 6.994c-.003 5.45-4.437 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.35.157 11.892c0 2.096.547 4.142 1.58 5.945L.057 24l6.305-1.654a11.82 11.882 005.683 1.448h.005c6.554 0 11.89-5.35 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## File error.tsx untuk Error Handling

```tsx
// app/error.tsx
'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.33-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Terjadi Kesalahan</h1>
        <p className="mt-2 text-gray-600">Maaf, terjadi kesalahan saat memuat halaman.</p>
        <div className="mt-6">
          <button
            onClick={() => reset()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  )
}
```

## File not-found.tsx untuk Halaman 404

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">404 error</p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-lg text-gray-500">Maaf, halaman yang Anda cari tidak tersedia.</p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
```

---
*Dokumen ini berisi implementasi rute App Router untuk halaman-halaman utama website MA Malnu Kananga dengan fetching data dari Sanity menggunakan GROQ. Setiap halaman dilengkapi dengan generateMetadata untuk SEO, revalidate untuk ISR, serta error handling yang sesuai.*