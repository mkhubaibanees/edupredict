"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, Trophy, Target, Lightbulb, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import GradePrediction from '@/components/GradePrediction';

// Animation variants for the entrance effect
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

export default function StudentDashboard() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
                        Welcome Back, Khubaib!
                    </h1>
                    <p className="text-slate-400 mt-1 italic">"The best way to predict the future is to create it."</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex items-center gap-2 font-bold text-sm shadow-lg shadow-yellow-500/5">
                        <Trophy className="w-4 h-4" />
                        Rank: #12
                    </div>
                </div>
            </motion.div>

            {/* Top Row: Quick Stats for Students */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Overall Attendance Card */}
                <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl relative overflow-hidden group shadow-xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookOpen className="w-12 h-12 text-blue-400" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Attendance</p>
                    <h3 className="text-3xl font-bold text-white mt-2">94%</h3>
                    <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '94%' }}
                            transition={{ duration: 1 }}
                            className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        />
                    </div>
                </div>

                {/* Assignments Completed */}
                <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl relative overflow-hidden group shadow-xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Target className="w-12 h-12 text-purple-400" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Tasks Done</p>
                    <h3 className="text-3xl font-bold text-white mt-2">24/28</h3>
                    <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1 }}
                            className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        />
                    </div>
                </div>

                {/* AI Recommendation Card */}
                <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl border-l-4 border-l-blue-500 shadow-lg shadow-blue-500/5">
                    <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-2 text-sm">
                        <Lightbulb className="w-4 h-4" />
                        AI Study Tip
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Your score in <span className="text-white font-bold">Calculus</span> is slightly down. Spend 30 mins on integration today to stay on track!
                    </p>
                </div>

            </motion.div>

            {/* Middle Section: Active Courses and AI Grade Prediction */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">

                {/* Left Side: Active Courses (Occupies 2 columns on large screens) */}
                <div className="xl:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight px-2">Active Courses</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { name: "Advanced Mathematics", prof: "Dr. Arshad", progress: 75, color: "from-blue-500 to-cyan-500" },
                            { name: "Machine Learning Basics", prof: "Prof. Sarah", progress: 45, color: "from-purple-500 to-pink-500" },
                            { name: "Database Systems", prof: "Engr. Bilal", progress: 90, color: "from-green-500 to-emerald-500" }
                        ].map((course, i) => (
                            <div key={i} className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 hover:border-white/20 transition-all group cursor-pointer shadow-md">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{course.name}</h4>
                                        <p className="text-xs text-slate-500 font-medium">Instructor: {course.prof}</p>
                                    </div>
                                    <span className="text-sm font-bold text-slate-300">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${course.progress}%` }}
                                        transition={{ duration: 1, delay: i * 0.2 }}
                                        className={cn("h-full bg-gradient-to-r", course.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: AI Grade Prediction Gauge */}
                <div className="xl:col-span-1 h-full">
                    <GradePrediction />
                </div>
            </motion.div>

            {/* Bottom Row: Upcoming Tasks/Deadlines Section */}
            <motion.div variants={itemVariants} className="pt-4">
                <div className="p-12 rounded-3xl border border-white/5 bg-slate-900/20 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 shadow-inner">
                    <div className="p-4 rounded-full bg-white/5 border border-white/10">
                        <Calendar className="w-10 h-10 text-slate-500 animate-pulse" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-white font-bold mb-1">Upcoming Deadlines</h3>
                        <p className="text-slate-500 text-sm max-w-[280px]">No urgent deadlines for this week. Great job staying ahead!</p>
                    </div>
                    <button className="px-8 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-black text-slate-300 transition-all active:scale-95 uppercase tracking-widest">
                        Open Full Calendar
                    </button>
                </div>
            </motion.div>

        </motion.div>
    );
}