# Deploy & Domain - MA Malnu Kananga

## Langkah-langkah Deploy ke Vercel

### 1. Persiapan Awal

#### Prasyarat
- [ ] Akun Vercel (https://vercel.com)
- [ ] Repository GitHub yang sudah siap
- [ ] Akses ke project repository
- [ ] Environment variables yang diperlukan

#### Struktur Project
```
ma-malnu-kananga/
├── app/                          # App Router directory
├── components/                   # UI components
├── lib/                          # Utility functions
├── public/                       # Static assets
├── styles/                       # Global CSS
├── sanity/                       # Sanity Studio
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── vercel.json                   # Vercel configuration
└── .env.local                    # Environment variables (local)
```

### 2. Konfigurasi Vercel

#### File konfigurasi Vercel
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": {
        "includeFiles": [
          "next.config.js",
          "public/**/*",
          ".next/**/*"
        ]
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "github": {
    "silent": true
 },
  "regions": ["sin1"] // Singapore region for better performance in Indonesia
}
```

#### Konfigurasi Next.js untuk Vercel
```javascript
// next.config.js
const nextConfig = {
 reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cdn.sanity.io',
      'res.cloudinary.com'
    ],
    formats: ['image/webp'],
  },
  // Redirect www to non-www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.malnukananga.sch.id',
          },
        ],
        destination: 'https://malnukananga.sch.id/:path*',
        permanent: true,
      },
    ]
  },
  // Custom headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### 3. Setup Project di Vercel

#### Langkah-langkah Setup
1. **Login ke Vercel Dashboard**
   - Akses https://vercel.com/dashboard
   - Login dengan akun GitHub/Google

2. **Import Project**
   - Klik "New Project"
   - Pilih repository GitHub "ma-malnu-kananga"
   - Klik "Import"

3. **Konfigurasi Build Settings**
   - Framework Preset: Next.js
   - Root Directory: /
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Environment Variables**
   - Tambahkan semua environment variables yang diperlukan
   - Pastikan semua secrets disimpan dengan aman

5. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build dan deployment selesai

### 4. Environment Variables

#### Variabel Lingkungan Wajib
```env
# .env.local (untuk development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=XXXXXXXX
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_WHATSAPP_GENERAL=6281234567890
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLOUDINARY_CLOUD_NAME=XXXXXXXXXXXX
CLOUDINARY_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLOUDINARY_API_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
DATABASE_URL=postgresql://user:password@host:port/database
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
ADMIN_EMAIL=admin@malnukananga.sch.id
UPSTASH_REDIS_REST_URL=https://XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
UPSTASH_REDIS_REST_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### Variabel Lingkungan di Vercel
```bash
# Production Environment Variables (Vercel Dashboard)
NEXT_PUBLIC_SITE_URL=https://malnukananga.sch.id
NEXT_PUBLIC_SANITY_PROJECT_ID=XXXXXXXX
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=@recaptcha_secret_key # Secret reference
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_WHATSAPP_GENERAL=6281234567890
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=@google_maps_api_key # Secret reference
CLOUDINARY_CLOUD_NAME=XXXXXXXXXXXX
CLOUDINARY_API_KEY=@cloudinary_api_key # Secret reference
CLOUDINARY_API_SECRET=@cloudinary_api_secret # Secret reference
DATABASE_URL=@database_url # Secret reference
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=@smtp_user # Secret reference
SMTP_PASS=@smtp_pass # Secret reference
ADMIN_EMAIL=admin@malnukananga.sch.id
UPSTASH_REDIS_REST_URL=@upstash_redis_url # Secret reference
UPSTASH_REDIS_REST_TOKEN=@upstash_redis_token # Secret reference
```

### 5. Pengaturan DNS untuk Domain

#### Domain Utama: malnukananga.sch.id

##### Record A (IPv4)
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 300
```

##### Record AAAA (IPv6)
```
Type: AAAA
Name: @
Value: 2600:6c40:4000:1::15
TTL: 300
```

##### Record CNAME untuk WWW
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300
```

##### Record TXT untuk Verifikasi Domain
```
Type: TXT
Name: @
Value: vercel-domain-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TTL: 300
```

##### Record TXT untuk SPF
```
Type: TXT
Name: @
Value: v=spf1 include:spf.smtp2go.com ~all
TTL: 300
```

##### Record DKIM (jika menggunakan email)
```
Type: CNAME
Name: smtp2go._domainkey
Value: smtp2go.com
TTL: 300
```

##### Record MX (jika menggunakan email)
```
Type: MX
Name: @
Value: mail.smtp2go.com
Priority: 10
TTL: 300
```

#### Subdomain untuk CMS: cms.malnukananga.sch.id

##### Record CNAME untuk CMS
```
Type: CNAME
Name: cms
Value: cname.vercel-dns.com
TTL: 300
```

#### Subdomain untuk API: api.malnukananga.sch.id

##### Record CNAME untuk API
```
Type: CNAME
Name: api
Value: cname.vercel-dns.com
TTL: 300
```

### 6. Konfigurasi Domain di Vercel Dashboard

#### Langkah-langkah Konfigurasi Domain
1. **Akses Project Settings**
   - Di Vercel Dashboard, pilih project "ma-malnu-kananga"
   - Klik "Settings" > "Domains"

2. **Tambah Domain**
   - Klik "Add"
   - Masukkan domain: `malnukananga.sch.id`
   - Klik "Add"

3. **Verifikasi Domain**
   - Vercel akan menampilkan record DNS yang perlu ditambahkan
   - Tambahkan record tersebut ke DNS provider
   - Klik "Verify" setelah menambahkan record

4. **Konfigurasi Redirect WWW**
   - Tambahkan domain `www.malnukananga.sch.id`
   - Konfigurasi redirect ke domain utama

5. **SSL Certificate**
   - Vercel akan secara otomatis mengatur SSL certificate
   - Pastikan status SSL menunjukkan "Valid"

### 7. Pipeline Deployment

#### Branch Strategy
```
main (production)     → malnukananga.sch.id
staging               → staging.malnukananga.sch.id
develop               → develop.malnukananga.sch.id
feature/*             → preview deployments
bugfix/*              → preview deployments
hotfix/*              → preview deployments
```

#### Konfigurasi GitHub Actions untuk CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main, staging, develop]
  pull_request:
    branches: [develop]

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
    
    - name: Linting
      run: npm run lint
    
    - name: Unit testing
      run: npm run test
    
    - name: Build
      run: npm run build
      env:
        NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
        NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.SANITY_DATASET }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/staging'
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        github-token: ${{ secrets.GITHUB_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: ${{ github.ref == 'refs/heads/main' && '--prod' || '' }}
```

### 8. Monitoring dan Logging

#### Integrasi Monitoring
```javascript
// lib/monitoring.js
// Sentry integration
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})

// Vercel Analytics
import { Analytics } from '@vercel/analytics/react'

export function MonitoringWrapper({ children }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
```

#### Logging Server-Side
```typescript
// lib/logger.ts
import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  base: {
    env: process.env.NODE_ENV,
    revision: process.env.VERCEL_GIT_COMMIT_SHA,
  },
})

export default logger
```

### 9. Backup dan Recovery

#### Backup Database
```bash
# Script backup database (dijalankan via cron job)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_$DATE.sql"

# Backup database
pg_dump $DATABASE_URL > $BACKUP_FILE

# Upload ke storage
aws s3 cp $BACKUP_FILE s3://malnu-backups/database/

# Hapus file lokal
rm $BACKUP_FILE

# Hapus backup lama (lebih dari 30 hari)
aws s3 ls s3://malnu-backups/database/ | grep "backup_" | while read -r line; do
  createDate=`echo $line | awk {'print $1" "$2'}`
  createDate=`date -d"$createDate" +%s`
  olderThan=`date -d"30 days ago" +%s`
  if [ $createDate -lt $olderThan ]; then
    fileName=`echo $line | awk {'print $4'}`
    if [[ $fileName != "" ]]; then
      aws s3 rm s3://malnu-backups/database/$fileName
    fi
  fi
done
```

#### Backup Konten CMS
```bash
# Script backup konten Sanity
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="sanity_backup_$DATE"

# Export dataset
npx sanity dataset export production $BACKUP_DIR

# Upload ke storage
aws s3 sync $BACKUP_DIR s3://malnu-backups/sanity/

# Hapus file lokal
rm -rf $BACKUP_DIR
```

### 10. Rollback Plan

#### Langkah-langkah Rollback
1. **Identifikasi Masalah**
   - Monitor logs dan error tracking
   - Identifikasi commit yang menyebabkan masalah
   - Evaluasi dampak terhadap pengguna

2. **Rollback ke Deploy Sebelumnya**
   ```bash
   # Melalui Vercel CLI
   vercel rollback --token=$VERCEL_TOKEN
   
   # Atau melalui Vercel Dashboard
   # 1. Akses project di Vercel Dashboard
   # 2. Klik "Deployments"
   # 3. Pilih deployment sebelumnya yang stabil
   # 4. Klik "Rollback to this Deployment"
   ```

3. **Rollback Database (jika diperlukan)**
   ```bash
   # Restore dari backup terakhir
   aws s3 cp s3://malnu-backups/database/backup_YYYYMMDD_HHMMSS.sql .
   pg_restore -d $DATABASE_URL backup_YYYYMMDD_HHMMSS.sql
   ```

4. **Verifikasi Rollback**
   - Test fungsionalitas utama
   - Monitor error logs
   - Pastikan tidak ada regression

5. **Komunikasi**
   - Informasikan tim tentang rollback
   - Dokumentasikan penyebab masalah
   - Buat issue untuk fix permanen

#### Checklist Rollback
- [ ] Backup terakhir tersedia
- [ ] Deployment sebelumnya stabil
- [ ] Akses ke Vercel Dashboard
- [ ] Akses ke database backup
- [ ] Tim operasional siaga
- [ ] Komunikasi dengan stakeholder
- [ ] Monitoring aktif setelah rollback

### 11. Post-Deployment Checklist

#### Verifikasi Fungsional
- [ ] Halaman beranda dapat diakses
- [ ] Navigasi antar halaman berfungsi
- [ ] Form PPDB dapat diakses
- [ ] Upload file berfungsi
- [ ] reCAPTCHA berfungsi
- [ ] Email notifikasi terkirim
- [ ] API endpoints merespon

#### Verifikasi Performance
- [ ] Kecepatan loading < 3 detik
- [ ] Core Web Vitals memenuhi standar
- [ ] Mobile responsiveness optimal
- [ ] Tidak ada error JavaScript
- [ ] Gambar dioptimalkan

#### Verifikasi Security
- [ ] HTTPS enforced
- [ ] SSL certificate valid
- [ ] Security headers diterapkan
- [ ] Rate limiting berfungsi
- [ ] Tidak ada vulnerability yang diketahui

#### Verifikasi SEO
- [ ] Meta tags terisi dengan benar
- [ ] Structured data valid
- [ ] Sitemap dapat diakses
- [ ] robots.txt terkonfigurasi
- [ ] Canonical URLs benar

#### Verifikasi Integrasi
- [ ] Google Analytics berfungsi
- [ ] Google Tag Manager berfungsi
- [ ] Google Maps embed berfungsi
- [ ] WhatsApp API berfungsi
- [ ] Email service berfungsi
- [ ] Cloudinary berfungsi

## Maintenance Schedule

### Harian
- [ ] Monitoring uptime
- [ ] Review error logs
- [ ] Backup database
- [ ] Update security patches

### Mingguan
- [ ] Performance audit
- [ ] Security scan
- [ ] Update dependencies
- [ ] Test backup recovery

### Bulanan
- [ ] Full system backup
- [ ] Review access controls
- [ ] Update SSL certificates
- [ ] Review monitoring alerts

---
*Dokumen ini berisi panduan lengkap untuk deployment dan konfigurasi domain website MA Malnu Kananga di Vercel, mencakup langkah-langkah deploy, konfigurasi environment variables, pengaturan DNS untuk domain malnukananga.sch.id, pipeline deployment, monitoring, backup, dan rencana rollback. Dokumentasi ini dirancang untuk memastikan proses deployment yang aman, efisien, dan dapat diandalkan.*