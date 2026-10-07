import AreasWeServeClient from "./AreasWeServeClient";
import { site } from "@/lib/site";

export const metadata = {
  title: `Areas We Serve in Pennsylvania | Bucks, Philadelphia & 9 Counties | ${site.name}`,
  description: `Explore ${site.name}'s licensed service coverage across 9 Pennsylvania counties: Bucks, Philadelphia, Montgomery, Delaware, Chester, Lehigh, Northampton, Berks, and Schuylkill.`,
  alternates: {
    canonical: "/areas-we-serve",
  },
  keywords: [
    "areas we serve home care PA",
    "Bucks County senior care",
    "Philadelphia home caregivers",
    "Montgomery County home care",
    "Delaware County in-home care",
    "Chester County senior caregivers",
    "Lehigh County senior care",
    "Northampton County home care",
    "Berks County caregivers",
    "Schuylkill County in-home care",
    "PA home care coverage map"
  ],
  openGraph: {
    title: `Areas We Serve in Pennsylvania | Bucks, Philadelphia & 9 Counties | ${site.name}`,
    description: `Licensed, compassionate in-home care available across 9 Pennsylvania counties. Find dedicated local caregivers near you.`,
    url: `${site.url}/areas-we-serve`,
    type: "website",
    siteName: site.name,
    images: [
      {
        url: `${site.url}/images/og-image.webp`,
        secureUrl: `${site.url}/images/og-image.webp`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${site.name} - Pennsylvania Service Areas`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Areas We Serve in Pennsylvania | ${site.name}`,
    description: `Compassionate in-home care across Bucks, Philadelphia, Montgomery & 9 PA counties.`,
    images: [`${site.url}/images/og-image.webp`],
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
          "name": "Areas We Serve",
          "item": `${site.url}/areas-we-serve`
        }
      ]
    },
    {
      "@type": "HomeHealthCareService",
      "name": `${site.name} Service Coverage`,
      "url": `${site.url}/areas-we-serve`,
      "telephone": site.phoneDisplay,
      "areaServed": site.serviceAreas.map(area => ({
        "@type": "AdministrativeArea",
        "name": area
      }))
    }
  ]
};

export default function AreasWeServePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AreasWeServeClient />
    </>
  );
}
