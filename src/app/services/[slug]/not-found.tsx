import Link from 'next/link'
import MaxWidthWrapper from '@/presentation/components/layout/MaxWidthWrapper'

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <MaxWidthWrapper>
        <div className="text-center py-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Service Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            The service you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/#services"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
