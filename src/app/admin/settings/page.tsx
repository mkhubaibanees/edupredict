"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    Building2, BrainCircuit, ShieldAlert, CreditCard,
    Save, Globe, Key, Lock, Fingerprint,
    Database, Zap, ArrowUpRight, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Explicitly defining Framer Motion variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState<'institution' | 'ai' | 'security' | 'billing'>('institution');

    // Interactive UI States for toggles
    const [autoGrade, setAutoGrade] = useState(true);
    const [strictMode, setStrictMode] = useState(false);
    const [force2FA, setForce2FA] = useState(true);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1200px] mx-auto"
        >
            {/* Page Header */}
            <motion.div variants={itemVariants} className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tighter">Platform Configuration</h1>
                    <p className="text-slate-400 mt-1 text-sm">Global settings, AI parameters, and subscription management.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-sm font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 w-fit">
                    <Save className="w-4 h-4" /> Save Configuration
                </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* --- LEFT SIDEBAR NAVIGATION --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-3 space-y-2">
                    {[
                        { id: 'institution', icon: Building2, label: 'Institution Profile', desc: 'Branding & defaults' },
                        { id: 'ai', icon: BrainCircuit, label: 'AI Engine Config', desc: 'Models & threshold' },
                        { id: 'security', icon: ShieldAlert, label: 'Global Security', desc: 'Access & policies' },
                        { id: 'billing', icon: CreditCard, label: 'SaaS Billing', desc: 'Plan & token usage' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "w-full text-left p-4 rounded-2xl transition-all flex items-start gap-4 border",
                                activeTab === tab.id
                                    ? "bg-blue-600/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.05)]"
                                    : "bg-transparent border-transparent hover:bg-white/5"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-colors shrink-0",
                                activeTab === tab.id ? "bg-blue-500/20 text-blue-400" : "bg-slate-800 text-slate-400"
                            )}>
                                <tab.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className={cn("font-bold text-sm", activeTab === tab.id ? "text-blue-400" : "text-slate-200")}>{tab.label}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{tab.desc}</p>
                            </div>
                        </button>
                    ))}
                </motion.div>

                {/* --- RIGHT CONTENT AREA --- */}
                <motion.div variants={itemVariants} className="md:col-span-8 lg:col-span-9">
                    <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl min-h-[600px]">
                        <AnimatePresence mode="wait">

                            {/* TAB 1: INSTITUTION PROFILE */}
                            {activeTab === 'institution' && (
                                <motion.div key="institution" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Institution Profile</h2>

                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center font-black text-2xl text-slate-500 shadow-inner">
                                            AIA {/* Acme International Academy */}
                                        </div>
                                        <div>
                                            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white hover:bg-white/10 transition-colors mb-2">Upload New Logo</button>
                                            <p className="text-[10px] text-slate-500">Recommended size: 256x256px. PNG or SVG.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Institution Name</label>
                                            <input type="text" defaultValue="Acme International Academy" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Domain</label>
                                            <div className="flex items-center bg-slate-950 border border-white/10 rounded-xl focus-within:border-blue-500/50 transition-colors overflow-hidden">
                                                <span className="px-4 text-slate-500 border-r border-white/10 text-sm bg-slate-900"><Globe className="w-4 h-4" /></span>
                                                <input type="text" defaultValue="portal.acme-academy.edu" className="w-full bg-transparent px-4 py-3 text-white outline-none text-sm" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Academic Year</label>
                                            <select className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 appearance-none">
                                                <option>Spring 2026</option>
                                                <option>Fall 2025</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 2: AI ENGINE CONFIG (Premium SaaS Feature) */}
                            {activeTab === 'ai' && (
                                <motion.div key="ai" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <h2 className="text-xl font-bold text-white flex items-center gap-2"><Zap className="w-5 h-5 text-blue-400" /> AI Engine Configuration</h2>
                                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black tracking-widest uppercase rounded border border-emerald-500/20">System Online</span>
                                    </div>

                                    {/* Model Selection */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Primary Language Model</label>
                                        <select className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 appearance-none">
                                            <option>Gemini 1.5 Pro (Recommended)</option>
                                            <option>GPT-4o (High Latency)</option>
                                            <option>EduPredict Custom Local Model</option>
                                        </select>
                                        <p className="text-[10px] text-slate-500 mt-1">Select the engine used for grading and risk prediction.</p>
                                    </div>

                                    {/* API Key */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Provider API Key</label>
                                        <div className="flex items-center bg-slate-950 border border-white/10 rounded-xl focus-within:border-blue-500/50 transition-colors overflow-hidden">
                                            <span className="px-4 text-slate-500 border-r border-white/10 text-sm bg-slate-900"><Key className="w-4 h-4" /></span>
                                            <input type="password" defaultValue="sk-proj-xxxxxxxxxxxxxxxxxxxx" className="w-full bg-transparent px-4 py-3 text-white outline-none text-sm tracking-widest" />
                                        </div>
                                    </div>

                                    {/* Feature Toggles */}
                                    <div className="pt-4 space-y-4">
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-white/5">
                                            <div>
                                                <h4 className="text-white font-bold text-sm">Automated Essay Grading</h4>
                                                <p className="text-xs text-slate-400 mt-0.5">Allow AI to assign preliminary grades to long-form text.</p>
                                            </div>
                                            <div onClick={() => setAutoGrade(!autoGrade)} className={cn("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300", autoGrade ? "bg-blue-600" : "bg-slate-700")}>
                                                <div className={cn("w-4 h-4 rounded-full bg-white transition-transform duration-300", autoGrade ? "translate-x-6" : "translate-x-0")} />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-white/5">
                                            <div>
                                                <h4 className="text-white font-bold text-sm">Strict Plagiarism Enforcement</h4>
                                                <p className="text-xs text-slate-400 mt-0.5">Flag submissions with &gt;15% AI-generated content automatically.</p>
                                            </div>
                                            <div onClick={() => setStrictMode(!strictMode)} className={cn("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300", strictMode ? "bg-blue-600" : "bg-slate-700")}>
                                                <div className={cn("w-4 h-4 rounded-full bg-white transition-transform duration-300", strictMode ? "translate-x-6" : "translate-x-0")} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 3: SECURITY */}
                            {activeTab === 'security' && (
                                <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-blue-400" /> Security Policies
                                    </h2>

                                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Fingerprint className="w-6 h-6" /></div>
                                            <div>
                                                <h4 className="text-white font-bold">Enforce 2FA for Staff</h4>
                                                <p className="text-xs text-slate-400 mt-1 max-w-sm">Require all Admins and Teachers to use Two-Factor Authentication.</p>
                                            </div>
                                        </div>
                                        <div onClick={() => setForce2FA(!force2FA)} className={cn("w-14 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300", force2FA ? "bg-blue-600" : "bg-slate-700")}>
                                            <div className={cn("w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md", force2FA ? "translate-x-7" : "translate-x-0")} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Session Timeout</label>
                                            <select className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 appearance-none">
                                                <option>30 Minutes (Strict)</option>
                                                <option>1 Hour</option>
                                                <option>4 Hours</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data Backup Frequency</label>
                                            <select className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 appearance-none">
                                                <option>Daily (Midnight)</option>
                                                <option>Weekly</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 4: BILLING & SUBSCRIPTION */}
                            {activeTab === 'billing' && (
                                <motion.div key="billing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Subscription Plan</h2>

                                    {/* Current Plan Card */}
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 relative overflow-hidden">
                                        {/* Decorative Background */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

                                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="px-3 py-1 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded shadow-lg">Enterprise</span>
                                                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>
                                                </div>
                                                <h3 className="text-3xl font-black text-white mt-4">$499 <span className="text-base text-slate-400 font-medium">/ month</span></h3>
                                                <p className="text-sm text-slate-400 mt-2">Billed annually. Next cycle: Jan 01, 2027</p>
                                            </div>

                                            <button className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-bold transition-all flex items-center gap-2">
                                                Manage Billing <ArrowUpRight className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Token Usage Bar */}
                                        <div className="mt-10 pt-6 border-t border-white/10 relative z-10">
                                            <div className="flex justify-between items-end mb-3">
                                                <div>
                                                    <h4 className="text-sm font-bold text-white flex items-center gap-2"><Database className="w-4 h-4 text-blue-400" /> AI API Quota</h4>
                                                    <p className="text-xs text-slate-400 mt-0.5">2.4M / 5.0M tokens used this billing cycle</p>
                                                </div>
                                                <span className="text-sm font-black text-white">48%</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: '48%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}