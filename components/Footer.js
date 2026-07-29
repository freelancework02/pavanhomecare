"use client";

import Link from "next/link";
import Logo from "./Logo";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B2A4A] text-white pt-20 pb-8 relative overflow-hidden border-t-2 border-gradient-to-r from-[#1E7FE0] via-[#F2994A] to-[#1E7FE0]">
      {/* Top Gradient Edge Divider Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#1E7FE0] via-[#F2994A] to-[#1E7FE0]" />

      {/* Ambient Decorative Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1E7FE0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F2994A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px] relative z-10">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Logo & Company Description (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="mb-6 inline-block w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2994A] rounded-lg hover:opacity-95 transition-opacity">
              <Logo variant="white" height="5.2rem" />
            </Link>

            <p className="text-[#8892A0] text-[14.5px] leading-relaxed max-w-[360px] mb-6 font-normal">
              Providing compassionate, personalized in-home care that helps seniors and individuals with disabilities live safely, comfortably, and independently in the place they love most—their home.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 text-white/80">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#8892A0]/40 text-[#8892A0] hover:text-white hover:bg-[#F2994A] hover:border-[#F2994A] hover:scale-110 hover:shadow-[0_4px_15px_rgba(242,153,74,0.4)] flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#8892A0]/40 text-[#8892A0] hover:text-white hover:bg-[#F2994A] hover:border-[#F2994A] hover:scale-110 hover:shadow-[0_4px_15px_rgba(242,153,74,0.4)] flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#8892A0]/40 text-[#8892A0] hover:text-white hover:bg-[#F2994A] hover:border-[#F2994A] hover:scale-110 hover:shadow-[0_4px_15px_rgba(242,153,74,0.4)] flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[#8892A0]/40 text-[#8892A0] hover:text-white hover:bg-[#F2994A] hover:border-[#F2994A] hover:scale-110 hover:shadow-[0_4px_15px_rgba(242,153,74,0.4)] flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-poppins font-bold text-[13px] uppercase tracking-wider text-white mb-2">Quick Links</h4>
            <div className="w-[32px] h-[2px] bg-[#F2994A] mb-6 rounded-full" />
            <ul className="flex flex-col gap-3 text-[14px] text-[#8892A0] font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/areas-we-serve" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Areas We Serve
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-poppins font-bold text-[13px] uppercase tracking-wider text-white mb-2">Our Services</h4>
            <div className="w-[32px] h-[2px] bg-[#F2994A] mb-6 rounded-full" />
            <ul className="flex flex-col gap-3 text-[14px] text-[#8892A0] font-medium">
              <li>
                <Link href="/services" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Companion Care
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Meal Preparation
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Medication Reminders
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Mobility Assistance
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  Specialized Dementia Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-poppins font-bold text-[13px] uppercase tracking-wider text-white mb-2">Contact Us</h4>
            <div className="w-[32px] h-[2px] bg-[#F2994A] mb-6 rounded-full" />
            <ul className="flex flex-col gap-4 text-[14px] text-[#8892A0]">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#F2994A] shrink-0 mt-0.5" />
                <span>19 Bowman Dr, Feasterville PA 19053</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#F2994A] shrink-0" />
                <a href="tel:+12154369499" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  (215) 436-9499
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#F2994A] shrink-0" />
                <a href="mailto:pavanhomecare@gmail.com" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2994A]">
                  pavanhomecare@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-[#F2994A] shrink-0" />
                <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[13px] text-[#8892A0] font-medium">
          <p>© {new Date().getFullYear()} Pavan Homecare. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors duration-200">
              Terms &amp; Conditions
            </Link>
            <a href="/sitemap.xml" className="hover:text-white transition-colors duration-200">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
