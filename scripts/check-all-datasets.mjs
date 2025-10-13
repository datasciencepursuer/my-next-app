import { createClient } from 'next-sanity'

const projectId = 'jt0jj464'
const apiVersion = '2025-10-13'

console.log('=== Checking All Sanity Datasets ===\n')

const datasets = ['dev', 'development', 'production', 'test']

for (const dataset of datasets) {
  console.log(`\n--- Dataset: ${dataset} ---`)

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'published',
  })

  try {
    const services = await client.fetch('*[_type == "service"]')
    console.log(`✓ Found ${services.length} published services`)

    if (services.length > 0) {
      services.forEach(s => console.log(`  - ${s.title}`))
    }

    const drafts = await client.fetch('*[_type == "service" && _id in path("drafts.**")]')
    console.log(`✓ Found ${drafts.length} draft services`)

    if (drafts.length > 0) {
      drafts.forEach(d => console.log(`  - ${d.title} (DRAFT)`))
    }
  } catch (error) {
    console.log(`✗ Error accessing dataset: ${error.message}`)
  }
}

console.log('\n=== Summary ===')
console.log('If you see services in a different dataset than "dev",')
console.log('either update your .env.local file or move the content to "dev".')
