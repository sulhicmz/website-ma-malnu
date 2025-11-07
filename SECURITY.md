# 🔒 Kebijakan Keamanan

## Versi yang Didukung

Kami saat ini mendukung versi berikut dengan pembaruan keamanan:

| Versi | Didukung          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| < 1.0   | :x:                |

## 🐛 Melaporkan Kerentanan

Keamanan website MA Malnu Kananga adalah prioritas utama kami. Jika Anda menemukan kerentanan keamanan, kami sangat menghargai bantuan Anda dalam mengungkapkannya kepada kami secara bertanggung jawab.

### Cara Melaporkan

**JANGAN** membuat issue publik untuk kerentanan keamanan.

Sebagai gantinya, silakan laporkan kerentanan keamanan melalui salah satu cara berikut:

1. **GitHub Security Advisories** (Direkomendasikan)
   - Buka [Security Advisories](https://github.com/sulhicmz/website-ma-malnu/security/advisories/new)
   - Klik "Report a vulnerability"
   - Isi formulir dengan detail lengkap

2. **Email Langsung**
   - Kirim email ke: [INSERT SECURITY EMAIL]
   - Gunakan subjek: `[SECURITY] Deskripsi singkat kerentanan`

### Informasi yang Harus Disertakan

Untuk membantu kami memahami dan mengatasi masalah dengan cepat, mohon sertakan:

- **Deskripsi kerentanan**: Jelaskan masalah keamanan dengan detail
- **Langkah reproduksi**: Langkah-langkah untuk mereproduksi kerentanan
- **Dampak potensial**: Apa yang bisa dilakukan penyerang dengan kerentanan ini
- **Versi yang terpengaruh**: Versi atau commit yang terpengaruh
- **Proof of Concept**: Kode atau screenshot jika memungkinkan
- **Saran perbaikan**: Jika Anda memiliki ide untuk memperbaikinya

### Contoh Laporan

```
Subject: [SECURITY] SQL Injection di Form PPDB

Deskripsi:
Ditemukan kerentanan SQL Injection pada form pendaftaran PPDB yang
memungkinkan penyerang untuk mengakses atau memodifikasi database.

Langkah Reproduksi:
1. Buka halaman /ppdb/daftar
2. Masukkan payload berikut di field nama: ' OR '1'='1
3. Submit form
4. Database query tereksekusi tanpa sanitasi

Dampak:
- Akses tidak sah ke database
- Potensi data breach informasi siswa
- Modifikasi atau penghapusan data

Versi: main branch (commit abc123)

Saran:
Gunakan prepared statements atau ORM untuk semua query database.
```

## 📋 Proses Penanganan

Setelah Anda melaporkan kerentanan:

1. **Konfirmasi Penerimaan** (24-48 jam)
   - Kami akan mengkonfirmasi penerimaan laporan Anda

2. **Investigasi Awal** (3-5 hari)
   - Tim akan menginvestigasi dan memvalidasi kerentanan
   - Kami mungkin meminta informasi tambahan

3. **Pengembangan Perbaikan** (Tergantung severity)
   - Critical: 1-7 hari
   - High: 7-14 hari
   - Medium: 14-30 hari
   - Low: 30-90 hari

4. **Rilis Patch**
   - Patch akan dirilis setelah testing menyeluruh
   - Security advisory akan dipublikasikan

5. **Pengakuan Publik**
   - Kami akan mengakui kontribusi Anda (jika Anda menginginkannya)
   - Nama Anda akan ditambahkan ke Hall of Fame

## 🏆 Hall of Fame

Kami berterima kasih kepada peneliti keamanan berikut yang telah membantu meningkatkan keamanan proyek ini:

<!-- Akan diupdate setelah ada laporan -->
*Belum ada kontributor keamanan*

## 🛡️ Best Practices Keamanan

### Untuk Kontributor

Saat berkontribusi, pastikan untuk:

- ✅ Tidak pernah commit credentials atau API keys
- ✅ Gunakan environment variables untuk data sensitif
- ✅ Validasi dan sanitasi semua input user
- ✅ Gunakan HTTPS untuk semua komunikasi
- ✅ Implementasikan rate limiting untuk API endpoints
- ✅ Gunakan prepared statements untuk database queries
- ✅ Implementasikan proper authentication dan authorization
- ✅ Keep dependencies up to date
- ✅ Review kode untuk kerentanan keamanan

### Untuk Pengguna

Saat menggunakan website:

- ✅ Gunakan password yang kuat dan unik
- ✅ Aktifkan 2FA jika tersedia
- ✅ Jangan share credentials Anda
- ✅ Logout setelah selesai menggunakan
- ✅ Laporkan aktivitas mencurigakan
- ✅ Keep browser Anda up to date

## 🔐 Keamanan Dependencies

Kami menggunakan tools berikut untuk menjaga keamanan dependencies:

- **Dependabot**: Otomatis membuat PR untuk update dependencies
- **npm audit**: Regular security audits
- **Snyk**: Continuous security monitoring

### Menjalankan Security Audit

```bash
# Check untuk vulnerabilities
npm audit

# Fix vulnerabilities otomatis
npm audit fix

# Fix dengan breaking changes
npm audit fix --force
```

## 📚 Resources Keamanan

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Sanity Security](https://www.sanity.io/docs/security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## 🔄 Update Kebijakan

Kebijakan keamanan ini dapat berubah sewaktu-waktu. Perubahan signifikan akan dikomunikasikan melalui:

- GitHub Security Advisories
- Repository announcements
- Email ke kontributor aktif

## ⚖️ Disclosure Policy

- Kami mengikuti **Responsible Disclosure** policy
- Kami meminta waktu 90 hari sebelum disclosure publik
- Kami akan bekerja sama dengan Anda untuk koordinasi disclosure
- Kami tidak akan mengambil tindakan hukum terhadap peneliti yang mengikuti kebijakan ini

## 📞 Kontak

Untuk pertanyaan tentang kebijakan keamanan ini:

- **Security Issues**: [GitHub Security Advisories](https://github.com/sulhicmz/website-ma-malnu/security/advisories)
- **General Questions**: [GitHub Discussions](https://github.com/sulhicmz/website-ma-malnu/discussions)

---

**Terima kasih telah membantu menjaga keamanan Website MA Malnu Kananga! 🙏**

*Last Updated: 2025-11-05*
