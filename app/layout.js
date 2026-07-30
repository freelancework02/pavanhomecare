import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} | In-Home Care Services in Pennsylvania`,
    template: `%s | ${site.name} — ${site.tagline}`,
  },
  description:
    `${site.name} (${site.tagline}) provides compassionate, professional in-home senior care, companion care, 24-hour support, and Medicaid waiver care across Pennsylvania.`,
  keywords: [
    "Pavan Homecare",
    "Love driven care",
    "in-home senior care Pennsylvania",
    "companion care PA",
    "Medicaid waiver caregiver PA",
    "24 hour home care PA",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description:
      "Compassionate, professional in-home care services across Pennsylvania. Love driven care for your family.",
    url: site.url,
    siteName: `${site.name} — ${site.tagline}`,
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/images/pavan-logo/PavanHomecare_Transparent.png`,
    },
    {
      "@type": "LocalBusiness",
      name: `${site.name} - York PA Office`,
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
      areaServed: site.serviceAreas,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
