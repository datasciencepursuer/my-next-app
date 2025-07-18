export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GTC Technology Consulting",
    "alternateName": "GTC Tech",
    "description": "Technology consulting firm providing cloud solutions, custom software development, cybersecurity services, and data analytics.",
    "url": "https://gtechnology.ca",
    "logo": "https://gtechnology.ca/logo.png",
    "image": "https://gtechnology.ca/og-image.png",
    "foundingDate": "2020",
    "sameAs": [
      // Add your social media URLs here
      // "https://www.linkedin.com/company/gtc-technology",
      // "https://twitter.com/gtc_tech"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@gtechnology.ca",
      "availableLanguage": ["English"],
      "areaServed": "Worldwide"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Technology Consulting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud Solutions & Digital Transformation",
            "description": "Modernize your business with scalable cloud infrastructure",
            "provider": {
              "@type": "Organization",
              "name": "GTC Technology Consulting"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Software Development",
            "description": "Build tailored software solutions for your business needs",
            "provider": {
              "@type": "Organization",
              "name": "GTC Technology Consulting"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cybersecurity Services",
            "description": "Protect your digital assets with comprehensive security solutions",
            "provider": {
              "@type": "Organization",
              "name": "GTC Technology Consulting"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Data Analytics & Business Intelligence",
            "description": "Transform your data into actionable insights",
            "provider": {
              "@type": "Organization",
              "name": "GTC Technology Consulting"
            }
          }
        }
      ]
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GTC Technology Consulting",
    "alternateName": "GTC Tech",
    "url": "https://gtechnology.ca",
    "description": "Professional technology consulting services including cloud solutions, custom development, cybersecurity, and data analytics",
    "publisher": {
      "@type": "Organization",
      "name": "GTC Technology Consulting"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gtechnology.ca/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const professionalServiceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "GTC Technology Consulting",
    "image": "https://gtechnology.ca/logo.png",
    "description": "Professional technology consulting services specializing in cloud solutions, custom software development, cybersecurity, and data analytics.",
    "url": "https://gtechnology.ca",
    "telephone": "+1-XXX-XXX-XXXX",
    "email": "contact@gtechnology.ca",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.6532",
      "longitude": "-79.3832"
    },
    "areaServed": "Worldwide",
    "serviceType": "Technology Consulting",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceData) }}
      />
    </>
  );
}