import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agentinel | Security layer for autonomous coding",
  description:
    "Because your AI loves slopsquatting. The zero-cost, locally-run package guardrail for AI agents. Designed to intercept hallucinated and malicious npm packages before they execute.",
  keywords: [
    "npm security",
    "AI agent security",
    "slopsquatting",
    "package hallucination",
    "Claude Code",
    "Copilot security",
  ],
  openGraph: {
    title: "Agentinel | Security layer for autonomous coding",
    description: "Because your AI loves slopsquatting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} scroll-smooth`}
    >
      <body className="antialiased selection:bg-cyan-100 selection:text-cyan-900">
        {children}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "9cbc170756c24ecb8293721a77deb6bc"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
