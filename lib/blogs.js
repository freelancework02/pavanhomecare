import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  where,
  limit
} from "firebase/firestore";
import { blogPosts as staticBlogPosts } from "@/lib/site";

export const BLOGS_COLLECTION = "PHC-Blogs";

/**
 * Format static blog posts to have consistent fields with dynamic blogs
 */
export const DEFAULT_BLOGS = (staticBlogPosts || []).map((post, index) => {
  let category = "Caregiver Tips";
  if (post.slug.includes("waiver") || post.slug.includes("medicaid")) {
    category = "Medicaid Waiver";
  } else if (post.slug.includes("cost") || post.slug.includes("assisted-living")) {
    category = "Senior Wellness";
  } else if (post.slug.includes("safe-home")) {
    category = "Home Safety";
  }

  const htmlContent = Array.isArray(post.content)
    ? post.content.map((p) => `<p>${p}</p>`).join("")
    : post.content || "";

  return {
    id: `seed_${post.slug}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: htmlContent,
    rawContentArray: Array.isArray(post.content) ? post.content : [],
    category,
    image: post.image || "/images/photos/fallback-care.webp",
    author: "Pavan Homecare Clinical Care Team",
    readTime: "5 min read",
    status: "published",
    featured: index === 0,
    publishedAt: post.date ? `${post.date}T10:00:00Z` : new Date().toISOString(),
    createdAt: post.date ? `${post.date}T10:00:00Z` : new Date().toISOString(),
    updatedAt: post.date ? `${post.date}T10:00:00Z` : new Date().toISOString(),
    isDefault: true
  };
});

/**
 * Helper to slugify a string
 */
export function slugify(text) {
  return (text || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/**
 * Calculate estimated reading time
 */
export function calculateReadTime(text) {
  if (!text) return "3 min read";
  const clean = text.replace(/<[^>]*>?/gm, " ");
  const words = clean.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Seed initial blog posts into Firestore if collection is empty
 */
export async function seedInitialBlogsIfEmpty() {
  try {
    const colRef = collection(db, BLOGS_COLLECTION);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return { seeded: false, count: snap.size };
    }

    let count = 0;
    for (const post of DEFAULT_BLOGS) {
      const docRef = doc(db, BLOGS_COLLECTION, post.slug);
      await setDoc(docRef, {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        image: post.image,
        author: post.author,
        readTime: post.readTime,
        status: post.status,
        featured: post.featured,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        isDefault: true
      });
      count++;
    }
    return { seeded: true, count };
  } catch (err) {
    console.warn("Could not seed initial blogs to Firestore:", err?.message);
    return { seeded: false, error: err?.message };
  }
}

/**
 * Get all blogs (merges Firestore + Server local dynamic store + Defaults)
 */
export async function getAllBlogs({ onlyPublished = false } = {}) {
  const mergedMap = new Map();

  // 1. Populate default blogs first
  DEFAULT_BLOGS.forEach((b) => {
    mergedMap.set(b.slug, b);
  });

  // 2. Server-side only: check local dynamic blogs from disk
  if (typeof window === "undefined") {
    try {
      const { getLocalDynamicBlogs } = await import("@/lib/blogsServer");
      const localBlogs = getLocalDynamicBlogs();
      localBlogs.forEach((b) => {
        mergedMap.set(b.slug, b);
      });
    } catch (e) {
      // Ignore
    }
  }

  // 3. Overlay Firestore blogs if accessible
  try {
    const colRef = collection(db, BLOGS_COLLECTION);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      snap.forEach((docSnap) => {
        const data = docSnap.data();
        mergedMap.set(data.slug || docSnap.id, {
          id: docSnap.id,
          ...data
        });
      });
    }
  } catch (fsErr) {
    // Non-blocking fallback
  }

  let allList = Array.from(mergedMap.values());

  // Filter if onlyPublished is requested
  if (onlyPublished) {
    allList = allList.filter((b) => (b.status || "published").toLowerCase() === "published");
  }

  // Sort: featured items first, then by date descending
  allList.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const timeA = new Date(a.publishedAt || a.createdAt || a.date || 0).getTime();
    const timeB = new Date(b.publishedAt || b.createdAt || b.date || 0).getTime();
    return timeB - timeA;
  });

  return allList;
}

/**
 * Get a single blog by slug
 */
export async function getBlogBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();

  // 1. Server-side only: check local dynamic store first for instant accessibility
  if (typeof window === "undefined") {
    try {
      const { getLocalDynamicBlogs } = await import("@/lib/blogsServer");
      const localBlogs = getLocalDynamicBlogs();
      const localFound = localBlogs.find((b) => b.slug === cleanSlug || b.id === cleanSlug);
      if (localFound) return localFound;
    } catch (e) {
      // Ignore
    }
  }

  // 2. Check Firestore
  try {
    const colRef = collection(db, BLOGS_COLLECTION);
    const q = query(colRef, where("slug", "==", cleanSlug), limit(1));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const docSnap = snap.docs[0];
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }

    const directDoc = await getDoc(doc(db, BLOGS_COLLECTION, cleanSlug));
    if (directDoc.exists()) {
      return {
        id: directDoc.id,
        ...directDoc.data()
      };
    }
  } catch (err) {
    // Ignore and fallback
  }

  // 3. Fallback to static default blogs
  const defaultFound = DEFAULT_BLOGS.find((p) => p.slug === cleanSlug);
  return defaultFound || null;
}
