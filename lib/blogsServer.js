import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DYNAMIC_BLOGS_FILE = path.join(DATA_DIR, "dynamicBlogs.json");

/**
 * Read local dynamic blogs from disk
 */
export function getLocalDynamicBlogs() {
  try {
    if (!fs.existsSync(DYNAMIC_BLOGS_FILE)) {
      return [];
    }
    const content = fs.readFileSync(DYNAMIC_BLOGS_FILE, "utf-8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Could not read local dynamic blogs file:", err.message);
    return [];
  }
}

/**
 * Save or update a dynamic blog post locally
 */
export function saveLocalDynamicBlog(blog) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const current = getLocalDynamicBlogs();
    const existingIndex = current.findIndex(
      (b) => b.id === blog.id || b.slug === blog.slug
    );

    if (existingIndex >= 0) {
      current[existingIndex] = {
        ...current[existingIndex],
        ...blog,
        updatedAt: new Date().toISOString()
      };
    } else {
      current.unshift(blog);
    }

    fs.writeFileSync(DYNAMIC_BLOGS_FILE, JSON.stringify(current, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Could not save to local dynamic blogs file:", err.message);
    return false;
  }
}

/**
 * Delete a local dynamic blog post
 */
export function deleteLocalDynamicBlog(idOrSlug) {
  try {
    if (!fs.existsSync(DYNAMIC_BLOGS_FILE)) return false;
    const current = getLocalDynamicBlogs();
    const filtered = current.filter((b) => b.id !== idOrSlug && b.slug !== idOrSlug);
    fs.writeFileSync(DYNAMIC_BLOGS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Could not delete from local dynamic blogs file:", err.message);
    return false;
  }
}
