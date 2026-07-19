import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLI Reference | Agentinel Docs",
  description:
    "Complete reference for all Agentinel CLI commands: asen init, asen check, asen allow, asen unshim, and more.",
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

interface CommandProps {
  name: string;
  usage: string;
  description: string;
  flags?: { flag: string; description: string }[];
  exitCodes?: { code: string; meaning: string }[];
  output: string;
  outputLang?: string;
  notes?: string[];
}

function CommandSection({
  name,
  usage,
  description,
  flags,
  exitCodes,
  output,
  outputLang = "Output",
  notes,
}: CommandProps) {
  return (
    <section className="mb-16 scroll-mt-8" id={name}>
      <div className="flex items-center gap-3 mb-4">
        <code className="text-sm bg-gray-900 text-cyan-400 px-3 py-1.5 rounded-lg font-mono border border-gray-800">
          {name}
        </code>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">{usage}</h2>
      <p className="text-gray-600 mb-5">{description}</p>

      {flags && flags.length > 0 && (
        <>
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">
            Flags
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-5">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-5 py-3 font-semibold text-gray-700 w-1/3">
                    Flag
                  </th>
                  <th className="px-5 py-3 font-semibold text-gray-700">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {flags.map((f) => (
                  <tr key={f.flag} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3">
                      <code className="text-pink-600 font-mono">{f.flag}</code>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">
        Example output
      </h3>
      <CodeBlock lang={outputLang}>{output}</CodeBlock>

      {exitCodes && exitCodes.length > 0 && (
        <>
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3 mt-5">
            Exit codes
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-5">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-5 py-3 font-semibold text-gray-700 w-24">
                    Code
                  </th>
                  <th className="px-5 py-3 font-semibold text-gray-700">
                    Meaning
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {exitCodes.map((ec) => (
                  <tr key={ec.code} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3">
                      <code className="text-pink-600 font-mono">{ec.code}</code>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{ec.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {notes && notes.length > 0 && (
        <>
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3 mt-2">
            Notes
          </h3>
          <ul className="space-y-2">
            {notes.map((note, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default function CommandsPage() {
  return (
    <article className="text-gray-700 leading-relaxed font-sans">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-3">
          CLI Reference
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-5 tracking-tight">
          All Commands
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          You can run Agentinel using{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200 text-base">
            npx agentinel &lt;command&gt;
          </code>
          . If you have installed{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200 text-base">
            agentinel
          </code>{" "}
          globally or locally, you can use the shorter alias:{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200 text-base">
            npx asen &lt;command&gt;
          </code>{" "}
          (or just{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200 text-base">
            asen &lt;command&gt;
          </code>{" "}
          if global).
        </p>
      </div>

      {/* Quick nav */}
      <div className="border border-gray-200 rounded-xl p-5 mb-10 bg-gray-50">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Commands
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "asen init",
            "asen init --no-shim",
            "asen check",
            "asen check [pkg]",
            "asen allow",
            "asen mode",
            "asen uninstall",
            "asen unshim",
          ].map((cmd) => (
            <a
              key={cmd}
              href={`#${cmd.replace(/\s/g, "-").replace(/[[\]]/g, "")}`}
              className="inline-block px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-mono text-gray-700 hover:border-cyan-300 hover:text-cyan-700 transition"
            >
              {cmd}
            </a>
          ))}
        </div>
      </div>

      <hr className="border-gray-100 mb-12" />

      {/* asen init */}
      <CommandSection
        name="asen init"
        usage="npx asen init"
        description="Initializes Agentinel in your project. Auto-detects installed AI agents and writes the appropriate hook configurations. Also installs a Git pre-commit hook that scans your staged lockfile on every commit."
        flags={[
          {
            flag: "--no-shim",
            description:
              "Skip installing the global PATH shim that intercepts npm calls system-wide.",
          },
          {
            flag: "--force",
            description:
              "Overwrite existing hook config files rather than merging them.",
          },
          {
            flag: "--dry-run",
            description:
              "Preview what files would be written without actually writing them.",
          },
        ]}
        exitCodes={[
          { code: "0", meaning: "Initialization successful." },
          { code: "1", meaning: "Fatal error (no package.json found, etc.)." },
        ]}
        output={`$ npx asen init

╭─ agentinel ──────────────────────────────╮
│  agentinel setup complete                │
│                                          │
│  New npm packages will be checked before │
│  they land.                              │
│                                          │
│  ✔ wrote .agentinel.json                 │
│  ✔ registered the Claude Code PreToolUse │
│  hook in .claude/settings.json           │
│  ✔ installed the git pre-commit hook in  │
│  .git/hooks                              │
│  ✔ wrote shims for npm, npx, pnpm, yarn, │
│  bun in /Users/user/.agentinel/bin       │
│  ✔ added the shims to PATH in            │
│  /Users/user/.zshrc                      │
│  ✔ Open a new terminal, or run \`asen     │
│  unshim\` to undo this.                   │
│                                          │
│  Default mode is strict. Set "mode":     │
│  "warn" in .agentinel.json to only warn  │
│  instead.                                │
╰──────────────────────────────────────────╯

Performance Tip:
The hook runs on every command, and resolving through npx each time is slow.
For faster hooks, add it to the repo and run init again:
  npm install --save-dev agentinel && npx asen init`}
        outputLang="Terminal"
        notes={[
          "Running asen init multiple times is safe. It will merge hook config rather than overwrite it.",
          "The Git pre-commit hook calls npx asen check on every commit. This adds ~100ms to commit time.",
          "asen init respects the .agentinel.json mode setting when writing the hook runner command.",
        ]}
      />

      {/* asen init --no-shim */}
      <CommandSection
        name="asen init --no-shim"
        usage="npx asen init --no-shim"
        description="Runs the standard init flow to wire up agent hooks and git hooks, but skips installing the global PATH shim that wraps the npm binary."
        flags={[]}
        exitCodes={[
          { code: "0", meaning: "Init successful without shim." },
          {
            code: "1",
            meaning:
              "Fatal error (no package.json found, etc.).",
          },
        ]}
        output={`$ npx asen init --no-shim
wrote .agentinel.json
registered the Claude Code PreToolUse hook in .claude/settings.json
installed the git pre-commit hook in .git/hooks

agentinel is set up. New npm packages will be checked before they land.
Default mode is strict. Set "mode": "warn" in .agentinel.json to only warn instead.`}
        outputLang="Terminal"
        notes={[
          "The shim modifies your shell profile (~/.zshrc, ~/.bashrc, etc.) to prepend ~/.agentinel/bin to your PATH.",
          "If you want to manually revert the hook changes later, you can run npx asen uninstall."
        ]}
      />

      {/* asen check (lockfile) */}
      <CommandSection
        name="asen check"
        usage="npx asen check"
        description="Scans your staged lockfile dependencies against the OSV database and heuristics. Designed for use in CI/CD pipelines and Git pre-commit hooks. Exits with code 1 if any flagged packages are found."
        flags={[
          {
            flag: "--all",
            description:
              "Scan all dependencies in the lockfile, not just staged changes.",
          },
          {
            flag: "--json",
            description: "Output results in JSON format instead of a human-readable format.",
          },
          {
            flag: "--fail-on-warn",
            description:
              "Exit with code 1 on warnings as well as blocks (useful for strict CI).",
          },
        ]}
        exitCodes={[
          { code: "0", meaning: "No flagged packages found." },
          { code: "1", meaning: "One or more packages are flagged or blocked." },
        ]}
        output={`$ npx asen check
checked 142 package(s), nothing suspicious`}
        outputLang="Terminal"
        notes={[
          "When run in a CI environment (CI=true), output is automatically formatted for log readability.",
          "The pre-commit hook installed by asen init runs this command automatically on every git commit.",
          "Packages in your allowlist are skipped and counted as clean.",
        ]}
      />

      {/* asen check [pkg] */}
      <CommandSection
        name="asen check [pkg]"
        usage="npx asen check <package-name>"
        description="Instantly scans a single named package against the OSV database and heuristics. Useful for quickly checking a package before manually installing it, or for scripting package validation."
        flags={[
          {
            flag: "--version <ver>",
            description: "Check a specific version. Defaults to latest.",
          },
          {
            flag: "--json",
            description: "Output result in JSON format.",
          },
        ]}
        exitCodes={[
          { code: "0", meaning: "Package is clean." },
          { code: "1", meaning: "Package is flagged or blocked." },
        ]}
        output={`$ npx asen check react-router-v7-fake
⚠️ agentinel warning: react-router-v7-fake is 1 day old and has 4 downloads.
This matches the profile of a slopsquatting or malicious package.`}
        outputLang="Terminal"
        notes={[
          "This command makes one npm registry call to resolve the latest version number if --version is not specified.",
          "All other data (OSV lookup, heuristics) is resolved locally from the bundled DB.",
          "For unknown packages (ghost packages), the check exits immediately with a BLOCK signal.",
        ]}
      />

      {/* asen allow */}
      <CommandSection
        name="asen allow"
        usage="npx asen allow <package-name> --reason <reason>"
        description="Adds a package to the allowlist in .agentinel.json with a required reason string. The entry includes an audit trail (who added it and when) and is committed to version control so the team has visibility."
        flags={[
          {
            flag: "--reason <text>",
            description: "Required. Human-readable reason for the allowlist entry.",
          },
          {
            flag: "--version <ver>",
            description:
              "Pin the allowlist entry to a specific version. Defaults to all versions.",
          },
        ]}
        exitCodes={[
          { code: "0", meaning: "Package added to allowlist." },
          { code: "1", meaning: "Missing --reason flag or write error." },
        ]}
        output={`$ npx asen allow my-internal-pkg --reason "Internal company package not on public npm"
allowlisted my-internal-pkg in .agentinel.json`}
        outputLang="Terminal"
        notes={[
          "The --reason flag is required. Running asen allow without it will print an error and exit with code 1.",
          "The addedBy field is populated from git config user.email. If git is not configured, it falls back to the system username.",
          "Allowlisted packages bypass both OSV matching and heuristic checks, except for npm takedown markers, which always block regardless of the allowlist.",
        ]}
      />

      {/* asen mode */}
      <CommandSection
        name="asen mode"
        usage="npx asen mode <warn|strict>"
        description="Switches Agentinel's operating mode in the .agentinel.json file."
        flags={[]}
        exitCodes={[
          { code: "0", meaning: "Mode updated." },
          { code: "1", meaning: "Invalid mode or missing configuration." },
        ]}
        output={`$ npx asen mode strict
set mode to strict in .agentinel.json`}
        outputLang="Terminal"
      />

      {/* asen uninstall */}
      <CommandSection
        name="asen uninstall"
        usage="npx asen uninstall"
        description="Completely removes all Agentinel hooks from your repository config files (.claude, .gemini, .github, etc.) and removes global shims."
        flags={[]}
        exitCodes={[
          { code: "0", meaning: "Agentinel completely uninstalled." },
        ]}
        output={`$ npx asen uninstall
agentinel has been completely uninstalled from this repository.`}
        outputLang="Terminal"
      />

      {/* asen unshim */}
      <CommandSection
        name="asen unshim"
        usage="npx asen unshim"
        description="Removes the global PATH shim installed by asen init --shim. Cleans up the shim binary and removes the PATH entry from your shell profile. The real npm binary is restored to its original position."
        flags={[
          {
            flag: "--dry-run",
            description:
              "Preview what would be removed without actually removing anything.",
          },
        ]}
        exitCodes={[
          { code: "0", meaning: "Shim removed successfully." },
          {
            code: "1",
            meaning: "No shim found, or could not write to shell profile.",
          },
        ]}
        output={`$ npx asen unshim
removed /Users/user/.agentinel/bin
removed the PATH line from /Users/user/.zshrc`}
        outputLang="Terminal"
        notes={[
          "Always use asen unshim rather than manually deleting the shim binary. Manual deletion leaves a dangling PATH entry in your shell profile.",
          "After running unshim, restart your shell session or source your shell profile for the change to take effect.",
          "asen unshim has no effect if the shim was never installed.",
        ]}
      />

      {/* See also */}
      <section className="border border-gray-200 rounded-xl p-6 bg-gray-50">
        <h3 className="text-base font-bold text-gray-900 mb-4">See also</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/docs/configuration"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition"
          >
            Configuration
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
            href="/docs/hooks/claude"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition"
          >
            Hooks and Integrations
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
