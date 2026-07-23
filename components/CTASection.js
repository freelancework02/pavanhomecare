"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Heart } from "lucide-react";

export default function CTASection() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-[#F8FAFC] py-[80px] lg:py-[110px] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full bg-gradient-to-r from-[#0A2540] via-[#004ACC] to-[#0061FF] text-white rounded-[36px] p-8 sm:p-14 shadow-[0_25px_60px_rgba(0,97,255,0.25)] border border-white/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Ambient Decorative Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#60EFFF]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="max-w-[640px] relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-[#60EFFF] font-semibold text-[12px] px-4 py-1.5 rounded-full mb-5 border border-white/10 uppercase tracking-wider">
              <Heart size={14} className="fill-[#60EFFF]" />
              <span>LET'S TALK ABOUT YOUR CARE</span>
            </div>

            <h2 className="font-poppins font-extrabold text-[32px] sm:text-[42px] leading-[1.15] text-white tracking-[-0.5px]">
              Ready to Give Your Loved One <br className="hidden sm:inline" />
              the Care They Deserve?
            </h2>

            <p className="text-slate-200 text-[16.5px] leading-relaxed mt-4">
              We're here to help your loved one live safely, comfortably, and independently at home. Contact our care team today for a free consultation.
            </p>
          </div>

          {/* Right CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 shrink-0 w-full sm:w-auto">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#60EFFF] to-[#0061FF] hover:opacity-95 text-[#0F172A] font-bold text-[15px] px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto group"
            >
              <span>Request Care</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform text-[#0F172A]" />
            </Link>

            <a
              href="tel:+12154369499"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 font-semibold text-[15px] px-7 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto group"
            >
              <Phone size={16} className="text-[#60EFFF]" />
              <span>(215) 436-9499</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
