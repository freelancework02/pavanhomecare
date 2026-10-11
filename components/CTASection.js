"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ArrowRight,
  Phone,
  ShieldCheck,
  Star,
  CheckCircle2,
  Sparkles,
  Clock,
  Lock,
} from "lucide-react";
import { site } from "@/lib/site";

export default function CTASection() {
  return (
    <section id="get-started" className="cta-section" aria-labelledby="cta-heading">
      {/* Background ambient radial mesh */}
      <div aria-hidden="true" className="cta-bg-mesh" />
      <div aria-hidden="true" className="cta-dots" />

      <div className="cta-container">
        
        {/* LEFT COLUMN — Text & Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="cta-left"
        >
          <span className="cta-eyebrow">
            <ShieldCheck size={14} className="text-[#0061FF]" />
            Start Your Care Journey Today
          </span>

          <h2 id="cta-heading" className="cta-h2">
            Ready to Experience<br />
            <span className="cta-gradient-text">Compassionate In-Home Care?</span>
          </h2>

          <p className="cta-sub">
            Let us match your loved one with a warm, vetted caregiver tailored specifically to your family&apos;s needs. Your first consultation is completely <strong>free &amp; confidential</strong>.
          </p>

          {/* Key Value Props List */}
          <div className="cta-benefits">
            <div className="cta-benefit-item">
              <CheckCircle2 size={18} className="text-[#0061FF] shrink-0" />
              <span>No long-term contracts or commitments required</span>
            </div>
            <div className="cta-benefit-item">
              <CheckCircle2 size={18} className="text-[#0061FF] shrink-0" />
              <span>100% background checked &amp; trained caregivers</span>
            </div>
            <div className="cta-benefit-item">
              <CheckCircle2 size={18} className="text-[#0061FF] shrink-0" />
              <span>Custom care plans created within 24 hours</span>
            </div>
            <div className="cta-benefit-item">
              <CheckCircle2 size={18} className="text-[#0061FF] shrink-0" />
              <span>Medicaid waiver &amp; private pay accepted</span>
            </div>
          </div>

          {/* Rating Trust Bar */}
          <div className="cta-rating-bar">
            <div className="cta-stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-[#FFB800] text-[#FFB800]" />
              ))}
            </div>
            <span className="cta-rating-text">
              <strong>4.9/5 Rating</strong> · Trusted by 500+ Pennsylvania Families
            </span>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — Booking Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="cta-card"
        >
          <div className="cta-card__header">
            <Sparkles size={16} className="text-[#0061FF]" />
            <span>Free 1-on-1 Consultation</span>
          </div>

          <h3 className="cta-card__title">Book Your Free Consultation</h3>
          <p className="cta-card__sub">
            A local care coordinator will contact you back within 2 hours to discuss your family&apos;s specific care needs.
          </p>

          <Link href="/contact-us" id="cta-request-btn" className="cta-btn-primary btn-shimmer">
            <Heart size={18} className="fill-white/30" />
            Request Free Consultation
            <ArrowRight size={18} />
          </Link>

          <div className="cta-divider">
            <span className="cta-divider__line" />
            <span className="cta-divider__text">or call us directly</span>
            <span className="cta-divider__line" />
          </div>

          <a href={site.phoneHref} className="cta-btn-phone">
            <div className="cta-phone-icon">
              <Phone size={18} color="#FFF" />
            </div>
            <div className="cta-phone-info">
              <span className="cta-phone-label">Call Anytime, 24/7 Support</span>
              <span className="cta-phone-num">{site.phoneDisplay}</span>
            </div>
          </a>

          <div className="cta-card__footnote">
            <Lock size={12} className="text-[#64748B]" />
            <span>100% Confidential · No Obligation · Free Assessment</span>
          </div>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cta-section {
          position: relative;
          width: 100%;
          background: #F8FAFC;
          padding: clamp(4.5rem, 8vw, 7rem) 0;
          overflow: hidden;
          border-top: 1px solid #E2E8F0;
        }

        .cta-bg-mesh {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 20% 40%, rgba(96, 239, 255, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0, 97, 255, 0.08) 0%, transparent 70%);
        }

        .cta-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(0, 97, 255, 0.05) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }

        .cta-container {
          max-width: 1360px; margin: 0 auto; padding: 0 1.5rem;
          position: relative; z-index: 10;
          display: grid; grid-template-columns: 1fr;
          gap: 3.5rem; align-items: center;
        }
        @media (min-width: 1024px) {
          .cta-container { grid-template-columns: 1.05fr 0.95fr; gap: 4.5rem; }
        }

        /* Left Column */
        .cta-left { display: flex; flex-direction: column; }

        .cta-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #EFF6FF; border: 1px solid rgba(0, 97, 255, 0.2);
          color: #0061FF; font-weight: 700; font-size: 13px;
          padding: 0.45rem 1.1rem; border-radius: 9999px;
          margin-bottom: 1.5rem; width: fit-content;
        }

        .cta-h2 {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 4.8vw, 3.6rem);
          font-weight: 800; line-height: 1.1;
          letter-spacing: -0.03em; color: #001A4D;
          margin: 0 0 1.25rem;
        }

        .cta-gradient-text {
          background: linear-gradient(90deg, #0061FF 0%, #60EFFF 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        .cta-sub {
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          color: #4A5A73; line-height: 1.7;
          margin: 0 0 2rem; max-width: 560px;
        }

        /* Benefits list */
        .cta-benefits { display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2.25rem; }
        .cta-benefit-item {
          display: flex; align-items: center; gap: 0.65rem;
          font-size: 14.5px; font-weight: 600; color: #001A4D;
        }

        /* Rating Bar */
        .cta-rating-bar {
          display: flex; align-items: center; gap: 0.85rem;
          padding-top: 1.5rem; border-top: 1px solid #DCE7F7;
        }
        .cta-stars-row { display: flex; align-items: center; gap: 0.25rem; }
        .cta-rating-text { font-size: 13.5px; color: #4A5A73; }

        /* Right Booking Card */
        .cta-card {
          background: #FFFFFF;
          border: 1px solid #DCE7F7;
          border-radius: 2rem;
          padding: clamp(2rem, 4vw, 2.75rem);
          box-shadow: 0 24px 64px rgba(0, 26, 77, 0.09), 0 0 0 1px rgba(0, 97, 255, 0.05);
          display: flex; flex-direction: column;
        }

        .cta-card__header {
          display: inline-flex; align-items: center; gap: 0.45rem;
          background: #EFF6FF; border: 1px solid rgba(0, 97, 255, 0.15);
          color: #0061FF; font-size: 12px; font-weight: 700;
          padding: 0.35rem 0.9rem; border-radius: 9999px;
          margin-bottom: 1.25rem; width: fit-content;
        }

        .cta-card__title {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2.2vw, 1.8rem);
          font-weight: 800; color: #001A4D;
          margin: 0 0 0.6rem; line-height: 1.2;
        }

        .cta-card__sub {
          font-size: 14px; color: #4A5A73; line-height: 1.6;
          margin: 0 0 1.75rem;
        }

        /* Buttons */
        .cta-btn-primary {
          display: flex; align-items: center; justify-content: center; gap: 0.65rem;
          background: #FF7A59;
          color: #FFFFFF; font-family: var(--font-heading);
          font-weight: 700; font-size: 15.5px;
          padding: 1rem 1.8rem; border-radius: 9999px;
          box-shadow: 0 10px 25px rgba(255, 122, 89, 0.35);
          text-decoration: none; transition: all 0.25s ease;
          width: 100%; text-align: center;
        }
        .cta-btn-primary:hover {
          background: #E86746;
          transform: translateY(-2px); box-shadow: 0 15px 30px rgba(255, 122, 89, 0.5);
          color: #FFFFFF; text-decoration: none;
        }

        /* Divider */
        .cta-divider {
          display: flex; align-items: center; gap: 0.75rem; margin: 1.5rem 0;
        }
        .cta-divider__line { flex: 1; height: 1px; background: #DCE7F7; }
        .cta-divider__text { font-size: 12px; color: #64748B; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }

        /* Phone pill */
        .cta-btn-phone {
          display: flex; align-items: center; gap: 1rem;
          background: #F8FAFC; border: 1px solid #E2E8F0;
          padding: 0.85rem 1.25rem; border-radius: 1.25rem;
          text-decoration: none; transition: all 0.25s ease;
        }
        .cta-btn-phone:hover {
          border-color: #0061FF; background: #EFF6FF;
          transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0, 97, 255, 0.1);
          text-decoration: none;
        }
        .cta-phone-icon {
          width: 42px; height: 42px; border-radius: 50%;
          background: #0061FF; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; box-shadow: 0 4px 12px rgba(0, 97, 255, 0.25);
        }
        .cta-phone-info { display: flex; flex-direction: column; }
        .cta-phone-label { font-size: 11.5px; color: #64748B; font-weight: 600; }
        .cta-phone-num { font-size: 17px; font-weight: 800; color: #0F172A; line-height: 1.2; }

        .cta-card__footnote {
          display: flex; align-items: center; justify-content: center; gap: 0.4rem;
          font-size: 12px; color: #64748B; margin-top: 1.5rem; font-weight: 500;
        }
      ` }} />
    </section>
  );
}
