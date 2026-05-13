import Image from 'next/image'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  author: string
  title: string
  company: string
  image?: string
  rating?: number
}

export default function TestimonialCard({
  quote,
  author,
  title,
  company,
  image,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="bg-neutral-cream rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-lg text-primary-900 mb-6 italic">"{quote}"</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        {image && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={author}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-serif font-bold text-primary-900">{author}</p>
          <p className="text-sm text-neutral-600">{title}</p>
          <p className="text-sm text-accent-gold">{company}</p>
        </div>
      </div>
    </div>
  )
}
