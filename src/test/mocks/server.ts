import { setupServer } from 'msw/node'
import { rest } from 'msw'

// Mock data
const mockSiteSettings = {
  title: 'MA Malnu Kananga',
  description: 'Website resmi MA Malnu Kananga',
  logo: {
    asset: {
      _ref: 'image-abc123-1920x1080-jpg',
      _type: 'reference'
    }
  }
}

const mockNews = [
  {
    _id: 'news-1',
    title: 'Berita Penting',
    slug: { current: 'berita-penting' },
    excerpt: 'Ini adalah berita penting',
    publishedAt: '2024-01-01T00:00:00Z',
    author: { name: 'Admin' },
    categories: [{ title: 'Umum' }]
  }
]

const mockTeachers = [
  {
    _id: 'teacher-1',
    name: 'John Doe',
    subjects: ['Matematika'],
    photo: {
      asset: {
        _ref: 'image-def456-300x300-jpg',
        _type: 'reference'
      }
    }
  }
]

// API handlers
export const handlers = [
  // Site settings
  rest.get('https://api.sanity.io/v2021-06-07/data/query/production', (req, res, ctx) => {
    const query = req.url.searchParams.get('query')
    
    if (query?.includes('*[_type == "siteSettings"]')) {
      return res(
        ctx.status(200),
        ctx.json({
          result: mockSiteSettings
        })
      )
    }
    
    if (query?.includes('*[_type == "news"]')) {
      return res(
        ctx.status(200),
        ctx.json({
          result: mockNews
        })
      )
    }
    
    if (query?.includes('*[_type == "teacher"]')) {
      return res(
        ctx.status(200),
        ctx.json({
          result: mockTeachers
        })
      )
    }
    
    return res(
      ctx.status(200),
      ctx.json({ result: [] })
    )
  }),
  
  // Error handler
  rest.get('*', (req, res, ctx) => {
    console.error(`Unhandled request: ${req.method} ${req.url}`)
    return res(
      ctx.status(404),
      ctx.json({ error: 'Not Found' })
    )
  }),
]

// Setup server
export const server = setupServer(...handlers)