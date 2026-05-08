"use client";

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Plus, Eye, Edit, Trash2,
    ShieldAlert, CheckCircle2, FileSpreadsheet, Download, X,
    User, Mail, UploadCloud, BookOpen, ArrowRight, ArrowLeft, Sparkles,
    ArrowUpDown, CheckSquare, Square
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Premium Mock Data
const studentsData = [
    { id: 'STD-001', name: 'Khubaib Anees', email: 'khubaib@student.edu', courses: 4, grade: 'B+', risk: 'low', status: 'active', avatar: 'KA' },
    { id: 'STD-002', name: 'Sara Khan', email: 'sara.k@student.edu', courses: 5, grade: 'A', risk: 'low', status: 'active', avatar: 'SK' },
    { id: 'STD-003', name: 'Ali Raza', email: 'ali.r@student.edu', courses: 3, grade: 'C-', risk: 'high', status: 'active', avatar: 'AR' },
    { id: 'STD-004', name: 'Ayesha Malik', email: 'ayesha.m@student.edu', courses: 4, grade: 'B', risk: 'medium', status: 'active', avatar: 'AM' },
    { id: 'STD-005', name: 'Usman Tariq', email: 'usman.t@student.edu', courses: 2, grade: 'D', risk: 'critical', status: 'inactive', avatar: 'UT' },
    { id: 'STD-006', name: 'Fatima Noor', email: 'fatima.n@student.edu', courses: 4, grade: 'A-', risk: 'low', status: 'active', avatar: 'FN' },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function AdminStudentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [entries, setEntries] = useState('10');

    // Drawer & Wizard States
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [selectedRisk, setSelectedRisk] = useState('low');

    // Bulk Selection State
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setTimeout(() => setFormStep(1), 300);
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === studentsData.length) setSelectedRows([]);
        else setSelectedRows(studentsData.map(s => s.id));
    };

    const toggleRow = (id: string) => {
        if (selectedRows.includes(id)) setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        else setSelectedRows([...selectedRows, id]);
    };

    return (
        <>
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6 pb-20 max-w-[1400px] mx-auto">

                {/* Page Header */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tighter">Student Management</h1>
                        <p className="text-slate-400 mt-1">View, manage, and analyze student performance data.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 text-sm group"
                        >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add New Student
                        </button>
                    </div>
                </motion.div>

                {/* Master Table Container */}
                <motion.div variants={itemVariants} className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-2xl relative flex flex-col">

                    {/* Smart Header & Toolbar */}
                    <div className="relative min-h-[80px]">
                        <AnimatePresence mode="wait">
                            {selectedRows.length > 0 ? (
                                /* BULK ACTION TOOLBAR (Visible when rows are selected) */
                                <motion.div
                                    key="bulk-actions"
                                    initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
                                    className="absolute inset-0 bg-blue-600/20 border-b border-blue-500/30 flex items-center justify-between px-6 z-10 backdrop-blur-md"
                                >
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setSelectedRows([])} className="p-1 rounded-md hover:bg-white/10 text-white"><X className="w-5 h-5" /></button>
                                        <span className="font-bold text-blue-400">{selectedRows.length} student(s) selected</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20">
                                            <FileSpreadsheet className="w-4 h-4" /> Export Selected
                                        </button>
                                        <button className="text-sm font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-4 py-2 rounded-xl flex items-center gap-2">
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                /* STANDARD TOOLBAR (Search & Filters) */
                                <motion.div
                                    key="standard-actions"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-b border-white/5 bg-white/[0.02]"
                                >
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-950/50 px-3 py-2 rounded-lg border border-white/5">
                                            <span>Show</span>
                                            <select value={entries} onChange={(e) => setEntries(e.target.value)} className="bg-transparent text-white focus:outline-none appearance-none cursor-pointer">
                                                <option value="10">10</option>
                                                <option value="50">50</option>
                                            </select>
                                        </div>
                                        <div className="relative w-full sm:w-64">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input type="text" placeholder="Search records..." className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors" />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all text-xs font-bold"><Download className="w-4 h-4" /> PDF</button>
                                        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all text-xs font-bold"><Filter className="w-4 h-4" /> Filter</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-900 border-b border-white/10 shadow-sm">
                                    {/* Master Checkbox */}
                                    <th className="pl-6 py-4 w-12">
                                        <button onClick={toggleSelectAll} className="text-slate-500 hover:text-blue-400 transition-colors">
                                            {selectedRows.length === studentsData.length ? <CheckSquare className="w-5 h-5 text-blue-500" /> : <Square className="w-5 h-5" />}
                                        </button>
                                    </th>
                                    <th className="px-4 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-white group">Student Info <ArrowUpDown className="inline w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" /></th>
                                    <th className="px-4 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-white group">Student ID <ArrowUpDown className="inline w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" /></th>
                                    <th className="px-4 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">Courses</th>
                                    <th className="px-4 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center cursor-pointer hover:text-white group">AI Grade <ArrowUpDown className="inline w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" /></th>
                                    <th className="px-4 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">AI Risk Level</th>
                                    <th className="px-6 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {studentsData.map((student) => {
                                    const isSelected = selectedRows.includes(student.id);
                                    return (
                                        <tr
                                            key={student.id}
                                            className={cn(
                                                "group transition-all duration-200",
                                                isSelected ? "bg-blue-500/10 border-l-4 border-l-blue-500" : "hover:bg-white/[0.02] border-l-4 border-l-transparent"
                                            )}
                                        >
                                            {/* Checkbox */}
                                            <td className="pl-6 py-4">
                                                <button onClick={() => toggleRow(student.id)} className="text-slate-500 hover:text-blue-400 transition-colors mt-1">
                                                    {isSelected ? <CheckSquare className="w-5 h-5 text-blue-500" /> : <Square className="w-5 h-5" />}
                                                </button>
                                            </td>

                                            {/* Student Info */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border border-white/10 shadow-lg", isSelected ? "bg-blue-600 text-white" : "bg-gradient-to-br from-slate-700 to-slate-800 text-white")}>
                                                        {student.avatar}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors cursor-pointer">{student.name}</h4>
                                                        <p className="text-xs text-slate-500">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4"><span className="font-mono text-xs text-slate-400 bg-slate-950 px-2 py-1 rounded-md border border-white/5">{student.id}</span></td>
                                            <td className="px-4 py-4 text-center"><span className="font-bold text-slate-300 bg-white/5 px-2.5 py-1 rounded-full">{student.courses}</span></td>
                                            <td className="px-4 py-4 text-center">
                                                <span className={cn("font-black text-sm", student.grade.includes('A') ? "text-emerald-400" : student.grade.includes('B') ? "text-blue-400" : student.grade.includes('C') ? "text-yellow-400" : "text-red-400")}>{student.grade}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center">
                                                    {student.risk === 'low' && <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest"><CheckCircle2 className="w-3 h-3" /> Safe</span>}
                                                    {student.risk === 'medium' && <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-bold uppercase tracking-widest"><ShieldAlert className="w-3 h-3" /> Monitor</span>}
                                                    {student.risk === 'high' && <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-widest"><ShieldAlert className="w-3 h-3" /> High Risk</span>}
                                                    {student.risk === 'critical' && <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest animate-pulse"><ShieldAlert className="w-3 h-3" /> Critical</span>}
                                                </div>
                                            </td>

                                            {/* Ultra-Premium Actions Column */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end">
                                                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 shadow-xl">
                                                        <button className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                                                        <button className="p-2 hover:bg-slate-800 text-slate-400 hover:text-blue-400 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                                                        <div className="w-px h-4 bg-white/10 mx-1" />
                                                        <button className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Premium Pagination Footer */}
                    <div className="px-6 py-4 border-t border-white/5 bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Showing 1 to {entries} of 1,240 records</span>
                        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-white/5 shadow-inner">
                            <button className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-400 text-xs font-bold transition-colors">Prev</button>
                            <button className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-black shadow-lg shadow-blue-500/10">1</button>
                            <button className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-400 text-xs font-bold transition-colors">2</button>
                            <button className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-400 text-xs font-bold transition-colors">3</button>
                            <span className="px-2 py-1.5 text-slate-600 text-xs font-bold">...</span>
                            <button className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-400 text-xs font-bold transition-colors">124</button>
                            <button className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-400 text-xs font-bold transition-colors">Next</button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* --- PREMIUM MULTI-STEP SLIDE-OVER DRAWER (Unchanged, already perfect) --- */}
            {/* ... [KEEP THE EXACT SAME AnimatePresence DRAWER CODE FROM MY PREVIOUS RESPONSE HERE] ... */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={closeDrawer}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40"
                        />

                        <motion.div
                            initial={{ x: '100%', boxShadow: '-20px 0 50px rgba(0,0,0,0)' }}
                            animate={{ x: 0, boxShadow: '-20px 0 50px rgba(0,0,0,0.5)' }}
                            exit={{ x: '100%', boxShadow: '-20px 0 50px rgba(0,0,0,0)' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 w-full max-w-lg h-full bg-slate-900 border-l border-white/10 z-50 flex flex-col"
                        >
                            {/* Drawer Header with Progress Bar */}
                            <div className="flex flex-col border-b border-white/5 bg-slate-900/50">
                                <div className="flex items-center justify-between p-6 pb-4">
                                    <div>
                                        <h2 className="text-2xl font-black text-white flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-blue-400" /> Enroll Student
                                        </h2>
                                        <p className="text-sm text-slate-400 mt-1">Step {formStep} of 3: {formStep === 1 ? 'Personal Details' : formStep === 2 ? 'Academic Profile' : 'AI Risk Setup'}</p>
                                    </div>
                                    <button onClick={closeDrawer} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                {/* Visual Progress Bar */}
                                <div className="w-full h-1 bg-slate-800">
                                    <motion.div
                                        initial={{ width: '33%' }}
                                        animate={{ width: `${(formStep / 3) * 100}%` }}
                                        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                    />
                                </div>
                            </div>

                            {/* Dynamic Form Content */}
                            <div className="flex-1 overflow-y-auto p-8 overflow-x-hidden">
                                <AnimatePresence mode="wait">

                                    {/* STEP 1: Personal Details */}
                                    {formStep === 1 && (
                                        <motion.div
                                            key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            {/* Avatar Dropzone */}
                                            <div className="w-full rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 hover:border-blue-500/50 transition-all p-6 flex flex-col items-center justify-center gap-2 cursor-pointer group">
                                                <div className="p-3 bg-white/5 rounded-full group-hover:scale-110 transition-transform">
                                                    <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-blue-400" />
                                                </div>
                                                <p className="text-sm font-bold text-white">Upload Profile Picture</p>
                                                <p className="text-xs text-slate-500">Drag & drop or click to browse</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                        <input type="text" placeholder="John Doe" className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                        <input type="email" placeholder="john@university.edu" className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 2: Academic Profile */}
                                    {formStep === 2 && (
                                        <motion.div
                                            key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assign Department</label>
                                                <select className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none">
                                                    <option>Computer Science</option>
                                                    <option>Software Engineering</option>
                                                    <option>Artificial Intelligence</option>
                                                </select>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><BookOpen className="w-4 h-4" /> Quick Enroll Courses</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {['Data Structures', 'Calculus I', 'Physics', 'Machine Learning', 'Web Dev'].map((course, i) => (
                                                        <label key={i} className="cursor-pointer">
                                                            <input type="checkbox" className="peer sr-only" defaultChecked={i === 0 || i === 3} />
                                                            <div className="px-4 py-2 rounded-xl border border-white/10 bg-slate-950 text-slate-400 text-sm font-medium peer-checked:bg-blue-600/20 peer-checked:border-blue-500/50 peer-checked:text-blue-400 transition-all hover:border-white/30">
                                                                {course}
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 3: AI Configuration */}
                                    {formStep === 3 && (
                                        <motion.div
                                            key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-start gap-3">
                                                <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
                                                <div>
                                                    <h4 className="text-white font-bold text-sm">AI Prediction Baseline</h4>
                                                    <p className="text-xs text-slate-400 mt-1">Set the initial risk level manually, or let EduPredict AI calibrate it after the first 2 weeks.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Initial Status</label>
                                                <div className="grid grid-cols-1 gap-3">

                                                    {/* Selectable Cards */}
                                                    <div
                                                        onClick={() => setSelectedRisk('low')}
                                                        className={cn("cursor-pointer p-4 rounded-xl border transition-all flex items-center gap-4", selectedRisk === 'low' ? "bg-green-500/10 border-green-500/50" : "bg-slate-950 border-white/10 hover:border-white/20")}
                                                    >
                                                        <div className={cn("p-2 rounded-full", selectedRisk === 'low' ? "bg-green-500/20 text-green-400" : "bg-white/5 text-slate-500")}><CheckCircle2 className="w-5 h-5" /></div>
                                                        <div><h4 className="text-white font-bold text-sm">Safe / On Track</h4><p className="text-xs text-slate-500">Standard monitoring.</p></div>
                                                    </div>

                                                    <div
                                                        onClick={() => setSelectedRisk('high')}
                                                        className={cn("cursor-pointer p-4 rounded-xl border transition-all flex items-center gap-4", selectedRisk === 'high' ? "bg-red-500/10 border-red-500/50" : "bg-slate-950 border-white/10 hover:border-white/20")}
                                                    >
                                                        <div className={cn("p-2 rounded-full", selectedRisk === 'high' ? "bg-red-500/20 text-red-400" : "bg-white/5 text-slate-500")}><ShieldAlert className="w-5 h-5" /></div>
                                                        <div><h4 className="text-white font-bold text-sm">High Risk Profile</h4><p className="text-xs text-slate-500">Immediate AI intervention.</p></div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </div>

                            {/* Drawer Footer Actions (Dynamic based on Step) */}
                            <div className="p-6 border-t border-white/5 bg-slate-900/80 backdrop-blur-md flex justify-between items-center">

                                {formStep > 1 ? (
                                    <button onClick={() => setFormStep(formStep - 1)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-bold transition-all text-sm">
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                ) : (
                                    <div /> // Empty div to keep 'Next' button on the right
                                )}

                                <div className="flex gap-3">
                                    <button onClick={closeDrawer} className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 font-bold transition-all text-sm">Cancel</button>

                                    {formStep < 3 ? (
                                        <button onClick={() => setFormStep(formStep + 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 text-sm">
                                            Next Step <ArrowRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button onClick={closeDrawer} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black transition-all shadow-lg shadow-emerald-500/20 text-sm">
                                            <CheckCircle2 className="w-4 h-4" /> Enroll Now
                                        </button>
                                    )}
                                </div>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}