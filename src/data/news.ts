export type NewsStat = { label: string; value: string }

/** One block of article body copy. Rendered in order by NewsArticle. */
export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }

export type NewsPost = {
  id: string
  title: string
  date: string
  desc: string
  img: string
  category: string
  /** Standfirst on the article page — the teaser, set large. */
  lead: string
  /** Named where a story carries a byline; the feed ignores it. */
  author?: { name: string; role: string }
  /** Full article copy, shown at /news-updates/<id>. */
  body: ArticleBlock[]
  /** Which glyph sits in the panel's badge. */
  icon: 'award' | 'shield' | 'sprout' | 'quote'
  /** The floating card laid over the photograph. */
  metric: {
    label: string
    pill: string
    /** Ring fill, 0–100. */
    ring: number
    ringValue: string
    ringCaption: string
    stats: NewsStat[]
  }
}

export const newsPosts: NewsPost[] = [
  {
    id: 'anniversary',
    title: 'Twelve Years of Atlantic: A Message from Our CEO',
    date: 'Feb 10, 2026',
    desc: 'Twelve years ago, Atlantic Catering was a dream. Today we are a team of over 600 people serving the oil and gas, mining and corporate sectors.',
    img: '/offshore-oil-rig-distance.webp',
    category: 'Milestone',
    lead: 'Twelve years ago, Atlantic Catering was a dream. Today we are a team of over 600 people serving the oil and gas, mining and corporate sectors.',
    author: { name: 'Maud Lindsay-Gamrat', role: 'Co-Founder & CEO' },
    body: [
      {
        type: 'p',
        text: 'Twelve years ago, Atlantic Catering was just a dream, a vision born out of a deep-seated passion for excellence in service and a commitment to making a difference. As I reflect on our journey, I am overwhelmed with a sense of pride and gratitude for how far we have come.',
      },
      {
        type: 'p',
        text: 'What started with five dedicated employees has blossomed into a thriving organisation of over 600 talented and passionate individuals. Together, we have transformed what was once a small catering operation into a leading provider of not only catering but also offshore services, inflight services, ship chandelling, housekeeping, janitorial services and event planning and management.',
      },
      {
        type: 'p',
        text: 'Our journey has been guided by values of quality, reliability, creativity and uniqueness. Over the years, these values have matured and evolved, taking on new meaning in the form of our Atlantic CARES initiative. Today, Commitment, Accountability, Respect, Environmental Stewardship and Safety are not just words but the pillars upon which our future is being built.',
      },
      { type: 'h', text: 'Atlantic CARES' },
      {
        type: 'list',
        items: [
          'Commitment — excellence in all aspects of our business',
          'Accountability — honest, transparent and reliable actions',
          'Respect — dignity for everyone, and for diverse perspectives',
          'Environmental Stewardship — lovers of the earth, champions of sustainability',
          'Safety — a priority for employees, clients and community alike',
        ],
      },
      { type: 'h', text: 'Beyond our own walls' },
      {
        type: 'p',
        text: 'I am particularly proud of the impact we have made beyond the walls of our company. Our work within the oil and gas, mining and corporate sectors in Ghana has not only driven our growth but has also contributed to the development and well-being of the communities we serve.',
      },
      {
        type: 'p',
        text: 'None of this would have been possible without the incredible team at Atlantic Catering. Your dedication, creativity and resilience have been the foundation of our success. To our clients and partners, your trust and support have been our greatest assets.',
      },
      {
        type: 'p',
        text: 'As we celebrate this significant milestone, I am filled with optimism for what lies ahead. The past twelve years have been nothing short of extraordinary and I am confident that our future holds even greater promise. Thank you for being part of this journey.',
      },
      {
        type: 'quote',
        text: "Here's to our past, our present and the exciting future that awaits.",
        cite: 'Maud Lindsay-Gamrat, Co-Founder & CEO',
      },
    ],
    icon: 'quote',
    metric: {
      label: 'Anniversary',
      pill: 'EST. 2014',
      ring: 100,
      ringValue: '12',
      ringCaption: 'YEARS',
      stats: [
        { label: 'AT THE START', value: '5' },
        { label: 'TEAM TODAY', value: '600+' },
        { label: 'SEGMENTS', value: '6' },
      ],
    },
  },
  {
    id: 'certifications',
    title: "Certified to Deliver: Atlantic's Quality, Safety and Compliance Credentials",
    date: 'Jan 20, 2026',
    desc: 'From food safety to environmental management, Atlantic holds the certifications that clients in regulated industries expect.',
    img: '/assets/images/About Us/cert.png',
    category: 'Compliance',
    lead: 'From food safety to environmental management, Atlantic holds the certifications that clients in regulated industries expect.',
    body: [
      {
        type: 'p',
        text: 'Atlantic Catering & Logistics Limited is independently certified by G-CERTI, an IAS/IAF-accredited certification body, against three international management standards.',
      },
      {
        type: 'list',
        items: [
          'ISO 22000:2018 — Food Safety Management',
          'ISO 45001:2018 — Occupational Health and Safety',
          'ISO 14001:2015 — Environmental Management',
        ],
      },
      {
        type: 'p',
        text: 'These cover our contract catering both onshore and offshore, remote site catering, event management, housekeeping services and logistics operations — the full scope of what we run, not a single flagship site.',
      },
      { type: 'h', text: 'Permits and statutory registrations' },
      {
        type: 'list',
        items: [
          'Food Hygiene Permit — Food and Drugs Authority',
          'Fire Certificate — Ghana National Fire Service',
          'Factories, Offices and Shops Act registration',
          'Environmental Permit — Environmental Protection Agency',
          'Business Operating Permit — Ayawaso West Municipal Assembly',
        ],
      },
      {
        type: 'p',
        text: 'Certificates are available on request for tender and pre-qualification purposes.',
      },
    ],
    icon: 'shield',
    metric: {
      label: 'Independently certified',
      pill: 'G-CERTI',
      ring: 100,
      ringValue: '03',
      ringCaption: 'ISO STANDARDS',
      stats: [
        { label: 'FOOD SAFETY', value: '22000' },
        { label: 'HEALTH & SAFETY', value: '45001' },
        { label: 'ENVIRONMENT', value: '14001' },
      ],
    },
  },
  {
    id: 'awards',
    title: "Recognised for Excellence: Atlantic's Awards",
    date: 'Nov 14, 2025',
    desc: '1st in the Tourism & Hospitality Sector and 20th Best Company in the Ghana Club 100 ranking.',
    img: '/images/hero-news.png',
    category: 'Awards',
    lead: '1st in the Tourism & Hospitality Sector and 20th Best Company in the Ghana Club 100 ranking.',
    body: [
      {
        type: 'p',
        text: 'Atlantic was ranked first in the Tourism & Hospitality Sector and 20th overall in the Ghana Club 100 (20th edition), an award presented by the Ghana Investment Promotion Centre.',
      },
      { type: 'h', text: 'Recent recognitions' },
      {
        type: 'list',
        items: [
          'Africa Offshore Catering Company of the Year 2023 — Luxlife Hospitality Awards',
          'National Catering Service of the Year — National Business Honours 2023',
          'Outstanding CEO of the Year, Catering Services — Ghana-West Africa Business Excellence Awards 2023',
          'Excellence in Hospitality Honouree — Ghana Women of the Year Honours 2023, Glitz Africa',
          'Most Respected CEO in Catering — Ghana Industry CEO Awards 2019',
          'Outstanding Female Entrepreneur of the Year in Catering Services — Feminine Ghana Achievement Awards 2016',
        ],
      },
      { type: 'h', text: 'Notable mentions' },
      {
        type: 'list',
        items: [
          'Inducted into the Feminine Ghana Hall of Fame, 2019',
          'Food/Catering & Beverage Award — Forty Under 40, 2017',
          "Featured on CNN's Passion to Portfolio, 2018",
        ],
      },
      {
        type: 'p',
        text: 'Every one of these belongs to the people who cook, serve, drive and clean on our sites — the recognition follows the work, not the other way round.',
      },
    ],
    icon: 'award',
    metric: {
      label: 'Ghana Club 100',
      pill: 'RANKED',
      ring: 100,
      ringValue: '01',
      ringCaption: 'IN HOSPITALITY',
      stats: [
        { label: 'OVERALL', value: '20th' },
        { label: 'SECTOR', value: 'Tourism' },
        { label: 'EDITION', value: '20th' },
      ],
    },
  },
  {
    id: 'sourcing',
    title: 'Responsible Sourcing: How Atlantic Works with Its Suppliers',
    date: 'Sep 04, 2025',
    desc: 'Atlantic is more than a catering company. Fair, sustainable sourcing is part of how we run our business.',
    img: '/appetizers-canapes-spoons.webp',
    category: 'Sourcing',
    lead: 'Atlantic is more than a catering company. Fair, sustainable sourcing is part of how we run our business.',
    body: [
      { type: 'p', text: 'Our commitment to responsible sourcing means three things in practice.' },
      {
        type: 'list',
        items: [
          'An annual Supplier Engagement Forum and quarterly facility checks, to build lasting and sustainable supplier relationships',
          'Sourcing seasonal and organic products wherever the menu allows it',
          'Selecting suppliers through a fair and impartial process',
        ],
      },
      { type: 'h', text: 'Local content' },
      {
        type: 'p',
        text: 'We empower women, children and communities, and foster sustainable growth in line with the Sustainable Development Goals. That work runs through contract and enterprise development, community employment and internships, capacity building, environmental sustainability programmes and the supplier forums themselves.',
      },
      { type: 'h', text: 'Corporate social responsibility' },
      {
        type: 'list',
        items: [
          '5% of revenue directed to charitable causes',
          'Annual health screenings for our 600 staff',
          'Internships for 50 students each year',
          'Used cooking oil repurposed into eco-friendly soap',
          'Training and support for small-scale women farmers and street food vendors',
        ],
      },
    ],
    icon: 'sprout',
    metric: {
      label: 'Supplier programme',
      pill: 'YEAR-ROUND',
      ring: 100,
      ringValue: '04',
      ringCaption: 'CHECKS A YEAR',
      stats: [
        { label: 'FORUM', value: 'Annual' },
        { label: 'PRODUCE', value: 'Seasonal' },
        { label: 'SELECTION', value: 'Impartial' },
      ],
    },
  },
]
