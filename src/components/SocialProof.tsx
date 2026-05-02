"use client";
import { motion } from "framer-motion";

export function SocialProof() {
    return (
        <section className="py-24 relative z-10">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } },
                        hidden: {}
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
                >
                    {/* ─── Card 1: The Rating ─── */}
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        whileTap={{ scale: 0.98 }}
                        className="col-span-1 bg-white/5 dark:bg-zinc-900/40 backdrop-blur-md border border-bark/10 dark:border-parchment-10 rounded-3xl p-8 flex flex-col justify-center items-center text-center cursor-pointer transition-colors hover:bg-white/10"
                    >
                        <h3 className="font-[family-name:var(--font-display)] text-7xl font-bold text-white mb-2 leading-none">4.7</h3>
                        <div className="flex gap-1 text-gold mb-4 text-2xl">
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">
                            180 Verified Reviews
                        </p>
                    </motion.div>

                    {/* ─── Card 2: The Featured Quote ─── */}
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        whileTap={{ scale: 0.98 }}
                        className="col-span-1 md:col-span-2 bg-white/5 dark:bg-zinc-900/40 backdrop-blur-md border border-bark/10 dark:border-parchment-10 rounded-3xl p-8 md:p-10 flex flex-col justify-center cursor-pointer transition-colors hover:bg-white/10 relative overflow-hidden"
                    >
                        {/* Giant decorative background quote mark */}
                        <span className="absolute -top-4 right-6 text-[10rem] text-white/5 font-[family-name:var(--font-display)] select-none leading-none">
                            &ldquo;
                        </span>
                        
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light mb-8 relative z-10 max-w-lg">
                            &ldquo;I absolutely loved my visit! The tea here is exceptional — from classic masala chai to unique turmeric and ginger blends, every cup is rich and flavorful. The warm and cozy environment makes it the perfect spot.&rdquo;
                        </p>
                        
                        <div className="flex items-center gap-4 relative z-10 mt-auto">
                            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-lg border border-gold/30">
                                A
                            </div>
                            <div>
                                <p className="text-white font-medium tracking-wide">Ajay Kantiwal</p>
                                <p className="text-gold/70 text-sm">Local Guide</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
