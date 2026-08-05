"use client";

import Link from "next/link";
import Logo from "./Logo";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#001A4D] text-white pt-20 pb-8 relative overflow-hidden border-t-2 border-[#0061FF]">
      {/* Top Brand Gradient Edge Divider Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0061FF] via-[#60EFFF] to-[#FF7A59]" />

      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:64px_64px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px] relative z-10">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/15">
          
          {/* Col 1: Logo & Description */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="mb-6 inline-block w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-lg hover:opacity-95 transition-opacity">
              <Logo variant="white" showTagline={false} height="7.0rem" />
            </Link>

            <p className="text-white/90 text-[15px] leading-relaxed max-w-[360px] mb-6 font-normal">
              Providing compassionate, personalized in-home care that helps seniors and individuals with disabilities live safely, comfortably, and independently in the place they love most—their home.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 text-white">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 text-white hover:text-white hover:bg-[#FF7A59] hover:border-[#FF7A59] hover:scale-110 hover:shadow-[0_4px_15px_rgba(255,122,89,0.4)] flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 text-white hover:text-white hover:bg-[#FF7A59] hover:border-[#FF7A59] hover:scale-110 hover:shadow-[0_4px_15px_rgba(255,122,89,0.35)] flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 text-white hover:text-white hover:bg-[#FF7A59] hover:border-[#FF7A59] hover:scale-110 hover:shadow-[0_4px_15px_rgba(255,122,89,0.35)] flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 text-white hover:text-white hover:bg-[#FF7A59] hover:border-[#FF7A59] hover:scale-110 hover:shadow-[0_4px_15px_rgba(255,122,89,0.35)] flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-poppins font-bold text-[13px] uppercase tracking-wider text-white mb-2">Quick Links</h4>
            <div className="w-[32px] h-[2px] bg-[#FF7A59] mb-6 rounded-full" />
            <ul className="flex flex-col gap-3 text-[14.5px] text-white/90 font-medium">
              <li>
                <Link href="/" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/areas-we-serve" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Areas We Serve
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-poppins font-bold text-[13px] uppercase tracking-wider text-white mb-2">Our Services</h4>
            <div className="w-[32px] h-[2px] bg-[#FF7A59] mb-6 rounded-full" />
            <ul className="flex flex-col gap-3 text-[14.5px] text-white/90 font-medium">
              <li>
                <Link href="/services" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Companion Care
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Meal Preparation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Medication Reminders
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Mobility Assistance
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  Specialized Dementia Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-poppins font-bold text-[13px] uppercase tracking-wider text-white mb-2">Contact Us</h4>
            <div className="w-[32px] h-[2px] bg-[#FF7A59] mb-6 rounded-full" />
            <ul className="flex flex-col gap-4 text-[14.5px] text-white/90">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#FF7A59] shrink-0 mt-0.5" />
                <span className="text-white">19 Bowman Dr, Feasterville PA 19053</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#FF7A59] shrink-0" />
                <a href="tel:+12154369499" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  (215) 436-9499
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#FF7A59] shrink-0" />
                <a href="mailto:pavanhomecare@gmail.com" className="text-white hover:text-[#60EFFF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7A59]">
                  pavanhomecare@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-[#FF7A59] shrink-0" />
                <span className="text-white">Mon - Fri: 8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[13.5px] text-white/90 font-medium">
          <p>© {new Date().getFullYear()} Pavan Homecare. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-white/90 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-white/90 hover:text-white transition-colors duration-200">
              Terms &amp; Conditions
            </Link>
            <a href="/sitemap.xml" className="text-white/90 hover:text-white transition-colors duration-200">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
