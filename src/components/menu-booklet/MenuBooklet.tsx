"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuCategories, MenuCategory } from "@/data/menu-booklet";
import { MenuCategoryCard } from "./MenuCategoryCard";
import { MenuItemList } from "./MenuItemList";

export const MenuBooklet = () => {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);

    const handleCategoryClick = (category: MenuCategory) => {
        setSelectedCategory(category);
    };

    const handleBack = () => {
        setSelectedCategory(null);
    };

    return (
        <div className="relative min-h-[500px] w-full perspective-1000">
            <AnimatePresence mode="wait">
                {!selectedCategory ? (
                    // Category Grid View
                    <motion.div
                        key="category-grid"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, rotateY: 10 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {menuCategories.map((category) => (
                            <MenuCategoryCard
                                key={category.id}
                                category={category}
                                onClick={() => handleCategoryClick(category)}
                            />
                        ))}
                    </motion.div>
                ) : (
                    // Item List View (Booklet Page)
                    <motion.div
                        key="item-list"
                        initial={{ opacity: 0, rotateY: -10, x: 20 }}
                        animate={{ opacity: 1, rotateY: 0, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.15 }}
                        className="w-full bg-cream rounded-xl border-4 border-coffee-brown shadow-[10px_10px_0px_0px_#4B3621] overflow-hidden"
                    >
                        {/* Paper texture overlay for the inner page */}
                        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                        <MenuItemList category={selectedCategory} onBack={handleBack} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
