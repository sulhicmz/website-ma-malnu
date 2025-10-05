import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let submissionLimiter: Ratelimit | null = null

const getLimiter = () => {
  if (submissionLimiter) return submissionLimiter
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    return null
  }

  submissionLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    prefix: 'ppdb-submission',
    analytics: true,
  })

  return submissionLimiter
}

export async function enforceSubmissionRateLimit(identifier: string) {
  const limiter = getLimiter()
  if (!limiter) return null

  return limiter.limit(identifier)
}
