"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck, 
  Phone, 
  Star,
  Users,
  Compass,
  Heart,
  Calendar,
  Home,
  Check,
  Sparkles,
  Award,
  Zap,
  Lock,
  Loader2,
  AlertCircle
} from "lucide-react";
import { site } from "@/lib/site";
import GoogleReviews from "@/components/GoogleReviews";
import { submitContactInquiry } from "@/lib/firebase";
import "../areas.css";

const servicesList = [
  {
    icon: UserCheck,
    title: "Personal Care",
    desc: "Dignified assistance with bathing, dressing, grooming, toileting, and mobility support."
  },
  {
    icon: Heart,
    title: "Companion Care",
    desc: "Meaningful conversation, social activities, and daily companionship to reduce isolation."
  },
  {
    icon: Clock,
    title: "Respite Care",
    desc: "Short-term relief for family caregivers, ensuring your loved one is in safe hands."
  },
  {
    icon: Home,
    title: "Meal Preparation",
    desc: "Nutritious meal planning, grocery shopping, and custom cooking aligned with dietary needs."
  },
  {
    icon: MapPin,
    title: "Transportation",
    desc: "Safe transportation to medical appointments, community outings, and errands."
  },
  {
    icon: ShieldCheck,
    title: "Light Housekeeping",
    desc: "Tidying, laundry, dishwashing, and sorting to maintain a clean, organized home environment."
  },
  {
    icon: Calendar,
    title: "Medication Reminders",
    desc: "Prompt reminders to ensure prescription medication routines are followed correctly."
  },
  {
    icon: Compass,
    title: "Dementia Care",
    desc: "Specialized memory support, routines, and safe engagement for seniors with Alzheimer's."
  }
];

const chooseUsReasons = [
  {
    title: "Licensed Agency",
    desc: "Fully licensed by the PA Department of Health for non-medical home care."
  },
  {
    title: "Background Checked",
    desc: "Strict screening, fingerprinting, and reference audits for every caregiver."
  },
  {
    title: "Personalized Care Plans",
    desc: "Custom care hours and support mapped precisely to individual daily goals."
  },
  {
    title: "Compassionate Care",
    desc: "Caregivers matched carefully based on clinical needs, routines, and personalities."
  },
  {
    title: "Experienced Caregivers",
    desc: "Ongoing training and credentials verification for our care professionals."
  },
  {
    title: "24/7 Local Support",
    desc: "Local PA care coordinators on-call around the clock for family support."
  }
];

const timelineSteps = [
  {
    num: "01",
    title: "Contact Us",
    desc: "Submit a request online or call our team to discuss your care goals."
  },
  {
    num: "02",
    title: "Free Consultation",
    desc: "A local coordinator conducts a complimentary in-home assessment."
  },
  {
    num: "03",
    title: "Personalized Care Plan",
    desc: "We draft a customized plan covering authorized hours and matching care needs."
  },
  {
    num: "04",
    title: "Care Begins",
    desc: "We introduce your matched caregiver and launch transparent scheduled care visits."
  }
];

export default function CountyPageClient({ data, city }) {
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : "";
  const displayLocation = city ? `${cityName}, PA` : data.name;
  const heroTitle = city ? `Home Care in ${cityName}, PA` : data.heroTitle;
  const heroSubtitle = city
    ? `Reliable in-home care for seniors in ${cityName}, PA and surrounding ${data.name}. Companion, personal & 24 hour care.`
    : data.heroSubtitle;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitContactInquiry({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        location: displayLocation,
        county: data?.name || "",
        formName: `County Landing Assessment Form (${displayLocation})`,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : `/areas-we-serve/${data.slug}`
      });

      if (result.success) {
        setFormSubmitted(true);
      } else {
        if (result.error && result.error.includes("permission-denied")) {
          setSubmitError("Firebase Firestore permissions pending: Please ensure Firestore rules allow write access to 'PHC-Contact-form-inquiries'.");
        } else {
          setSubmitError(result.error || "Unable to send request. Please call us directly.");
        }
      }
    } catch (err) {
      console.error("Error submitting county form:", err);
      setSubmitError("An unexpected error occurred. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              className="areas-hero-copy"
            >
              <span className="areas-hero-badge">
                <MapPin size={14} className="text-[#0061FF]" />
                PA Service Coverage · {displayLocation}
              </span>

              <h1 className="areas-hero-title">
                Professional In-Home Care in<br />
                <span className="gradient-text-blue">{displayLocation}</span>
              </h1>

              <p className="areas-hero-desc">{heroSubtitle}</p>

              <div className="areas-hero-actions">
                <a href="#request-care" className="btn-hero-primary btn-shimmer">
                  <Heart size={18} className="fill-white/30" />
                  Request Free Assessment
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
                  src={data.heroImage || "/images/photos/fallback-care.webp"}
                  alt={`Caregiver assisting senior in ${displayLocation}`}
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
                  <div className="text-[13px] font-bold text-[#0F172A]">{displayLocation} Care Provider</div>
                  <div className="text-[11.5px] text-[#64748B]">Pennsylvania Department of Health</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CITIES & COMMUNITIES SERVED ── */}
      <section className="county-communities-section py-20 bg-gradient-to-b from-white to-[#F0F7FF] border-b border-[#DCE7F7]">
        <div className="max-w-[1360px] mx-auto px-6 text-center">
          <span className="areas-hero-badge mb-4">
            <Compass size={14} className="text-[#0061FF]" />
            Local Community Coverage
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            {data.aboutTitle ? data.aboutTitle : <>Serving <span className="gradient-text-blue">{displayLocation}</span> Communities</>}
          </h2>
          <p className="text-[#475569] text-base sm:text-lg max-w-[720px] mx-auto mb-10 leading-relaxed">
            Our local caregivers live right in your community, enabling prompt, dependable in-home care visits across every borough and township.
          </p>

          <div className="county-community-list flex flex-wrap justify-center gap-3 max-w-[1050px] mx-auto">
            {(data.cities || []).map((cObj, idx) => {
              const cName = typeof cObj === "string" ? cObj : cObj.name;
              return (
                <span
                  key={cName || idx}
                  className="county-community-chip inline-flex items-center gap-2.5 bg-white border border-[#DCE7F7] hover:border-[#0061FF] hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#0061FF] text-sm font-bold py-3 rounded-full shadow-[0_4px_14px_rgba(0,97,255,0.06)] hover:shadow-[0_8px_20px_rgba(0,97,255,0.15)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <MapPin size={15} className="text-[#0061FF] shrink-0" />
                  {cName}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES AVAILABLE IN COUNTY ── */}
      <section className="county-services-section py-24 bg-[#F8FAFC]">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center max-w-[760px] mx-auto mb-16">
            <span className="areas-hero-badge mb-4">
              <Sparkles size={14} className="text-[#0061FF]" />
              In-Home Support Services
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
              Services Available in <span className="gradient-text-blue">{displayLocation}</span>
            </h2>
            <p className="text-[#475569] text-base sm:text-lg leading-relaxed">
              Comprehensive non-medical care plans customized to help your loved one stay safe, comfortable, and independent at home.
            </p>
          </div>

          <div className="county-services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={srv.title}
                  className="county-service-card bg-white border border-[#DCE7F7] hover:border-[#0061FF] rounded-3xl p-7 shadow-[0_10px_30px_rgba(0,26,77,0.04)] hover:shadow-[0_20px_48px_rgba(0,97,255,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <span className="county-service-index">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#0061FF] to-[#60EFFF] text-white flex items-center justify-center mb-5 shadow-[0_8px_20px_rgba(0,97,255,0.3)] group-hover:scale-110 transition-transform duration-300">
                      <IconComp size={24} />
                    </div>
                    <h3 className="font-heading text-xl font-extrabold text-[#001A4D] group-hover:text-[#0061FF] transition-colors mb-2.5">
                      {srv.title}
                    </h3>
                    <p className="text-[#4A5A73] text-sm leading-relaxed mb-6">
                      {srv.desc}
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-[#0061FF] font-extrabold text-sm group-hover:text-[#0047B8] transition-colors mt-auto pt-4 border-t border-[#F1F5F9]"
                  >
                    <span>Explore Service</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY FAMILIES CHOOSE US ── */}
      <section className="county-why-section py-24 bg-white border-t border-[#DCE7F7]">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="text-center max-w-[760px] mx-auto mb-16">
            <span className="areas-hero-badge mb-4">
              <ShieldCheck size={14} className="text-[#0061FF]" />
              The Pavan Distinction
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#001A4D] mb-4">
              Why Families Choose Pavan Homecare in <span className="gradient-text-blue">{displayLocation}</span>
            </h2>
          </div>

          <div className="county-why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {chooseUsReasons.map((reason, idx) => (
              <div
                key={reason.title}
                className="county-why-card bg-gradient-to-br from-white to-[#F8FAFC] border border-[#DCE7F7] hover:border-[#0061FF] rounded-3xl p-7 shadow-[0_8px_24px_rgba(0,26,77,0.04)] hover:shadow-[0_16px_36px_rgba(0,97,255,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="county-why-index">{String(idx + 1).padStart(2, "0")}</span>
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0061FF] to-[#60EFFF] text-white flex items-center justify-center font-bold mb-5 shadow-[0_6px_16px_rgba(0,97,255,0.25)]">
                  <Check size={20} strokeWidth={3} />
                </div>
                <h3 className="font-heading text-xl font-extrabold text-[#001A4D] mb-2.5">
                  {reason.title}
                </h3>
                <p className="text-[#4A5A73] text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARE PROCESS TIMELINE ── */}
      <section className="timeline-section">
        <div className="timeline-container">
          <div className="timeline-header">
            <span className="areas-hero-badge">
              <Clock size={14} className="text-[#0061FF]" />
              Simple 4-Step Process
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              How Care Begins in {displayLocation}
            </h2>
          </div>

          <div className="timeline-steps">
            {timelineSteps.map((st, idx) => (
              <div key={st.num} className="timeline-step-card">
                <span className="timeline-step-label">{String(idx + 1).padStart(2, "0")}</span>
                <div className="timeline-step-num">{st.num}</div>
                <h3 className="timeline-step-title">{st.title}</h3>
                <p className="timeline-step-desc">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS INTEGRATION ── */}
      <GoogleReviews />

      {/* ── BOOKING CONTACT SECTION ── */}
      <section id="request-care" className="county-request-section py-20 bg-[#F5F9FF] border-t border-[#DCE7F7]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="county-request-card bg-white rounded-3xl p-8 sm:p-12 border border-[#DCE7F7] shadow-[0_20px_50px_rgba(0,26,77,0.08)] max-w-[800px] mx-auto text-center">
            <span className="areas-hero-badge mb-4">
              <Heart size={14} className="text-[#FF7A59]" />
              Start Free Consultation
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#001A4D] mb-4">
              Schedule a Free Care Assessment in {displayLocation}
            </h2>
            <p className="text-[#4A5A73] text-base mb-8 max-w-[600px] mx-auto">
              Our local care coordinator will discuss your family&apos;s needs and create a customized care plan.
            </p>

            {formSubmitted ? (
              <div className="bg-[#E8F2FF] border border-[#0061FF]/20 rounded-2xl p-8 text-center max-w-[600px] mx-auto">
                <div className="w-14 h-14 rounded-full bg-[#0061FF] text-white flex items-center justify-center mx-auto mb-4">
                  <Check size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#001A4D] mb-2">Request Received!</h3>
                <p className="text-sm text-[#4A5A73] mb-4">
                  Thank you! Our local care coordinator in {displayLocation} will contact you shortly to review your needs and build your customized care plan.
                </p>
                <a href={site.phoneHref} className="btn-hero-primary inline-flex items-center gap-2">
                  <Phone size={16} />
                  <span>Call {site.phoneDisplay} Directly</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label htmlFor="county-form-firstName" className="block text-xs font-bold text-[#001A4D] uppercase mb-1.5">First Name *</label>
                  <input
                    id="county-form-firstName"
                    type="text"
                    name="firstName"
                    required
                    placeholder="First Name"
                    aria-label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] focus:outline-none focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 text-sm text-[#0B1730]"
                  />
                </div>
                <div>
                  <label htmlFor="county-form-lastName" className="block text-xs font-bold text-[#001A4D] uppercase mb-1.5">Last Name *</label>
                  <input
                    id="county-form-lastName"
                    type="text"
                    name="lastName"
                    required
                    placeholder="Last Name"
                    aria-label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] focus:outline-none focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 text-sm text-[#0B1730]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="county-form-email" className="block text-xs font-bold text-[#001A4D] uppercase mb-1.5">Email Address *</label>
                  <input
                    id="county-form-email"
                    type="email"
                    name="email"
                    required
                    placeholder="yourname@email.com"
                    aria-label="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] focus:outline-none focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 text-sm text-[#0B1730]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="county-form-phone" className="block text-xs font-bold text-[#001A4D] uppercase mb-1.5">Phone Number *</label>
                  <input
                    id="county-form-phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="(215) 436-9499"
                    aria-label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] focus:outline-none focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 text-sm text-[#0B1730]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="county-form-message" className="block text-xs font-bold text-[#001A4D] uppercase mb-1.5">How Can We Help?</label>
                  <textarea
                    id="county-form-message"
                    rows={3}
                    name="message"
                    placeholder="Tell us about the care services needed..."
                    aria-label="How Can We Help?"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] focus:outline-none focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 text-sm text-[#0B1730]"
                  />
                </div>

                {submitError && (
                  <div className="sm:col-span-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#FF7A59] hover:bg-[#E86746] text-white font-poppins font-bold text-[15px] py-4 rounded-full shadow-[0_10px_25px_rgba(255,122,89,0.35)] hover:shadow-[0_15px_30px_rgba(255,122,89,0.5)] hover:-translate-y-0.5 transition-all duration-300 btn-shimmer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request &amp; Get Call Back</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
