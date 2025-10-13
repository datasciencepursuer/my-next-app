import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'jt0jj464',
  dataset: 'dev',
  apiVersion: '2025-10-13',
  useCdn: false,
  token: 'skB0duv8avU2QjPOpUlpuHWJsvZa3OzhPNwQWLaLPo0rX141GRX9cLzjxWxnYO4S4CJSgVX1Th4EX5vM00XLDx7Hu96bOyy0iLm5beaTmWcSuUZujB1llvBwe5Z3PL750CTs2itPxkjOD6gz5ZdsOWF0RrMzoWIjGZwOoiQigiDhTuPu8iUe',
})

console.log('=== Updating Service Image Position ===\n')

// Find service with order 0
const services = await client.fetch('*[_type == "service"] | order(order asc)')
const serviceOrder0 = services.find(s => s.order === 0)

if (!serviceOrder0) {
  console.log('No service found with order 0')
  process.exit(0)
}

console.log('Found service with order 0:')
console.log(`  Title: ${serviceOrder0.title}`)
console.log(`  Slug: ${serviceOrder0.slug.current}`)
console.log(`  Current adjustments: ${serviceOrder0.adjustments || 'none'}`)
console.log(`  Current backgroundPosition: ${serviceOrder0.backgroundPosition || 'none'}`)
console.log(`  ID: ${serviceOrder0._id}`)

// Update with shifted down position
console.log('\nUpdating image position to shift down...')

const result = await client
  .patch(serviceOrder0._id)
  .set({
    backgroundPosition: 'center 40%',
    adjustments: 'object-center'
  })
  .commit()

console.log('✅ Updated successfully!')
console.log('\nNew settings:')
console.log(`  backgroundPosition: center 40%`)
console.log(`  adjustments: object-center`)
console.log('\nThe image will now be shifted down slightly.')
console.log('Refresh your browser to see the changes.')
