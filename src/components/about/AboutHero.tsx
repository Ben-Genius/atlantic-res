import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SlideItem {
  id: string;
  index: string;
  category: string;
  locationBadge: string;
  title: string;
  statLabel: string;
  statValue: string;
  secondaryLabel: string;
  secondaryValue: string;
  primaryImage: string;
  fallbackImage: string;
  accentColor: string;
}

// 6 strategic pillars for Atlantic Catering & Logistics
const SLIDES: SlideItem[] = [
  {
    id: 'offshore',
    index: '01',
    category: 'Offshore Catering & Marine Chandelling',
    locationBadge: 'FPSO Kwame Nkrumah MV21 • Jubilee Field',
    title: "Feeding Ghana's Offshore Crews",
    statLabel: 'DAILY PRODUCTION',
    statValue: '6,000+ Meals/Day',
    secondaryLabel: 'COMPLIANCE',
    secondaryValue: 'ISO 22000 & HACCP',
    primaryImage: '/assets/images/About%20Us/AboutUsHero/offshore-rig.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2600&q=80',
    accentColor: '#10B981',
  },
  {
    id: 'catering-kitchen',
    index: '02',
    category: 'Industrial Kitchens & Food Safety',
    locationBadge: 'Central Production Kitchens • Ghana',
    title: '6,000 Meals. Every Day.',
    statLabel: 'DAILY PRODUCTION',
    statValue: '6,000+ Meals/Day',
    secondaryLabel: 'COMPLIANCE',
    secondaryValue: 'ISO 22000 & HACCP',
    primaryImage: '/assets/images/About%20Us/AboutUsHero/commercial-kitchen.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2600&q=80',
    accentColor: '#10B981',
  },
  {
    id: 'camp-management',
    index: '03',
    category: '360° Remote Camp Management',
    locationBadge: '15 Remote Sites • 6 Regions in Ghana',
    title: 'Remote Sites, Fully Managed',
    statLabel: 'FOOTPRINT',
    statValue: 'Gold & Mineral Sites',
    secondaryLabel: 'FACILITIES',
    secondaryValue: 'Housekeeping, Laundry & Pest Control',
    primaryImage: '/assets/images/About%20Us/AboutUsHero/mining-site.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2600&q=80',
    accentColor: '#F59E0B',
  },
  {
    id: 'cold-chain',
    index: '04',
    category: 'Cold-Chain & Heavy Fleet Logistics',
    locationBadge: 'DNV Certified Maritime Reefer Fleet',
    title: 'Cold Chain, Unbroken',
    statLabel: 'FLEET ASSETS',
    statValue: '28ft Mobile Trailers',
    secondaryLabel: 'DISTRIBUTION',
    secondaryValue: '2 Cold Warehouses',
    primaryImage: '/assets/images/About%20Us/AboutUsHero/Branded%20Port%20Logistics%20Operations.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2600&q=80',
    accentColor: '#38BDF8',
  },
  {
    id: 'vip-banqueting',
    index: '05',
    category: 'VIP Banqueting & Inflight Hospitality',
    locationBadge: 'Executive Charters & Diplomatic Galas',
    title: 'Hospitality at Every Altitude',
    statLabel: 'EVENTS',
    statValue: '200+ Galas Annually',
    secondaryLabel: 'CULINARY BRIGADE',
    secondaryValue: '440+ Professional Chefs',
    primaryImage: '/assets/images/About%20Us/AboutUsHero/Atlantic%20Maritime%20Operations%20Center.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=2600&q=80',
    accentColor: '#FB7185',
  },
  {
    id: 'people-cares',
    index: '06',
    category: 'Atlantic C.A.R.E.S. & Local Content',
    locationBadge: '98% Ghanaian Workforce • GC100 (#20)',
    title: '600 Strong. 98% Ghanaian.',
    statLabel: 'WORKFORCE',
    statValue: '600+ Full-Time Staff',
    secondaryLabel: 'SUSTAINABILITY',
    secondaryValue: 'Recycled Soap & Zero Waste',
    primaryImage: '/assets/images/About%20Us/AboutUsHero/Atlantic%20Catering%20%26%20Logistics%20at%20Sunrise.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=2600&q=80',
    accentColor: '#34D399',
  },
];

export default function AboutHero() {
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const pinContainerRef = useRef<HTMLElement | null>(null);

  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const scrollTriggerInstanceRef = useRef<any>(null);

  useEffect(() => {
    initScrollAnimation();

    return () => {
      if (scrollTriggerInstanceRef.current) {
        scrollTriggerInstanceRef.current.kill();
      }
    };
  }, []);

  const initScrollAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);
    // Mobile address-bar show/hide fires resize; don't re-pin on it
    ScrollTrigger.config({ ignoreMobileResize: true });

    const outerWrappers = outerRefs.current.filter(Boolean);
    const innerWrappers = innerRefs.current.filter(Boolean);
    const bgLayers = bgRefs.current.filter(Boolean);
    const titles = titleRefs.current.filter(Boolean);

    if (!scrollTrackRef.current || !pinContainerRef.current) return;

    // Clean up any existing trigger
    if (scrollTriggerInstanceRef.current) {
      scrollTriggerInstanceRef.current.kill();
    }

    // Set initial position: slide 0 is visible, subsequent slides are hidden below fold
    for (let i = 1; i < SLIDES.length; i++) {
      if (outerWrappers[i]) gsap.set(outerWrappers[i], { yPercent: 100 });
      if (innerWrappers[i]) gsap.set(innerWrappers[i], { yPercent: -100 });
      if (bgLayers[i]) gsap.set(bgLayers[i], { yPercent: 15 });
      if (titles[i]) gsap.set(titles[i], { autoAlpha: 0, y: 35 });
    }

    // Create scrubbed master timeline with snapping between slides
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: scrollTrackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinContainerRef.current,
        scrub: 0.8,
        snap: {
          snapTo: 1 / (SLIDES.length - 1),
          directional: false,
          duration: { min: 0.25, max: 0.65 },
          ease: 'power2.inOut',
        },
        onUpdate: (self: any) => {
          const rawIndex = self.progress * (SLIDES.length - 1);
          const currentIdx = Math.min(
            SLIDES.length - 1,
            Math.max(0, Math.round(rawIndex))
          );
          setActiveSlide(currentIdx);
        },
      },
    });

    scrollTriggerInstanceRef.current = tl.scrollTrigger;

    // Add sequential curtain reveals for slides 1 through 4
    for (let i = 1; i < SLIDES.length; i++) {
      const stepTime = i - 1;

      // Incoming slide curtain moves in
      tl.fromTo(
        outerWrappers[i],
        { yPercent: 100 },
        { yPercent: 0, ease: 'power2.inOut', duration: 1 },
        stepTime
      )
        .fromTo(
          innerWrappers[i],
          { yPercent: -100 },
          { yPercent: 0, ease: 'power2.inOut', duration: 1 },
          stepTime
        )
        .fromTo(
          bgLayers[i],
          { yPercent: 15 },
          { yPercent: 0, ease: 'power2.inOut', duration: 1 },
          stepTime
        )
        // Outgoing background subtly moves back
        .to(
          bgLayers[i - 1],
          { yPercent: -15, ease: 'power2.inOut', duration: 1 },
          stepTime
        )
        // Title animation
        .fromTo(
          titles[i],
          { autoAlpha: 0, y: 35 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          stepTime + 0.3
        );
    }
  };

  const handleDotClick = (targetIndex: number) => {
    if (!scrollTrackRef.current) return;
    const totalScrollableDistance =
      scrollTrackRef.current.offsetHeight - window.innerHeight;
    const startOffset = scrollTrackRef.current.offsetTop;
    const targetScrollY =
      startOffset + (targetIndex / (SLIDES.length - 1)) * totalScrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    // Outer scroll track: height gives room to scroll naturally through all 5 slides
    <div
      ref={scrollTrackRef}
      className="relative w-full"
      style={{ height: `${SLIDES.length * 100}vh` }}
    >
      {/* Pinned Viewport Container: Stays locked at top while scrolling */}
      <section
        ref={pinContainerRef}
        className="w-full h-screen overflow-hidden bg-[#060D0A] text-white font-sans select-none"
        aria-label="Atlantic Catering & Logistics About Us Hero"
      >
        {/* 5 Stacked Slide Layers with incremental zIndex */}
        {SLIDES.map((slide, idx) => (
          <article
            key={slide.id}
            ref={(el) => {
              sectionsRef.current[idx] = el;
            }}
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ zIndex: idx + 1, willChange: 'transform' }}
          >
            {/* Nested counter-sliding wrappers */}
            <div
              ref={(el) => {
                outerRefs.current[idx] = el;
              }}
              className="w-full h-full overflow-hidden"
            >
              <div
                ref={(el) => {
                  innerRefs.current[idx] = el;
                }}
                className="w-full h-full overflow-hidden"
              >
                {/* Background layer without dark overlay */}
                <div
                  ref={(el) => {
                    bgRefs.current[idx] = el;
                  }}
                  className="relative w-full h-full bg-cover bg-center flex flex-col justify-between"
                  style={{
                    backgroundImage: `url('${slide.primaryImage}')`,
                  }}
                >
                  <img
                    src={slide.primaryImage}
                    alt={slide.title}
                    className="hidden"
                    onError={(e) => {
                      const targetEl = e.currentTarget as HTMLElement;
                      const parent = targetEl.parentElement;
                      if (parent) {
                        parent.style.backgroundImage = `url('${slide.fallbackImage}')`;
                      }
                    }}
                  />

                  {/* Legibility gradient (bottom-left weighted) */}
                  <div
                    className="absolute inset-0 pointer-events-none"

                  />

                  {/* Left-aligned hero title, sits beside the indicator */}
                  <div className="absolute left-12 md:left-[5.25rem] right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 max-w-[18ch] sm:max-w-xl md:max-w-2xl">
                    <h1
                      ref={(el) => {
                        titleRefs.current[idx] = el;
                      }}
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-normal tracking-tight text-white leading-[1.08] m-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
                    >
                      {slide.title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Left-side vertical indicator: active = tall bar, inactive = dots */}
        <aside className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 pointer-events-auto">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleDotClick(i)}
              className={`w-1 rounded-full bg-white transition-all duration-500 ease-out focus:outline-none ${activeSlide === i ? 'h-12 opacity-100' : 'h-1 opacity-70 hover:opacity-100'
                }`}
              title={`Jump to ${s.category}`}
              aria-label={`Jump to slide ${i + 1}`}
              aria-current={activeSlide === i}
            />
          ))}
        </aside>
      </section>
    </div>
  );
}