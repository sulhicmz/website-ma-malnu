import { setupServer } from 'msw/node'
import { http } from 'msw'

// Mock Sanity API responses
export const handlers = [
  // Site settings
  http.get('https://*.api.sanity.io/v2021-06-07/data/query/production', (req, res, ctx) => {
    if (req.url.searchParams.get('query')?.includes('siteSettings')) {
      return res(
        ctx.status(200),
        ctx.json({
          result: {
            title: 'MA Malnu Kananga',
            description: 'Website resmi Madrasah Aliyah Malnu Kananga',
            keywords: ['madrasah', 'aliyah', 'malnu', 'kananga', 'sekolah'],
            logo: {
              asset: {
                _ref: 'image-abc123-1920x1080-jpg',
                _type: 'reference'
              }
            }
          }
        })
      )
    }
    
    if (req.url.searchParams.get('query')?.includes('beritaList')) {
      return res(
        ctx.status(200),
        ctx.json({
          result: [
            {
              _id: 'berita-1',
              title: 'Berita Test 1',
              slug: { current: 'berita-test-1' },
              excerpt: 'Ini adalah excerpt berita test',
              date: '2024-01-01',
              author: { name: 'Admin' },
              image: {
                asset: {
                  _ref: 'image-def456-800x600-jpg',
                  _type: 'reference'
                }
              }
            }
          ]
        })
      )
    }
    
    if (req.url.searchParams.get('query')?.includes('pengumumanList')) {
      return res(
        ctx.status(200),
        ctx.json({
          result: [
            {
              _id: 'pengumuman-1',
              title: 'Pengumuman Test 1',
              slug: { current: 'pengumuman-test-1' },
              excerpt: 'Ini adalah excerpt pengumuman test',
              date: '2024-01-01'
            }
          ]
        })
      )
    }
    
    return res(
      ctx.status(200),
      ctx.json({ result: [] })
    )
  }),

  // PPDB API
  http.post('/api/ppdb', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ 
        success: true, 
        message: 'Pendaftaran berhasil dikirim!' 
      })
    )
  }),

  // RSS API
  http.get('/api/rss', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/rss+xml'),
      ctx.text('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"></rss>')
    )
  })
]

export const server = setupServer(...handlers)