"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Mail, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for at-risk students
const students = [
    { id: 1, name: 'Zain Ahmed', course: 'Computer Science', risk: 'High', probability: '88%', avatar: 'ZA' },
    { id: 2, name: 'Sara Khan', course: 'Data Science', risk: 'Medium', probability: '62%', avatar: 'SK' },
    { id: 3, name: 'Hamza Ali', course: 'Machine Learning', risk: 'High', probability: '92%', avatar: 'HA' },
    { id: 4, name: 'Dua Iftikhar', course: 'Software Engineering', risk: 'Low', probability: '35%', avatar: 'DI' },
    { id: 5, name: 'Bilal Raza', course: 'Cyber Security', risk: 'Medium', probability: '58%', avatar: 'BR' },
];

const riskStyles = {
    High: 'bg-red-500/10 text-red-500 border-red-500/20',
    Medium: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    Low: 'bg-green-500/10 text-green-500 border-green-500/20',
};

export default function RiskTable() {
    return (
        <div className="w-full p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        At-Risk Students Identification
                    </h2>
                    <p className="text-sm text-slate-400">AI-driven dropout probability analysis</p>
                </div>
                <button className="text-sm text-blue-400 hover:underline font-medium transition-all">
                    View All Students
                </button>
            </div>

            {/* Scrollable Container */}
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
                <div className="min-w-[800px] flex flex-col gap-3">
                    
                    {/* Modern Grid Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-2 text-slate-500 text-xs uppercase tracking-widest font-semibold border-b border-white/5 pb-3">
                        <div className="col-span-3">Student</div>
                        <div className="col-span-3">Course</div>
                        <div className="col-span-2">Risk Level</div>
                        <div className="col-span-3">AI Probability</div>
                        <div className="col-span-1 text-right">Actions</div>
                    </div>

                    {/* Modern Grid Body */}
                    {students.map((student, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={student.id}
                            // Pura row ab 1 single DIV hay. No more HTML table gaps!
                            className="grid grid-cols-12 gap-4 items-center px-4 py-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl group"
                        >
                            {/* Student Column */}
                            <div className="col-span-3 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white border border-white/10 shrink-0">
                                    {student.avatar}
                                </div>
                                <span className="font-medium text-slate-200 truncate">{student.name}</span>
                            </div>
                            
                            {/* Course Column */}
                            <div className="col-span-3 text-slate-400 text-sm truncate">
                                {student.course}
                            </div>

                            {/* Risk Column */}
                            <div className="col-span-2">
                                <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", riskStyles[student.risk as keyof typeof riskStyles])}>
                                    {student.risk}
                                </span>
                            </div>

                            {/* AI Probability Column */}
                            <div className="col-span-3">
                                <div className="w-full max-w-[100px] bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full", student.risk === 'High' ? 'bg-red-500' : 'bg-blue-500')}
                                        style={{ width: student.probability }}
                                    />
                                </div>
                                <span className="text-[10px] text-slate-500 mt-1 block">{student.probability} match</span>
                            </div>

                            {/* Actions Column */}
                            <div className="col-span-1 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-white/20 rounded-lg text-slate-400 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-white/20 rounded-lg text-slate-400 hover:text-white transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}