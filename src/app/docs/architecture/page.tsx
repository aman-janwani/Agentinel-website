import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OSV Architecture | Agentinel Docs",
  description:
    "Deep technical dive into how Agentinel bundles and queries the OSV database, version-exact matching, and the heuristic scanning layer.",
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

const heuristics = [
  {
    name: "Package age under 30 days",
    id: "AGE_CHECK",
    description:
      "Newly published packages are disproportionately represented in malicious package datasets. A package registered fewer than 30 days ago that an AI agent tries to install is treated as a yellow-flag heuristic trigger.",
    detail:
      "Publication date is evaluated via a fast registry check. Only the most vital data is queried to maintain ultra-low latency.",
  },
  {
    name: "Download count under 1,000",
    id: "DOWNLOAD_CHECK",
    description:
      "Malicious packages rarely accumulate significant download counts before takedown. A package with fewer than 1,000 total downloads is flagged, especially in combination with other heuristics.",
    detail:
      "Download counts are quickly fetched for packages that trigger suspicion, minimizing overhead while catching likely threats.",
  },
  {
    name: "Publisher drift",
    id: "MAINTAINER_DRIFT",
    description:
      "A package whose primary maintainer changed recently is a supply-chain risk signal. Attackers sometimes purchase or compromise low-traffic packages to inject malicious code into a trusted name.",
    detail:
      "Agentinel can verify maintainer metadata against known good snapshots. Sudden or suspicious ownership transfers flag this heuristic.",
  },
  {
    name: "Non-existent package name",
    id: "GHOST_PACKAGE",
    description:
      "If the package name has never appeared on the npm registry (i.e., it does not exist in the bundled DB at all), it is almost certainly an LLM hallucination. This is the primary slopsquatting signal.",
    detail:
      'The engine references a massive list of known, valid packages. A complete miss is treated as a strong "ghost package" signal and triggers a BLOCK in strict mode.',
  },
  {
    name: "npm takedown markers",
    id: "TAKEDOWN_MARKER",
    description:
      "The OSV dataset includes explicit takedown records for packages that npm has unpublished for security reasons. Any package with a takedown marker is immediately blocked, regardless of mode.",
    detail:
      "Takedown markers are the most authoritative signal in the DB. They override all other checks, including the allowlist.",
  },
];

export default function ArchitecturePage() {
  return (
    <article className="text-gray-700 leading-relaxed font-sans">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-3">
          Core Concepts
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-5 tracking-tight">
          OSV Architecture
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A technical deep dive into how Agentinel bundles and queries the Open
          Source Vulnerabilities database, and the heuristic layer that catches
          what the DB misses.
        </p>
      </div>

      <hr className="border-gray-100 mb-10" />

      {/* What is OSV */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is OSV?
        </h2>
        <p className="mb-4">
          The{" "}
          <a
            href="https://osv.dev"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-600 underline underline-offset-2 hover:text-cyan-800 transition"
          >
            Open Source Vulnerabilities (OSV)
          </a>{" "}
          database is a Google-backed, open schema for describing security
          vulnerabilities in open-source packages. It aggregates data from
          npm security advisories, GitHub Advisory Database, and community
          takedown records into a single unified format.
        </p>
        <p className="mb-4">
          OSV covers 216,000+ vulnerability and malicious-package records across
          the npm ecosystem. Each record contains the affected package name,
          affected version ranges, severity, and a structured description of the
          threat.
        </p>
        <p>
          Agentinel bundles a snapshot of the relevant npm subset of this
          database at publish time. When you{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            npm install agentinel
          </code>
          , the DB comes with it.
        </p>
      </section>

      {/* Local DB bundling */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Local database bundling
        </h2>
        <p className="mb-4">
          The OSV data is stored as a compact binary index inside the Agentinel
          package. At scan time, Node.js reads this file from the local
          filesystem. There is no HTTP request, no CDN, and no DNS lookup.
        </p>

        <div className="border-l-4 border-blue-400 bg-blue-50 rounded-r-xl px-5 py-4 mb-4">
          <p className="text-sm font-semibold text-blue-800 mb-1">
            Why local?
          </p>
          <p className="text-sm text-blue-700">
            A network-dependent scanner can fail your build if the API is down,
            rate-limited, or firewalled. By bundling the DB locally, Agentinel
            works in air-gapped environments and never adds latency from
            external round-trips.
          </p>
        </div>

        <p className="mb-4">
          The DB is updated each time you update the{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            agentinel
          </code>{" "}
          package itself. Running{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            npm update agentinel
          </code>{" "}
          pulls the latest OSV snapshot.
        </p>
      </section>

      {/* Version-exact matching */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Version-exact matching algorithm
        </h2>
        <p className="mb-4">
          When Agentinel receives a package name and version string from an
          agent hook, it performs a two-pass lookup:
        </p>

        <ol className="space-y-4 mb-6">
          {[
            {
              step: "1. Name lookup",
              desc: "The package name is looked up in the OSV index. If no record exists, the package is clean from a vulnerability perspective (but may still trigger heuristics).",
            },
            {
              step: "2. Version range evaluation",
              desc: "For each OSV record matching the package name, the requested version is tested against the affected version range using semver range evaluation. A match produces a BLOCK or WARN signal depending on mode.",
            },
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <div>
                <p className="font-semibold text-gray-900 mb-1">{item.step}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mb-4">
          The result of the matching algorithm is a structured decision object:
        </p>
        <CodeBlock lang="JSON (decision payload)">{`{
  "package": "react-router-v7-beta",
  "version": "1.0.0",
  "decision": "BLOCK",
  "source": "OSV_MATCH",
  "osvId": "MAL-2024-8821",
  "reason": "Package matches OSV malicious package record MAL-2024-8821"
}`}</CodeBlock>
      </section>

      {/* Heuristics */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Heuristic scanning layer
        </h2>
        <p className="mb-8 text-gray-600">
          The OSV DB catches known malware. The heuristic layer catches unknown
          threats before they make it into OSV. These five signals run on every
          package scan, in parallel with the DB lookup.
        </p>

        <div className="space-y-6">
          {heuristics.map((h) => (
            <div key={h.id} className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <code className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono border border-gray-200 shrink-0 mt-0.5">
                  {h.id}
                </code>
                <h3 className="font-bold text-gray-900">{h.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{h.description}</p>
              <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                {h.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Fail Open implementation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Fail Open implementation
        </h2>
        <p className="mb-4">
          Every scan is wrapped in a top-level error boundary. If any part of
          the OSV lookup or heuristic evaluation throws an unexpected exception,
          the scanner catches it and emits an{" "}
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
            ALLOW
          </code>{" "}
          decision with a warning written to stderr.
        </p>
        <CodeBlock lang="TypeScript (simplified)">{`async function scanPackage(name: string, version: string): Promise<Decision> {
  try {
    const osvResult = await checkOsvDatabase(name, version);
    if (osvResult.matched) return { action: "BLOCK", source: "OSV_MATCH", ...osvResult };

    const heuristicResult = await runHeuristics(name, version);
    if (heuristicResult.flagged) return { action: "WARN", source: "HEURISTIC", ...heuristicResult };

    return { action: "ALLOW" };
  } catch (err) {
    process.stderr.write(\`[agentinel] scan error: \${err}. Failing open.\n\`);
    return { action: "ALLOW", source: "ERROR_FAILOPEN" };
  }
}`}</CodeBlock>
      </section>

      {/* Known limitations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Known limitations
        </h2>

        <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-xl px-5 py-4 mb-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">
            1-3 day DB lag
          </p>
          <p className="text-sm text-amber-700">
            The bundled OSV snapshot lags 1-3 days behind the live OSV feed.
            Zero-day malicious packages published in the last 24-72 hours may
            not appear in the DB. The heuristic layer partially mitigates this
            by flagging low-trust packages regardless of DB presence.
          </p>
        </div>

        <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-xl px-5 py-4 mb-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">
            No behavioral analysis
          </p>
          <p className="text-sm text-amber-700">
            Agentinel does not sandbox or execute package code to detect
            malicious behavior at runtime. It only checks package identity
            against the DB and applies static heuristics. A novel malicious
            package that has no OSV record and passes all heuristics will not be
            detected.
          </p>
        </div>

        <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-xl px-5 py-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">
            npm ecosystem only
          </p>
          <p className="text-sm text-amber-700">
            The current version of Agentinel only covers the npm (Node.js)
            ecosystem. PyPI, Cargo, and other ecosystems are on the roadmap.
          </p>
        </div>
      </section>

      {/* Next steps */}
      <section className="border border-gray-200 rounded-xl p-6 bg-gray-50">
        <h3 className="text-base font-bold text-gray-900 mb-4">See also</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/docs/hooks/claude"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition"
          >
            Hooks and Integrations
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
            href="/docs/configuration"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition"
          >
            Configuration
          </Link>
        </div>
      </section>
    </article>
  );
}
