import { site, services } from "./site.js";

export const CHATBOT_KNOWLEDGE = {
  company: {
    name: "Pavan Homecare LLC",
    tagline: "Love driven care",
    phone: "(215) 436-9499",
    phoneHref: "tel:+12154369499",
    fax: "(223) 210-3600",
    email: "pavanhomecare@gmail.com",
    address: "19 Bowman Dr, Feasterville, PA 19053",
    headquarters: "Feasterville, Bucks County, Pennsylvania",
    licensing: "Fully licensed by the Pennsylvania Department of Health, insured, and bonded.",
    hours: "24/7 on-call Care Coordinators available 365 days a year.",
    responseTime: "Typically responds and matches caregivers within 24 to 48 hours. Emergency same-day starts available."
  },

  serviceAreas: [
    {
      county: "Bucks County",
      cities: "Feasterville, Doylestown, Bensalem, Newtown, Langhorne, Levittown, Warminster, Quakertown, Bristol, Yardley",
      description: "Our home base! We provide comprehensive non-medical and CHC waiver home care across all Bucks County communities."
    },
    {
      county: "Philadelphia County",
      cities: "Center City, Northeast Philadelphia, South Philly, West Philly, Chestnut Hill, Roxborough, Mount Airy, Fishtown",
      description: "Dedicated compassionate care for seniors across all Philadelphia neighborhoods."
    },
    {
      county: "Montgomery County",
      cities: "Norristown, King of Prussia, Lansdale, Conshohocken, Pottstown, Ambler, Plymouth Meeting, Willow Grove",
      description: "Providing trusted in-home senior care and respite relief throughout Montgomery County."
    },
    {
      county: "Delaware County",
      cities: "Media, Upper Darby, Chester, Haverford, Radnor, Springfield, Broomall, Wayne",
      description: "Experienced caregivers assisting older adults throughout Delaware County."
    },
    {
      county: "Chester County",
      cities: "West Chester, Exton, Phoenixville, Coatesville, Malvern, Downingtown, Kennett Square",
      description: "Personalized companion and memory care across Chester County towns."
    },
    {
      county: "Lehigh County",
      cities: "Allentown, Bethlehem, Emmaus, Macungie, Whitehall",
      description: "Proudly supporting families and seniors in the Lehigh Valley."
    },
    {
      county: "Northampton County",
      cities: "Bethlehem, Easton, Palmer, Nazareth, Northampton, Hellertown",
      description: "Local, licensed caregivers serving Northampton County seniors."
    },
    {
      county: "Berks County",
      cities: "Reading, Wyomissing, Kutztown, Boyertown, Hamburg",
      description: "Reliable hourly and live-in senior care across Berks County."
    },
    {
      county: "Schuylkill County",
      cities: "Pottsville, Tamaqua, Schuylkill Haven, Shenandoah, Mahanoy City",
      description: "Compassionate in-home senior care services in Schuylkill County."
    }
  ],

  services: [
    {
      name: "Personal Care & Hygiene",
      slug: "personal-care",
      summary: "Dignified, respectful hands-on assistance with activities of daily living (ADLs).",
      details: "Includes bathing and showering assistance, oral care, hair grooming, dressing, toileting and incontinence care, safe ambulation, transfer assistance (bed/wheelchair/chair), and mobility support."
    },
    {
      name: "Companion Care & Socialization",
      slug: "companion-care",
      summary: "Warm, friendly companionship that reduces loneliness and boosts mental vitality.",
      details: "Includes lively conversation, shared hobbies and board games, accompaniment on walks, escorting to doctor appointments, running errands, grocery shopping, and safety supervision."
    },
    {
      name: "24-Hour & Live-In Care",
      slug: "24-hour-care",
      summary: "Continuous around-the-clock coverage for high-need seniors who require constant monitoring.",
      details: "Provides uninterrupted peace of mind with awake day and night shifts or dedicated live-in caregivers. Ideal for advanced dementia, fall-risk seniors, or post-surgical recovery."
    },
    {
      name: "Alzheimer's & Dementia Memory Care",
      slug: "dementia-care",
      summary: "Specialized cognitive care preserving familiar routines in the safety of home.",
      details: "Caregivers trained in gentle redirection, calming anxiety, wander prevention, structured daily cognitive activities, and compassionate patience tailored to each dementia stage."
    },
    {
      name: "Respite Care & Family Relief",
      slug: "respite-care",
      summary: "Temporary care coverage giving primary family caregivers necessary rest and relief.",
      details: "Available in flexible hourly blocks, weekend coverage, or overnight relief so family caregivers can work, travel, or recharge without worrying."
    },
    {
      name: "Post-Hospital Discharge & Recovery Care",
      slug: "post-hospital-care",
      summary: "Smooth, safe transitions from hospital or rehabilitation center to home.",
      details: "Focuses on fall prevention, physical recovery assistance, following discharge instructions, medication reminders, and nutrition to prevent re-hospitalization."
    },
    {
      name: "Nutritious Meal Preparation",
      slug: "meal-preparation",
      summary: "Fresh, healthy home-cooked meals tailored to dietary requirements.",
      details: "Caregivers plan menus, shop for groceries, prepare meals compliant with diabetic, low-sodium, or pureed diets, and ensure adequate daily hydration."
    },
    {
      name: "Medication Reminders",
      slug: "medication-reminders",
      summary: "Timely verbal prompts ensuring prescriptions are taken accurately on schedule.",
      details: "Caregivers maintain medication logs, prompt timely doses from pill organizers, and report missed doses to family or supervisors."
    },
    {
      name: "Light Housekeeping & Laundry",
      slug: "light-housekeeping",
      summary: "Maintaining a clean, safe, and clutter-free living environment.",
      details: "Washing dishes, taking out trash, dusting, vacuuming, cleaning kitchens and bathrooms, changing bed linens, and personal laundry."
    },
    {
      name: "Disability & Mobility Support",
      slug: "disability-support",
      summary: "Support for adults and children with physical or developmental disabilities.",
      details: "Safe transfer mechanics, slide-board assistance, sensory routine management, and fostering independent living skills."
    },
    {
      name: "Veteran Care (VA Aid & Attendance)",
      slug: "veteran-care",
      summary: "Care options funded through Veterans Affairs benefits for veterans and surviving spouses.",
      details: "We guide families through VA Aid & Attendance pension paperwork to receive approved in-home care hours at minimal or no out-of-pocket cost."
    }
  ],

  financialOptions: {
    medicaidWaiver: {
      name: "Pennsylvania Community HealthChoices (CHC) Medicaid Waiver",
      summary: "Approved state program covering 100% of approved in-home care hours for eligible seniors.",
      details: "Pavan Homecare partners with all PA CHC Managed Care Organizations (PA Health & Wellness, UPMC Community HealthChoices, AmeriHealth Caritas). No cost to qualifying individuals."
    },
    paidFamilyCaregiver: {
      name: "Paid Family Caregiver Program in Pennsylvania",
      summary: "Yes! Family members can get paid to care for their loved ones in PA.",
      details: "Under the PA Community HealthChoices waiver, participants can designate trusted adult family members (daughters, sons, grandchildren, siblings, or friends) to be employed through Pavan Homecare as paid caregivers ($15 - $22/hour). Note: Legal spouses and Power of Attorney holders cannot be paid by PA state law."
    },
    privatePay: {
      name: "Private Pay Rates",
      summary: "Flexible, transparent hourly billing with zero long-term commitments.",
      details: "Hourly private-duty rates generally range from $28 to $36 per hour depending on required care level and frequency. No hidden fees or mandatory contracts."
    },
    veteranBenefits: {
      name: "VA Aid & Attendance",
      summary: "Monthly tax-free pension benefits for qualifying wartime veterans and spouses.",
      details: "Covers daily assistance with bathing, dressing, and homemaking. Our coordinators assist with eligibility reviews."
    },
    longTermCareInsurance: {
      name: "Long-Term Care Insurance (LTCI)",
      summary: "We work directly with your LTCI provider for seamless claim filing and direct reimbursement."
    }
  },

  caregiverStandards: [
    "Pennsylvania State Police criminal record checks",
    "FBI fingerprinting clearance",
    "Child abuse clearance (when applicable)",
    "Professional reference verifications & interviews",
    "TB testing and annual health screenings",
    "Comprehensive skills training (dementia, transfers, infection control)",
    "100% Licensed, bonded, and insured"
  ]
};

export const QUICK_SUGGESTIONS = [
  { label: "🏥 What services do you offer?", query: "services" },
  { label: "📍 Which PA counties do you serve?", query: "areas" },
  { label: "💰 Does Medicaid (CHC) pay for care?", query: "medicaid" },
  { label: "💵 Can I get paid to care for family?", query: "paid family caregiver" },
  { label: "⏱ How quickly can care start?", query: "how fast" },
  { label: "📋 Book free in-home consultation", query: "book consultation" }
];

/**
 * Intelligent chatbot intent matching and response generator
 * @param {string} userQuery
 * @returns {{ answer: string, quickLinks?: Array<{label: string, href: string}>, suggestLeadForm?: boolean, followUp?: string }}
 */
export function matchChatbotResponse(userQuery) {
  if (!userQuery || !userQuery.trim()) {
    return {
      answer: "Hello! I'm your Pavan Homecare Virtual Care Advisor. How can I help you today? You can ask about our care services, service areas, Medicaid waiver programs, or how to get started.",
      suggestLeadForm: false
    };
  }

  const q = userQuery.toLowerCase().trim();

  // 1. Direct request to talk / speak / book / consultation / hire
  if (
    q.includes("talk to someone") ||
    q.includes("speak to") ||
    q.includes("coordinator") ||
    q.includes("book") ||
    q.includes("consultation") ||
    q.includes("assessment") ||
    q.includes("hire") ||
    q.includes("start care") ||
    q.includes("call me") ||
    q.includes("contact me") ||
    q.includes("sign up")
  ) {
    return {
      answer:
        "We would love to help your family! Pavan Homecare offers a 100% Free, Zero-Obligation In-Home Care Assessment. A local Care Coordinator can visit your home, assess mobility and routine needs, and build a personalized care plan.\n\nYou can fill out the quick form below to request a call back, or reach us immediately by phone at (215) 436-9499.",
      quickLinks: [
        { label: "Call (215) 436-9499", href: "tel:+12154369499" },
        { label: "Contact Us Page", href: "/contact-us" }
      ],
      suggestLeadForm: true,
      followUp: "Fill out the short form below and our lead coordinator will contact you promptly!"
    };
  }

  // 2. Paid Family Caregiver program
  if (
    (q.includes("paid") || q.includes("pay")) &&
    (q.includes("family") || q.includes("caregiver") || q.includes("mom") || q.includes("dad") || q.includes("relative") || q.includes("parent"))
  ) {
    return {
      answer:
        "**Yes! In Pennsylvania, you can get paid to care for an aging parent or loved one.**\n\nUnder the Pennsylvania Community HealthChoices (CHC) Medicaid Waiver program:\n• Eligible seniors receive approved caregiving hours each week.\n• The senior can select trusted adult family members (adult children, grandchildren, siblings, or friends) to be their official paid caregiver.\n• Caregivers are employed through Pavan Homecare and typically earn between **$15 and $22 per hour** with direct payroll, taxes handled, and workers' compensation coverage.\n\n*(Note: Under PA state law, legal spouses and designated Power of Attorney holders cannot be compensated, but other relatives qualify).*",
      quickLinks: [
        { label: "Read Paid Caregiver Guide", href: "/blog/paid-family-caregiver-pa" },
        { label: "Call for CHC Guidance: (215) 436-9499", href: "tel:+12154369499" }
      ],
      suggestLeadForm: true,
      followUp: "Would you like us to check if your family member qualifies for CHC paid hours?"
    };
  }

  // 3. Medicaid / CHC Waiver
  if (
    q.includes("medicaid") ||
    q.includes("waiver") ||
    q.includes("chc") ||
    q.includes("community healthchoices") ||
    q.includes("insurance") ||
    q.includes("pa health") ||
    q.includes("upmc") ||
    q.includes("amerihealth")
  ) {
    return {
      answer:
        "**Yes, Pavan Homecare is an approved provider for Pennsylvania Medicaid Waivers!**\n\n• **Community HealthChoices (CHC):** Covers 100% of approved caregiving hours with zero out-of-pocket costs for qualifying seniors.\n• **Approved MCO Partners:** We coordinate with PA Health & Wellness, UPMC Community HealthChoices, and AmeriHealth Caritas.\n• **Enrollment Support:** If your loved one is not yet enrolled in CHC, our dedicated waiver coordination team guides you through the enrollment process step-by-step at no charge.",
      quickLinks: [
        { label: "Learn About Services", href: "/services" },
        { label: "Call Us: (215) 436-9499", href: "tel:+12154369499" }
      ],
      suggestLeadForm: true,
      followUp: "Would you like our waiver specialist to review your loved one's eligibility?"
    };
  }

  // 4. Costs / Pricing / How much
  if (
    q.includes("cost") ||
    q.includes("price") ||
    q.includes("rate") ||
    q.includes("how much") ||
    q.includes("pricing") ||
    q.includes("afford")
  ) {
    return {
      answer:
        "**Here is how pricing & payment works at Pavan Homecare:**\n\n1. **PA Medicaid Waiver (CHC):** 100% covered by the state with $0 out-of-pocket costs for qualifying individuals.\n2. **Private Pay:** Hourly rates typically range from **$28 to $36 per hour** depending on the level of care needed (personal vs companion) and weekly schedule. There are never any long-term locked contracts.\n3. **VA Aid & Attendance:** Veterans and surviving spouses can receive monthly pensions covering in-home care.\n4. **Long-Term Care Insurance (LTCI):** We assist with direct insurance billing and documentation.\n\nWe provide a **100% Free In-Home Consultation** to give you an exact, transparent quote.",
      quickLinks: [
        { label: "View Price Guide", href: "/blog/home-care-cost-pennsylvania" },
        { label: "Call (215) 436-9499", href: "tel:+12154369499" }
      ],
      suggestLeadForm: true,
      followUp: "Would you like a free assessment quote tailored to your loved one's schedule?"
    };
  }

  // 5. Service Areas / Counties / Locations
  if (
    q.includes("area") ||
    q.includes("county") ||
    q.includes("counties") ||
    q.includes("location") ||
    q.includes("where") ||
    q.includes("serve") ||
    q.includes("bucks") ||
    q.includes("philadelphia") ||
    q.includes("montgomery") ||
    q.includes("delaware") ||
    q.includes("chester") ||
    q.includes("lehigh") ||
    q.includes("northampton") ||
    q.includes("berks") ||
    q.includes("schuylkill") ||
    q.includes("feasterville")
  ) {
    const matchedCounties = CHATBOT_KNOWLEDGE.serviceAreas.filter((item) =>
      q.includes(item.county.toLowerCase().replace(" county", ""))
    );

    let specificText = "";
    if (matchedCounties.length > 0) {
      specificText = `\n\n**Yes! We actively serve ${matchedCounties.map((m) => m.county).join(" and ")}!**\nKey cities include: ${matchedCounties.map((m) => m.cities).join(", ")}.`;
    }

    return {
      answer:
        `**Pavan Homecare serves 9 Pennsylvania Counties:**\n` +
        `1. **Bucks County** (Feasterville headquarters, Doylestown, Bensalem, Newtown, Langhorne, Levittown)\n` +
        `2. **Philadelphia County** (Center City, Northeast, South Philly, West Philly, Roxborough)\n` +
        `3. **Montgomery County** (Norristown, King of Prussia, Lansdale, Conshohocken, Pottstown)\n` +
        `4. **Delaware County** (Media, Upper Darby, Chester, Haverford, Radnor)\n` +
        `5. **Chester County** (West Chester, Exton, Phoenixville, Malvern, Coatesville)\n` +
        `6. **Lehigh County** (Allentown, Bethlehem, Emmaus, Whitehall)\n` +
        `7. **Northampton County** (Bethlehem, Easton, Palmer, Nazareth)\n` +
        `8. **Berks County** (Reading, Wyomissing, Kutztown, Boyertown)\n` +
        `9. **Schuylkill County** (Pottsville, Tamaqua, Schuylkill Haven)` +
        specificText,
      quickLinks: [
        { label: "View Service Areas", href: "/areas-we-serve" },
        { label: "Call (215) 436-9499", href: "tel:+12154369499" }
      ],
      suggestLeadForm: false,
      followUp: "What town or ZIP code do you need care in?"
    };
  }

  // 6. Dementia / Alzheimer's Memory Care
  if (q.includes("dementia") || q.includes("alzheimer") || q.includes("memory")) {
    return {
      answer:
        "**Specialized Alzheimer's & Dementia Memory Care:**\n\nOur caregivers receive dedicated training in cognitive routines and memory care to support clients experiencing memory loss:\n• **Preserving Routines:** Consistency in daily timing to minimize confusion and agitation.\n• **Safety & Wander Prevention:** Vigilant supervision to prevent accidents or wandering.\n• **Gentle Redirection:** Patient, dignified communication that respects the senior's reality.\n• **Caregiver Consistency:** We strive to keep the exact same caregiver on your loved one's schedule to foster trust and familiarity.",
      quickLinks: [
        { label: "Memory Care Details", href: "/services" },
        { label: "Consultation Call", href: "tel:+12154369499" }
      ],
      suggestLeadForm: true,
      followUp: "Can we schedule a consultation to discuss your loved one's memory care needs?"
    };
  }

  // 7. Personal Care / Bathing / Hygiene / Dressing
  if (
    q.includes("personal care") ||
    q.includes("bath") ||
    q.includes("hygiene") ||
    (!q.includes("address") && (q.includes("dressing") || /\bdress\b/.test(q))) ||
    q.includes("toilet") ||
    q.includes("incontinence") ||
    q.includes("transfer") ||
    q.includes("mobility")
  ) {
    return {
      answer:
        "**Personal Care & Daily Hygiene Services:**\n\nWe provide dignified, hands-on physical assistance tailored to your loved one's comfort:\n• Bathing, sponge baths, and shower safety assistance\n• Dressing, grooming, shaving, and hair care\n• Restroom and incontinence care with total dignity\n• Safe transfers (bed to chair, wheelchair assistance, slide boards)\n• Walking and ambulation assistance to prevent falls",
      quickLinks: [{ label: "View All Services", href: "/services" }],
      suggestLeadForm: true,
      followUp: "Would you like help setting up a personal care routine?"
    };
  }

  // 8. Companion Care / Housekeeping / Meal Prep
  if (
    q.includes("companion") ||
    q.includes("housekeeping") ||
    q.includes("meal") ||
    q.includes("cook") ||
    q.includes("errand") ||
    q.includes("clean") ||
    q.includes("laundry") ||
    q.includes("medication")
  ) {
    return {
      answer:
        "**Companion Care & Homemaking Services:**\n\nOur companion caregivers keep seniors engaged, safe, and comfortable:\n• **Companionship:** Friendly conversation, walks, cards, puzzles, and mental stimulation\n• **Meal Preparation:** Cooking fresh, healthy meals tailored to dietary requirements\n• **Medication Reminders:** Reliable verbal reminders and logging\n• **Light Housekeeping:** Dusting, vacuuming, dishes, trash removal, and fresh linens\n• **Errands & Transportation:** Grocery shopping, pharmacy pickups, and doctor visit escorts",
      quickLinks: [{ label: "Explore Services", href: "/services" }],
      suggestLeadForm: true,
      followUp: "How many hours per week of companion care are you considering?"
    };
  }

  // 9. 24-Hour / Overnight / Live-In Care
  if (
    q.includes("24 hour") ||
    q.includes("24/7") ||
    q.includes("live-in") ||
    q.includes("live in") ||
    q.includes("overnight") ||
    q.includes("round the clock")
  ) {
    return {
      answer:
        "**24-Hour & Live-In Care Support:**\n\nFor seniors who cannot safely be left unattended, we offer continuous coverage:\n• **24-Hour Shift Care:** Rotating shifts of alert, awake caregivers covering days, evenings, and overnight hours.\n• **Live-In Care:** A dedicated caregiver resides in the home to provide continuous support and assistance.\n• **Immediate Relief:** Perfect for high fall-risk individuals, advanced dementia, or palliative hospice support.",
      quickLinks: [
        { label: "Request 24/7 Care", href: "/contact-us" },
        { label: "Call (215) 436-9499", href: "tel:+12154369499" }
      ],
      suggestLeadForm: true,
      followUp: "Would you like to speak with our scheduling director about 24-hour care options?"
    };
  }

  // 10. Caregiver Vetting / Safety / Screened
  if (
    q.includes("vet") ||
    q.includes("screen") ||
    q.includes("background") ||
    q.includes("police") ||
    q.includes("fingerprint") ||
    q.includes("safe") ||
    q.includes("trust") ||
    q.includes("licensed") ||
    q.includes("insured")
  ) {
    return {
      answer:
        "**How Pavan Homecare Screens & Vets Caregivers:**\n\nYour family's safety is our utmost priority. Every caregiver undergoes rigorous screening:\n1. Pennsylvania State Police Criminal Record Check\n2. FBI Fingerprinting & Federal background screening\n3. Child abuse clearances (where applicable)\n4. Rigorous professional reference checks & in-person interviews\n5. Ongoing skills training in dementia care, fall prevention, and patient transfers\n6. Pavan Homecare is fully licensed by the PA Dept of Health, insured, and bonded.",
      quickLinks: [{ label: "About Our Team", href: "/about" }],
      suggestLeadForm: false,
      followUp: "You also have the opportunity to meet and approve your matched caregiver before care starts!"
    };
  }

  // 11. How Fast / Emergency / Start Time
  if (
    q.includes("how fast") ||
    q.includes("how quickly") ||
    q.includes("urgent") ||
    q.includes("emergency") ||
    q.includes("soon") ||
    q.includes("start")
  ) {
    return {
      answer:
        "**How Quickly Can Care Begin?**\n\n• **Standard Matching:** Typically within **24 to 48 hours** following your initial consultation and in-home assessment.\n• **Urgent Situations:** For immediate hospital discharges or family caregiver emergencies, our on-call team can coordinate same-day or next-day caregiver matching.\n• **Call our 24/7 on-call coordinator right away:** **(215) 436-9499**.",
      quickLinks: [{ label: "Call (215) 436-9499 Immediately", href: "tel:+12154369499" }],
      suggestLeadForm: true,
      followUp: "If you need immediate care, please leave your phone number below or call us directly!"
    };
  }

  // 12. Careers / Jobs / Hiring
  if (
    q.includes("job") ||
    q.includes("career") ||
    q.includes("hire") ||
    q.includes("apply") ||
    q.includes("work for") ||
    q.includes("caregiver position")
  ) {
    return {
      answer:
        "**Join the Pavan Homecare Family!**\n\nWe are actively hiring compassionate, licensed caregivers, CNAs, and Home Health Aides across our 9 PA counties:\n• Competitive hourly pay ($15 - $22+/hr)\n• Flexible shifts (part-time, full-time, weekends, overnight)\n• Supportive local management & paid orientation\n• Email your resume to **pavanhomecare@gmail.com** or call **(215) 436-9499**.",
      quickLinks: [{ label: "Email Caregiver Application", href: "mailto:pavanhomecare@gmail.com?subject=Caregiver Application" }],
      suggestLeadForm: false,
      followUp: "What PA county or city are you looking to work in?"
    };
  }

  // 13. Contact Info / Phone / Address / Hours
  if (
    q.includes("phone") ||
    q.includes("call") ||
    q.includes("address") ||
    q.includes("email") ||
    q.includes("hours") ||
    q.includes("office")
  ) {
    return {
      answer:
        "**Pavan Homecare Contact Details:**\n\n• **Phone:** (215) 436-9499 (Live 24/7 Care Coordinators)\n• **Fax:** (223) 210-3600\n• **Email:** pavanhomecare@gmail.com\n• **Office Address:** 19 Bowman Dr, Feasterville, PA 19053\n• **Hours:** Office open Mon-Fri 8:30am - 5:30pm; On-Call Care Coordinators available 24 hours a day, 7 days a week.",
      quickLinks: [
        { label: "Call (215) 436-9499", href: "tel:+12154369499" },
        { label: "Open Contact Page", href: "/contact-us" }
      ],
      suggestLeadForm: true,
      followUp: "Would you like us to give you a call at a specific time?"
    };
  }

  // 14. Overview of All Services
  if (q.includes("service") || q.includes("what do you do") || q.includes("help")) {
    return {
      answer:
        "**Pavan Homecare provides comprehensive in-home senior care:**\n\n" +
        "1. **Personal Care:** Bathing, dressing, grooming, hygiene, mobility & transfers\n" +
        "2. **Companion Care:** Socialization, conversation, recreational activities, errands\n" +
        "3. **Alzheimer's & Dementia Care:** Memory preservation, routines, wander prevention\n" +
        "4. **Respite Care:** Essential relief for family caregivers\n" +
        "5. **24-Hour & Live-In Care:** Continuous day & night monitoring\n" +
        "6. **Meal Preparation:** Healthy, diet-compliant cooking & hydration support\n" +
        "7. **Medication Reminders:** Reliable daily promptings & tracking\n" +
        "8. **Light Housekeeping:** Laundry, tidying, linens, and safe hygienic living\n" +
        "9. **Medicaid CHC Waiver:** State-covered care & paid family caregiver options",
      quickLinks: [
        { label: "View Services Page", href: "/services" },
        { label: "Free Assessment Form", href: "/contact-us" }
      ],
      suggestLeadForm: true,
      followUp: "Which of these services are you most interested in for your family?"
    };
  }

  // Fallback: If no confident match found, provide helpful overview and ALWAYS offer the lead capture form!
  return {
    answer:
      `Thank you for asking! Pavan Homecare is a licensed, love-driven home care agency based in Feasterville, PA, serving 9 Pennsylvania counties with personal care, companion care, dementia care, and Medicaid waiver support.\n\n` +
      `I want to make sure you get the exact information you need. You can speak directly with our Care Coordinator at **(215) 436-9499**, or share your contact details below so our lead coordinator can assist you directly!`,
    quickLinks: [
      { label: "Call Coordinator (215) 436-9499", href: "tel:+12154369499" },
      { label: "Visit Contact Page", href: "/contact-us" }
    ],
    suggestLeadForm: true,
    followUp: "Please fill out the form below and we will follow up with the exact details for your situation:"
  };
}
