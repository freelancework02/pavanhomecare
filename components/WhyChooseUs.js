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
  Award,
  PhoneCall,
  FileText,
  CheckCircle2,
} from "lucide-react";

// Reusable FeatureCard Component
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-[26px] border border-[#E9EEF8] p-7 sm:p-8 shadow-[0_18px_45px_rgba(32,60,120,0.08)] hover:-translate-y-1.5 hover:border-[#2F80FF] hover:shadow-[0_25px_55px_rgba(32,60,120,0.14)] transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full relative">
      <div>
        {/* Blue Circular Icon Container */}
        <div className="w-[58px] h-[58px] rounded-full bg-[#2F80FF]/10 text-[#2F80FF] flex items-center justify-center mb-6 group-hover:bg-[#2F80FF] group-hover:text-white transition-colors duration-300 shadow-sm">
          <Icon size={26} />
        </div>

        {/* Title */}
        <h3 className="font-poppins font-bold text-[20px] sm:text-[22px] text-[#11284F] mb-3 leading-snug group-hover:text-[#2F80FF] transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#667085] text-[15px] sm:text-[16.5px] leading-[1.65] mb-6">
          {description}
        </p>
      </div>

      {/* Small Blue Accent Line at Bottom Left */}
      <div className="w-[48px] h-[3px] rounded-full bg-[#2F80FF] group-hover:w-[68px] transition-all duration-300" />
    </div>
  );
}

// Reusable StatCard Component
function StatCard({ icon: Icon, number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-4 sm:py-6 group">
      {/* Blue Outline Icon Circle */}
      <div className="w-11 h-11 rounded-full bg-white text-[#2F80FF] border border-[#2F80FF]/25 flex items-center justify-center mb-3 shadow-sm group-hover:bg-[#2F80FF] group-hover:text-white transition-all duration-300">
        <Icon size={20} />
      </div>

      {/* Large Gradient Number */}
      <span className="font-poppins font-extrabold text-[36px] sm:text-[46px] lg:text-[52px] leading-none bg-gradient-to-r from-[#62B1FF] to-[#2F80FF] bg-clip-text text-transparent">
        {number}
      </span>

      {/* Title */}
      <h4 className="font-poppins font-bold text-[18px] sm:text-[20px] lg:text-[21px] text-[#11284F] mt-1 leading-snug">
        {title}
      </h4>

      {/* Description */}
      <p className="text-[#667085] text-[13px] sm:text-[14px] mt-1 font-normal">
        {description}
      </p>
    </div>
  );
}

// Data Array for 8 Feature Cards
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
    description: "We follow strict safety standards to ensure peace of mind for every family.",
  },
  {
    id: "locally-owned",
    icon: Users,
    title: "Locally Owned & Trusted",
    description: "Proudly serving South Central Pennsylvania families with heart.",
  },
  {
    id: "twentyfour-seven-support",
    icon: PhoneCall,
    title: "24/7 Support",
    description: "Round-the-clock support whenever you need us, day or night.",
  },
  {
    id: "licensed-insured",
    icon: FileText,
    title: "Licensed & Insured",
    description: "Your safety and peace of mind are always our top priority.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white py-[110px] relative overflow-hidden">
      {/* Background Soft Blue Radial Orbs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[rgba(74,144,255,0.08)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[rgba(74,144,255,0.07)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[rgba(74,144,255,0.06)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        
        {/* SVG Definition for Normalized Responsive Heart Clip Path */}
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <clipPath id="heartClipPath" clipPathUnits="objectBoundingBox">
              <path d="M 0.5,0.14 C 0.62,-0.02 0.88,-0.02 0.98,0.2 C 1.08,0.46 0.85,0.72 0.5,0.98 C 0.15,0.72 -0.08,0.46 0.02,0.2 C 0.12,-0.02 0.38,-0.02 0.5,0.14 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* ── TOP HERO LAYOUT: 3 COLUMNS (LEFT FLOATING IMAGE - CENTER HEADER - RIGHT FLOATING IMAGE) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 relative">
          
          {/* LEFT: Heart-Shaped Healthcare Image with Floating Glass Cards (3 Cols) */}
          <div className="lg:col-span-3 flex justify-center order-2 lg:order-1 relative">
            <div className="relative w-[280px] sm:w-[320px] lg:w-[340px] aspect-square group">
              
              {/* Heart Shaped Mask Container */}
              <div 
                className="w-full h-full relative overflow-hidden shadow-[0_20px_50px_rgba(32,60,120,0.12)] border-4 border-white transition-transform duration-700 group-hover:scale-105"
                style={{
                  clipPath: "url(#heartClipPath)",
                  WebkitClipPath: "url(#heartClipPath)"
                }}
              >
                <Image
                  src="/images/why_choose_hug.jpg"
                  alt="Compassionate caregiver hugging smiling senior client on sofa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  priority
                  className="object-cover object-center scale-135 group-hover:scale-145 transition-transform duration-700"
                />
              </div>

              {/* Floating Glass Card 1: Top Left Shield Icon */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -left-3 bg-white/85 backdrop-blur-md p-3 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-white/60 text-[#2F80FF] z-20"
              >
                <ShieldCheck size={22} />
              </motion.div>

              {/* Floating Glass Card 2: Bottom Right Home Icon */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-3 -right-3 bg-white/85 backdrop-blur-md p-3 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-white/60 text-[#2F80FF] z-20"
              >
                <Home size={22} />
              </motion.div>
            </div>
          </div>

          {/* CENTER: Header & Typography (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center text-center order-1 lg:order-2">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-[#2F80FF]/10 text-[#2F80FF] px-4 py-1.5 rounded-full border border-[#2F80FF]/20 mb-[26px]">
              <Heart size={14} className="fill-[#2F80FF]" />
              <span className="text-[13px] font-semibold tracking-[0.08em] uppercase">WHY CHOOSE US</span>
            </div>

            {/* Main Title */}
            <h2 className="font-poppins font-extrabold text-[38px] sm:text-[52px] lg:text-[60px] leading-[1.05] text-[#11284F] tracking-[-2px] mb-6">
              Why Families Trust <br />
              <span className="bg-gradient-to-r from-[#62B1FF] to-[#2F80FF] bg-clip-text text-transparent">
                Pavan Homecare
              </span>
            </h2>

            {/* Description */}
            <p className="text-[#667085] text-[18px] sm:text-[20px] font-normal leading-[1.7] max-w-[650px]">
              We go beyond basic care to deliver meaningful support built on trust, compassion, and consistency.
            </p>
          </div>

          {/* RIGHT: Large Portrait Healthcare Image with Floating Badge (3 Cols) */}
          <div className="lg:col-span-3 flex justify-center order-3 relative">
            <div className="relative w-[280px] sm:w-[320px] lg:w-[320px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(32,60,120,0.12)] border-4 border-white group">
              <Image
                src="/images/why_choose_meal.jpg"
                alt="Caregiver serving nutritious meal to senior gentleman at table"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Bottom Floating Badge: White Glass Card */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 right-2 bg-white/90 backdrop-blur-md p-3 px-4 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.1)] border border-white/60 flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-full bg-[#2F80FF]/15 text-[#2F80FF] flex items-center justify-center shrink-0">
                  <Heart size={18} className="fill-[#2F80FF]" />
                </div>
                <div className="text-left text-[12px] text-[#667085]">
                  <span>Care with</span>
                  <span className="text-[#2F80FF] font-bold block text-[13.5px]">Compassion</span>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

        {/* ── 8 FEATURE CARDS GRID (4 COLS x 2 ROWS) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] mb-16">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* ── STATISTICS SECTION (FULL WIDTH BANNER) ── */}
        <div className="w-full rounded-[32px] bg-gradient-to-r from-[#F0F7FF] via-[#EBF4FF] to-[#F0F7FF] border border-[#2F80FF]/20 shadow-[0_18px_45px_rgba(32,60,120,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center min-h-[230px] relative">
          
          {/* Left Side (~34% width / 4 Cols on Desktop): Healthcare Image */}
          <div className="lg:col-span-4 h-full min-h-[220px] relative overflow-hidden">
            <Image
              src="/images/why_choose_hug.jpg"
              alt="Pavan Homecare caregivers trusted by families"
              fill
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#11284F]/30 to-transparent pointer-events-none" />

            {/* Bottom Left Floating Blue Glass Badge with Avatars */}
            <div className="absolute bottom-4 left-4 bg-[#2F80FF]/90 backdrop-blur-md text-white p-3 px-4 rounded-2xl shadow-lg border border-white/20 flex items-center gap-3">
              <div>
                <span className="font-extrabold text-[16px] block leading-tight">500+</span>
                <span className="text-[11px] text-white/80 font-medium">Families</span>
              </div>
              <div className="flex items-center">
                <Image src="/images/reviewer_gloria.png" alt="Client 1" width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover -ml-2 first:ml-0" />
                <Image src="/images/reviewer_reginald.png" alt="Client 2" width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover -ml-2" />
                <Image src="/images/review_gloria_photo.png" alt="Client 3" width={28} height={28} className="w-7 h-7 rounded-full border-2 border-white object-cover -ml-2" />
              </div>
            </div>
          </div>

          {/* Right Side (8 Cols on Desktop): 4 Equal Stat Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#2F80FF]/15 h-full items-center py-6 lg:py-0">
            <StatCard
              icon={Users}
              number="500+"
              title="Happy Families"
              description="Trusted care in our community"
            />
            <StatCard
              icon={Star}
              number="98%"
              title="Satisfaction Rate"
              description="Families who recommend us"
            />
            <StatCard
              icon={ShieldCheck}
              number="15+"
              title="Years of Experience"
              description="Delivering quality home care"
            />
            <StatCard
              icon={Clock}
              number="24/7"
              title="Support Available"
              description="We're here when you need us"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
