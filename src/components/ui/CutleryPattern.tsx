/**
 * The corporate cutlery pattern — spoon and fork in a circle — from the
 * brand guide (p.16). The guide calls for it as a subtle background element
 * on business cards, brochures and websites, so it lives here as a tiling
 * SVG rather than the single baked raster that only the footer could use.
 *
 * The four colourways are the ones shared alongside the guide: each primary
 * colour as a solid ground with the mark drawn tone-on-tone, and each drawn
 * as a line on the cream page stock.
 *
 * Renders as a decorative layer: absolutely positioned, non-interactive and
 * hidden from assistive technology. Drop it into any `relative` parent and
 * put the content above it.
 */

export type CutleryColourway = 'green' | 'green-tint' | 'gold' | 'gold-tint'

/** Primary colours per brand guide p.9; cream is the guide's own page stock. */
const GREEN = '#66cc33'
const GOLD = '#cc9933'
const CREAM = '#FAF7EF'

const COLOURWAYS: Record<CutleryColourway, { ground: string; ink: string }> = {
  green: { ground: GREEN, ink: 'rgba(255,255,255,0.30)' },
  'green-tint': { ground: CREAM, ink: 'rgba(102,204,51,0.45)' },
  gold: { ground: GOLD, ink: 'rgba(255,255,255,0.28)' },
  'gold-tint': { ground: CREAM, ink: 'rgba(204,153,51,0.45)' },
}

interface CutleryPatternProps {
  colourway?: CutleryColourway
  /** Tile size in px. Smaller reads denser. */
  scale?: number
  /** Layer opacity. The guide calls for a subtle element, so keep it low. */
  opacity?: number
  className?: string
}

export default function CutleryPattern({
  colourway = 'gold-tint',
  scale = 96,
  opacity = 0.5,
  className = '',
}: CutleryPatternProps) {
  const { ground, ink } = COLOURWAYS[colourway]
  const id = `cutlery-${colourway}-${scale}`

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity }}
    >
      <svg width="100%" height="100%" role="presentation">
        <defs>
          <pattern id={id} width={scale} height={scale} patternUnits="userSpaceOnUse">
            <rect width={scale} height={scale} fill={ground} />
            <g
              transform={`scale(${scale / 96})`}
              fill="none"
              stroke={ink}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Plate — outer edge and inner rim, as drawn in the guide */}
              <circle cx="48" cy="48" r="41" />
              <circle cx="48" cy="48" r="34" />

              {/* Spoon — deep bowl over a handle running to the plate edge */}
              <path d="M37 21c5.4 0 8.4 5.4 8.4 12.4 0 6.2-3.4 10.4-8.4 10.4s-8.4-4.2-8.4-10.4C28.6 26.4 31.6 21 37 21Z" />
              <path d="M34.8 43.4 33.4 74h7.2l-1.4-30.6" />

              {/* Fork — four tines over a neck and matching handle */}
              <path d="M53 22v15M57 22v15M61 22v15M65 22v15" />
              <path d="M53 37h12c0 6.2-2.4 9.4-6 9.4S53 43.2 53 37Z" />
              <path d="M56.8 46.4 55.4 74h7.2l-1.4-27.6" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
