"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useMouseTransform } from '@/hooks/use-mouse-transform';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Component Props define kro (Type Safety)
interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    change: string; // e.g., "+15%" or "-2%"
    changeType: 'increase' | 'decrease';
    color: 'blue' | 'purple' | 'green' | 'orange';
}

const colorMap = {
    blue: 'border-blue-500/30 text-blue-400 bg-blue-500/5',
    purple: 'border-purple-500/30 text-purple-400 bg-purple-500/5',
    green: 'border-green-500/30 text-green-400 bg-green-500/5',
    orange: 'border-orange-500/30 text-orange-400 bg-orange-500/5',
};

export default function StatCard({ title, value, icon: Icon, change, changeType, color }: StatCardProps) {
    // 3D Hook use kro
    const { transform, onMouseMove, onMouseLeave } = useMouseTransform();

    return (
        <motion.div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            // Framer Motion se 3D rotation apply kro
            style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${transform.y}deg) rotateY(${transform.x}deg)`,
            }}
            // Transition smooth kro
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                // Base Glassmorphism classes
                "relative p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden cursor-pointer",
                // Color-specific border on hover
                "hover:border-opacity-100",
                colorMap[color] // Dynamic classes apply kro
            )}
        >
            {/* Subtle Glowing Radial Background on Hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.blue.600/10%),transparent_70%)] opacity-0 hover:opacity-100 transition-opacity duration-300" />

            {/* Icon & Title */}
            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-slate-300 font-medium text-sm tracking-wide">{title}</h3>
                <div className={cn("p-2 rounded-lg", colorMap[color].split(' ')[2])}> {/* Only BG class for icon */}
                    <Icon className={cn("w-5 h-5", colorMap[color].split(' ')[1])} /> {/* Only text class for icon */}
                </div>
            </div>

            {/* Value & Change */}
            <div className="relative z-10">
                <p className="text-4xl font-bold text-white tracking-tighter mb-1">{value}</p>
                <div className="flex items-center gap-2">
                    <span className={cn(
                        "text-sm font-medium",
                        changeType === 'increase' ? "text-green-400" : "text-red-400"
                    )}>
                        {change}
                    </span>
                    <span className="text-slate-500 text-xs">vs last month</span>
                </div>
            </div>

            {/* Glossy Border Shine Effect */}
            <div className="absolute top-0 -left-full hover:left-full h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 transition-all duration-700 ease-out" />
        </motion.div>
    );
}