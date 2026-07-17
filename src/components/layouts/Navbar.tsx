import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { NavbarScrollBorder } from "@/components/layouts/NavbarScrollBorder";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
      <nav className="w-full flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Left: Logo + Name */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-gray-500">
          <Link href="#features" className="hover:text-black transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-black transition-colors">
            How It Works
          </Link>
          <Link href="/docs" className="hover:text-black transition-colors">
            Docs
          </Link>
        </div>

        {/* Right: CTA */}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-sm"
          >
            <GithubIcon className="w-4 h-4" />
            Star on GitHub
          </a>
        </div>
      </nav>

      {/* Scroll-triggered bottom border */}
      <NavbarScrollBorder />
    </header>
  );
}
