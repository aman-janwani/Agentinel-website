import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuration | Agentinel Docs",
  description:
    "Complete reference for .agentinel.json configuration, warn vs strict modes, and the allowlist with audit trail.",
};

function CodeBlock({ children, lang = "" }: { children: string; lang?: string }) {
  return (
    <div className="relative my-4">
      {lang && (
        <div className="flex items-center gap-2 rounded-t-xl px-4 py-2 text-xs font-mono text-gray-400" style={{ background: "#1a1f2e" }}>
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

export default function ConfigurationPage() {
  return (
    <article className="text-gray-700 leading-relaxed font-sans">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-3">
          Core Concepts
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-5 tracking-tight">
          Configuration
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Agentinel is configured via a single{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200 text-base">
            .agentinel.json
          </code>{" "}
          file in your project root. All options are optional.
        </p>
      </div>

      <hr className="border-gray-100 mb-10" />

      {/* The config file */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          The .agentinel.json file
        </h2>
        <p className="mb-4">
          When you run{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            npx asen init
          </code>
          , a default config file is written to your project root:
        </p>
        <CodeBlock lang=".agentinel.json">{`{
  "mode": "warn",
  "allowlist": {}
}`}</CodeBlock>
        <p className="text-sm text-gray-500 mt-2">
          This file should be committed to version control so all team members
          share the same security posture.
        </p>
      </section>

      {/* Warn vs Strict mode */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Modes: warn vs strict
        </h2>
        <p className="mb-6">
          Agentinel supports two operating modes, controlled by the{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            mode
          </code>{" "}
          field.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Warn mode card */}
          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm font-bold text-gray-900">
                warn (default)
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Agentinel surfaces a warning in the agent output but does not
              block the install. The agent decides whether to proceed.
            </p>
            <CodeBlock lang=".agentinel.json">{`{
  "mode": "warn"
}`}</CodeBlock>
            <p className="text-xs text-gray-500 mt-2">
              Best for teams migrating to Agentinel gradually or using agents in
              read-heavy workflows.
            </p>
          </div>

          {/* Strict mode card */}
          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm font-bold text-gray-900">strict</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Agentinel hard-blocks the install and returns an error payload to
              the agent. The install never reaches npm.
            </p>
            <CodeBlock lang=".agentinel.json">{`{
  "mode": "strict"
}`}</CodeBlock>
            <p className="text-xs text-gray-500 mt-2">
              Recommended for production repos, CI pipelines, and any project
              with autonomous agentic access.
            </p>
          </div>
        </div>

        {/* Danger callout for strict */}
        <div className="border-l-4 border-red-400 bg-red-50 rounded-r-xl px-5 py-4">
          <p className="text-sm font-semibold text-red-800 mb-1">
            Strict mode and false positives
          </p>
          <p className="text-sm text-red-700">
            Strict mode will block packages that trigger heuristics, even if
            they are legitimately safe. Use the allowlist to carve out
            exceptions for known-good packages. See the section below.
          </p>
        </div>
      </section>

      {/* Allowlist */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          The allowlist
        </h2>
        <p className="mb-4">
          The allowlist lets you permanently approve a package so Agentinel
          never flags it again, even in strict mode. Each entry includes an
          audit trail: who approved it and why.
        </p>
        <p className="mb-4">
          Use the{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            npx asen allow
          </code>{" "}
          command to add a package with a required reason:
        </p>
        <CodeBlock>{`npx asen allow my-internal-package --reason "Internal monorepo package, pre-approved by security team"`}</CodeBlock>

        <p className="mb-3 mt-4">
          This updates your{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            .agentinel.json
          </code>{" "}
          with a structured entry:
        </p>
        <CodeBlock lang=".agentinel.json">{`{
  "mode": "strict",
  "allowlist": {
    "my-internal-package": {
      "reason": "Internal monorepo package, pre-approved by security team",
      "addedAt": "2026-07-14T09:32:11.000Z",
      "addedBy": "git:aman@company.com"
    }
  }
}`}</CodeBlock>

        {/* Info callout */}
        <div className="border-l-4 border-blue-400 bg-blue-50 rounded-r-xl px-5 py-4 mt-4">
          <p className="text-sm font-semibold text-blue-800 mb-1">
            Audit trail
          </p>
          <p className="text-sm text-blue-700">
            The{" "}
            <code className="bg-blue-100 text-blue-800 px-1 rounded font-mono">
              addedBy
            </code>{" "}
            field is populated from your local Git config (
            <code className="bg-blue-100 text-blue-800 px-1 rounded font-mono">
              git config user.email
            </code>
            ). Because this file is committed to version control, you have a
            full, reviewer-visible history of every manual allowlist decision.
          </p>
        </div>
      </section>

      {/* Schema reference table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Full config schema
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 font-semibold text-gray-700">
                  Field
                </th>
                <th className="px-5 py-3 font-semibold text-gray-700">Type</th>
                <th className="px-5 py-3 font-semibold text-gray-700">
                  Default
                </th>
                <th className="px-5 py-3 font-semibold text-gray-700">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                {
                  field: "mode",
                  type: '"warn" | "strict"',
                  def: '"warn"',
                  desc: 'Operating mode. "warn" alerts but allows. "strict" hard-blocks.',
                },
                {
                  field: "allowlist",
                  type: "Record<string, AllowlistEntry>",
                  def: "{}",
                  desc: "Map of package names to their allowlist entries.",
                },
                {
                  field: "allowlist[pkg].reason",
                  type: "string",
                  def: "required",
                  desc: "Human-readable reason the package was approved.",
                },
                {
                  field: "allowlist[pkg].addedAt",
                  type: "ISO 8601 string",
                  def: "auto",
                  desc: "Timestamp when the allowlist entry was created.",
                },
                {
                  field: "allowlist[pkg].addedBy",
                  type: "string",
                  def: "auto",
                  desc: "Git user email of the person who ran asen allow.",
                },
              ].map((row) => (
                <tr key={row.field} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-3">
                    <code className="text-pink-600 font-mono">{row.field}</code>
                  </td>
                  <td className="px-5 py-3">
                    <code className="text-gray-600 font-mono text-xs">
                      {row.type}
                    </code>
                  </td>
                  <td className="px-5 py-3">
                    <code className="text-gray-600 font-mono text-xs">
                      {row.def}
                    </code>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Next steps */}
      <section className="border border-gray-200 rounded-xl p-6 bg-gray-50">
        <h3 className="text-base font-bold text-gray-900 mb-4">See also</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/docs/architecture"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition"
          >
            OSV Architecture
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
            href="/docs/commands"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition"
          >
            CLI Reference
          </Link>
        </div>
      </section>
    </article>
  );
}
