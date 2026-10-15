import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy & Client Data Security",
  description: "Learn how Pavan Homecare protects your personal information, client privacy, HIPAA data standards, and communications security across Pennsylvania.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="LEGAL &amp; COMPLIANCE"
        title="Privacy Policy"
        description="Your trust matters to us. Here's how we protect, manage, and secure the information you share with Pavan Homecare."
        ctaLabel={null}
        showPhone={false}
      />

      <section className="py-16 lg:py-24 bg-[#F5F9FF]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#DCE7F7] shadow-[0_12px_35px_rgba(0,26,77,0.05)] text-[#4A5A73] leading-relaxed text-[15.5px]">
            
            <p className="text-[13.5px] font-semibold text-[#8A97AC] uppercase tracking-wider mb-6">
              Last updated: July 2026
            </p>

            <p className="mb-6">
              At <strong className="text-[#001A4D]">{site.name}</strong>, accessible from <a href={site.url} className="text-[#0061FF] font-semibold hover:underline">{site.url}</a>, one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document outlines the types of information collected and recorded by {site.name} and how we use it.
            </p>
            
            <p className="mb-6">
              If you have additional questions or require more information about our Privacy Policy, please do not hesitate to contact our care coordination team.
            </p>

            <p className="mb-8">
              This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they share and/or collect in {site.name}. This policy does not apply to any information collected offline or via channels other than this website.
            </p>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">Consent</h2>
              <p className="mb-6">
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </div>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">Information We Collect</h2>
              <p className="mb-4">
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <p className="mb-4">
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you choose to provide.
              </p>
              <p className="mb-6">
                When you contact us for care services or intake assessments, we may ask for your contact information, including your full name, home address, email address, phone number, and loved one&apos;s general care preferences.
              </p>
            </div>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect in various ways, including to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6 text-[#334155]">
                <li>Provide, operate, and maintain our care coordination website</li>
                <li>Improve, personalize, and expand our care assessment resources</li>
                <li>Understand and analyze how visitors navigate our website</li>
                <li>Develop new services, features, and patient support resources</li>
                <li>Communicate with you directly to schedule consultations, provide care updates, and respond to inquiries</li>
                <li>Send informational emails regarding care schedules and intake paperwork</li>
                <li>Find and prevent fraud</li>
              </ul>
            </div>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">Log Files</h2>
              <p className="mb-6">
                {site.name} follows standard log file protocols. The information collected includes IP addresses, browser types, Internet Service Providers (ISP), date/time stamps, referring/exit pages, and click metrics. This data is not linked to personally identifiable information and is used exclusively for trend analysis and site security.
              </p>
            </div>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">Your Privacy &amp; Data Rights</h2>
              <p className="mb-4">
                We respect your rights under applicable privacy laws. You have the right to request disclosure, rectification, restriction of processing, or erasure of your personal data held in our systems.
              </p>
              <p className="mb-6">
                If you make a request, we will respond within 30 days. To exercise any of these rights, please contact us at <a href={`mailto:${site.email}`} className="text-[#0061FF] font-semibold hover:underline">{site.email}</a>.
              </p>
            </div>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">Nondiscrimination Policy</h2>
              <p className="mb-6 p-5 rounded-2xl bg-[#F5F9FF] border border-[#DCE7F7] text-[#001A4D] font-medium">
                {site.name} LLC does not discriminate against any person in admission, treatment, participation in programs or services, on the grounds of race, age, color, national origin, religious belief, sexual orientation, or disability. Reasonable accommodation is provided for individuals with disabilities in accordance with Title VI of the Civil Rights Act of 1964 and Section 504 of the Rehabilitation Act of 1973. {site.name} LLC is an Equal Opportunity Employer.
              </p>
            </div>

            <div className="border-t border-[#DCE7F7] pt-8 mt-8">
              <h2 className="font-poppins font-bold text-[24px] text-[#001A4D] mb-4">Contact Us</h2>
              <p className="mb-2"><strong>{site.name}</strong></p>
              <p className="mb-2">{site.addressFull}</p>
              <p className="mb-2">Email: <a href={`mailto:${site.email}`} className="text-[#0061FF] font-semibold hover:underline">{site.email}</a></p>
              <p className="mb-2">Phone: <a href={site.phoneHref} className="text-[#0061FF] font-semibold hover:underline">{site.phoneDisplay}</a></p>
              <p className="m-0">Fax: {site.faxDisplay}</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
