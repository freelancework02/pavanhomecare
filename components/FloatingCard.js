"use client";

import { motion } from "framer-motion";

export default function FloatingCard({
  icon,
  iconBg = "bg-[#0061FF]/10 text-[#0061FF]",
  title,
  subtitle,
  className = "",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-white/90 backdrop-blur-[14px] border border-white/80 rounded-[24px] p-4 shadow-[0_15px_35px_rgba(0,97,255,0.08)] flex items-center gap-3.5 ${className}`}
    >
      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-[14px] font-bold text-[#0F172A] leading-tight">{title}</h4>
        <p className="text-[12px] text-[#64748B] mt-0.5 leading-tight">{subtitle}</p>
      </div>
    </motion.div>
  );
}
