# Desain UI High-Fidelity - MA Malnu Kananga

## Sistem Desain

### Spacing System
| Nama | Ukuran | Penggunaan |
|------|--------|------------|
| xs | 0.25rem (4px) | Jarak antar elemen kecil |
| sm | 0.5rem (8px) | Jarak antar elemen |
| base | 1rem (16px) | Jarak antar section |
| md | 1.5rem (24px) | Jarak antar section besar |
| lg | 2rem (32px) | Jarak antar section utama |
| xl | 3rem (48px) | Jarak antar section hero |
| 2xl | 4rem (64px) | Jarak antar section ekstra besar |

### Border Radius
| Nama | Ukuran | Penggunaan |
|------|--------|------------|
| none | 0 | Elemen kotak tajam |
| sm | 0.125rem (2px) | Button kecil |
| base | 0.25rem (4px) | Button standar |
| md | 0.375rem (6px) | Card |
| lg | 0.5rem (8px) | Card besar |
| xl | 0.75rem (12px) | Hero section |
| full | 999px | Lingkaran, pill button |

### Shadow
| Nama | Kelas | Penggunaan |
|------|-------|------------|
| none | shadow-none | Tanpa bayangan |
| sm | shadow-sm | Card kecil |
| base | shadow | Card standar |
| md | shadow-md | Card dengan depth |
| lg | shadow-lg | Card hero |
| xl | shadow-xl | Hero section |
| inner | shadow-inner | Inset shadow |

### Breakpoints
| Nama | Ukuran | Penggunaan |
|------|--------|------------|
| sm | 640px | Mobile besar |
| md | 768px | Tablet kecil |
| lg | 1024px | Tablet besar |
| xl | 1280px | Desktop kecil |
| 2xl | 1536px | Desktop besar |

## Komponen UI

### 1. Navbar Responsif

#### Desktop Version
```jsx
// Navbar Desktop
<nav className="sticky top-0 z-50 bg-white shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center">
        <img className="h-10 w-auto" src="/logo.svg" alt="MA Malnu Kananga" />
        <span className="ml-3 text-xl font-bold text-green-800">MA Malnu Kananga</span>
      </div>
      
      {/* Menu Navigasi */}
      <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
        <a href="/" className="text-green-800 font-medium hover:text-green-600">Beranda</a>
        <div className="relative group">
          <button className="text-gray-700 font-medium hover:text-green-600 flex items-center">
            Profil
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7"></path>
            </svg>
          </button>
          <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
            <a href="/profil/sejarah" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Sejarah</a>
            <a href="/profil/visi-misi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Visi Misi</a>
            <a href="/profil/fasilitas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Fasilitas</a>
          </div>
        </div>
        <a href="/akademik" className="text-gray-700 font-medium hover:text-green-600">Akademik</a>
        <a href="/berita" className="text-gray-700 font-medium hover:text-green-600">Berita</a>
        <a href="/galeri" className="text-gray-700 font-medium hover:text-green-600">Galeri</a>
        <a href="/ppdb" className="text-gray-700 font-medium hover:text-green-600">PPDB</a>
        <a href="/kontak" className="text-gray-700 font-medium hover:text-green-600">Kontak</a>
      </div>
      
      {/* CTA Button */}
      <div className="flex items-center">
        <a href="/ppdb/daftar" className="ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800">
          Daftar Sekarang
        </a>
      </div>
    </div>
  </div>
</nav>
```

#### Mobile Version
```jsx
// Navbar Mobile
<nav className="sticky top-0 z-50 bg-white shadow-md md:hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center">
        <img className="h-8 w-auto" src="/logo.svg" alt="MA Malnu Kananga" />
      </div>
      
      {/* Menu Button */}
      <div className="flex items-center">
        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none">
          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  {/* Mobile Menu */}
  <div className="hidden md:hidden">
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-green-800 bg-green-50">Beranda</a>
      <a href="/profil" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50">Profil</a>
      <a href="/akademik" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50">Akademik</a>
      <a href="/berita" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50">Berita</a>
      <a href="/galeri" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50">Galeri</a>
      <a href="/ppdb" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50">PPDB</a>
      <a href="/kontak" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50">Kontak</a>
      <a href="/ppdb/daftar" className="block w-full mt-4 mx-3 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 text-center">
        Daftar Sekarang
      </a>
    </div>
  </div>
</nav>
```

### 2. Footer

```jsx
// Footer Component
<footer className="bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      {/* Logo dan Deskripsi */}
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center">
          <img className="h-10 w-auto" src="/logo-white.svg" alt="MA Malnu Kananga" />
          <span className="ml-3 text-xl font-bold text-white">MA Malnu Kananga</span>
        </div>
        <p className="mt-4 text-base text-gray-300">
          Membentuk generasi unggul yang beriman dan bertaqwa kepada Allah SWT, berakhlak mulia, dan berwawasan kebangsaan.
        </p>
        <div className="flex space-x-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.91 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <span className="sr-only">Instagram</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 01.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.34 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.34-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 010-10.27zm0 1.802a3.33 3.333 0 100 6.666 3.333 3.333 0 000-6.66zm5.38-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.24 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Menu Profil */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Profil</h3>
        <ul className="mt-4 space-y-4">
          <li><a href="/profil/sejarah" className="text-base text-gray-300 hover:text-white">Sejarah</a></li>
          <li><a href="/profil/visi-misi" className="text-base text-gray-300 hover:text-white">Visi Misi</a></li>
          <li><a href="/profil/fasilitas" className="text-base text-gray-300 hover:text-white">Fasilitas</a></li>
          <li><a href="/profil/struktur" className="text-base text-gray-300 hover:text-white">Struktur Organisasi</a></li>
        </ul>
      </div>
      
      {/* Menu Akademik */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Akademik</h3>
        <ul className="mt-4 space-y-4">
          <li><a href="/akademik/kurikulum" className="text-base text-gray-300 hover:text-white">Kurikulum</a></li>
          <li><a href="/akademik/ekstrakurikuler" className="text-base text-gray-300 hover:text-white">Ekstrakurikuler</a></li>
          <li><a href="/akademik/jadwal" className="text-base text-gray-300 hover:text-white">Jadwal Pelajaran</a></li>
          <li><a href="/akademik/kalender" className="text-base text-gray-300 hover:text-white">Kalender Akademik</a></li>
        </ul>
      </div>
      
      {/* Menu Informasi */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Informasi</h3>
        <ul className="mt-4 space-y-4">
          <li><a href="/berita" className="text-base text-gray-300 hover:text-white">Berita</a></li>
          <li><a href="/pengumuman" className="text-base text-gray-300 hover:text-white">Penguman</a></li>
          <li><a href="/prestasi" className="text-base text-gray-300 hover:text-white">Prestasi</a></li>
          <li><a href="/galeri" className="text-base text-gray-300 hover:text-white">Galeri</a></li>
        </ul>
      </div>
    </div>
    
    <div className="mt-12 border-t border-gray-700 pt-8">
      <p className="text-base text-gray-400 text-center">
        &copy; 2024 MA Malnu Kananga. Hak Cipta Dilindungi.
      </p>
    </div>
  </div>
</footer>
```

### 3. Breadcrumb

```jsx
// Breadcrumb Component
<nav className="bg-gray-50 py-3">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <ol className="flex items-center space-x-2 text-sm">
      <li>
        <a href="/" className="text-green-700 hover:text-green-900">Beranda</a>
      </li>
      <li>
        <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </li>
      <li>
        <a href="/berita" className="text-green-700 hover:text-green-900">Berita</a>
      </li>
      <li>
        <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </li>
      <li className="text-gray-500">Meningkatkan Mutu Pendidikan di MA Malnu Kananga</li>
    </ol>
  </div>
</nav>
```

### 4. Card Berita

```jsx
// Card Berita Component
<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <div className="relative">
    <img 
      className="w-full h-48 object-cover" 
      src="/images/berita-sample.jpg" 
      alt="Judul Berita" 
    />
    <div className="absolute top-4 left-4">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        Kegiatan Sekolah
      </span>
    </div>
  
  <div className="p-6">
    <div className="flex items-center text-sm text-gray-500 mb-2">
      <span>12 September 2024</span>
      <span className="mx-2">•</span>
      <span>Admin Sekolah</span>
    </div>
    
    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
      Meningkatkan Mutu Pendidikan di MA Malnu Kananga Melalui Program Inovasi Pembelajaran
    </h3>
    
    <p className="text-gray-600 mb-4 line-clamp-3">
      MA Malnu Kananga terus berkomitmen untuk meningkatkan kualitas pendidikan melalui berbagai 
      program inovasi pembelajaran yang dirancang untuk memenuhi kebutuhan siswa di era digital.
    </p>
    
    <a 
      href="/berita/meningkatkan-mutu-pendidikan" 
      className="inline-flex items-center text-green-700 font-medium hover:text-green-900"
    >
      Baca Selengkapnya
      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </a>
  </div>
</div>
```

### 5. Card Guru

```jsx
// Card Guru Component
<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-30">
  <div className="p-6">
    <div className="flex items-center">
      <img 
        className="h-16 w-16 rounded-full object-cover" 
        src="/images/guru-sample.jpg" 
        alt="Nama Guru" 
      />
      <div className="ml-4">
        <h3 className="text-lg font-bold text-gray-900">Dra. Hj. Siti Aminah, M.Pd.</h3>
        <p className="text-green-700">Guru Biologi</p>
        <div className="flex items-center mt-1">
          <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 text-sm text-gray-600">4.9 (127 ulasan)</span>
        </div>
      </div>
    </div>
    
    <div className="mt-4">
      <p className="text-gray-600 text-sm line-clamp-3">
        Guru berpengalaman dengan lebih dari 15 tahun mengajar di bidang biologi. 
        Aktif dalam berbagai kegiatan pengembangan kurikulum dan penelitian pendidikan.
      </p>
    </div>
    
    <div className="mt-4 flex space-x-2">
      <a 
        href="/guru-staf/siti-aminah" 
        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-green-700 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50"
      >
        Lihat Profil
      </a>
      <a 
        href="https://wa.me/6281234567890" 
        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800"
      >
        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.98 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.35.157 11.892c0 2.096.547 4.142 1.58 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.35 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </a>
    </div>
  </div>
</div>
```

### 6. Banner PPDB

```jsx
// Banner PPDB Component
<div className="relative bg-gradient-to-r from-green-700 to-green-900 rounded-xl overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <img 
      src="/images/ppdb-bg-pattern.svg" 
      alt="" 
      className="w-full h-full object-cover"
    />
  </div>
  
  <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div className="md:flex md:items-center md:justify-between">
      <div className="md:w-2/3">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Penerimaan Peserta Didik Baru</span>
          <span className="block text-green-200">Tahun Ajaran 2024/2025</span>
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-green-100">
          Bergabunglah dengan MA Malnu Kananga dan jadilah bagian dari generasi unggul yang beriman dan bertaqwa.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">150+</p>
            <p className="text-sm text-green-200">Kuota Tersedia</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">Gratis</p>
            <p className="text-sm text-green-200">Pendaftaran</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">2 Jurusan</p>
            <p className="text-sm text-green-200">IPA & IPS</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">Beasiswa</p>
            <p className="text-sm text-green-200">Tersedia</p>
          </div>
        </div>
      </div>
      
      <div className="mt-10 md:mt-0 md:w-1/3 flex justify-center">
        <div className="rounded-lg shadow-xl bg-white p-6 w-full max-w-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Daftar Sekarang</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input 
                type="text" 
                id="nama" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="telepon" className="block text-sm font-medium text-gray-700">No. Telepon</label>
              <input 
                type="tel" 
                id="telepon" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Daftar PPDB
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 7. Form Field

```jsx
// Form Field Component
<div className="space-y-6">
  {/* Text Input */}
  <div>
    <label htmlFor="nama-lengkap" className="block text-sm font-medium text-gray-700">
      Nama Lengkap <span className="text-red-500">*</span>
    </label>
    <div className="mt-1">
      <input
        type="text"
        id="nama-lengkap"
        name="nama-lengkap"
        required
        className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
        placeholder="Masukkan nama lengkap Anda"
      />
    </div>
  </div>
  
  {/* Email Input */}
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Email <span className="text-red-500">*</span>
    </label>
    <div className="mt-1">
      <input
        id="email"
        name="email"
        type="email"
        required
        className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
        placeholder="email@contoh.com"
      />
    </div>
  
  {/* Select Input */}
  <div>
    <label htmlFor="jurusan" className="block text-sm font-medium text-gray-700">
      Pilihan Jurusan <span className="text-red-500">*</span>
    </label>
    <div className="mt-1">
      <select
        id="jurusan"
        name="jurusan"
        required
        className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
      >
        <option value="">Pilih Jurusan</option>
        <option value="ipa">Ilmu Pengetahuan Alam (IPA)</option>
        <option value="ips">Ilmu Pengetahuan Sosial (IPS)</option>
      </select>
    </div>
  
  {/* Textarea */}
  <div>
    <label htmlFor="pesan" className="block text-sm font-medium text-gray-700">
      Pesan
    </label>
    <div className="mt-1">
      <textarea
        id="pesan"
        name="pesan"
        rows={4}
        className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border border-gray-300 rounded-md"
        placeholder="Tulis pesan Anda di sini..."
      ></textarea>
    </div>
  </div>
  
  {/* File Upload */}
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Upload Dokumen <span className="text-red-500">*</span>
    </label>
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div className="space-y-1 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
            <span>Upload file</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
          </label>
          <p className="pl-1">atau drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">
          PDF, JPG, PNG hingga 10MB
        </p>
      </div>
    </div>
  </div>
  
  {/* Checkbox */}
  <div className="flex items-start">
    <div className="flex items-center h-5">
      <input
        id="persetujuan"
        name="persetujuan"
        type="checkbox"
        required
        className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor="persetujuan" className="font-medium text-gray-700">
        Saya menyetujui <a href="/kebijakan-privasi" className="text-green-600 hover:text-green-500">syarat dan ketentuan</a> yang berlaku
      </label>
    </div>
  </div>
</div>
```

### 8. Gallery Grid

```jsx
// Gallery Grid Component
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Gallery Item 1 */}
  <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <img 
      src="/images/gallery-1.jpg" 
      alt="Kegiatan Sekolah" 
      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button className="text-white p-3 rounded-full bg-green-700 hover:bg-green-800">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
      <h3 className="text-white font-bold">Upacara Bendera Rutin</h3>
      <p className="text-gray-300 text-sm">12 September 2024</p>
    </div>
  
  {/* Gallery Item 2 */}
  <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <img 
      src="/images/gallery-2.jpg" 
      alt="Prestasi Sekolah" 
      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button className="text-white p-3 rounded-full bg-green-700 hover:bg-green-800">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
      <h3 className="text-white font-bold">Juara Olimpiade Matematika</h3>
      <p className="text-gray-300 text-sm">10 September 2024</p>
    </div>
  </div>
  
  {/* Gallery Item 3 */}
  <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <img 
      src="/images/gallery-3.jpg" 
      alt="Ekstrakurikuler" 
      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button className="text-white p-3 rounded-full bg-green-700 hover:bg-green-800">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
      <h3 className="text-white font-bold">Latihan Paduan Suara</h3>
      <p className="text-gray-300 text-sm">8 September 2024</p>
    </div>
  </div>
</div>
```

### 9. Pagination

```jsx
// Pagination Component
<nav className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
  <div className="hidden sm:block">
    <p className="text-sm text-gray-700">
      Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">10</span> dari{' '}
      <span className="font-medium">42</span> hasil
    </p>
  </div>
  
  <div className="flex flex-1 justify-between sm:justify-end">
    <a
      href="#"
      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Sebelumnya
    </a>
    <a
      href="#"
      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Selanjutnya
    </a>
  </div>
  
  <div className="flex sm:hidden">
    <a
      href="#"
      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <span className="sr-only">Previous</span>
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </a>
    <a
      href="#"
      className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      1
    </a>
    <a
      href="#"
      className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      2
    </a>
    <span className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500">
      ...
    </span>
    <a
      href="#"
      className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      5
    </a>
    <a
      href="#"
      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <span className="sr-only">Next</span>
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </a>
  </div>
</nav>
```

## Token Desain

### Warna
```js
// Color Tokens
const colors = {
  primary: {
    50: '#f0f9f4',
    100: '#d1f0df',
    200: '#a3e1bf',
    300: '#75d29f',
    400: '#47c37f',
    500: '#19b45f', // Main primary color
    600: '#0a904c',
    700: '#0a704d', // Brand primary
    800: '#08503a',
    900: '#063027',
  },
  secondary: {
    50: '#fdf8f0',
    100: '#f9edd1',
    200: '#f4dba3',
    300: '#efc975',
    400: '#eab747',
    500: '#d4af37', // Brand secondary/gold
    600: '#aa8c2c',
    700: '#806921',
    800: '#554616',
    900: '#2b230b',
  },
  accent: {
    50: '#ef1f9',
    100: '#d6ddf0',
    200: '#bdc9e7',
    300: '#a4b5de',
    400: '#8ba1d5',
    500: '#728dcd',
    600: '#5979c4',
    700: '#1e3a8a', // Brand accent/blue
    800: '#172d6b',
    900: '#10204c',
  }
};
```

### Typography
```js
// Typography Tokens
const typography = {
  fontFamily: {
    heading: ['Playfair Display', 'serif'],
    body: ['Poppins', 'sans-serif'],
    arabic: ['Amiri', 'serif']
  },
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  }
};
```

### Spacing
```js
// Spacing Tokens
const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',       // 4px
  1.5: '0.375rem',    // 6px
  2: '0.5rem',        // 8px
  2.5: '0.625rem',    // 10px
  3: '0.75rem',       // 12px
  3.5: '0.875rem',    // 14px
  4: '1rem',          // 16px
  5: '1.25rem',       // 20px
  6: '1.5rem',        // 24px
  7: '1.75rem',       // 28px
  8: '2rem',          // 32px
  9: '2.25rem',       // 36px
  10: '2.5rem',       // 40px
  11: '2.75rem',      // 44px
  12: '3rem',         // 48px
  14: '3.5rem',       // 56px
  16: '4rem',         // 64px
  20: '5rem',         // 80px
  24: '6rem',         // 96px
  28: '7rem',         // 112px
  32: '8rem',         // 128px
  36: '9rem',         // 144px
  40: '10rem',        // 160px
  44: '11rem',        // 176px
  48: '12rem',        // 192px
  52: '13rem',        // 208px
  56: '14rem',        // 224px
  60: '15rem',        // 240px
 64: '16rem',        // 256px
  72: '18rem',        // 288px
  80: '20rem',        // 320px
  96: '24rem'         // 384px
};
```

## Implementasi Komponen dengan Tailwind

### Contoh Penggunaan dalam Halaman
```jsx
// Halaman Beranda
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-700 to-green-900">
          <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Membentuk Generasi Unggul</span>
                <span className="block text-green-200">yang Beriman dan Bertaqwa</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-xl text-green-100 sm:max-w-3xl">
                Madrasah Aliyah Negeri Malnu Kananga - Unggul dalam Prestasi dan Akhlak
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <a
                    href="/ppdb/daftar"
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 md:py-4 md:text-lg md:px-10"
                  >
                    Daftar PPDB
                  </a>
                  <a
                    href="/profil"
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 bg-opacity-60 hover:bg-opacity-50 md:py-4 md:text-lg md:px-10"
                  >
                    Jelajahi Sekolah
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* PPDB Highlight */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BannerPPDB />
          </div>
        </section>
        
        {/* Berita Terbaru */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Berita & Pengumuman Terbaru
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Ikuti informasi terkini seputar kegiatan MA Malnu Kananga
              </p>
            </div>
            
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <CardBerita />
                <CardBerita />
                <CardBerita />
              </div>
              
              <div className="mt-12 flex justify-center">
                <a
                  href="/berita"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800"
                >
                  Lihat Semua Berita
                  <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
```

---
*Dokumen ini berisi desain UI high-fidelity untuk komponen-komponen website MA Malnu Kananga menggunakan Tailwind CSS. Komponen-komponen ini dirancang untuk memberikan pengalaman pengguna yang konsisten, responsif, dan sesuai dengan brand identity sekolah.*