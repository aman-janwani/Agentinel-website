import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

export function MegaFooter() {
  return (
    <footer className="bg-[#050505] text-white pt-24 relative overflow-hidden border-t border-gray-900">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E5CC]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Brand Column (Larger) */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center gap-3 group w-fit">
              <div className="bg-white p-2 rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="Agentinel Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="font-serif text-2xl text-white tracking-tight group-hover:text-gray-200 transition-colors">
                Agentinel
              </span>
            </Link>
            
            <p className="text-gray-400 text-base leading-relaxed max-w-[280px]">
              The ultra-low latency security layer for autonomous AI coding agents. Stopping slopsquatting before it starts.
            </p>
            
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/aman-janwani/agentinel"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://npmjs.com/package/agentinel"
                target="_blank"
                rel="noreferrer"
                aria-label="npm Package"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-[#CB3837] hover:border-[#CB3837]/30 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.336h-3.46l.01-10.422h-3.456L12.04 18.67h-6.91z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Columns */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-sans text-xs font-semibold text-gray-200 uppercase tracking-[0.2em] mb-6">
                Product
              </h3>
              <ul className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
                <li><Link href="#features" className="hover:text-[#00E5CC] transition-colors inline-block hover:translate-x-1 duration-300">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-300">How It Works</Link></li>
                <li><Link href="/docs/architecture" className="hover:text-[#00E5CC] transition-colors inline-block hover:translate-x-1 duration-300">OSV Architecture</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-sans text-xs font-semibold text-gray-200 uppercase tracking-[0.2em] mb-6">
                Developers
              </h3>
              <ul className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
                <li><Link href="/docs/introduction" className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-300">Documentation</Link></li>
                <li><Link href="/docs/installation" className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-300">Installation</Link></li>
                <li><Link href="/docs/configuration" className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-300">Configuration</Link></li>
                <li><Link href="/docs/commands" className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-300">CLI Reference</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-sans text-xs font-semibold text-gray-200 uppercase tracking-[0.2em] mb-6">
                Integrations
              </h3>
              <ul className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
                <li><Link href="/docs/hooks/claude" className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-300">Claude Code</Link></li>
                <li><Link href="/docs/hooks/copilot" className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-300">Copilot CLI</Link></li>
                <li><Link href="/docs/hooks/gemini" className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-300">Gemini & Antigravity CLI</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter / Terminal-style Subscribe */}
        <div className="w-full bg-[#0A0A0A] border border-gray-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E5CC]/0 via-[#00E5CC]/5 to-[#00E5CC]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2s] ease-in-out" />
          
          <div className="relative z-10 flex-1">
            <h3 className="text-xl font-serif text-white mb-2">Join our newsletter</h3>
            <p className="text-sm text-gray-500">Get notified about new products and updates.</p>
          </div>
          
          <NewsletterForm />
        </div>

        {/* Giant Logo Text */}
        <div className="w-full border-t border-gray-900 pt-16 pb-8 flex flex-col items-center">
          <h2 className="text-[12vw] leading-tight pb-4 font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-800 select-none text-center">
            Agentinel.
          </h2>
          
          {/* Bottom Bar */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 text-xs font-mono text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5CC] animate-pulse" />
              SYSTEM_SECURE
            </div>
            <div className="flex items-center gap-6">
              <span>© {new Date().getFullYear()}</span>
              <span className="text-gray-800">|</span>
              <span>MIT LICENSE</span>
              <span className="text-gray-800">|</span>
              <span className="text-gray-500">Built by Aman Janwani</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
