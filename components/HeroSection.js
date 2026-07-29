"use client";

import BackgroundShapes from "./BackgroundShapes";
import HeroLeft from "./HeroLeft";
import HeroImage from "./HeroImage";
import FeatureStrip from "./FeatureStrip";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-white pt-6 pb-16 overflow-hidden">
      {/* Ambient SVG Shapes & Orbs */}
      <BackgroundShapes />

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px] relative z-10">
        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[620px] lg:min-h-[700px]">
          {/* Left Column */}
          <HeroLeft />

          {/* Right Column */}
          <HeroImage />
        </div>

        {/* Bottom Feature Strip */}
        <FeatureStrip />
      </div>

      {/* ── Soft Curved SVG Transition Divider to Services Section ── */}
      <div className="w-full overflow-hidden leading-none z-10 pointer-events-none mt-12">
        <svg
          className="relative block w-full h-[40px] sm:h-[60px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,50 L1200,120 L0,120 Z"
            fill="#F7F9FC"
          ></path>
        </svg>
      </div>
    </section>
  );
}
