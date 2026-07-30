"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Heart } from "lucide-react";
import { blogPosts } from "@/lib/site";

// Map slugs to standard local assets
const postImages = {
  "medicaid-waiver-programs-pa": "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D",
  "signs-loved-one-needs-home-care": "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D",
  "caregiver-burnout-family-caregivers": "https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D",
  "creating-safe-home-for-seniors": "/images/image.jpg",
};

const postCategories = {
  "medicaid-waiver-programs-pa": "Medicaid Waiver",
  "signs-loved-one-needs-home-care": "Caregiver Tips",
  "caregiver-burnout-family-caregivers": "Companion Care",
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
    month: "long",
    day: "numeric",
  });
}

export default function KnowledgeHub() {
  // We select the first post as Featured, and the next three as Standard Cards
  const featuredPost = blogPosts[0];
  const standardPosts = blogPosts.slice(1, 4);

  return (
    <section className="hub-luxury-section" aria-labelledby="hub-heading">
      {/* Visual backdrops */}
      <div className="hub-luxury-bg-blob" aria-hidden="true" />
      <div className="hub-luxury-bg-blob-2" aria-hidden="true" />

      <div className="container">
        
        {/* Section Header */}
        <div className="hub-luxury-header">
          <div className="hub-luxury-badge-wrapper">
            <span className="hub-luxury-badge">HEALTH &amp; CARE RESOURCES</span>
          </div>
          <h2 id="hub-heading" className="hub-luxury-title">
            Helpful Resources<br />For Families &amp; Caregivers
          </h2>
          <p className="hub-luxury-intro">
            Pavan Homecare shares expert advice, caregiving tips, safety guidance, wellness information, and practical resources for families caring for loved ones.
          </p>
        </div>

        {/* 1. Featured Article (Asymmetric 55/45 Split Banner) */}
        {featuredPost && (
          <article className="hub-featured-card bg-white rounded-2xl border border-[#DCE7F7] shadow-[0_15px_40px_rgba(0,26,77,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 mb-16 relative" aria-label="Featured Article">
            
            {/* Image Box (55% / 7 Cols) */}
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[420px] group overflow-hidden">
              <Image
                src={featuredPost.image || postImages[featuredPost.slug] || "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60"}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001A4D]/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute top-5 left-5 bg-[#FF7A59] text-white font-extrabold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg z-10">
                {postCategories[featuredPost.slug] || "Senior Wellness"}
              </span>
            </div>

            {/* Content Box (45% / 5 Cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white relative">
              <div>
                <div className="hub-meta-row flex items-center gap-4 text-[13px] text-[#4A5A73] mb-4">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar size={14} className="text-[#0061FF]" aria-hidden="true" />
                    <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock size={14} className="text-[#FF7A59]" aria-hidden="true" />
                    <span>{postReadTimes[featuredPost.slug] || "5 min read"}</span>
                  </span>
                </div>

                <h3 className="font-poppins font-extrabold text-[24px] sm:text-[28px] text-[#001A4D] leading-[1.25] mb-4 hover:text-[#0061FF] transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h3>

                <p className="text-[#4A5A73] text-[15px] leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
              </div>

              {/* Overlapping CTA Button breaking outside bottom border */}
              <div className="pt-2 lg:-mb-5 z-20">
                <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center gap-2.5 bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold text-[14px] px-6 py-3.5 rounded-full shadow-[0_8px_20px_rgba(255,122,89,0.35)] hover:-translate-y-0.5 transition-all duration-300">
                  <span>Read Featured Article</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

          </article>
        )}

        {/* 2. Standard Articles Grid (With Vertical Stagger) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {standardPosts.map((post, idx) => (
            <article 
              key={post.slug} 
              className={`bg-white rounded-2xl border border-[#DCE7F7] shadow-[0_4px_20px_rgba(11,23,48,0.06)] hover:shadow-[0_8px_30px_rgba(11,23,48,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                idx === 1 ? "lg:-translate-y-5 border-t-4 border-t-[#FF7A59]" : ""
              }`}
              aria-label={`Blog post: ${post.title}`}
            >
              
              {/* Card Image */}
              <div className="relative w-full h-[210px] overflow-hidden">
                <Image
                  src={post.image || postImages[post.slug] || "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&auto=format&fit=crop&q=60"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#001A4D] font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {postCategories[post.slug] || "Senior Wellness"}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 text-[12px] text-[#4A5A73] mb-3">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar size={12} className="text-[#0061FF]" aria-hidden="true" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock size={12} className="text-[#FF7A59]" aria-hidden="true" />
                      <span>{postReadTimes[post.slug] || "4 min read"}</span>
                    </span>
                  </div>

                  <h3 className="font-poppins font-bold text-[18px] text-[#001A4D] group-hover:text-[#0061FF] transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-[#4A5A73] text-[13.5px] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#DCE7F7] flex items-center justify-between">
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-[#0061FF] font-bold text-[13.5px] group-hover:text-[#FF7A59] transition-colors">
                    <span>Read Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* 3. Footer CTA */}
        <div className="hub-cta-area">
          <div className="hub-cta-buttons">
            <Link href="/blog" className="btn-luxury-primary btn-luxury-cta" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              View All Articles
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
