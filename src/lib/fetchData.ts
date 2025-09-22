// src/lib/fetchData.ts
import { sanityClient } from './sanity'
import * as queries from './queries'

// Default revalidation time (in seconds)
export const REVALIDATION_TIME = 60 * 5 // 5 minutes

// Fetch site settings
export async function getSiteSettings() {
  return await sanityClient.fetch(queries.siteSettingsQuery)
}

// Fetch a page by slug
export async function getPage(slug: string) {
  return await sanityClient.fetch(queries.pageQuery, { slug })
}

// Fetch all page slugs
export async function getAllPageSlugs() {
  return await sanityClient.fetch(queries.pageSlugsQuery)
}

// Fetch a berita by slug
export async function getBerita(slug: string) {
  return await sanityClient.fetch(queries.beritaQuery, { slug })
}

// Fetch all berita slugs
export async function getAllBeritaSlugs() {
  return await sanityClient.fetch(queries.beritaPathsQuery)
}

// Fetch berita list
export async function getBeritaList() {
  return await sanityClient.fetch(queries.beritaListQuery)
}

// Fetch berita list with pagination
export async function getBeritaListWithPagination(start: number, end: number) {
  return await sanityClient.fetch(queries.beritaListWithPaginationQuery, { start, end })
}

// Fetch a guru by slug
export async function getGuru(slug: string) {
  return await sanityClient.fetch(queries.guruQuery, { slug })
}

// Fetch all guru slugs
export async function getAllGuruSlugs() {
  return await sanityClient.fetch(queries.guruPathsQuery)
}

// Fetch guru list
export async function getGuruList() {
  return await sanityClient.fetch(queries.guruListQuery)
}

// Fetch a pengumuman by slug
export async function getPengumuman(slug: string) {
  return await sanityClient.fetch(queries.pengumumanQuery, { slug })
}

// Fetch all pengumuman slugs
export async function getAllPengumumanSlugs() {
  return await sanityClient.fetch(queries.pengumumanPathsQuery)
}

// Fetch pengumuman list
export async function getPengumumanList() {
  return await sanityClient.fetch(queries.pengumumanListQuery)
}