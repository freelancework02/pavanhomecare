"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  Brain,
  BedDouble,
  ShieldCheck,
  Clock,
  Plus,
  ArrowRight,
} from "lucide-react";

// Reusable ServiceCard Component
function ServiceCard({ icon: Icon, title, description, href = "/services" }) {
  return (
    <Link href={href} className="block group h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-2xl">
      <div className="bg-white border border-[#DCE7F7] rounded-2xl p-6 shadow-[0_4px_20px_rgba(11,23,48,0.06)] hover:shadow-[0_8px_30px_rgba(11,23,48,0.12)] hover:border-[#0061FF]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full relative">
        <div>
          {/* Dynamic Icon Circle */}
          <div className="w-11 h-11 rounded-full bg-[#E8F2FF] text-[#0061FF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Icon size={20} />
          </div>

          {/* Title */}
          <h3 className="font-poppins font-bold text-[18px] text-[#001A4D] group-hover:text-[#0061FF] transition-colors mb-2 leading-snug">
            {title}
          </h3>

          {/* Description */}
          <p className="text-[#4A5A73] text-[13.5px] leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Bottom Right Arrow */}
        <div className="flex justify-end pt-2">
          <ArrowRight
            size={18}
            className="text-[#8A97AC] group-hover:text-[#0061FF] group-hover:translate-x-1 transition-all duration-300"
          />
        </div>
      </div>
    </Link>
  );
}

// Data Array for Top Row Cards
const TOP_SERVICES = [
  {
    id: "companionship",
    icon: Users,
    title: "Companionship",
    description: "Friendly support, conversation, and meaningful companionship to brighten each day.",
  },
  {
    id: "dementia-care",
    icon: Brain,
    title: "Dementia Care",
    description: "Specialized care focused on safety, patience, and maintaining routines.",
  },
  {
    id: "transition-care",
    icon: BedDouble,
    title: "Transition Care",
    description: "Support after hospital stays to ensure a smooth and comfortable recovery.",
  },
];

// Data Array for Bottom Row Cards
const BOTTOM_SERVICES = [
  {
    id: "respite-care",
    icon: ShieldCheck,
    title: "Respite Care",
    description: "Temporary relief for family caregivers with trusted and reliable care.",
  },
  {
    id: "twentyfour-hour-care",
    icon: Clock,
    title: "24-Hour Care",
    description: "Round-the-clock support tailored to individual needs and routines.",
  },
  {
    id: "post-surgery",
    icon: Plus,
    title: "Post-Surgery Support",
    description: "Compassionate assistance during recovery for a safer and faster healing.",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-[#F5F9FF] py-14 lg:py-24 relative overflow-hidden border-y border-[#DCE7F7]">
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#0061FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-[#FF7A59]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        {/* ── HEADER ── */}
        <div className="flex flex-col items-center text-center max-w-[620px] mx-auto mb-16">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#E8F2FF] text-[#001A4D] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-5 border border-[#0061FF]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
            <span>OUR SERVICES</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-extrabold text-[36px] sm:text-[48px] leading-[1.12] text-[#001A4D] tracking-[-0.8px] mb-4"
          >
            How We Help You <br className="hidden sm:inline" />
            Live{" "}
            <span className="bg-gradient-to-r from-[#0061FF] via-[#0061FF] to-[#60EFFF] bg-clip-text text-transparent">
              Comfortably
            </span>{" "}
            At Home
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#4A5A73] text-[16px] sm:text-[17px] leading-relaxed"
          >
            From personal care to specialized support, our services are designed to bring comfort, dignity, and independence to you or your loved one.
          </motion.p>
        </div>

        {/* ── BENTO GRID LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          
          {/* LEFT SIDE: Portrait Image + Personal Care Card (4 Cols on Desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Image 1: Large Portrait Healthcare Image */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-2xl overflow-hidden border border-white/60 shadow-[0_8px_30px_rgba(11,23,48,0.1)] group"
            >
              <Image
                src="/images/service_bento_portrait.jpg"
                alt="Compassionate caregiver assisting senior client in wheelchair during meal"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001A4D]/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Personal Care Card stacked below */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link href="/services" className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-2xl">
                <div className="bg-white border border-[#DCE7F7] rounded-2xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(11,23,48,0.06)] hover:shadow-[0_8px_30px_rgba(11,23,48,0.12)] hover:border-[#0061FF]/40 hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#E8F2FF] text-[#0061FF] flex items-center justify-center mb-4 group-hover:bg-[#0061FF] group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Home size={20} />
                    </div>

                    <h3 className="font-poppins font-bold text-[18px] text-[#001A4D] group-hover:text-[#0061FF] transition-colors mb-2 leading-snug">
                      Personal Care
                    </h3>

                    <p className="text-[#4A5A73] text-[13.5px] leading-relaxed mb-4">
                      Assistance with daily activities like bathing, grooming, dressing, and mobility.
                    </p>
                  </div>

                  <div className="flex justify-end pt-2">
                    <div className="w-9 h-9 rounded-full bg-[#FF7A59] text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#E86746] transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT SIDE: 3-Row Bento Cards Grid (8 Cols on Desktop) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* ROW 1: 3 Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {TOP_SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  />
                </motion.div>
              ))}
            </div>

            {/* ROW 2: Large Horizontal Feature Card (Live-In Care) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/services" className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2994A] rounded-2xl">
                <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(16,24,43,0.06)] hover:shadow-[0_8px_30px_rgba(16,24,43,0.12)] hover:border-[#1E7FE0]/40 hover:-translate-y-1.5 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 items-center">
                  
                  {/* Text (Left Side 55%) */}
                  <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#E8F2FD] text-[#1E7FE0] flex items-center justify-center mb-4 group-hover:bg-[#1E7FE0] group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Users size={20} />
                    </div>

                    <h3 className="font-poppins font-extrabold text-[22px] text-[#0B2A4A] group-hover:text-[#1E7FE0] transition-colors mb-2 leading-snug">
                      Live-In Care
                    </h3>

                    <p className="text-[#4A5568] text-[14px] leading-relaxed">
                      24/7 support in the comfort of home for peace of mind and consistent care.
                    </p>
                  </div>

                  {/* Image 2: Healthcare Image (Right Side 45%) */}
                  <div className="md:col-span-6 relative h-[210px] md:h-[230px] w-full rounded-2xl md:rounded-r-2xl md:rounded-l-none overflow-hidden">
                    <Image
                      src="/images/service_bento_livein.jpg"
                      alt="Caregiver sitting on couch providing warm companionship to senior lady"
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Orange Circular Arrow Button */}
                    <div className="w-10 h-10 rounded-full bg-[#F2994A] text-white flex items-center justify-center shadow-lg absolute bottom-4 right-4 group-hover:scale-110 group-hover:bg-[#E08838] transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* ROW 3: 3 Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {BOTTOM_SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="h-full"
                >
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  />
                </motion.div>
              ))}
            </div>

          </div>

        </div>

        {/* ── BOTTOM BUTTONS ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2.5 bg-[#F2994A] hover:bg-[#E08838] text-white font-bold text-[15px] px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(242,153,74,0.35)] hover:shadow-[0_12px_28px_rgba(242,153,74,0.45)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2A4A]"
          >
            <span>View All Services</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#1E7FE0] text-[#1E7FE0] hover:bg-[#E8F2FD] font-semibold text-[15px] px-7 py-3.5 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2994A]"
          >
            <span>Get in Touch</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
