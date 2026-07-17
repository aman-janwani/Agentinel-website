"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TerminalLine {
  text: string;
  color?: string;
  delay?: number;
}

interface TerminalWindowProps {
  className?: string;
  command: string;
  outputLines: TerminalLine[];
  animated?: boolean;
  typingSpeed?: number;
  title?: string;
}

export function TerminalWindow({
  className,
  command,
  outputLines,
  animated = true,
  typingSpeed = 45,
  title = "bash -- agentinel",
}: TerminalWindowProps) {
  const [typedCommand, setTypedCommand] = useState(animated ? "" : command);
  const [showOutput, setShowOutput] = useState(!animated);
  const [visibleLines, setVisibleLines] = useState(animated ? 0 : outputLines.length);
  const started = useRef(false);

  useEffect(() => {
    if (!animated || started.current) return;
    started.current = true;

    let i = 0;
    const typeTimer = setInterval(() => {
      i++;
      setTypedCommand(command.slice(0, i));
      if (i >= command.length) {
        clearInterval(typeTimer);
        setTimeout(() => {
          setShowOutput(true);
          let lineIdx = 0;
          const lineTimer = setInterval(() => {
            lineIdx++;
            setVisibleLines(lineIdx);
            if (lineIdx >= outputLines.length) clearInterval(lineTimer);
          }, 280);
        }, 500);
      }
    }, typingSpeed);

    return () => clearInterval(typeTimer);
  }, [animated, command, outputLines.length, typingSpeed]);

  return (
    <div
      className={cn(
        "w-full rounded-2xl overflow-hidden border border-white/8 bg-[#0E1117] font-mono text-sm text-left",
        className
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 text-center text-xs font-medium text-gray-500">
          {title}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 min-h-[200px] flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-gray-200">
          <span className="text-[#00E5CC] select-none">$</span>
          <span>
            {typedCommand}
            {animated && typedCommand.length < command.length && (
              <span className="inline-block w-[2px] h-4 bg-gray-300 animate-pulse ml-0.5 align-middle" />
            )}
          </span>
        </div>

        {showOutput && (
          <div className="mt-1 flex flex-col gap-1">
            {outputLines.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={cn("whitespace-pre-wrap leading-relaxed", line.color ?? "text-gray-400")}
              >
                {line.text}
              </div>
            ))}
            {visibleLines === outputLines.length && (
              <div className="mt-1">
                <span className="inline-block w-[2px] h-4 bg-gray-500 animate-pulse align-middle" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
