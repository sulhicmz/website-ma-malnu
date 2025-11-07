import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'berita',
  title: 'Berita',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Berita',
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
      to: [{ type: 'penulis' }],
    }, {strict: false}),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'kategori' }],
    }, {strict: false}),
    defineField({
      name: 'body',
      title: 'Konten Berita',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
        defineArrayMember({ type: 'embed' }),
      ],
      validation: (Rule) => Rule.required(),
    }, {strict: false}),
    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [defineArrayMember({ type: 'string' }),
],
      options: {
        layout: 'tags',
      },
    }, {strict: false}),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      category: 'category.title',
    },
    prepare(selection) {
      const { author, category } = selection
      const subtitle = [
        author && `oleh ${author}`,
        category && `di ${category}`
      ].filter(Boolean).join(' • ')
      
      return {
        ...selection,
        subtitle
      }
    },
  },
})