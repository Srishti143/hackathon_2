import { motion } from "framer-motion";
import { ArrowLeft, Star, Plus } from "lucide-react";
import { MenuCategory } from "@/data/menu-booklet";
import { useCart } from "@/context/CartContext";

interface MenuItemListProps {
    category: MenuCategory;
    onBack: () => void;
}

export const MenuItemList = ({ category, onBack }: MenuItemListProps) => {
    const { addToCart } = useCart();

    return (
        <div className="w-full h-full p-4 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-coffee-brown/20">
                <button
                    onClick={onBack}
                    className="p-2 rounded-full border-2 border-coffee-brown text-coffee-brown hover:bg-coffee-brown hover:text-cream transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h3 className="text-3xl md:text-4xl font-serif font-black text-coffee-brown uppercase tracking-tight">
                        {category.title}
                    </h3>
                    <p className="font-mono text-sm text-coffee-brown/70 italic">
                        {category.tagline}
                    </p>
                </div>
            </div>

            {/* Grid of Items */}
            <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex gap-4 p-4 bg-cream rounded-lg border-2 border-coffee-brown hover:border-mustard-yellow transition-colors"
                    >
                        {/* Image Placeholder or Actual Image */}
                        <div className="w-20 h-20 shrink-0 bg-coffee-brown/10 rounded-md border border-coffee-brown/20 flex items-center justify-center overflow-hidden">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain p-1 mix-blend-multiply"
                                />
                            ) : (
                                <span className="text-2xl">☕</span>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="text-xl font-serif font-bold text-coffee-brown group-hover:text-burnt-orange transition-colors truncate pr-2">
                                    {item.name}
                                </h4>
                                <span className="shrink-0 bg-coffee-brown text-cream text-sm font-bold font-mono px-2 py-0.5 rounded rotate-2 group-hover:rotate-0 transition-transform">
                                    {item.price}
                                </span>
                            </div>

                            <p className="text-sm font-mono text-coffee-brown/70 leading-tight mb-2 line-clamp-2">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-1 items-center">
                                {item.tags?.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] items-center font-bold tracking-wider text-deep-teal uppercase border border-deep-teal/30 px-1.5 py-0.5 rounded bg-deep-teal/5"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                                <button
                                    onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                                    className="ml-auto bg-mustard-yellow text-coffee-brown text-[10px] font-bold px-3 py-1 rounded border border-coffee-brown hover:bg-burnt-orange hover:text-cream transition-colors flex items-center gap-1"
                                >
                                    <Plus className="w-3 h-3" /> ADD
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div >
    );
};
