"use client";

import React, { useState, useRef } from "react";
import { Variants, motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Animations ──────────────────────────────────────────────────────────

const EASE = { smooth: [0.4, 0, 0.2, 1], outExpo: [0.16, 1, 0.3, 1], spring: [0.175, 0.885, 0.32, 1] };

const clipFromLeft: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: EASE.outExpo } },
};

const clipFromRight: Variants = {
  hidden: { clipPath: "inset(0% 0% 0% 100%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: EASE.outExpo } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE.outExpo } },
};

const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE.outExpo } },
};

// ─── Reveal wrapper ──────────────────────────────────────────────

function Reveal({
  children,
  variants = fadeInUp,
  className,
  margin = "-80px",
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  margin?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: margin as any });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Portrait placeholder ────────────────────────────────────────

function MemberPortrait({ image, name, className }: { image?: string; name: string; className?: string }) {
  return (
    <div className={cn("rounded-[2rem] overflow-hidden bg-gray-100 flex flex-col items-center justify-center gap-4 relative", className)}>
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
        />
      )}
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────

const BOARD_MEMBERS = [
  {
    number: "01",
    initials: "ML",
    name: "Maud Lindsay-Gamrat",
    role: "Chief Executive Officer",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/ceo-portrat-7-1.jpg",
    shortBio: "Maud Lindsay-Gamrat is a seasoned business leader with over two decades of experience in the Ghanaian landscape. Her multifaceted expertise encompasses Inflight, Camp and Remote Site, Offshore and Onshore Catering Operations.",
    fullBio: "As the CEO of Atlantic, Maud has championed local capacity development, leading a team of over 150, with an extraordinary 99.9 percent being Ghanaians. The company, under her guidance, excels in delivering specialized catering and virtual services aboard two FPSOs in Ghana and various onsite corporate operations. Her outstanding achievements have garnered several awards including the Most Outstanding Female Owned Business in Ghana's Upstream Petroleum sector by the Petroleum Commission of Ghana, and Glitz Woman of the Year for Catering & Hospitality. Maud has also appeared on CNN's 'Passion to Portfolio', highlighting emerging and established global entrepreneurs."
  },
  {
    number: "02",
    initials: "HT",
    name: "Hubert Tossou",
    role: "Operations Director",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/Hubbert.png",
    shortBio: "Trained Executive Chef with over 20 years in remote site and inflight operations. Certified ISO Food Safety Auditor. Bachelor's in Hotel and Project Management. Fluent in English & French.",
    fullBio: "Trained Executive Chef with over 20 years in remote site and inflight operations. Certified ISO Food Safety Auditor. Bachelor's in Hotel and Project Management. Fluent in English & French."
  },
  {
    number: "03",
    initials: "JA",
    name: "John Ansah",
    role: "BD / Quality & Remote Site Director",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/John.jpg",
    shortBio: "Experienced quality and food safety consultant with over 2 decades spanning Guinness Ghana, Pioneer Food Cannery, and Newrest Ghana. MSc in Occupational Health Safety Risk Management.",
    fullBio: "Experienced quality and food safety consultant with over 2 decades spanning Guinness Ghana, Pioneer Food Cannery, and Newrest Ghana. MSc in Occupational Health Safety Risk Management."
  },
  {
    number: "04",
    initials: "JT",
    name: "Jemima Tagoe",
    role: "QHSE Manager",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/JJ.png",
    shortBio: "Quality, Health, Safety & Environmental Practitioner with close to a decade in food safety and 5 years in Occupational Health. Formerly with First Catering and Newrest Ghana. BSE in Food Science.",
    fullBio: "Quality, Health, Safety & Environmental Practitioner with close to a decade in food safety and 5 years in Occupational Health. Formerly with First Catering and Newrest Ghana. BSE in Food Science."
  },
  {
    number: "05",
    initials: "FO",
    name: "Freda Opoku",
    role: "Admin Manager",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/Frida.png",
    shortBio: "HR professional with 10+ years in People Management, Talent Acquisition, Policy Formulation, and Employee Relations. Executive MBA from University of Ghana Business School.",
    fullBio: "HR professional with 10+ years in People Management, Talent Acquisition, Policy Formulation, and Employee Relations. Executive MBA from University of Ghana Business School."
  },
  {
    number: "06",
    initials: "SV",
    name: "Suzan Valentina Dogbe",
    role: "Finance Manager",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/suz.png",
    shortBio: "Finance professional with proven expertise in financial management, analysis, budgeting, forecasting, and regulatory compliance. Adept at advising senior management on financial matters.",
    fullBio: "Finance professional with proven expertise in financial management, analysis, budgeting, forecasting, and regulatory compliance. Adept at advising senior management on financial matters."
  },
  {
    number: "07",
    initials: "JS",
    name: "Joseph Kwesi Sam",
    role: "HR Manager",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/kwasi.png",
    shortBio: "Strategic HR Management specialist with experience across hospitality, oil & gas, and pharmaceuticals. MBA in HR Management from University of Cape Coast. Chartered Institute of Human Resource Management member.",
    fullBio: "Strategic HR Management specialist with experience across hospitality, oil & gas, and pharmaceuticals. MBA in HR Management from University of Cape Coast. Chartered Institute of Human Resource Management member."
  }
];

// ─── Member content ──────────────────────────────────────────────

function MemberContent({
  member,
  expanded,
  onToggle,
  direction,
}: {
  member: (typeof BOARD_MEMBERS)[number];
  expanded: boolean;
  onToggle: () => void;
  direction: "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" as any });

  const hasMore = member.shortBio !== member.fullBio;

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="flex flex-col h-full"
    >
      {/* Large number */}
      <motion.span
        variants={direction === "left" ? fadeInLeft : fadeInRight}
        className="block text-[5rem] sm:text-[7rem] leading-none font-black text-gray-200 mb-2 select-none -ml-1"
      >
        {member.number}
      </motion.span>

      {/* Role chip */}
      <motion.span
        variants={scaleIn}
        className="inline-flex w-fit items-center px-3 py-1 rounded-md border border-gray-300 text-[11px] font-bold tracking-widest text-[#EF9419] uppercase bg-gray-50 mb-4"
      >
        {member.role}
      </motion.span>

      {/* Underline accent */}
      <motion.div variants={lineReveal} className="h-[2px] w-12 bg-[#EF9419] rounded-md mb-5 origin-left" />

      {/* Name */}
      <motion.h3
        variants={direction === "left" ? fadeInLeft : fadeInRight}
        className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111] uppercase leading-tight mb-6 tracking-tight"
      >
        {member.name}
      </motion.h3>

      {/* Bio */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.p
              key="full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE.smooth }}
              className="text-gray-600 leading-relaxed text-sm sm:text-base font-inter"
            >
              {member.fullBio}
            </motion.p>
          ) : (
            <motion.p
              key="short"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE.smooth }}
              className="text-gray-600 leading-relaxed text-sm sm:text-base font-inter"
            >
              {member.shortBio}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Read more toggle */}
      {hasMore && (
        <motion.button
          onClick={onToggle}
          className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[#EF9419] hover:text-[#d88414] transition-colors group w-fit"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {expanded ? "Read less" : "Read more"}
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.35, ease: EASE.spring }}
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </motion.svg>
        </motion.button>
      )}
    </motion.div>
  );
}

// ─── Member row ──────────────────────────────────────────────────

function MemberRow({
  member,
  index,
}: {
  member: (typeof BOARD_MEMBERS)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 1;
  const portraitVariant = isEven ? clipFromLeft : clipFromRight;
  const portraitDirection = isEven ? "left" : "right";

  return (
    <div className={cn(
      "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-16 sm:py-20 border-b border-gray-200 last:border-0",
    )}>
      {isEven ? (
        <>
          {/* Portrait left */}
          <Reveal variants={portraitVariant} className="lg:col-span-5 relative w-full aspect-[4/5]">
            <MemberPortrait image={member.image} name={member.name} className="absolute inset-0 w-full h-full shadow-2xl" />
          </Reveal>
          {/* Content right */}
          <div className="lg:col-span-7">
            <MemberContent
              member={member}
              expanded={expanded}
              onToggle={() => setExpanded((p) => !p)}
              direction={portraitDirection}
            />
          </div>
        </>
      ) : (
        <>
          {/* Content left */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <MemberContent
              member={member}
              expanded={expanded}
              onToggle={() => setExpanded((p) => !p)}
              direction={portraitDirection}
            />
          </div>
          {/* Portrait right */}
          <Reveal variants={portraitVariant} className="lg:col-span-5 order-1 lg:order-2 mb-8 lg:mb-0 relative w-full aspect-[4/5]">
            <MemberPortrait image={member.image} name={member.name} className="absolute inset-0 w-full h-full shadow-2xl" />
          </Reveal>
        </>
      )}
    </div>
  );
}

// ─── Page export ─────────────────────────────────────────────────

export default function MeetTheCrew() {
  return (
    <div className="bg-white
     pb-32">
      {/* ── Introduction ──────────────────────────────────────────── */}
      <section className="py-4 overflow-hidden relative">
        {/* Ambient orb */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <motion.div
            className="absolute -top-40 -right-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-md bg-[#EF9419]/10 blur-[100px]"
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10" >
          <div className="max-w-3xl">
            <Reveal variants={scaleIn} className="mb-8">
              <span className="inline-flex items-center px-4 py-1.5 rounded-md border border-gray-300 text-[13px] font-bold tracking-widest uppercase text-[#EF9419] bg-gray-50">
                Leadership
              </span>
            </Reveal>

            {/* Title with underline accent */}
            <Reveal variants={fadeInUp} className="mb-3">
              <div className="mb-3">
                <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-black uppercase text-[#111] leading-none tracking-tight inline">
                  Meet the{" "}
                </h2>
                <span className="relative inline-block">
                  <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-black uppercase text-[#111] leading-none tracking-tight inline">
                    Crew
                  </h2>
                  <motion.span
                    variants={lineReveal}
                    className="absolute -bottom-1 left-0 w-full h-1.5 bg-[#EF9419] rounded-md origin-left"
                  />
                </span>
              </div>
            </Reveal>

            <Reveal variants={fadeInUp} margin="-40px">
              <p className="mt-8 text-base sm:text-lg text-gray-600 leading-relaxed font-inter">
                Our operations model combines the strategic oversight of our dedicated directors with the operational expertise of our team, ensuring that every decision reflects our core values of integrity, profitability, teamwork, growth, and safety.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed font-inter">
                Working under the guidance of our CEO, our Management Team drives day-to-day operations with a focus on quality delivery, innovation, and efficiency. Their collaborative approach strengthens our organisational structure, empowering every department to perform at its best while ensuring seamless execution across all remote sites and inflight operations.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Board members — alternating layout ────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {BOARD_MEMBERS.map((member, index) => (
            <MemberRow key={member.name} member={member} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
