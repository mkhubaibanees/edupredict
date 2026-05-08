"use client";

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
    BrainCircuit, ShieldAlert, CheckCircle2, TrendingUp, TrendingDown,
    CalendarDays, FileText, MessageSquare, Bell, ChevronRight, GraduationCap,
    Clock, Activity, AlertTriangle, BookOpen 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- MOCK DATA FOR PARENT'S CHILDREN ---
const childrenData = [
    {
        id: 'STD-003',
        name: 'Ali Raza',
        grade: '10th Grade - Science',
        avatar: 'AR',
        aiStatus: 'high_risk',
        aiMessage: 'Ali is showing a 15% drop in engagement in Mathematics. Immediate attention recommended.',
        attendance: 78,
        avgScore: 'C+',
        predictedScore: 'C-',
        theme: 'from-orange-500 to-red-600',
        iconColor: 'text-red-400',
        bgColor: 'bg-red-500/10',
        recentActivity: [
            { type: 'alert', title: 'Missed Assignment', desc: 'Calculus Quiz 3 was not submitted.', time: 'Yesterday' },
            { type: 'grade', title: 'Physics Lab Graded', desc: 'Scored 65/100 (Below Class Average)', time: '2 days ago' },
        ]
    },
    {
        id: 'STD-012',
        name: 'Ayesha Raza',
        grade: '8th Grade - Arts',
        avatar: 'AY',
        aiStatus: 'safe',
        aiMessage: 'Ayesha is performing excellently. Her trajectory suggests a strong finish this semester.',
        attendance: 98,
        avgScore: 'A-',
        predictedScore: 'A',
        theme: 'from-indigo-500 to-violet-600',
        iconColor: 'text-indigo-400',
        bgColor: 'bg-indigo-500/10',
        recentActivity: [
            { type: 'success', title: 'Perfect Attendance', desc: 'Completed 4 weeks without any absence.', time: 'Today' },
            { type: 'grade', title: 'History Essay Graded', desc: 'Scored 92/100 (Top 5% of class)', time: 'Yesterday' },
        ]
    }
];

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ParentDashboard() {
    const [selectedChild, setSelectedChild] = useState(childrenData[0]);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1200px] mx-auto"
        >
            {/* --- HEADER & CHILD SELECTOR --- */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tighter">Parent Portal</h1>
                    <p className="text-slate-400 mt-1 text-sm">Monitor your child's academic progress and AI predictions.</p>
                </div>

                {/* Child Selector Tabs (Crucial for parents with multiple kids) */}
                <div className="flex items-center gap-3 bg-slate-900/60 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
                    {childrenData.map((child) => (
                        <button
                            key={child.id}
                            onClick={() => setSelectedChild(child)}
                            className={cn(
                                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                                selectedChild.id === child.id
                                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 shadow-lg"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white border border-white/10">
                                {child.avatar}
                            </div>
                            {child.name.split(' ')[0]}
                        </button>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedChild.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                >
                    {/* --- AI HEALTH OVERVIEW CARD --- */}
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
                        {/* Dynamic Background Glow based on Child Status */}
                        <div className={cn("absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none", selectedChild.bgColor)} />

                        <div className="p-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                            {/* Child Identity */}
                            <div className="md:col-span-5 flex items-center gap-6">
                                <div className={cn("w-24 h-24 rounded-full bg-gradient-to-br flex items-center justify-center text-3xl font-black text-white shadow-xl border-4 border-slate-900", selectedChild.theme)}>
                                    {selectedChild.avatar}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tight">{selectedChild.name}</h2>
                                    <p className="text-sm font-medium text-slate-400 mt-1 flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4" /> {selectedChild.grade}
                                    </p>
                                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                                        ID: {selectedChild.id}
                                    </div>
                                </div>
                            </div>

                            {/* AI Assessment Message */}
                            <div className="md:col-span-7 bg-slate-950/50 rounded-2xl p-6 border border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className={cn("p-3 rounded-xl mt-1", selectedChild.bgColor, selectedChild.iconColor)}>
                                        {selectedChild.aiStatus === 'high_risk' ? <AlertTriangle className="w-6 h-6" /> : <BrainCircuit className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            EduPredict AI Assessment
                                            {selectedChild.aiStatus === 'safe' && <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400">On Track</span>}
                                            {selectedChild.aiStatus === 'high_risk' && <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 animate-pulse">Needs Attention</span>}
                                        </h3>
                                        <p className="text-sm text-slate-400 leading-relaxed mt-2">{selectedChild.aiMessage}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Stats Ribbon */}
                        <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5 bg-slate-900/50">
                            <div className="p-6 flex flex-col items-center justify-center text-center group">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Activity className="w-3 h-3" /> Attendance</span>
                                <span className="text-3xl font-black text-white">{selectedChild.attendance}%</span>
                            </div>
                            <div className="p-6 flex flex-col items-center justify-center text-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><FileText className="w-3 h-3" /> Current Grade</span>
                                <span className="text-3xl font-black text-white">{selectedChild.avgScore}</span>
                            </div>
                            <div className="p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-indigo-500/5" />
                                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-1 relative z-10"><TrendingUp className="w-3 h-3" /> AI Predicted Final</span>
                                <span className={cn("text-3xl font-black relative z-10", selectedChild.aiStatus === 'high_risk' ? "text-red-400" : "text-emerald-400")}>
                                    {selectedChild.predictedScore}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* --- TWO COLUMN LAYOUT: Activity & Actions --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Left Column: Recent Activity Feed */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 md:p-8 shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">Recent Activity</h2>
                                <button className="text-xs font-bold text-indigo-400 hover:text-white transition-colors">View All</button>
                            </div>

                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                                {selectedChild.recentActivity.map((activity, i) => (
                                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        {/* Timeline Marker */}
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            {activity.type === 'alert' ? <ShieldAlert className="w-4 h-4 text-red-400" /> :
                                                activity.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
                                                    <FileText className="w-4 h-4 text-indigo-400" />}
                                        </div>

                                        {/* Content Card */}
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-white/5 bg-slate-950/50 group-hover:border-white/10 transition-colors">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-bold text-sm text-white">{activity.title}</h4>
                                                <span className="text-[10px] text-slate-500 font-medium">{activity.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-400">{activity.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Upcoming & Communication */}
                        <div className="space-y-8">

                            {/* Communication Quick Action */}
                            <div className="p-6 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-xl shadow-xl flex items-center justify-between group cursor-pointer hover:bg-indigo-500/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Message Teachers</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">Reach out to {selectedChild.name}'s faculty.</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                            </div>

                            {/* Upcoming Deadlines */}
                            <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">Upcoming Deadlines</h2>

                                <div className="space-y-4">
                                    {[
                                        { subject: 'Mathematics', task: 'Chapter 4 Assignment', date: 'Tomorrow, 11:59 PM', icon: BookOpen },
                                        { subject: 'Science', task: 'Lab Report Submission', date: 'Friday, 08:00 AM', icon: Activity },
                                    ].map((task, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                                            <div className="p-3 bg-slate-950 rounded-xl h-fit border border-white/5 text-slate-400">
                                                <CalendarDays className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-white">{task.task}</h4>
                                                <p className="text-xs text-slate-500 mt-1">{task.subject}</p>
                                                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-950 w-fit px-2 py-1 rounded-md border border-white/5">
                                                    <Clock className="w-3 h-3 text-indigo-400" /> {task.date}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}