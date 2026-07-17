import { Shield, RefreshCw, Network, Terminal, Code2 } from "lucide-react";
import { TerminalWindow } from "./TerminalWindow";

export function BentoGrid() {
  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 text-gray-900">Guarding your terminal is too late.</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Agentinel intercepts the AI before the damage is done.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Large Card 1: AI Feedback Loop */}
        <div className="md:col-span-2 rounded-3xl bg-white border border-gray-200 p-8 shadow-sm flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute -top-12 -right-12 p-12 opacity-[0.03] transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
            <RefreshCw className="w-80 h-80" />
          </div>
          <div className="relative z-10 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 border border-cyan-100">
              <Code2 className="text-cyan-600 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif mb-3 text-gray-900">AI Self-Correction Loop</h3>
            <p className="text-gray-600 max-w-md leading-relaxed">
              When Agentinel blocks a package, it doesn't just crash the terminal. It feeds the exact security context back to Claude or Copilot via native hooks, allowing the AI to intelligently self-correct.
            </p>
          </div>
          
          <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 font-mono text-sm text-gray-300 relative z-10 shadow-inner overflow-x-auto">
            <div className="text-cyan-400 mb-2 font-semibold">{'// PreToolUse Intercept Payload'}</div>
            <pre className="whitespace-pre-wrap leading-relaxed">
{`{
  "hookEvent": "PreToolUse",
  "action": "BLOCK",
  "reason": "agentinel blocked 'react-router-v7-beta': Package does not exist on npm (hallucination)."
}`}
            </pre>
          </div>
        </div>

        {/* Small Card 1: Deep Tree */}
        <div className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] transform group-hover:scale-110 transition-transform duration-700">
            <Network className="w-40 h-40" />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-100 relative z-10">
            <Network className="text-gray-600 w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif mb-3 relative z-10 text-gray-900">Deep Tree Scanning</h3>
          <p className="text-gray-600 leading-relaxed relative z-10">
            Installing <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-pink-600 font-mono border border-gray-200">express</code> brings in 67 packages. We scan all 67 in milliseconds before execution.
          </p>
        </div>

        {/* Small Card 2: Heuristics */}
        <div className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm flex flex-col relative overflow-hidden group">
           <div className="absolute -bottom-8 -right-8 p-8 opacity-[0.03] transform group-hover:-translate-y-4 transition-transform duration-700">
            <Shield className="w-40 h-40" />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-100 relative z-10">
            <Shield className="text-gray-600 w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif mb-3 relative z-10 text-gray-900">Slopsquatting Protection</h3>
          <p className="text-gray-600 leading-relaxed relative z-10">
            Zero-cost heuristics flag npm takedowns, typosquatting, and packages under 30 days old with suspicious download patterns.
          </p>
        </div>

        {/* Large Card 2: Terminal check */}
        <div className="md:col-span-2 rounded-3xl bg-white border border-gray-200 p-8 shadow-sm flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10 mb-8">
             <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-100">
              <Terminal className="text-gray-600 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif mb-3 text-gray-900">CI/CD & Human Fallbacks</h3>
            <p className="text-gray-600 max-w-md leading-relaxed">
              Not using an AI agent today? Agentinel includes a global PATH shim and Git pre-commit hooks to protect your manual installs and lockfiles.
            </p>
          </div>
          <div className="w-full relative z-10">
             <TerminalWindow 
              command="npx asen check"
              animated={false}
              outputLines={[
                { text: "Scanning staged dependencies..." },
                { text: "✅ All 142 staged packages passed security checks.", color: "text-emerald-400 font-medium" }
              ]}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
