"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TerminalLine {
  text: string;
  color?: string;
}

interface TerminalWindowProps {
  className?: string;
  command: string;
  outputLines: TerminalLine[];
  animated?: boolean;
}

export function TerminalWindow({ className, command, outputLines, animated = true }: TerminalWindowProps) {
  const [typedCommand, setTypedCommand] = useState(animated ? "" : command);
  const [showOutput, setShowOutput] = useState(!animated);
  const [visibleLines, setVisibleLines] = useState<number>(animated ? 0 : outputLines.length);

  useEffect(() => {
    if (!animated) return;

    let currentLength = 0;
    const typeInterval = setInterval(() => {
      currentLength++;
      setTypedCommand(command.slice(0, currentLength));
      if (currentLength >= command.length) {
        clearInterval(typeInterval);
        
        // After typing command, wait a bit then show output
        setTimeout(() => {
          setShowOutput(true);
          let lineIndex = 0;
          const showLineInterval = setInterval(() => {
            lineIndex++;
            setVisibleLines(lineIndex);
            if (lineIndex >= outputLines.length) {
              clearInterval(showLineInterval);
            }
          }, 300); // ms between output lines
        }, 400);
      }
    }, 50); // typing speed

    return () => clearInterval(typeInterval);
  }, [command, animated, outputLines.length]);

  return (
    <div className={cn(
      "w-full rounded-2xl overflow-hidden border border-white/10",
      "bg-black/90 backdrop-blur-2xl shadow-2xl shadow-cyan-900/20",
      "font-mono text-sm sm:text-base selection:bg-cyan-500/30 text-left",
      className
    )}>
      {/* Top Bar */}
      <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
        </div>
        <div className="flex-1 text-center text-xs font-medium text-gray-500">
          bash — agentinel
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 text-gray-300 min-h-[220px] flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400">$</span>
          <span>
            {typedCommand}
            {animated && typedCommand.length < command.length && (
              <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1 align-middle"></span>
            )}
          </span>
        </div>

        {showOutput && (
          <div className="mt-2 flex flex-col gap-1">
            {outputLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={cn("whitespace-pre-wrap leading-relaxed", line.color)}>
                {line.text}
              </div>
            ))}
            {/* Blinking cursor at the end */}
            {visibleLines === outputLines.length && (
              <div className="mt-2">
                <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse align-middle"></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
