import { createClient } from 'next-sanity'

// Try with token
const clientWithToken = createClient({
  projectId: 'jt0jj464',
  dataset: 'dev',
  apiVersion: '2025-10-13',
  useCdn: false,
  token: 'skB0duv8avU2QjPOpUlpuHWJsvZa3OzhPNwQWLaLPo0rX141GRX9cLzjxWxnYO4S4CJSgVX1Th4EX5vM00XLDx7Hu96bOyy0iLm5beaTmWcSuUZujB1llvBwe5Z3PL750CTs2itPxkjOD6gz5ZdsOWF0RrMzoWIjGZwOoiQigiDhTuPu8iUe',
  perspective: 'published',
})

// Try without token
const clientWithoutToken = createClient({
  projectId: 'jt0jj464',
  dataset: 'dev',
  apiVersion: '2025-10-13',
  useCdn: false,
  perspective: 'published',
})

console.log('=== Testing different client configurations ===\n')

console.log('1. Query WITH token (authenticated):')
const servicesWithToken = await clientWithToken.fetch('*[_type == "service"]')
console.log(`   Found ${servicesWithToken.length} services`)

console.log('\n2. Query WITHOUT token (public):')
const servicesWithoutToken = await clientWithoutToken.fetch('*[_type == "service"]')
console.log(`   Found ${servicesWithoutToken.length} services`)

if (servicesWithToken.length > 0) {
  console.log('\n✓ Services exist when authenticated!')
  console.log('\nServices:')
  servicesWithToken.forEach(s => {
    console.log(`\n- ${s.title}`)
    console.log(`  Slug: ${s.slug?.current || 'N/A'}`)
    console.log(`  ID: ${s._id}`)
  })
} else {
  console.log('\n❌ No services found even with authentication!')
}
