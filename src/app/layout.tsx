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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://agentinel.com/#website",
        "url": "https://agentinel.com",
        "name": "Agentinel",
        "description": "Security layer for autonomous coding",
        "potentialAction": [{
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://agentinel.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }]
      },
      {
        "@type": "Organization",
        "@id": "https://agentinel.com/#organization",
        "name": "Agentinel",
        "url": "https://agentinel.com"
      },
      {
        "@type": "Person",
        "@id": "https://agentinel.com/#author",
        "name": "Aman Janwani",
        "jobTitle": "Creator of Agentinel",
        "url": "https://github.com/aman-janwani",
        "sameAs": [
          "https://github.com/aman-janwani"
        ]
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} scroll-smooth`}
    >
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="Agentinel AI Markdown Index" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="Agentinel Full Markdown Corpus" />
        <link rel="alternate" type="application/json" href="/api/llms" title="Agentinel AI JSON API" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
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
