"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BellRing, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const activities = [
    { id: 1, msg: 'New High-Risk student detected', time: '2 mins ago', type: 'alert', icon: AlertCircle, color: 'text-red-400' },
    { id: 2, msg: 'ML Model v2.4 retrained', time: '1 hour ago', type: 'success', icon: CheckCircle2, color: 'text-green-400' },
    { id: 3, msg: 'LMS Data sync completed', time: '3 hours ago', type: 'info', icon: Info, color: 'text-blue-400' },
];

export default function ActivityFeed() {
    return (
        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl h-full shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <BellRing className="w-5 h-5 text-purple-400" />
                System Activity
            </h3>

            <div className="space-y-5">
                {activities.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 relative"
                    >
                        <div className={`mt-1 flex-shrink-0 ${activity.color}`}>
                            <activity.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 border-b border-white/5 pb-3">
                            <p className="text-sm text-slate-200 leading-snug">{activity.msg}</p>
                            <span className="text-[10px] text-slate-500 mt-1 block uppercase tracking-wider">{activity.time}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}