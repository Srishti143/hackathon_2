"use client";

import React, { useEffect, useState } from "react";
import { User, Phone } from "lucide-react";
import { fetchCustomers } from "@/utils/api";
import { socket } from "@/utils/socket";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);

    useEffect(() => {
        const loadCustomers = async () => {
            try {
                // In a real app, pass the token if needed. For now, we fetch public/protected data.
                const token = localStorage.getItem('adminToken');
                const data = await fetchCustomers(token || undefined);
                setCustomers(data);
            } catch (error) {
                console.error("Failed to load customers", error);
            }
        };

        loadCustomers();

        // Real-time listener
        socket.on('customer-login', (newCustomer: any) => {
            console.log("New Customer Logged In:", newCustomer);
            setCustomers((prev) => [newCustomer, ...prev]);
        });

        return () => {
            socket.off('customer-login');
        };
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-serif text-3xl text-coffee-brown">Customer Ledger</h2>
                <div className="font-mono text-sm text-coffee-brown/60">Total Patrons: {customers.length}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer, i) => (
                    <div key={i} className="bg-cream border-2 border-coffee-brown rounded-lg p-6 shadow-md relative hover:shadow-lg transition-shadow">
                        <div className="absolute top-4 right-4">
                            <div className={`w-3 h-3 rounded-full ${customer.name === "Guest" ? "bg-gray-400" : "bg-deep-teal"} border border-coffee-brown`} title="Status"></div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-coffee-brown/10 rounded-full text-coffee-brown">
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="font-serif text-xl text-coffee-brown">{customer.name || "Guest"}</h3>
                                <span className="text-xs font-mono text-coffee-brown/50 uppercase tracking-widest">{customer.name === "Guest" ? "Walk-In" : "Registered"}</span>
                            </div>
                        </div>

                        <div className="space-y-2 border-t border-coffee-brown/10 pt-4">
                            <div className="flex items-center justify-between text-sm font-mono text-coffee-brown/80">
                                <span className="flex items-center gap-2"><Phone size={14} /> Contact</span>
                                <span>{customer.contact || "—"}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-mono text-coffee-brown/80">
                                <span>Current Table</span>
                                <span className="bg-white border px-2 rounded">#{customer.tableNo || "?"}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-mono text-coffee-brown/80">
                                <span>Checked In</span>
                                <span>{customer.createdAt ? new Date(customer.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently"}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
