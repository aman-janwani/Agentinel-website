import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Installation | Agentinel Docs",
  description:
    "Step-by-step guide to installing Agentinel and wiring it into your AI coding agent hooks.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="relative my-4">
      <pre
        className="rounded-xl p-4 font-mono text-sm overflow-x-auto leading-relaxed"
        style={{ background: "#0E1117", color: "#e2e8f0" }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5 mb-10">
      <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center text-sm font-bold font-sans mt-0.5">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function InstallationPage() {
  return (
    <article className="text-gray-700 leading-relaxed font-sans">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-3">
          Getting Started
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-5 tracking-tight">
          Installation
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Get Agentinel running in under two minutes. No account, API key, or
          server required.
        </p>
      </div>

      {/* No account callout */}
      <div className="border-l-4 border-blue-400 bg-blue-50 rounded-r-xl px-5 py-4 mb-10">
        <p className="text-sm font-semibold text-blue-800 mb-1">
          Fully offline setup
        </p>
        <p className="text-sm text-blue-700">
          Agentinel bundles the OSV database locally. There is no registration,
          no API key, and no outbound network call at scan time. The package
          itself is the only thing you need to install.
        </p>
      </div>

      <hr className="border-gray-100 mb-10" />

      {/* Prerequisites */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prerequisites
        </h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm">
            <svg
              className="w-4 h-4 text-emerald-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Node.js 20 or higher</strong> installed on your machine
            </span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <svg
              className="w-4 h-4 text-emerald-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              An npm-based project (
              <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
                package.json
              </code>{" "}
              must exist)
            </span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <svg
              className="w-4 h-4 text-emerald-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              At least one AI coding agent (Claude Code, Copilot CLI, Codex CLI,
              or Gemini CLI)
            </span>
          </li>
        </ul>
      </section>

      {/* Step-by-step */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Step-by-step guide
        </h2>

        <Step number={1} title="Install the package">
          <p className="mb-3 text-sm">
            Install Agentinel as a dev dependency in your project. It ships with
            the bundled OSV database, so there are no extra downloads.
          </p>
          <CodeBlock>npm install --save-dev agentinel</CodeBlock>
          <p className="text-sm text-gray-500 mt-2">
            Prefer{" "}
            <code className="bg-gray-100 text-pink-600 px-1 rounded font-mono">
              pnpm
            </code>{" "}
            or{" "}
            <code className="bg-gray-100 text-pink-600 px-1 rounded font-mono">
              yarn
            </code>
            ? Both work fine:{" "}
            <code className="bg-gray-100 text-pink-600 px-1 rounded font-mono">
              pnpm add -D agentinel
            </code>
          </p>
        </Step>

        <Step number={2} title="Run the init command">
          <p className="mb-3 text-sm">
            The{" "}
            <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
              asen init
            </code>{" "}
            command auto-detects which AI agents you have installed and wires up
            the appropriate hooks. It also installs a Git pre-commit hook to
            scan your staged lockfile on every commit.
          </p>
          <CodeBlock>npx asen init</CodeBlock>
          <p className="text-sm text-gray-500 mt-2">
            This writes{" "}
            <code className="bg-gray-100 text-pink-600 px-1 rounded font-mono">
              .claude/settings.json
            </code>{" "}
            (Claude Code),{" "}
            <code className="bg-gray-100 text-pink-600 px-1 rounded font-mono">
              .agentinel.json
            </code>
            , and a Git hook to your project root. It also installs a global PATH shim by default.
          </p>
        </Step>

        <Step number={3} title="Verify the setup">
          <p className="mb-3 text-sm">
            After a successful{" "}
            <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
              asen init
            </code>
            , you should see output similar to:
          </p>
          <CodeBlock>{`$ npx asen init
wrote .agentinel.json
registered the Claude Code PreToolUse hook in .claude/settings.json
installed the git pre-commit hook in .git/hooks
wrote shims for npm, npx, pnpm, yarn, bun in /Users/user/.agentinel/bin
added the shims to PATH in /Users/user/.zshrc
Mode is warn, so a risky package typed at the terminal will be reported, not blocked.
Open a new terminal, or run \`asen unshim\` to undo this.

agentinel is set up. New npm packages will be checked before they land.
Default mode is warn. Set "mode": "strict" in .agentinel.json to block instead.`}</CodeBlock>
          <p className="text-sm text-gray-500 mt-2">
            Only the agents you have installed will appear in the hooks list.
          </p>
        </Step>
      </section>

      {/* Optional: PATH shim */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Optional: Skipping the PATH shim
        </h2>
        <p className="mb-4 text-sm">
          By default, <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">asen init</code> installs a global PATH
          shim that intercepts all{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            npm install
          </code>{" "}
          calls system-wide before forwarding them to the real npm binary. If you only want to wire up agent hooks and git hooks, you can skip this.
        </p>
        <CodeBlock>npx asen init --no-shim</CodeBlock>
        <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-xl px-5 py-4 mt-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">
            Shim caveat
          </p>
          <p className="text-sm text-amber-700">
            The PATH shim modifies your shell profile and replaces the{" "}
            <code className="bg-amber-100 text-amber-900 px-1 rounded font-mono">
              npm
            </code>{" "}
            command globally. To remove it cleanly, run{" "}
            <code className="bg-amber-100 text-amber-900 px-1 rounded font-mono">
              npx asen unshim
            </code>
            .
          </p>
        </div>
      </section>

      {/* Optional: CI/CD */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Optional: CI/CD integration
        </h2>
        <p className="mb-4 text-sm">
          Use{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            npx asen check
          </code>{" "}
          in your pipeline to scan staged lockfile dependencies before they land
          in production. Add it to your CI step:
        </p>
        <CodeBlock>{`# GitHub Actions example
- name: Scan dependencies with Agentinel
  run: npx asen check`}</CodeBlock>
        <p className="text-sm text-gray-500 mt-2">
          The command exits with code{" "}
          <code className="bg-gray-100 text-pink-600 px-1 rounded font-mono">
            1
          </code>{" "}
          if any flagged packages are detected, causing the pipeline to fail.
        </p>
      </section>

      {/* Next steps */}
      <section className="border border-gray-200 rounded-xl p-6 bg-gray-50">
        <h3 className="text-base font-bold text-gray-900 mb-4">Next steps</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/docs/configuration"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition"
          >
            Configure Agentinel
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
