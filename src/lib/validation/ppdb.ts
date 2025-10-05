import { z } from 'zod'

const optionalField = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (value) => {
      if (value === null || value === undefined) {
        return undefined
      }
      if (typeof value === 'string' && value.trim() === '') {
        return undefined
      }
      return value
    },
    schema.optional(),
  )

const numberField = (min: number, max: number, fieldName: string) =>
  z.preprocess(
    (value) => {
      if (value === '' || value === null || typeof value === 'undefined') {
        return Number.NaN
      }
      if (typeof value === 'string') {
        return Number(value)
      }
      return value
    },
    z
      .number({ invalid_type_error: `${fieldName} harus berupa angka` })
      .min(min, `${fieldName} tidak valid`)
      .max(max, `${fieldName} maksimal ${max}`),
  )

const dateField = z
  .string({ required_error: 'Tanggal lahir harus diisi' })
  .min(1, 'Tanggal lahir harus diisi')
  .refine((value) => !Number.isNaN(Date.parse(value)), 'Tanggal lahir tidak valid')

export const documentTypes = [
  'foto',
  'aktaKelahiran',
  'kartuKeluarga',
  'ijazah',
  'skhun',
  'rapor',
] as const

export type DocumentType = (typeof documentTypes)[number]

export const ppdbFormBaseSchema = z.object({
  // Data Siswa
  namaLengkap: z
    .string({ required_error: 'Nama lengkap harus diisi' })
    .min(3, 'Nama lengkap minimal 3 karakter')
    .max(100, 'Nama lengkap maksimal 100 karakter'),
  jenisKelamin: z.enum(['laki-laki', 'perempuan'], {
    required_error: 'Jenis kelamin harus dipilih',
  }),
  tempatLahir: z
    .string({ required_error: 'Tempat lahir harus diisi' })
    .min(2, 'Tempat lahir minimal 2 karakter')
    .max(50, 'Tempat lahir maksimal 50 karakter'),
  tanggalLahir: dateField,
  nik: z
    .string({ required_error: 'NIK harus diisi' })
    .length(16, 'NIK harus 16 digit')
    .regex(/^[0-9]+$/, 'NIK hanya boleh berisi angka'),
  nisn: z
    .string({ required_error: 'NISN harus diisi' })
    .length(10, 'NISN harus 10 digit')
    .regex(/^[0-9]+$/, 'NISN hanya boleh berisi angka'),
  alamat: z
    .string({ required_error: 'Alamat harus diisi' })
    .min(10, 'Alamat minimal 10 karakter')
    .max(200, 'Alamat maksimal 200 karakter'),
  kecamatan: z
    .string({ required_error: 'Kecamatan harus diisi' })
    .min(2, 'Kecamatan minimal 2 karakter')
    .max(50, 'Kecamatan maksimal 50 karakter'),
  kabupaten: z
    .string({ required_error: 'Kabupaten harus diisi' })
    .min(2, 'Kabupaten minimal 2 karakter')
    .max(50, 'Kabupaten maksimal 50 karakter'),
  provinsi: z
    .string({ required_error: 'Provinsi harus diisi' })
    .min(2, 'Provinsi minimal 2 karakter')
    .max(50, 'Provinsi maksimal 50 karakter'),
  kodePos: z
    .string({ required_error: 'Kode pos harus diisi' })
    .length(5, 'Kode pos harus 5 digit')
    .regex(/^[0-9]+$/, 'Kode pos hanya boleh berisi angka'),
  noTelepon: z
    .string({ required_error: 'Nomor telepon harus diisi' })
    .min(10, 'Nomor telepon minimal 10 digit')
    .max(15, 'Nomor telepon maksimal 15 digit')
    .regex(/^[0-9\-\+\(\)\s]+$/, 'Nomor telepon tidak valid'),
  email: z.string({ required_error: 'Email harus diisi' }).email('Email tidak valid'),
  asalSekolah: z
    .string({ required_error: 'Asal sekolah harus diisi' })
    .min(3, 'Asal sekolah minimal 3 karakter')
    .max(100, 'Asal sekolah maksimal 100 karakter'),
  alamatSekolah: z
    .string({ required_error: 'Alamat sekolah harus diisi' })
    .min(10, 'Alamat sekolah minimal 10 karakter')
    .max(200, 'Alamat sekolah maksimal 200 karakter'),
  npsnSekolah: z
    .string({ required_error: 'NPSN harus diisi' })
    .length(8, 'NPSN harus 8 digit')
    .regex(/^[0-9]+$/, 'NPSN hanya boleh berisi angka'),
  tahunLulus: z
    .string({ required_error: 'Tahun lulus harus diisi' })
    .length(4, 'Tahun lulus harus 4 digit')
    .regex(/^[0-9]+$/, 'Tahun lulus hanya boleh berisi angka'),
  nilaiUN: z.object({
    indonesia: numberField(0, 100, 'Nilai Bahasa Indonesia'),
    inggris: numberField(0, 100, 'Nilai Bahasa Inggris'),
    matematika: numberField(0, 100, 'Nilai Matematika'),
    ipa: numberField(0, 100, 'Nilai IPA'),
  }),

  // Data Orang Tua/Wali
  namaAyah: z
    .string({ required_error: 'Nama ayah harus diisi' })
    .min(3, 'Nama ayah minimal 3 karakter')
    .max(100, 'Nama ayah maksimal 100 karakter'),
  nikAyah: z
    .string({ required_error: 'NIK ayah harus diisi' })
    .length(16, 'NIK ayah harus 16 digit')
    .regex(/^[0-9]+$/, 'NIK ayah hanya boleh berisi angka'),
  pendidikanAyah: z
    .string({ required_error: 'Pendidikan ayah harus dipilih' })
    .min(2, 'Pendidikan ayah harus dipilih'),
  pekerjaanAyah: z
    .string({ required_error: 'Pekerjaan ayah harus dipilih' })
    .min(2, 'Pekerjaan ayah harus dipilih'),
  penghasilanAyah: z
    .string({ required_error: 'Penghasilan ayah harus dipilih' })
    .min(2, 'Penghasilan ayah harus dipilih'),
  noTeleponAyah: z
    .string({ required_error: 'Nomor telepon ayah harus diisi' })
    .min(10, 'Nomor telepon ayah minimal 10 digit')
    .max(15, 'Nomor telepon ayah maksimal 15 digit')
    .regex(/^[0-9\-\+\(\)\s]+$/, 'Nomor telepon ayah tidak valid'),

  namaIbu: z
    .string({ required_error: 'Nama ibu harus diisi' })
    .min(3, 'Nama ibu minimal 3 karakter')
    .max(100, 'Nama ibu maksimal 100 karakter'),
  nikIbu: z
    .string({ required_error: 'NIK ibu harus diisi' })
    .length(16, 'NIK ibu harus 16 digit')
    .regex(/^[0-9]+$/, 'NIK ibu hanya boleh berisi angka'),
  pendidikanIbu: z
    .string({ required_error: 'Pendidikan ibu harus dipilih' })
    .min(2, 'Pendidikan ibu harus dipilih'),
  pekerjaanIbu: z
    .string({ required_error: 'Pekerjaan ibu harus dipilih' })
    .min(2, 'Pekerjaan ibu harus dipilih'),
  penghasilanIbu: z
    .string({ required_error: 'Penghasilan ibu harus dipilih' })
    .min(2, 'Penghasilan ibu harus dipilih'),
  noTeleponIbu: z
    .string({ required_error: 'Nomor telepon ibu harus diisi' })
    .min(10, 'Nomor telepon ibu minimal 10 digit')
    .max(15, 'Nomor telepon ibu maksimal 15 digit')
    .regex(/^[0-9\-\+\(\)\s]+$/, 'Nomor telepon ibu tidak valid'),

  namaWali: optionalField(
    z.string().max(100, 'Nama wali maksimal 100 karakter'),
  ),
  hubunganWali: optionalField(
    z.string().max(50, 'Hubungan wali maksimal 50 karakter'),
  ),
  nikWali: optionalField(
    z
      .string()
      .length(16, 'NIK wali harus 16 digit')
      .regex(/^[0-9]+$/, 'NIK wali hanya boleh berisi angka'),
  ),
  pendidikanWali: optionalField(z.string()),
  pekerjaanWali: optionalField(z.string()),
  penghasilanWali: optionalField(z.string()),
  noTeleponWali: optionalField(
    z
      .string()
      .max(15, 'Nomor telepon wali maksimal 15 digit')
      .regex(/^[0-9\-\+\(\)\s]+$/, 'Nomor telepon wali tidak valid'),
  ),

  // Pilihan Jurusan
  jurusanPilihan: z.enum(['ipa', 'ips'], {
    required_error: 'Jurusan pilihan harus dipilih',
  }),
  alasanPilihan: z
    .string({ required_error: 'Alasan pilihan harus diisi' })
    .min(10, 'Alasan pilihan minimal 10 karakter')
    .max(500, 'Alasan pilihan maksimal 500 karakter'),

  // Persetujuan
  persetujuan: z
    .boolean({ required_error: 'Persetujuan harus dicentang' })
    .refine((value) => value === true, {
      message: 'Anda harus menyetujui syarat dan ketentuan',
    }),
})

const dokumenBaseSchema = z.object({
  jenis: z.enum(documentTypes),
  fileName: z
    .string({ required_error: 'Nama file harus tersedia' })
    .min(1, 'Nama file harus tersedia'),
  size: z.number({ required_error: 'Ukuran file harus tersedia' }).positive(),
  type: z
    .string({ required_error: 'Tipe file harus tersedia' })
    .min(1, 'Tipe file harus tersedia'),
})

export const ppdbFormClientSchema = ppdbFormBaseSchema.extend({
  dokumen: z
    .object(
      Object.fromEntries(
        documentTypes.map((doc) => [
          doc,
          optionalField(
            z
              .custom<File>((value) => value instanceof File, {
                message: 'File tidak valid',
              })
              .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
                message: 'Ukuran file maksimal 5MB',
              }),
          ),
        ]),
      ) as Record<DocumentType, z.ZodType<File | undefined, any, File | undefined>>,
    )
    .superRefine((value, ctx) => {
      const hasFile = documentTypes.some((key) => Boolean(value[key]))
      if (!hasFile) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Minimal satu dokumen harus diunggah',
          path: ['dokumen'],
        })
      }
    }),
})

export const ppdbSubmissionPayloadSchema = ppdbFormBaseSchema.extend({
  dokumen: z
    .array(
      dokumenBaseSchema.extend({
        base64: z
          .string({ required_error: 'Konten file harus tersedia' })
          .min(1, 'Konten file harus tersedia'),
      }),
    )
    .min(1, 'Minimal satu dokumen harus diunggah'),
})

export type PpdbFormValues = z.infer<typeof ppdbFormClientSchema>
export type PpdbSubmissionPayload = z.infer<typeof ppdbSubmissionPayloadSchema>
export type PpdbSubmissionDocument = z.infer<typeof dokumenBaseSchema>
