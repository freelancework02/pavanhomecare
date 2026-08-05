"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  UserCheck, 
  Phone, 
  Star,
  Compass,
  Heart,
  Sparkles,
  Award,
  Users
} from "lucide-react";
import { site } from "@/lib/site";
import ServiceAreasSearch from "@/components/ServiceAreasSearch";
import GoogleReviews from "@/components/GoogleReviews";
import "./areas.css";

const countyMunicipalities = [
  {
    id: "york",
    name: "York County",
    badge: "Immediate Care Available",
    communities: "18 Communities",
    caregivers: "45+ Local Caregivers",
    cities: ["York City", "Hanover", "Red Lion", "Dallastown", "Shrewsbury", "West York", "Wrightsville", "Dillsburg"],
  },
  {
    id: "lancaster",
    name: "Lancaster County",
    badge: "Immediate Care Available",
    communities: "15 Communities",
    caregivers: "30+ Local Caregivers",
    cities: ["Lancaster City", "Columbia", "Millersville", "Lititz", "Mount Joy", "Elizabethtown", "Ephrata"],
  },
  {
    id: "bucks",
    name: "Bucks County",
    badge: "Active Coverage",
    communities: "16 Communities",
    caregivers: "35+ Local Caregivers",
    cities: ["Feasterville", "Doylestown", "Bensalem", "Quakertown", "Warminster", "Newtown", "Levittown"],
  },
  {
    id: "chester",
    name: "Chester County",
    badge: "Active Coverage",
    communities: "14 Communities",
    caregivers: "28+ Local Caregivers",
    cities: ["West Chester", "Phoenixville", "Coatesville", "Downingtown", "Kennett Square", "Exton"],
  },
  {
    id: "delaware",
    name: "Delaware County",
    badge: "Active Coverage",
    communities: "15 Communities",
    caregivers: "32+ Local Caregivers",
    cities: ["Media", "Chester", "Upper Darby", "Haverford", "Radnor", "Springfield"],
  },
  {
    id: "montgomery",
    name: "Montgomery County",
    badge: "Active Coverage",
    communities: "18 Communities",
    caregivers: "40+ Local Caregivers",
    cities: ["Norristown", "King of Prussia", "Lansdale", "Pottstown", "Willow Grove", "Conshohocken"],
  }
];

export default function AreasWeServePage() {
  return (
    <div className="areas-page-container">
      
      {/* ── HERO SECTION ── */}
      <section className="areas-hero-section">
        <div className="areas-hero-bg-dots" />

        <div className="max-w-[1360px] mx-auto px-6 relative z-10">
          <div className="areas-hero-grid">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="areas-hero-badge">
                <MapPin size={14} className="text-[#0061FF]" />
                PA Regional Care Network
              </span>

              <h1 className="areas-hero-title">
                Compassionate In-Home Care<br />
                <span className="gradient-text-blue">Across Pennsylvania Counties</span>
              </h1>

              <p className="areas-hero-desc">
                Pavan Homecare provides trusted, licensed in-home care caregivers across Philadelphia, Bucks, Montgomery, Delaware, Chester, York, Lancaster, and surrounding counties.
              </p>

              <div className="areas-hero-actions">
                <a href="#counties-section" className="btn-hero-primary btn-shimmer">
                  <Compass size={18} />
                  Explore Service Counties
                  <ArrowRight size={18} />
                </a>

                <a href={site.phoneHref} className="btn-hero-phone">
                  <Phone size={16} className="text-[#0061FF]" />
                  Call {site.phoneDisplay}
                </a>
              </div>

              <div className="areas-hero-trust">
                <div className="areas-hero-trust-item">
                  <ShieldCheck size={16} className="text-[#0061FF]" />
                  <span>Licensed &amp; Insured</span>
                </div>
                <div className="areas-hero-trust-item">
                  <UserCheck size={16} className="text-[#0061FF]" />
                  <span>Background Checked</span>
                </div>
                <div className="areas-hero-trust-item">
                  <Clock size={16} className="text-[#0061FF]" />
                  <span>24/7 Local Support</span>
                </div>
              </div>
            </motion.div>

            {/* Right Media */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="areas-hero-media"
            >
              <div className="areas-hero-image-frame">
                <Image
                  src="https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=800&auto=format&fit=crop&q=80"
                  alt="Caregiver walking outdoors with senior client in Pennsylvania"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="areas-hero-img"
                />
              </div>

              {/* Floating Badge */}
              <div className="areas-floating-badge">
                <div className="areas-badge-icon">
                  <Award size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-[#FFB800] text-[#FFB800]" />
                    ))}
                  </div>
                  <div className="text-[13px] font-bold text-[#0F172A]">Licensed PA Agency</div>
                  <div className="text-[11.5px] text-[#64748B]">8+ Counties Covered</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SEARCH MAP COMPONENT ── */}
      <ServiceAreasSearch />

      {/* ── COUNTIES GRID SECTION ── */}
      <section id="counties-section" className="counties-grid-section">
        <div className="counties-container">
          
          <div className="counties-header">
            <span className="areas-hero-badge">
              <Compass size={14} className="text-[#0061FF]" />
              Active Coverage Areas
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Select Your Local Pennsylvania County
            </h2>
            <p className="text-slate-600 text-base">
              Click any county below to view specific municipal coverage, caregiver availability, and localized care plans.
            </p>
          </div>

          <div className="counties-grid">
            {countyMunicipalities.map((c) => (
              <div key={c.id} className="county-card">
                <div>
                  <span className="county-card__badge">
                    <Sparkles size={12} />
                    {c.badge}
                  </span>

                  <h3 className="county-card__title">{c.name}</h3>

                  <div className="county-card__meta">
                    <span>📍 {c.communities}</span>
                    <span>👨‍⚕️ {c.caregivers}</span>
                  </div>

                  <p className="county-card__cities">
                    <strong>Serving:</strong> {c.cities.join(", ")} and surrounding boroughs.
                  </p>
                </div>

                <Link href={`/areas-we-serve/${c.id}`} className="county-card__link btn-shimmer">
                  <span>View {c.name} Care</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── GOOGLE REVIEWS INTEGRATION ── */}
      <GoogleReviews />

    </div>
  );
}
