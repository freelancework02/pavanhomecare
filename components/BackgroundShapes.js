"use client";

import { motion } from "framer-motion";

export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* ── Soft Gradient Orbs ── */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-5%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#0061FF]/20 to-[#60EFFF]/30 blur-[100px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#0061FF]/15 to-transparent blur-[120px]"
      />

      {/* ── Dotted SVG Grid Pattern (Top Right) ── */}
      <div className="absolute top-[12%] right-[5%] w-[160px] h-[160px] opacity-30">
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#0061FF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>
    </div>
  );
}
