import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gemini CLI Hook | Agentinel Docs",
  description:
    "How Agentinel integrates with Google Gemini CLI via the preToolCall hook to intercept npm install commands.",
};

function CodeBlock({ children, lang = "" }: { children: string; lang?: string }) {
  return (
    <div className="relative my-4">
      {lang && (
        <div
          className="flex items-center gap-2 rounded-t-xl px-4 py-2 text-xs font-mono text-gray-400"
          style={{ background: "#1a1f2e" }}
        >
          {lang}
        </div>
      )}
      <pre
        className={`${lang ? "rounded-b-xl" : "rounded-xl"} p-4 font-mono text-sm overflow-x-auto leading-relaxed`}
        style={{ background: "#0E1117", color: "#e2e8f0" }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function GeminiHookPage() {
  return (
    <article className="text-gray-700 leading-relaxed font-sans">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-3">
          Hooks and Integrations
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-5 tracking-tight">
          Gemini CLI
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Agentinel integrates with Google&apos;s Gemini CLI via its{" "}
          <strong>preToolCall</strong> lifecycle hook, which fires before any
          tool invocation, including shell command execution.
        </p>
      </div>

      <hr className="border-gray-100 mb-10" />

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How the hook works
        </h2>
        <p className="mb-4">
          Gemini CLI uses a tool-call architecture where all agent actions,
          including running shell commands, are modeled as structured tool
          invocations. The{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            preToolCall
          </code>{" "}
          hook is called before any tool is executed, with the tool name and
          arguments available in the hook context.
        </p>
        <p className="mb-4">
          Agentinel registers as the{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            preToolCall
          </code>{" "}
          handler scoped to the{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            run_shell_command
          </code>{" "}
          tool type. When it detects an npm install, it extracts the package
          names, runs the OSV scan, and returns a structured decision payload.
        </p>
        <p>
          If the decision is{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            BLOCK
          </code>{" "}
          in strict mode, Agentinel exits with code 1 and Gemini CLI cancels the
          tool call, returning the block reason to the model context so Gemini
          can self-correct.
        </p>
      </section>

      {/* Generated config */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Generated Gemini config
        </h2>
        <p className="mb-3">
          Running{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            npx asen init
          </code>{" "}
          writes to{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            .gemini/config.json
          </code>{" "}
          in your project root:
        </p>
        <CodeBlock lang=".gemini/config.json">{`{
  "hooks": {
    "preToolCall": {
      "matcher": "run_shell_command",
      "command": "npx agentinel-hook --agent gemini"
    }
  }
}`}</CodeBlock>
        <p className="text-sm text-gray-500 mt-2">
          The{" "}
          <code className="bg-gray-100 text-pink-600 px-1 rounded font-mono">
            matcher
          </code>{" "}
          field scopes the hook to only shell command tool calls. Other Gemini
          tool types (file operations, web search, etc.) are not intercepted.
        </p>
      </section>

      {/* Block output */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What a block looks like in Gemini CLI
        </h2>
        <p className="mb-3">
          When a package is blocked, Agentinel returns a structured payload and
          Gemini CLI surfaces it in its output before returning the block reason
          to the model:
        </p>
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
          <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-400 ml-2 font-mono">
              Gemini CLI
            </span>
          </div>
          <pre
            className="p-4 text-sm font-mono leading-relaxed overflow-x-auto"
            style={{ background: "#0E1117", color: "#e2e8f0" }}
          >
            <code>
              <span style={{ color: "#94a3b8" }}>
                Tool call: run_shell_command
              </span>
              {"\n"}
              <span style={{ color: "#94a3b8" }}>
                {"  "}args: {`{ "command": "npm install axios-extended-pro" }`}
              </span>
              {"\n\n"}
              <span style={{ color: "#f87171" }}>
                [agentinel] BLOCKED: axios-extended-pro
              </span>
              {"\n"}
              <span style={{ color: "#94a3b8" }}>
                Reason: Package does not exist on npm (hallucination).
              </span>
              {"\n"}
              <span style={{ color: "#f87171" }}>
                preToolCall hook exited with code 1. Tool call cancelled.
              </span>
              {"\n\n"}
              <span style={{ color: "#60a5fa" }}>
                Gemini: The package axios-extended-pro was blocked by Agentinel
                because it doesn&apos;t
              </span>
              {"\n"}
              <span style={{ color: "#60a5fa" }}>
                exist on npm. You likely want axios instead.
              </span>
            </code>
          </pre>
        </div>

        <CodeBlock lang="JSON (preToolCall payload)">{`{
  "hookEvent": "preToolCall",
  "tool": "run_shell_command",
  "action": "BLOCK",
  "package": "axios-extended-pro",
  "reason": "agentinel blocked axios-extended-pro: Package does not exist on npm (hallucination)."
}`}</CodeBlock>
      </section>

      {/* Self-correction note */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Gemini model self-correction
        </h2>
        <p className="mb-4">
          One advantage of the Gemini CLI&apos;s tool-call architecture is that
          the block reason is automatically injected back into the model&apos;s
          context. This means Gemini will attempt to self-correct by looking up
          the correct package name, rather than simply stopping.
        </p>
        <div className="border-l-4 border-blue-400 bg-blue-50 rounded-r-xl px-5 py-4">
          <p className="text-sm font-semibold text-blue-800 mb-1">
            Self-correction loop
          </p>
          <p className="text-sm text-blue-700">
            When Agentinel returns a{" "}
            <code className="bg-blue-100 text-blue-800 px-1 rounded font-mono">
              BLOCK
            </code>{" "}
            with a reason of &quot;does not exist on npm&quot;, Gemini
            typically responds by searching for the correct package name and
            retrying with a corrected install command, which Agentinel then
            re-scans.
          </p>
        </div>
      </section>

      {/* Agent-specific notes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Gemini CLI specific notes
        </h2>
        <ul className="space-y-3">
          {[
            "Gemini CLI passes the full tool call arguments as a JSON object. Agentinel reads the command field and parses it for npm install calls.",
            "The preToolCall hook fires for every tool call, not just shell commands. The matcher field in the config limits it to run_shell_command only.",
            "Gemini CLI is authenticated via Google Cloud or an API key. Agentinel does not interact with any Google authentication.",
            "In warn mode, the block reason is still injected into context, but the tool call is allowed to proceed. Gemini may choose to retry or continue.",
          ].map((note, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1 w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Next steps */}
      <section className="border border-gray-200 rounded-xl p-6 bg-gray-50">
        <h3 className="text-base font-bold text-gray-900 mb-4">
          Other integrations
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/hooks/claude"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition"
          >
            Claude Code
          </Link>
          <Link
            href="/docs/hooks/codex"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition"
          >
            Codex CLI
          </Link>
          <Link
            href="/docs/hooks/copilot"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition"
          >
            Copilot CLI
          </Link>
          <Link
            href="/docs/commands"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition"
          >
            CLI Reference
          </Link>
        </div>
      </section>
    </article>
  );
}
