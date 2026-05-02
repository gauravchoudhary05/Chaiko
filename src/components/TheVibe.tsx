"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   useCupScreenPosition — Projects the 3D cup's world position
   to 2D viewport-percentage coordinates every frame.
═══════════════════════════════════════════════════════════════ */
function useCupScreenPosition() {
    const [pos, setPos] = useState({ x: 50, y: 50, r: 18 });
    const rafId = useRef(0);

    const lerp = useCallback(
        (p: number, inR: number[], outR: number[]) => {
            const clamped = Math.max(inR[0], Math.min(p, inR[inR.length - 1]));
            for (let i = 0; i < inR.length - 1; i++) {
                if (clamped >= inR[i] && clamped <= inR[i + 1]) {
                    const t = (clamped - inR[i]) / (inR[i + 1] - inR[i]);
                    return outR[i] + (outR[i + 1] - outR[i]) * t;
                }
            }
            return outR[outR.length - 1];
        },
        []
    );

    useEffect(() => {
        const tick = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

            const wx = lerp(progress, [0, 1], [-4, 4]);
            const wy = lerp(progress, [0, 1], [3, -3]);
            const wz = lerp(progress, [0, 0.4, 0.7, 1], [0, 1.5, 0.5, -1]);

            const camZ = 8;
            const half = Math.tan((45 * Math.PI) / 360);
            const d = camZ - wz;
            if (d <= 0.1) { rafId.current = requestAnimationFrame(tick); return; }

            // 📱 AGGRESSIVE SHRINK: Must match the exact number from Scene3D!
            const isMobile = window.innerWidth < 768;
            const cupScale = isMobile ? 0.45 : 1;

            const aspect = window.innerWidth / window.innerHeight;
            const sx = ((wx / (half * aspect * d)) + 1) * 50;
            const sy = ((1 - wy / (half * d))) * 50;

            // This applies the 0.45 scale to the entire masking system perfectly
            const rr = ((1.8 * cupScale) / (half * d)) * 50;

            setPos({ x: sx, y: sy, r: Math.max(rr, 10) });
            rafId.current = requestAnimationFrame(tick);
        };
        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, [lerp]);

    return pos;
}

/* ─── Feature Data ─── */
const features = [
    {
        number: "01",
        title: "Warm & Soulful",
        description: "Traditional Matka Chai served in clay cups (Kulhads) for that authentic earthy flavor and soul-soothing warmth that reminds you of home.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sage">
                <path d="M12 5c.67 0 1.34.09 2 .26 1.78-2 5.03-2.75 6.5-1.28 1.47 1.47.72 4.72-1.28 6.5.17.66.26 1.33.26 2H22l-4 4-4-4h-4L6 16.48 2 12.48h2.52c0-.67.09-1.34.26-2C2.78 8.7 2.03 5.45 3.5 3.98 4.97 2.51 8.22 3.26 10 5.26c.66-.17 1.33-.26 2-.26z" />
                <circle cx="9" cy="10" r="1" fill="currentColor" />
                <circle cx="15" cy="10" r="1" fill="currentColor" />
                <path d="M10 14a3.5 3.5 0 0 0 4 0" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Artisanal Blends",
        description: "From classic Masala Chai to unique Turmeric and Ginger infusions, our teas are crafted with passion and the finest spices to satisfy every tea lover.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sage">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                <line x1="6" x2="6" y1="2" y2="4" />
                <line x1="10" x2="10" y1="2" y2="4" />
                <line x1="14" x2="14" y1="2" y2="4" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Your Daily Escape",
        description: "A cozy neighborhood sanctuary where time slows down. Perfect for quick bites, long conversations, or just some quiet 'me time' with a cup of tea.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sage">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
            </svg>
        ),
    },
];

/* ─── Component ─── */
export function TheVibe() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const goldRef = useRef<HTMLHeadingElement>(null);
    const cup = useCupScreenPosition();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
    const decorativeY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    /* ═══ RAF-driven clip-path sync (GPU-ACCELERATED) ═══ */
    useEffect(() => {
        const el = goldRef.current;
        if (!el) return;

        // 🚀 FIX A: Cache layout — calculate ONCE, update only on resize
        let rect = el.getBoundingClientRect();
        const handleResize = () => { rect = el.getBoundingClientRect(); };
        window.addEventListener("resize", handleResize);

        let raf: number;
        const sync = () => {
            if (rect.width > 0 && rect.height > 0) {
                const cx = (cup.x / 100) * window.innerWidth - rect.left;
                const cy = (cup.y / 100) * window.innerHeight - rect.top;
                const rpx = (cup.r / 100) * window.innerHeight;

                // 🚀 FIX C: Single GPU-accelerated clip-path replaces CPU mask-image
                const maskWidth = rpx * 0.70;
                const maskHeight = rpx * 1.15;

                el.style.clipPath = `ellipse(${maskWidth}px ${maskHeight}px at ${cx}px ${cy}px)`;
            }
            raf = requestAnimationFrame(sync);
        };
        raf = requestAnimationFrame(sync);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", handleResize);
        };
    }, [cup]);

    return (
        <section
            id="the-vibe"
            ref={sectionRef}
            className="relative px-6 overflow-hidden bg-transparent"
        >
            <div className="h-[60vh] w-full pointer-events-none" aria-hidden="true" />

            <motion.div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{ y: backgroundY }}
            >
                <svg className="w-full h-[150%]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path fill="currentColor" className="text-gold" d="M0 100 C 20 0 50 0 100 100 Z" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex justify-between px-12 md:px-20 opacity-[0.06]"
                style={{ y: decorativeY }}
            >
                <svg width="120" height="200" viewBox="0 0 120 200" fill="none" className="rotate-12">
                    <path d="M60 200 C60 200 0 140 0 80 C0 35 27 0 60 0 C93 0 120 35 120 80 C120 140 60 200 60 200Z" fill="currentColor" className="text-sage" />
                    <path d="M60 180 L60 20" stroke="currentColor" strokeWidth="1" className="text-gold" opacity="0.5" />
                    <path d="M60 60 L30 40" stroke="currentColor" strokeWidth="0.5" className="text-gold" opacity="0.3" />
                    <path d="M60 100 L90 75" stroke="currentColor" strokeWidth="0.5" className="text-gold" opacity="0.3" />
                    <path d="M60 140 L25 115" stroke="currentColor" strokeWidth="0.5" className="text-gold" opacity="0.3" />
                </svg>
                <svg width="80" height="140" viewBox="0 0 80 140" fill="none" className="-rotate-12 mt-40">
                    <path d="M40 140 C40 140 0 95 0 55 C0 25 18 0 40 0 C62 0 80 25 80 55 C80 95 40 140 40 140Z" fill="currentColor" className="text-sage" />
                    <path d="M40 125 L40 15" stroke="currentColor" strokeWidth="0.8" className="text-gold" opacity="0.5" />
                </svg>
            </motion.div>

            <motion.div
                className="max-w-6xl mx-auto relative z-10 w-full"
                style={{ y: textY }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="mb-20 md:mb-28"
                >
                    <span className="font-[family-name:var(--font-display)] italic text-xl text-gold flex items-center gap-3">
                        <span className="w-8 h-px bg-gold/40" />
                        The Vibe
                        <span className="w-8 h-px bg-gold/40" />
                    </span>

                    <div className="relative mt-6" style={{ isolation: "isolate" }}>
                        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05]">
                            More Than
                            <br />
                            <span className="italic font-normal text-gold">a Tea House.</span>
                        </h2>

                        <h2
                            ref={goldRef}
                            aria-hidden="true"
                            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] absolute inset-0 pointer-events-none select-none"
                            style={{
                                color: "#C9A96E",
                                clipPath: "ellipse(0px 0px at 50% 50%)",
                                willChange: "clip-path",
                            }}
                        >
                            More Than
                            <br />
                            <span className="italic font-normal" style={{ color: "transparent" }}>
                                a Tea House.
                            </span>
                        </h2>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-10 md:gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.number}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                            className="group relative p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/50 hover:border-gold/30 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                            <div className="mb-5 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                {feature.icon}
                            </div>
                            <span className="text-gold/50 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold block mb-2">
                                {feature.number}
                            </span>
                            <div className="w-10 h-px bg-gradient-to-r from-gold/60 to-transparent mb-5 group-hover:w-16 transition-all duration-500" />
                            <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-parchment mb-4 group-hover:text-gold transition-colors duration-500">
                                {feature.title}
                            </h3>
                            <p className="text-parchment/70 leading-relaxed text-[15px]">
                                {feature.description}
                            </p>
                            <div className="mt-8 h-px bg-gradient-to-r from-gold/30 to-transparent w-full group-hover:from-gold transition-all duration-700 delay-100" />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-16 md:mt-20 text-center"
                >
                    <a
                        href="#menu"
                        className="group inline-flex items-center gap-3 text-gold hover:text-parchment text-sm font-medium tracking-wide transition-colors duration-300"
                    >
                        <span className="border-b border-gold/30 group-hover:border-parchment/30 pb-0.5 transition-colors duration-300">
                            Experience the vibe
                        </span>
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            →
                        </motion.span>
                    </a>
                </motion.div>
            </motion.div>

            <div className="h-32 md:h-44 w-full pointer-events-none" aria-hidden="true" />
        </section>
    );
}