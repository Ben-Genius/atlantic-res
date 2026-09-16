"use client";

import React, { useRef, useState } from "react";
import { Variants, motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Meet the Crew — the arch-card treatment shared as the target layout.
 *
 * Six portrait arches on a dark ground, each under a soft pastel header
 * carrying the name and role. The bios the old layout carried are kept: a
 * card opens its full profile in the panel below the grid rather than losing
 * the content to the new design.
 */

const EASE = { outExpo: [0.16, 1, 0.3, 1] };

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
};

const archIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.08, ease: EASE.outExpo },
  }),
};

function Reveal({
  children,
  variants = fadeInUp,
  className,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" as any });
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

/** Soft header grounds, one per arch, in the order of the reference. */
const PASTELS = ["#F6DFAE", "#F7D6DC", "#CFE3F5", "#CFE7D8", "#DCD6F2", "#F8D9C4"];

const BOARD_MEMBERS = [
  {
    initials: "ML",
    name: "Maud Lindsay-Gamrat",
    role: "Chief Executive Officer",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/ceo-portrat-7-1.jpg",
    bio: "Maud Lindsay-Gamrat is a seasoned business leader, with over two decades of experience in the Ghanaian landscape. Her multifaceted expertise encompasses key areas such as: Inflight, Camp and Remote Site, Offshore and Onshore Catering Operations.\n\nOver a remarkable twenty-four-year career, Maud has played pivotal roles in Ghana's Inflight and Offshore Catering Operations, contributing significantly to Sales, Marketing, Human Resources and Finance sectors. Beyond her adeptness in inflight services, she has successfully initiated and managed numerous remote site catering and hospitality projects, all accomplished within the Ghanaian context.\n\nAs the CEO of Atlantic, Maud has championed local capacity development, leading a team of over 150, with an extraordinary 99.9 percent being Ghanaians. The company, under her guidance, excels in delivering specialized catering and virtual services aboard two FPSOs in Ghana and various onsite corporate operations.\n\nHer outstanding achievements have garnered several awards, the most recent including the Most Outstanding Female Owned Business in Ghana's Upstream Petroleum sector awarded by the Petroleum Commission of Ghana, Glitz Woman of the Year for Catering & Hospitality by Glitz Africa among others.\n\nMaud has also featured on various Business and Entrepreneurship Events, Conferences and Programs, notably appearing on CNN's \"Passion to Portfolio\", a program highlighting emerging and established global entrepreneurs.\n\nMaud's influence extends beyond the corporate realm. Her fervent advocacy for women's empowerment is palpable, evidenced by her commitment to empowering female employees for professional and capacity building through self-development training initiatives and courses. She extends this passion to local women food vendors and farmers across Ghana, championing activities that uplift and strengthen local communities.\n\nHer dedication further encompasses environmental sustainability, inclusivity and social responsibility. Maud continually strives to make Atlantic more sustainable and socially responsible.\n\nMaud is married to Jeff, a Co-Founder and Executive Director of Atlantic and blessed with two daughters.",
  },
  {
    initials: "HT",
    name: "Hubert Tossou",
    role: "Operations Director",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/Hubbert.png",
    bio: "Hubert Tossou serves as the Operations Director at Atlantic Catering. He has vast knowledge and twenty years of experience in the hospitality industry having worked in some of the most reputable companies in the food industry both in Ghana, Nigeria, and Benin.\n\nSome of his key responsibilities include Product development, Project start-up, planning and coordination. He is a trained executive Chef with over twelve years experience in in-flight and remote site operations. He holds a Bachelor's in Hotel and Project Management and is a certified ISO Food Safety Auditor. He is fluent in English and French.",
  },
  {
    initials: "JT",
    name: "Jemima Tagoe",
    role: "QHSE Manager",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/JJ.png",
    bio: "Jemima Tagoe is a Quality, Health, Safety and Environmental Practitioner and Laboratory Technologist by profession with close to a decade of experience in food safety and five years of experience in Occupational Health & Environmental Safety as well as Internal Auditing.\n\nShe has worked with multinational companies such as First Catering and Newrest Ghana in the capacity of QHSE Manager with key responsibilities such as ensuring the total quality and safety of the company's products and services as well as the health and well-being of its employees before work commences. She is experienced in identifying hazards and providing corrective action for those hazards. She holds a BSE in Food Science.",
  },
  {
    initials: "FO",
    name: "Freda Opoku",
    role: "Admin Manager",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/Frida.png",
    bio: "Freda Opoku is an HR professional with over a decade wealth of experience spanning People Management, Performance Management, Talent Acquisition, Policy Formulation, Employee Relations, Customer Service and Sales Administration.\n\nShe has served in major professional capacities as HR and Admin Manager, HR Generalist, Sales Manager and Customer Service Executive in the Automobile, Insurance and Aviation Industries respectively.\n\nFreda holds an Executive MBA from the University of Ghana Business School and a Bachelor's Degree from the Central University College. She is passionate about organizational development, Employee Engagement and Capacity Building and a strong advocate of health and wellness.",
  },
  {
    initials: "SD",
    name: "Suzan Valentina Dogbe",
    role: "Finance Manager",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/suz.png",
    bio: "Suzan is a finance professional with proven expertise in financial management, analysis, and reporting, skilled in budgeting, forecasting, and risk management. Proficient in accounting software and Microsoft Office Suite.\n\nDemonstrated ability to streamline financial processes and ensure regulatory compliance. Adept at collaborating with cross-functional teams and advising senior management on financial matters.",
  },
  {
    initials: "JS",
    name: "Joseph Kwesi Sam",
    role: "HR Manager",
    image: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/kwasi.png",
    bio: "Joseph Kwesi Sam is a seasoned Human Resource professional with expertise in strategic HR management, talent acquisition, and performance optimization. He has extensive experience across various industries, including hospitality, oil and gas, and pharmaceuticals, Fast Moving Consumer Goods and Media.\n\nCurrently, Joseph serves as HR Manager at Atlantic Catering & Logistics, driving transformative initiatives. He's also a training facilitator, speaker, and volunteer mentor, having worked with Mobile Web Ghana (American Corner) on initiatives like the Get-Ready-for-Work series to equip young professionals with essential skills to prepare them for the world of work.\n\nWith a strong educational foundation, Joseph holds a bachelor's degree in business administration with specialization in Organization and Human Resource Management, an MBA in HR Management from the University of Cape Coast, and certifications in Alternative Dispute Resolution (ADR) and Project & Innovations Management. He's a Chartered Human Resource Professional and member of the Chartered Institute of Human Resource Management, Ghana.",
  },
];

function ArchCard({
  member,
  pastel,
  index,
  open,
  onToggle,
}: {
  member: (typeof BOARD_MEMBERS)[number];
  pastel: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      custom={index}
      variants={archIn}
      onClick={onToggle}
      aria-expanded={open}
      className={cn(
        "group relative block w-full   overflow-hidden rounded-t-[999px] text-left",
        "transition-transform duration-500 ease-out hover:-translate-y-1.5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cc9933] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14181B]",
        open && "-translate-y-1.5"
      )}
      style={{ backgroundColor: pastel }}
    >
      {/* Pastel header — name and role */}
      <span className="block px-5 pt-10 pb-5 text-center">
        <span className="block text-[18px] sm:text-[20px] font-bold leading-tight text-[#1a1a1a]">
          {member.name}
        </span>
        <span className="mt-1.5 block text-[12px] sm:text-[13px] leading-snug text-[#1a1a1a]/65">
          {member.role}
        </span>
      </span>

      {/* Portrait */}
      <span className="block relative aspect-[4/5] overflow-hidden bg-[#1a1a1a]/5">
        <img
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          draggable={false}
        />
      </span>

      {/* Open affordance */}
      <span
        className={cn(
          "absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5",
          "text-[10px] font-bold uppercase tracking-[0.18em]",
          "bg-black/55 text-white backdrop-blur-sm",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
          open && "opacity-100"
        )}
      >
        {open ? "Close" : "Profile"}
      </span>
    </motion.button>
  );
}

export default function MeetTheCrew() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" as any });

  const active = openIndex === null ? null : BOARD_MEMBERS[openIndex];

  return (
    <section className="relative w-full bg-[#14181B] py-20 md:py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* ── Heading ─────────────────────────────────────────── */}
        <Reveal className="text-center">
          <span className="block text-[14px] md:text-[16px] font-semibold uppercase tracking-[0.42em] text-white/45">
            Meet the Crew
          </span>
          <h2 className="mt-5 text-[3rem] sm:text-[4rem] lg:text-[4.5rem] leading-[1.1] tracking-tight text-white">
            <span className="font-bold">People Behind </span>
            <span className="font-light text-white/95">the Progress</span>
          </h2>
          <p className="mt-4 text-md md:text-lg text-white/55">
            Different skills. One shared purpose.
          </p>
        </Reveal>

        {/* ── Arch grid ───────────────────────────────────────── */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "show" : "hidden"}
          className="mt-14 md:mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 w-full lg:gap-20"
        >
          {BOARD_MEMBERS.map((member, i) => (
            <ArchCard
              key={member.name}
              member={member}
              pastel={PASTELS[i % PASTELS.length]}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* ── Profile panel ───────────────────────────────────── */}
        <AnimatePresence initial={false} mode="wait">
          {active && (
            <motion.div
              key={active.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: EASE.outExpo }}
              className="overflow-hidden"
            >
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{active.name}</h3>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#cc9933]">
                    {active.role}
                  </span>
                </div>
                <div className="mt-5 space-y-4 max-w-4xl">
                  {active.bio.split("\n\n").map((para, i) => (
                    <p key={i} className="text-sm md:text-[15px] leading-relaxed text-white/70">
                      {para}
                    </p>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
                >
                  Close profile
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer rule ─────────────────────────────────────── */}
        <Reveal className="mt-16 md:mt-20 flex items-center justify-center gap-4">
          <span className="h-px w-8 bg-white/25" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
            A stronger tomorrow, together
          </span>
          <span className="h-px w-8 bg-white/25" />
        </Reveal>
      </div>
    </section>
  );
}
