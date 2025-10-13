import { client, serverClient } from './client'
import { servicesQuery, serviceBySlugQuery, serviceSlugsQuery } from './queries'
import { Service, ServiceDetails } from '@/shared/types'
import { urlFor } from './image'

export interface SanityService {
  _id: string
  title: string
  slug: string
  description: string
  image?: any
  imageUrl?: string
  adjustments?: string
  backgroundPosition?: string
  technologies: string[]
  products: string[]
  process: Array<{
    step: string
    description: string
  }>
  order: number
}

/**
 * Fetch all services from Sanity
 * @param revalidate - Optional revalidation time in seconds (default: 3600 = 1 hour)
 */
export async function getServices(revalidate: number = 3600): Promise<Service[]> {
  try {
    console.log('[Sanity] Fetching services from dataset...')
    // Use serverClient with token for authenticated access
    const services = await serverClient.fetch<SanityService[]>(servicesQuery, {}, {
      next: { revalidate, tags: ['services'] }
    })

    console.log(`[Sanity] Found ${services?.length || 0} services`)

    if (!services || services.length === 0) {
      console.warn('[Sanity] No services found in dataset')
      return []
    }

    const mappedServices = services.map((service) => ({
      id: service.slug,
      title: service.title,
      description: service.description,
      image: service.imageUrl || (service.image ? urlFor(service.image).width(1600).url() : ''),
      path: `/services/${service.slug}`,
      adjustments: service.adjustments || 'object-center',
      backgroundPosition: service.backgroundPosition,
    }))

    // Deduplicate by id (slug) just in case
    const uniqueServices = mappedServices.reduce((acc, service) => {
      if (!acc.find(s => s.id === service.id)) {
        acc.push(service)
      }
      return acc
    }, [] as Service[])

    console.log('[Sanity] Services mapped successfully:', uniqueServices.map(s => s.title))
    if (mappedServices.length !== uniqueServices.length) {
      console.warn(`[Sanity] Removed ${mappedServices.length - uniqueServices.length} duplicate(s)`)
    }
    return uniqueServices
  } catch (error) {
    console.error('[Sanity] Error fetching services:', error)
    return []
  }
}

/**
 * Fetch a single service by slug
 */
export async function getServiceBySlug(slug: string, revalidate: number = 3600): Promise<SanityService | null> {
  return await serverClient.fetch<SanityService | null>(
    serviceBySlugQuery,
    { slug },
    { next: { revalidate, tags: [`service-${slug}`] } }
  )
}

/**
 * Get service details data formatted for the current components
 */
export async function getServiceDetailsData(revalidate: number = 3600): Promise<Record<string, ServiceDetails>> {
  try {
    console.log('[Sanity] Fetching service details from dataset...')
    const services = await serverClient.fetch<SanityService[]>(servicesQuery, {}, {
      next: { revalidate, tags: ['services'] }
    })

    if (!services || services.length === 0) {
      console.warn('[Sanity] No service details found in dataset')
      return {}
    }

    const detailsMap: Record<string, ServiceDetails> = {}

    services.forEach((service) => {
      detailsMap[service.slug] = {
        title: service.title,
        technologies: service.technologies,
        products: service.products,
        process: service.process,
      }
    })

    console.log('[Sanity] Service details mapped for slugs:', Object.keys(detailsMap))
    return detailsMap
  } catch (error) {
    console.error('[Sanity] Error fetching service details:', error)
    return {}
  }
}

/**
 * Get all service slugs for static path generation
 */
export async function getServiceSlugs(): Promise<string[]> {
  const slugs = await serverClient.fetch<Array<{ slug: string }>>(serviceSlugsQuery)
  return slugs.map((s) => s.slug)
}
