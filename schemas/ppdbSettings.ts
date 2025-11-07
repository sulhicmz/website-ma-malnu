import { defineField, defineType, defineArrayMember } from 'sanity'

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
      description: 'Contoh: 2024/2025',
    }),
    defineField({
      name: 'registrationPeriod',
      title: 'Periode Pendaftaran',
      type: 'object',
      fields: [
        defineField({
          name: 'start',
          title: 'Tanggal Mulai',
          type: 'datetime',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'end',
          title: 'Tanggal Selesai',
          type: 'datetime',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }, {strict: false}),
    defineField({
      name: 'quota',
      title: 'Kuota Pendaftaran',
      type: 'object',
      fields: [
        defineField({
          name: 'ipa',
          title: 'IPA',
          type: 'number',
          validation: (Rule) => Rule.integer().min(0),
        }),
        defineField({
          name: 'ips',
          title: 'IPS',
          type: 'number',
          validation: (Rule) => Rule.integer().min(0),
        }),
        defineField({
          name: 'total',
          title: 'Total',
          type: 'number',
          readOnly: true,
          description: 'Total kuota (IPA + IPS)',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }, {strict: false}),
    defineField({
      name: 'requirements',
      title: 'Persyaratan Pendaftaran',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Judul Persyaratan',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Deskripsi',
              type: 'text',
            }),
            defineField({
              name: 'required',
              title: 'Wajib',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              required: 'required',
            },
            prepare({ title, required }) {
              return {
                title,
                subtitle: required ? 'Wajib' : 'Opsional',
              }
            },
          },
        }),
      ],
    }, {strict: false}),
    defineField({
      name: 'fees',
      title: 'Biaya Pendidikan',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'item',
              title: 'Item Biaya',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'amount',
              title: 'Jumlah (Rp)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
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
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              item: 'item',
              amount: 'amount',
              type: 'type',
            },
            prepare({ item, amount, type }) {
              const typeLabels = {
                'one-time': 'Sekali Bayar',
                'per-semester': 'Per Semester',
                'per-year': 'Per Tahun',
              }
              
              const formattedAmount = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(amount)
              
              return {
                title: item,
                subtitle: `${formattedAmount} • ${typeLabels[type] || type}`,
              }
            },
          },
        }),
      ],
    }, {strict: false}),
    defineField({
      name: 'schedule',
      title: 'Jadwal PPDB',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'activity',
              title: 'Kegiatan',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'date',
              title: 'Tanggal',
              type: 'datetime',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Deskripsi',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              activity: 'activity',
              date: 'date',
            },
            prepare({ activity, date }) {
              const formattedDate = date ? new Date(date).toLocaleDateString('id-ID') : 'Tanggal belum ditentukan'
              return {
                title: activity,
                subtitle: formattedDate,
              }
            },
          },
        }),
      ],
    }, {strict: false}),
    defineField({
      name: 'contact',
      title: 'Kontak PPDB',
      type: 'object',
      fields: [
        defineField({
          name: 'person',
          title: 'Nama Kontak',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Nomor Telepon',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
        }),
        defineField({
          name: 'whatsapp',
          title: 'Nomor WhatsApp',
          type: 'string',
        }),
      ],
    }, {strict: false}),
    defineField({
      name: 'isActive',
      title: 'PPDB Aktif',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      academicYear: 'academicYear',
      isActive: 'isActive',
    },
    prepare({ academicYear, isActive }) {
      return {
        title: `PPDB ${academicYear || 'Tahun Ajaran'}`,
        subtitle: isActive ? 'Aktif' : 'Tidak Aktif',
      }
    },
  },
})