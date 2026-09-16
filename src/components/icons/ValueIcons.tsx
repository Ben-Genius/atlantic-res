/**
 * "Our Value Icons" — brand guide p.19. They represent what Atlantic
 * believes in and how it runs its business.
 *
 * Each value carries its own colour in the guide rather than sitting in the
 * green/gold primary palette, so the colours are declared here beside the
 * mark and exported with it.
 */

type IconProps = React.SVGProps<SVGSVGElement>

function Frame({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

/** Commitment — a handshake under a confirmation badge. */
export function IconCommitment(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M4 27l7-4 8 4.5 4-1" />
      <path d="M23 26.5l5-2.5 9 4 7-4" />
      <path d="M19 27.5l4.5 3.5M17 31l4 3M15.5 34.5l3.5 2.5" />
      <path d="M28 24l-4.5 2.5" />
      <path d="M4 27v6l7 4 10-1" />
      <path d="M44 23v7l-7 4-6-2" />
      <circle cx="33" cy="13" r="7.5" />
      <path d="M29.8 13l2.4 2.4 4.4-4.8" />
    </Frame>
  )
}

/** Environmental Stewardship — a seedling and cog held in an open hand. */
export function IconEnvironmentalStewardship(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M24 20V9" />
      <path d="M24 13c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z" />
      <path d="M24 16c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6Z" />
      <path d="M17 20h14l1.6 4.2 3.4 1.4-2.2 3.8 2.2 3.8-3.4 1.4L31 38.8H17l-1.6-4.2L12 33.2l2.2-3.8L12 25.6l3.4-1.4Z" />
      <circle cx="24" cy="29.4" r="4.2" />
      <path d="M6 41.5c3-2.5 6.5-3.5 10-3.5h16c3.5 0 7 1 10 3.5" />
    </Frame>
  )
}

/** Accountability — a clipboard of checked items. */
export function IconAccountability(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M11 9h26v33H11z" />
      <path d="M19 6h10v6H19z" />
      <path d="M17 20l2.5 2.5L24 18" />
      <path d="M17 29l2.5 2.5L24 27" />
      <path d="M17 38l2.5 2.5L24 36" />
      <path d="M28 20.5h5M28 29.5h5M28 38.5h5" />
    </Frame>
  )
}

/** Safety — a tick inside a shield. */
export function IconSafety(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M24 5l16 6v12c0 10.2-6.6 17.8-16 20.5C14.6 40.8 8 33.2 8 23V11Z" />
      <circle cx="24" cy="23" r="9" />
      <path d="M19.8 23l3 3 5.4-6" />
    </Frame>
  )
}

/** Respect — two figures facing each other within a bounding circle. */
export function IconRespect(props: IconProps) {
  return (
    <Frame {...props}>
      <circle cx="24" cy="24" r="19" />
      <circle cx="17.5" cy="20" r="3.6" />
      <circle cx="30.5" cy="20" r="3.6" />
      <path d="M11 33c0-3.6 2.9-6.5 6.5-6.5S24 29.4 24 33" />
      <path d="M24 33c0-3.6 2.9-6.5 6.5-6.5S37 29.4 37 33" />
    </Frame>
  )
}

export interface BrandValue {
  title: string
  colour: string
  Icon: (props: IconProps) => JSX.Element
}

/** The five values, in the order and colours the guide sets out. */
export const BRAND_VALUES: BrandValue[] = [
  { title: 'Commitment', colour: '#E07B24', Icon: IconCommitment },
  { title: 'Environmental Stewardship', colour: '#2E7D32', Icon: IconEnvironmentalStewardship },
  { title: 'Accountability', colour: '#E8628C', Icon: IconAccountability },
  { title: 'Safety', colour: '#1C8A8A', Icon: IconSafety },
  { title: 'Respect', colour: '#123A52', Icon: IconRespect },
]
