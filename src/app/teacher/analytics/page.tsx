"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
    Filter, Download, Calendar, ArrowUpRight,
    Target, AlertTriangle, BookOpen, Layers,
    TrendingUp, Activity, Search,
    Coffee, Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- DEEP ANALYTICS MOCK DATA ---
const topicMastery = [
    { topic: 'Neural Network Architecture', mastery: 92, status: 'excellent' },
    { topic: 'Gradient Descent', mastery: 78, status: 'good' },
    { topic: 'Backpropagation Calculus', mastery: 45, status: 'critical' },
    { topic: 'Activation Functions', mastery: 85, status: 'good' },
    { topic: 'Overfitting & Regularization', mastery: 62, status: 'warning' },
];

const historicalTrend = [
    { label: 'Week 1', score: 65 }, { label: 'Week 2', score: 68 },
    { label: 'Week 3', score: 75 }, { label: 'Week 4', score: 72 },
    { label: 'Week 5', score: 82 }, { label: 'Week 6', score: 88 },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AnalyticsStudio() {
    const [selectedCourse, setSelectedCourse] = useState('CS-305 Machine Learning');
    const [dateRange, setDateRange] = useState('Last 30 Days');

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1500px] mx-auto"
        >
            {/* --- ADVANCED REPORTING HEADER --- */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                            <Activity className="w-3 h-3" /> Data Studio
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tighter">Cohort Analytics Report</h1>
                    <p className="text-slate-400 mt-1 text-sm">Granular performance metrics and behavioral trends for your classes.</p>
                </div>

                {/* Report Controls (Filters & Export) */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-slate-900 border border-white/10 rounded-xl flex items-center px-3 py-2">
                        <Layers className="w-4 h-4 text-slate-500 mr-2" />
                        <select
                            value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}
                            className="bg-transparent text-sm font-bold text-white focus:outline-none appearance-none cursor-pointer pr-4"
                        >
                            <option className="bg-slate-900 text-white">CS-305 Machine Learning</option>
                            <option className="bg-slate-900 text-white">CS-401 Adv. Math</option>
                            <option className="bg-slate-900 text-white">All Classes (Aggregated)</option>
                        </select>
                    </div>

                    <div className="bg-slate-900 border border-white/10 rounded-xl flex items-center px-3 py-2">
                        <Calendar className="w-4 h-4 text-slate-500 mr-2" />
                        <select
                            value={dateRange} onChange={(e) => setDateRange(e.target.value)}
                            className="bg-transparent text-sm font-bold text-white focus:outline-none appearance-none cursor-pointer pr-4"
                        >
                            <option className="bg-slate-900 text-white">Last 30 Days</option>
                            <option className="bg-slate-900 text-white">Midterm to Present</option>
                            <option className="bg-slate-900 text-white">Full Semester</option>
                        </select>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all shadow-lg shadow-emerald-500/20">
                        <Download className="w-4 h-4" /> Export PDF
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* --- LEFT COLUMN: Deep Visualizations --- */}
                <div className="lg:col-span-8 space-y-6">

                    {/* THE PERFORMANCE MATRIX */}
                    <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">Student Engagement Matrix</h2>
                                <p className="text-sm text-slate-400 mt-1">Classifying students based on grades vs. platform activity.</p>
                            </div>
                            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
                        </div>

                        <div className="relative mt-8 pl-8 pb-8">
                            {/* Y-Axis Label */}
                            <div className="absolute left-0 top-0 bottom-8 w-8 flex items-center justify-center">
                                <span className="-rotate-90 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">
                                    Academic Grade
                                </span>
                            </div>
                            {/* X-Axis Label */}
                            <div className="absolute left-8 right-0 bottom-0 h-8 flex items-center justify-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    Platform Engagement
                                </span>
                            </div>

                            {/* 2x2 Matrix Grid - FIX: Reduced height and padding for a sleeker look */}
                            <div className="grid grid-cols-2 grid-rows-2 gap-4 relative z-10">

                                {/* Top Left: Coasting */}
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 flex flex-col justify-between min-h-[115px] group hover:bg-blue-500/20 transition-colors relative overflow-hidden">
                                    <div className="absolute -right-1 -bottom-2 opacity-[0.07] group-hover:scale-110 transition-transform duration-500"><Coffee className="w-20 h-20 text-blue-500" /></div>
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2 relative z-10">
                                        <Coffee className="w-4 h-4" /> Coasting
                                    </span>
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-black text-white leading-none mt-1">12</h3>
                                        <p className="text-[10px] sm:text-xs text-slate-400 mt-1">High Grades, Low Activity</p>
                                    </div>
                                </div>

                                {/* Top Right: Top Performers */}
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 flex flex-col justify-between min-h-[115px] group hover:bg-emerald-500/20 transition-colors relative overflow-hidden">
                                    <div className="absolute -right-2 -bottom-2 opacity-[0.07] group-hover:scale-110 transition-transform duration-500"><Trophy className="w-20 h-20 text-emerald-500" /></div>
                                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 relative z-10">
                                        <Trophy className="w-4 h-4" /> Top Performers
                                    </span>
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-black text-white leading-none mt-1">28</h3>
                                        <p className="text-[10px] sm:text-xs text-slate-400 mt-1">High Grades, High Activity</p>
                                    </div>
                                </div>

                                {/* Bottom Left: At-Risk */}
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 flex flex-col justify-between min-h-[115px] group hover:bg-red-500/20 transition-colors relative overflow-hidden">
                                    <div className="absolute -right-2 -bottom-2 opacity-[0.07] group-hover:scale-110 transition-transform duration-500"><AlertTriangle className="w-20 h-20 text-red-500" /></div>
                                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-2 relative z-10">
                                        <AlertTriangle className="w-4 h-4" /> Critical Risk
                                    </span>
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-black text-white leading-none mt-1">4</h3>
                                        <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Low Grades, Low Activity</p>
                                    </div>
                                </div>

                                {/* Bottom Right: Struggling */}
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 flex flex-col justify-between min-h-[115px] group hover:bg-yellow-500/20 transition-colors relative overflow-hidden">
                                    <div className="absolute -right-2 -bottom-2 opacity-[0.07] group-hover:scale-110 transition-transform duration-500"><Activity className="w-20 h-20 text-yellow-500" /></div>
                                    <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-2 relative z-10">
                                        <Activity className="w-4 h-4" /> Struggling
                                    </span>
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-black text-white leading-none mt-1">8</h3>
                                        <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Low Grades, High Activity</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-sm text-slate-300"><strong className="text-emerald-400">AI Insight:</strong> 8 struggling students are highly engaged but failing. Review teaching materials for clarity.</p>
                            <button className="text-xs font-bold text-white bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-700">View List</button>
                        </div>
                    </motion.div>

                    {/* TREND ANALYSIS CHART */}
                    <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl flex flex-col">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">Historical Accuracy Trend</h2>

                        <div className="flex-1 relative mt-4 pt-4 h-[220px]">
                            {/* Graph Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 pb-8">
                                {[100, 80, 60, 40].map((line, i) => (
                                    <div key={i} className="w-full border-t border-dashed border-white/20 relative">
                                        <span className="absolute -top-2.5 -left-6 text-[9px] text-slate-400 font-bold">{line}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Data Points & Bars Wrapper */}
                            <div className="relative z-10 flex items-end justify-between w-full h-[160px] px-4 border-b border-white/20">
                                {historicalTrend.map((data, index) => (
                                    <div key={index} className="relative flex flex-col items-center justify-end h-full w-full group">
                                        {/* Hover Tooltip */}
                                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl transition-all z-20 pointer-events-none transform -translate-y-2 group-hover:-translate-y-0">
                                            {data.score}%
                                        </div>

                                        {/* Animated Bar */}
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${data.score}%` }}
                                            transition={{ duration: 1.2, delay: index * 0.1, type: "spring", stiffness: 50 }}
                                            className={cn(
                                                "w-full max-w-[32px] rounded-t-lg transition-colors duration-300",
                                                index === historicalTrend.length - 1
                                                    ? "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                                    : "bg-slate-700 group-hover:bg-blue-500"
                                            )}
                                        >
                                            <div className="w-full h-full bg-gradient-to-b from-white/20 to-transparent rounded-t-lg" />
                                        </motion.div>

                                        {/* X-Axis Label */}
                                        <span className="absolute -bottom-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                                            {data.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* --- RIGHT COLUMN: Granular Breakdowns --- */}
                <div className="lg:col-span-4 space-y-6">

                    <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl flex flex-col h-full">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">Module Mastery</h2>
                        <p className="text-xs text-slate-400 mb-6">Class success rate per specific syllabus topic.</p>

                        <div className="space-y-6 flex-1">
                            {topicMastery.map((topic, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-bold text-slate-200 max-w-[180px] leading-tight">{topic.topic}</span>
                                        <span className={cn(
                                            "text-sm font-black",
                                            topic.status === 'excellent' ? "text-emerald-400" :
                                                topic.status === 'good' ? "text-blue-400" :
                                                    topic.status === 'warning' ? "text-yellow-400" : "text-red-400"
                                        )}>{topic.mastery}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${topic.mastery}%` }} transition={{ duration: 1, delay: i * 0.15 }}
                                            className={cn(
                                                "h-full rounded-full",
                                                topic.status === 'excellent' ? "bg-emerald-500" :
                                                    topic.status === 'good' ? "bg-blue-500" :
                                                        topic.status === 'warning' ? "bg-yellow-500" : "bg-red-500"
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all flex items-center justify-center gap-2">
                            Generate Remedial Quiz <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </motion.div>

                </div>
            </div>
        </motion.div>
    );
}