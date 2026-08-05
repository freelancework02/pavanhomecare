"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Heart, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Calendar, 
  UserCheck, 
  ArrowRight,
  HelpCircle,
  Award,
  Users,
  Car,
  Home,
  UtensilsCrossed,
  Brain,
  Layers,
  UserRound,
  Shield,
  CheckCircle2,
  Phone,
  Briefcase,
  Star,
  Check,
  Zap
} from "lucide-react";
import ServiceAreasSearch from "@/components/ServiceAreasSearch";
import GoogleReviews from "@/components/GoogleReviews";
import { site } from "@/lib/site";
import "./services.css";

const servicesList = [
  {
    id: "personal-care",
    title: "Personal Care",
    icon: <Heart size={22} />,
    image: "https://images.pexels.com/photos/7345474/pexels-photo-7345474.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Respectful, professional assistance with daily routines to support dignity, personal hygiene, and safety at home. Our trained caregivers assist with bathing, dressing, grooming, toileting, and safe mobility transfers.",
    whoBenefits: "Seniors recovering from illness, living with limited mobility, or requiring daily physical assistance.",
    checklist: [
      "Bathing & grooming support",
      "Dressing & personal hygiene care",
      "Safe transfers & positioning",
      "Incontinence care & dignity protocols",
      "Assistance with eating & nutrition",
      "Walking & mobility assistance"
    ]
  },
  {
    id: "companion-care",
    title: "Companion Care",
    icon: <Users size={22} />,
    image: "https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=800&auto=format&fit=crop&q=80",
    desc: "Warm companionship and active mental engagement to combat social isolation. We share meaningful conversations, assist with hobbies, play card games, read books, and encourage emotional well-being.",
    whoBenefits: "Seniors living alone who benefit from social interaction, friendship, or light cognitive activities.",
    checklist: [
      "Engaging conversation & visits",
      "Card & board games",
      "Reading aloud & book discussions",
      "Assisting with personal hobbies",
      "Accompanying on short walks",
      "Letter writing & scrapbooking"
    ]
  },
  {
    id: "meal-preparation",
    title: "Meal Preparation",
    icon: <UtensilsCrossed size={22} />,
    image: "https://images.pexels.com/photos/7446752/pexels-photo-7446752.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Nutritious, warm, home-cooked meals planned around your loved one's dietary guidelines. Caregivers manage grocery list compilation, meal prep, cooking, and complete kitchen cleanup.",
    whoBenefits: "Individuals with arthritis, diabetes, heart conditions, or difficulty standing to cook safely.",
    checklist: [
      "Special diet cooking (low-sodium)",
      "Weekly menu planning",
      "Pantry & fridge organization",
      "Grocery list compilation",
      "Dishes & kitchen cleanup",
      "Meal portioning & freezing"
    ]
  },
  {
    id: "transportation",
    title: "Transportation Support",
    icon: <Car size={22} />,
    image: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=800&auto=format&fit=crop&q=80",
    desc: "Accompanied rides to keep clients active and connected with their community. We drive clients to doctor appointments, pharmacy pickups, grocery stores, and family gatherings.",
    whoBenefits: "Seniors who no longer drive and wish to maintain their weekly schedules independently.",
    checklist: [
      "Doctor appointment escorts",
      "Pharmacy prescription pickups",
      "Grocery market shopping trips",
      "Visiting family & friends",
      "Accompaniment to community events",
      "Errand running support"
    ]
  },
  {
    id: "housekeeping",
    title: "Light Housekeeping",
    icon: <Home size={22} />,
    image: "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=800&auto=format&fit=crop&q=80",
    desc: "Maintaining a clean, safe, and hazard-free home environment. We help with laundry, washing dishes, dusting, taking out the trash, and keeping walking pathways clutter-free.",
    whoBenefits: "Individuals at risk of falling due to clutter, or those unable to manage daily physical chores.",
    checklist: [
      "Laundry & linens washing",
      "Dishwashing & storage",
      "Emptying trash & recycling",
      "Ironing & folding clothes",
      "Dusting key surfaces",
      "Organizing walking pathways"
    ]
  },
  {
    id: "medication-reminders",
    title: "Medication Reminders",
    icon: <Clock size={22} />,
    image: "https://images.pexels.com/photos/7195187/pexels-photo-7195187.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Timely verbal reminders to ensure your loved one adheres to their doctor-prescribed medication schedule. We verify pill organizer usage, track dosage times, and log compliance.",
    whoBenefits: "Seniors taking multiple daily prescriptions who benefit from routine reminders.",
    checklist: [
      "Timely verbal reminders",
      "Pill box opening support",
      "Tracking dosage schedules",
      "Fluid intake support",
      "Checking medication labels",
      "Logging compliance records"
    ]
  },
  {
    id: "alzheimers-care",
    title: "Memory & Alzheimer's Care",
    icon: <Brain size={22} />,
    image: "https://images.pexels.com/photos/6939465/pexels-photo-6939465.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Dedicated memory support designed to manage confusion, prevent wandering, and maintain a comforting, stable home environment for clients with Alzheimer's or dementia.",
    whoBenefits: "Seniors diagnosed with progressive memory loss or cognitive impairment.",
    checklist: [
      "Sensory calming assistance",
      "Redirection techniques",
      "Wander prevention checks",
      "Routine stability management",
      "Memory recall games",
      "Family status reporting"
    ]
  },
  {
    id: "respite-care",
    title: "Respite Care",
    icon: <Layers size={22} />,
    image: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=800&auto=format&fit=crop&q=80",
    desc: "Essential temporary care relief for primary family caregivers. Take a break, attend to personal commitments, or rest while our professional caregivers step in seamlessly.",
    whoBenefits: "Family caregivers needing physical or emotional relief from continuous caregiving duties.",
    checklist: [
      "Hourly care relief blocks",
      "Weekend coverage support",
      "Emergency backup care",
      "Overnight care blocks",
      "Routine continuity",
      "Caregiver status handover"
    ]
  },
  {
    id: "24hour-care",
    title: "24-Hour & Live-In Care",
    icon: <ShieldCheck size={22} />,
    image: "https://images.pexels.com/photos/9462621/pexels-photo-9462621.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Around-the-clock monitoring and continuous personal care shifts to guarantee safety, rapid assistance, and peace of mind day and night.",
    whoBenefits: "Seniors with advanced conditions, severe fall risks, or those requiring constant supervision.",
    checklist: [
      "Nighttime transfer support",
      "Overnight alertness watches",
      "Hospice coordination support",
      "Continuous safety supervision",
      "Rotational caregiver shifts",
      "Immediate emergency response"
    ]
  }
];

export default function ServicesClient({ initialService }) {
  const [activeTab, setActiveTab] = useState("all");

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (initialService) {
      const el = document.getElementById(initialService);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [initialService]);

  return (
    <div className="services-page-wrap">
      
      {/* ── HERO SECTION ── */}
      <section className="services-hero-section" aria-label="Home Care Services Hero">
        <div className="services-hero-bg-dots" />

        <div className="max-w-[1360px] mx-auto px-6 relative z-10">
          <div className="services-hero-grid">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="services-hero-badge">
                <Sparkles size={14} className="text-[#0061FF]" />
                Comprehensive In-Home Care Solutions
              </span>

              <h1 className="services-hero-title">
                Tailored In-Home Care Services<br />
                <span className="gradient-text-blue">Designed Around Your Family</span>
              </h1>

              <p className="services-hero-desc">
                Pavan Homecare provides compassionate, licensed caregivers for personal care, companion services, dementia support, 24/7 care, and respite care throughout Pennsylvania.
              </p>

              <div className="services-hero-actions">
                <button
                  onClick={() => handleScrollToSection("contact-section")}
                  className="btn-hero-primary btn-shimmer"
                >
                  <Heart size={18} className="fill-white/30" />
                  Request Free Care Plan
                  <ArrowRight size={18} />
                </button>

                <a href={site.phoneHref} className="btn-hero-phone">
                  <Phone size={16} className="text-[#0061FF]" />
                  Call {site.phoneDisplay}
                </a>
              </div>

              <div className="services-hero-trust">
                <div className="services-hero-trust-item">
                  <ShieldCheck size={16} className="text-[#0061FF]" />
                  <span>Licensed &amp; Insured</span>
                </div>
                <div className="services-hero-trust-item">
                  <UserCheck size={16} className="text-[#0061FF]" />
                  <span>Background Checked</span>
                </div>
                <div className="services-hero-trust-item">
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
              className="services-hero-media"
            >
              <div className="services-hero-image-frame">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1681996583708-b7fca2e8ed2a?w=800&auto=format&fit=crop&q=80"
                  alt="Caregiver supporting senior client at home"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="services-hero-img"
                />
              </div>

              {/* Floating Badge */}
              <div className="services-floating-badge">
                <div className="services-badge-icon">
                  <Award size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-[#FFB800] text-[#FFB800]" />
                    ))}
                  </div>
                  <div className="text-[13px] font-bold text-[#0F172A]">Top Rated Care Agency</div>
                  <div className="text-[11.5px] text-[#64748B]">Pennsylvania Licensed</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SERVICES DETAIL CARDS LIST ── */}
      <section className="services-list-section">
        <div className="services-list-container">
          
          {servicesList.map((service, index) => {
            const isEven = index % 2 === 1;
            const numStr = (index + 1).toString().padStart(2, "0");

            return (
              <motion.article
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`service-card-row ${isEven ? "service-card-row--reverse" : ""}`}
              >
                {/* Image Side */}
                <div className="service-card-media">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="service-card-img"
                  />
                  <div className="service-card-num-badge">
                    {numStr}
                  </div>
                </div>

                {/* Content Side */}
                <div className="service-card-body">
                  <div className="service-card-header">
                    <div className="service-icon-box">
                      {service.icon}
                    </div>
                    <span className="text-[12px] font-bold text-[#0061FF] uppercase tracking-wider">
                      Care Service #{index + 1}
                    </span>
                  </div>

                  <h2 className="service-card-title">{service.title}</h2>
                  
                  <p className="service-card-desc">{service.desc}</p>

                  {/* Who Benefits Box */}
                  <div className="service-who-box">
                    <Zap size={18} className="text-[#0061FF] shrink-0 mt-0.5" />
                    <div className="service-who-text">
                      <strong>Best Suited For:</strong> {service.whoBenefits}
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="service-checklist">
                    {service.checklist.map((item, idx) => (
                      <div key={idx} className="service-check-item">
                        <CheckCircle2 size={16} className="text-[#0061FF] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="service-card-actions">
                    <button
                      onClick={() => handleScrollToSection("contact-section")}
                      className="btn-service-request btn-shimmer"
                    >
                      <Heart size={16} className="fill-white/30" />
                      Request {service.title}
                      <ArrowRight size={16} />
                    </button>

                    <a href={site.phoneHref} className="btn-service-phone">
                      <Phone size={15} className="text-[#0061FF]" />
                      Call Coordinator
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}

        </div>
      </section>

      {/* ── CARE MATRIX / COMPARISON SECTION ── */}
      <section className="care-matrix-section">
        <div className="matrix-container">
          <div className="matrix-header">
            <span className="services-hero-badge">
              <ShieldCheck size={14} className="text-[#0061FF]" />
              Helpful Care Guidance
            </span>
            <h2 className="matrix-title">Which Care Level Does Your Loved One Need?</h2>
            <p className="text-[#475569] text-[15px]">
              Every family&apos;s situation is unique. Our care coordinators evaluate your loved one&apos;s daily routine to recommend the right level of support.
            </p>
          </div>

          <div className="matrix-grid">
            <div className="matrix-card">
              <div>
                <span className="matrix-card__badge">Level 1 · Light Care</span>
                <h3 className="matrix-card__title">Companion &amp; Housekeeping</h3>
                <p className="matrix-card__desc">Ideal for independent seniors who live alone and need light assistance with meals, laundry, errands, and social visits.</p>
              </div>
              <button onClick={() => handleScrollToSection("companion-care")} className="btn-service-phone text-center w-full justify-center">
                Explore Companion Care
              </button>
            </div>

            <div className="matrix-card">
              <div>
                <span className="matrix-card__badge">Level 2 · Daily ADL Care</span>
                <h3 className="matrix-card__title">Personal &amp; Hygiene Care</h3>
                <p className="matrix-card__desc">Designed for seniors needing hands-on help with bathing, dressing, toileting, transfers, and daily mobility routine.</p>
              </div>
              <button onClick={() => handleScrollToSection("personal-care")} className="btn-service-phone text-center w-full justify-center">
                Explore Personal Care
              </button>
            </div>

            <div className="matrix-card">
              <div>
                <span className="matrix-card__badge">Level 3 · Specialized Care</span>
                <h3 className="matrix-card__title">Memory &amp; 24/7 Support</h3>
                <p className="matrix-card__desc">Comprehensive memory care or around-the-clock shift support for dementia, fall risk, or hospice care continuity.</p>
              </div>
              <button onClick={() => handleScrollToSection("alzheimers-care")} className="btn-service-phone text-center w-full justify-center">
                Explore Memory Care
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS & GOOGLE REVIEWS INTEGRATION ── */}
      <ServiceAreasSearch />
      <GoogleReviews />

      {/* ── CONTACT FORM SECTION ── */}
      <section id="contact-section" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl max-w-[800px] mx-auto text-center">
            <span className="services-hero-badge mb-4">
              <Heart size={14} className="text-[#0061FF]" />
              Start Free Today
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Request Your Free Care Assessment
            </h2>
            <p className="text-slate-600 text-base mb-8 max-w-[600px] mx-auto">
              Fill out the form below or call us directly at <strong>{site.phoneDisplay}</strong>. A dedicated care coordinator will contact you within 2 hours.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0061FF] text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Phone Number</label>
                <input type="tel" placeholder="(215) 436-9499" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0061FF] text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0061FF] text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">How Can We Help Your Loved One?</label>
                <textarea rows={3} placeholder="Tell us about the care services you need..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0061FF] text-sm" />
              </div>
              <div className="sm:col-span-2 pt-2">
                <button type="submit" className="w-full btn-hero-primary btn-shimmer py-3.5 text-base justify-center">
                  Submit Request &amp; Get Call Back <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
