"use client";

import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer id="footer" className="bg-smoke pt-24 pb-12 px-6 border-t border-espresso-80">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-12 gap-16 md:gap-8 mb-20">

                    {/* Brand Col */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="md:col-span-5 pr-8"
                    >
                        <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-parchment mb-6">
                            CHAIKO
                        </h3>
                        <p className="text-parchment-40 text-[15px] leading-relaxed max-w-sm mb-8">
                            A cozy haven for tea lovers. Experience the warmth of traditional Matka Chai and artisanal blends in the heart of Shillong. Authentic flavors, soulful vibes.
                        </p>
                        <div className="inline-flex flex-col">
                            <span className="text-gold font-medium mb-1 flex items-center gap-2">
                                <span>★</span> 4.7 Stars
                            </span>
                            <span className="text-parchment-20 text-xs">Based on 180 Google Reviews</span>
                        </div>
                    </motion.div>

                    {/* Address Col */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="md:col-span-3 md:col-start-7"
                    >
                        <h4 className="text-parchment text-xs tracking-[0.25em] uppercase font-semibold mb-6">
                            Find Us
                        </h4>
                        <address className="not-italic text-parchment-40 text-sm leading-loose">
                            <p>Upper, Jail Road,</p>
                            <p>Police Bazar,</p>
                            <p>Shillong,</p>
                            <p>Meghalaya 793001</p>
                            <p className="mt-2 text-gold">082569 05996</p>
                        </address>
                        <a
                            href="https://maps.google.com/?q=Chaiko+Chai+Lovers+Unite+Shillong"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-gold hover:text-parchment text-sm mt-6 transition-colors duration-300"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span className="border-b border-gold/30 group-hover:border-parchment/30 pb-0.5 transition-colors">
                                Get Directions
                            </span>
                        </a>
                    </motion.div>

                    {/* Hours Col */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="md:col-span-3"
                    >
                        <h4 className="text-parchment text-xs tracking-[0.25em] uppercase font-semibold mb-6">
                            Hours
                        </h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-baseline border-b border-parchment/5 pb-2">
                                <span className="text-parchment-40">Mon – Sun</span>
                                <span className="text-parchment-80 font-medium">Closes 8:00 PM</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Divider + Copyright */}
                <div className="border-t border-parchment-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-parchment-20 text-xs">
                        © {new Date().getFullYear()} CHAIKO. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-parchment-20 text-xs">
                        <a href="#" className="hover:text-parchment transition-colors">Instagram</a>
                        <a href="#" className="hover:text-parchment transition-colors">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
