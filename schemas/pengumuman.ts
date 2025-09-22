import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pengumuman',
  title: 'Pengumuman',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Pengumuman',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
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
      validation: (Rule) => Rule.required().max(300),
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
      description: 'Tandai jika pengumuman ini penting dan perlu penekanan',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attachment',
      title: 'Lampiran',
      type: 'file',
      description: 'File PDF atau dokumen terkait pengumuman',
    }),
    defineField({
      name: 'published',
      title: 'Status Publikasi',
      type: 'boolean',
      initialValue: true,
      description: 'Jika tidak dicentang, pengumuman tidak akan ditampilkan di website',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      important: 'important',
      published: 'published',
    },
    prepare(selection) {
      const { date, important, published } = selection
      const formattedDate = new Date(date).toLocaleDateString('id-ID')
      
      const badges = [
        important ? 'PENTING' : null,
        !published ? 'DRAFT' : null
      ].filter(Boolean)
      
      const subtitle = [
        formattedDate,
        badges.length > 0 ? badges.join(' • ') : null
      ].filter(Boolean).join(' • ')
      
      return {
        ...selection,
        subtitle,
      }
    },
  },
})