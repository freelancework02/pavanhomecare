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
    <section className="w-full bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] py-[90px] lg:py-[130px] relative overflow-hidden border-y border-[#E2E8F0]">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#0061FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#60EFFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow-pill mb-4"
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
            Real Stories, <span className="bg-gradient-to-r from-[#0061FF] to-[#60EFFF] bg-clip-text text-transparent">Real Trust</span>
          </motion.h2>

          {/* Google Star Rating Summary Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-[#E2E8F0] px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] mt-5 hover:border-[#0061FF]/30 transition-all"
          >
            <div className="flex text-[#FBBC05]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#FBBC05" stroke="none" />
              ))}
            </div>
            <span className="text-[14px] font-bold text-[#0F172A]">5.0 Overall Rating</span>
            <span className="text-[12.5px] text-[#64748B] border-l border-slate-200 pl-3 font-medium">200+ Verified Reviews</span>
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
              className="bg-white/90 backdrop-blur-md border border-[#E2E8F0] rounded-[30px] p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,97,255,0.12)] hover:border-[#0061FF]/30 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote size={38} className="text-[#0061FF]/15 group-hover:text-[#0061FF]/30 transition-colors absolute top-6 right-6" />

              <div>
                {/* 5 Yellow Stars */}
                <div className="flex text-[#FBBC05] mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#FBBC05" stroke="none" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-[#0F172A] text-[15.5px] leading-[1.7] italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    fill
                    sizes="44px"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-[15px] text-[#0F172A] leading-snug group-hover:text-[#0061FF] transition-colors">
                    {review.author}
                  </h4>
                  <span className="text-[12.5px] text-[#64748B] font-medium leading-tight block">
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
