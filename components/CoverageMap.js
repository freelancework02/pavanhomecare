"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Search, CheckCircle2, ArrowRight } from "lucide-react";
import { countiesData } from "@/lib/countiesData";

export default function CoverageMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("york");

  const countiesList = Object.keys(countiesData).map((slug) => ({
    slug,
    ...countiesData[slug],
  }));

  const filteredCounties = countiesList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full bg-[#F7F9FC] py-14 lg:py-24 relative overflow-hidden border-y border-[#E2E8F0]">
      {/* Background Decorative Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1E7FE0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#F2994A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#E8F2FD] text-[#0B2A4A] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-[#1E7FE0]/20"
          >
            <MapPin size={14} className="text-[#1E7FE0]" />
            <span>SERVICE AREAS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-extrabold text-[36px] sm:text-[44px] leading-[1.15] text-[#0B2A4A] tracking-[-0.5px]"
          >
            Compassionate Home Care <br />
            <span className="bg-gradient-to-r from-[#1E7FE0] via-[#114B8C] to-[#F2994A] bg-clip-text text-transparent">
              Across Pennsylvania
            </span>
          </motion.h2>
        </div>

        {/* 2-Column Map & Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Location Search & County List */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Search Box */}
            <div className="relative mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5568]" />
              <input
                type="text"
                placeholder="Search your county in Pennsylvania..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E2E8F0] rounded-full text-[14px] text-[#10182B] focus:outline-none focus:border-[#1E7FE0] focus:ring-2 focus:ring-[#1E7FE0]/20 transition-all shadow-sm"
              />
            </div>

            {/* County List Cards */}
            <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar mb-8">
              {filteredCounties.map((county) => (
                <div
                  key={county.slug}
                  onClick={() => setSelectedCounty(county.slug)}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    selectedCounty === county.slug
                      ? "bg-white border-[#1E7FE0] shadow-[0_10px_25px_rgba(30,127,224,0.12)]"
                      : "bg-white border-[#E2E8F0] hover:bg-[#F7F9FC] hover:border-[#1E7FE0]/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        selectedCounty === county.slug
                          ? "bg-[#1E7FE0] text-white"
                          : "bg-[#E8F2FD] text-[#1E7FE0]"
                      }`}
                    >
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-[15px] text-[#10182B]">
                        {county.name} County
                      </h4>
                      <p className="text-[12px] text-[#4A5568]">{county.heroHeadline}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E7FE0] bg-[#E8F2FD] border border-[#1E7FE0]/20 px-3 py-1 rounded-full shrink-0">
                    <CheckCircle2 size={12} />
                    Active Area
                  </span>
                </div>
              ))}
            </div>

            <Link
              href={`/areas-we-serve/${selectedCounty}`}
              className="inline-flex items-center gap-2 bg-[#F2994A] hover:bg-[#E08838] text-white font-bold text-[15px] px-7 py-3.5 rounded-full shadow-[0_10px_25px_rgba(242,153,74,0.35)] hover:shadow-[0_15px_30px_rgba(242,153,74,0.5)] transition-all duration-300 w-fit group"
            >
              <span>Explore Care in {countiesData[selectedCounty]?.name || "Your"} County</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Illustrated Modern Map Graphic Container */}
          <div className="lg:col-span-6 relative">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden">
              {/* Abstract Map Background SVG Graphic */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#E8F2FD] to-[#F7F9FC] border border-[#E2E8F0] p-6 relative flex flex-col justify-between overflow-hidden">
                {/* Decorative Map Orbs & Paths */}
                <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#1E7FE0]/10 blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between z-10">
                  <span className="text-[12px] font-bold text-[#1E7FE0] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                    Pennsylvania Care Region
                  </span>
                  <span className="text-[12px] font-semibold text-[#4A5568]">
                    9 Active Counties
                  </span>
                </div>

                {/* Interactive County Map Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 z-10 my-4">
                  {countiesList.slice(0, 6).map((c) => (
                    <motion.div
                      key={c.slug}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedCounty(c.slug)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedCounty === c.slug
                          ? "bg-[#1E7FE0] text-white border-[#1E7FE0] shadow-lg"
                          : "bg-white/90 backdrop-blur text-[#10182B] border-[#E2E8F0] hover:border-[#1E7FE0]"
                      }`}
                    >
                      <span className="font-bold text-[13px] block">{c.name}</span>
                      <span
                        className={`text-[11px] block mt-0.5 ${
                          selectedCounty === c.slug ? "text-white/80" : "text-[#4A5568]"
                        }`}
                      >
                        Serving Families
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-between z-10 pt-2 border-t border-[#E2E8F0]">
                  <span className="text-[12px] text-[#4A5568]">
                    Need care outside these counties?
                  </span>
                  <Link
                    href="/contact-us"
                    className="text-[12px] font-bold text-[#1E7FE0] hover:underline"
                  >
                    Contact Us →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
