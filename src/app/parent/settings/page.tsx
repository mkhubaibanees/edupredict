"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    User, Shield, BellRing, BrainCircuit,
    Save, Smartphone, Globe, Trash2, Lock,
    Mail, MessageSquare, AlertTriangle, Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ParentSettingsPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');

    // Interactive States
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [smsAlerts, setSmsAlerts] = useState(false);
    const [aiThreshold, setAiThreshold] = useState(60); // AI Alert Sensitivity
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
                <h1 className="text-3xl font-extrabold text-white tracking-tighter">Account Preferences</h1>
                <p className="text-slate-400 mt-1 text-sm">Manage your profile, notification rules, and security.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* --- LEFT SIDEBAR NAVIGATION --- */}
                <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-3 space-y-2">
                    {[
                        { id: 'profile', icon: User, label: 'My Profile', desc: 'Personal details & linked kids' },
                        { id: 'notifications', icon: BellRing, label: 'Smart Alerts', desc: 'AI thresholds & channels' },
                        { id: 'security', icon: Shield, label: 'Security', desc: 'Passwords & sessions' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "w-full text-left p-4 rounded-2xl transition-all flex items-start gap-4 border",
                                activeTab === tab.id
                                    ? "bg-indigo-600/10 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.05)]"
                                    : "bg-transparent border-transparent hover:bg-white/5"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-colors shrink-0",
                                activeTab === tab.id ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-800 text-slate-400"
                            )}>
                                <tab.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className={cn("font-bold text-sm", activeTab === tab.id ? "text-indigo-400" : "text-slate-200")}>{tab.label}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{tab.desc}</p>
                            </div>
                        </button>
                    ))}
                </motion.div>

                {/* --- RIGHT CONTENT AREA --- */}
                <motion.div variants={itemVariants} className="md:col-span-8 lg:col-span-9">
                    <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl min-h-[550px]">
                        <AnimatePresence mode="wait">

                            {/* TAB 1: PROFILE & LINKED STUDENTS */}
                            {activeTab === 'profile' && (
                                <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h2 className="text-xl font-bold text-white">Guardian Details</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                                            <input type="text" defaultValue="Mr. Raza" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                                            <input type="tel" defaultValue="+92 300 1234567" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-colors" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                            <input type="email" defaultValue="raza.parent@example.com" disabled className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed" />
                                        </div>
                                    </div>

                                    {/* Linked Students Section */}
                                    <div className="pt-6 border-t border-white/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2"><LinkIcon className="w-4 h-4 text-indigo-400" /> Linked Children</h3>
                                            <button className="text-xs font-bold text-indigo-400 hover:text-white transition-colors">Request Link Code</button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                { name: 'Ali Raza', id: 'STD-003', grade: '10th Grade' },
                                                { name: 'Ayesha Raza', id: 'STD-012', grade: '8th Grade' }
                                            ].map((child, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black border border-indigo-500/30">
                                                        {child.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-white">{child.name}</h4>
                                                        <p className="text-xs text-slate-500">{child.grade} • {child.id}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 2: SMART ALERTS & NOTIFICATIONS */}
                            {activeTab === 'notifications' && (
                                <motion.div key="notifications" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2"><BellRing className="w-5 h-5 text-indigo-400" /> Smart Notification Rules</h2>

                                    {/* AI Risk Threshold Slider */}
                                    <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-6">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-bold text-white text-sm flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-indigo-400" /> AI Alert Threshold</h4>
                                                <p className="text-xs text-slate-400 mt-1">Determine how strict the AI should be before triggering an urgent alert.</p>
                                            </div>
                                            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-black rounded-lg border border-indigo-500/30">{aiThreshold}% Risk</span>
                                        </div>

                                        <div className="relative w-full h-2 bg-slate-950 rounded-full">
                                            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full" style={{ width: `${aiThreshold}%` }} />
                                            <input type="range" min="0" max="100" value={aiThreshold} onChange={(e) => setAiThreshold(Number(e.target.value))} className="absolute top-0 w-full h-full opacity-0 cursor-pointer" />
                                            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] pointer-events-none transition-all" style={{ left: `calc(${aiThreshold}% - 8px)` }} />
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            <span>Inform Me Often</span>
                                            <span>Only Critical Issues</span>
                                        </div>
                                    </div>

                                    {/* Channel Toggles */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-white/5">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5"><Mail className="w-4 h-4" /></div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm">Weekly Email Reports</h4>
                                                    <p className="text-xs text-slate-400 mt-0.5">Receive a compiled summary of attendance and grades every Friday.</p>
                                                </div>
                                            </div>
                                            <div onClick={() => setEmailAlerts(!emailAlerts)} className={cn("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300", emailAlerts ? "bg-indigo-500" : "bg-slate-700")}>
                                                <div className={cn("w-4 h-4 rounded-full bg-white transition-transform duration-300", emailAlerts ? "translate-x-6" : "translate-x-0")} />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-white/5">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5"><MessageSquare className="w-4 h-4" /></div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm">Urgent SMS Alerts</h4>
                                                    <p className="text-xs text-slate-400 mt-0.5">Get instant text messages for disciplinary issues or unexcused absences.</p>
                                                </div>
                                            </div>
                                            <div onClick={() => setSmsAlerts(!smsAlerts)} className={cn("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300", smsAlerts ? "bg-indigo-500" : "bg-slate-700")}>
                                                <div className={cn("w-4 h-4 rounded-full bg-white transition-transform duration-300", smsAlerts ? "translate-x-6" : "translate-x-0")} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 3: SECURITY */}
                            {activeTab === 'security' && (
                                <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-white flex items-center gap-2"><Lock className="w-5 h-5 text-indigo-400" /> Change Password</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Password</label>
                                                <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-colors" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Password</label>
                                                <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-colors" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confirm Password</label>
                                                <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500/50 outline-none transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 flex items-center justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400"><Smartphone className="w-6 h-6" /></div>
                                            <div>
                                                <h4 className="text-white font-bold">Two-Factor Authentication</h4>
                                                <p className="text-xs text-slate-400 mt-1 max-w-sm">Protect your family's data with an extra layer of security.</p>
                                            </div>
                                        </div>
                                        <div onClick={() => setTwoFactor(!twoFactor)} className={cn("w-14 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300", twoFactor ? "bg-indigo-500" : "bg-slate-700")}>
                                            <div className={cn("w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md", twoFactor ? "translate-x-7" : "translate-x-0")} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>

                        {/* Global Save Button */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}