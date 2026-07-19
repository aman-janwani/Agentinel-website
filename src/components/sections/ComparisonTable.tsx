"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ROWS = [
  {
    feature: "Cost Model",
    agentinel: { text: "100% Free / Zero-cost", positive: true },
    alternative: { text: "Monthly Subscriptions", positive: false },
  },
  {
    feature: "Data Privacy",
    agentinel: { text: "100% Local (No cloud)", positive: true },
    alternative: { text: "Sends telemetry/code to cloud", positive: false },
  },
  {
    feature: "Agent Hooking",
    agentinel: { text: "Native (intercepts AI directly)", positive: true },
    alternative: { text: "Scans terminal post-facto", positive: false },
  },
  {
    feature: "Feedback Loop",
    agentinel: { text: "Tells AI why it failed", positive: true },
    alternative: { text: "Just blocks the terminal", positive: false },
  },
  {
    feature: "Setup",
    agentinel: { text: "Zero-config, drop-in", positive: true },
    alternative: { text: "Requires API keys & accounts", positive: false },
  },
  {
    feature: "Malware Database",
    agentinel: { text: "Local OSV Feed (~216k pkgs)", positive: true },
    alternative: { text: "Proprietary Feeds", positive: false },
  },
  {
    feature: "Feed Freshness",
    agentinel: { text: "Lags 1-3 days behind OSV", positive: null },
    alternative: { text: "Real-time / Minutes", positive: null },
  },
  {
    feature: "Detection Method",
    agentinel: { text: "Version-exact + Heuristics", positive: null },
    alternative: { text: "Advanced Behavioral Analysis", positive: null },
  },
];

function Check() {
  return (
    <svg className="w-5 h-5 text-[#00E5CC]" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="rgba(0,229,204,0.12)" />
      <path d="M6 10l3 3 5-5" stroke="#00E5CC" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="rgba(0,0,0,0.04)" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="#D1D5DB" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Comparison
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0A0A0A] tracking-tight">
            How does it compare?
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Agentinel vs commercial and enterprise security alternatives.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm"
        >
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-gray-500 font-medium w-1/3 bg-gray-50/50">
                  Feature
                </th>
                <th className="px-6 py-4 font-semibold text-[#0A0A0A] text-center w-1/3 bg-[#00E5CC]/5 border-t-2 border-t-[#00E5CC]">
                  Agentinel
                  <span className="ml-2 text-xs font-normal text-[#00E5CC] bg-[#00E5CC]/10 px-2 py-0.5 rounded-full">
                    free
                  </span>
                </th>
                <th className="px-6 py-4 font-medium text-gray-500 text-center w-1/3 bg-gray-50/50">
                  Commercial Alternatives
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}
                >
                  <td className="px-6 py-4 text-gray-700 font-medium">{row.feature}</td>

                  {/* Agentinel cell */}
                  <td className="px-6 py-4 text-center bg-[#00E5CC]/5">
                    <div className="flex items-center justify-center gap-2">
                      {row.agentinel.positive === true && <Check />}
                      {row.agentinel.positive === false && (
                        /* This shouldn't happen for agentinel but just in case */
                        <Cross />
                      )}
                      <span
                        className={
                          row.agentinel.positive === true
                            ? "text-gray-800 font-medium"
                            : "text-gray-500"
                        }
                      >
                        {row.agentinel.text}
                      </span>
                    </div>
                  </td>

                  {/* Alternative cell */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {row.alternative.positive === false && <Cross />}
                      <span className="text-gray-500">{row.alternative.text}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Honest limitations note */}
        <div className="mt-10 p-6 rounded-2xl bg-gray-50 border border-gray-100">
          <p className="text-sm font-semibold text-gray-700 mb-3">Where we honestly fall short, and how we compensate:</p>
          <ul className="flex flex-col gap-2.5 text-sm text-gray-500">
            <li className="flex items-start gap-2.5">
              <span className="text-amber-400 mt-0.5">~</span>
              <span><strong className="text-gray-700">Feed Freshness:</strong> Our local OSV database lags 1-3 days behind the live feed. We compensate with zero-cost heuristics that catch slopsquatting and hallucinated packages the moment they appear, before they are even in any DB.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-amber-400 mt-0.5">~</span>
              <span><strong className="text-gray-700">Detection Depth:</strong> We use DB matching plus heuristics rather than ML behavioral analysis. We compensate by being the only tool that integrates at the AI agent hook level, blocking threats before execution rather than scanning after the fact.</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">Comparison reflects general market characteristics as of 2026. Individual products may vary.</p>
        </div>
      </div>
    </section>
  );
}
