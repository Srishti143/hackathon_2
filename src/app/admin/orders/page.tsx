"use client";

import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { fetchOrders, updateOrderStatus } from "@/utils/api";
import { socket } from "@/utils/socket";

// Define Order Interface based on API response
interface Order {
    orderId: string;
    customer: string;
    contact: string;
    tableNo: string;
    status: string;
    items: { name: string; qty: number }[];
    time: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    // In a real app, this token comes from Auth Context/LocalStorage
    // For demo/verification, we assume the backend might be loose or we'll need to login first.
    // However, for the purpose of "Admin Panel viewing orders", we'll attempt unprotected fetch 
    // OR we can quickly perform a login in the background if needed.
    // Given the previous task instructions, fetchOrders requires a token.
    // We'll use a hardcoded strategy or local storage retrieval.
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Recover token from localStorage (set during Login flow which we haven't strictly enforced on Frontend UI yet)
        const storedToken = localStorage.getItem('adminToken');
        if (storedToken) setToken(storedToken);
    }, []);

    const loadOrders = async () => {
        try {
            // Note: If you haven't logged in via the UI, this might fail with 401. 
            // Ideally, you should login via Postman and paste token to localStorage, 
            // or build a simple login page connection.
            // For now, let's assume we have a token or the backend allows it.
            const data = await fetchOrders(token || undefined);
            const mappedOrders = data.map((o: any) => ({
                ...o,
                items: o.items // Backend returns direct array, mismatching the old static shape text
            }));
            setOrders(mappedOrders);
        } catch (error) {
            console.error("Failed to load orders", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) loadOrders();
    }, [token]);

    // WebSocket Listener
    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected to Real-Time Server");
        });

        socket.on('new-order', (newOrder: any) => {
            console.log("New Order Received:", newOrder);
            // Prepend new order
            setOrders((prev) => [newOrder, ...prev]);
        });

        socket.on('order-updated', (updatedOrder: any) => {
            console.log("Order Updated:", updatedOrder);
            setOrders((prev) => prev.map(o =>
                o.orderId === updatedOrder.orderId ? { ...o, status: updatedOrder.status } : o
            ));
        });

        return () => {
            socket.off('new-order');
            socket.off('order-updated');
        };
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await updateOrderStatus(id, newStatus, token || undefined);
            // Optimistic update
            setOrders((prev) => prev.map(o =>
                o.orderId === id ? { ...o, status: newStatus } : o
            ));
        } catch (error) {
            console.error("Update failed", error);
        }
    }

    if (loading && !token) return <div className="p-10 font-mono text-coffee-brown">Please Log In to View Orders...</div>;
    if (loading) return <div className="p-10 font-mono text-coffee-brown">Loading Ledger...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-serif text-3xl text-coffee-brown">Order Register</h2>
                <div className="flex gap-2">
                    <button className="bg-coffee-brown text-cream px-4 py-2 rounded font-mono text-xs uppercase hover:bg-coffee-brown/90 shadow-sm">All</button>
                    <button className="bg-white border text-coffee-brown px-4 py-2 rounded font-mono text-xs uppercase hover:bg-mustard-yellow/20">New</button>
                    <button className="bg-white border text-coffee-brown px-4 py-2 rounded font-mono text-xs uppercase hover:bg-mustard-yellow/20">Preparing</button>
                </div>
            </div>

            <div className="bg-white/60 border-2 border-coffee-brown rounded-lg shadow-md overflow-hidden min-h-[500px]">
                <table className="w-full text-left">
                    <thead className="bg-coffee-brown/10 border-b-2 border-coffee-brown text-coffee-brown uppercase font-labels text-xl tracking-widest sticky top-0">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Items</th>
                            <th className="p-4">Table</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Time</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-sm text-coffee-brown">
                        {orders.map((order) => (
                            <tr key={order.orderId} className="border-b border-coffee-brown/10 hover:bg-white transition-colors cursor-pointer group">
                                <td className="p-4 font-bold text-lg group-hover:text-burnt-orange">{order.orderId}</td>
                                <td className="p-4">
                                    <div className="font-bold">{order.customer}</div>
                                    <div className="text-xs text-coffee-brown/70">{order.contact}</div>
                                </td>
                                <td className="p-4 max-w-xs font-medium">
                                    {/* Handle items array rendering */}
                                    {order.items.map((i: any) => `${i.name} x${i.qty}`).join(", ")}
                                </td>
                                <td className="p-4">
                                    <span className="bg-cream border border-coffee-brown/20 px-2 py-1 rounded inline-block w-8 text-center font-bold">{order.tableNo}</span>
                                </td>
                                <td className="p-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order.orderId, e.target.value)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border appearance-none cursor-pointer ${order.status === "NEW" ? "bg-burnt-orange/10 text-burnt-orange border-burnt-orange" :
                                            order.status === "PREPARING" ? "bg-mustard-yellow/10 text-mustard-yellow border-mustard-yellow" :
                                                order.status === "READY" ? "bg-deep-teal/10 text-deep-teal border-deep-teal" :
                                                    "bg-gray-200 text-gray-600 border-gray-400"
                                            }`}
                                    >
                                        <option value="NEW">NEW</option>
                                        <option value="PREPARING">PREPARING</option>
                                        <option value="READY">READY</option>
                                        <option value="SERVED">SERVED</option>
                                    </select>
                                </td>
                                <td className="p-4 font-medium">{order.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
