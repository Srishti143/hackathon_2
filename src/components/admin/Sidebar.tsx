"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Users, UtensilsCrossed, Settings } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Order Register", href: "/admin/orders", icon: ShoppingBag },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Tables", href: "/admin/tables", icon: UtensilsCrossed },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-cream border-r-4 border-coffee-brown flex flex-col pt-8 z-40 hidden md:flex shadow-2xl">
            <div className="px-6 mb-8">
                <p className="font-labels text-coffee-brown/50 text-xl uppercase tracking-widest border-b-2 border-coffee-brown/10 pb-2">Navigation</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg border-2 transition-all group ${isActive
                                    ? "bg-mustard-yellow border-coffee-brown text-coffee-brown shadow-[2px_2px_0px_0px_rgba(75,54,33,1)] translate-x-1"
                                    : "border-transparent hover:bg-coffee-brown/5 hover:border-coffee-brown/20 text-coffee-brown/80"
                                }`}
                        >
                            <Icon size={20} className={isActive ? "text-coffee-brown" : "text-coffee-brown/60 group-hover:text-coffee-brown"} />
                            <span className={`font-serif text-lg ${isActive ? "font-bold" : ""}`}>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6">
                <div className="bg-coffee-brown/5 border-2 border-coffee-brown/10 rounded p-4 text-center">
                    <p className="font-mono text-[10px] text-coffee-brown/60 uppercase">System Status</p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="font-labels text-lg text-coffee-brown">Online</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
