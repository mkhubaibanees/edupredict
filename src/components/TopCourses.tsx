"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp } from 'lucide-react';

const courses = [
    { name: 'Machine Learning', students: 450, growth: '+18%', progress: 92, color: 'bg-blue-500' },
    { name: 'Data Science', students: 380, growth: '+12%', progress: 85, color: 'bg-purple-500' },
    { name: 'Cyber Security', students: 310, growth: '+5%', progress: 78, color: 'bg-green-500' },
];

export default function TopCourses() {
    return (
        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl h-full shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Top Performing Courses
                </h3>
            </div>

            <div className="space-y-6">
                {courses.map((course, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-300 font-medium">{course.name}</span>
                            <span className="text-blue-400 font-bold">{course.growth}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1.5, delay: index * 0.2 }}
                                className={`h-full ${course.color} shadow-[0_0_10px_rgba(59,130,246,0.5)]`}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-tighter">
                            <span>{course.students} Active Students</span>
                            <span>{course.progress}% Avg. Score</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}