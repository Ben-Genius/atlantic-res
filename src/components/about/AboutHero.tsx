import React from 'react'

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-start items-center text-center overflow-hidden px-6 md:px-16 pt-36 md:pt-48 pb-20">
      {/* Giant ghost background text */}
      <div
        className="ghost-parallax absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden top-0 z-0"
        aria-hidden
      >
        <span
          className="block font-black uppercase leading-none tracking-tighter text-[18vw] md:text-[16vw] text-transparent mb-[14rem] pt-[2.4rem] ml-[-14rem]"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.08)' }}
        >
          ATLANTIC
        </span>
        <span
          className="block font-black uppercase leading-none tracking-tighter text-[16vw] md:text-[14vw] text-transparent ml-[35vw] mt-[18rem]"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.06)' }}
        >
          CATERING
        </span>
      </div>

      {/* 1. Top-left Shawarma wrap (au4.png) - Angled & extending from corner */}
      <div className="hero-plate-tl absolute top-[-1%] left-[-4%] w-[90px] sm:w-[150px] md:w-[280px] lg:w-[350px] z-0 pointer-events-none">
        <img
          src="/assets/images/About Us/au4.png"
          alt=""
          className="w-full object-contain drop-shadow-2xl mix-blend-multiply"
          draggable={false}
        />
      </div>

      {/* 2. Top-right Dip bowl (au2.png) - Positioned in the corner */}
      <div className="hero-plate-tr absolute top-[-5%] right-[0%] w-[80px] sm:w-[150px] md:w-[240px] lg:w-[300px] z-10 pointer-events-none">
        <img
          src="/assets/images/About Us/au2.png"
          alt=""
          className="w-full object-contain drop-shadow-2xl mix-blend-multiply"
          draggable={false}
        />
      </div>

      {/* 3. Bottom-left Falafel bowl (au1.png) - Below main title */}
      <div className="hero-plate-left absolute top-[22%] sm:top-[48%] md:top-[44%] lg:top-[60%] left-[4%] sm:left-[10%] md:left-[14%] lg:left-[1%] xl:left-[16%] w-[140px] sm:w-[220px] md:w-[380px] lg:w-[450px] xl:w-[400px] z-30 pointer-events-none">
        <img
          src="/assets/images/About Us/au1.png"
          alt=""
          className="w-full object-contain mix-blend-multiply"
          draggable={false}
        />
      </div>

      {/* 4. Bottom-right Hummus bowl (au3.png) - Below main title */}
      <div className="hero-plate-right absolute top-[62%] sm:top-[58%] md:top-[54%] lg:top-[60%] right-[4%] sm:right-[10%] md:right-[14%] lg:right-[18%] xl:right-[20%] w-[110px] sm:w-[180px] md:w-[260px] lg:w-[300px] xl:w-[340px] z-30 flex flex-col items-center sm:items-start gap-4">
        <img
          src="/assets/images/About Us/au3.png"
          alt=""
          className="w-full object-contain drop-shadow-2xl mix-blend-multiply pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Main Typography & CTA Content Container */}
      <div className="relative z-20 flex flex-col items-center max-w-7xl mx-auto mt-8">
        {/* Eyebrow */}
        <span className="hero-eyebrow block font-inter text-[#EF9419] text-xs md:text-sm font-bold uppercase tracking-[0.35em] mb-2">
          Reliable · Flexible · Safe
        </span>

        {/* Main headline — Sqew treatment: thin ghost line + massive solid */}
        <h1 className="font-extrabold uppercase leading-[1.1] tracking-tighter m-0 text-center">
          <span className="block overflow-hidden py-1">
            <span
              className="hero-line block text-[8.5vw] sm:text-[8vw] md:text-[7vw] lg:text-[8rem] text-white"
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
            >
              FOCUS ON <span className="text-transparent">THE WORK</span>
            </span>
          </span>

          <span className="block overflow-hidden py-1">
            <span
              className="hero-line block text-[8.5vw] sm:text-[8vw] md:text-[7vw] lg:text-[8rem] text-transparent"
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
            >
              WE'LL TAKE CARE
            </span>
          </span>

          <span className="block overflow-hidden py-1">
            <span
              className="hero-line block text-[8.5vw] sm:text-[8vw] md:text-[7vw] lg:text-[8rem] text-[#EF9419]"
            >
              OF THE REST
            </span>
          </span>
        </h1>

        {/* Subline + CTA row */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 mx-auto">
          <a
            href="#contact"
            className="shrink-0 border border-white/90 text-white font-inter font-bold text-xs uppercase tracking-widest px-7 py-3 hover:bg-white hover:text-[#1a4a1a] transition-all duration-200"
          >
            GET IN TOUCH
          </a>
        </div>
      </div>
    </section>
  )
}
