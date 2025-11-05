# Teknis: Stack & Repository - MA Malnu Kananga

## Stack Teknologi

### Frontend
1. **Next.js 14 (App Router)**
   - Framework React terkini dengan fitur server-side rendering dan static site generation
   - Menggunakan App Router untuk struktur aplikasi yang lebih modular
   - Keunggulan: Kecepatan, SEO-friendly, dan pengalaman pengguna yang optimal

2. **TypeScript**
   - Superset JavaScript dengan type checking statis
   - Meningkatkan kualitas kode dan mengurangi bug
   - Memudahkan kolaborasi tim dan maintenance jangka panjang

3. **Tailwind CSS**
   - Framework CSS utility-first
   - Memungkinkan styling yang konsisten dan cepat
   - Mudah dikustomisasi sesuai brand identity

4. **shadcn/ui**
   - Kumpulan komponen UI yang dapat disalin dan dimodifikasi
   - Komponen dibangun dengan Radix UI dan Tailwind CSS
   - Memberikan fleksibilitas tanpa mengunci vendor

### Backend & CMS
1. **Sanity.io**
   - Headless CMS yang fleksibel dan skalabel
   - Memungkinkan struktur konten yang kompleks dengan GROQ query language
   - Real-time collaboration dan preview content
   - Cocok untuk konten dinamis seperti berita, halaman profil, dan galeri

2. **API Routes Next.js**
   - Untuk endpoint API kustom yang terintegrasi dengan aplikasi
   - Menangani form submission, integrasi pihak ketiga, dan logika bisnis
   - Serverless functions dengan skalabilitas otomatis

### Database & Hosting
1. **Vercel**
   - Platform deployment terbaik untuk aplikasi Next.js
   - Integrasi langsung dengan GitHub untuk CI/CD
   - Edge Network untuk kecepatan global
   - Preview deployments untuk setiap pull request

2. **Cloudinary** (untuk media)
   - Penyimpanan dan optimasi gambar/video
   - Transformasi media on-the-fly
   - CDN global untuk pengiriman cepat

### Integrasi & Layanan Pihak Ketiga
1. **Google Analytics 4**
   - Analitik website untuk memahami perilaku pengguna
   - Integrasi melalui Google Tag Manager

2. **WhatsApp Business API**
   - Untuk komunikasi langsung dengan calon siswa/orang tua
   - Deep linking untuk pesan template

3. **Google Maps Embed**
   - Untuk menampilkan lokasi sekolah secara interaktif

4. **Google reCAPTCHA v3**
   - Untuk melindungi form dari spam dan abuse

5. **SMTP Service** (untuk notifikasi email)
   - Untuk mengirim notifikasi pendaftaran dan konfirmasi

## Struktur Folder Next.js 14

```
ma-malnu-kananga/
├── app/                          # App Router directory
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── beranda/
│   │   ├── page.tsx
│   │   └── beranda.module.css
│   ├── profil/
│   │   ├── page.tsx
│   │   ├── sejarah/
│   │   │   └── page.tsx
│   │   ├── visi-misi/
│   │   │   └── page.tsx
│   │   └── fasilitas/
│   │       └── page.tsx
│   ├── akademik/
│   │   ├── page.tsx
│   │   ├── kurikulum/
│   │   └── page.tsx
│   │   └── ekstrakurikuler/
│   │       └── page.tsx
│   ├── berita/
│   │   ├── page.tsx
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── kategori/
│   │       └── [kategori]/
│   │           └── page.tsx
│   ├── galeri/
│   │   ├── page.tsx
│   │   └── [album]/
│   │       └── page.tsx
│   ├── guru-staf/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── ppdb/
│   │   ├── page.tsx
│   │   ├── syarat/
│   │   │   └── page.tsx
│   │   ├── biaya/
│   │   └── page.tsx
│   │   ├── jadwal/
│   │   │   └── page.tsx
│   │   ├── daftar/
│   │   │   └── page.tsx
│   │   └── hasil/
│   │       └── page.tsx
│   ├── kontak/
│   │   ├── page.tsx
│   │   ├── lokasi/
│   │   │   └── page.tsx
│   │   └── faq/
│   │       └── page.tsx
│   ├── api/                      # API routes
│   │   ├── ppdb/
│   │   │   └── route.ts
│   │   ├── kontak/
│   │   │   └── route.ts
│   │   └── webhook/
│   │       └── route.ts
│   └── components/               # Shared components
├── components/                   # UI components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   ├── ui/
│   │   ├── CardBerita.tsx
│   │   ├── CardGuru.tsx
│   │   ├── BannerPPDB.tsx
│   │   ├── GalleryGrid.tsx
│   │   └── Pagination.tsx
│   ├── forms/
│   │   ├── PPDBForm.tsx
│   │   └── ContactForm.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── FasilitasSection.tsx
│       └── TestimoniSection.tsx
├── lib/                          # Utility functions
│   ├── sanity.ts                 # Sanity client
│   ├── utils.ts                  # Helper functions
│   ├── validation.ts             # Zod validation schemas
│   └── api.ts                    # API helper functions
├── types/                        # TypeScript types
│   ├── sanity.ts                 # Sanity schema types
│   ├── ppdb.ts                   # PPDB form types
│   └── konten.ts                 # Content types
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   ├── favicons/
│   └── documents/
├── styles/                       # Global CSS
│   └── globals.css
├── sanity/                       # Sanity Studio
│   ├── schemas/
│   ├── deskStructure.ts
│   └── config.ts
├── tests/                        # Testing files
│   ├── unit/
│   └── e2e/
├── .github/                      # GitHub workflows
│   └── workflows/
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                     # Project documentation
```

## Daftar Paket NPM

### Dependencies Utama
```json
{
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "typescript": "5.2",
    "tailwindcss": "3.3.3",
    "postcss": "8.4.31",
    "autoprefixer": "10.4.16",
    "@sanity/client": "6.4.9",
    "@sanity/image-url": "1.0.2",
    "@sanity/vision": "3.16.7",
    "groq": "3.16.7",
    "zod": "3.22.4",
    "react-hook-form": "7.47.0",
    "next-sanity": "5.5.11",
    "next-themes": "0.2.1",
    "sharp": "0.32.6",
    "date-fns": "2.30.0",
    "clsx": "2.0.0",
    "lucide-react": "0.279.0",
    "framer-motion": "10.16.4",
    "react-intersection-observer": "9.5.2",
    "react-hot-toast": "2.4.1"
  }
}
```

### Development Dependencies
```json
{
  "devDependencies": {
    "@types/node": "20.8.2",
    "@types/react": "18.2.24",
    "@types/react-dom": "18.2.9",
    "eslint": "8.49.0",
    "eslint-config-next": "14.0.0",
    "@next/env": "14.0.0",
    "prettier": "3.0.3",
    "prettier-plugin-tailwindcss": "0.5.4",
    "@testing-library/react": "14.0.0",
    "@testing-library/jest-dom": "6.1.3",
    "jest": "29.7.0",
    "jest-environment-jsdom": "29.7.0",
    "playwright": "1.38.0",
    "@playwright/test": "1.38.0",
    "@types/jest": "29.5.5",
    "vitest": "0.34.6"
  }
}
```

## Konfigurasi Utama

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.sanity.io', 'res.cloudinary.com'],
 },
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#d1f0df',
          200: '#a3e1bf',
          300: '#75d29f',
          400: '#47c37f',
          500: '#19b45f',
          600: '#0a904c',
          700: '#0a704d',
          800: '#08503a',
          900: '#063027',
        },
        secondary: {
          50: '#fdf8f0',
          100: '#f9edd1',
          200: '#f4dba3',
          300: '#efc975',
          400: '#eab747',
          500: '#d4af37',
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
          700: '#1e3a8a',
          800: '#172d6b',
          900: '#10204c',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
        arabic: ['Amiri', 'serif']
      },
    },
  },
  plugins: [],
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/app/*": ["./app/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Script NPM

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "sanity:dev": "sanity dev",
    "sanity:build": "sanity build",
    "sanity:deploy": "sanity deploy"
  }
}
```

## Repository Git

### Struktur Branch
1. **main** - Branch produksi, hanya menerima merge dari staging
2. **staging** - Branch untuk testing sebelum produksi
3. **develop** - Branch pengembangan utama
4. **feature/* ** - Branch untuk fitur spesifik (contoh: feature/ppdb-form)
5. **bugfix/* ** - Branch untuk perbaikan bug (contoh: bugfix/contact-form-validation)
6. **hotfix/* ** - Branch untuk perbaikan darurat di produksi

### Konvensi Commit
Menggunakan conventional commits dengan format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Tipe Commit:
- **feat**: Penambahan fitur baru
- **fix**: Perbaikan bug
- **docs**: Perubahan dokumentasi
- **style**: Perubahan yang tidak mempengaruhi makna kode (whitespace, formatting, missing semi-colons, etc)
- **refactor**: Perubahan kode yang tidak memperbaiki bug atau menambah fitur
- **perf**: Perubahan yang meningkatkan performa
- **test**: Penambahan atau perbaikan test
- **build**: Perubahan yang mempengaruhi sistem build atau dependensi eksternal
- **ci**: Perubahan pada file dan script CI
- **chore**: Perubahan lain yang tidak memodifikasi src atau test files
- **revert**: Revert commit sebelumnya

#### Contoh Commit Message:
```
feat(ppdb): tambah validasi form pendaftaran

Menambahkan validasi Zod untuk form pendaftaran PPDB dengan:
- Validasi field wajib
- Validasi format email
- Validasi ukuran file upload
- Pesan error dalam bahasa Indonesia

Resolves #123
```

### Workflow GitHub Actions
1. **CI Pipeline**
   - Trigger: Setiap push ke branch feature/*, bugfix/*, develop
   - Steps:
     - Setup Node.js
     - Install dependencies
     - Type checking
     - Linting
     - Unit testing
     - Build aplikasi

2. **CD Pipeline**
   - Trigger: Merge ke branch staging dan main
   - Steps:
     - Deploy ke environment staging/production
     - Notifikasi ke tim
     - Monitoring deployment status

### File Konfigurasi GitHub Actions

#### .github/workflows/ci.yml
```yaml
name: CI

on:
  push:
    branches: [ develop, feature/**, bugfix/** ]
  pull_request:
    branches: [ develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Type checking
      run: npm run type-check

    - name: Lint
      run: npm run lint

    - name: Test
      run: npm run test

    - name: Build
      run: npm run build
```

#### .github/workflows/cd-staging.yml
```yaml
name: CD Staging

on:
  push:
    branches: [ staging ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build
      env:
        NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
        NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.SANITY_DATASET }}
        NEXT_PUBLIC_SANITY_API_VERSION: ${{ secrets.SANITY_API_VERSION }}

    - name: Deploy to Vercel Staging
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        github-token: ${{ secrets.GITHUB_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

## Rationale Pemilihan Stack

### Next.js 14
- **Keunggulan SSR/SSG**: Meningkatkan SEO dan kecepatan loading
- **App Router**: Struktur aplikasi yang lebih modular dan maintainable
- **Image Optimization**: Bawaan optimasi gambar otomatis
- **API Routes**: Backend terintegrasi tanpa server terpisah
- **TypeScript Support**: First-class support untuk type safety

### Sanity.io
- **Flexibility**: Schema yang fleksibel untuk berbagai jenis konten
- **Real-time Preview**: Content preview langsung saat editing
- **GROQ**: Query language yang powerful untuk fetching data
- **Collaboration**: Real-time collaboration untuk tim konten
- **Scalability**: Mudah diskalakan sesuai pertumbuhan konten

### Tailwind CSS
- **Consistency**: Sistem design yang konsisten di seluruh aplikasi
- **Utility-first**: Development yang cepat tanpa menulis CSS custom
- **Customization**: Mudah dikustomisasi sesuai brand guidelines
- **PurgeCSS**: Otomatis menghapus CSS yang tidak digunakan

### TypeScript
- **Type Safety**: Mengurangi bug dan meningkatkan maintainability
- **Developer Experience**: Autocomplete dan refactoring yang lebih baik
- **Documentation**: Type sebagai dokumentasi kode yang self-explanatory
- **Refactoring**: Mudah merubah kode secara massal dengan confidence

### Vercel
- **Performance**: Edge network untuk pengiriman konten tercepat
- **Deployment**: Integrasi langsung dengan GitHub
- **Preview**: Preview deployment otomatis untuk setiap PR
- **Scalability**: Auto-scaling berdasarkan traffic

## Integrasi dengan CMS

### Struktur Konten Sanity
1. **siteSettings** - Konfigurasi global website
2. **page** - Halaman statis seperti profil, fasilitas
3. **post** - Berita dan pengumuman
4. **teacher** - Data guru dan staf
5. **facility** - Informasi fasilitas sekolah
6. **extracurricular** - Program ekstrakurikuler
7. **achievement** - Prestasi sekolah
8. **gallery** - Album dan foto galeri
9. **faq** - Pertanyaan umum
10. **ppdbSettings** - Konfigurasi PPDB

### Hubungan dengan Next.js
- Menggunakan `next-sanity` package untuk integrasi
- Fetching data dengan `@sanity/client` dan GROQ
- Image optimization dengan `@sanity/image-url`
- Real-time preview dengan Sanity Studio

---
*Dokumen ini berisi spesifikasi teknis untuk stack dan repository yang akan digunakan dalam pengembangan website MA Malnu Kananga. Dokumentasi ini akan menjadi panduan bagi tim pengembang dalam membangun aplikasi web yang skalabel, maintainable, dan sesuai dengan kebutuhan sekolah.*