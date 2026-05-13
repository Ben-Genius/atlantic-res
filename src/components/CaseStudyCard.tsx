import Image from 'next/image'
import Link from 'next/link'

interface CaseStudyCardProps {
  title: string
  description: string
  image: string
  category: 'offshore' | 'corporate' | 'events' | 'institutional'
  slug: string
  challenge?: string
  result?: string
}

export default function CaseStudyCard({
  title,
  description,
  image,
  category,
  slug,
  challenge,
  result,
}: CaseStudyCardProps) {
  const categoryLabels = {
    offshore: 'Offshore',
    corporate: 'Corporate',
    events: 'Events',
    institutional: 'Institutional',
  }

  const categoryColors = {
    offshore: 'bg-blue-100 text-blue-800',
    corporate: 'bg-purple-100 text-purple-800',
    events: 'bg-rose-100 text-rose-800',
    institutional: 'bg-green-100 text-green-800',
  }

  return (
    <Link href={`/portfolio/${slug}`}>
      <div className="group cursor-pointer h-full">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors"></div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Category Badge */}
            <div className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColors[category]}`}>
              {categoryLabels[category]}
            </div>

            <h3 className="text-h3 mb-2 text-primary-900">{title}</h3>
            <p className="text-neutral-600 mb-4 flex-grow">{description}</p>

            {(challenge || result) && (
              <div className="border-t border-neutral-warm pt-4 space-y-2 mb-4">
                {challenge && (
                  <p className="text-sm"><span className="font-semibold text-primary-900">Challenge:</span> {challenge}</p>
                )}
                {result && (
                  <p className="text-sm"><span className="font-semibold text-accent-gold">Result:</span> {result}</p>
                )}
              </div>
            )}

            <span className="text-accent-gold font-medium group-hover:text-accent-rose transition-colors">
              Read Case Study →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
