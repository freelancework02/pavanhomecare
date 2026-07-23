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

      <section className="about-luxury-section" aria-labelledby="about-story-heading">
        {/* Decorative elements */}
        <div className="about-luxury-bg-blob" aria-hidden="true" />
        <div className="about-luxury-bg-blob-2" aria-hidden="true" />

        <div className="container about-luxury-container">

          {/* Left Column (45% width) */}
          <div className="about-luxury-media">
            {/* Background Organic Gradients & Shapes */}
            <div className="about-luxury-media__backdrop-blob" aria-hidden="true" />
            <div className="about-luxury-floating-dot about-luxury-floating-dot--1" aria-hidden="true" />
            <div className="about-luxury-floating-dot about-luxury-floating-dot--2" aria-hidden="true" />

            <div className="about-luxury-image-container">
              <Image
                src="/images/image2.jpg"
                alt="Friendly professional caregiver supporting senior client walking with walker"
                fill
                sizes="(max-width: 56rem) 100vw, 45vw"
                className="about-luxury-media__img"
                style={{ objectFit: "cover" }}
              />

            </div>
          </div>

          {/* Right Column (55% width) */}
          <div className="about-luxury-content">
            <div className="about-luxury-badge-wrapper">
              <span className="about-luxury-badge">ABOUT PAVAN HOMECARE</span>
            </div>

            <h2 id="about-story-heading" className="about-luxury-title">
              Compassionate Care,<br />Delivered With Love.
            </h2>

            <div className="about-editorial-story">
              <p className="about-editorial-lead">
                Pavan Homecare was established to bridge a vital need: providing professional, high-quality care that never compromises on warmth, dignity, or human connection.
              </p>

              <p>
                We believe that home is more than just a place; it is a repository of memories, a source of comfort, and the foundation of independence. Our mission is to support seniors, veterans, and individuals with disabilities across York and surrounding PA counties, allowing them to lead fulfilling lives in the comfort of their familiar surroundings.
              </p>

              <p>
                Every Pavan caregiver is selected not just for their professional experience, but for their genuine empathy. We pair clients with caregivers who understand the unique rhythm of their daily life, providing a reliable partnership that honors individual routines, preferences, and personal independence.
              </p>

              <p className="about-editorial-signature">
                Dedicated to serving our community with reliable availability and families first.
              </p>
            </div>
          </div>

        </div>
      </section>

      <ServiceAreasSearch />

      <KnowledgeHub />

      <section className="section" aria-label="Google Reviews">
        <div className="container">
          <GoogleReviews />
        </div>
      </section>

      <CTASection />
    </>
  );
}
