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
function CountyRow({ icon: Icon, name, description, slug, isLast }) {
  return (
    <Link
      href={`/areas-we-serve/${slug}`}
      className={`group flex items-center justify-between py-3.5 px-4 rounded-2xl hover:bg-[#F0F7FF] transition-all duration-300 ${
        !isLast ? "border-b border-[#E8EEF8]" : ""
      }`}
    >
      <div className="flex items-center gap-3.5">
        {/* Blue Circular Icon */}
        <div className="w-10 h-10 rounded-full bg-[#2F80FF]/10 text-[#2F80FF] flex items-center justify-center shrink-0 group-hover:bg-[#2F80FF] group-hover:text-white transition-colors duration-300 shadow-sm">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="font-poppins font-bold text-[16px] text-[#11284F] group-hover:text-[#2F80FF] transition-colors leading-snug">
            {name}
          </h4>
          <p className="text-[#667085] text-[13px] leading-tight mt-0.5">
            {description}
          </p>
        </div>
      </div>

      <ArrowRight
        size={16}
        className="text-[#A0AEC0] group-hover:text-[#2F80FF] group-hover:translate-x-1 transition-all duration-300 shrink-0"
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

// Data Array for 10 PA Counties
const COUNTIES = [
  { slug: "york", name: "York County", description: "Compassionate care for families across York.", icon: Home },
  { slug: "lancaster", name: "Lancaster County", description: "Serving Lancaster with trusted in-home support.", icon: Heart },
  { slug: "adams", name: "Adams County", description: "Providing quality home care in Adams County.", icon: HeartHandshake },
  { slug: "cumberland", name: "Cumberland County", description: "Supporting independence in Cumberland County.", icon: Users },
  { slug: "dauphin", name: "Dauphin County", description: "Reliable care for families in Dauphin County.", icon: Building },
  { slug: "lebanon", name: "Lebanon County", description: "Professional and personalized care in Lebanon.", icon: Activity },
  { slug: "franklin", name: "Franklin County", description: "Helping families live comfortably at home.", icon: Home },
  { slug: "perry", name: "Perry County", description: "Dedicated care services in Perry County.", icon: UserCheck },
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

        {/* ── MAIN CONTENT (2-COLUMN LAYOUT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] items-stretch mb-14">
          
          {/* LEFT: County List Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-[30px] border border-[#E8EEF8] shadow-[0_15px_35px_rgba(0,0,0,0.04)] p-4 sm:p-6 flex flex-col justify-between">
            <div className="flex flex-col">
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

          {/* RIGHT: Interactive Map Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[32px] border border-[#E8EEF8] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 sm:p-8 relative min-h-[480px] flex items-center justify-center group overflow-hidden">
            
            {/* PA Counties Map Asset Image */}
            <div className="relative w-full h-[400px] sm:h-[480px]">
              <Image
                src="/images/pa_counties_map.jpg"
                alt="Illustrated Pennsylvania county coverage map showing York, Lancaster, Adams, Cumberland, Dauphin, Lebanon, Berks, Schuylkill, Perry, Franklin"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain transition-transform duration-700 group-hover:scale-102"
                priority
              />
            </div>

            {/* Blue Location Pin Near Center */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[48%] left-[58%] -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-xl"
            >
              <MapPin size={38} className="text-[#2F80FF] fill-[#2F80FF] stroke-white stroke-2" />
            </motion.div>

            {/* Floating Circular Image Top-Right */}
            <div className="hidden sm:block absolute -top-8 -right-6 lg:-top-10 lg:-right-8 z-20">
              
              {/* Dotted Blue Semi-Circle Decoration */}
              <div className="absolute -top-6 -right-6 w-[230px] h-[230px] rounded-full border-2 border-dashed border-[#2F80FF]/35 pointer-events-none" />

              <div className="w-[180px] sm:w-[210px] aspect-square rounded-full overflow-hidden border-[7px] border-white shadow-[0_15px_35px_rgba(0,0,0,0.12)] relative">
                <Image
                  src="/images/why_choose_hug.jpg"
                  alt="Caregiver hugging senior client"
                  fill
                  sizes="210px"
                  className="object-cover"
                />
              </div>

              {/* Bottom-Right Floating Glass Icon Button */}
              <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#2F80FF] border border-white/80 absolute bottom-1 right-1 z-30">
                <Heart size={18} className="fill-[#2F80FF]" />
              </div>
            </div>

            {/* Bottom Floating Glass Callout Badge */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-3.5 px-5 rounded-[24px] shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white/80 flex items-center gap-3 z-20">
              <div className="w-9 h-9 rounded-full bg-[#2F80FF]/15 text-[#2F80FF] flex items-center justify-center shrink-0">
                <Heart size={18} className="fill-[#2F80FF]" />
              </div>
              <div className="text-[#11284F] text-[13.5px] font-bold leading-snug">
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
