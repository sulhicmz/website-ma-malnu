# Banner PPDB

```html
<div class="relative rounded-xl overflow-hidden shadow-lg">
  <!-- Background Image -->
  <div class="bg-gray-200 h-64 md:h-80 w-full">
    <img src="https://placehold.co/1200x400" alt="Banner PPDB" class="w-full h-full object-cover">
  </div>
  
  <!-- Overlay Content -->
  <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60 flex flex-col justify-center items-start p-8 md:p-12">
    <h2 class="text-2xl md:text-4xl font-bold text-white mb-3">Penerimaan Peserta Didik Baru</h2>
    <p class="text-blue-100 text-lg md:text-xl mb-6 max-w-2xl">Bergabunglah dengan kami dan raih masa depan cemerlang. Pendaftaran dibuka mulai 1 Januari 2024!</p>
    
    <div class="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
      <div class="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
        <svg class="w-6 h-6 text-white mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <div>
          <p class="text-blue-100 text-sm">Periode Pendaftaran</p>
          <p class="text-white font-medium">1 Jan - 30 Juni 2024</p>
        </div>
      </div>
      
      <div class="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
        <svg class="w-6 h-6 text-white mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="text-blue-100 text-sm">Tingkat</p>
          <p class="text-white font-medium">SMP & SMA</p>
        </div>
      </div>
    </div>
    
    <div class="mt-8 flex flex-wrap gap-3">
      <a href="#" class="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center">
        Daftar Sekarang
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </a>
      <a href="#" class="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center">
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

### Design Tokens Used:
- Spacing: 2, 3, 4, 6, 8, 12 (0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem)
- Radius: lg, xl (0.5rem, 0.75rem)
- Shadow: lg
- Colors: blue-900, blue-700, blue-100, white, gray-200
- Typography: text-sm, text-lg, text-xl, text-2xl, text-4xl
- Transitions: transition-colors duration-300