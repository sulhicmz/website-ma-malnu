import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'prestasi',
  title: 'Prestasi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Prestasi',
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
      title: 'Ringkasan Prestasi',
      type: 'text',
      validation: (Rule) => Rule.required().max(300),
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
          { title: 'Teknologi', value: 'technology' },
          { title: 'Lainnya', value: 'other' },
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
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nama',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'class',
              title: 'Kelas',
              type: 'string',
            }),
            defineField({
              name: 'position',
              title: 'Posisi/Juara',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              name: 'name',
              class: 'class',
              position: 'position',
            },
            prepare({ name, class: studentClass, position }) {
              const subtitle = [
                studentClass && `Kelas ${studentClass}`,
                position && `Juara ${position}`
              ].filter(Boolean).join(' • ')
              
              return {
                title: name,
                subtitle,
              }
            },
          },
        }),
      ],
    }, {strict: false}),
    defineField({
      name: 'description',
      title: 'Deskripsi Prestasi',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }, {strict: false}),
    defineField({
      name: 'images',
      title: 'Dokumentasi',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }, {strict: false}),
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
      date: 'date',
    },
    prepare(selection) {
      const { type, level, date } = selection
      
      const typeLabels = {
        academic: 'Akademik',
        'non-academic': 'Non-Akademik',
        sports: 'Olahraga',
        arts: 'Seni & Budaya',
        technology: 'Teknologi',
        other: 'Lainnya',
      }
      
      const levelLabels = {
        school: 'Sekolah',
        regional: 'Kab/Kota',
        provincial: 'Provinsi',
        national: 'Nasional',
        international: 'Internasional',
      }
      
      const formattedDate = date ? new Date(date).getFullYear() : 'Tanggal tidak ditentukan'
      
      return {
        ...selection,
        subtitle: `${typeLabels[type] || type} • ${levelLabels[level] || level} • ${formattedDate}`,
      }
    },
  },
})