import { createClient } from 'next-sanity'

const projectId = 'jt0jj464'
const dataset = 'dev'
const apiVersion = '2025-10-13'

console.log('=== Checking All Documents in Dataset ===')
console.log('Project ID:', projectId)
console.log('Dataset:', dataset)
console.log('')

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
})

async function checkAllDocs() {
  try {
    // Get all documents regardless of type
    console.log('--- All Documents (published) ---')
    const allDocs = await client.fetch('*')
    console.log(`Found ${allDocs.length} total documents`)

    if (allDocs.length > 0) {
      console.log('\nDocument types:')
      const types = {}
      allDocs.forEach(doc => {
        types[doc._type] = (types[doc._type] || 0) + 1
      })
      Object.entries(types).forEach(([type, count]) => {
        console.log(`  - ${type}: ${count} document(s)`)
      })

      console.log('\nAll documents:')
      allDocs.forEach((doc, i) => {
        console.log(`\n${i + 1}. Type: ${doc._type}`)
        console.log(`   ID: ${doc._id}`)
        console.log(`   Title: ${doc.title || 'N/A'}`)
      })
    }

    // Check for drafts
    console.log('\n--- Draft Documents ---')
    const drafts = await client.fetch('*[_id in path("drafts.**")]')
    console.log(`Found ${drafts.length} draft documents`)

    if (drafts.length > 0) {
      console.log('\nDraft documents:')
      drafts.forEach((doc, i) => {
        console.log(`\n${i + 1}. Type: ${doc._type}`)
        console.log(`   ID: ${doc._id}`)
        console.log(`   Title: ${doc.title || 'N/A'}`)
        console.log(`   ⚠️  This is a DRAFT - needs to be PUBLISHED`)
      })
    }

    if (allDocs.length === 0 && drafts.length === 0) {
      console.log('\n❌ No documents found in this dataset at all!')
      console.log('\nPossible reasons:')
      console.log('1. Documents were not saved in Sanity Studio')
      console.log('2. You are viewing the wrong dataset')
      console.log('3. There was an error creating documents in Studio')
      console.log('\nNext steps:')
      console.log('1. Go to http://localhost:3000/studio')
      console.log('2. Check which dataset is shown in the Studio (usually top right)')
      console.log('3. Try creating a new service and click PUBLISH')
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error(error)
  }
}

checkAllDocs()
