// "use client";

// import React, { useRef, useState } from "react";
// import { useGSAP } from "@gsap/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger, useGSAP);

// const FRAME_COUNT = 104;
// const FRAME_PATH = (i: number) =>
//     `/frames/hero/ezgif-frame-${String(i).padStart(3, "0")}.png`;

// const DISHES = [
//     "/assets/images/dishes/seafood.png",
//     "/assets/images/dishes/steak.png",
//     "/assets/images/dishes/jollof.png",
//     "/assets/images/dishes/lobster-cutout.png",
//     "/assets/images/dishes/lamb-cutout.png",
//     "/assets/images/dishes/dessert.png",
// ];

// // Luma-key: remove near-white backdrop into transparency, fade the edge
// // region linearly so anti-aliased borders blend cleanly into the page.
// function keyImage(
//     img: HTMLImageElement,
//     hi: number,
//     lo: number
// ): HTMLCanvasElement {
//     const c = document.createElement("canvas");
//     c.width = img.naturalWidth;
//     c.height = img.naturalHeight;
//     const cx = c.getContext("2d");
//     if (!cx) return c;
//     cx.drawImage(img, 0, 0);
//     const data = cx.getImageData(0, 0, c.width, c.height);
//     const px = data.data;
//     for (let i = 0; i < px.length; i += 4) {
//         const r = px[i];
//         const g = px[i + 1];
//         const b = px[i + 2];
//         const lum = 0.299 * r + 0.587 * g + 0.114 * b;
//         if (lum >= hi) {
//             px[i + 3] = 0;
//         } else if (lum > lo) {
//             px[i + 3] = px[i + 3] * ((hi - lum) / (hi - lo));
//         }
//     }
//     cx.putImageData(data, 0, 0);
//     return c;
// }

// export default function TestPage() {
//     const rootRef = useRef<HTMLDivElement>(null);
//     const stageRef = useRef<HTMLDivElement>(null);
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const canvasFloatRef = useRef<HTMLDivElement>(null);
//     const dishesWrapRef = useRef<HTMLDivElement>(null);
//     const dishesFloatRef = useRef<HTMLDivElement>(null);
//     const dishCanvasRefs = useRef<(HTMLCanvasElement | null)[]>(
//         new Array(DISHES.length).fill(null)
//     );
//     const [loaded, setLoaded] = useState(0);

//     useGSAP(
//         () => {
//             const canvas = canvasRef.current;
//             if (!canvas) return;
//             const ctx = canvas.getContext("2d");
//             if (!ctx) return;

//             const frames: (HTMLCanvasElement | null)[] = new Array(
//                 FRAME_COUNT
//             ).fill(null);
//             const frameState = { index: 0 };

//             const resize = () => {
//                 const dpr = Math.min(window.devicePixelRatio || 1, 2);
//                 const rect = canvas.getBoundingClientRect();
//                 canvas.width = rect.width * dpr;
//                 canvas.height = rect.height * dpr;
//                 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//                 render();
//             };

//             const render = () => {
//                 const src = frames[Math.round(frameState.index)];
//                 if (!src) return;
//                 const rect = canvas.getBoundingClientRect();
//                 ctx.clearRect(0, 0, rect.width, rect.height);
//                 const iw = src.width;
//                 const ih = src.height;
//                 const scale = Math.min(rect.width / iw, rect.height / ih) * 0.95;
//                 const w = iw * scale;
//                 const h = ih * scale;
//                 const x = (rect.width - w) / 2;
//                 const y = (rect.height - h) / 2;
//                 ctx.drawImage(src, x, y, w, h);
//             };

//             // Stop-motion frame preload with aggressive luma key
//             let loadedCount = 0;
//             for (let i = 0; i < FRAME_COUNT; i++) {
//                 const idx = i;
//                 const img = new window.Image();
//                 img.decoding = "async";
//                 img.src = FRAME_PATH(idx + 1);
//                 const finish = () => {
//                     if (img.complete && img.naturalWidth > 0) {
//                         try {
//                             frames[idx] = keyImage(img, 228, 168);
//                         } catch {
//                             /* swallow */
//                         }
//                     }
//                     loadedCount += 1;
//                     setLoaded(loadedCount);
//                     if (loadedCount === FRAME_COUNT) {
//                         resize();
//                         ScrollTrigger.refresh();
//                     }
//                 };
//                 img.onload = finish;
//                 img.onerror = finish;
//             }

//             // Dish image keying — same chroma approach, each baked into its DOM canvas
//             DISHES.forEach((src, i) => {
//                 const target = dishCanvasRefs.current[i];
//                 if (!target) return;
//                 const img = new window.Image();
//                 img.decoding = "async";
//                 img.src = src;
//                 img.onload = () => {
//                     const keyed = keyImage(img, 240, 200);
//                     target.width = keyed.width;
//                     target.height = keyed.height;
//                     const tctx = target.getContext("2d");
//                     tctx?.drawImage(keyed, 0, 0);
//                 };
//             });

//             window.addEventListener("resize", resize);
//             resize();

//             // Scroll-scrubbed frame index
//             const tween = gsap.to(frameState, {
//                 index: FRAME_COUNT - 1,
//                 ease: "none",
//                 snap: "index",
//                 scrollTrigger: {
//                     trigger: rootRef.current,
//                     start: "top top",
//                     end: "bottom bottom",
//                     scrub: 1,
//                     pin: stageRef.current,
//                     pinSpacing: false,
//                     anticipatePin: 1,
//                 },
//                 onUpdate: render,
//             });

//             // Dish cross-fade on scroll
//             const dishEls = dishesWrapRef.current?.querySelectorAll<HTMLElement>(
//                 "[data-dish]"
//             );
//             if (dishEls && dishEls.length) {
//                 gsap.set(dishEls, { autoAlpha: 0, scale: 0.9, yPercent: 6 });
//                 gsap.set(dishEls[0], { autoAlpha: 1, scale: 1, yPercent: 0 });

//                 const dishTl = gsap.timeline({
//                     scrollTrigger: {
//                         trigger: rootRef.current,
//                         start: "top top",
//                         end: "bottom bottom",
//                         scrub: 1,
//                     },
//                 });

//                 const seg = 1 / dishEls.length;
//                 dishEls.forEach((el, i) => {
//                     if (i === 0) return;
//                     const prev = dishEls[i - 1];
//                     dishTl
//                         .to(
//                             prev,
//                             {
//                                 autoAlpha: 0,
//                                 scale: 0.92,
//                                 yPercent: -8,
//                                 duration: seg * 0.55,
//                                 ease: "power2.inOut",
//                             },
//                             i * seg
//                         )
//                         .to(
//                             el,
//                             {
//                                 autoAlpha: 1,
//                                 scale: 1,
//                                 yPercent: 0,
//                                 duration: seg * 0.55,
//                                 ease: "power2.out",
//                             },
//                             i * seg
//                         );
//                 });

//                 // Subtle parallax on the dish stack
//                 gsap.to(dishesWrapRef.current, {
//                     yPercent: -14,
//                     ease: "none",
//                     scrollTrigger: {
//                         trigger: rootRef.current,
//                         start: "top top",
//                         end: "bottom bottom",
//                         scrub: 1,
//                     },
//                 });
//             }

//             // Idle floating motion — gives the hero life when scroll is still
//             if (canvasFloatRef.current) {
//                 gsap.to(canvasFloatRef.current, {
//                     y: -12,
//                     duration: 5.5,
//                     yoyo: true,
//                     repeat: -1,
//                     ease: "sine.inOut",
//                 });
//             }
//             if (dishesFloatRef.current) {
//                 gsap.to(dishesFloatRef.current, {
//                     y: -18,
//                     duration: 6.5,
//                     yoyo: true,
//                     repeat: -1,
//                     ease: "sine.inOut",
//                     delay: 0.4,
//                 });
//             }

//             // Foreground reveal
//             gsap.from(".hero-reveal", {
//                 y: 40,
//                 opacity: 0,
//                 duration: 1.1,
//                 ease: "power3.out",
//                 stagger: 0.08,
//                 delay: 0.15,
//             });

//             return () => {
//                 window.removeEventListener("resize", resize);
//                 tween.scrollTrigger?.kill();
//             };
//         },
//         { scope: rootRef }
//     );

//     const progress = Math.round((loaded / FRAME_COUNT) * 100);

//     return (
//         <div ref={rootRef} className="relative h-[280vh] bg-white text-[#0d0d0d]">
//             {loaded < FRAME_COUNT && (
//                 <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white">
//                     <div className="flex flex-col items-center gap-3">
//                         <div className="h-px w-40 overflow-hidden bg-black/10">
//                             <div
//                                 className="h-full bg-[#1B4332] transition-[width] duration-150"
//                                 style={{ width: `${progress}%` }}
//                             />
//                         </div>
//                         <span className="text-[10px] tracking-[0.3em] text-black/50">
//                             LOADING {progress}%
//                         </span>
//                     </div>
//                 </div>
//             )}

//             <div
//                 ref={stageRef}
//                 className="relative h-screen w-full overflow-hidden"
//             >
//                 {/* Soft atmospheric wash for depth */}
//                 <div
//                     className="pointer-events-none absolute inset-0 z-[1] bg-white "
//                 />

//                 {/* Editorial backdrop wordmark */}
//                 <div className="pointer-events-none absolute inset-x-0 top-[12vh] z-[1] flex justify-center">
//                     <h1
//                         className="hero-reveal select-none whitespace-nowrap font-black uppercase text-black/[0.04]"
//                         style={{ fontFamily: "'Antonio', sans-serif", fontSize: "clamp(120px, 18vw, 320px)", lineHeight: 0.8, transform: "scaleY(1.3)" }}
//                     >
//                         EXPERIENCE
//                     </h1>
//                 </div>

//                 <div className="hero-reveal absolute left-6 top-1/2 z-[5] -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] text-[10px] tracking-[0.4em] text-black/40">
//                     SCROLL
//                 </div>

//                 {/* Center stop-motion canvas — keyed transparent, with idle float */}
//                 <div className="absolute left-[2vw] top-1/2 z-[2] h-[75vh] w-[50%] -translate-y-1/2 mix-blend-multiply">
//                     <div ref={canvasFloatRef} className="h-full w-full will-change-transform">
//                         <canvas ref={canvasRef} className="h-full w-full object-contain mix-blend-multiply drop-shadow-2xl" />
//                     </div>
//                 </div>

//                 {/* Right column: copy */}
//                 <div className="absolute inset-y-0 right-[4vw] z-[3] flex w-[45%] items-center">
//                     <div className="relative w-full max-w-[550px]">
//                         <div className="hero-reveal flex items-center gap-3">
//                             <span className="h-px w-10 bg-[#C23527]" />
//                             <span className="text-[11px] font-bold tracking-[0.25em] text-[#C23527]">
//                                 SINCE 1988
//                             </span>
//                         </div>

//                         <h2
//                             className="hero-reveal mt-4 font-black uppercase leading-[0.95] tracking-tight text-[#222]"
//                             style={{ fontFamily: "'Antonio', sans-serif", fontSize: "clamp(42px, 5vw, 84px)" }}
//                         >
//                             WONDERFUL DINING
//                             <br />
//                             EXPERIENCE &amp; FOOD.
//                         </h2>

//                         <p className="hero-reveal mt-6 max-w-[420px] text-[14px] leading-[1.8] text-[#777]">
//                             Atlantic Restaurant Services has been crafting unforgettable
//                             dining moments for over three decades — fresh ingredients,
//                             precise technique, and a setting that lingers long after the
//                             last course.
//                         </p>

//                         <div className="hero-reveal mt-10 flex items-center gap-8">
//                             <a
//                                 href="#"
//                                 className="group inline-flex items-center gap-3 bg-[#333] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-black rounded-sm"
//                             >
//                                 ABOUT RESTAURANT
//                             </a>

//                             <div className="flex items-center gap-3">
//                                 <span className="grid h-10 w-10 place-items-center rounded-full border border-[#D49B24] text-[#D49B24]">
//                                     <svg
//                                         width="16"
//                                         height="16"
//                                         viewBox="0 0 24 24"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         strokeWidth="2"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                     >
//                                         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
//                                     </svg>
//                                 </span>
//                                 <a
//                                     href="tel:1800222000"
//                                     className="text-lg font-bold tracking-tight text-[#222]"
//                                 >
//                                     1-800-222-000
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Floating dish accent — far right edge, keyed transparent canvases */}
//                 <div
//                     ref={dishesFloatRef}
//                     className="pointer-events-none absolute right-[-6vw] top-[22vh] z-[2] h-[22vw] w-[22vw] will-change-transform mix-blend-multiply"
//                 >
//                     <div ref={dishesWrapRef} className="relative h-full w-full">
//                         {DISHES.map((src, i) => (
//                             <div
//                                 key={src}
//                                 data-dish
//                                 className="absolute inset-0 flex items-center justify-center"
//                             >
//                                 <canvas
//                                     ref={(el) => {
//                                         dishCanvasRefs.current[i] = el;
//                                     }}
//                                     className="block h-auto max-h-full w-auto max-w-full mix-blend-multiply drop-shadow-[0_20px_25px_rgba(0,0,0,0.25)]"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* FLOATING HERBS (Left edge) */}
//                 <img
//                     src="/assets/images/cutouts/dish5.png"
//                     className="pointer-events-none absolute left-[-4vw] bottom-[25vh] w-[14vw] z-[2] will-change-transform drop-shadow-[0_25px_30px_rgba(0,0,0,0.2)] mix-blend-multiply opacity-80"
//                     alt="Floating ingredients"
//                 />

//                 {/* FLOATING PEPPER (Center Top) */}
//                 <img
//                     src="/assets/images/cutouts/dish6.png"
//                     className="pointer-events-none absolute left-[40vw] top-[18vh] w-[8vw] z-[6] will-change-transform drop-shadow-[0_15px_20px_rgba(0,0,0,0.3)] mix-blend-multiply opacity-90"
//                     alt="Floating pepper"
//                 />

//                 {/* Bottom row — editorial, no boxes */}
//                 <div className="hero-reveal absolute inset-x-0 bottom-12 z-[4] mx-auto grid max-w-[1200px] grid-cols-3 gap-12 px-10">
//                     {[
//                         {
//                             title: "FAST DELIVERY",
//                             sub: "Within 30 minutes",
//                             icon: (
//                                 <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
//                             ),
//                         },
//                         {
//                             title: "ABSOLUTE DINING",
//                             sub: "Best buffet restaurant",
//                             icon: (
//                                 <>
//                                     <circle cx="12" cy="8" r="6" />
//                                     <path d="M15.5 13L17 22l-5-3-5 3 1.5-9" />
//                                 </>
//                             ),
//                         },
//                         {
//                             title: "PICKUP DELIVERY",
//                             sub: "Grab your food order",
//                             icon: (
//                                 <>
//                                     <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//                                     <line x1="3" y1="6" x2="21" y2="6" />
//                                     <path d="M16 10a4 4 0 0 1-8 0" />
//                                 </>
//                             ),
//                         },
//                     ].map((f) => (
//                         <div key={f.title} className="flex items-center gap-5 justify-center">
//                             <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] text-[#333]">
//                                 <svg
//                                     width="24"
//                                     height="24"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="1.5"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                 >
//                                     {f.icon}
//                                 </svg>
//                             </span>
//                             <div>
//                                 <div className="text-[13px] font-black tracking-[0.02em] text-[#222] font-['Antonio',_sans-serif] uppercase">
//                                     {f.title}
//                                 </div>
//                                 <div className="mt-1 text-[13px] text-[#777]">{f.sub}</div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAME_COUNT = 104;
const FRAME_PATH = (i: number) =>
    `/frames/hero/ezgif-frame-${String(i).padStart(3, "0")}.png`;

const DISHES = [
    "/assets/images/dishes/seafood.png",
    "/assets/images/dishes/steak.png",
    "/assets/images/dishes/jollof.png",
    "/assets/images/dishes/lobster-cutout.png",
    "/assets/images/dishes/lamb-cutout.png",
    "/assets/images/dishes/dessert.png",
];

const LEFT_DISHES = [...DISHES.slice(3), ...DISHES.slice(0, 3)];

// Aggressive luma-key: kills near-white backdrop completely, soft-fades
// the anti-aliased halo so cut-outs blend seamlessly into the page.
// hi = pure white threshold (alpha 0), lo = soft-edge floor (full opacity).
function keyImage(
    img: HTMLImageElement,
    hi: number,
    lo: number
): HTMLCanvasElement {
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const cx = c.getContext("2d");
    if (!cx) return c;
    cx.drawImage(img, 0, 0);
    const data = cx.getImageData(0, 0, c.width, c.height);
    const px = data.data;
    for (let i = 0; i < px.length; i += 4) {
        const r = px[i];
        const g = px[i + 1];
        const b = px[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        // Detect near-neutral (low chroma) pixels — those are background,
        // not the colored food. Saturated pixels stay solid even if bright.
        const maxC = Math.max(r, g, b);
        const minC = Math.min(r, g, b);
        const chroma = maxC - minC;
        if (lum >= hi && chroma < 20) {
            px[i + 3] = 0;
        } else if (lum > lo && chroma < 35) {
            const t = (hi - lum) / (hi - lo);
            px[i + 3] = px[i + 3] * Math.max(0, Math.min(1, t));
        }
    }
    cx.putImageData(data, 0, 0);
    return c;
}

export default function TestPage() {
    const rootRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasFloatRef = useRef<HTMLDivElement>(null);
    const dishesRightWrapRef = useRef<HTMLDivElement>(null);
    const dishesLeftWrapRef = useRef<HTMLDivElement>(null);
    const dishesRightFloatRef = useRef<HTMLDivElement>(null);
    const dishesLeftFloatRef = useRef<HTMLDivElement>(null);
    const dishCanvasRightRefs = useRef<(HTMLCanvasElement | null)[]>(
        new Array(DISHES.length).fill(null)
    );
    const dishCanvasLeftRefs = useRef<(HTMLCanvasElement | null)[]>(
        new Array(DISHES.length).fill(null)
    );
    const [loaded, setLoaded] = useState(0);

    useGSAP(
        () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const frames: (HTMLCanvasElement | null)[] = new Array(
                FRAME_COUNT
            ).fill(null);
            const frameState = { index: 0 };

            const render = () => {
                const src = frames[Math.round(frameState.index)];
                if (!src) return;
                const rect = canvas.getBoundingClientRect();
                ctx.clearRect(0, 0, rect.width, rect.height);
                const iw = src.width;
                const ih = src.height;
                // Scale the image to exactly match the container's height
                const scale = rect.height / ih;
                const w = iw * scale;
                const h = ih * scale;
                // Position flush left and flush top/bottom
                const x = 0;
                const y = 0;
                ctx.drawImage(src, x, y, w, h);
            };

            const resize = () => {
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                render();
            };

            // Stop-motion frame preload with aggressive chroma-aware luma key
            let loadedCount = 0;
            for (let i = 0; i < FRAME_COUNT; i++) {
                const idx = i;
                const img = new window.Image();
                img.decoding = "async";
                img.src = FRAME_PATH(idx + 1);
                const finish = () => {
                    if (img.complete && img.naturalWidth > 0) {
                        try {
                            // Wider keying range — eats the off-white frame cleanly
                            frames[idx] = keyImage(img, 245, 180);
                        } catch {
                            /* swallow */
                        }
                    }
                    loadedCount += 1;
                    setLoaded(loadedCount);
                    if (loadedCount === FRAME_COUNT) {
                        resize();
                        ScrollTrigger.refresh();
                    }
                };
                img.onload = finish;
                img.onerror = finish;
            }

            // Dish image keying for BOTH sides — bake into DOM canvases
            const keyAndPaint = (
                src: string,
                target: HTMLCanvasElement | null
            ) => {
                if (!target) return;
                const img = new window.Image();
                img.decoding = "async";
                img.crossOrigin = "anonymous";
                img.src = src;
                img.onload = () => {
                    const keyed = keyImage(img, 245, 195);
                    target.width = keyed.width;
                    target.height = keyed.height;
                    const tctx = target.getContext("2d");
                    tctx?.drawImage(keyed, 0, 0);
                };
            };
            DISHES.forEach((src, i) => {
                keyAndPaint(src, dishCanvasRightRefs.current[i]);
            });
            LEFT_DISHES.forEach((src, i) => {
                keyAndPaint(src, dishCanvasLeftRefs.current[i]);
            });

            window.addEventListener("resize", resize);
            resize();

            // Scroll-scrubbed frame index — smoother scrub value
            const tween = gsap.to(frameState, {
                index: FRAME_COUNT - 1,
                ease: "none",
                snap: "index",
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    pin: stageRef.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                },
                onUpdate: render,
            });

            // Cross-fade helper — same animation logic, mirrored for both sides
            const buildDishTimeline = (wrap: HTMLDivElement | null) => {
                if (!wrap) return;
                const dishEls = wrap.querySelectorAll<HTMLElement>("[data-dish]");
                if (!dishEls.length) return;
                gsap.set(dishEls, { autoAlpha: 0, scale: 0.88, yPercent: 8 });
                gsap.set(dishEls[0], { autoAlpha: 1, scale: 1, yPercent: 0 });

                const dishTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.8,
                    },
                });

                const seg = 1 / dishEls.length;
                dishEls.forEach((el, i) => {
                    if (i === 0) return;
                    const prev = dishEls[i - 1];
                    dishTl
                        .to(
                            prev,
                            {
                                autoAlpha: 0,
                                scale: 0.9,
                                yPercent: -10,
                                duration: seg * 0.5,
                                ease: "power2.inOut",
                            },
                            i * seg
                        )
                        .to(
                            el,
                            {
                                autoAlpha: 1,
                                scale: 1,
                                yPercent: 0,
                                duration: seg * 0.5,
                                ease: "power2.out",
                            },
                            i * seg
                        );
                });
            };
            buildDishTimeline(dishesRightWrapRef.current);
            buildDishTimeline(dishesLeftWrapRef.current);

            // Subtle parallax — right side goes up, left side goes down for contrast
            if (dishesRightWrapRef.current) {
                gsap.to(dishesRightWrapRef.current, {
                    yPercent: -16,
                    ease: "none",
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    },
                });
            }
            if (dishesLeftWrapRef.current) {
                gsap.to(dishesLeftWrapRef.current, {
                    yPercent: 12,
                    ease: "none",
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    },
                });
            }

            // Idle floating motion — gives life when scroll is still
            if (canvasFloatRef.current) {
                gsap.to(canvasFloatRef.current, {
                    y: -14,
                    duration: 5.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                });
            }
            if (dishesRightFloatRef.current) {
                gsap.to(dishesRightFloatRef.current, {
                    y: -20,
                    duration: 6.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: 0.4,
                });
            }
            if (dishesLeftFloatRef.current) {
                gsap.to(dishesLeftFloatRef.current, {
                    y: -16,
                    duration: 7,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: 0.9,
                });
            }

            // Foreground reveal
            gsap.from(".hero-reveal", {
                y: 40,
                opacity: 0,
                duration: 1.1,
                ease: "power3.out",
                stagger: 0.08,
                delay: 0.15,
            });

            return () => {
                window.removeEventListener("resize", resize);
                tween.scrollTrigger?.kill();
            };
        },
        { scope: rootRef }
    );

    const progress = Math.round((loaded / FRAME_COUNT) * 100);

    return (
        <div ref={rootRef} className="relative h-[220vh] bg-white text-[#0d0d0d]">


            <div
                ref={stageRef}
                className="relative h-screen w-full overflow-hidden bg-white"
            >
                <div className="hero-reveal absolute left-6 top-1/2 z-[5] -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] text-[10px] tracking-[0.4em] text-black/40">
                    SCROLL
                </div>

                {/* MAIN HERO DISH — fills the entire section */}
                <div className="relative inset-0 z-[2] h-full w-full">
                    <div
                        ref={canvasFloatRef}
                        className="h-full w-full flex items-center justify-center will-change-transform"
                    >
                        <canvas
                            ref={canvasRef}
                            className="h-full w-full object-contain  mix-blend-multiply"
                        />
                    </div>
                </div>

                {/* LEFT-SIDE FLOATING DISH STACK */}
                <div
                    ref={dishesLeftFloatRef}
                    className="pointer-events-none absolute  bottom-[0vh] right-0  z-[3] h-[14vw] w-[14vw] will-change-transform mix-blend-multiply"
                >
                    <div
                        ref={dishesLeftWrapRef}
                        className="relative h-full w-full"
                    >
                        {LEFT_DISHES.map((src, i) => (
                            <div
                                key={`left-${src}`}
                                data-dish
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <canvas
                                    ref={(el) => {
                                        dishCanvasLeftRefs.current[i] = el;
                                    }}
                                    className="block h-auto max-h-full w-auto max-w-full drop-shadow-[0_25px_30px_rgba(0,0,0,0.2)]"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT-SIDE FLOATING DISH STACK */}
                <div
                    ref={dishesRightFloatRef}
                    className="pointer-events-none absolute right-[-2vw] top-[10vh] z-[3] h-[14vw] w-[14vw] will-change-transform mix-blend-multiply"
                >
                    <div
                        ref={dishesRightWrapRef}
                        className="relative h-full w-full"
                    >
                        {DISHES.map((src, i) => (
                            <div
                                key={`right-${src}`}
                                data-dish
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <canvas
                                    ref={(el) => {
                                        dishCanvasRightRefs.current[i] = el;
                                    }}
                                    className="block h-auto max-h-full w-auto max-w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.22)]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}