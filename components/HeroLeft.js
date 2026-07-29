"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import CTAButtons from "./CTAButtons";
import TrustBadge from "./TrustBadge";

export default function HeroLeft() {
  return (
    <div className="flex flex-col justify-center max-w-[600px] mx-auto lg:mx-0 z-10">
      {/* ── 1. Small Top Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-[#E8F2FD] text-[#0B2A4A] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full border border-[#1E7FE0]/25 w-fit mb-6 shadow-sm"
      >
        <ShieldCheck size={16} className="text-[#F2994A]" />
        <span>Trusted In-Home Care You Can Rely On</span>
      </motion.div>

      {/* ── 2. Big Heading ── */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="font-poppins font-extrabold text-[40px] sm:text-[54px] lg:text-[68px] leading-[1.05] tracking-[-1px] text-[#0B2A4A]"
      >
        Compassionate <br />
        In-Home Care, <br />
        <span className="bg-gradient-to-r from-[#1E7FE0] via-[#114B8C] to-[#F2994A] bg-clip-text text-transparent">
          Designed Around <br />
          Your Family
        </span>
      </motion.h1>

      {/* ── 3. Paragraph ── */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-[#4A5568] text-[16px] sm:text-[18px] font-normal leading-[1.65] mt-6 max-w-[520px]"
      >
        We provide personalized in-home care that helps seniors and adults with disabilities live safely, comfortably, and independently in the place they love most—their home.
      </motion.p>

      {/* ── 4. CTA Buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <CTAButtons />
      </motion.div>

      {/* ── 5. Mini Trust Badge Icons ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <TrustBadge />
      </motion.div>
    </div>
  );
}
