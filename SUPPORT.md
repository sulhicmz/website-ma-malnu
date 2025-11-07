# 💬 Dukungan

Terima kasih telah menggunakan Website MA Malnu Kananga! Jika Anda memerlukan bantuan, ada beberapa cara untuk mendapatkan dukungan.

## 📚 Dokumentasi

Sebelum meminta bantuan, silakan periksa dokumentasi yang tersedia:

- **[README.md](README.md)** - Informasi umum dan panduan instalasi
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Panduan untuk kontributor
- **[FAQ](#faq)** - Pertanyaan yang sering diajukan (lihat di bawah)

## 🐛 Melaporkan Bug

Jika Anda menemukan bug, silakan:

1. Cek [existing issues](https://github.com/sulhicmz/website-ma-malnu/issues) untuk melihat apakah sudah dilaporkan
2. Jika belum, buat [Bug Report](https://github.com/sulhicmz/website-ma-malnu/issues/new?template=bug_report.yml)
3. Sertakan informasi sebanyak mungkin untuk membantu kami mereproduksi masalah

## 💡 Mengusulkan Fitur

Punya ide untuk fitur baru? Kami ingin mendengarnya!

1. Cek [existing feature requests](https://github.com/sulhicmz/website-ma-malnu/issues?q=is%3Aissue+label%3Aenhancement)
2. Jika belum ada, buat [Feature Request](https://github.com/sulhicmz/website-ma-malnu/issues/new?template=feature_request.yml)
3. Jelaskan use case dan manfaat dari fitur yang diusulkan

## 💬 Diskusi

Untuk pertanyaan umum, diskusi, atau berbagi ide:

- **[GitHub Discussions](https://github.com/sulhicmz/website-ma-malnu/discussions)** - Forum diskusi komunitas
  - 💡 Ideas - Berbagi dan diskusikan ide
  - 🙏 Q&A - Tanya jawab
  - 📣 Announcements - Pengumuman penting
  - 🗣️ General - Diskusi umum

## 🔒 Masalah Keamanan

**JANGAN** laporkan masalah keamanan melalui issue publik!

Silakan baca [SECURITY.md](SECURITY.md) untuk cara melaporkan kerentanan keamanan secara bertanggung jawab.

## 📧 Kontak Langsung

Untuk pertanyaan yang tidak dapat dijawab melalui saluran di atas:

- **Email**: [INSERT CONTACT EMAIL]
- **Website**: [https://ma-malnu-kananga.sch.id](https://ma-malnu-kananga.sch.id) (jika sudah live)

## ⏱️ Waktu Respons

Kami berusaha untuk merespons secepat mungkin, tetapi harap diingat bahwa ini adalah proyek open source yang dikelola oleh volunteer:

- **Bug Critical**: 24-48 jam
- **Bug Non-Critical**: 3-7 hari
- **Feature Requests**: 7-14 hari
- **Questions**: 1-3 hari
- **Security Issues**: 24 jam

## 🤝 Cara Membantu Kami Membantu Anda

Untuk mendapatkan bantuan lebih cepat, pastikan untuk:

### ✅ Do's

- Cari dokumentasi dan existing issues terlebih dahulu
- Berikan informasi yang lengkap dan jelas
- Sertakan langkah-langkah untuk mereproduksi masalah
- Tambahkan screenshot atau video jika memungkinkan
- Sebutkan versi, browser, dan OS yang Anda gunakan
- Bersikap sopan dan sabar

### ❌ Don'ts

- Jangan buat duplicate issues
- Jangan gunakan issue untuk pertanyaan umum (gunakan Discussions)
- Jangan bump issue tanpa informasi baru
- Jangan tag maintainer secara langsung kecuali urgent
- Jangan gunakan bahasa yang kasar atau tidak sopan

## 📋 FAQ

### Pertanyaan Umum

#### Q: Bagaimana cara menjalankan proyek ini secara lokal?

**A:** Ikuti langkah-langkah di [README.md](README.md#instalasi):
```bash
npm install
cp .env.example .env.local
# Edit .env.local dengan konfigurasi Sanity Anda
npm run dev
```

#### Q: Saya mendapat error "Module not found", apa yang harus dilakukan?

**A:** Coba langkah-langkah berikut:
1. Hapus folder `node_modules` dan file `package-lock.json`
2. Jalankan `npm install` lagi
3. Restart development server

#### Q: Bagaimana cara berkontribusi?

**A:** Baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lengkap kontribusi.

#### Q: Apakah saya perlu izin untuk menggunakan kode ini?

**A:** Proyek ini menggunakan MIT License. Anda bebas menggunakan, memodifikasi, dan mendistribusikan kode ini. Lihat [LICENSE](LICENSE) untuk detail.

#### Q: Bagaimana cara melaporkan masalah keamanan?

**A:** Jangan buat issue publik. Baca [SECURITY.md](SECURITY.md) untuk cara melaporkan secara privat.

### Pertanyaan Teknis

#### Q: Versi Node.js apa yang didukung?

**A:** Kami merekomendasikan Node.js 18.x atau lebih tinggi.

#### Q: Apakah bisa menggunakan Yarn atau pnpm?

**A:** Ya, tetapi kami merekomendasikan npm untuk konsistensi dengan dokumentasi.

#### Q: Bagaimana cara mengupdate dependencies?

**A:**
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update package-name
```

#### Q: Error saat build, apa yang harus dilakukan?

**A:**
1. Pastikan semua environment variables sudah diset
2. Cek console untuk error message spesifik
3. Coba `npm run build` dengan verbose: `npm run build --verbose`
4. Jika masih error, buat issue dengan error log lengkap

### Pertanyaan Deployment

#### Q: Bagaimana cara deploy ke Vercel?

**A:** Lihat panduan di [README.md](README.md#deploy) atau [deploy_domain.md](deploy_domain.md).

#### Q: Apakah bisa deploy ke platform lain selain Vercel?

**A:** Ya, Next.js bisa di-deploy ke berbagai platform seperti Netlify, AWS, atau self-hosted. Lihat [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).

#### Q: Bagaimana cara setup custom domain?

**A:** Lihat panduan lengkap di [deploy_domain.md](deploy_domain.md).

## 🌟 Komunitas

Bergabunglah dengan komunitas kami:

- **GitHub Discussions**: Diskusi dan tanya jawab
- **Issues**: Bug reports dan feature requests
- **Pull Requests**: Kontribusi kode

## 📚 Resources Tambahan

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🙏 Terima Kasih

Terima kasih telah menggunakan Website MA Malnu Kananga! Kami menghargai kesabaran dan dukungan Anda.

---

**Tidak menemukan jawaban yang Anda cari?**

Buka [GitHub Discussions](https://github.com/sulhicmz/website-ma-malnu/discussions) dan tanyakan kepada komunitas!

*Last Updated: 2025-11-05*
