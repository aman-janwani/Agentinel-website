"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CopyBox } from "@/components/ui/CopyBox";
import type { TerminalLine } from "@/components/shared/TerminalWindow";

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

const TABS = [
  { id: "normal" as const, label: "Normal Hook", command: "npm install react-router-v7-fake", lines: NORMAL_HOOK_LINES, title: "bash -- agentinel" },
  { id: "claude" as const, label: "Claude Code", command: "claude: npm install react-router-v7-fake", lines: CLAUDE_LINES, title: "PreToolUse -- agentinel" },
];

const TYPING_SPEED = 40;
const LINE_DELAY = 300;
const LOOP_PAUSE = 3500;

function AnimatedTerminal({ command, outputLines, title }: { command: string; outputLines: RichTerminalLine[]; title: string }) {
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

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#111318]/95 backdrop-blur-xl border border-[#2a2e38] font-mono text-[13.5px] text-left shadow-2xl relative">
      {/* Chrome */}
      <div className="flex items-center px-4 py-4 bg-[#111318]/80 border-b border-[#2a2e38]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-90" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-90" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-90" />
        </div>
        <div className="flex-1 text-center text-[13px] font-medium text-gray-500 mr-12 opacity-80">{title}</div>
      </div>
      
      {/* Body - generous fixed height to prevent any scroll or jump */}
      <div className="p-6 h-[260px] flex flex-col gap-1.5 relative">
        <div className="flex items-center gap-2 text-gray-100">
          <span className="text-[#00E5CC] select-none font-bold">$</span>
          <span>{typedCmd}</span>
          {phase === "typing" && (
            <span className="inline-block w-[2px] h-[1em] bg-gray-300 animate-pulse align-middle" />
          )}
        </div>
        <div className="flex flex-col gap-1 mt-3">
          {outputLines.slice(0, visibleLines).map((line, i) => (
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
        </div>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut", delay: i * 0.15 } }),
};

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeTabData = TABS[activeTab];

  return (
    <section className="relative w-full min-h-[calc(100vh-68px)] flex items-center overflow-hidden pb-12">
      <div className="max-w-7xl mx-auto px-6 w-full pt-8 lg:pt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT */}
        <div className="flex flex-col items-start gap-6">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <Badge variant="accent">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] inline-block" />
              v1.0.0 is Live
            </Badge>
          </motion.div>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[#0A0A0A]">
            Security layer for autonomous coding.
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Because your AI loves slopsquatting.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button as="a" href="/docs" size="lg">Read the Docs</Button>
            <CopyBox text="npm install --save-dev agentinel" />
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-0 pt-2">
            {[
              { value: "100% Local", label: "zero cloud calls" },
              { value: "Extensive DB", label: "local OSV threats" },
              { value: "Ultra-low Latency", label: "per scan" },
            ].map((s, i) => (
              <div key={s.value} className="flex items-center">
                {i > 0 && <div className="w-px h-8 bg-gray-200 mx-5" />}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#0A0A0A]">{s.value}</span>
                  <span className="text-xs text-gray-500">{s.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col items-start gap-5 relative z-10 w-full"
        >
          {/* Floating Pill Tabs */}
          <div className="flex bg-[#111318]/95 backdrop-blur-xl p-1.5 rounded-full border border-[#2a2e38] shadow-2xl ml-4 lg:ml-8 relative z-20 translate-y-2">
            <button
              onClick={() => setActiveTab(0)}
              className={`px-6 py-2 rounded-full text-[13px] font-normal transition-all duration-300 ${activeTab === 0 ? "bg-[#00E5CC] text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              Normal Hook
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`px-6 py-2 rounded-full text-[13px] font-normal transition-all duration-300 ${activeTab === 1 ? "bg-[#00E5CC] text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              Claude Code
            </button>
          </div>

          <AnimatedTerminal
            key={activeTab}
            command={activeTabData.command}
            outputLines={activeTabData.lines}
            title={activeTabData.title}
          />
        </motion.div>
      </div>
    </section>
  );
}
