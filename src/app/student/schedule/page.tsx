"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, Video, AlertCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for today's timeline
const todaySchedule = [
    { id: 1, time: '09:00 AM', duration: '1h 30m', title: 'Advanced Mathematics', type: 'class', location: 'Room 302, Block A', icon: MapPin, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 2, time: '11:00 AM', duration: '45m', title: 'AI Study Block: Calculus Prep', type: 'ai_suggestion', location: 'Library or Quiet Zone', icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { id: 3, time: '01:00 PM', duration: '1h', title: 'Machine Learning Basics', type: 'online_class', location: 'Zoom Link', icon: Video, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { id: 4, time: '03:30 PM', duration: '30m', title: 'Database Systems Quiz', type: 'exam', location: 'Online Portal', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SchedulePage() {
    const [currentDate, setCurrentDate] = useState(new Date('2026-04-08'));

    // Very basic array to render a dummy calendar grid (for visual purposes)
    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20 max-w-[1400px] mx-auto"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tighter">My Schedule</h1>
                    <p className="text-slate-400 mt-1">Manage your classes, assignments, and AI-optimized study sessions.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 text-sm">
                        + Add Event
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Calendar Widget & Upcoming */}
                <motion.div variants={itemVariants} className="space-y-6">

                    {/* Custom Mini Calendar */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-white text-lg">April 2026</h3>
                            <div className="flex gap-2">
                                <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                                <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors"><ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500 mb-2">
                            <span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span><span>SU</span>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm">
                            {/* Adding some empty slots for alignment */}
                            <div className="p-2 text-slate-700">29</div>
                            <div className="p-2 text-slate-700">30</div>
                            <div className="p-2 text-slate-700">31</div>

                            {daysInMonth.map(day => {
                                const isToday = day === 8;
                                const hasEvent = [2, 8, 14, 22].includes(day);

                                return (
                                    <div
                                        key={day}
                                        className={cn(
                                            "p-2 rounded-xl cursor-pointer transition-all flex flex-col items-center gap-1",
                                            isToday ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "text-slate-300 hover:bg-white/10",
                                            !isToday && hasEvent ? "font-bold text-blue-400" : ""
                                        )}
                                    >
                                        <span>{day}</span>
                                        {hasEvent && !isToday && <div className="w-1 h-1 bg-blue-500 rounded-full" />}
                                        {isToday && <div className="w-1 h-1 bg-white rounded-full" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* AI Focus Overview */}
                    <div className="p-6 rounded-3xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl border-l-4 border-l-blue-500">
                        <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-3 text-sm uppercase tracking-widest">
                            <Sparkles className="w-4 h-4" />
                            AI Week Planner
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed mb-4">
                            You have a Database Quiz on Thursday. AI has automatically scheduled 2 study blocks to help you prepare.
                        </p>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-blue-500 w-[60%] h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-right">Week 60% Planned</p>
                    </div>

                </motion.div>

                {/* Right Column: Interactive Daily Timeline */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-xl h-full">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex flex-col items-center justify-center text-blue-400">
                                <span className="text-xs font-bold uppercase tracking-widest">Wed</span>
                                <span className="text-xl font-black">08</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Today's Timeline</h2>
                                <p className="text-sm text-slate-400">4 upcoming events, including 1 exam.</p>
                            </div>
                        </div>

                        {/* Timeline rendering FIX: Changed how the line is drawn */}
                        <div className="relative pl-0 md:pl-6 space-y-8">
                            {todaySchedule.map((event, index) => (
                                <div key={event.id} className="relative flex items-stretch gap-6 group">

                                    {/* Time Bubble */}
                                    <div className="hidden md:flex flex-col items-end w-24 pt-3 flex-shrink-0">
                                        <span className="text-sm font-bold text-white">{event.time}</span>
                                        <span className="text-xs text-slate-500 font-medium">{event.duration}</span>
                                    </div>

                                    {/* Timeline Node and Line container */}
                                    <div className="relative flex flex-col items-center flex-shrink-0">
                                        {/* The Line connecting nodes */}
                                        {index !== todaySchedule.length - 1 && (
                                            <div className="absolute top-8 bottom-[-2rem] w-0.5 bg-gradient-to-b from-white/10 to-white/5" />
                                        )}

                                        {/* The Node (Circle) */}
                                        <div className={cn(
                                            "flex items-center justify-center w-8 h-8 rounded-full border-4 border-slate-950 z-10 transition-transform duration-300 group-hover:scale-110 mt-2",
                                            event.bg, event.color
                                        )}>
                                            <div className="w-2 h-2 rounded-full bg-current" />
                                        </div>
                                    </div>

                                    {/* Event Card */}
                                    <div className={cn(
                                        "flex-1 p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg",
                                        event.bg, event.border
                                    )}>
                                        <div className="md:hidden flex items-center gap-2 mb-2">
                                            <span className="text-sm font-bold text-white">{event.time}</span>
                                            <span className="text-xs text-slate-500 font-medium">• {event.duration}</span>
                                        </div>

                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className={cn("font-bold text-lg mb-1", event.color)}>{event.title}</h3>
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                                                    <event.icon className="w-3.5 h-3.5" />
                                                    {event.location}
                                                </div>
                                            </div>
                                            {event.type === 'ai_suggestion' && (
                                                <span className="px-2 py-1 rounded-md bg-purple-500/20 text-purple-400 text-[9px] font-black uppercase tracking-widest border border-purple-500/30">
                                                    AI Block
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}