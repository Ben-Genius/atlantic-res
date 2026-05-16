"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { navigation } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Real transparent PNG cutouts from /public/assets/images/cutouts/
const floatingItems = [
    { img: '/assets/images/cutouts/dish1.png', top: '38%', left: '13%', size: 'max-w-[240px] md:max-w-[340px]', rotation: '-18deg', scale: 1.05, blur: 0, floatDelay: '0.2s' },
    { img: '/assets/images/cutouts/dish4.png', top: '74%', left: '20%', size: 'max-w-[200px] md:max-w-[280px]', rotation: '-7deg', scale: 1.0, blur: 0, floatDelay: '0.9s' },
    { img: '/assets/images/cutouts/dish2.png', top: '36%', left: '87%', size: 'max-w-[250px] md:max-w-[350px]', rotation: '22deg', scale: 1.1, blur: 0, floatDelay: '0s' },
    { img: '/assets/images/cutouts/dish5.png', top: '76%', left: '81%', size: 'max-w-[210px] md:max-w-[290px]', rotation: '28deg', scale: 1.0, blur: 0, floatDelay: '0.7s' },
    { img: '/assets/images/cutouts/dish3.png', top: '11%', left: '28%', size: 'max-w-[180px] md:max-w-[240px]', rotation: '-28deg', scale: 0.9, blur: 1, floatDelay: '0.5s' },
    { img: '/assets/images/cutouts/dish6.png', top: '9%', left: '72%', size: 'max-w-[160px] md:max-w-[220px]', rotation: '13deg', scale: 0.85, blur: 1.5, floatDelay: '1.1s' },
    { img: '/assets/images/cutouts/dish7.png', top: '6%', left: '50%', size: 'max-w-[150px] md:max-w-[190px]', rotation: '6deg', scale: 0.8, blur: 2, floatDelay: '0.8s' },
];

export default function TestPage() {
    const [progress, setProgress] = useState(0);
    const [loaderOut, setLoaderOut] = useState(false);
    const [showItems, setShowItems] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Loader → reveal sequence
    useEffect(() => {
        let n = 0;
        const timer = setInterval(() => {
            n += Math.floor(Math.random() * 9) + 3;
            if (n > 100) n = 100;
            setProgress(n);
            if (n === 100) {
                clearInterval(timer);
                setTimeout(() => setLoaderOut(true), 480);
                setTimeout(() => setShowItems(true), 640);
                setTimeout(() => setShowText(true), 940);
                setTimeout(() => setShowBanner(true), 1180);
            }
        }, 40);
        return () => clearInterval(timer);
    }, []);

    // Scroll lock while loader is up or menu is open
    useEffect(() => {
        document.body.style.overflow = (!loaderOut || isMenuOpen) ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [loaderOut, isMenuOpen]);

    return (
        <div
            className="relative min-h-screen bg-[#F5F3EE] overflow-hidden"
            style={{ fontFamily: "'Poppins', sans-serif" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800;900&display=swap');
                @keyframes bobble {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-16px); }
                }
            `}</style>



            {/* ── FLOATING DISH CUTOUTS ────────────────────────── */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {floatingItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="absolute"
                        style={{
                            top: item.top,
                            left: item.left,
                            transform: `translate(-50%, -50%) scale(${showItems ? item.scale : 0}) rotate(${showItems ? item.rotation : '0deg'})`,
                            opacity: showItems ? 1 : 0,
                            filter: `blur(${item.blur}px)`,
                            transition: 'transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), opacity 750ms ease',
                            transitionDelay: `${idx * 62}ms`,
                        }}
                    >
                        <div
                            style={{
                                animation: showItems
                                    ? `bobble ${5.2 + idx * 0.3}s ease-in-out ${idx * 0.062 + 1.5}s infinite`
                                    : 'none',
                            }}
                        >
                            <img
                                src={item.img}
                                alt=""
                                className={item.size}
                                style={{
                                    display: 'block',
                                    filter: 'drop-shadow(0 22px 40px rgba(0,0,0,0.22))',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>



            {/* ── HERO TEXT ────────────────────────────────────────
                  h1 = normal flow → sits behind z-10 floating items
                  banner + CTA = z-[20] → in front of items          ── */}
            <main className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">

                <h1
                    className={`font-black uppercase leading-[0.85] tracking-[-0.04em] text-[#1c2e1d] transition-all duration-[1000ms] ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ fontSize: 'clamp(58px, 11.5vw, 130px)' }}
                >
                    EXCEPTIONAL<br />CATERING
                </h1>

                <div
                    className={`relative z-[20] mt-5 bg-[#47AD3E] transition-all duration-[850ms] ${showBanner ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
                    style={{ padding: 'clamp(10px,2vw,18px) clamp(28px,5vw,52px)', borderRadius: '3px' }}
                >
                    <span
                        className="text-white font-black uppercase tracking-[0.06em]"
                        style={{ fontSize: 'clamp(20px, 3.8vw, 46px)' }}
                    >
                        Catering + Logistics
                    </span>
                </div>

                <p
                    className={`relative z-[20] mt-6 max-w-md text-[#3d4d3e] leading-relaxed transition-all duration-[1000ms] ${showBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    style={{ transitionDelay: '100ms', fontSize: 'clamp(14px, 1.7vw, 17px)' }}
                >
                    World-class culinary experiences for offshore rigs, corporate events, and unforgettable occasions.
                </p>

                <button
                    className={`relative z-[20] mt-9 bg-[#F39200] text-white font-black uppercase tracking-widest hover:bg-[#d98200] hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-700 ${showBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    style={{ transitionDelay: '200ms', padding: 'clamp(13px,1.8vw,18px) clamp(36px,4.5vw,56px)', fontSize: 'clamp(11px, 1.1vw, 14px)', borderRadius: '3px' }}
                >
                    Book Your Event
                </button>
            </main>
        </div>
    );
}
