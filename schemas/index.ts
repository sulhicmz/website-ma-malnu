// schemas/index.ts
import berita from './berita'
import pengumuman from './pengumuman'
import guru from './guru'
import galeri from './galeri'
import prestasi from './prestasi'
import faq from './faq'
import siteSettings from './siteSettings'
import ppdbSettings from './ppdbSettings'

// Additional supporting schemas that might be needed
import kategori from './kategori'
import penulis from './penulis'
import page from './page'

export const schemaTypes = [
  berita,
  pengumuman,
  guru,
  galeri,
  prestasi,
  faq,
  siteSettings,
  ppdbSettings,
  kategori,
  penulis,
  page,
]