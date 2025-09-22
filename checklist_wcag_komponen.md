# Checklist WCAG 2.2 AA untuk Komponen Website Sekolah

Dokumen ini menyediakan checklist WCAG 2.2 AA spesifik untuk komponen-komponen yang sedang dibangun untuk website sekolah, lengkap dengan contoh implementasi atribut aria-label/role dan skema fokus keyboard.

## 1. Navbar

### Checklist Aksesibilitas:
- [ ] Navbar memiliki role="navigation" dan aria-label="Navigasi utama"
- [ ] Logo sekolah memiliki alt text yang bermakna
- [ ] Semua item menu dapat diakses dengan keyboard (tab navigable)
- [ ] Dropdown menu memiliki atribut aria-expanded dan aria-controls
- [ ] Tombol toggle mobile menu memiliki aria-label yang sesuai
- [ ] Indikator fokus jelas pada semua elemen interaktif
- [ ] Menu mobile dapat ditutup dengan tombol Escape

### Contoh Implementasi ARIA:
```html
<nav role="navigation" aria-label="Navigasi utama" class="bg-white shadow-md sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <div class="flex-shrink-0 flex items-center">
          <div class="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span class="text-white font-bold text-lg">S</span>
          </div>
          <span class="ml-3 text-xl font-bold text-gray-900 hidden sm:block">SMP Negeri 1 Jakarta</span>
        </div>
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center justify-center space-x-8">
        <a href="#" class="text-gray-900 font-medium hover:text-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Beranda</a>
        <div class="relative group">
          <button 
            class="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
            aria-expanded="false"
            aria-controls="dropdown-menu"
          >
            Profil
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div id="dropdown-menu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">Sejarah Sekolah</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">Visi & Misi</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">Struktur Organisasi</a>
          </div>
        </div>
        <!-- Menu items lainnya -->
      </div>
      
      <div class="flex items-center">
        <a href="#" class="hidden md:block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Kontak Kami
        </a>
        <button 
          class="md:hidden ml-4 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label="Buka menu"
          aria-expanded="false"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>
```

### Skema Fokus:
1. Logo → Item menu pertama → Item menu berikutnya → Tombol CTA → Tombol mobile menu
2. Untuk dropdown menu: Item menu → Item dropdown pertama → Item dropdown berikutnya

## 2. Footer

### Checklist Aksesibilitas:
- [ ] Footer memiliki role="contentinfo"
- [ ] Semua tautan sosial media memiliki aria-label yang deskriptif
- [ ] Form newsletter memiliki label dan instruksi yang jelas
- [ ] Semua elemen dapat diakses dengan keyboard
- [ ] Indikator fokus jelas pada semua elemen interaktif

### Contoh Implementasi ARIA:
```html
<footer role="contentinfo" class="bg-gray-900 text-white pt-12 pb-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- School Information -->
      <div>
        <div class="flex items-center mb-4">
          <div class="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span class="text-white font-bold text-lg">S</span>
          </div>
          <span class="ml-3 text-xl font-bold">SMP Negeri 1 Jakarta</span>
        </div>
        <p class="text-gray-400 mb-4">
          Sekolah unggulan yang berkomitmen untuk memberikan pendidikan berkualitas dan membentuk karakter siswa yang unggul.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white rounded" aria-label="Kunjungi Facebook kami">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
            </svg>
          </a>
          <!-- Tautan sosial media lainnya dengan aria-label -->
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-bold mb-4">Tautan Cepat</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:underline">Beranda</a></li>
          <!-- Tautan lainnya -->
        </ul>
      </div>

      <!-- Contact Information -->
      <div>
        <h3 class="text-lg font-bold mb-4">Kontak Kami</h3>
        <ul class="space-y-3">
          <li class="flex items-start">
            <svg class="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-gray-400">Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta 10110</span>
          </li>
          <!-- Informasi kontak lainnya -->
        </ul>
      </div>

      <!-- Newsletter -->
      <div>
        <h3 class="text-lg font-bold mb-4">Berlangganan</h3>
        <p class="text-gray-400 mb-4">Dapatkan berita dan informasi terbaru dari sekolah kami.</p>
        <form class="flex flex-col space-y-3">
          <label for="email-newsletter" class="sr-only">Alamat email Anda</label>
          <input 
            type="email" 
            id="email-newsletter"
            placeholder="Alamat email Anda" 
            class="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-describedby="newsletter-help"
          >
          <p id="newsletter-help" class="sr-only">Masukkan alamat email Anda untuk berlangganan newsletter</p>
          <button 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Berlangganan
          </button>
        </form>
      </div>
    </div>

    <!-- Copyright -->
    <div class="mt-12 pt-8 border-t border-gray-800 text-center">
      <p class="text-gray-500">
        &copy; 2023 SMP Negeri 1 Jakarta. Hak Cipta Dilindungi.
      </p>
    </div>
  </div>
</footer>
```

### Skema Fokus:
1. Tautan sosial media → Tautan cepat → Informasi kontak → Field input email → Tombol berlangganan

## 3. Form Field

### Checklist Aksesibilitas:
- [ ] Setiap field memiliki label yang terkait dengan for/id
- [ ] Field dengan error memiliki aria-invalid="true"
- [ ] Pesan error terkait dengan field melalui aria-describedby
- [ ] Field select memiliki opsi default yang tidak dapat dipilih
- [ ] Field checkbox dan radio memiliki label yang terkait
- [ ] Fieldset dan legend digunakan untuk kelompok radio button
- [ ] Semua field dapat diakses dengan keyboard

### Contoh Implementasi ARIA:
```html
<!-- Text Input Field dengan Error -->
<div class="mb-6">
  <label for="email" class="block text-gray-700 font-medium mb-2">Email *</label>
  <input 
    type="email" 
    id="email" 
    placeholder="Masukkan email Anda" 
    class="w-full px-4 py-3 border border-red-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-300"
    aria-describedby="email-error"
    aria-invalid="true"
    required
  >
  <p id="email-error" class="mt-2 text-sm text-red-500">Format email tidak valid</p>
</div>

<!-- Fieldset untuk Radio Buttons -->
<fieldset class="mb-6">
  <legend class="block text-gray-700 font-medium mb-2">Jenis Kelamin *</legend>
  <div class="flex space-x-6">
    <div class="flex items-center">
      <input 
        id="laki-laki" 
        type="radio" 
        name="jenis-kelamin" 
        value="laki-laki" 
        class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        required
      >
      <label for="laki-laki" class="ml-2 block text-sm font-medium text-gray-700">Laki-laki</label>
    </div>
    <div class="flex items-center">
      <input 
        id="perempuan" 
        type="radio" 
        name="jenis-kelamin" 
        value="perempuan" 
        class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        required
      >
      <label for="perempuan" class="ml-2 block text-sm font-medium text-gray-700">Perempuan</label>
    </div>
  </div>
</fieldset>

<!-- Checkbox Field -->
<div class="mb-6">
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input 
        id="persetujuan" 
        type="checkbox" 
        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        required
      >
    </div>
    <div class="ml-3 text-sm">
      <label for="persetujuan" class="font-medium text-gray-700">Saya menyetujui syarat dan ketentuan yang berlaku *</label>
      <p class="text-gray-500">Dengan mencentang kotak ini, Anda menyetujui kebijakan privasi kami</p>
    </div>
  </div>
</div>
```

### Skema Fokus:
1. Field pertama → Field berikutnya → Tombol submit
2. Untuk radio buttons: Radio button pertama → Radio button berikutnya (dalam grup)

## 4. Banner PPDB

### Checklist Aksesibilitas:
- [ ] Gambar banner memiliki alt text yang bermakna
- [ ] Tombol CTA memiliki fokus yang jelas
- [ ] Informasi penting tidak hanya disampaikan melalui warna
- [ ] Kontras teks terhadap latar memenuhi rasio 4.5:1
- [ ] Semua elemen interaktif dapat diakses dengan keyboard

### Contoh Implementasi ARIA:
```html
<div class="relative rounded-xl overflow-hidden shadow-lg">
  <!-- Background Image -->
  <div class="bg-gray-200 h-64 md:h-80 w-full">
    <img src="https://placehold.co/1200x400" alt="Banner PPDB - Penerimaan Peserta Didik Baru SMP Negeri 1 Jakarta" class="w-full h-full object-cover">
  </div>
  
  <!-- Overlay Content -->
  <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60 flex flex-col justify-center items-start p-8 md:p-12">
    <h2 class="text-2xl md:text-4xl font-bold text-white mb-3">Penerimaan Peserta Didik Baru</h2>
    <p class="text-blue-100 text-lg md:text-xl mb-6 max-w-2xl">Bergabunglah dengan kami dan raih masa depan cemerlang. Pendaftaran dibuka mulai 1 Januari 2024!</p>
    
    <div class="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
      <div class="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
        <svg class="w-6 h-6 text-white mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <div>
          <p class="text-blue-100 text-sm">Periode Pendaftaran</p>
          <p class="text-white font-medium">1 Jan - 30 Juni 2024</p>
        </div>
      </div>
      
      <div class="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
        <svg class="w-6 h-6 text-white mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="text-blue-100 text-sm">Tingkat</p>
          <p class="text-white font-medium">SMP & SMA</p>
        </div>
      </div>
    </div>
    
    <div class="mt-8 flex flex-wrap gap-3">
      <a href="#" class="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-white">
        Daftar Sekarang
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </a>
      <a href="#" class="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-white">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
        Lihat Persyaratan
      </a>
    </div>
  </div>
</div>
```

### Skema Fokus:
1. Tombol "Daftar Sekarang" → Tombol "Lihat Persyaratan"

## 5. Card Berita

### Checklist Aksesibilitas:
- [ ] Gambar berita memiliki alt text yang bermakna
- [ ] Tautan "Baca selengkapnya" memiliki konteks yang jelas
- [ ] Informasi tanggal menggunakan elemen time dengan atribut datetime
- [ ] Kontras teks terhadap latar memenuhi rasio 4.5:1
- [ ] Semua elemen interaktif dapat diakses dengan keyboard

### Contoh Implementasi ARIA:
```html
<div class="max-w-sm rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
  <div class="h-48 bg-gray-200 overflow-hidden">
    <img src="https://placehold.co/400x300" alt="Tim sains SMP Negeri 1 Jakarta meraih juara pertama dalam lomba sains nasional" class="w-full h-full object-cover">
  </div>
  <div class="p-6">
    <div class="flex items-center mb-3">
      <span class="text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">Berita</span>
      <time datetime="2023-04-12" class="text-xs text-gray-500 ml-3">12 April 2023</time>
    </div>
    <h3 class="text-xl font-bold text-gray-900 mb-2">Prestasi Siswa dalam Lomba Sains Nasional</h3>
    <p class="text-gray-600 mb-4">Tim sains sekolah kita berhasil meraih juara pertama dalam lomba sains tingkat nasional yang diadakan di Jakarta minggu lalu.</p>
    <a href="#" class="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center focus:outline-none focus:underline">
      Baca selengkapnya tentang prestasi siswa dalam lomba sains nasional
      <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </a>
  </div>
</div>
```

### Skema Fokus:
1. Hanya elemen tautan "Baca selengkapnya" yang dapat menerima fokus

## 6. Card Guru

### Checklist Aksesibilitas:
- [ ] Foto guru memiliki alt text yang bermakna
- [ ] Tautan sosial media memiliki aria-label yang deskriptif
- [ ] Kontras teks terhadap latar memenuhi rasio 4.5:1
- [ ] Semua elemen interaktif dapat diakses dengan keyboard

### Contoh Implementasi ARIA:
```html
<div class="max-w-xs rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
  <div class="h-48 bg-gray-200 overflow-hidden">
    <img src="https://placehold.co/300x400" alt="Foto Budi Santoso, Guru Matematika berpengalaman 10 tahun" class="w-full h-full object-cover">
  </div>
  <div class="p-5 text-center">
    <h3 class="text-xl font-bold text-gray-900 mb-1">Budi Santoso, S.Pd</h3>
    <p class="text-blue-600 font-medium mb-3">Guru Matematika</p>
    <p class="text-gray-600 text-sm mb-4">10 tahun pengalaman mengajar matematika untuk tingkat SMA dengan metode yang interaktif dan menyenangkan.</p>
    <div class="flex justify-center space-x-3">
      <a href="#" class="text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 focus:ring-2 focus:ring-blue-500 rounded" aria-label="Kunjungi GitHub Budi Santoso">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
        </svg>
      </a>
      <a href="#" class="text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 focus:ring-2 focus:ring-blue-500 rounded" aria-label="Kunjungi Twitter Budi Santoso">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
      </a>
      <!-- Tautan sosial media lainnya -->
    </div>
  </div>
</div>
```

### Skema Fokus:
1. Tautan sosial media pertama → Tautan sosial media berikutnya

## Prinsip Umum Aksesibilitas

### Persepsi (Perceivable)
- [ ] Semua gambar memiliki alt text yang bermakna
- [ ] Kontras warna memenuhi rasio 4.5:1 untuk teks
- [ ] Informasi tidak disampaikan hanya melalui warna
- [ ] Konten multimedia memiliki alternatif teks

### Operabilitas (Operable)
- [ ] Semua fungsi dapat diakses melalui keyboard
- [ ] Indikator fokus jelas dan konsisten
- [ ] Konten tidak berkedip lebih dari 3 detik
- [ ] Timeout dapat diatur ulang atau dimatikan

### Dapat Dipahami (Understandable)
- [ ] Bahasa halaman dideklarasikan dengan benar
- [ ] Navigasi konsisten di seluruh situs
- [ ] Label form jelas dan deskriptif
- [ ] Instruksi tidak bergantung hanya pada sensorik

### Robust (Kuat)
- [ ] HTML valid dan semantik
- [ ] Kompatibel dengan teknologi assistif
- [ ] Komponen custom memiliki role dan state yang sesuai
- [ ] Validasi input memberikan feedback yang jelas

## Skema Fokus Umum

1. **Skip Links**: Tautan untuk melewati navigasi ke konten utama
2. **Tab Order**: Logis dan sesuai dengan struktur visual
3. **Focus Indicators**: Jelas dan konsisten di semua komponen
4. **Keyboard Traps**: Tidak ada jebakan keyboard
5. **Focus Management**: Dikelola dengan benar dalam modal dan dropdown

## Contoh Implementasi Skip Link
```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-blue-700 focus:px-4 focus:py-2 focus:rounded">
  Lewati ke konten utama
</a>
```

Dengan mengikuti checklist ini, komponen-komponen website sekolah akan memenuhi standar aksesibilitas WCAG 2.2 AA dan dapat digunakan oleh semua pengguna, termasuk mereka yang menggunakan teknologi assistif.