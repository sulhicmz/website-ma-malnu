# Website MA Malnu Kananga

Website resmi Madrasah Aliyah Malnu Kananga dibangun dengan Next.js 14 App Router dan Sanity CMS.

## Fitur

- Server Components untuk data fetching
- Static Site Generation (SSG) dan Incremental Static Regeneration (ISR)
- Dynamic routes untuk konten halaman
- SEO optimization dengan generateMetadata
- Error handling dengan error.tsx
- Responsive design dengan Tailwind CSS

## Teknologi

- [Next.js 14](https://nextjs.org/) - Framework React
- [Sanity CMS](https://www.sanity.io/) - Content Management System
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## Struktur Direktori

```
src/
├── app/                 # App Router pages
│   ├── [slug]/          # Dynamic pages
│   ├── berita/          # News section
│   ├── guru-staf/       # Teachers and staff section
│   ├── pengumuman/      # Announcements section
│   ├── profil/          # School profile section
│   └── ppdb/            # Student registration section
├── components/          # React components
├── lib/                 # Utility functions and Sanity client
└── schemas/             # Sanity schemas
```

## Instalasi

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```
3. Salin file `.env.example` menjadi `.env.local` dan isi dengan konfigurasi Sanity Anda
4. Jalankan development server:
   ```bash
   npm run dev
   ```

## Pengembangan

### Menambahkan Halaman Baru

1. Buat file baru di `src/app/` dengan format `[nama-halaman]/page.tsx`
2. Tambahkan fungsi `generateMetadata` untuk SEO
3. Gunakan `revalidate` untuk mengatur cache
4. Tambahkan `error.tsx` untuk error handling

### Menambahkan Komponen

1. Buat file komponen di `src/components/`
2. Export komponen di `src/components/index.js`
3. Gunakan komponen di halaman dengan `import { NamaKomponen } from '@/components/NamaKomponen'`

## Deploy

Untuk deploy ke Vercel:

1. Push ke GitHub
2. Buat project baru di Vercel
3. Hubungkan dengan repository GitHub
4. Tambahkan environment variables di pengaturan Vercel
5. Deploy!

## Lisensi

MIT License