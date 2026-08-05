"use client";

import Link from "next/link";
import { Heart, ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 my-8">
      <Link
        href="/contact-us"
        className="inline-flex items-center justify-center gap-2.5 bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold text-[16px] px-8 py-4 rounded-full shadow-[0_14px_32px_rgba(255,122,89,0.28)] hover:shadow-[0_18px_40px_rgba(255,122,89,0.36)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001A4D]"
      >
        <Heart size={18} className="fill-white/30 group-hover:scale-110 transition-transform" />
        <span>Request Care</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>

      <a
        href="tel:+12154369499"
        className="inline-flex items-center justify-center gap-3.5 bg-white border border-[#DCE7F7] text-[#0061FF] hover:bg-[#F5F9FF] hover:border-[#0061FF]/40 shadow-[0_8px_24px_rgba(11,23,48,0.06)] hover:shadow-[0_12px_30px_rgba(0,97,255,0.12)] px-6 py-3 rounded-full transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59]"
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
