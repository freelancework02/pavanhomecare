/**
 * Pavan Homecare Cookie Consent & Telemetry Helper
 * Privacy & Cookie Consent Compliance
 */

export const CONSENT_STORAGE_KEY = "phc_cookie_consent_v1";
export const VISITOR_STORAGE_KEY = "phc_visitor_id";
export const SESSION_STORAGE_KEY = "phc_session_id";
export const SESSION_PAGES_KEY = "phc_session_pages";
export const SESSION_CLICKS_KEY = "phc_session_clicks";

/**
 * Generates an anonymous unique identifier
 */
export function generateUid(prefix = "phc") {
  const rand = Math.random().toString(36).substring(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${rand}`;
}

/**
 * Gets or creates persistent anonymous visitor ID
 */
export function getVisitorId() {
  if (typeof window === "undefined") return "server_visitor";
  try {
    let vid = localStorage.getItem(VISITOR_STORAGE_KEY);
    if (!vid) {
      vid = generateUid("vid");
      localStorage.setItem(VISITOR_STORAGE_KEY, vid);
    }
    return vid;
  } catch (e) {
    return generateUid("vid");
  }
}

/**
 * Gets or creates session ID (refreshes if inactive)
 */
export function getSessionId() {
  if (typeof window === "undefined") return "server_session";
  try {
    let sid = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sid) {
      sid = generateUid("sess");
      sessionStorage.setItem(SESSION_STORAGE_KEY, sid);
      sessionStorage.setItem(`${SESSION_STORAGE_KEY}_start`, new Date().toISOString());
    }
    return sid;
  } catch (e) {
    return generateUid("sess");
  }
}

/**
 * Reads existing cookie consent preferences
 */
export function getStoredConsent() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

/**
 * Detects device category and browser details
 */
export function getDeviceAndBrowserInfo() {
  if (typeof window === "undefined") {
    return { deviceType: "Server", browser: "Node", os: "Server" };
  }

  const ua = navigator.userAgent || "";
  let deviceType = "Desktop";
  if (/mobile/i.test(ua)) deviceType = "Mobile";
  else if (/tablet|ipad/i.test(ua)) deviceType = "Tablet";

  // Browser detection
  let browser = "Other";
  if (/edg/i.test(ua)) browser = "Microsoft Edge";
  else if (/chrome|crios/i.test(ua)) browser = "Google Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Mozilla Firefox";
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Apple Safari";
  else if (/opr\//i.test(ua)) browser = "Opera";

  // OS detection
  let os = "Other";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/linux/i.test(ua)) os = "Linux";

  return {
    deviceType,
    browser,
    os,
    userAgent: ua,
    screenResolution: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    pixelRatio: window.devicePixelRatio || 1,
    colorDepth: window.screen?.colorDepth || 24,
    touchSupported: "ontouchstart" in window || navigator.maxTouchPoints > 0
  };
}

/**
 * Extracts approximate location and timezone (Privacy-safe)
 */
export function getApproximateLocationInfo() {
  if (typeof window === "undefined") {
    return { timezone: "America/New_York", locale: "en-US" };
  }

  let timezone = "America/New_York";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
  } catch (e) {}

  const offsetMinutes = new Date().getTimezoneOffset();
  const offsetHours = -offsetMinutes / 60;
  const offsetSign = offsetHours >= 0 ? `+${offsetHours}` : `${offsetHours}`;

  return {
    timezone,
    timezoneOffset: `UTC${offsetSign}`,
    locale: navigator.language || "en-US",
    primaryLanguages: navigator.languages ? Array.from(navigator.languages) : ["en-US"],
    primaryRegion: "Pennsylvania (PA), USA"
  };
}

/**
 * Extracts referral source and UTM marketing attributes
 */
export function getReferralSource() {
  if (typeof window === "undefined") {
    return { referrer: "Direct", utm: {} };
  }

  const referrer = document.referrer ? document.referrer : "Direct / Bookmark";
  const params = new URLSearchParams(window.location.search);

  const utm = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    const val = params.get(key);
    if (val) utm[key] = val;
  });

  return {
    referrer,
    hasUtm: Object.keys(utm).length > 0,
    utm
  };
}

/**
 * Appends current page visit to session history
 */
export function trackPageVisit(pathname) {
  if (typeof window === "undefined" || !pathname) return;
  try {
    let pages = [];
    const raw = sessionStorage.getItem(SESSION_PAGES_KEY);
    if (raw) pages = JSON.parse(raw);

    const visit = {
      path: pathname,
      timestamp: new Date().toISOString(),
      title: document.title || ""
    };

    // Avoid duplicate rapid recordings of the exact same path
    const last = pages[pages.length - 1];
    if (!last || last.path !== pathname) {
      pages.push(visit);
      sessionStorage.setItem(SESSION_PAGES_KEY, JSON.stringify(pages.slice(-25)));
    }
  } catch (e) {}
}

/**
 * Gets recorded session pages
 */
export function getSessionPages() {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(SESSION_PAGES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

/**
 * Tracks a user click / interaction event in session
 */
export function trackUserClick(action, details = {}) {
  if (typeof window === "undefined") return;
  try {
    let clicks = [];
    const raw = sessionStorage.getItem(SESSION_CLICKS_KEY);
    if (raw) clicks = JSON.parse(raw);

    clicks.push({
      action,
      details,
      path: window.location.pathname,
      timestamp: new Date().toISOString()
    });

    sessionStorage.setItem(SESSION_CLICKS_KEY, JSON.stringify(clicks.slice(-30)));
  } catch (e) {}
}

/**
 * Gets recorded session clicks
 */
export function getSessionClicks() {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(SESSION_CLICKS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

/**
 * Gathers complete telemetry and consent payload to send to /api/cookie-consent
 */
export function buildTelemetryPayload(consentDecision) {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const device = getDeviceAndBrowserInfo();
  const location = getApproximateLocationInfo();
  const referral = getReferralSource();
  const pagesVisited = getSessionPages();
  const clicks = getSessionClicks();

  const now = new Date();
  const formattedDate = now.toLocaleString("en-US", {
    timeZone: location.timezone || "America/New_York",
    dateStyle: "full",
    timeStyle: "medium"
  });

  return {
    consentId: generateUid("consent"),
    visitorId,
    sessionId,
    consentStatus: consentDecision.status, // "accepted_all" | "rejected_non_essential" | "customized"
    categories: {
      necessary: true,
      analytics: Boolean(consentDecision.analytics),
      functional: Boolean(consentDecision.functional),
      marketing: false // Pavan Homecare does not sell data
    },
    doNotSellShare: Boolean(consentDecision.doNotSellShare ?? true), // Privacy opt-out safeguard
    // Analytics Telemetry
    analytics: {
      pagesVisited: pagesVisited.length ? pagesVisited : [{ path: window.location.pathname, timestamp: now.toISOString() }],
      pageCount: Math.max(pagesVisited.length, 1),
      currentUrl: window.location.href,
      currentPath: window.location.pathname,
      clicksRecorded: clicks
    },
    // Device & Browser
    deviceInfo: device,
    // Location & Locale
    approximateLocation: location,
    // Referral Source & Campaign
    referralInfo: referral,
    // Session & User Preferences
    preferencesInfo: {
      language: navigator.language || "en-US",
      savedSettings: {
        theme: "light",
        highContrast: false,
        cookieNoticeDismissed: true
      },
      filters: {
        county: "all",
        blogCategory: "all"
      }
    },
    // Compliance Metadata
    legalFramework: "Standard Privacy & Cookie Consent",
    policyVersion: "2026.1",
    timestamp: now.toISOString(),
    formattedDate
  };
}

/**
 * Saves consent locally and persists to Firestore collection "PHC-cookie-consent-data"
 */
export async function saveCookieConsent(consentDecision) {
  if (typeof window === "undefined") return { success: false };

  try {
    // 1. Save locally in localStorage for instant retrieval across pages
    const consentRecord = {
      status: consentDecision.status,
      analytics: Boolean(consentDecision.analytics),
      functional: Boolean(consentDecision.functional),
      doNotSellShare: Boolean(consentDecision.doNotSellShare ?? true),
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentRecord));

    // 2. Build full telemetry & consent package
    const payload = buildTelemetryPayload(consentDecision);

    // 3. Send to Server API to record in Firestore collection "PHC-cookie-consent-data"
    const res = await fetch("/api/cookie-consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return { success: true, record: payload, firestoreId: data.id };
  } catch (error) {
    console.error("Failed to save cookie consent:", error);
    return { success: false, error: error.message };
  }
}
