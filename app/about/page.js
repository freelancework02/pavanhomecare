import AboutClient from "@/components/AboutClient";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Pavan Homecare's mission, values, licensing, and professional caregiver protocols serving Pennsylvania families with love-driven care.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
