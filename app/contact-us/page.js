import "./contact.css";
import ContactClient from "@/components/ContactClient";
import { site } from "@/lib/site";

export const metadata = {
  title: `Contact Us & Free In-Home Consultation | ${site.name}`,
  description: `Schedule a free in-home consultation or speak with a live 24/7 care coordinator at ${site.name}. Compassionate senior care across 9 PA counties.`,
  alternates: {
    canonical: "/contact-us",
  },
  keywords: [
    "contact home care PA",
    "free home care consultation Bucks County",
    "hire caregiver Philadelphia",
    "emergency senior care placement PA",
    "Pavan Homecare phone number",
    "schedule in-home care assessment"
  ],
  openGraph: {
    title: `Contact Us & Free In-Home Consultation | ${site.name}`,
    description: `Schedule a free in-home consultation or speak with a live care coordinator at ${site.name}. Compassionate senior care across 9 PA counties.`,
    url: `${site.url}/contact-us`,
    type: "website",
    siteName: `${site.name} — ${site.tagline}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${site.name} | Free In-Home Care Consultation`,
    description: `Connect with our live Feasterville care coordination team today.`,
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
          "name": "Contact Us",
          "item": `${site.url}/contact-us`
        }
      ]
    },
    {
      "@type": "ContactPage",
      "@id": `${site.url}/contact-us/#webpage`,
      "url": `${site.url}/contact-us`,
      "name": `Contact ${site.name}`,
      "description": "24/7 live in-home care coordination and assessment scheduling.",
      "mainEntity": {
        "@type": "HomeHealthCareService",
        "name": site.name,
        "telephone": site.phoneDisplay,
        "email": site.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": site.address.line1,
          "addressLocality": site.address.city,
          "addressRegion": site.address.state,
          "postalCode": site.address.zip,
          "addressCountry": "US"
        }
      }
    }
  ]
};

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
