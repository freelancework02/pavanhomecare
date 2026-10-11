"use client";

import { Accessibility, ArrowDown, Compass, Home, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function AccessibleSkipNav() {
  const handleOpenAccessibility = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("phc_toggle_accessibility_menu"));
    }
  };

  return (
    <nav
      aria-label="Skip navigation and accessibility shortcuts"
      className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-3 focus-within:left-1/2 focus-within:-translate-x-1/2 focus-within:z-[100000] focus-within:flex focus-within:flex-wrap focus-within:items-center focus-within:gap-2 focus-within:p-2.5 focus-within:bg-[#001A4D] focus-within:text-white focus-within:border-2 focus-within:border-[#60EFFF] focus-within:rounded-2xl focus-within:shadow-[0_20px_50px_rgba(0,26,77,0.7)] focus-within:backdrop-blur-md"
    >
      <a
        href="#main-content"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0061FF] hover:bg-[#0052db] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60EFFF] focus:ring-offset-2 focus:ring-offset-[#001A4D] transition-colors"
      >
        <ArrowDown size={14} className="text-[#60EFFF]" />
        <span>Skip to Main Content</span>
      </a>

      <button
        type="button"
        onClick={handleOpenAccessibility}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#001A4D] bg-[#60EFFF] hover:bg-[#45e4f7] rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#001A4D] transition-colors cursor-pointer"
      >
        <Accessibility size={14} />
        <span>Open Accessibility Menu (Alt + A)</span>
      </button>

      <a
        href="#site-header"
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60EFFF] transition-colors"
      >
        <Compass size={13} className="text-[#60EFFF]" />
        <span>Navigation Menu</span>
      </a>

      <a
        href="#services"
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60EFFF] transition-colors"
      >
        <Home size={13} className="text-[#60EFFF]" />
        <span>Care Services</span>
      </a>

      <a
        href="#service-areas"
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60EFFF] transition-colors"
      >
        <MapPin size={13} className="text-[#60EFFF]" />
        <span>9 PA Counties</span>
      </a>

      <a
        href={site.phoneHref}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#FF7A59] hover:text-white hover:bg-[#FF7A59]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7A59] transition-colors"
      >
        <Phone size={13} />
        <span>Call Coordinator: {site.phoneDisplay}</span>
      </a>
    </nav>
  );
}
