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
    <section className="w-full bg-gradient-to-b from-white via-[#F8FAFC] to-white py-[90px] lg:py-[130px] relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow-subtle pointer-events-none" />

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
            <span>HOW IT WORKS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins font-extrabold text-[36px] sm:text-[44px] leading-[1.15] text-[#0F172A] tracking-[-0.5px]"
          >
            Simple Steps to <span className="bg-gradient-to-r from-[#0061FF] to-[#60EFFF] bg-clip-text text-transparent">Better Care</span>
          </motion.h2>
        </div>

        {/* 4-Step Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[58px] left-[15%] right-[15%] h-[3px] bg-gradient-to-r from-[#0061FF]/10 via-[#0061FF]/40 to-[#0061FF]/10 rounded-full -z-0" />

          {STEPS.map((stepItem, index) => (
            <motion.div
              key={stepItem.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="flex flex-col items-center text-center relative z-10 bg-white/90 backdrop-blur-md p-7 rounded-[30px] border border-[#E2E8F0] shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,97,255,0.12)] hover:border-[#0061FF]/30 transition-all duration-300 group"
            >
              {/* Outer Icon Circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0061FF]/10 to-[#60EFFF]/20 flex items-center justify-center border border-white shadow-md group-hover:scale-110 transition-transform duration-300">
                  {stepItem.icon}
                </div>
                {/* Step Number Badge */}
                <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-[#0061FF] to-[#60EFFF] text-white font-extrabold text-[13px] flex items-center justify-center shadow-lg border-2 border-white">
                  {stepItem.step}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-poppins font-bold text-[19px] text-[#0F172A] mb-2 leading-snug group-hover:text-[#0061FF] transition-colors">
                {stepItem.title}
              </h3>
              <p className="text-[#64748B] text-[13.5px] leading-relaxed">
                {stepItem.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
