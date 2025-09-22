# Skema CMS & Konten Terstruktur - MA Malnu Kananga

## Definisi Schema Konten untuk Sanity

### 1. Site Settings

```typescript
// schemas/siteSettings.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
 title: 'Pengaturan Situs',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Situs',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Situs',
      type: 'text',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Kata Kunci',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'alamat',
      title: 'Alamat Sekolah',
      type: 'text',
    }),
    defineField({
      name: 'telepon',
      title: 'Nomor Telepon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Sekolah',
      type: 'string',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Media Sosial',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],
})
```

### 2. Halaman (Page)

```typescript
// schemas/page.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Halaman',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Halaman',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'heroImage',
      title: 'Gambar Hero',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Konten',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
        { type: 'ctaSection' },
        { type: 'statsSection' },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
  },
})
```

### 3. Berita (Post)

```typescript
// schemas/post.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Berita',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Berita',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan',
      type: 'text',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Gambar Sampul',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'body',
      title: 'Konten Berita',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
        { type: 'embed' },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
    },
    prepare(selection) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `oleh ${author}`,
      })
    },
  },
})
```

### 4. Pengumuman (Announcement)

```typescript
// schemas/announcement.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Pengumuman',
  type: 'document',
 fields: [
    defineField({
      name: 'title',
      title: 'Judul Pengumuman',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan',
      type: 'text',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'date',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'important',
      title: 'Pengumuman Penting',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Isi Pengumuman',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
        { type: 'file' },
      ],
    }),
    defineField({
      name: 'attachment',
      title: 'Lampiran',
      type: 'file',
      description: 'File PDF atau dokumen terkait pengumuman',
    }),
  ],
 preview: {
    select: {
      title: 'title',
      date: 'date',
      important: 'important',
    },
    prepare(selection) {
      const { date, important } = selection
      const formattedDate = new Date(date).toLocaleDateString('id-ID')
      const subtitle = `${formattedDate}${important ? ' • PENTING' : ''}`
      return Object.assign({}, selection, {
        subtitle,
      })
    },
 },
})
```

### 5. Guru (Teacher)

```typescript
// schemas/teacher.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teacher',
  title: 'Guru',
  type: 'document',
 fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'position',
      title: 'Jabatan',
      type: 'string',
    }),
    defineField({
      name: 'subject',
      title: 'Mata Pelajaran',
      type: 'string',
    }),
    defineField({
      name: 'education',
      title: 'Pendidikan',
      type: 'string',
    }),
    defineField({
      name: 'experience',
      title: 'Pengalaman Mengajar',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biografi',
      type: 'text',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Nomor Telepon',
      type: 'string',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Media Sosial',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject',
      media: 'photo',
    },
  },
})
```

### 6. Galeri (Gallery)

```typescript
// schemas/gallery.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galeri',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Album',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Album',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Gambar Sampul',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      title: 'Tanggal Kegiatan',
      type: 'datetime',
    }),
    defineField({
      name: 'images',
      title: 'Gambar-gambar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Gambar',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'caption',
              title: 'Keterangan',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
})
```

### 7. Prestasi (Achievement)

```typescript
// schemas/achievement.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'achievement',
  title: 'Prestasi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Prestasi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan Prestasi',
      type: 'text',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'date',
      title: 'Tanggal Peraihan',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Jenis Prestasi',
      type: 'string',
      options: {
        list: [
          { title: 'Akademik', value: 'academic' },
          { title: 'Non-Akademik', value: 'non-academic' },
          { title: 'Olahraga', value: 'sports' },
          { title: 'Seni & Budaya', value: 'arts' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Tingkat Prestasi',
      type: 'string',
      options: {
        list: [
          { title: 'Sekolah', value: 'school' },
          { title: 'Kabupaten/Kota', value: 'regional' },
          { title: 'Provinsi', value: 'provincial' },
          { title: 'Nasional', value: 'national' },
          { title: 'Internasional', value: 'international' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'participants',
      title: 'Peserta/Pemenang',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nama',
              type: 'string',
            },
            {
              name: 'class',
              title: 'Kelas',
              type: 'string',
            },
            {
              name: 'position',
              title: 'Posisi/Juara',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Prestasi',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Dokumentasi',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'document',
      title: 'Dokumen Pendukung',
      type: 'file',
      description: 'Sertifikat, piagam, atau dokumen terkait prestasi',
    }),
  ],
 preview: {
    select: {
      title: 'title',
      type: 'type',
      level: 'level',
    },
    prepare(selection) {
      const { type, level } = selection
      const typeLabels = {
        academic: 'Akademik',
        'non-academic': 'Non-Akademik',
        sports: 'Olahraga',
        arts: 'Seni & Budaya',
      }
      
      const levelLabels = {
        school: 'Sekolah',
        regional: 'Kab/Kota',
        provincial: 'Provinsi',
        national: 'Nasional',
        international: 'Internasional',
      }
      
      return Object.assign({}, selection, {
        subtitle: `${typeLabels[type] || type} • ${levelLabels[level] || level}`,
      })
    },
  },
})
```

### 8. FAQ

```typescript
// schemas/faq.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'Pertanyaan Umum',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Pertanyaan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Jawaban',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'PPDB', value: 'ppdb' },
          { title: 'Akademik', value: 'academic' },
          { title: 'Fasilitas', value: 'facility' },
          { title: 'Administrasi', value: 'administration' },
          { title: 'Lainnya', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Urutan',
      type: 'number',
      description: 'Angka yang menentukan urutan tampilan FAQ',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
    },
    prepare(selection) {
      const { category } = selection
      const categoryLabels = {
        ppdb: 'PPDB',
        academic: 'Akademik',
        facility: 'Fasilitas',
        administration: 'Administrasi',
        other: 'Lainnya',
      }
      
      return Object.assign({}, selection, {
        subtitle: categoryLabels[category] || category,
      })
    },
  },
})
```

### 9. PPDB Settings

```typescript
// schemas/ppdbSettings.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ppdbSettings',
  title: 'Pengaturan PPDB',
  type: 'document',
  fields: [
    defineField({
      name: 'academicYear',
      title: 'Tahun Ajaran',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'registrationPeriod',
      title: 'Periode Pendaftaran',
      type: 'object',
      fields: [
        {
          name: 'start',
          title: 'Tanggal Mulai',
          type: 'datetime',
        },
        {
          name: 'end',
          title: 'Tanggal Selesai',
          type: 'datetime',
        },
      ],
    }),
    defineField({
      name: 'quota',
      title: 'Kuota Pendaftaran',
      type: 'object',
      fields: [
        {
          name: 'ipa',
          title: 'IPA',
          type: 'number',
        },
        {
          name: 'ips',
          title: 'IPS',
          type: 'number',
        },
        {
          name: 'total',
          title: 'Total',
          type: 'number',
          readOnly: true,
        },
      ],
    }),
    defineField({
      name: 'requirements',
      title: 'Persyaratan Pendaftaran',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Judul Persyaratan',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Deskripsi',
              type: 'text',
            },
            {
              name: 'required',
              title: 'Wajib',
              type: 'boolean',
              initialValue: true,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'fees',
      title: 'Biaya Pendidikan',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Item Biaya',
              type: 'string',
            },
            {
              name: 'amount',
              title: 'Jumlah (Rp)',
              type: 'number',
            },
            {
              name: 'type',
              title: 'Jenis',
              type: 'string',
              options: {
                list: [
                  { title: 'Sekali Bayar', value: 'one-time' },
                  { title: 'Per Semester', value: 'per-semester' },
                  { title: 'Per Tahun', value: 'per-year' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'schedule',
      title: 'Jadwal PPDB',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'activity',
              title: 'Kegiatan',
              type: 'string',
            },
            {
              name: 'date',
              title: 'Tanggal',
              type: 'datetime',
            },
            {
              name: 'description',
              title: 'Deskripsi',
              type: 'text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Kontak PPDB',
      type: 'object',
      fields: [
        {
          name: 'person',
          title: 'Nama Kontak',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Nomor Telepon',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'whatsapp',
          title: 'Nomor WhatsApp',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'PPDB Aktif',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
```

### 10. Kategori (Category)

```typescript
// schemas/category.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Kategori',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Kategori',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Warna Kategori',
      type: 'string',
      description: 'Warna dalam format hex (contoh: #0A704D)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
```

### 11. Penulis (Author)

```typescript
// schemas/author.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Penulis',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biografi',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
```

## Validasi dan Preview

### Validasi Umum
1. **Required Fields**: Semua field yang wajib diisi memiliki validasi `Rule.required()`
2. **Max Length**: Field teks memiliki batas karakter maksimal untuk SEO
3. **Unique Slug**: Slug di-generate otomatis dari title dengan validasi unik
4. **Date Validation**: Field tanggal memiliki validasi untuk memastikan format yang benar

### Preview Configuration
Setiap schema memiliki konfigurasi preview yang menampilkan:
1. **Title**: Judul konten sebagai identifier utama
2. **Subtitle**: Informasi tambahan seperti penulis, kategori, atau tanggal
3. **Media**: Gambar thumbnail untuk visualisasi di dashboard CMS

## Struktur Schema di Sanity Studio

### Desk Structure
```typescript
// deskStructure.ts
import { FiHome, FiFileText, FiUsers, FiImage, FiAward, FiHelpCircle, FiSettings } from 'react-icons/fi'

export const deskStructure = (S) =>
  S.list()
    .title('Konten Website')
    .items([
      S.listItem()
        .title('Halaman')
        .icon(FiFileText)
        .child(S.documentTypeList('page').title('Halaman')),
      S.listItem()
        .title('Berita')
        .icon(FiFileText)
        .child(S.documentTypeList('post').title('Berita')),
      S.listItem()
        .title('Pengumuman')
        .icon(FiFileText)
        .child(S.documentTypeList('announcement').title('Pengumuman')),
      S.listItem()
        .title('Guru & Staf')
        .icon(FiUsers)
        .child(S.documentTypeList('teacher').title('Guru & Staf')),
      S.listItem()
        .title('Galeri')
        .icon(FiImage)
        .child(S.documentTypeList('gallery').title('Galeri')),
      S.listItem()
        .title('Prestasi')
        .icon(FiAward)
        .child(S.documentTypeList('achievement').title('Prestasi')),
      S.listItem()
        .title('FAQ')
        .icon(FiHelpCircle)
        .child(S.documentTypeList('faq').title('Pertanyaan Umum')),
      S.listItem()
        .title('Pengaturan')
        .icon(FiSettings)
        .child(
          S.list()
            .title('Pengaturan')
            .items([
              S.listItem()
                .title('Pengaturan Situs')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Pengaturan PPDB')
                .child(S.document().schemaType('ppdbSettings').documentId('ppdbSettings')),
              S.listItem()
                .title('Kategori')
                .child(S.documentTypeList('category').title('Kategori')),
              S.listItem()
                .title('Penulis')
                .child(S.documentTypeList('author').title('Penulis')),
            ])
        ),
      // Tambahkan item lain sesuai kebutuhan
    ])
```

## Hak Akses dan Peran (Roles & Permissions)

### Peran Pengguna
1. **Administrator**
   - Akses penuh ke semua dokumen dan pengaturan
   - Dapat membuat, membaca, mengupdate, dan menghapus semua konten
   - Dapat mengatur pengguna dan peran lain

2. **Editor Konten**
   - Dapat membuat, membaca, mengupdate, dan menghapus berita, pengumuman, halaman
   - Dapat mengelola galeri dan prestasi
   - Tidak dapat mengubah pengaturan situs

3. **Editor Akademik**
   - Dapat mengelola informasi guru dan staf
   - Dapat mengupdate informasi akademik seperti kurikulum dan ekstrakurikuler
   - Tidak dapat mengelola berita atau pengumuman umum

4. **Operator PPDB**
   - Dapat mengelola pengaturan PPDB
   - Dapat melihat dan mengupdate data pendaftar
   - Tidak dapat mengubah konten situs lainnya

### Konfigurasi Hak Akses
Hak akses diatur melalui Sanity Studio dengan mendefinisikan:
1. **Custom Roles**: Peran khusus dengan permission terbatas
2. **Dataset Permissions**: Kontrol akses berdasarkan dataset
3. **Field Level Permissions**: Kontrol akses pada field spesifik dalam dokumen

## Integrasi dengan Next.js

### Fetching Data
```typescript
// lib/sanity.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production',
})

// Contoh query untuk halaman beranda
export const getHomePageData = async () => {
  const query = `*[_type == "page" && slug.current == "beranda"][0]{
    title,
    body,
    heroImage
  }`
  
  return await client.fetch(query)
}

// Contoh query untuk daftar berita
export const getAllPosts = async () => {
  const query = `*[_type == "post"] | order(date desc){
    title,
    slug,
    excerpt,
    coverImage,
    date,
    author->{
      name,
      image
    },
    category->{
      title,
      color
    }
  }`
  
  return await client.fetch(query)
}
```

### Image Optimization
```typescript
// lib/image.ts
import createImageUrlBuilder from '@sanity/image-url'
import { client } from './sanity'

const imageBuilder = createImageUrlBuilder(client)

export const urlForImage = (source) => {
  return imageBuilder.image(source).auto('format').fit('max')
}
```

## Dokumentasi Schema

### Field Types yang Digunakan
1. **String**: Untuk teks pendek
2. **Text**: Untuk teks panjang
3. **Slug**: Untuk URL-friendly identifiers
4. **Image**: Untuk gambar dengan hotspot support
5. **File**: Untuk dokumen/file
6. **Datetime**: Untuk tanggal dan waktu
7. **Boolean**: Untuk nilai true/false
8. **Number**: Untuk angka
9. **Reference**: Untuk menghubungkan dokumen
10. **Array**: Untuk koleksi item
11. **Block**: Untuk rich text content
12. **Object**: Untuk struktur data kompleks

### Custom Types
1. **CTA Section**: Komponen call-to-action
2. **Stats Section**: Komponen statistik
3. **Embed**: Untuk embed media dari luar
4. **Social Media**: Untuk link media sosial

---
*Dokumen ini berisi definisi schema konten untuk Sanity CMS yang akan digunakan dalam website MA Malnu Kananga. Schema ini dirancang untuk mendukung berbagai jenis konten yang diperlukan dengan struktur yang fleksibel dan skalabel.*