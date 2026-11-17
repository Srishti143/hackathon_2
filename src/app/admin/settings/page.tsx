"use client";

import React, { useState, useEffect } from "react";
import { ToggleLeft, ToggleRight, Trash2, Power, Grid } from "lucide-react";
import { fetchTables, updateTableCount } from "@/utils/api";

const TableConfig = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTables().then(data => setCount(data.length));
    }, []);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await updateTableCount(count);
            alert("Table count updated!");
        } catch (error) {
            console.error(error);
            alert("Failed to update.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-between pb-6 border-b border-coffee-brown/20">
            <div>
                <h3 className="font-serif text-xl text-coffee-brown">Floor Plan</h3>
                <p className="font-mono text-xs opacity-60">Set the number of available tables (1-50).</p>
            </div>
            <div className="flex items-center gap-4">
                <input
                    type="number"
                    min="1"
                    max="50"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="w-16 p-2 border-2 border-coffee-brown/20 rounded text-center font-mono font-bold text-coffee-brown bg-cream focus:border-coffee-brown focus:outline-none"
                />
                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="bg-coffee-brown text-cream px-4 py-2 rounded border hover:bg-coffee-brown/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    <Grid size={16} />
                    <span className="font-mono text-xs uppercase">{loading ? "Saving..." : "Update"}</span>
                </button>
            </div>
        </div>
    );
};

export default function SettingsPage() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="font-serif text-3xl text-coffee-brown text-center mb-8">System Settings</h2>

            <div className="bg-white/60 border-2 border-coffee-brown rounded-lg p-8 shadow-lg space-y-8">

                {/* Shop Status Toggle */}
                <div className="flex items-center justify-between pb-6 border-b border-coffee-brown/20">
                    <div>
                        <h3 className="font-serif text-xl text-coffee-brown">Cafe Status</h3>
                        <p className="font-mono text-xs opacity-60">Control digital ordering availability.</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${isOpen ? "bg-green-100 border-green-600 text-green-800" : "bg-red-100 border-red-600 text-red-800"
                            }`}
                    >
                        <Power size={18} />
                        <span className="font-bold font-mono uppercase">{isOpen ? "Open" : "Closed"}</span>
                    </button>
                </div>

                {/* Reset Data */}
                <div className="flex items-center justify-between pb-6 border-b border-coffee-brown/20">
                    <div>
                        <h3 className="font-serif text-xl text-coffee-brown">End of Day</h3>
                        <p className="font-mono text-xs opacity-60">Clear all daily orders and reset table status.</p>
                    </div>
                    <button className="bg-coffee-brown text-cream px-4 py-2 rounded border hover:bg-red-900 transition-colors flex items-center gap-2">
                        <Trash2 size={16} />
                        <span className="font-mono text-xs uppercase">Reset Data</span>
                    </button>
                </div>

                {/* Table Configuration */}
                <TableConfig />

                {/* Admin Info */}
                <div>
                    <h3 className="font-serif text-xl text-coffee-brown mb-4">Admin Account</h3>
                    <div className="bg-coffee-brown/5 p-4 rounded border border-coffee-brown/20 font-mono text-sm text-coffee-brown space-y-2">
                        <div className="flex justify-between">
                            <span className="opacity-60">Username:</span>
                            <span className="font-bold">RetroAdmin</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-60">Role:</span>
                            <span className="font-bold">Manager</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-60">Last Login:</span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
