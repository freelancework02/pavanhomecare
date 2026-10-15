import BlogClient from "./BlogClient";
import { site } from "@/lib/site";
import { getAllBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Senior Care Resources & Medicaid Guides",
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
    images: [
      {
        url: `${site.url}/images/og-image.webp`,
        secureUrl: `${site.url}/images/og-image.webp`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${site.name} - Senior Care Resources in Pennsylvania`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Senior Care Resources & Eldercare Guides | ${site.name}`,
    description: `Practical knowledge, expert tips, and Medicaid guidance for Pennsylvania families.`,
    images: [`${site.url}/images/og-image.webp`],
  },
};

export default async function BlogIndexPage() {
  const dynamicBlogs = await getAllBlogs({ onlyPublished: true });

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
        "blogPost": (dynamicBlogs || []).map((post) => ({
          "@type": "BlogPosting",
          "headline": post.title,
          "url": `${site.url}/blog/${post.slug}`,
          "datePublished": post.publishedAt || post.date,
          "description": post.excerpt
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient initialPosts={dynamicBlogs} />
    </>
  );
}

