"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, UserCircle, BookOpen, BarChart3,
    Settings, Power, ChevronRight, GraduationCap, 
    Trophy, Calendar, Zap, Users, FileCheck, MessageSquare, LineChart, Bell,
    Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Admin Links
const adminMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Students', icon: UserCircle, href: '/admin/students' },
    { name: 'Teachers', icon: BookOpen, href: '/admin/teachers' },
    { name: 'Parents', icon: Users, href: '/admin/parents' },
    { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

// Student Links
const studentMenuItems = [
    { name: 'My Progress', icon: LayoutDashboard, href: '/student' },
    { name: 'Courses', icon: GraduationCap, href: '/student/courses' },
    { name: 'Leaderboard', icon: Trophy, href: '/student/leaderboard' },
    { name: 'Schedule', icon: Calendar, href: '/student/schedule' },
    { name: 'Settings', icon: Settings, href: '/student/settings' },
];

// Teacher Links
const teacherMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/teacher' },
    { name: 'My Classes', icon: Users, href: '/teacher/classes' },
    { name: 'Grading', icon: FileCheck, href: '/teacher/grading' },
    { name: 'Analytics', icon: BarChart3, href: '/teacher/analytics' },
    { name: 'Settings', icon: Settings, href: '/teacher/settings' },
];

// Parent Links
const parentMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/parent' },
    { name: 'Academic Progress', icon: LineChart, href: '/parent/progress' },
    { name: 'Communication', icon: MessageSquare, href: '/parent/messages' },
    { name: 'Settings', icon: Settings, href: '/parent/settings' },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false); // <-- Mobile Drawer State
    const pathname = usePathname();

    if (pathname === '/') return null;

    const isStudentPath = pathname.startsWith('/student');
    const isTeacherPath = pathname.startsWith('/teacher');
    const isParentPath = pathname.startsWith('/parent');

    const menuItems = isStudentPath ? studentMenuItems
        : isTeacherPath ? teacherMenuItems
            : isParentPath ? parentMenuItems
                : adminMenuItems;

    const themeColor = isTeacherPath ? "text-emerald-400" : isParentPath ? "text-indigo-400" : "text-blue-400";
    const bgThemeActive = isTeacherPath ? "bg-emerald-600/20 border-emerald-500/20" : isParentPath ? "bg-indigo-600/20 border-indigo-500/20" : "bg-blue-600/20 border-blue-500/20";
    const indicatorTheme = isTeacherPath ? "bg-emerald-500" : isParentPath ? "bg-indigo-500" : "bg-blue-500";
    const iconBgTheme = isTeacherPath ? "bg-emerald-600 shadow-emerald-600/20" : isParentPath ? "bg-indigo-600 shadow-indigo-600/20" : "bg-blue-600 shadow-blue-600/20";

    return (
        <>
            {/* --- MOBILE FLOATING HAMBURGER BUTTON --- */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden fixed top-5 left-5 z-[40] p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white shadow-xl hover:bg-slate-800 transition-colors"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* --- MOBILE BACKDROP OVERLAY --- */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[45]"
                    />
                )}
            </AnimatePresence>

            {/* --- MAIN SIDEBAR --- */}
            <motion.div
                animate={{ width: isCollapsed ? 80 : 260 }}
                className={cn(
                    "h-screen bg-slate-950/90 md:bg-slate-950/50 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col text-white transition-transform duration-300 flex-shrink-0",
                    "fixed md:relative z-[50]", // Fixed on mobile, relative on desktop
                    !isMobileOpen ? "-translate-x-full md:translate-x-0" : "translate-x-0" // Hide on mobile by default
                )}
            >
                {/* Logo & Mobile Close Button */}
                <div className="flex items-center justify-between px-2 mb-10">
                    <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg flex justify-center items-center shadow-lg transition-colors duration-300", iconBgTheme)}>
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        {!isCollapsed && (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-xl tracking-tight whitespace-nowrap">
                                EduPredict <span className={themeColor}>AI</span>
                            </motion.span>
                        )}
                    </div>
                    {/* Mobile Close Button */}
                    <button onClick={() => setIsMobileOpen(false)} className="md:hidden p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)} // Close drawer on click (Mobile)
                                className={cn("flex items-center gap-4 px-3 py-3 rounded-xl transition-all group relative overflow-hidden", isActive ? bgThemeActive : "hover:bg-white/5")}
                            >
                                <item.icon className={cn("w-5 h-5 transition-colors shrink-0", isActive ? themeColor : "text-slate-400 group-hover:text-white")} />
                                {!isCollapsed && (
                                    <span className={cn("font-medium transition-colors text-sm whitespace-nowrap", isActive ? "text-white" : "text-slate-300 group-hover:text-white")}>{item.name}</span>
                                )}
                                {isActive && <motion.div layoutId="activeNav" className={cn("absolute left-0 w-1 h-6 rounded-r-full", indicatorTheme)} />}
                            </a>
                        );
                    })}
                </nav>

                {/* Desktop Toggle Button (Hidden on Mobile) */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={cn("hidden md:block absolute -right-3 top-20 rounded-full p-1 border border-white/20 hover:scale-110 transition-transform shadow-lg", indicatorTheme)}
                >
                    <ChevronRight className={cn("w-4 h-4 text-white transition-transform", isCollapsed ? "" : "rotate-180")} />
                </button>

                {/* Bottom Actions (Notifications & Logout) */}
                <div className="pt-4 border-t border-white/10 mt-auto space-y-2">
                    <button className="flex items-center gap-4 px-3 py-3 w-full text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all group relative overflow-hidden">
                        <div className="relative shrink-0">
                            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-white" />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse"></span>
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-1 items-center justify-between">
                                <span className="font-medium text-sm whitespace-nowrap">Notifications</span>
                                <span className="px-2 py-0.5 rounded-md bg-red-500/20 border border-red-500/20 text-red-400 text-[10px] font-black tracking-wider shadow-sm">
                                    3 NEW
                                </span>
                            </div>
                        )}
                    </button>

                    {/* Logout */}
                    <button className="flex items-center gap-4 px-3 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all group overflow-hidden">
                        <Power className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" /> {/* <-- Yahan update kiya */}
                        {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Logout</span>}
                    </button>

                </div>
            </motion.div>
        </>
    );
}