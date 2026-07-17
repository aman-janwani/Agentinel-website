"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00E5CC]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 404 heading */}
      <div className="relative z-10 mb-2">
        <p className="text-[10rem] md:text-[14rem] leading-none font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-700 select-none">
          404
        </p>
      </div>

      <p className="relative z-10 text-gray-300 text-xl md:text-2xl max-w-md mb-8">
        Your AI agent hallucinated this URL.
        <br />
        <span className="text-gray-500 text-sm md:text-base mt-2 block">
          We&apos;ve seen worse. It once tried to install{" "}
          <code className="text-red-400 bg-white/5 px-1.5 py-0.5 rounded font-mono">
            react-router-v7-fake
          </code>
          .
        </span>
      </p>

      {/* CTA buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="px-8 py-3.5 bg-[#00E5CC] text-black text-sm font-semibold rounded-full hover:bg-[#00ccb4] transition-colors"
        >
          Take me home
        </Link>
        <Link
          href="/docs"
          className="px-8 py-3.5 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors"
        >
          Read the Docs
        </Link>
      </div>
    </div>
  );
}
