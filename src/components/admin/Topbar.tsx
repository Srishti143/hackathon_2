"use client";

import React from "react";
import { Coffee, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Topbar() {
    const router = useRouter();

    const handleLogout = () => {
        // In a real app, clear tokens here
        router.push("/");
    };

    return (
        <header className="h-16 bg-coffee-brown text-cream border-b-4 border-mustard-yellow flex items-center justify-between px-6 shadow-md fixed top-0 right-0 left-0 z-50">
            <div className="flex items-center gap-3">
                <div className="bg-cream/10 p-2 rounded-full border border-cream/20">
                    <Coffee size={20} className="text-mustard-yellow" />
                </div>
                <h1 className="font-serif text-xl tracking-wide">
                    Retro Cafe <span className="font-mono text-xs opacity-70 ml-2 uppercase tracking-widest text-mustard-yellow">Admin Register</span>
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                    <p className="font-serif text-sm">Manager Interface</p>
                    <p className="font-mono text-[10px] opacity-60 uppercase tracking-wider">Logged in as: Admin</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-cream text-coffee-brown px-3 py-1.5 rounded border-b-2 border-r-2 border-black/30 hover:bg-mustard-yellow transition-all active:border-0 active:translate-y-[2px] active:translate-x-[2px]"
                >
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Logout</span>
                    <LogOut size={14} />
                </button>
            </div>
        </header>
    );
}
