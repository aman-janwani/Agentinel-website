"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyBoxProps {
  text: string;
  className?: string;
}

export function CopyBox({ text, className }: CopyBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-full font-mono text-sm text-gray-700 shadow-sm",
        className
      )}
    >
      <span className="text-gray-400 select-none">$</span>
      <span className="flex-1">{text}</span>
      <button
        onClick={handleCopy}
        title="Copy to clipboard"
        className="text-gray-400 hover:text-black transition-colors cursor-pointer shrink-0"
      >
        {copied ? (
          <Check className="w-4 h-4 text-teal-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
