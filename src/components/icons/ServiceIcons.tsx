/**
 * The eight service icons from the Brand Profile (p.14), redrawn as line
 * vectors so they scale and take their colour from the surrounding type.
 *
 * All eight share one 48x48 grid, `fill="none"` and a 1.5 stroke in
 * `currentColor`, so a row of them reads as one set at any size.
 */

type IconProps = React.SVGProps<SVGSVGElement>

function Frame({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
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

/** 24/7 Support Services — headset around a speech bubble reading 24. */
export function IconSupport24(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M9 28v-3a15 15 0 0 1 30 0v3" />
      <path d="M9 25.5h1.5a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
      <path d="M39 25.5h-1.5a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3H39a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z" />
      <circle cx="24" cy="24" r="9.5" />
      <path d="M18.5 31.5 16 36l5.5-2.4" />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="currentColor"
        stroke="none"
        fontFamily="inherit"
      >
        24
      </text>
    </Frame>
  )
}

/** Offshore Catering & Supply — production platform standing in water. */
export function IconOffshore(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M8 24h32v4H8z" />
      <path d="M12 28v9M36 28v9M16 28l4 9M32 28l-4 9" />
      <path d="M28 24 32 9l4 15" />
      <path d="M29.5 18h5" />
      <path d="M12 24v-6h8v6" />
      <path d="M14 18v-3M18 18v-3" />
      <path d="M6 39q3-2.5 6 0t6 0 6 0 6 0 6 0 6 0" />
      <path d="M6 43q3-2.5 6 0t6 0 6 0 6 0 6 0 6 0" />
    </Frame>
  )
}

/** Inflight Catering — aircraft climbing away from the runway. */
export function IconInflight(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M7 27.5l7-2.8-4.5-6.2 3.4-1.2 7.6 5.1 12.2-4.7a3.2 3.2 0 0 1 2.3 6l-11.6 4.9-4 10.2-3.4 1.2.6-9.3-6 1.9Z" />
      <path d="M13 42h22" />
    </Frame>
  )
}

/** Event Planning & Management — dated calendar carrying a confirmation tick. */
export function IconEventPlanning(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M10 14h28v24H10z" />
      <path d="M10 21h28" />
      <path d="M17 14v-4a2.5 2.5 0 1 1 5 0" />
      <path d="M26 14v-4a2.5 2.5 0 1 1 5 0" />
      <circle cx="34" cy="32" r="7.5" fill="none" />
      <path d="M30.5 32l2.5 2.5 4.5-5" />
    </Frame>
  )
}

/** Ship Chandelling — vessel seen bow-on, riding the swell. */
export function IconShipChandelling(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M9 27h30l-4.5 9h-21z" />
      <path d="M13 27v-5h22v5" />
      <path d="M17 22v-4h14v4" />
      <path d="M21.5 18v-4h5v4" />
      <path d="M6 39q3-2.5 6 0t6 0 6 0 6 0 6 0 6 0" />
      <path d="M6 43q3-2.5 6 0t6 0 6 0 6 0 6 0 6 0" />
    </Frame>
  )
}

/** Housekeeping, Laundry & Cleaning — pressed shirt above folded linen. */
export function IconHousekeeping(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M26 16a2.6 2.6 0 1 1 2.6 2.6" />
      <path d="M26 16v2.2" />
      <path d="M20.5 18.5 13 23l3 4.5 3.5-2.2V36h14V25.3l3.5 2.2 3-4.5-7.5-4.5" />
      <path d="M20.5 18.5a3 3 0 0 0 6 0" />
      <path d="M12.5 9.5 14 13.5l4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z" />
      <path d="M9 32h11v4H9zM9 38h11v4H9z" />
    </Frame>
  )
}

/** Camp Management Services — A-frame tent pitched on level ground. */
export function IconCampManagement(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M24 9 41 39H7Z" />
      <path d="M22 9h4" />
      <path d="M18 39 24 22l6 17" />
      <path d="M10.5 34h8l-2.5-4h-3Z" />
      <path d="M7 39h34" />
    </Frame>
  )
}

/** VIP Catering — banded crown. */
export function IconVipCatering(props: IconProps) {
  return (
    <Frame {...props}>
      <path d="M9 31 7 15l9 7 8-11 8 11 9-7-2 16Z" />
      <path d="M9 31h30" />
      <path d="M11 36h26" />
      <path d="M9 31v5M39 31v5" />
    </Frame>
  )
}

/** Keyed by the service id used in the home carousel. */
export const SERVICE_ICONS: Record<number, (props: IconProps) => JSX.Element> = {
  1: IconSupport24,
  2: IconOffshore,
  3: IconInflight,
  4: IconEventPlanning,
  5: IconShipChandelling,
  6: IconHousekeeping,
  7: IconCampManagement,
  8: IconVipCatering,
}
