'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MarqueeLogoScroller } from '@/components/ui/marquee-logo-scroller'

const categories = [
    { id: -1, name: 'All Clients', color: 'slate' },
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

const getGradient = (categoryId: number) => {
    switch (categoryId) {
        case 0: return { from: '#66cc33', via: '#85d959', to: '#a3e680' }; // emerald
        case 1: return { from: '#3C8B36', via: '#4ea847', to: '#62c459' }; // forest
        case 2: return { from: '#A4D79C', via: '#bce4b6', to: '#d3f0ce' }; // mint
        case 3: return { from: '#296ed6', via: '#528ce0', to: '#7aa9ea' }; // teal
        case 4: return { from: '#cc9933', via: '#d9ae5c', to: '#e6c485' }; // lime
        case 5: return { from: '#D4A556', via: '#dfbb7c', to: '#e9d1a1' }; // classic
        case 6: return { from: '#b048b8', via: '#c46bd2', to: '#d88ee6' }; // olive
        default: return { from: '#e2e8f0', via: '#cbd5e1', to: '#94a3b8' };
    }
}

export default function CorporateClientsSection() {
    const [activeCategoryId, setActiveCategoryId] = useState(-1);
    const activeCategory = categories.find(c => c.id === activeCategoryId);

    const displayedLogos = activeCategoryId === -1
        ? corporateLogos
        : corporateLogos.filter(logo => logo.categories.includes(activeCategoryId));

    // Determine gradient based on the logo's category or fallback
    const formattedLogos = displayedLogos.map(logo => ({
        src: logo.url,
        alt: logo.name,
        gradient: getGradient(logo.categories[0] ?? -1)
    }));

    return (
        <section className="home-s3 w-full py-10 md:py-20 px-4 md:px-10 lg:px-16 xl:px-24 flex flex-col items-center bg-white">
            <style dangerouslySetInnerHTML={{
                __html: `
        .home-s3 {
            background-color: #ffffff;
            color: #111827;
            font-family: 'Outfit', sans-serif;
        }
        .home-s3-tags {
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            border: 0.5px solid rgba(17, 24, 39, 0.15);
            border-radius: 0.375rem;
        }
        .home-s3-tags:hover {
            transform: translateY(-1px);
            border-color: #3C8B36;
            color: #3C8B36;
        }
        .home-s3-tags.slate.active-tag { background-color: #475569; color: #ffffff; border: 2px solid #475569; opacity: 1 !important; }
        .home-s3-tags.emerald.active-tag { background-color: #66cc33; color: #ffffff; border: 2px solid #66cc33; opacity: 1 !important; }
        .home-s3-tags.forest.active-tag { background-color: #3C8B36; color: #ffffff; border: 2px solid #3C8B36; opacity: 1 !important; }
        .home-s3-tags.mint.active-tag { background-color: #A4D79C; color: #1a1a1a; border: 2px solid #A4D79C; opacity: 1 !important; }
        .home-s3-tags.teal.active-tag { background-color: #296ed6; color: #ffffff; border: 2px solid #296ed6; opacity: 1 !important; }
        .home-s3-tags.lime.active-tag { background-color: #cc9933; color: #ffffff; border: 2px solid #cc9933; opacity: 1 !important; }
        .home-s3-tags.classic.active-tag { background-color: #D4A556; color: #1a1a1a; border: 2px solid #D4A556; opacity: 1 !important; }
        .home-s3-tags.olive.active-tag { background-color: #b048b8; color: #ffffff; border: 2px solid #b048b8; opacity: 1 !important; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

            <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-gray-100">
                    <div>
                        <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight select-none">
                            Our Corporate Clients
                        </h2>
                    </div>


                </div>


                <div className="w-full overflow-hidden">
                    <MarqueeLogoScroller
                        title=""
                        description={activeCategoryId === -1 ? "Trusted by business leaders across the globe." : `Industry leaders in ${activeCategory?.name} who trust our services.`}
                        logos={formattedLogos}
                        speed="normal"
                        className="shadow-none border-none p-0 bg-transparent"
                    />
                </div>
            </div>
        </section>
    )
}
