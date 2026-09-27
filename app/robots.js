import { site } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/admin"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Applebot-Extended",
          "Google-Extended",
          "Bingbot",
        ],
        allow: "/",
        disallow: ["/admin/", "/admin"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
