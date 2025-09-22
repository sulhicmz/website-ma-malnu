# Aksesibilitas & i18n - MA Malnu Kananga

## Checklist WCAG 2.2 AA untuk Komponen Website

### 1. Persepsi (Perceivable)

#### Alternatif Teks untuk Gambar
```tsx
// Contoh implementasi alt text yang baik
<img 
  src="/images/sekolah.jpg" 
  alt="Bangunan utama MA Malnu Kananga dengan atap berwarna merah dan dinding berwarna putih"
  className="w-full h-64 object-cover rounded-lg"
/>

// Untuk gambar dekoratif
<img 
  src="/images/decorative-pattern.svg" 
  alt="" 
  role="presentation"
  className="w-full h-32 object-cover"
/>

// Untuk ikon dengan teks
<button className="flex items-center">
  <FiSearch className="h-5 w-5 mr-2" aria-hidden="true" />
  <span>Cari</span>
</button>
```

#### Konten Multimedia
```tsx
// Video dengan subtitle
<video controls className="w-full rounded-lg">
  <source src="/videos/profile.mp4" type="video/mp4" />
  <track 
    kind="subtitles" 
    src="/subtitles/profile-id.vtt" 
    srclang="id" 
    label="Indonesia" 
    default 
  />
  Browser Anda tidak mendukung tag video.
</video>

// Audio dengan transkrip
<audio controls className="w-full">
  <source src="/audio/announcement.mp3" type="audio/mpeg" />
 Browser Anda tidak mendukung tag audio.
</audio>
<p>
  <a href="/transcripts/announcement.txt" className="text-green-600 hover:text-green-800">
    Unduh transkrip audio
  </a>
</p>
```

#### Kontras Warna
```css
/* Contoh kontras warna yang memenuhi WCAG AA (4.5:1) */
.text-primary { color: #0A704D; } /* Hijau primer */
.text-secondary { color: #333333; } /* Teks utama */
.bg-primary { background-color: #0A704D; }
.bg-secondary { background-color: #F5F5F5; } /* Latar terang */

/* Kontras untuk tombol */
.btn-primary {
  background-color: #0A704D;
  color: #FFFFFF;
}

.btn-primary:hover {
  background-color: #08503A;
}

.btn-secondary {
  background-color: #FFFFFF;
  color: #0A704D;
  border: 1px solid #0A704D;
}

.btn-secondary:hover {
  background-color: #F5F5F5;
}
```

### 2. Operabilitas (Operable)

#### Navigasi Keyboard
```tsx
// Contoh komponen navigasi yang dapat diakses dengan keyboard
<nav className="sticky top-0 z-50 bg-white shadow-md" role="navigation" aria-label="Navigasi utama">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex-shrink-0 flex items-center">
        <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 rounded">
          <Logo className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold text-green-800">MA Malnu Kananga</span>
        </Link>
      </div>
      
      <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-gray-700 font-medium hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-3 py-2"
            tabIndex={0}
          >
            {link.name}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center">
        <Link
          href="/ppdb/daftar"
          className="ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          tabIndex={0}
        >
          Daftar Sekarang
        </Link>
      </div>
    </div>
  </div>
</nav>
```

#### Fokus yang Jelas
```css
/* CSS untuk indikator fokus yang jelas */
:focus {
  outline: 2px solid #0A704D;
  outline-offset: 2px;
}

/* Fokus khusus untuk komponen tertentu */
.btn:focus,
.nav-link:focus,
.form-input:focus {
  outline: 2px solid #0A704D;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Skip link untuk navigasi keyboard */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #0A704D;
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 0 4px 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}
```

#### Pengaturan Waktu
```tsx
// Carousel dengan kontrol manual
<div className="relative">
  <div className="carousel-container">
    {/* Konten carousel */}
 </div>
  
  {/* Kontrol manual */}
  <button 
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    aria-label="Slide sebelumnya"
    onClick={prevSlide}
  >
    <FiChevronLeft className="h-6 w-6" />
  </button>
  
  <button 
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    aria-label="Slide selanjutnya"
    onClick={nextSlide}
  >
    <FiChevronRight className="h-6 w-6" />
 </button>
  
  {/* Indikator slide */}
  <div className="flex justify-center mt-4 space-x-2">
    {slides.map((_, index) => (
      <button
        key={index}
        className={`h-3 w-3 rounded-full ${currentIndex === index ? 'bg-green-700' : 'bg-gray-300'}`}
        aria-label={`Pergi ke slide ${index + 1}`}
        onClick={() => goToSlide(index)}
      />
    ))}
  </div>
</div>
```

### 3. Dapat Dipahami (Understandable)

#### Bahasa yang Jelas
```tsx
// Deklarasi bahasa di HTML
<html lang="id">

// Untuk konten dalam bahasa asing
<p>
  Kami menggunakan metode pembelajaran <span lang="en">project-based learning</span> untuk meningkatkan keterampilan siswa.
</p>

// Untuk akronim
<abbr title="Penerimaan Peserta Didik Baru">PPDB</abbr>
```

#### Navigasi Konsisten
```tsx
// Breadcrumb dengan struktur yang jelas
<nav aria-label="Breadcrumb" className="bg-gray-50 py-3">
  <ol className="flex items-center space-x-2 text-sm">
    <li>
      <Link href="/" className="text-green-700 hover:text-green-900 focus:outline-none focus:underline">
        Beranda
      </Link>
    </li>
    <li>
      <FiChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
    </li>
    <li>
      <Link href="/berita" className="text-green-700 hover:text-green-900 focus:outline-none focus:underline">
        Berita
      </Link>
    </li>
    <li>
      <FiChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
    </li>
    <li className="text-gray-500" aria-current="page">
      Judul Berita
    </li>
  </ol>
</nav>
```

#### Label yang Jelas
```tsx
// Form dengan label yang tepat
<div className="space-y-6">
  <div>
    <label htmlFor="nama-lengkap" className="block text-sm font-medium text-gray-700">
      Nama Lengkap <span className="text-red-500">*</span>
    </label>
    <div className="mt-1">
      <input
        type="text"
        id="nama-lengkap"
        name="namaLengkap"
        required
        aria-describedby="nama-lengkap-error"
        className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
        placeholder="Masukkan nama lengkap Anda"
      />
    </div>
    <p id="nama-lengkap-error" className="mt-2 text-sm text-red-600 hidden">
      Nama lengkap wajib diisi
    </p>
  </div>
  
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
        aria-describedby="email-error"
        className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
        placeholder="email@contoh.com"
      />
    </div>
    <p id="email-error" className="mt-2 text-sm text-red-600 hidden">
      Format email tidak valid
    </p>
  </div>
</div>
```

### 4. Robust (Kuat)

#### Semantic HTML
```tsx
// Struktur halaman yang semantik
<div className="min-h-screen flex flex-col">
  <header role="banner">
    <SkipLink />
    <Navbar />
  </header>
  
  <main role="main" className="flex-grow">
    <HeroSection />
    <ContentSection />
  </main>
  
  <aside role="complementary">
    <Sidebar />
  </aside>
  
  <footer role="contentinfo">
    <Footer />
  </footer>
</div>
```

#### Validasi Input
```tsx
// Validasi form dengan feedback yang jelas
<form onSubmit={handleSubmit} noValidate>
  <div className="space-y-6">
    <div>
      <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
        NIK <span className="text-red-500">*</span>
      </label>
      <div className="mt-1">
        <input
          type="text"
          id="nik"
          name="nik"
          required
          pattern="[0-9]{16}"
          aria-describedby="nik-error"
          aria-invalid={errors.nik ? "true" : "false"}
          className={`py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border ${
            errors.nik ? "border-red-300" : "border-gray-300"
          } rounded-md`}
          placeholder="Masukkan 16 digit NIK"
        />
      </div>
      {errors.nik && (
        <p id="nik-error" className="mt-2 text-sm text-red-600">
          {errors.nik}
        </p>
      )}
    </div>
  </div>
</form>
```

## Contoh Aria-label/Role dan Skema Fokus

### 1. Aria-label dan Role untuk Komponen Interaktif

#### Tombol dengan Ikon
```tsx
// Tombol tutup modal
<button 
  aria-label="Tutup dialog" 
  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
>
  <FiX className="h-6 w-6" />
</button>

// Tombol toggle menu mobile
<button
  aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
  aria-expanded={isMenuOpen}
  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
>
  {isMenuOpen ? (
    <FiX className="block h-6 w-6" aria-hidden="true" />
  ) : (
    <FiMenu className="block h-6 w-6" aria-hidden="true" />
  )}
</button>
```

#### Form Input dengan Deskripsi
```tsx
<div>
  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    Kata Sandi
  </label>
  <div className="mt-1 relative rounded-md shadow-sm">
    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      aria-describedby="password-help"
      className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
    />
    <button
      type="button"
      aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
    >
      {showPassword ? (
        <FiEyeOff className="h-5 w-5 text-gray-400" />
      ) : (
        <FiEye className="h-5 w-5 text-gray-400" />
      )}
    </button>
 </div>
  <p id="password-help" className="mt-2 text-sm text-gray-500">
    Kata sandi minimal 8 karakter dengan kombinasi huruf dan angka
  </p>
</div>
```

#### Navigation Landmarks
```tsx
// Navigasi utama
<nav role="navigation" aria-label="Navigasi utama">
  {/* Menu items */}
</nav>

// Breadcrumb
<nav role="navigation" aria-label="Breadcrumb">
  {/* Breadcrumb items */}
</nav>

// Pagination
<nav role="navigation" aria-label="Navigasi halaman">
  {/* Pagination controls */}
</nav>

// Social media links
<ul role="list" aria-label="Tautan media sosial">
  <li>
    <a href="#" aria-label="Kunjungi Facebook kami">
      <FiFacebook className="h-6 w-6" />
    </a>
  </li>
  <li>
    <a href="#" aria-label="Kunjungi Instagram kami">
      <FiInstagram className="h-6 w-6" />
    </a>
  </li>
</ul>
```

### 2. Skema Fokus untuk Komponen

#### Skip Links
```tsx
// components/SkipLink.tsx
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onFocus={(e) => e.target.classList.add('focused')}
      onBlur={(e) => e.target.classList.remove('focused')}
    >
      Lewati ke konten utama
    </a>
  )
}
```

#### Fokus pada Form
```tsx
// Form dengan manajemen fokus
<form 
  ref={formRef}
  onSubmit={handleSubmit}
  onKeyDown={(e) => {
    // Submit dengan Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit(e)
    }
  }}
>
  <div className="space-y-6">
    {formFields.map((field, index) => (
      <div key={field.id}>
        <label 
          htmlFor={field.id} 
          className="block text-sm font-medium text-gray-700"
        >
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <input
          id={field.id}
          name={field.name}
          type={field.type}
          required={field.required}
          ref={index === 0 ? firstInputRef : null} // Fokus otomatis ke input pertama
          className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
        />
      </div>
    ))}
  </div>
</form>
```

#### Fokus pada Modal
```tsx
// Modal dengan manajemen fokus
<div 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="modal-title"
 aria-describedby="modal-description"
  ref={modalRef}
 onKeyDown={(e) => {
    // Tutup dengan Escape
    if (e.key === 'Escape') {
      onClose()
    }
  }}
>
  <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full">
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 
            id="modal-title"
            className="text-lg leading-6 font-medium text-gray-900"
            ref={titleRef} // Fokus otomatis ke judul modal
          >
            Judul Modal
          </h3>
          <div className="mt-2">
            <p id="modal-description" className="text-sm text-gray-500">
              Deskripsi konten modal
            </p>
          </div>
        </div>
      </div>
    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <button
        type="button"
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={onConfirm}
        ref={confirmButtonRef} // Fokus ke tombol konfirmasi
      >
        Konfirmasi
      </button>
      <button
        type="button"
        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={onClose}
      >
        Batal
      </button>
    </div>
  </div>
</div>
```

### 3. Aksesibilitas untuk Komponen Khusus

#### Accordion
```tsx
// components/Accordion.tsx
interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  
  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id)
  }
  
  return (
    <div className="border border-gray-200 rounded-md">
      {items.map((item) => (
        <div key={item.id} className="border-b border-gray-200 last:border-b-0">
          <h3 className="m-0">
            <button
              className="flex justify-between items-center w-full p-4 text-left text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => toggleItem(item.id)}
              aria-expanded={openId === item.id}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="font-medium">{item.title}</span>
              <FiChevronDown 
                className={`h-5 w-5 transform transition-transform ${
                  openId === item.id ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
          </h3>
          <div
            id={`accordion-content-${item.id}`}
            className={`p-4 bg-white ${openId === item.id ? 'block' : 'hidden'}`}
            role="region"
            aria-labelledby={`accordion-title-${item.id}`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}
```

#### Tab Interface
```tsx
// components/Tabs.tsx
interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export default function Tabs({ tabs, defaultTab }: TabsProps) {
 const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  
  return (
    <div>
      <div role="tablist" className="border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`py-2 px-4 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              activeTab === tab.id
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                const nextIndex = (tabs.findIndex(t => t.id === tab.id) + 1) % tabs.length
                document.getElementById(`tab-${tabs[nextIndex].id}`)?.focus()
              } else if (e.key === 'ArrowLeft') {
                const prevIndex = (tabs.findIndex(t => t.id === tab.id) - 1 + tabs.length) % tabs.length
                document.getElementById(`tab-${tabs[prevIndex].id}`)?.focus()
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          className={activeTab === tab.id ? 'block mt-4' : 'hidden'}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
```

## Internasionalisasi (i18n)

### 1. Konfigurasi i18n dengan next-i18next

```javascript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
  },
  localeDetection: false,
}
```

```javascript
// next.config.js
const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  // Konfigurasi lainnya
}
```

### 2. Struktur File Bahasa

```
public/
  locales/
    id/
      common.json
      home.json
      about.json
      ppdb.json
    en/
      common.json
      home.json
      about.json
      ppdb.json
```

### 3. File Bahasa Indonesia (id/common.json)

```json
{
  "navigation": {
    "home": "Beranda",
    "profile": "Profil",
    "academic": "Akademik",
    "news": "Berita",
    "gallery": "Galeri",
    "teachers": "Guru & Staf",
    "ppdb": "PPDB",
    "contact": "Kontak"
  },
  "buttons": {
    "register_now": "Daftar Sekarang",
    "learn_more": "Pelajari Lebih Lanjut",
    "read_more": "Baca Selengkapnya",
    "contact_us": "Hubungi Kami"
  },
  "footer": {
    "address": "Alamat",
    "phone": "Telepon",
    "email": "Email",
    "social_media": "Media Sosial"
  },
  "accessibility": {
    "skip_to_main": "Lewati ke konten utama",
    "close_dialog": "Tutup dialog",
    "open_menu": "Buka menu",
    "close_menu": "Tutup menu"
  }
}
```

### 4. File Bahasa Inggris (en/common.json)

```json
{
  "navigation": {
    "home": "Home",
    "profile": "Profile",
    "academic": "Academic",
    "news": "News",
    "gallery": "Gallery",
    "teachers": "Teachers & Staff",
    "ppdb": "Admission",
    "contact": "Contact"
  },
  "buttons": {
    "register_now": "Register Now",
    "learn_more": "Learn More",
    "read_more": "Read More",
    "contact_us": "Contact Us"
  },
  "footer": {
    "address": "Address",
    "phone": "Phone",
    "email": "Email",
    "social_media": "Social Media"
  },
  "accessibility": {
    "skip_to_main": "Skip to main content",
    "close_dialog": "Close dialog",
    "open_menu": "Open menu",
    "close_menu": "Close menu"
  }
}
```

### 5. Implementasi i18n di Komponen

```tsx
// components/layout/Navbar.tsx
import { useTranslation } from 'next-i18next'

export default function Navbar() {
  const { t } = useTranslation('common')
  
  const navLinks = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.profile'), href: '/profil' },
    { name: t('navigation.academic'), href: '/akademik' },
    { name: t('navigation.news'), href: '/berita' },
    { name: t('navigation.gallery'), href: '/galeri' },
    { name: t('navigation.teachers'), href: '/guru-staf' },
    { name: t('navigation.ppdb'), href: '/ppdb' },
    { name: t('navigation.contact'), href: '/kontak' },
  ]
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-green-800">MA Malnu Kananga</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium hover:text-green-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center">
            <Link
              href="/ppdb/daftar"
              className="ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 transition-colors"
            >
              {t('buttons.register_now')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
```

### 6. Pengaturan Tanggal dan Format Lokal

```tsx
// lib/date.ts
import { format, parseISO } from 'date-fns'
import { id, enUS } from 'date-fns/locale'

const locales = {
  id: id,
  en: enUS,
}

export function formatDate(date: string, locale: string = 'id'): string {
  const dateObj = parseISO(date)
  return format(dateObj, 'dd MMMM yyyy', { locale: locales[locale] })
}

export function formatDateTime(date: string, locale: string = 'id'): string {
  const dateObj = parseISO(date)
  return format(dateObj, 'dd MMMM yyyy HH:mm', { locale: locales[locale] })
}
```

### 7. Penggunaan Format Tanggal di Komponen

```tsx
// components/NewsCard.tsx
import { useTranslation } from 'next-i18next'
import { formatDate } from '@/lib/date'

interface NewsCardProps {
  title: string
 excerpt: string
 date: string
  author: string
  slug: string
}

export default function NewsCard({ title, excerpt, date, author, slug }: NewsCardProps) {
  const { i18n } = useTranslation('common')
 const formattedDate = formatDate(date, i18n.language)
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <time dateTime={date}>{formattedDate}</time>
          <span className="mx-2">•</span>
          <span>{author}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {excerpt}
        </p>
        
        <Link 
          href={`/berita/${slug}`} 
          className="inline-flex items-center text-green-700 font-medium hover:text-green-900"
        >
          {i18n.t('buttons.read_more')}
          <FiChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
```

### 8. Switcher Bahasa

```tsx
// components/LanguageSwitcher.tsx
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation('common')
  const router = useRouter()
 const { pathname, asPath, query } = router
  
  const changeLanguage = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale })
  }
  
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('id')}
        className={`px-3 py-1 text-sm rounded ${
          i18n.language === 'id' 
            ? 'bg-green-700 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="Bahasa Indonesia"
      >
        ID
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 text-sm rounded ${
          i18n.language === 'en' 
            ? 'bg-green-700 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
```

## Checklist Aksesibilitas Final

### Persepsi (Perceivable)
- [x] Semua gambar memiliki alt text yang bermakna
- [x] Kontras warna memenuhi rasio 4.5:1 untuk teks
- [x] Konten multimedia memiliki alternatif teks
- [x] Informasi disampaikan dalam lebih dari satu cara (visual, audio, tekstual)

### Operabilitas (Operable)
- [x] Semua fungsi dapat diakses melalui keyboard
- [x] Indikator fokus jelas dan konsisten
- [x] Konten tidak berkedip lebih dari 3 detik
- [x] Timeout dapat diatur ulang atau dimatikan

### Dapat Dipahami (Understandable)
- [x] Bahasa halaman dideklarasikan dengan benar
- [x] Navigasi konsisten di seluruh situs
- [x] Label form jelas dan deskriptif
- [x] Instruksi tidak bergantung hanya pada sensorik

### Robust (Kuat)
- [x] HTML valid dan semantik
- [x] Kompatibel dengan teknologi assistif
- [x] Komponen custom memiliki role dan state yang sesuai
- [x] Validasi input memberikan feedback yang jelas

---
*Dokumen ini berisi panduan lengkap untuk aksesibilitas dan internasionalisasi website MA Malnu Kananga, mencakup checklist WCAG 2.2 AA, contoh implementasi aria-label/role, skema fokus keyboard, serta konfigurasi i18n untuk mendukung berbagai bahasa. Dokumentasi ini dirancang untuk memastikan website dapat diakses oleh semua pengguna, termasuk mereka yang menggunakan teknologi assistif.*