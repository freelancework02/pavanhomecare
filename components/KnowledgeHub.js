"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles, Tag } from "lucide-react";
import { blogPosts } from "@/lib/site";

// Image mapping for posts
const postImages = {
  "medicaid-waiver-programs-pa": "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=700&auto=format&fit=crop&q=80",
  "signs-loved-one-needs-home-care": "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=700&auto=format&fit=crop&q=80",
  "caregiver-burnout-family-caregivers": "https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=700&auto=format&fit=crop&q=80",
  "creating-safe-home-for-seniors": "/images/image.jpg",
};

const postCategories = {
  "medicaid-waiver-programs-pa": "Medicaid Waiver",
  "signs-loved-one-needs-home-care": "Caregiver Tips",
  "caregiver-burnout-family-caregivers": "Family Wellness",
  "creating-safe-home-for-seniors": "Home Safety",
};

const postReadTimes = {
  "medicaid-waiver-programs-pa": "5 min read",
  "signs-loved-one-needs-home-care": "4 min read",
  "caregiver-burnout-family-caregivers": "5 min read",
  "creating-safe-home-for-seniors": "6 min read",
};

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function KnowledgeHub() {
  const featuredPost = blogPosts[0];
  const standardPosts = blogPosts.slice(1, 4);

  return (
    <section className="kh-section" aria-labelledby="kh-heading">
      {/* Background decoration */}
      <div aria-hidden="true" className="kh-bg-mesh" />

      <div className="kh-container">
        
        {/* ── SECTION HEADER ── */}
        <div className="kh-header">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="kh-eyebrow">
              <BookOpen size={14} className="text-[#0061FF]" />
              Health &amp; Care Resources
            </span>
          </motion.div>

          <motion.h2
            id="kh-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="kh-h2"
          >
            Helpful Resources<br />
            <span className="kh-gradient-text">For Families &amp; Caregivers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="kh-sub"
          >
            Pavan Homecare shares expert advice, caregiving guides, safety information, and practical resources to support families throughout Pennsylvania.
          </motion.p>
        </div>

        {/* ── FEATURED MAGAZINE ARTICLE (55 / 45 ASYMMETRIC CARD) ── */}
        {featuredPost && (
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="kh-featured-card"
          >
            <div className="kh-featured-grid">
              
              {/* Left Photo (55%) */}
              <div className="kh-featured-img-wrap">
                <Image
                  src={featuredPost.image || postImages[featuredPost.slug] || "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=700&auto=format&fit=crop&q=80"}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                  className="kh-featured-img"
                />
                <div className="kh-featured-overlay" />
                <span className="kh-featured-chip">
                  <Sparkles size={12} />
                  {postCategories[featuredPost.slug] || "Featured Guide"}
                </span>
              </div>

              {/* Right Content (45%) */}
              <div className="kh-featured-content">
                <div className="kh-meta-row">
                  <span className="kh-meta-item">
                    <Calendar size={13} className="text-[#0061FF]" />
                    <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                  </span>
                  <span className="kh-meta-dot">•</span>
                  <span className="kh-meta-item">
                    <Clock size={13} className="text-[#FF7A59]" />
                    <span>{postReadTimes[featuredPost.slug] || "5 min read"}</span>
                  </span>
                </div>

                <h3 className="kh-featured-title">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h3>

                <p className="kh-featured-excerpt">
                  {featuredPost.excerpt}
                </p>

                <div className="kh-featured-cta">
                  <Link href={`/blog/${featuredPost.slug}`} className="kh-btn-primary btn-shimmer">
                    <span>Read Featured Guide</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

            </div>
          </motion.article>
        )}

        {/* ── 3-COLUMN CARDS GRID ── */}
        <div className="kh-grid">
          {standardPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="kh-card"
            >
              {/* Image */}
              <div className="kh-card__img-wrap">
                <Image
                  src={post.image || postImages[post.slug] || "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&auto=format&fit=crop&q=80"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="kh-card__img"
                />
                <span className="kh-card__tag">
                  <Tag size={11} />
                  {postCategories[post.slug] || "Senior Care"}
                </span>
              </div>

              {/* Body */}
              <div className="kh-card__body">
                <div className="kh-meta-row mb-2">
                  <span className="kh-meta-item">
                    <Calendar size={12} className="text-[#0061FF]" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  <span className="kh-meta-dot">•</span>
                  <span className="kh-meta-item">
                    <Clock size={12} className="text-[#FF7A59]" />
                    <span>{postReadTimes[post.slug] || "4 min read"}</span>
                  </span>
                </div>

                <h3 className="kh-card__title">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="kh-card__excerpt">
                  {post.excerpt}
                </p>

                <div className="kh-card__footer">
                  <Link href={`/blog/${post.slug}`} className="kh-card__link">
                    <span>Read Full Article</span>
                    <ArrowRight size={14} className="kh-card__arrow" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── BOTTOM VIEW ALL BUTTON ── */}
        <div className="kh-bottom">
          <Link href="/blog" className="kh-btn-outline">
            <span>Explore All Resources &amp; Articles</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .kh-section {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          padding: clamp(4.5rem, 8vw, 7rem) 0;
          overflow: hidden;
          border-top: 1px solid #E2E8F0;
        }

        .kh-bg-mesh {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(0, 97, 255, 0.04) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }

        .kh-container {
          max-width: 1360px; margin: 0 auto; padding: 0 1.5rem;
          position: relative; z-index: 10;
        }

        /* Header */
        .kh-header { text-align: center; max-width: 720px; margin: 0 auto 3.5rem; }

        .kh-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #EFF6FF; border: 1px solid rgba(0, 97, 255, 0.2);
          color: #0061FF; font-weight: 700; font-size: 13px;
          padding: 0.45rem 1.1rem; border-radius: 9999px;
          margin-bottom: 1.25rem; width: fit-content;
        }

        .kh-h2 {
          font-family: var(--font-heading);
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          font-weight: 800; line-height: 1.1;
          letter-spacing: -0.03em; color: #001A4D;
          margin: 0 0 1.25rem;
        }

        .kh-gradient-text {
          background: linear-gradient(90deg, #0061FF 0%, #60EFFF 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        .kh-sub {
          font-size: clamp(1rem, 1.4vw, 1.1rem);
          color: #4A5A73; line-height: 1.7; margin: 0;
        }

        /* Featured Article Card */
        .kh-featured-card {
          background: #FFFFFF;
          border: 1px solid #DCE7F7;
          border-radius: 1.75rem; overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 26, 77, 0.08);
          margin-bottom: 3.5rem;
        }

        .kh-featured-grid {
          display: grid; grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .kh-featured-grid { grid-template-columns: 1.15fr 0.85fr; }
        }

        .kh-featured-img-wrap {
          position: relative; min-height: 340px; background: #EFF6FF;
          overflow: hidden;
        }
        .kh-featured-img {
          object-fit: cover; object-position: center;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .kh-featured-card:hover .kh-featured-img { transform: scale(1.05); }

        .kh-featured-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0, 26, 77, 0.4) 0%, transparent 60%);
        }

        .kh-featured-chip {
          position: absolute; top: 1.25rem; left: 1.25rem;
          background: #0061FF; color: #FFFFFF;
          font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em;
          padding: 0.4rem 1rem; border-radius: 9999px;
          display: flex; align-items: center; gap: 0.35rem;
          box-shadow: 0 6px 16px rgba(0, 97, 255, 0.35); z-index: 10;
        }

        .kh-featured-content {
          padding: clamp(2rem, 4vw, 3.25rem);
          display: flex; flex-direction: column; justify-content: center;
        }

        .kh-meta-row { display: flex; align-items: center; gap: 0.5rem; font-size: 12.5px; color: #64748B; font-weight: 600; }
        .kh-meta-item { display: flex; align-items: center; gap: 0.35rem; }
        .kh-meta-dot { color: #CBD5E1; }

        .kh-featured-title {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2.4vw, 1.9rem);
          font-weight: 800; color: #001A4D; line-height: 1.25;
          margin: 0.75rem 0 1rem;
        }
        .kh-featured-title a { color: #001A4D; text-decoration: none; transition: color 0.2s; }
        .kh-featured-title a:hover { color: #0061FF; text-decoration: none; }

        .kh-featured-excerpt {
          font-size: 14.5px; color: #4A5A73; line-height: 1.7;
          margin: 0 0 2rem;
        }

        .kh-btn-primary {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: linear-gradient(90deg, #0061FF 0%, #60EFFF 100%);
          color: #FFFFFF; font-family: var(--font-heading);
          font-weight: 700; font-size: 14.5px;
          padding: 0.85rem 1.8rem; border-radius: 9999px;
          box-shadow: 0 10px 28px rgba(0, 97, 255, 0.3);
          text-decoration: none; transition: all 0.25s ease;
          width: fit-content;
        }
        .kh-btn-primary:hover {
          transform: translateY(-2px); box-shadow: 0 14px 36px rgba(0, 97, 255, 0.45);
          color: #FFFFFF; text-decoration: none;
        }

        /* 3-Column Grid */
        .kh-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.75rem; margin-bottom: 3.5rem;
        }

        .kh-card {
          background: #FFFFFF;
          border: 1px solid #DCE7F7;
          border-radius: 1.5rem; overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 26, 77, 0.04);
          display: flex; flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .kh-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0, 97, 255, 0.12);
          border-color: rgba(0, 97, 255, 0.3);
        }

        .kh-card__img-wrap {
          position: relative; width: 100%; height: 210px;
          background: #F1F5F9; overflow: hidden;
        }
        .kh-card__img {
          object-fit: cover; object-position: center;
          transition: transform 0.6s ease;
        }
        .kh-card:hover .kh-card__img { transform: scale(1.08); }

        .kh-card__tag {
          position: absolute; top: 1rem; left: 1rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          color: #001A4D; font-size: 11.5px; font-weight: 700;
          padding: 0.3rem 0.8rem; border-radius: 9999px;
          display: flex; align-items: center; gap: 0.3rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); z-index: 10;
        }

        .kh-card__body {
          padding: 1.6rem; display: flex; flex-direction: column; flex: 1;
        }

        .kh-card__title {
          font-family: var(--font-heading);
          font-size: 18px; font-weight: 800; color: #001A4D;
          line-height: 1.3; margin: 0.5rem 0 0.75rem;
        }
        .kh-card__title a { color: #001A4D; text-decoration: none; transition: color 0.2s; }
        .kh-card:hover .kh-card__title a { color: #0061FF; }

        .kh-card__excerpt {
          font-size: 13.5px; color: #4A5A73; line-height: 1.65;
          margin: 0 0 1.5rem; flex: 1;
        }

        .kh-card__footer {
          padding-top: 1rem; border-top: 1px solid #F1F5F9;
        }
        .kh-card__link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          color: #0061FF; font-family: var(--font-heading);
          font-weight: 700; font-size: 13.5px; text-decoration: none;
          transition: color 0.2s;
        }
        .kh-card__link:hover { color: #0061FF; text-decoration: none; }
        .kh-card__arrow { transition: transform 0.2s ease; }
        .kh-card:hover .kh-card__arrow { transform: translateX(4px); }

        /* Bottom button */
        .kh-bottom { display: flex; justify-content: center; }
        .kh-btn-outline {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: #FFFFFF; border: 1.5px solid #DCE7F7;
          color: #001A4D; font-family: var(--font-heading);
          font-weight: 700; font-size: 15px;
          padding: 0.85rem 2rem; border-radius: 9999px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          text-decoration: none; transition: all 0.25s ease;
        }
        .kh-btn-outline:hover {
          border-color: #0061FF; color: #0061FF;
          transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0, 97, 255, 0.12);
          text-decoration: none;
        }
      ` }} />
    </section>
  );
}
