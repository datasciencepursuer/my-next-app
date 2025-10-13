import { createClient } from 'next-sanity'

const projectId = 'jt0jj464'
const dataset = 'dev'
const apiVersion = '2025-10-13'
const token = 'skB0duv8avU2QjPOpUlpuHWJsvZa3OzhPNwQWLaLPo0rX141GRX9cLzjxWxnYO4S4CJSgVX1Th4EX5vM00XLDx7Hu96bOyy0iLm5beaTmWcSuUZujB1llvBwe5Z3PL750CTs2itPxkjOD6gz5ZdsOWF0RrMzoWIjGZwOoiQigiDhTuPu8iUe'

console.log('=== Creating Test Services ===')
console.log('Project ID:', projectId)
console.log('Dataset:', dataset)
console.log('')

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

const testServices = [
  {
    _type: 'service',
    title: 'Cloud Solutions & Digital Transformation',
    slug: { _type: 'slug', current: 'cloud-solutions' },
    description: 'Modernize your business with scalable cloud infrastructure and digital transformation solutions that drive innovation and growth.',
    imageUrl: 'https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmTEpv4zfSCPRDuYWvyrF4cotp7a8xf0gkU2X1',
    adjustments: 'object-center',
    backgroundPosition: 'center 35%',
    technologies: ['n8n', 'Microsoft Azure', 'Amazon Web Service', 'Google Cloud Platform'],
    products: ['Automation and AI Agent', 'Cloud Storage', 'Cloud Computing'],
    process: [
      { step: 'Assessment', description: 'Evaluate infrastructure and migration requirements' },
      { step: 'Strategy', description: 'Create migration plan' },
      { step: 'Migration', description: 'Migrate to cloud' }
    ],
    order: 0
  },
  {
    _type: 'service',
    title: 'Custom Software Development',
    slug: { _type: 'slug', current: 'custom-development' },
    description: 'Build tailored software solutions that perfectly align with your business needs and enhance operational efficiency.',
    imageUrl: 'https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmB18LqFYSwM3FWZlGYLbQmJyS1tXhnNoBEur5',
    adjustments: 'object-center',
    technologies: ['Python', 'Node.JS', 'React', 'Next JS'],
    products: ['Web Development', 'Solutions Discovery', 'Custom Applications & Integrations'],
    process: [
      { step: 'Analysis', description: 'Gathering requirements' },
      { step: 'Design', description: 'Solution exploration and architectural design' },
      { step: 'Development', description: 'Iterative implementation' }
    ],
    order: 1
  },
  {
    _type: 'service',
    title: 'Cybersecurity Services',
    slug: { _type: 'slug', current: 'cyber-security' },
    description: 'Protect your digital assets with comprehensive security solutions and proactive threat management.',
    imageUrl: 'https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmglWmBZUQk4VeBypsFOxH7dPYcWo6mXru9wiE',
    adjustments: 'object-center',
    technologies: ['SIEM', 'EDR', 'IAM', 'Encryption', 'Pen Testing'],
    products: ['Risk Assessment', 'Penetration Testing', 'Incident Response & Forensics', 'Cybersecurity Training'],
    process: [
      { step: 'Assessment', description: 'Security evaluation' },
      { step: 'Strategy', description: 'Security improvement roadmap' },
      { step: 'Implementation', description: 'Deploy security controls' }
    ],
    order: 2
  },
  {
    _type: 'service',
    title: 'Data Analytics & Business Intelligence',
    slug: { _type: 'slug', current: 'data-analytics' },
    description: 'Transform your data into actionable insights with advanced analytics and business intelligence solutions.',
    imageUrl: 'https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmrai6EReJaQvPlRUsw4ZYicMuObIrVHgXepGA',
    adjustments: 'object-center',
    technologies: ['SQL', 'NoSQL', 'Power BI', 'Tableau', 'JQL'],
    products: ['Custom Reports', 'ETL', 'Data Cleaning', 'Data Infrastructure Setup', 'Statistical Analysis & Modeling'],
    process: [
      { step: 'Analysis', description: 'Data source evaluation' },
      { step: 'Pipeline', description: 'Build data infrastructure' },
      { step: 'Insights', description: 'Generate business intelligence' }
    ],
    order: 3
  }
]

async function createServices() {
  try {
    console.log('Creating services...\n')

    for (const service of testServices) {
      console.log(`Creating: ${service.title}`)
      const result = await client.create(service)
      console.log(`✓ Created with ID: ${result._id}`)
    }

    console.log('\n✅ All services created successfully!')
    console.log('\nVerifying...')

    const verify = await client.fetch('*[_type == "service"] | order(order asc)')
    console.log(`\nFound ${verify.length} services:`)
    verify.forEach((s, i) => {
      console.log(`  ${i + 1}. ${s.title} (slug: ${s.slug.current})`)
    })

    console.log('\n🎉 Done! Now refresh your website at http://localhost:3000')
    console.log('The services should appear on the homepage.')

  } catch (error) {
    console.error('\n❌ Error creating services:')
    console.error(error.message)
  }
}

createServices()
