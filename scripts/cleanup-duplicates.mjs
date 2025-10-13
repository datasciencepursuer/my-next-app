import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'jt0jj464',
  dataset: 'dev',
  apiVersion: '2025-10-13',
  useCdn: false,
  token: 'skB0duv8avU2QjPOpUlpuHWJsvZa3OzhPNwQWLaLPo0rX141GRX9cLzjxWxnYO4S4CJSgVX1Th4EX5vM00XLDx7Hu96bOyy0iLm5beaTmWcSuUZujB1llvBwe5Z3PL750CTs2itPxkjOD6gz5ZdsOWF0RrMzoWIjGZwOoiQigiDhTuPu8iUe',
})

console.log('=== Cleaning up duplicate services ===\n')

const services = await client.fetch('*[_type == "service"] | order(order asc)')
console.log(`Found ${services.length} total services\n`)

// Group by slug
const bySlug = {}
services.forEach(s => {
  const slug = s.slug?.current || 'no-slug'
  if (!bySlug[slug]) bySlug[slug] = []
  bySlug[slug].push(s)
})

// Keep only the first of each slug, delete the rest
for (const [slug, docs] of Object.entries(bySlug)) {
  if (docs.length > 1) {
    console.log(`\nSlug "${slug}" has ${docs.length} duplicates:`)
    docs.forEach((d, i) => console.log(`  ${i + 1}. ${d.title} (${d._id})`))

    // Keep first, delete others
    const toKeep = docs[0]
    const toDelete = docs.slice(1)

    console.log(`  Keeping: ${toKeep._id}`)
    console.log(`  Deleting: ${toDelete.length} duplicate(s)`)

    for (const doc of toDelete) {
      await client.delete(doc._id)
      console.log(`    ✓ Deleted ${doc._id}`)
    }
  } else {
    console.log(`✓ ${slug}: No duplicates`)
  }
}

// Also delete the "test" service
const testServices = services.filter(s => s.slug?.current === 'test')
if (testServices.length > 0) {
  console.log('\nDeleting test service(s)...')
  for (const test of testServices) {
    await client.delete(test._id)
    console.log(`✓ Deleted test service: ${test._id}`)
  }
}

console.log('\n=== Cleanup complete! ===')

const final = await client.fetch('*[_type == "service"] | order(order asc)')
console.log(`\nFinal count: ${final.length} services`)
final.forEach((s, i) => {
  console.log(`  ${i + 1}. ${s.title} (${s.slug?.current})`)
})
