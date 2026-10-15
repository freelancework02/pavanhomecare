import { notFound } from "next/navigation";
import { countiesData, citiesData } from "@/lib/countiesData";
import CountyPageClient from "./CountyPageClient";
import { site } from "@/lib/site";

function resolveCountyData(countyParam) {
  if (!countyParam) return null;
  const direct = countiesData[countyParam];
  if (direct) return direct;
  const normalized = countyParam.toLowerCase().replace(/-county$/, "");
  return countiesData[normalized] || null;
}

export async function generateStaticParams() {
  const baseKeys = Object.keys(countiesData);
  const withSuffix = baseKeys.map((c) => ({ county: `${c}-county` }));
  const standard = baseKeys.map((county) => ({ county }));
  return [...standard, ...withSuffix];
}

export async function generateMetadata({ params, searchParams }) {
  const data = resolveCountyData(params.county);
  if (!data) return {};

  const city = searchParams?.city;
  const isCity = city && citiesData[city];
  const title = isCity ? citiesData[city].seoTitle : data.seoTitle;
  const description = isCity ? citiesData[city].metaDescription : data.metaDescription;
  const canonicalUrl = isCity ? `/${city}-pa-home-care` : `/areas-we-serve/${data.slug}`;

  const localizedKeywords = isCity
    ? [
        `home care ${citiesData[city].name} PA`,
        `senior care in ${citiesData[city].name}`,
        `in home caregivers ${citiesData[city].name} Pennsylvania`,
        `personal care ${citiesData[city].name}`,
        `24 hour caregiver ${citiesData[city].name} PA`,
        `Medicaid waiver care ${citiesData[city].name}`
      ]
    : [
        `home care ${data.name} PA`,
        `senior care ${data.name}`,
        `in home caregivers ${data.name} Pennsylvania`,
        `companion care ${data.name}`,
        `personal care agency ${data.name}`,
        `live in care ${data.name} PA`,
        `dementia care ${data.name}`
      ];

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: localizedKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    openGraph: {
      title,
      description,
      url: `${site.url}${canonicalUrl}`,
      type: "website",
      siteName: site.name,
      images: [
        {
          url: `${site.url}/images/og-image.webp`,
          secureUrl: `${site.url}/images/og-image.webp`,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: `${title} - Pavan Homecare`,
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

export default function CountyPage({ params, searchParams }) {
  const data = resolveCountyData(params.county);
  
  if (!data) {
    notFound();
  }

  const city = searchParams?.city;
  const isCity = city && citiesData[city];
  const pageTitle = isCity ? citiesData[city].seoTitle : data.seoTitle;
  const pageDesc = isCity ? citiesData[city].metaDescription : data.metaDescription;
  const canonicalUrl = isCity ? `/${city}-pa-home-care` : `/areas-we-serve/${data.slug}`;

  // Generate dynamic JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}${canonicalUrl}/#localbusiness`,
        "name": isCity ? `${site.name} - Home Care in ${citiesData[city].name}, PA` : `${site.name} - ${data.name} In-Home Care`,
        "url": `${site.url}${canonicalUrl}`,
        "telephone": site.phoneDisplay,
        "email": site.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": site.address.line1,
          "addressLocality": site.address.city,
          "addressRegion": site.address.state,
          "postalCode": site.address.zip,
          "addressCountry": "US"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": isCity ? `${citiesData[city].name}, PA` : data.name
        },
        "description": pageDesc
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}${canonicalUrl}/#breadcrumb`,
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": isCity ? `${citiesData[city].name}, PA` : data.name,
            "item": `${site.url}${canonicalUrl}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}${canonicalUrl}/#faq`,
        "mainEntity": (data.faqs || []).map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
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
      <CountyPageClient data={data} city={city} />
    </>
  );
}
