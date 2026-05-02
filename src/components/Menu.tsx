"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";

// The same logic from the previous TheVibe file to project 3D space to Screen Space
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
            if (d <= 0.1) {
                rafId.current = requestAnimationFrame(tick);
                return;
            }

            const isMobile = window.innerWidth < 768;
            const cupScale = isMobile ? 0.45 : 1;

            const aspect = window.innerWidth / window.innerHeight;
            const sx = (wx / (half * aspect * d) + 1) * 50;
            const sy = (1 - wy / (half * d)) * 50;

            const rr = ((1.8 * cupScale) / (half * d)) * 50;

            setPos({ x: sx, y: sy, r: Math.max(rr, 10) });
            rafId.current = requestAnimationFrame(tick);
        };
        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, [lerp]);

    return pos;
}

interface MenuItem {
    name: string;
    price: number | string;
    isPopular?: boolean;
}

interface MenuTab {
    id: string;
    label: string;
    items: MenuItem[];
}

const menuData: MenuTab[] = [
    {
        id: "teas",
        label: "Specialty Teas",
        items: [
            { name: "Special Matka Chai", price: 60, isPopular: true },
            { name: "Classic Masala Chai", price: 40, isPopular: true },
            { name: "Turmeric & Ginger Blend", price: 50 },
            { name: "Lemon Grass Tea", price: 45 },
            { name: "Spiced Tea", price: 55 },
            { name: "Ghar Waali Chai", price: 35 },
        ],
    },
    {
        id: "quick-bites",
        label: "Quick Bites",
        items: [
            { name: "Veg Cheese Maggi", price: 120, isPopular: true },
            { name: "Cheese Maggi", price: 100 },
            { name: "Veg Poha", price: 80, isPopular: true },
            { name: "Homemade Fish Cutlet", price: 150 },
            { name: "Taiwanese Crispy Chicken", price: 180 },
        ],
    },
    {
        id: "bakery",
        label: "Baked Goodies",
        items: [
            { name: "Walnut Brownie", price: 90, isPopular: true },
            { name: "Homemade Cookies", price: 60 },
            { name: "Dry Cake Slice", price: 70 },
            { name: "Special Cookies", price: 80 },
        ],
    },
];

export function Menu() {
    const [activeTab, setActiveTab] = useState(menuData[0].id);
    const { x, y, r } = useCupScreenPosition();

    return (
        <section id="menu" className="relative min-h-screen py-24 px-6 z-10 flex flex-col justify-center max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="mb-16 text-center lg:text-left relative"
            >
                {/* ─── BASE HEADER (visible outside the cup) ─── */}
                <div className="relative">
                    <p className="text-gold tracking-[0.2em] uppercase text-sm font-medium mb-4">
                        Curated Selection
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold text-parchment leading-tight">
                        Our Menu
                    </h2>
                </div>

                {/* ─── MASKED HEADER (visible inside the cup) ─── */}
                <div
                    className="absolute inset-0 pointer-events-none select-none z-30"
                    style={{
                        clipPath: `circle(${r}% at ${x}% ${y}%)`,
                    }}
                >
                    <p className="text-forest tracking-[0.2em] uppercase text-sm font-medium mb-4">
                        Curated Selection
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold text-espresso leading-tight">
                        Our Menu
                    </h2>
                </div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">

                {/* ─── TABS NAVIGATION ─── */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-64 shrink-0 flex overflow-x-auto lg:flex-col gap-2 pb-4 lg:pb-0 scrollbar-hide border-b lg:border-b-0 lg:border-l border-white/10"
                >
                    {menuData.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-6 py-4 text-left whitespace-nowrap transition-colors duration-300 ${isActive ? "text-gold" : "text-parchment-40 hover:text-parchment-80"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="menu-active-indicator"
                                        className="absolute left-0 bottom-0 lg:bottom-auto lg:top-0 h-[2px] w-full lg:w-[2px] lg:h-full bg-gold shadow-[0_0_12px_rgba(201,169,110,0.6)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="font-medium tracking-wide uppercase text-sm">
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* ─── MENU ITEMS LIST ─── */}
                <div className="flex-1 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
                        >
                            {menuData
                                .find((t) => t.id === activeTab)
                                ?.items.map((item, idx) => (
                                    <div key={idx} className="group relative">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-xl font-[family-name:var(--font-display)] text-parchment transition-colors group-hover:text-gold flex items-center gap-3">
                                                {item.name}
                                                {item.isPopular && (
                                                    <span className="text-[10px] tracking-wider uppercase font-sans bg-gold/20 text-gold px-2 py-0.5 rounded-sm border border-gold/30">
                                                        Popular
                                                    </span>
                                                )}
                                            </h3>
                                            <div className="flex-1 mx-4 border-b border-dashed border-parchment-20 relative top-[-6px]" />
                                            <span className="text-lg font-medium text-parchment-80">
                                                ₹{item.price}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}