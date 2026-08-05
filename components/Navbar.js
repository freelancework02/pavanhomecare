"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import Logo from "./Logo";
import { site, navLinks } from "@/lib/site";
import { countiesData } from "@/lib/countiesData";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileAreasOpen(false);
  }, [pathname]);

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300">
      {/* ── 1. TOP INFORMATION BAR ── */}
      <div className="w-full bg-[#F5F9FF] border-b border-[#DCE7F7] text-[#4A5A73] text-[13px] py-2 px-4 sm:px-8 transition-colors">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left Info */}
          <div className="flex items-center gap-2 font-medium text-[#001A4D]">
            <div className="w-5 h-5 rounded-full bg-[#E8F2FF] flex items-center justify-center text-[#0061FF]">
              <MapPin size={12} />
            </div>
            <span>Serving Philadelphia, Bucks, Montgomery, Delaware, Chester &amp; Surrounding PA Counties</span>
          </div>

          {/* Right Info Links */}
          <div className="flex items-center gap-6 font-medium text-[13px]">
            <a
              href="tel:+12154369499"
              className="flex items-center gap-1.5 text-[#001A4D] hover:text-[#0061FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-sm"
            >
              <Phone size={13} className="text-[#0061FF]" />
              <span>(215) 436-9499</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN STICKY NAVIGATION BAR ── */}
      <div
        className={`w-full transition-all duration-300 backdrop-blur-[20px] bg-white/94 border-b border-[#DCE7F7]/90 ${
          scrolled ? "shadow-[0_12px_34px_rgba(0,26,77,0.10)] py-2.5" : "py-3"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-[80px] flex items-center justify-between gap-4">
          {/* Logo with Responsive Swapping and Tagline */}
          <Link href="/" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-lg">
            <div className="hidden sm:block">
              <Logo variant="color" showTagline={true} height="3.9rem" />
            </div>
            <div className="block sm:hidden">
              <Logo variant="icon" height="3.1rem" />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-[#0B1730]">
            <Link
              href="/"
              className={`relative py-1 transition-colors hover:text-[#0061FF] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-sm ${
                pathname === "/" ? "text-[#001A4D] font-bold" : ""
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#FF7A59] rounded-full transition-all duration-300 ${
                pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

            <Link
              href="/about"
              className={`relative py-1 transition-colors hover:text-[#0061FF] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-sm ${
                pathname === "/about" ? "text-[#001A4D] font-bold" : ""
              }`}
            >
              About Us
              <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#FF7A59] rounded-full transition-all duration-300 ${
                pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

            <Link
              href="/services"
              className={`relative py-1 transition-colors hover:text-[#0061FF] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-sm ${
                pathname === "/services" ? "text-[#001A4D] font-bold" : ""
              }`}
            >
              Services
              <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#FF7A59] rounded-full transition-all duration-300 ${
                pathname === "/services" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

            {/* Areas We Serve Dropdown Trigger */}
            <div className="relative group">
              <Link
                href="/areas-we-serve"
                className={`relative flex items-center gap-1 py-1 transition-colors hover:text-[#0061FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-sm ${
                  pathname.startsWith("/areas-we-serve") ? "text-[#001A4D] font-bold" : ""
                }`}
              >
                <span>Areas We Serve</span>
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180 text-[#8A97AC]" />
                <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#FF7A59] rounded-full transition-all duration-300 ${
                  pathname.startsWith("/areas-we-serve") ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-64 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2 grid grid-cols-1 gap-0.5">
                <Link
                  href="/areas-we-serve"
                  className="block px-4 py-2 text-[14px] text-[#0061FF] hover:bg-[#E8F2FF] rounded-xl transition-all duration-200 font-bold"
                >
                  All Areas We Serve
                </Link>
                <div className="h-[1px] bg-slate-100 my-1" />
                {Object.values(countiesData).map((county) => (
                  <Link
                    key={county.slug}
                    href={`/areas-we-serve/${county.slug}`}
                    className="block px-4 py-2 text-[14px] text-[#4A5A73] hover:text-[#0061FF] hover:bg-[#E8F2FF] rounded-xl transition-all duration-200 font-medium"
                  >
                    {county.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/blog"
              className={`relative py-1 transition-colors hover:text-[#0061FF] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-sm ${
                pathname === "/blog" ? "text-[#001A4D] font-bold" : ""
              }`}
            >
              Blog
              <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#FF7A59] rounded-full transition-all duration-300 ${
                pathname === "/blog" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

            <Link
              href="/contact-us"
              className={`relative py-1 transition-colors hover:text-[#0061FF] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-sm ${
                pathname === "/contact-us" ? "text-[#001A4D] font-bold" : ""
              }`}
            >
              Contact Us
              <span className={`absolute bottom-0 left-0 h-[2.5px] bg-[#FF7A59] rounded-full transition-all duration-300 ${
                pathname === "/contact-us" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Call Anytime Pill Button */}
            <a
              href="tel:+12154369499"
              className="flex items-center gap-3 bg-white border border-[#DCE7F7] shadow-[0_4px_20px_rgba(16,24,43,0.04)] hover:shadow-[0_8px_25px_rgba(0,97,255,0.14)] hover:border-[#0061FF]/40 px-4 py-2.5 rounded-full transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59]"
            >
              <div className="w-8 h-8 rounded-full bg-[#0061FF] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Phone size={14} />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] text-[#4A5A73] font-medium">Call Anytime</span>
                <span className="text-[13px] font-bold text-[#001A4D] group-hover:text-[#0061FF] transition-colors">
                  (215) 436-9499
                </span>
              </div>
            </a>

            {/* Request Care Warm Accent Button */}
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold text-[15px] px-6 py-3 rounded-full shadow-[0_8px_20px_rgba(255,122,89,0.32)] hover:shadow-[0_12px_28px_rgba(255,122,89,0.42)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001A4D]"
            >
              <span>Request Care</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-xl text-[#001A4D] hover:bg-[#E8F2FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59]"
            aria-label="Toggle Navigation Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE NAV DRAWER ── */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-white/95 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between border-t border-slate-100 animate-fadeIn">
          <nav className="flex flex-col gap-4 text-lg font-semibold text-[#001A4D]">
            <Link href="/" onClick={() => setOpen(false)} className="py-2 border-b border-slate-100 hover:text-[#0061FF]">
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="py-2 border-b border-slate-100 hover:text-[#0061FF]">
              About Us
            </Link>
            <Link href="/services" onClick={() => setOpen(false)} className="py-2 border-b border-slate-100 hover:text-[#0061FF]">
              Services
            </Link>
            
            {/* Collapsible Areas We Serve */}
            <div className="border-b border-slate-100">
              <button
                onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                className="w-full flex items-center justify-between py-2 text-left font-semibold hover:text-[#0061FF]"
              >
                <span>Areas We Serve</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${mobileAreasOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileAreasOpen && (
                <div className="pl-4 pb-3 flex flex-col gap-2 mt-1 max-h-[220px] overflow-y-auto">
                  <Link
                    href="/areas-we-serve"
                    onClick={() => setOpen(false)}
                    className="text-[15px] font-medium text-[#0061FF] py-1 block"
                  >
                    All Areas We Serve
                  </Link>
                  {Object.values(countiesData).map((county) => (
                    <Link
                      key={county.slug}
                      href={`/areas-we-serve/${county.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-[15px] font-medium text-[#4A5A73] hover:text-[#0061FF] py-1 block"
                    >
                      {county.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog" onClick={() => setOpen(false)} className="py-2 border-b border-slate-100 hover:text-[#0061FF]">
              Blog
            </Link>
            <Link href="/contact-us" onClick={() => setOpen(false)} className="py-2 hover:text-[#0061FF]">
              Contact Us
            </Link>
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
            <a
              href="tel:+12154369499"
              className="w-full flex items-center justify-center gap-2 bg-[#E8F2FF] text-[#001A4D] font-semibold py-3 rounded-full hover:bg-[#DCE7F7] transition-colors"
            >
              <Phone size={16} className="text-[#0061FF]" />
              <span>Call (215) 436-9499</span>
            </a>
            <Link
              href="/contact-us"
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold py-3.5 rounded-full shadow-lg transition-colors"
            >
              <span>Request Care</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
