import AboutClient from "@/components/AboutClient";
import { site } from "@/lib/site";

export const metadata = {
  title: "About Us | Licensed In-Home Senior Care in PA",
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
    images: [
      {
        url: `${site.url}/images/og-image.jpg`,
        secureUrl: `${site.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `About ${site.name} - In-Home Senior Care in Pennsylvania`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${site.name} | Licensed In-Home Care in PA`,
    description: `Love-driven senior care and certified caregivers across Pennsylvania.`,
    images: [`${site.url}/images/og-image.jpg`],
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
