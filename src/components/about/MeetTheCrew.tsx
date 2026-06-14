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
    shortBio: "Maud Lindsay-Gamrat is a seasoned business leader, with over two decades of experience in the Ghanaian landscape. Her multifaceted expertise encompasses key areas such as: Inflight, Camp and Remote Site, Offshore and Onshore Catering Operations.\n\nOver a remarkable twenty-four-year career, Maud has played pivotal roles in Ghana's Inflight and Offshore Catering Operations, contributing significantly to Sales, Marketing, Human Resources and Finance sectors.",
    fullBio: "Maud Lindsay-Gamrat is a seasoned business leader, with over two decades of experience in the Ghanaian landscape. Her multifaceted expertise encompasses key areas such as: Inflight, Camp and Remote Site, Offshore and Onshore Catering Operations.\n\nOver a remarkable twenty-four-year career, Maud has played pivotal roles in Ghana's Inflight and Offshore Catering Operations, contributing significantly to Sales, Marketing, Human Resources and Finance sectors. Beyond her adeptness in inflight services, she has successfully initiated and managed numerous remote site catering and hospitality projects, all accomplished within the Ghanaian context.\n\nAs the CEO of Atlantic, Maud has championed local capacity development, leading a team of over 150, with an extraordinary 99.9 percent being Ghanaians. The company, under her guidance, excels in delivering specialized catering and virtual services aboard two FPSOs in Ghana and various onsite corporate operations.\n\nHer outstanding achievements have garnered several awards, the most recent including the Most Outstanding Female Owned Business in Ghana’s Upstream Petroleum sector awarded by the Petroleum Commission of Ghana, Glitz Woman of the Year for Catering & Hospitality by Glitz Africa among others.\n\nMaud has also featured on various Business and Entrepreneurship Events, Conferences and Programs, notably appearing on CNN’s \"Passion to Portfolio\", a program highlighting emerging and established global entrepreneurs.\n\nMaud's influence extends beyond the corporate realm. Her fervent advocacy for women’s empowerment is palpable, evidenced by her commitment to empowering female employees for professional and capacity building through self-development training initiatives and courses. She extends this passion to local women food vendors and farmers across Ghana, championing activities that uplift and strengthen local communities.\n\nHer dedication further encompasses environmental sustainability, inclusivity and social responsibility. Maud continually strives to make Atlantic more sustainable and socially responsible.\n\nMaud is married to Jeff, a Co-Founder and Executive Director of Atlantic and blessed with two daughters."
  },
  {
    number: "02",
    initials: "HT",
    name: "Hubert Tossou",
    role: "Operations Director",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/Hubbert.png",
    shortBio: "Hubert Tossou serves as the Operations Director at Atlantic Catering. He has vast knowledge and twenty years of experience in the hospitality industry having worked in some of the most reputable companies in the food industry both in Ghana, Nigeria, and Benin.",
    fullBio: "Hubert Tossou serves as the Operations Director at Atlantic Catering. He has vast knowledge and twenty years of experience in the hospitality industry having worked in some of the most reputable companies in the food industry both in Ghana, Nigeria, and Benin.\n\nSome of his key responsibilities include Product development, Project start-up, planning and coordination. He is a trained executive Chef with over twelve years experience in in-flight and remote site operations. He holds a Bachelor’s in Hotel and Project Management and is a certified ISO Food Safety Auditor. He is fluent in English and French."
  },
  {
    number: "03",
    initials: "JA",
    name: "John Ansah",
    role: "BD/ QUALITY & REMOTE SITE DIRECTOR",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/John.jpg",
    shortBio: "John oversees all remote sites of the company. He is an experienced Ghanaian quality and food safety consultant. He started his career as a laboratory technologist and by dint of hard work has risen through the ranks to become a QHSE Director with a career spanning over 2 decades.",
    fullBio: "John oversees all remote sites of the company. He is an experienced Ghanaian quality and food safety consultant. He started his career as a laboratory technologist and by dint of hard work has risen through the ranks to become a QHSE Director with a career spanning over 2 decades.\n\nJohn has worked with: Apam Hospital, Ghana Armed Forces Recruit Centre, Pioneer Food Cannery, Guinness Ghana Breweries, Everpure Ghana Ltd and First Catering Ltd., a Swiss commercial airline catering company, now Newrest Ghana; where he played a major role and under his impeccable leadership won several contracts.\n\nJohn holds an MSc Degree in Occupational Health Safety Risk Management from Open University of Malaysia."
  },
  {
    number: "04",
    initials: "JT",
    name: "Jemima Tagoe",
    role: "QHSE MANAGER",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/JJ.png",
    shortBio: "Jemima Tagoe is a Quality, Health, Safety and Environmental Practitioner and Laboratory Technologist by profession with close to a decade of experience in food safety and five years of experience in Occupational Health & Environmental Safety as well as Internal Auditing.",
    fullBio: "Jemima Tagoe is a Quality, Health, Safety and Environmental Practitioner and Laboratory Technologist by profession with close to a decade of experience in food safety and five years of experience in Occupational Health & Environmental Safety as well as Internal Auditing.\n\nShe has worked with multinational companies such as First Catering and Newrest Ghana in the capacity of QHSE Manager with key responsibilities such as ensuring the total quality and safety of the company's products and services as well as the health and well-being of its employees before work commences. She is experienced in identifying hazards and providing corrective action for those hazards. She holds a BSE in Food Science."
  },
  {
    number: "05",
    initials: "FO",
    name: "Freda Opoku",
    role: "ADMIN MANAGER",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/Frida.png",
    shortBio: "Freda Opoku is an HR professional with over a decade wealth of experience spanning People Management, Performance Management, Talent Acquisition, Policy Formulation, Performance Management, Employee Relations, Customer Service and Sales Administration.",
    fullBio: "Freda Opoku is an HR professional with over a decade wealth of experience spanning People Management, Performance Management, Talent Acquisition, Policy Formulation, Performance Management, Employee Relations, Customer Service and Sales Administration.\n\nShe has served in major professional capacities as HR and Admin Manager, HR Generalist, Sales Manager and Customer Service Executive in the Automobile, Insurance and Aviation Industries respectively.\n\nFreda holds an Executive MBA from the University of Ghana Business School and a Bachelor’s Degree from the Central University College. She is passionate about organizational development, Employee Engagement and Capacity Building and a strong advocate of health and wellness."
  },
  {
    number: "06",
    initials: "SVD",
    name: "Suzan Valentina Dogbe",
    role: "FINANCE MANAGER",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/suz.png",
    shortBio: "Suzan is a finance professional with proven expertise in financial management, analysis, and reporting, skilled in budgeting, forecasting, and risk management. Proficient in accounting software and Microsoft Office Suite.",
    fullBio: "Suzan is a finance professional with proven expertise in financial management, analysis, and reporting, skilled in budgeting, forecasting, and risk management. Proficient in accounting software and Microsoft Office Suite. Demonstrated ability to streamline financial processes and ensure regulatory compliance. Adept at collaborating with cross-functional teams and advising senior management on financial matters."
  },
  {
    number: "07",
    initials: "JKS",
    name: "Joseph Kwesi Sam",
    role: "HR MANAGER",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/kwasi.png",
    shortBio: "Joseph Kwesi Sam is a seasoned Human Resource professional with expertise in strategic HR management, talent acquisition, and performance optimization. He has extensive experience across various industries, including hospitality, oil and gas, and pharmaceuticals, Fast Moving Consumer Goods and Media.",
    fullBio: "Joseph Kwesi Sam is a seasoned Human Resource professional with expertise in strategic HR management, talent acquisition, and performance optimization. He has extensive experience across various industries, including hospitality, oil and gas, and pharmaceuticals, Fast Moving Consumer Goods and Media.\n\nCurrently, Joseph serves as HR Manager at Atlantic Catering & Logistics, driving transformative initiatives. He's also a training facilitator, speaker, and volunteer mentor, having worked with Mobile Web Ghana (American Corner) on initiatives like the Get-Ready-for-Work series to equip young professionals with essential skills to prepare them for the world of work. Committed to professional growth and mentorship, Joseph actively volunteers as a workshop facilitator, guiding graduates through the job market, and serves on the selection panel for the Emerging Public Leaders Fellowship of Ghana. With a strong educational foundation, Joseph holds a bachelor’s degree in business administration with specialization in Organization and Human Resource Management, an MBA in HR Management from the University of Cape Coast, and certifications in Alternative Dispute Resolution (ADR) and Project & Innovations Management. He's a Chartered Human Resource Professional and member of the Chartered Institute of Human Resource Management, Ghana.\n\nJoseph is a Project Work Supervisor at the Chartered Institute of Human Resource Management, Ghana, where he mentors Level 4 Human Resource Professionals in developing and submitting insightful, original, and practical projects addressing key HR challenges in their workplaces."
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
              className="text-gray-600 leading-relaxed text-sm sm:text-base font-inter whitespace-pre-line"
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
              className="text-gray-600 leading-relaxed text-sm sm:text-base font-inter whitespace-pre-line"
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

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12 lg:items-start justify-between">
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

          <Reveal variants={fadeInUp} className="flex-shrink-0">
            <img
              src="/assets/images/About Us/cert.png"
              alt="Certification"
              className="w-full max-w-[350px] lg:max-w-[400px] h-auto object-contain mix-blend-multiply"
            />
          </Reveal>
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
