"use client";

import { useState } from "react";
import { submitContactInquiry } from "@/lib/firebase";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    zip: "",
    help: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    setIsError(false);

    try {
      const result = await submitContactInquiry({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        zip: formData.zip.trim(),
        help: formData.help,
        formName: "Standard Contact Form",
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "unknown"
      });

      if (result.success) {
        setStatus("Thank you — we've received your message and will be in touch soon.");
        setIsError(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          city: "",
          zip: "",
          help: ""
        });
      } else {
        setIsError(true);
        setStatus(
          result.error?.includes("permission-denied")
            ? "Submission received, but Firestore database permissions are currently restricted. Please ensure Firestore rules allow writing to 'PHC-Contact-form-inquiries'."
            : result.error || "Failed to submit request. Please call us directly."
        );
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setIsError(true);
      setStatus("An unexpected error occurred. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="form-status" className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="text-[13.5px] font-semibold text-[#001A4D]">
            First Name <span className="text-[#0061FF]">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] bg-white text-[#0B1730] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className="text-[13.5px] font-semibold text-[#001A4D]">
            Last Name <span className="text-[#0061FF]">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] bg-white text-[#0B1730] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[13.5px] font-semibold text-[#001A4D]">
          Email <span className="text-[#0061FF]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] bg-white text-[#0B1730] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-[13.5px] font-semibold text-[#001A4D]">
          Phone Number <span className="text-[#0061FF]">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] bg-white text-[#0B1730] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="city" className="text-[13.5px] font-semibold text-[#001A4D]">
            City <span className="text-[#0061FF]">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            value={formData.city}
            onChange={handleChange}
            autoComplete="address-level2"
            className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] bg-white text-[#0B1730] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="zip" className="text-[13.5px] font-semibold text-[#001A4D]">
            Zip Code <span className="text-[#0061FF]">*</span>
          </label>
          <input
            id="zip"
            name="zip"
            type="text"
            required
            value={formData.zip}
            onChange={handleChange}
            autoComplete="postal-code"
            className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] bg-white text-[#0B1730] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="help" className="text-[13.5px] font-semibold text-[#001A4D]">
          How can we help you? <span className="text-[#0061FF]">*</span>
        </label>
        <select
          id="help"
          name="help"
          required
          value={formData.help}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-[#DCE7F7] bg-white text-[#0B1730] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/25 focus:border-[#0061FF] transition-all"
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
        disabled={isSubmitting}
        className="w-full bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold text-[15px] py-4 rounded-full shadow-[0_10px_25px_rgba(255,122,89,0.35)] hover:shadow-[0_15px_30px_rgba(255,122,89,0.5)] hover:-translate-y-0.5 transition-all duration-300 mt-2 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting Request..." : "Submit Request"}
      </button>

      {status && (
        <p
          id="form-status"
          role="status"
          aria-live="polite"
          className={`text-[14px] font-medium p-4 rounded-xl text-center mt-2 border ${
            isError
              ? "text-red-700 bg-red-50 border-red-200"
              : "text-[#0061FF] bg-[#E8F2FF] border-[#0061FF]/20"
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
}
