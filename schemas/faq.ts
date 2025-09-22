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
      validation: (Rule) => Rule.required().max(200),
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
          { title: 'Kurikulum', value: 'curriculum' },
          { title: 'Ekstrakurikuler', value: 'extracurricular' },
          { title: 'Lainnya', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Urutan',
      type: 'number',
      description: 'Angka yang menentukan urutan tampilan FAQ (lebih kecil berarti lebih awal)',
    }),
    defineField({
      name: 'published',
      title: 'Status Publikasi',
      type: 'boolean',
      initialValue: true,
      description: 'Jika tidak dicentang, FAQ tidak akan ditampilkan di website',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
      published: 'published',
    },
    prepare(selection) {
      const { category, published } = selection
      
      const categoryLabels = {
        ppdb: 'PPDB',
        academic: 'Akademik',
        facility: 'Fasilitas',
        administration: 'Administrasi',
        curriculum: 'Kurikulum',
        extracurricular: 'Ekstrakurikuler',
        other: 'Lainnya',
      }
      
      const subtitle = [
        categoryLabels[category] || category,
        !published ? 'DRAFT' : null
      ].filter(Boolean).join(' • ')
      
      return {
        ...selection,
        subtitle,
      }
    },
  },
})