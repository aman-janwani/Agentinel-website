"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Intercept",
    description: "Agentinel registers as a PreToolUse hook with your AI agent runtime. Every shell command the agent proposes passes through Agentinel first, before any execution.",
  },
  {
    number: "02",
    title: "Scan",
    description: "The full dependency tree is resolved locally and checked against an extensive database of known malicious packages. Heuristic checks fire simultaneously for slopsquatting detection.",
  },
  {
    number: "03",
    title: "Block",
    description: "If a threat is detected, Agentinel halts the install. In warn mode it alerts; in strict mode it stops cold. Never permanently blocks your terminal. Ultra-low latency.",
  },
  {
    number: "04",
    title: "Self-Correct",
    description: "The block context is serialized as JSON and fed back into the AI agent's context window. The agent understands what was wrong and self-corrects autonomously.",
  },
];

function Step({ step, index, isRight }: { step: (typeof STEPS)[number]; index: number; isRight: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? 40 : -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.1 }}
      className="grid grid-cols-[1fr_64px_1fr] items-center gap-4 md:gap-8"
    >
      {/* Left content (or spacer) */}
      {!isRight ? (
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Step {step.number}</p>
          <h3 className="font-serif text-2xl md:text-3xl text-[#0A0A0A] mb-2">{step.title}</h3>
          <p className="text-gray-500 text-base leading-relaxed ml-auto max-w-sm">{step.description}</p>
        </div>
      ) : (
        <div />
      )}

      {/* Center circle */}
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm z-10 flex-shrink-0">
          <span className="font-serif text-lg text-[#0A0A0A]">{step.number}</span>
        </div>
      </div>

      {/* Right content (or spacer) */}
      {isRight ? (
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Step {step.number}</p>
          <h3 className="font-serif text-2xl md:text-3xl text-[#0A0A0A] mb-2">{step.title}</h3>
          <p className="text-gray-500 text-base leading-relaxed max-w-sm">{step.description}</p>
        </div>
      ) : (
        <div />
      )}
    </motion.div>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  return (
    <section id="how-it-works" className="bg-[#F9FAFB] py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">How it Works</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0A0A0A] tracking-tight">How Agentinel Works</h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Vertical SVG line centered on the circle column */}
          <svg
            className="absolute left-1/2 top-0 -translate-x-1/2 h-full pointer-events-none"
            style={{ width: "2px" }}
            viewBox="0 0 2 400"
            preserveAspectRatio="none"
          >
            <line x1="1" y1="0" x2="1" y2="400" stroke="#E5E7EB" strokeWidth="2" />
            <motion.line
              x1="1" y1="0" x2="1" y2="400"
              stroke="#00E5CC" strokeWidth="2"
              style={{ pathLength, scaleY: pathLength, transformOrigin: "top" }}
            />
          </svg>

          <div className="flex flex-col gap-16 relative z-10">
            {STEPS.map((step, i) => (
              <Step key={step.number} step={step} index={i} isRight={i % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
