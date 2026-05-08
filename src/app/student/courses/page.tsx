"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, AlertCircle, CheckCircle2, Clock, ChevronRight, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for detailed courses
const courses = [
    {
        id: 1,
        code: 'CS-401',
        name: 'Advanced Mathematics',
        instructor: 'Dr. Arshad',
        progress: 75,
        currentGrade: 'B+',
        predictedGrade: 'A-',
        status: 'on_track',
        nextTask: 'Midterm Assignment due in 2 days',
        theme: 'from-blue-500 to-cyan-500',
        bgLight: 'bg-blue-500/10',
        borderLight: 'border-blue-500/20'
    },
    {
        id: 2,
        code: 'CS-305',
        name: 'Machine Learning Basics',
        instructor: 'Prof. Sarah',
        progress: 45,
        currentGrade: 'C',
        predictedGrade: 'C-',
        status: 'at_risk',
        nextTask: 'Quiz 3 tomorrow',
        theme: 'from-red-500 to-orange-500',
        bgLight: 'bg-red-500/10',
        borderLight: 'border-red-500/20'
    },
    {
        id: 3,
        code: 'SE-210',
        name: 'Database Systems',
        instructor: 'Engr. Bilal',
        progress: 90,
        currentGrade: 'A',
        predictedGrade: 'A',
        status: 'excellent',
        nextTask: 'Final Project Submission',
        theme: 'from-green-500 to-emerald-500',
        bgLight: 'bg-green-500/10',
        borderLight: 'border-green-500/20'
    },
    {
        id: 4,
        code: 'CS-101',
        name: 'Intro to Programming',
        instructor: 'Dr. Faizan',
        progress: 100,
        currentGrade: 'A+',
        predictedGrade: 'A+',
        status: 'completed',
        nextTask: 'Course Completed',
        theme: 'from-purple-500 to-pink-500',
        bgLight: 'bg-purple-500/10',
        borderLight: 'border-purple-500/20'
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

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1400px] mx-auto"
        >
            {/* Header & Search Bar Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tighter">My Courses</h1>
                    <p className="text-slate-400 mt-1">Manage your active enrollments and AI-predicted outcomes.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                    </div>
                    {/* Filter Button */}
                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>

            {/* Courses Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-3xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-300 overflow-hidden shadow-lg"
                    >
                        {/* Left Accent Line */}
                        <div className={cn("absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b", course.theme)} />

                        {/* Course Basic Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest border", course.bgLight, course.borderLight, course.theme.split(' ')[0].replace('from-', 'text-'))}>
                                        {course.code}
                                    </span>

                                    {/* Status Badges */}
                                    {course.status === 'at_risk' && <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-md uppercase"><AlertCircle className="w-3 h-3" /> Needs Attention</span>}
                                    {course.status === 'excellent' && <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-md uppercase"><CheckCircle2 className="w-3 h-3" /> Excellent</span>}
                                </div>
                                <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{course.name}</h2>
                                <p className="text-sm text-slate-500">Instructor: {course.instructor}</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <span>Course Progress</span>
                                    <span>{course.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${course.progress}%` }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className={cn("h-full bg-gradient-to-r", course.theme)}
                                    />
                                </div>
                            </div>

                            {/* Next Task Indicator */}
                            <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 p-2 rounded-lg border border-white/5">
                                <Clock className="w-3.5 h-3.5 text-slate-500" />
                                <span className="truncate">{course.nextTask}</span>
                            </div>
                        </div>

                        {/* Right Side: Grades & Action */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:border-l sm:border-white/10 sm:pl-6 min-w-[120px]">

                            <div className="flex gap-6 sm:gap-4 sm:flex-col text-center sm:text-right w-full">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Current</p>
                                    <p className="text-2xl font-black text-white">{course.currentGrade}</p>
                                </div>

                                {/* AI Prediction Highlight */}
                                <div className={cn("p-2 rounded-xl border border-white/5", course.bgLight)}>
                                    <p className="text-[10px] text-blue-400 uppercase tracking-widest font-bold mb-0.5 flex items-center justify-center sm:justify-end gap-1">
                                        AI Predicted
                                    </p>
                                    <p className={cn("text-2xl font-black", course.theme.split(' ')[0].replace('from-', 'text-'))}>
                                        {course.predictedGrade}
                                    </p>
                                </div>
                            </div>

                            <button className="w-10 h-10 sm:w-full sm:h-auto rounded-full sm:rounded-xl bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 flex items-center justify-center sm:px-4 sm:py-2.5 transition-all text-slate-300 hover:text-white group/btn">
                                <span className="hidden sm:block font-bold text-sm">View Details</span>
                                <ChevronRight className="w-4 h-4 sm:hidden group-hover/btn:translate-x-1 transition-transform" />
                            </button>

                        </div>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}