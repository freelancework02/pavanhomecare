import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { runLighthouseAudit, resolveAuditUrl } from "@/lib/lighthouseRunner";
import { authenticateAdminRequest } from "@/lib/adminAuthServer";
import { getAllBlogs } from "@/lib/blogs";

const DATA_DIR = path.join(process.cwd(), "data");
const AUDITS_FILE = path.join(DATA_DIR, "lighthouseAudits.json");

function getAuditHistory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(AUDITS_FILE)) {
      const data = fs.readFileSync(AUDITS_FILE, "utf-8");
      return JSON.parse(data || "[]");
    }
  } catch (err) {
    console.warn("Could not read audit history:", err.message);
  }
  return [];
}

function saveAuditRecord(record) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const current = getAuditHistory();
    const updated = [record, ...current].slice(0, 50);
    fs.writeFileSync(AUDITS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not save audit record:", err.message);
  }
}

// Standard public website routes (strictly excluding /admin and internal paths)
const CORE_WEBSITE_PAGES = [
  { path: "/", label: "Home Page (/)", category: "Core Website" },
  { path: "/services", label: "Care Services Overview (/services)", category: "Core Website" },
  { path: "/blog", label: "Care Resource Hub & Blog (/blog)", category: "Core Website" },
  { path: "/contact-us", label: "Contact & Free Care Assessment (/contact-us)", category: "Core Website" },
  { path: "/about", label: "About Us & Mission (/about)", category: "Core Website" },
  { path: "/areas-we-serve", label: "Service Territory Overview (/areas-we-serve)", category: "Core Website" },
  { path: "/companion-care", label: "Companion Care (/companion-care)", category: "Service Pages" },
  { path: "/personal-care", label: "Personal Care (/personal-care)", category: "Service Pages" },
  { path: "/24-hour-live-in-care", label: "24-Hour Live-In Care (/24-hour-live-in-care)", category: "Service Pages" },
  { path: "/dementia-alzheimers-care", label: "Dementia & Alzheimer's Care (/dementia-alzheimers-care)", category: "Service Pages" },
  { path: "/post-hospital-respite-care", label: "Respite & Post-Hospital Care (/post-hospital-respite-care)", category: "Service Pages" }
];

// GET: Fetch available audit pages (Core Website + Dynamic Published Blogs) and audit history
export async function GET(request) {
  const auth = authenticateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Valid admin session required." },
      { status: 401 }
    );
  }

  try {
    const history = getAuditHistory();
    const latest = history[0] || null;

    // Dynamically retrieve published blogs to ensure every blog article can be audited
    let blogPages = [];
    try {
      const dynamicBlogs = await getAllBlogs({ onlyPublished: true });
      if (Array.isArray(dynamicBlogs)) {
        blogPages = dynamicBlogs.map((b) => ({
          path: `/blog/${b.slug}`,
          label: `Blog: ${b.title || b.slug}`,
          category: "Published Blog Articles",
          slug: b.slug
        }));
      }
    } catch (blogErr) {
      console.warn("Could not dynamically load blogs for Lighthouse targets:", blogErr.message);
    }

    const allPages = [...CORE_WEBSITE_PAGES, ...blogPages];

    return NextResponse.json({
      success: true,
      pages: allPages,
      corePages: CORE_WEBSITE_PAGES,
      blogPages,
      historyCount: history.length,
      latestAudit: latest,
      recentAudits: history.slice(0, 10),
      adminExcluded: true,
      message: "Targeting public website pages and published blogs only. Admin panel is excluded from SEO indexing."
    });
  } catch (error) {
    console.error("Lighthouse GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load audit data" },
      { status: 500 }
    );
  }
}

// POST: Run a new Google Lighthouse audit on selected page
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
    const { path: targetPath = "/", device = "mobile", baseUrl } = body;

    // STRICT CHECK: Ensure the admin portal and internal APIs are NEVER targeted for SEO auditing
    const cleanPath = (targetPath || "").trim();
    if (
      cleanPath.startsWith("/admin") ||
      cleanPath.includes("/admin") ||
      cleanPath.startsWith("/api")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "The Admin Portal (/admin) is an internal management tool and is strictly excluded from SEO indexing (noindex, nofollow, disallow in robots.txt). Google Lighthouse audits are exclusively reserved for public website pages and published blog articles to grow search rankings."
        },
        { status: 400 }
      );
    }

    // Dynamically resolve incoming origin from request headers or environment
    const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
    const protoHeader = request.headers.get("x-forwarded-proto") || (hostHeader.includes("localhost") || hostHeader.includes("127.0.0.1") ? "http" : "https");
    const autoOrigin = hostHeader ? `${protoHeader}://${hostHeader}` : (process.env.NEXT_PUBLIC_SITE_URL || "https://pavanhomecare.com");

    let resolvedBase = baseUrl || autoOrigin;
    if (process.env.NODE_ENV === "production" && (resolvedBase.includes("localhost") || resolvedBase.includes("127.0.0.1"))) {
      resolvedBase = autoOrigin.includes("localhost") ? "https://pavanhomecare.com" : autoOrigin;
    }

    const fullUrl = resolveAuditUrl(cleanPath, resolvedBase);

    // Run Lighthouse evaluation
    const auditReport = await runLighthouseAudit(fullUrl, device);

    // Save record to audit history
    const auditEntry = {
      id: `audit_${Date.now()}`,
      path: cleanPath,
      fullUrl,
      device,
      timestamp: auditReport.auditedAt,
      durationMs: auditReport.durationMs,
      scores: auditReport.scores,
      metrics: auditReport.metrics,
      report: auditReport
    };
    saveAuditRecord(auditEntry);

    return NextResponse.json({
      success: true,
      message: `Google Lighthouse audit completed for ${cleanPath}`,
      audit: auditEntry
    });
  } catch (error) {
    console.error("Lighthouse POST audit error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Lighthouse audit failed" },
      { status: 500 }
    );
  }
}
