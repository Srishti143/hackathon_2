"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const milestones = [
    {
        year: "1978",
        title: "The First Bean",
        description: "Old Man Charlie bought a dusty roaster and a dream. The smells of hazelnut filled the neighborhood.",
        image: "/images/story/1978-bean.png",
    },
    {
        year: "1985",
        title: "Vinyl & Vibes",
        description: "We added a turntable and a wall of records. People came for the coffee, stayed for the grooves.",
        image: "/images/story/1985-vinyl.png",
    },
    {
        year: "1994",
        title: "The Neon Era",
        description: "A fresh look with humming neon signs and the best cheesecake in the city.",
        image: "/images/story/1994-neon.png",
    },
    {
        year: "Today",
        title: "Retro Meets Future",
        description: "BrewBot '78 joins the team, keeping the nostalgia alive with a digital twist.",
        image: "/images/story/today-robot.png",
    },
];

export const StorySection = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="story" className="py-24 bg-deep-teal text-cream overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-serif font-black mb-4 uppercase tracking-tighter">
                        Our <span className="text-burnt-orange italic">Groovy</span> Journey
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 -ms-1 top-0 bottom-0 w-2 bg-mustard-yellow hidden md:block" />

                    <div className="space-y-12">
                        {milestones.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content */}
                                <div
                                    className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:ps-12" : "md:pe-12"} text-center ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <span className="text-4xl md:text-6xl font-serif font-black text-mustard-yellow block mb-2 cursor-pointer hover:scale-105 transition-transform">
                                        {m.year}
                                    </span>
                                    <h3 className="text-2xl font-serif font-bold mb-4 text-cream">
                                        {m.title}
                                    </h3>
                                    <p className="font-mono text-cream/70 leading-relaxed">
                                        {m.description}
                                    </p>
                                </div>

                                {/* Dot */}
                                <div
                                    className="absolute left-1/2 -ms-4 top-1/2 -mt-4 w-8 h-8 bg-burnt-orange border-4 border-mustard-yellow rounded-full hidden md:block z-10 cursor-pointer hover:scale-110 transition-transform"
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                />

                                {/* Image Placeholder / Empty Space */}
                                <div className="hidden md:flex w-1/2 h-48 justify-center items-center relative">
                                    <AnimatePresence>
                                        {hoveredIndex === i && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, x: i % 2 === 0 ? -20 : 20 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.3 }}
                                                className={`absolute top-0 bottom-0 ${i % 2 === 0 ? "right-8" : "left-8"} w-64 h-48 rounded-lg overflow-hidden border-4 border-cream shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3`}
                                            >
                                                <img
                                                    src={m.image}
                                                    alt={m.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
