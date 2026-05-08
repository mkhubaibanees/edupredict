"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Users, BookOpen, AlertTriangle, FileCheck, CheckCircle2, Clock, Sparkles, ChevronRight, BrainCircuit } from 'lucide-react';
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

export default function TeacherDashboard() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1400px] mx-auto"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tighter">
                        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Dr. Arshad!</span>
                    </h1>
                    <p className="text-slate-400 mt-1">Here is the AI overview of your classes for today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2 font-bold text-sm shadow-lg shadow-emerald-500/5">
                        <Sparkles className="w-4 h-4" />
                        AI Assistant Active
                    </div>
                </div>
            </motion.div>

            {/* Top Row: Quick Stats (Teacher Focus) */}
            {/* Top Row: Quick Stats (Teacher Focus) */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Total Students */}
                <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl relative overflow-hidden group shadow-xl">
                    <div className="absolute -right-2 -top-2 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                        <Users className="w-20 h-20 text-emerald-400" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/30">
                        <Users className="w-5 h-5" />
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Students</p>
                    <h3 className="text-3xl font-black text-white mt-1">342</h3>
                </div>

                {/* Pending Grades */}
                <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl relative overflow-hidden group shadow-xl">
                    <div className="absolute -right-2 -top-2 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                        <FileCheck className="w-20 h-20 text-blue-400" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
                        <FileCheck className="w-5 h-5" />
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">To Grade</p>
                    <div className="flex items-end gap-2 mt-1">
                        <h3 className="text-3xl font-black text-white">28</h3>
                        <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md mb-1">Items</span>
                    </div>
                </div>

                {/* At-Risk Alerts */}
                <div className="p-6 rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_20px_rgba(239,68,68,0.05)]">
                    <div className="absolute -right-2 -top-2 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                        <AlertTriangle className="w-20 h-20 text-red-400" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mb-4 border border-red-500/30">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Students At Risk</p>
                    <div className="flex items-end gap-2 mt-1">
                        <h3 className="text-3xl font-black text-red-400 animate-pulse">12</h3>
                        <span className="text-xs font-bold text-slate-400 mb-1">Require Attention</span>
                    </div>
                </div>

                {/* Average Performance */}
                <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl relative overflow-hidden group shadow-xl">
                    <div className="absolute -right-2 -top-2 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                        <BrainCircuit className="w-20 h-20 text-purple-400" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/30">
                        <BrainCircuit className="w-5 h-5" />
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Avg. Class Score</p>
                    <h3 className="text-3xl font-black text-white mt-1">B+</h3>
                </div>

            </motion.div>

            {/* Middle Section: AI Intervention & Schedule */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Side: AI Intervention List (Spans 2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                            <BrainCircuit className="w-6 h-6 text-red-400" /> AI Intervention Required
                        </h2>
                        <button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">View All</button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { name: 'Usman Tariq', issue: 'Missed 3 assignments, engagement dropped by 40%.', course: 'CS-401 Math', risk: 'Critical', action: 'Schedule Meeting' },
                            { name: 'Ali Raza', issue: 'Failing recent quizzes, AI predicts grade drop to C-.', course: 'CS-305 ML', risk: 'High', action: 'Send Resource' },
                        ].map((alert, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-red-500/20 bg-gradient-to-r from-slate-900/80 to-red-950/20 backdrop-blur-md shadow-lg group hover:border-red-500/40 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white shadow-inner">
                                        {alert.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white flex items-center gap-2">
                                            {alert.name}
                                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-bold border border-white/5 uppercase">{alert.course}</span>
                                        </h4>
                                        <p className="text-sm text-slate-400 mt-1 max-w-md">{alert.issue}</p>
                                    </div>
                                </div>
                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-white/5 sm:border-0">
                                    <span className="text-xs font-black text-red-400 uppercase tracking-widest flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" /> {alert.risk}
                                    </span>
                                    <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all w-full sm:w-auto">
                                        {alert.action}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Today's Classes */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Today's Schedule</h2>
                    <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl flex flex-col gap-6 h-full">
                        {[
                            { time: '09:00 AM', title: 'Advanced Mathematics', room: 'Room 302', active: true },
                            { time: '11:30 AM', title: 'Machine Learning Lab', room: 'Lab 4', active: false },
                            { time: '02:00 PM', title: 'Office Hours', room: 'Faculty Block', active: false },
                        ].map((cls, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div className={cn("w-3 h-3 rounded-full mt-1.5 border-2", cls.active ? "bg-emerald-400 border-emerald-400 ring-4 ring-emerald-400/20" : "bg-slate-700 border-slate-500")} />
                                    {i !== 2 && <div className="w-0.5 h-full bg-white/5 mt-2" />}
                                </div>
                                <div className={cn("flex-1 p-4 rounded-2xl border transition-all", cls.active ? "bg-emerald-500/10 border-emerald-500/20" : "bg-white/5 border-white/5 group-hover:bg-white/10")}>
                                    <p className={cn("text-xs font-bold mb-1", cls.active ? "text-emerald-400" : "text-slate-500")}>{cls.time}</p>
                                    <h4 className="font-bold text-white text-sm">{cls.title}</h4>
                                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {cls.room}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </motion.div>

            {/* Bottom Section: Recent Submissions / Needs Grading */}
            <motion.div variants={itemVariants} className="space-y-6 pt-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">Recent Submissions (Needs Grading)</h2>
                <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-6 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">Assignment</th>
                                    <th className="px-6 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">Course</th>
                                    <th className="px-6 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">Submitted By</th>
                                    <th className="px-6 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">AI Similarity Check</th>
                                    <th className="px-6 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { title: 'Calculus Midterm Paper', course: 'CS-401', student: 'Sara Khan', similarity: '4% (Original)', simColor: 'text-emerald-400' },
                                    { title: 'Neural Networks Lab', course: 'CS-305', student: 'Ali Raza', similarity: '89% (High Match)', simColor: 'text-red-400' },
                                    { title: 'Database Schema Design', course: 'SE-210', student: 'Khubaib Anees', similarity: '12% (Original)', simColor: 'text-emerald-400' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-5 font-bold text-white text-sm">{row.title}</td>
                                        <td className="px-6 py-5"><span className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-bold border border-white/5">{row.course}</span></td>
                                        <td className="px-6 py-5 text-slate-300 text-sm font-medium">{row.student}</td>
                                        <td className="px-6 py-5 font-bold text-xs"><span className={row.simColor}>{row.similarity}</span></td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="flex items-center justify-center ml-auto gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 hover:border-blue-500 font-bold transition-all text-xs">
                                                Grade Now <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>

        </motion.div>
    );
}