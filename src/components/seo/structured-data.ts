'use client';

import type { Metadata } from 'next';

export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness' | 'FoodEstablishment' | 'CateringService';
  name: string;
  image: string;
  url: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  priceRange?: string;
  servesCuisine?: string[];
  hasMenu?: string;
  paymentAccepted?: string;
  currenciesAccepted?: string;
  areaServed?: string | string[];
  knownFor?: string[];
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  review?: Array<{
    '@type': 'Review';
    author: { '@type': 'Person'; name: string };
    datePublished: string;
    reviewBody: string;
    reviewRating: { '@type': 'Rating'; ratingValue: number; bestRating: number };
  }>;
}

export function generateLocalBusinessSchema(
  name: string,
  phone: string,
  address: { street: string; city: string; region: string; postalCode: string; country: string }
): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'CateringService',
    name,
    image: 'https://atlanticcatering-gh.com/images/logo.png',
    url: 'https://atlanticcatering-gh.com',
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.6215,
      longitude: -0.1477,
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
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$$',
    servesCuisine: ['Ghanaian', 'Continental', 'International', 'Seafood', 'Grill'],
    hasMenu: 'https://atlanticcatering-gh.com/services',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, Mobile Money',
    currenciesAccepted: 'GHS',
    areaServed: 'Ghana',
    knownFor: ['Offshore Catering', 'ISO 22000 Certified', 'Corporate Catering', 'Event Management'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 127,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  areaServed: string;
  serviceType: string;
  availableChannel?: {
    '@type': 'ServiceChannel';
    serviceUrl: string;
    servicePhone: string;
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  serviceType: string
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Atlantic Catering & Logistics',
      url: 'https://atlanticcatering-gh.com',
    },
    areaServed: 'Ghana',
    serviceType,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://atlanticcatering-gh.com/contact',
      servicePhone: '+233 501 502 441',
    },
  };
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
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
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
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
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  alternateName: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    availableLanguage: string[];
    areaServed: string;
  };
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  foundingDate: string;
  knowsAbout: string[];
  numberOfEmployees: {
    '@type': 'QuantitativeValue';
    minValue: number;
    maxValue: number;
  };
  hasMerchantReturnPolicy: {
    '@type': 'MerchantReturnPolicy';
    applicableCountry: string;
    returnPolicyCategory: string;
    merchantReturnDays: number;
  };
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Atlantic Catering & Logistics',
    alternateName: 'Atlantic Catering',
    url: 'https://atlanticcatering-gh.com',
    logo: 'https://atlanticcatering-gh.com/images/logo.png',
    sameAs: [
      'https://www.linkedin.com/company/atlantic-catering-logistics',
      'https://www.facebook.com/AtlanticCateringGH',
      'https://www.instagram.com/atlanticcateringgh',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+233 501 502 441',
      contactType: 'customer service',
      availableLanguage: ['English', 'Twi'],
      areaServed: 'GH',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '20 Suya Street, East Legon',
      addressLocality: 'Accra',
      addressRegion: 'Greater Accra',
      postalCode: 'GA-374-2184',
      addressCountry: 'GH',
    },
    foundingDate: '2014',
    knowsAbout: [
      'Offshore Catering',
      'Corporate Catering',
      'Event Management',
      'Institutional Catering',
      'Logistics Management',
      'ISO 22000',
      'ISO 14001',
      'ISO 45001',
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 100,
      maxValue: 500,
    },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'GH',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 30,
    },
  };
}