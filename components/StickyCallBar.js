"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone, Heart } from "lucide-react";
import { site } from "@/lib/site";

export default function StickyCallBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show sticky bar after scrolling past 300px
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname && pathname.startsWith("/admin")) return null;
  if (!show) return null;

  return (
    <div className="sc-bar">
      <a href={site.phoneHref} className="sc-btn sc-btn--call">
        <Phone size={16} />
        Call {site.phoneDisplay}
      </a>
      <Link href="/contact-us" className="sc-btn sc-btn--request">
        <Heart size={16} fill="rgba(255,255,255,0.4)" />
        Request Care
      </Link>

      <style dangerouslySetInnerHTML={{ __html: `
        .sc-bar {
          position: fixed;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 990;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          background: rgba(0, 26, 77, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(96, 239, 255, 0.25);
          border-radius: 9999px;
          box-shadow: 0 12px 32px rgba(0, 26, 77, 0.35);
          animation: barSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          width: calc(100% - 2rem);
          max-width: 440px;
        }

        @keyframes barSlideUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }

        .sc-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.7rem 1rem;
          border-radius: 9999px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 13.5px;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .sc-btn--call {
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .sc-btn--call:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          text-decoration: none;
        }

        .sc-btn--request {
          background: #FF7A59;
          color: #FFFFFF;
          box-shadow: 0 4px 14px rgba(255, 122, 89, 0.4);
        }
        .sc-btn--request:hover {
          background: #E86746;
          box-shadow: 0 6px 20px rgba(255, 122, 89, 0.6);
          color: #FFFFFF;
          text-decoration: none;
        }
      ` }} />
    </div>
  );
}
