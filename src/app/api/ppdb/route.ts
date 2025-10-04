import { NextResponse } from 'next/server'

import { savePpdbSubmission } from '@/lib/ppdb'
import { enforceSubmissionRateLimit } from '@/lib/rate-limit'
import { ppdbSubmissionPayloadSchema } from '@/lib/validation/ppdb'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
    const rateLimit = await enforceSubmissionRateLimit(ip)
    if (rateLimit && !rateLimit.success) {
      const retryAfter = Math.ceil((rateLimit.reset - Date.now()) / 1000)
      return NextResponse.json(
        {
          success: false,
          message: 'Terlalu banyak percobaan. Silakan coba kembali beberapa saat lagi.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.max(retryAfter, 1)),
          },
        },
      )
    }

    const json = await request.json()
    const parsed = ppdbSubmissionPayloadSchema.safeParse(json)

    if (!parsed.success) {
      const errorMessages = parsed.error.issues.map((issue) => issue.message)
      return NextResponse.json(
        { success: false, message: 'Validasi gagal', errors: errorMessages },
        { status: 400 },
      )
    }

    const submission = await savePpdbSubmission(parsed.data)

    return NextResponse.json(
      {
        success: true,
        message: 'Formulir berhasil dikirim. Tim admin akan segera meninjau data Anda.',
        submission,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('PPDB submission error:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi atau hubungi admin.',
      },
      { status: 500 },
    )
  }
}
