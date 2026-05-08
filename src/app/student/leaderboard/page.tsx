"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Crown, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Redesigned mock data for a sleeker, compact look
const topStudents = [
    {
        rank: 2,
        name: 'Sara Khan',
        score: 94.2,
        avatar: 'SK',
        theme: 'border-t-slate-300 bg-gradient-to-b from-slate-400/20 to-transparent',
        textColor: 'text-slate-300',
        height: 'h-[120px] md:h-[140px]'
    },
    {
        rank: 1,
        name: 'Ali Raza',
        score: 98.5,
        avatar: 'AR',
        theme: 'border-t-yellow-400 bg-gradient-to-b from-yellow-400/20 to-transparent',
        textColor: 'text-yellow-400',
        height: 'h-[160px] md:h-[180px]'
    },
    {
        rank: 3,
        name: 'Zain Ahmed',
        score: 91.8,
        avatar: 'ZA',
        theme: 'border-t-orange-500 bg-gradient-to-b from-orange-500/20 to-transparent',
        textColor: 'text-orange-500',
        height: 'h-[100px] md:h-[110px]'
    },
];

const otherStudents = [
    { rank: 4, name: 'Ayesha Malik', score: 89.5, trend: 'down' },
    { rank: 5, name: 'Usman Tariq', score: 88.0, trend: 'up' },
    { rank: 6, name: 'Fatima Noor', score: 87.2, trend: 'same' },
    { rank: 7, name: 'Bilal Saeed', score: 85.9, trend: 'down' },
    { rank: 12, name: 'Khubaib Anees', score: 79.4, trend: 'up', isCurrent: true },
];

// Animation configurations
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LeaderboardPage() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10 pb-20 max-w-[1200px] mx-auto relative"
        >
            {/* Background ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            {/* Header */}
            <motion.div variants={itemVariants} className="text-center space-y-3 pt-4">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-2">
                    <Zap className="w-4 h-4" /> Global Rankings
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                    Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Fame</span>
                </h1>
                <p className="text-slate-400 max-w-md mx-auto text-sm">Compete with your peers, climb the ranks, and secure your spot at the top.</p>
            </motion.div>

            {/* The Redesigned, Compact Podium */}
            <motion.div variants={itemVariants} className="flex justify-center items-end gap-2 sm:gap-4 md:gap-6 pt-12 pb-6">
                {topStudents.map((student) => (
                    <div key={student.rank} className="flex flex-col items-center w-[100px] sm:w-[130px] md:w-[160px]">

                        {/* Avatar Section - Sitting cleanly on the pedestal */}
                        <div className="relative z-20 flex flex-col items-center -mb-6 group">
                            <div className={cn(
                                "w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-slate-900 font-black text-lg md:text-xl border-4 border-slate-950 shadow-xl transition-transform duration-300 group-hover:-translate-y-2",
                                student.rank === 1 ? "bg-gradient-to-br from-yellow-300 to-amber-500 w-16 h-16 md:w-20 md:h-20" :
                                    student.rank === 2 ? "bg-gradient-to-br from-slate-300 to-slate-500" :
                                        "bg-gradient-to-br from-orange-400 to-orange-600"
                            )}>
                                {student.avatar}
                            </div>

                            {/* Crown for Rank 1 only */}
                            {student.rank === 1 && (
                                <div className="absolute -top-6 bg-slate-900 rounded-full p-1.5 border border-yellow-500/30">
                                    <Crown className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                                </div>
                            )}
                        </div>

                        {/* Pedestal Base - Clean, Glassmorphism, Top Border Glow */}
                        <div className={cn(
                            "w-full rounded-t-2xl border-t-[3px] border-l border-r border-l-white/5 border-r-white/5 backdrop-blur-md flex flex-col items-center justify-end pb-4 pt-10 px-2 transition-all duration-300 hover:brightness-125",
                            student.theme,
                            student.height,
                            student.rank === 1 ? "z-10 shadow-[0_-10px_30px_rgba(250,204,21,0.15)]" : "opacity-90"
                        )}>
                            {/* Embedded Information inside the pedestal */}
                            <h3 className="text-white font-bold text-xs md:text-sm text-center w-full truncate">{student.name}</h3>
                            <p className={cn("font-black text-lg md:text-2xl mt-1", student.textColor)}>{student.score}</p>
                            <span className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-widest mt-0.5 font-bold">Points</span>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Current User Upgraded Banner */}
            <motion.div variants={itemVariants} className="relative p-6 rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5 w-full md:w-auto">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center font-black text-white text-lg border-2 border-white/10 ring-4 ring-slate-900">
                            KA
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                                Your Current Rank: <span className="text-blue-400">#12</span>
                            </h3>
                            <p className="text-xs md:text-sm text-slate-400 mt-1">You are <strong className="text-white">6.5 points</strong> away from the Top 10.</p>
                        </div>
                    </div>

                    <div className="w-full md:w-64 flex flex-col gap-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <span>Rank 12</span>
                            <span>Rank 10</span>
                        </div>
                        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '75%' }}
                                transition={{ duration: 1.5, delay: 0.3 }}
                                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 relative"
                            >
                                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Leaderboard Table */}
            <motion.div variants={itemVariants} className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="px-6 py-4 text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Rank</th>
                                <th className="px-6 py-4 text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Student</th>
                                <th className="px-6 py-4 text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest text-right">AI Score</th>
                                <th className="px-6 py-4 text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {otherStudents.map((student) => (
                                <tr
                                    key={student.rank}
                                    className={cn(
                                        "group transition-all duration-200 hover:bg-white/5",
                                        student.isCurrent ? "bg-blue-500/10 relative" : ""
                                    )}
                                >
                                    {/* Active highlight for current user */}
                                    {student.isCurrent && (
                                        <td className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                                    )}

                                    <td className="px-6 py-4 md:py-5">
                                        <span className={cn(
                                            "font-bold text-sm",
                                            student.isCurrent ? "text-blue-400" : "text-slate-400"
                                        )}>
                                            #{student.rank}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 md:py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-white/10">
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">
                                                {student.name}
                                            </span>
                                            {student.isCurrent && (
                                                <span className="ml-2 text-[9px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">You</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 md:py-5 text-right">
                                        <span className={cn(
                                            "font-bold text-base",
                                            student.isCurrent ? "text-white" : "text-slate-300"
                                        )}>
                                            {student.score}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 md:py-5">
                                        <div className="flex justify-center">
                                            {student.trend === 'up' && <div className="p-1.5 rounded-full bg-green-500/10 text-green-400"><TrendingUp className="w-4 h-4" /></div>}
                                            {student.trend === 'down' && <div className="p-1.5 rounded-full bg-red-500/10 text-red-400"><TrendingDown className="w-4 h-4" /></div>}
                                            {student.trend === 'same' && <div className="p-1.5 rounded-full bg-slate-500/10 text-slate-400"><Minus className="w-4 h-4" /></div>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

        </motion.div>
    );
}