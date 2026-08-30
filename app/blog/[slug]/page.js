import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/lib/site";
import { Calendar, ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="CARE RESOURCE ARTICLE"
        title={post.title}
        description={post.excerpt}
        ctaLabel="Request Care"
        ctaHref="/contact-us"
        mediaLabel={post.title}
        imageSrc={post.image || "/images/photos/fallback-care.png"}
      />

      <article className="py-16 lg:py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#0061FF] font-poppins font-bold text-[14.5px] hover:text-[#0047B8] hover:-translate-x-1 transition-all duration-200"
            >
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </div>

          {/* Date stamp & category badge */}
          <div className="flex items-center gap-4 text-[13.5px] text-[#4A5A73] mb-8 pb-6 border-b border-[#DCE7F7]">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-[#0061FF]" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DCE7F7]" />
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#FF7A59]" />
              <span>5 min read</span>
            </div>
          </div>

          {/* Paragraphs body */}
          <div className="font-poppins text-[#0B1730] text-[17px] sm:text-[18px] leading-[1.8] space-y-6">
            {post.content.map((para, i) => (
              <p key={i} className="text-[#334155] leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Share / Consultation Callout */}
          <div className="mt-12 p-8 rounded-3xl bg-[#F5F9FF] border border-[#DCE7F7] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-poppins font-bold text-[18px] text-[#001A4D] mb-1">
                Have questions about in-home care?
              </h4>
              <p className="text-[#4A5A73] text-[14px] m-0">
                Our care coordinators are here to assist with assessments, Medicaid waivers, and custom schedules.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-[#FF7A59] hover:bg-[#E86746] text-white font-poppins font-bold text-[14px] px-6 py-3.5 rounded-full shadow-[0_8px_20px_rgba(255,122,89,0.35)] hover:shadow-[0_12px_25px_rgba(255,122,89,0.5)] hover:-translate-y-0.5 transition-all duration-200 shrink-0 btn-shimmer"
            >
              Free Assessment <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </article>

      {/* Related blog posts */}
      <section className="py-16 lg:py-24 bg-[#F5F9FF] border-t border-[#DCE7F7]" aria-labelledby="related-heading">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="text-center max-w-[680px] mx-auto mb-14">
            <span className="inline-flex items-center gap-2 bg-white text-[#0061FF] font-bold text-[12px] tracking-wider uppercase px-4 py-1.5 rounded-full mb-3 border border-[#0061FF]/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
              <span>RECOMMENDED ARTICLES</span>
            </span>
            <h2 id="related-heading" className="font-poppins font-extrabold text-[32px] sm:text-[40px] text-[#001A4D] tracking-tight">
              More From the Pavan Resource Hub
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <div key={p.slug} className="bg-white rounded-3xl p-7 border border-[#DCE7F7] shadow-[0_8px_25px_rgba(0,26,77,0.04)] hover:shadow-[0_16px_40px_rgba(0,97,255,0.12)] hover:border-[#0061FF]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <span className="text-[12px] font-bold text-[#FF7A59] bg-[#FFEDE7] px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-wider">
                  Care Resource
                </span>
                <h3 className="font-poppins font-bold text-[18px] text-[#001A4D] hover:text-[#0061FF] transition-colors leading-snug mb-3">
                  <Link href={`/blog/${p.slug}`} className="text-inherit no-underline">
                    {p.title}
                  </Link>
                </h3>
                <p className="text-[#4A5A73] text-[14px] leading-relaxed mb-6 flex-grow">
                  {p.excerpt}
                </p>
                <div className="pt-4 border-t border-[#DCE7F7]">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-[#0061FF] font-poppins font-bold text-[14px] hover:text-[#0047B8] hover:gap-2.5 transition-all duration-200"
                  >
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
