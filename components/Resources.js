"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

const ARTICLES = [
  {
    id: "medicaid-waiver",
    title: "Understanding Pennsylvania Medicaid Waiver Programs for Home Care",
    category: "MEDICAID & FINANCIAL",
    summary: "Learn how Pennsylvania Medicaid Waivers can help cover in-home care services for seniors and individuals with physical disabilities.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80",
    readTime: "5 min read",
    href: "/blog/medicaid-waiver-programs-pa",
  },
  {
    id: "signs-home-care",
    title: "7 Clear Signs Your Elderly Loved One May Need In-Home Care",
    category: "CAREGIVER TIPS",
    summary: "Recognize the key physical, emotional, and cognitive indicators that suggest it's time to seek professional home care support.",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d1e05fec?w=800&auto=format&fit=crop&q=80",
    readTime: "4 min read",
    href: "/blog/signs-loved-one-needs-home-care",
  },
  {
    id: "caregiver-burnout",
    title: "Preventing Family Caregiver Burnout: Strategies & Respite Care",
    category: "SENIOR WELLNESS",
    summary: "Essential wellness practices and respite care options to protect your health while caring for an aging family member.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80",
    readTime: "6 min read",
    href: "/blog/caregiver-burnout-family-caregivers",
  },
];

export default function Resources() {
  return (
    <section className="w-full bg-white py-14 lg:py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#E8F2FF] text-[#001A4D] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-[#0061FF]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
            <span>HELPFUL RESOURCES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-extrabold text-[36px] sm:text-[44px] leading-[1.15] text-[#001A4D] tracking-[-0.5px]"
          >
            Helpful Resources for <br />
            Families &amp; Caregivers
          </motion.h2>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-[#DCE7F7] rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,97,255,0.12)] transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full"
            >
              {/* Image Container */}
              <div className="relative w-full h-[220px] bg-slate-100 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#0061FF] font-bold text-[11px] px-3 py-1 rounded-full shadow-sm">
                  {article.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-[12px] text-[#4A5A73] mb-2 font-medium">
                    <Clock size={13} className="text-[#0061FF]" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-poppins font-bold text-[18px] text-[#001A4D] leading-snug mb-3 group-hover:text-[#0061FF] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-[#4A5A73] text-[13.5px] leading-relaxed mb-6">
                    {article.summary}
                  </p>
                </div>

                <Link
                  href={article.href}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0061FF] group-hover:gap-3 transition-all pt-4 border-t border-[#DCE7F7]"
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore All Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-white border border-[#DCE7F7] text-[#001A4D] hover:text-[#0061FF] hover:border-[#0061FF]/40 font-semibold text-[15px] px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <BookOpen size={16} className="text-[#0061FF]" />
            <span>Browse All Resources</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
