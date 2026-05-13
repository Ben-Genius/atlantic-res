import Image from 'next/image'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  image?: string
  icon?: React.ReactNode
  href?: string
  cta?: string
}

export default function ServiceCard({
  title,
  description,
  image,
  icon,
  href = '#',
  cta = 'Learn More',
}: ServiceCardProps) {
  return (
    <div className="group hover-lift">
      <div className="bg-white border border-neutral-warm rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        {icon && !image && (
          <div className="h-16 bg-gradient-to-r from-accent-gold to-accent-rose flex items-center justify-center">
            <div className="text-white text-3xl">{icon}</div>
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-h3 mb-3 text-primary-900">{title}</h3>
          <p className="text-neutral-600 mb-6 flex-grow">{description}</p>
          <Link href={href} className="text-accent-gold font-medium hover:text-accent-rose transition-colors">
            {cta} →
          </Link>
        </div>
      </div>
    </div>
  )
}
