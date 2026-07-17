"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface StatItem {
  raw: string; // display value when not animating (non-numeric or with prefix/suffix)
  numeric?: number; // the number to count up to
  prefix?: string;
  suffix?: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    raw: "100%",
    numeric: 100,
    suffix: "%",
    label: "Local and Private",
  },
  {
    raw: "Massive",
    label: "Local Threat DB",
  },
  {
    raw: "Ultra-low",
    label: "Scan Latency",
  },
];

function useCountUp(to: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, to, duration]);
  return value;
}

function AnimatedStat({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.numeric ?? 0, 1800, active);

  let display: string;
  if (!active || stat.numeric === undefined) {
    display = stat.raw;
  } else {
    const formatted =
      stat.numeric >= 10000
        ? count.toLocaleString("en-US")
        : String(count);
    display = `${stat.prefix ?? ""}${formatted}${stat.suffix ?? ""}`;
  }

  return (
    <div className="flex flex-col items-center gap-2 px-8 py-6 flex-1">
      <span className="font-serif text-5xl md:text-6xl font-bold text-[#0A0A0A] tabular-nums">
        {display}
      </span>
      <span className="text-xs font-sans uppercase tracking-widest text-gray-500 mt-1 text-center">
        {stat.label}
      </span>
    </div>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white border-t border-b border-gray-100">
      <div ref={ref} className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {STATS.map((stat) => (
          <AnimatedStat key={stat.label} stat={stat} active={isInView} />
        ))}
      </div>
    </section>
  );
}
