"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Briefcase, 
  Plus, 
  Minus, 
  User, 
  Users, 
  Check, 
  Headphones,
  Printer,
  ChevronRight,
  ShieldAlert,
  HelpCircle
} from "lucide-react";
import { site } from "@/lib/site";
import GoogleReviews from "@/components/GoogleReviews";

const contactChannels = [
  {
    id: "phone",
    title: "Direct Phone Line",
    desc: "Speak with our on-call Care Coordinator immediately for guidance & urgent admissions.",
    icon: Phone,
    actionText: `Call ${site.phoneDisplay}`,
    actionLink: site.phoneHref,
    badge: "24/7 Response",
    featured: true
  },
  {
    id: "consultation",
    title: "Free In-Home Assessment",
    desc: "Schedule a comprehensive, zero-cost care evaluation inside the comfort of your home.",
    icon: Calendar,
    actionText: "Book Assessment",
    actionLink: "#consultation-form",
    badge: "No Obligation",
    featured: false
  },
  {
    id: "email",
    title: "Email Concierge",
    desc: "Send care inquiries, state waiver documentation, or questions to our support desk.",
    icon: Mail,
    actionText: "Email Support Desk",
    actionLink: `mailto:${site.email}?subject=Care Consultation Inquiry - Pavan Homecare`,
    badge: "1-Day Reply",
    featured: false
  },
  {
    id: "careers",
    title: "Caregiver Careers",
    desc: "Join our licensed caregiver family. Competitive pay, flexible shifts & meaningful work.",
    icon: Briefcase,
    actionText: "Apply Online",
    actionLink: `mailto:${site.email}?subject=Caregiver Career Application`,
    badge: "We're Hiring",
    featured: false
  }
];

const careServicesOptions = [
  { id: "personal-care", label: "Personal Care & Hygiene" },
  { id: "companion-care", label: "Companion & Homemaking" },
  { id: "dementia-care", label: "Alzheimer's & Dementia" },
  { id: "meal-prep", label: "Nutritious Meal Prep" },
  { id: "medication-reminders", label: "Medication Reminders" },
  { id: "medicaid-chc", label: "PA Medicaid Waiver (CHC)" },
  { id: "respite-care", label: "Respite & Family Relief" },
  { id: "live-in", label: "24/7 & Live-In Support" }
];

const recipientOptions = [
  { id: "parent", label: "My Parent / Elderly Relative" },
  { id: "spouse", label: "My Spouse / Partner" },
  { id: "myself", label: "Myself" },
  { id: "child-other", label: "Other Loved One" }
];

const trustFactors = [
  {
    title: "100% Free In-Home Consultation",
    desc: "We perform full face-to-face evaluations inside your home to understand daily routines with zero obligation.",
    icon: Sparkles
  },
  {
    title: "Rapid 24-48 Hour Matching",
    desc: "Our local coordinators match compatible, compassionate caregivers tailored directly to your personality and needs.",
    icon: Clock
  },
  {
    title: "PA Medicaid Waiver Specialists",
    desc: "We assist families in navigating Community HealthChoices (CHC) and state waiver programs to maximize authorized hours.",
    icon: Heart
  },
  {
    title: "Licensed, Screened & Bonded",
    desc: "Every caregiver undergoes criminal background checks, FBI fingerprinting, reference reviews, and ongoing skills training.",
    icon: ShieldCheck
  }
];

const careTeamCoordinators = [
  {
    name: "Abessan Kamara",
    role: "Lead Care Coordinator",
    badge: "Client Care Lead",
    quote: "My mission is making sure every family feels heard, valued, and paired with a caregiver who feels like family.",
    img: "/images/photos/team-coordinator-1.jpg"
  },
  {
    name: "Sarah Jenkins",
    role: "Medicaid Waiver & CHC Navigator",
    badge: "State Programs Specialist",
    quote: "I guide families step-by-step through PA state waiver documentation so they receive every hour of care they deserve.",
    img: "/images/photos/team-coordinator-2.jpg"
  },
  {
    name: "David Vance",
    role: "24/7 Scheduling Director",
    badge: "Care Logistics",
    quote: "We work around the clock to ensure seamless schedule coverage and reliable emergency backup at all times.",
    img: "/images/photos/team-coordinator-3.jpg"
  }
];

const careMilestones = [
  {
    num: "01",
    title: "Initial Conversation",
    time: "< 10 Mins",
    desc: "Call us or submit our form. A dedicated coordinator discusses your family's daily routine and safety goals."
  },
  {
    num: "02",
    title: "Free In-Home Assessment",
    time: "Within 24-48 Hrs",
    desc: "We meet you in person to evaluate mobility, home safety, schedules, and state Medicaid waiver eligibility."
  },
  {
    num: "03",
    title: "Customized Care Plan",
    time: "Tailored to You",
    desc: "We create a clear, personalized care plan honoring your unique dietary, medical, and personal preferences."
  },
  {
    num: "04",
    title: "Compassionate Match",
    time: "Compatibility First",
    desc: "You are paired with a background-checked caregiver who has the exact skills and warm personality suited for you."
  },
  {
    num: "05",
    title: "Care Begins with Heart",
    time: "Ongoing Peace of Mind",
    desc: "Services begin smoothly with regular quality check-ins, supervisor visits, and 24/7 family support."
  }
];

const faqs = [
  {
    q: "How quickly can Pavan Homecare start services?",
    a: "We can typically start care within 24 to 48 hours following your initial consultation and assessment. In urgent situations such as immediate hospital discharge or family caregiver emergencies, our team works quickly to coordinate same-day or next-day caregiver matching."
  },
  {
    q: "Do you accept Pennsylvania Medicaid Waiver programs (CHC)?",
    a: "Yes! Pavan Homecare is an approved provider for Pennsylvania Medicaid Waivers, including Community HealthChoices (CHC). We work directly with your service coordinators (such as PA Health & Wellness, UPMC Community HealthChoices, and AmeriHealth Caritas) to facilitate approvals and maximize authorized care hours."
  },
  {
    q: "How do you screen and vet your caregivers?",
    a: "Safety and trust are our top priorities. Every Pavan caregiver undergoes rigorous background checks including Pennsylvania State Police criminal clearance, FBI fingerprinting, child abuse clearances, motor vehicle records, professional reference verification, and ongoing skills training."
  },
  {
    q: "Can I adjust the care schedule if our family's needs change?",
    a: "Absolutely. Our scheduling coordinators are available 24/7. You can easily adjust scheduled hours, increase support as needs change, or request temporary respite schedules whenever necessary."
  },
  {
    q: "What happens if our primary caregiver is sick or unavailable?",
    a: "We maintain a reliable team of on-call backup caregivers. If your regular caregiver is ill or takes time off, a fully briefed replacement caregiver is provided so your loved one never experiences an interruption in care."
  }
];

export default function ContactClient() {
  const [recipient, setRecipient] = useState("parent");
  const [selectedServices, setSelectedServices] = useState(["personal-care"]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    zip: "",
    preferredContact: "Phone Call",
    preferredTime: "Morning (9am - 12pm)",
    message: "",
    privacyConsent: false
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const toggleService = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(id => id !== serviceId));
      }
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip.trim())) {
      newErrors.zip = "Please enter a valid 5-digit ZIP code";
    }
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = "Please agree to the privacy policy & communications consent.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setFormSubmitted(true);
  };

  const scrollToForm = () => {
    const el = document.getElementById("consultation-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* Dynamic Ambient Background Glows */}
      <div className="contact-bg-glow contact-bg-glow--1" aria-hidden="true" />
      <div className="contact-bg-glow contact-bg-glow--2" aria-hidden="true" />
      <div className="contact-bg-glow contact-bg-glow--3" aria-hidden="true" />
      <div className="contact-dot-grid" aria-hidden="true" />

      {/* ==========================================
          1. ULTRA-MODERN HERO SECTION
          ========================================== */}
      <section className="contact-hero" aria-label="Care Consultation Center">
        <div className="contact-container">
          <div className="contact-hero-grid">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="contact-hero-left"
            >
              <div className="contact-eyebrow">
                <span className="pulse-dot" />
                <span>PA Licensed Home Care &bull; 10 Counties Served</span>
              </div>

              <h1 className="contact-hero-title">
                Let's Talk About Your <br />
                <span className="highlight-coral">Loved One's Care</span>
              </h1>

              <p className="contact-hero-desc">
                Our compassionate care coordinators are ready to answer your questions, navigate Medicaid Waiver programs, and match your family with a certified local caregiver across Greater Philadelphia &amp; Eastern PA.
              </p>

              <div className="contact-hero-actions">
                <button onClick={scrollToForm} className="btn-coral-glow">
                  <span>Schedule Free Consultation</span>
                  <ArrowRight size={18} />
                </button>

                <a href={site.phoneHref} className="btn-blue-outline">
                  <Phone size={18} className="text-[#0061FF]" />
                  <span>Call {site.phoneDisplay}</span>
                </a>
              </div>

              <div className="contact-hero-stats">
                <div className="hero-stat-card">
                  <div className="hero-stat-value">100<span>%</span></div>
                  <div className="hero-stat-label">Licensed &amp; Bonded</div>
                </div>
                <div className="hero-stat-card">
                  <div className="hero-stat-value">24<span>/</span>7</div>
                  <div className="hero-stat-label">On-Call Coordinator</div>
                </div>
                <div className="hero-stat-card">
                  <div className="hero-stat-value">$0</div>
                  <div className="hero-stat-label">Free In-Home Assessment</div>
                </div>
              </div>
            </motion.div>

            {/* Right Media Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="contact-hero-right"
            >
              <div className="hero-visual-frame">
                <Image
                  src="/images/photos/contact-hero.jpg"
                  alt="Compassionate Pavan Homecare caregiver assisting an elderly client at home"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className="hero-visual-img"
                />
              </div>

              {/* Floating Glass Badges */}
              <div className="hero-glass-badge badge-top-right animate-float">
                <div className="badge-icon-wrap badge-icon-coral">
                  <Heart size={22} />
                </div>
                <div>
                  <div className="badge-title">Love-Driven Care</div>
                  <div className="badge-subtitle">Tailored for every family</div>
                </div>
              </div>

              <div className="hero-glass-badge badge-bottom-left animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="badge-icon-wrap badge-icon-blue">
                  <Headphones size={22} />
                </div>
                <div>
                  <div className="badge-title">Live Care Coordinators</div>
                  <div className="badge-subtitle">Always here to help 24/7</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          2. QUICK CONNECT CHANNELS (4 INTERACTIVE CARDS)
          ========================================== */}
      <section className="quick-channels-section" aria-labelledby="channels-title">
        <div className="contact-container">
          <div className="contact-section-heading">
            <div className="contact-eyebrow">
              <Sparkles size={14} />
              <span>DIRECT COMMUNICATION</span>
            </div>
            <h2 id="channels-title" className="contact-section-title">
              Choose How You'd Like to <span className="text-gradient">Connect With Us</span>
            </h2>
            <p className="contact-section-subtitle">
              We make reaching our dedicated coordination team effortless, transparent, and completely anxiety-free.
            </p>
          </div>

          <div className="channels-grid-luxury">
            {contactChannels.map((c) => {
              const IconComp = c.icon;
              return (
                <div 
                  key={c.id} 
                  className={`channel-card-lux ${c.featured ? "featured" : ""}`}
                  onClick={() => {
                    if (c.actionLink.startsWith("#")) {
                      scrollToForm();
                    } else {
                      window.location.href = c.actionLink;
                    }
                  }}
                >
                  <div className="channel-icon-pill">
                    <IconComp size={24} />
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="channel-action-link">
                    <span>{c.actionText}</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. MASTERPIECE CONSULTATION INTAKE STUDIO
          ========================================== */}
      <section className="consultation-section" id="consultation-form" aria-labelledby="form-main-heading">
        <div className="contact-container">
          
          <div className="consultation-split-wrapper">
            
            {/* Left Sidebar Guide */}
            <div className="consultation-guide-sidebar">
              <div>
                <div className="sidebar-badge">
                  <ShieldCheck size={14} />
                  <span>Confidential &bull; No Obligation</span>
                </div>
                <h3 className="sidebar-heading">
                  Request a Free <br />
                  <span>In-Home Assessment</span>
                </h3>
                <p className="sidebar-desc">
                  Tell us a bit about your family's needs. A senior care coordinator will reach out promptly to outline customized care options and state funding assistance.
                </p>

                <div className="sidebar-steps-list">
                  <div className="sidebar-step-item">
                    <div className="sidebar-step-num">1</div>
                    <div className="sidebar-step-text">
                      <h4>Immediate Case Review</h4>
                      <p>We review your request and check Medicaid waiver status within 2 hours.</p>
                    </div>
                  </div>

                  <div className="sidebar-step-item">
                    <div className="sidebar-step-num">2</div>
                    <div className="sidebar-step-text">
                      <h4>Free In-Home Assessment</h4>
                      <p>We meet in person to evaluate home safety and personal preferences.</p>
                    </div>
                  </div>

                  <div className="sidebar-step-item">
                    <div className="sidebar-step-num">3</div>
                    <div className="sidebar-step-text">
                      <h4>Custom Caregiver Match</h4>
                      <p>Care begins with a compatible, background-checked local caregiver.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sidebar-direct-box">
                <p>Prefer to speak directly with an on-call manager?</p>
                <a href={site.phoneHref} className="sidebar-direct-phone">
                  <Phone size={20} />
                  <span>{site.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Form Area */}
            <div className="consultation-form-area">
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="form-success-card"
                >
                  <div className="success-icon-badge">
                    <CheckCircle2 size={42} />
                  </div>
                  <h3>Care Consultation Request Received</h3>
                  <p>
                    Thank you! A lead care coordinator at Pavan Homecare has received your details and will call you within one business day.
                  </p>
                  <a href={site.phoneHref} className="btn-coral-glow" style={{ textDecoration: "none" }}>
                    <Phone size={18} />
                    <span>Call {site.phoneDisplay} for Immediate Help</span>
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-header-lux">
                    <h3 id="form-main-heading">Tell Us How We Can Help</h3>
                    <p>Select your care preferences to receive immediate tailored guidance.</p>
                  </div>

                  {/* 1. Recipient Selector */}
                  <label className="form-question-label">1. Who is this care for?</label>
                  <div className="pills-select-grid">
                    {recipientOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setRecipient(opt.id)}
                        className={`pill-choice-btn ${recipient === opt.id ? "active" : ""}`}
                      >
                        {recipient === opt.id && <Check size={14} />}
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* 2. Services Needed */}
                  <label className="form-question-label">2. What type of support is needed? (Select all that apply)</label>
                  <div className="pills-select-grid">
                    {careServicesOptions.map((svc) => {
                      const isSelected = selectedServices.includes(svc.id);
                      return (
                        <button
                          type="button"
                          key={svc.id}
                          onClick={() => toggleService(svc.id)}
                          className={`pill-choice-btn ${isSelected ? "active" : ""}`}
                        >
                          {isSelected && <Check size={14} />}
                          <span>{svc.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* 3. Name Fields */}
                  <div className="inputs-double-grid">
                    <div className="input-field-wrap">
                      <div className="input-icon-left"><User size={18} /></div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`lux-input ${errors.firstName ? "has-error" : ""}`}
                        required
                      />
                      {errors.firstName && <span className="field-error-text">{errors.firstName}</span>}
                    </div>

                    <div className="input-field-wrap">
                      <div className="input-icon-left"><User size={18} /></div>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`lux-input ${errors.lastName ? "has-error" : ""}`}
                        required
                      />
                      {errors.lastName && <span className="field-error-text">{errors.lastName}</span>}
                    </div>
                  </div>

                  {/* 4. Contact Fields */}
                  <div className="inputs-double-grid">
                    <div className="input-field-wrap">
                      <div className="input-icon-left"><Phone size={18} /></div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number (e.g. 215-436-9499) *"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`lux-input ${errors.phone ? "has-error" : ""}`}
                        required
                      />
                      {errors.phone && <span className="field-error-text">{errors.phone}</span>}
                    </div>

                    <div className="input-field-wrap">
                      <div className="input-icon-left"><Mail size={18} /></div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`lux-input ${errors.email ? "has-error" : ""}`}
                        required
                      />
                      {errors.email && <span className="field-error-text">{errors.email}</span>}
                    </div>
                  </div>

                  {/* 5. Location Fields */}
                  <div className="inputs-double-grid">
                    <div className="input-field-wrap">
                      <div className="input-icon-left"><MapPin size={18} /></div>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City in PA *"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`lux-input ${errors.city ? "has-error" : ""}`}
                        required
                      />
                      {errors.city && <span className="field-error-text">{errors.city}</span>}
                    </div>

                    <div className="input-field-wrap">
                      <div className="input-icon-left"><MapPin size={18} /></div>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="ZIP Code *"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className={`lux-input ${errors.zip ? "has-error" : ""}`}
                        required
                      />
                      {errors.zip && <span className="field-error-text">{errors.zip}</span>}
                    </div>
                  </div>

                  {/* 6. Communication Preferences */}
                  <div className="inputs-double-grid">
                    <div className="input-field-wrap">
                      <select
                        id="preferredContact"
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleInputChange}
                        className="lux-select"
                      >
                        <option value="Phone Call">Preferred: Phone Call</option>
                        <option value="Text SMS">Preferred: Text SMS</option>
                        <option value="Email">Preferred: Email</option>
                      </select>
                    </div>

                    <div className="input-field-wrap">
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="lux-select"
                      >
                        <option value="Morning (9am - 12pm)">Best Time: Morning (9am - 12pm)</option>
                        <option value="Afternoon (12pm - 5pm)">Best Time: Afternoon (12pm - 5pm)</option>
                        <option value="Evening (5pm - 8pm)">Best Time: Evening (5pm - 8pm)</option>
                        <option value="Anytime">Best Time: Anytime</option>
                      </select>
                    </div>
                  </div>

                  {/* 7. Message Box */}
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about daily schedules, health conditions, mobility, or Medicaid waiver status (optional)..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="lux-textarea"
                  />

                  {/* 8. Compliance & Consent Checkbox */}
                  <div className="consent-agreement-row">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="privacyConsent">
                      By checking this box, texting START to <a href={site.phoneHref}>{site.phoneDisplay}</a>, or providing verbal consent, you agree to receive informational text messages (appointment reminders, scheduling updates, service notifications) from Pavan Homecare. Msg frequency varies. Msg &amp; data rates may apply. Mobile information is strictly confidential and never shared with third parties for promotional purposes. Reply STOP to opt out. See our <Link href="/privacy-policy">Privacy Policy</Link>. *
                    </label>
                  </div>
                  {errors.privacyConsent && (
                    <div style={{ marginTop: "-1rem", marginBottom: "1rem" }}>
                      <span className="field-error-text">{errors.privacyConsent}</span>
                    </div>
                  )}

                  {/* 9. Submit Button */}
                  <div className="form-submit-block">
                    <button type="submit" className="btn-coral-glow" style={{ width: "100%", justifyContent: "center", fontSize: "1.08rem" }}>
                      <span>Submit Care Request</span>
                      <ArrowRight size={20} />
                    </button>
                    <div className="submit-guarantee-text">
                      <ShieldCheck size={16} className="text-[#10B981]" />
                      <span>100% Free &amp; Confidential &bull; Fast Response Guaranteed</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          4. WHY FAMILIES TRUST US (BENTO GRID)
          ========================================== */}
      <section className="why-trust-section" aria-labelledby="trust-section-title">
        <div className="contact-container">
          <div className="contact-section-heading">
            <div className="contact-eyebrow">
              <Sparkles size={14} />
              <span>THE PAVAN ADVANTAGE</span>
            </div>
            <h2 id="trust-section-title" className="contact-section-title">
              Why Families Reassure with <span className="text-coral">Pavan Homecare</span>
            </h2>
            <p className="contact-section-subtitle">
              We combine accredited clinical care standards with deep empathy to give Pennsylvania families continuous confidence.
            </p>
          </div>

          <div className="trust-bento-grid">
            {trustFactors.map((f, idx) => {
              const IconComponent = f.icon;
              return (
                <div key={idx} className="trust-card-lux">
                  <div className="trust-icon-box">
                    <IconComponent size={24} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. CARE COORDINATION TEAM SPOTLIGHT
          ========================================== */}
      <section className="team-spotlight-section" aria-labelledby="team-heading">
        <div className="contact-container">
          <div className="contact-section-heading">
            <div className="contact-eyebrow">
              <Users size={14} />
              <span>YOUR DEDICATED ADVOCATES</span>
            </div>
            <h2 id="team-heading" className="contact-section-title">
              Meet Your <span className="text-gradient">Care Coordinators</span>
            </h2>
            <p className="contact-section-subtitle">
              Experienced, local professionals dedicated to guiding your family through every milestone of home care.
            </p>
          </div>

          <div className="team-grid-lux">
            {careTeamCoordinators.map((member, idx) => (
              <div key={idx} className="team-member-card">
                <div className="team-photo-wrap">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className="team-photo"
                  />
                </div>
                <div className="team-member-body">
                  <span className="team-role-pill">{member.badge}</span>
                  <h3>{member.name}</h3>
                  <p className="team-quote-text">&ldquo;{member.quote}&rdquo;</p>
                  
                  <div className="team-card-footer">
                    <span className="team-badge-sub">
                      <CheckCircle2 size={15} className="text-[#10B981]" />
                      <span>{member.role}</span>
                    </span>
                    <a href={site.phoneHref} style={{ color: "#0061FF", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
                      Connect &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          6. HQ LOCATION & SERVICE AREA MAP
          ========================================== */}
      <section className="location-map-section" aria-labelledby="location-heading">
        <div className="contact-container">
          <div className="location-map-grid">
            
            {/* Left Info Box */}
            <div className="location-info-card">
              <div className="contact-eyebrow" style={{ marginBottom: "1rem" }}>
                <MapPin size={14} />
                <span>PHYSICAL HEADQUARTERS</span>
              </div>
              <h2 id="location-heading">Our Feasterville Office Location</h2>

              <div className="location-address-box">
                <div className="icon-wrap">
                  <MapPin size={20} />
                </div>
                <address>
                  <strong>{site.name}</strong><br />
                  {site.address.line1}<br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </address>
              </div>

              <div className="location-contact-rows">
                <div className="loc-row-item">
                  <Phone size={18} className="text-[#0061FF]" />
                  <span><strong>Direct Phone:</strong> <a href={site.phoneHref}>{site.phoneDisplay}</a></span>
                </div>
                <div className="loc-row-item">
                  <Printer size={18} className="text-[#0061FF]" />
                  <span><strong>Office Fax:</strong> {site.faxDisplay}</span>
                </div>
                <div className="loc-row-item">
                  <Mail size={18} className="text-[#0061FF]" />
                  <span><strong>Email Inquiries:</strong> <a href={`mailto:${site.email}`}>{site.email}</a></span>
                </div>
                <div className="loc-row-item">
                  <Clock size={18} className="text-[#0061FF]" />
                  <span><strong>Office Hours:</strong> Mon &ndash; Fri, 8:00 AM &ndash; 5:00 PM (Coordinators 24/7)</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.addressFull)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-coral-glow"
                  style={{ padding: "0.85rem 1.6rem", fontSize: "0.95rem" }}
                >
                  <span>Get Driving Directions</span>
                  <ArrowRight size={16} />
                </a>

                <a 
                  href={site.phoneHref}
                  className="btn-blue-outline"
                  style={{ padding: "0.85rem 1.6rem", fontSize: "0.95rem" }}
                >
                  <Phone size={16} />
                  <span>Call Office</span>
                </a>
              </div>

              {/* Service Areas Tag Chips */}
              <div className="counties-chips-wrap">
                <h4>Counties Proudly Served Across PA:</h4>
                <div className="counties-tags">
                  {site.serviceAreas.map((county, idx) => (
                    <span key={idx} className="county-tag">{county}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Map Embed */}
            <div className="map-embed-wrapper">
              <iframe
                src="https://maps.google.com/maps?q=19%20Bowman%20Dr%2C%20Feasterville%2C%20PA%2019053&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="map-iframe-element"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pavan Homecare Feasterville PA Office Location Map"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          7. THE 5-STEP PATHWAY TO CARE TIMELINE
          ========================================== */}
      <section className="pathway-timeline-section" aria-labelledby="pathway-heading">
        <div className="contact-container">
          <div className="contact-section-heading">
            <div className="contact-eyebrow">
              <Calendar size={14} />
              <span>THE CAREPATH JOURNEY</span>
            </div>
            <h2 id="pathway-heading" className="contact-section-title">
              What Happens Next? <span className="text-gradient">5 Simple Steps</span>
            </h2>
            <p className="contact-section-subtitle">
              From your very first phone call to starting regular care visits, we make every step seamless and transparent.
            </p>
          </div>

          <div className="timeline-cards-row">
            {careMilestones.map((step, idx) => (
              <div key={idx} className="timeline-step-card">
                <div className="step-num-pill">Step {step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div style={{ marginTop: "auto", paddingTop: "0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "#0061FF" }}>
                  ⏱ {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          8. 24/7 URGENT CARE & HOSPITAL DISCHARGE
          ========================================== */}
      <section className="emergency-banner-section" aria-labelledby="urgent-heading">
        <div className="contact-container">
          <div className="emergency-banner-card">
            <div className="urgent-badge">
              <ShieldAlert size={15} />
              <span>Immediate Response Team</span>
            </div>
            <h2 id="urgent-heading">Need Urgent or Hospital Discharge Care?</h2>
            <p>
              If your loved one is facing an unexpected hospital discharge, post-surgical recovery, or an urgent caregiver gap, don't wait for our online form. Speak directly with an on-call care supervisor right now.
            </p>
            <a href={site.phoneHref} className="emergency-call-btn">
              <Phone size={22} />
              <span>Call Emergency Line: {site.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================
          9. CAREERS & CAREGIVER COMMUNITY
          ========================================== */}
      <section className="careers-spotlight-section" aria-labelledby="careers-card-heading">
        <div className="contact-container">
          <div className="careers-split-card">
            
            <div className="careers-card-content">
              <div className="contact-eyebrow" style={{ width: "fit-content" }}>
                <Briefcase size={14} />
                <span>JOIN OUR CAREGIVING FAMILY</span>
              </div>
              <h2 id="careers-card-heading">Join Our Local Caregiver Team</h2>
              <p>
                Are you a compassionate, reliable caregiver in Bucks, Montgomery, Philadelphia, or surrounding PA counties? We offer above-market pay, flexible scheduling, and a supportive, family-first environment.
              </p>

              <div className="careers-perks-grid">
                <div className="perk-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <span>Competitive Hourly Pay</span>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <span>Paid Training &amp; CEUs</span>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <span>Flexible Part &amp; Full Time</span>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <span>Career Growth Pathways</span>
                </div>
              </div>

              <div>
                <a 
                  href={`mailto:${site.email}?subject=Caregiver Career Application - Pavan Homecare`}
                  className="btn-coral-glow"
                  style={{ textDecoration: "none" }}
                >
                  <span>Apply to Join Our Team</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="careers-card-media">
              <Image
                src="/images/photos/careers-caregiver.jpg"
                alt="Compassionate Pavan caregiver embracing an elderly senior client with warmth"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="careers-img"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          10. FREQUENTLY ASKED QUESTIONS
          ========================================== */}
      <section className="faq-section-lux" aria-labelledby="faq-lux-heading">
        <div className="contact-container">
          <div className="contact-section-heading">
            <div className="contact-eyebrow">
              <HelpCircle size={14} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 id="faq-lux-heading" className="contact-section-title">
              Common Questions About <span className="text-gradient">Our Care Services</span>
            </h2>
            <p className="contact-section-subtitle">
              Find quick, transparent answers regarding Medicaid waivers, caregiver matching, and scheduling.
            </p>
          </div>

          <div className="faq-list-wrap">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-accordion-item ${isOpen ? "is-open" : ""}`}>
                  <button 
                    type="button"
                    className="faq-trigger-btn"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <div className="faq-icon-toggle">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1, transition: { duration: 0.3 } }}
                        exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                      >
                        <div className="faq-panel-body">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          11. GOOGLE REVIEWS SOCIAL PROOF
          ========================================== */}
      <section className="w-full bg-white py-14 lg:py-24" aria-label="Client Testimonials and Google Reviews">
        <div className="contact-container">
          <GoogleReviews />
        </div>
      </section>

      {/* ==========================================
          12. FINAL LUXURY CALL-TO-ACTION BANNER
          ========================================== */}
      <section className="final-cta-section" aria-label="Need Help Choosing Care">
        <div className="contact-container">
          <div className="final-cta-card">
            <h2>Need Help Choosing the Right Care?</h2>
            <p>
              Connect with our certified care coordinators in Feasterville. Let us match the perfect caregiver to support your independence and bring lasting peace of mind.
            </p>

            <div className="final-cta-buttons">
              <button onClick={scrollToForm} className="btn-white-solid">
                <span>Request Free Care Consultation</span>
              </button>
              <a href={site.phoneHref} className="btn-glass-outline">
                <Phone size={18} />
                <span>Call {site.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
