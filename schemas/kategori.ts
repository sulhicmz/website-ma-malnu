import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kategori',
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