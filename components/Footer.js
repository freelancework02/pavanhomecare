"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Twitter, ShieldCheck, Accessibility } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/admin")) return null;
  return (
    <footer id="site-footer" className="w-full bg-[#001A4D] text-white pt-20 pb-16 sm:pb-20 relative overflow-hidden border-t-2 border-[#0061FF]">
      {/* Top Brand Gradient Edge Divider Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0061FF] via-[#60EFFF] to-[#FF7A59]" />

      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:64px_64px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px] relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/15">
          
          {/* Col 1: Logo, Mission & Contact Details */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="mb-6 inline-block w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-lg hover:opacity-95 transition-opacity">
              <Logo variant="white" showTagline={false} height="7.0rem" />
            </Link>

            <p className="text-white/80 text-[14.5px] leading-relaxed max-w-[360px] mb-6 font-normal">
              Licensed in-home care agency dedicated to love-driven support. Empowering seniors and adults with disabilities across 9 Pennsylvania counties to thrive with dignity in the comfort of home.
            </p>

            <div className="flex flex-col gap-3 text-[14px] text-white/90 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#FF7A59] shrink-0 mt-0.5" />
                <span>{site.addressFull}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#FF7A59] shrink-0" />
                <a href={site.phoneHref} className="text-white font-bold hover:text-[#60EFFF] transition-colors">
                  {site.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#FF7A59] shrink-0" />
                <a href={`mailto:${site.email}`} className="text-white hover:text-[#60EFFF] transition-colors">
                  {site.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-[#FF7A59] shrink-0" />
                <span>24/7 Live Care Coordinator Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 text-white">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/30 text-white hover:bg-[#FF7A59] hover:border-[#FF7A59] flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/30 text-white hover:bg-[#FF7A59] hover:border-[#FF7A59] flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/30 text-white hover:bg-[#FF7A59] hover:border-[#FF7A59] flex items-center justify-center transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/30 text-white hover:bg-[#FF7A59] hover:border-[#FF7A59] flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Col 2: Care Services (Direct Canonical URLs) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-poppins font-bold text-[13px] uppercase tracking-wider text-white mb-2">Our Care Services</h4>
            <div className="w-[32px] h-[2px] bg-[#FF7A59] mb-6 rounded-full" />
            <ul className="flex flex-col gap-3 text-[14px] text-white/90 font-medium">
              <li>
                <Link href="/personal-care" className="text-white/80 hover:text-[#60EFFF] transition-colors">
                  Personal Care &amp; Hygiene
                </Link>
              </li>
              <li>
                <Link href="/companion-care" className="text-white/80 hover:text-[#60EFFF] transition-colors">
                  Companion Care &amp; Errand Help
                </Link>
              </li>
              <li>
                <Link href="/24-hour-live-in-care" className="text-white/80 hover:text-[#60EFFF] transition-colors">
                  24-Hour &amp; Live-In Care
                </Link>
              </li>
              <li>
                <Link href="/dementia-alzheimers-care" className="text-white/80 hover:text-[#60EFFF] transition-colors">
                  Alzheimer&apos;s &amp; Dementia Memory Care
                </Link>
              </li>
              <li>
                <Link href="/post-hospital-respite-care" className="text-white/80 hover:text-[#60EFFF] transition-colors">
                  Post-Hospital &amp; Respite Care
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#FF7A59] font-bold hover:underline transition-all">
                  View All Care Offerings →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Areas We Serve (9 PA Counties) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-poppins font-bold text-[13px] uppercase tracking-wider text-white mb-2">Service Areas in PA</h4>
            <div className="w-[32px] h-[2px] bg-[#FF7A59] mb-6 rounded-full" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13.5px]">
              <Link href="/areas-we-serve/bucks" className="text-white/85 hover:text-[#60EFFF] transition-colors">
                Bucks County
              </Link>
              <Link href="/areas-we-serve/philadelphia" className="text-white/85 hover:text-[#60EFFF] transition-colors">
                Philadelphia
              </Link>
              <Link href="/areas-we-serve/montgomery" className="text-white/85 hover:text-[#60EFFF] transition-colors">
                Montgomery
              </Link>
              <Link href="/areas-we-serve/delaware" className="text-white/85 hover:text-[#60EFFF] transition-colors">
                Delaware County
              </Link>
              <Link href="/areas-we-serve/chester" className="text-white/85 hover:text-[#60EFFF] transition-colors">
                Chester County
              </Link>
              <Link href="/areas-we-serve/lehigh" className="text-white/85 hover:text-[#60EFFF] transition-colors">
                Lehigh County
              </Link>
              <Link href="/areas-we-serve/northampton" className="text-white/85 hover:text-[#60EFFF] transition-colors">
                Northampton
              </Link>
              <Link href="/areas-we-serve/berks" className="text-white/85 hover:text-[#60EFFF] transition-colors">
                Berks County
              </Link>
              <Link href="/areas-we-serve/schuylkill" className="text-white/85 hover:text-[#60EFFF] transition-colors">
                Schuylkill
              </Link>
              <Link href="/feasterville-pa-home-care" className="text-[#60EFFF] hover:underline font-medium">
                Feasterville PA
              </Link>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10">
              <Link href="/areas-we-serve" className="text-[#FF7A59] font-bold text-[13.5px] hover:underline">
                Explore Full Coverage Map →
              </Link>
            </div>
          </div>

          {/* Col 4: Quick Navigation & Guides */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-poppins font-bold text-[13px] uppercase tracking-wider text-white mb-2">Care Resources</h4>
            <div className="w-[32px] h-[2px] bg-[#FF7A59] mb-6 rounded-full" />
            <ul className="flex flex-col gap-3 text-[14px] text-white/90 font-medium">
              <li>
                <Link href="/about" className="text-white/80 hover:text-[#60EFFF] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-[#60EFFF] transition-colors">
                  Care Resource Hub
                </Link>
              </li>
              <li>
                <Link href="/home-care-cost-pennsylvania" className="text-white/80 hover:text-[#60EFFF] transition-colors">
                  Home Care Costs PA
                </Link>
              </li>
              <li>
                <Link href="/medicaid-home-care-pennsylvania" className="text-white/80 hover:text-[#60EFFF] transition-colors">
                  Medicaid Waiver Guide
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-white/80 hover:text-[#60EFFF] transition-colors">
                  Request Care
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Trust Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[13px] text-white/70">
          <p>© {new Date().getFullYear()} Pavan Homecare LLC. All Rights Reserved. Licensed by the Pennsylvania Department of Health.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <a
              href="#cookie-settings"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "#cookie-settings";
              }}
              className="hover:text-[#60EFFF] transition-colors inline-flex items-center gap-1"
              title="Manage Cookie Preferences & Privacy Choices"
            >
              <ShieldCheck size={13} className="text-[#60EFFF]" />
              <span>Cookie Choices</span>
            </a>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("phc_toggle_accessibility_menu", { detail: { tab: "statement" } }));
              }}
              className="hover:text-[#60EFFF] transition-colors inline-flex items-center gap-1 bg-transparent border-0 p-0 text-[13px] text-white/70 cursor-pointer"
              title="Open ADA Accessibility Statement & Tools"
            >
              <Accessibility size={13} className="text-[#60EFFF]" />
              <span>Accessibility</span>
            </button>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
