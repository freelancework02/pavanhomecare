"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Clock,
  ShieldCheck,
  Heart,
  Home,
  Building,
  Activity,
  UserCheck,
  Star,
  Shield,
  ArrowRight,
  User,
  HeartHandshake,
} from "lucide-react";

// Reusable CountyRow Component
function CountyRow({ icon: Icon, name, description, slug }) {
  return (
    <Link
      href={`/areas-we-serve/${slug}`}
      className="group flex items-center justify-between py-3.5 px-4 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#1E7FE0]/50 hover:bg-[#E8F2FD]/40 shadow-[0_4px_15px_rgba(16,24,43,0.04)] hover:shadow-[0_8px_25px_rgba(30,127,224,0.12)] hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2994A]"
    >
      <div className="flex items-center gap-3.5">
        {/* Accent Pin Icon Circle */}
        <div className="w-10 h-10 rounded-full bg-[#FCEEE0] text-[#F2994A] flex items-center justify-center shrink-0 group-hover:bg-[#F2994A] group-hover:text-white transition-colors duration-300 shadow-sm">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="font-poppins font-bold text-[15.5px] text-[#0B2A4A] group-hover:text-[#1E7FE0] transition-colors leading-snug">
            {name}
          </h4>
          <p className="text-[#4A5568] text-[12.5px] leading-tight mt-0.5">
            {description}
          </p>
        </div>
      </div>

      <ArrowRight
        size={16}
        className="text-[#8892A0] group-hover:text-[#1E7FE0] group-hover:translate-x-1 transition-all duration-300 shrink-0"
      />
    </Link>
  );
}

// Reusable StatCard Component
function TopStatCard({ icon: Icon, number, subtitle }) {
  return (
    <div className="bg-white rounded-[22px] border border-[#E8EEF8] p-4 px-5 shadow-[0_10px_25px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(47,128,255,0.1)] transition-all duration-300 flex items-center gap-3.5 group cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-[#2F80FF]/10 text-[#2F80FF] border border-[#2F80FF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#2F80FF] group-hover:text-white transition-colors">
        <Icon size={18} />
      </div>
      <div>
        <span className="font-poppins font-extrabold text-[22px] leading-none text-[#2F80FF] block">
          {number}
        </span>
        <span className="text-[12.5px] text-[#667085] font-medium leading-tight block mt-0.5">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

// Data Array for 9 PA Counties
const COUNTIES = [
  { slug: "philadelphia", name: "Philadelphia County", description: "Compassionate care for families across Philadelphia.", icon: Building },
  { slug: "bucks", name: "Bucks County", description: "Serving Bucks County with trusted home support.", icon: Home },
  { slug: "montgomery", name: "Montgomery County", description: "Providing quality in-home care in Montgomery County.", icon: Heart },
  { slug: "delaware", name: "Delaware County", description: "Supporting independence in Delaware County.", icon: Users },
  { slug: "chester", name: "Chester County", description: "Reliable care for families in Chester County.", icon: HeartHandshake },
  { slug: "lehigh", name: "Lehigh County", description: "Professional and personalized care in the Lehigh Valley.", icon: Activity },
  { slug: "northampton", name: "Northampton County", description: "Dedicated care services in Northampton County.", icon: UserCheck },
  { slug: "berks", name: "Berks County", description: "Compassionate care throughout Berks County.", icon: Star },
  { slug: "schuylkill", name: "Schuylkill County", description: "Reliable in-home care in Schuylkill County.", icon: Shield },
];

export default function ServiceAreasSearch() {
  return (
    <section className="w-full bg-white py-[110px] relative overflow-hidden">
      {/* Background Soft Blue Radial Gradients */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[rgba(90,160,255,0.08)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[rgba(90,160,255,0.05)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        
        {/* ── HEADER & TOP STATS ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          
          {/* Header Left (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-[#2F80FF]/10 text-[#2F80FF] px-4 py-1.5 rounded-full border border-[#2F80FF]/20 mb-4">
              <MapPin size={14} className="fill-[#2F80FF]" />
              <span className="text-[13px] font-semibold tracking-[0.08em] uppercase">AREAS WE SERVE</span>
            </div>

            {/* Title */}
            <h2 className="font-poppins font-extrabold text-[38px] sm:text-[52px] lg:text-[60px] leading-[1.05] text-[#11284F] tracking-[-2px] mb-4">
              Compassionate Home Care <br />
              Across{" "}
              <span className="bg-gradient-to-r from-[#63B4FF] to-[#2F80FF] bg-clip-text text-transparent">
                Pennsylvania
              </span>
            </h2>

            {/* Description */}
            <p className="text-[#667085] text-[18px] sm:text-[20px] font-normal leading-[1.7] max-w-[600px]">
              Pavan Homecare is proud to provide trusted, in-home care services to families across South Central Pennsylvania. We’re here to bring comfort, support, and peace of mind—right where you call home.
            </p>

            {/* Accent Line */}
            <div className="w-[60px] h-[3px] rounded-full bg-[#2F80FF] mt-4" />
          </div>

          {/* Top Stats Cards Right (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            <TopStatCard icon={MapPin} number="10+" subtitle="Counties Served" />
            <TopStatCard icon={Users} number="500+" subtitle="Families Helped" />
            <TopStatCard icon={Clock} number="24/7" subtitle="Care Support" />
            <TopStatCard icon={ShieldCheck} number="Trusted" subtitle="Local Provider" />
          </div>

        </div>

        {/* ── MAIN CONTENT: DOMINANT MAP (8 COLS) + OVERLAPPING COUNTY SIDEBAR (4 COLS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center mb-14">
          
          {/* LEFT: County List Sidebar Card (4 Cols - Overlapping Map Edge) */}
          <div className="lg:col-span-4 bg-white/95 backdrop-blur-md rounded-[30px] border border-[#E2E8F0] shadow-[0_20px_45px_rgba(11,42,74,0.12)] p-4 sm:p-5 flex flex-col justify-between z-20 lg:-mr-8 relative">
            <div className="flex flex-col">
              <div className="px-3 py-2 mb-2 border-b border-[#E2E8F0] flex items-center justify-between">
                <span className="font-poppins font-bold text-[14px] text-[#0B2A4A] uppercase tracking-wider">Target PA Counties</span>
                <span className="bg-[#FCEEE0] text-[#F2994A] font-extrabold text-[12px] px-2.5 py-0.5 rounded-full">9 Active</span>
              </div>
              <div className="max-h-[380px] overflow-y-auto pr-1">
                {COUNTIES.map((county, index) => (
                  <CountyRow
                    key={county.slug}
                    slug={county.slug}
                    name={county.name}
                    description={county.description}
                    icon={county.icon}
                    isLast={index === COUNTIES.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Dominant Interactive Map Container (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-[36px] border border-[#E2E8F0] shadow-[0_20px_50px_rgba(11,42,74,0.08)] p-6 sm:p-8 relative min-h-[500px] flex items-center justify-center group overflow-hidden z-10">
            
            {/* PA Counties Map Asset Image */}
            <div className="relative w-full h-[420px] sm:h-[500px] pl-0 lg:pl-6">
              <Image
                src="/images/pa_counties_map.jpg"
                alt="Illustrated Pennsylvania county coverage map showing Philadelphia, Bucks, Montgomery, Delaware, Chester, Lehigh, Northampton, Berks, Schuylkill"
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-contain transition-transform duration-700 group-hover:scale-102"
                priority
              />
            </div>

            {/* Coral Pin Near Center */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[48%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-xl"
            >
              <MapPin size={38} className="text-[#F2994A] fill-[#F2994A] stroke-white stroke-2" />
            </motion.div>

            {/* Bottom Floating Glass Callout Badge */}
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-3.5 px-5 rounded-[24px] shadow-[0_15px_35px_rgba(11,42,74,0.12)] border border-white flex items-center gap-3 z-20">
              <div className="w-9 h-9 rounded-full bg-[#FCEEE0] text-[#F2994A] flex items-center justify-center shrink-0">
                <Heart size={18} className="fill-[#F2994A]" />
              </div>
              <div className="text-[#0B2A4A] text-[13.5px] font-bold leading-snug">
                Bringing quality care <br />
                closer to your home.
              </div>
            </div>

          </div>

        </div>

        {/* ── BOTTOM FEATURE STRIP (FULL WIDTH BANNER) ── */}
        <div className="w-full rounded-[32px] bg-gradient-to-r from-[#F0F7FF] via-[#EBF4FF] to-[#F0F7FF] border border-[#2F80FF]/20 shadow-[0_15px_35px_rgba(47,128,255,0.05)] p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#2F80FF]/15 gap-6 sm:gap-0">
            
            {/* 1. Shield */}
            <div className="flex items-center gap-4 px-4 py-2 sm:py-0 group">
              <div className="w-13 h-13 rounded-2xl bg-[#0061FF]/10 text-[#0061FF] flex items-center justify-center shrink-0 group-hover:bg-[#0061FF] group-hover:text-white transition-colors duration-300 shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-[18px] text-[#11284F]">Local &amp; Trusted</h4>
                <p className="text-[#667085] text-[13.5px] leading-snug mt-0.5">
                  We&apos;re part of your community and dedicated to your family.
                </p>
              </div>
            </div>

            {/* 2. User */}
            <div className="flex items-center gap-4 px-4 py-2 sm:py-0 group">
              <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-[18px] text-[#11284F]">Personalized Care</h4>
                <p className="text-[#667085] text-[13.5px] leading-snug mt-0.5">
                  Care plans tailored to your loved one&apos;s needs.
                </p>
              </div>
            </div>

            {/* 3. Team */}
            <div className="flex items-center gap-4 px-4 py-2 sm:py-0 group">
              <div className="w-13 h-13 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-[18px] text-[#11284F]">Experienced Team</h4>
                <p className="text-[#667085] text-[13.5px] leading-snug mt-0.5">
                  Highly trained caregivers you can count on.
                </p>
              </div>
            </div>

            {/* 4. Clock */}
            <div className="flex items-center gap-4 px-4 py-2 sm:py-0 group">
              <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-[18px] text-[#11284F]">Always Here</h4>
                <p className="text-[#667085] text-[13.5px] leading-snug mt-0.5">
                  24/7 support when you need us most.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
