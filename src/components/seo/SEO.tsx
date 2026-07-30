'use client';

import { generateOrganizationSchema, generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from './structured-data';

interface SEOProps {
  breadcrumbs?: Array<{ name: string; url: string }>;
  services?: Array<{ name: string; description: string; url: string; image?: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  article?: {
    headline: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    authorName: string;
    url: string;
  };
  localBusiness?: boolean;
}

export function SEO({
  breadcrumbs,
  services,
  faqs,
  article,
  localBusiness = false,
}: SEOProps) {
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <WebSiteSchema />
      {localBusiness && <LocalBusinessSchema />}
      {breadcrumbs && breadcrumbs.length > 0 && <BreadcrumbSchema items={breadcrumbs} />}
      {services && services.length > 0 && <ServiceSchema services={services} />}
      {faqs && faqs.length > 0 && <FAQSchema faqs={faqs} />}
      {article && <ArticleSchema article={article} />}
    </>
  );
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Atlantic Catering & Logistics',
    url: 'https://atlanticcatering-gh.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://atlanticcatering-gh.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Atlantic Catering & Logistics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://atlanticcatering-gh.com/images/logo.png',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FoodService'],
    name: 'Atlantic Catering & Logistics',
    description: 'ISO-certified catering and logistics for offshore operations, corporate clients, and premium events across Ghana. Established 2014.',
    url: 'https://atlanticcatering-gh.com',
    telephone: '+233 501 502 441',
    email: 'info@atlanticcatering-gh.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '20 Suya Street, East Legon',
      addressLocality: 'Accra',
      addressRegion: 'Greater Accra',
      postalCode: 'GA-374-2184',
      addressCountry: 'GH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.621454,
      longitude: -0.147729,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$$',
    currenciesAccepted: 'GHS',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, Mobile Money',
    areaServed: {
      '@type': 'Country',
      name: 'Ghana',
    },
    hasMap: 'https://www.google.com/maps/place/Atlantic+Catering+%26+Logistics/@5.621454,-0.147729,17z/',
    knowsAbout: [
      'Offshore Catering',
      'Corporate Catering',
      'Event Management',
      'Institutional Catering',
      'Logistics Management',
    ],
    sameAs: [
      'https://www.linkedin.com/company/atlantic-catering-logistics',
      'https://www.facebook.com/AtlanticCateringGH',
      'https://www.instagram.com/atlanticcateringgh',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Kwame Asante',
        },
        datePublished: '2024-01-15',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        description: 'Exceptional offshore catering services. Professional team and high-quality meals.',
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Ama Serwaa',
        },
        datePublished: '2024-02-20',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        description: 'Best corporate catering in Accra. Reliable and delicious every time.',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = generateBreadcrumbSchema(items);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ServiceSchema({ services }: { services: Array<{ name: string; description: string; url: string; image?: string }> }) {
  const schemas = services.map((s, i) =>
    generateServiceSchema(s.name, s.description, s.url)
  );
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = generateFAQSchema(faqs);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleSchema({ article }: { article: { headline: string; description: string; image?: string; datePublished: string; dateModified?: string; authorName: string; url: string } }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Atlantic Catering & Logistics',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}