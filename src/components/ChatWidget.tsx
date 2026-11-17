"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Monitor } from "lucide-react";

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hey there! I'm Charlie. Feeling jazzy today? How can I help you brew some memories?" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chat', handleOpenChat);
        return () => window.removeEventListener('open-chat', handleOpenChat);
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            const data = await response.json();
            setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
        } catch (error) {
            setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, my vacuum tubes are acting up. Can you try again?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        onClick={() => setIsOpen(true)}
                        className="bg-deep-teal text-cream p-1 rounded-full border-4 border-coffee-brown shadow-[4px_4px_0px_0px_#4B3621] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                    >
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cream">
                            <img src="/chef-bot.png" alt="Charlie" className="w-full h-full object-cover" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="w-[350px] md:w-[400px] h-[500px] bg-coffee-brown rounded-3xl border-8 border-coffee-brown overflow-hidden flex flex-col shadow-2xl relative cursor-pointer"
                    >
                        {/* CRT Screen Glow Layer */}
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,100,0.05)_0%,transparent_100%)] z-10" />

                        {/* CRT Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-20" />

                        <div className="bg-coffee-brown px-4 py-3 flex justify-between items-center border-b-4 border-coffee-brown/50">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                <span className="font-mono text-sm text-cream/70 font-bold uppercase tracking-widest">BrewBot-78 v1.0</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-cream/50 hover:text-cream transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1a1a1a] scrollbar-hide"
                        >
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] p-3 rounded-lg font-mono text-sm whitespace-pre-wrap ${msg.role === "user"
                                        ? "bg-burnt-orange text-cream rounded-br-none"
                                        : "bg-[#2a2a2a] text-[#00ff41] rounded-bl-none shadow-[0_0_10px_rgba(0,255,65,0.2)]"
                                        }`}>
                                        {msg.content.split('**').map((part, index) =>
                                            index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[#2a2a2a] text-[#00ff41] p-3 rounded-lg font-mono text-sm animate-pulse">
                                        Thinking...
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-coffee-brown border-t-4 border-coffee-brown/50">
                            <div className="flex gap-2 bg-[#2a2a2a] p-2 rounded-xl border-2 border-cream/20">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask Charlie..."
                                    className="flex-1 bg-transparent text-cream font-mono outline-none px-2 placeholder:text-cream/30"
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-cream text-coffee-brown p-2 rounded-lg hover:bg-mustard-yellow transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
