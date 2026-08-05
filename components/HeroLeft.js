"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import CTAButtons from "./CTAButtons";
import TrustBadge from "./TrustBadge";

export default function HeroLeft() {
  return (
    <div className="flex flex-col justify-center max-w-[620px] mx-auto lg:mx-0 z-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-white text-[#001A4D] font-bold text-[12px] tracking-[0.12em] uppercase px-4 py-2 rounded-full border border-[#DCE7F7] w-fit mb-6 shadow-[0_8px_28px_rgba(0,26,77,0.06)]"
      >
        <ShieldCheck size={16} className="text-[#0061FF]" />
        <span>Licensed Pennsylvania Home Care</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="font-poppins font-extrabold text-[42px] sm:text-[56px] lg:text-[70px] leading-[1.03] text-[#001A4D]"
      >
        Professional care at home,{" "}
        <span className="text-[#0061FF]">guided by love.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.26 }}
        className="text-[#4A5A73] text-[16px] sm:text-[18px] leading-[1.75] mt-6 max-w-[560px]"
      >
        Pavan Homecare helps seniors, veterans, and adults with disabilities live safely and comfortably at home with personal care, companionship, respite support, and dependable 24-hour care.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.38 }}
      >
        <CTAButtons />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <TrustBadge />
      </motion.div>
    </div>
  );
}
