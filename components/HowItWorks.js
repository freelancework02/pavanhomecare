"use client";

import { motion } from "framer-motion";
import { FileText, PhoneCall, UserCheck, Heart } from "lucide-react";

const STEPS = [
  {
    step: 1,
    icon: <FileText size={24} className="text-[#0061FF]" />,
    title: "Request Care",
    desc: "Fill out our quick form or call us. We're here to listen.",
  },
  {
    step: 2,
    icon: <PhoneCall size={24} className="text-[#0061FF]" />,
    title: "Free Consultation",
    desc: "We'll discuss your needs and create a personalized plan.",
  },
  {
    step: 3,
    icon: <UserCheck size={24} className="text-[#0061FF]" />,
    title: "Caregiver Match",
    desc: "We match you with the right caregiver for your loved one.",
  },
  {
    step: 4,
    icon: <Heart size={24} className="text-[#0061FF]" />,
    title: "Care Begins",
    desc: "Your care begins with compassion and consistency.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-[100px] lg:py-[140px] relative overflow-hidden">
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
            <span>HOW IT WORKS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-extrabold text-[36px] sm:text-[44px] leading-[1.15] text-[#0F172A] tracking-[-0.5px]"
          >
            Simple Steps to Better Care
          </motion.h2>
        </div>

        {/* 4-Step Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-[#0061FF]/20 -z-0" />

          {STEPS.map((stepItem, index) => (
            <motion.div
              key={stepItem.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center text-center relative z-10 bg-white p-6 rounded-[28px] border border-[#E8EDF5] shadow-[0_15px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,97,255,0.1)] transition-all duration-300 group"
            >
              {/* Outer Icon Circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-[#0061FF]/10 flex items-center justify-center border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300">
                  {stepItem.icon}
                </div>
                {/* Step Number Badge */}
                <span className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-gradient-to-r from-[#0061FF] to-[#60EFFF] text-white font-extrabold text-[12px] flex items-center justify-center shadow-md">
                  {stepItem.step}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-poppins font-bold text-[18px] text-[#0F172A] mb-2 leading-snug group-hover:text-[#0061FF] transition-colors">
                {stepItem.title}
              </h3>
              <p className="text-[#64748B] text-[13px] leading-relaxed">
                {stepItem.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
