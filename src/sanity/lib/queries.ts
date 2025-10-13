import { groq } from 'next-sanity'

// Query to fetch all services ordered by display order
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    imageUrl,
    adjustments,
    backgroundPosition,
    technologies,
    products,
    process,
    order
  }
`

// Query to fetch a single service by slug
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    imageUrl,
    adjustments,
    backgroundPosition,
    technologies,
    products,
    process,
    order
  }
`

// Query to fetch service slugs for static paths generation
export const serviceSlugsQuery = groq`
  *[_type == "service"] {
    "slug": slug.current
  }
`
