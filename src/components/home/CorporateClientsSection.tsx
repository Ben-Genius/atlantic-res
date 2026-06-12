'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const categories = [
    { id: 0, name: 'Services', color: 'emerald' },
    { id: 1, name: 'Fashion', color: 'forest' },
    { id: 2, name: 'Wellness', color: 'mint' },
    { id: 3, name: 'Retail & Lifestyle', color: 'teal' },
    { id: 4, name: 'Social Impact', color: 'lime' },
    { id: 5, name: 'F&B', color: 'classic' },
    { id: 6, name: 'Sustainability', color: 'olive' }
];

const corporateLogos = [
    { name: "Atlantic Operation 1", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/08/Image-1.png", categories: [3] },
    { name: "Atlantic Operation 3", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/08/Image-3.png", categories: [3] },
    { name: "Atlantic Operation 5", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/08/Image-5.png", categories: [3] },
    { name: "Atlantic Operation 4", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/08/Image-4.png", categories: [3] },
    { name: "Atlantic Operation 2", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/08/Image-2.png", categories: [3] },
    { name: "Atlantic Operation 6", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/08/Image-6.png", categories: [3] },
    { name: "Kal Tire", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/09/kal-tire-e1599687116994.png", categories: [1] },
    { name: "Logistics Direct", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/09/logistics-direct-e1599687152857.png", categories: [1] },
    { name: "SMTC Global", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/09/smtc-global-e1599687257388.png", categories: [0] },
    { name: "G4S Security", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/09/g4s-security-e1599687209114.png", categories: [0] },
    { name: "AEL Mining", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/09/ael-mining-e1599687034681.png", categories: [0] },
    { name: "Mantrac", url: "https://atlanticcatering-gh.com/wp-content/uploads/2025/03/MANTRAC-LOGO.jpeg", categories: [0] },
    { name: "Phoenix", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/10/Atlantic-Phoenix.jpg", categories: [2] },
    { name: "Calbank", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/10/Atlantic-Calbank.png", categories: [4] },
    { name: "Nestle", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/10/Atlantic-Nestle.png", categories: [2] },
    { name: "Eni", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/10/Atlantic-Eni.png", categories: [6] },
    { name: "CIMG", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/10/Atlantic-CIMG.png", categories: [4] },
    { name: "Ghana Chamber", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/10/AtlanticChana-chm.png", categories: [4] },
    { name: "Nawa", url: "https://atlanticcatering-gh.com/wp-content/uploads/2020/10/Atlantic-Nawa.png", categories: [5] },
    { name: "CMN", url: "https://atlanticcatering-gh.com/wp-content/uploads/2023/02/cmn_logo01.png", categories: [5] },
    { name: "Vivo Energy", url: "https://atlanticcatering-gh.com/wp-content/uploads/2025/03/VIVO-ENERGY-LOGO.jpeg", categories: [6] },
    { name: "Newmont", url: "https://atlanticcatering-gh.com/wp-content/uploads/2025/03/NEWMONT-LOGO.jpeg", categories: [6] },
    { name: "UMA", url: "https://atlanticcatering-gh.com/wp-content/uploads/2025/03/UMA-LOGO.jpeg", categories: [4] },
    { name: "AMS", url: "https://atlanticcatering-gh.com/wp-content/uploads/2025/03/AMS-LOGO.jpeg", categories: [0] },
    { name: "Borr Drilling", url: "https://atlanticcatering-gh.com/wp-content/uploads/2025/03/BORR-DRILLING-LOGO.jpeg", categories: [6] },
    { name: "CTP", url: "https://atlanticcatering-gh.com/wp-content/uploads/2025/03/CTP-LOGO.jpeg", categories: [6] },
    { name: "Macdan Aviation", url: "https://atlanticcatering-gh.com/wp-content/uploads/2025/03/MACDAN-AVIATION-LOGO.jpeg", categories: [1] },
    { name: "Nyaho Medical", url: "https://atlanticcatering-gh.com/wp-content/uploads/2025/03/NYAHO-LOGO.jpeg", categories: [2] }
];

export default function CorporateClientsSection() {
    const [activeCategoryId, setActiveCategoryId] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const activeCategory = categories.find(c => c.id === activeCategoryId);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        tl.fromTo('.home-s3-header', 
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo('.home-s3-tags',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.2)' },
            '-=0.6'
        )
        .fromTo('#showcase-card',
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="home-s3 w-full py-10 md:py-20 px-4 flex flex-col items-center">
            <style dangerouslySetInnerHTML={{
                __html: `
        .home-s3 {
            background-color: #ffffff;
            color: #111827;
            font-family: 'Outfit', sans-serif;
            transition: all 0.4s ease;
        }

        .home-s3-tags {
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            border: 0.5px solid rgba(17, 24, 39, 0.15);
            border-radius: 0.375rem;
        }
        .home-s3-tags:hover {
            transform: translateY(-1px);
            border-color: #15803d;
            color: #15803d;
        }

        .home-s3-tags.emerald.active-tag { background-color: #059669; color: #ffffff; border: 2px solid #059669; opacity: 1 !important; }
        .home-s3-tags.forest.active-tag { background-color: #15803d; color: #ffffff; border: 2px solid #15803d; opacity: 1 !important; }
        .home-s3-tags.mint.active-tag { background-color: #10b981; color: #ffffff; border: 2px solid #10b981; opacity: 1 !important; }
        .home-s3-tags.teal.active-tag { background-color: #0d9488; color: #ffffff; border: 2px solid #0d9488; opacity: 1 !important; }
        .home-s3-tags.lime.active-tag { background-color: #22c55e; color: #ffffff; border: 2px solid #22c55e; opacity: 1 !important; }
        .home-s3-tags.classic.active-tag { background-color: #35b435; color: #ffffff; border: 2px solid #35b435; opacity: 1 !important; }
        .home-s3-tags.olive.active-tag { background-color: #65a30d; color: #ffffff; border: 2px solid #65a30d; opacity: 1 !important; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .glow-active-emerald { box-shadow: 0 10px 30px -10px rgba(5, 150, 105, 0.25); border-color: rgba(5, 150, 105, 0.3); }
        .glow-active-forest { box-shadow: 0 10px 30px -10px rgba(21, 128, 61, 0.25); border-color: rgba(21, 128, 61, 0.3); }
        .glow-active-mint { box-shadow: 0 10px 30px -10px rgba(16, 185, 129, 0.25); border-color: rgba(16, 185, 129, 0.3); }
        .glow-active-teal { box-shadow: 0 10px 30px -10px rgba(13, 148, 136, 0.25); border-color: rgba(13, 148, 136, 0.3); }
        .glow-active-lime { box-shadow: 0 10px 30px -10px rgba(34, 197, 94, 0.25); border-color: rgba(34, 197, 94, 0.3); }
        .glow-active-classic { box-shadow: 0 10px 30px -10px rgba(53, 180, 53, 0.25); border-color: rgba(53, 180, 53, 0.3); }
        .glow-active-olive { box-shadow: 0 10px 30px -10px rgba(101, 163, 13, 0.25); border-color: rgba(101, 163, 13, 0.3); }
      `}} />
            <div className="w-full px-4 md:px-10 lg:px-16 xl:px-24 flex flex-col items-center bg-white">
                {/* Header Row */}
                <div className="home-s3-header w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-gray-100">
                    <div>
                        <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight select-none">
                            Our Corporate Clients
                        </h2>
                    </div>

                    <Link href="/works" className="flex items-center gap-2 group shrink-0 animate-pulse hover:animate-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://cdn.prod.website-files.com/655209917a52d19d010add67/6555cd19a58a355c010afca3_our%20work.svg" alt="Our Work Vector" className="h-10 w-10 transition-transform duration-300 group-hover:rotate-12 filter hue-rotate-[90deg] saturate-[1.5]" />
                        <span className="font-outfit font-bold text-lg text-green-700 hover:text-emerald-600 underline decoration-2 underline-offset-4 transition-colors">
                            our work
                        </span>
                    </Link>
                </div>

                {/* Tab Content */}
                <div className="w-full">
                    <div className="flex flex-col mb-10 w-full relative">
                        <div className="flex flex-row md:justify-center gap-2.5 overflow-x-auto no-scrollbar snap-x scroll-smooth w-full px-2 py-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`home-s3-tags ${cat.color} px-2.5 py-1 text-xs font-bold uppercase tracking-wider shadow-sm whitespace-nowrap snap-start ${activeCategoryId === cat.id ? 'active-tag' : 'opacity-60 hover:opacity-100'}`}
                                    onClick={() => setActiveCategoryId(cat.id)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden opacity-75"></div>
                        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden opacity-75"></div>
                    </div>

                    <div id="showcase-card" className={`w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl transition-all duration-500 overflow-hidden`}>
                        <div id="logos-grid" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-x-6 gap-y-5 justify-center items-center">
                            {corporateLogos.map((logo, idx) => {
                                const isMatched = logo.categories.includes(activeCategoryId);
                                return (
                                    <motion.div
                                        key={idx}
                                        className="logo-item w-full flex items-center justify-center p-1.5 select-none"
                                        initial={false}
                                        animate={{
                                            filter: isMatched ? 'grayscale(0%)' : 'grayscale(100%)',
                                            opacity: isMatched ? 1 : 0.22,
                                            scale: isMatched ? 1.05 : 0.92
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            type: "spring",
                                            bounce: 0.4,
                                            delay: isMatched ? (idx % 10) * 0.03 : 0
                                        }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={logo.url}
                                            alt={logo.name}
                                            className="max-w-full max-h-20 sm:max-h-20 object-contain pointer-events-none transition-all duration-300"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                (e.target as HTMLImageElement).nextElementSibling?.classList.add('block');
                                            }}
                                        />
                                        <span className="hidden text-[9px] sm:text-[10px] font-bold text-slate-900 uppercase tracking-wider text-center">
                                            {logo.name}
                                        </span>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
