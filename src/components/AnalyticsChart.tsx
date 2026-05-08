"use client";

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// Mock data for student performance trends
const data = [
    { month: 'Jan', score: 65, prediction: 68 },
    { month: 'Feb', score: 59, prediction: 62 },
    { month: 'Mar', score: 80, prediction: 85 },
    { month: 'Apr', score: 81, prediction: 88 },
    { month: 'May', score: 56, prediction: 60 },
    { month: 'Jun', score: 95, prediction: 92 },
];

export default function AnalyticsChart() {
    return (
        <div className="w-full h-[350px] p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Performance Trends</h2>
                    <p className="text-sm text-slate-400">Actual vs. AI Predicted Outcomes</p>
                </div>
                <div className="flex gap-4 text-xs font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-slate-300">Actual</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-slate-300">Predicted</span>
                    </div>
                </div>
            </div>

            <div className="h-[230px] w-full"> {/* Wrapped ResponsiveContainer to lock height */}
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            {/* Gradient for Actual Data */}
                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            {/* Gradient for Predicted Data */}
                            <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                zIndex: 10,
                            }}
                            wrapperStyle={{ zIndex: 100 }}
                            itemStyle={{ fontSize: '12px' }}
                        />

                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorActual)"
                            animationDuration={2000}
                        />
                        <Area
                            type="monotone"
                            dataKey="prediction"
                            stroke="#a855f7"
                            strokeWidth={3}
                            strokeDasharray="5 5"
                            fillOpacity={1}
                            fill="url(#colorPred)"
                            animationDuration={2500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}