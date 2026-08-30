"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Users, 
  UtensilsCrossed, 
  Car, 
  Home, 
  Clock, 
  Brain, 
  Sparkles, 
  Layers, 
  Accessibility, 
  Award, 
  ShieldCheck, 
  Briefcase, 
  Shield, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Star, 
  HelpCircle, 
  Plus, 
  Minus, 
  Building2, 
  Check, 
  Calendar,
  Lock
} from "lucide-react";
import ServiceAreasSearch from "@/components/ServiceAreasSearch";
import { site } from "@/lib/site";
import "./services.css";

const servicesList = [
  {
    id: "personal-care",
    title: "Personal Care",
    icon: <Heart size={22} />,
    image: "/images/photos/service-personal-care.jpg",
    desc: "Respectful, professional assistance with daily activities to support dignity and safety at home. Our trained caregivers assist with personal routines like bathing, dressing, grooming, toileting, and safe mobility.",
    whoBenefits: "Seniors recovering from illness, living with limited mobility, or experiencing age-related physical decline.",
    whyChoose: "Dignity-first protocols, fall risk reduction, professional physical transfer techniques.",
    checklist: [
      "Grooming & bathing support",
      "Dressing & hygiene care",
      "Safe transfers & positioning",
      "Incontinence care",
      "Assistance with eating",
      "Mobility & walking aid"
    ],
    faqQuestion: "How do you handle personal privacy during bathing?",
    faqAnswer: "Our caregivers follow strict dignity protocols, keeping clients covered as much as possible, checking comfort levels, and ensuring absolute respect."
  },
  {
    id: "companion-care",
    title: "Companion Care",
    icon: <Users size={22} />,
    image: "/images/photos/service-companion-care.jpg",
    desc: "Active companionship and mental stimulation to combat social isolation. We share conversations, assist with hobbies, play board games, read books, and encourage positive daily interaction.",
    whoBenefits: "Seniors living alone who require light social engagement, companionship, or cognitive exercises.",
    whyChoose: "Reduces isolation-related depression, encourages emotional wellness, keeps minds sharp.",
    checklist: [
      "Engaging conversation & visits",
      "Card & board games",
      "Reading aloud & book discussion",
      "Assisting with personal hobbies",
      "Accompanying on short walks",
      "Letter writing & scrapbooking"
    ],
    faqQuestion: "Can a caregiver take my parent to a local social center?",
    faqAnswer: "Yes! Social outings and visits to senior centers, parks, or community clubs are an active part of companion care."
  },
  {
    id: "meal-preparation",
    title: "Meal Preparation",
    icon: <UtensilsCrossed size={22} />,
    image: "/images/photos/service-meal-prep.jpg",
    desc: "Nutritious, warm, home-cooked meals planned around your loved one's dietary guidelines. Caregivers handle grocery planning, prep, cooking, and kitchen cleanup.",
    whoBenefits: "Individuals with severe arthritis, diabetes, heart conditions, or difficulty standing to cook safely.",
    whyChoose: "Fresh nutrient intake, safe kitchen appliance operation, customized health diets.",
    checklist: [
      "Special diet cooking (low-sodium)",
      "Weekly menu planning",
      "Pantry & fridge organization",
      "Grocery list compilation",
      "Pots & pans washing",
      "Meal portioning & freezing"
    ],
    faqQuestion: "Can you prepare meals for specific diabetic or heart-healthy diets?",
    faqAnswer: "Yes, our caregivers coordinate with family guidelines and medical instructions to prepare low-sodium, diabetic-friendly, or soft food meals."
  },
  {
    id: "transportation",
    title: "Transportation Support",
    icon: <Car size={22} />,
    image: "/images/photos/service-transportation.jpg",
    desc: "Accompanied rides to keep clients active and engaged in their community. We drive to doctor appointments, local pharmacies, grocery stores, and family events.",
    whoBenefits: "Seniors who no longer drive and wish to maintain their weekly schedules independently.",
    whyChoose: "Safe transition in and out of vehicles, complete caregiver accompaniment during visits.",
    checklist: [
      "Doctor appointment escorts",
      "Pharmacy prescription pickups",
      "Grocery market shopping trips",
      "Visiting local family & friends",
      "Accompaniment to religious services",
      "Errand running support"
    ],
    faqQuestion: "Does the caregiver drive the client's car or their own?",
    faqAnswer: "Our caregivers are fully insured and can drive their own reliable vehicles or accompany clients in the family vehicle."
  },
  {
    id: "housekeeping",
    title: "Light Housekeeping",
    icon: <Home size={22} />,
    image: "/images/photos/service-housekeeping.jpg",
    desc: "Maintaining a clean, safe, and hazard-free home environment. We help with laundry, washing dishes, dusting, taking out the trash, and organizing walking pathways.",
    whoBenefits: "Individuals at risk of falling due to clutter, or those unable to manage daily heavy chores.",
    whyChoose: "Direct fall prevention, sanitary living spaces, organized home flow.",
    checklist: [
      "Laundry and linens washing",
      "Dishwashing & dry storage",
      "Emptying garbage bins",
      "Ironing & clothes folding",
      "Dusting key surfaces",
      "Organizing walking pathways"
    ],
    faqQuestion: "Do caregivers perform deep cleaning like window washing?",
    faqAnswer: "Our caregivers focus on light housekeeping to maintain safety and hygiene. We do not do deep industrial cleaning, carpet washing, or outdoor maintenance."
  },
  {
    id: "medication-reminders",
    title: "Medication Reminders",
    icon: <Clock size={22} />,
    image: "/images/photos/service-medication.jpg",
    desc: "Timely reminders to ensure your loved one adheres to their medication schedules. We help verify pill organizer usage, track dosage times, and log compliance.",
    whoBenefits: "Seniors taking multiple daily prescriptions who experience mild cognitive decline.",
    whyChoose: "Prevents missed doses, avoids accidental double-dosing, logs schedule compliance.",
    checklist: [
      "Timely verbal reminders",
      "Pill box opening support",
      "Tracking dosage times",
      "Fluid intake support",
      "Checking medication labels",
      "Logging compliance logs"
    ],
    faqQuestion: "Can caregivers administer injections or sort pill boxes?",
    faqAnswer: "Our caregivers provide verbal reminders and help open pre-filled boxes. Clinical sorting or injections must be managed by family members or licensed home health nurses."
  },
  {
    id: "alzheimers-care",
    title: "Alzheimer's Care",
    icon: <Brain size={22} />,
    image: "/images/photos/service-alzheimers.jpg",
    desc: "Dedicated memory support designed to manage confusion, prevent wandering, and maintain a comforting, stable home environment.",
    whoBenefits: "Seniors diagnosed with progressive Alzheimer's disease.",
    whyChoose: "De-escalation trained support, certified dementia care coordinators, wander prevention.",
    checklist: [
      "Sensory calming assistance",
      "Redirection techniques",
      "Wander prevention checks",
      "Routine stability management",
      "Memory trigger games",
      "Family status updates"
    ],
    faqQuestion: "How do you handle agitation or confusion?",
    faqAnswer: "Our caregivers are trained in gentle redirection techniques, sensory calming, and validation therapy to defuse moments of confusion."
  },
  {
    id: "dementia-care",
    title: "Dementia Care",
    icon: <Sparkles size={22} />,
    image: "/images/photos/service-dementia.jpg",
    desc: "Specialized, non-pharmaceutical home care focused on cognitive enrichment, sensory exercises, and patient communication to help manage progressive memory loss.",
    whoBenefits: "Seniors experiencing early-to-late stage general cognitive decline.",
    whyChoose: "Preserves daily independent habits, supports active memory retention, maintains comfort.",
    checklist: [
      "Sensory puzzle sheets",
      "Word games & recall tasks",
      "Validation communications",
      "Habit and mood tracking",
      "Reassuring companionship",
      "Safe exit alerts setup"
    ],
    faqQuestion: "Do you create a consistent caregiver routine?",
    faqAnswer: "Yes, consistency is key in dementia care. We strive to match a regular caregiver to maintain trust and build a familiar routine."
  },
  {
    id: "respite-care",
    title: "Respite Care",
    icon: <Layers size={22} />,
    image: "/images/photos/service-respite.jpg",
    desc: "Crucial temporary coverage for family caregivers. Take a break, travel, work, or rest while our professional caregivers provide reliable in-home care.",
    whoBenefits: "Family members who need relief from the daily physical and emotional demands of caregiving.",
    whyChoose: "Prevents caregiver burnout, maintains care quality, provides peace of mind.",
    checklist: [
      "Hourly care relief blocks",
      "Weekend coverage support",
      "Emergency backup care",
      "Overnight care blocks",
      "Client routine continuity",
      "Detailed caregiver handover"
    ],
    faqQuestion: "Can we book respite care on short notice?",
    faqAnswer: "We strive to accommodate short-notice requests, but scheduling a few days in advance guarantees matching the best caregiver."
  },
  {
    id: "disability-support",
    title: "Disability Support",
    icon: <Accessibility size={22} />,
    image: "/images/photos/service-disability.jpg",
    desc: "Compassionate, custom assistance for adults and children with physical or developmental disabilities, supporting independence and active community participation.",
    whoBenefits: "Individuals of any age with physical paralysis, developmental delay, cerebral palsy, or autism.",
    whyChoose: "Medicaid Waiver approved, customized sensory integration, lifestyle support.",
    checklist: [
      "Daily hygiene coordination",
      "Community inclusion trips",
      "Transfer and lift assistance",
      "Sensory & mobility safety protocols",
      "Sensory guidance tasks",
      "Independent living skills"
    ],
    faqQuestion: "Are your caregivers trained in transferring paraplegic clients?",
    faqAnswer: "Yes! Our team is trained in safe transfer protocols, slide boards, and mechanical lift assistance where required."
  },
  {
    id: "veteran-care",
    title: "Veteran Care",
    icon: <Award size={22} />,
    image: "/images/photos/service-veteran.jpg",
    desc: "Honoring veterans and their surviving spouses with dedicated, non-medical home care. We help coordinate care programs funded through VA Aid & Attendance benefits.",
    whoBenefits: "Eligible military veterans and surviving spouses who require assistance with ADLs.",
    whyChoose: "VA Aid & Attendance specialist coordinators, zero out-of-pocket options.",
    checklist: [
      "ADL assistance blocks",
      "Companionship escorts",
      "Pill reminders & logs",
      "VA Aid & Attendance filings",
      "Routine reporting logs",
      "Pantry coordination"
    ],
    faqQuestion: "How do we check if we qualify for Aid & Attendance?",
    faqAnswer: "We work directly with veteran service officers to help you understand qualification criteria and coordinate the application paperwork."
  },
  {
    id: "24hour-care",
    title: "24-Hour Care",
    icon: <ShieldCheck size={22} />,
    image: "/images/photos/service-24hour.jpg",
    desc: "Continuous around-the-clock monitoring and personal assistance to guarantee client safety, peace of mind, and emergency preparedness day or night.",
    whoBenefits: "Individuals with advanced neurological conditions, severe fall risks, or hospice patients.",
    whyChoose: "Certified wake-staff shifts, coordinator monitoring metrics, 24/7 standby support.",
    checklist: [
      "Nighttime transfer support",
      "Sleepover check-in logs",
      "Hospice support sync",
      "Continuous safety watches",
      "Structured day-to-night transitions",
      "Rotational team handovers"
    ],
    faqQuestion: "How do 24-hour shifts work?",
    faqAnswer: "We schedule teams of two or three caregivers in rotating 8-hour or 12-hour shifts to ensure caregivers remain alert, awake, and responsive at all times."
  },
  {
    id: "employment-services",
    title: "Employment Services",
    icon: <Briefcase size={22} />,
    image: "/images/photos/service-employment.jpg",
    desc: "Empowering individuals to achieve their career goals and gain independence. We offer comprehensive support to build skills, find suitable opportunities, and maintain meaningful employment.",
    whoBenefits: "Individuals seeking to enter or re-enter the workforce, develop professional skills, or receive coaching for job retention.",
    whyChoose: "Tailored career planning, job search assistance, skill enhancement, and ongoing coaching support.",
    checklist: [
      "Career Assessment",
      "Job Coaching",
      "Job Finding",
      "Employment Skills"
    ],
    faqQuestion: "How do you help clients prepare for job interviews?",
    faqAnswer: "We offer tailored mock interviews, resume writing assistance, and professional communication coaching to help clients build confidence and put their best foot forward."
  }
];

const differentiators = [
  {
    title: "Background Checked",
    desc: "Every caregiver undergoes rigorous screening, including state-mandated criminal background checks, references, and credentials checks."
  },
  {
    title: "Licensed & Accredited",
    desc: "Fully licensed by the Pennsylvania Department of Health to support Medicaid Waiver programs and private-pay clients."
  },
  {
    title: "Personalized Care",
    desc: "No cookie-cutter plans. We map schedules, habits, and caregiver matches to fit your family's dynamic."
  },
  {
    title: "Family Communication",
    desc: "Keep the circle of care transparent. Real-time updates and direct lines to local PA care coordinators."
  },
  {
    title: "Emergency Support",
    desc: "Standard operating protocols for power outages, weather delays, and personal health emergencies."
  },
  {
    title: "24/7 Availability",
    desc: "A live local coordinator answers the phone 24 hours a day, 7 days a week, resolving schedule changes instantly."
  }
];

const testimonials = [
  {
    quote: "Our caregiver treats my mother like family. She's punctual, patient, and always goes the extra mile.",
    author: "Denise R."
  },
  {
    quote: "Pavan Homecare made the Medicaid waiver process painless and matched us with a wonderful caregiver within a week.",
    author: "Michael T."
  },
  {
    quote: "Respite care from this team gave me the break I badly needed, knowing my husband was in good hands.",
    author: "Angela P."
  }
];

const mainFaqs = [
  {
    q: "How quickly can care start after I contact you?",
    a: "In most cases, we can complete the in-home assessment and match a compatible caregiver within 24 to 48 hours. In urgent hospital discharge situations, we work diligently for same-day coverage."
  },
  {
    q: "Do you accept Medicaid Waiver programs in Pennsylvania?",
    a: "Yes! We are an approved provider for Community HealthChoices (CHC) Medicaid waivers, covering care at $0 out-of-pocket for eligible seniors."
  },
  {
    q: "How do you screen and select your caregivers?",
    a: "Every caregiver undergoes PA State Police and FBI background checks, child abuse clearances, reference checks, and specialized senior care training."
  },
  {
    q: "Can we adjust the care schedule or services?",
    a: "Yes, you can adjust care hours, schedules, or specific services at any time by calling our 24/7 coordination team."
  }
];

export default function ServicesClient({ initialService }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      const el = document.getElementById(initialService);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    }
  }, [initialService]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="services-page-wrap">
      {/* Ambient Background Glows */}
      <div className="services-ambient-glow services-glow-1" aria-hidden="true" />
      <div className="services-ambient-glow services-glow-2" aria-hidden="true" />
      <div className="services-ambient-glow services-glow-3" aria-hidden="true" />
      <div className="services-dot-grid" aria-hidden="true" />

      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <section className="services-hero-wrap" aria-label="Home Care Services Hero">
        <div className="services-container">
          <div className="services-hero-grid">
            
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="services-hero-left"
            >
              <div className="services-eyebrow-pill">
                <span className="pulse-dot" />
                <span>HOME CARE SOLUTIONS</span>
              </div>

              <h1 className="services-hero-heading">
                Compassionate Home Care Services <br />
                <span className="text-gradient">Designed Around Your Family</span>
              </h1>

              <p className="services-hero-lead">
                Pavan Homecare provides professional, licensed in-home care, companion services, and memory care designed to help seniors live safely, comfortably, and independently.
              </p>

              <div className="services-hero-buttons">
                <button
                  onClick={() => handleScrollTo("schedule-assessment")}
                  className="btn-coral-glow"
                >
                  <span>Request Care</span>
                  <ArrowRight size={18} />
                </button>

                <a href={site.phoneHref} className="btn-blue-outline">
                  <Phone size={18} className="text-[#0061FF]" />
                  <span>Call Today</span>
                </a>
              </div>

              <div className="services-hero-trust-bar">
                <div className="hero-trust-badge-item">
                  <ShieldCheck size={18} className="icon" />
                  <span>Licensed &amp; Bonded</span>
                </div>
                <div className="hero-trust-badge-item">
                  <UserCheck size={18} className="icon" />
                  <span>Background Checked Caregivers</span>
                </div>
                <div className="hero-trust-badge-item">
                  <Clock size={18} className="icon" />
                  <span>24/7 Local Support</span>
                </div>
              </div>
            </motion.div>

            {/* Right Media Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="services-hero-right"
            >
              <div className="hero-image-frame-lux">
                <Image
                  src="/images/photos/services-hero.jpg"
                  alt="Caregiver supporting senior client at home"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Trust Score Badge */}
              <div className="hero-trust-score-badge">
                <div className="hero-trust-logo-box">
                  <span>PH</span>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-[#FF7A59] text-[#FF7A59]" />
                    ))}
                  </div>
                  <div className="text-[13px] font-bold text-[#001A4D]">Client Trust Score</div>
                  <div className="text-[11.5px] text-[#4A5A73]">5-Star Licensed Care</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          2. QUICK SERVICE NAVIGATION (13 SERVICES)
          ========================================== */}
      <section className="quick-nav-section" aria-labelledby="quick-nav-heading">
        <div className="services-container">
          
          <div className="services-section-header" style={{ marginBottom: "2.5rem" }}>
            <div className="services-eyebrow-pill">
              <Sparkles size={14} />
              <span>SERVICE DIRECTORY</span>
            </div>
            <h2 id="quick-nav-heading" className="services-section-title">
              Quick Service Navigation
            </h2>
            <p className="services-section-subtitle">
              Immediately discover our care offerings. Click any card below to scroll directly to the corresponding program details.
            </p>
          </div>

          <div className="quick-nav-grid">
            {servicesList.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => handleScrollTo(srv.id)}
                className="quick-nav-card"
              >
                <div className="quick-nav-icon-wrap">
                  {srv.icon}
                </div>
                <span className="quick-nav-title">{srv.title}</span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          3. CORE CARE OFFERINGS (13 DETAILED SERVICES)
          ========================================== */}
      <section className="services-detailed-section" aria-labelledby="core-offerings-heading">
        <div className="services-container">
          
          <div className="services-section-header">
            <div className="services-eyebrow-pill">
              <Shield size={14} />
              <span>COMPREHENSIVE CARE ARCHITECTURE</span>
            </div>
            <h2 id="core-offerings-heading" className="services-section-title">
              Our Core Care Offerings
            </h2>
            <p className="services-section-subtitle">
              Every home care solution is carefully customized to match your family's routine, preferences, and clinical safety needs.
            </p>
          </div>

          <div className="services-detail-list">
            {servicesList.map((service, index) => {
              const isEven = index % 2 === 1;

              return (
                <motion.article
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`service-detail-row ${isEven ? "reverse-row" : ""}`}
                >
                  {/* Media Frame */}
                  <div className="service-media-frame-lux">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  {/* Info Column */}
                  <div className="service-info-col">
                    
                    <div className="service-header-row">
                      <div className="service-header-icon">
                        {service.icon}
                      </div>
                      <h2 className="service-title-text">{service.title}</h2>
                    </div>

                    <p className="service-main-desc">{service.desc}</p>

                    {/* Who Benefits & Why Families Choose This */}
                    <div className="service-two-col-boxes">
                      <div className="service-feature-pill-box">
                        <div className="feature-pill-title">Who Benefits</div>
                        <div className="feature-pill-text">{service.whoBenefits}</div>
                      </div>
                      <div className="service-feature-pill-box">
                        <div className="feature-pill-title">Why Families Choose This</div>
                        <div className="feature-pill-text">{service.whyChoose}</div>
                      </div>
                    </div>

                    {/* What's Included */}
                    <div className="service-included-section">
                      <div className="included-title">What's Included</div>
                      <div className="included-checklist-grid">
                        {service.checklist.map((item, idx) => (
                          <div key={idx} className="included-check-point">
                            <CheckCircle2 size={15} className="check-icon" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Q&A Callout Box */}
                    <div className="service-qa-callout">
                      <div className="service-qa-question">
                        <HelpCircle size={15} className="icon" />
                        <span>{service.faqQuestion}</span>
                      </div>
                      <div className="service-qa-answer">{service.faqAnswer}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="service-actions-row">
                      <button
                        onClick={() => handleScrollTo("schedule-assessment")}
                        className="btn-coral-glow"
                        style={{ padding: "0.75rem 1.75rem", fontSize: "0.92rem" }}
                      >
                        <span>Request Care</span>
                        <ArrowRight size={16} />
                      </button>

                      <a
                        href={site.phoneHref}
                        className="btn-blue-outline"
                        style={{ padding: "0.7rem 1.5rem", fontSize: "0.92rem" }}
                      >
                        <Phone size={15} className="text-[#0061FF]" />
                        <span>Call {site.phoneDisplay}</span>
                      </a>
                    </div>

                  </div>
                </motion.article>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==========================================
          4. WHY PAVAN HOMECARE IS DIFFERENT
          ========================================== */}
      <section className="why-different-section" aria-labelledby="why-different-heading">
        <div className="services-container">
          
          <div className="services-section-header">
            <div className="services-eyebrow-pill">
              <Award size={14} />
              <span>OUR STANDARD OF EXCELLENCE</span>
            </div>
            <h2 id="why-different-heading" className="services-section-title">
              Why Pavan Homecare is Different
            </h2>
            <p className="services-section-subtitle">
              We coordinate care at a higher tier of accountability, safety assurance, and caregiver compliance.
            </p>
          </div>

          <div className="why-different-timeline">
            {differentiators.map((diff, index) => (
              <div key={index} className="timeline-differentiator-item">
                <div className="timeline-icon-container">
                  <Heart size={22} />
                </div>
                <div className="timeline-content-box">
                  <h3>{diff.title}</h3>
                  <p>{diff.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          5. AREAS WE SERVE
          ========================================== */}
      <section className="py-16 bg-white" aria-labelledby="areas-heading">
        <div className="services-container">
          <div className="services-section-header" style={{ marginBottom: "2rem" }}>
            <div className="services-eyebrow-pill">
              <Sparkles size={14} />
              <span>AREAS WE SERVE</span>
            </div>
            <h2 id="areas-heading" className="services-section-title">
              Compassionate Home Care Across Pennsylvania
            </h2>
            <p className="services-section-subtitle">
              Pavan Homecare proudly serves families throughout South Central &amp; Eastern PA communities with licensed, compassionate in-home care services.
            </p>
          </div>

          <ServiceAreasSearch />
        </div>
      </section>

      {/* ==========================================
          6. CLIENT STORIES / TESTIMONIALS
          ========================================== */}
      <section className="client-stories-section" aria-labelledby="testimonials-heading">
        <div className="services-container">
          
          <div className="services-section-header">
            <div className="services-eyebrow-pill">
              <Star size={14} />
              <span>CLIENT STORIES</span>
            </div>
            <h2 id="testimonials-heading" className="services-section-title">
              Families Trust Pavan Homecare
            </h2>
          </div>

          <div className="testimonials-3-grid">
            {testimonials.map((test, idx) => (
              <div key={idx} className="testimonial-card-lux">
                <div className="testimonial-quote-icon">“</div>
                <p className="testimonial-quote-text">{test.quote}</p>
                <div className="testimonial-author-name">{test.author}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          7. FREQUENTLY ASKED QUESTIONS
          ========================================== */}
      <section className="faq-section-services" aria-labelledby="faq-heading">
        <div className="services-container">
          
          <div className="services-section-header" style={{ marginBottom: "3rem" }}>
            <div className="services-eyebrow-pill">
              <HelpCircle size={14} />
              <span>QUESTIONS ANSWERED</span>
            </div>
            <h2 id="faq-heading" className="services-section-title">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="faq-split-grid">
            
            {/* Accordions */}
            <div className="faq-accordion-list">
              {mainFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={`faq-accordion-item-lux ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="faq-trigger-btn-lux"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <div className="faq-toggle-circle">
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
                          <div className="faq-body-text">{faq.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Media Image */}
            <div className="faq-media-frame">
              <Image
                src="/images/photos/services-faq-media.jpg"
                alt="Caregiver helping senior client with comfort and care"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          8. SCHEDULE A FREE CARE ASSESSMENT (FORM)
          ========================================== */}
      <section id="schedule-assessment" className="assessment-form-section" aria-labelledby="form-heading">
        <div className="services-container">
          <div className="assessment-form-card">
            
            <div className="assessment-form-grid">
              
              {/* Left Info Column */}
              <div className="assessment-left-info">
                <div className="services-eyebrow-pill" style={{ marginBottom: "1rem" }}>
                  <Heart size={14} />
                  <span>SECURE PEACE OF MIND</span>
                </div>

                <h2 id="form-heading">Schedule a Free Care Assessment</h2>
                
                <p>
                  No obligations, no pressure. Our local PA Care Coordinator will contact you within 24 hours to clarify scheduling and match caregivers to your routines.
                </p>

                <div className="assessment-reassurance-list">
                  <div className="reassurance-item">
                    <div className="reassurance-icon-box">
                      <Heart size={18} />
                    </div>
                    <div>
                      <div className="reassurance-title">No Obligation Consult</div>
                      <div className="reassurance-desc">We review health habits and evaluate fall risks in the home for free.</div>
                    </div>
                  </div>

                  <div className="reassurance-item">
                    <div className="reassurance-icon-box">
                      <Users size={18} />
                    </div>
                    <div>
                      <div className="reassurance-title">Local Coordinators</div>
                      <div className="reassurance-desc">Talk to local professionals based directly in Pennsylvania.</div>
                    </div>
                  </div>

                  <div className="reassurance-item">
                    <div className="reassurance-icon-box">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <div className="reassurance-title">Medicaid Waiver Approved</div>
                      <div className="reassurance-desc">We help match authorized hours to CHC programs seamlessly.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Column */}
              <div>
                {formSubmitted ? (
                  <div className="bg-[#E8F2FF] border border-[#0061FF]/20 rounded-2xl p-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#0061FF] text-white flex items-center justify-center mx-auto mb-4">
                      <Check size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-[#001A4D] mb-2">Request Received!</h3>
                    <p className="text-sm text-[#4A5A73] mb-4">
                      Thank you. A dedicated care coordinator will contact you within 24 hours to discuss your loved one&apos;s routine and care plan.
                    </p>
                    <a href={site.phoneHref} className="btn-coral-glow inline-flex items-center gap-2">
                      <Phone size={16} />
                      <span>Call (215) 436-9499 Directly</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="assessment-form-box">
                    <div className="form-row-2">
                      <div className="form-group-lux">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          className="form-input-lux"
                        />
                      </div>
                      <div className="form-group-lux">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="(215) 436-9499"
                          className="form-input-lux"
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group-lux">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          className="form-input-lux"
                        />
                      </div>
                      <div className="form-group-lux">
                        <label>County of Residence *</label>
                        <select required className="form-input-lux">
                          <option value="York County">York County</option>
                          <option value="Adams County">Adams County</option>
                          <option value="Cumberland County">Cumberland County</option>
                          <option value="Dauphin County">Dauphin County</option>
                          <option value="Lancaster County">Lancaster County</option>
                          <option value="Lebanon County">Lebanon County</option>
                          <option value="Perry County">Perry County</option>
                          <option value="Berks County">Berks County</option>
                          <option value="Lehigh County">Lehigh County</option>
                          <option value="Northampton County">Northampton County</option>
                          <option value="Philadelphia County">Philadelphia County</option>
                          <option value="Bucks County">Bucks County</option>
                          <option value="Montgomery County">Montgomery County</option>
                          <option value="Delaware County">Delaware County</option>
                          <option value="Chester County">Chester County</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group-lux">
                      <label>Describe Your Loved One's Care Needs</label>
                      <textarea
                        rows={4}
                        placeholder="Provide any details about schedules, specific needs, or preferred timing..."
                        className="form-textarea-lux"
                      />
                    </div>

                    <button type="submit" className="btn-coral-glow" style={{ width: "100%", justifyContent: "center" }}>
                      <span>Schedule Free Consultation</span>
                      <ArrowRight size={18} />
                    </button>

                    <div className="form-privacy-note">
                      ✔ Your information is private, encrypted, and kept strictly confidential.
                    </div>
                  </form>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
