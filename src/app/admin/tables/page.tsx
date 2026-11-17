"use client";

import React, { useEffect, useState } from "react";
import { fetchTables, updateTableStatus } from "@/utils/api";
import { socket } from "@/utils/socket";

export default function TablesPage() {
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

        // Socket Listener
        socket.on('table-updated', (updatedTable: any) => {
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

    const handleToggleStatus = async (table: any) => {
        const newStatus = table.status === "Occupied" ? "Available" : "Occupied";
        try {
            await updateTableStatus(table._id, newStatus);
            // Optimistic update handled by socket usually, but let's do it here too for snappiness
            setTables((prev) => prev.map(t =>
                t._id === table._id ? { ...t, status: newStatus } : t
            ));
        } catch (error) {
            console.error("Failed to update table", error);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="font-serif text-3xl text-coffee-brown">Floor Plan</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {tables.map((table) => (
                    <div
                        key={table._id}
                        onClick={() => handleToggleStatus(table)}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center border-4 shadow-md transition-transform hover:scale-105 cursor-pointer ${table.status === "Occupied"
                            ? "bg-mustard-yellow border-coffee-brown text-coffee-brown"
                            : "bg-cream border-coffee-brown/30 text-coffee-brown/50 hover:border-coffee-brown hover:text-coffee-brown"
                            }`}
                    >
                        <div className="font-labels text-3xl mb-1">{table.tableNo}</div>
                        <div className="font-mono text-[10px] uppercase tracking-wider">{table.status}</div>
                        <div className="text-xs text-coffee-brown/70 mt-2 font-bold">{table.capacity} Seats</div>
                    </div>
                ))}
            </div>

            <div className="flex gap-6 mt-8 p-4 bg-white/40 rounded-lg inline-flex">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-cream border-2 border-coffee-brown/30 rounded"></div>
                    <span className="font-mono text-sm text-coffee-brown font-bold">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-mustard-yellow border-2 border-coffee-brown rounded"></div>
                    <span className="font-mono text-sm text-coffee-brown font-bold">Occupied</span>
                </div>
            </div>
            <p className="text-xs font-mono text-coffee-brown/60 mt-2">* Click on a table to toggle status</p>
        </div>
    );
}
