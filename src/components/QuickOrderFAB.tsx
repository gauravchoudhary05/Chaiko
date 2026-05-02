"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function QuickOrderFAB() {
    const [isVisible, setIsVisible] = useState(false);
    const [lastOrder, setLastOrder] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Retrieve last order if exists, otherwise null
        const savedOrder = localStorage.getItem("lastOrder");
        if (savedOrder) {
            setLastOrder(savedOrder);
        } else {
            // For demo purposes, we'll pretend the user ordered a Cold Brew if there's no history,
            // or we could just leave it null. Let's leave it null to show the generic state.
            // Actually, the prompt says "Falls back to 'Start your order →' for new users".
        }

        // Delay appearance by 2 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleOrderClick = () => {
        // Direct call action for Chaiko
        window.open("tel:08256905996", "_self");
        
        // Update local history for "order again" logic
        localStorage.setItem("lastOrder", "Special Matka Chai");
        setLastOrder("Special Matka Chai");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-6 right-6 z-50 flex items-center justify-end"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Expanded Label on Hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, pointerEvents: "none" }}
                                animate={{ opacity: 1, x: 0, pointerEvents: "auto" }}
                                exit={{ opacity: 0, x: 10, pointerEvents: "none" }}
                                transition={{ duration: 0.2 }}
                                className="mr-4 bg-parchment text-espresso px-4 py-2 rounded-full shadow-lg border border-gold/30 whitespace-nowrap"
                            >
                                <span className="text-sm font-medium">
                                    {lastOrder ? `Order Again: ${lastOrder}` : "Start your order →"}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main FAB Circle */}
                    <motion.button
                        onClick={handleOrderClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 bg-gold rounded-full shadow-2xl flex items-center justify-center text-espresso focus:outline-none focus:ring-4 focus:ring-gold/30"
                        aria-label="Order Now"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                            <line x1="6" x2="6" y1="2" y2="4" />
                            <line x1="10" x2="10" y1="2" y2="4" />
                            <line x1="14" x2="14" y1="2" y2="4" />
                        </svg>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
