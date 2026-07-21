"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserCheck,
  Heart,
  Utensils,
  Pill,
  Activity,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const SERVICES = [
  {
    id: "personal-care",
    icon: <UserCheck size={22} className="text-[#0061FF]" />,
    title: "Personal Care",
    desc: "Assistance with daily activities like bathing, dressing & grooming.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80",
    href: "/services",
  },
  {
    id: "companion-care",
    icon: <Heart size={22} className="text-[#0061FF]" />,
    title: "Companion Care",
    desc: "Friendly companionship and emotional support for your loved one.",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d1e05fec?w=600&auto=format&fit=crop&q=80",
    href: "/services",
  },
  {
    id: "meal-prep",
    icon: <Utensils size={22} className="text-[#0061FF]" />,
    title: "Meal Preparation",
    desc: "Nutritious meals prepared with care and dietary needs in mind.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80",
    href: "/services",
  },
  {
    id: "medication",
    icon: <Pill size={22} className="text-[#0061FF]" />,
    title: "Medication Reminders",
    desc: "Timely reminders to help stay on track with daily medications.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    href: "/services",
  },
  {
    id: "mobility",
    icon: <Activity size={22} className="text-[#0061FF]" />,
    title: "Mobility Assistance",
    desc: "Support with walking, transfers, and safe movement around home.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80",
    href: "/services",
  },
  {
    id: "specialized",
    icon: <Sparkles size={22} className="text-[#0061FF]" />,
    title: "Specialized Care",
    desc: "Dementia, Alzheimer's, and chronic condition support.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80",
    href: "/services",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-white py-[100px] lg:py-[140px] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px]">
        {/* ── 2-COLUMN HEADER & GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-4 flex flex-col lg:sticky lg:top-[120px]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#0061FF]/[0.08] text-[#0061FF] font-semibold text-[13px] px-4 py-1.5 rounded-full w-fit mb-4 border border-[#0061FF]/15"
            >
              <span>OUR SERVICES</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-poppins font-extrabold text-[36px] sm:text-[44px] leading-[1.15] text-[#0F172A] tracking-[-0.5px]"
            >
              Care That Fits <br />
              Your Needs
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#64748B] text-[16px] leading-[1.65] mt-6 mb-8 max-w-[420px]"
            >
              From personal care to specialized support — we're here to help your family every step of the way with compassionate in-home care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0061FF] to-[#60EFFF] hover:opacity-95 text-white font-semibold text-[15px] px-7 py-3.5 rounded-full shadow-[0_10px_25px_rgba(0,97,255,0.3)] hover:shadow-[0_15px_30px_rgba(0,97,255,0.4)] transition-all duration-300 w-fit group"
              >
                <span>Explore All Services</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: 6 Premium Service Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white border border-[#E8EDF5] rounded-[28px] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,97,255,0.12)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-[#0061FF]/10 flex items-center justify-center mb-5 group-hover:bg-[#0061FF] group-hover:text-white transition-colors duration-300">
                    <div className="group-hover:text-white transition-colors">
                      {service.icon}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-poppins font-bold text-[18px] text-[#0F172A] leading-snug mb-2 group-hover:text-[#0061FF] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#64748B] text-[13px] leading-[1.55] mb-4">
                    {service.desc}
                  </p>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0061FF] hover:gap-2 transition-all mb-4"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Card Bottom Image */}
                <div className="relative w-full h-[120px] rounded-2xl overflow-hidden mt-2 bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
