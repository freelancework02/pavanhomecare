"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Thank you — we've received your message and will be in touch soon.");
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="form-status" className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="text-[13.5px] font-semibold text-[#0F172A]">
            First Name <span className="text-[#0061FF]">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className="text-[13.5px] font-semibold text-[#0F172A]">
            Last Name <span className="text-[#0061FF]">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[13.5px] font-semibold text-[#0F172A]">
          Email <span className="text-[#0061FF]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-[13.5px] font-semibold text-[#0F172A]">
          Phone Number <span className="text-[#0061FF]">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="city" className="text-[13.5px] font-semibold text-[#0F172A]">
            City <span className="text-[#0061FF]">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="zip" className="text-[13.5px] font-semibold text-[#0F172A]">
            Zip Code <span className="text-[#0061FF]">*</span>
          </label>
          <input
            id="zip"
            name="zip"
            type="text"
            required
            autoComplete="postal-code"
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="help" className="text-[13.5px] font-semibold text-[#0F172A]">
          How can we help you? <span className="text-[#0061FF]">*</span>
        </label>
        <select
          id="help"
          name="help"
          required
          defaultValue=""
          className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
        >
          <option value="" disabled>
            Please select
          </option>
          <option value="personal-care">Personal Care</option>
          <option value="companion-care">Companion Care</option>
          <option value="housekeeping">Light Housekeeping</option>
          <option value="respite-care">Respite Care</option>
          <option value="dementia-care">Alzheimer's &amp; Dementia Care</option>
          <option value="employment">Caregiver Employment</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#0061FF] to-[#60EFFF] hover:opacity-95 text-white font-semibold text-[15px] py-4 rounded-full shadow-[0_10px_25px_rgba(0,97,255,0.25)] hover:shadow-[0_15px_30px_rgba(0,97,255,0.35)] hover:-translate-y-0.5 transition-all duration-300 mt-2"
      >
        Submit Request
      </button>

      {status && (
        <p id="form-status" role="status" aria-live="polite" className="text-[14px] font-medium text-[#0061FF] bg-[#0061FF]/10 p-4 rounded-xl text-center mt-2 border border-[#0061FF]/20">
          {status}
        </p>
      )}
    </form>
  );
}
