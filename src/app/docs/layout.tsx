"use client";

import { Navbar } from "@/components/layouts/Navbar";
import { MegaFooter } from "@/components/layouts/MegaFooter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarSections = [
  {
    title: "Getting Started",
    links: [
      { label: "Introduction", href: "/docs/introduction" },
      { label: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Core Concepts",
    links: [
      { label: "Configuration", href: "/docs/configuration" },
      { label: "OSV Architecture", href: "/docs/architecture" },
    ],
  },
  {
    title: "Hooks and Integrations",
    links: [
      { label: "Claude Code", href: "/docs/hooks/claude" },
      { label: "Copilot CLI", href: "/docs/hooks/copilot" },
      { label: "Gemini & Antigravity CLI", href: "/docs/hooks/gemini" },
    ],
  },
  {
    title: "CLI Reference",
    links: [{ label: "All Commands", href: "/docs/commands" }],
  },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <nav className="space-y-8">
      {sidebarSections.map((section) => (
        <div key={section.title}>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3 font-sans">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-1.5 rounded-lg text-sm transition-colors font-sans ${
                      isActive
                        ? "bg-cyan-50 text-cyan-700 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Mobile sidebar toggle */}
      <div className="md:hidden border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <span className="text-sm text-gray-500 font-sans">Documentation</span>
      </div>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white px-6 py-6">
          <SidebarContent pathname={pathname} />
        </div>
      )}

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12 gap-0 md:gap-12">
        {/* Desktop Sidebar */}
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="sticky top-[100px] h-[calc(100vh-120px)] overflow-y-auto pr-6 border-r border-gray-100 pb-12">
            <SidebarContent pathname={pathname} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-3xl pb-24 pl-0 md:pl-8">
          {children}
        </main>
      </div>

      <MegaFooter />
    </div>
  );
}
