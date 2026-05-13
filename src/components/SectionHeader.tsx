interface SectionHeaderProps {
  title: string
  subtitle?: string
  accent?: string
  centered?: boolean
}

export default function SectionHeader({
  title,
  subtitle,
  accent,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {accent && <p className="text-accent mb-2">{accent}</p>}
      <h2 className="text-h2 mb-4 text-primary-900">{title}</h2>
      {subtitle && (
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
