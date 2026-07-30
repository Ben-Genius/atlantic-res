'use client';

import type { Metadata } from 'next';
import { companyInfo } from '@/lib/constants';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  phone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  foundingDate?: string;
  knowsAbout?: string[];
}

export function OrganizationSchema({
  name = 'Atlantic Catering & Logistics',
  url = 'https://atlanticcatering-gh.com',
  logo = 'https://atlanticcatering-gh.com/images/logo.png',
  sameAs = [
    'https://www.linkedin.com/company/atlantic-catering-logistics',
    'https://www.facebook.com/AtlanticCateringGH',
    'https://www.instagram.com/atlanticcateringgh',
  ],
  phone = companyInfo.phone,
  email = companyInfo.email,
  address = {
    streetAddress: '20 Suya Street, East Legon',
    addressLocality: 'Accra',
    addressRegion: 'Greater Accra',
    postalCode: 'GA-374-2184',
    addressCountry: 'GH',
  },
  foundingDate = '2014',
  knowsAbout = [
    'Offshore Catering',
    'Corporate Catering',
    'Event Management',
    'Institutional Catering',
    'Logistics Management',
  ],
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    alternateName: 'Atlantic Catering',
    url,
    logo,
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Twi'],
      areaServed: 'GH',
    },
    email,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    foundingDate,
    knowsAbout,
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'GH',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 30,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
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
    telephone: companyInfo.phone,
    email: companyInfo.email,
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

export function BreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema(services: Array<{
  name: string;
  description: string;
  url: string;
  image?: string;
  areaServed?: string;
  provider?: string;
}>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Catering & Logistics Services',
    provider: {
      '@type': 'Organization',
      name: 'Atlantic Catering & Logistics',
      url: 'https://atlanticcatering-gh.com',
    },
    areaServed: 'Ghana',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catering Services',
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          url: service.url,
          image: service.image,
          provider: {
            '@type': 'Organization',
            name: service.provider || 'Atlantic Catering & Logistics',
          },
          areaServed: service.areaServed || 'Ghana',
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema(faqs: Array<{ question: string; answer: string }>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName?: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image ? [article.image] : [],
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisherName || 'Atlantic Catering & Logistics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://atlanticcatering-gh.com/images/logo.png',
      },
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