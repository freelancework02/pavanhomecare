"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserCheck, ShieldCheck, Clock, Award, Star, Heart } from "lucide-react";

const REASONS = [
  {
    id: "trust",
    icon: <UserCheck size={22} className="text-[#0061FF]" />,
    title: "Caregivers You Can Trust",
    desc: "Thoroughly screened, trained, and compassionate professionals.",
  },
  {
    id: "plans",
    icon: <ShieldCheck size={22} className="text-[#0061FF]" />,
    title: "Personalized Care Plans",
    desc: "Care plans tailored to your loved one's unique needs and preferences.",
  },
  {
    id: "flexible",
    icon: <Clock size={22} className="text-[#0061FF]" />,
    title: "Flexible & Reliable",
    desc: "We work around your schedule with consistent, dependable care.",
  },
  {
    id: "local",
    icon: <Award size={22} className="text-[#0061FF]" />,
    title: "Locally Owned & Operated",
    desc: "Proudly serving our community with heart, dignity, and dedication.",
  },
];

const STATS = [
  { id: "years", value: "10+", label: "Years of Experience", icon: <Award size={20} /> },
  { id: "families", value: "200+", label: "Happy Families", icon: <Heart size={20} /> },
  { id: "caregivers", value: "50+", label: "Expert Caregivers", icon: <UserCheck size={20} /> },
  { id: "rating", value: "4.9/5", label: "Customer Rating", icon: <Star size={20} /> },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#F8FAFC] py-[100px] lg:py-[140px] relative overflow-hidden border-y border-[#E8EDF5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Reasons Checklist */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#0061FF]/[0.08] text-[#0061FF] font-semibold text-[13px] px-4 py-1.5 rounded-full w-fit mb-4 border border-[#0061FF]/15"
            >
              <span>WHY FAMILIES CHOOSE US</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-poppins font-extrabold text-[36px] sm:text-[44px] leading-[1.15] text-[#0F172A] tracking-[-0.5px] mb-8"
            >
              Trusted Care, <br />
              Proven by Families
            </motion.h2>

            <div className="flex flex-col gap-6">
              {REASONS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E8EDF5] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-full bg-[#0061FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-[16px] text-[#0F172A] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[#64748B] text-[13px] leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Image with Overlapping Floating Stats Panel */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden border-4 border-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-slate-100"
            >
              <Image
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&auto=format&fit=crop&q=80"
                alt="Pavan Homecare caregiver interacting with elderly client"
                fill
                sizes="(max-width: 992px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            {/* Overlapping Blue Gradient Floating Stats Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative lg:absolute -bottom-8 left-4 right-4 lg:left-8 lg:right-8 bg-gradient-to-r from-[#0061FF] to-[#004ACC] text-white p-6 sm:p-8 rounded-[28px] shadow-[0_20px_50px_rgba(0,97,255,0.35)] mt-6 lg:mt-0 z-20"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {STATS.map((stat) => (
                  <div key={stat.id} className="flex flex-col items-center">
                    <div className="text-white/80 mb-1">{stat.icon}</div>
                    <span className="font-poppins font-extrabold text-[28px] sm:text-[34px] leading-tight">
                      {stat.value}
                    </span>
                    <span className="text-[12px] sm:text-[13px] text-white/80 font-medium mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
