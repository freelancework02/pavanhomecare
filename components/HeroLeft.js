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
        className="inline-flex items-center gap-2 bg-[#0061FF]/[0.08] text-[#0061FF] font-semibold text-[13px] px-4 py-1.5 rounded-full border border-[#0061FF]/15 w-fit mb-6"
      >
        <ShieldCheck size={16} />
        <span>Trusted In-Home Care You Can Rely On</span>
      </motion.div>

      {/* ── 2. Big Heading ── */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="font-poppins font-extrabold text-[40px] sm:text-[54px] lg:text-[68px] leading-[1.05] tracking-[-1px] text-[#0F172A]"
      >
        Compassionate <br />
        In-Home Care, <br />
        <span className="bg-gradient-to-r from-[#0061FF] to-[#60EFFF] bg-clip-text text-transparent">
          Designed Around <br />
          Your Family
        </span>
      </motion.h1>

      {/* ── 3. Paragraph ── */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-[#64748B] text-[16px] sm:text-[18px] font-normal leading-[1.65] mt-6 max-w-[520px]"
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
