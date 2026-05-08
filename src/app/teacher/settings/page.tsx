"use client";

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
    User, Shield, BrainCircuit, Clock,
    Camera, Save, SlidersHorizontal, CheckCircle2,
    Zap, BellRing, Lock, Sparkles, Smartphone, Globe, Trash2, Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function TeacherSettings() {
    const [activeTab, setActiveTab] = useState<'profile' | 'ai_preferences' | 'schedule' | 'security'>('profile');

    // States for interactive UI
    const [aiDrafting, setAiDrafting] = useState(true);
    const [autoPublish, setAutoPublish] = useState(false);
    const [strictness, setStrictness] = useState(75);
    const [twoFactor, setTwoFactor] = useState(true);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1200px] mx-auto"
        >
            {/* Page Header */}
            <motion.div variants={itemVariants} className="border-b border-white/10 pb-6">
                <h1 className="text-3xl font-extrabold text-white tracking-tighter">Account & Preferences</h1>
                <p className="text-slate-400 mt-1 text-sm">Manage your academic profile, AI settings, and security.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* --- LEFT SIDEBAR NAVIGATION --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-3 space-y-2">
                    {[
                        { id: 'profile', icon: User, label: 'Public Profile', desc: 'Avatar & bio' },
                        { id: 'ai_preferences', icon: BrainCircuit, label: 'AI Configuration', desc: 'Grading & strictness' },
                        { id: 'schedule', icon: Clock, label: 'Office Hours', desc: 'Availability settings' },
                        { id: 'security', icon: Shield, label: 'Security', desc: 'Password & 2FA' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "w-full text-left p-4 rounded-2xl transition-all flex items-start gap-4 border",
                                activeTab === tab.id
                                    ? "bg-emerald-600/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                                    : "bg-transparent border-transparent hover:bg-white/5"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-colors",
                                activeTab === tab.id ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                            )}>
                                <tab.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className={cn("font-bold text-sm", activeTab === tab.id ? "text-emerald-400" : "text-slate-200")}>{tab.label}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{tab.desc}</p>
                            </div>
                        </button>
                    ))}
                </motion.div>

                {/* --- RIGHT CONTENT AREA --- */}
                <motion.div variants={itemVariants} className="md:col-span-8 lg:col-span-9">
                    <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl min-h-[550px]">
                        <AnimatePresence mode="wait">

                            {/* TAB 1: PUBLIC PROFILE */}
                            {activeTab === 'profile' && (
                                <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h2 className="text-xl font-bold text-white">Academic Profile</h2>
                                    <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="relative group cursor-pointer">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white text-2xl font-black border-4 border-slate-900 shadow-xl group-hover:opacity-80 transition-opacity">DA</div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="w-6 h-6 text-white" /></div>
                                        </div>
                                        <div>
                                            <div className="flex gap-3">
                                                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20">Upload New</button>
                                                <button className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                                            <input type="text" defaultValue="Dr. Arshad" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500/50 outline-none transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                            <input type="email" defaultValue="arshad@university.edu" disabled className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 2: AI CONFIGURATION */}
                            {activeTab === 'ai_preferences' && (
                                <motion.div key="ai" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-emerald-400" /> AI Grading Assistant</h2>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-white text-sm">AI Plagiarism Strictness</h4>
                                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-black rounded-lg border border-emerald-500/30">{strictness}%</span>
                                        </div>
                                        <div className="relative w-full h-2 bg-slate-950 rounded-full">
                                            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-red-500 rounded-full" style={{ width: `${strictness}%` }} />
                                            <input type="range" min="0" max="100" value={strictness} onChange={(e) => setStrictness(Number(e.target.value))} className="absolute top-0 w-full h-full opacity-0 cursor-pointer" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-white/5">
                                            <h4 className="text-white font-bold text-sm">Draft Automated Feedback</h4>
                                            <div onClick={() => setAiDrafting(!aiDrafting)} className={cn("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300", aiDrafting ? "bg-emerald-500" : "bg-slate-700")}>
                                                <div className={cn("w-4 h-4 rounded-full bg-white transition-transform duration-300", aiDrafting ? "translate-x-6" : "translate-x-0")} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 3: OFFICE HOURS (Interactive Scheduler) */}
                            {activeTab === 'schedule' && (
                                <motion.div key="schedule" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-bold text-white">Office Hours</h2>
                                            <p className="text-sm text-slate-400">Set your availability for student consultations.</p>
                                        </div>
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/10 transition-all">
                                            <Calendar className="w-4 h-4" /> Sync Calendar
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                                            <div key={day} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-white/5 text-slate-400 font-bold text-xs group-hover:text-emerald-400 transition-colors">
                                                        {day.substring(0, 3)}
                                                    </div>
                                                    <span className="font-bold text-sm text-white">{day}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <select className="bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-emerald-500/50">
                                                        <option>09:00 AM</option>
                                                        <option>10:00 AM</option>
                                                    </select>
                                                    <span className="text-slate-600 text-xs">to</span>
                                                    <select className="bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-emerald-500/50">
                                                        <option>05:00 PM</option>
                                                        <option>06:00 PM</option>
                                                    </select>
                                                    <div className="w-10 h-6 rounded-full p-1 bg-emerald-500 flex justify-end cursor-pointer ml-4">
                                                        <div className="w-4 h-4 rounded-full bg-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 4: SECURITY (Password & Devices) */}
                            {activeTab === 'security' && (
                                <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                    {/* Change Password Section */}
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-white flex items-center gap-2"><Lock className="w-5 h-5 text-blue-400" /> Change Password</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Password</label>
                                                <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-colors" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Password</label>
                                                <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-colors" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confirm Password</label>
                                                <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2FA Section */}
                                    <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-500/10 flex items-center justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Smartphone className="w-6 h-6" /></div>
                                            <div>
                                                <h4 className="text-white font-bold">Two-Factor Authentication</h4>
                                                <p className="text-xs text-slate-400 mt-1 max-w-sm">Protect your account with an extra layer of security via mobile authenticator app.</p>
                                            </div>
                                        </div>
                                        <div onClick={() => setTwoFactor(!twoFactor)} className={cn("w-14 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300", twoFactor ? "bg-emerald-500" : "bg-slate-700")}>
                                            <div className={cn("w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md", twoFactor ? "translate-x-7" : "translate-x-0")} />
                                        </div>
                                    </div>

                                    {/* Recent Devices */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Active Sessions</h3>
                                        <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
                                            {[
                                                { device: 'MacBook Pro 16"', location: 'Karachi, PK', status: 'Current Session', icon: Globe },
                                                { device: 'iPhone 15 Pro', location: 'Karachi, PK', status: '2 hours ago', icon: Smartphone }
                                            ].map((dev, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <dev.icon className="w-5 h-5 text-slate-500" />
                                                        <div>
                                                            <p className="text-sm font-bold text-white">{dev.device}</p>
                                                            <p className="text-[10px] text-slate-500 font-medium">{dev.location} • {dev.status}</p>
                                                        </div>
                                                    </div>
                                                    <button className="text-xs font-bold text-red-400/60 hover:text-red-400 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>

                        {/* Global Save Button */}
                        {['profile', 'ai_preferences', 'schedule', 'security'].includes(activeTab) && (
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}