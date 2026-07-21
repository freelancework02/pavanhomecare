"use client";

import { motion } from "framer-motion";
import { Home, Heart, Users, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    id: "stay-home",
    icon: <Home size={22} className="text-[#0061FF]" />,
    iconBg: "bg-[#0061FF]/10",
    title: "Stay at Home",
    desc: "Stay safe and comfortable in the place you love.",
  },
  {
    id: "compassion",
    icon: <Heart size={22} className="text-[#FF2D7A]" />,
    iconBg: "bg-[#FF2D7A]/10",
    title: "Compassion First",
    desc: "Every visit centered on dignity and kindness.",
  },
  {
    id: "personalized",
    icon: <Users size={22} className="text-[#10B981]" />,
    iconBg: "bg-[#10B981]/10",
    title: "Personalized Care",
    desc: "Plans designed around your needs and goals.",
  },
  {
    id: "safety",
    icon: <ShieldCheck size={22} className="text-[#8B5CF6]" />,
    iconBg: "bg-[#8B5CF6]/10",
    title: "Safety & Trust",
    desc: "Licensed, insured, and committed to excellence.",
  },
];

export default function FeatureStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white border border-[#E5E7EB] rounded-[32px] p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.06)] mt-12 sm:mt-16 relative z-20"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {FEATURES.map((item, index) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className={`flex items-start gap-4 ${
              index !== FEATURES.length - 1 ? "lg:border-r lg:border-slate-100 lg:pr-6" : ""
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
              {item.icon}
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#0F172A] leading-snug">{item.title}</h3>
              <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
