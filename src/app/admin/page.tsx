"use client";

import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/StatCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import RiskTable from '@/components/RiskTable';
import TopCourses from '@/components/TopCourses';
import ActivityFeed from '@/components/ActivityFeed';
import {
    Users,
    BookOpenCheck,
    BrainCircuit,
    Target,
    Bell,
    Download,
    Zap
} from 'lucide-react';

const adminStats = [
    { title: 'Total Students', value: '14,250', icon: Users, change: '+12.5%', changeType: 'increase', color: 'blue' },
    { title: 'Courses Completed', value: '8,790', icon: BookOpenCheck, change: '+8.1%', changeType: 'increase', color: 'purple' },
    { title: 'At-Risk Students', value: '1,120', icon: BrainCircuit, change: '-2.3%', changeType: 'decrease', color: 'orange' },
    { title: 'Prediction Accuracy', value: '91.4%', icon: Target, change: '+1.1%', changeType: 'increase', color: 'green' },
] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function AdminDashboardPage() {
    return (
        // 1. Root wrapper is now a normal <div> to fix Next.js History Bug
        <div className="space-y-8 pb-20">

            {/* Header Section with Actions */}
            {/* 2. Added initial="hidden" animate="visible" to individual sections */}
            <motion.div
                initial="hidden" animate="visible" variants={itemVariants}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tighter">Admin Dashboard</h1>
                    <p className="text-slate-400 mt-1">Real-time educational intelligence and predictive insights.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/20">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </motion.div>

            {/* Top Stats Grid */}
            <motion.div
                initial="hidden" animate="visible" variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {adminStats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </motion.div>


            {/* Middle Section: Chart + Info Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">

                {/* Large Chart Area */}
                <motion.div
                    initial="hidden" animate="visible" variants={itemVariants}
                    className="xl:col-span-2"
                >
                    <AnalyticsChart />
                </motion.div>

                {/* Right Side Info Panels */}
                <motion.div
                    initial="hidden" animate="visible" variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6"
                >
                    {/* AI Insight Card */}
                    <div className="p-6 rounded-2xl border border-blue-500/20 bg-slate-900/80 backdrop-blur-xl border-l-4 border-l-blue-500 flex flex-col justify-center min-h-[160px] shadow-2xl">
                        <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-3">
                            <BrainCircuit className="w-5 h-5" />
                            AI Insight
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Based on current trends, student engagement is expected to rise by <span className="text-blue-400 font-bold">15%</span> in the next quarter.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-400/50 uppercase tracking-widest">
                            <Zap className="w-3 h-3" />
                            Action Recommended
                        </div>
                    </div>

                    {/* System Status Monitoring Card */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl border-l-4 border-l-purple-500 flex flex-col justify-center min-h-[160px] shadow-2xl">
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-tight flex items-center justify-between">
                            System Status
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400 font-medium">Database Sync</span>
                                <span className="text-green-400 font-bold">ONLINE</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400 font-medium">ML Model v2.4</span>
                                <span className="text-purple-400 font-bold">STABLE</span>
                            </div>
                            <div className="pt-2 border-t border-white/5">
                                <p className="text-[10px] text-slate-500 text-center italic">
                                    Last sync: 5 minutes ago
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* New Section: Top Courses & Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div initial="hidden" animate="visible" variants={itemVariants}>
                    <TopCourses />
                </motion.div>
                <motion.div initial="hidden" animate="visible" variants={itemVariants}>
                    <ActivityFeed />
                </motion.div>
            </div>

            {/* Bottom Section: Detailed Risk Table */}
            <motion.div initial="hidden" animate="visible" variants={itemVariants}>
                <RiskTable />
            </motion.div>
        </div>
    );
}
