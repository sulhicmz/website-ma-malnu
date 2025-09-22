// Example usage in app/page.tsx
import OrganizationJSONLD from '@/components/seo/OrganizationJSONLD'
import MetaTags from '@/components/seo/MetaTags'
import { defaultSEO, pageSEO } from '@/lib/seo'

export async function generateMetadata() {
  const pageData = pageSEO.home
  
  return {
    title: pageData.title,
    description: pageData.description,
    keywords: defaultSEO.keywords,
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `https://www.malnukananga.sch.id${pageData.url}`,
      siteName: defaultSEO.siteName,
      locale: defaultSEO.locale,
      type: defaultSEO.type,
      images: [
        {
          url: pageData.image,
          width: 1200,
          height: 630,
          alt: pageData.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      images: [pageData.image],
      creator: defaultSEO.socialSEO.twitter.creator,
    },
  }
}

export default async function HomePage() {
  return (
    <>
      <MetaTags 
        title={pageSEO.home.title}
        description={pageSEO.home.description}
        image={pageSEO.home.image}
        url={`https://www.malnukananga.sch.id${pageSEO.home.url}`}
      />
      <OrganizationJSONLD />
      
      <div className="min-h-screen">
        {/* Your homepage content */}
      </div>
    </>
  )
}