import { createClient } from 'next-sanity'

// Load environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jt0jj464'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'dev'
const apiVersion = '2025-10-13'

console.log('=== Sanity Connection Test ===')
console.log('Project ID:', projectId)
console.log('Dataset:', dataset)
console.log('API Version:', apiVersion)
console.log('')

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
})

async function testConnection() {
  try {
    console.log('Testing connection to Sanity...')

    // Test 1: Get all documents
    console.log('\n--- Test 1: All documents ---')
    const allDocs = await client.fetch('*[_type == "service"]')
    console.log(`Found ${allDocs.length} service documents`)

    if (allDocs.length > 0) {
      console.log('\nFirst service document:')
      console.log(JSON.stringify(allDocs[0], null, 2))
    }

    // Test 2: Get with full query
    console.log('\n--- Test 2: Full query (as used in app) ---')
    const servicesQuery = `
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
    const services = await client.fetch(servicesQuery)
    console.log(`Query returned ${services.length} services`)

    if (services.length > 0) {
      console.log('\nService titles:')
      services.forEach((service, index) => {
        console.log(`  ${index + 1}. ${service.title} (slug: ${service.slug}, order: ${service.order})`)
      })
    } else {
      console.warn('\n⚠️  No services found!')
      console.warn('Please check:')
      console.warn('  1. Are services created in Sanity Studio?')
      console.warn('  2. Are they PUBLISHED (not just saved as draft)?')
      console.warn('  3. Are you using the correct dataset?')
    }

    // Test 3: Check for drafts
    console.log('\n--- Test 3: Check for draft documents ---')
    const drafts = await client.fetch('*[_type == "service" && _id in path("drafts.**")]')
    console.log(`Found ${drafts.length} draft service documents`)
    if (drafts.length > 0) {
      console.log('Draft titles:')
      drafts.forEach((draft, index) => {
        console.log(`  ${index + 1}. ${draft.title} (DRAFT - needs to be published)`)
      })
    }

  } catch (error) {
    console.error('\n❌ Error testing Sanity connection:')
    console.error(error)
  }
}

testConnection()
