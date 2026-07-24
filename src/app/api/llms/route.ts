import { llmPages } from "@/lib/llm-content";
import { NextResponse } from "next/server";

export async function GET() {
  const nodes = llmPages.map(page => ({
    title: page.title,
    canonical_url: `https://agentinel.com${page.url}`,
    category: page.category,
    published_date: page.publishedDate,
    author: {
      name: page.author,
      credentials: "Creator of Agentinel"
    },
    summary: page.summary,
    content: page.content,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": page.title,
      "author": {
        "@type": "Person",
        "name": page.author
      },
      "datePublished": page.publishedDate,
    }
  }));

  return NextResponse.json({ nodes }, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    }
  });
}
