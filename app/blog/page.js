"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import GoogleReviews from "@/components/GoogleReviews";
import { blogPosts, site } from "@/lib/site";
import { 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Heart,
  ChevronRight
} from "lucide-react";
import "./blog.css";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categories = [
  { id: "all", label: "All Topics" },
  { id: "waiver", label: "Medicaid Waiver" },
  { id: "tips", label: "Caregiver Tips" }
];

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const postsWithCategory = blogPosts.map(post => {
    let catId = "tips";
    if (post.slug.includes("waiver") || post.slug.includes("medicaid")) {
      catId = "waiver";
    }
    return { ...post, categoryId: catId };
  });

  const filteredPosts = activeCategory === "all" 
    ? postsWithCategory 
    : postsWithCategory.filter(p => p.categoryId === activeCategory);

  const featuredPost = activeCategory === "all" ? postsWithCategory[0] : null;
  const standardPosts = activeCategory === "all" ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="blog-page-wrapper">
      <PageHero
        eyebrow="RESOURCES &amp; GUIDES"
        title="Pavan Care Resource Hub"
        description="Practical guidance on senior care, Medicaid waivers, family caregiving, and navigating home care options in Pennsylvania."
        ctaLabel="Explore Resources"
        ctaHref="#blog-articles"
        mediaLabel="Caregiver reading with a senior client"
        imageSrc="/images/photos/blog-listing-hero.jpg"
      />

      {/* Blog Resource Hub Section */}
      <section id="blog-articles" className="section py-16 lg:py-24" aria-labelledby="latest-articles-heading">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-10">
          
          {/* Category Filter Tabs */}
          <div className="blog-filter-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`blog-filter-btn ${activeCategory === cat.id ? "blog-filter-btn--active" : ""}`}
              >
                {cat.id === "all" && <Layers size={14} />}
                {cat.id === "waiver" && <ShieldCheck size={14} />}
                {cat.id === "tips" && <BookOpen size={14} />}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured Post Card (1 Column full width) */}
          {featuredPost && (
            <div className="mb-14">
              <div className="inline-flex items-center gap-2 bg-[#E8F2FF] text-[#0061FF] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-[#0061FF]/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                <span>FEATURED ARTICLE</span>
              </div>
              <div className="blog-featured-row">
                {/* Thumbnail */}
                <div className="blog-featured-media">
                  <Image
                    src={featuredPost.image || "/images/photos/fallback-care.png"}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="blog-featured-img"
                    sizes="(max-width: 64rem) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="blog-featured-content">
                  <div className="blog-meta-row">
                    <div className="blog-meta-date">
                      <Calendar size={14} className="text-[#0061FF]" />
                      <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                    </div>
                    <span className="blog-category-badge">
                      {featuredPost.categoryId === "waiver" ? "Medicaid Waiver" : "Caregiver Tips"}
                    </span>
                  </div>

                  <h3 className="blog-featured-title">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h3>

                  <p className="blog-featured-excerpt">
                    {featuredPost.excerpt}
                  </p>

                  <div>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 bg-[#0061FF] hover:bg-[#0047B8] text-white font-poppins font-bold text-[14px] px-6 py-3 rounded-full shadow-[0_6px_18px_rgba(0,97,255,0.3)] hover:shadow-[0_10px_25px_rgba(0,97,255,0.45)] hover:-translate-y-0.5 transition-all duration-300 btn-shimmer"
                    >
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Articles list grid */}
          <div className="inline-flex items-center gap-2 bg-[#E8F2FF] text-[#0061FF] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-6 border border-[#0061FF]/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
            <span>{activeCategory === "all" ? "MORE ARTICLES" : `${categories.find(c => c.id === activeCategory).label} Articles`}</span>
          </div>

          {standardPosts.length > 0 ? (
            <div className="blog-grid">
              {standardPosts.map((post) => (
                <article key={post.slug} className="blog-card group">
                  <div className="blog-card-media">
                    <Image
                      src={post.image || "/images/photos/fallback-care.png"}
                      alt={post.title}
                      fill
                      loading="lazy"
                      className="blog-card-img"
                      sizes="(max-width: 48rem) 100vw, 30vw"
                    />
                  </div>
                  
                  <div className="blog-card-body">
                    <div className="blog-meta-row">
                      <div className="blog-meta-date">
                        <Calendar size={14} className="text-[#0061FF]" />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </div>
                      <span className="blog-category-badge text-[11px] py-0.5 px-2">
                        {post.categoryId === "waiver" ? "Medicaid Waiver" : "Caregiver Tips"}
                      </span>
                    </div>

                    <h3 className="blog-card-title">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="blog-card-excerpt">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-3 border-t border-[#DCE7F7]">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-[#0061FF] font-poppins font-bold text-[14px] hover:text-[#0047B8] hover:gap-2.5 transition-all duration-200"
                      >
                        Read Article <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-[#4A5A73]">No articles found in this category.</p>
          )}

        </div>
      </section>

      {/* SECTION: Discover How Pavan Homecare Enhances Lives */}
      <section className="blog-info-section" aria-labelledby="blog-info-title">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="blog-info-grid">
            
            <div className="blog-info-content">
              <div className="inline-flex items-center gap-2 bg-[#FFEDE7] text-[#FF7A59] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-[#FF7A59]/20 shadow-sm">
                <Heart size={12} className="fill-[#FF7A59]" />
                <span>Elevating Senior Life</span>
              </div>
              <h2 id="blog-info-title" className="blog-info-title">
                How Pavan Homecare Enhances Your Loved One’s Life
              </h2>
              <p className="blog-info-desc">
                At Pavan Homecare, we are deeply committed to delivering high-quality, licensed in-home care services that prioritize the comfort, security, and personal dignity of our clients. Our dedicated caregiving team focuses on providing attentive, love-driven support that helps seniors live active and fulfilling lives in their own homes.
              </p>
              <p className="blog-info-desc mb-8">
                Discover how our customized home care plans can ease daily tasks and bring vital peace of mind to your family. Ready to discuss your loved one’s specific care goals?
              </p>
              <div>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2.5 bg-[#FF7A59] hover:bg-[#E86746] text-white font-poppins font-bold text-[15px] px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(255,122,89,0.35)] hover:shadow-[0_15px_30px_rgba(255,122,89,0.5)] hover:-translate-y-0.5 transition-all duration-300 btn-shimmer"
                >
                  Schedule Consultation <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Card Panel */}
            <div className="blog-info-card">
              <h3>Get In Touch</h3>
              <p>
                Have questions about licensed hours, Medicaid Waiver support, or caregiver scheduling? Reach out to our care coordinators today.
              </p>

              <div className="blog-info-contacts">
                <div className="blog-contact-row">
                  <Phone size={16} className="text-[#0061FF]" />
                  <span>
                    <strong>Call Us:</strong> <a href={site.phoneHref}>{site.phoneDisplay}</a>
                  </span>
                </div>
                <div className="blog-contact-row">
                  <Mail size={16} className="text-[#0061FF]" />
                  <span>
                    <strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
                  </span>
                </div>
              </div>

              <div className="border-t border-[#DCE7F7] pt-4 text-[13.5px] text-[#4A5A73] italic">
                <p className="m-0">
                  Take the first step towards securing compassionate, reliable home care. We look forward to supporting your family!
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: Google Reviews */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Google Reviews">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-10">
          <GoogleReviews />
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <CTASection />
    </div>
  );
}
