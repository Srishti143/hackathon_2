"use client";

import React, { useEffect, useState } from "react";
import { socket } from "@/utils/socket";
import { fetchMyOrders } from "@/utils/api"; // Import fetch attributes
import { Clock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const TrackerSection = () => {
    const [activeOrders, setActiveOrders] = useState<any[]>([]);

    useEffect(() => {
        // Fetch existing active orders on load
        const loadOrders = async () => {
            if (localStorage.getItem('sessionId')) {
                try {
                    const orders = await fetchMyOrders();
                    setActiveOrders(orders);
                } catch (err) {
                    console.error("Failed to load active orders", err);
                }
            }
        };
        loadOrders();

        // Listen for new orders placed locally (from Navbar)
        const handleLocalOrder = (e: CustomEvent) => {
            console.log("Local order placed:", e.detail);
            setActiveOrders((prev) => [e.detail, ...prev]);
        };

        window.addEventListener('local-order-placed', handleLocalOrder as EventListener);

        // Listen for Real-Time Updates from Backend
        socket.on('order-updated', (updatedOrder: any) => {
            console.log("Tracker: Order Updated", updatedOrder);
            setActiveOrders((prev) => prev.map(o =>
                o.orderId === updatedOrder.orderId ? { ...o, status: updatedOrder.status } : o
            ));
        });

        return () => {
            window.removeEventListener('local-order-placed', handleLocalOrder as EventListener);
            socket.off('order-updated');
        };
    }, []);

    if (activeOrders.length === 0) return null;

    return (
        <section className="bg-cream py-8 border-b-4 border-coffee-brown">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white border-2 border-coffee-brown rounded-xl p-6 shadow-[4px_4px_0px_0px_#4B3621]">
                    <h3 className="font-labels text-xl uppercase tracking-widest mb-6 flex items-center gap-2 text-burnt-orange">
                        <Clock className="w-6 h-6" /> Live Order Status
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence>
                            {activeOrders.map((order) => (
                                <motion.div
                                    key={order.orderId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-cream p-4 rounded border border-coffee-brown/20 flex flex-col gap-2"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold font-mono text-sm">Order #{order.orderId}</span>
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${order.status === 'NEW' ? 'bg-gray-100 border-gray-400 text-gray-600' :
                                            order.status === 'PREPARING' ? 'bg-mustard-yellow/20 border-mustard-yellow text-coffee-brown' :
                                                order.status === 'READY' ? 'bg-deep-teal/10 border-deep-teal text-deep-teal' :
                                                    'bg-burnt-orange/10 border-burnt-orange text-burnt-orange'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-xs opacity-60 font-mono line-clamp-1">
                                        {Array.isArray(order.items) ? order.items.map((i: any) => `${i.name}`).join(", ") : "Items"}
                                    </p>
                                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <motion.div
                                            className={`h-full ${order.status === 'NEW' ? 'bg-gray-400 w-[10%]' :
                                                order.status === 'PREPARING' ? 'bg-mustard-yellow w-[50%]' :
                                                    order.status === 'READY' ? 'bg-deep-teal w-[100%]' :
                                                        'bg-burnt-orange w-[100%]'
                                                }`}
                                            layout
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
