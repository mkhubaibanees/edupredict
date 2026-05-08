"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Info } from 'lucide-react';

export default function GradePrediction() {
    const predictedScore = 88; // Yeh data baad mein backend se aaye ga

    return (
        <div className="p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl h-full shadow-2xl relative overflow-hidden">
            {/* Decorative Background Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/20 blur-[80px]" />

            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <BrainCircuit className="w-6 h-6 text-blue-400" />
                    AI Grade Prediction
                </h3>
                <button className="text-slate-500 hover:text-white transition-colors">
                    <Info className="w-4 h-4" />
                </button>
            </div>

            <div className="flex flex-col items-center justify-center py-4">
                {/* Simple SVG Gauge */}
                <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle
                            cx="50" cy="50" r="45"
                            fill="none"
                            stroke="#1e293b"
                            strokeWidth="8"
                        />
                        {/* Animated Progress Circle */}
                        <motion.circle
                            cx="50" cy="50" r="45"
                            fill="none"
                            stroke="url(#blueGradient)"
                            strokeWidth="8"
                            strokeDasharray="282.7"
                            initial={{ strokeDashoffset: 282.7 }}
                            animate={{ strokeDashoffset: 282.7 - (282.7 * predictedScore) / 100 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            strokeLinecap="round"
                            className="rotate-[-90deg] origin-center"
                        />
                        <defs>
                            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#2dd4bf" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Score Text in Center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-5xl font-black text-white tracking-tighter"
                        >
                            {predictedScore}%
                        </motion.span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Expected</span>
                    </div>
                </div>

                <div className="mt-8 text-center space-y-2">
                    <p className="text-slate-300 text-sm leading-relaxed">
                        You are on track for an <span className="text-blue-400 font-bold text-lg">A-Grade</span>!
                    </p>
                    <p className="text-[11px] text-slate-500 max-w-[200px]">
                        Based on assignments, quiz scores, and 94% attendance records.
                    </p>
                </div>
            </div>
        </div>
    );
}