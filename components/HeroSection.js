"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Heart, Star, ShieldCheck, UserCheck, Clock,
  Home as HomeIcon, Users, CheckCircle2,
} from "lucide-react";
import { site } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export default function HeroSection() {
  return (
    <section className="hs-section" aria-label="Hero">
      {/* Soft background ambient gradient */}
      <div aria-hidden="true" className="hs-bg-ambient" />

      <div className="hs-container">
        {/* ── MAIN 2-COL GRID ── */}
        <div className="hs-grid">
          
          {/* LEFT CONTENT */}
          <motion.div initial="hidden" animate="visible" className="hs-left">
            {/* Eyebrow Chip */}
            <motion.div variants={fadeUp} custom={0.05}>
              <span className="hs-eyebrow">
                <ShieldCheck size={15} className="text-[#0061FF]" />
                Trusted In-Home Care You Can Rely On
              </span>
            </motion.div>

            {/* H1 Headline */}
            <motion.h1 variants={fadeUp} custom={0.15} className="hs-h1">
              Compassionate<br />
              In-Home Senior Care<br />
              <span className="hs-gradient-text">In Bucks, Philly</span><br />
              <span className="hs-gradient-text">&amp; Pennsylvania</span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={fadeUp} custom={0.25} className="hs-desc">
              Pavan Homecare provides licensed companion care, personal hygiene support, 24-hour live-in care, and Medicaid waiver home care across Bucks County, Philadelphia, Montgomery, and 9 PA counties.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} custom={0.35} className="hs-ctas">
              <Link href="/contact-us" id="hero-request-care-btn" className="hs-btn-primary btn-shimmer">
                <Heart size={17} className="fill-white/30" />
                Request Care
                <ArrowRight size={17} />
              </Link>

              <a href={site.phoneHref} id="hero-call-btn" className="hs-btn-phone">
                <span className="hs-phone-circle">
                  <Phone size={14} color="#FFF" />
                </span>
                <span className="hs-phone-text">
                  <span className="hs-phone-label">Call Now</span>
                  <span className="hs-phone-num">{site.phoneDisplay}</span>
                </span>
              </a>
            </motion.div>

            {/* 3 Trust Items Row */}
            <motion.div variants={fadeUp} custom={0.45} className="hs-trust-row">
              <div className="hs-trust-item">
                <div className="hs-trust-icon">
                  <ShieldCheck size={20} color="#0061FF" />
                </div>
                <div>
                  <div className="hs-trust-title">Licensed &amp; Insured</div>
                  <div className="hs-trust-sub">Your safety is our priority</div>
                </div>
              </div>

              <div className="hs-trust-item">
                <div className="hs-trust-icon">
                  <UserCheck size={20} color="#0061FF" />
                </div>
                <div>
                  <div className="hs-trust-title">Background Checked</div>
                  <div className="hs-trust-sub">Caregivers you can trust</div>
                </div>
              </div>

              <div className="hs-trust-item">
                <div className="hs-trust-icon">
                  <Clock size={20} color="#0061FF" />
                </div>
                <div>
                  <div className="hs-trust-title">24/7 Support</div>
                  <div className="hs-trust-sub">We&apos;re here whenever you need us</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT MEDIA (ORGANIC BLOB + FLOATING CARDS) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hs-right"
          >
            {/* Background Dot Matrix */}
            <div aria-hidden="true" className="hs-dot-matrix" />

            {/* Background Organic Liquid Blob Shape */}
            <div aria-hidden="true" className="hs-blob-bg" />

            {/* Organic Oval Image Container */}
            <div className="hs-photo-wrapper">
              <Image
                src="/images/hero_right_image_card.webp"
                alt="Pavan Homecare caregiver providing compassionate support to senior lady at home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="hs-photo-img"
              />
            </div>
          </motion.div>

        </div>{/* /hs-grid */}

        {/* ── BOTTOM FLOATING FEATURE STRIP (EXACT MATCH TO REF) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="hs-banner"
        >
          <div className="hs-banner-grid">
            
            {/* Feature 1 */}
            <div className="hs-banner-item">
              <div className="hs-banner-icon hs-banner-icon--blue">
                <HomeIcon size={20} color="#0061FF" />
              </div>
              <div>
                <h4 className="hs-banner-title">Stay at Home</h4>
                <p className="hs-banner-desc">Stay safe and comfortable in the place you love.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="hs-banner-item">
              <div className="hs-banner-icon hs-banner-icon--pink">
                <Heart size={20} color="#FF7A59" />
              </div>
              <div>
                <h4 className="hs-banner-title">Compassion First</h4>
                <p className="hs-banner-desc">Every visit centered on dignity and kindness.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="hs-banner-item">
              <div className="hs-banner-icon hs-banner-icon--green">
                <Users size={20} color="#10B981" />
              </div>
              <div>
                <h4 className="hs-banner-title">Personalized Care</h4>
                <p className="hs-banner-desc">Plans designed around your needs and goals.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="hs-banner-item">
              <div className="hs-banner-icon hs-banner-icon--purple">
                <ShieldCheck size={20} color="#8B5CF6" />
              </div>
              <div>
                <h4 className="hs-banner-title">Safety &amp; Trust</h4>
                <p className="hs-banner-desc">Licensed, insured, and committed to excellence.</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>{/* /hs-container */}

      <style dangerouslySetInnerHTML={{ __html: `
        .hs-section {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          padding: clamp(3.5rem, 6vw, 5.5rem) 0 clamp(4rem, 6vw, 5rem);
          overflow: hidden;
        }

        .hs-bg-ambient {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 75% 20%, rgba(96, 239, 255, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 15% 80%, rgba(0, 97, 255, 0.05) 0%, transparent 60%);
        }

        .hs-container {
          max-width: 1360px; margin: 0 auto;
          padding: 0 1.5rem; position: relative; z-index: 10;
        }

        .hs-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 3.5rem; align-items: center;
          margin-bottom: 4rem;
        }
        @media (min-width: 1024px) {
          .hs-grid { grid-template-columns: 1.05fr 0.95fr; gap: 4.5rem; }
        }

        /* LEFT CONTENT */
        .hs-left { display: flex; flex-direction: column; }

        .hs-eyebrow {
          display: inline-flex; align-items: center; gap: 0.45rem;
          background: #EFF6FF; border: 1px solid rgba(0, 97, 255, 0.2);
          color: #0061FF; font-weight: 700; font-size: 13px;
          padding: 0.45rem 1.1rem; border-radius: 9999px;
          margin-bottom: 1.5rem; width: fit-content;
        }

        .hs-h1 {
          font-family: var(--font-heading);
          font-size: clamp(2.8rem, 5.2vw, 4.4rem);
          font-weight: 800; line-height: 1.08;
          letter-spacing: -0.03em; color: #001A4D;
          margin: 0 0 1.5rem;
        }
        .hs-gradient-text {
          background: linear-gradient(90deg, #0061FF 0%, #60EFFF 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        .hs-desc {
          font-size: clamp(1rem, 1.4vw, 1.1rem);
          color: #4A5A73; line-height: 1.7;
          margin: 0 0 2.25rem; max-width: 540px;
        }

        /* CTAs */
        .hs-ctas { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem; }

        .hs-btn-primary {
          display: inline-flex; align-items: center; gap: 0.65rem;
          background: #FF7A59;
          color: #FFFFFF; font-family: var(--font-heading);
          font-weight: 700; font-size: 1rem;
          padding: 0.95rem 2.2rem; border-radius: 9999px;
          box-shadow: 0 10px 25px rgba(255, 122, 89, 0.35);
          text-decoration: none; transition: all 0.25s ease;
        }
        .hs-btn-primary:hover {
          background: #E86746;
          transform: translateY(-2px); box-shadow: 0 15px 30px rgba(255, 122, 89, 0.5);
          color: #FFFFFF; text-decoration: none;
        }

        .hs-btn-phone {
          display: inline-flex; align-items: center; gap: 0.75rem;
          background: #FFFFFF; border: 1px solid #E2E8F0;
          padding: 0.6rem 1.4rem; border-radius: 9999px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
          text-decoration: none; transition: all 0.25s ease;
        }
        .hs-btn-phone:hover {
          border-color: #0061FF; box-shadow: 0 8px 24px rgba(0, 97, 255, 0.12);
          transform: translateY(-2px); text-decoration: none;
        }
        .hs-phone-circle {
          width: 32px; height: 32px; border-radius: 50%;
          background: #0061FF; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .hs-phone-text { display: flex; flex-direction: column; line-height: 1.15; }
        .hs-phone-label { font-size: 11px; color: #64748B; font-weight: 600; }
        .hs-phone-num { font-size: 14.5px; font-weight: 800; color: #0F172A; }

        /* Trust Row */
        .hs-trust-row {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1.25rem; padding-top: 1rem; border-top: 1px solid #F1F5F9;
        }
        .hs-trust-item { display: flex; align-items: center; gap: 0.75rem; }
        .hs-trust-icon {
          width: 40px; height: 40px; border-radius: 0.75rem;
          background: #EFF6FF; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; border: 1px solid rgba(0, 97, 255, 0.12);
        }
        .hs-trust-title { font-size: 13px; font-weight: 700; color: #0F172A; line-height: 1.2; }
        .hs-trust-sub { font-size: 11.5px; color: #64748B; margin-top: 0.1rem; }

        /* RIGHT MEDIA */
        .hs-right {
          position: relative; width: 100%; max-width: 620px; margin: 0 auto;
        }

        /* Dot matrix */
        .hs-dot-matrix {
          position: absolute; top: -1.5rem; right: -1rem;
          width: 120px; height: 120px; pointer-events: none;
          background-image: radial-gradient(#0061FF 2px, transparent 2px);
          background-size: 16px 16px; opacity: 0.25; z-index: 1;
        }

        /* Organic Blob BG */
        .hs-blob-bg {
          position: absolute; inset: -1.5rem -1rem -1rem -2rem;
          background: linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 60%, #E0F2FE 100%);
          border-radius: 42% 58% 65% 35% / 45% 45% 55% 55%;
          z-index: 0; filter: blur(4px); opacity: 0.9;
        }

        /* Organic Photo Mask Wrapper */
        .hs-photo-wrapper {
          position: relative; z-index: 2;
          width: 100%; height: clamp(380px, 52vw, 560px);
          border-radius: 40% 60% 55% 45% / 40% 50% 50% 60%;
          overflow: hidden; border: 6px solid #FFFFFF;
          box-shadow: 0 24px 60px rgba(0, 26, 77, 0.14);
          background: #EFF6FF;
        }
        .hs-photo-img { object-fit: cover; object-position: center top; }

        /* Rating pill overlay */
        .hs-rating-pill {
          position: absolute; bottom: 1.25rem; left: 50%; transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 9999px; padding: 0.45rem 1.25rem;
          display: flex; align-items: center; gap: 0.85rem;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.15);
          white-space: nowrap; z-index: 10;
        }
        .hs-avatars { display: flex; }
        .hs-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          border: 2px solid #FFFFFF; margin-left: -8px; object-fit: cover;
        }
        .hs-avatar:first-child { margin-left: 0; }
        .hs-rating-info { display: flex; flex-direction: column; line-height: 1.2; }
        .hs-rating-trust { font-size: 11px; font-weight: 700; color: #0F172A; }
        .hs-rating-stars { display: flex; align-items: center; gap: 0.2rem; }
        .hs-rating-score { font-size: 11px; font-weight: 800; color: #0F172A; margin-left: 0.2rem; }

        /* 3 Right Floating Cards */
        .hs-floating-cards {
          position: absolute; top: 15%; right: -1.5rem;
          display: flex; flex-direction: column; gap: 0.85rem;
          z-index: 20; pointer-events: none;
        }
        @media (max-width: 639px) { .hs-floating-cards { display: none; } }

        .hs-float-card {
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          border: 1px solid #E2E8F0;
          border-radius: 1.1rem; padding: 0.75rem 1.1rem;
          display: flex; align-items: center; gap: 0.75rem;
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1);
          min-width: 210px;
        }
        .hs-float-icon {
          width: 36px; height: 36px; border-radius: 0.75rem;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .hs-float-icon--blue { background: #EFF6FF; }
        .hs-float-icon--cyan { background: #E0F2FE; }
        .hs-float-icon--purple { background: #F3E8FF; }

        .hs-float-title { font-size: 13px; font-weight: 800; color: #0F172A; margin: 0; line-height: 1.2; }
        .hs-float-desc { font-size: 11.5px; color: #64748B; margin: 0; line-height: 1.3; }

        /* BOTTOM FEATURE STRIP BANNER */
        .hs-banner {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 1.5rem;
          padding: 1.5rem 2rem;
          box-shadow: 0 16px 40px rgba(0, 26, 77, 0.07);
        }
        .hs-banner-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .hs-banner-item {
          display: flex; align-items: center; gap: 1rem;
        }
        .hs-banner-icon {
          width: 44px; height: 44px; border-radius: 1rem;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .hs-banner-icon--blue { background: #EFF6FF; }
        .hs-banner-icon--pink { background: #FFF1F2; }
        .hs-banner-icon--green { background: #ECFDF5; }
        .hs-banner-icon--purple { background: #F5F3FF; }

        .hs-banner-title { font-size: 14.5px; font-weight: 800; color: #0F172A; margin: 0 0 0.15rem; }
        .hs-banner-desc { font-size: 12.5px; color: #64748B; margin: 0; line-height: 1.4; }
      ` }} />
    </section>
  );
}
