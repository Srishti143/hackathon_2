"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Coffee, ArrowRight, User, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginCustomer, skipCustomer, loginAdmin } from "@/utils/api";

export default function LoginPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [tableNo, setTableNo] = useState("");

    // Admin State
    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginAdmin({ empId: adminId, password });
            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                router.push("/admin/orders");
            }
        } catch (error) {
            console.error("Admin Login failed", error);
            alert("Invalid Admin Credentials");
        } finally {
            setLoading(false);
        }
    };

    const handleCustomerLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginCustomer({ name, contact, tableNo });
            if (data.sessionId) {
                localStorage.setItem('sessionId', data.sessionId);
                router.push("/home");
            }
        } catch (error) {
            console.error("Login failed", error);
            alert("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = async () => {
        setLoading(true);
        try {
            const data = await skipCustomer();
            if (data.sessionId) {
                localStorage.setItem('sessionId', data.sessionId);
                router.push("/home");
            }
        } catch (error) {
            console.error("Skip failed", error);
            // Fallback for demo if backend skip fails
            router.push("/home");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cream">
            {/* Retro Grain Overlay is global in layout, but ensuring background is cream here */}

            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative z-10">

                {/* --- LEFT COLUMN: ADMIN LOGIN (The "Official" Side) --- */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="order-2 md:order-1"
                >
                    <div className="bg-coffee-brown text-cream p-6 rounded-lg shadow-lg border-2 border-coffee-brown relative max-w-sm mx-auto md:mr-auto transform rotate-1 hover:rotate-0 transition-transform duration-300">
                        <div className="absolute -top-4 -left-4 bg-burnt-orange p-2 rounded-full border-2 border-cream shadow-md">
                            <Lock size={20} className="text-cream" />
                        </div>

                        <h2 className="font-serif text-2xl mb-2 text-mustard-yellow">Admin Panel</h2>
                        <p className="font-mono text-xs opacity-80 mb-6">Restricted Access. Staff credentials required to manage the daily grind.</p>

                        <form onSubmit={handleAdminLogin} className="space-y-4">
                            <div>
                                <label className="block font-mono text-xs uppercase tracking-wider mb-1">Admin ID</label>
                                <input
                                    type="text"
                                    placeholder="EMP-001"
                                    value={adminId}
                                    onChange={(e) => setAdminId(e.target.value)}
                                    className="w-full bg-cream/10 border border-cream/30 rounded p-2 text-cream placeholder-cream/40 font-mono focus:outline-none focus:border-mustard-yellow transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-xs uppercase tracking-wider mb-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-cream/10 border border-cream/30 rounded p-2 text-cream placeholder-cream/40 font-mono focus:outline-none focus:border-mustard-yellow transition-colors"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-mustard-yellow text-coffee-brown font-bold font-serif py-2 rounded shadow-md border-b-2 border-r-2 border-black/20 hover:bg-yellow-500 transition-colors mt-2 disabled:opacity-70"
                            >
                                {loading ? "Verifying..." : "Enter Admin Panel"}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>


                {/* --- RIGHT COLUMN: CUSTOMER LOGIN (The "Friendly" Side) --- */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="order-1 md:order-2"
                >
                    <div className="bg-cream border-4 border-coffee-brown rounded-2xl p-8 shadow-xl relative -rotate-1 hover:rotate-0 transition-transform duration-300">

                        <div className="text-center mb-8">
                            {/* Placeholder for Logo */}
                            <div className="inline-flex items-center justify-center p-3 border-2 border-coffee-brown rounded-full mb-4 bg-white/50">
                                <Coffee size={32} className="text-coffee-brown" />
                            </div>
                            <h1 className="font-serif text-4xl text-coffee-brown mb-2">Welcome Back</h1>
                            <p className="font-mono text-coffee-brown/70">Sign in or sip around freely.</p>
                        </div>

                        <div className="bg-white/40 border-l-4 border-burnt-orange p-4 mb-6 rounded-r-lg">
                            <h3 className="font-serif text-xl text-burnt-orange mb-1">Join Us for a Brew?</h3>
                            <p className="font-mono text-sm text-coffee-brown/80">We’ll memorize your favorite order so you don’t have to.</p>
                        </div>

                        <form onSubmit={handleCustomerLogin} className="space-y-4">
                            <div className="relative group">
                                <User size={18} className="absolute left-3 top-3 text-coffee-brown/50 group-focus-within:text-burnt-orange transition-colors" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Your Name *"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/60 border-2 border-coffee-brown/20 rounded-lg py-2.5 pl-10 pr-4 text-coffee-brown placeholder-coffee-brown/40 font-mono focus:outline-none focus:border-burnt-orange transition-colors"
                                />
                            </div>

                            <div className="relative group">
                                <Phone size={18} className="absolute left-3 top-3 text-coffee-brown/50 group-focus-within:text-burnt-orange transition-colors" />
                                <input
                                    type="tel"
                                    required
                                    placeholder="000-000-0000 *"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    className="w-full bg-white/60 border-2 border-coffee-brown/20 rounded-lg py-2.5 pl-10 pr-4 text-coffee-brown placeholder-coffee-brown/40 font-mono focus:outline-none focus:border-burnt-orange transition-colors"
                                />
                                <span className="text-[10px] text-coffee-brown/60 ml-2 mt-1 block">We’ll only use this to serve you better ☕</span>
                            </div>

                            <div className="relative group">
                                <MapPin size={18} className="absolute left-3 top-3 text-coffee-brown/50 group-focus-within:text-burnt-orange transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Table Number (Optional)"
                                    value={tableNo}
                                    onChange={(e) => setTableNo(e.target.value)}
                                    className="w-full bg-white/60 border-2 border-coffee-brown/20 rounded-lg py-2.5 pl-10 pr-4 text-coffee-brown placeholder-coffee-brown/40 font-mono focus:outline-none focus:border-burnt-orange transition-colors"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#BF5700" }} // darker orange
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-burnt-orange text-white font-serif font-bold text-lg py-3 rounded-lg shadow-md border-b-4 border-r-4 border-coffee-brown hover:shadow-sm hover:border-b-2 hover:border-r-2 hover:translate-y-[2px] hover:translate-x-[2px] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {loading ? "Checking In..." : <>Continue to Menu <ArrowRight size={18} /></>}
                            </motion.button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                onClick={handleSkip}
                                disabled={loading}
                                className="text-coffee-brown/60 hover:text-burnt-orange font-mono text-sm underlineDecoration-dashed underline underline-offset-4 transition-colors hover:no-underline disabled:opacity-50"
                            >
                                {loading ? "Entering..." : "Skip for Now \u2192"}
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
