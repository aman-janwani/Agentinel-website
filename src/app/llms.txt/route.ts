import { llmPages } from "@/lib/llm-content";

export async function GET() {
  const markdown = `# Agentinel
> The zero-cost, locally-run package guardrail for your AI coding agents.

## Documentation
${llmPages.map(page => `- [${page.title}](${page.url}): ${page.summary}`).join('\n')}

## Resources
- [Full Text Corpus](/llms-full.txt)
- [Sitemap](/sitemap.xml)
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
