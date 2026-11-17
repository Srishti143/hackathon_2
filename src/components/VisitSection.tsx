"use client";

import { Clock, MapPin, Phone } from "lucide-react";

export const VisitSection = () => {
    return (
        <section id="visit" className="py-24 bg-cream border-t-8 border-coffee-brown">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-5xl md:text-7xl font-serif font-black text-coffee-brown mb-8 uppercase tracking-tighter">
                        Stop By & <span className="text-burnt-orange underline decoration-mustard-yellow">Say Hi</span>
                    </h2>

                    <div className="space-y-8 font-mono">
                        <div className="flex items-start gap-4 p-6 bg-coffee-brown text-cream rounded-2xl border-4 border-mustard-yellow shadow-[8px_8px_0px_0px_#BF5700]">
                            <MapPin className="w-8 h-8 text-mustard-yellow" />
                            <div>
                                <h3 className="font-bold text-xl uppercase mb-2">Location</h3>
                                <p>S-VYASA University School of Advance Studies, 6th Floor</p>
                                <p className="mt-2 text-sm text-cream/50">Bengaluru</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-mustard-yellow text-coffee-brown rounded-2xl border-4 border-coffee-brown shadow-[8px_8px_0px_0px_#4B3621]">
                            <Phone className="w-8 h-8 text-burnt-orange" />
                            <div>
                                <h3 className="font-bold text-xl uppercase mb-2">Ring Us</h3>
                                <p>(123) 456-1978</p>
                                <p className="mt-2 text-sm text-coffee-brown/50">Available during shop hours</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-[#1a1a1a] p-8 rounded-3xl border-8 border-coffee-brown shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                            <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e]" />
                        </div>
                        <h3 className="text-3xl font-serif font-black text-white mb-6 uppercase tracking-widest text-center shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                            Now <span className="text-pink-500 animate-pulse">Brewing</span>
                        </h3>
                        <div className="space-y-4 font-mono text-white/80">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span>MON - FRI</span>
                                <span className="text-mustard-yellow font-bold">07:00 - 21:00</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span>SATURDAY</span>
                                <span className="text-mustard-yellow font-bold">08:00 - 22:00</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span>SUNDAY</span>
                                <span className="text-mustard-yellow font-bold">09:00 - 20:00</span>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="text-xs text-white/30 uppercase tracking-[0.3em] font-bold">Today's Vibe</p>
                            <p className="text-lg text-cream mt-2 italic font-serif">"Lo-fi beats & extra caramel shots"</p>
                        </div>

                        {/* Neon flicker effect */}
                        <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>

                    <div className="aspect-video bg-coffee-brown rounded-3xl border-4 border-mustard-yellow overflow-hidden shadow-[8px_8px_0px_0px_#4B3621] relative group">
                        <iframe
                            src="https://maps.google.com/maps?q=S-VYASA+University+School+of+Advanced+Studies+Bengaluru&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};
