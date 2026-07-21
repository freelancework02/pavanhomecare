"use client";

import Link from "next/link";
import { Heart, ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function CTAButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4 my-8">
      {/* Primary Gradient CTA Button */}
      <Link
        href="/contact-us"
        className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#0061FF] to-[#60EFFF] hover:opacity-95 text-white font-semibold text-[16px] px-7 py-3.5 rounded-full shadow-[0_10px_25px_rgba(0,97,255,0.3)] hover:shadow-[0_15px_30px_rgba(0,97,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 group"
      >
        <Heart size={18} className="fill-white/20 group-hover:scale-110 transition-transform" />
        <span>Request Care</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Secondary White Phone Pill Button */}
      <a
        href="tel:+12154369499"
        className="inline-flex items-center gap-3.5 bg-white border border-[#E2E8F0] shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,97,255,0.12)] hover:border-[#0061FF]/30 px-6 py-3 rounded-full transition-all duration-300 group"
      >
        <div className="w-9 h-9 rounded-full bg-[#0061FF]/10 text-[#0061FF] flex items-center justify-center group-hover:bg-[#0061FF] group-hover:text-white transition-all duration-300">
          <Phone size={16} />
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[12px] text-[#64748B] font-medium">Call Now</span>
          <span className="text-[15px] font-bold text-[#0F172A] group-hover:text-[#0061FF] transition-colors">
            (215) 436-9499
          </span>
        </div>
      </a>
    </div>
  );
}
