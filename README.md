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

## 🤝 Kontribusi

Kami menyambut kontribusi dari siapa saja! Sebelum berkontribusi, silakan baca:

- [Contributing Guidelines](CONTRIBUTING.md) - Panduan lengkap untuk berkontribusi
- [Code of Conduct](CODE_OF_CONDUCT.md) - Kode etik komunitas kami
- [Security Policy](SECURITY.md) - Cara melaporkan masalah keamanan

### Quick Start untuk Kontributor

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan Anda (`git commit -m 'feat: add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

## 📋 Issue Templates

Kami menyediakan template untuk memudahkan Anda:

- [🐛 Bug Report](.github/ISSUE_TEMPLATE/bug_report.yml) - Laporkan bug
- [✨ Feature Request](.github/ISSUE_TEMPLATE/feature_request.yml) - Usulkan fitur baru
- [📚 Documentation](.github/ISSUE_TEMPLATE/documentation.yml) - Perbaikan dokumentasi

## 💬 Dukungan

Butuh bantuan? Lihat [SUPPORT.md](SUPPORT.md) untuk berbagai cara mendapatkan dukungan:

- 📚 [Dokumentasi](SUPPORT.md#dokumentasi)
- 💬 [GitHub Discussions](https://github.com/sulhicmz/website-ma-malnu/discussions)
- 🐛 [Issue Tracker](https://github.com/sulhicmz/website-ma-malnu/issues)

## 📝 Changelog

Lihat [CHANGELOG.md](CHANGELOG.md) untuk daftar perubahan di setiap versi.

## 📄 Lisensi

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Acknowledgments

Terima kasih kepada semua kontributor yang telah membantu proyek ini!

---

**Dibuat dengan ❤️ untuk MA Malnu Kananga**
