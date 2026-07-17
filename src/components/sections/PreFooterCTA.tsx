"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export function PreFooterCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0A0A0A] py-28 md:py-40 relative overflow-hidden border-t border-gray-900">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Subtle cyan glow in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00E5CC]/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] animate-pulse" />
          Ready to secure your workflow?
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white tracking-tight leading-tight text-balance">
          Secure your AI agents quickly and easily. <br className="hidden md:block" />
          <span className="text-gray-500 italic">For free. Always.</span>
        </h2>

        <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mt-2">
          No account. No server. No configuration required. Just a single npm command to lock down your terminal.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 w-full sm:w-auto">
          {/* White button */}
          <Link
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0A0A0A] text-base font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Get Started
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>

          {/* Ghost button */}
          <Link
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white text-base font-medium rounded-full border border-gray-700 hover:border-gray-400 hover:bg-white/5 transition-all duration-300"
          >
            Read the Docs
          </Link>
        </div>

        {/* Quick install reference */}
        <div className="flex items-center gap-3 px-6 py-4 bg-[#050505] border border-white/10 rounded-2xl font-mono text-sm text-gray-400 mt-6 shadow-2xl overflow-hidden relative group cursor-pointer transition-colors hover:border-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5CC]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <span className="text-[#00E5CC] select-none">$</span>
          <span className="text-gray-300 relative z-10">npm install --save-dev agentinel</span>
          <div className="pl-4 border-l border-white/10 relative z-10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-white transition-colors"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
