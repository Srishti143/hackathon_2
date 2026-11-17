"use client";

import React, { useEffect, useState } from "react";
import { socket } from "@/utils/socket";
import { fetchTables } from "@/utils/api";
import { AnimatePresence, motion } from "framer-motion";

export const TablesSection = () => {
    const [tables, setTables] = useState<any[]>([]);

    useEffect(() => {
        const loadTables = async () => {
            try {
                const data = await fetchTables();
                setTables(data);
            } catch (error) {
                console.error("Failed to load tables", error);
            }
        };

        loadTables();

        // Real-time listener
        socket.on('table-updated', (updatedTable: any) => {
            console.log("Table Update Received:", updatedTable);
            setTables((prev) => prev.map(t =>
                t._id === updatedTable._id ? updatedTable : t
            ));
        });

        socket.on('table-refresh', () => {
            loadTables();
        });

        return () => {
            socket.off('table-updated');
            socket.off('table-refresh');
        };
    }, []);

    return (
        <section id="tables" className="py-24 bg-cream text-coffee-brown">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-serif font-black mb-4 uppercase tracking-tighter text-coffee-brown">
                        Find a <span className="text-burnt-orange italic">Table</span>
                    </h2>
                    <p className="font-mono text-coffee-brown/70 max-w-2xl mx-auto">
                        Check real-time availability before you visit. Green means go, Yellow mean slow down (it's occupied!).
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {tables.map((table) => (
                        <div
                            key={table._id}
                            className={`aspect-square rounded-2xl flex flex-col items-center justify-center border-4 shadow-md transition-all ${table.status === "Occupied"
                                ? "bg-mustard-yellow border-coffee-brown text-coffee-brown"
                                : "bg-deep-teal border-coffee-brown text-cream"
                                }`}
                        >
                            <div className="font-labels text-3xl mb-1">{table.tableNo}</div>
                            <div className="font-mono text-[10px] uppercase tracking-wider font-bold">{table.status}</div>
                            <div className={`text-xs mt-2 font-bold ${table.status === 'Occupied' ? 'text-coffee-brown/70' : 'text-cream/70'}`}>{table.capacity} Seats</div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-8 mt-12">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-deep-teal border-2 border-coffee-brown rounded"></div>
                        <span className="font-mono font-bold text-coffee-brown">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-mustard-yellow border-2 border-coffee-brown rounded"></div>
                        <span className="font-mono font-bold text-coffee-brown">Occupied</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
