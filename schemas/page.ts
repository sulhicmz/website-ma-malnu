import { defineField, defineType, defineArrayMember } from 'sanity'

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
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
        defineArrayMember({ type: 'ctaSection' }),
        defineArrayMember({ type: 'statsSection' }),
      ],
    }, {strict: false}),
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