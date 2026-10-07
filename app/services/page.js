import ServicesClient from "./ServicesClient";
import { site } from "@/lib/site";

export async function generateMetadata({ searchParams }) {
  const service = searchParams?.service;

  const serviceSeo = {
    "companion-care": {
      title: `Companion Care Services in PA | Friendly In-Home Support | ${site.name}`,
      description: `Licensed companion care across 9 Pennsylvania counties. Meaningful conversation, meal prep, medication reminders, and errand assistance from Pavan Homecare.`,
      canonical: "/companion-care",
      keywords: ["companion care Pennsylvania", "elderly companion care Bucks County", "senior companionship Philadelphia", "in home companion caregiver PA"]
    },
    "personal-care": {
      title: `Personal Care & Daily Hygiene Assistance in PA | ${site.name}`,
      description: `Dignified hands-on personal care, bathing, grooming, and mobility assistance tailored to seniors across Pennsylvania. Request a free in-home consultation.`,
      canonical: "/personal-care",
      keywords: ["personal care Pennsylvania", "senior hygiene assistance Bucks County", "private duty caregiver PA", "elderly bathing assistance Philadelphia"]
    },
    "24hour-care": {
      title: `24-Hour & Live-In Senior Home Care in PA | ${site.name}`,
      description: `Continuous 24-hour and live-in care providing round-the-clock peace of mind for seniors across 9 PA counties. Immediate availability for your family.`,
      canonical: "/24-hour-live-in-care",
      keywords: ["24 hour home care Pennsylvania", "live in caregiver Bucks County", "overnight senior care Philadelphia", "24 7 elder care PA"]
    },
    "dementia-care": {
      title: `Alzheimer's & Dementia Memory Care at Home in PA | ${site.name}`,
      description: `Specialized Alzheimer's and dementia care supporting seniors in the familiar safety of home across Pennsylvania. Trained memory care caregivers.`,
      canonical: "/dementia-alzheimers-care",
      keywords: ["dementia care Pennsylvania", "Alzheimers home care Bucks County", "memory care at home Philadelphia", "dementia caregiver PA"]
    },
    "respite-care": {
      title: `Post-Hospital & Family Respite Care Services in PA | ${site.name}`,
      description: `Post-hospital transitional care and reliable respite relief for family caregivers across Pennsylvania. Seamless care when you need it most.`,
      canonical: "/post-hospital-respite-care",
      keywords: ["respite care Pennsylvania", "post hospital home care Bucks County", "caregiver relief Philadelphia", "short term senior care PA"]
    }
  };

  const seo = service && serviceSeo[service];
  const title = seo ? seo.title : `Professional In-Home Care Services in Pennsylvania | ${site.name}`;
  const description = seo ? seo.description : `${site.name} provides licensed companion care, personal care, 24-hour live-in support, memory care, and respite care in Pennsylvania. Request a free assessment.`;
  const canonicalUrl = seo ? seo.canonical : "/services";
  const keywords = seo ? seo.keywords : [
    "in home care services PA",
    "senior caregiver services Pennsylvania",
    "companion care Bucks County",
    "personal care agency Philadelphia",
    "24 hour senior care PA",
    "Medicaid waiver home care PA"
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${site.url}${canonicalUrl}`,
      type: "website",
      siteName: `${site.name} — ${site.tagline}`,
      images: [
        {
          url: `${site.url}/images/og-image.webp`,
          secureUrl: `${site.url}/images/og-image.webp`,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: `${site.name} - Care Services in Pennsylvania`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.url}/images/og-image.webp`],
    },
  };
}

export default function ServicesPage({ searchParams }) {
  const service = searchParams?.service;

  const serviceJsonLd = {
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
            "name": "Services",
            "item": `${site.url}/services`
          }
        ]
      },
      {
        "@type": "Service",
        "name": service ? service.replace(/-/g, " ").toUpperCase() : "In-Home Senior Care Services",
        "provider": {
          "@type": "HomeHealthCareService",
          "name": site.name,
          "telephone": site.phoneDisplay,
          "url": site.url
        },
        "areaServed": site.serviceAreas.map(area => ({
          "@type": "AdministrativeArea",
          "name": area
        })),
        "serviceType": "In-Home Eldercare & Non-Medical Assistance"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicesClient initialService={service} />
    </>
  );
}
