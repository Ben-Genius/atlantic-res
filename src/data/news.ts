export type NewsStat = { label: string; value: string }

export type NewsPost = {
  id: string
  title: string
  date: string
  desc: string
  img: string
  category: string
  /** Which glyph sits in the panel's badge. */
  icon: 'award' | 'shield' | 'sprout'
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
    id: 'awards',
    title: 'Atlantic Catering & Logistics Wins at Ghana Business Awards',
    date: 'Oct 24, 2023',
    desc: 'Recognition of our commitment to excellence and operational safety in the hospitality sector.',
    img: '/images/hero-burgers.png',
    category: 'Awards',
    icon: 'award',
    metric: {
      label: 'Recognition',
      pill: 'WINNER',
      ring: 100,
      ringValue: '01',
      ringCaption: 'HOSPITALITY',
      stats: [
        { label: 'YEAR', value: '2023' },
        { label: 'CATEGORY', value: 'Catering' },
        { label: 'ENTRIES', value: '120+' },
      ],
    },
  },
  {
    id: 'quality',
    title: 'Achieving ISO 22000:2018 Recertification',
    date: 'Sep 12, 2023',
    desc: 'Maintaining the highest international standards for food safety management across all our sites.',
    img: '/mining-dump-truck.webp',
    category: 'Quality',
    icon: 'shield',
    metric: {
      label: 'Audit result',
      pill: 'PASSED',
      ring: 100,
      ringValue: '100',
      ringCaption: 'CONFORMITY',
      stats: [
        { label: 'STANDARD', value: '22000' },
        { label: 'SITES', value: '14' },
        { label: 'LAPSES', value: '0' },
      ],
    },
  },
  {
    id: 'impact',
    title: 'Empowering Local Farmers: A Sustainability Story',
    date: 'Aug 05, 2023',
    desc: 'How our “Ghana First” policy is transforming rural communities through direct sourcing.',
    img: '/offshore-oil-rig-distance.webp',
    category: 'Impact',
    icon: 'sprout',
    metric: {
      label: 'Local sourcing',
      pill: 'GHANA FIRST',
      ring: 68,
      ringValue: '68%',
      ringCaption: 'BY VOLUME',
      stats: [
        { label: 'FARMS', value: '40' },
        { label: 'REGIONS', value: '5' },
        { label: 'SINCE', value: '2019' },
      ],
    },
  },
]
