"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
    Search, Send, Paperclip, MoreVertical, BrainCircuit,
    CheckCheck, Clock, ShieldCheck, Sparkles, Smile, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- MOCK DATA FOR CHAT ---
const contacts = [
    { id: 1, name: 'Prof. Sara Khan', role: 'Mathematics Teacher', avatar: 'SK', lastMsg: 'Ali missed his calculus quiz today.', time: '10:42 AM', unread: 2, online: true, tone: 'Concerned' },
    { id: 2, name: 'Ms. Ayesha Malik', role: 'English Literature', avatar: 'AM', lastMsg: 'The recent essay was outstanding!', time: 'Yesterday', unread: 0, online: false, tone: 'Encouraging' },
    { id: 3, name: 'Dr. Usman Tariq', role: 'Physics Dept.', avatar: 'UT', lastMsg: 'Please sign the lab permission slip.', time: 'Mon', unread: 0, online: true, tone: 'Neutral' },
    { id: 4, name: 'Admin Office', role: 'School Management', avatar: 'AO', lastMsg: 'Spring semester fee voucher generated.', time: 'Last Week', unread: 0, online: false, tone: 'Official' },
];

const chatHistory = [
    { id: 1, sender: 'teacher', text: 'Dear Parent, I wanted to bring to your attention that Ali missed his calculus quiz today. He has been struggling slightly with chapter 4.', time: '10:30 AM' },
    { id: 2, sender: 'teacher', text: 'I recommend we schedule a brief 10-minute online meeting to discuss a remedial plan. Let me know what time works for you this Thursday.', time: '10:42 AM' },
];

const aiSuggestions = [
    "Sure, I am available this Thursday at 4 PM.",
    "I will talk to him. Can we meet on Friday instead?",
    "Thank you for letting me know. I'll ensure he completes it."
];

// Animations
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ParentMessagesPage() {
    const [activeContact, setActiveContact] = useState(contacts[0]);
    const [message, setMessage] = useState('');

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6 pb-10 max-w-[1200px] mx-auto h-[calc(100vh-6rem)] min-h-[700px] flex flex-col"
        >
            {/* --- PAGE HEADER --- */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tighter">Communication Center</h1>
                    <p className="text-slate-400 mt-1 text-sm">Direct messaging with teachers and school administration.</p>
                </div>
            </motion.div>

            {/* --- MAIN CHAT INTERFACE --- */}
            <motion.div variants={itemVariants} className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">

                {/* --- LEFT PANE: CONTACTS LIST --- */}
                <div className="md:col-span-4 lg:col-span-3 border-r border-white/10 flex flex-col bg-slate-950/30">
                    {/* Search Bar */}
                    <div className="p-4 border-b border-white/10 shrink-0">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text" placeholder="Search messages..."
                                className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Contacts Scrollable List */}
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-2 space-y-1">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setActiveContact(contact)}
                                className={cn(
                                    "flex items-start gap-3 p-3 rounded-2xl cursor-pointer transition-all border",
                                    activeContact.id === contact.id
                                        ? "bg-indigo-600/10 border-indigo-500/20 shadow-sm"
                                        : "bg-transparent border-transparent hover:bg-white/5"
                                )}
                            >
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center font-black text-white shadow-inner",
                                        activeContact.id === contact.id ? "bg-indigo-500" : "bg-slate-800"
                                    )}>
                                        {contact.avatar}
                                    </div>
                                    {contact.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />}
                                </div>

                                {/* Contact Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h4 className="text-sm font-bold text-white truncate pr-2">{contact.name}</h4>
                                        <span className="text-[10px] font-medium text-slate-500 shrink-0">{contact.time}</span>
                                    </div>
                                    <p className={cn("text-xs truncate", activeContact.id === contact.id ? "text-indigo-300" : "text-slate-400")}>
                                        {contact.lastMsg}
                                    </p>
                                </div>

                                {/* Unread Badge */}
                                {contact.unread > 0 && (
                                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">
                                        {contact.unread}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- RIGHT PANE: ACTIVE CHAT --- */}
                <div className="md:col-span-8 lg:col-span-9 flex flex-col bg-slate-900/20 relative">

                    {/* Chat Header */}
                    <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/50 shrink-0 backdrop-blur-md z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white">
                                {activeContact.avatar}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    {activeContact.name} <ShieldCheck className="w-4 h-4 text-blue-400" />
                                </h2>
                                <p className="text-xs text-slate-400 font-medium">{activeContact.role}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* AI Tone Indicator */}
                            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                                <BrainCircuit className="w-4 h-4" /> Tone: {activeContact.tone}
                            </div>
                            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                        {/* AI Context Summary Bubble */}
                        <div className="flex justify-center mb-8">
                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 flex items-center gap-2 shadow-sm">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                AI Summary: The teacher is requesting a meeting regarding Ali's recent quiz.
                            </div>
                        </div>

                        {/* Render Messages */}
                        {chatHistory.map((msg) => (
                            <div key={msg.id} className="flex flex-col items-start max-w-[80%]">
                                <div className="flex items-center gap-2 mb-1 pl-1">
                                    <span className="text-xs font-bold text-slate-300">{activeContact.name}</span>
                                    <span className="text-[10px] text-slate-500">{msg.time}</span>
                                </div>
                                <div className="px-5 py-3 rounded-2xl rounded-tl-sm bg-slate-800 border border-white/5 text-sm text-slate-200 leading-relaxed shadow-sm">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- AI SMART REPLIES (The Wow Factor) --- */}
                    <div className="px-6 py-3 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                        <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 mr-2">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        {aiSuggestions.map((suggestion, idx) => (
                            <button
                                key={idx}
                                onClick={() => setMessage(suggestion)}
                                className="shrink-0 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium hover:bg-indigo-500/20 hover:text-indigo-200 transition-colors whitespace-nowrap"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>

                    {/* --- INPUT AREA --- */}
                    <div className="p-4 bg-slate-950/50 border-t border-white/10 shrink-0">
                        <div className="flex items-end gap-3 bg-slate-900 border border-white/10 rounded-2xl p-2 focus-within:border-indigo-500/50 transition-colors">
                            <button className="p-2.5 text-slate-400 hover:text-white transition-colors shrink-0">
                                <Paperclip className="w-5 h-5" />
                            </button>

                            <textarea
                                rows={1}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white resize-none py-2.5 max-h-32"
                            />

                            <button
                                className={cn(
                                    "p-2.5 rounded-xl flex items-center justify-center transition-all shrink-0 shadow-lg",
                                    message.trim() ? "bg-indigo-600 text-white shadow-indigo-500/20 hover:bg-indigo-500" : "bg-white/5 text-slate-500"
                                )}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>
            </motion.div>
        </motion.div>
    );
}