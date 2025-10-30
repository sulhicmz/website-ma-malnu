# Dokumentasi Codebase MA Malnu Kananga

Dokumen ini merangkum struktur teknis dan alur kerja utama di dalam repositori `website-ma-malnu`. Gunakan panduan ini sebagai referensi onboarding developer maupun saat merencanakan iterasi fitur baru.

## 1. Arsitektur Next.js

- **App Router** — Proyek menggunakan Next.js 14 dengan App Router. Terdapat dua entri:
  - `app/` berisi halaman beranda prototipe yang fokus pada eksplorasi desain menggunakan komponen TypeScript (`app/page.tsx`, `components/sections/*`).
  - `src/app/` memuat implementasi terhubung ke Sanity, termasuk layout (`src/app/layout.tsx`), halaman utama (`src/app/page.tsx`), contoh SEO lanjutan (`src/app/layout-with-seo.tsx`, `src/app/page-seo-example.tsx`), error boundary (`src/app/error.tsx`), halaman 404 (`src/app/not-found.tsx`), dan generator `sitemap` (`src/app/sitemap.ts`).
- **Layout Global** — `src/app/layout.tsx` memasang `Navbar`, `Footer`, serta `GoogleTagManager`, dan mendeklarasikan metadata default untuk seluruh halaman.
- **Revalidasi Konten** — Halaman di `src/app/page.tsx` menggunakan `export const revalidate = 300` untuk memicu Incremental Static Regeneration setiap 5 menit.

## 2. Lapisan Data Sanity

- **Konfigurasi Client** — `src/lib/sanity.ts` membentuk `sanityClient` dan helper `urlFor`/`urlForImage` dengan konfigurasi `projectId`, `dataset`, `apiVersion`, serta `useCdn` berbasis variabel lingkungan.
- **Query GROQ** — `src/lib/queries.ts` menyimpan query untuk `siteSettings`, `page`, `berita`, `guru`, `pengumuman`, lengkap dengan relasi author/category dan pagination.
- **Fungsi Fetching** — `src/lib/fetchData.ts` mengkapsulasi panggilan ke Sanity (`getSiteSettings`, `getBeritaList`, `getPengumumanList`, dsb.) sehingga halaman dapat melakukan fetching secara konsisten sekaligus memanfaatkan konstanta `REVALIDATION_TIME`.
- **Penggunaan di Halaman** — `src/app/page.tsx` mengambil data dari fungsi tersebut, memotong daftar untuk tampilan beranda, dan meneruskan data ke komponen UI.

## 3. Sistem Komponen

- **Desain Sistem Baru (`components/`)**
  - `components/layout/` menyertakan `Navbar`, `Footer`, `Breadcrumb` berbasis TypeScript dan ikon `lucide-react`.
  - `components/sections/` mengandung blok beranda seperti `HeroSection`, `PPDBHighlight`, `NewsSection`, `FacilitySection`, `TestimonialSection`, `GallerySection`, dan `CTASection` yang memanfaatkan `framer-motion` untuk animasi.
  - `components/ui/` menyediakan elemen kartu (`CardBerita`, `CardGuru`), grid galeri, dan pagination.
- **Komponen Produksi (`src/components/`)**
  - Versi `.jsx` dari `Navbar`, `Footer`, `CardBerita`, `CardGuru`, `GalleryGrid`, `Pagination`, dan `Breadcrumb` yang saat ini dipakai oleh `src/app`.
  - Utilitas analitik (`GoogleTagManager.tsx`) dan komponen SEO (`src/components/seo/*`).
  - `WhatsAppButton.tsx` mendemonstrasikan interaksi event tracking melalui helper GTM.

## 4. SEO, Analitik, & Pelacakan Event

- `src/lib/seo.ts` berisi konfigurasi SEO default (`defaultSEO`) serta mapping metadata `pageSEO` untuk beragam halaman utama (beranda, profil, berita, PPDB, dsb.).
- `src/components/seo/MetaTags.tsx` dan `OrganizationJSONLD.tsx` menyuntikkan meta tag standar serta structured data schema.org; `NewsArticleJSONLD.tsx` cocok digunakan pada detail berita.
- `src/components/GoogleTagManager.tsx` menambahkan skrip GTM ketika environment `production` dan mengirim event `pageview` berdasarkan `pathname` & `searchParams` Next.js.
- `src/lib/gtm.ts` menyediakan helper `trackEvent`, `trackPPDBFormSubmit`, dan `trackWhatsAppClick` untuk mencatat interaksi penting.
- `src/components/WhatsAppButton.tsx` menggunakan helper tersebut agar setiap klik WhatsApp tercatat dengan konteks.

## 5. Skema Konten Sanity

Direktori `schemas/` mendefinisikan seluruh tipe dokumen: `siteSettings`, `page`, `berita`, `guru`, `pengumuman`, `faq`, `prestasi`, `kategori`, `penulis`, dan `ppdbSettings`. Struktur ini harus tetap sinkron dengan studio Sanity agar data dapat dikonsumsi oleh situs tanpa error runtime.

## 6. Styling & Desain

- Tailwind dikonfigurasi melalui `tailwind.config.js` / `tailwind.config.ts` dan `postcss.config.js`.
- `desain_tokens.md`, `brand_guide_onepage.md`, serta dokumen terkait di root memberikan acuan visual, tone, dan guideline brand.
- Komponen di `components/sections/*` banyak menggunakan gradient, animasi `framer-motion`, serta layout responsif yang mengikuti utility Tailwind.

## 7. Testing & Tooling

- `package.json` mendeklarasikan skrip penting: `dev`, `build`, `start`, `lint`, `type-check`, `test`, `test:e2e`, `sanity:*`, hingga `format`.
- Dukungan testing mencakup Vitest (unit), Testing Library, dan Playwright (E2E). Pastikan environment test terpasang sebelum menjalankan pipeline CI/CD.

## 8. Langkah Onboarding Cepat

1. Duplikasi `.env.local` dan isi kredensial Sanity (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`) serta `NEXT_PUBLIC_GTM_ID` bila menggunakan GTM.
2. Jalankan `npm install` lalu `npm run dev` untuk melihat halaman prototipe (`/`) dan implementasi terintegrasi (`src/app/page.tsx`).
3. Gunakan dokumen pendukung di root (mis. `pengujian_qa.md`, `teknis_stack_repository.md`) untuk memahami ekspektasi QA, workflow, dan roadmap.

## 9. Catatan Pengembangan Lanjut

- Pertahankan konsistensi antara komponen TypeScript dan JSX sebelum melakukan refactor besar agar tidak memutus jalur data yang ada.
- Pastikan setiap query baru di `src/lib/queries.ts` memiliki representasi skema pada `schemas/`.
- Dokumentasikan fitur baru dengan menambahkan file `dokumentasi_*.md` atau memperbarui dokumen terkait sehingga pengetahuan tetap tersentralisasi.
