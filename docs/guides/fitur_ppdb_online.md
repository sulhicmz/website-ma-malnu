# Fitur PPDB Online - MA Malnu Kananga

## Spesifikasi Form PPDB dengan Field Lengkap

### 1. Struktur Data Formulir PPDB

```typescript
// types/ppdb.ts
export interface PPDBFormValues {
  // Data Siswa
  namaLengkap: string
  jenisKelamin: 'laki-laki' | 'perempuan'
  tempatLahir: string
  tanggalLahir: Date
  nik: string
  nisn: string
  alamat: string
  kecamatan: string
  kabupaten: string
  provinsi: string
  kodePos: string
  noTelepon: string
  email: string
  asalSekolah: string
  alamatSekolah: string
  npsnSekolah: string
  tahunLulus: string
  nilaiUN: {
    indonesia: number
    inggris: number
    matematika: number
    ipa: number
  }
  
  // Data Orang Tua/Wali
  namaAyah: string
  nikAyah: string
  pendidikanAyah: string
  pekerjaanAyah: string
  penghasilanAyah: string
  noTeleponAyah: string
  
  namaIbu: string
  nikIbu: string
  pendidikanIbu: string
  pekerjaanIbu: string
  penghasilanIbu: string
  noTeleponIbu: string
  
  namaWali?: string
  hubunganWali?: string
  nikWali?: string
  pendidikanWali?: string
 pekerjaanWali?: string
  penghasilanWali?: string
  noTeleponWali?: string
  
  // Pilihan Jurusan
  jurusanPilihan: 'ipa' | 'ips'
  alasanPilihan: string
  
  // Dokumen
  dokumen: {
    foto: File | null
    aktaKelahiran: File | null
    kartuKeluarga: File | null
    ijazah: File | null
    skhun: File | null
    rapor: File | null
  }
  
  // Persetujuan
  persetujuan: boolean
}
```

### 2. Validasi dengan Zod

```typescript
// lib/validation/ppdb.ts
import { z } from 'zod'

export const ppdbFormSchema = z.object({
  // Data Siswa
  namaLengkap: z.string().min(3, 'Nama lengkap minimal 3 karakter').max(100, 'Nama lengkap maksimal 100 karakter'),
  jenisKelamin: z.enum(['laki-laki', 'perempuan'], {
    required_error: 'Jenis kelamin harus dipilih'
  }),
  tempatLahir: z.string().min(2, 'Tempat lahir minimal 2 karakter').max(50, 'Tempat lahir maksimal 50 karakter'),
  tanggalLahir: z.date({
    required_error: 'Tanggal lahir harus diisi',
    invalid_type_error: 'Tanggal lahir tidak valid'
  }),
  nik: z.string().length(16, 'NIK harus 16 digit').regex(/^\d+$/, 'NIK hanya boleh berisi angka'),
  nisn: z.string().length(10, 'NISN harus 10 digit').regex(/^\d+$/, 'NISN hanya boleh berisi angka'),
  alamat: z.string().min(10, 'Alamat minimal 10 karakter').max(200, 'Alamat maksimal 200 karakter'),
  kecamatan: z.string().min(2, 'Kecamatan minimal 2 karakter').max(50, 'Kecamatan maksimal 50 karakter'),
  kabupaten: z.string().min(2, 'Kabupaten minimal 2 karakter').max(50, 'Kabupaten maksimal 50 karakter'),
  provinsi: z.string().min(2, 'Provinsi minimal 2 karakter').max(50, 'Provinsi maksimal 50 karakter'),
  kodePos: z.string().length(5, 'Kode pos harus 5 digit').regex(/^\d+$/, 'Kode pos hanya boleh berisi angka'),
 noTelepon: z.string().min(10, 'Nomor telepon minimal 10 digit').max(15, 'Nomor telepon maksimal 15 digit').regex(/^[\d\-\+\(\)\s]+$/, 'Nomor telepon tidak valid'),
 email: z.string().email('Email tidak valid'),
  asalSekolah: z.string().min(3, 'Asal sekolah minimal 3 karakter').max(100, 'Asal sekolah maksimal 100 karakter'),
  alamatSekolah: z.string().min(10, 'Alamat sekolah minimal 10 karakter').max(200, 'Alamat sekolah maksimal 200 karakter'),
  npsnSekolah: z.string().length(8, 'NPSN harus 8 digit').regex(/^\d+$/, 'NPSN hanya boleh berisi angka'),
  tahunLulus: z.string().length(4, 'Tahun lulus harus 4 digit').regex(/^\d+$/, 'Tahun lulus hanya boleh berisi angka'),
  nilaiUN: z.object({
    indonesia: z.number().min(0, 'Nilai tidak valid').max(100, 'Nilai maksimal 100'),
    inggris: z.number().min(0, 'Nilai tidak valid').max(100, 'Nilai maksimal 100'),
    matematika: z.number().min(0, 'Nilai tidak valid').max(100, 'Nilai maksimal 100'),
    ipa: z.number().min(0, 'Nilai tidak valid').max(100, 'Nilai maksimal 100')
  }),
  
  // Data Orang Tua/Wali
 namaAyah: z.string().min(3, 'Nama ayah minimal 3 karakter').max(100, 'Nama ayah maksimal 100 karakter'),
  nikAyah: z.string().length(16, 'NIK ayah harus 16 digit').regex(/^\d+$/, 'NIK ayah hanya boleh berisi angka'),
  pendidikanAyah: z.string().min(2, 'Pendidikan ayah harus dipilih'),
  pekerjaanAyah: z.string().min(2, 'Pekerjaan ayah harus dipilih'),
  penghasilanAyah: z.string().min(2, 'Penghasilan ayah harus dipilih'),
  noTeleponAyah: z.string().min(10, 'Nomor telepon ayah minimal 10 digit').max(15, 'Nomor telepon ayah maksimal 15 digit').regex(/^[\d\-\+\(\)\s]+$/, 'Nomor telepon ayah tidak valid'),
  
  namaIbu: z.string().min(3, 'Nama ibu minimal 3 karakter').max(100, 'Nama ibu maksimal 100 karakter'),
  nikIbu: z.string().length(16, 'NIK ibu harus 16 digit').regex(/^\d+$/, 'NIK ibu hanya boleh berisi angka'),
  pendidikanIbu: z.string().min(2, 'Pendidikan ibu harus dipilih'),
  pekerjaanIbu: z.string().min(2, 'Pekerjaan ibu harus dipilih'),
  penghasilanIbu: z.string().min(2, 'Penghasilan ibu harus dipilih'),
  noTeleponIbu: z.string().min(10, 'Nomor telepon ibu minimal 10 digit').max(15, 'Nomor telepon ibu maksimal 15 digit').regex(/^[\d\-\+\(\)\s]+$/, 'Nomor telepon ibu tidak valid'),
  
  namaWali: z.string().max(100, 'Nama wali maksimal 100 karakter').optional(),
  hubunganWali: z.string().max(50, 'Hubungan wali maksimal 50 karakter').optional(),
  nikWali: z.string().length(16, 'NIK wali harus 16 digit').regex(/^\d+$/, 'NIK wali hanya boleh berisi angka').optional(),
  pendidikanWali: z.string().optional(),
  pekerjaanWali: z.string().optional(),
  penghasilanWali: z.string().optional(),
  noTeleponWali: z.string().max(15, 'Nomor telepon wali maksimal 15 digit').regex(/^[\d\-\+\(\)\s]+$/, 'Nomor telepon wali tidak valid').optional(),
  
  // Pilihan Jurusan
  jurusanPilihan: z.enum(['ipa', 'ips'], {
    required_error: 'Jurusan pilihan harus dipilih'
  }),
  alasanPilihan: z.string().min(10, 'Alasan pilihan minimal 10 karakter').max(500, 'Alasan pilihan maksimal 500 karakter'),
  
  // Dokumen
  dokumen: z.object({
    foto: z.instanceof(File).nullable(),
    aktaKelahiran: z.instanceof(File).nullable(),
    kartuKeluarga: z.instanceof(File).nullable(),
    ijazah: z.instanceof(File).nullable(),
    skhun: z.instanceof(File).nullable(),
    rapor: z.instanceof(File).nullable()
  }).refine(
    (data) => data.foto || data.aktaKelahiran || data.kartuKeluarga || data.ijazah || data.skhun || data.rapor,
    {
      message: 'Minimal satu dokumen harus diunggah'
    }
  ),
  
  // Persetujuan
  persetujuan: z.boolean().refine(val => val === true, {
    message: 'Anda harus menyetujui syarat dan ketentuan'
  })
})

export type PPDBFormValues = z.infer<typeof ppdbFormSchema>
```

### 3. Integrasi reCAPTCHA v3

```tsx
// components/forms/PPDBForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ppdbFormSchema, type PPDBFormValues } from '@/lib/validation/ppdb'
import { FiUpload, FiUser, FiHome, FiBook, FiUsers, FiFile } from 'react-icons/fi'

declare global {
  interface Window {
    grecaptcha: any
  }
}

export default function PPDBForm() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
 const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<PPDBFormValues>({
    resolver: zodResolver(ppdbFormSchema),
    defaultValues: {
      jenisKelamin: 'laki-laki',
      jurusanPilihan: 'ipa',
      nilaiUN: {
        indonesia: 0,
        inggris: 0,
        matematika: 0,
        ipa: 0
      }
    }
  })
  
  // Load reCAPTCHA
  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
    
    loadRecaptcha()
  }, [])
  
  // Execute reCAPTCHA
  const executeRecaptcha = async () => {
    if (window.grecaptcha) {
      try {
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: 'submit_ppdb' }
        )
        setRecaptchaToken(token)
        return token
      } catch (error) {
        console.error('reCAPTCHA execution failed:', error)
        return null
      }
    }
    return null
  }
  
  const onSubmit = async (data: PPDBFormValues) => {
    setIsSubmitting(true)
    
    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha()
      if (!token) {
        throw new Error('Failed to execute reCAPTCHA')
      }
      
      // Prepare form data for submission
      const formData = new FormData()
      
      // Append form data
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !(value instanceof File)) {
          if (key === 'nilaiUN') {
            Object.entries(value).forEach(([subKey, subValue]) => {
              formData.append(`nilaiUN.${subKey}`, subValue.toString())
            })
          } else if (key === 'dokumen') {
            Object.entries(value).forEach(([docKey, docValue]) => {
              if (docValue instanceof File) {
                formData.append(`dokumen.${docKey}`, docValue)
              }
            })
          }
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString())
        }
      })
      
      // Append reCAPTCHA token
      formData.append('recaptchaToken', token)
      
      // Submit to API
      const response = await fetch('/api/ppdb/submit', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      
      // Handle success
      alert('Pendaftaran berhasil dikirim!')
    } catch (error) {
      console.error('Submission error:', error)
      alert('Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Render form fields
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Data Siswa Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <FiUser className="h-5 w-5 text-green-700 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Data Siswa</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama Lengkap */}
          <div className="md:col-span-2">
            <label htmlFor="namaLengkap" className="block text-sm font-medium text-gray-700">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              id="namaLengkap"
              type="text"
              {...register('namaLengkap')}
              className={`mt-1 block w-full border ${errors.namaLengkap ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
            />
            {errors.namaLengkap && (
              <p className="mt-1 text-sm text-red-600">{errors.namaLengkap.message}</p>
            )}
          </div>
          
          {/* Jenis Kelamin */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="laki-laki"
                  {...register('jenisKelamin')}
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                />
                <span className="ml-2">Laki-laki</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  value="perempuan"
                  {...register('jenisKelamin')}
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                />
                <span className="ml-2">Perempuan</span>
              </label>
            </div>
            {errors.jenisKelamin && (
              <p className="mt-1 text-sm text-red-600">{errors.jenisKelamin.message}</p>
            )}
          </div>
          
          {/* Tempat & Tanggal Lahir */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tempatLahir" className="block text-sm font-medium text-gray-700">
                Tempat Lahir <span className="text-red-500">*</span>
              </label>
              <input
                id="tempatLahir"
                type="text"
                {...register('tempatLahir')}
                className={`mt-1 block w-full border ${errors.tempatLahir ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.tempatLahir && (
                <p className="mt-1 text-sm text-red-600">{errors.tempatLahir.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="tanggalLahir" className="block text-sm font-medium text-gray-700">
                Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <input
                id="tanggalLahir"
                type="date"
                {...register('tanggalLahir')}
                className={`mt-1 block w-full border ${errors.tanggalLahir ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.tanggalLahir && (
                <p className="mt-1 text-sm text-red-600">{errors.tanggalLahir.message}</p>
              )}
            </div>
          </div>
          
          {/* NIK & NISN */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
                NIK <span className="text-red-500">*</span>
              </label>
              <input
                id="nik"
                type="text"
                {...register('nik')}
                className={`mt-1 block w-full border ${errors.nik ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.nik && (
                <p className="mt-1 text-sm text-red-600">{errors.nik.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="nisn" className="block text-sm font-medium text-gray-700">
                NISN <span className="text-red-500">*</span>
              </label>
              <input
                id="nisn"
                type="text"
                {...register('nisn')}
                className={`mt-1 block w-full border ${errors.nisn ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.nisn && (
                <p className="mt-1 text-sm text-red-600">{errors.nisn.message}</p>
              )}
            </div>
          </div>
          
          {/* Alamat */}
          <div className="md:col-span-2">
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
              Alamat <span className="text-red-500">*</span>
            </label>
            <textarea
              id="alamat"
              {...register('alamat')}
              rows={3}
              className={`mt-1 block w-full border ${errors.alamat ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
            ></textarea>
            {errors.alamat && (
              <p className="mt-1 text-sm text-red-600">{errors.alamat.message}</p>
            )}
          </div>
          
          {/* Wilayah */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">
                Kecamatan <span className="text-red-500">*</span>
              </label>
              <input
                id="kecamatan"
                type="text"
                {...register('kecamatan')}
                className={`mt-1 block w-full border ${errors.kecamatan ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.kecamatan && (
                <p className="mt-1 text-sm text-red-600">{errors.kecamatan.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="kabupaten" className="block text-sm font-medium text-gray-700">
                Kabupaten <span className="text-red-500">*</span>
              </label>
              <input
                id="kabupaten"
                type="text"
                {...register('kabupaten')}
                className={`mt-1 block w-full border ${errors.kabupaten ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.kabupaten && (
                <p className="mt-1 text-sm text-red-600">{errors.kabupaten.message}</p>
              )}
            </div>
          </div>
          
          {/* Provinsi & Kode Pos */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="provinsi" className="block text-sm font-medium text-gray-700">
                Provinsi <span className="text-red-500">*</span>
              </label>
              <input
                id="provinsi"
                type="text"
                {...register('provinsi')}
                className={`mt-1 block w-full border ${errors.provinsi ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.provinsi && (
                <p className="mt-1 text-sm text-red-600">{errors.provinsi.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="kodePos" className="block text-sm font-medium text-gray-700">
                Kode Pos <span className="text-red-500">*</span>
              </label>
              <input
                id="kodePos"
                type="text"
                {...register('kodePos')}
                className={`mt-1 block w-full border ${errors.kodePos ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.kodePos && (
                <p className="mt-1 text-sm text-red-600">{errors.kodePos.message}</p>
              )}
            </div>
          </div>
          
          {/* Telepon & Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="noTelepon" className="block text-sm font-medium text-gray-700">
                No. Telepon <span className="text-red-500">*</span>
              </label>
              <input
                id="noTelepon"
                type="tel"
                {...register('noTelepon')}
                className={`mt-1 block w-full border ${errors.noTelepon ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.noTelepon && (
                <p className="mt-1 text-sm text-red-600">{errors.noTelepon.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Sekolah Asal */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <FiBook className="h-5 w-5 text-green-700 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Data Sekolah Asal</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="asalSekolah" className="block text-sm font-medium text-gray-700">
              Nama Sekolah Asal <span className="text-red-500">*</span>
            </label>
            <input
              id="asalSekolah"
              type="text"
              {...register('asalSekolah')}
              className={`mt-1 block w-full border ${errors.asalSekolah ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
            />
            {errors.asalSekolah && (
              <p className="mt-1 text-sm text-red-600">{errors.asalSekolah.message}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="alamatSekolah" className="block text-sm font-medium text-gray-700">
              Alamat Sekolah <span className="text-red-500">*</span>
            </label>
            <textarea
              id="alamatSekolah"
              {...register('alamatSekolah')}
              rows={2}
              className={`mt-1 block w-full border ${errors.alamatSekolah ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
            ></textarea>
            {errors.alamatSekolah && (
              <p className="mt-1 text-sm text-red-600">{errors.alamatSekolah.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="npsnSekolah" className="block text-sm font-medium text-gray-700">
              NPSN Sekolah <span className="text-red-500">*</span>
            </label>
            <input
              id="npsnSekolah"
              type="text"
              {...register('npsnSekolah')}
              className={`mt-1 block w-full border ${errors.npsnSekolah ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
            />
            {errors.npsnSekolah && (
              <p className="mt-1 text-sm text-red-600">{errors.npsnSekolah.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="tahunLulus" className="block text-sm font-medium text-gray-700">
              Tahun Lulus <span className="text-red-500">*</span>
            </label>
            <input
              id="tahunLulus"
              type="text"
              {...register('tahunLulus')}
              className={`mt-1 block w-full border ${errors.tahunLulus ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
            />
            {errors.tahunLulus && (
              <p className="mt-1 text-sm text-red-600">{errors.tahunLulus.message}</p>
            )}
          </div>
          
          {/* Nilai UN */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nilai UN <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="nilaiUN.indonesia" className="block text-xs text-gray-500">Bahasa Indonesia</label>
                <input
                  id="nilaiUN.indonesia"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  {...register('nilaiUN.indonesia', { valueAsNumber: true })}
                  className={`mt-1 block w-full border ${errors.nilaiUN?.indonesia ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {errors.nilaiUN?.indonesia && (
                  <p className="mt-1 text-xs text-red-600">{errors.nilaiUN.indonesia.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="nilaiUN.inggris" className="block text-xs text-gray-500">Bahasa Inggris</label>
                <input
                  id="nilaiUN.inggris"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  {...register('nilaiUN.inggris', { valueAsNumber: true })}
                  className={`mt-1 block w-full border ${errors.nilaiUN?.inggris ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {errors.nilaiUN?.inggris && (
                  <p className="mt-1 text-xs text-red-600">{errors.nilaiUN.inggris.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="nilaiUN.matematika" className="block text-xs text-gray-500">Matematika</label>
                <input
                  id="nilaiUN.matematika"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  {...register('nilaiUN.matematika', { valueAsNumber: true })}
                  className={`mt-1 block w-full border ${errors.nilaiUN?.matematika ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {errors.nilaiUN?.matematika && (
                  <p className="mt-1 text-xs text-red-600">{errors.nilaiUN.matematika.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="nilaiUN.ipa" className="block text-xs text-gray-500">IPA</label>
                <input
                  id="nilaiUN.ipa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  {...register('nilaiUN.ipa', { valueAsNumber: true })}
                  className={`mt-1 block w-full border ${errors.nilaiUN?.ipa ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                />
                {errors.nilaiUN?.ipa && (
                  <p className="mt-1 text-xs text-red-600">{errors.nilaiUN.ipa.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Orang Tua */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <FiUsers className="h-5 w-5 text-green-700 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Data Orang Tua</h3>
        </div>
        
        {/* Data Ayah */}
        <div className="mb-8">
          <h4 className="text-md font-semibold text-gray-800 mb-4">Data Ayah</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="namaAyah" className="block text-sm font-medium text-gray-700">
                Nama Ayah <span className="text-red-500">*</span>
              </label>
              <input
                id="namaAyah"
                type="text"
                {...register('namaAyah')}
                className={`mt-1 block w-full border ${errors.namaAyah ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.namaAyah && (
                <p className="mt-1 text-sm text-red-600">{errors.namaAyah.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="nikAyah" className="block text-sm font-medium text-gray-700">
                NIK Ayah <span className="text-red-500">*</span>
              </label>
              <input
                id="nikAyah"
                type="text"
                {...register('nikAyah')}
                className={`mt-1 block w-full border ${errors.nikAyah ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.nikAyah && (
                <p className="mt-1 text-sm text-red-600">{errors.nikAyah.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="pendidikanAyah" className="block text-sm font-medium text-gray-700">
                Pendidikan Terakhir <span className="text-red-500">*</span>
              </label>
              <select
                id="pendidikanAyah"
                {...register('pendidikanAyah')}
                className={`mt-1 block w-full border ${errors.pendidikanAyah ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              >
                <option value="">Pilih Pendidikan</option>
                <option value="sd">SD/Sederajat</option>
                <option value="smp">SMP/Sederajat</option>
                <option value="sma">SMA/Sederajat</option>
                <option value="d3">D3</option>
                <option value="s1">S1</option>
                <option value="s2">S2</option>
                <option value="s3">S3</option>
              </select>
              {errors.pendidikanAyah && (
                <p className="mt-1 text-sm text-red-600">{errors.pendidikanAyah.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="pekerjaanAyah" className="block text-sm font-medium text-gray-700">
                Pekerjaan <span className="text-red-500">*</span>
              </label>
              <select
                id="pekerjaanAyah"
                {...register('pekerjaanAyah')}
                className={`mt-1 block w-full border ${errors.pekerjaanAyah ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              >
                <option value="">Pilih Pekerjaan</option>
                <option value="pns">PNS</option>
                <option value="tni">TNI</option>
                <option value="polri">POLRI</option>
                <option value="pegawai-swasta">Pegawai Swasta</option>
                <option value="wirausaha">Wirausaha</option>
                <option value="petani">Petani</option>
                <option value="nelayan">Nelayan</option>
                <option value="lainnya">Lainnya</option>
              </select>
              {errors.pekerjaanAyah && (
                <p className="mt-1 text-sm text-red-600">{errors.pekerjaanAyah.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="penghasilanAyah" className="block text-sm font-medium text-gray-700">
                Penghasilan Bulanan <span className="text-red-500">*</span>
              </label>
              <select
                id="penghasilanAyah"
                {...register('penghasilanAyah')}
                className={`mt-1 block w-full border ${errors.penghasilanAyah ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              >
                <option value="">Pilih Penghasilan</option>
                <option value="<1jt">Kurang dari Rp 1.000.000</option>
                <option value="1jt-3jt">Rp 1.000.000 - Rp 3.000.000</option>
                <option value="3jt-5jt">Rp 3.000 - Rp 5.000.000</option>
                <option value="5jt-10jt">Rp 5.000.000 - Rp 10.000.000</option>
                <option value=">10jt">Lebih dari Rp 10.000</option>
              </select>
              {errors.penghasilanAyah && (
                <p className="mt-1 text-sm text-red-600">{errors.penghasilanAyah.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="noTeleponAyah" className="block text-sm font-medium text-gray-700">
                No. Telepon <span className="text-red-500">*</span>
              </label>
              <input
                id="noTeleponAyah"
                type="tel"
                {...register('noTeleponAyah')}
                className={`mt-1 block w-full border ${errors.noTeleponAyah ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.noTeleponAyah && (
                <p className="mt-1 text-sm text-red-600">{errors.noTeleponAyah.message}</p>
              )}
            </div>
          </div>
        
        {/* Data Ibu */}
        <div className="mb-8">
          <h4 className="text-md font-semibold text-gray-800 mb-4">Data Ibu</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="namaIbu" className="block text-sm font-medium text-gray-700">
                Nama Ibu <span className="text-red-500">*</span>
              </label>
              <input
                id="namaIbu"
                type="text"
                {...register('namaIbu')}
                className={`mt-1 block w-full border ${errors.namaIbu ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.namaIbu && (
                <p className="mt-1 text-sm text-red-600">{errors.namaIbu.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="nikIbu" className="block text-sm font-medium text-gray-700">
                NIK Ibu <span className="text-red-500">*</span>
              </label>
              <input
                id="nikIbu"
                type="text"
                {...register('nikIbu')}
                className={`mt-1 block w-full border ${errors.nikIbu ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.nikIbu && (
                <p className="mt-1 text-sm text-red-600">{errors.nikIbu.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="pendidikanIbu" className="block text-sm font-medium text-gray-700">
                Pendidikan Terakhir <span className="text-red-500">*</span>
              </label>
              <select
                id="pendidikanIbu"
                {...register('pendidikanIbu')}
                className={`mt-1 block w-full border ${errors.pendidikanIbu ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              >
                <option value="">Pilih Pendidikan</option>
                <option value="sd">SD/Sederajat</option>
                <option value="smp">SMP/Sederajat</option>
                <option value="sma">SMA/Sederajat</option>
                <option value="d3">D3</option>
                <option value="s1">S1</option>
                <option value="s2">S2</option>
                <option value="s3">S3</option>
              </select>
              {errors.pendidikanIbu && (
                <p className="mt-1 text-sm text-red-600">{errors.pendidikanIbu.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="pekerjaanIbu" className="block text-sm font-medium text-gray-700">
                Pekerjaan <span className="text-red-500">*</span>
              </label>
              <select
                id="pekerjaanIbu"
                {...register('pekerjaanIbu')}
                className={`mt-1 block w-full border ${errors.pekerjaanIbu ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              >
                <option value="">Pilih Pekerjaan</option>
                <option value="pns">PNS</option>
                <option value="tni">TNI</option>
                <option value="polri">POLRI</option>
                <option value="pegawai-swasta">Pegawai Swasta</option>
                <option value="wirausaha">Wirausaha</option>
                <option value="petani">Petani</option>
                <option value="nelayan">Nelayan</option>
                <option value="ibu-rumah-tangga">Ibu Rumah Tangga</option>
                <option value="lainnya">Lainnya</option>
              </select>
              {errors.pekerjaanIbu && (
                <p className="mt-1 text-sm text-red-600">{errors.pekerjaanIbu.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="penghasilanIbu" className="block text-sm font-medium text-gray-700">
                Penghasilan Bulanan <span className="text-red-500">*</span>
              </label>
              <select
                id="penghasilanIbu"
                {...register('penghasilanIbu')}
                className={`mt-1 block w-full border ${errors.penghasilanIbu ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              >
                <option value="">Pilih Penghasilan</option>
                <option value="<1jt">Kurang dari Rp 1.000.000</option>
                <option value="1jt-3jt">Rp 1.000.000 - Rp 3.00.000</option>
                <option value="3jt-5jt">Rp 3.000.000 - Rp 5.000.000</option>
                <option value="5jt-10jt">Rp 5.000.000 - Rp 10.000.000</option>
                <option value=">10jt">Lebih dari Rp 10.000</option>
              </select>
              {errors.penghasilanIbu && (
                <p className="mt-1 text-sm text-red-600">{errors.penghasilanIbu.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="noTeleponIbu" className="block text-sm font-medium text-gray-700">
                No. Telepon <span className="text-red-500">*</span>
              </label>
              <input
                id="noTeleponIbu"
                type="tel"
                {...register('noTeleponIbu')}
                className={`mt-1 block w-full border ${errors.noTeleponIbu ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.noTeleponIbu && (
                <p className="mt-1 text-sm text-red-600">{errors.noTeleponIbu.message}</p>
              )}
            </div>
          </div>
        
        {/* Data Wali (Opsional) */}
        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-4">Data Wali (Opsional)</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="namaWali" className="block text-sm font-medium text-gray-700">
                Nama Wali
              </label>
              <input
                id="namaWali"
                type="text"
                {...register('namaWali')}
                className={`mt-1 block w-full border ${errors.namaWali ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.namaWali && (
                <p className="mt-1 text-sm text-red-600">{errors.namaWali.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="hubunganWali" className="block text-sm font-medium text-gray-700">
                Hubungan dengan Siswa
              </label>
              <input
                id="hubunganWali"
                type="text"
                {...register('hubunganWali')}
                className={`mt-1 block w-full border ${errors.hubunganWali ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.hubunganWali && (
                <p className="mt-1 text-sm text-red-600">{errors.hubunganWali.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="nikWali" className="block text-sm font-medium text-gray-700">
                NIK Wali
              </label>
              <input
                id="nikWali"
                type="text"
                {...register('nikWali')}
                className={`mt-1 block w-full border ${errors.nikWali ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.nikWali && (
                <p className="mt-1 text-sm text-red-600">{errors.nikWali.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="pendidikanWali" className="block text-sm font-medium text-gray-700">
                Pendidikan Terakhir
              </label>
              <select
                id="pendidikanWali"
                {...register('pendidikanWali')}
                className={`mt-1 block w-full border ${errors.pendidikanWali ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              >
                <option value="">Pilih Pendidikan</option>
                <option value="sd">SD/Sederajat</option>
                <option value="smp">SMP/Sederajat</option>
                <option value="sma">SMA/Sederajat</option>
                <option value="d3">D3</option>
                <option value="s1">S1</option>
                <option value="s2">S2</option>
                <option value="s3">S3</option>
              </select>
              {errors.pendidikanWali && (
                <p className="mt-1 text-sm text-red-600">{errors.pendidikanWali.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="pekerjaanWali" className="block text-sm font-medium text-gray-700">
                Pekerjaan
              </label>
              <select
                id="pekerjaanWali"
                {...register('pekerjaanWali')}
                className={`mt-1 block w-full border ${errors.pekerjaanWali ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              >
                <option value="">Pilih Pekerjaan</option>
                <option value="pns">PNS</option>
                <option value="tni">TNI</option>
                <option value="polri">POLRI</option>
                <option value="pegawai-swasta">Pegawai Swasta</option>
                <option value="wirausaha">Wirausaha</option>
                <option value="petani">Petani</option>
                <option value="nelayan">Nelayan</option>
                <option value="lainnya">Lainnya</option>
              </select>
              {errors.pekerjaanWali && (
                <p className="mt-1 text-sm text-red-600">{errors.pekerjaanWali.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="penghasilanWali" className="block text-sm font-medium text-gray-700">
                Penghasilan Bulanan
              </label>
              <select
                id="penghasilanWali"
                {...register('penghasilanWali')}
                className={`mt-1 block w-full border ${errors.penghasilanWali ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              >
                <option value="">Pilih Penghasilan</option>
                <option value="<1jt">Kurang dari Rp 1.000.000</option>
                <option value="1jt-3jt">Rp 1.000.000 - Rp 3.000.000</option>
                <option value="3jt-5jt">Rp 3.000.000 - Rp 5.00.000</option>
                <option value="5jt-10jt">Rp 5.000.000 - Rp 10.000.000</option>
                <option value=">10jt">Lebih dari Rp 10.000</option>
              </select>
              {errors.penghasilanWali && (
                <p className="mt-1 text-sm text-red-600">{errors.penghasilanWali.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="noTeleponWali" className="block text-sm font-medium text-gray-700">
                No. Telepon
              </label>
              <input
                id="noTeleponWali"
                type="tel"
                {...register('noTeleponWali')}
                className={`mt-1 block w-full border ${errors.noTeleponWali ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {errors.noTeleponWali && (
                <p className="mt-1 text-sm text-red-600">{errors.noTeleponWali.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Pilihan Jurusan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <FiBook className="h-5 w-5 text-green-700 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Pilihan Jurusan</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jurusan Pilihan <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="ipa"
                  {...register('jurusanPilihan')}
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                />
                <span className="ml-2">Ilmu Pengetahuan Alam (IPA)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="ips"
                  {...register('jurusanPilihan')}
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                />
                <span className="ml-2">Ilmu Pengetahuan Sosial (IPS)</span>
              </label>
            </div>
            {errors.jurusanPilihan && (
              <p className="mt-1 text-sm text-red-600">{errors.jurusanPilihan.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="alasanPilihan" className="block text-sm font-medium text-gray-700">
              Alasan Memilih Jurusan <span className="text-red-500">*</span>
            </label>
            <textarea
              id="alasanPilihan"
              {...register('alasanPilihan')}
              rows={3}
              className={`mt-1 block w-full border ${errors.alasanPilihan ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
            ></textarea>
            {errors.alasanPilihan && (
              <p className="mt-1 text-sm text-red-600">{errors.alasanPilihan.message}</p>
            )}
          </div>
        </div>
      
      {/* Dokumen Upload */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <FiFile className="h-5 w-5 text-green-700 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Dokumen yang Diperlukan</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pas Foto 3x4 <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                    <span>Upload file</span>
                    <input 
                      id="dokumen.foto" 
                      type="file" 
                      {...register('dokumen.foto')} 
                      className="sr-only" 
                      accept="image/*" 
                    />
                  </label>
                  <p className="pl-1">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG hingga 2MB</p>
              </div>
            </div>
            {errors.dokumen?.foto && (
              <p className="mt-1 text-sm text-red-600">{errors.dokumen.foto.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Akta Kelahiran <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                    <span>Upload file</span>
                    <input 
                      id="dokumen.aktaKelahiran" 
                      type="file" 
                      {...register('dokumen.aktaKelahiran')} 
                      className="sr-only" 
                      accept=".pdf,image/*" 
                    />
                  </label>
                  <p className="pl-1">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG, JPEG hingga 2MB</p>
              </div>
            </div>
            {errors.dokumen?.aktaKelahiran && (
              <p className="mt-1 text-sm text-red-600">{errors.dokumen.aktaKelahiran.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kartu Keluarga <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                    <span>Upload file</span>
                    <input 
                      id="dokumen.kartuKeluarga" 
                      type="file" 
                      {...register('dokumen.kartuKeluarga')} 
                      className="sr-only" 
                      accept=".pdf,image/*" 
                    />
                  </label>
                  <p className="pl-1">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG, JPEG hingga 2MB</p>
              </div>
            </div>
            {errors.dokumen?.kartuKeluarga && (
              <p className="mt-1 text-sm text-red-600">{errors.dokumen.kartuKeluarga.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ijazah <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                    <span>Upload file</span>
                    <input 
                      id="dokumen.ijazah" 
                      type="file" 
                      {...register('dokumen.ijazah')} 
                      className="sr-only" 
                      accept=".pdf,image/*" 
                    />
                  </label>
                  <p className="pl-1">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG, JPEG hingga 2MB</p>
              </div>
            </div>
            {errors.dokumen?.ijazah && (
              <p className="mt-1 text-sm text-red-600">{errors.dokumen.ijazah.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SKHUN <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                    <span>Upload file</span>
                    <input 
                      id="dokumen.skhun" 
                      type="file" 
                      {...register('dokumen.skhun')} 
                      className="sr-only" 
                      accept=".pdf,image/*" 
                    />
                  </label>
                  <p className="pl-1">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG, JPEG hingga 2MB</p>
              </div>
            </div>
            {errors.dokumen?.skhun && (
              <p className="mt-1 text-sm text-red-600">{errors.dokumen.skhun.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rapor <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                    <span>Upload file</span>
                    <input 
                      id="dokumen.rapor" 
                      type="file" 
                      {...register('dokumen.rapor')} 
                      className="sr-only" 
                      accept=".pdf,image/*" 
                    />
                  </label>
                  <p className="pl-1">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG, JPEG hingga 5MB</p>
              </div>
            </div>
            {errors.dokumen?.rapor && (
              <p className="mt-1 text-sm text-red-600">{errors.dokumen.rapor.message}</p>
            )}
          </div>
        </div>
      
      {/* Persetujuan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="persetujuan"
              type="checkbox"
              {...register('persetujuan')}
              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="persetujuan" className="font-medium text-gray-700">
              Saya menyetujui <a href="/syarat-ketentuan" className="text-green-600 hover:text-green-500">syarat dan ketentuan</a> yang berlaku <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
        {errors.persetujuan && (
          <p className="mt-1 text-sm text-red-600">{errors.persetujuan.message}</p>
        )}
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
        </button>
      </div>
    </form>
  )
}
```

### 4. Penyimpanan Berkas dengan Cloudinary

```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(file: File, folder: string = 'ppdb'): Promise<string> {
  try {
    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `ma-malnu-kananga/${folder}`,
          resource_type: 'auto',
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
      ).end(buffer)
    })
    
    return (result as any).secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload file to Cloudinary')
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete file from Cloudinary')
  }
}
```

### 5. Database dengan PostgreSQL (Prisma)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model PPDBRegistration {
  id                    String     @id @default(uuid())
  createdAt             DateTime   @default(now())
  updatedAt             DateTime   @updatedAt
  
  // Data Siswa
  namaLengkap           String
  jenisKelamin          String
  tempatLahir           String
  tanggalLahir          DateTime
  nik                   String     @unique
  nisn                  String     @unique
  alamat                String
  kecamatan             String
  kabupaten             String
  provinsi              String
 kodePos               String
  noTelepon             String
  email                 String     @unique
  asalSekolah           String
  alamatSekolah         String
  npsnSekolah           String
  tahunLulus            String
  nilaiIndonesia        Float
  nilaiInggris          Float
  nilaiMatematika       Float
  nilaiIPA              Float
  
  // Data Orang Tua
  namaAyah              String
  nikAyah               String
  pendidikanAyah        String
  pekerjaanAyah         String
  penghasilanAyah       String
  noTeleponAyah         String
  
  namaIbu               String
  nikIbu                String
  pendidikanIbu         String
  pekerjaanIbu          String
  penghasilanIbu        String
  noTeleponIbu          String
  
  // Data Wali (Opsional)
  namaWali              String?
  hubunganWali          String?
  nikWali               String?
  pendidikanWali        String?
  pekerjaanWali         String?
  penghasilanWali       String?
  noTeleponWali         String?
  
  // Pilihan Jurusan
  jurusanPilihan        String
  alasanPilihan         String
  
  // Dokumen (URL dari Cloudinary)
  fotoUrl               String?
  aktaKelahiranUrl      String?
  kartuKeluargaUrl      String?
  ijazahUrl             String?
  skhunUrl              String?
  raporUrl              String?
  
  // Status
  status                String     @default("pending") // pending, approved, rejected
  registrationNumber    String     @unique
  recaptchaScore        Float?
  
  @@index([status])
  @@index([createdAt])
}
```

### 6. Endpoint API Next.js (Route Handlers)

```typescript
// app/api/ppdb/submit/route.ts
import { NextResponse } from 'next/server'
import { ppdbFormSchema } from '@/lib/validation/ppdb'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
 try {
    // Parse form data
    const formData = await request.formData()
    
    // Extract reCAPTCHA token
    const recaptchaToken = formData.get('recaptchaToken') as string
    
    // Verify reCAPTCHA
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: 'POST' }
    )
    
    const recaptchaData = await recaptchaResponse.json()
    
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }
    
    // Extract form data
    const formDataObject: any = {}
    
    // Process simple fields
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('nilaiUN.') || key.startsWith('dokumen.')) {
        continue
      }
      
      if (value instanceof File) {
        continue
      }
      
      formDataObject[key] = value
    }
    
    // Process nested objects
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('nilaiUN.')) {
        const subKey = key.split('.')[1]
        if (!formDataObject.nilaiUN) formDataObject.nilaiUN = {}
        formDataObject.nilaiUN[subKey] = parseFloat(value as string)
      }
    }
    
    // Validate form data
    const validatedData = ppdbFormSchema.parse(formDataObject)
    
    // Upload documents to Cloudinary
    const documentUrls: Record<string, string> = {}
    
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('dokumen.') && value instanceof File) {
        const docKey = key.split('.')[1]
        if (value.size > 0) {
          const url = await uploadToCloudinary(value, 'ppdb-documents')
          documentUrls[docKey] = url
        }
      }
    }
    
    // Generate registration number
    const registrationNumber = `PPDB-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`
    
    // Save to database
    const registration = await prisma.pPDBRegistration.create({
      data: {
        // Data Siswa
        namaLengkap: validatedData.namaLengkap,
        jenisKelamin: validatedData.jenisKelamin,
        tempatLahir: validatedData.tempatLahir,
        tanggalLahir: validatedData.tanggalLahir,
        nik: validatedData.nik,
        nisn: validatedData.nisn,
        alamat: validatedData.alamat,
        kecamatan: validatedData.kecamatan,
        kabupaten: validatedData.kabupaten,
        provinsi: validatedData.provinsi,
        kodePos: validatedData.kodePos,
        noTelepon: validatedData.noTelepon,
        email: validatedData.email,
        asalSekolah: validatedData.asalSekolah,
        alamatSekolah: validatedData.alamatSekolah,
        npsnSekolah: validatedData.npsnSekolah,
        tahunLulus: validatedData.tahunLulus,
        nilaiIndonesia: validatedData.nilaiUN.indonesia,
        nilaiInggris: validatedData.nilaiUN.inggris,
        nilaiMatematika: validatedData.nilaiUN.matematika,
        nilaiIPA: validatedData.nilaiUN.ipa,
        
        // Data Orang Tua
        namaAyah: validatedData.namaAyah,
        nikAyah: validatedData.nikAyah,
        pendidikanAyah: validatedData.pendidikanAyah,
        pekerjaanAyah: validatedData.pekerjaanAyah,
        penghasilanAyah: validatedData.penghasilanAyah,
        noTeleponAyah: validatedData.noTeleponAyah,
        
        namaIbu: validatedData.namaIbu,
        nikIbu: validatedData.nikIbu,
        pendidikanIbu: validatedData.pendidikanIbu,
        pekerjaanIbu: validatedData.pekerjaanIbu,
        penghasilanIbu: validatedData.penghasilanIbu,
        noTeleponIbu: validatedData.noTeleponIbu,
        
        // Data Wali (Opsional)
        namaWali: validatedData.namaWali,
        hubunganWali: validatedData.hubunganWali,
        nikWali: validatedData.nikWali,
        pendidikanWali: validatedData.pendidikanWali,
        pekerjaanWali: validatedData.pekerjaanWali,
        penghasilanWali: validatedData.penghasilanWali,
        noTeleponWali: validatedData.noTeleponWali,
        
        // Pilihan Jurusan
        jurusanPilihan: validatedData.jurusanPilihan,
        alasanPilihan: validatedData.alasanPilihan,
        
        // Dokumen
        fotoUrl: documentUrls.foto,
        aktaKelahiranUrl: documentUrls.aktaKelahiran,
        kartuKeluargaUrl: documentUrls.kartuKeluarga,
        ijazahUrl: documentUrls.ijazah,
        skhunUrl: documentUrls.skhun,
        raporUrl: documentUrls.rapor,
        
        // Metadata
        registrationNumber,
        recaptchaScore: recaptchaData.score,
      },
    })
    
    // Send email notification
    await sendConfirmationEmail(validatedData.email, registrationNumber)
    
    // Send notification to admin
    await sendAdminNotification(validatedData.namaLengkap, registrationNumber)
    
    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil dikirim',
      registrationNumber,
    })
  } catch (error) {
    console.error('PPDB submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to send confirmation email
async function sendConfirmationEmail(email: string, registrationNumber: string) {
  // Implementation for sending email
  // This would use a service like Nodemailer or SendGrid
 console.log(`Sending confirmation email to ${email} for registration ${registrationNumber}`)
}

// Helper function to send admin notification
async function sendAdminNotification(name: string, registrationNumber: string) {
  // Implementation for sending admin notification
  console.log(`Sending admin notification for ${name} with registration ${registrationNumber}`)
}
```

### 7. Dashboard Admin untuk PPDB

```tsx
// app/ppdb/dashboard/page.tsx
import { client } from '@/lib/sanity'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

async function getPPDBRegistrations() {
  // This would fetch from your database instead of Sanity
  // For demonstration purposes, we'll simulate the data
  return [
    {
      id: '1',
      namaLengkap: 'Ahmad Rizki Pratama',
      email: 'ahmad@example.com',
      jurusanPilihan: 'ipa',
      status: 'pending',
      createdAt: new Date(),
      registrationNumber: 'PPDB-2024-123456'
    },
    {
      id: '2',
      namaLengkap: 'Siti Nurhaliza',
      email: 'siti@example.com',
      jurusanPilihan: 'ips',
      status: 'approved',
      createdAt: new Date(Date.now() - 86400000),
      registrationNumber: 'PPDB-2024-123457'
    }
  ]
}

export default async function PPDBDashboard() {
  const registrations = await getPPDBRegistrations()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard PPDB</h1>
          <p className="mt-2 text-gray-600">Kelola pendaftaran siswa baru</p>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Daftar Pendaftar</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. Pendaftaran
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jurusan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Daftar
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((registration) => (
                  <tr key={registration.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {registration.registrationNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {registration.namaLengkap}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {registration.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {registration.jurusanPilihan.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(registration.createdAt), 'dd MMM yyyy', { locale: id })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        registration.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : registration.status === 'rejected' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {registration.status === 'approved' 
                          ? 'Disetujui' 
                          : registration.status === 'rejected' 
                            ? 'Ditolak' 
                            : 'Menunggu'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href={`/ppdb/detail/${registration.id}`} className="text-green-600 hover:text-green-900">
                        Lihat Detail
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Menampilkan <span className="font-medium">1</span> sampai <span className="font-medium">2</span> dari{' '}
                <span className="font-medium">2</span> hasil
              </div>
              <div className="flex space-x-2">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Sebelumnya
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Pendaftar</h3>
                <p className="text-2xl font-bold text-gray-900">150</p>
              </div>
            </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Menunggu Verifikasi</h3>
                <p className="text-2xl font-bold text-gray-900">25</p>
              </div>
            </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Kuota Tersedia</h3>
                <p className="text-2xl font-bold text-gray-900">125</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 8. Email Notifikasi

```typescript
// lib/email.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendConfirmationEmail(to: string, registrationNumber: string) {
  const mailOptions = {
    from: `"MA Malnu Kananga" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Konfirmasi Pendaftaran PPDB MA Malnu Kananga',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0a704d; color: white; padding: 20px; text-align: center;">
          <h1>MA Malnu Kananga</h1>
        </div>
        
        <div style="padding: 20px;">
          <h2>Konfirmasi Pendaftaran PPDB</h2>
          
          <p>Terima kasih telah mendaftar di MA Malnu Kananga. Berikut adalah detail pendaftaran Anda:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>No. Pendaftaran:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${registrationNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Status:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">Menunggu Verifikasi</td>
            </tr>
          </table>
          
          <p>Selanjutnya, tim kami akan melakukan verifikasi terhadap data yang Anda kirimkan. 
          Anda akan menerima notifikasi selanjutnya melalui email ini.</p>
          
          <p>Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami melalui:</p>
          
          <ul>
            <li>Email: ppdb@malnukananga.sch.id</li>
            <li>Telepon: (04XX) XXXXXX</li>
            <li>WhatsApp: 08XX-XXXX-XXXX</li>
          </ul>
          
          <p>Terima kasih,<br/>Tim PPDB MA Malnu Kananga</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>© 2024 MA Malnu Kananga. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Confirmation email sent successfully')
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw new Error('Failed to send confirmation email')
  }
}

export async function sendAdminNotification(name: string, registrationNumber: string) {
  const mailOptions = {
    from: `"MA Malnu Kananga" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: 'Notifikasi Pendaftaran PPDB Baru',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0a704d; color: white; padding: 20px; text-align: center;">
          <h1>MA Malnu Kananga</h1>
        </div>
        
        <div style="padding: 20px;">
          <h2>Pendaftaran PPDB Baru</h2>
          
          <p>Ada pendaftaran baru di sistem PPDB MA Malnu Kananga:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Nama:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>No. Pendaftaran:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${registrationNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tanggal:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString('id-ID')}</td>
            </tr>
          </table>
          
          <p>Silakan login ke dashboard admin untuk melakukan verifikasi data pendaftar.</p>
          
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/ppdb/dashboard" style="background-color: #0a704d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Lihat Dashboard</a></p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Admin notification email sent successfully')
  } catch (error) {
    console.error('Error sending admin notification email:', error)
    throw new Error('Failed to send admin notification email')
  }
}
```

---
*Dokumen ini berisi spesifikasi lengkap untuk fitur PPDB online di MA Malnu Kananga, mencakup form pendaftaran dengan validasi Zod, integrasi reCAPTCHA v3, penyimpanan berkas dengan Cloudinary, penyimpanan data ke database PostgreSQL dengan Prisma, endpoint API Next.js, dan sistem email notifikasi. Fitur ini dirancang untuk memberikan pengalaman pendaftaran yang aman, efisien, dan user-friendly.*