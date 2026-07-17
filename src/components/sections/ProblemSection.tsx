"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#0A0A0A] bg-noise relative overflow-hidden py-28 md:py-36">
      {/* Red radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Clip-path heading reveal */}
        <motion.h2
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={
            isInView
              ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
              : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
          }
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-10 text-balance leading-tight"
        >
          Your AI confidently installed{" "}
          <span className="text-red-400 italic">what?</span>
        </motion.h2>

        {/* Fake package name callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-flex items-center gap-3 mb-10 px-5 py-3 bg-red-950/40 border border-red-800/40 rounded-xl"
        >
          <span className="text-red-400 text-sm font-mono uppercase tracking-widest select-none">
            blocked package
          </span>
          <code className="text-red-300 font-mono text-base md:text-lg line-through decoration-red-500 decoration-2">
            react-router-v7-fake
          </code>
          <span className="text-xs text-red-600 font-medium bg-red-950 px-2 py-0.5 rounded-full border border-red-900">
            1 day old / 4 downloads
          </span>
        </motion.div>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-gray-400 text-lg md:text-xl leading-relaxed text-balance font-sans max-w-3xl mx-auto"
        >
          LLMs are incredible coders. They are also genuinely terrible at remembering exact npm
          package names. They will confidently tell Claude to install{" "}
          <code className="bg-white/5 text-gray-300 px-1.5 py-0.5 rounded font-mono text-base">
            react-router-dom-v7-next-beta
          </code>{" "}
          like they have used it a thousand times. They have not. Nobody has. The package was
          registered yesterday by someone who knew this moment was coming.
        </motion.p>

        {/* Secondary copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed font-sans max-w-2xl mx-auto"
        >
          Agentinel sits between the AI and your terminal. Every install request is scanned
          against an extensive threat database and heuristic checks before a single byte hits disk.
          Locally. With ultra-low latency.
        </motion.p>
      </div>
    </section>
  );
}
