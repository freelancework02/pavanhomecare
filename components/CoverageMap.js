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
    <section className="w-full bg-[#F5F9FF] py-14 lg:py-24 relative overflow-hidden border-y border-[#DCE7F7]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0061FF]/25 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#E8F2FF] text-[#001A4D] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-[#0061FF]/20"
          >
            <MapPin size={14} className="text-[#0061FF]" />
            <span>SERVICE AREAS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-extrabold text-[36px] sm:text-[44px] leading-[1.15] text-[#001A4D] tracking-[-0.5px]"
          >
            Compassionate Home Care <br />
            <span className="bg-gradient-to-r from-[#0061FF] to-[#60EFFF] bg-clip-text text-transparent">
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
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5A73]" />
              <input
                type="text"
                placeholder="Search your county in Pennsylvania..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#DCE7F7] rounded-full text-[14px] text-[#001A4D] focus:outline-none focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 transition-all shadow-sm"
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
                      ? "bg-white border-[#0061FF] shadow-[0_10px_25px_rgba(0,97,255,0.12)]"
                      : "bg-white border-[#DCE7F7] hover:bg-[#F5F9FF] hover:border-[#0061FF]/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        selectedCounty === county.slug
                          ? "bg-[#0061FF] text-white"
                          : "bg-[#E8F2FF] text-[#0061FF]"
                      }`}
                    >
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-[15px] text-[#001A4D]">
                        {county.name} County
                      </h4>
                      <p className="text-[12px] text-[#4A5A73]">{county.heroHeadline}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0061FF] bg-[#E8F2FF] border border-[#0061FF]/20 px-3 py-1 rounded-full shrink-0">
                    <CheckCircle2 size={12} />
                    Active Area
                  </span>
                </div>
              ))}
            </div>

            <Link
              href={`/areas-we-serve/${selectedCounty}`}
              className="inline-flex items-center gap-2 bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold text-[15px] px-7 py-3.5 rounded-full shadow-[0_10px_25px_rgba(255,122,89,0.32)] hover:shadow-[0_15px_30px_rgba(255,122,89,0.42)] transition-all duration-300 w-fit group"
            >
              <span>Explore Care in {countiesData[selectedCounty]?.name || "Your"} County</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Illustrated Modern Map Graphic Container */}
          <div className="lg:col-span-6 relative">
            <div className="bg-white border border-[#DCE7F7] rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,26,77,0.07)] relative overflow-hidden">
              {/* Abstract Map Background SVG Graphic */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#E8F2FF] to-[#F5F9FF] border border-[#DCE7F7] p-6 relative flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[12px] font-bold text-[#0061FF] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                    Pennsylvania Care Region
                  </span>
                  <span className="text-[12px] font-semibold text-[#4A5A73]">
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
                          ? "bg-[#0061FF] text-white border-[#0061FF] shadow-lg"
                          : "bg-white/90 backdrop-blur text-[#001A4D] border-[#DCE7F7] hover:border-[#0061FF]"
                      }`}
                    >
                      <span className="font-bold text-[13px] block">{c.name}</span>
                      <span
                        className={`text-[11px] block mt-0.5 ${
                          selectedCounty === c.slug ? "text-white/80" : "text-[#4A5A73]"
                        }`}
                      >
                        Serving Families
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-between z-10 pt-2 border-t border-[#DCE7F7]">
                  <span className="text-[12px] text-[#4A5A73]">
                    Need care outside these counties?
                  </span>
                  <Link
                    href="/contact-us"
                    className="text-[12px] font-bold text-[#0061FF] hover:underline"
                  >
                    Contact Us -&gt;
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

