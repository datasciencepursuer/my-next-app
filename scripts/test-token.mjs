import { createClient } from 'next-sanity'

const projectId = 'jt0jj464'
const dataset = 'dev'
const apiVersion = '2025-10-13'
const token = process.env.SANITY_API_TOKEN || 'skB0duv8avU2QjPOpUlpuHWJsvZa3OzhPNwQWLaLPo0rX141GRX9cLzjxWxnYO4S4CJSgVX1Th4EX5vM00XLDx7Hu96bOyy0iLm5beaTmWcSuUZujB1llvBwe5Z3PL750CTs2itPxkjOD6gz5ZdsOWF0RrMzoWIjGZwOoiQigiDhTuPu8iUe'

console.log('=== Testing Sanity API Token ===')
console.log('Project ID:', projectId)
console.log('Dataset:', dataset)
console.log('Token:', token.substring(0, 20) + '...')
console.log('')

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

async function testToken() {
  try {
    // Test 1: Read access
    console.log('Test 1: Testing READ access...')
    const docs = await client.fetch('*[0...1]')
    console.log('✓ READ access OK')

    // Test 2: Try to create a test document
    console.log('\nTest 2: Testing WRITE access...')
    const testDoc = {
      _type: 'service',
      title: 'Test Service from Script',
      slug: { _type: 'slug', current: 'test-service-script' },
      description: 'This is a test service created by the diagnostic script',
      technologies: ['Test'],
      products: ['Test Product'],
      process: [{ step: 'Test', description: 'Test step' }],
      order: 999,
    }

    const result = await client.create(testDoc)
    console.log('✓ WRITE access OK')
    console.log('✓ Created test document:', result._id)

    // Test 3: Verify we can read it back
    console.log('\nTest 3: Verifying created document...')
    const verify = await client.fetch('*[_type == "service" && slug.current == "test-service-script"][0]')
    if (verify) {
      console.log('✓ Document verified:', verify.title)
      console.log('\n✅ Token is working correctly!')
      console.log('\nThe token has both READ and WRITE permissions.')
      console.log('The issue is likely in the Studio frontend.')

      // Clean up
      console.log('\nCleaning up test document...')
      await client.delete(verify._id)
      console.log('✓ Test document deleted')
    }

  } catch (error) {
    console.error('\n❌ Token test failed:')
    console.error('Error:', error.message)

    if (error.message.includes('Insufficient permissions')) {
      console.error('\n⚠️  Your token does not have write permissions!')
      console.error('You need to create a new token with "Editor" or "Administrator" role.')
    } else if (error.message.includes('unauthorized')) {
      console.error('\n⚠️  Your token is invalid or expired!')
      console.error('Create a new token at: https://sanity.io/manage')
    }
  }
}

testToken()
