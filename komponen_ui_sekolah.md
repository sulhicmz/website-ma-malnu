# Komponen UI Sekolah

Kumpulan komponen React dengan Tailwind CSS untuk website sekolah.

## Daftar Komponen

1. [Navbar](#navbar)
2. [Footer](#footer)
3. [Breadcrumb](#breadcrumb)
4. [CardBerita](#cardberita)
5. [CardGuru](#cardguru)
6. [GalleryGrid](#gallerygrid)
7. [Pagination](#pagination)

---

## Navbar

Navbar responsif dengan menu dropdown dan toggle untuk mobile.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| logoText | string | Yes | Teks untuk logo sekolah |
| navItems | array | Yes | Array item navigasi |
| ctaText | string | Yes | Teks untuk tombol CTA |

### Contoh Penggunaan

```jsx
import { Navbar } from './components';

const navItems = [
  { label: 'Beranda', href: '#' },
  { 
    label: 'Profil', 
    subItems: [
      { label: 'Sejarah Sekolah', href: '#' },
      { label: 'Visi & Misi', href: '#' },
      { label: 'Struktur Organisasi', href: '#' }
    ]
  },
  { label: 'Akademik', href: '#' },
  { label: 'Kegiatan', href: '#' },
  { label: 'Berita', href: '#' },
  { label: 'PPDB', href: '#' }
];

<Navbar 
  logoText="SMP Negeri 1 Jakarta" 
  navItems={navItems} 
  ctaText="Kontak Kami" 
/>
```

---

## Footer

Footer komprehensif dengan informasi sekolah, tautan cepat, kontak, dan newsletter.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| schoolName | string | Yes | Nama sekolah |
| description | string | Yes | Deskripsi sekolah |
| quickLinks | array | Yes | Array tautan cepat |
| contactInfo | object | Yes | Informasi kontak |
| copyrightText | string | Yes | Teks hak cipta |

### Contoh Penggunaan

```jsx
import { Footer } from './components';

const quickLinks = [
  { label: 'Beranda', href: '#' },
  { label: 'Profil Sekolah', href: '#' },
  { label: 'Akademik', href: '#' },
  { label: 'Kegiatan Sekolah', href: '#' },
  { label: 'Berita', href: '#' },
  { label: 'PPDB', href: '#' }
];

const contactInfo = {
  address: 'Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta 10110',
  phone: '(021) 12345678',
  email: 'info@smpn1jakarta.sch.id'
};

<Footer 
  schoolName="SMP Negeri 1 Jakarta"
  description="Sekolah unggulan yang berkomitmen untuk memberikan pendidikan berkualitas dan membentuk karakter siswa yang unggul."
  quickLinks={quickLinks}
  contactInfo={contactInfo}
  copyrightText="&copy; 2023 SMP Negeri 1 Jakarta. Hak Cipta Dilindungi."
/>
```

---

## Breadcrumb

Navigasi breadcrumb untuk menunjukkan lokasi halaman saat ini.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | array | Yes | Array item breadcrumb |

### Contoh Penggunaan

```jsx
import { Breadcrumb } from './components';

const breadcrumbItems = [
  { label: 'Beranda', href: '#' },
  { label: 'Kegiatan Sekolah', href: '#' },
  { label: 'Prestasi Siswa' }
];

<Breadcrumb items={breadcrumbItems} />
```

---

## CardBerita

Kartu berita dengan gambar, kategori, tanggal, dan excerpt.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| category | string | Yes | Kategori berita |
| date | string | Yes | Tanggal publikasi |
| title | string | Yes | Judul berita |
| excerpt | string | Yes | Ringkasan berita |
| imageUrl | string | Yes | URL gambar |
| imageAlt | string | Yes | Teks alternatif gambar |

### Contoh Penggunaan

```jsx
import { CardBerita } from './components';

<CardBerita 
  category="Berita"
  date="12 April 2023"
  title="Prestasi Siswa dalam Lomba Sains Nasional"
  excerpt="Tim sains sekolah kita berhasil meraih juara pertama dalam lomba sains tingkat nasional yang diadakan di Jakarta minggu lalu."
  imageUrl="https://placehold.co/400x300"
  imageAlt="Gambar Berita"
/>
```

---

## CardGuru

Kartu guru dengan foto, nama, mata pelajaran, dan bio.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| name | string | Yes | Nama guru |
| subject | string | Yes | Mata pelajaran |
| bio | string | Yes | Biografi singkat |
| imageUrl | string | Yes | URL foto |
| imageAlt | string | Yes | Teks alternatif foto |

### Contoh Penggunaan

```jsx
import { CardGuru } from './components';

<CardGuru 
  name="Budi Santoso, S.Pd"
  subject="Guru Matematika"
  bio="10 tahun pengalaman mengajar matematika untuk tingkat SMA dengan metode yang interaktif dan menyenangkan."
  imageUrl="https://placehold.co/300x400"
  imageAlt="Foto Guru"
/>
```

---

## GalleryGrid

Grid galeri foto responsif dengan berbagai jumlah kolom.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| images | array | Yes | - | Array objek gambar |
| columns | number | No | 3 | Jumlah kolom (1-4) |

### Contoh Penggunaan

```jsx
import { GalleryGrid } from './components';

const images = [
  { 
    src: 'https://placehold.co/600x400', 
    alt: 'Kegiatan Ekstrakurikuler',
    caption: 'Siswa dalam kegiatan ekstrakurikuler seni tari'
  },
  { 
    src: 'https://placehold.co/600x400', 
    alt: 'Laboratorium Komputer',
    caption: 'Siswa belajar di laboratorium komputer'
  }
];

<GalleryGrid images={images} columns={3} />
```

---

## Pagination

Komponen pagination dengan navigasi halaman dan ellipsis.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| currentPage | number | Yes | Halaman saat ini |
| totalPages | number | Yes | Total halaman |
| onPageChange | function | Yes | Fungsi callback saat halaman berubah |

### Contoh Penggunaan

```jsx
import { Pagination } from './components';
import { useState } from 'react';

const [currentPage, setCurrentPage] = useState(1);
const totalPages = 10;

const handlePageChange = (page) => {
  setCurrentPage(page);
};

<Pagination 
  currentPage={currentPage} 
  totalPages={totalPages} 
  onPageChange={handlePageChange} 
/>
```