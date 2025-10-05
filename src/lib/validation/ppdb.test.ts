import { describe, expect, it } from 'vitest'

import { ppdbSubmissionPayloadSchema } from './ppdb'

const basePayload = {
  namaLengkap: 'Budi Santoso',
  jenisKelamin: 'laki-laki',
  tempatLahir: 'Serang',
  tanggalLahir: '2008-05-12',
  nik: '1234567890123456',
  nisn: '1234567890',
  alamat: 'Jl. Merdeka No. 10 RT 02 RW 03',
  kecamatan: 'Kramatwatu',
  kabupaten: 'Serang',
  provinsi: 'Banten',
  kodePos: '42161',
  noTelepon: '081234567890',
  email: 'budi@example.com',
  asalSekolah: 'MTs Negeri 1 Serang',
  alamatSekolah: 'Jl. Pendidikan No. 5 Serang',
  npsnSekolah: '12345678',
  tahunLulus: '2024',
  nilaiUN: {
    indonesia: 85,
    inggris: 88,
    matematika: 90,
    ipa: 87,
  },
  namaAyah: 'Slamet Santoso',
  nikAyah: '1234567890123456',
  pendidikanAyah: 'Sarjana',
  pekerjaanAyah: 'Pegawai Swasta',
  penghasilanAyah: 'Rp3.000.000 - Rp5.000.000',
  noTeleponAyah: '081234567891',
  namaIbu: 'Siti Aminah',
  nikIbu: '1234567890123457',
  pendidikanIbu: 'SMA/SMK/Sederajat',
  pekerjaanIbu: 'Wiraswasta',
  penghasilanIbu: 'Rp1.000.000 - Rp3.000.000',
  noTeleponIbu: '081234567892',
  namaWali: null,
  hubunganWali: null,
  nikWali: null,
  pendidikanWali: null,
  pekerjaanWali: null,
  penghasilanWali: null,
  noTeleponWali: null,
  jurusanPilihan: 'ipa',
  alasanPilihan: 'Ingin melanjutkan studi kedokteran dan senang dengan sains.',
  persetujuan: true,
  dokumen: [
    {
      jenis: 'foto',
      fileName: 'foto-budi.jpg',
      size: 1024,
      type: 'image/jpeg',
      base64: 'ZHVtaXk=',
    },
  ],
}

describe('ppdbSubmissionPayloadSchema', () => {
  it('validates correct payload', () => {
    const result = ppdbSubmissionPayloadSchema.safeParse(basePayload)
    expect(result.success).toBe(true)
  })

  it('rejects payload without documents', () => {
    const result = ppdbSubmissionPayloadSchema.safeParse({
      ...basePayload,
      dokumen: [],
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Minimal satu dokumen harus diunggah')
    }
  })

  it('rejects payload with invalid nik length', () => {
    const result = ppdbSubmissionPayloadSchema.safeParse({
      ...basePayload,
      nik: '1234',
    })

    expect(result.success).toBe(false)
  })
})
