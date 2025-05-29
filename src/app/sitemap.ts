import { MetadataRoute } from 'next'
import { projects } from '@/config/projectRoutes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gtechnology.ca'
  
  // Get current date for lastModified
  const currentDate = new Date()
  
  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ]
  
  // Service pages from projectRoutes config
  const servicePages = projects.map((project) => ({
    url: `${baseUrl}/services/${project.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  // Combine all pages
  return [...mainPages, ...servicePages]
}