import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";
import fs from "fs";
import path from "path";
import { authenticateAdminRequest } from "@/lib/adminAuthServer";

const COOKIE_COLLECTION = "PHC-cookie-consent-data";
const DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_CONSENT_FILE = path.join(DATA_DIR, "cookieConsentData.json");

/**
 * Ensures data directory and local backup file exist
 */
function getLocalConsentRecords() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(LOCAL_CONSENT_FILE)) {
      const content = fs.readFileSync(LOCAL_CONSENT_FILE, "utf-8");
      return JSON.parse(content || "[]");
    }
  } catch (err) {
    console.warn("Could not read local consent backup:", err.message);
  }
  return [];
}

function saveLocalConsentRecord(record) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const current = getLocalConsentRecords();
    const updated = [record, ...current.filter((item) => item.consentId !== record.consentId)].slice(0, 500);
    fs.writeFileSync(LOCAL_CONSENT_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write local consent backup:", err.message);
  }
}

/**
 * POST: Record cookie consent decision and visitor analytics
 * Collection: "PHC-cookie-consent-data"
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Client network headers (anonymized/safe)
    const forwarded = request.headers.get("x-forwarded-for");
    const rawIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    // Anonymize IP (mask last octet for IPv4 or end of IPv6 to respect privacy)
    const anonymizedIp = rawIp.includes(".")
      ? rawIp.replace(/\.\d+$/, ".xxx")
      : rawIp.includes(":")
      ? rawIp.replace(/:[^:]+$/, ":xxxx")
      : "anonymized";

    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      timeZone: body.approximateLocation?.timezone || "America/New_York",
      dateStyle: "full",
      timeStyle: "medium"
    });

    const consentDocument = {
      collection: COOKIE_COLLECTION,
      consentId: body.consentId || `consent_${Date.now()}`,
      visitorId: body.visitorId || "anonymous_visitor",
      sessionId: body.sessionId || "anonymous_session",
      consentStatus: body.consentStatus || "accepted_all", // "accepted_all" | "rejected_non_essential" | "customized"
      categories: {
        necessary: true,
        analytics: Boolean(body.categories?.analytics),
        functional: Boolean(body.categories?.functional),
        marketing: false
      },
      doNotSellShare: Boolean(body.doNotSellShare ?? true),
      // Analytics Telemetry
      analytics: {
        pagesVisited: body.analytics?.pagesVisited || [{ path: "/", timestamp: now.toISOString() }],
        pageCount: body.analytics?.pageCount || 1,
        currentUrl: body.analytics?.currentUrl || "",
        currentPath: body.analytics?.currentPath || "/",
        clicksRecorded: body.analytics?.clicksRecorded || []
      },
      // Device & Browser
      deviceInfo: {
        deviceType: body.deviceInfo?.deviceType || "Desktop",
        browser: body.deviceInfo?.browser || "Other",
        os: body.deviceInfo?.os || "Other",
        screenResolution: body.deviceInfo?.screenResolution || "N/A",
        viewportSize: body.deviceInfo?.viewportSize || "N/A"
      },
      // Location & Regional Info
      approximateLocation: {
        timezone: body.approximateLocation?.timezone || "America/New_York",
        timezoneOffset: body.approximateLocation?.timezoneOffset || "UTC-4",
        locale: body.approximateLocation?.locale || "en-US",
        region: "Pennsylvania (PA), USA",
        clientIpMasked: anonymizedIp
      },
      // Referral Information
      referralInfo: {
        referrer: body.referralInfo?.referrer || "Direct / Bookmark",
        utm: body.referralInfo?.utm || {}
      },
      // Saved Settings & Filters
      preferencesInfo: {
        language: body.preferencesInfo?.language || "en-US",
        savedSettings: body.preferencesInfo?.savedSettings || {},
        filters: body.preferencesInfo?.filters || {}
      },
      // Legal Framework
      legalFramework: "US-Privacy (CCPA / CPRA / CalOPPA)",
      policyVersion: "2026.1",
      submittedAtIso: now.toISOString(),
      formattedDate
    };

    // 1. Save to local dynamic JSON store
    saveLocalConsentRecord(consentDocument);

    // 2. Persist to Firestore collection "PHC-cookie-consent-data"
    let firestoreId = null;
    try {
      const colRef = collection(db, COOKIE_COLLECTION);
      const docRef = await addDoc(colRef, {
        ...consentDocument,
        submittedAt: serverTimestamp()
      });
      firestoreId = docRef.id;
    } catch (fsErr) {
      console.warn("Firestore PHC-cookie-consent-data sync warning:", fsErr.message);
    }

    return NextResponse.json({
      success: true,
      message: `Cookie consent successfully recorded in ${COOKIE_COLLECTION}`,
      collection: COOKIE_COLLECTION,
      consentId: consentDocument.consentId,
      firestoreId,
      timestamp: consentDocument.submittedAtIso,
      formattedDate
    });
  } catch (error) {
    console.error("Error saving cookie consent:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to record cookie consent" },
      { status: 500 }
    );
  }
}

/**
 * GET: Fetch recorded cookie consent data and analytics stats (Admin only)
 */
export async function GET(request) {
  const auth = authenticateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Valid admin session required." },
      { status: 401 }
    );
  }

  try {
    let records = [];

    // 1. Try fetching from Firestore collection "PHC-cookie-consent-data"
    try {
      const colRef = collection(db, COOKIE_COLLECTION);
      const q = query(colRef, orderBy("submittedAt", "desc"), limit(100));
      const snap = await getDocs(q);
      snap.forEach((d) => {
        records.push({ id: d.id, ...d.data() });
      });
    } catch (fsErr) {
      // Fallback to local storage if Firestore rules not yet synced
    }

    // 2. Fallback / Merge with local dynamic backup
    if (!records.length) {
      records = getLocalConsentRecords();
    }

    // Calculate aggregated metrics
    const total = records.length;
    let acceptedAll = 0;
    let rejected = 0;
    let customized = 0;
    const pageCounts = {};
    const deviceCounts = { Desktop: 0, Mobile: 0, Tablet: 0 };
    const browserCounts = {};

    records.forEach((r) => {
      if (r.consentStatus === "accepted_all") acceptedAll++;
      else if (r.consentStatus === "rejected_non_essential") rejected++;
      else customized++;

      const dev = r.deviceInfo?.deviceType || "Desktop";
      if (deviceCounts[dev] !== undefined) deviceCounts[dev]++;
      else deviceCounts[dev] = 1;

      const br = r.deviceInfo?.browser || "Other";
      browserCounts[br] = (browserCounts[br] || 0) + 1;

      const pages = r.analytics?.pagesVisited || [];
      pages.forEach((p) => {
        const pathStr = typeof p === "string" ? p : p.path || "/";
        pageCounts[pathStr] = (pageCounts[pathStr] || 0) + 1;
      });
    });

    const topPages = Object.entries(pageCounts)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    return NextResponse.json({
      success: true,
      collection: COOKIE_COLLECTION,
      count: total,
      metrics: {
        total,
        acceptedAll,
        rejected,
        customized,
        acceptRate: total ? Math.round((acceptedAll / total) * 100) : 0,
        deviceCounts,
        browserCounts,
        topPages
      },
      records: records.slice(0, 50)
    });
  } catch (error) {
    console.error("Error reading cookie consent records:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch cookie consent data" },
      { status: 500 }
    );
  }
}
