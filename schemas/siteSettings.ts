import { defineField, defineType, defineArrayMember } from 'sanity'

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
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }, {strict: false}),
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
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialMedia',
      title: 'Media Sosial',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({ platform, url }) {
              return {
                title: platform,
                subtitle: url,
              }
            },
          },
        }),
      ],
    }, {strict: false}),
    defineField({
      name: 'workingHours',
      title: 'Jam Kerja',
      type: 'object',
      fields: [
        defineField({
          name: 'weekdays',
          title: 'Hari Kerja',
          type: 'string',
        }),
        defineField({
          name: 'hours',
          title: 'Jam Kerja',
          type: 'string',
        }),
      ],
    }, {strict: false}),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Pengaturan Situs',
        subtitle: 'Konfigurasi global untuk website',
      }
    },
  },
})