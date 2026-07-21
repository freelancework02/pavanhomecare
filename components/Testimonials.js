"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    quote: "Pavan Homecare has been a true blessing for our family. The caregiver is kind, professional, and genuinely cares about my mother's daily well-being and independence.",
    author: "Sarah M.",
    relation: "Daughter of Client",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: 2,
    quote: "The care team is reliable, attentive, and always goes above and beyond. Having peace of mind knowing my father is in safe hands is invaluable to us.",
    author: "James T.",
    relation: "Son of Client",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: 3,
    quote: "From the very first call to the daily visits, everything has been exceptional. Highly recommend Pavan Homecare to anyone seeking quality senior care.",
    author: "Linda R.",
    relation: "Family Member",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-[#F8FAFC] py-[100px] lg:py-[140px] relative overflow-hidden border-y border-[#E8EDF5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#0061FF]/[0.08] text-[#0061FF] font-semibold text-[13px] px-4 py-1.5 rounded-full w-fit mb-4 border border-[#0061FF]/15"
          >
            <span>WHAT FAMILIES SAY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-extrabold text-[36px] sm:text-[44px] leading-[1.15] text-[#0F172A] tracking-[-0.5px]"
          >
            Real Stories, Real Trust
          </motion.h2>

          {/* Google Star Rating Summary Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 bg-white border border-[#E8EDF5] px-5 py-2.5 rounded-full shadow-sm mt-4"
          >
            <div className="flex text-[#FBBC05]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#FBBC05" stroke="none" />
              ))}
            </div>
            <span className="text-[14px] font-bold text-[#0F172A]">5.0 Overall Rating</span>
            <span className="text-[12px] text-[#64748B] border-l border-slate-200 pl-3">200+ Verified Reviews</span>
          </motion.div>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white/90 backdrop-blur border border-[#E8EDF5] rounded-[28px] p-8 shadow-[0_15px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,97,255,0.1)] transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote size={36} className="text-[#0061FF]/15 absolute top-6 right-6" />

              <div>
                {/* 5 Yellow Stars */}
                <div className="flex text-[#FBBC05] mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#FBBC05" stroke="none" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-[#0F172A] text-[15px] leading-[1.65] italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-[15px] text-[#0F172A] leading-snug">
                    {review.author}
                  </h4>
                  <span className="text-[12px] text-[#64748B] leading-tight block">
                    {review.relation}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
