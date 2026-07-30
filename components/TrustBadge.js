"use client";

import { ShieldCheck, UserCheck, Headphones } from "lucide-react";

const TRUST_ITEMS = [
  {
    id: "licensed",
    icon: <ShieldCheck size={20} className="text-[#0061FF]" />,
    title: "Licensed & Insured",
    desc: "Your safety is our priority",
  },
  {
    id: "background",
    icon: <UserCheck size={20} className="text-[#0061FF]" />,
    title: "Background Checked",
    desc: "Caregivers you can trust",
  },
  {
    id: "support",
    icon: <Headphones size={20} className="text-[#0061FF]" />,
    title: "24/7 Support",
    desc: "We're here whenever you need us",
  },
];

export default function TrustBadge() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#DCE7F7] mt-6">
      {TRUST_ITEMS.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E8F2FF] flex items-center justify-center shrink-0">
            {item.icon}
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#001A4D] leading-snug">{item.title}</h4>
            <p className="text-[12px] text-[#4A5A73] leading-tight">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
