import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCallBar from "@/components/StickyCallBar";
import { site } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | In-Home Senior Care & Caregivers in Pennsylvania`,
    template: `%s | ${site.name}`,
  },
  description:
    "Compassionate, licensed in-home senior care and caregiver services across Bucks County, Philadelphia, Montgomery, and 9 PA counties. 24/7 care, Medicaid waiver, personal care & companion care.",
    keywords: [
    "how to get paid to take care of family member in PA",
    "paid family caregiver program Pennsylvania",
    "Community HealthChoices family caregiver pay",
    "in home care Bucks County PA",
    "home care agency Philadelphia PA",
    "best home care agency near me",
    "senior home care Feasterville PA",
    "home health care Montgomery County PA",
    "24 hour live-in care Pennsylvania",
    "Medicaid waiver home care PA",
    "elderly companion care PA",
    "private duty caregivers Pennsylvania",
    "dementia memory care Bucks County",
    "respite care Philadelphia PA",
    "personal care assistant PA",
    "Pavan Homecare",
    "top rated caregivers Bucks County",
    "urgent senior care placement PA",
    "post hospital discharge care PA",
    "Community HealthChoices waiver provider PA"
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${site.name} | In-Home Senior Care & Caregivers in Pennsylvania`,
    description:
      "Compassionate, licensed in-home senior care and caregiver services across Bucks County, Philadelphia, and 9 PA counties. Love driven care for your family.",
    url: site.url,
    siteName: `${site.name} — ${site.tagline}`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${site.url}/images/pavan-logo/PavanHomecare_Transparent.png`,
        width: 1200,
        height: 630,
        alt: `${site.name} - Love Driven Care Across Pennsylvania`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | In-Home Senior Care in Pennsylvania`,
    description:
      "Compassionate, licensed in-home care in Bucks, Philadelphia & surrounding PA communities. Request a free consultation.",
    images: [`${site.url}/images/pavan-logo/PavanHomecare_Transparent.png`],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google63a6f166145c4e73",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: "Pavan Homecare LLC",
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/pavan-logo/PavanHomecare_Transparent.png`,
        caption: site.name,
      },
      image: `${site.url}/images/pavan-logo/PavanHomecare_Transparent.png`,
      description:
        "Licensed in-home care agency delivering love-driven senior care, personal care, 24-hour live-in support, and Medicaid waiver care across 9 Pennsylvania counties.",
      telephone: site.phoneDisplay,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: site.phoneDisplay,
          contactType: "customer service",
          areaServed: "US-PA",
          availableLanguage: ["English"],
        },
      ],
      sameAs: [],
    },
    {
      "@type": ["HomeHealthCareService", "LocalBusiness"],
      "@id": `${site.url}/#headquarters`,
      name: `${site.name} - Headquarters`,
      image: `${site.url}/images/pavan-logo/PavanHomecare_Transparent.png`,
      url: site.url,
      telephone: site.phoneDisplay,
      email: site.email,
      priceRange: "$$",
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Check, Credit Card, Medicaid Waiver, Private Insurance",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.1557,
        longitude: -74.9818,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      areaServed: site.serviceAreas.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
      knowsAbout: [
        "In-Home Senior Care",
        "Personal Care & Daily Hygiene",
        "Companion Care & Emotional Support",
        "24-Hour & Live-In Care",
        "Alzheimer's & Dementia Memory Care",
        "Post-Hospital Discharge & Respite Care",
        "Pennsylvania Medicaid Waiver (Community HealthChoices)",
        "Fall Prevention & Mobility Support",
        "Medication Reminders",
        "Nutritious Meal Preparation",
        "Light Housekeeping & Laundry"
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-YN77HRL2ZQ";

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
