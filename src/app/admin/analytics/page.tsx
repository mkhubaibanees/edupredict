"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
    BarChart3, TrendingUp, BrainCircuit,
    Activity, Users, Zap, Database, Server,
    Settings2, Filter, Download, Calendar,
    Search, Cpu, Globe, ArrowUpRight, History
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- ADVANCED ANALYTICS MOCK DATA ---
const timeseriesData = [
    { time: '00:00', load: 32, traffic: 45, latency: 120 },
    { time: '04:00', load: 25, traffic: 30, latency: 110 },
    { time: '08:00', load: 55, traffic: 85, latency: 160 },
    { time: '12:00', load: 88, traffic: 120, latency: 210 },
    { time: '16:00', load: 70, traffic: 95, latency: 180 },
    { time: '20:00', load: 45, traffic: 60, latency: 140 },
    { time: '23:59', load: 38, traffic: 50, latency: 130 },
];

const serviceHealth = [
    { name: 'Auth Service', status: 'Healthy', uptime: '99.99%', load: 12 },
    { name: 'AI Prediction Engine', status: 'Healthy', uptime: '99.95%', load: 64 },
    { name: 'Grading API', status: 'High Load', uptime: '98.40%', load: 89 },
    { name: 'CDN Nodes', status: 'Healthy', uptime: '100%', load: 0.4 },
];

// Heatmap data (simulating 7 days x 24 hours activity)
const heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function AdminAnalyticsExplorer() {
    const [activeMetric, setActiveMetric] = useState<'traffic' | 'load' | 'latency'>('traffic');

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6 pb-20 max-w-[1600px] mx-auto"
        >
            {/* --- EXPLORER HEADER & CONTROL BAR --- */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 bg-slate-900/80 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-blue-400" /> Analytics Explorer
                        </h1>
                        <p className="text-slate-400 text-xs mt-1 font-medium">Investigate platform performance across infrastructure and user behavior layers.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5">
                            {(['traffic', 'load', 'latency'] as const).map((m) => (
                                <button
                                    key={m} onClick={() => setActiveMetric(m)}
                                    className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeMetric === m ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300")}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                        <div className="h-8 w-px bg-white/10 mx-1" />
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all">
                            <Calendar className="w-4 h-4" /> Last 24 Hours
                        </button>
                        <button className="p-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* --- MASSIVE PRIMARY TIME-SERIES CHART --- */}
            <motion.div variants={itemVariants} className="p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl flex flex-col min-h-[450px]">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Live {activeMetric} Stream
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                            <div className="w-3 h-3 rounded bg-blue-500" /> {activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <div className="w-3 h-3 rounded bg-slate-700" /> Baseline Avg.
                        </div>
                    </div>
                </div>

                {/* Dynamic Time-Series Visualizer */}
                <div className="flex-1 relative flex items-end justify-between gap-1 px-4">
                    {/* Grid background */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-white/10 pb-8">
                        {[100, 75, 50, 25, 0].map((val) => (
                            <div key={val} className="w-full border-t border-white/[0.03] relative">
                                <span className="absolute -top-2 -left-8 text-[9px] font-black text-slate-600">{val}%</span>
                            </div>
                        ))}
                    </div>

                    {/* Bars with Multi-layer data points */}
                    <div className="relative z-10 flex-1 h-[300px] flex items-end justify-between gap-4">
                        {timeseriesData.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all bg-slate-800 border border-white/10 px-3 py-2 rounded-xl shadow-2xl text-center z-20">
                                    <p className="text-white font-black text-xs">{data[activeMetric]}%</p>
                                    <p className="text-[9px] text-slate-500 font-bold uppercase">{data.time}</p>
                                </div>

                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${data[activeMetric]}%` }}
                                    transition={{ duration: 1, delay: i * 0.05, type: 'spring' }}
                                    className="w-full max-w-[40px] rounded-t-xl bg-gradient-to-t from-blue-600/20 to-blue-400 group-hover:to-blue-300 relative"
                                >
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent" />
                                </motion.div>
                                <span className="mt-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">{data.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* --- GRID 2: Heatmap & Service Status --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* System Activity Heatmap (Fixed UX) */}
                <motion.div variants={itemVariants} className="lg:col-span-7 p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                    <div>
                        <h2 className="text-base font-bold text-white mb-1">Traffic Intensity Heatmap</h2>
                        <p className="text-xs text-slate-400 mb-6">Platform activity mapped across 24 hours.</p>
                    </div>

                    <div className="flex flex-col gap-2 relative">
                        {/* FIX 1: Added X-Axis Time Labels */}
                        <div className="flex items-center gap-3 mb-1">
                            <span className="w-8 shrink-0"></span> {/* Spacer to align with Days */}
                            <div className="flex-1 flex justify-between text-[9px] font-bold text-slate-500 uppercase tracking-wider px-1">
                                <span>12 AM</span>
                                <span>6 AM</span>
                                <span>12 PM</span>
                                <span>6 PM</span>
                                <span>11 PM</span>
                            </div>
                        </div>

                        {heatmapDays.map((day, dayIndex) => (
                            <div key={day} className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-slate-500 w-8 shrink-0">{day}</span>
                                {/* FIX 2: Explicit 24-column grid layout */}
                                <div className="flex-1 grid grid-cols-[repeat(24,minmax(0,1fr))] gap-1 sm:gap-1.5">
                                    {Array.from({ length: 24 }).map((_, h) => {
                                        const intensities = ['bg-slate-800', 'bg-blue-900/40', 'bg-blue-700/60', 'bg-blue-500', 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.4)]'];
                                        const pseudoRandomIndex = (dayIndex * 17 + h * 23) % intensities.length;
                                        const intensity = intensities[pseudoRandomIndex];

                                        // Determine label for tooltip based on intensity
                                        let trafficLevel = 'Low';
                                        if (pseudoRandomIndex === 4) trafficLevel = 'Critical';
                                        else if (pseudoRandomIndex === 3) trafficLevel = 'High';
                                        else if (pseudoRandomIndex === 2) trafficLevel = 'Moderate';

                                        // Format hour for tooltip (12-hour format)
                                        const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
                                        const ampm = h >= 12 ? 'PM' : 'AM';

                                        return (
                                            <div key={h} className="relative group">
                                                {/* FIX 3: Added Tooltip on Hover */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-800 border border-white/10 text-white text-[10px] font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                                                    {day}, {displayHour} {ampm} <span className="text-slate-400 font-medium ml-1">• {trafficLevel}</span>
                                                </div>
                                                {/* The Grid Box */}
                                                <div className={cn("h-3 sm:h-4 w-full rounded-[2px] sm:rounded-sm cursor-pointer hover:scale-125 transition-all duration-200 z-10 relative", intensity)} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-t border-white/5 pt-4">
                        <span>Less</span>
                        <div className="flex gap-1 sm:gap-1.5">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-slate-800 rounded-sm" />
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-900/40 rounded-sm" />
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-700/60 rounded-sm" />
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-sm" />
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.4)] rounded-sm" />
                        </div>
                        <span>More</span>
                    </div>
                </motion.div>

                {/* Micro-service Monitor */}
                <motion.div variants={itemVariants} className="lg:col-span-5 p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl flex flex-col">
                    <h2 className="text-base font-bold text-white mb-6">Service Health Monitor</h2>
                    <div className="space-y-4 flex-1">
                        {serviceHealth.map((service, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        service.status === 'Healthy' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                                    )} />
                                    <div>
                                        <h4 className="text-sm font-bold text-white leading-none">{service.name}</h4>
                                        <p className="text-[10px] text-slate-500 mt-1.5 font-medium">Uptime: {service.uptime}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-black text-slate-300">{service.load}% Load</span>
                                    <div className="w-16 h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${service.load}%` }}
                                            className={cn("h-full", service.load > 80 ? "bg-red-500" : "bg-blue-500")}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-6 w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <Settings2 className="w-4 h-4" /> Open Infra Console
                    </button>
                </motion.div>

            </div>

            {/* --- GRID 3: Advanced Logs & Anomaly Detection --- */}
            <motion.div variants={itemVariants} className="p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-3">
                            <History className="w-5 h-5 text-slate-400" /> Event Stream Analysis
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">AI-flagged anomalies and system-critical events.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                            <input type="text" placeholder="Filter logs..." className="bg-slate-950 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs text-white focus:outline-none" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {[
                        { type: 'Security', event: 'Brute-force attempt blocked', ip: '142.250.x.x', severity: 'Critical', time: '2 mins ago' },
                        { type: 'API', event: 'OpenAI Token usage reached 85% limit', ip: 'System', severity: 'Warning', time: '14 mins ago' },
                        { type: 'Sync', event: 'Canvas LMS data sync completed', ip: 'LMS-Link', severity: 'Info', time: '1 hour ago' },
                    ].map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-white/[0.03] group hover:bg-slate-950 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className={cn(
                                    "px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest border",
                                    log.severity === 'Critical' ? "bg-red-500/10 border-red-500/20 text-red-400" :
                                        log.severity === 'Warning' ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" :
                                            "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                )}>
                                    {log.severity}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-200">{log.event}</p>
                                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Source: {log.ip} • Type: {log.type}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-600">{log.time}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}