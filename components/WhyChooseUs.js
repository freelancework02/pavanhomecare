"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  UserCheck, ShieldCheck, Clock, Heart, Home, Users,
} from "lucide-react";

/* ── Animated counter hook ── */
function useCounter(target, duration = 1800, trigger) {
  const [count, setCount] = useState("0");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!trigger || !mounted) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start) + suffix);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration, mounted]);
  return mounted ? count : "0";
}

/* ── Animated stat ── */
function AnimatedStat({ value, label, trigger }) {
  const displayed = useCounter(value, 1600, trigger);
  return (
    <div className="wcu-stat">
      <span className="wcu-stat__val">{displayed}</span>
      <span className="wcu-stat__lbl">{label}</span>
    </div>
  );
}

/* ── Feature row (editorial style — no card) ── */
function FeatureRow({ icon: Icon, title, desc, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="wcu-feature"
    >
      <div className="wcu-feature__icon">
        <Icon size={20} color="#0061FF" />
      </div>
      <div className="wcu-feature__body">
        <h3 className="wcu-feature__title">{title}</h3>
        <p className="wcu-feature__desc">{desc}</p>
      </div>
    </motion.div>
  );
}

const FEATURES = [
  { icon: UserCheck,   title: "Personalized Care Plans",   desc: "Tailored to your loved one's unique schedule, preferences, and needs — not a one-size-fits-all approach." },
  { icon: ShieldCheck, title: "100% Vetted Caregivers",    desc: "Every caregiver is background-checked, licensed, and trained. Your family's safety is our top priority." },
  { icon: Clock,       title: "Reliable & Consistent",     desc: "We show up on time, every time. Dependable care your family can schedule their lives around." },
  { icon: Heart,       title: "Compassion in Every Visit", desc: "We treat every client as family — with genuine warmth, respect, and love-driven care." },
  { icon: Home,        title: "Safety First Approach",     desc: "Proactive home safety assessments, fall prevention, and daily wellness routines built into every plan." },
  { icon: Users,       title: "Locally Owned & Trusted",   desc: "Rooted in Pennsylvania, we know our community — and we're invested in its wellbeing." },
];

const STATS = [
  { value: "500+", label: "Happy Families" },
  { value: "98%",  label: "Satisfaction"  },
  { value: "15+",  label: "Years Care"    },
  { value: "24/7", label: "Support"       },
];

export default function WhyChooseUs() {
  const statsRef  = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section className="wcu-section" id="why-choose-us" aria-labelledby="wcu-heading">
      {/* decorative dots */}
      <div aria-hidden="true" className="wcu-bg-dots" />

      <div className="wcu-container">

        {/* ── SECTION HEADER ── */}
        <div className="wcu-header">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="wcu-eyebrow">
              <span className="wcu-eyebrow__dot" />
              Why Choose Us
            </span>
          </motion.div>
          <motion.h2 id="wcu-heading"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="wcu-h2"
          >
            Why Families Trust{" "}
            <span className="text-brand-gradient">Pavan Homecare</span>
          </motion.h2>
        </div>

        {/* ── MAIN SPLIT LAYOUT ── */}
        <div className="wcu-body">

          {/* LEFT — image + stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="wcu-media"
          >
            {/* Tall image */}
            <div className="wcu-img-wrap">
              <Image
                src="/images/photos/why-choose-us-hands.webp"
                alt="Pavan Homecare caregiver embracing senior client with warmth"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              <div aria-hidden="true" className="wcu-img__overlay" />
            </div>

            {/* Stats row below image */}
            <div ref={statsRef} className="wcu-stats">
              {STATS.map(s => (
                <AnimatedStat key={s.label} value={s.value} label={s.label} trigger={statsInView} />
              ))}
            </div>
          </motion.div>

          {/* RIGHT — editorial feature rows */}
          <div className="wcu-features">

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="wcu-quote"
            >
              <span className="wcu-quote__mark">&ldquo;</span>
              We don&apos;t just provide care — we become family.
            </motion.blockquote>

            {/* Feature rows */}
            <div className="wcu-feature-list">
              {FEATURES.map((f, i) => (
                <FeatureRow key={f.title} {...f} delay={i * 0.08} />
              ))}
            </div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
              className="wcu-trust-badge"
            >
              <div className="wcu-trust-badge__avatars">
                <Image src="/images/reviewer_gloria.webp"   alt="" width={36} height={36} className="wcu-avatar" />
                <Image src="/images/reviewer_reginald.webp" alt="" width={36} height={36} className="wcu-avatar" />
                <Image src="/images/review_gloria_photo.webp" alt="" width={36} height={36} className="wcu-avatar" />
              </div>
              <div className="wcu-trust-badge__text">
                <span className="wcu-trust-badge__primary">Licensed &amp; 100% Vetted</span>
                <span className="wcu-trust-badge__sub">Trusted by 500+ Pennsylvania families</span>
              </div>
              <ShieldCheck size={24} color="#0061FF" className="wcu-trust-badge__icon" />
            </motion.div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ── section ── */
        .wcu-section {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          padding: clamp(4rem, 7vw, 6rem) 0;
          overflow: hidden;
        }
        .wcu-bg-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(0,97,255,0.04) 1.5px, transparent 1.5px);
          background-size: 32px 32px;
        }
        .wcu-container { max-width: 1360px; margin: 0 auto; padding: 0 1.5rem; }

        /* ── header ── */
        .wcu-header { margin-bottom: 3rem; }
        .wcu-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #E8F2FF; color: #001A4D;
          font-weight: 700; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.4rem 1rem; border-radius: 9999px;
          border: 1px solid rgba(0,97,255,0.15);
          margin-bottom: 1rem;
        }
        .wcu-eyebrow__dot { width: 8px; height: 8px; border-radius: 50%; background: #FF7A59; }
        .wcu-h2 {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; line-height: 1.1;
          letter-spacing: -0.03em; color: #001A4D; margin: 0;
        }

        /* ── body layout ── */
        .wcu-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .wcu-body { grid-template-columns: 0.9fr 1.1fr; gap: 5rem; }
        }

        /* ── media column ── */
        .wcu-media { display: flex; flex-direction: column; gap: 1.5rem; }
        .wcu-img-wrap {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          height: clamp(300px, 50vw, 520px);
          box-shadow: 0 24px 60px rgba(0,26,77,0.15);
          border: 4px solid #FFFFFF;
        }
        .wcu-img__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,26,77,0.35) 0%, transparent 50%);
        }

        /* stats */
        .wcu-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: #001A4D;
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0,26,77,0.25);
        }
        .wcu-stat {
          display: flex; flex-direction: column; align-items: center;
          padding: 1.25rem 0.75rem;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .wcu-stat:last-child { border-right: none; }
        .wcu-stat__val {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800; line-height: 1;
          background: linear-gradient(90deg, #FFFFFF, #60EFFF);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          margin-bottom: 0.3rem;
        }
        .wcu-stat__lbl {
          font-size: 11px; color: rgba(255,255,255,0.55);
          font-weight: 500; text-align: center; line-height: 1.3;
        }

        /* ── features column ── */
        .wcu-features { display: flex; flex-direction: column; gap: 0; }

        /* pull quote */
        .wcu-quote {
          position: relative;
          font-family: var(--font-heading);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 700; font-style: italic;
          color: #001A4D;
          line-height: 1.4;
          margin: 0 0 2rem;
          padding-left: 1.5rem;
          border-left: 4px solid transparent;
          border-image: linear-gradient(180deg, #0061FF, #60EFFF) 1;
        }
        .wcu-quote__mark {
          font-size: 4rem; line-height: 0;
          vertical-align: -1.5rem;
          background: linear-gradient(135deg, #0061FF, #60EFFF);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          font-family: Georgia, serif;
          margin-right: 0.15rem;
        }

        /* feature rows */
        .wcu-feature-list { display: flex; flex-direction: column; }
        .wcu-feature {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1.1rem 0;
          border-bottom: 1px solid #DCE7F7;
          transition: background 0.2s;
        }
        .wcu-feature:first-child { border-top: 1px solid #DCE7F7; }
        .wcu-feature:hover { background: #F5F9FF; border-radius: 0.75rem; padding-left: 0.75rem; }
        .wcu-feature__icon {
          width: 42px; height: 42px; border-radius: 0.875rem; flex-shrink: 0;
          background: linear-gradient(135deg, rgba(0,97,255,0.08), rgba(96,239,255,0.12));
          border: 1px solid rgba(0,97,255,0.1);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s, background 0.25s;
        }
        .wcu-feature:hover .wcu-feature__icon {
          transform: scale(1.1);
          background: linear-gradient(135deg, #0061FF, #60EFFF);
        }
        .wcu-feature:hover .wcu-feature__icon svg { color: #FFFFFF !important; }
        .wcu-feature__body { flex: 1; }
        .wcu-feature__title {
          font-family: var(--font-heading);
          font-size: 15px; font-weight: 700; color: #001A4D;
          margin: 0 0 0.2rem; line-height: 1.3;
        }
        .wcu-feature__desc {
          font-size: 13.5px; color: #4A5A73; line-height: 1.55; margin: 0;
        }

        /* trust badge */
        .wcu-trust-badge {
          display: flex; align-items: center; gap: 1rem;
          background: linear-gradient(90deg, #F5F9FF, #E8F2FF);
          border: 1px solid rgba(0,97,255,0.15);
          border-radius: 1.25rem; padding: 1.1rem 1.5rem;
          margin-top: 1.75rem;
          box-shadow: 0 8px 24px rgba(0,97,255,0.07);
        }
        .wcu-trust-badge__avatars { display: flex; }
        .wcu-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          border: 2.5px solid #FFFFFF; object-fit: cover;
          margin-left: -10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .wcu-avatar:first-child { margin-left: 0; }
        .wcu-trust-badge__text { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
        .wcu-trust-badge__primary { font-size: 14px; font-weight: 700; color: #001A4D; }
        .wcu-trust-badge__sub { font-size: 12px; color: #4A5A73; }
        .wcu-trust-badge__icon { flex-shrink: 0; }
      ` }} />
    </section>
  );
}
