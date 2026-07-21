"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const AVATARS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
];

export default function RatingPill() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white/90 backdrop-blur-[16px] border border-white/80 rounded-full px-5 py-2.5 shadow-[0_15px_35px_rgba(0,97,255,0.12)] flex items-center gap-4 cursor-default"
    >
      {/* Overlapping Avatars */}
      <div className="flex items-center -space-x-2.5 overflow-hidden">
        {AVATARS.map((src, index) => (
          <div
            key={index}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden relative shadow-sm"
          >
            <Image
              src={src}
              alt={`Caregiver avatar ${index + 1}`}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Rating Text & Stars */}
      <div className="flex flex-col">
        <span className="text-[12px] font-semibold text-[#64748B]">
          Trusted by 200+ families
        </span>
        <div className="flex items-center gap-1">
          <div className="flex text-[#FBBC05]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill="#FBBC05" stroke="none" />
            ))}
          </div>
          <span className="text-[13px] font-bold text-[#0F172A] ml-1">4.9/5</span>
        </div>
      </div>
    </motion.div>
  );
}
