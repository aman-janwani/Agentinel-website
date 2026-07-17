"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { NavbarScrollBorder } from "@/components/layouts/NavbarScrollBorder";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Docs", href: "/docs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
      <nav className="w-full flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Left: Logo + Name */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Agentinel Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="text-[1.35rem] font-serif tracking-tight text-gray-900 mt-1">
            Agentinel
          </span>
        </Link>

        {/* Center: Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-gray-500">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-black transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: CTAs + Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="https://npmjs.com/package/agentinel"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-[#CB3837] text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.336h-3.46l.01-10.422h-3.456L12.04 18.67h-6.91z" />
            </svg>
            npm
          </a>
          <a
            href="https://github.com/aman-janwani/agentinel"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-sm"
          >
            <GithubIcon className="w-4 h-4" />
            Star on GitHub
          </a>

          {/* Hamburger button (mobile only) */}
          <button
            id="mobile-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors gap-1.5"
          >
            <span className={`block w-5 h-0.5 bg-gray-900 transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-900 transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-900 transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-1 bg-white/95 border-t border-gray-100">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold text-gray-600 hover:text-black hover:bg-gray-50 transition-colors px-3 py-3 rounded-xl"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTAs */}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
            <a
              href="https://npmjs.com/package/agentinel"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 text-[#CB3837] text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.336h-3.46l.01-10.422h-3.456L12.04 18.67h-6.91z" />
              </svg>
              View on npm
            </a>
            <a
              href="https://github.com/aman-janwani/agentinel"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#0A0A0A] text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              Star on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Scroll-triggered bottom border */}
      <NavbarScrollBorder />
    </header>
  );
}
