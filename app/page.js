import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import ServiceAreasSearch from "@/components/ServiceAreasSearch";
import KnowledgeHub from "@/components/KnowledgeHub";
import GoogleReviews from "@/components/GoogleReviews";
import HowItWorks from "@/components/HowItWorks";
import HomeFaq, { homeFaqs } from "@/components/HomeFaq";
import { services, site } from "@/lib/site";

export const metadata = {
  title: "Pavan Homecare | In-Home Senior Care & Caregiver Services in Bucks County, Pennsylvania",
  description:
    "Trusted in-home senior care across Pennsylvania. Serving 9 counties including Bucks, Philadelphia, Montgomery, Delaware, and Chester. Companion care, personal care, 24/7 care & Medicaid waiver assistance.",
  alternates: { canonical: "/" },
  keywords: [
    "in home care Pennsylvania",
    "Bucks County senior care",
    "home care agency Philadelphia PA",
    "personal care Feasterville PA",
    "24 hour live-in care PA",
    "companion care for elderly PA",
    "dementia care Bucks County",
    "Medicaid waiver home care provider PA"
  ],
  openGraph: {
    title: "Pavan Homecare | In-Home Senior Care & Caregiver Services in Bucks County, Pennsylvania",
    description:
      "Compassionate, licensed in-home care tailored to your family's needs. Serving Bucks County, Philadelphia, and 9 PA counties.",
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: `${site.url}/images/og-image.webp`,
        secureUrl: `${site.url}/images/og-image.webp`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Pavan Homecare - In-Home Senior Care & Caregiver Services in Bucks County, Pennsylvania",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavan Homecare | In-Home Senior Care & Caregiver Services in Bucks County, Pennsylvania",
    description:
      "Compassionate, licensed in-home care tailored to your family's needs. Serving Bucks County, Philadelphia, and 9 PA counties.",
    images: [`${site.url}/images/og-image.webp`],
  },
};

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What in-home care services does Pavan Homecare provide in Pennsylvania?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pavan Homecare provides comprehensive, licensed non-medical senior home care across 9 Pennsylvania counties. Our services include personal hygiene care, companion care, 24-hour live-in care, specialized Alzheimer's and dementia memory care, medication reminders, meal preparation, mobility assistance, and post-hospital respite care."
          }
        },
        {
          "@type": "Question",
          "name": "Does Pennsylvania Medicaid (Community HealthChoices) pay for in-home care?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Eligible seniors and individuals with disabilities in Pennsylvania can receive 100% state-funded in-home care through the Pennsylvania Community HealthChoices (CHC) and OBRA Medicaid waiver programs. Pavan Homecare works closely with participants, families, and service coordinators to quickly initiate approved care hours."
          }
        },
        {
          "@type": "Question",
          "name": "How much does in-home senior care cost in Pennsylvania?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Private-pay home care in Pennsylvania typically ranges from $28 to $36 per hour depending on scheduling and care intensity. We provide completely transparent pricing with flexible hourly schedules and zero long-term binding contracts. We also assist families utilizing Long-Term Care Insurance and Veterans Aid & Attendance benefits."
          }
        },
        {
          "@type": "Question",
          "name": "Can family members get paid to be caregivers in Pennsylvania?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Under Pennsylvania's Community HealthChoices Medicaid waiver, qualifying family members (such as adult daughters, sons, or relatives) can often be hired, trained, and paid as official caregivers through Pavan Homecare."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can care services start for my loved one?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In most cases, our care coordinators can conduct a complimentary in-home assessment and match a compassionate caregiver within 24 to 48 hours."
          }
        },
        {
          "@type": "Question",
          "name": "Are Pavan Homecare caregivers background-checked and insured?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 100%. Every caregiver at Pavan Homecare undergoes rigorous multi-state criminal background checks, FBI fingerprinting, reference verification, and drug screening. Pavan Homecare is licensed by the Pennsylvania Department of Health, bonded, and fully insured."
          }
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.tagline,
      publisher: {
        "@id": `${site.url}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${site.url}/areas-we-serve?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "HomeHealthCareService",
      "@id": `${site.url}/#service`,
      name: `${site.name} In-Home Senior Care Services`,
      url: site.url,
      telephone: site.phoneDisplay,
      description:
        "Comprehensive in-home senior care and caregiver services throughout Pennsylvania. Specializing in companion care, personal hygiene, 24-hour live-in support, Alzheimer's care, and Medicaid waiver support.",
      provider: {
        "@id": `${site.url}/#organization`,
      },
      areaServed: site.serviceAreas.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "In-Home Care Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Companion Care",
              description:
                "Friendly socialization, meal preparation, medication reminders, light housekeeping, and errands to keep seniors active and connected.",
              url: `${site.url}/companion-care`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Personal Care & Hygiene",
              description:
                "Dignified personal hygiene, bathing, dressing, grooming, toileting, and mobility assistance by trained caregivers.",
              url: `${site.url}/personal-care`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "24-Hour & Live-In Care",
              description:
                "Continuous around-the-clock supervision and immediate assistance for seniors requiring constant support.",
              url: `${site.url}/24-hour-live-in-care`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Alzheimer's & Dementia Memory Care",
              description:
                "Specialized memory support, structured routines, wandering prevention, and cognitive engagement in the comforting familiarity of home.",
              url: `${site.url}/dementia-alzheimers-care`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Post-Hospital & Respite Care",
              description:
                "Short-term relief for family caregivers and dedicated recovery support following hospital discharge or surgery.",
              url: `${site.url}/post-hospital-respite-care`,
            },
          },
        ],
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <HeroSection />

      {/* New Asymmetric Bento Grid Services Section */}
      <ServicesSection />

      {/* Pixel-Perfect Reference Clone Why Choose Us Section */}
      <WhyChooseUs />

      <HowItWorks />

      <section className="w-full bg-[#F5F9FF] py-14 lg:py-24 relative overflow-hidden border-y border-[#DCE7F7]" aria-labelledby="about-story-heading">
        {/* Decorative elements */}
        <div className="about-luxury-bg-blob" aria-hidden="true" />
        <div className="about-luxury-bg-blob-2" aria-hidden="true" />

        <div className="container about-luxury-container">

          {/* Left Column (Asymmetric Full-Bleed Media 5 Cols) */}
          <div className="lg:col-span-5 relative group">
            {/* Background Layered Decorative Blob & Pattern */}
            <div className="absolute -top-6 -left-6 w-[120%] h-[110%] bg-gradient-to-tr from-[#0061FF]/10 via-[#FF7A59]/10 to-[#0061FF]/10 rounded-[24px] blur-xl -z-10 transform -rotate-2" />
            
            <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,26,77,0.14)] border-4 border-white">
              <Image
                src="/images/photos/about-companion-knitting.webp"
                alt="Friendly professional caregiver supporting senior client walking with walker"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001A4D]/30 via-transparent to-transparent pointer-events-none" />

              {/* Overlapping Coral Badge Chip */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-3.5 px-5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFEDE7] text-[#FF7A59] flex items-center justify-center font-bold text-[18px]">
                  ♥
                </div>
                <div>
                  <span className="font-extrabold text-[14px] text-[#001A4D] block leading-tight">Love-Driven Care</span>
                  <span className="text-[12px] text-[#4A5A73]">Tailored for every family</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-white text-[#001A4D] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-[#0061FF]/20 shadow-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
              <span>ABOUT PAVAN HOMECARE</span>
            </div>

            <h2 id="about-story-heading" className="font-poppins font-extrabold text-[36px] sm:text-[48px] leading-[1.12] text-[#001A4D] tracking-[-0.8px] mb-6">
              Compassionate Care,<br />
              <span className="bg-gradient-to-r from-[#0061FF] via-[#0061FF] to-[#60EFFF] bg-clip-text text-transparent">
                Delivered With Love.
              </span>
            </h2>

            <div className="about-editorial-story">
              <p className="text-[17px] sm:text-[18px] font-semibold text-[#001A4D] leading-relaxed mb-6 border-l-4 border-[#FF7A59] pl-4 bg-white/60 py-3 rounded-r-xl shadow-sm">
                Pavan Homecare was established to bridge a vital need: providing professional, high-quality care that never compromises on warmth, dignity, or human connection.
              </p>

              <p className="text-[#4A5A73] text-[15.5px] leading-relaxed mb-4">
                We believe that home is more than just a place; it is a repository of memories, a source of comfort, and the foundation of independence. Our mission is to support seniors, veterans, and individuals with disabilities across Philadelphia, Bucks, Montgomery, Delaware, Chester, and surrounding PA counties, allowing them to lead fulfilling lives in the comfort of their familiar surroundings.
              </p>

              <p className="text-[#4A5A73] text-[15.5px] leading-relaxed mb-4">
                Every Pavan caregiver is selected not just for their professional experience, but for their genuine empathy. We pair clients with caregivers who understand the unique rhythm of their daily life, providing a reliable partnership that honors individual routines, preferences, and personal independence.
              </p>

              <p className="font-semibold italic text-[#0061FF] mt-6 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#FF7A59] rounded-full inline-block" />
                <span>Dedicated to serving our community with reliable availability and families first.</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      <ServiceAreasSearch />

      <KnowledgeHub />

      <section id="reviews" className="w-full bg-white py-14 lg:py-24" aria-label="Google Reviews">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-10">
          <GoogleReviews />
        </div>
      </section>

      <HomeFaq />

      <CTASection />
    </>
  );
}
