"use client";

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2, AlertCircle, FileText, ChevronLeft, ChevronRight,
    MessageSquare, BrainCircuit, Search, Filter, ArrowUpRight, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data for Assignments Needing Grading
const pendingSubmissions = [
    { id: 1, student: 'Ali Raza', avatar: 'AR', course: 'CS-305 Machine Learning', title: 'Neural Networks Lab 3', submittedAt: '2 hours ago', aiScore: 45, similarity: 89, status: 'high_match' },
    { id: 2, student: 'Sara Khan', avatar: 'SK', course: 'CS-401 Adv. Math', title: 'Calculus Midterm Paper', submittedAt: '5 hours ago', aiScore: 92, similarity: 4, status: 'original' },
    { id: 3, student: 'Khubaib Anees', avatar: 'KA', course: 'SE-210 Databases', title: 'Schema Design Project', submittedAt: '1 day ago', aiScore: 88, similarity: 12, status: 'original' },
    { id: 4, student: 'Ayesha Malik', avatar: 'AM', course: 'CS-305 Machine Learning', title: 'Neural Networks Lab 3', submittedAt: '1 day ago', aiScore: 75, similarity: 22, status: 'warning' },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function GradingDashboard() {
    const [selectedSubmission, setSelectedSubmission] = useState(pendingSubmissions[0]);
    const [gradeInput, setGradeInput] = useState('');
    const [feedbackInput, setFeedbackInput] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    // Handle fake save
    const handleSaveGrade = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6 pb-20 max-w-[1500px] mx-auto h-[calc(100vh-6rem)] flex flex-col"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tighter">AI Grading Workspace</h1>
                    <p className="text-slate-400 mt-1">Review submissions, check AI plagiarism scores, and assign grades.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2 font-bold text-sm shadow-lg shadow-emerald-500/5">
                        <CheckCircle2 className="w-4 h-4" /> 12 Graded Today
                    </span>
                </div>
            </motion.div>

            {/* Main Split Interface */}
            <motion.div variants={itemVariants} className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">

                {/* LEFT PANEL: Submission Queue (List) */}
                {/* FIX: Added specific height calculations to match the right side */}
                <div className="lg:col-span-4 flex flex-col rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl overflow-hidden h-[calc(100vh-12rem)] min-h-[600px]">
                    <div className="p-5 border-b border-white/5 bg-slate-900 flex flex-col gap-4 flex-shrink-0">
                        <h2 className="font-bold text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-400" /> Pending Queue
                        </h2>
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input type="text" placeholder="Search by student or ID..." className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all">To Grade (28)</button>
                            <button className="flex-1 py-1.5 rounded-lg hover:bg-white/5 text-slate-400 border border-transparent text-xs font-bold transition-all">Completed</button>
                        </div>
                    </div>

                    {/* FIX: Added Tailwind classes to hide the ugly scrollbar while keeping it scrollable */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {pendingSubmissions.map((sub) => (
                            <div
                                key={sub.id}
                                onClick={() => setSelectedSubmission(sub)}
                                className={cn(
                                    "p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 group flex-shrink-0",
                                    selectedSubmission.id === sub.id
                                        ? "bg-emerald-600/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                        : "bg-slate-950/40 border-white/5 hover:bg-white/5 hover:border-white/10"
                                )}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className={cn("font-bold text-sm transition-colors", selectedSubmission.id === sub.id ? "text-emerald-400" : "text-white group-hover:text-emerald-400")}>{sub.title}</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">{sub.course}</p>
                                    </div>
                                    {sub.status === 'high_match' && <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />}
                                </div>

                                <div className="flex items-center justify-between mt-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-800 text-[9px] font-bold text-white flex items-center justify-center border border-white/10">{sub.avatar}</div>
                                        <span className="text-xs font-medium text-slate-300">{sub.student}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-medium">{sub.submittedAt}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT PANEL: Active Grading Workspace */}
                <div className="lg:col-span-8 flex flex-col gap-6 h-full min-h-0">

                    {/* Top Workspace Header (Student Context) */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xl font-black text-white border-4 border-slate-950 shadow-lg relative">
                                {selectedSubmission.avatar}
                                {selectedSubmission.status === 'high_match' && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-slate-950 flex items-center justify-center animate-bounce">
                                        <AlertCircle className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{selectedSubmission.student}</h2>
                                <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest">{selectedSubmission.course}</span>
                                    <span>•</span>
                                    <span className="text-emerald-400 font-bold flex items-center gap-1">View Full Profile <ArrowUpRight className="w-3 h-3" /></span>
                                </div>
                            </div>
                        </div>

                        {/* AI Quick Insights Badge */}
                        <div className={cn(
                            "p-4 rounded-2xl border min-w-[200px] flex items-start gap-3",
                            selectedSubmission.status === 'high_match' ? "bg-red-500/10 border-red-500/20" : "bg-emerald-500/10 border-emerald-500/20"
                        )}>
                            <BrainCircuit className={cn("w-5 h-5 mt-0.5", selectedSubmission.status === 'high_match' ? "text-red-400" : "text-emerald-400")} />
                            <div>
                                <h4 className={cn("font-bold text-sm", selectedSubmission.status === 'high_match' ? "text-red-400" : "text-emerald-400")}>AI Similarity Report</h4>
                                <p className="text-xl font-black text-white mt-1">{selectedSubmission.similarity}% <span className="text-xs text-slate-400 font-medium">Match Found</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Middle Split: Document Viewer & Grading Form */}
                    {/* Middle Split: Document Viewer & Grading Form */}
                    {/* FIX: Ensure the grid takes full remaining height (flex-1) and both columns stretch equally */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 items-stretch">

                        {/* Document Viewer Placeholder */}
                        {/* FIX: Added h-full and flex-1 to force it to stretch to the parent's height */}
                        <div className="rounded-3xl border border-white/10 bg-slate-950 shadow-inner flex flex-col overflow-hidden relative group h-full">
                            <div className="absolute top-0 w-full p-4 bg-gradient-to-b from-slate-950/80 to-transparent flex justify-between z-10 pointer-events-none">
                                <span className="text-sm font-bold text-white pointer-events-auto">{selectedSubmission.title}.pdf</span>
                                <button className="text-emerald-400 text-xs font-bold flex items-center gap-1 hover:text-emerald-300 pointer-events-auto"><FileText className="w-3 h-3" /> Full Screen</button>
                            </div>
                            {/* Fake Document Content */}
                            <div className="flex-1 p-8 pt-16 overflow-y-auto font-serif text-slate-400 text-sm leading-loose opacity-70 hover:opacity-100 blur-[1px] hover:blur-none transition-all duration-300 cursor-text select-text bg-white/[0.01] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                <h1>{selectedSubmission.title}</h1>
                                <p className="mt-4">In this laboratory session, we implemented a basic feedforward neural network from scratch using Python and NumPy. The objective was to understand the underlying mathematics of backpropagation and gradient descent...</p>
                                <br />
                                {selectedSubmission.status === 'high_match' ? (
                                    <p className="bg-red-500/20 text-red-300 p-3 rounded-lg border border-red-500/30 font-bold shadow-inner">
                                        ...This specific block of code and explanation appears to be highly correlated with a repository found on GitHub regarding standard MNIST classification tasks. The weight initialization parameters specifically match exactly...
                                    </p>
                                ) : (
                                    <p>...The results demonstrated that initializing weights with He initialization led to significantly faster convergence times compared to standard random uniform initialization, especially for deeper network architectures.</p>
                                )}
                                <br />
                                <p>In conclusion, while the initial training loss was high, adjusting the learning rate and introducing a momentum term of 0.9 stabilized the gradient updates. The final accuracy on the test set reached 94.2%, indicating that the model successfully captured the underlying patterns in the dataset without significant overfitting. Further improvements could include implementing dropout layers or experimenting with different activation functions like LeakyReLU.</p>
                                <br />
                                <p>Appendix A contains the full source code for the custom dense layer implementation, showcasing the forward and backward pass logic.</p>
                            </div>
                        </div>

                        {/* Grading Form Panel */}
                        <div className="flex flex-col gap-4 h-full">

                            {/* Auto-Grade Suggestion */}
                            <div className="p-5 rounded-3xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl shadow-lg flex-shrink-0">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2"><Zap className="w-4 h-4" /> AI Suggested Grade</h4>
                                    <span className="text-xs text-slate-400">Based on rubric & similarity</span>
                                </div>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="text-3xl font-black text-white">{selectedSubmission.aiScore}/100</div>
                                    <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 text-blue-400 hover:text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/10">
                                        Apply Suggestion
                                    </button>
                                </div>
                            </div>

                            {/* Manual Grading Form */}
                            <div className="flex-1 p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl flex flex-col gap-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Final Score (/100)</label>
                                    <input
                                        type="number"
                                        placeholder="Enter score..."
                                        value={gradeInput}
                                        onChange={(e) => setGradeInput(e.target.value)}
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-2xl font-black text-emerald-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                    />
                                </div>

                                <div className="space-y-2 flex-1 flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Teacher Feedback</label>
                                        <button className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-1 rounded-md hover:bg-blue-500/20 transition-colors">Generate via AI</button>
                                    </div>
                                    <textarea
                                        placeholder="Write constructive feedback for the student..."
                                        value={feedbackInput}
                                        onChange={(e) => setFeedbackInput(e.target.value)}
                                        className="w-full flex-1 min-h-[120px] bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 font-bold transition-all text-sm">Save Draft</button>
                                    <button
                                        onClick={handleSaveGrade}
                                        disabled={isSaved}
                                        className={cn(
                                            "flex-[2] py-3 rounded-xl font-black transition-all text-sm flex items-center justify-center gap-2 shadow-lg",
                                            isSaved ? "bg-emerald-600 text-white shadow-emerald-500/30" : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                                        )}
                                    >
                                        {isSaved ? <><CheckCircle2 className="w-4 h-4" /> Published!</> : "Publish Grade"}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
}