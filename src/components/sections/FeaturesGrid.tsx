"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// ── Animated SVGs ──────────────────────────────────────────────────────────

function TreeScanSVG() {
  const nodes = [
    { cx: 100, cy: 28, label: "express", r: 14, fill: "#0A0A0A", text: "white" },
    { cx: 40,  cy: 88, label: "dep1",    r: 11, fill: "#00E5CC", text: "#0A0A0A" },
    { cx: 100, cy: 88, label: "dep2",    r: 11, fill: "#00E5CC", text: "#0A0A0A" },
    { cx: 160, cy: 88, label: "???",     r: 11, fill: "#F87171", text: "white" },
    { cx: 25,  cy: 140, label: "sub1",   r: 8,  fill: "#D1D5DB", text: "#9CA3AF" },
    { cx: 75,  cy: 140, label: "sub2",   r: 8,  fill: "#D1D5DB", text: "#9CA3AF" },
    { cx: 160, cy: 140, label: "!",      r: 8,  fill: "#F87171", text: "white" },
  ];
  const edges = [[0,1],[0,2],[0,3],[1,4],[1,5],[3,6]];

  return (
    <svg viewBox="0 0 200 165" className="w-full h-full" aria-hidden>
      <defs>
        <filter id="glowC"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glowR"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {edges.map(([f, t], i) => {
        const a = nodes[f], b = nodes[t];
        const hot = b.fill === "#F87171" || a.fill === "#F87171";
        return (
          <line key={i} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
            stroke={hot ? "#F87171" : "#E5E7EB"} strokeWidth={hot ? 1.5 : 1}>
            <animate attributeName="opacity" values={hot ? "0.4;1;0.4" : "0.3;0.8;0.3"}
              dur={`${1.8 + i * 0.25}s`} begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </line>
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.fill}
            fillOpacity={n.fill === "#D1D5DB" ? 0.3 : 1}
            filter={n.fill === "#00E5CC" ? "url(#glowC)" : n.fill === "#F87171" ? "url(#glowR)" : undefined}>
            {n.fill !== "#0A0A0A" && (
              <animate attributeName="r" values={`${n.r};${n.r + 2};${n.r}`}
                dur={`${2 + i * 0.3}s`} begin={`${i * 0.15}s`} repeatCount="indefinite" />
            )}
          </circle>
          <text x={n.cx} y={n.cy + 3.5} textAnchor="middle" fill={n.text}
            fontSize={n.r > 10 ? "6.5" : "5.5"} fontFamily="monospace" fontWeight="600">
            {n.label}
          </text>
        </g>
      ))}
      {/* Pulse ring from root */}
      <circle cx="100" cy="28" r="14" fill="none" stroke="#00E5CC" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="14;60" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
        <animate attributeName="opacity" values="0.6;0" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
      </circle>
      <text x="160" y="158" textAnchor="middle" fill="#F87171" fontSize="5.5" fontFamily="monospace">malicious</text>
    </svg>
  );
}

function ShieldScanSVG() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" aria-hidden>
      <path d="M100 18 L148 38 L148 86 Q148 124 100 140 Q52 124 52 86 L52 38 Z"
        fill="none" stroke="#E5E7EB" strokeWidth="2" />
      <path d="M100 18 L148 38 L148 86 Q148 124 100 140 Q52 124 52 86 L52 38 Z"
        fill="#00E5CC" opacity="0.07">
        <animate attributeName="opacity" values="0.07;0.15;0.07" dur="2s" repeatCount="indefinite"/>
      </path>
      {/* Scan line */}
      <line x1="60" y1="55" x2="140" y2="55" stroke="#00E5CC" strokeWidth="1.5" opacity="0">
        <animate attributeName="y1" values="55;115;55" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="55;115;55" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite"/>
      </line>
      {/* Checkmark */}
      <path d="M85 83 l9 9 l18 -18" fill="none" stroke="#00E5CC" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
      </path>
      {/* Pulse */}
      <circle cx="100" cy="83" r="8" fill="none" stroke="#00E5CC" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="8;42" dur="2s" repeatCount="indefinite" begin="1s"/>
        <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" begin="1s"/>
      </circle>
    </svg>
  );
}

// ── Looping Terminal ──────────────────────────────────────────────────────

const TYPING_SPEED = 45;
const LINE_DELAY = 350;
const LOOP_PAUSE = 2500;

interface TermLine { text: string; color?: string }

function LoopingTerminal({ command, outputLines, title }: { command: string; outputLines: TermLine[]; title: string }) {
  const [typedCmd, setTypedCmd] = useState("");
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "resetting">("typing");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTypedCmd(""); setVisibleLines(0); setPhase("typing");
  }, [command]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (phase === "typing") {
      if (typedCmd.length < command.length) {
        timer.current = setTimeout(() => setTypedCmd(command.slice(0, typedCmd.length + 1)), TYPING_SPEED);
      } else { timer.current = setTimeout(() => setPhase("output"), 500); }
    } else if (phase === "output") {
      if (visibleLines < outputLines.length) {
        timer.current = setTimeout(() => setVisibleLines(v => v + 1), LINE_DELAY);
      } else { timer.current = setTimeout(() => setPhase("resetting"), LOOP_PAUSE); }
    } else {
      setTypedCmd(""); setVisibleLines(0); setPhase("typing");
    }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [phase, typedCmd, visibleLines, command, outputLines.length]);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/8 bg-[#0E1117] font-mono text-sm text-left">
      <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.03]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 text-center text-xs font-medium text-gray-500">{title}</div>
      </div>
      <div className="p-5 h-[200px] flex flex-col gap-1.5 overflow-hidden">
        <div className="flex items-center gap-2 text-gray-200">
          <span className="text-[#00E5CC] select-none">$</span>
          <span>{typedCmd}</span>
          {phase === "typing" && <span className="inline-block w-[2px] h-4 bg-gray-300 animate-pulse ml-0.5 align-middle" />}
        </div>
        <div className="flex flex-col gap-1 mt-1">
          {outputLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={`whitespace-pre-wrap leading-relaxed ${line.color ?? "text-gray-400"}`}>{line.text}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Card wrapper ──────────────────────────────────────────────────────────

const CARD_VARIANTS: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 } }),
};

function Card({ children, className = "", index, isInView }: { children: React.ReactNode; className?: string; index: number; isInView: boolean }) {
  return (
    <motion.div custom={index} variants={CARD_VARIANTS} initial="hidden" animate={isInView ? "visible" : "hidden"}
      className={`bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-4 ${className}`}>
      {children}
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────

const CI_LINES: TermLine[] = [
  { text: "Scanning package.json...", color: "text-gray-500" },
  { text: "Scanning package-lock.json...", color: "text-gray-500" },
  { text: "" },
  { text: "Packages scanned:   412", color: "text-gray-400" },
  { text: "Threats found:      0",   color: "text-[#00E5CC]" },
  { text: "" },
  { text: "All clear. Commit allowed.", color: "text-[#00E5CC]" },
];

export function FeaturesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="bg-white py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-gray-400 mb-4">Features</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0A0A0A] tracking-tight leading-tight mb-4">
            Guarding your terminal is already too late.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">Agentinel intercepts the AI before the damage is done.</p>
        </div>

        <div ref={ref} className="flex flex-col gap-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Feature 1: AI Self-Correction (large) */}
            <Card index={0} isInView={isInView} className="lg:col-span-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#00E5CC] mb-2">AI Self-Correction Loop</p>
                <h3 className="font-serif text-2xl md:text-3xl text-[#0A0A0A] mb-2">The agent corrects itself.</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                  Agentinel feeds a structured JSON block back into the AI context so it understands
                  what was blocked and why, then self-corrects without human intervention.
                </p>
              </div>
              <div className="bg-[#0E1117] rounded-2xl p-5 font-mono text-xs overflow-x-auto border border-white/5">
                <div className="text-gray-500 mb-1">{"// Feedback injected into agent context"}</div>
                <div className="text-gray-300">{"{"}</div>
                <div className="text-gray-400 ml-4">{"\"hook\": \"PreToolUse\","}</div>
                <div className="text-gray-400 ml-4">{"\"agentinel\": {"}</div>
                <div className="text-red-400 ml-8">{"\"blocked\": true,"}</div>
                <div className="text-amber-400 ml-8">{"\"reason\": \"slopsquatting_profile\","}</div>
                <div className="text-[#00E5CC] ml-8">{"\"suggestion\": \"Did you mean react-router-dom?\""}</div>
                <div className="text-gray-400 ml-4">{"}"}</div>
                <div className="text-gray-300">{"}"}</div>
              </div>
            </Card>

            {/* Feature 2: Deep Tree Scanning (small) */}
            <Card index={1} isInView={isInView} className="lg:col-span-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#00E5CC] mb-2">Deep Tree Scanning</p>
                <h3 className="font-serif text-2xl text-[#0A0A0A] mb-2">All 67 packages. Not just one.</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  <code className="text-gray-700 bg-gray-100 px-1 rounded font-mono text-xs">npm install express</code> brings in its full dependency tree. We scan every single one.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center min-h-[160px]">
                <TreeScanSVG />
              </div>
            </Card>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Feature 3: Slopsquatting (small) */}
            <Card index={2} isInView={isInView} className="lg:col-span-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#00E5CC] mb-2">Slopsquatting Protection</p>
                <h3 className="font-serif text-2xl text-[#0A0A0A] mb-2">Heuristics that catch ghosts.</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Zero-day threats not in any DB yet? Heuristics like package age, downloads, and publisher drift help mitigate them before execution.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center min-h-[140px]">
                <ShieldScanSVG />
              </div>
            </Card>

            {/* Feature 4: CI/CD (large) with looping terminal */}
            <Card index={3} isInView={isInView} className="lg:col-span-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#00E5CC] mb-2">CI and CD Fallbacks</p>
                <h3 className="font-serif text-2xl md:text-3xl text-[#0A0A0A] mb-2">Scan any manifest. Anywhere.</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                  Gate your deployments before malicious packages slip past code review.
                  Works in GitHub Actions, GitLab CI, or any pipeline.
                </p>
              </div>
              <LoopingTerminal command="npx asen check" outputLines={CI_LINES} title="CI Pipeline -- agentinel" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
