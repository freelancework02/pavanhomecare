import ServicesClient from "./ServicesClient";
import { site } from "@/lib/site";

export async function generateMetadata({ searchParams }) {
  const service = searchParams?.service;

  const serviceSeo = {
    "companion-care": {
      title: `Companion Care | ${site.name}`,
      description: `Companion Care tailored to your family's needs, available across 10 PA counties. Learn what's included and request a free consultation.`,
      canonical: "/companion-care"
    },
    "personal-care": {
      title: `Personal Care & Daily Hygiene | ${site.name}`,
      description: `Hands-on Personal Care & hygiene assistance tailored to your family's needs across Pennsylvania. Request a free in-home consultation.`,
      canonical: "/personal-care"
    },
    "24hour-care": {
      title: `24-Hour & Live-In Care | ${site.name}`,
      description: `Continuous 24-Hour & Live-In Care tailored to your family's needs across Pennsylvania. Request a free in-home consultation.`,
      canonical: "/24-hour-live-in-care"
    },
    "dementia-care": {
      title: `Alzheimer's & Dementia Care | ${site.name}`,
      description: `Specialized Memory & Dementia Care tailored to your family's needs across Pennsylvania. Request a free in-home consultation.`,
      canonical: "/dementia-alzheimers-care"
    },
    "respite-care": {
      title: `Post-Hospital & Respite Care | ${site.name}`,
      description: `Post-Hospital & Family Respite Care tailored to your family's needs across Pennsylvania. Request a free in-home consultation.`,
      canonical: "/post-hospital-respite-care"
    }
  };

  const seo = service && serviceSeo[service];
  const title = seo ? seo.title : `Professional In-Home Care Services | ${site.name}`;
  const description = seo ? seo.description : `${site.name} provides licensed companion care, personal care, memory support, and respite care in Pennsylvania. Request a free assessment.`;
  const canonicalUrl = seo ? seo.canonical : "/services";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${site.url}${canonicalUrl}`,
      type: "website",
      siteName: `${site.name} — ${site.tagline}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ServicesPage({ searchParams }) {
  return <ServicesClient initialService={searchParams?.service} />;
}
