"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight, Heart, ShieldCheck, Star, Award, Sparkles } from "lucide-react";
import { site } from "@/lib/site";

export default function PageHero({
  eyebrow,
  title,
  description,
  ctaLabel = "Request Care",
  ctaHref = "/contact-us",
  showPhone = true,
  mediaLabel = "Caregiver supporting a client at home",
  imageSrc,
  compact = false,
}) {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#F5F9FF] via-[#F8FBFF] to-white border-b border-[#DCE7F7] overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Ambient Glows & Dot Patterns */}
      <div 
        aria-hidden="true" 
        className="absolute top-[-10rem] right-[-10rem] w-[45rem] h-[45rem] rounded-full bg-radial-gradient from-[#0061FF]/10 via-[#60EFFF]/5 to-transparent blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-[-5rem] left-[-10rem] w-[40rem] h-[40rem] rounded-full bg-radial-gradient from-[#FF7A59]/10 via-[#0061FF]/5 to-transparent blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[radial-gradient(#0061FF_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05] pointer-events-none" 
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        {imageSrc ? (
          /* ── 2-COLUMN LAYOUT (With Media) ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {eyebrow && (
                <div className="inline-flex items-center gap-2 bg-[#E8F2FF] border border-[#0061FF]/20 text-[#0061FF] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-5 shadow-sm w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#FF7A59] animate-pulse" />
                  <span>{eyebrow}</span>
                </div>
              )}

              <h1 className="font-poppins font-extrabold text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.12] text-[#001A4D] tracking-[-0.8px] mb-6">
                {title}
              </h1>

              {description && (
                <p className="text-[#4A5A73] text-[16px] sm:text-[18px] leading-relaxed max-w-[620px] mb-8">
                  {description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                {ctaLabel && (
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center gap-2.5 bg-[#FF7A59] hover:bg-[#E86746] text-white font-poppins font-bold text-[15px] px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(255,122,89,0.35)] hover:shadow-[0_15px_30px_rgba(255,122,89,0.5)] hover:-translate-y-0.5 transition-all duration-300 btn-shimmer"
                  >
                    <Heart size={17} className="fill-white/30" />
                    <span>{ctaLabel}</span>
                    <ArrowRight size={17} />
                  </Link>
                )}

                {showPhone && (
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-2.5 bg-white hover:bg-[#F5F9FF] text-[#001A4D] hover:text-[#0061FF] border border-[#DCE7F7] hover:border-[#0061FF]/40 font-poppins font-bold text-[15px] px-7 py-4 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Phone size={17} className="text-[#0061FF]" />
                    <span>Call {site.phoneDisplay}</span>
                  </a>
                )}
              </div>

              {/* Trust badges strip */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#DCE7F7]/80 text-[#4A5A73] text-[13px] font-semibold">
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#0061FF]" />
                  <span>Licensed &amp; Insured PA Agency</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Sparkles size={16} className="text-[#FF7A59]" />
                  <span>100% Background Checked</span>
                </div>
              </div>
            </div>

            {/* Right Media (5 Cols) */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -top-4 -left-4 w-[115%] h-[110%] bg-gradient-to-tr from-[#0061FF]/10 via-[#FF7A59]/10 to-[#60EFFF]/10 rounded-[28px] blur-xl -z-10 transform -rotate-2" />
              
              <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,26,77,0.12)] border-4 border-white">
                <Image
                  src={imageSrc}
                  alt={mediaLabel}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001A4D]/30 via-transparent to-transparent pointer-events-none" />

                {/* Overlapping Badge */}
                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md p-3 px-4.5 rounded-2xl shadow-lg border border-white/80 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F2FF] text-[#0061FF] flex items-center justify-center font-bold">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-[#FF7A59] text-[#FF7A59]" />
                      ))}
                    </div>
                    <span className="font-extrabold text-[12.5px] text-[#001A4D] block leading-tight mt-0.5">
                      Pavan Homecare
                    </span>
                    <span className="text-[11px] text-[#4A5A73]">Love Driven Care</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── SINGLE COLUMN CENTERED / EDITORIAL LAYOUT (No Media) ── */
          <div className={`max-w-[840px] mx-auto text-center ${compact ? 'py-4' : 'py-6'}`}>
            {eyebrow && (
              <div className="inline-flex items-center gap-2 bg-[#E8F2FF] border border-[#0061FF]/20 text-[#0061FF] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                <span>{eyebrow}</span>
              </div>
            )}

            <h1 className="font-poppins font-extrabold text-[36px] sm:text-[48px] lg:text-[54px] leading-[1.12] text-[#001A4D] tracking-[-0.8px] mb-5">
              {title}
            </h1>

            {description && (
              <p className="text-[#4A5A73] text-[16px] sm:text-[18.5px] leading-relaxed max-w-[680px] mx-auto mb-8">
                {description}
              </p>
            )}

            {(ctaLabel || showPhone) && (
              <div className="flex flex-wrap items-center justify-center gap-4">
                {ctaLabel && (
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center gap-2.5 bg-[#FF7A59] hover:bg-[#E86746] text-white font-poppins font-bold text-[15px] px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(255,122,89,0.35)] hover:shadow-[0_15px_30px_rgba(255,122,89,0.5)] hover:-translate-y-0.5 transition-all duration-300 btn-shimmer"
                  >
                    <Heart size={17} className="fill-white/30" />
                    <span>{ctaLabel}</span>
                    <ArrowRight size={17} />
                  </Link>
                )}

                {showPhone && (
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-2.5 bg-white hover:bg-[#F5F9FF] text-[#001A4D] hover:text-[#0061FF] border border-[#DCE7F7] hover:border-[#0061FF]/40 font-poppins font-bold text-[15px] px-7 py-4 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Phone size={17} className="text-[#0061FF]" />
                    <span>Call {site.phoneDisplay}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
