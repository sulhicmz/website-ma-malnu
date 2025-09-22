# Spesifikasi Form PPDB Lengkap

## 1. Struktur Data Formulir PPDB

```typescript
// types/ppdb.ts
export interface PPDBFormValues {
  // Data Siswa
  namaLengkap: string;
  jenisKelamin: 'laki-laki' | 'perempuan';
  tempatLahir: string;
  tanggalLahir: Date;
  nik: string;
  nisn: string;
  alamat: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  noTelepon: string;
  email: string;
  asalSekolah: string;
  alamatSekolah: string;
  npsnSekolah: string;
  tahunLulus: string;
  nilaiUN: {
    indonesia: number;
    inggris: number;
    matematika: number;
    ipa: number;
  };
  
  // Data Orang Tua/Wali
  namaAyah: string;
  nikAyah: string;
  pendidikanAyah: string;
  pekerjaanAyah: string;
  penghasilanAyah: string;
  noTeleponAyah: string;
  
  namaIbu: string;
  nikIbu: string;
  pendidikanIbu: string;
  pekerjaanIbu: string;
  penghasilanIbu: string;
  noTeleponIbu: string;
  
  namaWali?: string;
  hubunganWali?: string;
  nikWali?: string;
  pendidikanWali?: string;
  pekerjaanWali?: string;
  penghasilanWali?: string;
  noTeleponWali?: string;
  
  // Pilihan Jurusan
  jurusanPilihan: 'ipa' | 'ips';
  alasanPilihan: string;
  
  // Dokumen
  dokumen: {
    foto: File | null;
    aktaKelahiran: File | null;
    kartuKeluarga: File | null;
    ijazah: File | null;
    skhun: File | null;
    rapor: File | null;
  };
  
  // Persetujuan
  persetujuan: boolean;
}
```

## 2. Validasi dengan Zod

```typescript
// lib/validation/ppdb.ts
import { z } from 'zod';

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
});

export type PPDBFormValues = z.infer<typeof ppdbFormSchema>;
```

## 3. Integrasi reCAPTCHA v3

```tsx
// components/forms/PPDBForm.tsx
'use client'

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ppdbFormSchema, type PPDBFormValues } from '@/lib/validation/ppdb';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function PPDBForm() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
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
  });
  
  // Load reCAPTCHA
  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };
    
    loadRecaptcha();
  }, []);
  
  // Execute reCAPTCHA
  const executeRecaptcha = async () => {
    if (window.grecaptcha) {
      try {
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: 'submit_ppdb' }
        );
        setRecaptchaToken(token);
        return token;
      } catch (error) {
        console.error('reCAPTCHA execution failed:', error);
        return null;
      }
    }
    return null;
  };
  
  const onSubmit = async (data: PPDBFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha();
      if (!token) {
        throw new Error('Failed to execute reCAPTCHA');
      }
      
      // Prepare form data for submission
      const formData = new FormData();
      
      // Append form data
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !(value instanceof File)) {
          if (key === 'nilaiUN') {
            Object.entries(value).forEach(([subKey, subValue]) => {
              formData.append(`nilaiUN.${subKey}`, subValue.toString());
            });
          } else if (key === 'dokumen') {
            Object.entries(value).forEach(([docKey, docValue]) => {
              if (docValue instanceof File) {
                formData.append(`dokumen.${docKey}`, docValue);
              }
            });
          }
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // Append reCAPTCHA token
      formData.append('recaptchaToken', token);
      
      // Submit to API
      const response = await fetch('/api/ppdb/submit', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Handle success
      alert('Pendaftaran berhasil dikirim!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields implementation would go here */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
      </button>
    </form>
  );
}
```

## 4. Penyimpanan Berkas dengan Cloudinary

```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File, folder: string = 'ppdb'): Promise<string> {
  try {
    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
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
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });
    
    return (result as any).secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete file from Cloudinary');
  }
}
```

## 5. Database Schema untuk PostgreSQL/Supabase

```sql
-- PostgreSQL/Supabase Schema
CREATE TABLE ppdb_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Data Siswa
  nama_lengkap VARCHAR(100) NOT NULL,
  jenis_kelamin VARCHAR(20) NOT NULL,
  tempat_lahir VARCHAR(50) NOT NULL,
  tanggal_lahir DATE NOT NULL,
  nik VARCHAR(16) UNIQUE NOT NULL,
  nisn VARCHAR(10) UNIQUE NOT NULL,
  alamat TEXT NOT NULL,
  kecamatan VARCHAR(50) NOT NULL,
  kabupaten VARCHAR(50) NOT NULL,
  provinsi VARCHAR(50) NOT NULL,
  kode_pos VARCHAR(5) NOT NULL,
  no_telepon VARCHAR(15) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  asal_sekolah VARCHAR(100) NOT NULL,
  alamat_sekolah TEXT NOT NULL,
  npsn_sekolah VARCHAR(8) NOT NULL,
  tahun_lulus VARCHAR(4) NOT NULL,
  nilai_indonesia DECIMAL(5,2) NOT NULL,
  nilai_inggris DECIMAL(5,2) NOT NULL,
  nilai_matematika DECIMAL(5,2) NOT NULL,
  nilai_ipa DECIMAL(5,2) NOT NULL,
  
  -- Data Orang Tua
  nama_ayah VARCHAR(100) NOT NULL,
  nik_ayah VARCHAR(16) NOT NULL,
  pendidikan_ayah VARCHAR(50) NOT NULL,
  pekerjaan_ayah VARCHAR(50) NOT NULL,
  penghasilan_ayah VARCHAR(50) NOT NULL,
  no_telepon_ayah VARCHAR(15) NOT NULL,
  
  nama_ibu VARCHAR(100) NOT NULL,
  nik_ibu VARCHAR(16) NOT NULL,
  pendidikan_ibu VARCHAR(50) NOT NULL,
  pekerjaan_ibu VARCHAR(50) NOT NULL,
  penghasilan_ibu VARCHAR(50) NOT NULL,
  no_telepon_ibu VARCHAR(15) NOT NULL,
  
  -- Data Wali (Opsional)
  nama_wali VARCHAR(100),
  hubungan_wali VARCHAR(50),
  nik_wali VARCHAR(16),
  pendidikan_wali VARCHAR(50),
  pekerjaan_wali VARCHAR(50),
  penghasilan_wali VARCHAR(50),
  no_telepon_wali VARCHAR(15),
  
  -- Pilihan Jurusan
  jurusan_pilihan VARCHAR(10) NOT NULL,
  alasan_pilihan TEXT NOT NULL,
  
  -- Dokumen (URL dari Cloudinary)
  foto_url TEXT,
  akta_kelahiran_url TEXT,
  kartu_keluarga_url TEXT,
  ijazah_url TEXT,
  skhun_url TEXT,
  rapor_url TEXT,
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  registration_number VARCHAR(50) UNIQUE NOT NULL,
  recaptcha_score DECIMAL(3,2)
);

-- Indexes
CREATE INDEX idx_ppdb_status ON ppdb_registrations(status);
CREATE INDEX idx_ppdb_created_at ON ppdb_registrations(created_at);
CREATE INDEX idx_ppdb_registration_number ON ppdb_registrations(registration_number);
```

## 6. Endpoint API Next.js (Route Handlers)

```typescript
// app/api/ppdb/submit/route.ts
import { NextResponse } from 'next/server';
import { ppdbFormSchema } from '@/lib/validation/ppdb';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    // Parse form data
    const formData = await request.formData();
    
    // Extract reCAPTCHA token
    const recaptchaToken = formData.get('recaptchaToken') as string;
    
    // Verify reCAPTCHA
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: 'POST' }
    );
    
    const recaptchaData = await recaptchaResponse.json();
    
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }
    
    // Extract form data
    const formDataObject: any = {};
    
    // Process simple fields
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('nilaiUN.') || key.startsWith('dokumen.')) {
        continue;
      }
      
      if (value instanceof File) {
        continue;
      }
      
      formDataObject[key] = value;
    }
    
    // Process nested objects
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('nilaiUN.')) {
        const subKey = key.split('.')[1];
        if (!formDataObject.nilaiUN) formDataObject.nilaiUN = {};
        formDataObject.nilaiUN[subKey] = parseFloat(value as string);
      }
    }
    
    // Validate form data
    const validatedData = ppdbFormSchema.parse(formDataObject);
    
    // Upload documents to Cloudinary
    const documentUrls: Record<string, string> = {};
    
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('dokumen.') && value instanceof File) {
        const docKey = key.split('.')[1];
        if (value.size > 0) {
          const url = await uploadToCloudinary(value, 'ppdb-documents');
          documentUrls[docKey] = url;
        }
      }
    }
    
    // Generate registration number
    const registrationNumber = `PPDB-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
    
    // Save to database
    const { data, error } = await supabase
      .from('ppdb_registrations')
      .insert([
        {
          // Data Siswa
          nama_lengkap: validatedData.namaLengkap,
          jenis_kelamin: validatedData.jenisKelamin,
          tempat_lahir: validatedData.tempatLahir,
          tanggal_lahir: validatedData.tanggalLahir,
          nik: validatedData.nik,
          nisn: validatedData.nisn,
          alamat: validatedData.alamat,
          kecamatan: validatedData.kecamatan,
          kabupaten: validatedData.kabupaten,
          provinsi: validatedData.provinsi,
          kode_pos: validatedData.kodePos,
          no_telepon: validatedData.noTelepon,
          email: validatedData.email,
          asal_sekolah: validatedData.asalSekolah,
          alamat_sekolah: validatedData.alamatSekolah,
          npsn_sekolah: validatedData.npsnSekolah,
          tahun_lulus: validatedData.tahunLulus,
          nilai_indonesia: validatedData.nilaiUN.indonesia,
          nilai_inggris: validatedData.nilaiUN.inggris,
          nilai_matematika: validatedData.nilaiUN.matematika,
          nilai_ipa: validatedData.nilaiUN.ipa,
          
          // Data Orang Tua
          nama_ayah: validatedData.namaAyah,
          nik_ayah: validatedData.nikAyah,
          pendidikan_ayah: validatedData.pendidikanAyah,
          pekerjaan_ayah: validatedData.pekerjaanAyah,
          penghasilan_ayah: validatedData.penghasilanAyah,
          no_telepon_ayah: validatedData.noTeleponAyah,
          
          nama_ibu: validatedData.namaIbu,
          nik_ibu: validatedData.nikIbu,
          pendidikan_ibu: validatedData.pendidikanIbu,
          pekerjaan_ibu: validatedData.pekerjaanIbu,
          penghasilan_ibu: validatedData.penghasilanIbu,
          no_telepon_ibu: validatedData.noTeleponIbu,
          
          // Data Wali (Opsional)
          nama_wali: validatedData.namaWali,
          hubungan_wali: validatedData.hubunganWali,
          nik_wali: validatedData.nikWali,
          pendidikan_wali: validatedData.pendidikanWali,
          pekerjaan_wali: validatedData.pekerjaanWali,
          penghasilan_wali: validatedData.penghasilanWali,
          no_telepon_wali: validatedData.noTeleponWali,
          
          // Pilihan Jurusan
          jurusan_pilihan: validatedData.jurusanPilihan,
          alasan_pilihan: validatedData.alasanPilihan,
          
          // Dokumen
          foto_url: documentUrls.foto,
          akta_kelahiran_url: documentUrls.aktaKelahiran,
          kartu_keluarga_url: documentUrls.kartuKeluarga,
          ijazah_url: documentUrls.ijazah,
          skhun_url: documentUrls.skhun,
          rapor_url: documentUrls.rapor,
          
          // Metadata
          registration_number: registrationNumber,
          recaptcha_score: recaptchaData.score,
        }
      ])
      .select();
    
    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    
    // Send email notification
    await sendConfirmationEmail(validatedData.email, registrationNumber);
    
    // Send notification to admin
    await sendAdminNotification(validatedData.namaLengkap, registrationNumber);
    
    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil dikirim',
      registrationNumber,
    });
  } catch (error) {
    console.error('PPDB submission error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to send confirmation email
async function sendConfirmationEmail(email: string, registrationNumber: string) {
  // Implementation for sending email
  // This would use a service like Nodemailer or SendGrid
  console.log(`Sending confirmation email to ${email} for registration ${registrationNumber}`);
}

// Helper function to send admin notification
async function sendAdminNotification(name: string, registrationNumber: string) {
  // Implementation for sending admin notification
  console.log(`Sending admin notification for ${name} with registration ${registrationNumber}`);
}
```

## 7. Sistem Email Notifikasi

```typescript
// lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email');
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
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully');
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    throw new Error('Failed to send admin notification email');
  }
}
```

## 8. Konfigurasi Environment Variables

```env
# .env.example
# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
ADMIN_EMAIL=admin@malnukananga.sch.id
NEXT_PUBLIC_SITE_URL=https://your-site-url.com
```

## Kesimpulan

Spesifikasi ini mencakup semua komponen yang diperlukan untuk sistem PPDB online yang lengkap dan aman:

1. **Validasi Form dengan Zod** - Validasi kuat di sisi klien dan server
2. **Integrasi reCAPTCHA v3** - Perlindungan terhadap bot dan spam
3. **Penyimpanan Berkas dengan Cloudinary** - Penyimpanan dokumen yang aman dan skalabel
4. **Database dengan PostgreSQL/Supabase** - Penyimpanan data yang andal dengan struktur yang terorganisir
5. **API Endpoint dengan Next.js** - Penanganan permintaan yang efisien dan aman
6. **Sistem Email Notifikasi** - Komunikasi otomatis dengan pendaftar dan admin

Sistem ini dirancang untuk memberikan pengalaman pendaftaran yang aman, efisien, dan user-friendly bagi calon siswa dan tim administrasi sekolah.