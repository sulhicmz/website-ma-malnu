# Pengujian & QA - MA Malnu Kananga

## Test Plan: Kasus Uji Unit Komponen Utama

### 1. Komponen Navbar

#### Test Cases
| ID | Deskripsi Test | Langkah-langkah | Data Input | Hasil yang Diharapkan | Status |
|----|----------------|-----------------|------------|----------------------|--------|
| NAV-001 | Tampilan navbar di desktop | 1. Buka halaman beranda di layar desktop<br>2. Periksa tampilan navbar | - | Navbar menampilkan logo, menu navigasi, dan tombol CTA |  |
| NAV-002 | Tampilan navbar di mobile | 1. Buka halaman beranda di layar mobile<br>2. Periksa tampilan navbar | - | Navbar menampilkan logo dan tombol hamburger |  |
| NAV-003 | Fungsi menu hamburger | 1. Klik tombol hamburger di mobile<br>2. Periksa menu dropdown | - | Menu dropdown muncul dengan semua item navigasi |  |
| NAV-004 | Navigasi ke halaman lain | 1. Klik item menu "Profil"<br>2. Periksa URL dan konten halaman | - | Pengguna diarahkan ke halaman profil dengan konten yang benar |  |
| NAV-005 | Fungsi tombol CTA | 1. Klik tombol "Daftar Sekarang"<br>2. Periksa URL tujuan | - | Pengguna diarahkan ke halaman PPDB |  |

### 2. Komponen Card Berita

#### Test Cases
| ID | Deskripsi Test | Langkah-langkah | Data Input | Hasil yang Diharapkan | Status |
|----------------|-----------------|------------|----------------------|--------|
| CARD-001 | Tampilan card berita | 1. Buka halaman berita<br>2. Periksa tampilan card berita | - | Card berita menampilkan judul, excerpt, tanggal, dan author |  |
| CARD-002 | Fungsi tombol "Baca Selengkapnya" | 1. Klik tombol "Baca Selengkapnya" pada card berita<br>2. Periksa URL dan konten halaman | - | Pengguna diarahkan ke halaman detail berita yang benar |  |
| CARD-003 | Truncate teks excerpt | 1. Periksa panjang teks excerpt pada card berita<br>2. Verifikasi jumlah karakter | - | Excerpt dibatasi hingga 150 karakter dengan elipsis |  |
| CARD-004 | Tampilan tanggal format Indonesia | 1. Periksa format tanggal pada card berita<br>2. Verifikasi sesuai format lokal | - | Tanggal ditampilkan dalam format "DD MMMM YYYY" |  |

### 3. Komponen Formulir PPDB

#### Test Cases
| ID | Deskripsi Test | Langkah-langkah | Data Input | Hasil yang Diharapkan | Status |
|----|----------------|-----------------|------------|----------------------|--------|
| FORM-001 | Validasi field wajib | 1. Kosongkan semua field<br>2. Klik tombol submit | - | Menampilkan pesan error untuk semua field wajib |  |
| FORM-002 | Validasi format email | 1. Masukkan format email tidak valid<br>2. Klik tombol submit | email: "test@" | Menampilkan pesan error "Format email tidak valid" |  |
| FORM-003 | Validasi NIK 16 digit | 1. Masukkan NIK kurang dari 16 digit<br>2. Klik tombol submit | nik: "123456789012345" | Menampilkan pesan error "NIK harus 16 digit" |  |
| FORM-004 | Validasi file upload | 1. Upload file melebihi ukuran maksimum<br>2. Periksa respons | file: >2MB | Menampilkan pesan error "Ukuran file maksimal 2MB" |  |
| FORM-005 | Validasi reCAPTCHA | 1. Tidak menyelesaikan reCAPTCHA<br>2. Klik tombol submit | - | Menampilkan pesan error "Silakan selesaikan reCAPTCHA" | |

### 4. Komponen Gallery Grid

#### Test Cases
| ID | Deskripsi Test | Langkah-langkah | Data Input | Hasil yang Diharapkan | Status |
|----|----------------|-----------------|------------|----------------------|--------|
| GALLERY-001 | Tampilan grid galeri | 1. Buka halaman galeri<br>2. Periksa tata letak grid | - | Gambar ditampilkan dalam grid 3 kolom (desktop) |  |
| GALLERY-002 | Fungsi lightbox | 1. Klik gambar di galeri<br>2. Periksa lightbox | - | Lightbox muncul dengan gambar dalam ukuran penuh |  |
| GALLERY-003 | Navigasi lightbox | 1. Buka lightbox<br>2. Klik tombol next/prev | - | Navigasi antar gambar berfungsi dengan benar |  |
| GALLERY-004 | Lazy loading | 1. Scroll ke bawah halaman galeri<br>2. Periksa loading gambar | - | Gambar dimuat secara bertahap saat scroll |  |

## Skenario E2E: Alur PPDB Sukses/Gagal

### 1. Skenario E2E - Submit PPDB Sukses

#### Precondition
- Browser: Chrome/Firefox terbaru
- Koneksi internet stabil
- Data test yang valid

#### Test Steps
| Langkah | Aksi | Hasil yang Diharapkan |
|---------|------|----------------------|
| 1 | Buka browser dan akses `https://www.malnukananga.sch.id` | Halaman beranda terbuka |
| 2 | Klik tombol "Daftar Sekarang" di navbar | Diarahkan ke halaman PPDB |
| 3 | Klik tombol "Daftar PPDB" | Diarahkan ke halaman formulir pendaftaran |
| 4 | Isi data diri lengkap dengan data valid | Semua field terisi dengan benar |
| 5 | Isi data orang tua dengan data valid | Semua field terisi dengan benar |
| 6 | Pilih jurusan IPA | Jurusan IPA dipilih |
| 7 | Upload dokumen yang diperlukan | Semua dokumen berhasil diupload |
| 8 | Centang persetujuan syarat dan ketentuan | Checkbox tercentang |
| 9 | Selesaikan reCAPTCHA | reCAPTCHA berhasil diselesaikan |
| 10 | Klik tombol "Kirim Pendaftaran" | Formulir dikirim dan menampilkan pesan sukses |

#### Postcondition
- Data pendaftar tersimpan di database
- Email konfirmasi terkirim ke pendaftar
- Notifikasi terkirim ke admin

### 2. Skenario E2E - Submit PPDB Gagal (Validasi)

#### Precondition
- Browser: Chrome/Firefox terbaru
- Koneksi internet stabil

#### Test Steps
| Langkah | Aksi | Hasil yang Diharapkan |
|---------|------|----------------------|
| 1 | Buka browser dan akses `https://www.malnukananga.sch.id/ppdb/daftar` | Halaman formulir PPDB terbuka |
| 2 | Kosongkan semua field | Semua field kosong |
| 3 | Klik tombol "Kirim Pendaftaran" | Menampilkan pesan error untuk field wajib |
| 4 | Isi NIK dengan 15 digit | NIK: "123456789012345" |
| 5 | Klik tombol "Kirim Pendaftaran" | Menampilkan pesan error "NIK harus 16 digit" |
| 6 | Isi email dengan format tidak valid | Email: "test@domain" |
| 7 | Klik tombol "Kirim Pendaftaran" | Menampilkan pesan error "Format email tidak valid" |
| 8 | Upload file melebihi ukuran maksimum | File: 5MB PDF |
| 9 | Klik tombol "Kirim Pendaftaran" | Menampilkan pesan error "Ukuran file maksimal 2MB" |

#### Postcondition
- Formulir tidak dikirim
- Semua error validasi ditampilkan dengan jelas

### 3. Skenario E2E - Submit PPDB Gagal (Rate Limit)

#### Precondition
- Browser: Chrome/Firefox terbaru
- Koneksi internet stabil
- Telah melakukan 3 submit dalam 1 jam (rate limit)

#### Test Steps
| Langkah | Aksi | Hasil yang Diharapkan |
|---------|------|----------------------|
| 1 | Buka browser dan akses `https://www.malnukananga.sch.id/ppdb/daftar` | Halaman formulir PPDB terbuka |
| 2 | Isi formulir dengan data valid | Semua field terisi dengan benar |
| 3 | Klik tombol "Kirim Pendaftaran" | Menampilkan pesan "Terlalu banyak permintaan. Silakan coba lagi nanti." |
| 4 | Tunggu 1 jam | - |
| 5 | Klik tombol "Kirim Pendaftaran" | Formulir berhasil dikirim |

#### Postcondition
- Rate limit berfungsi dengan benar
- Setelah menunggu, formulir dapat dikirim kembali

## Checklist UAT Per Halaman

### 1. Halaman Beranda

#### Fungsional
- [ ] Tampilan hero banner sesuai desain
- [ ] Tombol CTA berfungsi dengan benar
- [ ] Section PPDB highlight ditampilkan
- [ ] Berita terbaru ditampilkan dengan benar
- [ ] Fasilitas sekolah ditampilkan dengan ikon
- [ ] Galeri foto dapat diklik untuk lightbox
- [ ] Footer menampilkan informasi kontak

#### Responsif
- [ ] Tampilan desktop sesuai desain
- [ ] Tampilan tablet sesuai desain
- [ ] Tampilan mobile sesuai desain
- [ ] Menu hamburger berfungsi di mobile
- [ ] Gambar responsif di semua ukuran layar

#### Aksesibilitas
- [ ] Semua gambar memiliki alt text
- [ ] Kontras warna memenuhi WCAG AA
- [ ] Navigasi keyboard berfungsi
- [ ] Indikator fokus jelas
- [ ] Struktur heading logis

### 2. Halaman Profil

#### Fungsional
- [ ] Tampilan sejarah sekolah lengkap
- [ ] Section visi misi ditampilkan dengan jelas
- [ ] Fasilitas sekolah ditampilkan dengan ikon
- [ ] Gambar hero sesuai konten
- [ ] Link internal berfungsi

#### Konten
- [ ] Konten sejarah akurat dan lengkap
- [ ] Visi misi sesuai dokumen resmi
- [ ] Deskripsi fasilitas informatif
- [ ] Tidak ada broken link
- [ ] Grammar dan ejaan benar

#### SEO
- [ ] Meta title dan description unik
- [ ] Heading structure sesuai hirarki
- [ ] Internal linking berfungsi
- [ ] Gambar memiliki alt text SEO-friendly
- [ ] URL kanonis ditentukan

### 3. Halaman Berita

#### Fungsional
- [ ] Daftar berita ditampilkan dengan pagination
- [ ] Filter kategori berfungsi
- [ ] Search berita berfungsi
- [ ] Card berita menampilkan informasi dengan benar
- [ ] Link "Baca Selengkapnya" berfungsi

#### Konten
- [ ] Berita terbaru ditampilkan pertama
- [ ] Tanggal publikasi akurat
- [ ] Author ditampilkan dengan benar
- [ ] Excerpt informatif
- [ ] Tidak ada broken link

#### UX
- [ ] Loading indicator saat fetch data
- [ ] Error handling untuk koneksi buruk
- [ ] Pagination berfungsi dengan benar
- [ ] Filter kategori intuitif
- [ ] Search relevan dengan keyword

### 4. Halaman Detail Berita

#### Fungsional
- [ ] Judul berita ditampilkan dengan benar
- [ ] Tanggal dan author akurat
- [ ] Konten berita lengkap
- [ ] Gambar dalam artikel ditampilkan
- [ ] Social share berfungsi

#### Konten
- [ ] Konten berita informatif dan akurat
- [ ] Tidak ada broken image
- [ ] Grammar dan ejaan benar
- [ ] Tidak ada broken link
- [ ] Metadata artikel lengkap

#### SEO
- [ ] Meta title dan description unik
- [ ] Structured data NewsArticle valid
- [ ] Breadcrumb JSON-LD valid
- [ ] Canonical URL ditentukan
- [ ] Internal linking relevan

### 5. Halaman PPDB

#### Fungsional
- [ ] Informasi PPDB lengkap dan akurat
- [ ] Syarat dan ketentuan jelas
- [ ] Jadwal PPDB ditampilkan
- [ ] Biaya pendidikan tercantum
- [ ] Link ke formulir pendaftaran berfungsi

#### UX
- [ ] Informasi disajikan dengan jelas
- [ ] Call-to-action menonjol
- [ ] Desain mobile-friendly
- [ ] Loading cepat
- [ ] Tidak ada broken link

#### Aksesibilitas
- [ ] Semua informasi dapat diakses dengan screen reader
- [ ] Kontras warna memadai
- [ ] Heading structure logis
- [ ] Alt text untuk gambar informatif
- [ ] Form labels jelas

### 6. Halaman Formulir PPDB

#### Fungsional
- [ ] Semua field input berfungsi
- [ ] Validasi real-time berfungsi
- [ ] Upload file berfungsi
- [ ] reCAPTCHA berfungsi
- [ ] Submit form berfungsi

#### Validasi
- [ ] Validasi field wajib
- [ ] Validasi format email
- [ ] Validasi panjang karakter
- [ ] Validasi tipe file
- [ ] Validasi ukuran file

#### UX
- [ ] Form wizard intuitif
- [ ] Progress indicator jelas
- [ ] Error message informatif
- [ ] Loading state saat submit
- [ ] Success message setelah submit

#### Keamanan
- [ ] Rate limiting berfungsi
- [ ] Sanitasi input
- [ ] Proteksi CSRF
- [ ] reCAPTCHA v3 terimplementasi
- [ ] HTTPS enforced

### 7. Halaman Kontak

#### Fungsional
- [ ] Informasi kontak lengkap
- [ ] Map embed berfungsi
- [ ] Form kontak berfungsi
- [ ] Link media sosial berfungsi
- [ ] Jam operasional ditampilkan

#### UX
- [ ] Informasi disajikan dengan jelas
- [ ] Form kontak mudah digunakan
- [ ] Map interaktif
- [ ] Loading cepat
- [ ] Mobile-friendly

#### Aksesibilitas
- [ ] Semua informasi dapat diakses
- [ ] Kontras warna memadai
- [ ] Alt text untuk gambar
- [ ] Form labels jelas
- [ ] Heading structure logis

## Checklist Cross-Browser Testing

### Desktop Browsers
- [ ] Google Chrome (terbaru)
- [ ] Mozilla Firefox (terbaru)
- [ ] Microsoft Edge (terbaru)
- [ ] Safari (terbaru, macOS)

### Mobile Browsers
- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Firefox (Android)
- [ ] Samsung Internet (Android)

### Operating Systems
- [ ] Windows 10/11
- [ ] macOS (terbaru)
- [ ] iOS (terbaru)
- [ ] Android (terbaru)

## Checklist Performance Testing

### Kecepatan Loading
- [ ] First Contentful Paint < 2 detik
- [ ] Largest Contentful Paint < 2.5 detik
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

### Optimasi Gambar
- [ ] Semua gambar menggunakan format WebP
- [ ] Lazy loading diterapkan
- [ ] Responsive images diterapkan
- [ ] Ukuran file gambar dioptimalkan

### Caching
- [ ] Static assets memiliki cache header
- [ ] ISR diterapkan untuk konten dinamis
- [ ] CDN berfungsi dengan benar
- [ ] Service worker terimplementasi (jika PWA)

## Checklist Security Testing

### Frontend Security
- [ ] Content Security Policy diterapkan
- [ ] X-Frame-Options header diset
- [ ] X-Content-Type-Options header diset
- [ ] Referrer-Policy header diset

### Backend Security
- [ ] Rate limiting diterapkan
- [ ] Input validation server-side
- [ ] Sanitasi data
- [ ] Proteksi terhadap SQL injection
- [ ] Proteksi terhadap XSS

### Data Protection
- [ ] HTTPS enforced
- [ ] Data pribadi dienkripsi
- [ ] File upload divalidasi
- [ ] Session management aman
- [ ] Logging audit diterapkan

## Checklist Accessibility Testing

### WCAG 2.1 AA Compliance
- [ ] Semua gambar memiliki alt text bermakna
- [ ] Kontras warna memenuhi rasio 4.5:1
- [ ] Semua fungsi dapat diakses dengan keyboard
- [ ] Indikator fokus jelas dan konsisten
- [ ] Heading structure logis

### Screen Reader Compatibility
- [ ] Semua konten dapat dibaca screen reader
- [ ] ARIA labels dan roles sesuai
- [ ] Form labels jelas
- [ ] Error messages informatif
- [ ] Navigation landmarks didefinisikan

### Keyboard Navigation
- [ ] Tab order logis
- [ ] Skip links tersedia
- [ ] Focus trapping pada modal
- [ ] Keyboard shortcuts intuitif
- [ ] Tidak ada keyboard traps

## Environment Testing

### Development Environment
- [ ] Local development berjalan lancar
- [ ] Hot reload berfungsi
- [ ] Error boundaries bekerja
- [ ] Debugging tools tersedia

### Staging Environment
- [ ] Deploy ke staging berhasil
- [ ] Environment variables benar
- [ ] Database connection stabil
- [ ] API integrations berfungsi

### Production Environment
- [ ] Deploy ke production berhasil
- [ ] SSL certificate valid
- [ ] CDN berfungsi
- [ ] Monitoring tools aktif
- [ ] Backup sistem berjalan

---
*Dokumen ini berisi rencana pengujian dan QA yang komprehensif untuk website MA Malnu Kananga, mencakup test plan untuk unit testing komponen utama, skenario end-to-end untuk alur PPDB (sukses dan gagal), serta checklist UAT per halaman. Dokumentasi ini dirancang untuk memastikan kualitas website melalui pengujian yang sistematis dan menyeluruh sebelum rilis ke produksi.*