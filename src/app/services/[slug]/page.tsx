import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getServiceSlugs } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import MaxWidthWrapper from '@/presentation/components/layout/MaxWidthWrapper'

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths for all services
export async function generateStaticParams() {
  const slugs = await getServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for each service page
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | GTC Technology Consulting',
    }
  }

  return {
    title: `${service.title} | GTC Technology Consulting`,
    description: service.description,
    keywords: service.technologies.join(', '),
    openGraph: {
      title: `${service.title} | GTC`,
      description: service.description,
      url: `https://gtechnology.ca/services/${slug}`,
      type: 'website',
      images: service.imageUrl ? [{ url: service.imageUrl }] : undefined,
    },
    alternates: {
      canonical: `https://gtechnology.ca/services/${slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const imageUrl = service.imageUrl || (service.image ? urlFor(service.image).width(1200).url() : '')

  return (
    <div className="min-h-screen bg-gray-50">
      <MaxWidthWrapper>
        <div className="py-16">
          {/* Header Section */}
          <div className="mb-12">
            <Link
              href="/#services"
              className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              {service.description}
            </p>
          </div>

          {/* Hero Image */}
          {imageUrl && (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-12 shadow-lg">
              <Image
                src={imageUrl}
                alt={service.title}
                fill
                className="object-cover"
                style={{
                  objectPosition: service.backgroundPosition || 'center'
                }}
                priority
              />
            </div>
          )}

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Technologies */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
                Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Products/Services */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Products & Services
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.products.map((product, index) => (
                  <span
                    key={index}
                    className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Implementation Process */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center gap-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Implementation Process
            </h2>
            <div className="space-y-6">
              {service.process.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.step}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Let's discuss how we can help transform your business with {service.title.toLowerCase()}
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
