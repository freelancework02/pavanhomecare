"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Phone, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

export const homeFaqs = [
  {
    q: "What in-home care services does Pavan Homecare provide in Pennsylvania?",
    a: "Pavan Homecare provides comprehensive, licensed non-medical senior home care across 9 Pennsylvania counties. Our services include personal hygiene care (bathing, dressing, grooming, toileting), companion care, 24-hour live-in care, specialized Alzheimer's and dementia memory care, medication reminders, meal preparation, mobility assistance, and post-hospital respite care."
  },
  {
    q: "Does Pennsylvania Medicaid (Community HealthChoices) pay for in-home care?",
    a: "Yes. Eligible seniors and individuals with disabilities in Pennsylvania can receive 100% state-funded in-home care through the Pennsylvania Community HealthChoices (CHC) and OBRA Medicaid waiver programs. Pavan Homecare works closely with participants, families, and service coordinators to quickly initiate approved care hours."
  },
  {
    q: "How much does in-home senior care cost in Pennsylvania?",
    a: "Private-pay home care in Pennsylvania typically ranges from $28 to $36 per hour depending on scheduling and care intensity. We provide completely transparent pricing with flexible hourly schedules and zero long-term binding contracts. We also assist families utilizing Long-Term Care Insurance and Veterans Aid & Attendance benefits."
  },
  {
    q: "Can family members get paid to be caregivers in Pennsylvania?",
    a: "Yes. Under Pennsylvania's Community HealthChoices Medicaid waiver, qualifying family members (such as adult daughters, sons, or relatives) can often be hired, trained, and paid as official caregivers through Pavan Homecare, allowing seniors to receive care from loved ones they already trust."
  },
  {
    q: "How quickly can care services start for my loved one?",
    a: "We understand that care needs often arise unexpectedly after a hospital discharge or sudden health change. In most cases, our care coordinators can conduct a complimentary in-home assessment and match a compassionate caregiver within 24 to 48 hours."
  },
  {
    q: "Are Pavan Homecare caregivers background-checked and insured?",
    a: "Yes, 100%. Every caregiver at Pavan Homecare undergoes rigorous multi-state criminal background checks, FBI fingerprinting, reference verification, and drug screening. Pavan Homecare is licensed by the Pennsylvania Department of Health, bonded, and fully insured for your family's peace of mind."
  }
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full bg-[#F8FAFC] py-16 lg:py-24 border-t border-[#DCE7F7]" aria-labelledby="home-faq-heading">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white text-[#001A4D] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-3 border border-[#0061FF]/20 shadow-sm">
            <HelpCircle size={14} className="text-[#0061FF]" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <h2 id="home-faq-heading" className="font-poppins font-extrabold text-[32px] sm:text-[42px] leading-[1.18] text-[#001A4D] tracking-[-0.6px] mb-4">
            Everything You Need to Know About In-Home Care in Pennsylvania
          </h2>
          <p className="text-[#4A5A73] text-[16px] sm:text-[17px] leading-relaxed">
            Clear answers about Medicaid waiver coverage, costs, caregiver qualifications, and getting started with Pavan Homecare.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-12">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#DCE7F7] shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-poppins font-bold text-[17px] sm:text-[18px] text-[#001A4D] hover:text-[#0061FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0061FF]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-[#0061FF] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-[#4A5A73] text-[15.5px] leading-relaxed border-t border-[#F1F5F9]">
                    <p className="m-0">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Support Banner */}
        <div className="bg-gradient-to-r from-[#001A4D] to-[#002B80] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-poppins font-bold text-[20px] sm:text-[22px] mb-1">
              Have a specific care question for your family?
            </h3>
            <p className="text-white/80 text-[14.5px] m-0 max-w-lg">
              Our compassionate care coordinators are available 24/7 to guide you through schedules, waivers, and assessment options.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold text-[14.5px] px-6 py-3.5 rounded-full shadow-[0_6px_20px_rgba(255,122,89,0.35)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <Phone size={16} />
              Call {site.phoneDisplay}
            </a>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[14.5px] px-6 py-3.5 rounded-full border border-white/20 transition-all duration-200"
            >
              Free Assessment <ArrowRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
