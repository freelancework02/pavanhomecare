import { NextResponse } from "next/server";
import { getAllBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const blogs = await getAllBlogs({ onlyPublished: true });

    let filtered = blogs;
    if (category && category !== "all") {
      filtered = blogs.filter(
        (b) =>
          (b.category || "").toLowerCase().replace(/\s+/g, "-") === category.toLowerCase() ||
          (b.category || "").toLowerCase() === category.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      blogs: filtered
    });
  } catch (err) {
    console.error("Public blogs API error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load blogs" },
      { status: 500 }
    );
  }
}
