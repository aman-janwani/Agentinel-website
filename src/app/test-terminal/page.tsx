"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── Shared Types & Data ───────────────────────────────────────────────────

type RichToken = { text: string; color: string };
type RichTerminalLine = { text: string | RichToken[]; color?: string };

const NORMAL_HOOK_LINES: RichTerminalLine[] = [
  { text: "" },
  { text: "⚠️ agentinel warning: react-router-v7-fake is 1 day old and has 4 downloads.", color: "text-amber-400 font-semibold" },
  { text: "" },
  { text: "This matches the profile of a slopsquatting or malicious package.", color: "text-amber-400" },
  { text: "" },
  { text: "[Agentinel] Install blocked. Context fed back to AI agent.", color: "text-[#FF5F56] font-bold" },
];

const CLAUDE_LINES: RichTerminalLine[] = [
  { text: "// PreToolUse hook triggered", color: "text-gray-500" },
  { text: "{" },
  { text: [
      { text: '  "hookEvent"', color: 'text-gray-400' },
      { text: ': ', color: 'text-gray-300' },
      { text: '"PreToolUse"', color: 'text-[#00E5CC]' },
      { text: ',', color: 'text-gray-300' }
    ] 
  },
  { text: [
      { text: '  "action"', color: 'text-gray-400' },
      { text: ': ', color: 'text-gray-300' },
      { text: '"BLOCK"', color: 'text-[#FF5F56]' },
      { text: ',', color: 'text-gray-300' }
    ] 
  },
  { text: [
      { text: '  "reason"', color: 'text-gray-400' },
      { text: ': ', color: 'text-gray-300' },
      { text: '"agentinel blocked \'react-router-v7-fake\': Package does not exist on npm (hallucination)."', color: 'text-amber-400' }
    ] 
  },
  { text: "}" },
];

const TYPING_SPEED = 40;
const LINE_DELAY = 300;
const LOOP_PAUSE = 3500;

// ── Helper Hook for Animation ─────────────────────────────────────────────

function useTerminalAnimation(command: string, outputLines: RichTerminalLine[]) {
  const [typedCmd, setTypedCmd] = useState("");
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "resetting">("typing");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTypedCmd("");
    setVisibleLines(0);
    setPhase("typing");
  }, [command]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (phase === "typing") {
      if (typedCmd.length < command.length) {
        timerRef.current = setTimeout(() => {
          setTypedCmd(command.slice(0, typedCmd.length + 1));
        }, TYPING_SPEED);
      } else {
        timerRef.current = setTimeout(() => setPhase("output"), 600);
      }
    } else if (phase === "output") {
      if (visibleLines < outputLines.length) {
        timerRef.current = setTimeout(() => setVisibleLines((v) => v + 1), LINE_DELAY);
      } else {
        timerRef.current = setTimeout(() => setPhase("resetting"), LOOP_PAUSE);
      }
    } else if (phase === "resetting") {
      setTypedCmd("");
      setVisibleLines(0);
      setPhase("typing");
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, typedCmd, visibleLines, command, outputLines.length]);

  return { typedCmd, visibleLines, phase };
}

// ── Line Renderer ─────────────────────────────────────────────────────────

function RenderLines({ lines, visibleCount }: { lines: RichTerminalLine[], visibleCount: number }) {
  return (
    <>
      {lines.slice(0, visibleCount).map((line, i) => (
        <div key={i} className={`whitespace-pre-wrap leading-relaxed ${typeof line.text === 'string' && line.color ? line.color : 'text-gray-300'}`}>
          {typeof line.text === 'string' ? (
            line.text
          ) : (
            line.text.map((token, j) => (
              <span key={j} className={token.color}>{token.text}</span>
            ))
          )}
        </div>
      ))}
    </>
  );
}

// ── Option 1: Floating Glassmorphism Tabs ─────────────────────────────────

function Option1FloatingTabs() {
  const [activeTab, setActiveTab] = useState<"normal" | "claude">("normal");
  
  const cmd = activeTab === "normal" ? "npm install react-router-v7-fake" : "claude: npm install react-router-v7-fake";
  const lines = activeTab === "normal" ? NORMAL_HOOK_LINES : CLAUDE_LINES;
  const { typedCmd, visibleLines, phase } = useTerminalAnimation(cmd, lines);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
      {/* Floating Pill Tabs */}
      <div className="flex bg-[#181a20]/80 backdrop-blur-md p-1.5 rounded-full border border-gray-800 shadow-xl relative z-10">
        <button
          onClick={() => setActiveTab("normal")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === "normal" ? "bg-[#00E5CC]/10 text-[#00E5CC] border border-[#00E5CC]/20 shadow-[0_0_15px_rgba(0,229,204,0.1)]" : "text-gray-500 hover:text-gray-300 border border-transparent"}`}
        >
          Normal Hook
        </button>
        <button
          onClick={() => setActiveTab("claude")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === "claude" ? "bg-[#00E5CC]/10 text-[#00E5CC] border border-[#00E5CC]/20 shadow-[0_0_15px_rgba(0,229,204,0.1)]" : "text-gray-500 hover:text-gray-300 border border-transparent"}`}
        >
          Claude Code
        </button>
      </div>

      {/* Terminal Window */}
      <div className="w-full rounded-2xl overflow-hidden bg-[#111318]/90 backdrop-blur-xl border border-gray-800 font-mono text-[13.5px] text-left shadow-2xl relative">
        <div className="flex items-center px-4 py-4 border-b border-gray-800/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
          </div>
        </div>
        <div className="p-6 h-[260px] flex flex-col gap-1.5 relative">
          <div className="flex items-center gap-2 text-gray-100">
            <span className="text-[#00E5CC] select-none font-bold">$</span>
            <span>{typedCmd}</span>
            {phase === "typing" && <span className="inline-block w-[2px] h-[1em] bg-gray-300 animate-pulse align-middle" />}
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <RenderLines lines={lines} visibleCount={visibleLines} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Option 3: Inline Split View ───────────────────────────────────────────

function Option3SplitView() {
  const { typedCmd: typed1, visibleLines: vis1, phase: phase1 } = useTerminalAnimation("npm install react-router-v7-fake", NORMAL_HOOK_LINES);
  const { typedCmd: typed2, visibleLines: vis2, phase: phase2 } = useTerminalAnimation("claude: npm install react-router-v7-fake", CLAUDE_LINES);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="w-full rounded-2xl overflow-hidden bg-[#0A0A0A] border border-gray-800 font-mono text-[13px] text-left shadow-2xl flex flex-col">
        {/* Unified Chrome */}
        <div className="flex items-center px-4 py-3 bg-[#111318] border-b border-gray-800">
          <div className="flex gap-2 w-24">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 text-center text-gray-500 font-sans text-xs flex justify-center gap-8">
            <span className="opacity-60">Human vs AI Execution</span>
          </div>
          <div className="w-24" />
        </div>

        {/* Split Content */}
        <div className="flex h-[280px] divide-x divide-gray-800/60">
          {/* Left: Normal */}
          <div className="flex-1 p-6 flex flex-col gap-1.5 relative bg-[#0D0F14]">
            <div className="absolute top-3 right-4 text-[10px] text-gray-600 uppercase tracking-widest font-sans font-semibold">Native Shell</div>
            <div className="flex items-center gap-2 text-gray-100 mt-2">
              <span className="text-gray-500 select-none font-bold">~</span>
              <span>{typed1}</span>
              {phase1 === "typing" && <span className="inline-block w-[2px] h-[1em] bg-gray-300 animate-pulse align-middle" />}
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <RenderLines lines={NORMAL_HOOK_LINES} visibleCount={vis1} />
            </div>
          </div>

          {/* Right: Claude */}
          <div className="flex-1 p-6 flex flex-col gap-1.5 relative bg-[#0D0F14]">
            <div className="absolute top-3 right-4 text-[10px] text-[#00E5CC] uppercase tracking-widest font-sans font-semibold">Agent Hook</div>
            <div className="flex items-center gap-2 text-gray-100 mt-2">
              <span className="text-[#00E5CC] select-none font-bold">~</span>
              <span>{typed2}</span>
              {phase2 === "typing" && <span className="inline-block w-[2px] h-[1em] bg-gray-300 animate-pulse align-middle" />}
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <RenderLines lines={CLAUDE_LINES} visibleCount={vis2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Option 4: Minimalist Command Palette ──────────────────────────────────

function Option4CommandPalette() {
  const [isClaude, setIsClaude] = useState(false);
  const cmd = isClaude ? "claude: npm install react-router-v7-fake" : "npm install react-router-v7-fake";
  const lines = isClaude ? CLAUDE_LINES : NORMAL_HOOK_LINES;
  const { typedCmd, visibleLines, phase } = useTerminalAnimation(cmd, lines);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="w-full rounded-2xl overflow-hidden bg-[#0F1115] border border-gray-800 font-mono text-[14px] text-left shadow-2xl relative ring-1 ring-white/5">
        
        {/* Command Input Area (No standard Mac dots) */}
        <div className="flex items-center px-6 py-5 bg-[#14161C] border-b border-gray-800/80">
          <svg className="w-5 h-5 text-[#00E5CC] mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div className="flex-1 text-gray-100">
            <span>{typedCmd}</span>
            {phase === "typing" && <span className="inline-block w-[2px] h-[1.1em] bg-[#00E5CC] animate-pulse align-middle ml-1" />}
          </div>
          
          {/* Toggle pill instead of tabs */}
          <button 
            onClick={() => setIsClaude(!isClaude)}
            className="ml-4 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs text-gray-400 font-sans font-medium transition-colors border border-white/5 flex items-center gap-2"
          >
            <span>Run via:</span>
            <span className={isClaude ? "text-[#00E5CC]" : "text-white"}>{isClaude ? "Claude" : "Shell"}</span>
          </button>
        </div>
        
        {/* Output Body */}
        <div className="p-6 h-[240px] flex flex-col gap-1.5 bg-[#0F1115]">
          {visibleLines > 0 && (
            <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
              <RenderLines lines={lines} visibleCount={visibleLines} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ── Page Assembly ─────────────────────────────────────────────────────────

export default function TestTerminalPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans pb-32">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 border-b border-white/10 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif text-white mb-2">Terminal Design Options</h1>
            <p className="text-gray-400 text-sm">Reviewing options 1, 3, and 4</p>
          </div>
          <Link href="/" className="text-sm text-[#00E5CC] hover:underline">
            ← Back to Home
          </Link>
        </div>

        <div className="space-y-32">
          {/* OPTION 1 */}
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">Option 1: Floating Glassmorphism Tabs</h2>
              <p className="text-gray-500 text-sm">Tabs are detached pills floating above the terminal window.</p>
            </div>
            <Option1FloatingTabs />
          </section>

          {/* OPTION 3 */}
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">Option 3: Inline Split View</h2>
              <p className="text-gray-500 text-sm">No tabs. Wide 50/50 split showing native terminal and AI hook side-by-side simultaneously.</p>
            </div>
            <Option3SplitView />
          </section>

          {/* OPTION 4 */}
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-xl font-bold text-white mb-2">Option 4: Minimalist Command Palette</h2>
              <p className="text-gray-500 text-sm">Raycast-style search bar. No Mac window dots. Clean toggle button inside the input bar.</p>
            </div>
            <Option4CommandPalette />
          </section>
        </div>
      </div>
    </div>
  );
}
