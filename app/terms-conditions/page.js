import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata = {
  title: "Terms & Conditions",
  description: `Read the Terms & Conditions and SMS Terms for using the ${site.name} website and care coordination services.`,
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditionsPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="LEGAL &amp; POLICIES"
        title="Terms &amp; Conditions"
        description="Please read these terms and conditions carefully before using the Pavan Homecare website or enrolling in care communications."
        ctaLabel={null}
        showPhone={false}
      />

      <section className="py-16 lg:py-24 bg-[#F5F9FF]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#DCE7F7] shadow-[0_12px_35px_rgba(0,26,77,0.05)] text-[#4A5A73] leading-relaxed text-[15.5px]">
            
            <p className="text-[13.5px] font-semibold text-[#8A97AC] uppercase tracking-wider mb-6">
              Last updated: July 2026
            </p>

            <p className="mb-4">
              Welcome to <strong className="text-[#001A4D]">{site.name}</strong>!
            </p>
            <p className="mb-6">
              These terms and conditions outline the rules and regulations for the use of {site.name}&apos;s Website, located at <a href={site.url} className="text-[#0061FF] font-semibold hover:underline">{site.url}</a>.
            </p>
            <p className="mb-8">
              By accessing this website we assume you accept these terms and conditions. Do not continue to use {site.name} if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">Cookies</h2>
              <p className="mb-6">
                We employ the use of cookies to enhance your experience. By accessing {site.name}, you agree to use cookies in agreement with the {site.name}&apos;s Privacy Policy. Cookies allow us to optimize navigational flow and remember user preferences.
              </p>
            </div>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">License &amp; Intellectual Property</h2>
              <p className="mb-4">
                Unless otherwise stated, {site.name} and/or its licensors own the intellectual property rights for all material on {site.name}. All intellectual property rights are reserved. You may access this from {site.name} for your own personal use, subject to restrictions set in these terms and conditions.
              </p>
              <p className="mb-2 font-semibold text-[#001A4D]">You must not:</p>
              <ul className="list-disc pl-6 space-y-1.5 mb-6 text-[#334155]">
                <li>Republish material from {site.name}</li>
                <li>Sell, rent or sub-license material from {site.name}</li>
                <li>Reproduce, duplicate or copy material from {site.name} without written permission</li>
                <li>Redistribute content from {site.name}</li>
              </ul>
            </div>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">Your Privacy</h2>
              <p className="mb-6">
                Please read our <a href="/privacy-policy" className="text-[#0061FF] font-semibold hover:underline">Privacy Policy</a> to understand how your data is handled and protected.
              </p>
            </div>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">SMS Messaging Terms &amp; Conditions</h2>
              
              <h3 className="font-poppins font-bold text-[18px] text-[#001A4D] mb-3">How to Opt In</h3>
              <p className="mb-3">
                If you would like to communicate with {site.name} via text message for care updates or appointment confirmations, you can opt in by either:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 mb-6 text-[#334155]">
                <li>Texting the word START to <a href={site.phoneHref} className="text-[#0061FF] font-semibold">{site.phoneDisplay}</a>, or</li>
                <li>Providing verbal or written consent during your care evaluation or intake onboarding.</li>
              </ul>

              <h3 className="font-poppins font-bold text-[18px] text-[#001A4D] mb-3">Types of Messages</h3>
              <p className="mb-3">By opting in to SMS communications, you may receive:</p>
              <ul className="list-disc pl-6 space-y-1.5 mb-6 text-[#334155]">
                <li>Appointment confirmations, reminders, and scheduling adjustments</li>
                <li>Caregiver arrival notifications and care plan updates</li>
                <li>Service notifications and client portal access alerts</li>
                <li>Direct replies to your family care inquiries</li>
              </ul>

              <h3 className="font-poppins font-bold text-[18px] text-[#001A4D] mb-3">Privacy &amp; Opt-Out Protections</h3>
              <div className="p-5 rounded-2xl bg-[#F5F9FF] border border-[#DCE7F7] text-[#001A4D] font-medium mb-6">
                <p className="mb-2">
                  <strong>Mobile Information Protection:</strong> Mobile information will NOT be shared with third parties or affiliates for marketing or promotional purposes. All text messaging originator opt-in data and consent information is excluded from any third-party sharing.
                </p>
                <p className="m-0 text-[14px] text-[#4A5A73]">
                  Message frequency may vary. Standard message and data rates may apply. Reply STOP at any time to opt out. Reply HELP for assistance or email <a href={`mailto:${site.email}`} className="text-[#0061FF] underline">{site.email}</a>.
                </p>
              </div>

              <h3 className="font-poppins font-bold text-[18px] text-[#001A4D] mb-3">Opt-In Confirmation Language</h3>
              <blockquote className="border-l-4 border-[#0061FF] pl-4 py-2 italic bg-[#F8FAFC] rounded-r-xl text-[#334155] text-[14.5px] mb-6">
                &ldquo;By checking this box, texting START to {site.phoneDisplay}, or providing verbal consent, you agree to receive informational text messages (appointment reminders, scheduling updates, service notifications, and account information) from {site.name}. Msg frequency varies. Msg &amp; data rates may apply. Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes. Reply HELP for assistance or email {site.email} for support. Reply STOP to cancel at any time. Privacy Policy: {site.url}/privacy-policy | Terms &amp; Conditions: {site.url}/terms-conditions&rdquo;
              </blockquote>
            </div>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">Contact Information</h2>
              <p className="mb-2"><strong>{site.name}</strong></p>
              <p className="mb-2">{site.addressFull}</p>
              <p className="mb-2">Email: <a href={`mailto:${site.email}`} className="text-[#0061FF] font-semibold hover:underline">{site.email}</a></p>
              <p className="m-0">Phone: <a href={site.phoneHref} className="text-[#0061FF] font-semibold hover:underline">{site.phoneDisplay}</a></p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
