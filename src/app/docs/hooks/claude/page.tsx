import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Code Hook | Agentinel Docs",
  description:
    "How Agentinel integrates with Claude Code via the PreToolUse hook to intercept npm install commands before execution.",
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

export default function ClaudeHookPage() {
  return (
    <article className="text-gray-700 leading-relaxed font-sans">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-3">
          Hooks and Integrations
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-5 tracking-tight">
          Claude Code
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Agentinel integrates with Claude Code via its{" "}
          <strong>PreToolUse</strong> lifecycle hook, intercepting every{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200 text-base">
            Bash
          </code>{" "}
          tool call that contains an npm install command before it executes.
        </p>
      </div>

      <hr className="border-gray-100 mb-10" />

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How the hook works
        </h2>
        <p className="mb-4">
          Claude Code supports a hooks system defined in a{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            hooks.json
          </code>{" "}
          file placed in your project root. Hooks can run before or after
          specific tool calls. Agentinel registers as a{" "}
          <strong>PreToolUse</strong> hook scoped to the{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            Bash
          </code>{" "}
          tool.
        </p>
        <p className="mb-4">
          When Claude attempts to run any Bash command, Claude Code passes the
          full command string to Agentinel&apos;s hook runner. If the command
          contains an{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            npm install
          </code>{" "}
          or{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            npm i
          </code>{" "}
          call, Agentinel extracts the package names, runs the OSV scan, and
          returns a decision.
        </p>
        <p>
          Commands that do not contain an npm install are passed through
          immediately with zero overhead.
        </p>
      </section>

      {/* hooks.json config */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Generated hooks.json
        </h2>
        <p className="mb-3">
          Running{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            npx asen init
          </code>{" "}
          writes the following{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            hooks.json
          </code>{" "}
          to your project root:
        </p>
        <CodeBlock lang="hooks.json">{`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "npx agentinel-hook"
          }
        ]
      }
    ]
  }
}`}</CodeBlock>

        <div className="border-l-4 border-blue-400 bg-blue-50 rounded-r-xl px-5 py-4 mt-4">
          <p className="text-sm font-semibold text-blue-800 mb-1">
            What is npx agentinel-hook?
          </p>
          <p className="text-sm text-blue-700">
            This is a thin binary shipped with the Agentinel package that reads
            the tool call payload from stdin, runs the scan, and writes the
            decision payload to stdout. Claude Code reads the stdout and decides
            whether to proceed.
          </p>
        </div>
      </section>

      {/* Block output example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What a block looks like in Claude Code
        </h2>
        <p className="mb-3">
          When Agentinel detects a malicious or hallucinated package, it returns
          the following structured payload to Claude Code via stdout:
        </p>
        <CodeBlock lang="JSON (hook response)">{`{
  "hookEvent": "PreToolUse",
  "action": "BLOCK",
  "reason": "agentinel blocked react-router-v7-beta: Package does not exist on npm (hallucination)."
}`}</CodeBlock>
        <p className="mb-4">
          Claude Code receives this payload and surfaces it to the user in its
          interface. The Bash command is not executed. Claude will typically
          respond by explaining that the package was blocked and suggesting
          alternatives.
        </p>

        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-400 ml-2 font-mono">
              Claude Code terminal
            </span>
          </div>
          <pre
            className="p-4 text-sm font-mono leading-relaxed overflow-x-auto"
            style={{ background: "#0E1117", color: "#e2e8f0" }}
          >
            <code>
              <span style={{ color: "#f87171" }}>
                [agentinel] BLOCKED: react-router-v7-beta
              </span>
              {"\n"}
              <span style={{ color: "#94a3b8" }}>
                Reason: Package does not exist on npm (hallucination).
              </span>
              {"\n"}
              <span style={{ color: "#94a3b8" }}>
                The install command was not executed.
              </span>
              {"\n\n"}
              <span style={{ color: "#4ade80" }}>
                Claude: I was trying to install react-router-v7-beta but
                Agentinel blocked it
              </span>
              {"\n"}
              <span style={{ color: "#4ade80" }}>
                because this package does not exist. The correct package is
                react-router.
              </span>
            </code>
          </pre>
        </div>
      </section>

      {/* Warn mode output */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Warn mode payload
        </h2>
        <p className="mb-3">
          In{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            warn
          </code>{" "}
          mode, the action is{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            WARN
          </code>{" "}
          rather than{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            BLOCK
          </code>
          , and the install proceeds:
        </p>
        <CodeBlock lang="JSON (warn response)">{`{
  "hookEvent": "PreToolUse",
  "action": "WARN",
  "reason": "agentinel flagged some-new-package: Low download count (847). Proceeding."
}`}</CodeBlock>
      </section>

      {/* Agent-specific notes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Claude Code specific notes
        </h2>
        <ul className="space-y-3">
          {[
            "The hooks.json file must be in the root of your project for Claude Code to detect it. Global hooks are not supported.",
            "The hook runner must exit with code 0 for Claude Code to read its stdout. Agentinel always exits cleanly.",
            "Claude Code passes the full Bash command string, not a parsed argument list. Agentinel uses regex to extract npm package names from the command.",
            "Multi-package installs (e.g. npm install a b c) are fully supported; each package is scanned individually.",
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
            href="/docs/hooks/gemini"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition"
          >
            Gemini CLI
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
