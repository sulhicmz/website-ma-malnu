# Rencana Iterasi: Implementasi Fitur PPDB Online

## 1. Pemahaman Workspace & Lingkungan
- **Stack utama:** Next.js 14 dengan TypeScript, Tailwind CSS, dan integrasi Sanity CMS untuk konten dinamis. Skrip build & testing tersedia melalui npm (`dev`, `build`, `lint`, `test`, `test:e2e`). 【F:package.json†L1-L46】
- **Struktur aplikasi:** Direktori `src/app` mengikuti pola app router Next.js dengan halaman untuk PPDB, berita, pengumuman, galeri, dan lainnya. Komponen UI reusable berada di `src/components`, sedangkan utilitas data di `src/lib`. 【F:src/app/page.tsx†L1-L101】【F:src/app/page.tsx†L102-L160】
- **Dependensi eksternal:** Sanity digunakan untuk manajemen konten (`@sanity/client`, `next-sanity`), Upstash Redis/Rate limit untuk API, serta testing stack Vitest & Playwright. 【F:package.json†L21-L58】
- **Standar kualitas:** ESLint, Prettier, dan TypeScript disediakan; tidak ditemukan konfigurasi custom tambahan sehingga standar bawaan Next.js + Tailwind digunakan.
- **CI/CD asumsi:** Belum ada pipeline eksplisit di repo; perlu penyelarasan manual dengan skrip npm saat integrasi ke platform deploy (mis. Vercel / Sanity Deploy). 

## 2. Kebutuhan & Pemangku Kepentingan
| Pemangku Kepentingan | Kebutuhan | Dampak | Prioritas | Risiko |
| --- | --- | --- | --- | --- |
| Calon siswa & orang tua | Mengisi formulir PPDB lengkap secara daring dengan validasi dan unggah dokumen. | Tinggi (langsung memengaruhi penerimaan siswa). | P1 | Potensi kegagalan unggah dokumen, kesalahan validasi data. |
| Admin sekolah/Operator PPDB | Mengelola data pendaftar, menerima notifikasi, dan mengunduh data terstruktur. | Tinggi | P1 | Integrasi backend dan keamanan data sensitif. |
| Tim TI / Pengelola Website | Memelihara infrastruktur, memastikan performa & keamanan. | Sedang | P2 | Kompleksitas integrasi Sanity/Upstash, skalabilitas. |
| Tim konten/marketing | Menyediakan panduan & informasi PPDB pada halaman. | Sedang | P3 | Konsistensi konten, pembaruan berkala. |

## 3. User Story & Acceptance Criteria
- **User Story:** Sebagai calon siswa, saya ingin mengisi formulir PPDB online lengkap dengan unggahan dokumen pendukung sehingga saya dapat mendaftar tanpa datang ke sekolah.
- **Acceptance Criteria:**
  1. Semua field yang didefinisikan dalam spesifikasi PPDB wajib tersedia dan memiliki validasi sesuai aturan (panjang digit, format tanggal, email, angka). 【F:fitur_ppdb_online.md†L1-L120】
  2. Pengguna dapat menyimpan dan mengirim formulir; sistem menampilkan pesan sukses dan mengirim notifikasi ke admin.
  3. Dokumen wajib minimal satu unggahan dan divalidasi tipe/ukuran file sebelum submit.
  4. Data yang masuk tersimpan di backend (Sanity atau Upstash) dan dapat diakses admin.
  5. Halaman responsif, aksesibel (WCAG AA) dan memuat dalam <3 detik pada koneksi standar.

## 4. Perubahan Sistem & Strategi Pengujian
- **UI:** Buat halaman `src/app/ppdb/page.tsx` yang memanfaatkan komponen form reusable (field teks, select, upload) sesuai panduan di `komponen_form_field.md` dan `spesifikasi_form_ppdb.md`. Integrasikan state React Hook Form.
- **API:** Endpoint `src/app/api/ppdb/route.ts` untuk menerima POST, memvalidasi dengan Zod schema (`lib/validation/ppdb.ts`), menyimpan data ke Sanity (dataset `ppdb_submissions`) dan memicu notifikasi email/Discord (opsional).
- **Data:** Skema Sanity baru `schemas/ppdbSubmission.ts` dengan struktur mirror `PPDBFormValues` + metadata (timestamp, status). Pertimbangkan enkripsi ringan untuk data sensitif sebelum kirim.
- **Dokumentasi:** Update panduan admin pada `dokumentasi_pelatihan.md` dan changelog internal jika tersedia.
- **Strategi Pengujian:**
  - Unit test Zod schema dan helper API dengan Vitest.
  - Integration test API route menggunakan supertest / Next test utilities.
  - E2E form submission happy path dan validasi error via Playwright.
  - Manual QA fokus aksesibilitas (navigasi keyboard, label ARIA) serta pengujian unggah dokumen besar.

## 5. Daftar Tugas Granular
Status awal semua tugas: `TODO`

### Inisiasi
- [ ] Audit konfigurasi Next.js & Sanity untuk persiapan dataset `ppdb_submissions`.
- [ ] Sinkronisasi branch kerja dengan `main` dan menyiapkan variabel lingkungan (.env.local) termasuk kredensial Sanity & Upstash.
- [ ] Menyusun skema `schemas/ppdbSubmission.ts` dan migrasi Sanity.
- [ ] Membuat modul validasi `src/lib/validation/ppdb.ts` berdasarkan spesifikasi.

### Pengembangan Frontend
- [ ] Merancang struktur form PPDB (React Hook Form + Zod resolver).
- [ ] Mengimplementasikan komponen field (input, select, upload) sesuai guide.
- [ ] Menambahkan state progres, ringkasan data sebelum submit, dan notifikasi sukses/gagal.

### Pengembangan Backend
- [ ] Endpoint API Next.js untuk submit PPDB dengan rate limiting (Upstash).
- [ ] Integrasi penyimpanan ke Sanity + fallback penyimpanan file (S3/local placeholder).
- [ ] Implementasi notifikasi admin (email/Discord webhook) setelah submit.

### Pengujian & QA
- [ ] Unit & integration test untuk validasi dan API.
- [ ] Skenario Playwright untuk flow sukses & validasi wajib.
- [ ] Uji manual aksesibilitas + performa (Lighthouse lokal).

### Dokumentasi & Rilis
- [ ] Update dokumentasi internal (panduan admin, changelog).
- [ ] Siapkan SOP review internal & checklist rilis.
- [ ] Tinjau ulang `todo.md` untuk iterasi berikutnya setelah penyelesaian.

## 6. Definisi Selesai (DoD)
- Semua acceptance criteria terpenuhi.
- Seluruh checklist di atas berstatus selesai dan diverifikasi oleh QA internal.
- Tidak ada error pada `npm run lint`, `npm run test`, `npm run test:e2e`, dan `npm run build`.
- Dokumentasi pengguna & admin diperbarui, termasuk instruksi penanganan data pendaftar.
- Monitoring dasar (log error/submit) aktif untuk 48 jam pasca rilis.

## 7. Catatan Teknis & Risiko
- Perlu memastikan storage dokumen sesuai regulasi privasi; sementara dapat gunakan penyimpanan sementara dengan rencana migrasi ke layanan resmi sekolah.
- Validasi file di sisi klien & server untuk mencegah upload berbahaya.
- Pertimbangkan throttling Upstash agar API tidak disalahgunakan selama periode pendaftaran.
- Rencanakan fallback offline (form PDF) bila layanan down.
