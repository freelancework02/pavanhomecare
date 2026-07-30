"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Clock,
  UserCheck,
  Home,
  Users,
  Star,
  PhoneCall,
  FileText,
} from "lucide-react";

// Reusable FeatureCard Component
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl border border-[#DCE7F7] p-6 shadow-[0_4px_20px_rgba(11,23,48,0.06)] hover:-translate-y-1.5 hover:border-[#0061FF]/40 hover:shadow-[0_8px_30px_rgba(11,23,48,0.12)] transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full relative border-t-4 border-t-[#FF7A59]">
      <div>
        {/* Blue Circular Icon Container */}
        <div className="w-11 h-11 rounded-full bg-[#E8F2FF] text-[#0061FF] flex items-center justify-center mb-4 group-hover:bg-[#0061FF] group-hover:text-white transition-colors duration-300 shadow-sm">
          <Icon size={20} />
        </div>

        {/* Title */}
        <h3 className="font-poppins font-bold text-[18px] text-[#001A4D] mb-2 leading-snug group-hover:text-[#0061FF] transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#4A5A73] text-[13.5px] leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {/* Accent Line at Bottom Left */}
      <div className="w-[40px] h-[3px] rounded-full bg-[#FF7A59] group-hover:w-[60px] transition-all duration-300" />
    </div>
  );
}

// Data Array for Feature Cards
const FEATURES = [
  {
    id: "personalized-care",
    icon: UserCheck,
    title: "Personalized Care",
    description: "Care plans tailored to your loved one's unique needs and preferences.",
  },
  {
    id: "experienced-caregivers",
    icon: ShieldCheck,
    title: "Experienced Caregivers",
    description: "Trained, background-checked professionals you can trust in your home.",
  },
  {
    id: "reliable-consistent",
    icon: Clock,
    title: "Reliable & Consistent",
    description: "We show up on time, every time, with care your family can count on.",
  },
  {
    id: "compassionate-support",
    icon: Heart,
    title: "Compassionate Support",
    description: "We treat your loved ones with dignity, respect, and genuine care.",
  },
  {
    id: "safety-first",
    icon: Home,
    title: "Safety First Approach",
    description: "Prioritizing home safety, fall prevention, and healthy daily routines.",
  },
  {
    id: "locally-owned",
    icon: Users,
    title: "Locally Owned & Trusted",
    description: "Regular updates and transparent care tracking so families stay informed.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white py-14 lg:py-24 relative overflow-hidden" id="why-choose-us">
      {/* Background Radial Glows */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#0061FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF7A59]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        
        {/* ── HEADER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 bg-[#E8F2FF] text-[#001A4D] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-[#0061FF]/20">
              <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
              <span>WHY CHOOSE US</span>
            </div>

            <h2 className="font-poppins font-extrabold text-[36px] sm:text-[48px] leading-[1.12] text-[#001A4D] tracking-[-0.8px]">
              Why Families Trust <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#0061FF] via-[#0061FF] to-[#60EFFF] bg-clip-text text-transparent">
                Pavan Homecare
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[#4A5A73] text-[16px] sm:text-[17px] leading-relaxed">
              We know how important it is to find care you can rely on. Pavan Homecare is dedicated to delivering professional, dignified, and loving care in South Central & Eastern PA.
            </p>
          </div>
        </div>

        {/* ── ASYMMETRIC MERGED COMPOSITION: 7-COL FEATURE GRID + 5-COL TALL STATS CARD ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT SIDE (7 Cols): 2x3 Grid of Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* RIGHT SIDE (5 Cols): Tall Deep Navy Stats Panel Spanning Full Height */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="w-full h-full rounded-2xl bg-[#001A4D] border border-white/10 shadow-[0_20px_50px_rgba(0,26,77,0.3)] p-8 flex flex-col justify-between relative overflow-hidden group">
              
              {/* Background Image Layer with Gradient Overlay */}
              <div className="absolute inset-0 z-0 opacity-20 group-hover:scale-105 transition-transform duration-700">
                <Image
                  src="/images/why_choose_hug.jpg"
                  alt="Caregiver hugging senior client"
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#001A4D]/90 via-[#001A4D]/95 to-[#001A4D] z-0" />

              {/* Content Container */}
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                
                {/* Header Badge Inside Dark Card */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 text-[#FF7A59] font-bold text-[11px] tracking-widest uppercase px-3 py-1 rounded-full mb-4 border border-white/15">
                    <span>PAVAN IMPACT</span>
                  </div>
                  <h3 className="font-poppins font-extrabold text-[24px] text-white leading-tight">
                    Trusted by Over 500+ Families Across PA
                  </h3>
                </div>

                {/* 4 Vertical Stat Rows */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
                  <div className="flex flex-col">
                    <span className="font-poppins font-extrabold text-[36px] text-[#FF7A59] leading-none">500+</span>
                    <span className="font-bold text-[14px] text-white mt-1">Happy Families</span>
                    <span className="text-[12px] text-[#8A97AC]">Community trust</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-poppins font-extrabold text-[36px] text-[#FF7A59] leading-none">98%</span>
                    <span className="font-bold text-[14px] text-white mt-1">Satisfaction</span>
                    <span className="text-[12px] text-[#8A97AC]">Family rating</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-poppins font-extrabold text-[36px] text-[#FF7A59] leading-none">15+</span>
                    <span className="font-bold text-[14px] text-white mt-1">Years Care</span>
                    <span className="text-[12px] text-[#8A97AC]">Local experience</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-poppins font-extrabold text-[36px] text-[#FF7A59] leading-none">24/7</span>
                    <span className="font-bold text-[14px] text-white mt-1">Support</span>
                    <span className="text-[12px] text-[#8A97AC]">Always available</span>
                  </div>
                </div>

                {/* Bottom Avatar Badge */}
                <div className="bg-[#FF7A59] text-white p-3.5 px-4 rounded-2xl border border-white/20 flex items-center justify-between shadow-lg mt-2">
                  <div>
                    <span className="font-extrabold text-[15px] block leading-tight">Licensed &amp; Vetted</span>
                    <span className="text-[11px] text-white/90 font-medium">100% Background Checked</span>
                  </div>
                  <div className="flex items-center shrink-0">
                    <Image src="/images/reviewer_gloria.png" alt="Client 1" width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover -ml-2 first:ml-0" />
                    <Image src="/images/reviewer_reginald.png" alt="Client 2" width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover -ml-2" />
                    <Image src="/images/review_gloria_photo.png" alt="Client 3" width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover -ml-2" />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
