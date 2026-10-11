"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home, Users, Brain, BedDouble, ShieldCheck,
  Clock, Plus, ArrowRight, Heart, Sparkles,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay } },
});

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
  {
    id: "personal-care",
    icon: Home,
    title: "Personal Care",
    desc: "Assistance with bathing, grooming, dressing, and daily living — delivered with dignity.",
    href: "/services",
    accent: "#0061FF",
  },
  {
    id: "companionship",
    icon: Heart,
    title: "Companionship",
    desc: "Friendly support, conversation, and social engagement to brighten every day.",
    href: "/services",
    accent: "#FF7A59",
  },
  {
    id: "dementia-care",
    icon: Brain,
    title: "Dementia Care",
    desc: "Specialized, patient-centered care focused on safety, routines, and comfort.",
    href: "/services",
    accent: "#0061FF",
  },
  {
    id: "respite-care",
    icon: ShieldCheck,
    title: "Respite Care",
    desc: "Trusted temporary relief for family caregivers — rest easy knowing your loved one is safe.",
    href: "/services",
    accent: "#0061FF",
  },
  {
    id: "24-hour",
    icon: Clock,
    title: "24-Hour Care",
    desc: "Round-the-clock care tailored to individual needs — always there when it matters most.",
    href: "/services",
    accent: "#60EFFF",
  },
];

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */
function SmallCard({ icon: Icon, title, desc, href, accent, delay = 0 }) {
  return (
    <motion.div variants={fadeUp(delay)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Link href={href} className="ss-card ss-card--small">
        <div className="ss-card__icon-wrap" style={{ "--accent": accent }}>
          <Icon size={20} color={accent} />
        </div>
        <h3 className="ss-card__title">{title}</h3>
        <p className="ss-card__desc">{desc}</p>
        <div className="ss-card__arrow">
          <ArrowRight size={16} />
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="ss-section" aria-labelledby="services-heading">
      {/* top gradient rule */}
      <div aria-hidden="true" className="ss-rule" />

      <div className="ss-container">

        {/* ── HEADER ── */}
        <div className="ss-header">
          <motion.div variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="ss-eyebrow">
              <span className="ss-eyebrow__dot" />
              Our Services
            </span>
          </motion.div>

          <motion.h2 id="services-heading" variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="ss-h2">
            How We Help You Live{" "}
            <span className="text-brand-gradient">Comfortably</span>{" "}
            At Home
          </motion.h2>

          <motion.p variants={fadeUp(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="ss-lead">
            From personal care to round-the-clock support — every service is designed around
            dignity, warmth, and your loved one&apos;s unique needs.
          </motion.p>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="ss-bento">

          {/* ── COL 1: Large dark feature card + small card ── */}
          <div className="ss-bento__col1">

            {/* Hero Feature Card — dark navy */}
            <motion.div variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Link href="/services" className="ss-hero-card">
                {/* gradient border glow */}
                <div aria-hidden="true" className="ss-hero-card__glow" />

                <div className="ss-hero-card__inner">
                  <div className="ss-hero-card__icon">
                    <BedDouble size={28} color="#60EFFF" />
                  </div>
                  <div className="ss-hero-card__badge">
                    <Sparkles size={12} />
                    Most Requested
                  </div>
                  <h3 className="ss-hero-card__title">Live-In Care</h3>
                  <p className="ss-hero-card__desc">
                    24/7 professional support in the comfort of your own home. Continuous, 
                    trusted care that keeps routines, safety, and dignity at the centre.
                  </p>
                  <div className="ss-hero-card__stat">
                    <span className="ss-hero-card__stat-val">24/7</span>
                    <span className="ss-hero-card__stat-lbl">Round-the-clock care</span>
                  </div>
                  <span className="ss-hero-card__cta">
                    Learn More <ArrowRight size={15} />
                  </span>
                </div>

                {/* background image overlay */}
                <div aria-hidden="true" className="ss-hero-card__img-wrap">
                  <Image
                    src="/images/photos/live-in-care-garden.webp"
                    alt="Live-in caregiver"
                    fill
                    sizes="33vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              </Link>
            </motion.div>

            {/* Small card under hero card */}
            <SmallCard {...SERVICES[1]} delay={0.15} />
          </div>

          {/* ── COL 2: Portrait image + 2 small cards ── */}
          <div className="ss-bento__col2">
            {/* Portrait image */}
            <motion.div variants={fadeUp(0.05)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="ss-portrait">
              <Image
                src="/images/photos/caregiver-portrait.webp"
                alt="Pavan Homecare caregiver assisting a senior client"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                style={{ objectFit: "cover" }}
              />
              <div aria-hidden="true" className="ss-portrait__overlay" />
              {/* floating chip */}
              <div className="ss-portrait__chip">
                <Heart size={13} color="#FF7A59" style={{ fill: "#FF7A59" }} />
                Love Driven Care
              </div>
            </motion.div>

            <SmallCard {...SERVICES[2]} delay={0.2} />
            <SmallCard {...SERVICES[3]} delay={0.3} />
          </div>

          {/* ── COL 3: 2 small cards + gradient CTA card ── */}
          <div className="ss-bento__col3">
            <SmallCard {...SERVICES[0]} delay={0.1} />
            <SmallCard {...SERVICES[4]} delay={0.25} />

            {/* Gradient CTA card */}
            <motion.div variants={fadeUp(0.35)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Link href="/services" className="ss-cta-card">
                <div aria-hidden="true" className="ss-cta-card__orb" />
                <span className="ss-cta-card__label">View All Services</span>
                <span className="ss-cta-card__count">8+</span>
                <p className="ss-cta-card__sub">Personalized care options for every need</p>
                <span className="ss-cta-card__btn">
                  Explore All <ArrowRight size={15} />
                </span>
              </Link>
            </motion.div>
          </div>

        </div>{/* /bento */}

        {/* ── BOTTOM CTA ROW ── */}
        <motion.div variants={fadeUp(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="ss-bottom">
          <Link href="/contact-us" className="ss-btn ss-btn--primary btn-shimmer">
            <Heart size={16} className="fill-white/30" />
            Request Free Consultation <ArrowRight size={16} />
          </Link>
          <Link href="/services" className="ss-btn ss-btn--outline">
            View All 8+ Care Services
          </Link>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Section ── */
        .ss-section {
          position: relative;
          width: 100%;
          background: #F5F9FF;
          padding: clamp(4rem,7vw,6rem) 0;
          overflow: hidden;
        }
        .ss-rule {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #0061FF44, transparent);
        }
        .ss-container { max-width: 1360px; margin: 0 auto; padding: 0 1.5rem; }

        /* ── Header ── */
        .ss-header { text-align: center; max-width: 680px; margin: 0 auto 3.5rem; }
        .ss-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #FFFFFF; color: #001A4D;
          font-weight: 700; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.4rem 1rem; border-radius: 9999px;
          border: 1px solid rgba(0,97,255,0.15);
          box-shadow: 0 4px 14px rgba(0,97,255,0.07);
          margin-bottom: 1.25rem;
        }
        .ss-eyebrow__dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #FF7A59;
        }
        .ss-h2 {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #001A4D;
          margin: 0 0 1rem;
        }
        .ss-lead {
          font-size: clamp(1rem, 1.5vw, 1.1rem);
          color: #4A5A73;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Bento Grid ── */
        .ss-bento {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        @media (min-width: 768px) {
          .ss-bento { grid-template-columns: 1fr 1fr; }
          .ss-bento__col1 { grid-row: 1 / 3; }
        }
        @media (min-width: 1100px) {
          .ss-bento { grid-template-columns: 1.15fr 0.9fr 0.95fr; }
          .ss-bento__col1 { grid-row: auto; }
        }

        .ss-bento__col1,
        .ss-bento__col2,
        .ss-bento__col3 {
          display: flex; flex-direction: column; gap: 1.25rem;
        }

        /* ── Small card ── */
        .ss-card--small {
          display: flex; flex-direction: column;
          background: #FFFFFF;
          border: 1px solid #DCE7F7;
          border-radius: 1.25rem;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(11,23,48,0.05);
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          flex: 1;
        }
        .ss-card--small:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,97,255,0.12);
          border-color: rgba(0,97,255,0.35);
          text-decoration: none;
        }
        .ss-card__icon-wrap {
          width: 46px; height: 46px; border-radius: 0.875rem;
          background: linear-gradient(135deg, rgba(0,97,255,0.08), rgba(96,239,255,0.12));
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
          border: 1px solid rgba(0,97,255,0.1);
          transition: transform 0.3s ease;
        }
        .ss-card--small:hover .ss-card__icon-wrap { transform: scale(1.12); }
        .ss-card__title {
          font-family: var(--font-heading);
          font-size: 17px; font-weight: 700; color: #001A4D;
          margin: 0 0 0.5rem; line-height: 1.25;
          transition: color 0.2s;
        }
        .ss-card--small:hover .ss-card__title { color: #0061FF; }
        .ss-card__desc {
          font-size: 13.5px; color: #4A5A73;
          line-height: 1.6; margin: 0 0 1rem; flex: 1;
        }
        .ss-card__arrow {
          display: flex; justify-content: flex-end;
          color: #8A97AC;
          transition: color 0.2s, transform 0.2s;
        }
        .ss-card--small:hover .ss-card__arrow { color: #0061FF; transform: translateX(4px); }

        /* ── Hero dark card ── */
        .ss-hero-card {
          display: flex; flex-direction: column; position: relative;
          border-radius: 1.5rem; overflow: hidden;
          min-height: 380px;
          text-decoration: none;
          transition: transform 0.35s ease;
          background: #001A4D;
          flex: 1;
        }
        .ss-hero-card:hover { transform: translateY(-6px); text-decoration: none; }
        .ss-hero-card__glow {
          position: absolute; inset: -2px; border-radius: 1.625rem;
          background: linear-gradient(135deg, #0061FF, #60EFFF);
          z-index: 0; opacity: 0.4;
          transition: opacity 0.3s;
        }
        .ss-hero-card:hover .ss-hero-card__glow { opacity: 0.7; }
        .ss-hero-card__inner {
          position: relative; z-index: 2;
          background: #001A4D;
          border-radius: 1.375rem;
          margin: 2px;
          padding: 1.75rem;
          display: flex; flex-direction: column; flex: 1;
          min-height: 376px;
        }
        .ss-hero-card__img-wrap {
          position: absolute; inset: 0; z-index: 0; border-radius: inherit;
          overflow: hidden; opacity: 0.12;
          transition: opacity 0.4s;
        }
        .ss-hero-card:hover .ss-hero-card__img-wrap { opacity: 0.2; }
        .ss-hero-card__icon {
          width: 52px; height: 52px; border-radius: 1rem;
          background: rgba(96,239,255,0.1);
          border: 1px solid rgba(96,239,255,0.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .ss-hero-card__badge {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-size: 11px; font-weight: 700;
          color: #FF7A59; text-transform: uppercase; letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
        }
        .ss-hero-card__title {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 800; color: #FFFFFF;
          margin: 0 0 0.75rem; line-height: 1.1;
        }
        .ss-hero-card__desc {
          font-size: 14px; color: rgba(255,255,255,0.7);
          line-height: 1.65; margin: 0 0 1.5rem; flex: 1;
        }
        .ss-hero-card__stat {
          display: flex; flex-direction: column;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 1rem; margin-bottom: 1.25rem;
        }
        .ss-hero-card__stat-val {
          font-family: var(--font-heading);
          font-size: 2.2rem; font-weight: 800;
          background: linear-gradient(90deg, #FFFFFF, #60EFFF);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          line-height: 1;
        }
        .ss-hero-card__stat-lbl {
          font-size: 12px; color: rgba(255,255,255,0.5);
          font-weight: 500; margin-top: 0.25rem;
        }
        .ss-hero-card__cta {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: linear-gradient(90deg, #0061FF, #60EFFF);
          color: #FFFFFF; font-weight: 700; font-size: 14px;
          padding: 0.65rem 1.35rem; border-radius: 9999px;
          width: fit-content;
          transition: box-shadow 0.3s;
        }
        .ss-hero-card:hover .ss-hero-card__cta { box-shadow: 0 8px 24px rgba(0,97,255,0.45); }

        /* ── Portrait ── */
        .ss-portrait {
          position: relative; border-radius: 1.25rem; overflow: hidden;
          min-height: 220px; flex: 1;
        }
        .ss-portrait__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,26,77,0.6), transparent 60%);
        }
        .ss-portrait__chip {
          position: absolute; bottom: 1rem; left: 1rem;
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(255,255,255,0.93);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.7);
          border-radius: 9999px; padding: 0.4rem 0.9rem;
          font-size: 12px; font-weight: 700; color: #001A4D;
          box-shadow: 0 8px 20px rgba(0,26,77,0.2);
        }

        /* ── Gradient CTA card ── */
        .ss-cta-card {
          display: flex; flex-direction: column; align-items: flex-start;
          position: relative; overflow: hidden;
          border-radius: 1.25rem;
          padding: 1.75rem;
          background: linear-gradient(135deg, #001A4D 0%, #0061FF 60%, #60EFFF 100%);
          text-decoration: none;
          min-height: 200px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 16px 40px rgba(0,97,255,0.28);
        }
        .ss-cta-card:hover { transform: translateY(-6px); box-shadow: 0 24px 50px rgba(0,97,255,0.4); text-decoration: none; }
        .ss-cta-card__orb {
          position: absolute; top: -40%; right: -20%;
          width: 200px; height: 200px; border-radius: 50%;
          background: rgba(255,255,255,0.06); pointer-events: none;
        }
        .ss-cta-card__label {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.65);
          margin-bottom: 0.5rem;
        }
        .ss-cta-card__count {
          font-family: var(--font-heading);
          font-size: 3.5rem; font-weight: 800; line-height: 1;
          color: #FFFFFF; margin-bottom: 0.25rem;
        }
        .ss-cta-card__sub {
          font-size: 13px; color: rgba(255,255,255,0.75);
          line-height: 1.5; margin: 0 0 1.25rem; flex: 1;
        }
        .ss-cta-card__btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 9999px; padding: 0.5rem 1.1rem;
          color: #FFFFFF; font-size: 13px; font-weight: 700;
          backdrop-filter: blur(8px);
          transition: background 0.2s;
        }
        .ss-cta-card:hover .ss-cta-card__btn { background: rgba(255,255,255,0.25); }

        /* ── Bottom CTA ── */
        .ss-bottom {
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: center; gap: 1rem;
        }
        .ss-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: var(--font-heading); font-weight: 700; font-size: 15px;
          padding: 0.85rem 2rem; border-radius: 9999px;
          text-decoration: none; transition: transform 0.25s, box-shadow 0.25s;
          white-space: nowrap;
        }
        .ss-btn:hover { transform: translateY(-2px); text-decoration: none; }
        .ss-btn--primary {
          background: #FF7A59;
          color: #FFFFFF;
          box-shadow: 0 10px 25px rgba(255, 122, 89, 0.35);
        }
        .ss-btn--primary:hover {
          background: #E86746;
          box-shadow: 0 15px 30px rgba(255, 122, 89, 0.5);
          color: #FFFFFF;
        }
        .ss-btn--outline {
          background: #FFFFFF; color: #001A4D;
          border: 1.5px solid #DCE7F7;
          box-shadow: 0 4px 14px rgba(0, 26, 77, 0.04);
        }
        .ss-btn--outline:hover {
          border-color: #0061FF; color: #0061FF;
          background: #F5F9FF;
        }
      ` }} />
    </section>
  );
}
