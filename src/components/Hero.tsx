"use client";

import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-cream py-20 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-8xl font-serif font-black text-coffee-brown leading-tight mb-6">
                        Brewing <span className="text-burnt-orange italic">Memories</span> since yesterday.
                    </h1>
                    <p className="text-xl font-mono text-coffee-brown/80 mb-10 max-w-lg">
                        Step into a world where every cup tells a story. Nostalgia served hot, vibes served chilled.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#menu" className="bg-deep-teal text-cream px-8 py-4 rounded-xl border-4 border-coffee-brown shadow-[8px_8px_0px_0px_#4B3621] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all font-bold text-xl uppercase tracking-tighter inline-block text-center">
                            View Menu
                        </a>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                            className="bg-mustard-yellow text-coffee-brown px-8 py-4 rounded-xl border-4 border-coffee-brown shadow-[8px_8px_0px_0px_#4B3621] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all font-bold text-xl uppercase tracking-tighter"
                        >
                            Talk to Bot
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "backOut" }}
                    className="relative"
                >
                    <div className="relative z-10 rounded-3xl border-8 border-coffee-brown overflow-hidden shadow-2xl">
                        <img
                            src="/hero-illustration.png"
                            alt="Retro Cafe Illustration"
                            className="w-full aspect-square object-cover"
                        />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-mustard-yellow rounded-full -z-1 border-4 border-coffee-brown" />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-burnt-orange rounded-3xl -z-1 border-4 border-coffee-brown rotate-12" />
                </motion.div>
            </div>
        </section>
    );
};
