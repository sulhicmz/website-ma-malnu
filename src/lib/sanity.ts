import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Your Sanity.io project configuration
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN || '',
}

// Create the Sanity client
export const sanityClient = createClient(config)

// Create an image URL builder
const builder = imageUrlBuilder(sanityClient)

// Helper function to generate image URLs
export const urlFor = (source: any) => builder.image(source)

// Helper function to generate image URLs with specific dimensions
export const urlForImage = (source: any, width?: number, height?: number) => {
  let image = builder.image(source)
  if (width) image = image.width(width)
  if (height) image = image.height(height)
  return image
}