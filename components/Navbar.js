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
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);
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
    setServicesDropdown(false);
    setResourcesDropdown(false);
  }, [pathname]);

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300">
      {/* ── 1. TOP INFORMATION BAR ── */}
      <div className="w-full bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] text-[13px] py-2 px-4 sm:px-8 transition-colors">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left Info */}
          <div className="flex items-center gap-2 font-medium">
            <div className="w-5 h-5 rounded-full bg-[#0061FF]/10 flex items-center justify-center text-[#0061FF]">
              <MapPin size={12} />
            </div>
            <span>Serving York, Lancaster, Adams, Cumberland &amp; Surrounding Counties</span>
          </div>

          {/* Right Info Links */}
          <div className="flex items-center gap-6 font-medium text-[13px]">
            <a
              href="tel:+12154369499"
              className="flex items-center gap-1.5 hover:text-[#0061FF] transition-colors"
            >
              <Phone size={13} className="text-[#0061FF]" />
              <span>(215) 436-9499</span>
            </a>
            <Link
              href="/contact-us"
              className="flex items-center gap-1.5 hover:text-[#0061FF] transition-colors"
            >
              <Heart size={13} className="text-[#0061FF]" />
              <span>Careers</span>
            </Link>
            <a
              href="#client-portal"
              className="flex items-center gap-1.5 hover:text-[#0061FF] transition-colors"
            >
              <User size={13} className="text-[#0061FF]" />
              <span>Client Portal</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN STICKY NAVIGATION BAR ── */}
      <div
        className={`w-full transition-all duration-300 backdrop-blur-[18px] bg-white/85 border-b border-white/40 ${
          scrolled ? "shadow-[0_10px_30px_rgba(0,97,255,0.06)] py-3" : "py-4"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-[80px] flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none">
            <Logo variant="color" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-[#0F172A]">
            <Link
              href="/"
              className={`relative py-1 transition-colors hover:text-[#0061FF] ${
                pathname === "/" ? "text-[#0061FF] font-semibold" : ""
              }`}
            >
              Home
              {pathname === "/" && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0061FF] to-[#60EFFF] rounded-full" />
              )}
            </Link>

            <Link
              href="/about"
              className={`py-1 transition-colors hover:text-[#0061FF] ${
                pathname === "/about" ? "text-[#0061FF] font-semibold" : ""
              }`}
            >
              About Us
            </Link>

            {/* Services Dropdown Trigger */}
            <div className="relative group">
              <Link
                href="/services"
                className="flex items-center gap-1 py-1 transition-colors hover:text-[#0061FF]"
              >
                <span>Services</span>
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180 text-[#64748B]" />
              </Link>
            </div>

            {/* Resources / Blog Dropdown Trigger */}
            <div className="relative group">
              <Link
                href="/blog"
                className="flex items-center gap-1 py-1 transition-colors hover:text-[#0061FF]"
              >
                <span>Resources</span>
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180 text-[#64748B]" />
              </Link>
            </div>

            <Link
              href="/contact-us"
              className={`py-1 transition-colors hover:text-[#0061FF] ${
                pathname === "/contact-us" ? "text-[#0061FF] font-semibold" : ""
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Call Anytime Pill Button */}
            <a
              href="tel:+12154369499"
              className="flex items-center gap-3 bg-white border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,97,255,0.12)] hover:border-[#0061FF]/30 px-4 py-2.5 rounded-full transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#0061FF] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Phone size={14} />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] text-[#64748B] font-medium">Call Anytime</span>
                <span className="text-[13px] font-bold text-[#0F172A] group-hover:text-[#0061FF] transition-colors">
                  (215) 436-9499
                </span>
              </div>
            </a>

            {/* Request Care Primary Gradient Button */}
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0061FF] to-[#60EFFF] hover:opacity-95 text-white font-semibold text-[15px] px-6 py-3 rounded-full shadow-[0_10px_25px_rgba(0,97,255,0.3)] hover:shadow-[0_15px_30px_rgba(0,97,255,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Request Care</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-xl text-[#0F172A] hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE NAV DRAWER ── */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-white/95 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between border-t border-slate-100 animate-fadeIn">
          <nav className="flex flex-col gap-4 text-lg font-semibold text-[#0F172A]">
            <Link href="/" onClick={() => setOpen(false)} className="py-2 border-b border-slate-100">
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="py-2 border-b border-slate-100">
              About Us
            </Link>
            <Link href="/services" onClick={() => setOpen(false)} className="py-2 border-b border-slate-100">
              Services
            </Link>
            <Link href="/areas-we-serve" onClick={() => setOpen(false)} className="py-2 border-b border-slate-100">
              Areas We Serve
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="py-2 border-b border-slate-100">
              Resources / Blog
            </Link>
            <Link href="/contact-us" onClick={() => setOpen(false)} className="py-2">
              Contact Us
            </Link>
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
            <a
              href="tel:+12154369499"
              className="w-full flex items-center justify-center gap-2 bg-slate-100 text-[#0F172A] font-semibold py-3 rounded-full"
            >
              <Phone size={16} className="text-[#0061FF]" />
              <span>Call (215) 436-9499</span>
            </a>
            <Link
              href="/contact-us"
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0061FF] to-[#60EFFF] text-white font-semibold py-3.5 rounded-full shadow-lg"
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
