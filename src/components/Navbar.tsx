"use client";

import Link from "next/link";
import { Coffee, ShoppingBag, X, Trash2, Plus, Minus, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createOrder, skipCustomer } from "@/utils/api";

export const Navbar = () => {
    const { items, addToCart, removeOneFromCart, removeFromCart, clearCart, totalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handlePlaceOrder = async () => {
        if (items.length > 0) {
            try {
                // AUTO-AUTH: If no session, create one silently
                if (!localStorage.getItem('sessionId')) {
                    console.log("No Session Found. Auto-generating Guest Session...");
                    const sessionData = await skipCustomer();
                    if (sessionData && sessionData.sessionId) {
                        localStorage.setItem('sessionId', sessionData.sessionId);
                        console.log("Guest Session Created:", sessionData.sessionId);
                    }
                }

                // Transform cart items to API format
                const apiItems = items.map(i => ({
                    name: i.name,
                    qty: i.quantity
                }));

                const response = await createOrder(apiItems);

                // Dispatch event for TrackerSection
                const event = new CustomEvent('local-order-placed', {
                    detail: {
                        orderId: response.orderId,
                        status: response.status,
                        items: apiItems,
                        time: new Date().toLocaleTimeString()
                    }
                });
                window.dispatchEvent(event);

                setIsCartOpen(false);
                setShowNotification(true);
                clearCart(); // Clear immediately

                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            } catch (error: any) {
                console.error("Failed to place order", error);

                // 401 Handling: Session might be invalid (server rebooted/seeded)
                if (error.response && error.response.status === 401) {
                    console.log("Session Invalid (401). Retrying with new Guest Session...");
                    localStorage.removeItem('sessionId');

                    try {
                        const sessionData = await skipCustomer();
                        if (sessionData && sessionData.sessionId) {
                            localStorage.setItem('sessionId', sessionData.sessionId);
                            console.log("New Guest Session Created:", sessionData.sessionId);

                            // Retry Order
                            const apiItems = items.map(i => ({ name: i.name, qty: i.quantity }));
                            const retryResponse = await createOrder(apiItems);

                            // Dispatch event on retry success
                            window.dispatchEvent(new CustomEvent('local-order-placed', {
                                detail: {
                                    orderId: retryResponse.orderId,
                                    status: retryResponse.status,
                                    items: apiItems,
                                    time: new Date().toLocaleTimeString()
                                }
                            }));

                            setIsCartOpen(false);
                            setShowNotification(true);
                            clearCart();
                            setTimeout(() => setShowNotification(false), 3000);
                            return; // Exit success
                        }
                    } catch (retryError) {
                        console.error("Retry failed", retryError);
                        alert("Session expired. Please refresh the page.");
                    }
                } else {
                    alert("Failed to place order. Please try again.");
                }
            }
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-mustard-yellow border-b-4 border-coffee-brown px-6 py-4">
            <div className="w-full flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-coffee-brown p-2.5 rounded-2xl group-hover:rotate-6 transition-transform shadow-md">
                        <Coffee className="text-cream w-7 h-7" />
                    </div>
                    <span className="text-3xl font-serif font-black italic text-coffee-brown tracking-tight">
                        Retro Cafe
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-8 font-mono text-lg font-bold">
                    <Link href="/home#menu" className="hover:text-burnt-orange transition-colors">
                        MENU
                    </Link>
                    <Link href="/home#tables" className="hover:text-burnt-orange transition-colors">
                        FIND A TABLE
                    </Link>
                    <Link href="/home#visit" className="hover:text-burnt-orange transition-colors">
                        VISIT US
                    </Link>
                </div>
                <div className="flex items-center gap-4 relative">
                    <button
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className="hidden md:flex items-center gap-2 bg-cream text-coffee-brown px-6 py-2 rounded-full border-2 border-coffee-brown shadow-[4px_4px_0px_0px_#4B3621] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-bold relative"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        ORDER NOW
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-burnt-orange text-cream text-xs w-5 h-5 flex items-center justify-center rounded-full border border-coffee-brown">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {isCartOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-14 right-0 w-80 bg-cream border-4 border-coffee-brown rounded-xl shadow-[8px_8px_0px_0px_#4B3621] p-4 z-50 origin-top-right"
                            >
                                <div className="flex justify-between items-center mb-4 border-b-2 border-coffee-brown/10 pb-2">
                                    <h3 className="font-serif font-bold text-xl text-coffee-brown">Your Tray</h3>
                                    <button onClick={() => setIsCartOpen(false)} className="text-coffee-brown hover:text-burnt-orange">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {items.length === 0 ? (
                                    <div className="text-center py-8 text-coffee-brown/60 font-mono text-sm italic">
                                        Your tray is empty.
                                        <br />
                                        Add some goodies!
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-3 max-h-60 overflow-y-auto mb-4">
                                            {items.map((item) => {
                                                const unitPrice = parseInt(item.price.replace(/[^0-9]/g, ''));
                                                const itemTotal = unitPrice * item.quantity;

                                                return (
                                                    <div key={item.id} className="flex justify-between items-center bg-white/50 p-2 rounded border border-coffee-brown/10">
                                                        <div className="flex-1">
                                                            <p className="font-serif font-bold text-coffee-brown text-sm">{item.name}</p>
                                                            <div className="flex items-center gap-2 text-xs font-mono text-coffee-brown/60">
                                                                <span>{item.price} x {item.quantity}</span>
                                                                <span className="font-bold text-coffee-brown">= ₹{itemTotal}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 bg-cream rounded-full border border-coffee-brown/10 px-1 py-0.5 ml-2">
                                                            <button
                                                                onClick={() => removeOneFromCart(item.id)}
                                                                className="w-5 h-5 flex items-center justify-center bg-coffee-brown/10 rounded-full text-coffee-brown hover:bg-burnt-orange hover:text-cream transition-colors"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="font-mono font-bold text-coffee-brown w-4 text-center text-xs">{item.quantity}</span>
                                                            <button
                                                                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                                                                className="w-5 h-5 flex items-center justify-center bg-coffee-brown/10 rounded-full text-coffee-brown hover:bg-burnt-orange hover:text-cream transition-colors"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="border-t-2 border-coffee-brown/20 pt-3 mt-2">
                                            <div className="flex justify-between items-end">
                                                <span className="font-serif font-bold text-coffee-brown text-lg">Total Bill:</span>
                                                <span className="font-mono font-black text-2xl text-burnt-orange">
                                                    ₹{items.reduce((total, item) => {
                                                        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
                                                        return total + (price * item.quantity);
                                                    }, 0)}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {items.length > 0 && (
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="w-full mt-4 bg-burnt-orange text-cream font-bold py-2 rounded-lg border-2 border-coffee-brown hover:bg-coffee-brown transition-colors shadow-[4px_4px_0px_0px_#4B3621] hover:shadow-none hover:translate-y-1"
                                    >
                                        PLACE YOUR ORDER
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Notification Toast */}
                    <AnimatePresence>
                        {showNotification && (
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                className="fixed top-24 right-6 bg-cream border-l-8 border-burnt-orange shadow-xl p-4 rounded-lg z-[60] flex items-center gap-3 max-w-sm"
                            >
                                <div className="bg-burnt-orange text-cream p-2 rounded-full">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-coffee-brown text-lg">Order Placed!</h4>
                                    <p className="font-mono text-sm text-coffee-brown/80">
                                        Your order will be served soon!
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                        className="bg-burnt-orange text-cream px-6 py-2 rounded-full border-2 border-coffee-brown shadow-[4px_4px_0px_0px_#4B3621] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-bold"
                    >
                        TALK TO CHARLIE
                    </button>
                </div>
            </div>
        </nav>
    );
};
