"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
    Search, Filter, Plus, MoreVertical, Mail,
    BookOpen, Star, ShieldCheck, BrainCircuit,
    Users, CheckCircle2, Award, GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- PREMIUM MOCK DATA FOR TEACHERS ---
const teachersData = [
    {
        id: 'FAC-01', name: 'Dr. Arshad Ali', role: 'Senior Professor', department: 'Computer Science',
        courses: 4, rating: 4.9, aiAdoption: 92, students: 342, status: 'active', avatar: 'AA', color: 'from-blue-500 to-indigo-600'
    },
    {
        id: 'FAC-02', name: 'Prof. Sara Khan', role: 'Associate Professor', department: 'Mathematics',
        courses: 3, rating: 4.7, aiAdoption: 85, students: 210, status: 'active', avatar: 'SK', color: 'from-emerald-500 to-teal-600'
    },
    {
        id: 'FAC-03', name: 'Dr. Usman Tariq', role: 'Assistant Professor', department: 'Software Engineering',
        courses: 5, rating: 4.2, aiAdoption: 64, students: 420, status: 'warning', avatar: 'UT', color: 'from-orange-500 to-red-600'
    },
    {
        id: 'FAC-04', name: 'Ms. Ayesha Malik', role: 'Lecturer', department: 'Artificial Intelligence',
        courses: 2, rating: 4.9, aiAdoption: 98, students: 150, status: 'active', avatar: 'AM', color: 'from-purple-500 to-pink-600'
    },
    {
        id: 'FAC-05', name: 'Mr. Ali Raza', role: 'Visiting Faculty', department: 'Data Science',
        courses: 2, rating: 4.5, aiAdoption: 75, students: 180, status: 'active', avatar: 'AR', color: 'from-cyan-500 to-blue-600'
    },
    {
        id: 'FAC-06', name: 'Dr. Fatima Noor', role: 'HOD', department: 'Information Tech',
        courses: 1, rating: 4.8, aiAdoption: 88, students: 90, status: 'active', avatar: 'FN', color: 'from-rose-500 to-red-600'
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

export default function AdminTeachersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1400px] mx-auto"
        >
            {/* --- PAGE HEADER & ACTIONS --- */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tighter">Faculty Management</h1>
                    <p className="text-slate-400 mt-1">Manage teaching staff, monitor performance, and track AI system adoption.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 text-sm">
                        <Plus className="w-4 h-4" /> Onboard Teacher
                    </button>
                </div>
            </motion.div>

            {/* --- QUICK STATS ROW --- */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: 'Total Faculty', value: '42', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { title: 'Active Courses', value: '128', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { title: 'Avg Platform Rating', value: '4.6', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                    { title: 'Overall AI Adoption', value: '82%', icon: BrainCircuit, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                ].map((stat, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl flex items-center gap-4">
                        <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.title}</p>
                            <h3 className="text-2xl font-black text-white">{stat.value}</h3>
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
                        placeholder="Search faculty by name or department..."
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <select className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer">
                        <option>All Departments</option>
                        <option>Computer Science</option>
                        <option>Software Engineering</option>
                        <option>Artificial Intelligence</option>
                    </select>
                    <button className="flex items-center justify-center p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>

            {/* --- FACULTY GRID --- */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {teachersData.map((teacher) => (
                    <div key={teacher.id} className="relative group rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-300 flex flex-col">

                        {/* Top Banner (Abstract Gradient) */}
                        <div className={cn("h-24 w-full bg-gradient-to-r relative overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity", teacher.color)}>
                            <div className="absolute top-0 right-0 p-4">
                                <button className="p-1.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-lg text-white transition-colors border border-white/10">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="px-6 pb-6 flex-1 flex flex-col relative">

                            {/* Avatar pushing up into the banner */}
                            <div className="flex justify-between items-end -mt-10 mb-4">
                                <div className="w-20 h-20 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-xl font-black text-white shadow-xl relative">
                                    {teacher.avatar}
                                    <div className={cn(
                                        "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-slate-900",
                                        teacher.status === 'active' ? "bg-emerald-500" : "bg-yellow-500"
                                    )} />
                                </div>
                                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">
                                    {teacher.id}
                                </span>
                            </div>

                            {/* Name & Title */}
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    {teacher.name}
                                    {teacher.rating >= 4.8 && <ShieldCheck className="w-4 h-4 text-blue-400" />}
                                </h2>
                                <p className="text-sm text-blue-400 font-medium mt-0.5">{teacher.role}</p>
                                <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                                    <GraduationCap className="w-3.5 h-3.5" /> {teacher.department}
                                </div>
                            </div>

                            {/* Micro-Stats (Courses, Students, Rating) */}
                            <div className="grid grid-cols-3 gap-2 mt-6 py-4 border-y border-white/5">
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-lg font-black text-white">{teacher.courses}</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Courses</span>
                                </div>
                                <div className="flex flex-col items-center text-center border-x border-white/5">
                                    <span className="text-lg font-black text-white">{teacher.students}</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Students</span>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-lg font-black text-yellow-400 flex items-center gap-1">
                                        {teacher.rating} <Star className="w-3 h-3 fill-yellow-400" />
                                    </span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Rating</span>
                                </div>
                            </div>

                            {/* AI Adoption Progress Bar */}
                            <div className="mt-5 mb-2 flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5"><BrainCircuit className="w-3.5 h-3.5 text-purple-400" /> AI Adoption</span>
                                    <span className="text-xs font-black text-white">{teacher.aiAdoption}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                                        style={{ width: `${teacher.aiAdoption}%` }}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Footer Action Buttons */}
                        <div className="p-4 bg-slate-900/80 border-t border-white/5 flex gap-3">
                            <button className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-2">
                                <Mail className="w-3.5 h-3.5" /> Message
                            </button>
                            <button className="flex-1 py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-bold transition-all flex items-center justify-center gap-2">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}