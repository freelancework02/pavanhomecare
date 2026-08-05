"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="w-full bg-[#F5F9FF] py-14 lg:py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="w-full bg-[#001A4D] text-white rounded-[28px] shadow-[0_28px_70px_rgba(0,26,77,0.22)] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
        >
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#60EFFF] font-bold text-[12px] px-4 py-2 rounded-full mb-5 border border-white/10 uppercase tracking-[0.12em] w-fit">
              <ShieldCheck size={15} />
              Free care consultation
            </div>

            <h2 className="font-poppins font-extrabold text-[32px] sm:text-[44px] leading-[1.12] text-white">
              Let us build a care plan that fits your home, schedule, and family.
            </h2>

            <p className="text-white/72 text-[16.5px] leading-relaxed mt-5 mb-8 max-w-[620px]">
              Speak with a local care coordinator about personal care, companionship, respite support, Medicaid waiver options, or 24-hour assistance.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold text-[15px] px-8 py-4 rounded-full shadow-[0_12px_28px_rgba(255,122,89,0.34)] hover:-translate-y-0.5 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Request Care
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform text-white" />
              </Link>

              <a
                href="tel:+12154369499"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/18 font-semibold text-[15px] px-7 py-4 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59]"
              >
                <Phone size={16} className="text-[#60EFFF]" />
                (215) 436-9499
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 min-h-[300px] lg:min-h-full relative">
            <Image
              src="/images/why_choose_hug.jpg"
              alt="Pavan Homecare caregiver offering warm support to a senior client"
              fill
              sizes="(max-width: 1024px) 100vw, 36vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001A4D]/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#001A4D]/40 lg:via-transparent lg:to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
