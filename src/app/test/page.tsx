"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAME_COUNT = 104;
const FRAME_PATH = (i: number) =>
  `/frames/heroFrames/ezgif-frame-${String(i).padStart(3, "0")}.png`;

const DISHES = [
  "/assets/images/dishes/seafood.png",
  "/assets/images/dishes/steak.png",
  "/assets/images/dishes/jollof.png",
  "/assets/images/dishes/lobster-cutout.png",
  "/assets/images/dishes/lamb-cutout.png",
  "/assets/images/dishes/dessert.png",
];

export default function TestPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dishesWrapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(0);

  // Preload all frames before mounting the scroll animation
  useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const frames: (HTMLCanvasElement | null)[] = new Array(FRAME_COUNT).fill(null);
      const frameState = { index: 0 };

      // Strip the soft white/grey backdrop from a frame using a luma key,
      // baking transparency into an offscreen canvas. Done once at load time.
      const stripBackdrop = (img: HTMLImageElement): HTMLCanvasElement => {
        const off = document.createElement("canvas");
        off.width = img.naturalWidth;
        off.height = img.naturalHeight;
        const octx = off.getContext("2d", { willReadFrequently: false });
        if (!octx) return off;
        octx.drawImage(img, 0, 0);
        const data = octx.getImageData(0, 0, off.width, off.height);
        const px = data.data;
        // Thresholds: pixels brighter than HI become fully transparent,
        // between LO..HI fade linearly. Below LO are kept (food, plate, shadows).
        const HI = 240;
        const LO = 205;
        for (let i = 0; i < px.length; i += 4) {
          const r = px[i];
          const g = px[i + 1];
          const b = px[i + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum >= HI) {
            px[i + 3] = 0;
          } else if (lum > LO) {
            const t = (HI - lum) / (HI - LO);
            px[i + 3] = px[i + 3] * t;
          }
        }
        octx.putImageData(data, 0, 0);
        return off;
      };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        render();
      };

      const render = () => {
        const src = frames[Math.round(frameState.index)];
        if (!src) return;
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
        const iw = src.width;
        const ih = src.height;
        const scale = Math.min(rect.width / iw, rect.height / ih);
        const w = iw * scale;
        const h = ih * scale;
        const x = (rect.width - w) / 2;
        const y = (rect.height - h) / 2;
        ctx.drawImage(src, x, y, w, h);
      };

      let loadedCount = 0;
      for (let i = 0; i < FRAME_COUNT; i++) {
        const idx = i;
        const img = new window.Image();
        img.decoding = "async";
        img.src = FRAME_PATH(idx + 1);
        const finish = () => {
          if (img.complete && img.naturalWidth > 0) {
            try {
              frames[idx] = stripBackdrop(img);
            } catch {
              // ignore frame on error
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

      window.addEventListener("resize", resize);
      resize();

      // Scrub frame index with scroll
      const tween = gsap.to(frameState, {
        index: FRAME_COUNT - 1,
        ease: "none",
        snap: "index",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stageRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        },
        onUpdate: render,
      });

      // Right-side dish cross-fade tied to same scroll range
      const dishEls = dishesWrapRef.current?.querySelectorAll<HTMLElement>(
        "[data-dish]"
      );
      if (dishEls && dishEls.length) {
        gsap.set(dishEls, { autoAlpha: 0, scale: 0.92, yPercent: 8 });
        gsap.set(dishEls[0], { autoAlpha: 1, scale: 1, yPercent: 0 });

        const dishTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
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
                scale: 0.94,
                yPercent: -10,
                duration: seg * 0.6,
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
                duration: seg * 0.6,
                ease: "power2.out",
              },
              i * seg
            );
        });
      }

      // Foreground content reveal on load
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
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
    <div ref={rootRef} className="relative h-[280vh] bg-white text-[#0d0d0d]">
      {/* Loader */}
      {loaded < FRAME_COUNT && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-40 overflow-hidden bg-black/10">
              <div
                className="h-full bg-[#1B4332] transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] tracking-[0.3em] text-black/50">
              LOADING {progress}%
            </span>
          </div>
        </div>
      )}

      {/* Pinned stage */}
      <div
        ref={stageRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Giant background word */}
        <div className="pointer-events-none absolute inset-x-0 top-[14vh] flex justify-center">
          <h1
            className="hero-reveal select-none whitespace-nowrap font-serif font-black tracking-tight text-black/[0.05]"
            style={{ fontSize: "clamp(120px, 17vw, 300px)", lineHeight: 1 }}
          >
            EXPERIENCE
          </h1>
        </div>

        {/* Vertical SCROLL tick on left */}
        <div className="hero-reveal absolute left-6 top-1/2 z-[5] -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] text-[10px] tracking-[0.4em] text-black/40">
          SCROLL
        </div>

        {/* Center canvas — stop motion sequence (backdrop already keyed out) */}
        <div className="absolute left-[2vw] top-1/2 z-[2] h-[72vh] w-[52%] -translate-y-1/2">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        {/* Right side: copy + dish reel */}
        <div className="absolute inset-y-0 right-0 z-[3] flex w-[45%] items-center pr-[7vw]">
          <div className="relative w-full">
            {/* Floating dishes — far right edge, peeking in */}
            <div
              ref={dishesWrapRef}
              className="pointer-events-none absolute -right-[10vw] top-[12vh] h-[18vw] w-[18vw]"
            >
              {DISHES.map((src) => (
                <div
                  key={src}
                  data-dish
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ mixBlendMode: "multiply" }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="18vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Copy block */}
            <div className="hero-reveal flex items-center gap-3">
              <span className="h-px w-10 bg-[#C8960C]" />
              <span className="text-xs font-semibold tracking-[0.35em] text-[#C8960C]">
                SINCE 1988
              </span>
            </div>

            <h2
              className="hero-reveal mt-5 font-serif font-black uppercase leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(36px, 4.4vw, 76px)" }}
            >
              Wonderful Dining
              <br />
              Experience &amp; Food.
            </h2>

            <p className="hero-reveal mt-6 max-w-md text-[15px] leading-relaxed text-black/60">
              Atlantic Restaurant Services has been crafting unforgettable
              dining moments for over three decades — fresh ingredients,
              precise technique, and a setting that lingers long after the
              last course.
            </p>

            <div className="hero-reveal mt-8 flex items-center gap-6">
              <a
                href="#"
                className="group inline-flex items-center gap-3 bg-[#1B4332] px-7 py-4 text-xs font-semibold tracking-[0.25em] text-white transition-colors hover:bg-[#2D6A4F]"
              >
                ABOUT RESTAURANT
                <span className="block h-px w-6 bg-white transition-all group-hover:w-10" />
              </a>

              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#C8960C]/40 text-[#C8960C]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <a
                  href="tel:1800222000"
                  className="text-base font-bold tracking-wide"
                >
                  1-800-222-000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom feature row */}
        <div className="hero-reveal absolute inset-x-0 bottom-8 z-[4] mx-auto grid max-w-6xl grid-cols-3 gap-6 px-8">
          {[
            {
              title: "FAST DELIVERY",
              sub: "Within 30 minutes",
              icon: (
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              ),
            },
            {
              title: "ABSOLUTE DINING",
              sub: "Best buffet restaurant",
              icon: (
                <>
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.5 13L17 22l-5-3-5 3 1.5-9" />
                </>
              ),
            },
            {
              title: "PICKUP DELIVERY",
              sub: "Grab your food order",
              icon: (
                <>
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </>
              ),
            },
          ].map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-4 px-2 py-3"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-black/5 bg-white text-[#1B4332] shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {f.icon}
                </svg>
              </span>
              <div>
                <div className="text-[13px] font-bold tracking-[0.15em]">
                  {f.title}
                </div>
                <div className="text-xs text-black/50">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
