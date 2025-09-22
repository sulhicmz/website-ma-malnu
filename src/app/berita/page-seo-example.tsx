// Example usage in app/berita/[slug]/page.tsx
import NewsArticleJSONLD from '@/components/seo/NewsArticleJSONLD'
import BreadcrumbJSONLD from '@/components/seo/BreadcrumbJSONLD'
import MetaTags from '@/components/seo/MetaTags'
import { urlForImage } from '@/lib/image'
import { client } from '@/lib/sanity'
import { defaultSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt,
    coverImage,
    date,
    author->{
      name
    }
  }`, { slug: params.slug })
  
  if (!post) {
    return {
      title: 'Berita Tidak Ditemukan - MA Malnu Kananga',
      description: 'Halaman berita yang Anda cari tidak ditemukan.',
    }
  }
  
  const imageUrl = post.coverImage?.asset ? urlForImage(post.coverImage).url() : '/images/og-news.jpg'
  
  return {
    title: `${post.title} - MA Malnu Kananga`,
    description: post.excerpt || 'Baca berita terkini dari MA Malnu Kananga.',
    openGraph: {
      title: `${post.title} - MA Malnu Kananga`,
      description: post.excerpt || 'Baca berita terkini dari MA Malnu Kananga.',
      url: `https://www.malnukananga.sch.id/berita/${params.slug}`,
      siteName: defaultSEO.siteName,
      locale: defaultSEO.locale,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      article: {
        publishedTime: post.date,
        modifiedTime: post.date,
        section: 'Berita',
        authors: [post.author?.name || 'Admin MA Malnu Kananga'],
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - MA Malnu Kananga`,
      description: post.excerpt || 'Baca berita terkini dari MA Malnu Kananga.',
      images: [imageUrl],
      creator: defaultSEO.socialSEO.twitter.creator,
    },
  }
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt,
    coverImage,
    date,
    author->{
      name
    }
  }`, { slug: params.slug })
  
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
  
  const imageUrl = post.coverImage?.asset ? urlForImage(post.coverImage).url() : '/images/og-news.jpg'
  
  const breadcrumbItems = [
    { name: 'Beranda', url: 'https://www.malnukananga.sch.id' },
    { name: 'Berita', url: 'https://www.malnukananga.sch.id/berita' },
    { name: post.title, url: `https://www.malnukananga.sch.id/berita/${params.slug}` }
  ]
  
  return (
    <>
      <MetaTags 
        title={`${post.title} - MA Malnu Kananga`}
        description={post.excerpt}
        image={imageUrl}
        url={`https://www.malnukananga.sch.id/berita/${params.slug}`}
        type="article"
      />
      
      <NewsArticleJSONLD
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        dateModified={post.date}
        authorName={post.author?.name || 'Admin MA Malnu Kananga'}
        image={imageUrl}
        slug={params.slug}
      />
      
      <BreadcrumbJSONLD items={breadcrumbItems} />
      
      <article className="min-h-screen">
        {/* Your article content */}
        <h1>{post.title}</h1>
        {/* More content */}
      </article>
    </>
  )
}