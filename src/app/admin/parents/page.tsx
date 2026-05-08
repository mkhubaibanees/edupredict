"use client";

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Plus, MoreVertical, Mail,
    Phone, Link as LinkIcon, ShieldCheck,
    Users, BellRing, Smartphone, AlertTriangle, MessageSquare,
    X, Calendar, Activity, CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- PREMIUM MOCK DATA FOR PARENTS ---
const parentsData = [
    {
        id: 'PRN-1042', name: 'Mr. Tariq Raza', email: 'tariq.raza@example.com', phone: '+92 300 1234567',
        status: 'active', engagement: 'High', alertsEnabled: true, joinDate: 'Aug 15, 2025',
        linkedChildren: [
            { id: 'STD-003', name: 'Ali Raza', grade: '10th Grade', avatar: 'AR', color: 'from-blue-500 to-indigo-500', risk: 'Low' },
            { id: 'STD-012', name: 'Ayesha Raza', grade: '8th Grade', avatar: 'AY', color: 'from-purple-500 to-pink-500', risk: 'Safe' }
        ],
        recentActivity: [
            { action: 'Read AI Progress Report for Ali', time: '2 hours ago' },
            { action: 'Updated contact phone number', time: '3 days ago' }
        ]
    },
    {
        id: 'PRN-1088', name: 'Mrs. Fatima Noor', email: 'fatima.n@example.com', phone: '+92 333 9876543',
        status: 'active', engagement: 'Medium', alertsEnabled: true, joinDate: 'Sep 01, 2025',
        linkedChildren: [
            { id: 'STD-045', name: 'Zainab Noor', grade: '12th Grade', avatar: 'ZN', color: 'from-emerald-500 to-teal-500', risk: 'High' }
        ],
        recentActivity: [
            { action: 'Received SMS Alert for Missed Class', time: 'Yesterday' }
        ]
    },
    {
        id: 'PRN-1102', name: 'Mr. Kamran Ahmed', email: 'kamran.ahmed@example.com', phone: '+92 321 5556667',
        status: 'pending_link', engagement: 'Low', alertsEnabled: false, joinDate: 'Jan 10, 2026',
        linkedChildren: [],
        recentActivity: [
            { action: 'Account created via Email Invite', time: 'Jan 10, 2026' }
        ]
    },
    {
        id: 'PRN-1105', name: 'Dr. Sara Ali', email: 'sara.ali@hospital.com', phone: '+92 301 2223334',
        status: 'active', engagement: 'High', alertsEnabled: true, joinDate: 'Feb 20, 2026',
        linkedChildren: [
            { id: 'STD-089', name: 'Omar Ali', grade: '9th Grade', avatar: 'OA', color: 'from-orange-500 to-red-500', risk: 'Safe' }
        ],
        recentActivity: [
            { action: 'Paid Spring Semester Fee', time: '1 week ago' },
            { action: 'Messaged Prof. Usman', time: '2 weeks ago' }
        ]
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function AdminParentsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // State for the Side Panel
    const [selectedParent, setSelectedParent] = useState<typeof parentsData[0] | null>(null);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1400px] mx-auto relative"
        >
            {/* --- PAGE HEADER & ACTIONS --- */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tighter flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-400" /> Guardian Directory
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">Manage parent accounts, linked students, and communication channels.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 text-sm">
                        <Plus className="w-4 h-4" /> Invite Parent
                    </button>
                </div>
            </motion.div>

            {/* --- QUICK STATS ROW --- */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'Total Registered', value: '842', icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { title: 'Fully Linked profiles', value: '795', icon: LinkIcon, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { title: 'Pending Links', value: '47', icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                    { title: 'Active AI Alerts', value: '92%', icon: BellRing, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                ].map((stat, i) => (
                    <div key={i} className="p-5 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl flex items-center gap-4 hover:bg-slate-900/80 transition-colors">
                        <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.title}</p>
                            <h3 className="text-2xl font-black text-white leading-none mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* --- FILTER & SEARCH BAR --- */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-lg">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by parent name, email, or student ID..."
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <select className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer">
                        <option>All Statuses</option>
                        <option>Active</option>
                        <option>Pending Link</option>
                    </select>
                    <button className="flex items-center justify-center p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>

            {/* --- RICH DIRECTORY LIST --- */}
            <motion.div variants={itemVariants} className="space-y-4">
                {parentsData.map((parent) => (
                    <div
                        key={parent.id}
                        onClick={() => setSelectedParent(parent)}
                        className="relative group rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center p-6 gap-6">

                            {/* 1. Parent Identity */}
                            <div className="flex items-center gap-5 lg:w-[30%]">
                                <div className={cn(
                                    "w-14 h-14 rounded-full flex items-center justify-center text-xl font-black shadow-inner border border-white/10 shrink-0 transition-transform group-hover:scale-105",
                                    parent.status === 'active' ? "bg-slate-800 text-white" : "bg-slate-800/50 text-slate-500 border-dashed"
                                )}>
                                    {parent.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        {parent.name}
                                        {parent.status === 'active' && <ShieldCheck className="w-4 h-4 text-blue-400" />}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{parent.id}</span>
                                        <span className={cn(
                                            "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest",
                                            parent.status === 'active' ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"
                                        )}>
                                            {parent.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Contact Info */}
                            <div className="flex flex-col gap-2 lg:w-[25%] lg:border-l lg:border-white/10 lg:pl-6">
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Mail className="w-4 h-4 text-slate-500" /> {parent.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Phone className="w-4 h-4 text-slate-500" /> {parent.phone}
                                </div>
                            </div>

                            {/* 3. Linked Children */}
                            <div className="flex-1 lg:border-l lg:border-white/10 lg:pl-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-3">Linked Students</span>
                                {parent.linkedChildren.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {parent.linkedChildren.map((child, idx) => (
                                            <div key={idx} className="flex items-center gap-2 bg-slate-950 border border-white/5 pr-3 rounded-full hover:border-white/20 transition-colors">
                                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-inner bg-gradient-to-br", child.color)}>
                                                    {child.avatar}
                                                </div>
                                                <div className="py-1">
                                                    <p className="text-xs font-bold text-white leading-none">{child.name}</p>
                                                    <p className="text-[9px] text-slate-500 mt-0.5">{child.id}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit text-blue-400 text-xs font-bold">
                                        <LinkIcon className="w-3.5 h-3.5" /> Pending Link
                                    </div>
                                )}
                            </div>

                            {/* 4. Action Indicator */}
                            <div className="hidden lg:flex items-center gap-2 shrink-0 lg:border-l lg:border-white/10 lg:pl-6 text-slate-500 group-hover:text-blue-400 transition-colors text-xs font-bold uppercase tracking-widest">
                                View Profile
                            </div>

                        </div>
                    </div>
                ))}
            </motion.div>

            {/* --- SLIDE-OVER DRAWER (MODAL) --- */}
            <AnimatePresence>
                {selectedParent && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedParent(null)}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
                        />

                        {/* Right Side Drawer */}
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-white/10 z-50 flex flex-col shadow-2xl"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-950/50">
                                <h2 className="text-lg font-bold text-white">Parent Dossier</h2>
                                <button onClick={() => setSelectedParent(null)} className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Drawer Content (Scrollable) */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-8 [&::-webkit-scrollbar]:hidden">

                                {/* Profile Header */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-3xl bg-slate-800 border-2 border-white/10 flex items-center justify-center text-3xl font-black text-white shadow-xl mb-4">
                                        {selectedParent.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
                                        {selectedParent.name} {selectedParent.status === 'active' && <ShieldCheck className="w-5 h-5 text-blue-400" />}
                                    </h2>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">{selectedParent.id}</p>

                                    <div className="flex gap-2 mt-4">
                                        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4" /> Direct Message
                                        </button>
                                        <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Info Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5">
                                        <Mail className="w-4 h-4 text-slate-500 mb-2" />
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</p>
                                        <p className="text-xs font-medium text-slate-300 mt-0.5 truncate">{selectedParent.email}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5">
                                        <Phone className="w-4 h-4 text-slate-500 mb-2" />
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone</p>
                                        <p className="text-xs font-medium text-slate-300 mt-0.5">{selectedParent.phone}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5">
                                        <Calendar className="w-4 h-4 text-slate-500 mb-2" />
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Joined</p>
                                        <p className="text-xs font-medium text-slate-300 mt-0.5">{selectedParent.joinDate}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5">
                                        <CreditCard className="w-4 h-4 text-slate-500 mb-2" />
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Billing</p>
                                        <p className="text-xs font-bold text-emerald-400 mt-0.5">Up to date</p>
                                    </div>
                                </div>

                                {/* Students Section */}
                                <div>
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <LinkIcon className="w-4 h-4" /> Managed Students
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedParent.linkedChildren.length > 0 ? (
                                            selectedParent.linkedChildren.map((child, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl border border-white/5 bg-slate-950/30">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-inner bg-gradient-to-br", child.color)}>
                                                            {child.avatar}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-white">{child.name}</p>
                                                            <p className="text-[10px] text-slate-500">{child.grade} • {child.id}</p>
                                                        </div>
                                                    </div>
                                                    <div className={cn(
                                                        "px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border",
                                                        child.risk === 'Safe' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                                                            child.risk === 'Low' ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                                                    )}>
                                                        {child.risk} Risk
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                                                <p className="text-xs text-slate-400 mb-3">No students linked to this account yet.</p>
                                                <button className="text-xs font-bold text-blue-400 hover:text-white transition-colors">Send Link Code</button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Recent Activity Log */}
                                <div>
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Activity className="w-4 h-4" /> Activity Log
                                    </h3>
                                    <div className="space-y-4 border-l-2 border-white/10 ml-2 pl-4">
                                        {selectedParent.recentActivity.map((log, i) => (
                                            <div key={i} className="relative">
                                                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                                <p className="text-xs font-medium text-slate-300">{log.action}</p>
                                                <p className="text-[10px] text-slate-500 mt-1">{log.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </motion.div>
    );
}