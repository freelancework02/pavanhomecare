import Link from "next/link";
import { site } from "@/lib/site";
import { Home, Phone, ArrowRight, MapPin, Heart } from "lucide-react";

export const metadata = {
  title: "Page Not Found (404) | Pavan Homecare",
  description: "The page you are looking for might have been moved or does not exist. Explore Pavan Homecare services, service areas, or speak with our live care coordinators.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-gradient-to-b from-[#F5F9FF] to-white">
      <div className="max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#0061FF]/20 shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#001A4D]">
            Error 404 • Page Not Found
          </span>
        </div>

        <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#001A4D] mb-4 tracking-tight">
          Let’s Get You Back to Care
        </h1>

        <p className="text-[#4A5A73] text-base sm:text-lg mb-8 leading-relaxed max-w-lg mx-auto">
          The page you requested is unavailable or may have moved. Explore our core services or connect with our Feasterville-based care team right away.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#0061FF] hover:bg-[#0047B8] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-[0_8px_20px_rgba(0,97,255,0.25)] hover:shadow-[0_12px_25px_rgba(0,97,255,0.35)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <Home size={18} />
            Back to Homepage
          </Link>

          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#F0F6FF] text-[#001A4D] font-bold text-sm sm:text-base px-6 py-3.5 rounded-full border border-[#DCE7F7] shadow-sm hover:-translate-y-0.5 transition-all duration-200"
          >
            <Phone size={18} className="text-[#FF7A59]" />
            Call {site.phoneDisplay}
          </a>
        </div>

        {/* Helpful Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-[#DCE7F7] pt-8">
          <Link
            href="/services"
            className="p-4 rounded-2xl bg-white border border-[#DCE7F7] hover:border-[#0061FF]/40 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-[#001A4D] group-hover:text-[#0061FF]">
                Care Services
              </span>
              <ArrowRight size={14} className="text-[#64748B] group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-[#64748B] m-0">
              Personal care, companion care, 24-hr & memory care.
            </p>
          </Link>

          <Link
            href="/areas-we-serve"
            className="p-4 rounded-2xl bg-white border border-[#DCE7F7] hover:border-[#0061FF]/40 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-[#001A4D] group-hover:text-[#0061FF]">
                Areas We Serve
              </span>
              <MapPin size={14} className="text-[#64748B] group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-[#64748B] m-0">
              Bucks, Philadelphia, Montgomery & 9 PA counties.
            </p>
          </Link>

          <Link
            href="/contact-us"
            className="p-4 rounded-2xl bg-white border border-[#DCE7F7] hover:border-[#0061FF]/40 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-[#001A4D] group-hover:text-[#0061FF]">
                Free Consultation
              </span>
              <Heart size={14} className="text-[#64748B] group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-[#64748B] m-0">
              Speak directly with an experienced care coordinator.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
