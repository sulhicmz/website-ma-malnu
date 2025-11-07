// src/app/sitemap.ts
import { sanityClient as client } from '@/lib/sanity'

export default async function sitemap() {
  const siteUrl = 'https://www.malnukananga.sch.id'
  
  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/profil`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/profil/sejarah`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/akademik`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/berita`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/pengumuman`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/prestasi`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/galeri`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guru-staf`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/ppdb`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ppdb/syarat`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ppdb/daftar`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ppdb/hasil`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/kontak`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
  
  // Dynamic pages - Berita
  const posts = await client.fetch(`*[_type == "post"] | order(date desc){
    slug,
    date
  }`)
  
  const newsPages = posts.map((post: any) => ({
    url: `${siteUrl}/berita/${post.slug.current}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))
  
  // Dynamic pages - Guru & Staf
  const teachers = await client.fetch(`*[_type == "teacher"]{
    slug
  }`)
  
  const teacherPages = teachers.map((teacher: any) => ({
    url: `${siteUrl}/guru-staf/${teacher.slug.current}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))
  
  // Dynamic pages - Prestasi
  const achievements = await client.fetch(`*[_type == "achievement"]{
    slug
  }`)
  
  const achievementPages = achievements.map((achievement: any) => ({
    url: `${siteUrl}/prestasi/${achievement.slug.current}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))
  
  return [
    ...staticPages,
    ...newsPages,
    ...teacherPages,
    ...achievementPages,
  ]
}