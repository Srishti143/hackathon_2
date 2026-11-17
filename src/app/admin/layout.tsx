import React from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-cream">
            {/* Global grain overlay is already in root layout, but we ensure structure here */}
            <Topbar />
            <Sidebar />

            <main className="pt-20 md:ml-64 p-6 min-h-screen relative z-0">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
