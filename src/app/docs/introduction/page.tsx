import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction | Agentinel Docs",
  description:
    "Learn what Agentinel is, the problem it solves, and how it protects your development environment from malicious npm packages installed by AI agents.",
};

export default function IntroductionPage() {
  return (
    <article className="text-gray-700 leading-relaxed font-sans">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-3">
          Getting Started
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-5 tracking-tight">
          Introduction
        </h1>
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
          A zero-config, locally-run security guardrail for AI coding agents.
          No account. No API key. No network calls.
        </p>
      </div>

      <hr className="border-gray-100 mb-10" />

      {/* What is Agentinel */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is Agentinel?
        </h2>
        <p className="mb-4">
          Agentinel is an open-source security tool that sits between your AI
          coding agent and your package manager. When an agent like Claude Code,
          GitHub Copilot, or Gemini CLI decides to install an npm package,
          Agentinel intercepts that decision before{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200">
            npm
          </code>{" "}
          ever executes it.
        </p>
        <p className="mb-4">
          It checks the requested package against a bundled local copy of the{" "}
          <strong>Open Source Vulnerabilities (OSV)</strong> database, which
          covers 216,000+ known malicious or vulnerable packages. If the package
          is flagged, Agentinel blocks it, logs the reason, and returns a
          structured payload back to the agent.
        </p>
        <p>
          Everything runs entirely offline on your machine. There is no server,
          no telemetry, and no subscription.
        </p>
      </section>

      {/* The Problem */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          The problem: slopsquatting
        </h2>
        <p className="mb-4">
          Large language models are powerful code generators, but they have a
          well-documented tendency to hallucinate package names. An LLM might
          confidently generate an install command for a package that does not
          exist on the npm registry, like{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200">
            react-router-v7-beta
          </code>{" "}
          or{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200">
            express-middleware-cors-fix
          </code>
          .
        </p>
        <p className="mb-4">
          This creates a class of attack called <strong>slopsquatting</strong>:
          an attacker pre-registers commonly hallucinated package names on npm.
          When an AI agent installs that package, the attacker&apos;s malicious{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200">
            preinstall
          </code>{" "}
          scripts execute immediately, compromising your development environment
          before you ever see the output.
        </p>

        {/* Warning callout */}
        <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-xl px-5 py-4 mb-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">
            Why AI agents are uniquely vulnerable
          </p>
          <p className="text-sm text-amber-700">
            Traditional developers read package names before running install
            commands. Agentic workflows execute install commands autonomously,
            without a human reviewing each one. This removes the last line of
            defense.
          </p>
        </div>
      </section>

      {/* Fail Open Philosophy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          The &quot;Fail Open&quot; philosophy
        </h2>
        <p className="mb-4">
          Agentinel is designed around one core principle: it must never
          silently break your workflow. If for any reason Agentinel cannot scan
          a package (corrupted DB, unexpected error), it will{" "}
          <strong>fail open</strong>, meaning the install is allowed to proceed
          rather than cryptically blocking your agent.
        </p>
        <p className="mb-4">
          This is an intentional trade-off. We believe a security tool that
          breaks builds erodes trust and gets disabled. Agentinel should be
          invisible when things are fine and loud when there is a real threat.
        </p>

        {/* Info callout */}
        <div className="border-l-4 border-blue-400 bg-blue-50 rounded-r-xl px-5 py-4">
          <p className="text-sm font-semibold text-blue-800 mb-1">
            What &quot;fail open&quot; means in practice
          </p>
          <p className="text-sm text-blue-700">
            The scanner wraps all OSV lookups and heuristic checks in a
            try-catch. Any internal exception yields an{" "}
            <code className="bg-blue-100 text-blue-800 px-1 rounded font-mono">
              ALLOW
            </code>{" "}
            decision with a warning logged to stderr, not a silent failure.
          </p>
        </div>
      </section>

      {/* Who is it for */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Who is Agentinel for?
        </h2>
        <p className="mb-6">
          Agentinel is for any developer who uses an AI coding agent that can
          autonomously run shell commands. This includes:
        </p>
        <ul className="space-y-3 mb-6">
          {[
            {
              agent: "Claude Code",
              desc: "Anthropic's terminal coding agent. Hooks into PreToolUse events via hooks.json.",
            },
            {
              agent: "GitHub Copilot CLI",
              desc: "Microsoft's command-line Copilot. Hooks into beforeCommand lifecycle.",
            },
            {
              agent: "OpenAI Codex CLI",
              desc: "OpenAI's autonomous CLI agent. Hooks into preExec events.",
            },
            {
              agent: "Gemini CLI",
              desc: "Google's Gemini terminal agent. Hooks into preToolCall events.",
            },
          ].map((item) => (
            <li key={item.agent} className="flex items-start gap-3">
              <span className="mt-1 w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
              <span>
                <span className="font-semibold text-gray-900">
                  {item.agent}:
                </span>{" "}
                {item.desc}
              </span>
            </li>
          ))}
        </ul>
        <p>
          If you are running any of these tools with autonomous install
          permissions, Agentinel is the fastest way to add a meaningful security
          layer without changing your development workflow.
        </p>
      </section>

      {/* Quick stats */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "100% Local",
              desc: "All checks run on-device. Zero network calls at scan time.",
              color: "border-cyan-400 bg-cyan-50",
              textColor: "text-cyan-700",
            },
            {
              label: "Extensive DB",
              desc: "A massive list of malicious and vulnerable packages indexed.",
              color: "border-emerald-400 bg-emerald-50",
              textColor: "text-emerald-700",
            },
            {
              label: "Ultra-low latency",
              desc: "Intercepts are incredibly fast to minimize slowdown.",
              color: "border-violet-400 bg-violet-50",
              textColor: "text-violet-700",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`border-l-4 rounded-r-xl px-5 py-4 ${stat.color}`}
            >
              <p className={`text-lg font-bold mb-1 ${stat.textColor}`}>
                {stat.label}
              </p>
              <p className="text-sm text-gray-600">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next steps */}
      <section className="border border-gray-200 rounded-xl p-6 bg-gray-50">
        <h3 className="text-base font-bold text-gray-900 mb-4">Next steps</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/docs/installation"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition"
          >
            Install Agentinel
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <Link
            href="/docs/architecture"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition"
          >
            OSV Architecture
          </Link>
        </div>
      </section>
    </article>
  );
}
