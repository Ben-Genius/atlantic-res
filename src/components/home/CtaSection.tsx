'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CtaButton from '@/components/ui/CtaButton'

gsap.registerPlugin(ScrollTrigger)

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(sectionRef.current!.querySelectorAll('.reveal'), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <>
      <section ref={sectionRef} className="py-section bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(103,186,103,0.05)] to-transparent pointer-events-none" />
        <div className="container-xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="section-label">
              <span className="brand-line" />
              Get Started
            </div>
            <h2
              className="font-serif font-semibold text-[#1a1a1a] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05 }}
            >
              Ready to Elevate<br />Your Operations?
            </h2>
            <p className="text-[rgba(26,26,26,0.6)] leading-[1.85] max-w-[420px]">
              Let's create something exceptional together. Contact our team to discuss your specific needs and how Atlantic can serve you.
            </p>
          </div>

          <div className="reveal bg-[#f5f5f3] border border-black/[.08] p-12">
            <div className="font-serif text-2xl text-[#1a1a1a] mb-3">Start a conversation</div>
            <p className="text-sm text-[rgba(26,26,26,0.55)] leading-[1.7] mb-8">
              Reach out via phone, email, or our contact form. We respond within 24 hours.
            </p>
            <div className="flex flex-col gap-3">
              <CtaButton href="/contact" label="Get In Touch" size="md" className="w-full" />
              <CtaButton
                href="tel:+233501502441"
                label="Call +233 501 502 441"
                variant="outline"
                size="md"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider />
    </>
  )
}

function WaveDivider() {
  return (
    <div
      className="relative w-screen -ml-[calc(50vw-50%)] leading-[0] -mt-px"
      style={{ filter: 'drop-shadow(0 18px 8px rgba(3,2,0,0.05))' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1728 226"
        fill="none"
        className="w-full h-auto block"
        style={{ minHeight: 120 }}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <path
          d="M0 0.571289H1728V152.258C1710.36 148.163 1691.87 145.412 1672.95 144.081C1652.32 142.624 1631.57 142.882 1611.28 144.841C1590.33 146.865 1570.23 150.675 1551.54 156.164C1525.01 163.956 1502.16 174.506 1480.07 184.708C1463.28 192.457 1447.42 199.778 1431.71 205.028C1416.75 210.026 1403.88 212.479 1391.21 212.749C1376.52 213.06 1361.31 210.442 1343.33 204.506C1324.48 198.281 1305.58 189.418 1285.57 180.035C1262.5 169.219 1238.65 158.036 1212.33 149.821C1178.79 139.349 1146.91 135.564 1114.87 138.256C1087.72 140.538 1061.82 147.505 1035.7 159.557C1015.18 169.029 997.607 180.11 980.616 190.827C976.992 193.115 973.563 195.273 970.114 197.415C949.904 209.964 911.513 230.188 881.476 224.631C872.258 222.926 863.625 218.695 855.822 212.054C847.614 205.068 840.666 195.705 835.732 184.978C832.463 177.871 829.818 170.427 827.019 162.547C820.351 143.773 813.453 124.36 796.922 105.636C787.969 95.4959 776.432 86.1881 762.63 77.967C749.344 70.0533 734.232 63.31 717.726 57.9265C701.221 52.5431 683.705 48.6499 665.669 46.3493C646.939 43.9618 628.049 43.3502 609.533 44.5331C591.013 45.716 572.722 48.6995 555.162 53.4C538.256 57.9265 522.38 63.9527 507.979 71.3076C493.577 78.6625 480.99 87.1723 470.573 96.598C459.751 106.39 451.503 116.961 446.054 128.017C439.521 141.283 433.051 154.357 430.662 166.999C427.453 184.006 420.678 198.691 408.996 208.375C403.513 212.92 395.345 216.481 385.377 218.673C375.135 220.927 363.743 221.51 353.3 220.321C331.061 217.785 313.556 207.946 299.774 194.006C293.161 187.316 287.642 179.259 281.799 170.731C269.652 153.006 259.89 132.916 230.943 117.79C217.511 110.771 201.94 105.533 184.669 102.221C169.143 99.2432 152.522 97.8772 135.261 98.1597C103.799 98.675 71.3023 104.757 43.7541 115.285C28.7029 121.035 14.3114 128.088 0.219945 136.639L0 0.571289Z"
          fill="#ffffff"
        />
        <path
          d="M0 0.571289H1728V152.258C1710.36 148.163 1691.87 145.412 1672.95 144.081C1652.32 142.624 1631.57 142.882 1611.28 144.841C1590.33 146.865 1570.23 150.675 1551.54 156.164C1525.01 163.956 1502.16 174.506 1480.07 184.708C1463.28 192.457 1447.42 199.778 1431.71 205.028C1416.75 210.026 1403.88 212.479 1391.21 212.749C1376.52 213.06 1361.31 210.442 1343.33 204.506C1324.48 198.281 1305.58 189.418 1285.57 180.035C1262.5 169.219 1238.65 158.036 1212.33 149.821C1178.79 139.349 1146.91 135.564 1114.87 138.256C1087.72 140.538 1061.82 147.505 1035.7 159.557C1015.18 169.029 997.607 180.11 980.616 190.827C976.992 193.115 973.563 195.273 970.114 197.415C949.904 209.964 911.513 230.188 881.476 224.631C872.258 222.926 863.625 218.695 855.822 212.054C847.614 205.068 840.666 195.705 835.732 184.978C832.463 177.871 829.818 170.427 827.019 162.547C820.351 143.773 813.453 124.36 796.922 105.636C787.969 95.4959 776.432 86.1881 762.63 77.967C749.344 70.0533 734.232 63.31 717.726 57.9265C701.221 52.5431 683.705 48.6499 665.669 46.3493C646.939 43.9618 628.049 43.3502 609.533 44.5331C591.013 45.716 572.722 48.6995 555.162 53.4C538.256 57.9265 522.38 63.9527 507.979 71.3076C493.577 78.6625 480.99 87.1723 470.573 96.598C459.751 106.39 451.503 116.961 446.054 128.017C439.521 141.283 433.051 154.357 430.662 166.999C427.453 184.006 420.678 198.691 408.996 208.375C403.513 212.92 395.345 216.481 385.377 218.673C375.135 220.927 363.743 221.51 353.3 220.321C331.061 217.785 313.556 207.946 299.774 194.006C293.161 187.316 287.642 179.259 281.799 170.731C269.652 153.006 259.89 132.916 230.943 117.79C217.511 110.771 201.94 105.533 184.669 102.221C169.143 99.2432 152.522 97.8772 135.261 98.1597C103.799 98.675 71.3023 104.757 43.7541 115.285C28.7029 121.035 14.3114 128.088 0.219945 136.639L0 0.571289Z"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  )
}
