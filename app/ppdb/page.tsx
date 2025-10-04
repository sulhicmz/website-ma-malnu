'use client'

import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  documentTypes,
  ppdbFormClientSchema,
  type DocumentType,
  type PpdbFormValues,
} from '@/lib/validation/ppdb'

const pendidikanOptions = [
  'SD/Sederajat',
  'SMP/Sederajat',
  'SMA/SMK/Sederajat',
  'Diploma',
  'Sarjana',
  'Pasca Sarjana',
]

const pekerjaanOptions = [
  'PNS/TNI/Polri',
  'Pegawai Swasta',
  'Wiraswasta',
  'Petani/Peternak',
  'Nelayan',
  'Buruh',
  'Tidak Bekerja',
  'Lainnya',
]

const penghasilanOptions = [
  '< Rp1.000.000',
  'Rp1.000.000 - Rp3.000.000',
  'Rp3.000.000 - Rp5.000.000',
  'Rp5.000.000 - Rp10.000.000',
  '> Rp10.000.000',
]

const jurusanOptions = [
  { value: 'ipa', label: 'Ilmu Pengetahuan Alam (IPA)' },
  { value: 'ips', label: 'Ilmu Pengetahuan Sosial (IPS)' },
] as const

const documentLabels: Record<DocumentType, string> = {
  foto: 'Pas Foto Terbaru',
  aktaKelahiran: 'Akta Kelahiran',
  kartuKeluarga: 'Kartu Keluarga',
  ijazah: 'Ijazah / Surat Lulus',
  skhun: 'SKHUN / Surat Keterangan Nilai',
  rapor: 'Scan Rapor Terakhir',
}

const documentDescriptions: Record<DocumentType, string> = {
  foto: 'Format JPG/PNG, latar merah/biru, ukuran maksimal 2MB.',
  aktaKelahiran: 'Format PDF/JPG, pastikan teks terbaca jelas.',
  kartuKeluarga: 'Format PDF/JPG, halaman yang memuat data siswa.',
  ijazah: 'Format PDF/JPG, dapat diganti surat lulus bila ijazah belum terbit.',
  skhun: 'Format PDF/JPG, apabila belum tersedia gunakan SKL sementara.',
  rapor: 'Format PDF/JPG, halaman nilai semester terakhir.',
}

type SubmissionStatus = { type: 'success' | 'error'; message: string }

async function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        const [, base64] = result.split(',')
        resolve(base64 ?? '')
      } else {
        reject(new Error('Gagal membaca file'))
      }
    }
    reader.onerror = () => {
      reject(reader.error ?? new Error('Gagal membaca file'))
    }
    reader.readAsDataURL(file)
  })
}

export default function PpdbPage() {
  const [status, setStatus] = useState<SubmissionStatus | null>(null)

  const defaultValues = useMemo(() => ({
    namaLengkap: '',
    jenisKelamin: undefined,
    tempatLahir: '',
    tanggalLahir: '',
    nik: '',
    nisn: '',
    alamat: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    kodePos: '',
    noTelepon: '',
    email: '',
    asalSekolah: '',
    alamatSekolah: '',
    npsnSekolah: '',
    tahunLulus: '',
    nilaiUN: {
      indonesia: undefined,
      inggris: undefined,
      matematika: undefined,
      ipa: undefined,
    },
    namaAyah: '',
    nikAyah: '',
    pendidikanAyah: '',
    pekerjaanAyah: '',
    penghasilanAyah: '',
    noTeleponAyah: '',
    namaIbu: '',
    nikIbu: '',
    pendidikanIbu: '',
    pekerjaanIbu: '',
    penghasilanIbu: '',
    noTeleponIbu: '',
    namaWali: '',
    hubunganWali: '',
    nikWali: '',
    pendidikanWali: '',
    pekerjaanWali: '',
    penghasilanWali: '',
    noTeleponWali: '',
    jurusanPilihan: undefined,
    alasanPilihan: '',
    persetujuan: false,
    dokumen: Object.fromEntries(documentTypes.map((key) => [key, undefined])) as Record<DocumentType, File | undefined>,
  }), [])

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PpdbFormValues>({
    resolver: zodResolver(ppdbFormClientSchema),
    defaultValues: defaultValues as PpdbFormValues,
  })

  const watchNamaLengkap = watch('namaLengkap')
  const watchAsalSekolah = watch('asalSekolah')
  const watchJurusan = watch('jurusanPilihan')

  const onSubmit = handleSubmit(async (values) => {
    setStatus(null)

    const dokumenPayload = (
      await Promise.all(
        documentTypes.map(async (key) => {
          const file = values.dokumen[key]
          if (!file) return null

          const base64 = await fileToBase64(file)
          return {
            jenis: key,
            fileName: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream',
            base64,
          }
        }),
      )
    ).filter(Boolean)

    const payload = {
      ...values,
      dokumen: dokumenPayload,
    }

    try {
      const response = await fetch('/api/ppdb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        const message = Array.isArray(result.errors)
          ? result.errors.join(', ')
          : result.message || 'Pengiriman gagal'
        setStatus({ type: 'error', message })
        return
      }

      setStatus({
        type: 'success',
        message: result.message ?? 'Formulir berhasil dikirim.',
      })
      reset(defaultValues as PpdbFormValues)
    } catch (error) {
      console.error(error)
      setStatus({
        type: 'error',
        message: 'Terjadi kesalahan jaringan. Silakan coba kembali.',
      })
    }
  })

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 lg:flex-row">
        <div className="w-full rounded-2xl bg-white p-6 shadow-lg lg:w-2/3">
          <header className="mb-8 border-b border-gray-200 pb-6">
            <p className="text-sm font-semibold uppercase text-blue-600">Penerimaan Peserta Didik Baru</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Formulir PPDB Online</h1>
            <p className="mt-3 text-gray-600">
              Silakan lengkapi seluruh data berikut sesuai dokumen resmi. Tanda (*) menandakan field wajib diisi.
            </p>
          </header>

          <form onSubmit={onSubmit} className="space-y-8">
            <section aria-labelledby="section-data-siswa">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">1</div>
                <div>
                  <h2 id="section-data-siswa" className="text-xl font-semibold text-gray-900">
                    Data Siswa
                  </h2>
                  <p className="text-sm text-gray-600">Identitas lengkap calon peserta didik.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="namaLengkap" className="mb-2 block text-sm font-medium text-gray-700">
                    Nama Lengkap*
                  </label>
                  <input
                    id="namaLengkap"
                    type="text"
                    {...register('namaLengkap')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Nama lengkap sesuai dokumen"
                  />
                  {errors.namaLengkap && (
                    <p className="mt-2 text-sm text-red-600">{errors.namaLengkap.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="jenisKelamin" className="mb-2 block text-sm font-medium text-gray-700">
                    Jenis Kelamin*
                  </label>
                  <select
                    id="jenisKelamin"
                    {...register('jenisKelamin')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih jenis kelamin
                    </option>
                    <option value="laki-laki">Laki-laki</option>
                    <option value="perempuan">Perempuan</option>
                  </select>
                  {errors.jenisKelamin && (
                    <p className="mt-2 text-sm text-red-600">{errors.jenisKelamin.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tempatLahir" className="mb-2 block text-sm font-medium text-gray-700">
                    Tempat Lahir*
                  </label>
                  <input
                    id="tempatLahir"
                    type="text"
                    {...register('tempatLahir')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.tempatLahir && (
                    <p className="mt-2 text-sm text-red-600">{errors.tempatLahir.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tanggalLahir" className="mb-2 block text-sm font-medium text-gray-700">
                    Tanggal Lahir*
                  </label>
                  <input
                    id="tanggalLahir"
                    type="date"
                    {...register('tanggalLahir')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.tanggalLahir && (
                    <p className="mt-2 text-sm text-red-600">{errors.tanggalLahir.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="nik" className="mb-2 block text-sm font-medium text-gray-700">
                    NIK*
                  </label>
                  <input
                    id="nik"
                    type="text"
                    inputMode="numeric"
                    {...register('nik')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.nik && <p className="mt-2 text-sm text-red-600">{errors.nik.message}</p>}
                </div>

                <div>
                  <label htmlFor="nisn" className="mb-2 block text-sm font-medium text-gray-700">
                    NISN*
                  </label>
                  <input
                    id="nisn"
                    type="text"
                    inputMode="numeric"
                    {...register('nisn')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.nisn && <p className="mt-2 text-sm text-red-600">{errors.nisn.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="alamat" className="mb-2 block text-sm font-medium text-gray-700">
                    Alamat Lengkap*
                  </label>
                  <textarea
                    id="alamat"
                    rows={3}
                    {...register('alamat')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Nama jalan, nomor rumah, RT/RW"
                  />
                  {errors.alamat && <p className="mt-2 text-sm text-red-600">{errors.alamat.message}</p>}
                </div>

                <div>
                  <label htmlFor="kecamatan" className="mb-2 block text-sm font-medium text-gray-700">
                    Kecamatan*
                  </label>
                  <input
                    id="kecamatan"
                    type="text"
                    {...register('kecamatan')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.kecamatan && <p className="mt-2 text-sm text-red-600">{errors.kecamatan.message}</p>}
                </div>

                <div>
                  <label htmlFor="kabupaten" className="mb-2 block text-sm font-medium text-gray-700">
                    Kabupaten/Kota*
                  </label>
                  <input
                    id="kabupaten"
                    type="text"
                    {...register('kabupaten')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.kabupaten && <p className="mt-2 text-sm text-red-600">{errors.kabupaten.message}</p>}
                </div>

                <div>
                  <label htmlFor="provinsi" className="mb-2 block text-sm font-medium text-gray-700">
                    Provinsi*
                  </label>
                  <input
                    id="provinsi"
                    type="text"
                    {...register('provinsi')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.provinsi && <p className="mt-2 text-sm text-red-600">{errors.provinsi.message}</p>}
                </div>

                <div>
                  <label htmlFor="kodePos" className="mb-2 block text-sm font-medium text-gray-700">
                    Kode Pos*
                  </label>
                  <input
                    id="kodePos"
                    type="text"
                    inputMode="numeric"
                    {...register('kodePos')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.kodePos && <p className="mt-2 text-sm text-red-600">{errors.kodePos.message}</p>}
                </div>

                <div>
                  <label htmlFor="noTelepon" className="mb-2 block text-sm font-medium text-gray-700">
                    Nomor Telepon*
                  </label>
                  <input
                    id="noTelepon"
                    type="tel"
                    {...register('noTelepon')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Contoh: 081234567890"
                  />
                  {errors.noTelepon && <p className="mt-2 text-sm text-red-600">{errors.noTelepon.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email Aktif*
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="contoh@email.com"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                </div>
              </div>
            </section>

            <section aria-labelledby="section-data-pendidikan" className="pt-4">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">2</div>
                <div>
                  <h2 id="section-data-pendidikan" className="text-xl font-semibold text-gray-900">
                    Riwayat Pendidikan
                  </h2>
                  <p className="text-sm text-gray-600">Informasi sekolah asal dan nilai ujian nasional.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="asalSekolah" className="mb-2 block text-sm font-medium text-gray-700">
                    Asal Sekolah*
                  </label>
                  <input
                    id="asalSekolah"
                    type="text"
                    {...register('asalSekolah')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.asalSekolah && <p className="mt-2 text-sm text-red-600">{errors.asalSekolah.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="alamatSekolah" className="mb-2 block text-sm font-medium text-gray-700">
                    Alamat Sekolah*
                  </label>
                  <textarea
                    id="alamatSekolah"
                    rows={3}
                    {...register('alamatSekolah')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.alamatSekolah && (
                    <p className="mt-2 text-sm text-red-600">{errors.alamatSekolah.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="npsnSekolah" className="mb-2 block text-sm font-medium text-gray-700">
                    NPSN Sekolah*
                  </label>
                  <input
                    id="npsnSekolah"
                    type="text"
                    inputMode="numeric"
                    {...register('npsnSekolah')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.npsnSekolah && <p className="mt-2 text-sm text-red-600">{errors.npsnSekolah.message}</p>}
                </div>

                <div>
                  <label htmlFor="tahunLulus" className="mb-2 block text-sm font-medium text-gray-700">
                    Tahun Lulus*
                  </label>
                  <input
                    id="tahunLulus"
                    type="text"
                    inputMode="numeric"
                    {...register('tahunLulus')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Contoh: 2024"
                  />
                  {errors.tahunLulus && <p className="mt-2 text-sm text-red-600">{errors.tahunLulus.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nilai UN Bahasa Indonesia*
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('nilaiUN.indonesia')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="0 - 100"
                  />
                  {errors.nilaiUN?.indonesia && (
                    <p className="mt-2 text-sm text-red-600">{errors.nilaiUN.indonesia.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nilai UN Bahasa Inggris*
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('nilaiUN.inggris')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="0 - 100"
                  />
                  {errors.nilaiUN?.inggris && (
                    <p className="mt-2 text-sm text-red-600">{errors.nilaiUN.inggris.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nilai UN Matematika*
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('nilaiUN.matematika')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="0 - 100"
                  />
                  {errors.nilaiUN?.matematika && (
                    <p className="mt-2 text-sm text-red-600">{errors.nilaiUN.matematika.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nilai UN IPA*
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('nilaiUN.ipa')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="0 - 100"
                  />
                  {errors.nilaiUN?.ipa && (
                    <p className="mt-2 text-sm text-red-600">{errors.nilaiUN.ipa.message}</p>
                  )}
                </div>
              </div>
            </section>

            <section aria-labelledby="section-data-orangtua" className="pt-4">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">3</div>
                <div>
                  <h2 id="section-data-orangtua" className="text-xl font-semibold text-gray-900">
                    Data Orang Tua & Wali
                  </h2>
                  <p className="text-sm text-gray-600">Pastikan nomor telepon aktif untuk keperluan verifikasi.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="namaAyah" className="mb-2 block text-sm font-medium text-gray-700">
                    Nama Ayah*
                  </label>
                  <input
                    id="namaAyah"
                    type="text"
                    {...register('namaAyah')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.namaAyah && <p className="mt-2 text-sm text-red-600">{errors.namaAyah.message}</p>}
                </div>

                <div>
                  <label htmlFor="nikAyah" className="mb-2 block text-sm font-medium text-gray-700">
                    NIK Ayah*
                  </label>
                  <input
                    id="nikAyah"
                    type="text"
                    inputMode="numeric"
                    {...register('nikAyah')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.nikAyah && <p className="mt-2 text-sm text-red-600">{errors.nikAyah.message}</p>}
                </div>

                <div>
                  <label htmlFor="pendidikanAyah" className="mb-2 block text-sm font-medium text-gray-700">
                    Pendidikan Terakhir Ayah*
                  </label>
                  <select
                    id="pendidikanAyah"
                    {...register('pendidikanAyah')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih pendidikan terakhir
                    </option>
                    {pendidikanOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.pendidikanAyah && (
                    <p className="mt-2 text-sm text-red-600">{errors.pendidikanAyah.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pekerjaanAyah" className="mb-2 block text-sm font-medium text-gray-700">
                    Pekerjaan Ayah*
                  </label>
                  <select
                    id="pekerjaanAyah"
                    {...register('pekerjaanAyah')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih pekerjaan utama
                    </option>
                    {pekerjaanOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.pekerjaanAyah && (
                    <p className="mt-2 text-sm text-red-600">{errors.pekerjaanAyah.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="penghasilanAyah" className="mb-2 block text-sm font-medium text-gray-700">
                    Penghasilan Ayah per Bulan*
                  </label>
                  <select
                    id="penghasilanAyah"
                    {...register('penghasilanAyah')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih rentang penghasilan
                    </option>
                    {penghasilanOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.penghasilanAyah && (
                    <p className="mt-2 text-sm text-red-600">{errors.penghasilanAyah.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="noTeleponAyah" className="mb-2 block text-sm font-medium text-gray-700">
                    Nomor Telepon Ayah*
                  </label>
                  <input
                    id="noTeleponAyah"
                    type="tel"
                    {...register('noTeleponAyah')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.noTeleponAyah && (
                    <p className="mt-2 text-sm text-red-600">{errors.noTeleponAyah.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="namaIbu" className="mb-2 block text-sm font-medium text-gray-700">
                    Nama Ibu*
                  </label>
                  <input
                    id="namaIbu"
                    type="text"
                    {...register('namaIbu')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.namaIbu && <p className="mt-2 text-sm text-red-600">{errors.namaIbu.message}</p>}
                </div>

                <div>
                  <label htmlFor="nikIbu" className="mb-2 block text-sm font-medium text-gray-700">
                    NIK Ibu*
                  </label>
                  <input
                    id="nikIbu"
                    type="text"
                    inputMode="numeric"
                    {...register('nikIbu')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.nikIbu && <p className="mt-2 text-sm text-red-600">{errors.nikIbu.message}</p>}
                </div>

                <div>
                  <label htmlFor="pendidikanIbu" className="mb-2 block text-sm font-medium text-gray-700">
                    Pendidikan Terakhir Ibu*
                  </label>
                  <select
                    id="pendidikanIbu"
                    {...register('pendidikanIbu')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih pendidikan terakhir
                    </option>
                    {pendidikanOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.pendidikanIbu && (
                    <p className="mt-2 text-sm text-red-600">{errors.pendidikanIbu.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pekerjaanIbu" className="mb-2 block text-sm font-medium text-gray-700">
                    Pekerjaan Ibu*
                  </label>
                  <select
                    id="pekerjaanIbu"
                    {...register('pekerjaanIbu')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih pekerjaan utama
                    </option>
                    {pekerjaanOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.pekerjaanIbu && (
                    <p className="mt-2 text-sm text-red-600">{errors.pekerjaanIbu.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="penghasilanIbu" className="mb-2 block text-sm font-medium text-gray-700">
                    Penghasilan Ibu per Bulan*
                  </label>
                  <select
                    id="penghasilanIbu"
                    {...register('penghasilanIbu')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih rentang penghasilan
                    </option>
                    {penghasilanOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.penghasilanIbu && (
                    <p className="mt-2 text-sm text-red-600">{errors.penghasilanIbu.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="noTeleponIbu" className="mb-2 block text-sm font-medium text-gray-700">
                    Nomor Telepon Ibu*
                  </label>
                  <input
                    id="noTeleponIbu"
                    type="tel"
                    {...register('noTeleponIbu')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.noTeleponIbu && (
                    <p className="mt-2 text-sm text-red-600">{errors.noTeleponIbu.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm font-semibold text-gray-700">Data Wali (opsional)</p>
                </div>

                <div>
                  <label htmlFor="namaWali" className="mb-2 block text-sm font-medium text-gray-700">
                    Nama Wali
                  </label>
                  <input
                    id="namaWali"
                    type="text"
                    {...register('namaWali')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.namaWali && <p className="mt-2 text-sm text-red-600">{errors.namaWali.message}</p>}
                </div>

                <div>
                  <label htmlFor="hubunganWali" className="mb-2 block text-sm font-medium text-gray-700">
                    Hubungan Wali
                  </label>
                  <input
                    id="hubunganWali"
                    type="text"
                    {...register('hubunganWali')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.hubunganWali && (
                    <p className="mt-2 text-sm text-red-600">{errors.hubunganWali.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="nikWali" className="mb-2 block text-sm font-medium text-gray-700">
                    NIK Wali
                  </label>
                  <input
                    id="nikWali"
                    type="text"
                    inputMode="numeric"
                    {...register('nikWali')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.nikWali && <p className="mt-2 text-sm text-red-600">{errors.nikWali.message}</p>}
                </div>

                <div>
                  <label htmlFor="pendidikanWali" className="mb-2 block text-sm font-medium text-gray-700">
                    Pendidikan Wali
                  </label>
                  <input
                    id="pendidikanWali"
                    type="text"
                    {...register('pendidikanWali')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.pendidikanWali && (
                    <p className="mt-2 text-sm text-red-600">{errors.pendidikanWali.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pekerjaanWali" className="mb-2 block text-sm font-medium text-gray-700">
                    Pekerjaan Wali
                  </label>
                  <input
                    id="pekerjaanWali"
                    type="text"
                    {...register('pekerjaanWali')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.pekerjaanWali && (
                    <p className="mt-2 text-sm text-red-600">{errors.pekerjaanWali.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="penghasilanWali" className="mb-2 block text-sm font-medium text-gray-700">
                    Penghasilan Wali
                  </label>
                  <input
                    id="penghasilanWali"
                    type="text"
                    {...register('penghasilanWali')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.penghasilanWali && (
                    <p className="mt-2 text-sm text-red-600">{errors.penghasilanWali.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="noTeleponWali" className="mb-2 block text-sm font-medium text-gray-700">
                    Nomor Telepon Wali
                  </label>
                  <input
                    id="noTeleponWali"
                    type="tel"
                    {...register('noTeleponWali')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {errors.noTeleponWali && (
                    <p className="mt-2 text-sm text-red-600">{errors.noTeleponWali.message}</p>
                  )}
                </div>
              </div>
            </section>

            <section aria-labelledby="section-jurusan" className="pt-4">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">4</div>
                <div>
                  <h2 id="section-jurusan" className="text-xl font-semibold text-gray-900">
                    Pilihan Jurusan
                  </h2>
                  <p className="text-sm text-gray-600">Pilih jurusan utama yang diinginkan dan sertakan alasan.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="jurusanPilihan" className="mb-2 block text-sm font-medium text-gray-700">
                    Jurusan Pilihan*
                  </label>
                  <select
                    id="jurusanPilihan"
                    {...register('jurusanPilihan')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih jurusan
                    </option>
                    {jurusanOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.jurusanPilihan && (
                    <p className="mt-2 text-sm text-red-600">{errors.jurusanPilihan.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="alasanPilihan" className="mb-2 block text-sm font-medium text-gray-700">
                    Alasan Memilih Jurusan*
                  </label>
                  <textarea
                    id="alasanPilihan"
                    rows={3}
                    {...register('alasanPilihan')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ceritakan motivasi atau cita-cita Anda"
                  />
                  {errors.alasanPilihan && (
                    <p className="mt-2 text-sm text-red-600">{errors.alasanPilihan.message}</p>
                  )}
                </div>
              </div>
            </section>

            <section aria-labelledby="section-dokumen" className="pt-4">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">5</div>
                <div>
                  <h2 id="section-dokumen" className="text-xl font-semibold text-gray-900">
                    Unggah Dokumen Pendukung
                  </h2>
                  <p className="text-sm text-gray-600">
                    Minimal satu dokumen harus diunggah. Format file PDF/JPG/PNG dengan ukuran maksimal 5MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {documentTypes.map((key) => (
                  <Controller
                    key={key}
                    control={control}
                    name={`dokumen.${key}`}
                    render={({ field }) => (
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          {documentLabels[key]}
                        </label>
                        <div className="flex flex-col rounded-lg border border-dashed border-gray-300 p-4">
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={(event) => {
                              const file = event.target.files?.[0]
                              field.onChange(file)
                            }}
                          />
                          <p className="mt-2 text-xs text-gray-500">{documentDescriptions[key]}</p>
                          {field.value && (
                            <p className="mt-2 text-sm text-gray-700">
                              File terpilih: <span className="font-medium">{field.value.name}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  />
                ))}
              </div>
              {errors.dokumen && (
                <p className="mt-2 text-sm text-red-600">{errors.dokumen.message as string}</p>
              )}
            </section>

            <section aria-labelledby="section-persetujuan" className="pt-4">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">6</div>
                <div>
                  <h2 id="section-persetujuan" className="text-xl font-semibold text-gray-900">
                    Persetujuan & Pengiriman
                  </h2>
                  <p className="text-sm text-gray-600">
                    Periksa kembali data Anda sebelum mengirim formulir. Admin akan menghubungi melalui nomor atau email yang
                    dicantumkan.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
                <p className="font-semibold">Ringkasan singkat:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>
                    <span className="font-medium">Nama:</span> {watchNamaLengkap || '-'}
                  </li>
                  <li>
                    <span className="font-medium">Asal Sekolah:</span> {watchAsalSekolah || '-'}
                  </li>
                  <li>
                    <span className="font-medium">Jurusan Pilihan:</span>{' '}
                    {watchJurusan ? jurusanOptions.find((opt) => opt.value === watchJurusan)?.label : '-'}
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <input
                  id="persetujuan"
                  type="checkbox"
                  {...register('persetujuan')}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="persetujuan" className="text-sm text-gray-700">
                  Saya menyatakan bahwa data yang diberikan adalah benar dan bersedia mengikuti ketentuan PPDB MA Malnu Kananga.
                </label>
              </div>
              {errors.persetujuan && (
                <p className="mt-2 text-sm text-red-600">{errors.persetujuan.message}</p>
              )}

              {status && (
                <div
                  className={`mt-6 rounded-lg border p-4 text-sm ${
                    status.type === 'success'
                      ? 'border-green-200 bg-green-50 text-green-800'
                      : 'border-red-200 bg-red-50 text-red-800'
                  }`}
                  role="status"
                >
                  {status.message}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Formulir'}
                </button>
                <button
                  type="button"
                  onClick={() => reset(defaultValues as PpdbFormValues)}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Reset Formulir
                </button>
              </div>
            </section>
          </form>
        </div>

        <aside className="w-full lg:w-1/3">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900">Alur Pendaftaran</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-gray-600">
                <li>Isi formulir pendaftaran secara lengkap.</li>
                <li>Unggah minimal satu dokumen pendukung.</li>
                <li>Tunggu verifikasi admin (maksimal 2x24 jam kerja).</li>
                <li>Ikuti tes/observasi sesuai jadwal yang dikirim via email/WhatsApp.</li>
                <li>Pengumuman hasil seleksi akan dikirimkan secara daring.</li>
              </ol>
            </div>

            <div className="rounded-2xl bg-blue-600 p-6 text-white">
              <h2 className="text-lg font-semibold">Butuh Bantuan?</h2>
              <p className="mt-2 text-sm text-blue-100">
                Hubungi panitia PPDB melalui WhatsApp 08xx-xxxx-xxxx atau email ppdb@malnukananga.sch.id untuk pertanyaan teknis.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900">Dokumen Wajib</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                <li>Akta kelahiran atau surat keterangan lahir.</li>
                <li>Kartu keluarga terbaru.</li>
                <li>Surat keterangan lulus/ijazah sementara.</li>
                <li>Rapor terakhir atau nilai semester berjalan.</li>
                <li>Pas foto berwarna latar merah/biru ukuran 3x4.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
