"use client";

import BackgroundShapes from "./BackgroundShapes";
import HeroLeft from "./HeroLeft";
import HeroImage from "./HeroImage";
import FeatureStrip from "./FeatureStrip";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-white pt-8 pb-14 lg:pb-20 overflow-hidden">
      <BackgroundShapes />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-[80px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-16 items-center min-h-[600px] lg:min-h-[690px]">
          <HeroLeft />
          <HeroImage />
        </div>

        <FeatureStrip />
      </div>
    </section>
  );
}
