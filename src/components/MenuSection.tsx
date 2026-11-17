"use client";

import { MenuBooklet } from "./menu-booklet/MenuBooklet";
import { menuItems } from "@/data/menu";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const MenuSection = () => {
    const { addToCart } = useCart();

    return (
        <section id="menu" className="py-24 bg-cream border-t-8 border-coffee-brown">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-serif font-black text-coffee-brown mb-4 uppercase tracking-tighter">
                        Our <span className="text-mustard-yellow underline decoration-coffee-brown">Daily Grind</span>
                    </h2>
                    <p className="font-mono text-coffee-brown/70 text-lg uppercase tracking-widest font-bold">
                        Specially brewed for your nostalgia
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {menuItems.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -10 }}
                            className="bg-cream border-4 border-coffee-brown p-6 rounded-2xl shadow-[8px_8px_0px_0px_#4B3621] hover:shadow-none transition-all group h-full flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-burnt-orange text-cream text-xs font-bold px-3 py-1 rounded-full uppercase">
                                        {item.category}
                                    </span>
                                    <span className="text-2xl font-serif font-black text-coffee-brown">
                                        {item.price}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-coffee-brown mb-2 group-hover:text-burnt-orange transition-colors italic">
                                    {item.name}
                                </h3>
                                <p className="font-mono text-sm text-coffee-brown/80">
                                    {item.description}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t-2 border-coffee-brown/10 flex gap-2">
                                {item.taste.map(t => (
                                    <span key={t} className="text-[10px] uppercase font-bold text-deep-teal border border-deep-teal px-2 py-0.5 rounded">
                                        #{t}
                                    </span>
                                ))}
                                <button
                                    onClick={() => addToCart({ id: item.id.toString(), name: item.name, price: item.price })}
                                    className="ml-auto bg-mustard-yellow text-coffee-brown text-[10px] font-bold px-3 py-1 rounded border border-coffee-brown hover:bg-burnt-orange hover:text-cream transition-colors flex items-center gap-1"
                                >
                                    <Plus className="w-3 h-3" /> ADD
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 mb-12 text-center">
                    <div className="w-full border-t-4 border-coffee-brown mb-12 opacity-80"></div>
                    <h2 className="text-5xl md:text-7xl font-serif font-black text-coffee-brown mb-4 uppercase tracking-tighter">
                        More <span className="text-mustard-yellow underline decoration-coffee-brown">Collections</span>
                    </h2>
                    <p className="font-mono text-coffee-brown/70 text-lg uppercase tracking-widest font-bold">
                        Explore the full menu
                    </p>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="w-full max-w-4xl">
                        <MenuBooklet />
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-block bg-mustard-yellow border-4 border-coffee-brown px-12 py-6 rounded-full rotate-2 hover:rotate-0 transition-transform cursor-pointer">
                        <p className="font-serif text-3xl font-black text-coffee-brown">
                            Hungry for more? Ask BrewBot!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
