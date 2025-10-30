# Website MA Malnu Kananga

Repositori ini berisi kode sumber website resmi MA Malnu Kananga yang dibangun dengan Next.js 14 App Router, Tailwind CSS, dan integrasi Sanity CMS untuk pengelolaan konten.

## Ringkasan Proyek

- **Framework**: Next.js 14 dengan App Router dan dukungan Server Components untuk fetching data dan revalidasi konten periodik.
- **Bahasa**: TypeScript dan JavaScript (beberapa komponen warisan masih menggunakan `.jsx`).
- **Styling**: Tailwind CSS dengan konfigurasi token desain dan komponen antarmuka siap pakai.
- **Konten**: Terhubung dengan Sanity CMS untuk mengelola berita, pengumuman, guru, halaman statis, dan pengaturan situs.
- **SEO & Analitik**: Utilitas SEO modular, dukungan JSON-LD, dan integrasi Google Tag Manager.

## Struktur Direktori Utama

```
.
├── app/                      # Halaman beranda prototipe dengan komponen TypeScript modern
├── components/               # Desain sistem baru (layout, sections, ui) berbasis TypeScript
├── src/
│   ├── app/                  # Implementasi halaman utama terintegrasi Sanity (layout, error, sitemap)
│   ├── components/           # Komponen produksi (JSX) + utilitas SEO & analitik
│   └── lib/                  # Client Sanity, query GROQ, helper SEO & GTM
├── schemas/                  # Skema konten Sanity (berita, guru, siteSettings, dsb.)
├── public/                   # Aset statis (ikon, gambar OG, dsb.)
├── scripts/                  # Dokumentasi skrip tambahan
└── dokumentasi_*.md          # Dokumen perancangan fitur dan panduan internal
```

> Catatan: Direktori `app/` menyajikan variasi halaman beranda berbasis komponen desain terbaru, sedangkan `src/app/` memuat implementasi yang tersambung ke Sanity CMS lengkap dengan layout, error handling, dan SEO utilitas.

## Alur Data & Konten

1. **Client Sanity** — `src/lib/sanity.ts` mengonfigurasi `sanityClient` dan helper gambar menggunakan kredensial lingkungan (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`).
2. **Query GROQ** — `src/lib/queries.ts` mendefinisikan query untuk site settings, halaman statis, berita, guru, dan pengumuman.
3. **Lapisan Fetching** — `src/lib/fetchData.ts` mengekspos fungsi async yang dipakai oleh Server Components (`src/app/page.tsx`) serta mendukung revalidasi (ISR) melalui konstanta `REVALIDATION_TIME`.
4. **Render Halaman** — `src/app/page.tsx` menyiapkan metadata dinamis, mengambil daftar konten dari Sanity, dan merender komponen kartu/galleries.
5. **Skema CMS** — Direktori `schemas/` menjaga konsistensi struktur konten antara situs dan studio Sanity.

## SEO & Analitik

- `src/lib/seo.ts` menyediakan konfigurasi SEO default dan mapping metadata untuk berbagai halaman utama.
- Direktori `src/components/seo/` berisi komponen `MetaTags`, `OrganizationJSONLD`, `NewsArticleJSONLD`, dan `BreadcrumbJSONLD` untuk memasukkan meta tag serta structured data.
- `src/components/GoogleTagManager.tsx` menanamkan skrip GTM (hanya aktif di production) dan melacak pageview berdasarkan path Next.js.
- `src/lib/gtm.ts` serta `src/components/WhatsAppButton.tsx` menunjukkan contoh pelacakan event kustom (mis. klik tombol WhatsApp atau submit PPDB).

## Menjalankan Proyek

1. **Instalasi Dependensi**
   ```bash
   npm install
   ```
2. **Variabel Lingkungan**
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `NEXT_PUBLIC_GTM_ID` (opsional, untuk Google Tag Manager)
   Simpan pada `.env.local` sebelum menjalankan aplikasi.
3. **Pengembangan**
   ```bash
   npm run dev
   ```
4. **Build Produksi & Preview**
   ```bash
   npm run build
   npm start
   ```

## Pemeriksaan Kualitas

- `npm run lint` — menjalankan ESLint.
- `npm run type-check` — memastikan konsistensi TypeScript.
- `npm run test` — menjalankan Vitest unit test.
- `npm run test:e2e` — menjalankan Playwright end-to-end test.
- `npm run format` — memformat kode menggunakan Prettier (termasuk plugin Tailwind).

## Sumber Dokumentasi Internal

Repositori ini menyertakan puluhan dokumen konseptual (mis. `branding_guide.md`, `pengujian_qa.md`, `wireframe_ux_design.md`) yang menjabarkan strategi brand, copywriting, desain, dan QA. Gunakan dokumen tersebut sebagai referensi ketika menambah fitur baru atau menyesuaikan konten.

## Lisensi

MIT License.
