import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production, disable in development
  perspective: 'published', // Only fetch published documents
  stega: {
    enabled: false, // Disable content source maps for better performance
  },
})

// Client for server-side fetching with no CDN (for real-time data)
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_API_TOKEN, // Optional: for draft content access
})
