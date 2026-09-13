import AboutClient from "@/components/AboutClient";
import { site } from "@/lib/site";

export const metadata = {
  title: `About Us | Licensed In-Home Senior Care in PA | ${site.name}`,
  description: `Learn about ${site.name}'s mission, values, clinical protocols, and licensed caregivers providing love-driven senior care across 9 Pennsylvania counties.`,
  alternates: { canonical: "/about" },
  keywords: [
    "about Pavan Homecare",
    "licensed home care agency Pennsylvania",
    "caregiver vetting standards PA",
    "senior care agency Feasterville PA",
    "Bucks County home care providers"
  ],
  openGraph: {
    title: `About ${site.name} | Licensed In-Home Senior Care in PA`,
    description: `Providing love-driven in-home care across Bucks County, Philadelphia, and surrounding PA communities.`,
    url: `${site.url}/about`,
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${site.name} | Licensed In-Home Care in PA`,
    description: `Love-driven senior care and certified caregivers across Pennsylvania.`,
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
          "name": "About Us",
          "item": `${site.url}/about`
        }
      ]
    },
    {
      "@type": "AboutPage",
      "@id": `${site.url}/about/#webpage`,
      "url": `${site.url}/about`,
      "name": `About ${site.name}`,
      "description": "Licensed in-home care agency dedicated to love-driven senior care in Pennsylvania.",
      "mainEntity": {
        "@id": `${site.url}/#organization`
      }
    }
  ]
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
