"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export function Loader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(mouseY, { stiffness: 100, damping: 30 });
    const rotateY = useSpring(mouseX, { stiffness: 100, damping: 30 });

    const messages = [
        "Boiling Water...",
        "Steeping Tea Leaves...",
        "Infusing Spices...",
        "Preparing Kulhad...",
        "Serving Warmth...",
        "Chai Lovers Unite"
    ];

    useEffect(() => {
        // Wait 7.5 seconds to let the 3D assets, textures, and 240 hero frames buffer
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 7500);

        return () => clearTimeout(timer);
    }, []);

    // Also listen for full window load, but guarantee a minimum 7.5s delay for the animation
    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 7500);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    // Progress counter (non-linear staging)
    useEffect(() => {
        const startTime = Date.now();
        const duration = 7500;
        const keyframes = [
            { time: 0, val: 0 },
            { time: 0.2, val: 33 },
            { time: 0.35, val: 33 },
            { time: 0.5, val: 50 },
            { time: 0.65, val: 50 },
            { time: 0.8, val: 80 },
            { time: 0.85, val: 80 },
            { time: 1.0, val: 100 }
        ];

        let animationFrame: number;

        const update = () => {
            const elapsed = Date.now() - startTime;
            const t = Math.min(elapsed / duration, 1.0);

            let startK = keyframes[0];
            let endK = keyframes[keyframes.length - 1];
            for (let i = 0; i < keyframes.length - 1; i++) {
                if (t >= keyframes[i].time && t <= keyframes[i + 1].time) {
                    startK = keyframes[i];
                    endK = keyframes[i + 1];
                    break;
                }
            }

            const segmentT = endK.time === startK.time
                ? 0
                : (t - startK.time) / (endK.time - startK.time);

            // easeInOutQuad
            const ease = segmentT < 0.5 ? 2 * segmentT * segmentT : 1 - Math.pow(-2 * segmentT + 2, 2) / 2;
            const currentVal = startK.val + (endK.val - startK.val) * ease;

            setProgress(Math.min(Math.floor(currentVal), 100));

            if (t < 1.0) {
                animationFrame = requestAnimationFrame(update);
            }
        };

        animationFrame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    // Message cycler
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => Math.min(prev + 1, messages.length - 1));
        }, 1250);

        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * -20;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    onMouseMove={handleMouseMove}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso"
                    style={{ perspective: 1000 }}
                >
                    <motion.div
                        style={{ rotateX, rotateY }}
                        className="flex flex-col items-center justify-center w-full max-w-md p-8 rounded-2xl cursor-none"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gold/80 text-sm mb-4 font-mono font-medium tracking-widest select-none"
                        >
                            {progress}%
                        </motion.div>
+
                        <div className="w-64 h-[2px] bg-gold/20 mb-10 overflow-hidden relative rounded-full">
                            <motion.div
                                style={{ width: `${progress}%` }}
                                className="absolute inset-y-0 left-0 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                            />
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-parchment tracking-tight select-none"
                        >
                            CHAIKO <span className="italic font-normal text-gold"></span>
                        </motion.h2>

                        <div className="h-8 mt-6 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={messageIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-gold/60 text-xs md:text-sm tracking-[0.3em] uppercase font-medium select-none text-center"
                                >
                                    {messages[messageIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
