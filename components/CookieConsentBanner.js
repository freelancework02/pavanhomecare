"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Sliders,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Info,
  Activity,
  Settings,
  ShieldAlert,
  Cookie
} from "lucide-react";
import {
  CONSENT_STORAGE_KEY,
  getStoredConsent,
  trackPageVisit,
  trackUserClick,
  saveCookieConsent
} from "@/lib/cookieConsent";

export default function CookieConsentBanner() {
  const pathname = usePathname();

  // Consent & modal states
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Granular category choices
  const [preferences, setPreferences] = useState({
    necessary: true, // Always locked
    analytics: true,
    functional: true,
    doNotSellShare: true // Data protection opt-out
  });

  // Track page visits automatically
  useEffect(() => {
    if (pathname && !pathname.startsWith("/admin")) {
      trackPageVisit(pathname);
    }
  }, [pathname]);

  // Global click tracking for telemetry (CTA clicks, call links, etc.)
  useEffect(() => {
    const handleDocumentClick = (e) => {
      try {
        const target = e.target.closest("a, button");
        if (target) {
          const href = target.getAttribute("href") || "";
          const text = target.innerText?.trim()?.slice(0, 50) || "";
          const id = target.id || "";
          if (href.startsWith("tel:")) {
            trackUserClick("phone_call_clicked", { phone: href, text });
          } else if (href.includes("contact") || text.toLowerCase().includes("contact") || text.toLowerCase().includes("consultation")) {
            trackUserClick("cta_inquiry_clicked", { href, text });
          } else if (id.includes("chat") || text.toLowerCase().includes("chat")) {
            trackUserClick("chatbot_opened", { id });
          }
        }
      } catch (err) {}
    };

    window.addEventListener("click", handleDocumentClick, { passive: true });
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  // Sync banner and modal states with DOM and global events
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute(
      "data-cookie-banner",
      showBanner ? "open" : "closed"
    );
    document.documentElement.setAttribute(
      "data-cookie-modal",
      showModal ? "open" : "closed"
    );
    window.dispatchEvent(
      new CustomEvent("phc_cookie_state_change", {
        detail: { bannerOpen: showBanner, modalOpen: showModal }
      })
    );
  }, [showBanner, showModal]);

  // Check existing consent on mount
  useEffect(() => {
    setHasLoaded(true);
    const existing = getStoredConsent();
    if (!existing) {
      // Set DOM indicator immediately so floating widgets (chatbot, sticky call) don't overlap
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-cookie-banner", "open");
        window.dispatchEvent(
          new CustomEvent("phc_cookie_state_change", {
            detail: { bannerOpen: true, modalOpen: false }
          })
        );
      }
      // Delay showing banner slightly for smooth entrance
      const timer = setTimeout(() => setShowBanner(true), 400);
      return () => clearTimeout(timer);
    } else {
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-cookie-banner", "closed");
        window.dispatchEvent(
          new CustomEvent("phc_cookie_state_change", {
            detail: { bannerOpen: false, modalOpen: false }
          })
        );
      }
      setPreferences({
        necessary: true,
        analytics: Boolean(existing.analytics),
        functional: Boolean(existing.functional),
        doNotSellShare: Boolean(existing.doNotSellShare ?? true)
      });
    }
  }, []);

  // Listen to open modal or banner events from links, hash, or custom events
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#cookie-settings" || window.location.hash === "#privacy-choices") {
        setShowModal(true);
      } else if (window.location.hash === "#cookie-banner") {
        setShowBanner(true);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);

    const handleCustomOpen = (e) => {
      if (e.detail?.target === "modal") {
        setShowModal(true);
      } else {
        setShowBanner(true);
      }
    };
    window.addEventListener("phc_open_cookie_preferences", handleCustomOpen);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("phc_open_cookie_preferences", handleCustomOpen);
    };
  }, []);

  // Handle dismiss with default essential cookies
  const handleDismissBanner = () => {
    const decision = {
      status: "dismissed_default",
      analytics: false,
      functional: true,
      doNotSellShare: true
    };
    setPreferences(decision);
    setShowBanner(false);
    saveCookieConsent(decision).catch(console.error);
  };

  // Do not display on admin pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  // Handle "Accept All"
  const handleAcceptAll = () => {
    const decision = {
      status: "accepted_all",
      analytics: true,
      functional: true,
      doNotSellShare: true
    };
    setPreferences(decision);
    setShowBanner(false);
    setShowModal(false);
    triggerSavedToast();
    saveCookieConsent(decision).catch(console.error);

    // Enable Google Analytics consent
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted"
      });
    }
  };

  // Handle "Reject Non-Essential" (Strict Privacy)
  const handleRejectNonEssential = () => {
    const decision = {
      status: "rejected_non_essential",
      analytics: false,
      functional: false,
      doNotSellShare: true // Strictly opted out
    };
    setPreferences(decision);
    setShowBanner(false);
    setShowModal(false);
    triggerSavedToast();
    saveCookieConsent(decision).catch(console.error);

    // Restrict Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        personalization_storage: "denied"
      });
    }
  };

  // Handle "Save Preferences"
  const handleSaveCustomPreferences = () => {
    const decision = {
      status: "customized",
      analytics: preferences.analytics,
      functional: preferences.functional,
      doNotSellShare: preferences.doNotSellShare
    };
    setShowBanner(false);
    setShowModal(false);
    triggerSavedToast();
    saveCookieConsent(decision).catch(console.error);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: preferences.analytics ? "granted" : "denied",
        functionality_storage: preferences.functional ? "granted" : "denied"
      });
    }
  };

  const triggerSavedToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3500);
  };

  if (!hasLoaded) return null;

  return (
    <>
      {/* =====================================================================
          1. FLOATING COOKIE CONSENT BANNER (Notice at Collection)
          ===================================================================== */}
      {showBanner && !showModal && (
        <aside
          role="dialog"
          aria-label="Cookie consent banner"
          aria-describedby="cookie-consent-description"
          className="fixed bottom-3 sm:bottom-6 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-xl z-[9998] animate-slideUp"
        >
          <div className="bg-[#001A4D]/95 backdrop-blur-xl border border-white/20 text-white rounded-3xl p-4 sm:p-6 shadow-2xl shadow-blue-950/50 relative overflow-hidden">
            {/* Soft Ambient Glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#0061FF]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#60EFFF] shrink-0 mt-0.5 border border-white/10">
                <ShieldCheck size={20} className="sm:w-[22px] sm:h-[22px]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white !text-white tracking-tight flex flex-wrap items-center gap-1.5 sm:gap-2 m-0 !mb-0">
                    <span>Your Privacy &amp; Cookie Choices</span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleDismissBanner}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                    aria-label="Dismiss cookie notice"
                  >
                    <X size={17} />
                  </button>
                </div>

                <p id="cookie-consent-description" className="text-xs text-slate-300 leading-relaxed mb-3 sm:mb-4">
                  We use cookies and privacy-respecting telemetry to understand website traffic, remember your preferences, and provide personalized senior care support across Pennsylvania.{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#60EFFF] hover:underline font-medium inline-flex items-center gap-0.5 whitespace-nowrap"
                  >
                    Privacy Policy <ExternalLink size={10} />
                  </Link>
                </p>

                {/* Primary Buttons: Responsive 2-column on mobile, inline on desktop */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center flex-1">
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      disabled={isSubmitting}
                      className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#0061FF] to-[#004ECC] hover:from-[#0052db] hover:to-[#003da8] text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
                    >
                      Accept All
                    </button>

                    <button
                      type="button"
                      onClick={handleRejectNonEssential}
                      disabled={isSubmitting}
                      className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-semibold border border-white/15 transition-all cursor-pointer text-center"
                    >
                      Reject Non-Essential
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="px-3 py-2 rounded-xl text-slate-300 hover:text-white text-xs font-semibold hover:bg-white/5 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer sm:ml-auto"
                  >
                    <Sliders size={13} className="text-[#60EFFF]" />
                    <span>Customize</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* =====================================================================
          2. GRANULAR PREFERENCES MODAL
          ===================================================================== */}
      {showModal && (
        <div className="fixed inset-0 z-[100000] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] my-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#001A4D] via-[#0B2A6B] to-[#001A4D] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#60EFFF] border border-white/10 shrink-0">
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white !text-white flex items-center gap-2 m-0 !m-0 !mb-0 tracking-tight">
                    Cookie &amp; Privacy Settings
                  </h2>
                  <p className="text-xs text-blue-200 m-0 !m-0 !mt-0.5">
                    Configure your data and traffic analytics preferences
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                aria-label="Close preferences"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Categories Body */}
            <div className="p-6 space-y-4 overflow-y-auto text-xs text-slate-700">
              <div className="bg-blue-50/70 border border-blue-200/60 rounded-2xl p-3.5 flex items-start gap-2.5">
                <Info size={16} className="text-[#0061FF] shrink-0 mt-0.5" />
                <p className="text-slate-600 leading-relaxed text-[11px] m-0">
                  We respect your privacy and give you full control over your data. Customize your cookie and telemetry preferences below to choose how information is collected during your visit and ensure your personal data is protected.
                </p>
              </div>

              {/* Category 1: Strictly Necessary (Locked ON) */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Lock size={15} className="text-emerald-600" />
                    <span className="font-bold text-sm text-[#001A4D]">Strictly Necessary Cookies</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Always Active
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed m-0">
                  Required for core website security, authenticating inquiries, preventing fraudulent form submissions, and ensuring privacy safeguards. These cannot be disabled.
                </p>
              </div>

              {/* Category 2: Analytics & Traffic Telemetry */}
              <div className="border border-slate-200 rounded-2xl p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Activity size={15} className="text-[#0061FF]" />
                    <span className="font-bold text-sm text-[#001A4D]">Analytics &amp; Telemetry</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0061FF]"></div>
                  </label>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed m-0">
                  Helps us understand how families use our Pennsylvania home care portal by collecting pages visited, button clicks, device/browser details, referral sources, and session duration.
                </p>
              </div>

              {/* Category 3: Functional & Preferences */}
              <div className="border border-slate-200 rounded-2xl p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Settings size={15} className="text-[#0061FF]" />
                    <span className="font-bold text-sm text-[#001A4D]">Functional Preferences</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0061FF]"></div>
                  </label>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed m-0">
                  Remembers your language choice, selected county care filters, and chatbot preferences between visits for a seamless experience.
                </p>
              </div>

              {/* Category 4: Personal Data Protection */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={15} className="text-[#0061FF]" />
                    <span className="font-bold text-sm text-[#001A4D]">Do Not Sell or Share My Information</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.doNotSellShare}
                      onChange={(e) => setPreferences({ ...preferences, doNotSellShare: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0061FF]"></div>
                  </label>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed m-0">
                  Ensure your personal information is never sold or shared. Pavan Homecare strictly safeguards your privacy and never sells or shares patient, family, or caregiver data with third-party advertisers.
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                disabled={isSubmitting}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Reject All Non-Essential
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handleSaveCustomPreferences}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-[#001A4D] font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Choices
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0061FF] to-[#004ECC] hover:from-[#0052db] hover:to-[#003da8] text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          3. PERSISTENT FLOATING COOKIE CHOICES TRIGGER (Stacked cleanly above Accessibility)
          ===================================================================== */}
      {!showBanner && !showModal && (
        <button
          type="button"
          onClick={() => setShowBanner(true)}
          className="phcCookieTriggerBtn"
          aria-label="Manage Cookie Consent & Privacy Preferences"
          title="Cookie & Privacy Choices"
        >
          <div className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
            <Cookie size={13} className="text-amber-600" />
          </div>
          <span>Cookie Choices</span>
        </button>
      )}

      {/* =====================================================================
          4. SUCCESS CONFIRMATION TOAST (Clean top notification)
          ===================================================================== */}
      {showSavedToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100001] bg-[#001A4D]/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-2.5 text-xs font-semibold animate-slideDown whitespace-nowrap">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check size={12} />
          </div>
          <span>Your privacy preferences have been saved!</span>
        </div>
      )}
    </>
  );
}
