import BlogClient from "./BlogClient";
import { site, blogPosts } from "@/lib/site";

export const metadata = {
  title: `Senior Care Resources, Guides & Medicaid Insights | ${site.name} Blog`,
  description: `Expert advice, eldercare guidance, Medicaid waiver tips, and family caregiver resources from the ${site.name} clinical care team in Pennsylvania.`,
  alternates: {
    canonical: "/blog",
  },
  keywords: [
    "PA Medicaid waiver guides",
    "elderly home care tips",
    "senior care blog Pennsylvania",
    "choosing home care agency PA",
    "home care cost Pennsylvania",
    "preventing caregiver burnout",
    "senior home safety checklist",
    "Pavan Homecare resources"
  ],
  openGraph: {
    title: `Senior Care Resources & Eldercare Guides | ${site.name}`,
    description: `Practical knowledge, expert tips, and Medicaid guidance for Pennsylvania families supporting aging seniors.`,
    url: `${site.url}/blog`,
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Senior Care Resources & Eldercare Guides | ${site.name}`,
    description: `Practical knowledge, expert tips, and Medicaid guidance for Pennsylvania families.`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": site.url
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${site.url}/blog`
        }
      ]
    },
    {
      "@type": "Blog",
      "@id": `${site.url}/blog/#blog`,
      "name": `${site.name} Care Resources & Blog`,
      "description": "Expert advice, eldercare guidance, and family caregiver resources in Pennsylvania.",
      "url": `${site.url}/blog`,
      "publisher": {
        "@id": `${site.url}/#organization`
      },
      "blogPost": (blogPosts || []).map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "url": `${site.url}/blog/${post.slug}`,
        "datePublished": post.date,
        "description": post.excerpt
      }))
    }
  ]
};

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient />
    </>
  );
}
