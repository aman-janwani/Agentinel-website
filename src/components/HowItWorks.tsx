import { Activity, Search, ShieldAlert, Cpu } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Activity,
      title: "1. Intercept",
      desc: "Catches the native PreToolUse hook from Claude/Copilot the exact millisecond an install command is proposed."
    },
    {
      icon: Search,
      title: "2. Scan",
      desc: "Checks the entire dependency tree against our local OSV database and executes zero-cost heuristics."
    },
    {
      icon: ShieldAlert,
      title: "3. Block",
      desc: "Instantly blocks execution if a hallucinated, slopsquatted, or known malicious package is detected."
    },
    {
      icon: Cpu,
      title: "4. Self-Correct",
      desc: "Feeds the exact security context back to the AI agent so it can autonomously find the correct, safe package."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-gray-50 relative z-10 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 text-gray-900">How Agentinel Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Seamless integration that fails open and stays out of your way.</p>
        </div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-cyan-200/50 transform md:-translate-x-1/2 shadow-[0_0_15px_rgba(0,240,255,0.2)]"></div>
          
          <div className="flex flex-col gap-12 relative z-10">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'} pl-24 md:pl-0`}>
                    <h3 className="text-2xl font-serif mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{step.desc}</p>
                  </div>
                  
                  <div className="absolute left-0 md:static md:w-auto flex justify-center w-16 md:w-auto">
                    <div className="w-16 h-16 rounded-full bg-white border border-cyan-100 flex items-center justify-center shadow-xl shadow-cyan-900/5 relative z-10 transition-transform hover:scale-110 duration-300">
                      <step.icon className="w-6 h-6 text-cyan-600" />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 hidden md:block"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
