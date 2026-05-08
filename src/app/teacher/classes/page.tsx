"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
    Search, Filter, Plus, Users, BookOpen,
    AlertTriangle, ChevronRight, Sparkles, MoreVertical, Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for the teacher's assigned classes
const classesData = [
    {
        id: 'CS-305',
        name: 'Machine Learning Basics',
        schedule: 'Mon, Wed • 10:00 AM',
        room: 'Lab 4, Block B',
        students: 45,
        avgGrade: 'B+',
        attendance: 88,
        atRisk: 4,
        theme: 'from-emerald-500 to-teal-600',
        shadow: 'shadow-emerald-500/20',
        aiTip: 'High failure rate predicted for upcoming backpropagation quiz. Review fundamentals today.',
        aiStatus: 'warning'
    },
    {
        id: 'CS-401',
        name: 'Advanced Mathematics',
        schedule: 'Tue, Thu • 09:00 AM',
        room: 'Room 302, Block A',
        students: 62,
        avgGrade: 'A-',
        attendance: 94,
        atRisk: 1,
        theme: 'from-blue-500 to-indigo-600',
        shadow: 'shadow-blue-500/20',
        aiTip: 'Class performance is optimal. 85% of students have already completed the pre-reading.',
        aiStatus: 'good'
    },
    {
        id: 'SE-210',
        name: 'Database Systems',
        schedule: 'Fri • 02:00 PM',
        room: 'Main Auditorium',
        students: 120,
        avgGrade: 'C+',
        attendance: 76,
        atRisk: 12,
        theme: 'from-orange-500 to-red-600',
        shadow: 'shadow-orange-500/20',
        aiTip: 'Attendance dropped by 15% this week. Consider an interactive session on SQL Joins.',
        aiStatus: 'critical'
    }
];

// Animation variants for staggered rendering
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function MyClassesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1400px] mx-auto"
        >
            {/* Page Header & Actions */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tighter">My Classes</h1>
                    <p className="text-slate-400 mt-1">Manage your assigned courses, view insights, and access grading.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-500/20 text-sm">
                        <Plus className="w-4 h-4" /> Create / Join Class
                    </button>
                </div>
            </motion.div>

            {/* Top Controls (Search & Filter) */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-lg">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search classes by name or code..."
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <select className="bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer">
                        <option>All Semesters</option>
                        <option>Spring 2026</option>
                        <option>Fall 2025</option>
                    </select>
                    <button className="flex items-center justify-center p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>

            {/* Class Cards Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classesData.map((course) => (
                    <div
                        key={course.id}
                        className="flex flex-col rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-xl group hover:border-white/20 transition-colors"
                    >
                        {/* Card Header (Gradient Background) */}
                        <div className={cn("p-6 bg-gradient-to-br relative overflow-hidden", course.theme)}>
                            {/* Decorative background shapes */}
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-black/10 rounded-full blur-xl pointer-events-none" />

                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 rounded-md bg-black/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10 mb-3">
                                        {course.id}
                                    </span>
                                    <h2 className="text-xl font-bold text-white leading-tight mb-1 group-hover:scale-[1.02] transition-transform origin-left">{course.name}</h2>
                                    <div className="flex flex-col gap-1 mt-3 text-white/80 text-xs font-medium">
                                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {course.schedule}</span>
                                        <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {course.room}</span>
                                    </div>
                                </div>
                                <button className="p-1.5 bg-black/10 hover:bg-black/20 rounded-lg text-white backdrop-blur-sm transition-colors border border-white/10">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Quick Metrics */}
                        <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5 bg-slate-900/50">
                            <div className="p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Grade</span>
                                <span className="text-lg font-black text-white">{course.avgGrade}</span>
                            </div>
                            <div className="p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Attendance</span>
                                <span className="text-lg font-black text-white">{course.attendance}%</span>
                            </div>
                            <div className="p-4 flex flex-col items-center justify-center text-center bg-red-500/5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">At Risk</span>
                                <span className="text-lg font-black text-red-400">{course.atRisk}</span>
                            </div>
                        </div>

                        {/* AI Assistant Insight */}
                        <div className="p-4 m-5 rounded-2xl bg-slate-950 border border-white/5 flex items-start gap-3">
                            <div className={cn(
                                "p-2 rounded-full flex-shrink-0",
                                course.aiStatus === 'warning' ? "bg-yellow-500/10 text-yellow-400" :
                                    course.aiStatus === 'critical' ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                            )}>
                                {course.aiStatus === 'critical' ? <AlertTriangle className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-1">AI Suggestion</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">{course.aiTip}</p>
                            </div>
                        </div>

                        {/* Card Footer: Students & Action */}
                        <div className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-white/5 bg-slate-900/30 pt-4">
                            <div className="flex items-center gap-3">
                                {/* Stacked overlapping avatars */}
                                <div className="flex -space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">AR</div>
                                    <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">SK</div>
                                    <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">KA</div>
                                </div>
                                <span className="text-xs font-bold text-slate-500">+{course.students - 3}</span>
                            </div>

                            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all border border-white/10 group-hover:border-emerald-500/30 group-hover:text-emerald-400">
                                Manage Class <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}