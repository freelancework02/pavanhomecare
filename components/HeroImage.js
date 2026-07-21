"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <div className="relative w-full max-w-[620px] mx-auto lg:max-w-none flex items-center justify-center">
      {/* ── 1. Organic Light Blue Backdrop Blob ── */}
      <div className="absolute inset-0 -top-6 -left-6 right-6 bottom-6 bg-gradient-to-tr from-[#D8EEFF] to-[#EBF6FF] rounded-[40%_60%_70%_30%/50%_60%_40%_50%] blur-sm -z-10 transform rotate-[-4deg] scale-105" />

      {/* ── 2. Main Caregiver Photo with Organic Blob Mask Container ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-[4/3.5] sm:aspect-[4/3] rounded-[36%_64%_64%_36%/48%_52%_48%_52%] overflow-hidden border-4 border-white shadow-[0_25px_60px_rgba(0,97,255,0.12)] bg-slate-100"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}
