import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  ShieldCheck,
  HeartHandshake,
  ClipboardList,
  Bath,
  Utensils,
  Brush,
  Car,
  Bell,
  AlertTriangle,
  Accessibility,
  ShoppingBag,
  ArrowRight,
  Heart,
  Star,
  Award,
  Home,
  Shield
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Placeholder from "@/components/Placeholder";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import ServiceAreasSearch from "@/components/ServiceAreasSearch";
import KnowledgeHub from "@/components/KnowledgeHub";
import GoogleReviews from "@/components/GoogleReviews";
import HowItWorks from "@/components/HowItWorks";

import { services, site } from "@/lib/site";

export const metadata = {
  title: `Home Care Services in Pennsylvania | ${site.name}`,
  description:
    "Trusted in-home senior care across South Central & Eastern PA. Serving 10 counties. Call today for a free consultation.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
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
                src="/images/photos/about-companion-knitting.jpg"
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

      <section className="w-full bg-white py-14 lg:py-24" aria-label="Google Reviews">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-10">
          <GoogleReviews />
        </div>
      </section>

      <CTASection />
    </>
  );
}
