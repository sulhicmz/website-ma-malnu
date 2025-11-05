# Rencana Optimasi Website MA Malnu Kananga

Dokumen ini merangkum usulan optimasi jangka pendek dan menengah untuk meningkatkan kualitas teknis, kinerja, serta maintainability codebase.

## 1. Konsolidasi Struktur & Modul

- **Satukan Entri App Router** — Evaluasi kebutuhan direktori ganda `app/` dan `src/app/`. Targetnya adalah memilih satu struktur utama (kemungkinan `src/app/`) lalu memigrasikan komponen prototipe yang relevan agar tidak terjadi duplikasi logika halaman (`app/page.tsx` vs `src/app/page.tsx`).
- **Refactor Layout Tunggal** — Gabungkan konfigurasi layout dari `app/layout.tsx` dan `src/app/layout.tsx` sehingga pemasangan `Navbar`, `Footer`, dan `GoogleTagManager` hanya didefinisikan sekali.
- **Perbaiki Alias Module** — Setelah konsolidasi, pastikan `tsconfig.json` hanya menunjuk ke jalur komponen aktif untuk mencegah import yang mengarah ke file tak terpakai.

## 2. Kinerja & Aksesibilitas

- **Optimalkan Media Hero** — Ganti placeholder `div` kosong pada hero (`components/sections/HeroSection.tsx`) dengan `next/image` atau embed media aktual agar halaman tidak terasa statis sekaligus memanfaatkan optimasi gambar bawaan Next.js.
- **Kurangi Beban Animasi** — Tinjau penggunaan `framer-motion` pada seluruh section (`components/sections/*`). Terapkan lazy motion atau kurangi animasi simultan untuk menekan layout shift dan konsumsi CPU di perangkat low-end.
- **Audit Tailwind Classes** — Pastikan warna kontras dan ukuran font mengikuti pedoman WCAG; gunakan `checklist_wcag_komponen.md` sebagai referensi dan otomatisasi linting aksesibilitas bila memungkinkan.

## 3. Data Fetching & Skalabilitas

- **Pagination Efisien** — Implementasikan parameter pagination pada daftar berita/pengumuman (`src/lib/fetchData.ts`, `src/lib/queries.ts`) agar halaman beranda tidak mem-fetch seluruh koleksi sebelum dipotong di sisi klien.
- **Error Handling Terstruktur** — Lengkapi `src/app/error.tsx` dengan logging terpusat dan fallback UI yang memberi opsi refresh/kembali agar kegagalan fetch tidak memblokir seluruh halaman.
- **Incremental Adoption Streaming** — Pertimbangkan pemanfaatan suspense boundaries untuk section berat (mis. berita terbaru) supaya time-to-first-byte lebih cepat.

## 4. SEO & Analitik

- **Metadata Konsisten** — Integrasikan konfigurasi `defaultSEO` dan `pageSEO` (`src/lib/seo.ts`) langsung ke `generateMetadata` tiap halaman, bukan hanya contoh di `src/app/page-seo-example.tsx`, sehingga metadata konsisten di produksi.
- **Perluas Structured Data** — Terapkan `NewsArticleJSONLD` pada detail berita dan `BreadcrumbJSONLD` di halaman dengan struktur hierarkis untuk meningkatkan rich result.
- **Validasi GTM** — Tambahkan fallback atau logging ketika `NEXT_PUBLIC_GTM_ID` tidak diset agar komponen `src/components/GoogleTagManager.tsx` tidak diam-diam gagal.

## 5. Developer Experience

- **Migrasi ke TypeScript** — Konversi komponen `.jsx` di `src/components/` ke TypeScript demi type safety dan keseragaman dengan komponen baru.
- **Testing Strategy** — Buat test unit untuk helper `src/lib/gtm.ts` dan komponen `WhatsAppButton.tsx` guna memastikan event tracking berjalan pasca refactor.
- **Storybook/Docs** — Pertimbangkan menambahkan Storybook untuk memvisualisasikan komponen `components/sections/*` serta `src/components/*` agar tim desain dapat berkolaborasi lebih efektif.

## 6. Konten & CMS

- **Validasi Skema** — Pastikan setiap perubahan pada `schemas/` diikuti update versi dan migrasi data di Sanity (contoh: slug unik, field wajib, preview builder).
- **Automasi Deploy CMS** — Integrasikan skrip `sanity deploy` ke pipeline agar studio selalu sinkron dengan kode.
- **Checklist Editorial** — Padukan dokumen copywriting (`konten_copywriting.md`, `seo_teknis_konten.md`) dengan panduan di CMS untuk menjaga konsistensi tone dan SEO.

## 7. Observabilitas

- **Monitoring** — Tambahkan integrasi log eksternal (mis. Vercel Observability atau Sentry) pada `src/app/error.tsx` untuk memantau error runtime.
- **Analytics Events** — Gunakan helper `trackPPDBFormSubmit` (`src/lib/gtm.ts`) pada form PPDB aktual ketika tersedia agar funnel pendaftaran dapat dianalisis secara kuantitatif.

Implementasi bertahap dari rencana di atas akan meningkatkan stabilitas, performa, dan kemudahan maintenance website MA Malnu Kananga.
