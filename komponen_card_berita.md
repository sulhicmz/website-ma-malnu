# Card Berita (News Card)

```html
<div class="max-w-sm rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
  <div class="h-48 bg-gray-200 overflow-hidden">
    <img src="https://placehold.co/400x300" alt="Gambar Berita" class="w-full h-full object-cover">
  </div>
  <div class="p-6">
    <div class="flex items-center mb-3">
      <span class="text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">Berita</span>
      <span class="text-xs text-gray-500 ml-3">12 April 2023</span>
    </div>
    <h3 class="text-xl font-bold text-gray-900 mb-2">Prestasi Siswa dalam Lomba Sains Nasional</h3>
    <p class="text-gray-600 mb-4">Tim sains sekolah kita berhasil meraih juara pertama dalam lomba sains tingkat nasional yang diadakan di Jakarta minggu lalu.</p>
    <a href="#" class="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
      Baca selengkapnya
      <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </a>
  </div>
</div>
```

### Design Tokens Used:
- Spacing: 2, 3, 4, 6 (0.5rem, 0.75rem, 1rem, 1.5rem)
- Radius: lg (0.5rem)
- Shadow: md, lg
- Colors: blue-600, blue-100, gray-200, gray-500, gray-600, gray-900
- Typography: text-xs, text-xl
- Transitions: transition-shadow duration-300