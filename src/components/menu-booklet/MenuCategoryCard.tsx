import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { MenuCategory } from "@/data/menu-booklet";

interface MenuCategoryCardProps {
    category: MenuCategory;
    onClick: () => void;
}

export const MenuCategoryCard = ({ category, onClick }: MenuCategoryCardProps) => {
    return (
        <motion.div
            onClick={onClick}
            className="bg-cream border-4 border-coffee-brown p-6 rounded-2xl shadow-[8px_8px_0px_0px_#4B3621] hover:shadow-none transition-all group cursor-pointer h-full min-h-[220px] flex flex-col justify-between"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Header: Badge & Count */}
            <div className="flex justify-between items-start mb-2">
                <span className="bg-burnt-orange text-cream text-xs font-bold px-3 py-1 rounded-full uppercase">
                    COLLECTION
                </span>
                <span className="text-xl font-serif font-black text-coffee-brown">
                    {category.items.length} ITEMS
                </span>
            </div>

            {/* Content: Title & Tagline */}
            <div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-coffee-brown mb-2 group-hover:text-burnt-orange transition-colors italic leading-tight">
                    {category.title}
                </h3>
                <p className="font-mono text-sm text-coffee-brown/80 line-clamp-2">
                    {category.tagline}
                </p>
            </div>

            {/* Bottom: Tags mimic */}
            <div className="mt-4 pt-4 border-t-2 border-coffee-brown/10 flex gap-2">
                <span className="text-[10px] uppercase font-bold text-deep-teal border border-deep-teal px-2 py-0.5 rounded">
                    #EXPLORE
                </span>
                <span className="text-[10px] uppercase font-bold text-deep-teal border border-deep-teal px-2 py-0.5 rounded">
                    #VIEW_MENU
                </span>
            </div>
        </motion.div>
    );
};
