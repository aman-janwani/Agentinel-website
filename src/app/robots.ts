import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'PerplexityBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'Claude-SearchBot',
          'ClaudeBot',
          'Google-Extended',
          'Applebot-Extended',
          'GPTBot'
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://agentinel.com/sitemap.xml',
  };
}
