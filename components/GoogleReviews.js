"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Quote,
  ArrowRight,
  Phone,
  Heart,
  Check,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { site } from "@/lib/site";

// Google Reviews Data
const reviewsData = [
  {
    id: 1,
    name: "Gloria Custis",
    avatar: "/images/reviewer_gloria.webp",
    type: "image",
    verified: true,
    time: "Verified Google Review",
    rating: 5,
    text: "I love working with Pavan Homecare. The team is so nice, extremely professional and compassionate. Highly recommend! 🙏❤️👍",
    photo: "/images/review_gloria_photo.webp",
    featured: true,
  },
  {
    id: 2,
    name: "Betty Mellinger",
    avatar: "B",
    avatarBg: "#0061FF",
    type: "letter",
    verified: true,
    time: "Verified Google Review",
    rating: 5,
    text: "I enjoy working with the Pavan team. They are always understanding, highly responsive, and help check in when there are issues. I truly appreciate that. 😊",
  },
  {
    id: 3,
    name: "Dennie Barnes",
    avatar: "D",
    avatarBg: "#FF7A59",
    type: "letter",
    verified: true,
    time: "Verified Google Review",
    rating: 5,
    text: "Pavan Homecare is an exceptional company. Very nice to work with, highly professional, and extremely friendly caregivers.",
  },
  {
    id: 4,
    name: "Reginald Smalls",
    avatar: "/images/reviewer_reginald.webp",
    type: "image",
    verified: true,
    time: "Verified Google Review",
    rating: 5,
    text: "Our experience has been incredibly pleasant. The staff is professional, courteous, responsive, and efficient. They provide everything we could ask for. Thanks for all you do!",
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    avatar: "S",
    avatarBg: "#10B981",
    type: "letter",
    verified: true,
    time: "Verified Google Review",
    rating: 5,
    text: "The caregivers from Pavan Homecare treated my mother with the utmost respect and warmth. It gave our whole family immense peace of mind.",
  },
  {
    id: 6,
    name: "Marcus Vance",
    avatar: "M",
    avatarBg: "#8B5CF6",
    type: "letter",
    verified: true,
    time: "Verified Google Review",
    rating: 5,
    text: "Prompt, reliable, and genuinely caring staff. Scheduling was seamless and the care coordinator was always available to help.",
  },
];

// SVG Google Icon
const GoogleIconSVG = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.67-.67-1.19-1.48-1.54-2.38z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

export default function GoogleReviews() {
  const reviewLink = "https://search.google.com/local/writereview?placeid=ChIJeYg-fQzpy4kRphl563O-mQk";
  const featuredReview = reviewsData.find((r) => r.featured) || reviewsData[0];
  const otherReviews = reviewsData.filter((r) => !r.featured);

  return (
    <section className="gr-section" aria-labelledby="reviews-heading">
      {/* Background radial mesh */}
      <div aria-hidden="true" className="gr-bg" />

      <div className="gr-container">
        
        {/* ── SECTION HEADER ── */}
        <div className="gr-header">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gr-eyebrow">
              <GoogleIconSVG />
              Google Reviews · 4.9 Out of 5 Stars
            </span>
          </motion.div>

          <motion.h2
            id="reviews-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="gr-h2"
          >
            Loved by Families Across<br />
            <span className="gr-gradient-text">Pennsylvania</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="gr-sub"
          >
            Real stories of warmth, dignity, and dependable care from local families who trust Pavan Homecare.
          </motion.p>
        </div>

        {/* ── GOOGLE RATING HERO BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="gr-hero-card"
        >
          <div className="gr-hero-card__left">
            <div className="gr-google-badge">
              <GoogleIconSVG />
              <span className="gr-google-text">Google Business Review</span>
            </div>

            <div className="gr-rating-display">
              <span className="gr-rating-num">4.9</span>
              <div className="gr-stars-col">
                <div className="gr-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
                <span className="gr-rating-count">Based on 132+ verified client &amp; family reviews</span>
              </div>
            </div>
          </div>

          <Link
            href={reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="gr-btn-review btn-shimmer"
          >
            <Sparkles size={16} />
            Review Us on Google
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* ── FEATURED TESTIMONIAL CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="gr-featured-card"
        >
          <div className="gr-featured-grid">
            
            {/* Left Photo */}
            {featuredReview.photo && (
              <div className="gr-featured-img-wrap">
                <Image
                  src={featuredReview.photo}
                  alt="Pavan Homecare caregiver with senior client"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  className="gr-featured-img"
                />
                <div className="gr-featured-badge-overlay">
                  <Award size={14} color="#0061FF" />
                  <span>Featured Client Story</span>
                </div>
              </div>
            )}

            {/* Right Quote Content */}
            <div className="gr-featured-content">
              <Quote className="gr-quote-icon" size={64} />

              <div className="gr-stars-row mb-3">
                {[...Array(featuredReview.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>

              <blockquote className="gr-featured-text">
                &ldquo;{featuredReview.text}&rdquo;
              </blockquote>

              <div className="gr-featured-author">
                <div className="hs-avatars">
                  <Image
                    src={featuredReview.avatar}
                    alt={featuredReview.name}
                    width={48}
                    height={48}
                    className="gr-author-img"
                  />
                </div>
                <div>
                  <div className="gr-author-name-row">
                    <span className="gr-author-name">{featuredReview.name}</span>
                    <span className="gr-verified-pill">
                      <Check size={12} strokeWidth={3} /> Verified Client
                    </span>
                  </div>
                  <span className="gr-author-meta">{featuredReview.time}</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── REVIEWS GRID ── */}
        <div className="gr-grid">
          {otherReviews.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="gr-card"
            >
              <div className="gr-card__top">
                <div className="gr-card__user">
                  {r.type === "image" ? (
                    <Image
                      src={r.avatar}
                      alt={r.name}
                      width={44}
                      height={44}
                      className="gr-card__avatar-img"
                    />
                  ) : (
                    <div className="gr-card__avatar-letter" style={{ background: r.avatarBg }}>
                      {r.avatar}
                    </div>
                  )}

                  <div>
                    <div className="gr-card__name-row">
                      <span className="gr-card__name">{r.name}</span>
                      <ShieldCheck size={14} className="text-[#0061FF]" />
                    </div>
                    <span className="gr-card__sub">{r.time}</span>
                  </div>
                </div>

                <GoogleIconSVG />
              </div>

              <div className="gr-stars-row my-3">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>

              <p className="gr-card__text">&ldquo;{r.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="gr-bottom-cta"
        >
          <div className="gr-bottom-cta__inner">
            <h3 className="gr-bottom-cta__title">Need compassionate home care for someone you love?</h3>
            <div className="gr-bottom-cta__buttons">
              <Link href="/contact-us" className="gr-btn-primary btn-shimmer">
                <Heart size={16} className="fill-white/30" />
                Request Free Care Consultation
                <ArrowRight size={16} />
              </Link>
              <a href={site.phoneHref} className="gr-btn-phone">
                <Phone size={16} className="text-[#0061FF]" />
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .gr-section {
          position: relative;
          width: 100%;
          background: #F8FAFC;
          padding: clamp(4rem, 7vw, 6.5rem) 0;
          overflow: hidden;
          border-top: 1px solid #E2E8F0;
        }

        .gr-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(0, 97, 255, 0.05) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }

        .gr-container {
          max-width: 1360px; margin: 0 auto; padding: 0 1.5rem;
          position: relative; z-index: 10;
        }

        /* Header */
        .gr-header { text-align: center; max-width: 720px; margin: 0 auto 3.5rem; }

        .gr-eyebrow {
          display: inline-flex; align-items: center; gap: 0.55rem;
          background: #FFFFFF; border: 1px solid #E2E8F0;
          color: #0F172A; font-weight: 700; font-size: 13px;
          padding: 0.45rem 1.1rem; border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.04);
          margin-bottom: 1.25rem;
        }

        .gr-h2 {
          font-family: var(--font-heading);
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          font-weight: 800; line-height: 1.1;
          letter-spacing: -0.03em; color: #001A4D;
          margin: 0 0 1.25rem;
        }

        .gr-gradient-text {
          background: linear-gradient(90deg, #0061FF 0%, #60EFFF 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        .gr-sub {
          font-size: clamp(1rem, 1.4vw, 1.1rem);
          color: #4A5A73; line-height: 1.7; margin: 0;
        }

        /* Hero Rating Card */
        .gr-hero-card {
          background: #FFFFFF;
          border: 1px solid #DCE7F7;
          border-radius: 1.5rem; padding: 1.5rem 2rem;
          box-shadow: 0 16px 40px rgba(0, 26, 77, 0.06);
          display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
          gap: 1.5rem; margin-bottom: 3rem;
        }

        .gr-hero-card__left { display: flex; flex-direction: column; gap: 0.6rem; }
        .gr-google-badge { display: flex; align-items: center; gap: 0.5rem; }
        .gr-google-text { font-size: 12.5px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; }

        .gr-rating-display { display: flex; align-items: center; gap: 1rem; }
        .gr-rating-num {
          font-family: var(--font-heading); font-size: 3rem; font-weight: 800;
          color: #001A4D; line-height: 1;
        }

        .gr-stars-col { display: flex; flex-direction: column; gap: 0.2rem; }
        .gr-stars-row { display: flex; align-items: center; gap: 0.25rem; }
        .gr-rating-count { font-size: 13px; color: #4A5A73; font-weight: 600; }

        .gr-btn-review {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: linear-gradient(90deg, #0061FF 0%, #60EFFF 100%);
          color: #FFFFFF; font-family: var(--font-heading);
          font-weight: 700; font-size: 14.5px;
          padding: 0.8rem 1.6rem; border-radius: 9999px;
          box-shadow: 0 8px 24px rgba(0, 97, 255, 0.3);
          text-decoration: none; transition: all 0.25s ease;
        }
        .gr-btn-review:hover {
          transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0, 97, 255, 0.45);
          color: #FFFFFF; text-decoration: none;
        }

        /* Featured Card */
        .gr-featured-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 1.75rem; overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 26, 77, 0.08);
          margin-bottom: 2.5rem;
        }

        .gr-featured-grid {
          display: grid; grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .gr-featured-grid { grid-template-columns: 0.85fr 1.15fr; }
        }

        .gr-featured-img-wrap {
          position: relative; min-height: 320px; background: #EFF6FF;
        }
        .gr-featured-img { object-fit: cover; object-position: center; }

        .gr-featured-badge-overlay {
          position: absolute; top: 1.25rem; left: 1.25rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 9999px; padding: 0.4rem 1rem;
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 12px; font-weight: 700; color: #0F172A;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .gr-featured-content {
          position: relative; padding: clamp(2rem, 4vw, 3rem);
          display: flex; flex-direction: column; justify-content: center;
        }

        .gr-quote-icon {
          position: absolute; top: 1.5rem; right: 2rem;
          color: rgba(0, 97, 255, 0.07); pointer-events: none;
        }

        .gr-featured-text {
          font-family: var(--font-heading);
          font-size: clamp(1.15rem, 2vw, 1.45rem);
          font-weight: 700; color: #0F172A; line-height: 1.5;
          margin: 0 0 2rem; border: none; padding: 0;
        }

        .gr-featured-author { display: flex; align-items: center; gap: 1rem; }
        .gr-author-img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
        .gr-author-name-row { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
        .gr-author-name { font-size: 16px; font-weight: 800; color: #0F172A; }
        .gr-verified-pill {
          display: inline-flex; align-items: center; gap: 0.25rem;
          background: #ECFDF5; border: 1px solid #A7F3D0;
          color: #059669; font-size: 11.5px; font-weight: 700;
          padding: 0.25rem 0.65rem; border-radius: 9999px;
        }
        .gr-author-meta { font-size: 12.5px; color: #64748B; }

        /* Grid */
        .gr-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem; margin-bottom: 3.5rem;
        }

        .gr-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 1.25rem; padding: 1.5rem;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          display: flex; flex-direction: column;
        }
        .gr-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0, 97, 255, 0.1);
          border-color: rgba(0, 97, 255, 0.3);
        }

        .gr-card__top { display: flex; align-items: center; justify-content: space-between; }
        .gr-card__user { display: flex; align-items: center; gap: 0.75rem; }
        .gr-card__avatar-img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
        .gr-card__avatar-letter {
          width: 44px; height: 44px; border-radius: 50%; color: #FFF;
          font-family: var(--font-heading); font-weight: 800; font-size: 18px;
          display: flex; align-items: center; justify-content: center;
        }

        .gr-card__name-row { display: flex; align-items: center; gap: 0.35rem; }
        .gr-card__name { font-size: 15px; font-weight: 800; color: #0F172A; }
        .gr-card__sub { font-size: 11.5px; color: #64748B; }
        .gr-card__text { font-size: 13.5px; color: #334155; line-height: 1.65; margin: 0; flex: 1; }

        /* Bottom CTA */
        .gr-bottom-cta {
          background: #FFFFFF;
          border: 1px solid #DCE7F7;
          border-radius: 1.5rem; padding: 2rem;
          box-shadow: 0 12px 32px rgba(0, 26, 77, 0.05);
        }
        .gr-bottom-cta__inner {
          display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
          gap: 1.5rem;
        }
        .gr-bottom-cta__title {
          font-family: var(--font-heading); font-size: clamp(1.2rem, 2vw, 1.5rem);
          font-weight: 800; color: #001A4D; margin: 0; max-width: 460px;
        }
        .gr-bottom-cta__buttons { display: flex; flex-wrap: wrap; gap: 0.85rem; }

        .gr-btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #FF7A59;
          color: #FFFFFF; font-family: var(--font-heading);
          font-weight: 700; font-size: 14px;
          padding: 0.75rem 1.5rem; border-radius: 9999px;
          box-shadow: 0 6px 20px rgba(255, 122, 89, 0.35);
          text-decoration: none; transition: all 0.2s;
        }
        .gr-btn-primary:hover {
          background: #E86746;
          transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255, 122, 89, 0.5);
          color: #FFFFFF; text-decoration: none;
        }

        .gr-btn-phone {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #F8FAFC; border: 1px solid #DCE7F7;
          color: #001A4D; font-family: var(--font-heading);
          font-weight: 700; font-size: 14px;
          padding: 0.75rem 1.5rem; border-radius: 9999px;
          text-decoration: none; transition: all 0.2s;
        }
        .gr-btn-phone:hover {
          border-color: #0061FF; background: #EFF6FF;
          text-decoration: none;
        }
      ` }} />
    </section>
  );
}
