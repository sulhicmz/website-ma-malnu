import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'guru',
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
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        }),
      ],
    }, {strict: false}),
    defineField({
      name: 'isActive',
      title: 'Status Aktif',
      type: 'boolean',
      initialValue: true,
      description: 'Jika tidak dicentang, guru tidak akan ditampilkan di website',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject',
      media: 'photo',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { subtitle, isActive } = selection
      return {
        ...selection,
        subtitle: isActive ? subtitle : `${subtitle} (Nonaktif)`,
      }
    },
  },
})