// src/lib/queries.ts
import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  keywords,
  "logo": logo.asset->url,
  alamat,
  telepon,
  email,
  socialMedia,
  workingHours
}`

// Page
export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  metaDescription,
  "heroImage": heroImage.asset->url,
  body,
  publishedAt
}`

export const pageSlugsQuery = groq`*[_type == "page" && defined(slug.current)][].slug.current`

// Berita
export const beritaQuery = groq`*[_type == "berita" && slug.current == $slug][0]{
  title,
  slug,
  excerpt,
  "coverImage": coverImage.asset->url,
  date,
  "author": author->{name, "photo": photo.asset->url},
  "category": category->{title},
  body,
  tags
}`

export const beritaPathsQuery = groq`*[_type == "berita" && defined(slug.current)][].slug.current`

export const beritaListQuery = groq`*[_type == "berita"] | order(date desc) {
  title,
  slug,
  excerpt,
  "coverImage": coverImage.asset->url,
  date,
  "author": author->{name},
  "category": category->{title},
  tags
}`

export const beritaListWithPaginationQuery = groq`*[_type == "berita"] | order(date desc) [$start..$end] {
  title,
  slug,
  excerpt,
  "coverImage": coverImage.asset->url,
  date,
  "author": author->{name},
  "category": category->{title},
  tags
}`

// Guru
export const guruQuery = groq`*[_type == "guru" && slug.current == $slug && isActive == true][0]{
  name,
  slug,
  "photo": photo.asset->url,
  position,
  subject,
  education,
  experience,
  bio,
  email,
  phone,
  socialMedia
}`

export const guruPathsQuery = groq`*[_type == "guru" && isActive == true && defined(slug.current)][].slug.current`

export const guruListQuery = groq`*[_type == "guru" && isActive == true] | order(name asc) {
  name,
  slug,
  "photo": photo.asset->url,
  position,
  subject,
  education
}`

// Pengumuman
export const pengumumanQuery = groq`*[_type == "pengumuman" && slug.current == $slug][0]{
  title,
  slug,
  excerpt,
  "document": document.asset->url,
  date,
  deadline,
  category
}`

export const pengumumanPathsQuery = groq`*[_type == "pengumuman" && defined(slug.current)][].slug.current`

export const pengumumanListQuery = groq`*[_type == "pengumuman"] | order(date desc) {
  title,
  slug,
  excerpt,
  "document": document.asset->url,
  date,
  deadline,
  category
}`