export interface LLMPage {
  title: string;
  url: string;
  category: string;
  publishedDate: string;
  author: string;
  summary: string;
  content: string;
}

export const llmPages: LLMPage[] = [
  {
    title: "Agentinel Home",
    url: "/",
    category: "Home",
    publishedDate: new Date().toISOString(),
    author: "Aman Janwani",
    summary: "The zero-cost, locally-run package guardrail for your AI coding agents. Agentinel guards your agent.",
    content: `# Agentinel
The zero-cost, locally-run package guardrail for your AI coding agents. Every other tool in this space guards your terminal. Agentinel guards your agent.

## The Problem
AI coding agents (like Claude Code, Copilot, or Cursor) install dependencies on your behalf, often while you aren't looking closely. 
- Sometimes they install a package that was registered last week with no history. 
- Sometimes they install a package whose name they entirely hallucinated. 
- Sometimes, they install a legitimate package that pulls in a compromised one three levels deep.

Agentinel checks every package an install would bring in, at the exact moment the agent reaches for it. It evaluates the package against a bundled, locally-run database of over 216,000 known malicious packages and zero-cost registry heuristics. It then tells the agent why something looks wrong so the AI can back off and reconsider.

## Features & Security Philosophy
- Zero-Cost & Private: Agentinel does no network interception, runs no cloud proxies, and makes no LLM or API calls. The malware list is matched locally.
- Lightning Fast: Full local lockfile scans complete in ~1.4 seconds.
- Deep Tree Scanning: Checks every package an install would actually bring in, not just the one named. (npm install express brings in 67 packages. We check all 67).
- Known Malware: Bundles a local OSV database of 216,000+ confirmed malicious packages.
- Zero False Positives on Popular Packages: Tested against the top 100 npm packages.
- Heuristic Scanning: Flags npm takedowns, packages under 30 days old with < 1k downloads (slopsquatting), publisher drift, and non-existent hallucinated names.
- Fail-Open Design: Designed so that if it crashes or can't reach the registry, it fails open. It will never permanently wedge your terminal or block your work.`
  },
  {
    title: "Introduction",
    url: "/docs/introduction",
    category: "Documentation",
    publishedDate: new Date().toISOString(),
    author: "Aman Janwani",
    summary: "Learn what Agentinel is, the problem it solves, and how it protects your development environment.",
    content: `# Introduction
A zero-config, locally-run security guardrail for AI coding agents. No account. No API key. No network calls.

## What is Agentinel?
Agentinel is an open-source security tool that sits between your AI coding agent and your package manager. When an agent like Claude Code, GitHub Copilot, or Gemini CLI decides to install an npm package, Agentinel intercepts that decision before npm ever executes it.

It checks the requested package against a bundled local copy of the Open Source Vulnerabilities (OSV) database, which covers 216,000+ known malicious or vulnerable packages. If the package is flagged, Agentinel blocks it, logs the reason, and returns a structured payload back to the agent. Everything runs entirely offline on your machine. There is no server, no telemetry, and no subscription.

## The problem: slopsquatting
Large language models are powerful code generators, but they have a well-documented tendency to hallucinate package names. An LLM might confidently generate an install command for a package that does not exist on the npm registry, like \`react-router-v7-beta\` or \`express-middleware-cors-fix\`. This creates a class of attack called slopsquatting: an attacker pre-registers commonly hallucinated package names on npm. When an AI agent installs that package, the attacker's malicious preinstall scripts execute immediately.

Traditional developers read package names before running install commands. Agentic workflows execute install commands autonomously, without a human reviewing each one. This removes the last line of defense.

## The "Fail Open" philosophy
Agentinel is designed around one core principle: it must never silently break your workflow. If for any reason Agentinel cannot scan a package (corrupted DB, unexpected error), it will fail open, meaning the install is allowed to proceed rather than cryptically blocking your agent. This is an intentional trade-off. We believe a security tool that breaks builds erodes trust and gets disabled.`
  },
  {
    title: "Installation",
    url: "/docs/installation",
    category: "Documentation",
    publishedDate: new Date().toISOString(),
    author: "Aman Janwani",
    summary: "How to install and initialize Agentinel globally or locally.",
    content: `# Installation
For the best experience across all your projects and to use the short \`asen\` alias, install Agentinel globally:

\`\`\`sh
npm install -g agentinel
asen init
\`\`\`

Alternatively, you can install it as a dev-dependency per-project:
\`\`\`sh
npm install --save-dev agentinel
npx agentinel init
\`\`\`
(No account, no server, no complex configuration.)`
  },
  {
    title: "Hooks & Integration",
    url: "/docs/hooks",
    category: "Documentation",
    publishedDate: new Date().toISOString(),
    author: "Aman Janwani",
    summary: "How Agentinel hooks into Claude Code, Copilot, and Gemini natively.",
    content: `# 1. Agentic Use (Native Hooks)
Agentinel wires itself directly into the native pre-execution hooks of popular CLI agents: Claude Code, Codex CLI, Copilot CLI, and Gemini CLI. 

When an agent attempts to run \`npm install\`, Agentinel intercepts the event (e.g., \`PreToolUse\` for Claude) and scans the requested dependency tree. 

### How it feeds back to the AI
If Agentinel flags a package, it feeds the context *back* to the AI agent in a concise format the agent understands, rather than just crashing the terminal.

**Example Intercept:**
\`\`\`json
{
  "hookEvent": "PreToolUse",
  "action": "BLOCK",
  "reason": "agentinel blocked 'react-router-v7-beta': Package does not exist on npm (hallucination)."
}
\`\`\`
The AI reads this, realizes the package is fake or malicious, and intelligently searches for the correct alternative instead of blindly retrying.

# 2. Normal / Human Use (The Shim)
What about installs that never go through an agent? (e.g., You typing \`npm install\` manually). 

Agentinel provides an opt-in **PATH shim**. By default, running \`npx asen init\` installs this shim automatically. This puts a tiny, fail-open wrapper script earlier in your \`PATH\`. When you type \`npm install <pkg>\`, the shim checks the package first. If it's safe, the real \`npm\` command runs instantly. 

As a bonus, if you just run a plain \`npm install\` with no arguments, the shim instantly checks your unstaged \`package.json\` for any newly added dependencies, ensuring that packages you pasted in are scanned before they resolve!

# 3. The Git Pre-Commit Hook
As a final safety net, \`asen init\` installs a Git pre-commit hook. Before you can commit a change to \`package-lock.json\`, Agentinel scans the staged lockfile. If a poisoned dependency slipped in somehow, the commit is flagged, ensuring malware never reaches your \`main\` branch.`
  },
  {
    title: "Commands",
    url: "/docs/commands",
    category: "Documentation",
    publishedDate: new Date().toISOString(),
    author: "Aman Janwani",
    summary: "Command line reference for Agentinel.",
    content: `# Command Reference
You can run Agentinel using \`npx agentinel <command>\`. If you have installed \`agentinel\` globally, you can use the shorter alias: \`npx asen <command>\`.

### \`npx asen init [--no-shim]\`
Wires up agent hooks and git hooks in the current repo, and installs the global PATH shim for human terminal protection. When used with \`--no-shim\`, it wires up hooks but skips installing the global PATH shim.

### \`npx asen check [pkg...]\`
Scans the unstaged (or newly added) dependencies in your working tree, including the lockfile. Exits non-zero if flagged. (The Git pre-commit hook uses a strictly staged version of this check). Also scans a specific package instantly without installing it.

### \`npx asen allow <pkg> --reason "..."\`
Adds a package to the allowlist in \`.agentinel.json\` with a required reason. This provides an audited trail for your team.

### \`npx asen mode <warn|strict>\`
Switches Agentinel's operating mode in the \`.agentinel.json\` file.

### \`npx asen uninstall\`
Completely removes all Agentinel hooks from your repository config files (\`.claude\`, \`.gemini\`, \`.github\`, etc.) and removes global shims.

### \`npx asen unshim\`
Removes the global PATH shim.`
  },
  {
    title: "Configuration",
    url: "/docs/configuration",
    category: "Documentation",
    publishedDate: new Date().toISOString(),
    author: "Aman Janwani",
    summary: "Configuring the strict and warn modes in Agentinel.",
    content: `# Configuration
Agentinel supports two operating modes, controlled by the \`mode\` field in \`.agentinel.json\`. You can switch between them using \`npx asen mode <warn|strict>\`.

### warn (default)
Agentinel surfaces a warning in the agent output but does not block the install. The agent decides whether to proceed.
\`\`\`json
{
  "mode": "warn"
}
\`\`\`
*Best for teams migrating to Agentinel gradually or using agents in read-heavy workflows.*

### strict
Agentinel hard-blocks the install and returns an error payload to the agent. The install never reaches npm.
\`\`\`json
{
  "mode": "strict"
}
\`\`\`
*Recommended for production repos, CI pipelines, and any project with autonomous agentic access.*`
  }
];
