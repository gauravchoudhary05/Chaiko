"use client";

import { motion } from "framer-motion";
import { BusyMeter } from "./BusyMeter";

export function Hero() {
    return (
        <section
            id="hero"
            className="relative h-full flex flex-col items-center justify-center overflow-hidden px-6"
        >
            {/* Noise grain texture */}
            <div className="noise-overlay" />

            {/* Radial glow behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
                 style={{
                     background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, rgba(201,169,110,0.03) 40%, transparent 70%)",
                 }}
            />

            <div className="relative z-10 text-center max-w-5xl mx-auto">
                {/* Overline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-gold tracking-[0.35em] uppercase text-xs md:text-sm font-medium mb-8 flex items-center justify-center gap-3"
                >
                    <span className="w-8 h-px bg-gold/40" />
                    Est. 2022 · Shillong
                    <span className="w-8 h-px bg-gold/40" />
                </motion.p>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
                    className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-bold text-parchment leading-[0.9] tracking-tight whitespace-nowrap"
                >
                    CHAIKO
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                    className="mt-8 md:mt-12 text-parchment-60 text-lg md:text-xl lg:text-2xl font-light max-w-xl mx-auto leading-relaxed"
                >
                    Chai Lovers Unite.
                </motion.p>

                {/* BusyMeter — real-time café vibes */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                    className="mt-10 flex justify-center"
                >
                    <BusyMeter />
                </motion.div>

                {/* Scroll indicator — elegant mouse + chevron */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-16 md:mt-24"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="text-parchment-40 text-[10px] tracking-[0.4em] uppercase font-medium">
                            Explore
                        </span>
                        {/* Mouse outline icon */}
                        <div className="relative w-6 h-10 rounded-full border border-parchment-20">
                            <motion.div
                                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-gold"
                            />
                        </div>
                        {/* Chevron */}
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="text-parchment-20">
                            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient blend to next section */}
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-espresso/80 to-transparent pointer-events-none" />
        </section>
    );
}
