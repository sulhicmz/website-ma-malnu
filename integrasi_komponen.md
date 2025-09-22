# Integrasi Komponen dan Konfigurasi

Dokumen ini menjelaskan cara menggunakan komponen dan konfigurasi yang telah diimplementasikan.

## 1. WhatsApp Button dengan Template Pesan

Komponen WhatsApp Button memungkinkan Anda membuat tombol yang membuka chat WhatsApp dengan pesan yang sudah diisi sebelumnya.

### Penggunaan Dasar

```jsx
import WhatsAppButton from '@/components/WhatsAppButton'

// Penggunaan sederhana
<WhatsAppButton 
  phoneNumber="6281234567890" 
  message="Halo, saya ingin bertanya tentang PPDB." 
  buttonText="Tanya PPDB via WhatsApp"
/>
```

### Penggunaan dengan Template Parameters

```jsx
<WhatsAppButton 
  phoneNumber="6281234567890" 
  message="Halo {{name}}, terima kasih atas pertanyaan Anda: {{question}}"
  buttonText="Hubungi Kami"
  templateParams={{
    name: "Budi",
    question: "Kapan pendaftaran dibuka?"
  }}
/>
```

### Props yang Tersedia

| Prop | Tipe | Default | Deskripsi |
|------|------|---------|-----------|
| phoneNumber | string | - | Nomor WhatsApp (format: 6281234567890) |
| message | string | "" | Pesan template awal |
| buttonText | string | "Hubungi Kami via WhatsApp" | Teks pada tombol |
| context | string | "general" | Konteks untuk tracking analytics |
| className | string | "" | Class CSS tambahan |
| templateParams | object | {} | Parameter untuk mengganti placeholder dalam pesan |

## 2. Google Maps Embed

Komponen ini memungkinkan Anda menampilkan peta Google Maps berdasarkan alamat.

### Penggunaan

```jsx
import GoogleMapEmbed from '@/components/GoogleMapEmbed'

<GoogleMapEmbed 
  address="Jl. Raya Kananga No. 123, Kananga, Kec. Kananga, Kab. Kananga 12345"
  title="Lokasi MA Malnu Kananga"
  height="400px"
/>
```

### Props yang Tersedia

| Prop | Tipe | Default | Deskripsi |
|------|------|---------|-----------|
| address | string | - | Alamat yang akan ditampilkan di peta |
| title | string | "Lokasi Sekolah" | Judul untuk iframe peta |
| className | string | "" | Class CSS tambahan |
| height | string | "400px" | Tinggi peta (dalam px, %, dsb) |

## 3. Google Analytics 4 via Google Tag Manager

Implementasi GA4 dilakukan melalui Google Tag Manager yang sudah dikonfigurasi di layout utama.

### Konfigurasi Environment Variables

Tambahkan ke file `.env.local`:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Tracking Event Kustom

```jsx
import { trackEvent, trackWhatsAppClick, trackPPDBFormSubmit } from '@/lib/gtm'

// Tracking event kustom
trackEvent('custom_event', {
  parameter1: 'value1',
  parameter2: 'value2'
})

// Tracking klik WhatsApp
trackWhatsAppClick('ppdb_page')

// Tracking submit form PPDB
trackPPDBFormSubmit('IPA')
```

## 4. RSS Feed

RSS feed tersedia di endpoint `/api/rss` dan secara otomatis menampilkan berita dan pengumuman terbaru.

### Konfigurasi

RSS feed akan secara otomatis memperbarui konten setiap jam jika ada perubahan.

### Akses RSS Feed

Feed dapat diakses di:
```
https://www.malnukananga.sch.id/api/rss
```

### Struktur XML RSS

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MA Malnu Kananga - Berita & Pengumuman</title>
    <description>Berita dan pengumuman terkini dari MA Malnu Kananga</description>
    <link>https://www.malnukananga.sch.id</link>
    <language>id-ID</language>
    <lastBuildDate>Mon, 01 Jan 2024 00:00:00 GMT</lastBuildDate>
    <atom:link href="https://www.malnukananga.sch.id/api/rss" rel="self" type="application/rss+xml" />
    <item>
      <title><![CDATA[Judul Berita]]></title>
      <description><![CDATA[Deskripsi berita...]]></description>
      <link>https://www.malnukananga.sch.id/berita/slug-berita</link>
      <guid isPermaLink="true">https://www.malnukananga.sch.id/berita/slug-berita</guid>
      <pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate>
      <author><![CDATA[Nama Penulis]]></author>
    </item>
  </channel>
</rss>
```

## Konfigurasi SEO Tambahan

### robots.txt

File `robots.txt` telah dikonfigurasi untuk mengizinkan crawling dan menunjukkan lokasi sitemap serta RSS feed.

### sitemap.xml

Sitemap mencakup halaman-halaman utama situs web untuk membantu mesin pencari mengindeks konten.

## Penggunaan di Halaman Kontak

Contoh penggunaan komponen-komponen ini di halaman kontak:

```jsx
// src/app/kontak/page.tsx
import WhatsAppButton from '@/components/WhatsAppButton'
import GoogleMapEmbed from '@/components/GoogleMapEmbed'

export default function KontakPage() {
  return (
    <div>
      <h1>Kontak Kami</h1>
      
      {/* WhatsApp Button */}
      <WhatsAppButton 
        phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_GENERAL || "6281234567890"}
        message="Halo, saya ingin bertanya tentang {{topic}}"
        buttonText="Hubungi Kami via WhatsApp"
        templateParams={{
          topic: "informasi sekolah"
        }}
      />
      
      {/* Google Maps Embed */}
      <GoogleMapEmbed 
        address="Jl. Raya Kananga No. 123, Kananga, Kec. Kananga, Kab. Kananga 12345"
        title="Lokasi MA Malnu Kananga"
        height="400px"
      />
    </div>
  )
}
```