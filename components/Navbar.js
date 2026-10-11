"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin, Phone, ChevronDown, Menu, X, ArrowRight, Heart, User, Navigation, Accessibility,
} from "lucide-react";
import Logo from "./Logo";
import { countiesData } from "@/lib/countiesData";
import { site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileAreasOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header id="site-header" className="nb-header">
      {/* ── TOP BAR (EXACT REF: full_header.png) ── */}
      <div className="nb-topbar">
        <div className="nb-topbar__inner">
          <div className="nb-topbar__location">
            <span className="nb-topbar__pin">
              <MapPin size={13} color="#0061FF" fill="rgba(0,97,255,0.15)" />
            </span>
            <span className="nb-topbar__text">
              Serving Philadelphia, Bucks, Montgomery, Delaware, Chester &amp; Surrounding PA Counties
            </span>
          </div>

          <div className="nb-topbar__right">
            <a href={site.phoneHref} className="nb-topbar__link">
              <Phone size={13} color="#0061FF" />
              <span>{site.phoneDisplay}</span>
            </a>
            <span className="nb-topbar__divider" />
            <Link href="/contact-us" className="nb-topbar__link">
              <Heart size={13} color="#0061FF" />
              <span>Careers</span>
            </Link>
            <span className="nb-topbar__divider" />
            <Link href="/contact-us" className="nb-topbar__link">
              <User size={13} color="#0061FF" />
              <span>Client Portal</span>
            </Link>
            <span className="nb-topbar__divider" />
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("phc_toggle_accessibility_menu"));
              }}
              className="nb-topbar__link bg-transparent border-0 cursor-pointer text-left"
              aria-label="Open ADA Accessibility Menu (Alt + A)"
              title="Open ADA Accessibility Menu (Alt + A)"
            >
              <Accessibility size={13} color="#0061FF" />
              <span>Accessibility</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div className={`nb-main ${scrolled ? "nb-main--scrolled" : ""}`}>
        <div className="nb-main__inner">
          {/* Logo */}
          <Link href="/" className="nb-logo" aria-label="Pavan Homecare">
            <Logo variant="color" showTagline={false} height="7.5rem" />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="nb-nav">
            <Link
              href="/"
              className={`nb-link ${pathname === "/" ? "nb-link--active" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`nb-link ${pathname === "/about" ? "nb-link--active" : ""}`}
            >
              About Us
            </Link>

            <Link
              href="/services"
              className={`nb-link ${pathname.startsWith("/services") ? "nb-link--active" : ""}`}
            >
              Services
            </Link>

            {/* Areas Dropdown */}
            <div
              className="nb-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/areas-we-serve"
                className={`nb-link ${pathname.startsWith("/areas-we-serve") ? "nb-link--active" : ""}`}
                aria-expanded={dropdownOpen}
              >
                Area we serve
                <ChevronDown size={14} className={`nb-chevron ${dropdownOpen ? "nb-chevron--open" : ""}`} />
              </Link>
              <div className={`nb-dropdown__menu ${dropdownOpen ? "nb-dropdown__menu--open" : ""}`}>
                <div className="nb-dropdown__panel">
                  <Link href="/areas-we-serve" className="nb-dropdown__top">
                    <span className="nb-dropdown__topIcon">
                      <Navigation size={16} />
                    </span>
                    <span>Areas We Serve</span>
                    <ArrowRight size={14} className="nb-dropdown__topArrow" />
                  </Link>
                  <div className="nb-dropdown__divider" />
                  <div className="nb-dropdown__grid">
                    {Object.values(countiesData).map((c) => (
                      <Link key={c.slug} href={`/areas-we-serve/${c.slug}`} className="nb-dropdown__item">
                        <span className="nb-dropdown__pin"><MapPin size={13} /></span>
                        <span>{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/blog"
              className={`nb-link ${pathname.startsWith("/blog") ? "nb-link--active" : ""}`}
            >
              Blog
            </Link>

            <Link
              href="/contact-us"
              className={`nb-link ${pathname === "/contact-us" ? "nb-link--active" : ""}`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="nb-ctas">
            <a href={site.phoneHref} className="nb-phone-pill">
              <span className="nb-phone-icon">
                <Phone size={13} color="#fff" />
              </span>
              <span className="nb-phone-text">
                <span className="nb-phone-label">Call Anytime</span>
                <span className="nb-phone-number">{site.phoneDisplay}</span>
              </span>
            </a>

            <Link href="/contact-us" id="navbar-request-care-btn" className="nb-cta btn-shimmer">
              Request Care
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="nb-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE OVERLAY ── */}
      {mobileOpen && (
        <div role="dialog" aria-modal="true" className="nb-mobile">
          <button onClick={() => setMobileOpen(false)} className="nb-mobile__close">
            <X size={24} />
          </button>
          <div className="nb-mobile__logo">
            <Logo variant="white" height="3.5rem" />
          </div>
          <nav className="nb-mobile__nav">
            <Link href="/" onClick={() => setMobileOpen(false)} className="nb-mobile__link">Home</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="nb-mobile__link">About Us</Link>
            <Link href="/services" onClick={() => setMobileOpen(false)} className="nb-mobile__link">Services</Link>
            <div className="nb-mobile__areas">
              <button
                type="button"
                className="nb-mobile__link nb-mobile__areasToggle"
                onClick={() => setMobileAreasOpen((open) => !open)}
                aria-expanded={mobileAreasOpen}
              >
                <span>Areas We Serve</span>
                <ChevronDown size={18} className={`nb-mobile__chevron ${mobileAreasOpen ? "nb-mobile__chevron--open" : ""}`} />
              </button>
              {mobileAreasOpen && (
                <div className="nb-mobile__submenu">
                  <Link href="/areas-we-serve" onClick={() => setMobileOpen(false)} className="nb-mobile__subLink">Areas We Serve</Link>
                  {Object.values(countiesData).map((c) => (
                    <Link key={c.slug} href={`/areas-we-serve/${c.slug}`} onClick={() => setMobileOpen(false)} className="nb-mobile__subLink">
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="nb-mobile__link">Blog</Link>
            <Link href="/contact-us" onClick={() => setMobileOpen(false)} className="nb-mobile__link">Contact Us</Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new CustomEvent("phc_toggle_accessibility_menu"));
              }}
              className="nb-mobile__link flex items-center justify-between text-left w-full bg-transparent border-0 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Accessibility size={18} className="text-[#0061FF]" />
                <span>Accessibility Menu (Alt+A)</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#E8F2FF] text-[#0061FF] rounded-full">ADA</span>
            </button>
          </nav>
          <div className="nb-mobile__ctas">
            <a href={site.phoneHref} className="nb-mobile__call">
              <Phone size={18} color="#60EFFF" />
              Call {site.phoneDisplay}
            </a>
            <Link href="/contact-us" onClick={() => setMobileOpen(false)} className="nb-mobile__request btn-shimmer">
              Request Care <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .nb-header { position: sticky; top: 0; z-index: 500; width: 100%; }

        /* Top bar */
        .nb-topbar {
          width: 100%;
          background: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
        }
        .nb-topbar__inner {
          max-width: 1360px; margin: 0 auto;
          padding: 0.4rem 1.5rem;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .nb-topbar__location {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 12.5px; font-weight: 500; color: #334155;
        }
        .nb-topbar__pin { display: flex; align-items: center; }
        .nb-topbar__right { display: flex; align-items: center; gap: 0.75rem; }
        .nb-topbar__link {
          display: flex; align-items: center; gap: 0.35rem;
          font-size: 12.5px; font-weight: 600; color: #334155;
          text-decoration: none; transition: color 0.2s;
        }
        .nb-topbar__link:hover { color: #0061FF; text-decoration: none; }
        .nb-topbar__divider { width: 1px; height: 12px; background: #CBD5E1; }

        /* Main bar */
        .nb-main {
          width: 100%;
          background: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          box-shadow: 0 4px 20px rgba(0, 26, 77, 0.03);
          padding: 0.35rem 0;
          transition: all 0.3s ease;
        }
        .nb-main--scrolled {
          box-shadow: 0 10px 30px rgba(0, 26, 77, 0.08);
          padding: 0.25rem 0;
        }
        .nb-main__inner {
          max-width: 1360px; margin: 0 auto; padding: 0 1.5rem;
          display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
        }

        .nb-logo { flex-shrink: 0; display: flex; align-items: center; text-decoration: none; }

        /* Desktop Nav */
        .nb-nav { display: flex; align-items: center; gap: clamp(1.15rem, 1.9vw, 2.2rem); }
        .nb-link {
          position: relative;
          display: inline-flex; align-items: center; gap: 0.25rem;
          padding-bottom: 4px;
          font-family: var(--font-heading);
          font-size: 15px; font-weight: 600; color: #1E293B;
          text-decoration: none; transition: color 0.2s;
        }
        .nb-link:hover { color: #0061FF; text-decoration: none; }
        .nb-link--active {
          color: #0061FF; font-weight: 700;
        }
        .nb-link--active::after {
          content: ''; position: absolute; bottom: -8px; left: 0; right: 0;
          height: 3px; background: #0061FF; border-radius: 9999px;
        }

        .nb-chevron { transition: transform 0.2s; color: #64748B; }
        .nb-chevron--open { transform: rotate(180deg); }

        .nb-dropdown { position: relative; padding: 0.9rem 0; margin: -0.9rem 0; }
        .nb-dropdown__menu {
          position: absolute; top: 100%; left: 50%;
          transform: translateX(-50%) translateY(-8px);
          width: min(640px, calc(100vw - 48px));
          z-index: 100; opacity: 0; visibility: hidden; pointer-events: none;
          padding-top: 0.8rem;
          transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;
        }
        .nb-dropdown__menu--open { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0); }
        .nb-dropdown__panel {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%);
          border: 1px solid rgba(0,97,255,0.14);
          border-radius: 18px;
          box-shadow: 0 24px 60px rgba(0,26,77,0.16);
          padding: 0.8rem;
        }
        .nb-dropdown__panel::before {
          content: '';
          position: absolute; inset: 0 0 auto 0; height: 4px;
          background: linear-gradient(90deg, #0061FF 0%, #60EFFF 100%);
        }
        .nb-dropdown__top {
          position: relative;
          display: flex; align-items: center; gap: 0.65rem;
          padding: 0.75rem 0.85rem;
          font-size: 14px; font-weight: 800; color: #001A4D; text-decoration: none;
          border-radius: 12px;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .nb-dropdown__top:hover { background: #EFF6FF; color: #0061FF; text-decoration: none; }
        .nb-dropdown__topIcon {
          width: 30px; height: 30px; border-radius: 10px;
          display: inline-flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #0061FF, #60EFFF);
          color: #FFFFFF; flex-shrink: 0;
        }
        .nb-dropdown__topArrow { margin-left: auto; color: #0061FF; }
        .nb-dropdown__divider { height: 1px; background: #E2E8F0; margin: 0.35rem 0.15rem 0.55rem; }
        .nb-dropdown__grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.35rem;
        }
        .nb-dropdown__item {
          display: flex; align-items: center; gap: 0.45rem;
          min-height: 42px;
          padding: 0.55rem 0.65rem;
          font-size: 13px; font-weight: 650; color: #334155; text-decoration: none;
          border: 1px solid transparent;
          border-radius: 12px;
          transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
        }
        .nb-dropdown__item:hover {
          background: #FFFFFF;
          border-color: rgba(0,97,255,0.18);
          color: #0061FF;
          text-decoration: none;
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(0,97,255,0.08);
        }
        .nb-dropdown__pin {
          width: 24px; height: 24px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          background: #EAF2FF; color: #0061FF; flex-shrink: 0;
        }

        /* CTAs */
        .nb-ctas { display: flex; align-items: center; gap: 0.85rem; flex-shrink: 0; }
        .nb-phone-pill {
          display: flex; align-items: center; gap: 0.65rem;
          background: #F8FAFC; border: 1px solid #E2E8F0;
          padding: 0.45rem 0.95rem; border-radius: 9999px;
          text-decoration: none; transition: all 0.2s;
        }
        .nb-phone-pill:hover { border-color: #0061FF; background: #EFF5FF; text-decoration: none; }
        .nb-phone-icon {
          width: 28px; height: 28px; border-radius: 50%;
          background: #0061FF; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .nb-phone-text { display: flex; flex-direction: column; line-height: 1.15; }
        .nb-phone-label { font-size: 10px; color: #64748B; font-weight: 500; }
        .nb-phone-number { font-size: 13px; font-weight: 700; color: #0F172A; }

        .nb-cta {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #FF7A59;
          color: #FFFFFF; font-family: var(--font-heading);
          font-weight: 700; font-size: 14.5px;
          padding: 0.65rem 1.4rem; border-radius: 9999px;
          box-shadow: 0 6px 20px rgba(255,122,89,0.35);
          text-decoration: none; transition: all 0.2s;
        }
        .nb-cta:hover { background: #E86746; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255,122,89,0.5); color: #FFFFFF; text-decoration: none; }

        .nb-hamburger {
          display: none; padding: 0.5rem; border-radius: 0.5rem;
          border: 1px solid #CBD5E1; background: transparent; cursor: pointer; color: #0F172A;
        }

        /* Mobile */
        .nb-mobile {
          position: fixed; inset: 0; background: rgba(0, 26, 77, 0.97);
          backdrop-filter: blur(20px); z-index: 900;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 2rem;
          overflow-y: auto;
        }
        .nb-mobile__close { position: absolute; top: 1.5rem; right: 1.5rem; background: rgba(255,255,255,0.1); border: none; border-radius: 0.5rem; padding: 0.5rem; color: #FFF; cursor: pointer; }
        .nb-mobile__logo { margin-bottom: 2.5rem; }
        .nb-mobile__nav { display: flex; flex-direction: column; gap: 0.5rem; width: 100%; max-width: 340px; text-align: center; }
        .nb-mobile__link {
          padding: 0.85rem; font-size: 1.2rem; font-weight: 600; color: #FFF; text-decoration: none;
          border-radius: 14px;
        }
        .nb-mobile__areas { width: 100%; }
        .nb-mobile__areasToggle {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 0.45rem;
          border: 1px solid rgba(96,239,255,0.22);
          border-radius: 14px;
          padding: 0.85rem; font-size: 1.15rem; font-weight: 600; color: #FFF;
          background: rgba(255,255,255,0.06);
          cursor: pointer;
        }
        .nb-mobile__chevron { transition: transform 0.18s ease; }
        .nb-mobile__chevron--open { transform: rotate(180deg); }
        .nb-mobile__submenu {
          margin-top: 0.5rem;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.4rem;
          text-align: left;
          background: rgba(0, 15, 45, 0.7);
          border: 1px solid rgba(96,239,255,0.18);
          border-radius: 14px;
          padding: 0.55rem;
        }
        .nb-mobile__subLink {
          display: block;
          padding: 0.55rem 0.65rem;
          border-radius: 9px;
          color: #E2E8F0;
          font-size: 12.5px;
          font-weight: 650;
          line-height: 1.15;
          text-decoration: none;
        }
        .nb-mobile__subLink:hover { background: rgba(96,239,255,0.16); color: #FFFFFF; text-decoration: none; }
        .nb-mobile__ctas { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; max-width: 300px; margin-top: 2rem; }
        .nb-mobile__call { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.9rem; background: rgba(255,255,255,0.1); border-radius: 9999px; color: #FFF; font-weight: 600; text-decoration: none; }
        .nb-mobile__request { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.9rem; background: #FF7A59; border-radius: 9999px; color: #FFF; font-weight: 700; text-decoration: none; box-shadow: 0 6px 20px rgba(255,122,89,0.35); }

        @media (max-width: 1023px) {
          .nb-nav, .nb-ctas { display: none !important; }
          .nb-hamburger { display: flex !important; }
        }
        @media (max-width: 1180px) and (min-width: 1024px) {
          .nb-main__inner { gap: 1rem; }
          .nb-phone-pill { display: none; }
          .nb-dropdown__menu { left: auto; right: -5.5rem; transform: translateY(-8px); }
          .nb-dropdown__menu--open { transform: translateY(0); }
        }
        @media (max-width: 639px) {
          .nb-topbar__location { font-size: 11px; }
          .nb-topbar__right { display: none; }
          .nb-main__inner { padding: 0 1rem; }
          .nb-mobile { justify-content: flex-start; padding: 5rem 1.1rem 1.5rem; }
          .nb-mobile__logo { margin-bottom: 1.5rem; }
          .nb-mobile__nav { max-width: 100%; }
          .nb-mobile__link { font-size: 1.05rem; padding: 0.72rem; }
          .nb-mobile__submenu { grid-template-columns: 1fr; }
        }
      ` }} />
    </header>
  );
}
