import { randomUUID } from 'crypto'

import { sanityClient } from '@/lib/sanity'
import { documentTypes, type DocumentType, type PpdbSubmissionPayload } from '@/lib/validation/ppdb'

interface UploadedDocument {
  jenis: DocumentType
  assetId: string
  url: string
  fileName: string
}

const decodeBase64 = (value: string) => Buffer.from(value, 'base64')

export async function savePpdbSubmission(payload: PpdbSubmissionPayload) {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error('SANITY_API_TOKEN belum dikonfigurasi. Harap set environment variable terlebih dahulu.')
  }

  const uploadedDocuments: UploadedDocument[] = []

  for (const doc of payload.dokumen) {
    if (!documentTypes.includes(doc.jenis)) {
      continue
    }

    const buffer = decodeBase64(doc.base64)
    const asset = await sanityClient.assets.upload('file', buffer, {
      filename: doc.fileName,
      contentType: doc.type,
    })

    uploadedDocuments.push({
      jenis: doc.jenis,
      assetId: asset._id,
      url: asset.url,
      fileName: doc.fileName,
    })
  }

  const submissionId = `ppdb-${randomUUID()}`
  const submission = {
    _type: 'ppdbSubmission',
    _id: submissionId,
    submittedAt: new Date().toISOString(),
    status: 'baru',
    namaLengkap: payload.namaLengkap,
    jenisKelamin: payload.jenisKelamin,
    tempatLahir: payload.tempatLahir,
    tanggalLahir: payload.tanggalLahir,
    nik: payload.nik,
    nisn: payload.nisn,
    alamat: payload.alamat,
    kecamatan: payload.kecamatan,
    kabupaten: payload.kabupaten,
    provinsi: payload.provinsi,
    kodePos: payload.kodePos,
    noTelepon: payload.noTelepon,
    email: payload.email,
    asalSekolah: payload.asalSekolah,
    alamatSekolah: payload.alamatSekolah,
    npsnSekolah: payload.npsnSekolah,
    tahunLulus: payload.tahunLulus,
    nilaiUN: {
      indonesia: payload.nilaiUN.indonesia,
      inggris: payload.nilaiUN.inggris,
      matematika: payload.nilaiUN.matematika,
      ipa: payload.nilaiUN.ipa,
    },
    namaAyah: payload.namaAyah,
    nikAyah: payload.nikAyah,
    pendidikanAyah: payload.pendidikanAyah,
    pekerjaanAyah: payload.pekerjaanAyah,
    penghasilanAyah: payload.penghasilanAyah,
    noTeleponAyah: payload.noTeleponAyah,
    namaIbu: payload.namaIbu,
    nikIbu: payload.nikIbu,
    pendidikanIbu: payload.pendidikanIbu,
    pekerjaanIbu: payload.pekerjaanIbu,
    penghasilanIbu: payload.penghasilanIbu,
    noTeleponIbu: payload.noTeleponIbu,
    namaWali: payload.namaWali ?? null,
    hubunganWali: payload.hubunganWali ?? null,
    nikWali: payload.nikWali ?? null,
    pendidikanWali: payload.pendidikanWali ?? null,
    pekerjaanWali: payload.pekerjaanWali ?? null,
    penghasilanWali: payload.penghasilanWali ?? null,
    noTeleponWali: payload.noTeleponWali ?? null,
    jurusanPilihan: payload.jurusanPilihan,
    alasanPilihan: payload.alasanPilihan,
    persetujuan: payload.persetujuan,
    dokumen: uploadedDocuments.map((doc) => ({
      _type: 'file',
      _key: doc.assetId,
      jenis: doc.jenis,
      fileName: doc.fileName,
      asset: {
        _type: 'reference',
        _ref: doc.assetId,
      },
    })),
  }

  await sanityClient.create(submission)

  return { id: submissionId, files: uploadedDocuments }
}
