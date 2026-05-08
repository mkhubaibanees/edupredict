"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
    BrainCircuit, TrendingUp, TrendingDown, FileText,
    Download, ChevronDown, Activity, Award, CheckCircle2, AlertTriangle, BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- MOCK DATA ---
const childrenData = [
    { id: 'STD-003', name: 'Ali Raza', avatar: 'AR', grade: '10th Grade' },
    { id: 'STD-012', name: 'Ayesha Raza', avatar: 'AY', grade: '8th Grade' }
];

const subjectPerformance = [
    { name: 'Mathematics', code: 'MATH-201', grade: 'C+', score: 76, teacher: 'Prof. Sara Khan', status: 'warning', trend: 'down', aiInsight: 'Struggling with Calculus concepts. Missed 2 recent homework assignments. Recommend immediate review of Chapter 4.' },
    { name: 'Physics', code: 'PHY-101', grade: 'B-', score: 82, teacher: 'Dr. Usman Tariq', status: 'good', trend: 'stable', aiInsight: 'Steady performance. Needs improvement in practical lab reports, but theoretical understanding is solid.' },
    { name: 'English Literature', code: 'ENG-302', grade: 'A', score: 95, teacher: 'Ms. Ayesha Malik', status: 'excellent', trend: 'up', aiInsight: 'Exceptional analytical skills in recent essays. Consistently performing in the top 5% of the class.' },
    { name: 'Computer Science', code: 'CS-101', grade: 'B+', score: 88, teacher: 'Dr. Arshad Ali', status: 'good', trend: 'up', aiInsight: 'Great logic building. Successfully completed the neural network module ahead of schedule.' },
];

const performanceTrend = [
    { month: 'Sep', gpa: 3.2 }, { month: 'Oct', gpa: 3.1 },
    { month: 'Nov', gpa: 2.8 }, { month: 'Dec', gpa: 2.9 },
    { month: 'Jan', gpa: 3.1 }, { month: 'Feb', gpa: 3.4 },
];

// Explicitly defining Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AcademicProgressPage() {
    const [selectedChild, setSelectedChild] = useState(childrenData[0]);
    const [semester, setSemester] = useState('Spring 2026');

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1000px] mx-auto"
        >
            {/* --- HEADER (Clean & Minimal) --- */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tighter">Academic Record</h1>
                    <p className="text-slate-400 mt-1 text-sm">Official performance transcript and AI evaluation.</p>
                </div>

                {/* Selectors */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-slate-900 border border-white/10 rounded-xl flex items-center p-1">
                        {childrenData.map((child) => (
                            <button
                                key={child.id}
                                onClick={() => setSelectedChild(child)}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
                                    selectedChild.id === child.id
                                        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 shadow-lg"
                                        : "text-slate-400 hover:text-white"
                                )}
                            >
                                {child.name.split(' ')[0]}
                            </button>
                        ))}
                    </div>

                    <div className="bg-slate-900 border border-white/10 rounded-xl flex items-center px-3 py-2">
                        <select
                            value={semester} onChange={(e) => setSemester(e.target.value)}
                            className="bg-transparent text-sm font-bold text-white focus:outline-none appearance-none cursor-pointer pr-4"
                        >
                            <option className="bg-slate-900 text-white">Spring 2026</option>
                            <option className="bg-slate-900 text-white">Fall 2025</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
                        <Download className="w-4 h-4" /> PDF
                    </button>
                </div>
            </motion.div>

            {/* --- TRANSCRIPT BANNER (Replaces the 4 KPI Cards) --- */}
            <motion.div variants={itemVariants} className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-900/40 to-slate-900/60 backdrop-blur-xl overflow-hidden shadow-xl p-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-2xl font-black text-indigo-400 shadow-inner">
                            {selectedChild.avatar}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white">{selectedChild.name}</h2>
                            <p className="text-indigo-300 text-sm font-medium">{selectedChild.grade} • ID: {selectedChild.id}</p>
                            <div className="mt-3 flex items-center gap-4 text-sm text-slate-300">
                                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-yellow-500" /> Top 25% of Class</span>
                                <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-emerald-500" /> 14 Credits Completed</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end border-l border-white/10 pl-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Cumulative Term GPA</span>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-black text-white leading-none">3.4</span>
                            <span className="flex items-center gap-1 text-sm font-bold text-emerald-400 mb-1">
                                <TrendingUp className="w-4 h-4" /> +0.2
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* --- DETAILED SUBJECT REPORT (Linear Document Style) --- */}
            <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Subject Evaluations</h3>

                <div className="space-y-4">
                    {subjectPerformance.map((subject, index) => (
                        <div key={index} className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-sm overflow-hidden transition-colors hover:bg-slate-900/60">
                            {/* Top Row: Subject & Grade */}
                            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border",
                                        subject.status === 'excellent' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                                            subject.status === 'good' ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                                                "bg-red-500/10 border-red-500/20 text-red-400"
                                    )}>
                                        <span className="font-black text-lg">{subject.grade}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-white">{subject.name}</h4>
                                        <p className="text-xs text-slate-400">{subject.code} • Evaluator: {subject.teacher}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Score</span>
                                        <span className="text-sm font-black text-slate-200">{subject.score}/100</span>
                                    </div>
                                    <div className="h-8 w-px bg-white/10" />
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Trend</span>
                                        <span className="text-sm font-bold flex items-center justify-end gap-1 text-slate-300 capitalize">
                                            {subject.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> :
                                                subject.trend === 'down' ? <TrendingDown className="w-3.5 h-3.5 text-red-400" /> :
                                                    <Activity className="w-3.5 h-3.5 text-blue-400" />}
                                            {subject.trend}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row: AI Teacher Note */}
                            <div className="p-4 bg-slate-950/50 flex items-start gap-3 border-l-2 border-indigo-500 ml-5 mr-5 mb-5 mt-4 rounded-r-lg">
                                <BrainCircuit className={cn("w-4 h-4 shrink-0 mt-0.5", subject.status === 'warning' ? "text-red-400" : "text-indigo-400")} />
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">AI Teacher's Note</span>
                                    <p className="text-xs text-slate-300 leading-relaxed font-medium">{subject.aiInsight}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* --- WIDE TREND GRAPH --- */}
            <motion.div variants={itemVariants} className="pt-6 border-t border-white/10">
                <h3 className="text-lg font-bold text-white mb-6">Term Trajectory</h3>
                <div className="h-[140px] flex items-end justify-between relative">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 pb-6">
                        {[4.0, 3.0, 2.0, 1.0].map((line, i) => (
                            <div key={i} className="w-full border-t border-dashed border-white/20 relative">
                                <span className="absolute -top-2.5 -left-1 text-[9px] text-slate-400 font-bold">{line.toFixed(1)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Wide Bars */}
                    <div className="relative z-10 flex items-end justify-between w-full h-[120px] px-8 border-b border-white/20">
                        {performanceTrend.map((data, index) => {
                            const percentage = (data.gpa / 4.0) * 100;
                            return (
                                <div key={index} className="relative flex flex-col items-center justify-end h-full w-full max-w-[60px] group">
                                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded-md shadow-xl transition-all z-20 pointer-events-none">
                                        {data.gpa}
                                    </div>
                                    <motion.div
                                        initial={{ height: 0 }} animate={{ height: `${percentage}%` }} transition={{ duration: 1.2, delay: index * 0.1 }}
                                        className="w-full rounded-t-sm transition-colors duration-300 bg-indigo-500 group-hover:bg-indigo-400"
                                    />
                                    <span className="absolute -bottom-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{data.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

        </motion.div>
    );
}