"use client";

import Link from "next/link";
import { Heart, ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function CTAButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4 my-8">
      {/* Primary Warm Coral Accent CTA Button */}
      <Link
        href="/contact-us"
        className="inline-flex items-center gap-2.5 bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold text-[16px] px-8 py-3.5 rounded-full shadow-[0_10px_25px_rgba(255,122,89,0.35)] hover:shadow-[0_15px_32px_rgba(255,122,89,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001A4D]"
      >
        <Heart size={18} className="fill-white/30 group-hover:scale-110 transition-transform" />
        <span>Request Care</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Secondary Outlined Phone Pill Button */}
      <a
        href="tel:+12154369499"
        className="inline-flex items-center gap-3.5 bg-white border-2 border-[#0061FF] text-[#0061FF] hover:bg-[#E8F2FF] shadow-[0_6px_20px_rgba(11,23,48,0.04)] hover:shadow-[0_10px_30px_rgba(0,97,255,0.15)] px-6 py-3 rounded-full transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59]"
      >
        <div className="w-9 h-9 rounded-full bg-[#E8F2FF] text-[#0061FF] flex items-center justify-center group-hover:bg-[#0061FF] group-hover:text-white transition-all duration-300">
          <Phone size={16} />
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[12px] text-[#4A5A73] font-medium">Call Now</span>
          <span className="text-[15px] font-bold text-[#001A4D] group-hover:text-[#0061FF] transition-colors">
            (215) 436-9499
          </span>
        </div>
      </a>
    </div>
  );
}
