import { Shield, Leaf, Award } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const stats = [
  { value: '10+', label: 'Years Operating' },
  { value: '2',   label: 'FPSOs Served' },
  { value: 'ISO', label: 'Certified Quality' },
  { value: '#1',  label: 'Hospitality GC100' },
]

export const services = [
  {
    tag: '01',
    title: 'Offshore Operations',
    desc: 'Premium nutrition and morale for FPSOs, remote sites, vessels and camp operations. Specialized logistics for the most demanding environments.',
    img: '/images/service-offshore.png',
    href: '/services#offshore',
  },
  {
    tag: '02',
    title: 'Corporate Catering',
    desc: 'Elevate daily corporate dining. Executive catering, board meetings, and large-scale staff feeding for leading companies across Ghana.',
    img: '/images/service-corporate.png',
    href: '/services#corporate',
  },
  {
    tag: '03',
    title: 'Event Management',
    desc: 'Unforgettable culinary moments. Bespoke menus and full coordination for galas, conferences, and private functions.',
    href: '/services#events',
  },
  {
    tag: '04',
    title: 'Institutional Services',
    desc: 'Comprehensive facilities management including housekeeping, laundry, and janitorial services at scale.',
    href: '/services#institutional',
  },
]

export const testimonials = [
  {
    quote: 'Atlantic Catering has been our partner since 2015. Extremely dedicated, reliable, proficient, and most importantly honest.',
    author: 'Peter S. Sadasivan',
    role: 'Country Manager, SMTC',
  },
  {
    quote: 'Executive leadership is very responsive. First-line managers work assiduously to ensure standards are consistently maintained.',
    author: 'Thomas S. Fergus, III',
    role: 'CEO, CTP',
  },
  {
    quote: 'The quality of meals and professionalism of the team has transformed our workplace culture. Highly recommended.',
    author: 'Sarah Mensah',
    role: 'HR Director',
  },
]

export interface Value {
  Icon: LucideIcon
  title: string
  desc: string
}

export const values: Value[] = [
  { Icon: Shield, title: 'ISO Certified',  desc: 'Rigorous quality and safety standards across every operation.' },
  { Icon: Leaf,   title: 'Local First',    desc: 'Wholly Ghanaian company committed to local sourcing and supply chains.' },
  { Icon: Award,  title: 'Award Winning',  desc: 'Recognized #1 in Hospitality & Tourism, Ghana Club 100.' },
]
