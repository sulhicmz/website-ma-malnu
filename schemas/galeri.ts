import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galeri',
  title: 'Galeri',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Album',
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
      name: 'description',
      title: 'Deskripsi Album',
      type: 'text',
      validation: (Rule) => Rule.max(500),
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
            defineField({
              name: 'image',
              title: 'Gambar',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Keterangan',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              media: 'image',
              title: 'caption',
            },
            prepare({ media, title }) {
              return {
                media,
                title: title || 'Gambar',
              }
            },
          },
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
    defineField({
      name: 'published',
      title: 'Status Publikasi',
      type: 'boolean',
      initialValue: true,
      description: 'Jika tidak dicentang, album tidak akan ditampilkan di website',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      date: 'date',
      published: 'published',
    },
    prepare(selection) {
      const { date, published } = selection
      const formattedDate = date ? new Date(date).toLocaleDateString('id-ID') : 'Tanggal tidak ditentukan'
      
      return {
        ...selection,
        subtitle: published ? formattedDate : `${formattedDate} (DRAFT)`,
      }
    },
  },
})