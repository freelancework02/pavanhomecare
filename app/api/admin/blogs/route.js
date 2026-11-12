import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc
} from "firebase/firestore/lite";
import {
  BLOGS_COLLECTION,
  DEFAULT_BLOGS,
  getAllBlogs,
  slugify,
  calculateReadTime,
  seedInitialBlogsIfEmpty
} from "@/lib/blogs";
import {
  saveLocalDynamicBlog,
  deleteLocalDynamicBlog
} from "@/lib/blogsServer";
import { authenticateAdminRequest } from "@/lib/adminAuthServer";

// GET: Fetch all blogs (both published and drafts) for admin panel
export async function GET(request) {
  const auth = authenticateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Valid admin session required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const shouldSeed = searchParams.get("seed") === "true";

    if (shouldSeed) {
      const seedResult = await seedInitialBlogsIfEmpty();
      return NextResponse.json({ success: true, ...seedResult });
    }

    // getAllBlogs combines Firestore + Local Dynamic Store + Defaults
    const blogs = await getAllBlogs({ onlyPublished: false });

    return NextResponse.json({
      success: true,
      count: blogs.length,
      blogs,
      source: "hybrid"
    });
  } catch (error) {
    console.error("Admin blogs GET error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST: Create a new blog post
export async function POST(request) {
  const auth = authenticateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Valid admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const {
      title,
      slug: rawSlug,
      excerpt,
      content,
      category = "Caregiver Tips",
      image = "/images/photos/blog-listing-hero.webp",
      author = "Pavan Homecare Clinical Care Team",
      status = "published",
      featured = false
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Blog title is required." },
        { status: 400 }
      );
    }

    const generatedSlug = slugify(rawSlug || title);
    const readTime = calculateReadTime(content);
    const blogId = `dynamic_${Date.now()}_${generatedSlug.slice(0, 20)}`;

    const blogDoc = {
      id: blogId,
      slug: generatedSlug,
      title: title.trim(),
      excerpt: (excerpt || "").trim(),
      content: (content || "").trim(),
      category: category.trim(),
      image: (image || "").trim() || "/images/photos/blog-listing-hero.webp",
      author: author.trim(),
      readTime,
      status: status || "published",
      featured: Boolean(featured),
      publishedAt: status === "published" ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 1. Save to local dynamic store (guaranteed immediate local persistence)
    saveLocalDynamicBlog(blogDoc);

    // 2. Attempt Firestore sync
    try {
      const docRef = doc(db, BLOGS_COLLECTION, blogDoc.id);
      await setDoc(docRef, blogDoc, { merge: true });
    } catch (fsErr) {
      console.warn("Firestore sync warning (check firestore.rules if desired):", fsErr.message);
    }

    return NextResponse.json({
      success: true,
      message: `Blog post "${title}" successfully ${status === "published" ? "published" : "saved as draft"}!`,
      blog: blogDoc
    });
  } catch (error) {
    console.error("Admin blogs POST error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to create blog post"
      },
      { status: 500 }
    );
  }
}

// PATCH: Update an existing blog post
export async function PATCH(request) {
  const auth = authenticateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Valid admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, slug, title, excerpt, content, category, image, author, status, featured } = body;

    const targetId = id || slug;
    if (!targetId) {
      return NextResponse.json(
        { success: false, error: "Blog ID or slug is required for update." },
        { status: 400 }
      );
    }

    const updates = {
      id: targetId,
      updatedAt: new Date().toISOString()
    };

    if (title !== undefined) updates.title = title.trim();
    if (slug !== undefined) updates.slug = slugify(slug);
    if (excerpt !== undefined) updates.excerpt = excerpt.trim();
    if (content !== undefined) {
      updates.content = content.trim();
      updates.readTime = calculateReadTime(content);
    }
    if (category !== undefined) updates.category = category.trim();
    if (image !== undefined) updates.image = image.trim();
    if (author !== undefined) updates.author = author.trim();
    if (status !== undefined) {
      updates.status = status;
      if (status === "published" && !body.publishedAt) {
        updates.publishedAt = new Date().toISOString();
      }
    }
    if (featured !== undefined) updates.featured = Boolean(featured);

    // 1. Update in local dynamic store
    saveLocalDynamicBlog(updates);

    // 2. Attempt Firestore update
    try {
      const docRef = doc(db, BLOGS_COLLECTION, targetId);
      await setDoc(docRef, updates, { merge: true });
    } catch (fsErr) {
      console.warn("Firestore sync warning:", fsErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully!",
      updated: updates
    });
  } catch (error) {
    console.error("Admin blogs PATCH error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a blog post by ID or slug
export async function DELETE(request) {
  const auth = authenticateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Valid admin session required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Blog ID is required for deletion." },
        { status: 400 }
      );
    }

    // 1. Delete from local dynamic store
    deleteLocalDynamicBlog(id);

    // 2. Attempt Firestore delete
    try {
      const docRef = doc(db, BLOGS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (fsErr) {
      console.warn("Firestore delete warning:", fsErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully.",
      deletedId: id
    });
  } catch (error) {
    console.error("Admin blogs DELETE error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
