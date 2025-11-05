# Navbar

```html
<nav class="bg-white shadow-md sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <!-- Logo and Brand -->
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
        <a href="#" class="text-gray-900 font-medium hover:text-blue-600 transition-colors duration-300">Beranda</a>
        <div class="relative group">
          <button class="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 flex items-center">
            Profil
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sejarah Sekolah</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Visi & Misi</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Struktur Organisasi</a>
          </div>
        </div>
        <a href="#" class="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300">Akademik</a>
        <a href="#" class="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300">Kegiatan</a>
        <a href="#" class="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300">Berita</a>
        <a href="#" class="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300">PPDB</a>
      </div>

      <!-- CTA Button and Mobile Menu Button -->
      <div class="flex items-center">
        <a href="#" class="hidden md:block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
          Kontak Kami
        </a>
        <button class="md:hidden ml-4 text-gray-700 hover:text-gray-900 focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu (Hidden by default) -->
  <div class="md:hidden hidden">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">Beranda</a>
      <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Profil</a>
      <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Akademik</a>
      <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Kegiatan</a>
      <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Berita</a>
      <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">PPDB</a>
      <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">Kontak Kami</a>
    </div>
  </div>
</nav>
```

### Design Tokens Used:
- Spacing: 1, 2, 3, 4, 6, 8, 10 (0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 2.5rem)
- Radius: md, lg (0.375rem, 0.5rem)
- Shadow: md
- Colors: blue-600, blue-700, gray-100, gray-700, gray-900, white
- Typography: text-base, text-lg, text-sm, text-xl
- Transitions: transition-colors duration-300, transition-all duration-300
- Z-index: z-50
- Positioning: sticky top-0