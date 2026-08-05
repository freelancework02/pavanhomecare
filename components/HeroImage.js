"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Heart, Star, Users } from "lucide-react";

export default function HeroImage() {
  return (
    <div className="relative w-full max-w-[680px] mx-auto lg:max-w-none">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[28px] bg-white border border-[#DCE7F7] shadow-[0_28px_80px_rgba(0,26,77,0.14)]"
      >
        <div className="relative h-[420px] sm:h-[540px] lg:h-[620px]">
          <Image
            src="/images/hero_right_image_card.png"
            alt="Pavan Homecare caregiver assisting a senior client at home"
            fill
            sizes="(max-width: 992px) 100vw, 54vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001A4D]/55 via-[#001A4D]/10 to-transparent" />
        </div>

        <div className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-6 sm:bottom-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
          <div className="rounded-2xl bg-white/94 backdrop-blur-md border border-white/70 p-4 shadow-[0_16px_36px_rgba(0,26,77,0.16)]">
            <div className="flex items-center gap-2 text-[#FF7A59] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-[#FF7A59]" />
              ))}
              <span className="text-[#001A4D] text-sm font-extrabold">4.9 family rating</span>
            </div>
            <p className="text-[#4A5A73] text-[13px] leading-relaxed m-0">
              Trusted by Pennsylvania families for attentive, respectful support at home.
            </p>
          </div>

          <div className="hidden sm:flex flex-col gap-3">
            <div className="rounded-2xl bg-[#001A4D] text-white p-4 min-w-[176px] shadow-[0_14px_34px_rgba(0,26,77,0.22)]">
              <div className="flex items-center gap-2 text-[#60EFFF] text-xs font-bold uppercase tracking-wider mb-1">
                <Users size={15} />
                Families
              </div>
              <div className="text-3xl font-extrabold leading-none">500+</div>
            </div>
            <div className="rounded-2xl bg-[#FF7A59] text-white p-4 min-w-[176px] shadow-[0_14px_34px_rgba(255,122,89,0.28)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
                <Heart size={15} className="fill-white/25" />
                Care
              </div>
              <div className="text-base font-extrabold leading-tight">Love driven care</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="absolute top-5 right-5 bg-white/95 backdrop-blur-md text-[#001A4D] font-bold text-[12px] px-4 py-2 rounded-full shadow-[0_12px_28px_rgba(0,26,77,0.12)] border border-[#DCE7F7] flex items-center gap-2"
      >
        <BadgeCheck size={16} className="text-[#0061FF]" />
        Licensed & insured
      </motion.div>
    </div>
  );
}
