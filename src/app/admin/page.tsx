"use client";

import React from "react";
import { ArrowUpRight, Clock, Users, Coffee } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { title: "Total Orders", value: "128", sub: "Today", icon: Coffee, color: "bg-burnt-orange" },
        { title: "Active Tables", value: "8/12", sub: "Occupancy", icon: Users, color: "bg-mustard-yellow" },
        { title: "Pending", value: "5", sub: "Kitchen", icon: Clock, color: "bg-deep-teal" },
    ];

    const recentOrders = [
        { id: "#1021", table: "5", name: "Ayan", status: "Preparing", time: "12:40 PM" },
        { id: "#1022", table: "2", name: "Riya", status: "New", time: "12:42 PM" },
        { id: "#1023", table: "8", name: "Sam", status: "Ready", time: "12:35 PM" },
        { id: "#1024", table: "1", name: "Guest", status: "Served", time: "12:20 PM" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "New": return "text-burnt-orange";
            case "Preparing": return "text-mustard-yellow";
            case "Ready": return "text-deep-teal";
            default: return "text-coffee-brown/60";
        }
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="font-serif text-3xl text-coffee-brown">Dashboard Overview</h2>
                <span className="font-mono text-xs text-coffee-brown/60">{new Date().toDateString()}</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white/60 border-2 border-coffee-brown rounded-lg p-6 shadow-md relative overflow-hidden group hover:-translate-y-1 transition-transform">
                            <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}></div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-labels text-xl text-coffee-brown/70 tracking-widest uppercase mb-1">{stat.title}</p>
                                    <h3 className="font-serif text-5xl text-coffee-brown">{stat.value}</h3>
                                    <p className="font-mono text-xs text-coffee-brown/50 mt-2 flex items-center gap-1">
                                        <ArrowUpRight size={12} /> {stat.sub}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-full text-white ${stat.color} shadow-sm border border-coffee-brown/10`}>
                                    <Icon size={24} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white/40 border-2 border-coffee-brown rounded-lg shadow-lg overflow-hidden">
                <div className="bg-coffee-brown p-4 border-b-2 border-mustard-yellow flex justify-between items-center">
                    <h3 className="font-serif text-xl text-cream">Register: Recent Orders</h3>
                    <button className="text-cream/70 hover:text-mustard-yellow font-mono text-xs underline">View All</button>
                </div>

                <div className="p-4 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-coffee-brown/20">
                                <th className="p-3 font-labels text-lg text-coffee-brown/60 tracking-wider">Order ID</th>
                                <th className="p-3 font-labels text-lg text-coffee-brown/60 tracking-wider">Table</th>
                                <th className="p-3 font-labels text-lg text-coffee-brown/60 tracking-wider">Customer</th>
                                <th className="p-3 font-labels text-lg text-coffee-brown/60 tracking-wider">Status</th>
                                <th className="p-3 font-labels text-lg text-coffee-brown/60 tracking-wider">Time</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono text-sm text-coffee-brown">
                            {recentOrders.map((order, i) => (
                                <tr key={i} className="hover:bg-coffee-brown/5 transition-colors border-b border-coffee-brown/10 last:border-0 cursor-pointer">
                                    <td className="p-3 font-bold">{order.id}</td>
                                    <td className="p-3 bg-white/30 w-16 text-center rounded">{order.table}</td>
                                    <td className="p-3">{order.name}</td>
                                    <td className={`p-3 font-bold ${getStatusColor(order.status)} uppercase tracking-wider`}>{order.status}</td>
                                    <td className="p-3 text-coffee-brown/60">{order.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
