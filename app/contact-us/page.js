import "./contact.css";
import ContactClient from "@/components/ContactClient";
import { site } from "@/lib/site";

export const metadata = {
  title: `Contact Us & Free Care Consultation | ${site.name}`,
  description:
    "Schedule a free in-home consultation or speak with a live care coordinator at Pavan Homecare. Compassionate senior care across 10 PA counties.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: `Contact Us & Free Care Consultation | ${site.name}`,
    description:
      "Schedule a free in-home consultation or speak with a live care coordinator at Pavan Homecare. Compassionate senior care across 10 PA counties.",
    url: `${site.url}/contact-us`,
    type: "website",
    siteName: `${site.name} — ${site.tagline}`,
  },
};

export default function ContactUsPage() {
  return <ContactClient />;
}
