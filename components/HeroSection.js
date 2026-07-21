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
    </section>
  );
}
