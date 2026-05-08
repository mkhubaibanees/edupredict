"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { User, Bell, Lock, Shield, Camera, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');

    // State to manage notification toggles dynamically
    const [notifications, setNotifications] = useState([
        { id: 'email', title: 'Email Alerts', desc: 'Receive daily summary of tasks and AI tips.', active: true },
        { id: 'push', title: 'Push Notifications', desc: 'Get instant alerts for grade updates.', active: false },
        { id: 'ai', title: 'AI Study Reminders', desc: 'Let AI remind you to study based on schedule.', active: true },
    ]);

    // Function to handle the toggle click
    const handleToggle = (id: string) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, active: !notif.active } : notif
            )
        );
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1200px] mx-auto"
        >
            {/* Header */}
            <motion.div variants={itemVariants}>
                <h1 className="text-4xl font-extrabold text-white tracking-tighter">Settings</h1>
                <p className="text-slate-400 mt-1">Manage your account preferences and profile details.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Sidebar Navigation */}
                <div className="space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-left",
                            activeTab === 'profile' ? "bg-blue-600/20 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <User className="w-4 h-4" /> Profile Details
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-left",
                            activeTab === 'notifications' ? "bg-blue-600/20 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <Bell className="w-4 h-4" /> Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-left",
                            activeTab === 'security' ? "bg-blue-600/20 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <Lock className="w-4 h-4" /> Security
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-3 p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl min-h-[500px]">

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                            <h2 className="text-xl font-bold text-white mb-6">Public Profile</h2>

                            {/* Avatar Upload */}
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black border-4 border-slate-900 shadow-xl">
                                        KA
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-2 bg-slate-800 border border-white/10 rounded-full hover:bg-slate-700 transition-colors">
                                        <Camera className="w-4 h-4 text-slate-300" />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">Profile Picture</h3>
                                    <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB.</p>
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                                    <input type="text" defaultValue="Khubaib" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                                    <input type="text" defaultValue="Anees" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                    <input type="email" defaultValue="khubaib.anees@student.edu" disabled className="w-full bg-slate-950/20 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed" />
                                    <p className="text-[10px] text-slate-500">Email cannot be changed.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student ID</label>
                                    <input type="text" defaultValue="STD-2026-048" disabled className="w-full bg-slate-950/20 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed" />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex justify-end">
                                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold transition-all shadow-lg shadow-blue-500/20">
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                            <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                            <div className="space-y-6">
                                {notifications.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{item.title}</h4>
                                            <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                                        </div>
                                        {/* Custom Interactive Toggle Switch */}
                                        <div
                                            onClick={() => handleToggle(item.id)}
                                            className={cn("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300", item.active ? "bg-blue-500" : "bg-slate-700")}
                                        >
                                            <div className={cn("w-4 h-4 rounded-full bg-white transition-transform duration-300", item.active ? "translate-x-6" : "translate-x-0")} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="w-6 h-6 text-green-400" />
                                <h2 className="text-xl font-bold text-white">Security Settings</h2>
                            </div>

                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                Your account is secure. Last login was 2 hours ago from Karachi, Pakistan.
                            </div>

                            <div className="space-y-6 pt-4 border-t border-white/5">
                                <h3 className="text-white font-bold text-sm">Change Password</h3>
                                <div className="space-y-4 max-w-md">
                                    <input type="password" placeholder="Current Password" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50" />
                                    <input type="password" placeholder="New Password" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50" />
                                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all w-full md:w-auto">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </div>
            </motion.div>
        </motion.div>
    );
}