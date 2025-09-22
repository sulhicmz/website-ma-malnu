# Form Field

```html
<!-- Text Input Field -->
<div class="mb-6">
  <label for="nama-lengkap" class="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
  <input 
    type="text" 
    id="nama-lengkap" 
    placeholder="Masukkan nama lengkap Anda" 
    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
  >
  <p class="mt-2 text-sm text-gray-500">Nama lengkap sesuai dengan dokumen resmi</p>
</div>

<!-- Textarea Field -->
<div class="mb-6">
  <label for="pesan" class="block text-gray-700 font-medium mb-2">Pesan</label>
  <textarea 
    id="pesan" 
    rows="4" 
    placeholder="Tulis pesan Anda di sini..." 
    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300 resize-none"
  ></textarea>
  <p class="mt-2 text-sm text-gray-500">Maksimal 500 karakter</p>
</div>

<!-- Select Field -->
<div class="mb-6">
  <label for="jenjang" class="block text-gray-700 font-medium mb-2">Jenjang Pendidikan</label>
  <select 
    id="jenjang" 
    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300 bg-white"
  >
    <option value="" disabled selected>Pilih jenjang pendidikan</option>
    <option value="smp">SMP</option>
    <option value="sma">SMA</option>
    <option value="smk">SMK</option>
  </select>
</div>

<!-- Checkbox Field -->
<div class="mb-6">
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input 
        id="persetujuan" 
        type="checkbox" 
        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      >
    </div>
    <div class="ml-3 text-sm">
      <label for="persetujuan" class="font-medium text-gray-700">Saya menyetujui syarat dan ketentuan yang berlaku</label>
      <p class="text-gray-500">Dengan mencentang kotak ini, Anda menyetujui kebijakan privasi kami</p>
    </div>
  </div>
</div>

<!-- Radio Field -->
<fieldset class="mb-6">
  <legend class="block text-gray-700 font-medium mb-2">Jenis Kelamin</legend>
  <div class="flex space-x-6">
    <div class="flex items-center">
      <input 
        id="laki-laki" 
        type="radio" 
        name="jenis-kelamin" 
        value="laki-laki" 
        class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
      >
      <label for="perempuan" class="ml-2 block text-sm font-medium text-gray-700">Perempuan</label>
    </div>
  </div>
</fieldset>

<!-- Error State -->
<div class="mb-6">
  <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
  <input 
    type="email" 
    id="email" 
    placeholder="Masukkan email Anda" 
    class="w-full px-4 py-3 border border-red-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition duration-300"
  >
  <p class="mt-2 text-sm text-red-500">Format email tidak valid</p>
</div>
```

### Design Tokens Used:
- Spacing: 2, 3, 4, 5, 6 (0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem)
- Radius: lg (0.5rem)
- Colors: blue-500, blue-600, gray-300, gray-500, gray-700, red-500, white
- Typography: text-sm
- Transitions: transition duration-300
- Focus States: focus:ring, focus:border