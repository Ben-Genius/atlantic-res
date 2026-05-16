'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

export default function StatsBand() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const words = gsap.utils.toArray('.word') as HTMLElement[];

    // Scrubbed Slide-Up Reveal for the stats words (like Hero section)
    gsap.fromTo(words, 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".stats-reveal-text",
          start: "top 80%",
          end: "bottom 40%",
          scrub: 0.5
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // The Badge Pop (tied to scroll)
    gsap.fromTo('.stats-badge',
      { scale: 0.2, rotation: -25, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".stats-badge-wrapper",
          start: "center 85%",
          end: "center 45%",
          scrub: 0.5
        },
        scale: 1,
        rotation: -3,
        opacity: 1,
        ease: "back.out(2)"
      }
    );

    // Subtitle Fade (tied to scroll)
    gsap.fromTo('.stats-subtitle',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: ".stats-subtitle",
          start: "top 90%",
          end: "top 60%",
          scrub: true
        },
        opacity: 0.9,
        y: 0,
        ease: "power2.out"
      }
    );

    // Custom Cursor Logic
    const cursor = document.querySelector('.stats-cursor') as HTMLElement;
    const section = containerRef.current;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const enterSection = () => gsap.to(cursor, { autoAlpha: 1, duration: 0.3 });
    const leaveSection = () => gsap.to(cursor, { autoAlpha: 0, duration: 0.3 });

    section.addEventListener('mousemove', moveCursor);
    section.addEventListener('mouseenter', enterSection);
    section.addEventListener('mouseleave', leaveSection);

    // Expand cursor on interactive elements
    const interactables = gsap.utils.toArray('.word, .stats-badge, .stats-subtitle') as HTMLElement[];
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(cursor, { width: 80, height: 80, duration: 0.3 }));
      el.addEventListener('mouseleave', () => gsap.to(cursor, { width: 20, height: 20, duration: 0.3 }));
    });

    return () => {
      section.removeEventListener('mousemove', moveCursor);
      section.removeEventListener('mouseenter', enterSection);
      section.removeEventListener('mouseleave', leaveSection);
    };

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center px-4 text-white overflow-hidden cursor-none"
      style={{
        backgroundImage: "url('/images/premium-green-texture.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Custom Cinematic Cursor */}
      <div 
        className="stats-cursor fixed top-0 left-0 w-5 h-5 bg-[#EF9419] rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 opacity-0 transition-[width,height] duration-300 ease-out will-change-transform"
      />

      {/* Color Overlay: Multiplies the primary brand green into the texture to make it much greener and perfectly on-brand */}
      <div className="absolute inset-0 bg-[#35b435] mix-blend-multiply opacity-90 pointer-events-none z-0" />
      {/* Subtle dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center py-20">
        <h2
          className="stats-reveal-text text-[clamp(3.5rem,8.5vw,7.5rem)] leading-[1.1] font-black tracking-tight uppercase text-center m-0 flex flex-wrap justify-center gap-x-[0.15em] gap-y-[0.2em]"
          style={{ fontFamily: 'Antonio, sans-serif' }}
        >
          <span className="word opacity-0 inline-block will-change-transform">10+</span>
          <span className="word opacity-0 inline-block will-change-transform">YEARS</span>
          <span className="word opacity-0 inline-block will-change-transform">OPERATING</span>
          <span className="word opacity-0 inline-block will-change-transform">WITH</span>

          {/* The Pop-in Badge (Moved to middle with higher z-index and size) */}
          <span className="stats-badge-wrapper relative inline-flex items-center justify-center px-[0.2em] mx-[0.1em] z-50">
            <span className="stats-badge bg-[#EF9419] text-[#1a1a1a] px-[0.4em] py-[0.05em] rounded-md inline-block shadow-[0_20px_40px_rgba(0,0,0,0.4)] origin-center tracking-[-0.02em] font-sans font-bold text-[clamp(1.5rem,4vw,3.5rem)] -rotate-3">
              #1 ISO CERTIFIED
            </span>
          </span>

          <span className="word opacity-0 inline-block will-change-transform">2</span>
          <span className="word opacity-0 inline-block will-change-transform">FPSOS</span>
          <span className="word opacity-0 inline-block will-change-transform">SERVICED</span>
          <span className="word opacity-0 inline-block will-change-transform">BY</span>

          <span className="word opacity-0 inline-block will-change-transform">A</span>
          <span className="word opacity-0 inline-block will-change-transform">99.9%</span>
          <span className="word opacity-0 inline-block will-change-transform">GHANAIAN</span>
          <span className="word opacity-0 inline-block will-change-transform">WORKFORCE</span>
        </h2>

        <p className="stats-subtitle text-center mt-16 max-w-2xl text-base md:text-lg leading-relaxed tracking-wide text-white/90 mix-blend-screen font-medium">
          Setting the gold standard in maritime services and local content development, where operational excellence meets fearless innovation.
        </p>
      </div>
    </section>
  )
}
