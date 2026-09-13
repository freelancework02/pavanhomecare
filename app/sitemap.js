import { blogPosts, site } from "@/lib/site";
import { countiesData, citiesData } from "@/lib/countiesData";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function sitemap() {
  const now = new Date();

  // 1. Core Pages
  const staticRoutes = [
    { route: "", priority: 1.0, changeFrequency: "weekly" },
    { route: "/about", priority: 0.85, changeFrequency: "monthly" },
    { route: "/services", priority: 0.9, changeFrequency: "weekly" },
    { route: "/areas-we-serve", priority: 0.9, changeFrequency: "weekly" },
    { route: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { route: "/contact-us", priority: 0.9, changeFrequency: "monthly" },
    { route: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { route: "/terms-conditions", priority: 0.3, changeFrequency: "yearly" },
  ].map((item) => ({
    url: `${site.url}${item.route}`,
    lastModified: now,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // 2. High-Intent Service Rewrites
  const serviceRoutes = [
    "/companion-care",
    "/personal-care",
    "/24-hour-live-in-care",
    "/dementia-alzheimers-care",
    "/post-hospital-respite-care",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. County Landing Pages
  const countyRoutes = Object.keys(countiesData).map((slug) => ({
    url: `${site.url}/areas-we-serve/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: slug === "bucks" || slug === "philadelphia" ? 0.9 : 0.8,
  }));

  // 4. City Landing Rewrites
  const cityRoutes = Object.keys(citiesData).map((cityKey) => ({
    url: `${site.url}/${cityKey}-pa-home-care`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  // 5. Dynamic Blog Articles (Automatically includes new guides)
  const blogRoutes = (blogPosts || []).map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date || now),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes, ...countyRoutes, ...cityRoutes, ...blogRoutes];
}
