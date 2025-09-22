# Schema Konten Sanity CMS - MA Malnu Kananga

Dalam direktori ini terdapat definisi schema untuk konten yang akan digunakan di Sanity CMS. Setiap schema mendefinisikan struktur dokumen yang dapat dibuat dan dikelola melalui Sanity Studio.

## Daftar Schema

1. **berita.ts** - Schema untuk konten berita
2. **pengumuman.ts** - Schema untuk pengumuman sekolah
3. **guru.ts** - Schema untuk profil guru dan staf
4. **galeri.ts** - Schema untuk album foto dan galeri
5. **prestasi.ts** - Schema untuk prestasi sekolah dan siswa
6. **faq.ts** - Schema untuk pertanyaan umum
7. **siteSettings.ts** - Schema untuk pengaturan global situs
8. **ppdbSettings.ts** - Schema untuk pengaturan PPDB
9. **kategori.ts** - Schema untuk kategori konten
10. **penulis.ts** - Schema untuk penulis konten
11. **page.ts** - Schema untuk halaman statis
12. **index.ts** - Indeks untuk ekspor semua schema

## Fitur Umum

Setiap schema dilengkapi dengan:

- **Validasi field** yang sesuai dengan kebutuhan konten
- **Preview configuration** untuk menampilkan informasi dokumen di dashboard Sanity
- **Field definitions** yang mendukung kebutuhan konten dinamis
- **TypeScript support** untuk type safety

## Penggunaan

Untuk menggunakan schema ini di project Sanity Anda:

1. Salin semua file `.ts` ke direktori `schemas` di project Sanity Anda
2. Impor schema dalam file `schema.js` atau `schema.ts` Anda
3. Tambahkan schema ke konfigurasi Sanity Anda

Contoh:
```javascript
import { schemaTypes } from './schemas'

export default createConfig({
  // ... konfigurasi lainnya
  schema: {
    types: schemaTypes,
  },
})
```