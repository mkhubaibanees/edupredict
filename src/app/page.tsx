"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Sparkles, ShieldCheck, Zap, BarChart3, CheckCircle2,
  Shield, BookOpen, UserCircle, Users, ChevronDown, Plus, Minus, Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const portals = [
    { name: 'Admin Portal', desc: 'Global control & institutional analytics.', icon: Shield, href: '/admin', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { name: 'Teacher Portal', desc: 'Class management & AI grading tools.', icon: BookOpen, href: '/teacher', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { name: 'Student Portal', desc: 'Personalized AI learning & tracking.', icon: UserCircle, href: '/student', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { name: 'Parent Portal', desc: 'Real-time monitoring of child success.', icon: Users, href: '/parent', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  ];

  const faqs = [
    { q: "Is the AI model customizable?", a: "Yes, you can configure AI strictness and choose between different LLM models via the Admin settings." },
    { q: "Does it support local installation?", a: "EduPredict AI is built on Next.js, making it easy to deploy on any cloud provider or private server." },
    { q: "Can we link multiple children to one parent?", a: "Absolutely. The Parent Portal supports multiple student profiles under a single guardian account." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200 -mx-6 -mt-20 md:-mx-10 md:-mt-10 flex flex-col">

      {/* GLOW BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* NAVBAR (FIXED & STICKY) */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl h-16 md:h-20 flex items-center shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Zap className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
            <span className="font-black text-lg md:text-2xl tracking-tight">EduPredict <span className="text-blue-400">AI</span></span>
          </div>
          <div className="hidden lg:flex gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <a href="#portals" className="hover:text-white transition-colors">Portals</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <Link href="/admin" className="px-4 py-2 md:px-6 md:py-2.5 rounded-xl bg-white text-slate-950 font-black text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
            Live Preview
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative z-10 pt-16 md:pt-24 pb-12">
        <section className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" /> Built for the Next Decade of Learning
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-6">
            Predictive AI for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Modern Institutions.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm md:text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
            The world's first unified SaaS platform that uses AI to predict student success, automate grading, and bridge the gap between Teachers and Parents.
          </motion.p>

          {/* MAIN DASHBOARD MOCKUP PREVIEW (ADMIN) */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="relative w-full max-w-5xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900 rounded-[1.5rem] border border-white/10 overflow-hidden shadow-2xl">
              <div className="h-8 bg-slate-800/50 border-b border-white/5 flex items-center px-4 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="aspect-[16/9] bg-slate-950 flex flex-col items-center justify-center group-hover:scale-[1.01] transition-transform duration-700 relative overflow-hidden">
                <Image src="/screenshots/admin.png" alt="Admin Dashboard" fill className="object-contain p-2 md:p-4" />
                <BarChart3 className="w-12 h-12 md:w-16 md:h-16 text-blue-500/20 mb-4" />
                <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">Place Admin Dashboard Screenshot Here</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PORTAL NAVIGATION GRID WITH THUMBNAILS */}
        <section id="portals" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Unified Experience</h2>
            <p className="text-slate-500 mt-2">Explore the four specialized portals included in the platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portals.map((portal, i) => (
              <Link key={i} href={portal.href} className="group p-5 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 flex flex-col">

                {/* THUMBNAIL PLACEHOLDER */}
                <div className={cn("w-full aspect-video rounded-xl mb-6 flex flex-col items-center justify-center border relative overflow-hidden", portal.bg, portal.border)}>
                  <Image src={`/screenshots/${portal.name.toLowerCase().split(' ')[0]}.png`} alt={portal.name} fill className="object-contain p-2 rounded-xl" />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", portal.bg, portal.color)}>
                    <portal.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1">
                    {portal.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">{portal.desc}</p>

                <div className={cn("text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-auto transition-all", portal.color)}>
                  View Portal <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PRICING TABLE */}
        <section id="pricing" className="max-w-5xl mx-auto px-6 py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Flexible Licensing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '49', features: ['500 Students', 'AI Core', 'Email Support'] },
              { name: 'Professional', price: '99', features: ['2000 Students', 'AI Grading', 'Priority Support'], popular: true },
              { name: 'Enterprise', price: '249', features: ['Unlimited', 'White-labeling', 'API Access'] }
            ].map((plan, i) => (
              <div key={i} className={cn(
                "p-8 rounded-[2rem] border flex flex-col",
                plan.popular ? "bg-blue-600/10 border-blue-500/50 shadow-2xl shadow-blue-500/10" : "bg-slate-900/30 border-white/10"
              )}>
                <h3 className="font-bold text-white mb-1">{plan.name}</h3>
                <div className="text-3xl font-black text-white mb-6">${plan.price}<span className="text-sm text-slate-500 font-medium">/mo</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={cn("w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all", plan.popular ? "bg-blue-600 text-white" : "bg-white/5 text-white hover:bg-white/10")}>Get Started</button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-black text-center text-white mb-12 uppercase tracking-tighter">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-slate-900/20 overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full p-5 flex items-center justify-between text-left focus:outline-none">
                  <span className="text-sm font-bold text-slate-200">{faq.q}</span>
                  {activeFaq === i ? <Minus className="w-4 h-4 text-blue-400" /> : <Plus className="w-4 h-4 text-slate-500" />}
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="px-5 pb-5 text-xs text-slate-400 leading-relaxed overflow-hidden">
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-auto py-12 border-t border-white/5 text-center relative z-10">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">© 2026 EduPredict AI • Premium EdTech Solution</p>
      </footer>
    </div>
  );
}