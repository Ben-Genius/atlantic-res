# atlantic-res Project Context

## Stack
- **Framework:** Next.js 14+ (React)
- **Styling:** Tailwind CSS
- **Animations:** GSAP (ScrollTrigger, SplitText, Draggable) — all plugins free
- **Icons:** Lucide or inline SVG
- **Build:** npm run dev / npm run build

## Brand Colors
- **Primary Green:** #1B4332 (deep forest green)
- **Green Hover:** #2D6A4F
- **Green Mid:** #52B788 (for dim/accent use)
- **Gold:** #C8960C (warm antique gold)
- **Gold Light:** #E8B020
- **Background:** #FAFAF8 (warm off-white)
- **Dark Sections:** #1A2330 (deep charcoal)
- **Text:** Dark gray (#0d0d0d)

## Design Language
- **Theme:** Light background, green + gold accents
- **Typography:** Bold, confident headings (serif for display, sans for body)
- **Animation:** Awwwards-level quality, smooth scroll effects
- **Motion:** Scroll-triggered with `scrub: 1`, stagger reveals
- **Spacing:** Generous whitespace, clean layouts

## Folder Structure
```
src/
  components/       # Reusable React components
  pages/           # Next.js pages
  styles/          # Global CSS / CSS modules
  utils/           # Helpers, GSAP configs
public/            # Static assets, fonts, images
```

## Rules for Claude

1. **Always use useGSAP() hook** in React components
2. **Register plugins once** at app root (layout.tsx or main component)
3. **Call ScrollTrigger.refresh()** after layout changes or image loads
4. **Respect prefers-reduced-motion** — wrap animations in gsap.matchMedia()
5. **Single file output** for demos/artifacts — include all CDN links
6. **Deliver production-ready code** — no placeholder or TODOs
7. **Mobile first** — test at 375px, 768px, 1440px
8. **Skip explanations** — just ship the code with proof

## Animation Defaults

- `scrub: 1` (never true)
- Text: `SplitText` + `mask: "lines"` + `yPercent: 110`
- Eases: `power3.out`, `power4.out`
- Once animations: `once: true` in ScrollTrigger
- Stagger: `0.1` or `0.15` between items

## GSAP Setup & Usage

### Installation (already done)
```bash
npm install gsap @gsap/react
```

### Register Plugins (do this ONCE in layout.tsx or app root)
```jsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
```

### Use in Components
```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function MyComponent() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // All animations here are auto-cleaned up on unmount
    gsap.from(".hero-text", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>{/* content */}</div>;
}
```

### Common Patterns
- **Scroll Zoom:** Use `scrollTrigger: { scrub: 1 }` with `scale` property
- **Text Reveals:** Use `SplitText` with `mask: "lines"` + `yPercent: 110`
- **Stagger:** Add `stagger: 0.1` for sequential animations
- **Once:** Add `once: true` to ScrollTrigger for single-fire animations

## Getting Started
- Frontend work → use `/gsap-animations` and `/frontend-style` skills
- Scroll effects → reference the scroll-zoom or parallax patterns
- React components → always use `useGSAP()` hook with scoped selectors
- Call `ScrollTrigger.refresh()` after dynamic layout changes
- Test in browser **before** marking done

## Useful Commands
```bash
npm run dev          # localhost:3000 (with HMR)
npm run build        # production build
npm run lint         # check code
npm run type-check   # TypeScript validation
```

---
**This config is loaded automatically by Claude Code. Mention it if you make changes to stack or design language.**
