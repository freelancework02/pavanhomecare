"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Heart } from "lucide-react";

export default function HeroImage() {
  return (
    <div className="relative w-full max-w-[620px] mx-auto lg:max-w-none flex items-center justify-center">
      {/* ── 1. Organic Light Blue Backdrop Blob ── */}
      <div className="absolute inset-0 -top-8 -left-8 right-8 bottom-8 bg-gradient-to-tr from-[#E8F2FD] via-[#FCEEE0] to-[#E7F2EC] rounded-[40%_60%_70%_30%/50%_60%_40%_50%] blur-md -z-10 transform rotate-[-4deg] scale-105" />

      {/* ── 2. Main Caregiver Photo Container ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-[4/3.5] sm:aspect-[4/3] rounded-[36%_64%_64%_36%/48%_52%_48%_52%] overflow-hidden border-4 border-white shadow-[0_25px_60px_rgba(11,42,74,0.14)] bg-slate-100"
      >
        <Image
          src="/images/hero_right_image_card.png"
          alt="Compassionate Pavan Homecare caregiver assisting an elderly client with love"
          fill
          sizes="(max-width: 992px) 100vw, 50vw"
          priority
          className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
        />

        {/* Inner Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/30 via-transparent to-transparent" />
      </motion.div>

      {/* ── 3. FLOATING STAT OVERLAY CARD (OVERLAPPING BOTTOM-LEFT CORNER) ── */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="absolute -bottom-6 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md p-4 px-5 rounded-2xl shadow-[0_15px_40px_rgba(11,42,74,0.16)] border border-[#E2E8F0] z-20 flex items-center gap-4 max-w-[280px]"
      >
        <div className="w-11 h-11 rounded-xl bg-[#FCEEE0] text-[#F2994A] flex items-center justify-center shrink-0 shadow-sm border border-[#F2994A]/20">
          <Heart size={22} className="fill-[#F2994A]" />
        </div>
        <div>
          <div className="flex items-center gap-1 text-[#F2994A] text-[13px] font-bold">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-[#F2994A] text-[#F2994A]" />
              ))}
            </div>
            <span className="text-[#0B2A4A] ml-1 font-extrabold text-[14px]">4.9</span>
          </div>
          <p className="text-[12px] text-[#4A5568] font-semibold leading-tight mt-0.5">
            Rated 5 Stars by 500+ PA Families
          </p>
        </div>
      </motion.div>

      {/* ── 4. FLOATING TOP-RIGHT BADGE CHIP ── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        animate-bounce="true"
        className="absolute -top-3 -right-2 sm:-right-4 bg-white/90 backdrop-blur-md text-[#0B2A4A] font-bold text-[12px] px-3.5 py-2 rounded-xl shadow-lg border border-[#E2E8F0] z-20 flex items-center gap-2"
      >
        <ShieldCheck size={16} className="text-[#1E7FE0]" />
        <span>Licensed &amp; Insured</span>
      </motion.div>
    </div>
  );
}
