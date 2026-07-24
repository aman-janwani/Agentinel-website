import { llmPages } from "@/lib/llm-content";

export async function GET() {
  const fullText = llmPages.map(page => {
    return `---
Title: ${page.title}
URL: https://agentinel.com${page.url}
Author: ${page.author}
Date: ${page.publishedDate}
---

${page.content}
`;
  }).join('\n\n');

  return new Response(fullText, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
