"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Heart } from "lucide-react";

export default function CTASection() {
  return (
    <section className="w-full bg-white py-[80px] lg:py-[100px]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full bg-gradient-to-r from-[#EBF5FF] via-white to-[#EBF6FF] border border-[#0061FF]/20 rounded-[32px] p-8 sm:p-14 shadow-[0_20px_60px_rgba(0,97,255,0.08)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Ambient Decorative Orbs */}
          <div className="absolute top-[-50%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#0061FF]/10 blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="max-w-[620px] relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#0061FF]/10 text-[#0061FF] font-semibold text-[12px] px-3.5 py-1 rounded-full mb-4">
              <Heart size={14} className="fill-[#0061FF]" />
              <span>LET'S TALK ABOUT YOUR CARE</span>
            </div>

            <h2 className="font-poppins font-extrabold text-[32px] sm:text-[42px] leading-[1.15] text-[#0F172A] tracking-[-0.5px]">
              Ready to Give Your Loved One <br className="hidden sm:inline" />
              the Care They Deserve?
            </h2>

            <p className="text-[#64748B] text-[16px] leading-relaxed mt-4">
              We're here to help your loved one live safely, comfortably, and independently at home. Contact our care team today for a free consultation.
            </p>
          </div>

          {/* Right CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 shrink-0">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0061FF] to-[#60EFFF] hover:opacity-95 text-white font-semibold text-[15px] px-7 py-3.5 rounded-full shadow-[0_10px_25px_rgba(0,97,255,0.3)] hover:shadow-[0_15px_30px_rgba(0,97,255,0.4)] transition-all duration-300 w-full sm:w-auto group"
            >
              <span>Request Care</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="tel:+12154369499"
              className="inline-flex items-center justify-center gap-2 bg-white border border-[#E8EDF5] hover:border-[#0061FF]/40 text-[#0F172A] font-semibold text-[15px] px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto group"
            >
              <Phone size={16} className="text-[#0061FF]" />
              <span>(215) 436-9499</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
