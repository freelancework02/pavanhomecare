"use client";

import Link from "next/link";
import { Heart, ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function CTAButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4 my-8">
      {/* Primary Warm Accent CTA Button */}
      <Link
        href="/contact-us"
        className="inline-flex items-center gap-2.5 bg-[#F2994A] hover:bg-[#E08838] text-white font-bold text-[16px] px-8 py-3.5 rounded-full shadow-[0_10px_25px_rgba(242,153,74,0.35)] hover:shadow-[0_15px_32px_rgba(242,153,74,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2A4A]"
      >
        <Heart size={18} className="fill-white/30 group-hover:scale-110 transition-transform" />
        <span>Request Care</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Secondary Outlined Phone Pill Button */}
      <a
        href="tel:+12154369499"
        className="inline-flex items-center gap-3.5 bg-white border-2 border-[#1E7FE0] text-[#1E7FE0] hover:bg-[#E8F2FD] shadow-[0_6px_20px_rgba(16,24,43,0.04)] hover:shadow-[0_10px_30px_rgba(30,127,224,0.15)] px-6 py-3 rounded-full transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2994A]"
      >
        <div className="w-9 h-9 rounded-full bg-[#1E7FE0]/10 text-[#1E7FE0] flex items-center justify-center group-hover:bg-[#1E7FE0] group-hover:text-white transition-all duration-300">
          <Phone size={16} />
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[12px] text-[#4A5568] font-medium">Call Now</span>
          <span className="text-[15px] font-bold text-[#0B2A4A] group-hover:text-[#1E7FE0] transition-colors">
            (215) 436-9499
          </span>
        </div>
      </a>
    </div>
  );
}
