"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Heart } from "lucide-react";

export default function CTASection() {
  return (
    <section className="w-full bg-[#F5F9FF] py-14 lg:py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full bg-gradient-to-r from-[#001A4D] via-[#0047B8] to-[#001A4D] text-white rounded-2xl p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,26,77,0.35)] border border-white/20 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
            {/* Ambient Decorative Orbs */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FF7A59]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#0061FF]/20 blur-3xl pointer-events-none" />

            {/* Left 60% (7 Cols) */}
            <div className="lg:col-span-7 relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-[#FF7A59] font-bold text-[12px] px-4 py-1.5 rounded-full mb-5 border border-white/10 uppercase tracking-wider">
                <Heart size={14} className="fill-[#FF7A59]" />
                <span>LET'S TALK ABOUT YOUR CARE</span>
              </div>

              <h2 className="font-poppins font-extrabold text-[32px] sm:text-[42px] leading-[1.15] text-white tracking-[-0.5px]">
                Ready to Give Your Loved One <br className="hidden sm:inline" />
                the Care They Deserve?
              </h2>

              <p className="text-[#8A97AC] text-[16.5px] leading-relaxed mt-4 mb-8 max-w-[580px]">
                We're here to help your loved one live safely, comfortably, and independently at home. Contact our care team today for a free consultation.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 relative z-10">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold text-[15px] px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(255,122,89,0.4)] hover:shadow-[0_15px_35px_rgba(255,122,89,0.55)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Request Care</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform text-white" />
                </Link>

                <a
                  href="tel:+12154369499"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 font-semibold text-[15px] px-7 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59]"
                >
                  <Phone size={16} className="text-[#FF7A59]" />
                  <span>(215) 436-9499</span>
                </a>
              </div>
            </div>

            {/* Right 40% (5 Cols) — Overlapping Photo Card breaking out of right container edge */}
            <div className="lg:col-span-5 relative z-10 hidden lg:flex justify-end">
              <div className="relative w-full aspect-[4/3] max-w-[380px] rounded-2xl overflow-hidden border-4 border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/why_choose_hug.jpg"
                  alt="Compassionate caregiver hugging senior"
                  fill
                  sizes="380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Coral Badge */}
                <div className="absolute bottom-4 left-4 bg-[#F2994A] text-white text-[12px] font-bold px-3.5 py-1.5 rounded-xl shadow-md border border-white/20">
                  <span>24/7 Response Guaranteed</span>
                </div>
              </div>
            </div>

          </motion.div>
      </div>
    </section>
  );
}
